import { Pool } from 'pg';
import { NextRequest, NextResponse } from 'next/server';
import { getClientIp, checkRateLimit } from '@/app/lib/rateLimit';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

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
        const body = await request.json();
        const { email } = body;

        if (!email) {
            return NextResponse.json(
                { error: 'Email is required' },
                { status: 400 }
            );
        }

        // Create table if it doesn't exist
        await client.query(`
            CREATE TABLE IF NOT EXISTS "newsletter-emails" (
                id SERIAL PRIMARY KEY,
                email VARCHAR(255) UNIQUE NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        // Insert the email
        await client.query(
            `INSERT INTO "newsletter-emails" (email)
            VALUES ($1)
            ON CONFLICT (email) DO NOTHING;`,
            [email]
        );

        return NextResponse.json(
            { success: true, message: 'Subscribed successfully' },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error submitting newsletter registration:', error);
        return NextResponse.json(
            { error: 'Failed to subscribe' },
            { status: 500 }
        );
    } finally {
        client.release();
    }
}
