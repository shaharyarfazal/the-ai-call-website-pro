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

const GATEWAY_URL = "https://connector-gateway.lovable.dev/resend";

// Rate limiting: max 3 contact submissions per email per hour
const MAX_SUBMISSIONS_PER_EMAIL = 3;
const MAX_SUBMISSIONS_PER_IP = 5;
const RATE_WINDOW_MS = 60 * 60 * 1000;

serve(async (req) => {
  const origin = req.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Authentication required" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY is not configured");

    const body = await req.json();
    const { name, email, phone, company, message, turnstileToken } = body;

    // --- [SECURITY] Verify Cloudflare Turnstile ---
    const turnstileSecret = Deno.env.get("TURNSTILE_SECRET_KEY");
    if (turnstileSecret) {
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

    if (!name || typeof name !== "string" || name.length < 2) {
      return new Response(JSON.stringify({ error: "Valid name is required" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!email || typeof email !== "string" || !email.includes("@") || email.length > 255) {
      return new Response(JSON.stringify({ error: "Valid email is required" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!message || typeof message !== "string" || message.length < 10) {
      return new Response(JSON.stringify({ error: "Valid message is required" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // --- [SECURITY] Rate limiting via Supabase ---
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const windowStart = new Date(Date.now() - RATE_WINDOW_MS).toISOString();
    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";

    // Check per-email rate limit
    const { count: emailCount } = await supabase
      .from("contact_rate_limits")
      .select("*", { count: "exact", head: true })
      .eq("email", email.toLowerCase())
      .gte("created_at", windowStart);

    if ((emailCount ?? 0) >= MAX_SUBMISSIONS_PER_EMAIL) {
      return new Response(JSON.stringify({ error: "You have already submitted a message recently. Please wait before sending another." }), {
        status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Check per-IP rate limit
    const { count: ipCount } = await supabase
      .from("contact_rate_limits")
      .select("*", { count: "exact", head: true })
      .eq("ip_address", clientIp)
      .gte("created_at", windowStart);

    if ((ipCount ?? 0) >= MAX_SUBMISSIONS_PER_IP) {
      return new Response(JSON.stringify({ error: "Too many submissions. Please try again later." }), {
        status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Log this submission for rate limiting
    await supabase.from("contact_rate_limits").insert({
      email: email.toLowerCase(),
      ip_address: clientIp,
    });

    // Sanitize inputs
    const sanitizedName = name.replace(/[<>]/g, "").substring(0, 100);
    const sanitizedMessage = message.replace(/[<>]/g, "").substring(0, 1000);
    const sanitizedPhone = phone ? String(phone).replace(/[<>]/g, "").substring(0, 30) : "N/A";
    const sanitizedCompany = company ? String(company).replace(/[<>]/g, "").substring(0, 100) : "N/A";

    const notificationHtml = `
      <h2>New Contact Form Submission</h2>
      <table style="border-collapse:collapse;width:100%;max-width:600px;">
        <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Name</td><td style="padding:8px;border-bottom:1px solid #eee;">${sanitizedName}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Email</td><td style="padding:8px;border-bottom:1px solid #eee;">${email}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Phone</td><td style="padding:8px;border-bottom:1px solid #eee;">${sanitizedPhone}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Company</td><td style="padding:8px;border-bottom:1px solid #eee;">${sanitizedCompany}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;">Message</td><td style="padding:8px;">${sanitizedMessage}</td></tr>
      </table>
    `;

    const notificationRes = await fetch(`${GATEWAY_URL}/emails`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "X-Connection-Api-Key": RESEND_API_KEY,
      },
      body: JSON.stringify({
        from: "The AI Call <noreply@theaicall.pro>",
        to: ["hello@theaicall.pro"],
        subject: `New Contact: ${sanitizedName}`,
        html: notificationHtml,
        reply_to: email,
      }),
    });

    if (!notificationRes.ok) {
      const errData = await notificationRes.text();
      console.error(`Notification email failed [${notificationRes.status}]:`, errData);
    }

    const confirmationHtml = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;">
        <h1 style="color:#1a1a2e;font-size:24px;">Thank you for reaching out, ${sanitizedName}!</h1>
        <p style="color:#555;font-size:16px;line-height:1.6;">
          We've received your message and our team will get back to you within 24 hours.
        </p>
        <p style="color:#555;font-size:16px;line-height:1.6;">
          In the meantime, feel free to explore our AI voice solutions at
          <a href="https://theaicall.pro" style="color:#6366f1;">theaicall.pro</a>.
        </p>
        <hr style="border:none;border-top:1px solid #eee;margin:30px 0;" />
        <p style="color:#999;font-size:12px;">
          The AI Call &bull; AI Voice Agents for Business<br/>
          <a href="https://theaicall.pro" style="color:#999;">theaicall.pro</a>
        </p>
      </div>
    `;

    const confirmRes = await fetch(`${GATEWAY_URL}/emails`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "X-Connection-Api-Key": RESEND_API_KEY,
      },
      body: JSON.stringify({
        from: "The AI Call <noreply@theaicall.pro>",
        to: [email],
        subject: "Thanks for contacting The AI Call!",
        html: confirmationHtml,
      }),
    });

    if (!confirmRes.ok) {
      const errData = await confirmRes.text();
      console.error(`Confirmation email failed [${confirmRes.status}]:`, errData);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("send-contact-email error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...getCorsHeaders(req.headers.get("origin")), "Content-Type": "application/json" },
    });
  }
});
