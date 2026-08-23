import crypto from 'crypto';
import { Pool } from 'pg';
import { sendTicketConfirmationEmail } from '@/app/lib/email';

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
  vip: 5000000,
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
    const phoneNumber = toSafeString(metadata.phone || data.customer?.phone_number || data.customer?.phone);
    const country = toSafeString(metadata.country || data.customer?.country || 'Nigeria');
    const nationality = toSafeString(metadata.nationality || 'Nigerian');
    const community = toSafeString(metadata.community || '');

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
      await client.query(`
        CREATE TABLE IF NOT EXISTS "btf-registration" (
          id SERIAL PRIMARY KEY,
          ticket_type VARCHAR(100),
          first_name VARCHAR(255),
          last_name VARCHAR(255),
          email VARCHAR(255),
          phone VARCHAR(30),
          country VARCHAR(255),
          nationality VARCHAR(255),
          community VARCHAR(255),
          payment_reference VARCHAR(255),
          name VARCHAR(255),
          primary_interest VARCHAR(255),
          agreed_to_terms BOOLEAN DEFAULT FALSE,
          created_at TIMESTAMPTZ DEFAULT NOW()
        );
      `);

      await client.query(`
        DO $$
        BEGIN
          IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'btf-registration' AND column_name = 'ticket_type') THEN
            ALTER TABLE "btf-registration" ADD COLUMN ticket_type VARCHAR(100);
          END IF;
          IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'btf-registration' AND column_name = 'first_name') THEN
            ALTER TABLE "btf-registration" ADD COLUMN first_name VARCHAR(255);
          END IF;
          IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'btf-registration' AND column_name = 'last_name') THEN
            ALTER TABLE "btf-registration" ADD COLUMN last_name VARCHAR(255);
          END IF;
          IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'btf-registration' AND column_name = 'email') THEN
            ALTER TABLE "btf-registration" ADD COLUMN email VARCHAR(255);
          END IF;
          IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'btf-registration' AND column_name = 'phone') THEN
            ALTER TABLE "btf-registration" ADD COLUMN phone VARCHAR(30);
          END IF;
          IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'btf-registration' AND column_name = 'country') THEN
            ALTER TABLE "btf-registration" ADD COLUMN country VARCHAR(255);
          END IF;
          IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'btf-registration' AND column_name = 'nationality') THEN
            ALTER TABLE "btf-registration" ADD COLUMN nationality VARCHAR(255);
          END IF;
          IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'btf-registration' AND column_name = 'community') THEN
            ALTER TABLE "btf-registration" ADD COLUMN community VARCHAR(255);
          END IF;
          IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'btf-registration' AND column_name = 'payment_reference') THEN
            ALTER TABLE "btf-registration" ADD COLUMN payment_reference VARCHAR(255);
          END IF;
          IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'btf-registration' AND column_name = 'name') THEN
            ALTER TABLE "btf-registration" ADD COLUMN name VARCHAR(255);
          END IF;
          IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'btf-registration' AND column_name = 'primary_interest') THEN
            ALTER TABLE "btf-registration" ADD COLUMN primary_interest VARCHAR(255);
          END IF;
          IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'btf-registration' AND column_name = 'agreed_to_terms') THEN
            ALTER TABLE "btf-registration" ADD COLUMN agreed_to_terms BOOLEAN DEFAULT FALSE;
          END IF;
        END $$;
      `);

      const existingRegistration = await client.query(
        'SELECT id FROM "btf-registration" WHERE payment_reference = $1 LIMIT 1',
        [paymentReference]
      );

      if (existingRegistration.rowCount && existingRegistration.rows[0]) {
        return { status: 200, message: 'Webhook already processed' };
      }

      const registration = await client.query(
        `INSERT INTO "btf-registration"
         (ticket_type, first_name, last_name, email, phone, country, nationality, community, payment_reference, name, primary_interest, agreed_to_terms)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
         RETURNING id`,
        [
          ticketType,
          firstName,
          lastName,
          emailAddress,
          phoneNumber || null,
          country || 'Nigeria',
          nationality || 'Nigerian',
          community || null,
          paymentReference,
          `${firstName} ${lastName}`.trim() || null,
          null,
          false,
        ]
      );

      const ticketLabel = TIER_LABELS[ticketType] || ticketType;
      await sendTicketConfirmationEmail({
        firstName,
        lastName,
        email: emailAddress,
        ticketType,
        ticketLabel,
        paymentReference,
        quantity,
        registrationId: registration.rows[0]?.id,
        totalPaid: expectedAmount,
      }).catch((err) => console.error('Failed to send ticket confirmation email from webhook:', err));

      console.log(`Paystack webhook confirmed and ticket saved for ${emailAddress} (${paymentReference})`);
      return { status: 200, message: 'Payment confirmed and ticket issued' };
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Paystack webhook error:', error);
    return { status: 500, message: 'Webhook processing failed' };
  }
}
