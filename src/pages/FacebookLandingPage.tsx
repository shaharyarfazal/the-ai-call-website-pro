import React, { useState, useCallback, useRef, Suspense, lazy, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { getCanonicalUrl } from '@/lib/seo';
import { Link } from 'react-router-dom';
import { Mic, Phone, Loader2, RefreshCw, X, CheckCircle, AlertCircle, MapPin, Mail } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeToggle } from '@/components/ThemeToggle';
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/LocalThemeProvider";
import { CallbackForm } from "@/components/home/CallbackForm";

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
const RETELL_AGENT_ID = "agent_bc07b033648e16db0c6af7c709";

interface TranscriptEntry {
  role: "user" | "agent";
  content: string;
}

type CallStatus = "idle" | "loading" | "success" | "error";

export default function FacebookLandingPage() {
  const { theme } = useTheme();
  const canonical = getCanonicalUrl('/ai-voice-receptionist-demo');

  // ── Scrolled state for identical Header experience ──
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Retell web-call state (identical to Demo.tsx) ──
  const [callStarted, setCallStarted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [error, setError] = useState("");
  const [liveTranscript, setLiveTranscript] = useState<TranscriptEntry[]>([]);
  const [audioLevel, setAudioLevel] = useState(0);

  // ── Exit Intent Popup State ──
  const [showExitPopup, setShowExitPopup] = useState(false);

  const retellClientRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioStreamRef = useRef<MediaStream | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // ── Exit Intent Trigger (Triggers only once per session) ──
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 20) {
        const hasShown = sessionStorage.getItem('exit_intent_shown');
        if (!hasShown) {
          setShowExitPopup(true);
          sessionStorage.setItem('exit_intent_shown', 'true');
        }
      }
    };
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // handlePopupSubmit is now handled by the unified CallbackForm component

  // ── Retell Audio Stream Analysis ──
  const stopAudioAnalysis = () => {
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    if (audioStreamRef.current) audioStreamRef.current.getTracks().forEach(t => t.stop());
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') audioContextRef.current.close();
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
        if (analyserRef.current) {
          analyserRef.current.getByteFrequencyData(buf);
          setAudioLevel(buf.reduce((a, v) => a + v, 0) / buf.length / 128);
        }
        animationFrameRef.current = requestAnimationFrame(tick);
      };
      tick();
    } catch {
      setError("Could not access microphone. Please check permissions.");
    }
  };

  const handleStartCall = useCallback(async () => {
    if (callEnded) {
      setLiveTranscript([]);
      setCallEnded(false);
    }
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
      if (!audioStreamRef.current) {
        setIsStarting(false);
        return;
      }

      const client = new RetellWebClient();
      retellClientRef.current = client;
      client.on("call_started", () => {
        setCallStarted(true);
        setCallEnded(false);
        setIsStarting(false);
      });
      client.on("call_ended", () => {
        setCallEnded(true);
        setCallStarted(false);
        stopAudioAnalysis();
      });
      client.on("error", (err: any) => {
        setError(`SDK error: ${String(err)}`);
        setCallStarted(false);
        setIsStarting(false);
        stopAudioAnalysis();
      });
      client.on("update", (update: any) => {
        if (update.transcript) setLiveTranscript(update.transcript);
      });
      await client.startCall({ accessToken: data.access_token });
    } catch (err) {
      setError(`Error starting call: ${(err as Error).message}`);
      setIsStarting(false);
      stopAudioAnalysis();
    }
  }, [callEnded]);

  const endVoiceCall = useCallback(() => {
    retellClientRef.current?.stopCall();
  }, []);

  const resetCall = useCallback(() => {
    if (retellClientRef.current && callStarted) retellClientRef.current.stopCall();
    stopAudioAnalysis();
    setCallStarted(false);
    setCallEnded(false);
    setError("");
    setLiveTranscript([]);
    setIsStarting(false);
    retellClientRef.current = null;
  }, [callStarted]);

  const scrollToForm = () => {
    document.getElementById('demo-callback-widget')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen bg-background relative z-10 text-foreground">
      <Helmet>
        <title>AI Voice Receptionist Live Demo | The AI Call Pro</title>
        <meta name="description" content="Experience a live demo of our custom clinical and professional voice AI receptionists. Qualify prospects, book appointments 24/7, and test sub-second latency." />
        <meta name="keywords" content="AI voice receptionist demo, test voice bot live, clinical answering bot demo, automated appointment scheduling demo" />
        <link rel="canonical" href={canonical} />

        {/* Open Graph */}
        <meta property="og:title" content="AI Voice Receptionist Live Demo | The AI Call Pro" />
        <meta property="og:description" content="Experience a live demo of our custom clinical and professional voice AI receptionists. Qualify prospects, book appointments 24/7, and test sub-second latency." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content="https://theaicall.pro/uploads/logo-96.png" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AI Voice Receptionist Live Demo" />
        <meta name="twitter:description" content="Talk to our custom voice agents live and test our ultra-low conversation latency in real time." />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "AI Voice Answering receptionist Live Demo Page",
            "description": "Interactive live demo playground where professional teams can talk to our voice bot and test automated scheduling.",
            "url": canonical,
            "publisher": {
              "@type": "Organization",
              "name": "The AI Call Pro",
              "url": "https://theaicall.pro"
            }
          })}
        </script>
      </Helmet>

      {/* ── Identical Premium Header structure, minus center links and CTA buttons ── */}
      <header className={cn("fixed top-0 left-0 right-0 z-[100] px-3 sm:px-4 transition-all duration-500", scrolled ? "py-2" : "py-3 sm:py-4")} role="banner">
        <nav className={cn("container mx-auto max-w-5xl flex items-center justify-between relative px-4 sm:px-5 rounded-2xl transition-all duration-500", scrolled ? "py-2 bg-background/70 backdrop-blur-xl border border-foreground/[0.06] shadow-lg shadow-black/5" : "py-2.5 bg-background/40 backdrop-blur-md border border-foreground/[0.03] shadow-sm")} aria-label="Main navigation">
          
          {/* Brand Logo (Links to page itself to lock focus) */}
          <Link to="/ai-voice-receptionist-demo" className="flex items-center gap-2.5 z-10 hover:opacity-80 transition-opacity shrink-0">
            <img 
              src="/uploads/logo-96.png" 
              alt="The AI Call Pro" 
              width="44" 
              height="44" 
              className={cn("object-contain transition-all duration-300", scrolled ? "h-11 w-11 sm:h-9 sm:w-9" : "h-[50px] w-[50px] sm:h-11 sm:w-11")} 
            />
            <span className={cn("font-bold font-heading tracking-tight text-foreground transition-all duration-300", scrolled ? "text-xl sm:text-lg" : "text-2xl sm:text-xl")}>
              The AI Call Pro
            </span>
          </Link>

          {/* Theme toggle only — absolute zero escape routes! */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>

        </nav>
      </header>

      <main className="flex-grow relative z-10">
        {/* ═══════ HERO SECTION (Identical to Demo.tsx) ═══════ */}
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
                Scale Inbound{' '}
                <br className="hidden sm:block" />
                with <span className="text-primary">Premium Voice AI</span>
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-5 sm:mb-6 leading-relaxed animate-[fadeInUp_0.8s_ease-out_0.35s_both] px-2">
                Intelligent clinical and agency voice receptionists that qualify prospect inquiries, schedule consultations, and automate customer support 24/7. Fully customized for professional workflows.
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
                      className="group relative flex items-center gap-3 px-8 sm:px-10 py-3.5 sm:py-4 text-sm font-bold rounded-full text-white transition-all duration-300 w-full sm:w-auto justify-center"
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
                  <button disabled className="flex items-center gap-3 px-8 sm:px-10 py-3.5 sm:py-4 text-sm font-bold rounded-full text-white bg-primary/50 cursor-not-allowed w-full sm:w-auto justify-center">
                    <Loader2 className="h-4 w-4 animate-spin text-white" />
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

      {/* ── Identical Premium Footer, completely stripped of link columns ── */}
      <footer className="w-full bg-card/50 border-t border-foreground/[0.05] text-foreground relative z-10" role="contentinfo">
        <div className="container mx-auto max-w-5xl px-4 sm:px-5 pt-12 pb-8 text-center flex flex-col items-center justify-center">
          
          {/* Centered Brand block */}
          <div className="flex flex-col items-center max-w-2xl">
            <div className="flex items-center gap-2.5 mb-4 group">
              <img
                src="/uploads/logo-96.png"
                alt="The AI Call Pro Logo"
                width="44"
                height="44"
                loading="lazy"
                className="h-[50px] w-[50px] sm:h-11 sm:w-11 object-contain transition-all duration-300"
              />
              <span className="font-bold font-heading tracking-tight text-foreground text-2xl sm:text-xl">The AI Call Pro</span>
            </div>
            
            <address className="not-italic flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-muted-foreground/50" />
                <span>info@theaicall.pro</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-muted-foreground/50" />
                <span>+1 (903) 209-2622</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-muted-foreground/50 shrink-0" />
                <span>United States</span>
              </div>
            </address>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mt-12 mb-8 py-6 border-t border-b border-foreground/[0.05] w-full">
            {[
              { value: '500+', label: 'Businesses Served' },
              { value: '50,000+', label: 'Calls Answered Daily' },
              { value: '<1s', label: 'Average Answer Time' },
              { value: '4.9★', label: 'Client Rating' },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-2 text-center">
                <span className="text-sm sm:text-base font-bold text-primary">{stat.value}</span>
                <span className="text-[10px] sm:text-[11px] text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* Bottom copyright alignment bar */}
          <div className="flex justify-center items-center text-xs text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} The AI Call Pro. All Rights Reserved.</p>
          </div>
        </div>
      </footer>

      {/* ── Exit Intent Popup Modal — Unified CallbackForm ── */}
      <AnimatePresence>
        {showExitPopup && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            {/* Dark blur backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowExitPopup(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              className="relative w-full max-w-xl bg-card border border-primary/30 rounded-2xl p-6 sm:p-8 overflow-hidden shadow-2xl shadow-primary/10"
            >
              {/* Top gradient trace */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

              {/* Close Button */}
              <button
                onClick={() => setShowExitPopup(false)}
                className="absolute right-4 top-4 text-muted-foreground hover:text-foreground hover:bg-foreground/5 p-1.5 rounded-lg transition-colors z-10"
                aria-label="Close modal"
              >
                <X className="h-4.5 w-4.5" />
              </button>

              {/* Header */}
              <div className="text-center mb-5">
                <div className="inline-flex items-center gap-2 bg-primary/10 px-3 py-1 rounded-full text-primary text-[11px] font-semibold mb-4 border border-primary/20">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  Free Instant Callback
                </div>
                <h3 className="text-2xl font-bold tracking-tight text-foreground font-heading">
                  Wait! Try the AI live before you go.
                </h3>
                <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto leading-relaxed">
                  Enter your details below and our AI voice agent will call you within seconds. Experience first-hand how it handles real conversations.
                </p>
              </div>

              {/* Unified 3-field CallbackForm */}
              <CallbackForm embedded idPrefix="exit-popup" agentId={RETELL_AGENT_ID} />

              {/* Skip link */}
              <div className="text-center mt-4">
                <button
                  type="button"
                  onClick={() => setShowExitPopup(false)}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2 py-1"
                >
                  No thanks, I'll skip and continue reading
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
