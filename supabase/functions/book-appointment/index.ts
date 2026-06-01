import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const ALLOWED_ORIGINS = ["https://theaicall.pro", "https://www.theaicall.pro", "http://localhost:5173", "http://localhost:8080"];

function getCorsHeaders(origin: string | null) {
  const allowed = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-internal-secret",
  };
}

// Rate limiting: max booking attempts per IP per hour
const MAX_SLOT_REQUESTS_PER_IP = 10;
const MAX_BOOK_REQUESTS_PER_IP = 3;
const RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour

// In-memory rate limiting map (resets on cold start; good enough for edge function)
const ipRateLimits = new Map<string, { slots: number[]; books: number[] }>();

function checkRateLimit(ip: string, action: "slots" | "book"): boolean {
  const now = Date.now();
  const windowStart = now - RATE_WINDOW_MS;
  const record = ipRateLimits.get(ip) ?? { slots: [], books: [] };

  // Prune old entries
  record.slots = record.slots.filter((t) => t > windowStart);
  record.books = record.books.filter((t) => t > windowStart);

  if (action === "slots") {
    if (record.slots.length >= MAX_SLOT_REQUESTS_PER_IP) return false;
    record.slots.push(now);
  } else {
    if (record.books.length >= MAX_BOOK_REQUESTS_PER_IP) return false;
    record.books.push(now);
  }

  ipRateLimits.set(ip, record);
  return true;
}

// Helper to parse JSON safely
async function readJson(req: Request) {
  try {
    return await req.json();
  } catch {
    return {} as Record<string, unknown>;
  }
}

function getSlugFromLink(link?: string) {
  if (!link) return undefined;
  try {
    const url = new URL(link);
    const parts = url.pathname.split("/").filter(Boolean);
    return parts[parts.length - 1];
  } catch {
    return undefined;
  }
}

async function fetchCalendlyUserUri(token: string) {
  const res = await fetch("https://api.calendly.com/users/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`Calendly users/me failed: ${res.status}`);
  const json = await res.json();
  return json.resource?.uri as string;
}

async function findEventTypeUri(token: string, userUri: string, slug?: string) {
  const res = await fetch(
    `https://api.calendly.com/event_types?user=${encodeURIComponent(userUri)}&active=true`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  if (!res.ok) throw new Error(`Calendly event_types failed: ${res.status}`);
  const json = await res.json();
  const list: Record<string, unknown>[] = json.collection || [];
  if (slug) {
    const match = list.find((et) => et.slug === slug);
    if (match) return match.uri as string;
  }
  return list[0]?.uri as string | undefined;
}

async function getAvailableTimes(params: { token: string; eventTypeUri: string; date: string; timezone?: string }) {
  const { token, eventTypeUri, date, timezone } = params;
  const start = new Date(`${date}T00:00:00Z`).toISOString();
  const endDate = new Date(`${date}T00:00:00Z`);
  endDate.setUTCDate(endDate.getUTCDate() + 1);
  const end = endDate.toISOString();

  const url = new URL("https://api.calendly.com/event_type_available_times");
  url.searchParams.set("event_type", eventTypeUri);
  url.searchParams.set("start_time", start);
  url.searchParams.set("end_time", end);
  if (timezone) url.searchParams.set("timezone", timezone);

  const res = await fetch(url.toString(), { headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) throw new Error(`Calendly available_times failed: ${res.status}`);
  const json = await res.json();
  const times: string[] = (json?.collection || []).map((t: Record<string, string>) => t.invitee_start_time || t.start_time);
  return times;
}

async function verifySlotStillAvailable(token: string, eventTypeUri: string, isoStart: string, timezone?: string) {
  const date = isoStart.split("T")[0];
  const times = await getAvailableTimes({ token, eventTypeUri, date, timezone });
  return times.includes(isoStart);
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

    const CALENDLY_API_KEY = Deno.env.get("CALENDLY_API_KEY");
    const BOOKING_WEBHOOK_URL = Deno.env.get("BOOKING_WEBHOOK_URL");

    if (!CALENDLY_API_KEY) {
      return new Response(JSON.stringify({ error: "Missing CALENDLY_API_KEY" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
    const body = await readJson(req);
    const { action } = body as { action?: string };

    if (action === "slots") {
      // [SECURITY] Rate limit slot enumeration
      if (!checkRateLimit(clientIp, "slots")) {
        return new Response(JSON.stringify({ error: "Too many requests. Please slow down." }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 429,
        });
      }

      const { date, timezone, scheduling_link } = body as { date?: string; timezone?: string; scheduling_link?: string };
      if (!date) {
        return new Response(JSON.stringify({ error: "Missing date (YYYY-MM-DD)" }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        });
      }

      // Validate date format
      if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return new Response(JSON.stringify({ error: "Invalid date format" }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        });
      }

      const slug = getSlugFromLink(scheduling_link) || "30min";
      const userUri = await fetchCalendlyUserUri(CALENDLY_API_KEY);
      const eventTypeUri = await findEventTypeUri(CALENDLY_API_KEY, userUri, slug);
      if (!eventTypeUri) {
        return new Response(JSON.stringify({ error: "Could not resolve Calendly event type" }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 404,
        });
      }

      const times = await getAvailableTimes({ token: CALENDLY_API_KEY, eventTypeUri, date, timezone });
      return new Response(JSON.stringify({ times }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    if (action === "book") {
      // [SECURITY] Rate limit bookings more aggressively
      if (!checkRateLimit(clientIp, "book")) {
        return new Response(JSON.stringify({ error: "Too many booking attempts. Please try again later." }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 429,
        });
      }

      const { payload } = body as { payload?: Record<string, unknown> };
      if (!payload) {
        return new Response(JSON.stringify({ error: "Missing payload" }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        });
      }

      const { timeSlotISO, timezone, scheduling_link } = payload as { timeSlotISO: string; timezone?: string; scheduling_link?: string };
      const slug = getSlugFromLink(scheduling_link) || "30min";
      const userUri = await fetchCalendlyUserUri(CALENDLY_API_KEY);
      const eventTypeUri = await findEventTypeUri(CALENDLY_API_KEY, userUri, slug);
      if (!eventTypeUri) {
        return new Response(JSON.stringify({ success: false, reason: "event_type_missing" }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 404,
        });
      }

      const stillFree = await verifySlotStillAvailable(CALENDLY_API_KEY, eventTypeUri, timeSlotISO, timezone);
      if (!stillFree) {
        return new Response(JSON.stringify({ success: false, reason: "slot_unavailable" }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 409,
        });
      }

      if (!BOOKING_WEBHOOK_URL) {
        return new Response(JSON.stringify({ error: "Missing BOOKING_WEBHOOK_URL" }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 500,
        });
      }

      const message = (payload?.message as string) || "Book an appointment request";
      const forward = { ...payload, message, timestamp: Date.now() };

      const resp = await fetch(BOOKING_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(forward),
      });

      const text = await resp.text();
      return new Response(JSON.stringify({ success: resp.ok, response: text }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: resp.ok ? 200 : 502,
      });
    }

    return new Response(JSON.stringify({ error: "Unknown action" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  } catch (e: unknown) {
    return new Response(JSON.stringify({ error: (e as Error)?.message || "Unexpected error" }), {
      headers: { ...getCorsHeaders(req.headers.get("origin")), "Content-Type": "application/json" },
      status: 500,
    });
  }
});
