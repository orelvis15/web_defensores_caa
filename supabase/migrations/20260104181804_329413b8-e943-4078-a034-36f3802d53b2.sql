-- Remove public INSERT policy from member_applications
-- Applications will now only be inserted via the Edge Function with service role

DROP POLICY IF EXISTS "Anyone can insert applications" ON public.member_applications;

-- Add unique constraint on email to prevent duplicates at database level
ALTER TABLE public.member_applications 
ADD CONSTRAINT member_applications_email_unique UNIQUE (email);