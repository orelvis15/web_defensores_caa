-- Add password column to member_applications (will be used when creating account)
ALTER TABLE public.member_applications 
ADD COLUMN password_hash TEXT;