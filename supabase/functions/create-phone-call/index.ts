import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Only allow requests from the production site, local dev, and Lovable previews
const ALLOWED_ORIGINS = ["https://theaicall.pro", "https://www.theaicall.pro", "http://localhost:5173", "http://localhost:8080"];

function isAllowedOrigin(origin: string): boolean {
  if (ALLOWED_ORIGINS.includes(origin)) return true;
  // Allow any Lovable preview subdomain
  if (/^https:\/\/.*\.lovable\.app$/.test(origin)) return true;
  return false;
}

function getCorsHeaders(origin: string | null) {
  const allowed = origin && isAllowedOrigin(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-internal-secret",
  };
}

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_CALLS_PER_PHONE = 3;
const MAX_CALLS_PER_IP = 5;

serve(async (req) => {
  const origin = req.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // --- [SECURITY] Verify internal shared secret ---
    const internalSecret = req.headers.get("x-internal-secret");
    const expectedSecret = Deno.env.get("INTERNAL_API_SECRET");
    if (!expectedSecret || internalSecret !== expectedSecret) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const retellApiKey = Deno.env.get("RETELL_API_KEY") || "key_26d3b0bee10c4f9056201c1a4d80";
    if (!retellApiKey) throw new Error("RETELL_API_KEY is not configured");

    // [SECURITY] Accept specific whitelisted agent IDs from frontend, otherwise default to env secret
    const reqBody = await req.clone().json().catch(() => ({}));
    const { name, email, phone, agent_id } = reqBody;

    // --- [SECURITY] Verify Cloudflare Turnstile ---
    const turnstileSecret = Deno.env.get("TURNSTILE_SECRET_KEY");
    if (turnstileSecret) {
      const turnstileToken = reqBody.turnstile_token || reqBody.turnstileToken;
      const isLocal = origin && (origin.includes("localhost") || origin.includes("127.0.0.1") || origin.includes("lovable.app"));
      const isBypass = turnstileToken === "development-bypass-token" && isLocal;

      if (!isBypass) {
        if (!turnstileToken) {
          return new Response(JSON.stringify({ error: "Security validation is required." }), {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }

        const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
        
        const turnstileRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            secret: turnstileSecret,
            response: turnstileToken,
            remoteip: clientIp === "unknown" ? undefined : clientIp,
          }),
        });

        const turnstileData = await turnstileRes.json();
        if (!turnstileData.success) {
          return new Response(JSON.stringify({ error: "Security check failed. Please refresh and try again." }), {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
      }
    }

    if (!phone) throw new Error("phone is required");

    const defaultAgentId = Deno.env.get("RETELL_AGENT_ID") || "agent_bc07b033648e16db0c6af7c709";
    const fromNumber = Deno.env.get("RETELL_FROM_NUMBER") || "+19032092622";
    if (!defaultAgentId) throw new Error("RETELL_AGENT_ID is not configured");
    if (!fromNumber) throw new Error("RETELL_FROM_NUMBER is not configured");

    const ALLOWED_AGENTS = ["agent_bc07b033648e16db0c6af7c709", "agent_70866a09c027a32a445b4d10e9"];
    const agentId = agent_id && ALLOWED_AGENTS.includes(agent_id) ? agent_id : defaultAgentId;

    // Normalize to E.164 format
    let toNumber = phone.replace(/\D/g, "");
    if (!toNumber.startsWith("1") && toNumber.length === 10) toNumber = "1" + toNumber;
    toNumber = "+" + toNumber;

    // Basic phone number format validation
    if (!/^\+1\d{10}$/.test(toNumber)) {
      return new Response(JSON.stringify({ error: "Invalid US phone number format" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // --- [SECURITY] Rate limiting via Supabase ---
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const windowStart = new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString();

    // Check per-phone rate limit
    const { count: phoneCount } = await supabase
      .from("call_rate_limits")
      .select("*", { count: "exact", head: true })
      .eq("phone_number", toNumber)
      .gte("created_at", windowStart);

    if ((phoneCount ?? 0) >= MAX_CALLS_PER_PHONE) {
      return new Response(JSON.stringify({ error: "Too many call attempts for this phone number. Please try again later." }), {
        status: 429,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Check per-IP rate limit
    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
    const { count: ipCount } = await supabase
      .from("call_rate_limits")
      .select("*", { count: "exact", head: true })
      .eq("ip_address", clientIp)
      .gte("created_at", windowStart);

    if ((ipCount ?? 0) >= MAX_CALLS_PER_IP) {
      return new Response(JSON.stringify({ error: "Too many requests. Please try again later." }), {
        status: 429,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Log this attempt before making the call
    await supabase.from("call_rate_limits").insert({
      phone_number: toNumber,
      ip_address: clientIp,
      name: name?.trim() || null,
      email: email?.trim() || null,
    });

    const res = await fetch("https://api.retellai.com/v2/create-phone-call", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${retellApiKey}`,
      },
      body: JSON.stringify({
        override_agent_id: agentId,
        from_number: fromNumber,
        to_number: toNumber,
        retell_llm_dynamic_variables: {
          customer_name: name?.trim() || "there",
          lead_email: email?.trim() || "",
          lead_phone: toNumber,
        },
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      return new Response(JSON.stringify({ error: text }), {
        status: res.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await res.json();
    return new Response(
      JSON.stringify({ success: true, call_id: data.call_id }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : String(error) }),
      { status: 500, headers: { ...getCorsHeaders(req.headers.get("origin")), "Content-Type": "application/json" } }
    );
  }
});
