import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Rate limiting: max 10 requests per IP per minute
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10;
const rateLimitStore = new Map<string, { count: number; windowStart: number }>();

const checkRateLimit = (clientIP: string): { allowed: boolean; retryAfter?: number } => {
  const now = Date.now();
  const record = rateLimitStore.get(clientIP);
  
  // Clean up old entries periodically (every 100 checks)
  if (Math.random() < 0.01) {
    for (const [ip, data] of rateLimitStore.entries()) {
      if (now - data.windowStart > RATE_LIMIT_WINDOW_MS * 2) {
        rateLimitStore.delete(ip);
      }
    }
  }

  if (!record || now - record.windowStart > RATE_LIMIT_WINDOW_MS) {
    // New window
    rateLimitStore.set(clientIP, { count: 1, windowStart: now });
    return { allowed: true };
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    const retryAfter = Math.ceil((record.windowStart + RATE_LIMIT_WINDOW_MS - now) / 1000);
    return { allowed: false, retryAfter };
  }

  record.count++;
  return { allowed: true };
};

const logStep = (step: string, details?: Record<string, unknown>) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CREATE-DONATION-CHECKOUT] ${step}${detailsStr}`);
};

// Input validation
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
};

const validateDonationInput = (data: unknown): { 
  valid: boolean; 
  error?: string; 
  data?: { 
    donationType: "one-time" | "monthly"; 
    amount: number; 
    email?: string; 
    firstName?: string; 
    lastName?: string; 
  } 
} => {
  if (!data || typeof data !== 'object') {
    return { valid: false, error: 'Invalid request body' };
  }

  const { donationType, amount, email, firstName, lastName } = data as Record<string, unknown>;

  // Validate donationType
  if (donationType !== 'one-time' && donationType !== 'monthly') {
    return { valid: false, error: 'Invalid donation type' };
  }

  // Validate amount
  if (typeof amount !== 'number' || !Number.isFinite(amount)) {
    return { valid: false, error: 'Invalid donation amount' };
  }
  if (amount < 1 || amount > 100000) {
    return { valid: false, error: 'Donation amount must be between $1 and $100,000' };
  }
  // Check decimal precision (max 2 decimal places)
  if (Math.round(amount * 100) !== amount * 100) {
    return { valid: false, error: 'Invalid donation amount format' };
  }

  // Validate email if provided
  if (email !== undefined && email !== null && email !== '') {
    if (typeof email !== 'string' || !validateEmail(email)) {
      return { valid: false, error: 'Invalid email address' };
    }
  }

  // Validate firstName if provided
  if (firstName !== undefined && firstName !== null && firstName !== '') {
    if (typeof firstName !== 'string' || firstName.length > 100) {
      return { valid: false, error: 'First name must be less than 100 characters' };
    }
  }

  // Validate lastName if provided
  if (lastName !== undefined && lastName !== null && lastName !== '') {
    if (typeof lastName !== 'string' || lastName.length > 100) {
      return { valid: false, error: 'Last name must be less than 100 characters' };
    }
  }

  return {
    valid: true,
    data: {
      donationType: donationType as "one-time" | "monthly",
      amount: amount as number,
      email: typeof email === 'string' && email ? email.trim() : undefined,
      firstName: typeof firstName === 'string' && firstName ? firstName.trim().slice(0, 100) : undefined,
      lastName: typeof lastName === 'string' && lastName ? lastName.trim().slice(0, 100) : undefined,
    }
  };
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    // Rate limiting check
    const clientIP = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
                     req.headers.get("x-real-ip") || 
                     "unknown";
    const rateLimit = checkRateLimit(clientIP);
    
    if (!rateLimit.allowed) {
      logStep("Rate limit exceeded", { clientIP, retryAfter: rateLimit.retryAfter });
      return new Response(JSON.stringify({ error: "Too many requests. Please try again later." }), {
        headers: { 
          ...corsHeaders, 
          "Content-Type": "application/json",
          "Retry-After": String(rateLimit.retryAfter || 60)
        },
        status: 429,
      });
    }
    logStep("Rate limit check passed", { clientIP });

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      console.error("[CREATE-DONATION-CHECKOUT] STRIPE_SECRET_KEY is not configured");
      return new Response(JSON.stringify({ error: "Payment service unavailable. Please try again later." }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 503,
      });
    }
    logStep("Stripe key verified");

    // Parse and validate input
    let requestBody: unknown;
    try {
      requestBody = await req.json();
    } catch {
      return new Response(JSON.stringify({ error: "Invalid request format" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    const validation = validateDonationInput(requestBody);
    if (!validation.valid || !validation.data) {
      logStep("Validation failed", { error: validation.error });
      return new Response(JSON.stringify({ error: validation.error }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    const { donationType, amount, email, firstName, lastName } = validation.data;
    logStep("Request validated", { donationType, amount, hasEmail: !!email });

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });

    // Check if customer exists
    let customerId: string | undefined;
    if (email) {
      try {
        const customers = await stripe.customers.list({ email, limit: 1 });
        if (customers.data.length > 0) {
          customerId = customers.data[0].id;
          logStep("Found existing customer", { customerId });
        } else {
          // Create new customer
          const customerName = [firstName, lastName].filter(Boolean).join(' ') || undefined;
          const customer = await stripe.customers.create({
            email,
            name: customerName,
          });
          customerId = customer.id;
          logStep("Created new customer", { customerId });
        }
      } catch (customerError) {
        console.error("[CREATE-DONATION-CHECKOUT] Customer operation failed", customerError);
        // Continue without customer - Stripe will handle email collection
      }
    }

    const origin = req.headers.get("origin") || "https://defensorescaa.org";
    const amountInCents = Math.round(amount * 100);

    // Create price on the fly for custom amounts
    const priceData = {
      currency: "usd",
      unit_amount: amountInCents,
      product_data: {
        name: donationType === "monthly" 
          ? `Monthly Donation - $${amount}/month` 
          : `One-time Donation - $${amount}`,
        description: donationType === "monthly"
          ? "Monthly recurring donation to Defensores CAA"
          : "One-time donation to Defensores CAA",
      },
      ...(donationType === "monthly" && { recurring: { interval: "month" as const } }),
    };

    const sessionConfig: Stripe.Checkout.SessionCreateParams = {
      customer: customerId,
      customer_email: customerId ? undefined : email || undefined,
      line_items: [
        {
          price_data: priceData,
          quantity: 1,
        },
      ],
      mode: donationType === "monthly" ? "subscription" : "payment",
      success_url: `${origin}/donation-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/take-action`,
      metadata: {
        donationType,
        amount: amount.toString(),
      },
    };

    logStep("Creating checkout session", { mode: sessionConfig.mode });

    const session = await stripe.checkout.sessions.create(sessionConfig);

    logStep("Checkout session created", { sessionId: session.id });

    // Save donation record to database
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { error: dbError } = await supabaseClient.from("donations").insert({
      stripe_session_id: session.id,
      stripe_customer_id: customerId || null,
      email: email || "guest",
      first_name: firstName || null,
      last_name: lastName || null,
      amount: amount,
      currency: "usd",
      donation_type: donationType,
      status: "pending",
    });

    if (dbError) {
      console.error("[CREATE-DONATION-CHECKOUT] Failed to save donation to DB", dbError);
      // Don't fail the checkout, just log the error
    } else {
      logStep("Donation saved to database");
    }

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    // Log detailed error server-side only
    console.error("[CREATE-DONATION-CHECKOUT] ERROR", {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });

    // Return generic error to client
    return new Response(JSON.stringify({ error: "Unable to create checkout session. Please try again." }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
