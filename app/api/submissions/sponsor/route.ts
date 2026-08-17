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
        
        const company_name = requiredText(data.company_name);
        const contact_person = requiredText(data.contact_person);
        const email = requiredText(data.email);
        const phone = requiredText(data.phone);
        const sponsorship_tier = cleanText(data.sponsorship_tier);
        const interests = cleanText(data.interests);

        // Validate required fields
        if (!company_name || !contact_person || !email || !phone) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Create table if it doesn't exist
        await client.query(`
            CREATE TABLE IF NOT EXISTS sponsor_registrations (
                id SERIAL PRIMARY KEY,
                company_name VARCHAR(255) NOT NULL,
                contact_person VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                phone VARCHAR(20) NOT NULL,
                sponsorship_tier VARCHAR(100),
                interests TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        // Insert the submission
        const result = await client.query(
            `INSERT INTO sponsor_registrations 
            (company_name, contact_person, email, phone, sponsorship_tier, interests)
            VALUES 
            ($1, $2, $3, $4, $5, $6)
            RETURNING id, created_at;`,
            [company_name, contact_person, email, phone, sponsorship_tier || null, interests || null]
        );

        const tierLabels: Record<string, string> = {
            bronze: '₦1,000,000 - ₦2,500,000',
            silver: '₦2,500,000 - ₦5,000,000',
            gold: '₦5,000,000 - ₦10,000,000+',
            other: 'Others / Partnership',
        };

        sendFormNotificationEmail('Sponsorship Inquiry', data, [
            { label: 'Company Name', value: company_name },
            { label: 'Contact Person', value: contact_person },
            { label: 'Email Address', value: email },
            { label: 'Phone Number', value: phone },
            { label: 'Sponsorship Tier', value: tierLabels[sponsorship_tier || ''] || sponsorship_tier || 'N/A' },
            { label: 'Brand Objectives', value: interests || 'N/A' },
        ]).catch((err) => console.error('Failed to send sponsor email:', err));

        return NextResponse.json(
            {
                success: true,
                message: 'Sponsor registration submitted successfully',
                id: result.rows[0].id
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error submitting sponsor registration:', error);
        return NextResponse.json(
            { error: 'Failed to submit registration' },
            { status: 500 }
        );
    } finally {
        client.release();
    }
}
