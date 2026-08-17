import { Pool } from 'pg';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { NextRequest, NextResponse } from 'next/server';
import { getClientIp, checkRateLimit } from '@/app/lib/rateLimit';
import { sendExhibitorBriefEmail } from '@/app/lib/email';
import { rejectOversizedBody } from '@/app/lib/formSecurity';

// The form allows a 2 MiB logo. Allow room for multipart boundaries and form fields.
const MAX_EXHIBITION_REQUEST_BYTES = 3 * 1024 * 1024;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

// Cloudflare R2 configuration
async function uploadToR2(file: Buffer, filename: string, contentType: string): Promise<string> {
    const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
    const accessKeyId = process.env.CLOUDFLARE_ACCESS_KEY_ID;
    const secretAccessKey = process.env.CLOUDFLARE_SECRET_ACCESS_KEY;
    const bucketName = process.env.CLOUDFLARE_R2_BUCKET_NAME || 'benin-tech-fest-logos';

    if (!accountId || !accessKeyId || !secretAccessKey) {
        throw new Error('Missing Cloudflare R2 credentials');
    }

    const r2 = new S3Client({
        region: 'auto',
        endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
        credentials: {
            accessKeyId,
            secretAccessKey,
        },
    });

    await r2.send(new PutObjectCommand({
        Bucket: bucketName,
        Key: filename,
        Body: file,
        ContentType: contentType,
    }));

    const publicBaseUrl = process.env.CLOUDFLARE_R2_PUBLIC_URL?.trim().replace(/\/+$/, '');
    if (publicBaseUrl) {
        return `${publicBaseUrl.startsWith('http') ? publicBaseUrl : `https://${publicBaseUrl}`}/${filename}`;
    }

    // This endpoint is private unless public access is configured. Set
    // CLOUDFLARE_R2_PUBLIC_URL to an r2.dev or custom-domain URL for public logos.
    return `https://${accountId}.r2.cloudflarestorage.com/${bucketName}/${filename}`;
}

export async function POST(request: NextRequest) {
    const oversized = rejectOversizedBody(request, MAX_EXHIBITION_REQUEST_BYTES);
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
        const formData = await request.formData();
        
        const firstName = formData.get('firstName') as string;
        const lastName = formData.get('lastName') as string;
        const email = formData.get('email') as string;
        const phone = formData.get('phone') as string;
        const message = formData.get('message') as string;
        const companyName = formData.get('companyName') as string;
        const website = formData.get('website') as string;
        const exhibitionPackage = formData.get('exhibitionPackage') as string;
        const immediatePayment = formData.get('immediatePayment') as string;
        const logo = formData.get('logo') as File | null;

        // Validate required fields
        if (!firstName || !lastName || !email || !phone || !companyName || !exhibitionPackage) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        let logoUrl: string | null = null;

        // Upload logo to R2 if provided
        if (logo && logo.size > 0) {
            try {
                const buffer = await logo.arrayBuffer();
                const timestamp = Date.now();
                const filename = `logos/${timestamp}-${logo.name}`;
                logoUrl = await uploadToR2(Buffer.from(buffer), filename, logo.type);
            } catch (uploadError) {
                console.error('Error uploading logo to R2:', uploadError);
                // Continue without logo rather than failing the entire submission
            }
        }

        // Create table if it doesn't exist
        await client.query(`
            CREATE TABLE IF NOT EXISTS registration_exhibition (
                id SERIAL PRIMARY KEY,
                first_name VARCHAR(255) NOT NULL,
                last_name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                phone VARCHAR(20) NOT NULL,
                message TEXT,
                company_name VARCHAR(255) NOT NULL,
                website VARCHAR(255),
                exhibition_package VARCHAR(100) NOT NULL,
                immediate_payment VARCHAR(10),
                logo_url TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        // Earlier deployments created this column as an integer. Phone numbers are
        // identifiers, not quantities, and can exceed PostgreSQL's 32-bit integer range.
        await client.query(`
            DO $$
            BEGIN
                IF EXISTS (
                    SELECT 1
                    FROM information_schema.columns
                    WHERE table_schema = 'public'
                      AND table_name = 'registration_exhibition'
                      AND column_name = 'phone'
                      AND data_type <> 'character varying'
                ) THEN
                    ALTER TABLE registration_exhibition
                    ALTER COLUMN phone TYPE VARCHAR(20) USING phone::TEXT;
                END IF;
            END $$;
        `);

        // Insert the submission
        const result = await client.query(
            `INSERT INTO registration_exhibition 
            (first_name, last_name, email, phone, message, company_name, website, exhibition_package, immediate_payment, logo_url)
            VALUES 
            ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            RETURNING id, created_at;`,
            [firstName, lastName, email, phone, message || null, companyName, website || null, exhibitionPackage, immediatePayment || null, logoUrl]
        );

        await sendExhibitorBriefEmail({
                    name: `${firstName} ${lastName}`,
                    email,
                });
        return NextResponse.json(
            {
                success: true,
                message: 'Exhibition registration submitted successfully',
                id: result.rows[0].id
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error submitting exhibition registration:', error);
        return NextResponse.json(
            { error: 'Failed to submit registration' },
            { status: 500 }
        );
    } finally {
        client.release();
    }
}
