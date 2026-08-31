import { useEffect, useRef } from "react";

/**
 * ConstellationField — abstract "defense network" hero backdrop.
 *
 * Drifting nodes (sapphire #1D4ED8) connect into a living constellation mesh.
 * Rare coral (#EF4444) nodes read as threats: they pulse, nearby links light up,
 * then the threat is "neutralized" and settles back into the network.
 *
 * Performance / accessibility contract:
 * - Single <canvas>, DPR-capped at 2, node count scaled by viewport area
 *   (≈40 nodes on phones, ≤90 on desktop). O(n·k) link pass with distance cutoff.
 * - Animation pauses when offscreen (IntersectionObserver) or tab hidden.
 * - prefers-reduced-motion OR eco-mode: renders one static frame of the same
   network (motion removed, visual preserved) and re-renders on resize only.
 */

const SAPPHIRE = "29,78,216"; // rgb triplets keep canvas string building cheap
const ACCENT = "59,130,246"; // site accent blue for link highlights
const CORAL = "239,68,68";

interface ConstellationFieldProps {
  /** Extra classes for the wrapper (size/placement controlled by parent). */
  className?: string;
  /** Multiplier on auto node count (0.5..1.5). Default 1. */
  density?: number;
}

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  /** Threat lifecycle state: null = normal node; else countdown 0..1 of being a threat. */
  threat: null | { phase: number };
  twinkle: number;
}

const LINK_DIST = 140;

function makeNode(w: number, h: number): Node {
  const angle = Math.random() * Math.PI * 2;
  const speed = 0.06 + Math.random() * 0.12; // px/frame at 60fps, drift only
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    r: 1 + Math.random() * 1.6,
    threat: null,
    twinkle: Math.random() * Math.PI * 2,
  };
}

export default function ConstellationField({ className = "", density = 1 }: ConstellationFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ecoMode = document.documentElement.classList.contains("eco-mode");

    let width = 0;
    let height = 0;
    let dpr = 1;
    let nodes: Node[] = [];
    let rafId = 0;
    let running = false;
    let visible = true;
    const staticMode = reducedMotion || ecoMode;

    const targetCount = () => {
      const area = width * height;
      const auto = Math.min(90, Math.max(28, Math.round(area / 16000)));
      return Math.round(auto * density);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Re-seed keeping existing nodes where possible so resize never "jumps".
      const next = targetCount();
      nodes = nodes.slice(0, next);
      while (nodes.length < next) nodes.push(makeNode(width, height));
    };

    // --- drawing -----------------------------------------------------------
    const drawLinks = () => {
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > LINK_DIST * LINK_DIST) continue;
          const d = Math.sqrt(d2);
          const t = 1 - d / LINK_DIST; // 0..1 closeness
          const threatBoost =
            (a.threat !== null ? 0.25 : 0) + (b.threat !== null ? 0.25 : 0);
          const alpha = t * (0.16 + threatBoost);
          ctx.strokeStyle =
            threatBoost > 0
              ? `rgba(${CORAL},${Math.min(alpha, 0.5)})`
              : `rgba(${ACCENT},${alpha.toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    };

    const drawNodes = (time: number) => {
      for (const n of nodes) {
        n.twinkle += 0.02;
        const tw = 0.55 + 0.45 * Math.sin(n.twinkle); // gentle per-node brightness
        if (n.threat !== null) {
          const p = n.threat.phase; // 1 → 0
          const pulse = 2.2 + 1.6 * Math.sin(time * 0.006);
          // Coral core with soft halo while it is a live threat.
          ctx.fillStyle = `rgba(${CORAL},${(0.5 + 0.4 * p).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r + pulse * p, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = `rgba(${SAPPHIRE},${(0.35 + 0.6 * tw).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const step = (time: number) => {
      // Threat lifecycle: nothing → spawn → decay → settle back to normal.
      if (Math.random() < 0.004 && nodes.length > 0) {
        const candidate = nodes[Math.floor(Math.random() * nodes.length)];
        if (candidate.threat === null) candidate.threat = { phase: 1 };
      }
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -8) n.x = width + 8;
        else if (n.x > width + 8) n.x = -8;
        if (n.y < -8) n.y = height + 8;
        else if (n.y > height + 8) n.y = -8;
        if (n.threat !== null) {
          n.threat.phase -= 0.0025;
          if (n.threat.phase <= 0) n.threat = null;
        }
      }

      ctx.clearRect(0, 0, width, height);
      drawLinks();
      drawNodes(time);
    };

    const frame = (time: number) => {
      step(time);
      rafId = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running || !visible || document.hidden) return;
      running = true;
      rafId = requestAnimationFrame(frame);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(rafId);
    };

    // Static mode: draw one composed frame; no RAF loop at all.
    const drawStatic = () => {
      // Pre-warm positions so the frozen frame looks like a lived-in network.
      for (let k = 0; k < 240; k++) step(k * 16);
    };

    resize();

    if (staticMode) {
      drawStatic();
    } else {
      start();
    }

    const ro = new ResizeObserver(() => {
      resize();
      if (staticMode) drawStatic();
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (staticMode) return;
      if (visible) start();
      else stop();
    });
    io.observe(canvas);

    const onVisibility = () => {
      if (staticMode) return;
      if (document.hidden) stop();
      else start();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none h-full w-full ${className}`}
      aria-hidden="true"
    />
  );
}
