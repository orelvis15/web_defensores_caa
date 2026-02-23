import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

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

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      return new Response(JSON.stringify({ error: "Payment service unavailable." }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 503,
      });
    }

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

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });
    const origin = req.headers.get("origin") || "https://defensorescaaorg.lovable.app";
    const amount = 50;
    const amountInCents = amount * 100;

    // Check/create Stripe customer
    let customerId: string | undefined;
    try {
      const customers = await stripe.customers.list({ email, limit: 1 });
      if (customers.data.length > 0) {
        customerId = customers.data[0].id;
        logStep("Found existing customer", { customerId });
      } else {
        const customer = await stripe.customers.create({
          email,
          name: `${firstName} ${lastName}`,
          phone: phone || undefined,
        });
        customerId = customer.id;
        logStep("Created new customer", { customerId });
      }
    } catch (customerError) {
      console.error("[COURSE-CHECKOUT] Customer operation failed", customerError);
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: amountInCents,
            product_data: {
              name: "Curso: Herramientas de Libertad",
              description: "Habeas Corpus Pro Se en Detención Migratoria - Inscripción $50",
            },
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/donation-success?session_id={CHECKOUT_SESSION_ID}&type=course`,
      cancel_url: `${origin}/curso?canceled=true`,
      metadata: {
        type: "course_purchase",
        courseId: "habeas-corpus-2026",
        firstName,
        lastName,
      },
    });

    logStep("Checkout session created", { sessionId: session.id });

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
      stripe_session_id: session.id,
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

    return new Response(JSON.stringify({ url: session.url, sessionId: session.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("[COURSE-CHECKOUT] ERROR", error);
    return new Response(JSON.stringify({ error: "Unable to create checkout session." }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
