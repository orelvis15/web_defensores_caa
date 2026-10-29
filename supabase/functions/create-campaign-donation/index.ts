import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";
import { createCheckout, PaymentsError, returnOrigin } from "../_shared/payments.ts";

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

    // Create checkout session with campaign metadata
    const session = await createCheckout({
      kind: "campaign",
      amount_cents: Math.round(amount * 100),
      email,
      first_name: firstName,
      last_name: lastName,
      campaign_id: campaignId,
      origin: returnOrigin(req),
    });
    const customerId = session.customer_id;

    logStep("Checkout session created", { sessionId: session.session_id });

    // Save to campaign_donations table
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { error: dbError } = await supabaseClient.from("campaign_donations").insert({
      campaign_id: campaignId,
      stripe_session_id: session.session_id,
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

    return new Response(JSON.stringify({ url: session.url, sessionId: session.session_id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    if (error instanceof PaymentsError && error.status === 400) {
      return new Response(JSON.stringify({ error: error.message }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }
    console.error("[CAMPAIGN-DONATION] ERROR", error);
    return new Response(JSON.stringify({ error: "Unable to create checkout session." }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
