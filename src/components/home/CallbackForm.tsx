import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, User, Mail, Loader2, CheckCircle, AlertCircle, Mic } from "lucide-react";
import { Turnstile } from "@marsidev/react-turnstile";
import { useTheme } from "@/components/LocalThemeProvider";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://goycrjqlfmwzigimawti.supabase.co";
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdveWNyanFsZm13emlnaW1hd3RpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5OTEzMTYsImV4cCI6MjA2NTU2NzMxNn0.bbYO1ESv9OrIL3AYJLLftO9Xay4WccaOzkZloaBzfKY";
const INTERNAL_SECRET = import.meta.env.VITE_INTERNAL_API_SECRET || "kDA5Na-MjH3qeuw-Internal_api-keys";
const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || "0x4AAAAAADTk6WyOFLpVIvlF";

// [SECURITY] Agent credentials are backend secrets only — never put them in frontend code

interface CallbackFormProps {
  onSuccess?: () => void;
  agentId?: string;
  /** If true, renders only the form fields (no section wrapper, header, or card). Use this when embedding inside another component. */
  embedded?: boolean;
  /** Optional id prefix for form field IDs to avoid duplicate IDs when multiple instances exist on one page */
  idPrefix?: string;
}

type Status = "idle" | "loading" | "success" | "error";

/**
 * Unified callback form — 3 fields: Name, Email, Phone (US only).
 * Calls the create-phone-call Supabase edge function to trigger an instant AI demo call.
 *
 * Use `embedded={true}` when placing this inside your own card/modal/section.
 * Use `embedded={false}` (default) for the full standalone section with header + card.
 */
export function CallbackForm({
  onSuccess,
  agentId = "agent_bc07b033648e16db0c6af7c709",
  embedded = false,
  idPrefix = "callback",
}: CallbackFormProps) {
  const { theme } = useTheme();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  // [SECURITY] Bot protection
  const [honeypot, setHoneypot] = useState("");
  const mountTime = useRef<number>(Date.now());

  // Web Call fallback states for international numbers
  const [isWebCall, setIsWebCall] = useState(false);
  const [webCallStarted, setWebCallStarted] = useState(false);
  const [webCallEnded, setWebCallEnded] = useState(false);
  const [webCallStarting, setWebCallStarting] = useState(false);
  const [webCallTranscript, setWebCallTranscript] = useState<{ role: "user" | "agent"; content: string }[]>([]);
  const [webCallAudioLevel, setWebCallAudioLevel] = useState(0);
  const [webCallError, setWebCallError] = useState("");

  const retellClientRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioStreamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Clean up web call audio assets on unmount
  React.useEffect(() => {
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (audioStreamRef.current) audioStreamRef.current.getTracks().forEach(t => t.stop());
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') audioContextRef.current.close();
    };
  }, []);

  const stopWebCallAudioAnalysis = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (audioStreamRef.current) {
      audioStreamRef.current.getTracks().forEach((t) => t.stop());
      audioStreamRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state !== "closed") {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    setWebCallAudioLevel(0);
  };

  const startWebCallAudioAnalysis = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioStreamRef.current = stream;
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioContextRef.current = ctx;
      const analyser = ctx.createAnalyser();
      analyserRef.current = analyser;
      ctx.createMediaStreamSource(stream).connect(analyser);
      analyser.fftSize = 256;
      const buf = new Uint8Array(analyser.frequencyBinCount);
      const tick = () => {
        if (analyserRef.current) {
          analyserRef.current.getByteFrequencyData(buf);
          setWebCallAudioLevel(buf.reduce((a, v) => a + v, 0) / buf.length / 128);
        }
        animationFrameRef.current = requestAnimationFrame(tick);
      };
      tick();
    } catch {
      setWebCallError("Could not access microphone. Please check permissions.");
    }
  };

  const startWebCall = async () => {
    if (webCallEnded) {
      setWebCallTranscript([]);
      setWebCallEnded(false);
    }
    setWebCallStarting(true);
    setWebCallError("");
    try {
      const { RetellWebClient } = await import('retell-client-js-sdk');
      const anonKey = SUPABASE_ANON_KEY;
      const res = await fetch(`${SUPABASE_URL}/functions/v1/create-webcall`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": anonKey,
          "Authorization": `Bearer ${anonKey}`,
          ...(INTERNAL_SECRET ? { "x-internal-secret": INTERNAL_SECRET } : {}),
        },
        body: JSON.stringify({
          agent_id: agentId,
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
        }),
      });
      if (!res.ok) throw new Error(`Failed to create webcall: ${await res.text()}`);
      const data = await res.json();
      
      await startWebCallAudioAnalysis();
      if (!audioStreamRef.current) {
        setWebCallStarting(false);
        return;
      }

      const client = new RetellWebClient();
      retellClientRef.current = client;

      client.on("call_started", () => {
        setWebCallStarted(true);
        setWebCallEnded(false);
        setWebCallStarting(false);
      });
      client.on("call_ended", () => {
        setWebCallEnded(true);
        setWebCallStarted(false);
        stopWebCallAudioAnalysis();
      });
      client.on("error", (err: any) => {
        setWebCallError(`SDK error: ${String(err)}`);
        setWebCallStarted(false);
        setWebCallStarting(false);
        stopWebCallAudioAnalysis();
      });
      client.on("update", (update: any) => {
        if (update.transcript) {
          setWebCallTranscript(update.transcript);
        }
      });

      await client.startCall({ accessToken: data.access_token });
    } catch (err) {
      setWebCallError(`Error starting call: ${(err as Error).message}`);
      setWebCallStarting(false);
      stopWebCallAudioAnalysis();
    }
  };

  const stopWebCall = () => {
    retellClientRef.current?.stopCall();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) return;

    // [SECURITY] Bot checks
    if (honeypot.length > 0) { setStatus("success"); return; }
    if ((Date.now() - mountTime.current) / 1000 < 3) { setStatus("success"); return; }

    setStatus("loading");
    setErrorMsg("");

    const phoneInput = phone.trim();
    const cleanDigits = phoneInput.replace(/\D/g, "");
    const isInternational =
      (phoneInput.startsWith("+") && !phoneInput.startsWith("+1")) ||
      (phoneInput.startsWith("00") && !phoneInput.startsWith("001")) ||
      (cleanDigits.length > 10 && !cleanDigits.startsWith("1"));

    if (isInternational) {
      setIsWebCall(true);
      setStatus("success");
      
      // Auto start the web call!
      await startWebCall();
      return;
    }

    if (import.meta.env.DEV) {
      console.log("[DEV DEBUG] CallbackForm handleSubmit triggered:", {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        honeypot,
        turnstileToken,
        SUPABASE_URL,
        hasAnonKey: !!SUPABASE_ANON_KEY,
        hasInternalSecret: !!INTERNAL_SECRET
      });
    }

    try {
      if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
        throw new Error("Supabase environment variables are missing.");
      }

      if (import.meta.env.DEV) {
        console.log("[DEV DEBUG] Sending fetch request to:", `${SUPABASE_URL}/functions/v1/create-phone-call`);
      }

      const res = await fetch(`${SUPABASE_URL}/functions/v1/create-phone-call`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": SUPABASE_ANON_KEY,
          "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
          ...(INTERNAL_SECRET ? { "x-internal-secret": INTERNAL_SECRET } : {}),
        },
        // [SECURITY] Backend handles agent_id and from_number from its own secrets
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          agent_id: agentId,
          turnstileToken: turnstileToken,
        }),
      });

      const data = await res.json();
      
      if (import.meta.env.DEV) {
        console.log("[DEV DEBUG] Response received:", { status: res.status, ok: res.ok, data });
      }
      
      if (!res.ok) {
        // If the Edge Function returned an error object
        throw new Error(data.error || `Server error: ${res.status}`);
      }

      if (data.error) {
        throw new Error(data.error);
      }

      setStatus("success");
      onSuccess?.();
    } catch (err) {
      console.error("[DEV DEBUG] Callback error:", err);
      setStatus("error");
      setErrorMsg((err as Error).message);
    }
  };

  const resetForm = () => {
    setStatus("idle");
    setPhone("");
    setName("");
    setEmail("");
    setTurnstileToken(null);
    setIsWebCall(false);
    setWebCallStarted(false);
    setWebCallEnded(false);
    setWebCallStarting(false);
    setWebCallTranscript([]);
    setWebCallAudioLevel(0);
    setWebCallError("");
  };

  /* ── The core form UI (shared between standalone and embedded modes) ── */
  const formContent = (
    <AnimatePresence mode="wait">
      {status === "success" && isWebCall ? (
        <motion.div
          key="webcall-success"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center text-center py-6 gap-5"
        >
          <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
            <Mic className={`h-7 w-7 text-primary ${webCallStarted ? 'animate-pulse' : ''}`} />
          </div>
          <div className="max-w-md px-2">
            <h3 className="text-xl font-bold text-foreground mb-1.5">Talk to AI Live on Web</h3>
            <p className="text-xs text-yellow-500 font-semibold mb-3 flex items-center justify-center gap-1">
              <span>⚠️ Phone calls are only made to US numbers, but you can still talk to tech live!</span>
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-sm mx-auto">
              Experience the power of our voice agent directly in your browser. Just allow microphone access and start talking!
            </p>
          </div>

          <div className="w-full max-w-sm bg-background/50 border border-border rounded-2xl p-5 flex flex-col items-center gap-4 relative overflow-hidden shadow-inner">
            {webCallStarted && (
              <div 
                className="absolute inset-0 bg-primary/[0.03] transition-all duration-75 pointer-events-none"
                style={{ opacity: 0.3 + webCallAudioLevel * 0.7 }}
              />
            )}

            <div className="flex items-center gap-2.5 z-10">
              {webCallStarting && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
                  <span>Connecting to AI...</span>
                </div>
              )}
              {webCallStarted && (
                <div className="flex items-center gap-2 text-xs text-green-500 font-medium">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
                  <span>Call Live</span>
                </div>
              )}
              {webCallEnded && (
                <div className="text-xs text-muted-foreground">
                  <span>Call Ended</span>
                </div>
              )}
              {!webCallStarting && !webCallStarted && !webCallEnded && (
                <div className="text-xs text-muted-foreground">
                  <span>Ready to start</span>
                </div>
              )}
            </div>

            {webCallStarted && (
              <div className="flex items-center gap-1 h-6 z-10">
                {[0.2, 0.4, 0.8, 0.5, 0.3, 0.7, 0.9, 0.6, 0.4, 0.2].map((multiplier, i) => (
                  <motion.div
                    key={i}
                    className="w-0.5 rounded-full bg-primary"
                    animate={{
                      height: webCallAudioLevel > 0 
                        ? [4, Math.max(4, webCallAudioLevel * 24 * multiplier), 4] 
                        : 4
                    }}
                    transition={{
                      duration: 0.4 + Math.random() * 0.3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>
            )}

            {webCallError && (
              <div className="text-[11px] text-red-400 bg-red-500/10 px-3 py-1.5 rounded-xl border border-red-500/20 text-center w-full z-10">
                {webCallError}
              </div>
            )}

            <div className="flex items-center justify-center gap-3 w-full mt-1 z-10">
              {!webCallStarted && !webCallStarting ? (
                <button
                  type="button"
                  onClick={startWebCall}
                  className="flex items-center justify-center gap-2 px-5 py-2 text-xs font-bold rounded-full text-white bg-primary hover:bg-primary/90 transition-all shadow-[0_0_15px_hsl(230_100%_62%_/_0.3)] w-full sm:w-auto"
                >
                  <Mic className="h-3.5 w-3.5" />
                  <span>Start Web Call</span>
                </button>
              ) : webCallStarting ? (
                <button
                  type="button"
                  disabled
                  className="flex items-center justify-center gap-2 px-5 py-2 text-xs font-bold rounded-full text-white bg-primary/40 cursor-not-allowed w-full sm:w-auto"
                >
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span>Connecting...</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={stopWebCall}
                  className="flex items-center justify-center gap-2 px-5 py-2 text-xs font-bold rounded-full text-white border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 transition-all w-full sm:w-auto"
                >
                  <Phone className="h-3.5 w-3.5 text-red-400" />
                  <span>End Call</span>
                </button>
              )}
            </div>

            {webCallTranscript.length > 0 && !webCallEnded && (
              <div className="w-full border-t border-border/30 pt-3 mt-1 max-h-24 overflow-y-auto px-1 flex flex-col gap-2 text-left z-10">
                {webCallTranscript.slice(-2).map((item, idx) => (
                  <div key={idx} className="flex flex-col gap-0.5">
                    <span className={`text-[8px] font-bold uppercase tracking-wider ${item.role === 'user' ? 'text-primary' : 'text-purple-400'}`}>
                      {item.role === 'user' ? 'You' : 'AI'}
                    </span>
                    <span className="text-[11px] text-foreground/80 leading-relaxed font-light">
                      {item.content}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => {
              stopWebCall();
              setIsWebCall(false);
              resetForm();
            }}
            className="text-[11px] text-muted-foreground hover:text-primary transition-colors underline underline-offset-4"
          >
            Go back to form
          </button>
        </motion.div>
      ) : status === "success" ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center text-center py-8 gap-5"
        >
          <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
            <CheckCircle className="h-7 w-7 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground mb-2">Your AI call is on its way!</h3>
            <p className="text-sm text-muted-foreground">
              Our AI agent is calling <span className="text-primary font-semibold">{phone}</span> right now.<br />
              Pick up and experience the future of voice AI.
            </p>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
            <span className="w-2 h-2 rounded-full bg-primary animate-ping" style={{ animationDelay: "0.2s" }} />
            <span className="w-2 h-2 rounded-full bg-primary animate-ping" style={{ animationDelay: "0.4s" }} />
            <span className="text-sm text-muted-foreground ml-2">Connecting your call…</span>
          </div>
          <button
            type="button"
            onClick={resetForm}
            className="mt-2 text-xs text-muted-foreground hover:text-primary transition-colors underline underline-offset-4"
          >
            Try again with a different number
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onSubmit={handleSubmit}
          className="flex flex-col gap-5"
        >
          {/* [SECURITY] Honeypot — invisible to humans, auto-filled by bots */}
          <div style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none" }} aria-hidden="true">
            <input type="text" name="b_username" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} tabIndex={-1} autoComplete="new-password" />
          </div>
          {/* Name + Email row */}
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-muted-foreground tracking-wide uppercase" htmlFor={`${idPrefix}-name`}>
                Your Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
                <input
                  id={`${idPrefix}-name`}
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Smith"
                  className="w-full pl-10 pr-4 py-3 text-sm bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all duration-300"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-muted-foreground tracking-wide uppercase" htmlFor={`${idPrefix}-email`}>
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
                <input
                  id={`${idPrefix}-email`}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@company.com"
                  className="w-full pl-10 pr-4 py-3 text-sm bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all duration-300"
                />
              </div>
            </div>
          </div>

          {/* Phone number — required */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-muted-foreground tracking-wide uppercase" htmlFor={`${idPrefix}-phone`}>
              Phone Number <span className="text-primary">*</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
              <input
                id={`${idPrefix}-phone`}
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 000-0000"
                required
                className="w-full pl-10 pr-4 py-3.5 text-sm bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all duration-300 text-base"
              />
            </div>
            <p className="text-[11px] text-muted-foreground">US numbers only. The AI will call you within seconds.</p>
          </div>

          {/* Error message */}
          {status === "error" && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2.5 p-3.5 rounded-xl bg-destructive/10 border border-destructive/20 text-sm text-destructive"
            >
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{errorMsg || "Something went wrong. Please try again."}</span>
            </motion.div>
          )}

          {/* Turnstile Verification */}
          <div className="flex justify-center my-2">
            <Turnstile
              key={theme}
              siteKey={TURNSTILE_SITE_KEY}
              onSuccess={(token) => setTurnstileToken(token)}
              onExpire={() => setTurnstileToken(null)}
              onError={() => setTurnstileToken(null)}
              options={{ theme: theme === "dark" ? "dark" : theme === "light" ? "light" : "auto" }}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={status === "loading" || !phone.trim() || !turnstileToken}
            className="group relative flex items-center justify-center gap-3 w-full py-4 text-sm font-bold rounded-xl text-white bg-primary hover:bg-primary/90 transition-all duration-300 shadow-[0_0_30px_hsl(230_100%_62%_/_0.4)] hover:shadow-[0_0_50px_hsl(230_100%_62%_/_0.6)] disabled:opacity-60 disabled:cursor-not-allowed disabled:shadow-none"
          >
            {status === "loading" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Connecting your call…</span>
              </>
            ) : (
              <>
                <Mic className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                <span>Call Me Now — It's Free</span>
              </>
            )}
          </button>

          <p className="text-center text-[11px] text-muted-foreground/50">
            By submitting, you agree to receive a one-time AI demo call. No spam, ever.
          </p>
        </motion.form>
      )}
    </AnimatePresence>
  );

  /* ── Embedded mode: just the form, no wrapper ── */
  if (embedded) {
    return formContent;
  }

  /* ── Standalone mode: full section with header + card ── */
  return (
    <section className="py-24 sm:py-36 bg-background relative overflow-hidden">
      {/* Ambient brand glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-primary/[0.05] blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto">

          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-8 bg-primary/50" />
              <p className="text-[10px] tracking-[0.5em] uppercase text-primary font-semibold">Live Demo</p>
              <div className="h-px w-8 bg-primary/50" />
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold text-foreground tracking-tight font-heading mb-4 leading-[1.1]">
              Get an instant AI call.<br />
              <span className="text-primary">No waiting. No credit card.</span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-lg mx-auto leading-relaxed">
              Enter your details below and our AI voice agent will call you within seconds. Experience first-hand how it handles real conversations.
            </p>
          </motion.div>

          {/* Form card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="bg-card border border-border rounded-2xl p-8 sm:p-10 relative overflow-hidden"
          >
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
            {formContent}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
