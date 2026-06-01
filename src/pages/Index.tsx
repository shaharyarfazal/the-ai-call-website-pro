import React, { useState, useEffect, useRef, useCallback, Suspense, lazy } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Mic, Phone, Loader2, RefreshCw } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Helmet } from 'react-helmet-async';
import { getCanonicalUrl } from '@/lib/seo';
import { AnimatePresence, motion } from "framer-motion";
import { FluidBackground } from "@/components/ui/FluidBackground";
import { NorthernLights } from "@/components/ui/NorthernLights";

// Lazy load below-the-fold sections to shrink initial JS bundle
const TrustedBy = lazy(() => import("@/components/home/TrustedBy").then(m => ({ default: m.TrustedBy })));
const ProblemSolutionSection = lazy(() => import("@/components/home/ProblemSolutionSection").then(m => ({ default: m.ProblemSolutionSection })));
const FeaturesSection = lazy(() => import("@/components/home/FeaturesSection").then(m => ({ default: m.FeaturesSection })));
const UseCasesSection = lazy(() => import("@/components/home/UseCasesSection").then(m => ({ default: m.UseCasesSection })));
const BenefitsSection = lazy(() => import("@/components/home/BenefitsSection").then(m => ({ default: m.BenefitsSection })));
const HowItWorksSection = lazy(() => import("@/components/home/HowItWorksSection").then(m => ({ default: m.HowItWorksSection })));
const VoiceDemoSection = lazy(() => import("@/components/home/VoiceDemoSection").then(m => ({ default: m.VoiceDemoSection })));
const CallbackForm = lazy(() => import("@/components/home/CallbackForm").then(m => ({ default: m.CallbackForm })));
const TestimonialsSection = lazy(() => import("@/components/home/TestimonialsSection").then(m => ({ default: m.TestimonialsSection })));
const CtaSection = lazy(() => import("@/components/home/CtaSection").then(m => ({ default: m.CtaSection })));

// Index component - Main landing page

// Lazy load components with error boundaries
const ChatMoon = lazy(() => 
  import("@/components/ChatMoon").catch(err => {
    console.warn('Failed to load ChatMoon:', err);
    return { default: () => null };
  })
);

const ChatMoonPanel = lazy(() => 
  import("@/components/ChatMoonPanel").catch(err => {
    console.warn('Failed to load ChatMoonPanel:', err);
    return { default: () => null };
  })
);


const agentId = "agent_70866a09c027a32a445b4d10e9";
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://goycrjqlfmwzigimawti.supabase.co";
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdveWNyanFsZm13emlnaW1hd3RpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5OTEzMTYsImV4cCI6MjA2NTU2NzMxNn0.bbYO1ESv9OrIL3AYJLLftO9Xay4WccaOzkZloaBzfKY";
const INTERNAL_SECRET = import.meta.env.VITE_INTERNAL_API_SECRET || "kDA5Na-MjH3qeuw-Internal_api-keys";

interface TranscriptEntry {
  role: "user" | "agent";
  content: string;
}

export default function Index() {
  const [callId, setCallId] = useState("");
  const [callStarted, setCallStarted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [error, setError] = useState("");
  const [liveTranscript, setLiveTranscript] = useState<TranscriptEntry[]>([]);
  const [audioLevel, setAudioLevel] = useState(0);
  
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const startCallProcessed = useRef(false);

  const canonical = getCanonicalUrl('/');

  const retellClientRef = useRef<any>(null);
  const transcriptEndRef = useRef<null | HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioStreamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const scrollToBottom = useCallback(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [liveTranscript, scrollToBottom]);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const stopAudioAnalysis = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (audioStreamRef.current) {
      audioStreamRef.current.getTracks().forEach((track) => track.stop());
      audioStreamRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state !== "closed") {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    setAudioLevel(0);
  };

  const startAudioAnalysis = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioStreamRef.current = stream;
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioContextRef.current = audioContext;
      const analyser = audioContext.createAnalyser();
      analyserRef.current = analyser;
      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);
      analyser.fftSize = 256;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const updateAudioLevel = () => {
        if (analyserRef.current) {
          analyserRef.current.getByteFrequencyData(dataArray);
          const average = dataArray.reduce((acc, val) => acc + val, 0) / bufferLength;
          setAudioLevel(average / 128);
        }
        animationFrameRef.current = requestAnimationFrame(updateAudioLevel);
      };
      updateAudioLevel();
    } catch (err) {
      console.error("Failed to get audio stream for visualization:", err);
      setError("Could not access microphone for voice visualization. Please check permissions.");
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
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Failed to create webcall: ${text}`);
      }
      const data = await res.json();
      setCallId(data.call_id);
      
      const { access_token } = data;

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

      client.on("error", (err) => {
        console.error("Retell SDK error:", err);
        setError(`Retell SDK error: ${String(err)}`);
        setCallStarted(false);
        setIsStarting(false);
        stopAudioAnalysis();
      });

      client.on("update", (update) => {
        if (update.transcript) {
          setLiveTranscript(update.transcript);
        }
      });

      await client.startCall({ accessToken: access_token });
      
    } catch (err) {
      setError(`Error starting call: ${(err as Error).message}`);
      setIsStarting(false);
      stopAudioAnalysis();
    }
  }, [callEnded]);

  useEffect(() => {
    if (hasMounted && !startCallProcessed.current) {
      const params = new URLSearchParams(window.location.search);
      if (params.get("startCall") === "true") {
        startCallProcessed.current = true;
        window.history.replaceState({}, document.title, window.location.pathname);
        setTimeout(() => {
          handleStartCall();
        }, 800);
      }
    }
  }, [hasMounted, handleStartCall]);

  const endVoiceCall = useCallback(() => {
    if (retellClientRef.current) {
      retellClientRef.current.stopCall();
    }
  }, []);

  const resetCall = useCallback(() => {
    if (retellClientRef.current && callStarted) {
      retellClientRef.current.stopCall();
    }
    stopAudioAnalysis();
    setCallId("");
    setCallStarted(false);
    setCallEnded(false);
    setError("");
    setLiveTranscript([]);
    retellClientRef.current = null;
    setIsStarting(false);
  }, [callStarted]);

  const handleOpenChat = useCallback(() => setIsChatOpen(true), []);
  const handleCloseChat = useCallback(() => setIsChatOpen(false), []);

  return (
    <>
      <div className="hero-container flex flex-col min-h-screen text-foreground relative w-full overflow-x-hidden bg-background">
        <FluidBackground />
        {callStarted && <NorthernLights audioLevel={audioLevel} isListening={callStarted} />}
        <Helmet>
          <title>Top AI Calling Agency | Custom Voice AI Automation | The AI Call</title>
          <meta name="description" content="Hire the top AI calling agency to build custom voice AI agents for inbound triage and outbound sales. Certified Retell AI developers. Sub-second latency. Turn missed calls into booked meetings 24/7." />
          <meta name="keywords" content="top AI calling agency, voice AI agency, custom AI voice developers, Retell AI partner, inbound lead qualification, outbound sales AI, automated cold calling, AI phone automation, Synthflow alternative, USA" />
          <link rel="canonical" href={canonical} />
          <meta property="og:title" content="Top AI Calling Agency | Custom Voice AI Automation" />
          <meta property="og:description" content="Custom AI voice agents that handle inbound triage and outbound lead generation 24/7. Built by certified Retell AI developers." />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://theaicall.pro" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Top AI Calling Agency | The AI Call" />
          <meta name="twitter:description" content="Turn missed calls into booked meetings with custom AI voice agents. Certified Retell AI partner." />
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "The AI Call",
              "description": "Top AI calling agency specializing in custom voice AI solutions for inbound lead qualification and outbound sales, certified Retell AI partner.",
              "url": "https://theaicall.pro",
              "serviceType": "AI Voice Automation",
              "areaServed": "US",
              "hasCredential": "Certified Retell AI Partner"
            })}
          </script>
        </Helmet>
        
        <div className="relative z-[60] w-full"><Header /></div>
        
        <main className="relative z-10 flex flex-col flex-1 w-full bg-transparent">
          <div className="flex flex-col items-center justify-center w-full px-4 relative h-[100dvh] min-h-[600px] max-h-[900px]">
            
            {/* === HERO LAYOUT === */}
            <div className="max-w-5xl w-full mx-auto flex flex-col items-center justify-center gap-5 sm:gap-7 pt-20 sm:pt-24 pb-10 sm:pb-14">
              
              {/* Certified Retell AI Partner badge — CSS animation, no render-blocking JS */}
              <div
                className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm animate-[fadeInUp_0.6s_ease-out_0.1s_both]"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-[10px] sm:text-xs tracking-[0.25em] uppercase text-foreground/80 dark:text-primary font-bold">Certified Retell AI Partner</span>
              </div>

              {/* H1 — Word-by-word reveal with CSS animations */}
              <h1 className="relative text-center">
                {["Turn", "Missed", "Calls", "Into", "Booked", "Meetings."].map((word, i) => (
                  <span key={word} className="inline-block overflow-hidden mr-2 sm:mr-3">
                    <span
                      className="inline-block text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground tracking-tight leading-[1.1] font-heading animate-[slideUp_0.8s_cubic-bezier(0.22,1,0.36,1)_both]"
                      style={{ animationDelay: `${0.1 * i}s` }}
                    >
                      {word}
                    </span>
                  </span>
                ))}
              </h1>

              {/* Horizontal reveal line — CSS animation */}
              <div
                className="w-full max-w-xs h-px bg-gradient-to-r from-transparent via-white/30 to-transparent origin-center animate-[scaleInX_1.2s_cubic-bezier(0.22,1,0.36,1)_0.6s_both]"
              />

              {/* Sub-headline — CSS animation, no Framer Motion blocking LCP */}
              <p
                className="text-sm sm:text-base text-foreground/80 font-normal text-center max-w-2xl leading-relaxed animate-[fadeInUp_0.8s_ease-out_0.5s_both]"
              >
                We build custom AI voice agents that handle your inbound triage and outbound lead generation 24/7. Human-sounding conversations, fully integrated into your workflow.
              </p>

              {/* === MOVIE SUBTITLE TRANSCRIPT === */}
              {/* This sits in the natural flow above the buttons */}
              <div className="w-full max-w-2xl min-h-[40px] sm:min-h-[50px] flex flex-col items-center justify-end">
                <AnimatePresence mode="wait">
                  {callStarted && liveTranscript.length === 0 && (
                    <motion.div
                      key="listening"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <motion.span animate={{ opacity: [0.2,1,0.2] }} transition={{ duration: 1, repeat: Infinity, delay: 0 }} className="w-1.5 h-1.5 bg-cyan-400/50 rounded-full" />
                      <motion.span animate={{ opacity: [0.2,1,0.2] }} transition={{ duration: 1, repeat: Infinity, delay: 0.2 }} className="w-1.5 h-1.5 bg-cyan-400/50 rounded-full" />
                      <motion.span animate={{ opacity: [0.2,1,0.2] }} transition={{ duration: 1, repeat: Infinity, delay: 0.4 }} className="w-1.5 h-1.5 bg-cyan-400/50 rounded-full" />
                    </motion.div>
                  )}
                  {liveTranscript.length > 0 && !callEnded && (
                    <motion.div
                      key={`sub-${liveTranscript.length}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="text-center px-6 py-3 rounded-xl bg-background/80 backdrop-blur-xl border border-foreground/10 max-w-xl shadow-lg shadow-black/5"
                    >
                      <span className={`text-[9px] font-semibold uppercase tracking-[0.25em] mr-3 ${
                        liveTranscript[liveTranscript.length - 1]?.role === 'user' ? 'text-cyan-400/70' : 'text-purple-400/70'
                      }`}>
                        {liveTranscript[liveTranscript.length - 1]?.role === 'user' ? 'You' : 'AI'}
                      </span>
                      <span className="text-base sm:text-lg text-foreground/90 font-light leading-relaxed">
                        {liveTranscript[liveTranscript.length - 1]?.content}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* === BUTTONS — CSS animation === */}
              <div
                className="flex flex-col sm:flex-row items-center gap-4 animate-[fadeInUp_0.8s_ease-out_0.7s_both]"
              >
                {!callStarted && !isStarting ? (
                  <>
                    {/* Primary CTA — brand orange with glow */}
                    <button
                      onClick={handleStartCall}
                      className="group relative flex items-center gap-3 px-8 py-4 text-sm font-bold rounded-full text-black bg-primary hover:bg-primary/90 transition-all duration-300 cursor-pointer shadow-[0_0_30px_hsl(32_100%_52%_/_0.4)] hover:shadow-[0_0_55px_hsl(32_100%_52%_/_0.65)]"
                    >
                      <Mic className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                      <span>Talk With AI Now</span>
                    </button>
                    {/* Secondary ghost button */}
                    <a
                      href="/book-appointment"
                      className="flex items-center gap-3 px-8 py-4 text-sm font-medium rounded-full text-foreground/80 border border-foreground/30 hover:border-primary/50 hover:text-primary hover:bg-primary/5 transition-all duration-300"
                    >
                      <span>Book Strategy Call</span>
                    </a>
                  </>
                ) : isStarting ? (
                  <button disabled className="flex items-center gap-3 px-8 py-4 text-sm font-bold rounded-full text-black bg-primary/50 cursor-not-allowed">
                    <Loader2 className="h-4 w-4 animate-spin text-black" />
                    <span>Connecting...</span>
                  </button>
                ) : (
                  <button
                    onClick={endVoiceCall}
                    className="group flex items-center gap-3 px-8 py-4 text-sm font-medium rounded-full text-white border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 backdrop-blur-sm transition-all duration-400 cursor-pointer"
                  >
                    <Phone className="h-4 w-4 text-red-400" />
                    <span>End Call</span>
                  </button>
                )}
              </div>

              {/* Scroll indicator — hidden during call */}
              {!callStarted && !isStarting && (
                <div
                  className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-[fadeInUp_1s_ease-out_2s_both]"
                >
                  <span className="text-[9px] tracking-[0.4em] uppercase text-foreground/60 font-semibold">Scroll</span>
                  <div
                    className="w-px h-6 bg-gradient-to-b from-foreground/40 to-transparent animate-[scrollBounce_2s_ease-in-out_infinite]"
                  />
                </div>
              )}
            </div>


        </div>


        {/* Error display */}
        {error && (
          <div className="flex flex-col items-center gap-4 py-6 max-w-md mx-auto px-4">
            <div className="bg-red-500/10 backdrop-blur-sm text-red-300 p-4 rounded-xl border border-red-500/20 text-center text-sm">
              ⚠️ {error}
            </div>
            <button 
              onClick={resetCall}
              className="flex items-center gap-2 px-6 py-3 text-sm rounded-full text-white border border-white/20 hover:bg-white/10 transition-all"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Try Again</span>
            </button>
          </div>
        )}

        <Suspense fallback={null}>
          <TrustedBy />
          <ProblemSolutionSection />
          <FeaturesSection />
          <UseCasesSection />
          <BenefitsSection />
          <HowItWorksSection />
          <VoiceDemoSection />
          <CallbackForm />
          <TestimonialsSection />
          <CtaSection />
        </Suspense>
      </main>

      {/* Chat components with error boundaries */}
      {!callStarted && !isStarting && !error && (
        <Suspense fallback={null}>
          <ChatMoon onOpenChat={handleOpenChat} />
        </Suspense>
      )}
      {isChatOpen && (
        <Suspense fallback={null}>
          <ChatMoonPanel isOpen={isChatOpen} onClose={handleCloseChat} />
        </Suspense>
      )}

      <div className="relative z-20"><Footer /></div>
    </div>
    </>
  );
}
