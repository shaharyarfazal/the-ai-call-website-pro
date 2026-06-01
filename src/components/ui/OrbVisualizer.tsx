import React from "react";
import { motion } from "framer-motion";

export function OrbVisualizer({ isListening = false, audioLevel = 0 }) {
  const scale = isListening ? 1 + audioLevel * 0.5 : 1;

  return (
    <div className="relative flex items-center justify-center w-44 h-44 sm:w-60 sm:h-60">
      {/* Outer aurora glow */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.15, 0.35, 0.15],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-[-20%] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(0,255,200,0.15) 0%, rgba(120,80,255,0.08) 40%, transparent 70%)",
        }}
      />

      {/* Outer rotating ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 rounded-full border border-dashed border-cyan-400/[0.08]"
      />

      {/* Middle breathing ring */}
      <motion.div
        animate={{
          scale: [1, 1.06, 1],
          opacity: [0.08, 0.2, 0.08],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-[12%] rounded-full border border-purple-400/15"
      />

      {/* Core reactive ring */}
      <motion.div
        animate={{ scale }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="absolute inset-[25%] rounded-full backdrop-blur-sm border border-white/15"
        style={{
          background: "radial-gradient(circle at 40% 35%, rgba(0,255,200,0.06) 0%, rgba(120,80,255,0.04) 50%, rgba(0,0,0,0.3) 100%)",
          boxShadow: isListening 
            ? "0 0 30px rgba(0,255,200,0.15), inset 0 0 20px rgba(120,80,255,0.1)" 
            : "inset 0 0 15px rgba(255,255,255,0.03)",
        }}
      />

      {/* Waveform line */}
      <svg className="absolute w-[55%] h-6 overflow-visible" viewBox="0 0 100 10">
        <motion.path
          d={isListening 
            ? `M 0 5 Q 10 ${5 - audioLevel * 6} 20 5 Q 30 ${5 + audioLevel * 5} 40 5 Q 50 ${5 - audioLevel * 8} 60 5 Q 70 ${5 + audioLevel * 6} 80 5 Q 90 ${5 - audioLevel * 4} 100 5`
            : "M 0 5 Q 25 5 50 5 Q 75 5 100 5"
          }
          fill="none"
          stroke="url(#waveGradient)"
          strokeWidth="0.6"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(0,255,200,0)" />
            <stop offset="30%" stopColor="rgba(0,255,200,0.5)" />
            <stop offset="50%" stopColor="rgba(120,80,255,0.6)" />
            <stop offset="70%" stopColor="rgba(0,255,200,0.5)" />
            <stop offset="100%" stopColor="rgba(0,255,200,0)" />
          </linearGradient>
        </defs>
      </svg>

      {/* Center dot */}
      <motion.div
        animate={{
          scale: isListening ? [1, 1.8, 1] : [1, 1.15, 1],
          opacity: isListening ? [0.6, 1, 0.6] : [0.3, 0.6, 0.3],
        }}
        transition={{ duration: isListening ? 0.6 : 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(0,255,200,0.6)]"
      />
    </div>
  );
}
