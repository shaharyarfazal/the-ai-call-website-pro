import React from "react";

/**
 * Atmospheric background with deep navy base + indigo/blue ambient glows.
 * Lightweight: CSS-only, no JS work after first paint.
 */
export function FluidBackground() {
  return (
    <div className="fixed inset-0 -z-10 bg-background overflow-hidden" aria-hidden="true">
      {/* Mesh grid overlay */}
      <div className="absolute inset-0 mesh-bg opacity-100" />

      {/* Top-left indigo glow orb */}
      <div
        className="orb-1 absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(230 100% 62% / 0.12) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Bottom-right violet glow orb */}
      <div
        className="orb-2 absolute -bottom-40 -right-40 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(250 80% 65% / 0.09) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* Center subtle cyan accent */}
      <div
        className="orb-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, hsl(199 100% 54% / 0.05) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      {/* Vignette edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, hsl(222 24% 3% / 0.6) 100%)",
        }}
      />
    </div>
  );
}
