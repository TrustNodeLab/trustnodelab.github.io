import { useState } from "react";
import { useTranslation } from "../i18n/LanguageContext";
import { DownloadCTA } from "./Navigation";
import QuizFlow from "./QuizFlow";
import { Phone, Link2, QrCode, ShieldCheck } from "lucide-react";

/**
 * LandingQuizGate — ПОЛНОЦЕННАЯ КОРОТКАЯ ГЛАВНАЯ (лендинг-страница).
 * Всё супер кратко, сжато и простыми словами — буквально для пятилетнего
 * ребёнка: одна мысль на строку, никакой технической терминологии.
 *
 * Структура (полный режим):
 *  1. hero: бейдж TrustNode + заголовок + 1-2 предложения + Скачать + квиз
 *  2. «Что делает» — 4 карточки по одной простой фразе
 *  3. «Как это работает» — 3 шага
 * Квиз-персонализация не барьер, а опция за кнопкой «Персонализировать».
 *
 * Используется в ДВУХ местах:
 *  1) App.tsx — обычный путь главной (без кинематика) → полная страница;
 *  2) CinematicOverlays.tsx — финал кинематик-интро (compact → только hero).
 */

type Copy = {
  badge: string;
  title: string;
  sub: string;
  whatTitle: string;
  items: [string, string, string, string];
  howTitle: string;
  steps: [string, string, string];
  toggle: string;
  note: string;
};

const COPY_BY_LANG: Record<string, Copy> = {
  ru: {
    badge: "TrustNode",
    title: "TrustNode защищает твой телефон от обманщиков",
    sub: "Плохие звонки, плохие ссылки, плохие коды — TrustNode их останавливает.",
    whatTitle: "Что он делает",
    items: [
      "Плохой звонок? Остановит.",
      "Плохая ссылка? Заблокирует.",
      "Плохой QR-код? Проверит.",
      "Деньги обманщику? Не даст.",
    ],
    howTitle: "Как это работает",
    steps: ["Скачай TrustNode", "Он следит за всем сам", "Ты спокоен"],
    toggle: "Подобрать сайт под себя",
    note: "3 вопроса — и сайт станет твоим",
  },
  en: {
    badge: "TrustNode",
    title: "TrustNode keeps your phone safe from tricksters",
    sub: "Bad calls, bad links, bad codes — TrustNode stops them.",
    whatTitle: "What it does",
    items: [
      "Bad call? Stopped.",
      "Bad link? Blocked.",
      "Bad QR code? Checked.",
      "Money to a trickster? Blocked.",
    ],
    howTitle: "How it works",
    steps: ["Get TrustNode", "It watches for you", "You are safe"],
    toggle: "Make this site yours",
    note: "3 questions — and the site becomes yours",
  },
  es: {
    badge: "TrustNode",
    title: "TrustNode protege tu teléfono de los estafadores",
    sub: "Llamadas malas, enlaces malos, códigos malos — TrustNode los detiene.",
    whatTitle: "Qué hace",
    items: [
      "¿Llamada mala? Detenida.",
      "¿Enlace malo? Bloqueado.",
      "¿QR malo? Revisado.",
      "¿Pago a un estafador? Bloqueado.",
    ],
    howTitle: "Cómo funciona",
    steps: ["Descarga TrustNode", "Él vigila por ti", "Estás a salvo"],
    toggle: "Haz este sitio tuyo",
    note: "3 preguntas — y el sitio será tuyo",
  },
  zh: {
    badge: "TrustNode",
    title: "TrustNode 保护你的手机不受骗子侵害",
    sub: "坏电话、坏链接、坏二维码 — TrustNode 都会拦下。",
    whatTitle: "它能做什么",
    items: [
      "坏电话？拦下。",
      "坏链接？屏蔽。",
      "坏二维码？检查。",
      "转钱给骗子？阻止。",
    ],
    howTitle: "怎么用",
    steps: ["下载 TrustNode", "它帮你盯着", "你就安全了"],
    toggle: "让这个网站属于你",
    note: "3 个问题 — 网站就会变成你的",
  },
  tr: {
    badge: "TrustNode",
    title: "TrustNode telefonunu dolandırıcılardan korur",
    sub: "Kötü aramalar, kötü linkler, kötü kodlar — TrustNode hepsini durdurur.",
    whatTitle: "Ne yapar",
    items: [
      "Kötü arama mı? Durdurulur.",
      "Kötü link mi? Engellenir.",
      "Kötü QR mu? Kontrol edilir.",
      "Dolandırıcıya para mı? Engellenir.",
    ],
    howTitle: "Nasıl çalışır",
    steps: ["TrustNode'u indir", "Senin için izler", "Güvendesin"],
    toggle: "Bu siteyi sana göre yap",
    note: "3 soru — site senin olur",
  },
  hi: {
    badge: "TrustNode",
    title: "TrustNode आपके फ़ोन को ठगों से बचाता है",
    sub: "खराब कॉल, खराब लिंक, खराब कोड — TrustNode उन्हें रोकता है।",
    whatTitle: "यह क्या करता है",
    items: [
      "खराब कॉल? रुकी।",
      "खराब लिंक? ब्लॉक।",
      "खराब QR? जाँचा।",
      "ठग को पैसे? रुके।",
    ],
    howTitle: "यह कैसे काम करता है",
    steps: ["TrustNode डाउनलोड करें", "यह आपके लिए देखता है", "आप सुरक्षित हैं"],
    toggle: "इस साइट को अपना बनाएं",
    note: "3 सवाल — साइट आपकी होगी",
  },
  ar: {
    badge: "TrustNode",
    title: "TrustNode يحمي هاتفك من المحتالين",
    sub: "مكالمات سيئة، روابط سيئة، رموز سيئة — TrustNode يوقفها كلها.",
    whatTitle: "ماذا يفعل",
    items: [
      "مكالمة سيئة؟ موقوفة.",
      "رابط سيء؟ محجوب.",
      "رمز QR سيء؟ مفحوص.",
      "دفع لمحتال؟ ممنوع.",
    ],
    howTitle: "كيف يعمل",
    steps: ["حمّل TrustNode", "يراقب عنك", "أنت بأمان"],
    toggle: "اجعل هذا الموقع لك",
    note: "3 أسئلة — وسيصبح الموقع لك",
  },
  pt: {
    badge: "TrustNode",
    title: "TrustNode protege seu celular de golpistas",
    sub: "Chamadas ruins, links ruins, códigos ruins — TrustNode bloqueia todos.",
    whatTitle: "O que ele faz",
    items: [
      "Chamada ruim? Bloqueada.",
      "Link ruim? Bloqueado.",
      "QR ruim? Verificado.",
      "Pix para golpista? Bloqueado.",
    ],
    howTitle: "Como funciona",
    steps: ["Baixe o TrustNode", "Ele vigia por você", "Você está seguro"],
    toggle: "Faça este site seu",
    note: "3 perguntas — e o site será seu",
  },
  fr: {
    badge: "TrustNode",
    title: "TrustNode protège ton téléphone des arnaqueurs",
    sub: "Mauvais appels, mauvais liens, mauvais codes — TrustNode les arrête.",
    whatTitle: "Ce qu'il fait",
    items: [
      "Mauvais appel ? Arrêté.",
      "Mauvais lien ? Bloqué.",
      "Mauvais QR ? Vérifié.",
      "Paiement à un arnaqueur ? Bloqué.",
    ],
    howTitle: "Comment ça marche",
    steps: ["Télécharge TrustNode", "Il veille pour toi", "Tu es en sécurité"],
    toggle: "Fais de ce site le tien",
    note: "3 questions — et le site est à toi",
  },
  de: {
    badge: "TrustNode",
    title: "TrustNode schützt dein Handy vor Betrügern",
    sub: "Schlechte Anrufe, schlechte Links, schlechte Codes — TrustNode stoppt sie.",
    whatTitle: "Was es tut",
    items: [
      "Schlechter Anruf? Gestoppt.",
      "Schlechter Link? Blockiert.",
      "Schlechter QR? Geprüft.",
      "Geld an einen Betrüger? Blockiert.",
    ],
    howTitle: "So funktioniert's",
    steps: ["Hol dir TrustNode", "Es passt für dich auf", "Du bist sicher"],
    toggle: "Mach diese Seite zu deiner",
    note: "3 Fragen — und die Seite gehört dir",
  },
  ja: {
    badge: "TrustNode",
    title: "TrustNode はスマホを詐欺師から守ります",
    sub: "悪い電話、悪いリンク、悪いコード — TrustNode が全部止めます。",
    whatTitle: "できること",
    items: [
      "悪い電話？止めた。",
      "悪いリンク？ブロック。",
      "悪いQR？チェック。",
      "詐欺師への送金？阻止。",
    ],
    howTitle: "使い方",
    steps: ["TrustNode をダウンロード", "あなたの代わりに見張る", "あなたは安心"],
    toggle: "このサイトを自分仕様に",
    note: "3つの質問 — サイトがあなたのものに",
  },
};

const ICONS = [Phone, Link2, QrCode, ShieldCheck];

export default function LandingQuizGate({ compact = false }: { compact?: boolean }) {
  const { language } = useTranslation();
  const [quizOpen, setQuizOpen] = useState(false);
  const d = COPY_BY_LANG[language] || COPY_BY_LANG.ru;

  return (
    <div className="relative w-full">
      {/* ============ PLANET DECO (non-compact only) ============
          The same Earth from the cinematic finale becomes the hero backdrop of
          the main page: a pure-CSS globe (lit limb + night shadow + atmosphere
          halo) painted once behind the headline, so the 3D shot hands off into
          the page. Zero animation, zero JS. */}
      {!compact && (
        <>
          <div
            aria-hidden="true"
            className="pointer-events-none select-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#3B82F6]/[0.07] to-transparent"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none select-none absolute left-1/2 top-[-120px] sm:top-[-160px] -translate-x-1/2 w-[min(92vw,540px)] h-[min(92vw,540px)] sm:w-[660px] sm:h-[660px] rounded-full"
            style={{
              background: [
                // atmosphere halo
                "radial-gradient(circle at 50% 50%, rgba(59,130,246,0) 57%, rgba(59,130,246,0.16) 61%, rgba(59,130,246,0) 67%)",
                // night shadow (dark side, bottom-left)
                "radial-gradient(circle at 62% 40%, rgba(9,12,18,0) 0%, rgba(9,12,18,0.42) 48%, rgba(8,10,16,0.94) 68%)",
                // lit limb + faint continents
                "radial-gradient(circle at 63% 36%, rgba(125,211,252,0.30) 0%, rgba(59,130,246,0.16) 30%, rgba(45,212,191,0.08) 50%, rgba(8,11,16,0) 68%)",
                // ocean disc
                "radial-gradient(circle at 50% 50%, #111A28 0%, #0B101A 58%, #070A11 100%)",
              ].join(","),
            }}
          />
        </>
      )}

      {/* ============ HERO ============ */}
      <div className={`relative z-10 w-full text-center ${compact ? "" : "max-w-3xl mx-auto"}`}>
        <span className="font-mono text-[11px] tracking-[0.25em] text-[#3B82F6] uppercase font-bold">
          {d.badge}
        </span>
        <h2
          className={`font-display font-semibold tracking-tight text-[#F5F5F0] ${
            compact ? "text-xl sm:text-2xl mt-3" : "text-2xl sm:text-4xl mt-4"
          }`}
        >
          {d.title}
        </h2>
        <p
          className={`font-sans text-[#9CA3AF] leading-relaxed ${
            compact ? "text-sm mt-3" : "text-base sm:text-lg mt-4 max-w-2xl mx-auto"
          }`}
        >
          {d.sub}
        </p>
        <div className={compact ? "mt-6" : "mt-8"}>
          <DownloadCTA size={compact ? "md" : "lg"} />
        </div>
        <button
          onClick={() => setQuizOpen((v) => !v)}
          className="mt-6 inline-flex items-center gap-2 text-sm text-gray-300 underline decoration-gray-600 underline-offset-4 hover:text-[#3B82F6] hover:decoration-[#3B82F6]/60 transition-colors cursor-pointer"
          aria-expanded={quizOpen}
        >
          {quizOpen ? "✕" : "▸"} {d.toggle}
        </button>
        {!quizOpen && <p className="mt-2 text-xs font-mono text-gray-500">{d.note}</p>}
        {quizOpen && (
          <div className={`${compact ? "mt-6" : "mt-8"} w-full`}>
            <QuizFlow />
          </div>
        )}
      </div>

      {/* ============ WHAT IT DOES — 4 простые карточки ============ */}
      {!compact && (
        <div className="relative z-10 mt-14 sm:mt-20 max-w-4xl mx-auto">
          <h3 className="font-display font-semibold text-xl sm:text-2xl text-[#F5F5F0] tracking-tight text-center">
            {d.whatTitle}
          </h3>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {d.items.map((line, i) => {
              const Icon = ICONS[i];
              return (
                <div
                  key={i}
                  className="rounded-2xl border border-white/[0.06] bg-[#0E0F12]/90 backdrop-blur-sm p-5 text-center hover:border-[#3B82F6]/40 transition-colors"
                >
                  <Icon className="w-6 h-6 mx-auto text-[#3B82F6]" strokeWidth={1.8} />
                  <p className="mt-3 text-sm sm:text-base text-[#F5F5F0] font-medium leading-snug">
                    {line}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ============ HOW IT WORKS — 3 шага ============ */}
      {!compact && (
        <div className="relative z-10 mt-12 sm:mt-16 max-w-3xl mx-auto">
          <h3 className="font-display font-semibold text-xl sm:text-2xl text-[#F5F5F0] tracking-tight text-center">
            {d.howTitle}
          </h3>
          <ol className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {d.steps.map((step, i) => (
              <li
                key={i}
                className="flex sm:flex-col items-center sm:items-center gap-3 sm:gap-4 rounded-2xl border border-white/[0.06] bg-[#0E0F12]/90 backdrop-blur-sm p-4 sm:p-5 text-center"
              >
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#3B82F6]/15 border border-[#3B82F6]/40 text-[#3B82F6] font-mono text-sm font-bold shrink-0">
                  {i + 1}
                </span>
                <span className="text-sm sm:text-base text-[#F5F5F0] font-medium leading-snug">
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}