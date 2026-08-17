import { Pool } from 'pg';
import { NextRequest, NextResponse } from 'next/server';
import { getClientIp, checkRateLimit } from '@/app/lib/rateLimit';
import { sendFormNotificationEmail } from '@/app/lib/email';
import { cleanText, hasSafeTextFields, invalidFormResponse, readFormBody, rejectOversizedBody, requiredText } from '@/app/lib/formSecurity';

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
        
        const name = requiredText(data.name);
        const email = requiredText(data.email);
        const phone = requiredText(data.phone);
        const company = requiredText(data.company);
        const website = cleanText(data.website);
        const description = cleanText(data.description);
        const registration_type = cleanText(data.registration_type);

        // Validate required fields
        if (!name || !email || !phone || !company) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Create table if it doesn't exist
        await client.query(`
            CREATE TABLE IF NOT EXISTS exhibitor_registrations (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                phone VARCHAR(20) NOT NULL,
                company VARCHAR(255) NOT NULL,
                website VARCHAR(255),
                description TEXT,
                registration_type VARCHAR(50) DEFAULT 'exhibitor',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        // Insert the submission
        const result = await client.query(
            `INSERT INTO exhibitor_registrations 
            (name, email, phone, company, website, description, registration_type)
            VALUES 
            ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id, created_at;`,
            [name, email, phone, company, website || null, description || null, registration_type || 'exhibitor']
        );

        sendFormNotificationEmail('Exhibitor Registration', data, [
            { label: 'Company / Brand', value: company },
            { label: 'Contact Person', value: name },
            { label: 'Email Address', value: email },
            { label: 'Phone Number', value: phone },
            { label: 'Registration Type', value: registration_type || 'exhibitor' },
            { label: 'Website', value: website || 'N/A' },
            { label: 'Description', value: description || 'N/A' },
        ]).catch((err) => console.error('Failed to send exhibitor email:', err));

        return NextResponse.json(
            {
                success: true,
                message: 'Exhibitor registration submitted successfully',
                id: result.rows[0].id
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error submitting exhibitor registration:', error);
        return NextResponse.json(
            { error: 'Failed to submit registration' },
            { status: 500 }
        );
    } finally {
        client.release();
    }
}
