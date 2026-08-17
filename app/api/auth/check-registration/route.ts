import { Pool } from 'pg';
import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, getClientIp } from '@/app/lib/rateLimit';
import { email } from '@/app/lib/formSecurity';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

interface RegistrationCheckResponse {
    registered: boolean;
    user?: {
        name: string;
        email: string;
    };
    message: string;
}

export async function GET(request: NextRequest): Promise<NextResponse<RegistrationCheckResponse>> {
    const rateLimit = checkRateLimit(getClientIp(request));
    if (!rateLimit.allowed) {
        return NextResponse.json(
            { registered: false, message: 'Rate limit exceeded' },
            { status: 429, headers: { 'Retry-After': String(rateLimit.retryAfter) } }
        );
    }

    try {
        const userEmail = request.nextUrl.searchParams.get('email');

        if (!userEmail) {
            return NextResponse.json(
                { registered: false, message: 'Email parameter is required' },
                { status: 400 }
            );
        }

        const validatedEmail = email(userEmail);
        if (!validatedEmail) {
            return NextResponse.json(
                { registered: false, message: 'Invalid email format' },
                { status: 400 }
            );
        }

        const client = await pool.connect();
        try {
            // Check if email exists in registration table
            const result = await client.query(
                `SELECT
                    COALESCE(name, CONCAT_WS(' ', first_name, last_name)) AS name,
                    email
                 FROM "btf-registration"
                 WHERE LOWER(email) = LOWER($1)
                 LIMIT 1`,
                [validatedEmail]
            );

            if (result.rows.length > 0) {
                const user = result.rows[0];
                return NextResponse.json({
                    registered: true,
                    user: {
                        name: user.name || 'Registered attendee',
                        email: user.email
                    },
                    message: 'Email is registered'
                });
            } else {
                return NextResponse.json({
                    registered: false,
                    message: 'Email is not registered'
                });
            }
        } finally {
            client.release();
        }
    } catch (error) {
        console.error('Registration check error:', error);
        return NextResponse.json(
            { registered: false, message: 'An error occurred while checking registration' },
            { status: 500 }
        );
    }
}
