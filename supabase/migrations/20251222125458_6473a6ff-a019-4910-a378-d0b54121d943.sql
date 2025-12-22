-- Update the admin email allowlist function
CREATE OR REPLACE FUNCTION public.is_admin_email(_email TEXT)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT _email = ANY(ARRAY[
    'rafael@defensorescaa.org',
    'mag@defensorescaa.org',
    'manuel@defensorescaa.org',
    'lisy@defensorescaa.org'
  ])
$$;