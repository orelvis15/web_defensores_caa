import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CREATE-DONATION-CHECKOUT] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");
    logStep("Stripe key verified");

    const { 
      donationType, 
      amount, 
      email, 
      firstName, 
      lastName 
    } = await req.json();

    logStep("Request data received", { donationType, amount, email, firstName, lastName });

    if (!amount || amount <= 0) {
      throw new Error("Invalid donation amount");
    }

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });

    // Check if customer exists
    let customerId: string | undefined;
    if (email) {
      const customers = await stripe.customers.list({ email, limit: 1 });
      if (customers.data.length > 0) {
        customerId = customers.data[0].id;
        logStep("Found existing customer", { customerId });
      } else {
        // Create new customer
        const customer = await stripe.customers.create({
          email,
          name: `${firstName} ${lastName}`.trim() || undefined,
        });
        customerId = customer.id;
        logStep("Created new customer", { customerId });
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
        firstName: firstName || "",
        lastName: lastName || "",
      },
    };

    logStep("Creating checkout session", { mode: sessionConfig.mode });

    const session = await stripe.checkout.sessions.create(sessionConfig);

    logStep("Checkout session created", { sessionId: session.id, url: session.url });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
