import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

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

        if (signature !== expectedSignature) {
            console.warn('Invalid Paystack Webhook Signature');
            return NextResponse.json({ status: 'error', message: 'Invalid signature' }, { status: 400 });
        }

        const event = JSON.parse(body);

        // Handle the 'charge.success' event
        if (event.event === 'charge.success') {
            const data = event.data;
            const paymentReference = data.reference;
            const email = data.customer.email;
            const metadata = data.metadata;
            
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
                    
                    console.warn(`Webhook received for payment ${paymentReference} (${email}), but no registration record found in database. The user might have closed the browser early.`);
                    
                    if (metadata && metadata.custom_fields) {
                        // We could implement fallback insertion here using metadata if we sent it
                        console.log('Metadata available, fallback insertion can be implemented', metadata);
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
