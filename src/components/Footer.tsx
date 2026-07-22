import React from "react";
import { SiTelegram, SiVk, SiTiktok, SiGithub } from "react-icons/si";
import MiniLogo from "./MiniLogo";
import { useTranslation } from "../i18n/LanguageContext";

const SiTelegramIcon = SiTelegram as React.ComponentType<any>;
const SiVkIcon = SiVk as React.ComponentType<any>;
const SiTiktokIcon = SiTiktok as React.ComponentType<any>;
const SiGithubIcon = SiGithub as React.ComponentType<any>;

// Verified signature for use in App.tsx
interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
}

const Footer = React.memo(function Footer({ onOpenPrivacy, onOpenTerms }: FooterProps) {
  const { t, language } = useTranslation();
  const currentYear = new Date().getFullYear();
  const copyright = t.footer.copyright.replace("{year}", String(currentYear));

  return (
    <footer 
      className="relative w-full py-12 sm:py-16 px-4 border-t border-[#1F2937]/20 bg-[#0A0A0B] z-10 overflow-hidden" 
      style={{ paddingBottom: "max(3rem, env(safe-area-inset-bottom))" }}
      id="footer"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-3">
          {/* Static mini version of our shield logo */}
          <div className="w-8 h-10 flex items-center justify-center bg-[#111827]/30 rounded-lg border border-[#2E7DFF]/10">
            <MiniLogo />
          </div>
          
          <div className="flex flex-col">
            <span className="font-display font-bold text-base text-[#F5F5F0] tracking-tight">
              Trust<span className="text-[#2E7DFF]">Node</span>
            </span>
            <span className="font-mono text-[9px] text-gray-400 uppercase tracking-widest">
              {t.brand.footerTagline}
            </span>
          </div>
        </div>

        {/* Center: Copyright & Legal Compliance (FZ-152) */}
        <div className="text-center md:text-left flex flex-col items-center md:items-start gap-1 max-w-full px-2">
          <p className="font-sans text-xs text-gray-400 max-w-full break-words">
            {copyright}
          </p>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-1.5 max-w-full">
            <button 
              onClick={onOpenPrivacy} 
              className="font-sans text-[10px] sm:text-xs text-gray-400 hover:text-[#2E7DFF] hover:underline cursor-pointer transition-colors break-words text-center md:text-left"
            >
              {t.footer.privacyLink}
            </button>
            <span className="text-gray-700 text-xs hidden sm:inline select-none">|</span>
            <button 
              onClick={onOpenTerms} 
              className="font-sans text-[10px] sm:text-xs text-gray-400 hover:text-[#2E7DFF] hover:underline cursor-pointer transition-colors break-words text-center md:text-left"
            >
              {t.footer.termsLink}
            </button>
          </div>
          <p className="font-mono text-[9px] text-gray-600 mt-2 uppercase tracking-widest max-w-full break-words whitespace-normal text-center md:text-left">
            {t.footer.version}
          </p>
          <p className="font-sans text-[9px] text-gray-600 mt-1 max-w-full break-words text-center md:text-left">
            {t.footer.legalEntity}
          </p>
          <p className="font-sans text-[9px] text-gray-600 max-w-full break-words text-center md:text-left">
            {t.footer.legalEntityContact}
          </p>
          <span className="inline-block mt-2 px-2 py-0.5 rounded border border-gray-800 font-mono text-[9px] text-gray-600">
            16+
          </span>
        </div>

        {/* Right: Social / Tech Links */}
        <div className="flex flex-wrap items-center justify-center md:justify-end gap-3">
          <a 
            href="https://t.me/TrustNode_team?direct" 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-mono text-xs text-gray-400 hover:text-[#2E7DFF] hover:border-[#2E7DFF]/40 transition-all duration-300 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0F0F12]/80 border border-[#1F2937]/50"
          >
            <SiTelegramIcon className="w-3.5 h-3.5 text-[#2E7DFF]" />
            <span>Telegram</span>
          </a>
          <a 
            href="https://vk.com/trustnode" 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-mono text-xs text-gray-400 hover:text-[#2E7DFF] hover:border-[#2E7DFF]/40 transition-all duration-300 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0F0F12]/80 border border-[#1F2937]/50"
          >
            <SiVkIcon className="w-3.5 h-3.5 text-[#2E7DFF]" />
            <span>VKontakte</span>
          </a>
          <a 
            href="https://www.tiktok.com/@trusrnode?_r=1&_t=ZS-97fr5YVyPCs" 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-mono text-xs text-gray-400 hover:text-[#2E7DFF] hover:border-[#2E7DFF]/40 transition-all duration-300 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0F0F12]/80 border border-[#1F2937]/50"
          >
            <SiTiktokIcon className="w-3.5 h-3.5 text-[#2E7DFF]" />
            <span>TikTok</span>
          </a>
          <a 
            href="https://github.com/TrustNodeLab" 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-mono text-xs text-gray-400 hover:text-[#2E7DFF] hover:border-[#2E7DFF]/40 transition-all duration-300 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0F0F12]/80 border border-[#1F2937]/50"
          >
            <SiGithubIcon className="w-3.5 h-3.5 text-[#2E7DFF]" />
            <span>GitHub</span>
          </a>
        </div>

      </div>
    </footer>
  );
});

export default Footer;
