import React from "react";

/**
 * Minimalist static background.
 * Pure background color — no animations, no blurs, no gradients.
 * Lightweight: zero JS work after first paint.
 */
export function FluidBackground() {
  return <div className="fixed inset-0 -z-10 bg-background" aria-hidden="true" />;
}
