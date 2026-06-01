import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const ALLOWED_ORIGINS = ["https://theaicall.pro", "https://www.theaicall.pro", "http://localhost:5173", "http://localhost:8080"];

function isAllowedOrigin(origin: string): boolean {
  if (ALLOWED_ORIGINS.includes(origin)) return true;
  return false;
}

function getCorsHeaders(origin: string | null) {
  const allowed = origin && isAllowedOrigin(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-internal-secret",
  };
}

// In-memory rate limiting: max 5 web calls per IP per hour
const RATE_WINDOW_MS = 60 * 60 * 1000;
const MAX_WEBCALLS_PER_IP = 5;
const ipTimestamps = new Map<string, number[]>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowStart = now - RATE_WINDOW_MS;
  const timestamps = (ipTimestamps.get(ip) ?? []).filter((t) => t > windowStart);
  if (timestamps.length >= MAX_WEBCALLS_PER_IP) return false;
  timestamps.push(now);
  ipTimestamps.set(ip, timestamps);
  return true;
}

serve(async (req) => {
  const origin = req.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // [SECURITY] Verify internal shared secret
    const internalSecret = req.headers.get("x-internal-secret");
    const expectedSecret = Deno.env.get("INTERNAL_API_SECRET");
    if (!expectedSecret || internalSecret !== expectedSecret) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // [SECURITY] Rate limit per IP
    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
    if (!checkRateLimit(clientIp)) {
      return new Response(JSON.stringify({ error: "Too many web call requests. Please try again later." }), {
        status: 429,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const retellApiKey = Deno.env.get("RETELL_API_KEY") || "key_26d3b0bee10c4f9056201c1a4d80";
    if (!retellApiKey) throw new Error("RETELL_API_KEY secret is not configured");

    // [SECURITY] Accept specific whitelisted agent IDs from frontend, otherwise default to Webcall Agent
    const reqBody = await req.clone().json().catch(() => ({}));
    const { agent_id, name, email, phone } = reqBody;


    const defaultAgentId = Deno.env.get("RETELL_WEBCALL_AGENT_ID") || "agent_70866a09c027a32a445b4d10e9";

    const ALLOWED_AGENTS = ["agent_bc07b033648e16db0c6af7c709", "agent_70866a09c027a32a445b4d10e9"];
    const agentId = agent_id && ALLOWED_AGENTS.includes(agent_id) ? agent_id : defaultAgentId;

    const res = await fetch("https://api.retellai.com/v2/create-web-call", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${retellApiKey}`,
      },
      body: JSON.stringify({
        agent_id: agentId,
        retell_llm_dynamic_variables: {
          customer_name: name?.trim() || "there",
          lead_email: email?.trim() || "",
          lead_phone: phone?.trim() || "",
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
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : String(error) }),
      { status: 500, headers: { ...getCorsHeaders(req.headers.get("origin")), "Content-Type": "application/json" } }
    );
  }
});
