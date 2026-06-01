import React, { useRef, useEffect, useCallback } from "react";
import { useTheme } from "@/components/LocalThemeProvider";

interface NorthernLightsProps {
  audioLevel?: number;
  isListening?: boolean;
}

export function NorthernLights({ audioLevel = 0, isListening = false }: NorthernLightsProps) {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const timeRef = useRef(0);
  const audioRef = useRef(0);

  const isDark = theme === "dark" || (theme === "system" && typeof window !== 'undefined' && window.matchMedia("(prefers-color-scheme: dark)").matches);

  useEffect(() => {
    audioRef.current = audioLevel;
  }, [audioLevel]);

  const lastFrameRef = useRef(0);
  const isSmallRef = useRef(false);
  const reducedMotionRef = useRef(false);

  const draw = useCallback((now?: number) => {
    const canvas = canvasRef.current;
    if (!canvas) {
      animRef.current = requestAnimationFrame(draw);
      return;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Throttle to ~30fps to cut CPU/GPU work in half vs 60fps
    const ts = now ?? performance.now();
    if (ts - lastFrameRef.current < 33) {
      animRef.current = requestAnimationFrame(draw);
      return;
    }
    lastFrameRef.current = ts;

    const w = window.innerWidth;
    const h = window.innerHeight;

    ctx.globalCompositeOperation = "source-over";
    ctx.clearRect(0, 0, w, h);

    timeRef.current += 0.003;
    const t = timeRef.current;
    const audio = audioRef.current;
    const baseIntensity = isListening ? 1.4 + audio * 3 : 0.8;
    const intensity = isDark ? baseIntensity : baseIntensity * 0.9;

    // Reduced dragon count (5 → 3) for performance
    const dragons = [
      { color: [0, 255, 180], speed: 0.7, xBase: 0.5, yBase: 0.4, xVar: 0.4, yVar: 0.3, f1: 0.5, f2: 0.3, length: 35, seed: 0 },
      { color: [120, 80, 255], speed: 0.5, xBase: 0.3, yBase: 0.6, xVar: 0.3, yVar: 0.4, f1: 0.4, f2: 0.2, length: 40, seed: 10 },
      { color: [255, 161, 10], speed: 0.8, xBase: 0.8, yBase: 0.8, xVar: 0.4, yVar: 0.4, f1: 0.7, f2: 0.3, length: 35, seed: 40 },
    ];

    ctx.globalCompositeOperation = isDark ? "screen" : "multiply";

    for (const dragon of dragons) {
      const [r, g, b] = dragon.color;
      const points = [];
      const numPoints = dragon.length;
      
      for (let i = 0; i < numPoints; i++) {
        const frac = i / numPoints;
        const pt = (t * dragon.speed) + dragon.seed - (frac * 1.5);
        
        // Chaotic roaming using multiple sine waves
        const xTranslate = Math.sin(pt * dragon.f1) * dragon.xVar + Math.cos(pt * dragon.f2 * 0.5) * (dragon.xVar * 0.5);
        const yTranslate = Math.cos(pt * dragon.f1 * 0.8) * dragon.yVar + Math.sin(pt * dragon.f2) * (dragon.yVar * 0.6);
        
        const x = w * (dragon.xBase + xTranslate);
        const y = h * (dragon.yBase + yTranslate);
        
        points.push({ x, y, frac });
      }

      // Draw dragon tail/ribbon
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        // Smooth curve
        const xc = (points[i].x + points[i - 1].x) / 2;
        const yc = (points[i].y + points[i - 1].y) / 2;
        ctx.quadraticCurveTo(points[i - 1].x, points[i - 1].y, xc, yc);
      }
      
      const grad = ctx.createLinearGradient(points[0].x, points[0].y, points[points.length-1].x, points[points.length-1].y);
      grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${isDark ? 0.4 * intensity : 0.2 * intensity})`);
      grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
      
      ctx.strokeStyle = grad;
      ctx.lineWidth = (12 + audio * 60) * (1 - points[0].frac) * intensity;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.shadowColor = `rgba(${r}, ${g}, ${b}, ${0.6 * intensity})`;
      ctx.shadowBlur = 30 * intensity;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Sparkles — skip on small screens or when user prefers reduced motion
      if (!isSmallRef.current && !reducedMotionRef.current) {
        for (let i = 0; i < points.length; i += 5) {
          const p = points[i];
          if (Math.random() > 0.5) {
            const size = Math.random() * 2 * intensity * (1 - p.frac);
            const alpha = Math.random() * 0.7 * intensity * (1 - p.frac);
            ctx.fillStyle = isDark ? `rgba(255, 255, 255, ${alpha})` : `rgba(${r}, ${g}, ${b}, ${alpha * 1.5})`;
            ctx.beginPath();
            ctx.arc(p.x + (Math.random() - 0.5) * 12, p.y + (Math.random() - 0.5) * 12, size, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
    }

    animRef.current = requestAnimationFrame(draw);
  }, [isListening, isDark]);

  // Handle Resize setup
  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current) return;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.scale(dpr, dpr);
    };

    handleResize(); // Initial setup
    window.addEventListener("resize", handleResize);

    isSmallRef.current = window.innerWidth < 768;
    reducedMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[1] pointer-events-none"
    />
  );
}
