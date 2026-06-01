import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const ALLOWED_ORIGINS = ["https://theaicall.pro", "https://www.theaicall.pro", "http://localhost:5173", "http://localhost:8080"];

function getCorsHeaders(origin: string | null) {
  const allowed = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  };
}

const N8N_WEBHOOK_URL = Deno.env.get("N8N_WEBHOOK_URL");
const WEBHOOK_SECRET = Deno.env.get("CHAT_WEBHOOK_SECRET");

// Rate limit: max messages per session per window
const MAX_MESSAGES_PER_SESSION = 30;
const RATE_WINDOW_MINUTES = 60;

serve(async (req) => {
  const origin = req.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // [SECURITY] Validate Supabase JWT — the Authorization header must contain a valid
    // Supabase anon key JWT, verified by Supabase's platform (verify_jwt = true in config.toml)
    // This check is a secondary guard confirming the header is present.
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return new Response(
        JSON.stringify({ error: "Authentication required" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!N8N_WEBHOOK_URL) {
      throw new Error("N8N_WEBHOOK_URL is not configured");
    }

    const body = await req.json();
    const { message, timestamp, session_id, user_id } = body;

    if (!message || typeof message !== "string") {
      return new Response(
        JSON.stringify({ error: "Valid message is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Sanitize and limit message size
    const sanitizedMessage = message.replace(/[<>]/g, "").substring(0, 1000);
    const safeSessionId = (session_id || "anonymous").substring(0, 64);

    // --- [SECURITY] Rate limiting per session ---
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const windowStart = new Date(Date.now() - RATE_WINDOW_MINUTES * 60 * 1000).toISOString();
    const { count: msgCount } = await supabase
      .from("n8n_chat_histories")
      .select("*", { count: "exact", head: true })
      .eq("session_id", safeSessionId)
      .gte("created_at", windowStart);

    if ((msgCount ?? 0) >= MAX_MESSAGES_PER_SESSION) {
      return new Response(
        JSON.stringify({ error: "Chat limit reached. Please try again later." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Log the interaction for audit
    await supabase.from("n8n_chat_histories").insert({
      message: sanitizedMessage,
      session_id: safeSessionId,
    });

    // Forward to N8N with a shared secret header for n8n-side verification
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(WEBHOOK_SECRET ? { "X-Webhook-Secret": WEBHOOK_SECRET } : {}),
      },
      body: JSON.stringify({
        message: sanitizedMessage,
        timestamp,
        session_id: safeSessionId,
        user_id,
      }),
    });

    const data = await response.text();

    return new Response(
      JSON.stringify({ response: data }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );
  } catch (error) {
    console.error("Secure chat webhook error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { headers: { ...getCorsHeaders(req.headers.get("origin")), "Content-Type": "application/json" }, status: 500 }
    );
  }
});