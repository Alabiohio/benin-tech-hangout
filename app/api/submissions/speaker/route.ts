import { Pool } from 'pg';
import { NextRequest, NextResponse } from 'next/server';
import { getClientIp, checkRateLimit } from '@/app/lib/rateLimit';
import { sendFormNotificationEmail } from '@/app/lib/email';
import { hasSafeTextFields, invalidFormResponse, readFormBody, rejectOversizedBody } from '@/app/lib/formSecurity';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export async function POST(request: NextRequest) {
    const oversized = rejectOversizedBody(request);
    if (oversized) return oversized;
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
        const data = await readFormBody(request);
        if (!data || !hasSafeTextFields(data)) return invalidFormResponse();
        
        const {
            application_type,
            name,
            email,
            phone,
            speaker_name,
            topic,
            speaker_category,
            why_speak
        } = data;

        // Validate required fields
        if (!name || !email || !phone || !topic) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Create table if it doesn't exist and add missing columns
        await client.query(`
            CREATE TABLE IF NOT EXISTS speaker_registrations (
                id SERIAL PRIMARY KEY,
                application_type VARCHAR(50) NOT NULL,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                phone VARCHAR(20) NOT NULL,
                speaker_name VARCHAR(255),
                topic VARCHAR(255) NOT NULL,
                speaker_category VARCHAR(50),
                why_speak TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        // Add speaker_category column if it doesn't exist
        await client.query(`
            ALTER TABLE speaker_registrations
            ADD COLUMN IF NOT EXISTS speaker_category VARCHAR(50);
        `);

        // Insert the submission
        const result = await client.query(
            `INSERT INTO speaker_registrations 
            (application_type, name, email, phone, speaker_name, topic, speaker_category, why_speak)
            VALUES 
            ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING id, created_at;`,
            [application_type, name, email, phone, speaker_name || null, topic, speaker_category || null, why_speak || null]
        );

        sendFormNotificationEmail('Speaker Nomination', data, [
            { label: 'Application Type', value: application_type === 'self' ? 'Self-application' : 'Speaker suggestion' },
            { label: 'Submitter Name', value: name },
            { label: 'Submitter Email', value: email },
            { label: 'Submitter Phone', value: phone },
            { label: 'Speaker Name', value: speaker_name || name },
            { label: 'Topic / Expertise', value: topic },
            { label: 'Speaker Category', value: speaker_category || 'N/A' },
            { label: 'Why Speak?', value: why_speak || 'N/A' },
        ]).catch((err) => console.error('Failed to send speaker email:', err));

        return NextResponse.json(
            {
                success: true,
                message: 'Speaker nomination submitted successfully',
                id: result.rows[0].id
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error submitting speaker registration:', error);
        return NextResponse.json(
            { error: 'Failed to submit nomination' },
            { status: 500 }
        );
    } finally {
        client.release();
    }
}
