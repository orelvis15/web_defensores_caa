import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Rate limiting: max 3 applications per IP per hour
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_APPS_PER_WINDOW = 3;
const rateLimitStore = new Map<string, { count: number; windowStart: number }>();

const checkRateLimit = (clientIP: string): { allowed: boolean; retryAfter?: number } => {
  const now = Date.now();
  const record = rateLimitStore.get(clientIP);
  
  // Clean up old entries periodically
  if (Math.random() < 0.01) {
    for (const [ip, data] of rateLimitStore.entries()) {
      if (now - data.windowStart > RATE_LIMIT_WINDOW_MS * 2) {
        rateLimitStore.delete(ip);
      }
    }
  }

  if (!record || now - record.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitStore.set(clientIP, { count: 1, windowStart: now });
    return { allowed: true };
  }

  if (record.count >= MAX_APPS_PER_WINDOW) {
    const retryAfter = Math.ceil((record.windowStart + RATE_LIMIT_WINDOW_MS - now) / 1000);
    return { allowed: false, retryAfter };
  }

  record.count++;
  return { allowed: true };
};

const logStep = (step: string, details?: Record<string, unknown>) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[SUBMIT-MEMBER-APPLICATION] ${step}${detailsStr}`);
};

// Input validation
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
};

interface ApplicationInput {
  name: string;
  email: string;
  city: string;
  state: string;
  reason: string;
  note?: string;
}

const validateApplicationInput = (data: unknown): { 
  valid: boolean; 
  error?: string; 
  data?: ApplicationInput;
} => {
  if (!data || typeof data !== 'object') {
    return { valid: false, error: 'Invalid request body' };
  }

  const { name, email, city, state, reason, note } = data as Record<string, unknown>;

  // Validate name
  if (typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 100) {
    return { valid: false, error: 'Name must be between 2 and 100 characters' };
  }

  // Validate email
  if (typeof email !== 'string' || !validateEmail(email.trim())) {
    return { valid: false, error: 'Invalid email address' };
  }

  // Validate city
  if (typeof city !== 'string' || city.trim().length < 2 || city.trim().length > 100) {
    return { valid: false, error: 'City must be between 2 and 100 characters' };
  }

  // Validate state
  if (typeof state !== 'string' || state.trim().length < 2 || state.trim().length > 100) {
    return { valid: false, error: 'State must be between 2 and 100 characters' };
  }

  // Validate reason
  if (typeof reason !== 'string' || reason.trim().length < 10 || reason.trim().length > 1000) {
    return { valid: false, error: 'Reason must be between 10 and 1000 characters' };
  }

  // Validate note (optional)
  if (note !== undefined && note !== null && note !== '') {
    if (typeof note !== 'string' || note.length > 500) {
      return { valid: false, error: 'Note must be less than 500 characters' };
    }
  }

  return {
    valid: true,
    data: {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      city: city.trim(),
      state: state.trim(),
      reason: reason.trim(),
      note: typeof note === 'string' && note.trim() ? note.trim() : undefined,
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
      return new Response(JSON.stringify({ 
        error: "Too many applications submitted. Please try again later.",
        code: "RATE_LIMITED"
      }), {
        headers: { 
          ...corsHeaders, 
          "Content-Type": "application/json",
          "Retry-After": String(rateLimit.retryAfter || 3600)
        },
        status: 429,
      });
    }
    logStep("Rate limit check passed", { clientIP });

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

    const validation = validateApplicationInput(requestBody);
    if (!validation.valid || !validation.data) {
      logStep("Validation failed", { error: validation.error });
      return new Response(JSON.stringify({ error: validation.error }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    const { name, email, city, state, reason, note } = validation.data;
    logStep("Request validated", { email });

    // Create Supabase client with service role
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Check for existing application with same email
    const { data: existingApp } = await supabaseClient
      .from("member_applications")
      .select("id, status")
      .eq("email", email)
      .maybeSingle();

    if (existingApp) {
      logStep("Duplicate application found", { email, status: existingApp.status });
      return new Response(JSON.stringify({ 
        error: "An application with this email already exists.",
        code: "DUPLICATE_EMAIL"
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 409,
      });
    }

    // Insert application
    const { data: application, error: dbError } = await supabaseClient
      .from("member_applications")
      .insert({
        name,
        email,
        city,
        state,
        reason,
        note: note || null,
        status: "pending",
      })
      .select("id")
      .single();

    if (dbError) {
      console.error("[SUBMIT-MEMBER-APPLICATION] Database error", dbError);
      
      if (dbError.code === "23505") { // Unique violation
        return new Response(JSON.stringify({ 
          error: "An application with this email already exists.",
          code: "DUPLICATE_EMAIL"
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 409,
        });
      }
      
      return new Response(JSON.stringify({ 
        error: "Failed to submit application. Please try again." 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    logStep("Application submitted successfully", { applicationId: application.id });

    return new Response(JSON.stringify({ 
      success: true,
      message: "Application submitted successfully" 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error("[SUBMIT-MEMBER-APPLICATION] ERROR", {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });

    return new Response(JSON.stringify({ 
      error: "Unable to submit application. Please try again." 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
