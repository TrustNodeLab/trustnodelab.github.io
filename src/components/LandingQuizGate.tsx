import { useState } from "react";
import { useTranslation } from "../i18n/LanguageContext";
import { DownloadCTA } from "./Navigation";
import QuizFlow from "./QuizFlow";

/**
 * LandingQuizGate — короткая главная: одно простое предложение о пользе +
 * кнопка скачать + квиз-персонализация за кнопкой.
 * Используется в ДВУХ местах:
 *  1) App.tsx — обычный путь главной (без кинематика);
 *  2) CinematicOverlays.tsx — финал кинематик-интро (compact).
 * Идея: всё чётко, кратко и простыми словами — никаких карточек.
 * Квиз не барьер, а опция: «Персонализировать сайт под себя».
 */

const COPY_BY_LANG: Record<
  string,
  { badge: string; title: string; sub: string; toggle: string; note: string }
> = {
  ru: {
    badge: "TrustNode",
    title: "Защита от телефонных мошенников — прямо на вашем телефоне",
    sub: "TrustNode проверяет звонки, ссылки, QR-коды и переводы, пока вы их не открыли. Всё работает локально: ваши данные никуда не уходят.",
    toggle: "Персонализировать сайт под себя",
    note: "3 вопроса — и сайт соберётся под вас",
  },
  en: {
    badge: "TrustNode",
    title: "Protection from phone scammers — right on your phone",
    sub: "TrustNode checks calls, links, QR codes and transfers before you open them. Everything runs on your device: your data never leaves it.",
    toggle: "Personalize the site",
    note: "3 questions — and the site adapts to you",
  },
  es: {
    badge: "TrustNode",
    title: "Protección contra estafas telefónicas — en tu teléfono",
    sub: "TrustNode revisa llamadas, enlaces, códigos QR y pagos antes de que los abras. Todo funciona en tu dispositivo: tus datos no salen de él.",
    toggle: "Personalizar el sitio",
    note: "3 preguntas — y el sitio se adapta a ti",
  },
  zh: {
    badge: "TrustNode",
    title: "防范电话诈骗 — 就在您的手机上",
    sub: "TrustNode 在您打开之前检查来电、链接、二维码和转账。一切都在设备本地运行：您的数据不会离开设备。",
    toggle: "个性化网站",
    note: "3 个问题 — 网站将为您定制",
  },
  tr: {
    badge: "TrustNode",
    title: "Telefon dolandırıcılarına karşı koruma — telefonunuzda",
    sub: "TrustNode, aramaları, bağlantıları, QR kodları ve ödemeleri açmadan önce kontrol eder. Her şey cihazınızda çalışır: verileriniz asla dışarı çıkmaz.",
    toggle: "Siteyi kişiselleştir",
    note: "3 soru — site size göre şekillenir",
  },
  hi: {
    badge: "TrustNode",
    title: "फ़ोन धोखेबाज़ों से सुरक्षा — सीधे आपके फ़ोन पर",
    sub: "TrustNode कॉल, लिंक, QR कोड और भुगतान को खोलने से पहले जाँचता है। सब कुछ आपके डिवाइस पर चलता है: आपका डेटा कहीं नहीं जाता।",
    toggle: "साइट को निजीकृत करें",
    note: "3 सवाल — साइट आपके लिए बनेगी",
  },
  ar: {
    badge: "TrustNode",
    title: "حماية من محتالي الهاتف — على هاتفك مباشرة",
    sub: "يفحص TrustNode المكالمات والروابط ورموز QR والمدفوعات قبل فتحها. كل شيء يعمل على جهازك: بياناتك لا تغادره أبدًا.",
    toggle: "خصص الموقع",
    note: "3 أسئلة — وسيتكيف الموقع معك",
  },
  pt: {
    badge: "TrustNode",
    title: "Proteção contra golpes por telefone — no seu celular",
    sub: "TrustNode verifica chamadas, links, QR codes e pagamentos antes de você abri-los. Tudo roda no seu aparelho: seus dados nunca saem dele.",
    toggle: "Personalizar o site",
    note: "3 perguntas — e o site se adapta a você",
  },
  fr: {
    badge: "TrustNode",
    title: "Protection contre les arnaques téléphoniques — sur votre téléphone",
    sub: "TrustNode vérifie appels, liens, QR codes et paiements avant que vous ne les ouvriez. Tout fonctionne sur votre appareil : vos données ne le quittent jamais.",
    toggle: "Personnaliser le site",
    note: "3 questions — et le site s'adapte à vous",
  },
  de: {
    badge: "TrustNode",
    title: "Schutz vor Telefonbetrug – direkt auf Ihrem Telefon",
    sub: "TrustNode prüft Anrufe, Links, QR-Codes und Überweisungen, bevor Sie sie öffnen. Alles läuft auf Ihrem Gerät: Ihre Daten verlassen es nie.",
    toggle: "Website personalisieren",
    note: "3 Fragen — und die Website passt sich dir an",
  },
  ja: {
    badge: "TrustNode",
    title: "電話詐欺から守る — あなたのスマホで",
    sub: "TrustNode は、開く前に通話・リンク・QRコード・送金をチェックします。すべて端末内で完結し、データが外に出ることはありません。",
    toggle: "サイトをカスタマイズ",
    note: "3つの質問 — サイトがあなた向けに",
  },
};

export default function LandingQuizGate({ compact = false }: { compact?: boolean }) {
  const { language } = useTranslation();
  const [quizOpen, setQuizOpen] = useState(false);
  const d = COPY_BY_LANG[language] || COPY_BY_LANG.ru;

  return (
    <div className={`w-full text-center ${compact ? "" : "max-w-3xl mx-auto"}`}>
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
  );
}