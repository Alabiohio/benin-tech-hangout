import { Pool } from 'pg';
import { NextRequest, NextResponse } from 'next/server';
import { getClientIp, checkRateLimit } from '@/app/lib/rateLimit';

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
            phone,
            company,
            website,
            description,
            registration_type
        } = data;

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
