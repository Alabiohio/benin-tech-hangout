/**
 * Coupon Utilities
 * Helper functions for validating and redeeming coupons
 */

export interface CouponData {
    code: string;
    discount_type: 'PERCENTAGE' | 'FIXED_AMOUNT';
    discount_value: number;
    description: string;
}

export interface CouponValidationResult {
    valid: boolean;
    coupon?: CouponData;
    discount_amount: number;
    final_price: number;
    final_price_total: number;
    message: string;
    error?: string;
}

export interface CouponRedemptionResult {
    success: boolean;
    message: string;
    redemption_id?: number;
    error?: string;
}

export interface RegistrationCheckResult {
    registered: boolean;
    user?: {
        name: string;
        email: string;
    };
    message: string;
}

/**
 * Check if an email is registered
 */
export async function checkRegistration(email: string): Promise<RegistrationCheckResult> {
    try {
        const response = await fetch(`/api/auth/check-registration?email=${encodeURIComponent(email)}`);
        if (!response.ok) {
            const data = await response.json();
            return data;
        }
        return await response.json();
    } catch (error) {
        console.error('Error checking registration:', error);
        return {
            registered: false,
            message: 'Failed to check registration'
        };
    }
}

/**
 * Validate a coupon code
 */
export async function validateCoupon(
    code: string,
    email: string,
    quantity: number = 1,
    originalPrice: number
): Promise<CouponValidationResult> {
    try {
        const response = await fetch('/api/coupons/validate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                code,
                email,
                quantity,
                original_price: originalPrice,
            }),
        });

        const data = await response.json();
        if (!response.ok) {
            return {
                valid: false,
                discount_amount: 0,
                final_price: originalPrice,
                final_price_total: originalPrice * quantity,
                message: data.message || 'Coupon validation failed',
                error: data.error,
            };
        }
        return data;
    } catch (error) {
        console.error('Error validating coupon:', error);
        return {
            valid: false,
            discount_amount: 0,
            final_price: originalPrice,
            final_price_total: originalPrice * quantity,
            message: 'Failed to validate coupon',
            error: 'Network error',
        };
    }
}

/**
 * Redeem a coupon after successful payment
 */
export async function redeemCoupon(
    couponCode: string,
    email: string,
    ticketId: string,
    passType: string,
    quantity: number,
    discountAmount: number,
    originalPrice: number,
    finalPrice: number
): Promise<CouponRedemptionResult> {
    try {
        const response = await fetch('/api/coupons/redeem', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                coupon_code: couponCode,
                email,
                ticket_id: ticketId,
                pass_type: passType,
                quantity,
                discount_amount: discountAmount,
                original_price: originalPrice,
                final_price: finalPrice,
            }),
        });

        const data = await response.json();
        if (!response.ok) {
            return {
                success: false,
                message: data.message || 'Redemption failed',
                error: data.error,
            };
        }
        return data;
    } catch (error) {
        console.error('Error redeeming coupon:', error);
        return {
            success: false,
            message: 'Failed to redeem coupon',
            error: 'Network error',
        };
    }
}

/**
 * Format discount message
 */
export function formatDiscountMessage(coupon: CouponData, discountAmount: number): string {
    if (coupon.discount_type === 'PERCENTAGE') {
        return `${coupon.discount_value}% off`;
    } else {
        return `₦${discountAmount.toLocaleString()} off`;
    }
}

/**
 * Format price
 */
export function formatPrice(price: number): string {
    return `₦${price.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}
