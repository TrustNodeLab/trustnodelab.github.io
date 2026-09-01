import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useTranslation } from "../i18n/LanguageContext";
import { LanguageCode } from "../i18n/languages";

/* ============================================================================
   BuildingAnimation — «сборка логотипа» как в первоначальной интро-анимации:
   фирменный Frame 1.svg собирается из линий/узлов (mask-reveal), статусы
   сменяются fade. 1.85 c. Честность механики: оформление реальной
   персонализации маршрута, не имитация AI-генерации.
   ========================================================================== */

const STATUS_BY_LANG: Record<LanguageCode, string[]> = {
  ru: ["Анализирую ситуацию...", "Подбираю разделы...", "Готово"],
  en: ["Analyzing your situation...", "Picking sections...", "Done"],
  es: ["Analizando tu situación...", "Seleccionando secciones...", "Listo"],
  zh: ["正在分析你的情况…", "正在挑选栏目…", "完成"],
  tr: ["Durumunuz analiz ediliyor...", "Bölümler seçiliyor...", "Tamam"],
  hi: ["आपकी स्थिति का विश्लेषण...", "अनुभाग चुने जा रहे हैं...", "तैयार"],
  ar: ["جارٍ تحليل حالتك...", "جارٍ اختيار الأقسام...", "تم"],
  pt: ["Analisando sua situação...", "Selecionando seções...", "Pronto"],
  fr: ["Analyse de votre situation...", "Sélection des sections...", "Prêt"],
  de: ["Analysiere deine Situation...", "Abschnitte werden ausgewählt...", "Fertig"],
  ja: ["状況を分析中…", "セクションを選択中…", "完了"],
};

export default function BuildingAnimation({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0);
  const { language } = useTranslation();

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 600),
      setTimeout(() => setStep(2), 1200),
      setTimeout(() => onDone(), 1850),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onDone]);

  const statuses = STATUS_BY_LANG[language] || STATUS_BY_LANG.en;
  const logo = `${import.meta.env.BASE_URL}frame1.svg`;

  return (
    <div className="relative flex flex-col items-center justify-center py-14 min-h-[300px]" aria-live="polite">
      {/* Звёздное поле */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 36 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute w-0.5 h-0.5 rounded-full bg-white"
            style={{ left: `${(i * 137.5) % 100}%`, top: `${(i * 61.8) % 100}%` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.6, 0.25] }}
            transition={{ duration: 1.2, delay: i * 0.02 }}
          />
        ))}
      </div>

      {/* Сборка логотипа: узлы слетаются → логотип проявляется целиком */}
      <div className="relative z-10 w-40 h-40 sm:w-48 sm:h-48 flex items-center justify-center">
        {[...Array(5)].map((_, i) => {
          const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2;
          const x = 80 + Math.cos(angle) * 55;
          const y = 75 + Math.sin(angle) * 55;
          return (
            <motion.span
              key={i}
              className="absolute w-2.5 h-2.5 rounded-full bg-[#3B82F6] shadow-glow-md"
              style={{ left: `${x / 1.6}px`, top: `${y / 1.6}px` }}
              initial={{ scale: 0, x: 0, y: 0, opacity: 0 }}
              animate={{
                scale: [0, 1.2, 0.9],
                left: `${x / 1.6}px`,
                top: `${y / 1.6}px`,
                opacity: [0, 1, 0],
              }}
              transition={{ duration: 0.9, delay: i * 0.12, ease: "easeOut" }}
            />
          );
        })}

        <motion.img
          src={logo}
          alt=""
          className="w-28 h-28 sm:w-32 sm:h-32 object-contain"
          initial={{ opacity: 0, scale: 0.7, filter: "blur(8px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: 0.55, ease: "easeOut" }}
        />
        <motion.span
          className="absolute inset-0 rounded-full border border-[#3B82F6]/30"
          initial={{ scale: 0.6, opacity: 0.8 }}
          animate={{ scale: 1.35, opacity: 0 }}
          transition={{ duration: 1.1, delay: 0.6 }}
        />
      </div>

      {/* Сменяющийся статус */}
      <div className="relative z-10 h-6 mt-6 font-mono text-xs sm:text-sm text-gray-300 tracking-wider">
          <motion.span
            key={step}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
          >
            {statuses[step] ?? statuses[statuses.length - 1]}
          </motion.span>
      </div>
    </div>
  );
}
