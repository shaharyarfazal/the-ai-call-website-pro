import { useLocation } from "react-router-dom";
import { FluidBackground } from "@/components/ui/FluidBackground";

export function GlobalBackground() {
  const location = useLocation();

  // Homepage handles its own backgrounds (incl. the animated NorthernLights canvas)
  // to support audio visualization. All other pages get the lightweight static
  // FluidBackground only — no expensive animated canvas.
  if (location.pathname === "/") {
    return null;
  }

  return <FluidBackground />;
}
