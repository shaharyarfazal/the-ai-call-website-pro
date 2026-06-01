import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { createHmac } from "https://deno.land/std@0.168.0/node/crypto.ts";

// Retell only calls this from their servers — no browser CORS needed
const corsHeaders = {
  "Access-Control-Allow-Origin": "https://theaicall.pro",
  "Access-Control-Allow-Headers": "content-type, x-retell-signature",
};

/**
 * Constant-time HMAC comparison to prevent timing attacks.
 */
function verifyRetellSignature(payload: string, signature: string, secret: string): boolean {
  try {
    const hmac = createHmac("sha256", secret);
    hmac.update(payload);
    const computed = hmac.digest("hex");

    // Constant-time comparison
    if (computed.length !== signature.length) return false;
    let mismatch = 0;
    for (let i = 0; i < computed.length; i++) {
      mismatch |= computed.charCodeAt(i) ^ signature.charCodeAt(i);
    }
    return mismatch === 0;
  } catch {
    return false;
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    // [SECURITY] Signature secret is now MANDATORY — fail hard if not configured
    const retellWebhookSecret = Deno.env.get("RETELL_WEBHOOK_SECRET");
    if (!retellWebhookSecret) {
      console.error("CRITICAL: RETELL_WEBHOOK_SECRET is not configured. Rejecting all webhook requests.");
      return new Response(JSON.stringify({ error: "Webhook not configured" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const rawBody = await req.text();

    // [SECURITY] Always verify the webhook signature
    const signature = req.headers.get("x-retell-signature") ?? "";
    if (!verifyRetellSignature(rawBody, signature, retellWebhookSecret)) {
      console.warn("Retell webhook signature verification FAILED — rejecting request");
      return new Response(JSON.stringify({ error: "Invalid signature" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const payload = JSON.parse(rawBody);

    const {
      call_id, agent_id, from_number, to_number, call_type, call_status,
      direction, duration_ms, transcript, recording_url, public_log_url,
      disconnection_reason, call_analysis, start_timestamp, end_timestamp, metadata,
    } = payload;

    if (!call_id) {
      return new Response(JSON.stringify({ error: "call_id missing" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Upsert call log
    const { error: upsertError } = await supabase.from("call_logs").upsert({
      call_id,
      agent_id,
      from_number,
      to_number,
      call_type,
      call_status,
      direction,
      duration_ms: duration_ms || null,
      transcript: transcript || null,
      recording_url: recording_url || null,
      public_log_url: public_log_url || null,
      disconnection_reason: disconnection_reason || null,
      call_summary: call_analysis?.call_summary || null,
      user_sentiment: call_analysis?.user_sentiment || null,
      call_successful: call_analysis?.call_successful ?? null,
      in_voicemail: call_analysis?.in_voicemail ?? null,
      raw_payload: payload,
      ended_at: end_timestamp ? new Date(end_timestamp).toISOString() : null,
    }, { onConflict: "call_id" });

    if (upsertError) {
      console.error("Failed to upsert call log:", upsertError);
    }

    if (call_id) {
      const { error: leadUpdateError } = await supabase
        .from("demo_leads")
        .update({ call_status: call_status === "ended" ? "completed" : call_status })
        .eq("call_id", call_id);

      if (leadUpdateError) {
        console.error("Failed to update lead status:", leadUpdateError);
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Webhook error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : String(error) }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});
