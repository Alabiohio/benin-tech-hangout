import { Pool } from 'pg';
import { NextRequest, NextResponse } from 'next/server';
import { sendFormNotificationEmail, sendRegistrationEmail } from '@/app/lib/email';
import { generateRegistrationId } from '@/app/lib/registration';
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
        const agreedToTerms = typeof data.agreedToTerms === 'boolean' ? data.agreedToTerms : false;
        const registrationId = typeof data.registrationId === 'string' ? data.registrationId.trim() : generateRegistrationId();
        
        // Extract additional fields
        const firstName = typeof data.firstName === 'string' ? data.firstName.trim() : '';
        const lastName = typeof data.lastName === 'string' ? data.lastName.trim() : '';
        const whatsapp = typeof data.whatsapp === 'string' ? data.whatsapp.trim() : '';
        const company = typeof data.company === 'string' ? data.company.trim() : '';
        const role = typeof data.role === 'string' ? data.role.trim() : '';
        const location = typeof data.location === 'string' ? data.location.trim() : '';
        const heardFrom = typeof data.heardFrom === 'string' ? data.heardFrom.trim() : '';
        const eventPass = typeof data.eventPass === 'string' ? data.eventPass.trim() : '';
        const interests = Array.isArray(data.interests) ? data.interests.join(', ') : '';

        if (!name || !emailAddress || !primaryInterest) return invalidFormResponse();
        const client = await pool.connect();
        try {

        await client.query(`
            CREATE TABLE IF NOT EXISTS "btf-registration" (
                id SERIAL PRIMARY KEY,
                registration_id VARCHAR(100) UNIQUE,
                first_name VARCHAR(255),
                last_name VARCHAR(255),
                name VARCHAR(255),
                email VARCHAR(255),
                whatsapp VARCHAR(30),
                company VARCHAR(255),
                role VARCHAR(100),
                location VARCHAR(255),
                interests TEXT,
                primary_interest VARCHAR(255),
                heard_from VARCHAR(100),
                event_pass VARCHAR(50),
                agreed_to_terms BOOLEAN DEFAULT FALSE,
                created_at TIMESTAMPTZ DEFAULT NOW()
            );
        `);

        await client.query(`
            DO $$
            BEGIN
                -- Add first_name column
                BEGIN
                    ALTER TABLE "btf-registration" ADD COLUMN first_name VARCHAR(255);
                EXCEPTION WHEN duplicate_column THEN NULL;
                END;

                -- Add last_name column
                BEGIN
                    ALTER TABLE "btf-registration" ADD COLUMN last_name VARCHAR(255);
                EXCEPTION WHEN duplicate_column THEN NULL;
                END;

                -- Add whatsapp column
                BEGIN
                    ALTER TABLE "btf-registration" ADD COLUMN whatsapp VARCHAR(30);
                EXCEPTION WHEN duplicate_column THEN NULL;
                END;

                -- Add company column
                BEGIN
                    ALTER TABLE "btf-registration" ADD COLUMN company VARCHAR(255);
                EXCEPTION WHEN duplicate_column THEN NULL;
                END;

                -- Add role column
                BEGIN
                    ALTER TABLE "btf-registration" ADD COLUMN role VARCHAR(100);
                EXCEPTION WHEN duplicate_column THEN NULL;
                END;

                -- Add location column
                BEGIN
                    ALTER TABLE "btf-registration" ADD COLUMN location VARCHAR(255);
                EXCEPTION WHEN duplicate_column THEN NULL;
                END;

                -- Add interests column
                BEGIN
                    ALTER TABLE "btf-registration" ADD COLUMN interests TEXT;
                EXCEPTION WHEN duplicate_column THEN NULL;
                END;

                -- Add heard_from column
                BEGIN
                    ALTER TABLE "btf-registration" ADD COLUMN heard_from VARCHAR(100);
                EXCEPTION WHEN duplicate_column THEN NULL;
                END;

                -- Add event_pass column
                BEGIN
                    ALTER TABLE "btf-registration" ADD COLUMN event_pass VARCHAR(50);
                EXCEPTION WHEN duplicate_column THEN NULL;
                END;

                -- Add registration_id constraint if not exists
                IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE table_name = 'btf-registration' AND constraint_type = 'UNIQUE' AND constraint_name = 'btf_registration_registration_id_key') THEN
                    ALTER TABLE "btf-registration" ADD CONSTRAINT "btf_registration_registration_id_key" UNIQUE (registration_id);
                END IF;

                -- Add email unique index if not exists
                IF NOT EXISTS (
                    SELECT 1
                    FROM pg_indexes
                    WHERE schemaname = current_schema()
                    AND indexname = 'btf_registration_email_unique_idx'
                ) THEN
                    CREATE UNIQUE INDEX "btf_registration_email_unique_idx"
                    ON "btf-registration" (LOWER(email));
                END IF;
            END $$;
        `);

        const existingRegistration = await client.query(
            `SELECT id, registration_id FROM "btf-registration"
             WHERE LOWER(email) = LOWER($1)
             LIMIT 1;`,
            [emailAddress]
        );

        if (existingRegistration.rowCount && existingRegistration.rows[0]) {
            return NextResponse.json({
                success: true,
                message: 'This email is already registered.',
                id: existingRegistration.rows[0].id,
                registrationId: existingRegistration.rows[0].registration_id || existingRegistration.rows[0].id,
            }, { status: 200 });
        }

        const result = await client.query(
            `INSERT INTO "btf-registration"
            (registration_id, first_name, last_name, name, email, whatsapp, company, role, location, interests, primary_interest, heard_from, event_pass, agreed_to_terms)
            VALUES 
            ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
            RETURNING id, registration_id, created_at;`,
            [registrationId, firstName, lastName, name, emailAddress, whatsapp, company, role, location, interests, primaryInterest, heardFrom, eventPass, agreedToTerms]
        );

        await sendRegistrationEmail({
            name,
            email: emailAddress,
            registrationId: result.rows[0].registration_id || result.rows[0].id,
        });

        return NextResponse.json(
            {
                success: true,
                message: 'Registration submitted successfully',
                id: result.rows[0].id,
                registrationId: result.rows[0].registration_id || result.rows[0].id
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
