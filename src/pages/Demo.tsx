import React, { useState, useCallback, useRef, Suspense, lazy } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Helmet } from 'react-helmet-async';
import { getCanonicalUrl } from '@/lib/seo';
import { Mic, Phone, Loader2, RefreshCw } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

// Lazy load sections below the fold
const DemoProblemSection = lazy(() => import('@/components/demo/DemoProblemSection'));
const DemoSolutionSection = lazy(() => import('@/components/demo/DemoSolutionSection'));
const DemoHowItWorks = lazy(() => import('@/components/demo/DemoHowItWorks'));
const DemoAudioSection = lazy(() => import('@/components/demo/DemoAudioSection'));
const DemoSocialProof = lazy(() => import('@/components/demo/DemoSocialProof'));
const DemoIndustryResults = lazy(() => import('@/components/demo/DemoIndustryResults'));
const DemoROICalculator = lazy(() => import('@/components/demo/DemoROICalculator'));
const DemoPricing = lazy(() => import('@/components/demo/DemoPricing'));
const DemoFAQ = lazy(() => import('@/components/demo/DemoFAQ'));
const DemoCallbackWidget = lazy(() => import('@/components/demo/DemoCallbackWidget'));
const DemoFinalCTA = lazy(() => import('@/components/demo/DemoFinalCTA'));

const agentId = "agent_70866a09c027a32a445b4d10e9";
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://goycrjqlfmwzigimawti.supabase.co";
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdveWNyanFsZm13emlnaW1hd3RpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5OTEzMTYsImV4cCI6MjA2NTU2NzMxNn0.bbYO1ESv9OrIL3AYJLLftO9Xay4WccaOzkZloaBzfKY";
const INTERNAL_SECRET = import.meta.env.VITE_INTERNAL_API_SECRET || "kDA5Na-MjH3qeuw-Internal_api-keys";

interface TranscriptEntry {
  role: "user" | "agent";
  content: string;
}

export default function Demo() {
  const canonical = getCanonicalUrl('/demo');

  // ── Retell web-call state (mirrors Index.tsx) ──
  const [callStarted, setCallStarted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [error, setError] = useState("");
  const [liveTranscript, setLiveTranscript] = useState<TranscriptEntry[]>([]);
  const [audioLevel, setAudioLevel] = useState(0);

  const retellClientRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioStreamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const stopAudioAnalysis = () => {
    if (animationFrameRef.current) { cancelAnimationFrame(animationFrameRef.current); animationFrameRef.current = null; }
    if (audioStreamRef.current) { audioStreamRef.current.getTracks().forEach((t) => t.stop()); audioStreamRef.current = null; }
    if (audioContextRef.current && audioContextRef.current.state !== "closed") { audioContextRef.current.close(); audioContextRef.current = null; }
    setAudioLevel(0);
  };

  const startAudioAnalysis = async () => {
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
        if (analyserRef.current) { analyserRef.current.getByteFrequencyData(buf); setAudioLevel(buf.reduce((a, v) => a + v, 0) / buf.length / 128); }
        animationFrameRef.current = requestAnimationFrame(tick);
      };
      tick();
    } catch {
      setError("Could not access microphone. Please check permissions.");
    }
  };

  const handleStartCall = useCallback(async () => {
    if (callEnded) { setLiveTranscript([]); setCallEnded(false); }
    setIsStarting(true);
    setError("");
    try {
      const { RetellWebClient } = await import('retell-client-js-sdk');
      const anonKey = SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdveWNyanFsZm13emlnaW1hd3RpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5OTEzMTYsImV4cCI6MjA2NTU2NzMxNn0.bbYO1ESv9OrIL3AYJLLftO9Xay4WccaOzkZloaBzfKY";
      const res = await fetch(`${SUPABASE_URL}/functions/v1/create-webcall`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": anonKey,
          "Authorization": `Bearer ${anonKey}`,
          ...(INTERNAL_SECRET ? { "x-internal-secret": INTERNAL_SECRET } : {}),
        },
        body: JSON.stringify({ agent_id: agentId }),
      });
      if (!res.ok) throw new Error(`Failed to create webcall: ${await res.text()}`);
      const data = await res.json();
      await startAudioAnalysis();
      if (!audioStreamRef.current) { setIsStarting(false); return; }

      const client = new RetellWebClient();
      retellClientRef.current = client;
      client.on("call_started", () => { setCallStarted(true); setCallEnded(false); setIsStarting(false); });
      client.on("call_ended", () => { setCallEnded(true); setCallStarted(false); stopAudioAnalysis(); });
      client.on("error", (err: any) => { setError(`SDK error: ${String(err)}`); setCallStarted(false); setIsStarting(false); stopAudioAnalysis(); });
      client.on("update", (update: any) => { if (update.transcript) setLiveTranscript(update.transcript); });
      await client.startCall({ accessToken: data.access_token });
    } catch (err) {
      setError(`Error starting call: ${(err as Error).message}`);
      setIsStarting(false);
      stopAudioAnalysis();
    }
  }, [callEnded]);

  const endVoiceCall = useCallback(() => { retellClientRef.current?.stopCall(); }, []);

  const resetCall = useCallback(() => {
    if (retellClientRef.current && callStarted) retellClientRef.current.stopCall();
    stopAudioAnalysis();
    setCallStarted(false); setCallEnded(false); setError(""); setLiveTranscript([]); setIsStarting(false);
    retellClientRef.current = null;
  }, [callStarted]);

  const scrollToForm = () => {
    document.getElementById('demo-callback-widget')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToCallback = () => {
    document.getElementById('demo-callback-widget')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen bg-background relative z-10 text-foreground">
      <Helmet>
        <title>Free Demo — Stop Losing Revenue to Missed Calls | The AI Call</title>
        <meta name="description" content="Book a free demo and see how AI voice agents answer every call in under 1 second. 500+ businesses trust The AI Call. No credit card required." />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content="Free Demo — AI Voice Agents That Answer Every Call" />
        <meta property="og:description" content="Stop losing revenue to missed calls. AI answers every call in <1 second, qualifies leads, books appointments 24/7." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Free Demo — The AI Call",
            "description": "Book a free demo of AI voice agents that answer every call in under 1 second.",
            "url": canonical,
            "provider": { "@type": "Organization", "name": "The AI Call", "url": "https://theaicall.pro" }
          })}
        </script>
      </Helmet>

      <Header />

      <main className="flex-grow relative z-10">
        {/* ═══════ HERO SECTION ═══════ */}
        <section className="relative pt-28 sm:pt-36 pb-16 sm:pb-24 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[800px] h-[400px] sm:h-[600px] rounded-full bg-primary/[0.06] blur-[150px] pointer-events-none" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              {/* Urgency badge */}
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full border border-red-500/30 bg-red-500/5 backdrop-blur-sm mb-6 sm:mb-8 animate-[fadeInUp_0.6s_ease-out_0.1s_both]">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[10px] sm:text-xs tracking-[0.15em] sm:tracking-[0.2em] uppercase text-red-400 font-bold">62% of Calls Go Unanswered</span>
              </div>

              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-tight font-heading mb-5 sm:mb-6 leading-[1.08] animate-[fadeInUp_0.8s_ease-out_0.2s_both]">
                Stop Losing Revenue{' '}
                <br className="hidden sm:block" />
                to <span className="text-primary">Missed Calls</span>
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-5 sm:mb-6 leading-relaxed animate-[fadeInUp_0.8s_ease-out_0.35s_both] px-2">
                AI Voice Agents That Answer Every Call in <span className="text-primary font-semibold">&lt;1 Second</span> — Qualify Leads, Book Appointments, and Close Deals 24/7.
              </p>

              {/* Social proof bar */}
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-8 mb-8 sm:mb-10 animate-[fadeInUp_0.8s_ease-out_0.45s_both]">
                {[
                  { value: '500+', label: 'Businesses' },
                  { value: '50,000+', label: 'Calls/Day' },
                  { value: '<1s', label: 'Answer Time' },
                  { value: '4.9/5', label: 'Rating' },
                ].map((stat) => (
                  <div key={stat.label} className="flex items-center gap-1.5 sm:gap-2">
                    <span className="text-xs sm:text-base font-bold text-primary">{stat.value}</span>
                    <span className="text-[10px] sm:text-[11px] text-muted-foreground">{stat.label}</span>
                  </div>
                ))}
              </div>

              {/* ── Live transcript subtitle (visible during call) ── */}
              <div className="w-full max-w-2xl mx-auto min-h-[60px] sm:min-h-[80px] flex flex-col items-center justify-end mb-4">
                <AnimatePresence mode="wait">
                  {callStarted && liveTranscript.length === 0 && (
                    <motion.div key="listening" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                      <motion.span animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 1, repeat: Infinity, delay: 0 }} className="w-1.5 h-1.5 bg-cyan-400/50 rounded-full" />
                      <motion.span animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 1, repeat: Infinity, delay: 0.2 }} className="w-1.5 h-1.5 bg-cyan-400/50 rounded-full" />
                      <motion.span animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 1, repeat: Infinity, delay: 0.4 }} className="w-1.5 h-1.5 bg-cyan-400/50 rounded-full" />
                    </motion.div>
                  )}
                  {liveTranscript.length > 0 && !callEnded && (
                    <motion.div
                      key={`sub-${liveTranscript.length}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="text-center px-4 sm:px-6 py-3 rounded-xl bg-background/80 backdrop-blur-xl border border-foreground/10 max-w-xl shadow-lg shadow-black/5"
                    >
                      <span className={`text-[9px] font-semibold uppercase tracking-[0.25em] mr-3 ${liveTranscript[liveTranscript.length - 1]?.role === 'user' ? 'text-cyan-400/70' : 'text-purple-400/70'}`}>
                        {liveTranscript[liveTranscript.length - 1]?.role === 'user' ? 'You' : 'AI'}
                      </span>
                      <span className="text-sm sm:text-base text-foreground/90 font-light leading-relaxed">
                        {liveTranscript[liveTranscript.length - 1]?.content}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 animate-[fadeInUp_0.8s_ease-out_0.55s_both]">
                {!callStarted && !isStarting ? (
                  <>
                    <button
                      onClick={scrollToForm}
                      className="group relative flex items-center gap-3 px-8 sm:px-10 py-3.5 sm:py-4 text-sm font-bold rounded-full text-black bg-primary hover:bg-primary/90 transition-all duration-300 shadow-[0_0_35px_hsl(32_100%_52%_/_0.45)] hover:shadow-[0_0_55px_hsl(32_100%_52%_/_0.65)] w-full sm:w-auto justify-center"
                    >
                      <span>Book Free Demo</span>
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </button>
                    <button
                      onClick={handleStartCall}
                      className="group flex items-center gap-3 px-8 sm:px-10 py-3.5 sm:py-4 text-sm font-medium rounded-full text-foreground/80 border border-foreground/20 hover:border-primary/50 hover:text-primary hover:bg-primary/5 transition-all duration-300 w-full sm:w-auto justify-center"
                    >
                      <Mic className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                      <span>Talk With AI Now</span>
                    </button>
                  </>
                ) : isStarting ? (
                  <button disabled className="flex items-center gap-3 px-8 sm:px-10 py-3.5 sm:py-4 text-sm font-bold rounded-full text-black bg-primary/50 cursor-not-allowed w-full sm:w-auto justify-center">
                    <Loader2 className="h-4 w-4 animate-spin text-black" />
                    <span>Connecting...</span>
                  </button>
                ) : (
                  <button
                    onClick={endVoiceCall}
                    className="group flex items-center gap-3 px-8 sm:px-10 py-3.5 sm:py-4 text-sm font-medium rounded-full text-white border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 backdrop-blur-sm transition-all duration-400 cursor-pointer w-full sm:w-auto justify-center"
                  >
                    <Phone className="h-4 w-4 text-red-400" />
                    <span>End Call</span>
                  </button>
                )}
              </div>

              {/* Error */}
              {error && (
                <div className="flex flex-col items-center gap-3 mt-6 max-w-md mx-auto px-4">
                  <div className="bg-red-500/10 backdrop-blur-sm text-red-300 p-3 rounded-xl border border-red-500/20 text-center text-sm w-full">⚠️ {error}</div>
                  <button onClick={resetCall} className="flex items-center gap-2 px-5 py-2.5 text-sm rounded-full text-foreground border border-foreground/20 hover:bg-foreground/10 transition-all">
                    <RefreshCw className="h-4 w-4" /><span>Try Again</span>
                  </button>
                </div>
              )}

              <p className="text-[10px] sm:text-[11px] text-muted-foreground/50 mt-5 sm:mt-6 animate-[fadeInUp_0.8s_ease-out_0.65s_both]">No credit card required · 15-minute strategy call · Cancel anytime</p>
            </div>
          </div>
        </section>

        <Suspense fallback={null}>
          <DemoProblemSection />
          <DemoSolutionSection />
          <DemoHowItWorks />
          <DemoAudioSection />
          <DemoSocialProof />
          <DemoIndustryResults />
          <DemoROICalculator />
          <DemoPricing />
          <DemoCallbackWidget />
          <DemoFAQ />
          <DemoFinalCTA onScrollToForm={scrollToForm} onStartCall={handleStartCall} isCallActive={callStarted || isStarting} />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}