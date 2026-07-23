import { Pool } from 'pg';
import { NextRequest, NextResponse } from 'next/server';
import { getClientIp, checkRateLimit } from '@/app/lib/rateLimit';
import { sendFormNotificationEmail } from '@/app/lib/email';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export async function POST(request: NextRequest) {
    // Check rate limit first
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
            name,
            email,
            phone
        } = data;

        // Validate required fields
        if (!name || !email) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Create table if it doesn't exist
        await client.query(`
            CREATE TABLE IF NOT EXISTS free_pass_registrations (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE,
                phone VARCHAR(20),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        // Insert the submission
        const result = await client.query(
            `INSERT INTO free_pass_registrations 
            (name, email, phone)
            VALUES 
            ($1, $2, $3)
            RETURNING id, created_at;`,
            [name, email || null, phone || null]
        );

        sendFormNotificationEmail('Community Pass Registration', data, [
            { label: 'Full Name', value: name },
            { label: 'Email Address', value: email },
            { label: 'Phone Number', value: phone || 'Not provided' },
        ]).catch((err) => console.error('Failed to send community pass email:', err));

        return NextResponse.json(
            {
                success: true,
                message: 'Community Pass registration submitted successfully',
                id: result.rows[0].id
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error submitting community pass registration:', error);
        
        // Handle unique constraint violation for duplicate email
        if (error instanceof Error && error.message?.includes('duplicate key')) {
            return NextResponse.json(
                { error: 'This email is already registered for the Community Pass' },
                { status: 400 }
            );
        }
        
        return NextResponse.json(
            { error: 'Failed to submit registration' },
            { status: 500 }
        );
    } finally {
        client.release();
    }
}
