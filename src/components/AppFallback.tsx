
import React from 'react';

/**
 * AppFallback — shown while React lazy-loads page chunks.
 * Uses pure CSS animations (no JS, no external assets) for
 * instant render and zero network overhead.
 */
export function AppFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="text-center space-y-6">
        {/* Animated black panther yawning — pure inline SVG */}
        <div className="mx-auto w-24 h-24 relative" aria-hidden="true">
          <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {/* Head */}
            <ellipse cx="60" cy="52" rx="30" ry="26" fill="hsl(var(--foreground))" />
            {/* Left ear */}
            <path d="M34 38 L26 18 L42 30 Z" fill="hsl(var(--foreground))" />
            {/* Right ear */}
            <path d="M86 38 L94 18 L78 30 Z" fill="hsl(var(--foreground))" />
            {/* Inner ears */}
            <path d="M35 36 L30 22 L40 32 Z" fill="hsl(var(--primary))" opacity="0.4" />
            <path d="M85 36 L90 22 L80 32 Z" fill="hsl(var(--primary))" opacity="0.4" />
            {/* Eyes — closed/sleepy with yawn */}
            <path d="M45 48 Q50 45 55 48" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" fill="none">
              <animate attributeName="d" values="M45 48 Q50 45 55 48;M45 46 Q50 44 55 46;M45 48 Q50 45 55 48" dur="3s" repeatCount="indefinite" />
            </path>
            <path d="M65 48 Q70 45 75 48" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" fill="none">
              <animate attributeName="d" values="M65 48 Q70 45 75 48;M65 46 Q70 44 75 46;M65 48 Q70 45 75 48" dur="3s" repeatCount="indefinite" />
            </path>
            {/* Nose */}
            <ellipse cx="60" cy="54" rx="3" ry="2" fill="hsl(var(--primary))" opacity="0.6" />
            {/* Mouth — yawning animation */}
            <ellipse cx="60" cy="62" rx="8" ry="2" fill="#1a1a1a">
              <animate attributeName="ry" values="2;10;10;10;2" dur="4s" repeatCount="indefinite" keyTimes="0;0.15;0.5;0.85;1" />
              <animate attributeName="cy" values="62;66;66;66;62" dur="4s" repeatCount="indefinite" keyTimes="0;0.15;0.5;0.85;1" />
              <animate attributeName="rx" values="8;12;12;12;8" dur="4s" repeatCount="indefinite" keyTimes="0;0.15;0.5;0.85;1" />
            </ellipse>
            {/* Inner mouth (pink) */}
            <ellipse cx="60" cy="62" rx="5" ry="1" fill="#e8527a" opacity="0.7">
              <animate attributeName="ry" values="1;7;7;7;1" dur="4s" repeatCount="indefinite" keyTimes="0;0.15;0.5;0.85;1" />
              <animate attributeName="cy" values="62;66;66;66;62" dur="4s" repeatCount="indefinite" keyTimes="0;0.15;0.5;0.85;1" />
              <animate attributeName="rx" values="5;9;9;9;5" dur="4s" repeatCount="indefinite" keyTimes="0;0.15;0.5;0.85;1" />
            </ellipse>
            {/* Teeth (top) — visible during yawn */}
            <path d="M54 58 L56 62 L58 58" fill="white" opacity="0">
              <animate attributeName="opacity" values="0;0.9;0.9;0.9;0" dur="4s" repeatCount="indefinite" keyTimes="0;0.15;0.5;0.85;1" />
              <animate attributeName="d" values="M54 58 L56 60 L58 58;M54 58 L56 63 L58 58;M54 58 L56 63 L58 58;M54 58 L56 63 L58 58;M54 58 L56 60 L58 58" dur="4s" repeatCount="indefinite" keyTimes="0;0.15;0.5;0.85;1" />
            </path>
            <path d="M62 58 L64 62 L66 58" fill="white" opacity="0">
              <animate attributeName="opacity" values="0;0.9;0.9;0.9;0" dur="4s" repeatCount="indefinite" keyTimes="0;0.15;0.5;0.85;1" />
              <animate attributeName="d" values="M62 58 L64 60 L66 58;M62 58 L64 63 L66 58;M62 58 L64 63 L66 58;M62 58 L64 63 L66 58;M62 58 L64 60 L66 58" dur="4s" repeatCount="indefinite" keyTimes="0;0.15;0.5;0.85;1" />
            </path>
            {/* Whiskers */}
            <g opacity="0.3">
              <line x1="38" y1="54" x2="20" y2="50" stroke="hsl(var(--foreground))" strokeWidth="1" />
              <line x1="38" y1="56" x2="20" y2="58" stroke="hsl(var(--foreground))" strokeWidth="1" />
              <line x1="82" y1="54" x2="100" y2="50" stroke="hsl(var(--foreground))" strokeWidth="1" />
              <line x1="82" y1="56" x2="100" y2="58" stroke="hsl(var(--foreground))" strokeWidth="1" />
            </g>
            {/* Body silhouette */}
            <path d="M36 72 Q38 90 50 100 Q60 105 70 100 Q82 90 84 72" fill="hsl(var(--foreground))" />
            {/* Paws */}
            <ellipse cx="46" cy="102" rx="6" ry="4" fill="hsl(var(--foreground))" />
            <ellipse cx="74" cy="102" rx="6" ry="4" fill="hsl(var(--foreground))" />
          </svg>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold font-heading tracking-tight">
            AI is waking up<span className="inline-flex w-8 text-left"><span className="animate-pulse">...</span></span>
          </h1>
          <p className="text-sm text-muted-foreground">Preparing your experience</p>
        </div>

        {/* Sleek progress bar */}
        <div className="w-48 h-1 bg-foreground/10 rounded-full mx-auto overflow-hidden">
          <div
            className="h-full bg-primary rounded-full"
            style={{
              animation: 'loadProgress 2.5s ease-in-out infinite',
            }}
          />
        </div>

        <style>{`
          @keyframes loadProgress {
            0% { width: 0%; }
            50% { width: 80%; }
            100% { width: 100%; }
          }
        `}</style>
      </div>
    </div>
  );
}
