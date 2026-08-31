import React, { createContext, useContext, useState, useEffect } from "react";
import { resetScrollLock } from "../lib/scrollLock";
import { parseAppPath, buildAppPath } from "./path";
import { useLanguage } from "../i18n/LanguageContext";

export type PageId = "home" | "how-it-works" | "tech" | "about" | "download" | "comparison" | "news" | "not-found" | "roadmap" | "privacy" | "terms" | "features" | "research" | "privacy-architecture" | "sections" | "glossary" | "test" | "help";

interface NavigationContextValue {
  activePage: PageId;
  navigateTo: (page: PageId, anchorId?: string) => void;
}

const NavigationContext = createContext<NavigationContextValue | null>(null);

/**
 * Синхронный сигнал «пропустить кинематик-интро на главной».
 * navigateTo ставит его ДО setActivePage, а App.tsx читает в рендере — так
 * эффекты того же коммита уже видят skipIntro=true и не запускают кинематик
 * и квиз с блокировкой скролла при якорном переходе во время сессии
 * (например, «Сколько теряют…» из футера на другой странице).
 */
export const homeIntroSkipSignal = { current: false };

function resolvePageFromPath(pathname: string): PageId {
  return parseAppPath(pathname).page;
}

const NavigatePreferences = () => {
  // respect prefers-reduced-motion: the smooth-scroll animation is pointless
  // (and janky) for users who asked for less motion.
  const reduced =
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
  return reduced ? "auto" : "smooth";
};

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const { language } = useLanguage();

  const [activePage, setActivePage] = useState<PageId>(() => {
    const saved = sessionStorage.getItem("redirect");
    if (saved) {
      sessionStorage.removeItem("redirect");
      return parseAppPath(saved).page;
    }
    return parseAppPath(window.location.pathname).page;
  });

  useEffect(() => {
    const handlePopState = () => {
      setActivePage(resolvePageFromPath(window.location.pathname));
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigateTo = (page: PageId, anchorId?: string) => {
    // Любая навигация гарантированно снимает скролл-локи (кинематик/квиз/меню):
    // защита от «залипшего» overflow:hidden при уходе со страницы до снятия локов.
    resetScrollLock();
    // Deep-link на блок главной («Сколько теряют…» из футера и т.п.): пропускаем
    // кинематик-интро и квиз, иначе пользователь попадает в 10-секундный лок.
    if (page === "home" && anchorId) {
      homeIntroSkipSignal.current = true;
      try { sessionStorage.setItem("tn_home_skip_intro", "1"); } catch {}
    }
    setActivePage(page);
    const path = buildAppPath(language, page);
    
    // Update browser history
    if (window.location.pathname !== path) {
      window.history.pushState(null, "", path);
    }

    // Scroll to anchor or top of the page
    setTimeout(() => {
      // Move focus into the page region so keyboard / screen-reader users
      // land where the route changed (do NOT scroll here — the smooth
      // scroll below does that, and preventScroll avoids a jump).
      const main = document.getElementById("main-content");
      if (main && !main.contains(document.activeElement)) {
        main.setAttribute("tabindex", "-1");
        main.focus({ preventScroll: true });
      }
      if (anchorId) {
        let retries = 0;
        const behavior = NavigatePreferences();
        const findAndScroll = () => {
          const element = document.getElementById(anchorId);
          if (element) {
            element.scrollIntoView({ behavior, block: "start" });
            return true;
          }
          return false;
        };

        if (!findAndScroll()) {
          const interval = setInterval(() => {
            retries++;
            if (findAndScroll() || retries > 15) {
              clearInterval(interval);
            }
          }, 50);
        }
        return;
      }
      window.scrollTo({ top: 0, behavior: NavigatePreferences() });
    }, 100);
  };

  return (
    <NavigationContext.Provider value={{ activePage, navigateTo }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const ctx = useContext(NavigationContext);
  if (!ctx) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return ctx;
}
