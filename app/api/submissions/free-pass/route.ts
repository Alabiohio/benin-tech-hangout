import { Pool, PoolClient } from 'pg';
import { NextRequest, NextResponse } from 'next/server';
import { getClientIp, checkRateLimit } from '@/app/lib/rateLimit';
import { sendFormNotificationEmail } from '@/app/lib/email';
import { cleanText, email, invalidFormResponse, phone, readFormBody, rejectOversizedBody, requiredText } from '@/app/lib/formSecurity';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function getFreePassColumns(client: PoolClient): Promise<Set<string>> {
    const { rows } = await client.query(`
        SELECT column_name
        FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = 'free_pass_registrations'
    `);

    return new Set(rows.map((row) => row.column_name));
}

async function ensureFreePassTableSchema(client: PoolClient) {
    await client.query(`
        CREATE TABLE IF NOT EXISTS free_pass_registrations (
            id SERIAL PRIMARY KEY,
            first_name VARCHAR(255),
            last_name VARCHAR(255),
            email VARCHAR(255),
            phone VARCHAR(20),
            country VARCHAR(255),
            nationality VARCHAR(255),
            community VARCHAR(255),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `);

    await client.query(`
        ALTER TABLE free_pass_registrations
        ADD COLUMN IF NOT EXISTS first_name VARCHAR(255),
        ADD COLUMN IF NOT EXISTS last_name VARCHAR(255),
        ADD COLUMN IF NOT EXISTS email VARCHAR(255),
        ADD COLUMN IF NOT EXISTS phone VARCHAR(20),
        ADD COLUMN IF NOT EXISTS country VARCHAR(255),
        ADD COLUMN IF NOT EXISTS nationality VARCHAR(255),
        ADD COLUMN IF NOT EXISTS community VARCHAR(255),
        ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
    `);

    try {
        await client.query(`
            ALTER TABLE free_pass_registrations
            ADD CONSTRAINT free_pass_registrations_email_key UNIQUE (email);
        `);
    } catch (error) {
        if (!(error instanceof Error) || !error.message.includes('already exists')) {
            throw error;
        }
    }

    const columns = await getFreePassColumns(client);
    if (!columns.has('first_name')) {
        await client.query(`ALTER TABLE free_pass_registrations ADD COLUMN first_name VARCHAR(255);`);
    }
    if (!columns.has('last_name')) {
        await client.query(`ALTER TABLE free_pass_registrations ADD COLUMN last_name VARCHAR(255);`);
    }
    if (!columns.has('email')) {
        await client.query(`ALTER TABLE free_pass_registrations ADD COLUMN email VARCHAR(255);`);
    }
    if (!columns.has('phone')) {
        await client.query(`ALTER TABLE free_pass_registrations ADD COLUMN phone VARCHAR(20);`);
    }
    if (!columns.has('country')) {
        await client.query(`ALTER TABLE free_pass_registrations ADD COLUMN country VARCHAR(255);`);
    }
    if (!columns.has('nationality')) {
        await client.query(`ALTER TABLE free_pass_registrations ADD COLUMN nationality VARCHAR(255);`);
    }
    if (!columns.has('community')) {
        await client.query(`ALTER TABLE free_pass_registrations ADD COLUMN community VARCHAR(255);`);
    }
    if (!columns.has('created_at')) {
        await client.query(`ALTER TABLE free_pass_registrations ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;`);
    }
}

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

    try {
        const body = await readFormBody(request);
        if (!body) return invalidFormResponse();
        const firstName = requiredText(body.firstName);
        const lastName = requiredText(body.lastName);
        const emailAddress = email(body.email);
        const phoneNumber = phone(body.phone);
        const country = requiredText(body.country);
        const nationality = requiredText(body.nationality);
        // Optional fields may be absent in a cached older client bundle.
        const community = cleanText(body.community ?? '', 255);

        // Validate required fields
        if (!firstName || !lastName || !emailAddress || phoneNumber === null || !country || !nationality || community === null) return invalidFormResponse();
        const client = await pool.connect();
        try {

        await ensureFreePassTableSchema(client);

        // Insert the submission
        const availableColumns = await getFreePassColumns(client);
        const insertColumns: string[] = [];
        const insertValues: unknown[] = [];

        if (availableColumns.has('first_name')) {
            insertColumns.push('first_name');
            insertValues.push(firstName);
        }
        if (availableColumns.has('last_name')) {
            insertColumns.push('last_name');
            insertValues.push(lastName);
        }
        if (availableColumns.has('name')) {
            insertColumns.push('name');
            insertValues.push(`${firstName} ${lastName}`);
        }
        if (availableColumns.has('email')) {
            insertColumns.push('email');
            insertValues.push(emailAddress);
        }
        if (availableColumns.has('phone')) {
            insertColumns.push('phone');
            insertValues.push(phoneNumber || null);
        }
        if (availableColumns.has('country')) {
            insertColumns.push('country');
            insertValues.push(country);
        }
        if (availableColumns.has('nationality')) {
            insertColumns.push('nationality');
            insertValues.push(nationality);
        }
        if (availableColumns.has('community')) {
            insertColumns.push('community');
            insertValues.push(community || null);
        }

        const placeholders = insertColumns.map((_, index) => `$${index + 1}`).join(', ');

        const result = await client.query(
            `INSERT INTO free_pass_registrations (${insertColumns.join(', ')}) VALUES (${placeholders}) RETURNING id, created_at;`,
            insertValues
        );

        const fullName = `${firstName} ${lastName}`;

        sendFormNotificationEmail('Community Pass Registration', body, [
            { label: 'Full Name', value: fullName },
            { label: 'Email Address', value: emailAddress },
            { label: 'Phone Number', value: phoneNumber || 'Not provided' },
            { label: 'Country', value: country },
            { label: 'Nationality', value: nationality },
            { label: 'Community', value: community || 'Not provided' },
        ]).catch((err) => console.error('Failed to send community pass email:', err));

        return NextResponse.json(
            {
                success: true,
                message: 'Community Pass registration submitted successfully',
                id: result.rows[0].id
            },
            { status: 201 }
        );
        } finally { client.release(); }
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
    }
}
