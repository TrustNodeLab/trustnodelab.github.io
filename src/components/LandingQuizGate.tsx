import { useState } from "react";
import { Phone, Link2, QrCode, UserRound } from "lucide-react";
import { useTranslation } from "../i18n/LanguageContext";
import { DownloadCTA } from "./Navigation";
import QuizFlow from "./QuizFlow";

/**
 * LandingQuizGate — «от чего защищаем» + скачать + квиз за кнопкой.
 * Используется в ДВУХ местах:
 *  1) App.tsx — обычный путь главной (без кинематика);
 *  2) CinematicOverlays.tsx — финал кинематик-интро (compact).
 * Идея: обычный пользователь сразу видит пользу (защита + скачать),
 * квиз-персонализация не барьер, а опция.
 */

const THREATS_BY_LANG: Record<
  string,
  { badge: string; items: [string, string, string, string]; toggle: string; note: string }
> = {
  ru: { badge: "От чего защищаем", items: ["Звонки и голосовые", "Ссылки в сообщениях", "QR-коды и оплаты", "Личные данные"], toggle: "Персонализировать сайт под себя", note: "3 вопроса — и сайт соберётся под вас" },
  en: { badge: "What we protect against", items: ["Calls and voice", "Links in messages", "QR codes & payments", "Personal data"], toggle: "Personalize the site", note: "3 questions — and the site adapts to you" },
  es: { badge: "Contra qué protegemos", items: ["Llamadas y voz", "Enlaces en mensajes", "Códigos QR y pagos", "Datos personales"], toggle: "Personalizar el sitio", note: "3 preguntas — y el sitio se adapta a ti" },
  zh: { badge: "我们防护什么", items: ["电话和语音", "消息中的链接", "二维码和支付", "个人数据"], toggle: "个性化网站", note: "3 个问题 — 网站将为您定制" },
  tr: { badge: "Nelerden koruruz", items: ["Aramalar ve ses", "Mesajlardaki bağlantılar", "QR kodlar ve ödemeler", "Kişisel veriler"], toggle: "Siteyi kişiselleştir", note: "3 soru — site size göre şekillenir" },
  hi: { badge: "हम किससे बचाते हैं", items: ["कॉल और आवाज़", "मैसेज में लिंक", "QR कोड और भुगतान", "व्यक्तिगत डेटा"], toggle: "साइट को निजीकृत करें", note: "3 सवाल — साइट आपके लिए बनेगी" },
  ar: { badge: "مما نحميك", items: ["المكالمات والصوت", "الروابط في الرسائل", "رموز QR والمدفوعات", "البيانات الشخصية"], toggle: "خصص الموقع", note: "3 أسئلة — وسيتكيف الموقع معك" },
  pt: { badge: "Do que protegemos", items: ["Chamadas e voz", "Links em mensagens", "Códigos QR e pagamentos", "Dados pessoais"], toggle: "Personalizar o site", note: "3 perguntas — e o site se adapta a você" },
  fr: { badge: "Contre quoi nous protégeons", items: ["Appels et voix", "Liens dans les messages", "Codes QR et paiements", "Données personnelles"], toggle: "Personnaliser le site", note: "3 questions — et le site s'adapte à vous" },
  de: { badge: "Wovor wir schützen", items: ["Anrufe und Stimme", "Links in Nachrichten", "QR-Codes und Zahlungen", "Persönliche Daten"], toggle: "Website personalisieren", note: "3 Fragen — und die Website passt sich dir an" },
  ja: { badge: "何から守るか", items: ["電話と音声", "メッセージ内のリンク", "QRコードと支払い", "個人データ"], toggle: "サイトをカスタマイズ", note: "3つの質問 — サイトがあなた向けに" },
};

const THREAT_ICONS = [Phone, Link2, QrCode, UserRound];

export default function LandingQuizGate({ compact = false }: { compact?: boolean }) {
  const { language } = useTranslation();
  const [quizOpen, setQuizOpen] = useState(false);
  const d = THREATS_BY_LANG[language] || THREATS_BY_LANG.ru;

  return (
    <div className={`w-full text-center ${compact ? "" : "max-w-3xl mx-auto"}`}>
      <span className="font-mono text-[11px] tracking-[0.25em] text-[#3B82F6] uppercase font-bold">
        {d.badge}
      </span>
      <div className={`grid grid-cols-2 lg:grid-cols-4 gap-3 w-full ${compact ? "mt-5" : "mt-8"}`}>
        {d.items.map((label, i) => {
          const Icon = THREAT_ICONS[i];
          return (
            <div
              key={i}
              className="flex flex-col items-center gap-2.5 rounded-xl border border-white/[0.06] bg-[#0E0F12]/70 px-4 py-5"
            >
              <Icon className="w-6 h-6 text-[#3B82F6]" />
              <span className="font-sans text-sm text-[#F5F5F0]/90 leading-snug">{label}</span>
            </div>
          );
        })}
      </div>
      <div className={`${compact ? "mt-6" : "mt-10"}`}>
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
  );
}