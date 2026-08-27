import { Pool } from 'pg';
import { NextResponse } from 'next/server';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export async function GET() {
    try {
        const client = await pool.connect();
        try {
            const result = await client.query(`
                SELECT id, name, price, description, is_active 
                FROM ticketting 
                WHERE is_active = true 
                ORDER BY price ASC
            `);
            
            return NextResponse.json({
                success: true,
                tickets: result.rows
            });
        } finally {
            client.release();
        }
    } catch (error) {
        console.error('Error fetching tickets:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch tickets' },
            { status: 500 }
        );
    }
}
