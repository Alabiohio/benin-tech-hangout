import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, getClientIp } from '@/app/lib/rateLimit';
import { email, invalidFormResponse, readFormBody, rejectOversizedBody, requiredText } from '@/app/lib/formSecurity';

const TIER_AMOUNTS: Record<string, number> = {
  explorer: 350000,
  builders: 1000000,
  founders: 2000000,
  vip: 5000000,
  investors: 20000000,
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
  if (!ticketType || !emailAddress || !firstName || !lastName || !TIER_AMOUNTS[ticketType]) return invalidFormResponse();

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
        amount: TIER_AMOUNTS[ticketType],
        currency: 'NGN',
        metadata: { ticket_type: ticketType, first_name: firstName, last_name: lastName },
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
