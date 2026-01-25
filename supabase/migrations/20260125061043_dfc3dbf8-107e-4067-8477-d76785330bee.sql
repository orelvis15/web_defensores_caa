-- Create table for letter comments
CREATE TABLE public.letter_comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  city TEXT,
  state TEXT,
  comment TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  reviewed_by UUID
);

-- Enable RLS
ALTER TABLE public.letter_comments ENABLE ROW LEVEL SECURITY;

-- Public can view only approved comments
CREATE POLICY "Anyone can view approved comments"
ON public.letter_comments
FOR SELECT
USING (status = 'approved');

-- Admins can view all comments
CREATE POLICY "Admins can view all comments"
ON public.letter_comments
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Admins can update comments (for approval/denial)
CREATE POLICY "Admins can update comments"
ON public.letter_comments
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

-- Create index for faster queries
CREATE INDEX idx_letter_comments_status ON public.letter_comments(status);
CREATE INDEX idx_letter_comments_created_at ON public.letter_comments(created_at DESC);