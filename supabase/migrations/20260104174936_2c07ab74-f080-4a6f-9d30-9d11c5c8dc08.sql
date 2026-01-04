-- Drop the password_hash column from member_applications table
-- This column stored plaintext passwords which is a security risk
ALTER TABLE public.member_applications DROP COLUMN IF EXISTS password_hash;