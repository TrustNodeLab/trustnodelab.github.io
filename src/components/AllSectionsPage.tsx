import { motion } from "motion/react";
import { useNavigation } from "../navigation/NavigationContext";
import { useTranslation } from "../i18n/LanguageContext";
import { NAV_SECTIONS, GROUP_COLORS, type NavGroupKey } from "../data/navigationSchema";
import { clearPersonalRoute } from "../lib/personalRoute";
import { DownloadCTA } from "./Navigation";
import { ChevronRight, RotateCcw, LayoutGrid, Flag } from "lucide-react";

/* ============================================================================
   AllSectionsPage — /sections «Все разделы».
   Отдельная страница с полным списком разделов: escape-hatch квиза персональной
   навигации. Данные — из единственной схемы src/data/navigationSchema.ts.
   ========================================================================== */

type Opt = { ru: string; en: string };

const COPY: Record<string, Opt> = {
  badge: { ru: "Полный список", en: "Full list" },
  title: { ru: "Все разделы", en: "All sections" },
  subtitle: {
    ru: "Каждый раздел сайта на одной странице — от базового знакомства до технических деталей. Выбирайте свободно или вернитесь к квизу.",
    en: "Every section of the site on one page — from the basics to the technical details. Browse freely or go back to the quiz.",
  },
  retake: { ru: "Изменить ответы квиза", en: "Retake the quiz" },
  finaleBadge: { ru: "Финал", en: "The finish line" },
  finaleNote: {
    ru: "Лаконичное завершение: скачать TrustNode и начать пользоваться защитой.",
    en: "The laconic ending: download TrustNode and start using the protection.",
  },
};

const GROUP_LABELS: Record<NavGroupKey, Opt> = {
  start: { ru: "Начать здесь", en: "Start here" },
  deeper: { ru: "Глубже", en: "Go deeper" },
};

const pick = (o: Opt, lang: string) => ((o as any)[lang] ?? o.en);

export default function AllSectionsPage() {
  const { navigateTo } = useNavigation();
  const { t, language } = useTranslation();
  const label = (id: string) => (t.pageNames as any)[id] || id;

  const retakeQuiz = () => {
    clearPersonalRoute();
    navigateTo("sections");
  };

  return (
    <section className="relative w-full py-14 sm:py-20 px-4 bg-transparent" aria-label="All sections">
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <LayoutGrid className="w-4 h-4 text-[#3B82F6]" />
          <span className="font-mono text-[11px] tracking-[0.25em] text-[#3B82F6] uppercase font-bold">
            {pick(COPY.badge, language)}
          </span>
        </div>

        <h1 className="font-display font-medium text-3xl sm:text-5xl text-[#F5F5F0] tracking-tighter mb-4">
          {(t.pageNames as any).sections || pick(COPY.title, language)}
        </h1>
        <p className="text-sm sm:text-base text-gray-400 max-w-2xl leading-relaxed mb-8">
          {pick(COPY.subtitle, language)}
        </p>

        {/* Легенда цветовой системы групп */}
        <div className="flex flex-wrap gap-x-6 gap-y-2 mb-8 text-xs font-mono text-gray-500">
          {(Object.keys(GROUP_COLORS) as Array<NavGroupKey>).map((k) => (
            <span key={k} className="inline-flex items-center gap-2">
              <span className="w-3 h-1 rounded-full" style={{ background: GROUP_COLORS[k] }} />
              {pick(GROUP_LABELS[k], language)}
            </span>
          ))}
        </div>

        {(["start", "deeper"] as const).map((gk) => (
          <div key={gk} className="mb-8 last:mb-0">
            <h2
              className="font-mono text-xs tracking-[0.25em] uppercase font-bold mb-4"
              style={{ color: GROUP_COLORS[gk] }}
            >
              {pick(GROUP_LABELS[gk], language)}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-[#0A0A0B]/55 backdrop-blur-sm rounded-2xl p-4 border border-white/[0.04]">
              {NAV_SECTIONS.filter((s) => s.group === gk).map((s, i) => (
                <motion.button
                  key={s.id}
                  onClick={() => navigateTo(s.id)}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.05 + i * 0.08 }}
                  className="w-full text-left rounded-2xl border border-white/[0.06] bg-[#0E0F12]/90 backdrop-blur-sm p-5 hover:border-[#3B82F6]/40 transition-colors group"
                >
                  <span className="block w-10 h-1 rounded-full mb-4" style={{ background: s.colorAccent }} />
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-display font-medium text-lg text-[#F5F5F0] tracking-tight">
                      {label(s.id) || s.title}
                    </h3>
                    <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-[#3B82F6] transition-colors shrink-0" />
                  </div>
                  <p className="mt-2 text-sm text-gray-400 leading-relaxed">{s.description}</p>
                </motion.button>
              ))}
            </div>
          </div>
        ))}

        {/* Финал: «Скачать» всегда завершает сайт */}
        <div className="mt-10 rounded-2xl border border-[#3B82F6]/25 bg-[#0E0F12]/90 backdrop-blur-sm p-5 sm:p-6">
          <div className="flex items-center gap-2 mb-3">
            <Flag className="w-4 h-4 text-[#3B82F6]" />
            <span className="font-mono text-[11px] tracking-[0.25em] text-[#3B82F6] uppercase font-bold">
              {pick(COPY.finaleBadge, language)}
            </span>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed mb-4">
            {pick(COPY.finaleNote, language)}
          </p>
          <DownloadCTA size="lg" />
        </div>

        {/* Сброс персональной подборки без прохождения квиза */}
        <div className="mt-12 pt-6 border-t border-white/[0.05]">
          <button
            onClick={retakeQuiz}
            className="inline-flex items-center gap-2 text-sm text-gray-300 underline decoration-gray-600 underline-offset-4 hover:text-[#3B82F6] hover:decoration-[#3B82F6]/60 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            {pick(COPY.retake, language)}
          </button>
        </div>
      </div>
    </section>
  );
}
