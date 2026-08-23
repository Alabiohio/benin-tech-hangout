import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, getClientIp } from '@/app/lib/rateLimit';
import { email, invalidFormResponse, readFormBody, rejectOversizedBody, requiredText } from '@/app/lib/formSecurity';

const TIER_AMOUNTS: Record<string, number> = {
  regular: 350000,
  standard: 1000000,
  business: 3500000,
  vip: 8500000,
};

export async function POST(request: NextRequest) {
  const oversized = rejectOversizedBody(request);
  if (oversized) return oversized;

  const rateLimit = checkRateLimit(getClientIp(request));
  if (!rateLimit.allowed) {
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429, headers: { 'Retry-After': String(rateLimit.retryAfter) } });
  }

  const data = await readFormBody(request);
  if (!data) return invalidFormResponse();

  const ticketType = requiredText(data.ticket_type, 100);
  const emailAddress = email(data.email);
  const firstName = requiredText(data.firstName);
  const lastName = requiredText(data.lastName);
  const parsedQuantity = typeof data.quantity === 'number' ? data.quantity : parseInt(String(data.quantity || '1'), 10);
  if (isNaN(parsedQuantity) || !Number.isInteger(parsedQuantity) || parsedQuantity <= 0 || parsedQuantity > 100) return invalidFormResponse();
  const quantity = parsedQuantity;
  
  const couponCode = typeof data.coupon_code === 'string' ? data.coupon_code.trim().toUpperCase() : null;
  const basePriceInKobo = ticketType ? TIER_AMOUNTS[ticketType] : undefined;
  
  if (!ticketType || !emailAddress || !firstName || !lastName || !basePriceInKobo) return invalidFormResponse();

  let amountInKobo = basePriceInKobo * quantity;

  if (couponCode) {
      try {
          const origin = request.nextUrl.origin;
          const validateRes = await fetch(`${origin}/api/coupons/validate`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                  code: couponCode,
                  email: emailAddress,
                  quantity,
                  original_price: basePriceInKobo / 100
              })
          });
          const validateData = await validateRes.json();
          if (validateRes.ok && validateData.valid) {
              amountInKobo = validateData.final_price_total * 100;
          } else {
              return NextResponse.json({ error: validateData.message || 'Invalid coupon code' }, { status: 400 });
          }
      } catch (err) {
          console.error('Coupon validation failed:', err);
          return NextResponse.json({ error: 'Failed to validate coupon' }, { status: 500 });
      }
  }

  const secret = process.env.PAYSTACK_SECRET_KEY;
  if (!secret) {
    console.error('PAYSTACK_SECRET_KEY is not configured');
    return NextResponse.json({ error: 'Payment is temporarily unavailable.' }, { status: 503 });
  }

  try {
    const response = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: { Authorization: `Bearer ${secret}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: emailAddress,
        amount: amountInKobo,
        currency: 'NGN',
        metadata: {
          ticket_type: ticketType,
          first_name: firstName,
          last_name: lastName,
          email: emailAddress,
          quantity,
        },
      }),
    });
    const result: unknown = await response.json();
    const accessCode = typeof result === 'object' && result && 'data' in result && typeof result.data === 'object' && result.data && 'access_code' in result.data && typeof result.data.access_code === 'string' ? result.data.access_code : null;
    if (!response.ok || !accessCode) {
      console.error('Paystack initialization failed', response.status);
      return NextResponse.json({ error: 'Unable to start payment. Please try again.' }, { status: 502 });
    }
    return NextResponse.json({ accessCode });
  } catch (error) {
    console.error('Paystack initialization error:', error);
    return NextResponse.json({ error: 'Unable to start payment. Please try again.' }, { status: 502 });
  }
}
