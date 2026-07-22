import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { SiTelegram, SiVk, SiTiktok, SiGithub } from "react-icons/si";
import MiniLogo from "./MiniLogo";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "../i18n/LanguageContext";
import { useNavigation, PageId } from "../navigation/NavigationContext";

const SiTelegramIcon = SiTelegram as React.ComponentType<any>;
const SiVkIcon = SiVk as React.ComponentType<any>;
const SiTiktokIcon = SiTiktok as React.ComponentType<any>;
const SiGithubIcon = SiGithub as React.ComponentType<any>;

// Verified signature for use in App.tsx
interface HeaderProps {
  isEcoMode: boolean;
  onToggleEcoMode: () => void;
}

const Header = React.memo(function Header({ isEcoMode, onToggleEcoMode }: HeaderProps) {
  const { t } = useTranslation();
  const { activePage, navigateTo } = useNavigation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        setScrolled(window.scrollY > 20);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  const getPageLabel = (page: PageId) => {
    const labels = t.pageNames;
    return labels[page] || page;
  };

  const handlePageNavigation = (page: PageId, anchorId?: string) => {
    setIsOpen(false);
    navigateTo(page, anchorId);
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        paddingTop: scrolled || activePage !== "home"
          ? "max(0.75rem, env(safe-area-inset-top))" 
          : "max(1.25rem, env(safe-area-inset-top))",
        paddingBottom: scrolled || activePage !== "home" ? "0.75rem" : "1.25rem",
        paddingLeft: "max(1rem, env(safe-area-inset-left))",
        paddingRight: "max(1rem, env(safe-area-inset-right))",
        transition: "padding 300ms ease",
      }}
      id="main-nav-header"
    >
      {/*
        Two stacked, ALWAYS-mounted background layers that crossfade via opacity.
        Root cause of the white flash: the previous version swapped the whole
        className (bg-transparent <-> bg-[#0A0A0B]/85 + border + shadow) on
        every scroll/page change. Toggling backdrop-blur + border-color by
        adding/removing classes forces the browser to paint the new layer at
        full strength on the very first frame (before any transition can
        interpolate it), which shows up as a one-frame white/bright flash,
        especially on Chrome. Keeping both layers permanently in the DOM and
        only animating opacity avoids that repaint pop entirely.
      */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[#0A0A0B]/85 backdrop-blur-md border-b border-[#1F2937]/30 shadow-[0_4px_30px_rgba(0,0,0,0.4)] transition-opacity duration-300 ease-out"
        style={{ opacity: scrolled || activePage !== "home" ? 1 : 0 }}
      />
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        
        {/* Left: Brand Logo */}
        <div 
          className="flex items-center gap-3 cursor-pointer select-none"
          onClick={() => handlePageNavigation("home")}
          id="header-logo-container"
        >
          <div className="w-8 h-10 flex items-center justify-center bg-[#111827]/30 rounded-lg border border-[#2E7DFF]/15">
            <MiniLogo />
          </div>
          
          <div className="flex flex-col">
            <span className="font-display font-bold text-base text-[#F5F5F0] tracking-tight">
              Trust<span className="text-[#2E7DFF]">Node</span>
            </span>
            <span className="font-mono text-[8px] text-gray-500 uppercase tracking-widest leading-none">
              {t.brand.tagline}
            </span>
          </div>
        </div>

        {/* Center: Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-2" id="desktop-nav">
          <button 
            onClick={() => handlePageNavigation("home")}
            className={`font-sans text-xs font-medium transition-all cursor-pointer py-1.5 px-3 rounded-lg border ${
              activePage === "home" 
                ? "text-white bg-[#2E7DFF]/15 border-[#2E7DFF]/30 shadow-[0_0_12px_rgba(46,125,255,0.18)]" 
                : "text-gray-400 hover:text-[#2E7DFF] hover:bg-[#111827]/30 border-transparent"
            }`}
          >
            {getPageLabel("home")}
          </button>

          <button 
            onClick={() => handlePageNavigation("how-it-works")}
            className={`font-sans text-xs font-medium transition-all cursor-pointer py-1.5 px-3 rounded-lg border ${
              activePage === "how-it-works" 
                ? "text-white bg-[#2E7DFF]/15 border-[#2E7DFF]/30 shadow-[0_0_12px_rgba(46,125,255,0.18)]" 
                : "text-gray-400 hover:text-[#2E7DFF] hover:bg-[#111827]/30 border-transparent"
            }`}
          >
            {getPageLabel("how-it-works")}
          </button>
          
          <button 
            onClick={() => handlePageNavigation("tech")}
            className={`font-sans text-xs font-medium transition-all cursor-pointer py-1.5 px-3 rounded-lg border ${
              activePage === "tech" 
                ? "text-white bg-[#2E7DFF]/15 border-[#2E7DFF]/30 shadow-[0_0_12px_rgba(46,125,255,0.18)]" 
                : "text-gray-400 hover:text-[#2E7DFF] hover:bg-[#111827]/30 border-transparent"
            }`}
          >
            {getPageLabel("tech")}
          </button>

          <button 
            onClick={() => handlePageNavigation("roadmap")}
            className={`font-sans text-xs font-medium transition-all cursor-pointer py-1.5 px-3 rounded-lg border ${
              activePage === "roadmap" 
                ? "text-white bg-[#2E7DFF]/15 border-[#2E7DFF]/30 shadow-[0_0_12px_rgba(46,125,255,0.18)]" 
                : "text-gray-400 hover:text-[#2E7DFF] hover:bg-[#111827]/30 border-transparent"
            }`}
          >
            {getPageLabel("roadmap")}
          </button>

          <button 
            onClick={() => handlePageNavigation("about")}
            className={`font-sans text-xs font-medium transition-all cursor-pointer py-1.5 px-3 rounded-lg border ${
              activePage === "about" 
                ? "text-white bg-[#2E7DFF]/15 border-[#2E7DFF]/30 shadow-[0_0_12px_rgba(46,125,255,0.18)]" 
                : "text-gray-400 hover:text-[#2E7DFF] hover:bg-[#111827]/30 border-transparent"
            }`}
          >
            {getPageLabel("about")}
          </button>

          <button 
            onClick={() => handlePageNavigation("comparison")}
            className={`font-sans text-xs font-medium transition-all cursor-pointer py-1.5 px-3 rounded-lg border ${
              activePage === "comparison" 
                ? "text-white bg-[#2E7DFF]/15 border-[#2E7DFF]/30 shadow-[0_0_12px_rgba(46,125,255,0.18)]" 
                : "text-gray-400 hover:text-[#2E7DFF] hover:bg-[#111827]/30 border-transparent"
            }`}
          >
            {getPageLabel("comparison")}
          </button>

          <button 
            onClick={() => handlePageNavigation("early-access")}
            className={`font-sans text-xs font-semibold hover:text-[#2E7DFF]/80 transition-all cursor-pointer py-1.5 px-3 ${
              activePage === "early-access"
                ? "text-white bg-[#2E7DFF]/15 border border-[#2E7DFF]/30 rounded-lg shadow-[0_0_12px_rgba(46,125,255,0.18)]"
                : "text-[#2E7DFF]"
            }`}
          >
            {t.nav.earlyAccess}
          </button>
        </nav>

        {/* Right: Premium Social Media Actions + Language (Desktop) */}
        <div className="hidden md:flex items-center gap-3" id="desktop-social-actions">
          <a
            href="https://t.me/TrustNode_team?direct"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Telegram"
            title="Telegram"
            className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#0A162C]/60 hover:bg-[#2E7DFF]/20 border border-[#2E7DFF]/30 text-[#2E7DFF] hover:text-white transition-all duration-300 hover:shadow-[0_0_12px_rgba(46,125,255,0.25)]"
          >
            <SiTelegramIcon className="w-4 h-4" />
          </a>
          <a
            href="https://vk.com/trustnode"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="VK"
            title="VK"
            className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#0A162C]/60 hover:bg-[#2E7DFF]/20 border border-[#2E7DFF]/30 text-[#2E7DFF] hover:text-white transition-all duration-300 hover:shadow-[0_0_12px_rgba(46,125,255,0.25)]"
          >
            <SiVkIcon className="w-4 h-4" />
          </a>
          <a
            href="https://www.tiktok.com/@trusrnode?_r=1&_t=ZS-97fr5YVyPCs"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
            title="TikTok"
            className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#0A162C]/60 hover:bg-[#2E7DFF]/20 border border-[#2E7DFF]/30 text-[#2E7DFF] hover:text-white transition-all duration-300 hover:shadow-[0_0_12px_rgba(46,125,255,0.25)]"
          >
            <SiTiktokIcon className="w-4 h-4" />
          </a>
          <a
            href="https://github.com/TrustNodeLab"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            title="GitHub"
            className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#0A162C]/60 hover:bg-[#2E7DFF]/20 border border-[#2E7DFF]/30 text-[#2E7DFF] hover:text-white transition-all duration-300 hover:shadow-[0_0_12px_rgba(46,125,255,0.25)]"
          >
            <SiGithubIcon className="w-4 h-4" />
          </a>
          <LanguageSwitcher variant="desktop" />
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2.5 rounded-lg bg-[#111827]/40 border border-[#1F2937]/50 text-gray-400 hover:text-[#2E7DFF] transition-colors cursor-pointer"
            id="mobile-menu-toggle"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div 
          className="md:hidden absolute top-[100%] left-0 right-0 bg-[#0A0A0B]/98 border-b border-[#1F2937]/50 py-6 px-4 flex flex-col gap-3 shadow-2xl animate-fade-in max-h-[calc(100dvh-64px)] overflow-y-auto"
          id="mobile-drawer"
        >
          <button 
            onClick={() => handlePageNavigation("home")}
            className={`font-sans text-sm font-medium text-left transition-colors py-2.5 px-3 rounded-xl border ${
              activePage === "home" 
                ? "text-[#2E7DFF] bg-[#2E7DFF]/10 border-[#2E7DFF]/20" 
                : "text-gray-300 hover:text-[#2E7DFF] border-transparent"
            }`}
          >
            {getPageLabel("home")}
          </button>
          <button 
            onClick={() => handlePageNavigation("how-it-works")}
            className={`font-sans text-sm font-medium text-left transition-colors py-2.5 px-3 rounded-xl border ${
              activePage === "how-it-works" 
                ? "text-[#2E7DFF] bg-[#2E7DFF]/10 border-[#2E7DFF]/20" 
                : "text-gray-300 hover:text-[#2E7DFF] border-transparent"
            }`}
          >
            {getPageLabel("how-it-works")}
          </button>
          <button 
            onClick={() => handlePageNavigation("tech")}
            className={`font-sans text-sm font-medium text-left transition-colors py-2.5 px-3 rounded-xl border ${
              activePage === "tech" 
                ? "text-[#2E7DFF] bg-[#2E7DFF]/10 border-[#2E7DFF]/20" 
                : "text-gray-300 hover:text-[#2E7DFF] border-transparent"
            }`}
          >
            {getPageLabel("tech")}
          </button>
          <button 
            onClick={() => handlePageNavigation("roadmap")}
            className={`font-sans text-sm font-medium text-left transition-colors py-2.5 px-3 rounded-xl border ${
              activePage === "roadmap" 
                ? "text-[#2E7DFF] bg-[#2E7DFF]/10 border-[#2E7DFF]/20" 
                : "text-gray-300 hover:text-[#2E7DFF] border-transparent"
            }`}
          >
            {getPageLabel("roadmap")}
          </button>
          <button 
            onClick={() => handlePageNavigation("about")}
            className={`font-sans text-sm font-medium text-left transition-colors py-2.5 px-3 rounded-xl border ${
              activePage === "about" 
                ? "text-[#2E7DFF] bg-[#2E7DFF]/10 border-[#2E7DFF]/20" 
                : "text-gray-300 hover:text-[#2E7DFF] border-transparent"
            }`}
          >
            {getPageLabel("about")}
          </button>
          <button 
            onClick={() => handlePageNavigation("comparison")}
            className={`font-sans text-sm font-medium text-left transition-colors py-2.5 px-3 rounded-xl border ${
              activePage === "comparison" 
                ? "text-[#2E7DFF] bg-[#2E7DFF]/10 border-[#2E7DFF]/20" 
                : "text-gray-300 hover:text-[#2E7DFF] border-transparent"
            }`}
          >
            {getPageLabel("comparison")}
          </button>
          <button 
            onClick={() => handlePageNavigation("early-access")}
            className="font-sans text-sm font-semibold text-left text-[#2E7DFF] hover:text-[#2E7DFF]/80 transition-colors py-2.5 px-3"
          >
            {t.nav.earlyAccess}
          </button>

          <div className="h-px bg-[#1F2937]/30 my-1" />

          {/* Language Switcher inside Mobile Menu */}
          <div className="px-1" id="mobile-lang-switcher-container">
            <LanguageSwitcher variant="mobile" />
          </div>

          <div className="h-px bg-[#1F2937]/30 my-1" />

          {/* Socials inside Mobile Menu */}
          <div className="flex flex-col gap-3">
            <div className="flex gap-2">
              <a
                href="https://t.me/TrustNode_team?direct"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                className="flex-1 flex items-center justify-center py-3 rounded-xl bg-[#0F0F12] border border-[#1F2937]"
              >
                <SiTelegramIcon className="w-5 h-5 text-[#2E7DFF]" />
              </a>
              <a
                href="https://vk.com/trustnode"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="VK"
                className="flex-1 flex items-center justify-center py-3 rounded-xl bg-[#0F0F12] border border-[#1F2937]"
              >
                <SiVkIcon className="w-5 h-5 text-[#2E7DFF]" />
              </a>
              <a
                href="https://www.tiktok.com/@trusrnode?_r=1&_t=ZS-97fr5YVyPCs"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="flex-1 flex items-center justify-center py-3 rounded-xl bg-[#0F0F12] border border-[#1F2937]"
              >
                <SiTiktokIcon className="w-5 h-5 text-[#2E7DFF]" />
              </a>
              <a
                href="https://github.com/TrustNodeLab"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex-1 flex items-center justify-center py-3 rounded-xl bg-[#0F0F12] border border-[#1F2937]"
              >
                <SiGithubIcon className="w-5 h-5 text-[#2E7DFF]" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
});

export default Header;
