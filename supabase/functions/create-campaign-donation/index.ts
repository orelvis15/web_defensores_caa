import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: Record<string, unknown>) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CAMPAIGN-DONATION] ${step}${detailsStr}`);
};

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      console.error("[CAMPAIGN-DONATION] STRIPE_SECRET_KEY is not configured");
      return new Response(JSON.stringify({ error: "Payment service unavailable." }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 503,
      });
    }

    const requestBody = await req.json();
    const { amount, email, firstName, lastName, campaignId = "vazquez-corrales-2025" } = requestBody;

    // Validate amount
    if (typeof amount !== 'number' || amount < 1 || amount > 100000) {
      return new Response(JSON.stringify({ error: "Invalid donation amount" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    // Validate email if provided
    if (email && !validateEmail(email)) {
      return new Response(JSON.stringify({ error: "Invalid email address" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    logStep("Request validated", { amount, campaignId, hasEmail: !!email });

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });
    const origin = req.headers.get("origin") || "https://defensorescaa.org";
    const amountInCents = Math.round(amount * 100);

    // Check if customer exists
    let customerId: string | undefined;
    if (email) {
      try {
        const customers = await stripe.customers.list({ email, limit: 1 });
        if (customers.data.length > 0) {
          customerId = customers.data[0].id;
          logStep("Found existing customer", { customerId });
        } else {
          const customerName = [firstName, lastName].filter(Boolean).join(' ') || undefined;
          const customer = await stripe.customers.create({
            email,
            name: customerName,
          });
          customerId = customer.id;
          logStep("Created new customer", { customerId });
        }
      } catch (customerError) {
        console.error("[CAMPAIGN-DONATION] Customer operation failed", customerError);
      }
    }

    // Create checkout session with campaign metadata
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : email || undefined,
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: amountInCents,
            product_data: {
              name: `Donación Humanitaria - Familia Vázquez Corrales`,
              description: `Donación de $${amount} para apoyo humanitario urgente`,
            },
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/donation-success?session_id={CHECKOUT_SESSION_ID}&campaign=${campaignId}`,
      cancel_url: `${origin}/?campaign_canceled=true`,
      metadata: {
        campaignId,
        amount: amount.toString(),
        type: "campaign_donation",
      },
    });

    logStep("Checkout session created", { sessionId: session.id });

    // Save to campaign_donations table
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { error: dbError } = await supabaseClient.from("campaign_donations").insert({
      campaign_id: campaignId,
      stripe_session_id: session.id,
      stripe_customer_id: customerId || null,
      email: email || "anonymous",
      first_name: firstName || null,
      last_name: lastName || null,
      amount: amount,
      currency: "usd",
      status: "pending",
    });

    if (dbError) {
      console.error("[CAMPAIGN-DONATION] Failed to save to DB", dbError);
    } else {
      logStep("Donation saved to database");
    }

    return new Response(JSON.stringify({ url: session.url, sessionId: session.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("[CAMPAIGN-DONATION] ERROR", error);
    return new Response(JSON.stringify({ error: "Unable to create checkout session." }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
