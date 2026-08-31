import type { PageId } from "./NavigationContext";
import { isLanguageCode, type LanguageCode } from "../i18n/languages";

/**
 * Slug ↔ PageId mapping.
 * "home" and "not-found" have no slug — they map to "".
 */
const SLUG_TO_PAGE: Record<string, PageId> = {
  "how-it-works": "how-it-works",
  "tech": "tech",
  "about": "about",
  "download": "download",
  "comparison": "comparison",
  "news": "news",
  "roadmap": "roadmap",
  "privacy": "privacy",
  "terms": "terms",
  "features": "features",
  "research": "research",
  "privacy-architecture": "privacy-architecture",
  "sections": "sections",
  "glossary": "glossary",
  "test": "test",
  "help": "help",
};

const PAGE_TO_SLUG: Record<PageId, string> = {
  home: "",
  "not-found": "",
  "how-it-works": "how-it-works",
  tech: "tech",
  about: "about",
  download: "download",
  comparison: "comparison",
  news: "news",
  roadmap: "roadmap",
  privacy: "privacy",
  terms: "terms",
  features: "features",
  research: "research",
  "privacy-architecture": "privacy-architecture",
  sections: "sections",
  glossary: "glossary",
  test: "test",
  help: "help",
};

export interface ParsedPath {
  hasLangPrefix: boolean;
  lang: LanguageCode | null;
  page: PageId;
  /** Preserved when page is "not-found" — used by language switch. */
  unknownSlug: string | null;
}

/**
 * Parse a raw URL pathname into language + page components.
 *
 * Handles both legacy URLs (`/research`) and lang-prefixed URLs (`/en/research`).
 */
export function parseAppPath(pathname: string): ParsedPath {
  const base = import.meta.env.BASE_URL || "/";

  // Strip leading base URL (e.g. "/en/" from "/en/research")
  let rest = pathname;
  if (base !== "/" && rest.startsWith(base)) {
    rest = rest.slice(base.length);
  }
  // Strip leading slash
  if (rest.startsWith("/")) rest = rest.slice(1);
  // Strip trailing slash
  rest = rest.replace(/\/+$/, "");

  // Empty → home
  if (!rest) {
    return { hasLangPrefix: false, lang: null, page: "home", unknownSlug: null };
  }

  const segments = rest.split("/");
  const first = segments[0];

  // First segment is a language code → lang-prefixed URL
  if (isLanguageCode(first)) {
    const pageSlug = segments.slice(1).join("/");

    // No page slug → home for that language
    if (!pageSlug) {
      return { hasLangPrefix: true, lang: first, page: "home", unknownSlug: null };
    }

    // Known page slug → resolve
    const page = SLUG_TO_PAGE[pageSlug];
    if (page) {
      return { hasLangPrefix: true, lang: first, page, unknownSlug: null };
    }

    // Unknown page slug — preserve it so language switch can carry it forward
    return {
      hasLangPrefix: true,
      lang: first,
      page: "not-found",
      unknownSlug: pageSlug,
    };
  }

  // No lang prefix — legacy URL like `/research`
  const page = SLUG_TO_PAGE[first];
  if (page) {
    return { hasLangPrefix: false, lang: null, page, unknownSlug: null };
  }

  return {
    hasLangPrefix: false,
    lang: null,
    page: "not-found",
    unknownSlug: first,
  };
}

/**
 * Build a lang-prefixed path for navigation.
 *
 * - Home  → `/ru/`
 * - Page  → `/en/research`
 * - not-found with unknownSlug → `/ru/unknown-page`
 */
/** Return the URL slug for a given PageId (empty string for home/not-found). */
export function pageSlug(page: PageId): string {
  return PAGE_TO_SLUG[page] || "";
}

export function buildAppPath(
  lang: LanguageCode,
  page: PageId,
  unknownSlug?: string
): string {
  const base = import.meta.env.BASE_URL || "/";
  const prefix = base.endsWith("/") ? base : base + "/";

  const slug =
    page === "not-found" && unknownSlug ? unknownSlug : PAGE_TO_SLUG[page];

  if (!slug) return `${prefix}${lang}/`;
  return `${prefix}${lang}/${slug}`;
}
