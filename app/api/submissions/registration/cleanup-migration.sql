-- Migration: Remove unused fields from btf-registration table
-- This migration removes fields that were created but are never populated by the registration form

ALTER TABLE "btf-registration" DROP COLUMN IF EXISTS ticket_type;
ALTER TABLE "btf-registration" DROP COLUMN IF EXISTS phone;
ALTER TABLE "btf-registration" DROP COLUMN IF EXISTS country;
ALTER TABLE "btf-registration" DROP COLUMN IF EXISTS nationality;
ALTER TABLE "btf-registration" DROP COLUMN IF EXISTS community;
ALTER TABLE "btf-registration" DROP COLUMN IF EXISTS payment_reference;

-- Final schema should only have:
-- id, registration_id, name, email, primary_interest, agreed_to_terms, created_at
