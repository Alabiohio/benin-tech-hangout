-- Migration: Add missing fields to btf-registration table
-- Run this manually in Neon if new registrations still don't show all fields

ALTER TABLE "btf-registration" ADD COLUMN IF NOT EXISTS first_name VARCHAR(255);
ALTER TABLE "btf-registration" ADD COLUMN IF NOT EXISTS last_name VARCHAR(255);
ALTER TABLE "btf-registration" ADD COLUMN IF NOT EXISTS whatsapp VARCHAR(30);
ALTER TABLE "btf-registration" ADD COLUMN IF NOT EXISTS company VARCHAR(255);
ALTER TABLE "btf-registration" ADD COLUMN IF NOT EXISTS role VARCHAR(100);
ALTER TABLE "btf-registration" ADD COLUMN IF NOT EXISTS location VARCHAR(255);
ALTER TABLE "btf-registration" ADD COLUMN IF NOT EXISTS interests TEXT;
ALTER TABLE "btf-registration" ADD COLUMN IF NOT EXISTS heard_from VARCHAR(100);
ALTER TABLE "btf-registration" ADD COLUMN IF NOT EXISTS event_pass VARCHAR(50);

-- Verify all columns exist
SELECT column_name, data_type FROM information_schema.columns 
WHERE table_name = 'btf-registration' 
ORDER BY ordinal_position;
