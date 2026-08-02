import { Pool } from 'pg';
import { NextRequest, NextResponse } from 'next/server';
import { sendFormNotificationEmail } from '@/app/lib/email';
import { checkRateLimit, getClientIp } from '@/app/lib/rateLimit';
import { email, invalidFormResponse, readFormBody, rejectOversizedBody, requiredText } from '@/app/lib/formSecurity';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export async function POST(request: NextRequest) {
    const oversized = rejectOversizedBody(request);
    if (oversized) return oversized;
    const rateLimit = checkRateLimit(getClientIp(request));
    if (!rateLimit.allowed) return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429, headers: { 'Retry-After': String(rateLimit.retryAfter) } });

    try {
        const data = await readFormBody(request);
        if (!data) return invalidFormResponse();
        const name = requiredText(data.name);
        const emailAddress = email(data.email);
        const primaryInterest = requiredText(data.primaryInterest);

        if (!name || !emailAddress || !primaryInterest) return invalidFormResponse();
        const client = await pool.connect();
        try {

        await client.query(`
            CREATE TABLE IF NOT EXISTS registration_submissions (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                primary_interest VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        const result = await client.query(
            `INSERT INTO registration_submissions 
            (name, email, primary_interest)
            VALUES 
            ($1, $2, $3)
            RETURNING id, created_at;`,
            [name, emailAddress, primaryInterest]
        );

        sendFormNotificationEmail('General Registration', data, [
            { label: 'Full Name', value: name },
            { label: 'Email Address', value: emailAddress },
            { label: 'Primary Interest', value: primaryInterest },
        ]).catch((err) => console.error('Failed to send registration email:', err));

        return NextResponse.json(
            {
                success: true,
                message: 'Registration submitted successfully',
                id: result.rows[0].id
            },
            { status: 201 }
        );
        } finally { client.release(); }
    } catch (error) {
        console.error('Error submitting registration:', error);
        return NextResponse.json(
            { error: 'Failed to submit registration' },
            { status: 500 }
        );
    }
}
