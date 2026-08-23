import { Pool } from 'pg';
import { NextRequest, NextResponse } from 'next/server';
import { getClientIp, checkRateLimit } from '@/app/lib/rateLimit';
import { sendSpeakerBriefEmail } from '@/app/lib/email';
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

    let client: any = null;

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
            why_speak,
            firstName,
            lastName,
            company,
            role,
            socialMedia,
            speakingCategory,
            areaOfInterest,
            hasExperience,
            previousEngagement,
            largestAudience,
            whySpeak,
            agreedToTerms,
        } = data;

        client = await pool.connect();

        const normalizedFirstName = typeof firstName === 'string' ? firstName.trim() : (typeof name === 'string' ? name.trim() : '');
        const normalizedLastName = typeof lastName === 'string' ? lastName.trim() : '';
        const normalizedEmail = typeof email === 'string' ? email.trim() : '';
        const normalizedPhone = typeof phone === 'string' ? phone.trim() : '';
        const normalizedCompany = typeof company === 'string' ? company.trim() : '';
        const normalizedRole = typeof role === 'string' ? role.trim() : '';
        const normalizedSocialMedia = Array.isArray(socialMedia) ? socialMedia.filter((entry) => typeof entry === 'string' && entry.trim().length > 0) : [];
        const normalizedSpeakingCategory = typeof speakingCategory === 'string' ? speakingCategory.trim() : (typeof speaker_category === 'string' ? speaker_category.trim() : '');
        const normalizedAreaOfInterest = typeof areaOfInterest === 'string' ? areaOfInterest.trim() : '';
        const normalizedHasExperience = hasExperience === 'Yes' || hasExperience === true || hasExperience === 'true';
        const normalizedPreviousEngagement = typeof previousEngagement === 'string' ? previousEngagement.trim() : (typeof speaker_name === 'string' ? speaker_name.trim() : '');
        const normalizedLargestAudience = typeof largestAudience === 'string' ? largestAudience.trim() : '';
        const normalizedWhySpeak = typeof whySpeak === 'string' ? whySpeak.trim() : (typeof why_speak === 'string' ? why_speak.trim() : '');
        const normalizedAgreedToTerms = Boolean(agreedToTerms);

        if (!normalizedFirstName || !normalizedLastName || !normalizedEmail || !normalizedPhone || !normalizedSpeakingCategory || !normalizedAreaOfInterest || !normalizedWhySpeak) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        await client.query(`
            CREATE TABLE IF NOT EXISTS "registration-speakers" (
                id SERIAL PRIMARY KEY,
                first_name VARCHAR(255) NOT NULL,
                last_name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                phone VARCHAR(30) NOT NULL,
                company VARCHAR(255),
                role VARCHAR(255),
                social_media TEXT[],
                speaking_category VARCHAR(255),
                area_of_interest VARCHAR(255),
                has_experience BOOLEAN,
                previous_engagement TEXT,
                largest_audience VARCHAR(255),
                why_speak TEXT NOT NULL,
                agreed_to_terms BOOLEAN DEFAULT FALSE,
                created_at TIMESTAMPTZ DEFAULT NOW()
            );
        `);

        const result = await client.query(
            `INSERT INTO "registration-speakers"
            (first_name, last_name, email, phone, company, role, social_media, speaking_category, area_of_interest, has_experience, previous_engagement, largest_audience, why_speak, agreed_to_terms)
            VALUES
            ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
            RETURNING id, created_at;`,
            [
                normalizedFirstName,
                normalizedLastName,
                normalizedEmail,
                normalizedPhone,
                normalizedCompany || null,
                normalizedRole || null,
                normalizedSocialMedia.length > 0 ? normalizedSocialMedia : null,
                normalizedSpeakingCategory,
                normalizedAreaOfInterest,
                normalizedHasExperience,
                normalizedHasExperience ? (normalizedPreviousEngagement || null) : null,
                normalizedHasExperience ? (normalizedLargestAudience || null) : null,
                normalizedWhySpeak,
                normalizedAgreedToTerms,
            ]
        );

        await sendSpeakerBriefEmail({
            name: `${normalizedFirstName} ${normalizedLastName}`.trim(),
            email: normalizedEmail,
            speakingCategory: normalizedSpeakingCategory,
            areaOfInterest: normalizedAreaOfInterest,
        });

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
        if (client) {
            client.release();
        }
    }
}
