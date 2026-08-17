/**
 * Database Utility: Insert Test Coupons
 * 
 * Run this script to populate the database with test coupons:
 * npx ts-node --project tsconfig.json app/scripts/seed-coupons.ts
 * 
 * Or copy the SQL queries below and run them in your Neon console
 */

import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const testCoupons = [
    {
        code: 'EARLYBIRD50',
        description: '₦5,000 off all tickets - Early bird discount',
        discount_type: 'FIXED_AMOUNT',
        discount_value: 5000,
        valid_until: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        max_total_redemptions: 100,
        max_redemptions_per_user: 1,
        requires_registration: true,
        is_active: true,
    },
    {
        code: 'TECH20',
        description: '20% off for tech community members',
        discount_type: 'PERCENTAGE',
        discount_value: 20,
        valid_until: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days from now
        max_total_redemptions: 500,
        max_redemptions_per_user: 3,
        requires_registration: true,
        is_active: true,
    },
    {
        code: 'SPONSOR10',
        description: 'Free tickets for sponsors',
        discount_type: 'FIXED_AMOUNT',
        discount_value: 85000, // VIP ticket price
        valid_until: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days from now
        max_total_redemptions: 10,
        max_redemptions_per_user: 1,
        requires_registration: false,
        is_active: true,
    },
    {
        code: 'FRIEND15',
        description: '15% off when you bring a friend',
        discount_type: 'PERCENTAGE',
        discount_value: 15,
        valid_until: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000), // 45 days from now
        max_total_redemptions: 300,
        max_redemptions_per_user: 2,
        requires_registration: true,
        is_active: true,
    },
];

async function seedCoupons() {
    const client = await pool.connect();
    try {
        // Create coupons table if it doesn't exist
        await client.query(`
            CREATE TABLE IF NOT EXISTS coupons (
                id SERIAL PRIMARY KEY,
                code VARCHAR(50) UNIQUE NOT NULL,
                description TEXT,
                discount_type VARCHAR(20) NOT NULL CHECK (discount_type IN ('PERCENTAGE', 'FIXED_AMOUNT')),
                discount_value DECIMAL(10, 2) NOT NULL,
                applicable_to_all_passes BOOLEAN DEFAULT true,
                valid_from TIMESTAMPTZ,
                valid_until TIMESTAMPTZ,
                max_total_redemptions INT,
                current_redemptions INT DEFAULT 0,
                max_redemptions_per_user INT DEFAULT 1,
                requires_registration BOOLEAN DEFAULT true,
                is_active BOOLEAN DEFAULT true,
                created_at TIMESTAMPTZ DEFAULT NOW(),
                updated_at TIMESTAMPTZ DEFAULT NOW()
            );
        `);

        // Insert test coupons
        for (const coupon of testCoupons) {
            const result = await client.query(
                `INSERT INTO coupons 
                (code, description, discount_type, discount_value, valid_until, max_total_redemptions, max_redemptions_per_user, requires_registration, is_active)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                ON CONFLICT (code) DO UPDATE SET
                    description = $2,
                    discount_type = $3,
                    discount_value = $4,
                    valid_until = $5,
                    max_total_redemptions = $6,
                    max_redemptions_per_user = $7,
                    requires_registration = $8,
                    is_active = $9
                RETURNING id, code;`,
                [
                    coupon.code,
                    coupon.description,
                    coupon.discount_type,
                    coupon.discount_value,
                    coupon.valid_until,
                    coupon.max_total_redemptions,
                    coupon.max_redemptions_per_user,
                    coupon.requires_registration,
                    coupon.is_active,
                ]
            );
            console.log(`✓ Coupon created/updated: ${result.rows[0].code} (ID: ${result.rows[0].id})`);
        }

        console.log('\n✓ All test coupons seeded successfully!');
    } catch (error) {
        console.error('Error seeding coupons:', error);
    } finally {
        client.release();
        await pool.end();
    }
}

seedCoupons();
