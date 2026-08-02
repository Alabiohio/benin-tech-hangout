import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const TIER_AMOUNTS: Record<string, number> = {
    explorer: 350000,
    builders: 1000000,
    founders: 2000000,
    vip: 5000000,
    investors: 20000000,
};

export async function POST(req: NextRequest) {
    try {
        const body = await req.text();
        const signature = req.headers.get('x-paystack-signature');
        const secret = process.env.PAYSTACK_SECRET_KEY;

        if (!secret) {
            console.error('PAYSTACK_SECRET_KEY is not defined');
            return NextResponse.json({ status: 'error', message: 'Internal Server Error' }, { status: 500 });
        }

        // Verify the webhook signature
        const expectedSignature = crypto.createHmac('sha512', secret).update(body).digest('hex');

        if (!signature || !/^[a-f0-9]{128}$/i.test(signature) || !crypto.timingSafeEqual(Buffer.from(signature, 'hex'), Buffer.from(expectedSignature, 'hex'))) {
            console.warn('Invalid Paystack Webhook Signature');
            return NextResponse.json({ status: 'error', message: 'Invalid signature' }, { status: 400 });
        }

        const event = JSON.parse(body);

        // Handle the 'charge.success' event
        if (event.event === 'charge.success' && event.data?.status === 'success') {
            const data = event.data;
            const paymentReference = data.reference;
            const metadata = data.metadata;
            const ticketType = typeof metadata?.ticket_type === 'string' ? metadata.ticket_type : '';

            if (typeof paymentReference !== 'string' || !TIER_AMOUNTS[ticketType] || data.currency !== 'NGN' || data.amount !== TIER_AMOUNTS[ticketType]) {
                console.warn('Rejected Paystack webhook with invalid payment details');
                return NextResponse.json({ status: 'success' }, { status: 200 });
            }
            
            const client = await pool.connect();
            try {
                // Check if the payment reference already exists
                const checkRes = await client.query(
                    'SELECT id FROM ticket_registrations WHERE payment_reference = $1',
                    [paymentReference]
                );

                if (checkRes.rowCount === 0) {
                    // The payment succeeded, but the registration data wasn't saved!
                    // This means the user paid but closed the window before the frontend callback hit our API.
                    // If we passed the form data in metadata during initialization, we could save it here.
                    
                    console.warn(`Webhook received for payment ${paymentReference}, but no registration record was found.`);
                    
                    if (metadata && metadata.custom_fields) {
                        // We could implement fallback insertion here using metadata if we sent it
                        console.log('Payment metadata is available for reconciliation.');
                    }
                } else {
                    console.log(`Webhook confirmed: Payment ${paymentReference} is already recorded successfully.`);
                }
            } finally {
                client.release();
            }
        }

        return NextResponse.json({ status: 'success' }, { status: 200 });

    } catch (error) {
        console.error('Paystack webhook error:', error);
        return NextResponse.json({ status: 'error', message: 'Webhook processing failed' }, { status: 500 });
    }
}
