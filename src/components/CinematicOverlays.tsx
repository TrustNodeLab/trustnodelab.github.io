import { useEffect, useRef, useState, type RefObject } from "react";
import { motion } from "motion/react";
import AssembledLogo from "./AssembledLogo";
import ScanCard from "./ScanCard";
import QuizFlow from "./QuizFlow";
import { UNLOCK_SCROLL_EVENT } from "../lib/personalRoute";
import { acquireScrollLock, releaseScrollLock } from "../lib/scrollLock";
import { useTranslation } from "../i18n/LanguageContext";
import { useEcoMode } from "../context/EcoModeContext";
import { INTRO_DICT } from "./IntroSection";
import { HelpCircle, Shield, Eye } from "lucide-react";

const INTRO_ICONS = [HelpCircle, Shield, Eye];
const INTRO_COLORS = [
  "border-[#3B82F6]/40 text-[#3B82F6] bg-[#3B82F6]/5",
  "border-[#2DD4BF]/40 text-[#2DD4BF] bg-[#2DD4BF]/5",
  "border-[#FB923C]/40 text-[#FB923C] bg-[#FB923C]/5"
];

// The 2D logo assembly SVG. It's driven imperatively from a rAF loop (direct DOM
// writes via AssembledLogo's progressRef mode), so it never causes a React
// re-render while the flight advances.
function LogoAssembly({ ecoMode, progressRef }: { ecoMode: boolean; progressRef: { current: number } }) {
  return (
    <AssembledLogo
      progressRef={progressRef}
      phaseStart={0.44}
      phaseSpan={0.08}
      ecoMode={ecoMode}
      className="scale-[0.55] sm:scale-[0.7] origin-center"
    />
  );
}

interface CinematicOverlaysProps {
  progressRef: { current: number };
  heroRef: RefObject<HTMLDivElement | null>;
  onEnterDome: () => void;
  /** Якорный deep-link: интро проматывается, квиз не показываем. */
  suppressQuiz?: boolean;
}

export default function CinematicOverlays({ progressRef, heroRef, onEnterDome, suppressQuiz = false }: CinematicOverlaysProps) {
  const { t, language } = useTranslation();
  const { ecoMode } = useEcoMode();
  const introContent = INTRO_DICT[language] || INTRO_DICT.en;

  const leftLabelRef = useRef<HTMLDivElement>(null);
  const rightLabelRef = useRef<HTMLDivElement>(null);
  const logoWrapRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Квиз показывается ТОЛЬКО после завершения кинематик-автоплея (progress ≥ 1)
  const [introDone, setIntroDone] = useState(false);
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      if (progressRef.current >= 0.999) { setIntroDone(true); return; }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [progressRef]);

  // Скролл заблокирован с начала и до завершения квиза (или открытия «Все разделы»)
  const [scrollLocked, setScrollLocked] = useState(!suppressQuiz);
  useEffect(() => {
    if (!introDone) return;
    const unlock = () => setScrollLocked(false);
    window.addEventListener(UNLOCK_SCROLL_EVENT, unlock);
    return () => window.removeEventListener(UNLOCK_SCROLL_EVENT, unlock);
  }, [introDone]);
  useEffect(() => {
    if (!scrollLocked) return;
    acquireScrollLock();
    return () => {
      releaseScrollLock();
    };
  }, [scrollLocked]);

  // A single rAF loop drives every overlay by writing opacity/transform straight to
  // the DOM. No React re-render, no CSS transitions fighting the per-frame updates —
  // the flight animates exactly as fast as the display refreshes.
  useEffect(() => {
    let raf = 0;
    let lastP = -1;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      const p = progressRef.current;
      if (p === lastP) return;
      lastP = p;

      if (heroRef.current) {
        const f = Math.min(1, p / 0.52);
        heroRef.current.style.opacity = String(Math.max(0, 1 - f));
        heroRef.current.style.transform = `scale(${1 + 0.14 * f})`;
      }

      // OFFLINE-FIRST / ZERO TELEMETRY labels fade in beside the assembled logo
      // with a small drift, then fade out — the original pre-3cc7f6aa behavior.
      const cLabelT = p > 0.48 ? Math.min(1, (p - 0.48) / 0.15) : 0;
      const cLabelOut = p > 0.7 ? Math.max(0, 1 - (p - 0.7) / 0.08) : 1;
      const cLabelOp = cLabelT * cLabelOut;
      const cLogoOp = Math.max(
        0,
        Math.min(1, (p - 0.44) / 0.08) * (1 - Math.max(0, (p - 0.66) / 0.06))
      );
      const cArrowT = p > 0.85 ? Math.min(1, (p - 0.85) / 0.1) : 0;
      const cIntroOp = p > 0.9 ? Math.min(1, (p - 0.9) / 0.08) : 0;

      if (leftLabelRef.current) {
        const x = cLabelOp > 0 ? -40 * (1 - Math.min(1, cLabelOp)) : -40;
        leftLabelRef.current.style.opacity = String(cLabelOp);
        leftLabelRef.current.style.transform = `translateX(${x}px)`;
      }
      if (rightLabelRef.current) {
        const x = cLabelOp > 0 ? 40 * (1 - Math.min(1, cLabelOp)) : 40;
        rightLabelRef.current.style.opacity = String(cLabelOp);
        rightLabelRef.current.style.transform = `translateX(${x}px)`;
      }
      if (logoWrapRef.current) {
        logoWrapRef.current.style.opacity = String(cLogoOp);
        logoWrapRef.current.style.transform = `scale(${0.9 + cLogoOp * 0.1})`;
      }
      if (introRef.current) introRef.current.style.opacity = String(cIntroOp);
      if (arrowRef.current) arrowRef.current.style.opacity = String(cArrowT);

      cardRefs.current.forEach((el, idx) => {
        if (!el) return;
        const cardStart = 0.9 + idx * 0.025;
        const cardIn = Math.max(0, Math.min(1, (p - cardStart) / 0.045));
        el.style.opacity = String(cardIn);
        el.style.transform = `translateY(${-70 * (1 - cardIn)}px) scale(${0.75 + cardIn * 0.25})`;
      });
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [progressRef, heroRef]);

  return (
    <div className="fixed inset-0 z-10 pointer-events-none select-none">
      {/* Status labels during assembly */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-16 w-full max-w-5xl mx-auto px-4">
          <div
            ref={leftLabelRef}
            className="flex flex-col items-center lg:items-end text-center lg:text-right w-full lg:w-64"
            style={{ opacity: 0 }}
          >
            <span className="font-display font-medium text-xl sm:text-2xl text-[#F5F5F0] tracking-tighter">
              {t.assembly?.leftPrimary || "OFFLINE-FIRST"}
            </span>
            <span className="font-mono text-[9px] sm:text-[10px] text-[#3B82F6] tracking-wider mt-1.5 uppercase">
              {t.assembly?.leftSub || "// ДАННЫЕ НЕ ПОКИДАЮТ УСТРОЙСТВО"}
            </span>
          </div>

          <div className="w-32 sm:w-44 shrink-0 hidden lg:block" />

          <div
            ref={logoWrapRef}
            className="shrink-0"
            id="cinematic-assembled-logo"
            style={{ opacity: 0, pointerEvents: "none" }}
          >
            <LogoAssembly ecoMode={ecoMode} progressRef={progressRef} />
          </div>

          <div className="w-32 sm:w-44 shrink-0 hidden lg:block" />

          <div
            ref={rightLabelRef}
            className="flex flex-col items-center lg:items-start text-center lg:text-left w-full lg:w-64"
            style={{ opacity: 0 }}
          >
            <span className="font-display font-medium text-xl sm:text-2xl text-[#F5F5F0] tracking-tighter">
              {t.assembly?.rightPrimary || "ZERO TELEMETRY"}
            </span>
            <span className="font-mono text-[9px] sm:text-[10px] text-[#3B82F6] tracking-wider mt-1.5 uppercase">
              {t.assembly?.rightSub || "// НИКАКОЙ ТЕЛЕМЕТРИИ"}
            </span>
          </div>
        </div>
      </div>

      {/* Квиз персональной навигации — ТОЛЬКО после завершения автоплея
          (и никогда при якорном deep-link: пользователь идёт к блоку) */}
      {introDone && !suppressQuiz && (
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-x-0 top-0 flex flex-col items-center px-4 pt-[10vh] sm:pt-[12vh] pb-[18vh] pointer-events-auto"
      >
        <div className="w-full max-w-3xl bg-[#0A0A0B]/55 backdrop-blur-md rounded-2xl border border-white/[0.05] pointer-events-auto">
          <QuizFlow />
        </div>
      </motion.div>
      )}
    </div>
  );
}
