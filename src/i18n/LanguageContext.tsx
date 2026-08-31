import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { LanguageCode, detectBrowserLanguage } from './languages';
import { translations } from './translations';
import { pageNames } from './dicts/pageNames';
import type { Translations } from './types';
import { parseAppPath, buildAppPath, pageSlug } from '../navigation/path';

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Captured during init: 404.html stores the original deep path in
  // sessionStorage.redirect and lands on "/". NavigationContext (child)
  // consumes + removes that key during ITS init, so we must stash it here
  // (parent initializer runs first) for the URL-restore effect below.
  const redirectPathRef = useRef<string | null>(null);
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    // 1. URL prefix wins (shareable links).
    const urlLang = parseAppPath(window.location.pathname).lang;
    if (urlLang) return urlLang;
    // 1b. Deep-link reload via 404.html → "/" redirect: restore the
    // language that was in the original path.
    const saved = sessionStorage.getItem("redirect");
    if (saved) {
      redirectPathRef.current = saved;
      const redirectLang = parseAppPath(saved).lang;
      if (redirectLang) return redirectLang;
    }
    // 2. localStorage.
    const savedLang = localStorage.getItem('trustnode_lang') as LanguageCode;
    if (savedLang && translations[savedLang]) return savedLang;
    // 3. Browser detection.
    return detectBrowserLanguage();
  });

  useEffect(() => {
    document.documentElement.setAttribute('lang', language);
    document.documentElement.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');

    // Persist to localStorage.
    try { localStorage.setItem('trustnode_lang', language); } catch {}

    // On first load without a lang prefix, rewrite the URL in-place
    // so / becomes /ru/ and /research becomes /ru/research.
    const parsed = parseAppPath(window.location.pathname);
    if (!parsed.lang) {
      // If we arrived via the 404.html redirect, restore the REAL deep
      // path (page + language) so the URL matches the content and a
      // subsequent reload stays stable.
      const source = redirectPathRef.current
        ? parseAppPath(redirectPathRef.current)
        : parsed;
      const slug = pageSlug(source.page);
      const newPath = slug
        ? `/${language}/${slug}`
        : `/${language}/`;
      if (window.location.pathname !== newPath) {
        window.history.replaceState(null, '', newPath);
      }
    }
  }, [language]);

  const setLanguage = (lang: LanguageCode) => {
    if (!translations[lang]) return;
    setLanguageState(lang);
    try { localStorage.setItem('trustnode_lang', lang); } catch {}

    // Navigate to the same page under the new language prefix.
    const parsed = parseAppPath(window.location.pathname);
    const newPath = buildAppPath(lang, parsed.page, parsed.unknownSlug);
    window.history.pushState(null, '', newPath);

    // Notify NavigationContext so activePage re-resolves from the new path.
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const t: Translations = {
    ...(translations[language] || translations['ru']),
    pageNames: pageNames[language] || pageNames.ru,
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const useTranslation = useLanguage;
