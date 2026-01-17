import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const campaignId = url.searchParams.get("campaignId") || "vazquez-corrales-2025";

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Get sum of completed donations for this campaign
    const { data, error } = await supabaseClient
      .from("campaign_donations")
      .select("amount")
      .eq("campaign_id", campaignId)
      .eq("status", "completed");

    if (error) {
      console.error("[GET-CAMPAIGN-TOTAL] Query error", error);
      return new Response(JSON.stringify({ total: 0, count: 0 }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    const total = data?.reduce((sum, d) => sum + Number(d.amount), 0) || 0;
    const count = data?.length || 0;

    console.log(`[GET-CAMPAIGN-TOTAL] Campaign: ${campaignId}, Total: $${total}, Count: ${count}`);

    return new Response(JSON.stringify({ 
      total, 
      count,
      campaignId 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("[GET-CAMPAIGN-TOTAL] ERROR", error);
    return new Response(JSON.stringify({ total: 0, count: 0 }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  }
});
