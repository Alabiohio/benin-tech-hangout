import { Pool } from 'pg';
import { NextRequest, NextResponse } from 'next/server';
import { getClientIp, checkRateLimit } from '@/app/lib/rateLimit';
import { sendTicketConfirmationEmail } from '@/app/lib/email';
import { generateRegistrationId } from '@/app/lib/registration';
import { ensureTicketTable, insertTickets } from '@/app/lib/tickets';
import { cleanText, email, invalidFormResponse, readFormBody, rejectOversizedBody, requiredText } from '@/app/lib/formSecurity';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const TIER_LABELS: Record<string, string> = {
    // registration/summary flow
    explorer: 'Explorer Pass',
    builders: 'Builders Pass',
    founders: 'Founders Pass',
    vip: 'VIP Pass',
    investors: 'Investors Pass',
    // buy-ticket flow aliases
    regular: 'Regular Pass',
    standard: 'Standard Pass',
    business: 'Business Pass',
};

const TIER_AMOUNTS: Record<string, number> = {
    // registration/summary flow
    explorer: 350000,
    builders: 1000000,
    founders: 2000000,
    vip: 8500000,
    investors: 20000000,
    // buy-ticket flow aliases — must match payments/initialize amounts
    regular: 350000,
    standard: 1000000,
    business: 3500000,
};

export async function POST(request: NextRequest) {
    const oversized = rejectOversizedBody(request);
    if (oversized) return oversized;
    const clientIp = getClientIp(request);
    const rateLimit = checkRateLimit(clientIp);

    if (!rateLimit.allowed) {
        return NextResponse.json(
            { error: 'Too many requests. Please try again later.' },
            { status: 429, headers: { 'Retry-After': String(rateLimit.retryAfter) } }
        );
    }

    try {
        const body = await readFormBody(request);
        if (!body) return invalidFormResponse();
        const ticket_type = requiredText(body.ticket_type, 100);
        const firstName = requiredText(body.firstName);
        const lastName = requiredText(body.lastName);
        const emailAddress = email(body.email);
        const paymentReference = cleanText(body.paymentReference, 255);
        const registrationId = cleanText(body.registrationId, 100) || generateRegistrationId();
        
        const parsedQuantity = parseInt(String(body.quantity || '1'), 10) || 1;
        if (isNaN(parsedQuantity) || !Number.isInteger(parsedQuantity) || parsedQuantity <= 0 || parsedQuantity > 100) return invalidFormResponse();
        const quantity = parsedQuantity;
        
        const expectedAmount = ticket_type ? TIER_AMOUNTS[ticket_type] * quantity : 0;

        if (!ticket_type || !TIER_LABELS[ticket_type] || !firstName || !lastName || !emailAddress || paymentReference === null) return invalidFormResponse();

        if (expectedAmount > 0 && (!paymentReference || !process.env.PAYSTACK_SECRET_KEY)) {
            return NextResponse.json({ error: 'A verified payment is required for this ticket.' }, { status: 400 });
        }

        if (expectedAmount > 0 && paymentReference && process.env.PAYSTACK_SECRET_KEY) {
            try {
                const paystackRes = await fetch(`https://api.paystack.co/transaction/verify/${paymentReference}`, {
                    headers: {
                        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
                    }
                });
                const paystackData = await paystackRes.json();
                if (!paystackRes.ok || !paystackData.status || paystackData.data.status !== 'success' || paystackData.data.reference !== paymentReference || paystackData.data.customer?.email?.toLowerCase() !== emailAddress || paystackData.data.amount !== expectedAmount) {
                    return NextResponse.json({ error: 'Payment verification failed' }, { status: 400 });
                }
            } catch (err) {
                console.error('Paystack verification error:', err);
                return NextResponse.json({ error: 'Payment verification error' }, { status: 500 });
            }
        }
        const client = await pool.connect();
        try {

        await ensureTicketTable(client);
        await client.query('BEGIN');
        await client.query('SELECT pg_advisory_xact_lock(hashtext($1))', [paymentReference || `browser-${registrationId}`]);

        if (paymentReference) {
            const existingPayment = await client.query(
                'SELECT id, ticket_id, registration_id FROM ticket_registrations WHERE payment_reference = $1 ORDER BY id LIMIT 1',
                [paymentReference]
            );
            if (existingPayment.rowCount && existingPayment.rows[0]) {
                const existingRegistrationId = existingPayment.rows[0].registration_id || existingPayment.rows[0].id;
                const ticketIds = (await client.query('SELECT ticket_id FROM ticket_registrations WHERE payment_reference = $1 ORDER BY id', [paymentReference])).rows.map((row) => row.ticket_id);
                await client.query('ROLLBACK');
                return NextResponse.json({ 
                    success: true, 
                    message: 'Ticket already registered (processed via webhook).',
                    id: existingPayment.rows[0].id,
                    registrationId: existingRegistrationId,
                    ticketIds,
                }, { status: 200 });
            }
        }

        const ticketRegistrations = await insertTickets(client, {
            registrationId,
            ticketType: ticket_type,
            firstName,
            lastName,
            email: emailAddress,
            paymentReference: paymentReference || `browser-${registrationId}`,
            quantity,
        });
        await client.query('COMMIT');

        // Send a branded payment confirmation email to the purchaser
        const emailSent = await sendTicketConfirmationEmail({
            firstName,
            lastName,
            email: emailAddress,
            ticketType: ticket_type,
            ticketLabel: TIER_LABELS[ticket_type] || ticket_type,
            paymentReference: paymentReference || 'N/A',
            quantity,
            registrationId: ticketRegistrations[0].ticket_id,
            totalPaid: expectedAmount,
        });

        if (!emailSent) {
            console.warn(`Ticket registration saved for ${emailAddress}, but the confirmation email failed to send.`);
        }


        return NextResponse.json(
            {
                success: true,
                message: 'Ticket registration submitted successfully',
                id: ticketRegistrations[0].id,
                registrationId,
                ticketIds: ticketRegistrations.map((ticket) => ticket.ticket_id),
                emailSent,
            },
            { status: 201 }
        );
        } finally {
            try { await client.query('ROLLBACK'); } catch {}
            client.release();
        }
    } catch (error) {
        console.error('Error submitting ticket registration:', error);
        return NextResponse.json(
            { error: 'Failed to submit registration' },
            { status: 500 }
        );
    }
}
