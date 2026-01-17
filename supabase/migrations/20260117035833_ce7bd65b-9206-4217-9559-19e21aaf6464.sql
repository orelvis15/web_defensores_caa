-- Create campaign donations table to track donations for specific humanitarian campaigns
CREATE TABLE public.campaign_donations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  campaign_id TEXT NOT NULL DEFAULT 'vazquez-corrales-2025',
  stripe_session_id TEXT NOT NULL,
  stripe_customer_id TEXT,
  email TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  amount NUMERIC NOT NULL,
  currency TEXT NOT NULL DEFAULT 'usd',
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Enable Row Level Security
ALTER TABLE public.campaign_donations ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read completed donations (for the counter)
CREATE POLICY "Anyone can view completed campaign donations" 
ON public.campaign_donations 
FOR SELECT 
USING (status = 'completed');

-- Create index for faster aggregation queries
CREATE INDEX idx_campaign_donations_campaign_status ON public.campaign_donations(campaign_id, status);
CREATE INDEX idx_campaign_donations_session ON public.campaign_donations(stripe_session_id);