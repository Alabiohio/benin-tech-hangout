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

        if (!name || !emailAddress || !primaryInterest) return invalidFormResponse();
        const client = await pool.connect();
        try {

        await client.query(`
            CREATE TABLE IF NOT EXISTS "btf-registration" (
                id SERIAL PRIMARY KEY,
                registration_id VARCHAR(100) UNIQUE,
                name VARCHAR(255),
                email VARCHAR(255),
                primary_interest VARCHAR(255),
                agreed_to_terms BOOLEAN DEFAULT FALSE,
                ticket_type VARCHAR(100),
                first_name VARCHAR(255),
                last_name VARCHAR(255),
                phone VARCHAR(30),
                country VARCHAR(255),
                nationality VARCHAR(255),
                community VARCHAR(255),
                payment_reference VARCHAR(255),
                created_at TIMESTAMPTZ DEFAULT NOW()
            );
        `);

        await client.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (
                    SELECT 1
                    FROM information_schema.columns
                    WHERE table_name = 'btf-registration'
                    AND column_name = 'registration_id'
                ) THEN
                    ALTER TABLE "btf-registration" ADD COLUMN registration_id VARCHAR(100);
                END IF;

                IF NOT EXISTS (
                    SELECT 1
                    FROM information_schema.columns
                    WHERE table_name = 'btf-registration'
                    AND column_name = 'name'
                ) THEN
                    ALTER TABLE "btf-registration" ADD COLUMN name VARCHAR(255);
                END IF;

                IF NOT EXISTS (
                    SELECT 1
                    FROM information_schema.columns
                    WHERE table_name = 'btf-registration'
                    AND column_name = 'email'
                ) THEN
                    ALTER TABLE "btf-registration" ADD COLUMN email VARCHAR(255);
                END IF;

                IF NOT EXISTS (
                    SELECT 1
                    FROM information_schema.columns
                    WHERE table_name = 'btf-registration'
                    AND column_name = 'primary_interest'
                ) THEN
                    ALTER TABLE "btf-registration" ADD COLUMN primary_interest VARCHAR(255);
                END IF;

                IF NOT EXISTS (
                    SELECT 1
                    FROM information_schema.columns
                    WHERE table_name = 'btf-registration'
                    AND column_name = 'agreed_to_terms'
                ) THEN
                    ALTER TABLE "btf-registration" ADD COLUMN agreed_to_terms BOOLEAN DEFAULT FALSE;
                END IF;

                IF NOT EXISTS (
                    SELECT 1
                    FROM information_schema.columns
                    WHERE table_name = 'btf-registration'
                    AND column_name = 'ticket_type'
                ) THEN
                    ALTER TABLE "btf-registration" ADD COLUMN ticket_type VARCHAR(100);
                END IF;

                IF NOT EXISTS (
                    SELECT 1
                    FROM information_schema.columns
                    WHERE table_name = 'btf-registration'
                    AND column_name = 'first_name'
                ) THEN
                    ALTER TABLE "btf-registration" ADD COLUMN first_name VARCHAR(255);
                END IF;

                IF NOT EXISTS (
                    SELECT 1
                    FROM information_schema.columns
                    WHERE table_name = 'btf-registration'
                    AND column_name = 'last_name'
                ) THEN
                    ALTER TABLE "btf-registration" ADD COLUMN last_name VARCHAR(255);
                END IF;

                IF NOT EXISTS (
                    SELECT 1
                    FROM information_schema.columns
                    WHERE table_name = 'btf-registration'
                    AND column_name = 'phone'
                ) THEN
                    ALTER TABLE "btf-registration" ADD COLUMN phone VARCHAR(30);
                END IF;

                IF NOT EXISTS (
                    SELECT 1
                    FROM information_schema.columns
                    WHERE table_name = 'btf-registration'
                    AND column_name = 'country'
                ) THEN
                    ALTER TABLE "btf-registration" ADD COLUMN country VARCHAR(255);
                END IF;

                IF NOT EXISTS (
                    SELECT 1
                    FROM information_schema.columns
                    WHERE table_name = 'btf-registration'
                    AND column_name = 'nationality'
                ) THEN
                    ALTER TABLE "btf-registration" ADD COLUMN nationality VARCHAR(255);
                END IF;

                IF NOT EXISTS (
                    SELECT 1
                    FROM information_schema.columns
                    WHERE table_name = 'btf-registration'
                    AND column_name = 'community'
                ) THEN
                    ALTER TABLE "btf-registration" ADD COLUMN community VARCHAR(255);
                END IF;

                IF NOT EXISTS (
                    SELECT 1
                    FROM information_schema.columns
                    WHERE table_name = 'btf-registration'
                    AND column_name = 'payment_reference'
                ) THEN
                    ALTER TABLE "btf-registration" ADD COLUMN payment_reference VARCHAR(255);
                END IF;

                IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE table_name = 'btf-registration' AND constraint_type = 'UNIQUE' AND constraint_name = 'btf_registration_registration_id_key') THEN
                    ALTER TABLE "btf-registration" ADD CONSTRAINT "btf_registration_registration_id_key" UNIQUE (registration_id);
                END IF;

                IF NOT EXISTS (
                    SELECT 1
                    FROM pg_indexes
                    WHERE schemaname = current_schema()
                    AND indexname = 'btf_registration_email_unique_idx'
                ) THEN
                    CREATE UNIQUE INDEX "btf_registration_email_unique_idx"
                    ON "btf-registration" (LOWER(email));
                END IF;

                ALTER TABLE "btf-registration" ALTER COLUMN name DROP NOT NULL;
                ALTER TABLE "btf-registration" ALTER COLUMN email DROP NOT NULL;
                ALTER TABLE "btf-registration" ALTER COLUMN primary_interest DROP NOT NULL;
                ALTER TABLE "btf-registration" ALTER COLUMN ticket_type DROP NOT NULL;
                ALTER TABLE "btf-registration" ALTER COLUMN first_name DROP NOT NULL;
                ALTER TABLE "btf-registration" ALTER COLUMN last_name DROP NOT NULL;
                ALTER TABLE "btf-registration" ALTER COLUMN country DROP NOT NULL;
                ALTER TABLE "btf-registration" ALTER COLUMN nationality DROP NOT NULL;
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
            (name, email, primary_interest, agreed_to_terms, registration_id)
            VALUES 
            ($1, $2, $3, $4, $5)
            RETURNING id, registration_id, created_at;`,
            [name, emailAddress, primaryInterest, agreedToTerms, registrationId]
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
