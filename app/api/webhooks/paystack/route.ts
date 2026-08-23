import { NextRequest, NextResponse } from 'next/server';
import { processPaystackWebhook } from '@/app/lib/paystackWebhook';

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get('x-paystack-signature');

    const result = await processPaystackWebhook(body, signature);

    return NextResponse.json(
      { status: result.status === 200 ? 'success' : 'error', message: result.message },
      { status: result.status }
    );
  } catch (error) {
    console.error('Paystack webhook route error:', error);
    return NextResponse.json({ status: 'error', message: 'Webhook processing failed' }, { status: 500 });
  }
}
