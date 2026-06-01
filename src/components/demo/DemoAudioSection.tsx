import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Volume2 } from "lucide-react";

interface DemoCall {
  id: string;
  title: string;
  industry: string;
  duration: string;
  description: string;
  audioSrc: string;
  transcript: string[];
}

const demoCalls: DemoCall[] = [
  {
    id: "healthcare",
    title: "Dental Office — New Patient Booking",
    industry: "Healthcare",
    duration: "2:46",
    description: "AI schedules a cleaning, verifies insurance, and sends confirmation.",
    audioSrc: "/audio/demo-healthcare.wav",
    transcript: [
      "AI: Good morning, Bright Smile Dental. How can I help you today?",
      "Caller: Hi, I'd like to schedule a cleaning appointment.",
      "AI: Of course! I'd be happy to help. Are you a new or returning patient?",
      "Caller: I'm a new patient.",
      "AI: Welcome! I have openings this Thursday at 2pm or Friday at 10am. Which works better for you?",
    ],
  },
  {
    id: "realestate",
    title: "Real Estate — Buyer Lead Qualification",
    industry: "Real Estate",
    duration: "2:04",
    description: "AI qualifies a buyer by budget, timeline, and location.",
    audioSrc: "/audio/demo-realestate.wav",
    transcript: [
      "AI: Thank you for calling Summit Realty. I'd love to help you find your perfect home.",
      "Caller: I'm looking for a 3-bedroom in the downtown area.",
      "AI: Great choice! What's your budget range for this purchase?",
      "Caller: Around 450 to 550 thousand.",
      "AI: Perfect. I'm scheduling a showing with our top agent for this Saturday. You'll receive a confirmation text shortly.",
    ],
  },
  {
    id: "homeservices",
    title: "Plumbing Company — Emergency Dispatch",
    industry: "Home Services",
    duration: "3:06",
    description: "AI captures the issue and dispatches the closest available tech.",
    audioSrc: "/audio/demo-homeservices.wav",
    transcript: [
      "AI: RapidFlow Plumbing, how can I assist you today?",
      "Caller: I have a burst pipe in my basement! Water is everywhere!",
      "AI: I understand this is urgent. I'm dispatching our nearest technician to your location right now. Can you confirm your address?",
      "Caller: 742 Maple Street.",
      "AI: Our technician Mike will be there in approximately 25 minutes. I'm texting you his photo and ETA now.",
    ],
  },
];

function AudioCard({ demo, index }: { demo: DemoCall; index: number }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hasAudio, setHasAudio] = useState(true);
  const [showTranscript, setShowTranscript] = useState(false);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => setHasAudio(false));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className="group bg-card border border-border hover:border-primary/30 rounded-2xl p-7 sm:p-8 transition-all duration-500 flex flex-col"
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] tracking-[0.3em] uppercase text-primary font-semibold">{demo.industry}</span>
        <span className="text-xs text-muted-foreground/50 font-mono">{demo.duration}</span>
      </div>
      <h3 className="text-base font-semibold text-foreground mb-2 tracking-tight font-heading">{demo.title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">{demo.description}</p>

      {/* Player */}
      <div className="flex items-center gap-4 mb-4">
        <button onClick={togglePlay} disabled={!hasAudio} className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors duration-300 disabled:opacity-30 shrink-0">
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
        </button>
        <div className="flex-1 h-1.5 bg-foreground/[0.06] rounded-full overflow-hidden">
          <div className="h-full bg-primary/60 rounded-full transition-all duration-100" style={{ width: `${progress}%` }} />
        </div>
        <Volume2 className="h-3.5 w-3.5 text-muted-foreground/30 shrink-0" />
      </div>

      {/* Transcript toggle */}
      <button onClick={() => setShowTranscript(!showTranscript)} className="text-xs text-primary/70 hover:text-primary transition-colors text-left">
        {showTranscript ? "Hide Transcript ▲" : "Show Transcript ▼"}
      </button>
      {showTranscript && (
        <div className="mt-3 space-y-2 border-t border-border pt-3">
          {demo.transcript.map((line, i) => (
            <p key={i} className={`text-xs leading-relaxed ${line.startsWith("AI:") ? "text-primary/80" : "text-muted-foreground"}`}>
              {line}
            </p>
          ))}
        </div>
      )}

      {!hasAudio && <p className="text-[11px] text-muted-foreground/40 mt-3 text-center">Audio coming soon</p>}
      <audio
        ref={audioRef}
        src={demo.audioSrc}
        onTimeUpdate={() => {
          if (audioRef.current) {
            const pct = (audioRef.current.currentTime / audioRef.current.duration) * 100;
            setProgress(isNaN(pct) ? 0 : pct);
          }
        }}
        onEnded={() => {
          setIsPlaying(false);
          setProgress(0);
        }}
        onError={() => setHasAudio(false)}
        preload="none"
      />
    </motion.div>
  );
}

export default function DemoAudioSection() {
  return (
    <section id="demo-audio-section" className="py-20 sm:py-28 bg-background border-t border-foreground/[0.05] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/[0.04] blur-[120px] pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }} className="max-w-3xl mx-auto text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-8 bg-primary/50" />
            <p className="text-[10px] tracking-[0.5em] uppercase text-primary font-semibold">Hear It Live</p>
            <div className="h-px w-8 bg-primary/50" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-foreground tracking-tight font-heading mb-5 leading-[1.1]">
            Listen to a <span className="text-primary">Real Call</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Press play to hear our AI handle real business conversations. Then try it yourself.
          </p>
        </motion.div>

        {/* Audio Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 max-w-5xl mx-auto">
          {demoCalls.map((demo, i) => <AudioCard key={demo.id} demo={demo} index={i} />)}
        </div>
      </div>
    </section>
  );
}
