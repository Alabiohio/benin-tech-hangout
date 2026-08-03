import { Pool } from 'pg';
import { NextRequest, NextResponse } from 'next/server';
import { email, invalidFormResponse, readFormBody, rejectOversizedBody } from '@/app/lib/formSecurity';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const TIER_LABELS: Record<string, string> = {
    explorer: 'Explorer Pass',
    builders: 'Builders Pass',
    founders: 'Founders Pass',
    vip: 'VIP Pass',
    investors: 'Investors Pass',
};

function toBadgeItem(row: any, source: string) {
    const fullName = source === 'registration'
        ? row.name
        : source === 'free-pass'
            ? (row.name || `${[row.first_name, row.last_name].filter(Boolean).join(' ')}`.trim())
            : `${[row.first_name, row.last_name].filter(Boolean).join(' ')}`.trim();

    return {
        source,
        id: row.id,
        fullName: fullName || row.email || 'Attendee',
        ticketType: source === 'ticket'
            ? (TIER_LABELS[row.ticket_type] || row.ticket_type || 'Ticket Registration')
            : source === 'free-pass'
                ? 'Community Pass'
                : 'Registration',
        email: row.email,
        createdAt: row.created_at?.toISOString?.() || row.created_at,
    };
}

export async function POST(request: NextRequest) {
    const oversized = rejectOversizedBody(request);
    if (oversized) return oversized;

    try {
        const data = await readFormBody(request);
        if (!data) return invalidFormResponse();
        const emailAddress = email(data.email);
        if (!emailAddress) return invalidFormResponse();

        const normalizedEmail = emailAddress.trim().toLowerCase();
        const source = typeof data.source === 'string' ? data.source.trim() : '';
        const id = data.id ? Number(data.id) : undefined;

        const client = await pool.connect();
        try {
            const tableExists = async (tableName: string) => {
                const result = await client.query(
                    `SELECT EXISTS (
                        SELECT 1 FROM information_schema.tables
                        WHERE table_schema = current_schema()
                        AND table_name = $1
                    );`,
                    [tableName]
                );
                return result.rows[0]?.exists === true;
            };

            const hasTicketTable = await tableExists('ticket_registrations');
            const hasFreePassTable = await tableExists('free_pass_registrations');
            const hasRegistrationTable = await tableExists('registration_submissions');

            const hasFreePassNameColumn = hasFreePassTable
                ? (await client.query(`SELECT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = current_schema() AND table_name = 'free_pass_registrations' AND column_name = 'name');`)).rows[0]?.exists === true
                : false;

            if (source && id) {
                let row = null;
                if (source === 'ticket' && hasTicketTable) {
                    row = (await client.query(
                        `SELECT id, first_name, last_name, ticket_type, email, created_at FROM ticket_registrations WHERE id = $1 AND LOWER(email) = LOWER($2) LIMIT 1;`,
                        [id, normalizedEmail]
                    )).rows[0];
                } else if (source === 'free-pass' && hasFreePassTable) {
                    row = (await client.query(
                        `SELECT id, first_name, last_name, ${hasFreePassNameColumn ? 'name,' : ''} email, created_at FROM free_pass_registrations WHERE id = $1 AND LOWER(email) = LOWER($2) LIMIT 1;`,
                        [id, normalizedEmail]
                    )).rows[0];
                } else if (source === 'registration' && hasRegistrationTable) {
                    row = (await client.query(
                        `SELECT id, name, email, created_at FROM registration_submissions WHERE id = $1 AND LOWER(email) = LOWER($2) LIMIT 1;`,
                        [id, normalizedEmail]
                    )).rows[0];
                }

                if (!row) {
                    return NextResponse.json({ badgeFound: false, email: emailAddress });
                }

                return NextResponse.json({
                    badgeFound: true,
                    badge: toBadgeItem(row, source),
                });
            }

            const freePassSelect = hasFreePassNameColumn
                ? 'id, first_name, last_name, name, email, created_at'
                : 'id, first_name, last_name, email, created_at';

            const ticketRows = hasTicketTable
                ? await client.query(`SELECT id, first_name, last_name, ticket_type, email, created_at FROM ticket_registrations WHERE LOWER(email) = LOWER($1) ORDER BY created_at DESC;`, [normalizedEmail])
                : { rows: [] };
            const freePassRows = hasFreePassTable
                ? await client.query(`SELECT ${freePassSelect} FROM free_pass_registrations WHERE LOWER(email) = LOWER($1) ORDER BY created_at DESC;`, [normalizedEmail])
                : { rows: [] };
            const registrationRows = hasRegistrationTable
                ? await client.query(`SELECT id, name, email, created_at FROM registration_submissions WHERE LOWER(email) = LOWER($1) ORDER BY created_at DESC;`, [normalizedEmail])
                : { rows: [] };

            const matches = [
                ...ticketRows.rows.map((row) => toBadgeItem(row, 'ticket')),
                ...freePassRows.rows.map((row) => toBadgeItem(row, 'free-pass')),
                ...registrationRows.rows.map((row) => toBadgeItem(row, 'registration')),
            ].sort((a, b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf());

            return NextResponse.json({ badgeFound: matches.length > 0, matches, email: emailAddress });
        } finally {
            client.release();
        }
    } catch (error) {
        console.error('Badge lookup error:', error);
        return NextResponse.json({ error: 'Unable to search for badge at this time.' }, { status: 500 });
    }
}
