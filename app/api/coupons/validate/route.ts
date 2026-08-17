import { Pool } from 'pg';
import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, getClientIp } from '@/app/lib/rateLimit';
import { email, invalidFormResponse, readFormBody } from '@/app/lib/formSecurity';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

interface CouponValidationRequest {
    code: string;
    email: string;
    quantity: number;
    original_price: number;
}

interface CouponValidationResponse {
    valid: boolean;
    coupon?: {
        code: string;
        discount_type: 'PERCENTAGE' | 'FIXED_AMOUNT';
        discount_value: number;
        description: string;
    };
    discount_amount: number;
    final_price: number;
    final_price_total: number;
    message: string;
    error?: string;
}

export async function POST(request: NextRequest): Promise<NextResponse<CouponValidationResponse>> {
    const oversized = (request.headers.get('content-length') || '0').length > 1024 * 100;
    if (oversized) return NextResponse.json({ valid: false, discount_amount: 0, final_price: 0, final_price_total: 0, message: 'Request body too large', error: 'Request body exceeds maximum size' }, { status: 413 });

    const rateLimit = checkRateLimit(getClientIp(request));
    if (!rateLimit.allowed) {
        return NextResponse.json(
            { valid: false, discount_amount: 0, final_price: 0, final_price_total: 0, message: 'Too many requests', error: 'Rate limit exceeded' },
            { status: 429, headers: { 'Retry-After': String(rateLimit.retryAfter) } }
        );
    }

    try {
        const data = await readFormBody(request);
        if (!data) return NextResponse.json({ valid: false, discount_amount: 0, final_price: 0, final_price_total: 0, message: 'Invalid request', error: 'Request body is empty or invalid' }, { status: 400 });

        const code = typeof data.code === 'string' ? data.code.trim().toUpperCase() : '';
        const userEmail = email(data.email);
        const quantity = typeof data.quantity === 'number' ? data.quantity : 1;
        const originalPrice = typeof data.original_price === 'number' ? data.original_price : 0;

        if (!code || !userEmail || !originalPrice || quantity <= 0) {
            return NextResponse.json(
                { valid: false, discount_amount: 0, final_price: 0, final_price_total: 0, message: 'Invalid input', error: 'Missing or invalid required fields' },
                { status: 400 }
            );
        }

        const client = await pool.connect();
        try {
            // Create tables if they don't exist
            await client.query(`
                CREATE TABLE IF NOT EXISTS coupons (
                    id SERIAL PRIMARY KEY,
                    code VARCHAR(50) UNIQUE NOT NULL,
                    description TEXT,
                    discount_type VARCHAR(20) NOT NULL CHECK (discount_type IN ('PERCENTAGE', 'FIXED_AMOUNT')),
                    discount_value DECIMAL(10, 2) NOT NULL,
                    applicable_to_all_passes BOOLEAN DEFAULT true,
                    valid_from TIMESTAMPTZ,
                    valid_until TIMESTAMPTZ,
                    max_total_redemptions INT,
                    current_redemptions INT DEFAULT 0,
                    max_redemptions_per_user INT DEFAULT 1,
                    requires_registration BOOLEAN DEFAULT true,
                    is_active BOOLEAN DEFAULT true,
                    created_at TIMESTAMPTZ DEFAULT NOW(),
                    updated_at TIMESTAMPTZ DEFAULT NOW()
                );
            `);

            await client.query(`
                CREATE TABLE IF NOT EXISTS coupon_redemptions (
                    id SERIAL PRIMARY KEY,
                    coupon_id INT REFERENCES coupons(id),
                    email VARCHAR(255) NOT NULL,
                    ticket_id VARCHAR(255),
                    discount_amount DECIMAL(10, 2),
                    original_price DECIMAL(10, 2),
                    final_price DECIMAL(10, 2),
                    pass_type VARCHAR(50),
                    quantity INT DEFAULT 1,
                    created_at TIMESTAMPTZ DEFAULT NOW(),
                    UNIQUE(coupon_id, email, ticket_id)
                );
            `);

            // Fetch coupon
            const couponResult = await client.query(
                `SELECT * FROM coupons WHERE code = $1 AND is_active = true`,
                [code]
            );

            if (couponResult.rows.length === 0) {
                return NextResponse.json({
                    valid: false,
                    discount_amount: 0,
                    final_price: originalPrice,
                    final_price_total: originalPrice * quantity,
                    message: 'Coupon code not found or inactive',
                    error: 'Invalid coupon code'
                }, { status: 400 });
            }

            const coupon = couponResult.rows[0];
            const now = new Date();

            // Validate coupon expiry
            if (coupon.valid_from && new Date(coupon.valid_from) > now) {
                return NextResponse.json({
                    valid: false,
                    discount_amount: 0,
                    final_price: originalPrice,
                    final_price_total: originalPrice * quantity,
                    message: 'Coupon is not yet valid',
                    error: 'This coupon starts on a future date'
                }, { status: 400 });
            }

            if (coupon.valid_until && new Date(coupon.valid_until) < now) {
                return NextResponse.json({
                    valid: false,
                    discount_amount: 0,
                    final_price: originalPrice,
                    final_price_total: originalPrice * quantity,
                    message: 'Coupon has expired',
                    error: 'This coupon is no longer valid'
                }, { status: 400 });
            }

            // Check total redemption limit
            if (coupon.max_total_redemptions && coupon.current_redemptions >= coupon.max_total_redemptions) {
                return NextResponse.json({
                    valid: false,
                    discount_amount: 0,
                    final_price: originalPrice,
                    final_price_total: originalPrice * quantity,
                    message: 'Coupon redemption limit reached',
                    error: 'This coupon has reached its redemption limit'
                }, { status: 400 });
            }

            // Check per-user redemption limit
            if (coupon.max_redemptions_per_user && coupon.max_redemptions_per_user > 0) {
                const userRedemptions = await client.query(
                    `SELECT COUNT(*) as count FROM coupon_redemptions WHERE coupon_id = $1 AND email = $2`,
                    [coupon.id, userEmail]
                );
                const userCount = parseInt(userRedemptions.rows[0].count, 10);
                if (userCount >= coupon.max_redemptions_per_user) {
                    return NextResponse.json({
                        valid: false,
                        discount_amount: 0,
                        final_price: originalPrice,
                        final_price_total: originalPrice * quantity,
                        message: `You have reached the maximum uses for this coupon (${coupon.max_redemptions_per_user} use(s))`,
                        error: 'Maximum per-user redemptions reached'
                    }, { status: 400 });
                }
            }

            // Check registration requirement
            if (coupon.requires_registration) {
                const registrationCheck = await client.query(
                    `SELECT id FROM "btf-registration" WHERE email = $1 LIMIT 1`,
                    [userEmail]
                );

                if (registrationCheck.rows.length === 0) {
                    return NextResponse.json({
                        valid: false,
                        discount_amount: 0,
                        final_price: originalPrice,
                        final_price_total: originalPrice * quantity,
                        message: 'You must be registered to use this coupon',
                        error: 'Email not registered'
                    }, { status: 400 });
                }
            }

            // Calculate discount
            let discountAmount = 0;
            if (coupon.discount_type === 'PERCENTAGE') {
                discountAmount = (originalPrice * coupon.discount_value) / 100;
            } else if (coupon.discount_type === 'FIXED_AMOUNT') {
                discountAmount = coupon.discount_value;
            }

            // Ensure discount doesn't exceed price
            discountAmount = Math.min(discountAmount, originalPrice);

            const finalPrice = Math.max(0, originalPrice - discountAmount);
            const finalPriceTotal = finalPrice * quantity;

            return NextResponse.json({
                valid: true,
                coupon: {
                    code: coupon.code,
                    discount_type: coupon.discount_type,
                    discount_value: parseFloat(coupon.discount_value),
                    description: coupon.description || 'Discount applied'
                },
                discount_amount: Math.round(discountAmount * 100) / 100,
                final_price: Math.round(finalPrice * 100) / 100,
                final_price_total: Math.round(finalPriceTotal * 100) / 100,
                message: `Coupon applied successfully! You saved ₦${Math.round(discountAmount * 100) / 100}`
            });
        } finally {
            client.release();
        }
    } catch (error) {
        console.error('Coupon validation error:', error);
        return NextResponse.json({
            valid: false,
            discount_amount: 0,
            final_price: 0,
            final_price_total: 0,
            message: 'An error occurred while validating the coupon',
            error: 'Server error'
        }, { status: 500 });
    }
}
