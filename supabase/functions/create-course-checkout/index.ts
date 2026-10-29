import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";
import { createCheckout, PaymentsError, returnOrigin } from "../_shared/payments.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: Record<string, unknown>) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[COURSE-CHECKOUT] ${step}${detailsStr}`);
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
    const { email, firstName, lastName, phone, city, state } = requestBody;

    // Validate required fields
    if (!email || !firstName || !lastName) {
      return new Response(JSON.stringify({ error: "Email, first name, and last name are required." }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    if (!validateEmail(email)) {
      return new Response(JSON.stringify({ error: "Invalid email address." }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    // Validate string lengths
    if (firstName.length > 100 || lastName.length > 100) {
      return new Response(JSON.stringify({ error: "Name fields must be less than 100 characters." }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    logStep("Request validated", { email, firstName, lastName });

    // Create checkout session (the course price is set by the payments backend)
    const session = await createCheckout({
      kind: "course",
      email,
      first_name: firstName,
      last_name: lastName,
      phone: phone || undefined,
      origin: returnOrigin(req),
    });
    const customerId = session.customer_id;
    const amount = session.amount_cents / 100;

    logStep("Checkout session created", { sessionId: session.session_id });

    // Save to course_purchases table
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { error: dbError } = await supabaseClient.from("course_purchases").insert({
      email,
      first_name: firstName,
      last_name: lastName,
      phone: phone || null,
      city: city || null,
      state: state || null,
      stripe_session_id: session.session_id,
      stripe_customer_id: customerId || null,
      amount,
      currency: "usd",
      status: "pending",
    });

    if (dbError) {
      console.error("[COURSE-CHECKOUT] Failed to save to DB", dbError);
    } else {
      logStep("Course purchase saved to database");
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
    console.error("[COURSE-CHECKOUT] ERROR", error);
    return new Response(JSON.stringify({ error: "Unable to create checkout session." }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
