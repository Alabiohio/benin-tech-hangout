import { Pool } from 'pg';
import { NextRequest, NextResponse } from 'next/server';
import { getClientIp, checkRateLimit } from '@/app/lib/rateLimit';
import { sendFormNotificationEmail } from '@/app/lib/email';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const TIER_LABELS: Record<string, string> = {
    community: 'Community Pass',
    explorer: 'Explorer Pass',
    builders: 'Builders Pass',
    founders: 'Founders Pass',
    vip: 'VIP Pass',
    investors: 'Investors Pass',
};

export async function POST(request: NextRequest) {
    const clientIp = getClientIp(request);
    const rateLimit = checkRateLimit(clientIp);

    if (!rateLimit.allowed) {
        return NextResponse.json(
            { error: 'Too many requests. Please try again later.' },
            { status: 429, headers: { 'Retry-After': String(rateLimit.retryAfter) } }
        );
    }

    const client = await pool.connect();

    try {
        const data = await request.json();

        const {
            ticket_type,
            firstName,
            lastName,
            email,
            phone,
            country,
            nationality,
            community,
            paymentReference,
        } = data;

        if (!ticket_type || !firstName || !lastName || !email || !country || !nationality) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        if (paymentReference && process.env.PAYSTACK_SECRET_KEY) {
            try {
                const paystackRes = await fetch(`https://api.paystack.co/transaction/verify/${paymentReference}`, {
                    headers: {
                        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
                    }
                });
                const paystackData = await paystackRes.json();
                if (!paystackRes.ok || !paystackData.status || paystackData.data.status !== 'success') {
                    return NextResponse.json({ error: 'Payment verification failed' }, { status: 400 });
                }
            } catch (err) {
                console.error('Paystack verification error:', err);
                return NextResponse.json({ error: 'Payment verification error' }, { status: 500 });
            }
        }

        await client.query(`
            CREATE TABLE IF NOT EXISTS ticket_registrations (
                id SERIAL PRIMARY KEY,
                ticket_type VARCHAR(100) NOT NULL,
                first_name VARCHAR(255) NOT NULL,
                last_name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                phone VARCHAR(20),
                country VARCHAR(255) NOT NULL,
                nationality VARCHAR(255) NOT NULL,
                community VARCHAR(255),
                payment_reference VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        // Check if column exists, and if not, add it (useful since the table might already be created)
        await client.query(`
            DO $$ 
            BEGIN 
                IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='ticket_registrations' AND column_name='payment_reference') THEN 
                    ALTER TABLE ticket_registrations ADD COLUMN payment_reference VARCHAR(255); 
                END IF; 
            END $$;
        `);

        const result = await client.query(
            `INSERT INTO ticket_registrations
            (ticket_type, first_name, last_name, email, phone, country, nationality, community, payment_reference)
            VALUES
            ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING id, created_at;`,
            [ticket_type, firstName, lastName, email, phone || null, country, nationality, community || null, paymentReference || null]
        );

        sendFormNotificationEmail('Ticket Registration', data, [
            { label: 'Ticket Type', value: TIER_LABELS[ticket_type] || ticket_type },
            { label: 'First Name', value: firstName },
            { label: 'Last Name', value: lastName },
            { label: 'Email Address', value: email },
            { label: 'Phone Number', value: phone || 'Not provided' },
            { label: 'Country', value: country },
            { label: 'Nationality', value: nationality },
            { label: 'Community', value: community || 'Not provided' },
            { label: 'Payment Reference', value: paymentReference || 'Free/None' },
        ]).catch((err) => console.error('Failed to send ticket registration email:', err));

        return NextResponse.json(
            {
                success: true,
                message: 'Ticket registration submitted successfully',
                id: result.rows[0].id
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error submitting ticket registration:', error);
        return NextResponse.json(
            { error: 'Failed to submit registration' },
            { status: 500 }
        );
    } finally {
        client.release();
    }
}
