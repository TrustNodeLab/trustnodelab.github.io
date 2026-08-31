import { useState, useEffect } from "react";
import { useEcoMode } from "../context/EcoModeContext";

/**
 * Fixed 3 px reading-progress bar at the very top of the viewport.
 * Shows how far the user has scrolled through the page.
 * Hidden entirely in eco / reduced-motion mode.
 */
export default function ReadingProgress() {
  const { ecoMode } = useEcoMode();
  const [pct, setPct] = useState(0);

  useEffect(() => {
    if (ecoMode) return; // no listeners in eco mode

    let rafId = 0;
    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const max = scrollHeight - clientHeight;
      setPct(max > 0 ? Math.min((scrollTop / max) * 100, 100) : 0);
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        update();
      });
    };

    update(); // initial value
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [ecoMode]);

  if (ecoMode) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 z-[60] h-[3px] pointer-events-none"
      style={{
        width: `${pct}%`,
        background: "linear-gradient(90deg, #3B82F6, #2DD4BF)",
        willChange: "width",
      }}
    />
  );
}
