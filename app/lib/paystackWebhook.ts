import crypto from 'crypto';
import { Pool } from 'pg';
import { sendTicketConfirmationEmail } from '@/app/lib/email';
import { generateRegistrationId } from '@/app/lib/registration';
import { ensureTicketTable, insertTickets } from '@/app/lib/tickets';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const TIER_LABELS: Record<string, string> = {
  explorer: 'Explorer Pass',
  builders: 'Builders Pass',
  founders: 'Founders Pass',
  vip: 'VIP Pass',
  investors: 'Investors Pass',
  regular: 'Regular Pass',
  standard: 'Standard Pass',
  business: 'Business Pass',
};

const TIER_AMOUNTS: Record<string, number> = {
  explorer: 350000,
  builders: 1000000,
  founders: 2000000,
  vip: 8500000,
  investors: 20000000,
  regular: 350000,
  standard: 1000000,
  business: 3500000,
};

function toSafeString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function toSafeNumber(value: unknown, fallback = 1): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export async function verifyPaystackWebhookSignature(body: string, signature: string | null): Promise<boolean> {
  const secret = process.env.PAYSTACK_SECRET_KEY;
  if (!secret) {
    throw new Error('PAYSTACK_SECRET_KEY is not defined');
  }

  if (!signature || !/^[a-f0-9]{128}$/i.test(signature)) {
    return false;
  }

  const expectedSignature = crypto.createHmac('sha512', secret).update(body).digest('hex');

  try {
    return crypto.timingSafeEqual(
      Buffer.from(signature, 'hex'),
      Buffer.from(expectedSignature, 'hex')
    );
  } catch {
    return false;
  }
}

export async function processPaystackWebhook(body: string, signature: string | null): Promise<{ status: number; message: string }> {
  try {
    const secret = process.env.PAYSTACK_SECRET_KEY;
    if (!secret) {
      console.error('PAYSTACK_SECRET_KEY is not defined');
      return { status: 500, message: 'Internal Server Error' };
    }

    const isValidSignature = await verifyPaystackWebhookSignature(body, signature);
    if (!isValidSignature) {
      console.warn('Invalid Paystack Webhook Signature');
      return { status: 400, message: 'Invalid signature' };
    }

    let event: any;
    try {
      event = JSON.parse(body);
    } catch {
      return { status: 400, message: 'Invalid JSON payload' };
    }

    const eventName = event?.event;
    const status = event?.data?.status;
    if ((eventName !== 'charge.success' && eventName !== 'transaction.success') || status !== 'success') {
      return { status: 200, message: 'Webhook ignored' };
    }

    const data = event?.data ?? {};
    const metadata = data.metadata ?? {};
    const paymentReference = toSafeString(data.reference);
    const ticketType = toSafeString(metadata.ticket_type);
    const quantity = toSafeNumber(metadata.quantity, 1);
    const firstName = toSafeString(metadata.first_name || data.customer?.first_name);
    const lastName = toSafeString(metadata.last_name || data.customer?.last_name);
    const emailAddress = toSafeString(metadata.email || data.customer?.email);
    const existingRegistrationId = toSafeString(metadata.registration_id || metadata.registrationId || '');

    const expectedAmount = (TIER_AMOUNTS[ticketType] || 0) * quantity;

    if (!paymentReference || !ticketType || !TIER_AMOUNTS[ticketType]) {
      console.warn('Rejected Paystack webhook: missing ticket details');
      return { status: 200, message: 'Webhook ignored' };
    }

    if (!firstName || !lastName || !emailAddress) {
      console.warn(`Rejected Paystack webhook for ${paymentReference}: missing customer details`);
      return { status: 200, message: 'Webhook ignored' };
    }

    if (data.currency !== 'NGN' || Number(data.amount) !== expectedAmount) {
      console.warn(`Rejected Paystack webhook for ${paymentReference}: invalid amount or currency`);
      return { status: 200, message: 'Webhook ignored' };
    }

    const client = await pool.connect();
    try {
      await ensureTicketTable(client);

      await client.query('BEGIN');
      await client.query('SELECT pg_advisory_xact_lock(hashtext($1))', [paymentReference]);

      const existingRegistration = await client.query(
        'SELECT id, ticket_id, registration_id FROM ticket_registrations WHERE payment_reference = $1 ORDER BY id LIMIT 1',
        [paymentReference]
      );

      if (existingRegistration.rowCount && existingRegistration.rows[0]) {
        await client.query('ROLLBACK');
        return { status: 200, message: 'Webhook already processed' };
      }

      const registrationId = existingRegistrationId || generateRegistrationId();

      const tickets = await insertTickets(client, {
        registrationId,
        ticketType,
        firstName,
        lastName,
        email: emailAddress,
        paymentReference,
        quantity,
      });
      await client.query('COMMIT');

      const ticketLabel = TIER_LABELS[ticketType] || ticketType;
      const emailSent = await sendTicketConfirmationEmail({
        firstName,
        lastName,
        email: emailAddress,
        ticketType,
        ticketLabel,
        paymentReference,
        quantity,
        registrationId: tickets[0]?.ticket_id,
        totalPaid: expectedAmount,
      });

      if (!emailSent) {
        console.warn(`Webhook ticket saved for ${emailAddress} (${paymentReference}), but the confirmation email failed to send.`);
      }

      console.log(`Paystack webhook confirmed and ${tickets.length} ticket(s) saved for ${emailAddress} (${paymentReference})`);
      return { status: 200, message: 'Payment confirmed and ticket issued' };
    } finally {
      try { await client.query('ROLLBACK'); } catch {}
      client.release();
    }
  } catch (error) {
    console.error('Paystack webhook error:', error);
    return { status: 500, message: 'Webhook processing failed' };
  }
}
