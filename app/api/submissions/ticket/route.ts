import { Pool } from 'pg';
import { NextRequest, NextResponse } from 'next/server';
import { getClientIp, checkRateLimit } from '@/app/lib/rateLimit';
import { sendTicketConfirmationEmail } from '@/app/lib/email';
import { cleanText, email, invalidFormResponse, phone, readFormBody, rejectOversizedBody, requiredText } from '@/app/lib/formSecurity';

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
    vip: 5000000,
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
        const phoneNumber = phone(body.phone, false);
        const country = cleanText(body.country, 255) ?? '';
        const nationality = cleanText(body.nationality, 255) ?? '';
        const community = cleanText(body.community, 255);
        const paymentReference = cleanText(body.paymentReference, 255);
        
        const parsedQuantity = parseInt(String(body.quantity || '1'), 10) || 1;
        if (isNaN(parsedQuantity) || !Number.isInteger(parsedQuantity) || parsedQuantity <= 0 || parsedQuantity > 100) return invalidFormResponse();
        const quantity = parsedQuantity;
        
        const expectedAmount = ticket_type ? TIER_AMOUNTS[ticket_type] * quantity : 0;

        if (!ticket_type || !TIER_LABELS[ticket_type] || !firstName || !lastName || !emailAddress || phoneNumber === null || community === null || paymentReference === null) return invalidFormResponse();

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

        await client.query(`
            CREATE TABLE IF NOT EXISTS "btf-registration" (
                id SERIAL PRIMARY KEY,
                ticket_type VARCHAR(100),
                first_name VARCHAR(255),
                last_name VARCHAR(255),
                email VARCHAR(255),
                phone VARCHAR(30),
                country VARCHAR(255),
                nationality VARCHAR(255),
                community VARCHAR(255),
                payment_reference VARCHAR(255),
                name VARCHAR(255),
                primary_interest VARCHAR(255),
                agreed_to_terms BOOLEAN DEFAULT FALSE,
                created_at TIMESTAMPTZ DEFAULT NOW()
            );
        `);

        await client.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'btf-registration' AND column_name = 'ticket_type') THEN
                    ALTER TABLE "btf-registration" ADD COLUMN ticket_type VARCHAR(100);
                END IF;

                IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'btf-registration' AND column_name = 'first_name') THEN
                    ALTER TABLE "btf-registration" ADD COLUMN first_name VARCHAR(255);
                END IF;

                IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'btf-registration' AND column_name = 'last_name') THEN
                    ALTER TABLE "btf-registration" ADD COLUMN last_name VARCHAR(255);
                END IF;

                IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'btf-registration' AND column_name = 'email') THEN
                    ALTER TABLE "btf-registration" ADD COLUMN email VARCHAR(255);
                END IF;

                IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'btf-registration' AND column_name = 'phone') THEN
                    ALTER TABLE "btf-registration" ADD COLUMN phone VARCHAR(30);
                END IF;

                IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'btf-registration' AND column_name = 'country') THEN
                    ALTER TABLE "btf-registration" ADD COLUMN country VARCHAR(255);
                END IF;

                IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'btf-registration' AND column_name = 'nationality') THEN
                    ALTER TABLE "btf-registration" ADD COLUMN nationality VARCHAR(255);
                END IF;

                IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'btf-registration' AND column_name = 'community') THEN
                    ALTER TABLE "btf-registration" ADD COLUMN community VARCHAR(255);
                END IF;

                IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'btf-registration' AND column_name = 'payment_reference') THEN
                    ALTER TABLE "btf-registration" ADD COLUMN payment_reference VARCHAR(255);
                END IF;

                IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'btf-registration' AND column_name = 'name') THEN
                    ALTER TABLE "btf-registration" ADD COLUMN name VARCHAR(255);
                END IF;

                IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'btf-registration' AND column_name = 'primary_interest') THEN
                    ALTER TABLE "btf-registration" ADD COLUMN primary_interest VARCHAR(255);
                END IF;

                IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'btf-registration' AND column_name = 'agreed_to_terms') THEN
                    ALTER TABLE "btf-registration" ADD COLUMN agreed_to_terms BOOLEAN DEFAULT FALSE;
                END IF;

                IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE table_name = 'btf-registration' AND constraint_type = 'UNIQUE' AND constraint_name = 'btf_registration_payment_reference_key') THEN
                    ALTER TABLE "btf-registration" ADD CONSTRAINT "btf_registration_payment_reference_key" UNIQUE (payment_reference);
                END IF;

                ALTER TABLE "btf-registration" ALTER COLUMN name DROP NOT NULL;
                ALTER TABLE "btf-registration" ALTER COLUMN email DROP NOT NULL;
                ALTER TABLE "btf-registration" ALTER COLUMN primary_interest DROP NOT NULL;
                ALTER TABLE "btf-registration" ALTER COLUMN ticket_type DROP NOT NULL;
                ALTER TABLE "btf-registration" ALTER COLUMN first_name DROP NOT NULL;
                ALTER TABLE "btf-registration" ALTER COLUMN last_name DROP NOT NULL;
                ALTER TABLE "btf-registration" ALTER COLUMN country DROP NOT NULL;
                ALTER TABLE "btf-registration" ALTER COLUMN nationality DROP NOT NULL;
            END $$;
        `);

        if (paymentReference) {
            const existingPayment = await client.query(
                'SELECT id FROM "btf-registration" WHERE payment_reference = $1 LIMIT 1',
                [paymentReference]
            );
            if (existingPayment.rowCount && existingPayment.rows[0]) {
                // Return 200 instead of 409 so the frontend doesn't throw an error. 
                // The webhook or a previous request already handled it.
                return NextResponse.json({ 
                    success: true, 
                    message: 'Ticket already registered (processed via webhook).',
                    id: existingPayment.rows[0].id
                }, { status: 200 });
            }
        }

        const result = await client.query(
            `INSERT INTO "btf-registration"
            (ticket_type, first_name, last_name, email, phone, country, nationality, community, payment_reference)
            VALUES
            ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING id, created_at;`,
            [ticket_type, firstName, lastName, emailAddress, phoneNumber || null, country, nationality, community || null, paymentReference || null]
        );

        // Send a branded payment confirmation email to the purchaser
        sendTicketConfirmationEmail({
            firstName,
            lastName,
            email: emailAddress,
            ticketType: ticket_type,
            ticketLabel: TIER_LABELS[ticket_type] || ticket_type,
            paymentReference: paymentReference || 'N/A',
            quantity,
            registrationId: result.rows[0].id,
            totalPaid: expectedAmount,
        }).catch((err) => console.error('Failed to send ticket confirmation email:', err));


        return NextResponse.json(
            {
                success: true,
                message: 'Ticket registration submitted successfully',
                id: result.rows[0].id
            },
            { status: 201 }
        );
        } finally { client.release(); }
    } catch (error) {
        console.error('Error submitting ticket registration:', error);
        return NextResponse.json(
            { error: 'Failed to submit registration' },
            { status: 500 }
        );
    }
}
