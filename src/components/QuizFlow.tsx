import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "motion/react";
import { useNavigation } from "../navigation/NavigationContext";
import { useTranslation } from "../i18n/LanguageContext";
import { DownloadCTA } from "./Navigation";
import BuildingAnimation from "./BuildingAnimation";
import { setPersonalRoute, clearPersonalRoute, requestScrollUnlock } from "../lib/personalRoute";
import { setDepthPreference, clearDepthPreference, type DepthLevel } from "../lib/depthPreference";
import { acquireScrollLock, releaseScrollLock } from "../lib/scrollLock";
import { LayoutGrid, ChevronRight, RotateCcw } from "lucide-react";

/* ============================================================================
   QuizFlow — 3 коротких вопроса (минимум контента, максимум пользы). По ответам
   собираем персональный набор разделов (макс. 8) и сохраняем его: весь сайт
   показывает только их. Полный список — по ссылке «Показать все разделы»,
   либо кнопка «Пропустить» — дефолтный маршрут без вопросов.
   ========================================================================== */

function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    acquireScrollLock();
    return () => {
      releaseScrollLock();
    };
  }, [locked]);
}

type Opt = { ru: string; en: string };
type QDef = { id: string; q: Opt; opts: Opt[] };

const QUESTIONS: QDef[] = [
  {
    id: "met",
    q: { ru: "Сталкивались ли вы уже с мошенниками?", en: "Have you dealt with scammers before?" },
    opts: [
      { ru: "Да, недавно", en: "Yes, recently" },
      { ru: "Нет, но хочу подстраховаться", en: "No, but I want to stay safe" },
      { ru: "Просто интересно, как это устроено", en: "Just curious how it works" },
    ],
  },
  {
    id: "fear",
    q: { ru: "Что тревожит больше всего?", en: "What worries you most?" },
    opts: [
      { ru: "Звонки и голосовые сообщения", en: "Calls and voice messages" },
      { ru: "Ссылки в сообщениях", en: "Links in messages" },
      { ru: "QR-коды и оплаты", en: "QR codes and payments" },
      { ru: "Мои личные данные", en: "My personal data" },
    ],
  },
  {
    id: "depth",
    q: { ru: "Как объяснять?", en: "How should we explain things?" },
    opts: [
      { ru: "Просто, без терминов", en: "Simply, no jargon" },
      { ru: "С техническими подробностями", en: "With technical details" },
    ],
  },
];

const COPY = {
  badge: { ru: "3 коротких вопроса — и готово", en: "3 quick questions and you're set" },
  resultTitle: { ru: "Мы собрали для тебя", en: "We picked this for you" },
  resultNote: {
    ru: "Только то, что тебе нужно. Остальное всегда доступно в разделе «Все разделы».",
    en: "Only what you need. Everything else stays in \u201CAll sections\u201D.",
  },
  showAll: { ru: "Показать все разделы", en: "Show all sections" },
  skip: { ru: "Пропустить — просто показать сайт", en: "Skip — just show the site" },
  retake: { ru: "Изменить ответы", en: "Change answers" },
  softNote: {
    ru: "Приложение бесплатное — вернёмся к нему в конце.",
    en: "The app is free — we'll get back to it at the end.",
  },
  goSite: { ru: "Перейти на сайт", en: "Go to the site" },
} as const;

const pick = (o: { ru: string; en: string }, lang: string) => ((o as any)[lang] ?? o.en);

function buildRoute(a: Record<string, number>): { ids: any[]; softCta: boolean } {
  const ids: any[] = [];
  const push = (...list: any[]) => list.forEach((id) => { if (!ids.includes(id)) ids.push(id); });
  const dev = a.who === 2;
  const deep = a.depth === 1;

  if (dev) {
    push("tech", "research", "privacy-architecture", "comparison");
    if (deep) push("roadmap");
    return { ids: ids.slice(0, 8), softCta: true };
  }

  if (a.fear === 0) push("how-it-works");
  else if (a.fear === 1 || a.fear === 2) push("features");
  else if (a.fear === 3) push("privacy-architecture");

  push("how-it-works");
  push("features");

  if (deep) push("tech");
  if (a.fear === 3 || a.met === 0) push("privacy-architecture");
  if (a.who === 1) push("comparison");

  // Новые evergreen-разделы: помощь пострадавшим, самопроверка, глоссарий.
  if (a.met === 0) push("help"); // уже столкнулся → инструкция «что делать»
  if (a.met === 0 || a.met === 1) push("test"); // хочет подстраховаться → проверить себя
  if (a.met === 2 || a.depth === 0) push("glossary"); // любопытство/без терминов → объяснения

  return { ids: ids.slice(0, 8), softCta: a.cta === 1 };
}

export default function QuizFlow() {
  const { navigateTo } = useNavigation();
  const { language, t } = useTranslation();
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [building, setBuilding] = useState(false);
  const [done, setDone] = useState(false);

  const quizRef = useRef<HTMLElement | null>(null);
  const [lockFits, setLockFits] = useState(true);

  // Блокируем скролл только пока квиз целиком помещается в экран.
  // На телефонах/маленьких окнах квиз выше viewport — скролл остаётся
  // доступным, иначе нижние кнопки «улетают за границы экрана».
  useEffect(() => {
    if (done) {
      setLockFits(true);
      return;
    }
    const check = () => {
      const el = quizRef.current;
      if (!el) return;
      setLockFits(el.getBoundingClientRect().height <= window.innerHeight);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [done, qIndex]);

  useScrollLock(!done && lockFits);
  React.useEffect(() => { if (done) requestScrollUnlock(); }, [done]);

  const route = useMemo(() => (done ? buildRoute(answers) : null), [done, answers]);

  // Маршрут +偏好 сохраняются только ПОСЛЕ ответов на все вопросы (никогда во время рендера)
  React.useEffect(() => {
    if (done && route) {
      setPersonalRoute(route.ids as any);
      // Сохраняем偏好 глубины: depth=0 → simple, depth=1 → full
      const depthLevel: DepthLevel = answers.depth === 1 ? "full" : "simple";
      setDepthPreference(depthLevel);
    }
  }, [done, route]);

  const answer = (idx: number) => {
    const q = QUESTIONS[qIndex];
    const next = { ...answers, [q.id]: idx };
    setAnswers(next);
    if (qIndex < QUESTIONS.length - 1) setQIndex(qIndex + 1);
    else setBuilding(true);
  };

  const restart = () => {
    clearPersonalRoute();
    clearDepthPreference();
    setAnswers({});
    setQIndex(0);
    setDone(false);
    setBuilding(false);
  };

  // Пропуск квиза: дефолтный маршрут (how-it-works + features) и простые объяснения.
  const skip = () => {
    setAnswers({});
    setDone(true);
  };

  /* ------------------------------ Квиз ------------------------------ */
  return (
    <section ref={quizRef} className="relative w-full py-14 sm:py-20 px-4 bg-transparent" aria-label="Quiz navigation">
      <div className="max-w-3xl mx-auto relative z-10">
        {!done && !building && (
          <>
            <div className="flex items-center gap-2 mb-6">
              {QUESTIONS.map((_, i) => (
                <span
                  key={i}
                  className={`h-1 rounded-full transition-all duration-300 ${i <= qIndex ? "bg-[#3B82F6] w-8" : "bg-white/10 w-5"}`}
                />
              ))}
              <span className="ml-2 font-mono text-[11px] text-gray-500">
                {qIndex + 1}/{QUESTIONS.length}
              </span>
            </div>

            <motion.div key={qIndex} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
              <span className="font-mono text-[11px] tracking-[0.25em] text-[#3B82F6] uppercase font-bold">
                {pick(COPY.badge, language)}
              </span>
              <h2 className="font-display font-medium text-2xl sm:text-4xl text-[#F5F5F0] tracking-tighter mt-3 mb-8">
                {pick(QUESTIONS[qIndex].q, language)}
              </h2>
              <div className="flex flex-col gap-3">
                {QUESTIONS[qIndex].opts.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => answer(idx)}
                    className="text-left rounded-xl border border-white/[0.08] bg-[#0E0F12]/85 backdrop-blur-sm px-5 py-4 text-[#F5F5F0] hover:border-[#3B82F6]/50 hover:bg-[#101725]/90 transition-colors group"
                  >
                    <span className="flex items-center justify-between gap-3">
                      <span>{pick(opt, language)}</span>
                      <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-[#3B82F6] shrink-0 transition-colors" />
                    </span>
                  </button>
                ))}
              </div>

              <button
                onClick={() => navigateTo("sections")}
                className="mt-10 inline-flex items-center gap-2 text-sm text-gray-300 underline decoration-gray-600 underline-offset-4 hover:text-[#3B82F6] hover:decoration-[#3B82F6]/60 transition-colors cursor-pointer"
              >
                <LayoutGrid className="w-4 h-4" />
                {pick(COPY.showAll, language)}
              </button>

              <button
                onClick={skip}
                className="mt-3 block text-xs text-gray-500 hover:text-[#3B82F6] transition-colors cursor-pointer"
              >
                {pick(COPY.skip, language)}
              </button>
            </motion.div>
          </>
        )}

        {building && <BuildingAnimation onDone={() => setDone(true)} />}

        {done && route && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}
            className="flex flex-col items-center gap-5 py-6">
            <button
              onClick={() => navigateTo(route.ids[0])}
              className="menu-item-in inline-flex flex-col items-center gap-1 px-10 py-4 rounded-xl bg-[#3B82F6] text-white font-sans font-bold text-base hover:bg-[#2f6fe0] transition-all cursor-pointer shadow-glow-md hover:shadow-glow-lg"
            >
              <span className="inline-flex items-center gap-2">
                {pick(COPY.goSite, language)}
                <ChevronRight className="w-5 h-5" />
              </span>
              <span className="text-[11px] font-mono font-normal opacity-85">
                {language.startsWith("ru") ? "Начнём с: " : "Starting with: "}
                {(t.pageNames as any)[route.ids[0]] || route.ids[0]}
              </span>
            </button>
            <DownloadCTA size="sm" />
            {route.softCta ? (
              <p className="text-xs text-gray-500 font-mono">{pick(COPY.softNote, language)}</p>
            ) : (
              <p className="text-xs font-mono text-gray-400">Android 7.0+ · Бесплатно</p>
            )}
            <button
              onClick={restart}
              className="inline-flex items-center gap-1.5 text-xs text-gray-500 underline decoration-gray-800 underline-offset-4 hover:text-[#3B82F6] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              {pick(COPY.retake, language)}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
