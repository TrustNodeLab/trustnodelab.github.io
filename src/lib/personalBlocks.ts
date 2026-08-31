import { useEffect, useState } from "react";
import type { PageId } from "../navigation/NavigationContext";
import { getPersonalRoute } from "./personalRoute";

/* ============================================================================
   personalBlocks — сборка главной страницы по блокам.
   Квиз собирает персональный маршрут из СТРАНИЦ; этот реестр связывает каждый
   контентный блок главной с «доменом»-страницей маршрута. Главная собирается
   из блоков, нужных пользователю:
   — маршрут не сохранён (квиз не пройден) → видны все блоки;
   — маршрут сохранён → видны блоки без домена (always) и блоки,
     чей домен входит в маршрут.
   Footer использует тот же реестр, чтобы не рекламировать ссылки
   на скрытые блоки (раньше ссылка «Сколько теряют…» вела на несуществующий
   якорь и ломала скролл).
   ========================================================================== */

export type HomeBlockId =
  | "damage-calculator"
  | "live-simulator"
  | "how-it-works"
  | "assistant"
  | "security"
  | "model-tester"
  | "comparison"
  | "roadmap"
  | "origin"
  | "news"
  | "faq"
  | "glossary"
  | "test"
  | "help";

export interface HomeBlockDef {
  id: HomeBlockId;
  /** Страница маршрута, к которой относится блок. null = показывать всегда. */
  domain: PageId | null;
}

/** Порядок = порядок рендера на главной. */
export const HOME_BLOCKS: HomeBlockDef[] = [
  { id: "damage-calculator", domain: null },
  { id: "live-simulator", domain: "features" },
  { id: "how-it-works", domain: "how-it-works" },
  { id: "assistant", domain: "features" },
  { id: "security", domain: "tech" },
  { id: "model-tester", domain: "tech" },
  { id: "comparison", domain: "comparison" },
  { id: "roadmap", domain: "roadmap" },
  { id: "origin", domain: "about" },
  { id: "news", domain: null },
  { id: "faq", domain: null },
  // Страницы-карточки (glossary/test/help): показываются на главной,
  // только когда соответствующий раздел есть в персональном маршруте.
  { id: "glossary", domain: "glossary" },
  { id: "test", domain: "test" },
  { id: "help", domain: "help" },
];

export function getVisibleHomeBlocks(route: PageId[]): HomeBlockId[] {
  if (!route.length) return HOME_BLOCKS.map((b) => b.id);
  return HOME_BLOCKS.filter((b) => b.domain === null || route.includes(b.domain)).map((b) => b.id);
}

export function useVisibleHomeBlocks(): HomeBlockId[] {
  const [visible, setVisible] = useState<HomeBlockId[]>(() => getVisibleHomeBlocks(getPersonalRoute()));
  useEffect(() => {
    const sync = () => setVisible(getVisibleHomeBlocks(getPersonalRoute()));
    window.addEventListener("tn-route-change", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("tn-route-change", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  return visible;
}
