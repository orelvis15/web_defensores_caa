CREATE TABLE public.course_purchases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  phone text,
  city text,
  state text,
  course_id text NOT NULL DEFAULT 'habeas-corpus-2026',
  stripe_session_id text NOT NULL,
  stripe_customer_id text,
  amount numeric NOT NULL DEFAULT 50,
  currency text NOT NULL DEFAULT 'usd',
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now(),
  completed_at timestamptz
);

ALTER TABLE public.course_purchases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view all course purchases"
  ON public.course_purchases FOR SELECT
  USING (has_role(auth.uid(), 'admin'));
