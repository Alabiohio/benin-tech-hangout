import { Pool } from 'pg';
import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, getClientIp } from '@/app/lib/rateLimit';
import { email, invalidFormResponse, readFormBody } from '@/app/lib/formSecurity';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

interface RedemptionRequest {
    coupon_code: string;
    email: string;
    ticket_id: string;
    pass_type: string;
    quantity: number;
    discount_amount: number;
    original_price: number;
    final_price: number;
}

interface RedemptionResponse {
    success: boolean;
    message: string;
    redemption_id?: number;
    error?: string;
}

export async function POST(request: NextRequest): Promise<NextResponse<RedemptionResponse>> {
    const oversized = (request.headers.get('content-length') || '0').length > 1024 * 100;
    if (oversized) return NextResponse.json({ success: false, message: 'Request body too large', error: 'Request size exceeds maximum' }, { status: 413 });

    const rateLimit = checkRateLimit(getClientIp(request));
    if (!rateLimit.allowed) {
        return NextResponse.json(
            { success: false, message: 'Too many requests', error: 'Rate limit exceeded' },
            { status: 429, headers: { 'Retry-After': String(rateLimit.retryAfter) } }
        );
    }

    try {
        const data = await readFormBody(request);
        if (!data) return NextResponse.json({ success: false, message: 'Invalid request', error: 'Request body is empty' }, { status: 400 });

        const couponCode = typeof data.coupon_code === 'string' ? data.coupon_code.trim().toUpperCase() : '';
        const userEmail = email(data.email);
        const ticketId = typeof data.ticket_id === 'string' ? data.ticket_id.trim() : '';
        const passType = typeof data.pass_type === 'string' ? data.pass_type.trim() : '';
        const quantity = typeof data.quantity === 'number' ? data.quantity : 1;
        const discountAmount = typeof data.discount_amount === 'number' ? data.discount_amount : 0;
        const originalPrice = typeof data.original_price === 'number' ? data.original_price : 0;
        const finalPrice = typeof data.final_price === 'number' ? data.final_price : 0;

        if (!couponCode || !userEmail || !ticketId) {
            return NextResponse.json(
                { success: false, message: 'Invalid input', error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const client = await pool.connect();
        try {
            // Fetch coupon
            const couponResult = await client.query(
                `SELECT id FROM coupons WHERE code = $1 AND is_active = true`,
                [couponCode]
            );

            if (couponResult.rows.length === 0) {
                return NextResponse.json(
                    { success: false, message: 'Coupon not found', error: 'Invalid coupon code' },
                    { status: 400 }
                );
            }

            const couponId = couponResult.rows[0].id;

            // Check if redemption already exists
            const existingRedemption = await client.query(
                `SELECT id FROM coupon_redemptions WHERE coupon_id = $1 AND email = $2 AND ticket_id = $3`,
                [couponId, userEmail, ticketId]
            );

            if (existingRedemption.rows.length > 0) {
                return NextResponse.json(
                    { success: false, message: 'This coupon has already been used for this ticket', error: 'Duplicate redemption' },
                    { status: 409 }
                );
            }

            // Record redemption
            const redemptionResult = await client.query(
                `INSERT INTO coupon_redemptions (coupon_id, email, ticket_id, discount_amount, original_price, final_price, pass_type, quantity)
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                 RETURNING id`,
                [couponId, userEmail, ticketId, discountAmount, originalPrice, finalPrice, passType, quantity]
            );

            const redemptionId = redemptionResult.rows[0].id;

            // Increment coupon's current_redemptions count
            await client.query(
                `UPDATE coupons SET current_redemptions = current_redemptions + 1 WHERE id = $1`,
                [couponId]
            );

            return NextResponse.json({
                success: true,
                message: 'Coupon successfully redeemed',
                redemption_id: redemptionId
            });
        } finally {
            client.release();
        }
    } catch (error) {
        console.error('Coupon redemption error:', error);
        return NextResponse.json(
            { success: false, message: 'An error occurred while recording the redemption', error: 'Server error' },
            { status: 500 }
        );
    }
}
