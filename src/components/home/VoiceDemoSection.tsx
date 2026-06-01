import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Volume2 } from "lucide-react";

interface DemoCall {
  id: string;
  title: string;
  industry: string;
  duration: string;
  description: string;
  /** Path to the audio file in /public/audio/. You will add files here later. */
  audioSrc: string;
}

const demoCalls: DemoCall[] = [
  {
    id: "healthcare",
    title: "Dental Office — New Patient Booking",
    industry: "Healthcare",
    duration: "2:46",
    description: "AI schedules a cleaning, verifies insurance, and sends a confirmation — all in one seamless call.",
    audioSrc: "/audio/demo-healthcare.wav",
  },
  {
    id: "realestate",
    title: "Real Estate — Buyer Lead Qualification",
    industry: "Real Estate",
    duration: "2:04",
    description: "AI qualifies a buyer by budget, timeline, and location, then books a showing with the agent.",
    audioSrc: "/audio/demo-realestate.wav",
  },
  {
    id: "homeservices",
    title: "Plumbing Company — Emergency Dispatch",
    industry: "Home Services",
    duration: "3:06",
    description: "AI captures the issue, dispatches the closest available tech, and texts the homeowner a confirmation.",
    audioSrc: "/audio/demo-homeservices.wav",
  },
];

function AudioCard({ demo, index }: { demo: DemoCall; index: number }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hasAudio, setHasAudio] = useState(true);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => setHasAudio(false));
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const pct = (audioRef.current.currentTime / audioRef.current.duration) * 100;
    setProgress(isNaN(pct) ? 0 : pct);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className="group bg-card border border-border hover:border-primary/30 rounded-2xl p-7 sm:p-8 transition-all duration-500 flex flex-col"
    >
      {/* Industry badge */}
      <div className="flex items-center justify-between mb-5">
        <span className="text-[10px] tracking-[0.3em] uppercase text-primary font-semibold">{demo.industry}</span>
        <span className="text-xs text-muted-foreground/50 font-mono">{demo.duration}</span>
      </div>

      {/* Title */}
      <h3 className="text-base font-semibold text-foreground mb-2 tracking-tight font-heading leading-snug">{demo.title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">{demo.description}</p>

      {/* Audio player */}
      <div className="flex items-center gap-4">
        <button
          onClick={togglePlay}
          disabled={!hasAudio}
          aria-label={isPlaying ? `Pause ${demo.title}` : `Play ${demo.title}`}
          className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary hover:bg-primary/20 hover:shadow-[0_0_14px_hsl(230_100%_62%_/_0.4)] transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed shrink-0"
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
        </button>

        {/* Progress bar */}
        <div className="flex-1 h-1.5 bg-foreground/[0.06] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary/60 rounded-full"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        <Volume2 className="h-3.5 w-3.5 text-muted-foreground/30 shrink-0" />
      </div>

      {!hasAudio && (
        <p className="text-[11px] text-muted-foreground/40 mt-3 text-center">Audio coming soon</p>
      )}

      <audio
        ref={audioRef}
        src={demo.audioSrc}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        onError={() => setHasAudio(false)}
        preload="none"
      />
    </motion.div>
  );
}

export function VoiceDemoSection() {
  return (
    <section className="py-24 sm:py-36 bg-background border-y border-foreground/[0.05] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] rounded-full pointer-events-none" style={{ background: "radial-gradient(ellipse, hsl(230 100% 62% / 0.07) 0%, transparent 70%)", filter: "blur(80px)" }} />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[300px] rounded-full pointer-events-none" style={{ background: "radial-gradient(ellipse, hsl(250 80% 65% / 0.05) 0%, transparent 70%)", filter: "blur(60px)" }} />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto text-center mb-20 sm:mb-28"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-8 bg-primary/50" />
            <p className="text-[10px] tracking-[0.5em] uppercase text-primary font-semibold">Hear It Live</p>
            <div className="h-px w-8 bg-primary/50" />
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight font-heading mb-5 leading-[1.1]">
            Don't Take Our Word.<br />
            <span className="text-primary">Listen.</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Real recordings from AI agents handling real conversations. Press play and hear the difference.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 max-w-4xl mx-auto">
          {demoCalls.map((demo, i) => (
            <AudioCard key={demo.id} demo={demo} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
