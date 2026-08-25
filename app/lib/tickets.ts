import type { PoolClient } from 'pg';
import { randomUUID } from 'crypto';

export interface TicketInsertInput {
  registrationId: string;
  ticketType: string;
  firstName: string;
  lastName: string;
  email: string;
  paymentReference: string;
  quantity: number;
}

export async function ensureTicketTable(client: PoolClient) {
  await client.query(`
    CREATE TABLE IF NOT EXISTS ticket_registrations (
      id BIGSERIAL PRIMARY KEY,
      ticket_id VARCHAR(100) NOT NULL UNIQUE,
      registration_id VARCHAR(100),
      ticket_type VARCHAR(100) NOT NULL,
      first_name VARCHAR(255) NOT NULL,
      last_name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      payment_reference VARCHAR(255) NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
    ALTER TABLE ticket_registrations
      ADD COLUMN IF NOT EXISTS ticket_id VARCHAR(100),
      ADD COLUMN IF NOT EXISTS registration_id VARCHAR(100),
      ADD COLUMN IF NOT EXISTS ticket_type VARCHAR(100),
      ADD COLUMN IF NOT EXISTS first_name VARCHAR(255),
      ADD COLUMN IF NOT EXISTS last_name VARCHAR(255),
      ADD COLUMN IF NOT EXISTS email VARCHAR(255),
      ADD COLUMN IF NOT EXISTS payment_reference VARCHAR(255),
      ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW();
    ALTER TABLE ticket_registrations
      DROP COLUMN IF EXISTS phone,
      DROP COLUMN IF EXISTS nationality,
      DROP COLUMN IF EXISTS country,
      DROP COLUMN IF EXISTS community;
    CREATE UNIQUE INDEX IF NOT EXISTS ticket_registrations_ticket_id_idx
      ON ticket_registrations (ticket_id);
    CREATE INDEX IF NOT EXISTS ticket_registrations_email_idx
      ON ticket_registrations (LOWER(email));
    CREATE INDEX IF NOT EXISTS ticket_registrations_payment_reference_idx
      ON ticket_registrations (payment_reference);
  `);
}

export function generateTicketId(): string {
  return `BTF-TKT-${randomUUID().replace(/-/g, '').slice(0, 16).toUpperCase()}`;
}

export async function insertTickets(client: PoolClient, input: TicketInsertInput) {
  const ticketIds = Array.from({ length: input.quantity }, generateTicketId);
  const values: unknown[] = [];
  const rows = ticketIds.map((ticketId, index) => {
    const offset = index * 7;
    values.push(
      ticketId,
      input.registrationId,
      input.ticketType,
      input.firstName,
      input.lastName,
      input.email,
      input.paymentReference,
    );
    return `($${offset + 1}, $${offset + 2}, $${offset + 3}, $${offset + 4}, $${offset + 5}, $${offset + 6}, $${offset + 7})`;
  });

  const result = await client.query(
    `INSERT INTO ticket_registrations
      (ticket_id, registration_id, ticket_type, first_name, last_name, email, payment_reference)
     VALUES ${rows.join(', ')}
     RETURNING id, ticket_id, registration_id, created_at;`,
    values,
  );

  return result.rows as Array<{ id: number; ticket_id: string; registration_id: string; created_at: Date }>;
}
