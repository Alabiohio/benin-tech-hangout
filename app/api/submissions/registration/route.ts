import { Pool } from 'pg';
import { NextRequest, NextResponse } from 'next/server';
import { sendFormNotificationEmail } from '@/app/lib/email';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export async function POST(request: NextRequest) {
    const client = await pool.connect();

    try {
        const data = await request.json();

        const {
            name,
            email,
            primaryInterest
        } = data;

        if (!name || !email || !primaryInterest) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

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
            [name, email, primaryInterest]
        );

        sendFormNotificationEmail('General Registration', data, [
            { label: 'Full Name', value: name },
            { label: 'Email Address', value: email },
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
    } catch (error) {
        console.error('Error submitting registration:', error);
        return NextResponse.json(
            { error: 'Failed to submit registration' },
            { status: 500 }
        );
    } finally {
        client.release();
    }
}
