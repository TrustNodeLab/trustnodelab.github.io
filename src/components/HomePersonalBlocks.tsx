import { useVisibleHomeBlocks } from "../lib/personalBlocks";
import DamageCalculator from "./DamageCalculator";
import LiveSimulatorSection from "./LiveSimulatorSection";
import HowItWorksSection from "./HowItWorksSection";
import KiraAssistantSection from "./KiraAssistantSection";
import AppSecuritySection from "./AppSecuritySection";
import ModelTesterSection from "./ModelTesterSection";
import ComparisonSection from "./ComparisonSection";
import RealDevelopmentSection from "./RealDevelopmentSection";
import OriginStorySection from "./OriginStorySection";
import NewsSection from "./NewsSection";
import FaqSection from "./FaqSection";
import { useNavigation } from "../navigation/NavigationContext";
import { useTranslation } from "../i18n/LanguageContext";
import { PAGE_DESCRIPTIONS } from "./PageNavigationFooter";
import { ChevronRight } from "lucide-react";
import { motion } from "motion/react";

/* ============================================================================
   HomePersonalBlocks — «сборка сайта по блокам»: главная рендерит только
   блоки, соответствующие персональному маршруту квиза (lib/personalBlocks).
   Пока маршрут не собран — показывает полный набор (дефолтный лендинг).
   ========================================================================== */

/** Карточки-ссылки на отдельные страницы (glossary/test/help),
    показываются только если соответствующий раздел в персональном маршруте. */
const PAGE_LINK_CARDS = [
  { id: "glossary", accent: "#EF4444" },
  { id: "test", accent: "#EF4444" },
  { id: "help", accent: "#EF4444" },
] as const;

export default function HomePersonalBlocks() {
  const visible = useVisibleHomeBlocks();
  const { navigateTo } = useNavigation();
  const { t, language } = useTranslation();
  if (!visible.length) return null;

  const linkCards = PAGE_LINK_CARDS.filter((c) => visible.includes(c.id));
  const label = (id: string) => (t.pageNames as any)[id] || id;

  return (
    <>
      {visible.includes("damage-calculator") && (
        <div data-snap-section><DamageCalculator /></div>
      )}
      {visible.includes("live-simulator") && (
        <div data-snap-section><LiveSimulatorSection /></div>
      )}
      {visible.includes("how-it-works") && (
        <div data-snap-section><HowItWorksSection /></div>
      )}
      {visible.includes("assistant") && (
        <div data-snap-section><KiraAssistantSection /></div>
      )}
      {visible.includes("security") && (
        <div data-snap-section><AppSecuritySection /></div>
      )}
      {visible.includes("model-tester") && (
        <div data-snap-section><ModelTesterSection /></div>
      )}
      {visible.includes("comparison") && (
        <div data-snap-section><ComparisonSection /></div>
      )}
      {visible.includes("roadmap") && (
        <div data-snap-section><RealDevelopmentSection onlyRoadmap={true} /></div>
      )}
      {visible.includes("origin") && (
        <div data-snap-section><OriginStorySection /></div>
      )}
      {visible.includes("news") && (
        <div data-snap-section><NewsSection /></div>
      )}
      {visible.includes("faq") && (
        <div data-snap-section><FaqSection /></div>
      )}

      {linkCards.length > 0 && (
        <div data-snap-section className="relative w-full px-4 py-10 bg-transparent">
          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {linkCards.map((c, i) => (
                <motion.button
                  key={c.id}
                  onClick={() => navigateTo(c.id)}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.05 + i * 0.08 }}
                  className="w-full text-left rounded-2xl border border-white/[0.06] bg-[#0E0F12]/90 backdrop-blur-sm p-5 hover:border-[#3B82F6]/40 transition-colors group"
                >
                  <span className="block w-10 h-1 rounded-full mb-4" style={{ background: c.accent }} />
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-display font-medium text-lg text-[#F5F5F0] tracking-tight">
                      {label(c.id)}
                    </h3>
                    <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-[#3B82F6] transition-colors shrink-0" />
                  </div>
                  <p className="mt-2 text-sm text-gray-400 leading-relaxed">
                    {(PAGE_DESCRIPTIONS as any)[c.id]?.[language] || (PAGE_DESCRIPTIONS as any)[c.id]?.en || ""}
                  </p>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
