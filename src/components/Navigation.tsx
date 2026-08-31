import React from "react";
import { useNavigation, type PageId } from "../navigation/NavigationContext";
import { useTranslation } from "../i18n/LanguageContext";
import { LanguageCode } from "../i18n/languages";
import { Download } from "lucide-react";

/* ============================================================================
   Navigation — рендер-компоненты поверх единственной схемы разделов.
   Сам источник структуры — src/data/navigationSchema.ts (NAV_SECTIONS).
   ========================================================================== */

import { NAV_SECTIONS, type NavGroupKey } from "../data/navigationSchema";

export type { NavGroupKey };

export interface NavGroup {
  key: NavGroupKey;
  items: PageId[];
}

/** Группы выводятся из схемы; порядок канонический. */
export const NAV_GROUPS: NavGroup[] = (["start", "deeper"] as NavGroupKey[]).map((key) => ({
  key,
  items: NAV_SECTIONS.filter((s) => s.group === key).map((s) => s.id),
}));

/** Плоский список всех навигационных разделов в каноническом порядке. */
export const NAV_ITEMS: PageId[] = NAV_SECTIONS.map((s) => s.id);

/** Следующий раздел для блока «next section». После последнего — на главную
 *  (замыкание цикла через логотип-якорь). */
export function getNextNavItem(current: PageId): PageId {
  const i = NAV_ITEMS.indexOf(current);
  if (i === -1 || i === NAV_ITEMS.length - 1) return "home";
  return NAV_ITEMS[i + 1];
}

/** Подписи групп (отображаются над колонками в full-режиме). */
export const GROUP_CAPTIONS: Record<NavGroupKey, Record<string, string>> = {
  start: {
    ru: "Начать здесь",
    en: "Start here",
    es: "Empieza aquí",
    zh: "从这里开始",
    tr: "Buradan başla",
    hi: "यहाँ से शुरू करें",
    ar: "ابدأ من هنا",
    pt: "Comece aqui",
    fr: "Commencer ici",
    de: "Hier starten",
    ja: "はじめに",
  },
  deeper: {
    ru: "Глубже",
    en: "Go deeper",
    es: "Profundizar",
    zh: "深入了解",
    tr: "Daha derine",
    hi: "गहराई में",
    ar: "لمزيد من التعمق",
    pt: "Aprofundar",
    fr: "Approfondir",
    de: "Mehr entdecken",
    ja: "さらに詳しく",
  },
};

const cap = (key: NavGroupKey, lang: string) =>
  GROUP_CAPTIONS[key][lang] || GROUP_CAPTIONS[key].en;

const CTA_SUB: Record<LanguageCode, string> = {
  ru: "Android 7.0+ · Бесплатно",
  en: "Android 7.0+ · Free",
  es: "Android 7.0+ · Gratis",
  zh: "Android 7.0+ · 免费",
  tr: "Android 7.0+ · Ücretsiz",
  hi: "Android 7.0+ · मुफ़्त",
  ar: "Android 7.0+ · مجانًا",
  pt: "Android 7.0+ · Grátis",
  fr: "Android 7.0+ · Gratuit",
  de: "Android 7.0+ · Kostenlos",
  ja: "Android 7.0+ · 無料",
};

/* ----------------------------------------------------------------------------
   DownloadCTA — «Скачать» не является разделом навигации: это действие.
   Микро-текст содержит только проверяемые факты проекта.
   -------------------------------------------------------------------------- */
export function DownloadCTA({
  size = "md",
  className = "",
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const { navigateTo } = useNavigation();
  const { t, language } = useTranslation();
  const sizes = {
    sm: "px-3 py-1.5 text-xs rounded-lg",
    md: "px-5 py-2.5 text-sm rounded-xl",
    lg: "px-7 py-3.5 text-base rounded-xl",
  } as const;
  return (
    <button
      onClick={() => navigateTo("download")}
      aria-label={t.header.rustore}
      className={`inline-flex flex-col items-center gap-0.5 bg-[#3B82F6] text-white font-sans font-bold hover:bg-[#2f6fe0] transition-all cursor-pointer shadow-glow-md hover:shadow-glow-lg ${sizes[size]} ${className}`}
    >
      <span className="inline-flex items-center gap-2">
        <Download className="w-4 h-4" />
        {t.header.rustore}
      </span>
      <span className="text-[10px] font-mono font-normal opacity-80 leading-none">
        {CTA_SUB[language] || CTA_SUB.en}
      </span>
    </button>
  );
}

/* ----------------------------------------------------------------------------
   NavigationMenu — рендер из единственной схемы.
   variant="full"   → две колонки с подписями групп и нумерацией 01..09
                      (десктоп / страница навигации)
   variant="compact"→ те же данные, один столбец, без нумерации
                      (мобильное меню / узкие места)
   Активный раздел подсвечивается одинаково в обоих режимах:
   белый текст + подчёркивание.
   -------------------------------------------------------------------------- */
export function NavigationMenu({ variant = "full" }: { variant?: "full" | "compact" }) {
  const { activePage, navigateTo } = useNavigation();
  const { t, language } = useTranslation();
  const label = (id: PageId) => t.pageNames[id] || id;

  const renderItem = (id: PageId, num: number, compact: boolean) => {
    const isActive = activePage === id;
    return (
      <button
        key={id}
        onClick={() => navigateTo(id)}
        aria-current={isActive ? "page" : undefined}
        className="menu-item-in flex items-baseline gap-3 sm:gap-6 text-left group cursor-pointer max-w-full"
      >
        {!compact && (
          <span className="font-mono text-xl sm:text-3xl lg:text-5xl text-[#3B82F6] shrink-0">
            {String(num).padStart(2, "0")}
          </span>
        )}
        <span
          className={`${
            compact ? "font-display text-lg sm:text-xl" : "font-display font-medium text-xl sm:text-3xl lg:text-5xl"
          } tracking-tighter transition-colors duration-300 pb-1 min-w-0 ${
            isActive
              ? "text-white underline decoration-white decoration-2 underline-offset-8"
              : compact
              ? "text-gray-300 group-hover:text-[#3B82F6]"
              : "text-[#F5F5F0] group-hover:text-[#3B82F6]"
          }`}
        >
          {label(id)}
        </span>
      </button>
    );
  };

  if (variant === "compact") {
    let n = 0;
    return (
      <div className="flex flex-col gap-5 w-full max-w-md mx-auto">
        {NAV_GROUPS.map((g) => (
          <div key={g.key} className="flex flex-col gap-2 items-start">
            <span className="menu-item-in font-mono text-[10px] tracking-[0.25em] text-[#3B82F6] uppercase font-bold">
              {cap(g.key, language)}
            </span>
            {g.items.map((id) => renderItem(id, ++n, true))}
          </div>
        ))}
      </div>
    );
  }

  // full
  let n = 0;
  return (
    <div className="flex flex-col lg:flex-row items-start justify-center gap-8 sm:gap-10 lg:gap-12 w-full">
      {NAV_GROUPS.map((g) => (
        <div
          key={g.key}
          className={`flex flex-col gap-3 sm:gap-4 items-start max-w-full ${
            g.key === "deeper" ? "pl-0 lg:pl-10 lg:border-l lg:border-[#3C404A]/30" : ""
          }`}
        >
          <span className="menu-item-in font-mono text-[10px] sm:text-[11px] tracking-[0.25em] text-[#3B82F6] uppercase font-bold mb-1">
            {cap(g.key, language)}
          </span>
          {g.items.map((id) => renderItem(id, ++n, false))}
        </div>
      ))}
    </div>
  );
}

export default NavigationMenu;
