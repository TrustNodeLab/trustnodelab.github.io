import React, { createContext, useContext, useState, useEffect } from 'react';
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
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    // 1. URL prefix wins (shareable links).
    const urlLang = parseAppPath(window.location.pathname).lang;
    if (urlLang) return urlLang;
    // 2. localStorage.
    const saved = localStorage.getItem('trustnode_lang') as LanguageCode;
    if (saved && translations[saved]) return saved;
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
      const slug = pageSlug(parsed.page);
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
