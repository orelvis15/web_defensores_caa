import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface CommentRequest {
  name: string;
  city?: string;
  state?: string;
  comment: string;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const body: CommentRequest = await req.json();
    const { name, city, state, comment } = body;

    // Validate required fields
    if (!name || !name.trim()) {
      console.error("[SUBMIT-COMMENT] Missing name");
      return new Response(
        JSON.stringify({ error: "El nombre es requerido" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!comment || !comment.trim()) {
      console.error("[SUBMIT-COMMENT] Missing comment");
      return new Response(
        JSON.stringify({ error: "El comentario es requerido" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate lengths
    if (name.trim().length > 100) {
      return new Response(
        JSON.stringify({ error: "El nombre es demasiado largo (máx. 100 caracteres)" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (comment.trim().length > 1000) {
      return new Response(
        JSON.stringify({ error: "El comentario es demasiado largo (máx. 1000 caracteres)" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Insert comment
    const { data, error } = await supabase
      .from("letter_comments")
      .insert({
        name: name.trim(),
        city: city?.trim() || null,
        state: state?.trim() || null,
        comment: comment.trim(),
        status: "pending",
      })
      .select()
      .single();

    if (error) {
      console.error("[SUBMIT-COMMENT] Insert error:", error);
      return new Response(
        JSON.stringify({ error: "Error al guardar el comentario" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("[SUBMIT-COMMENT] Comment submitted successfully:", data.id);

    return new Response(
      JSON.stringify({ success: true, id: data.id }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("[SUBMIT-COMMENT] Unexpected error:", err);
    return new Response(
      JSON.stringify({ error: "Error inesperado" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
