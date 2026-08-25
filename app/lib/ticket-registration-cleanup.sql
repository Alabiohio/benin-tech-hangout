-- Remove ticket registration fields that are no longer collected or stored.
ALTER TABLE ticket_registrations
  DROP COLUMN IF EXISTS phone,
  DROP COLUMN IF EXISTS nationality,
  DROP COLUMN IF EXISTS country,
  DROP COLUMN IF EXISTS community;