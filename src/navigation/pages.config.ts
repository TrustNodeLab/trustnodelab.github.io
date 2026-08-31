import type { PageId } from "./NavigationContext";
import { NAV_ITEMS } from "../components/Navigation";
import { pageNames } from "../i18n/dicts/pageNames";

export interface PageConfig {
  id: PageId;
  labelKey: keyof typeof pageNames.en;
  order: number;
  showInHeader: boolean;
  showInFooterSitemap: boolean;
}

// Порядок и состав контентных разделов ЕДИНСТВЕННЫ — из components/Navigation.tsx.
// Здесь только служебная обвязка (главная + юридические страницы).
export const PAGES_CONFIG: PageConfig[] = [
  {
    id: "home",
    labelKey: "home",
    order: 0,
    showInHeader: true,
    showInFooterSitemap: true,
  },
  ...NAV_ITEMS.map((id, i) => ({
    id,
    labelKey: id as keyof typeof pageNames.en,
    order: i + 1,
    showInHeader: true,
    showInFooterSitemap: true,
  })),
  {
    id: "sections" as PageId,
    labelKey: "sections",
    order: 89,
    showInHeader: false,
    showInFooterSitemap: false,
  },
  {
    id: "privacy" as PageId,
    labelKey: "privacy",
    order: 90,
    showInHeader: false,
    showInFooterSitemap: false,
  },
  {
    id: "terms" as PageId,
    labelKey: "terms",
    order: 91,
    showInHeader: false,
    showInFooterSitemap: false,
  },
];

export const ORDERED_PAGES = [...PAGES_CONFIG].sort((a, b) => a.order - b.order);
export const HEADER_PAGES = ORDERED_PAGES.filter((page) => page.showInHeader);
export const FOOTER_SITEMAP_PAGES = ORDERED_PAGES.filter((page) => page.showInFooterSitemap);
