import React from "react";
import { Phone, Link2, QrCode, UserRound } from "lucide-react";
import { useTranslation } from "../i18n/LanguageContext";
import { useEcoMode } from "../context/EcoModeContext";
import { motion } from "motion/react";
import SectionBadge from "./SectionBadge";

const DICT: Record<string, { badge: string; title: string; subtitle: string; points: Array<{ title: string }> }> = {
  ru: {
    badge: "ПРОСТОЕ ОБЪЯСНЕНИЕ",
    title: "Всё просто: о TrustNode за 1 минуту",
    subtitle: "Простыми словами: что именно TrustNode блокирует прямо на вашем устройстве",
    points: [
      { title: "Звонки и голосовые" },
      { title: "Ссылки в сообщениях" },
      { title: "QR-коды и оплаты" },
      { title: "Личные данные" }
    ]
  },
  en: {
    badge: "SIMPLE EXPLANATION",
    title: "TrustNode in 1 Minute",
    subtitle: "In plain words: what exactly TrustNode blocks right on your device",
    points: [
      { title: "Calls & voice" },
      { title: "Links in messages" },
      { title: "QR codes & payments" },
      { title: "Personal data" }
    ]
  },
  es: {
    badge: "EXPLICACIÓN SENCILLA",
    title: "Muy Sencillo: TrustNode en 1 Minuto",
    subtitle: "En palabras sencillas: qué bloquea exactamente TrustNode en su dispositivo",
    points: [
      { title: "Llamadas y voz" },
      { title: "Enlaces en mensajes" },
      { title: "Códigos QR y pagos" },
      { title: "Datos personales" }
    ]
  },
  zh: {
    badge: "极简说明",
    title: "只需一分钟，轻松了解 TrustNode",
    subtitle: "用最通俗的话讲：TrustNode 在您的设备上究竟拦截什么",
    points: [
      { title: "通话与语音" },
      { title: "消息中的链接" },
      { title: "二维码与支付" },
      { title: "个人数据" }
    ]
  },
  tr: {
    badge: "BASİT AÇIKLAMA",
    title: "Çok Basit: 1 Dakikada TrustNode",
    subtitle: "Sade bir dille: TrustNode cihazınızda tam olarak neyi engeller",
    points: [
      { title: "Aramalar ve ses" },
      { title: "Mesajlardaki bağlantılar" },
      { title: "QR kodları ve ödemeler" },
      { title: "Kişisel veriler" }
    ]
  },
  hi: {
    badge: "सरल व्याख्या",
    title: "बहुत सरल: 1 मिनट में TrustNode",
    subtitle: "सीधी भाषा में: TrustNode आपके डिवाइस पर वास्तव में क्या रोकता है",
    points: [
      { title: "कॉल और आवाज़" },
      { title: "संदेशों में लिंक" },
      { title: "QR कोड और भुगतान" },
      { title: "व्यक्तिगत डेटा" }
    ]
  },
  ar: {
    badge: "شرح مبسط",
    title: "بكل بساطة: TrustNode في دقيقة واحدة",
    subtitle: "بكلمات بسيطة: ما الذي يحجبه TrustNode بالضبط على جهازك",
    points: [
      { title: "المكالمات والصوت" },
      { title: "الروابط في الرسائل" },
      { title: "رموز QR والمدفوعات" },
      { title: "البيانات الشخصية" }
    ]
  },
  pt: {
    badge: "EXPLICAÇÃO SIMPLES",
    title: "Tudo Simples: TrustNode em 1 Minuto",
    subtitle: "Em palavras simples: o que exatamente o TrustNode bloqueia no seu dispositivo",
    points: [
      { title: "Chamadas e voz" },
      { title: "Links em mensagens" },
      { title: "QR codes e pagamentos" },
      { title: "Dados pessoais" }
    ]
  },
  fr: {
    badge: "EXPLICATION SIMPLE",
    title: "Tout Simple : TrustNode en 1 Minute",
    subtitle: "En mots simples : ce que TrustNode bloque exactement sur votre appareil",
    points: [
      { title: "Appels et voix" },
      { title: "Liens dans les messages" },
      { title: "QR codes et paiements" },
      { title: "Données personnelles" }
    ]
  },
  de: {
    badge: "EINFACHE ERKLÄRUNG",
    title: "Ganz einfach: TrustNode in 1 Minute",
    subtitle: "In einfachen Worten: was TrustNode genau auf Ihrem Gerät blockiert",
    points: [
      { title: "Anrufe & Stimme" },
      { title: "Links in Nachrichten" },
      { title: "QR-Codes & Zahlungen" },
      { title: "Persönliche Daten" }
    ]
  },
  ja: {
    badge: "わかりやすい解説",
    title: "1分でわかる TrustNode",
    subtitle: "簡単な言葉で：TrustNodeが端末上で正確に何をブロックするのか",
    points: [
      { title: "通話と音声" },
      { title: "メッセージ内のリンク" },
      { title: "QRコードと決済" },
      { title: "個人データ" }
    ]
  }
};

const ICONS = [Phone, Link2, QrCode, UserRound];

export const INTRO_DICT = DICT;

const IntroSection = React.memo(function IntroSection({ transparent = false }: { transparent?: boolean }) {
  const { language } = useTranslation();
  const { ecoMode } = useEcoMode();
  const content = DICT[language] || DICT.en;

  return (
    <section
      className={`relative w-full py-16 sm:py-20 px-4 ${transparent ? "bg-transparent" : "bg-[#0A0A0B]"}`}
      id="intro-simplified"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <SectionBadge variant="brackets" label={content.badge} className="mb-6" />

          <h2 className="font-display font-medium text-2xl sm:text-4xl text-[#F5F5F0] tracking-tighter mb-4">
            {content.title}
          </h2>

          <p className="font-sans text-xs sm:text-sm text-gray-400 leading-relaxed max-w-xl mx-auto">
            {content.subtitle}
          </p>
        </div>

        {/* 4 short icon points */}
        <div className="relative">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {content.points.map((point, idx) => {
              const IconComponent = ICONS[idx];
              return (
                <motion.div
                  key={idx}
                  initial={transparent ? { opacity: 0, y: -40 } : false}
                  whileInView={transparent ? { opacity: 1, y: 0 } : undefined}
                  viewport={transparent ? { once: true, margin: "-60px" } : undefined}
                  transition={{ duration: 0.6, delay: idx * 0.08, ease: "easeOut" }}
                  className={`rounded-xl border border-white/[0.06] bg-[#0E0F12]/70 px-4 py-5 flex flex-col items-start gap-3 ${ecoMode ? "" : "hover:border-[#3B82F6]/30 transition-colors"}`}
                >
                  <IconComponent className="w-5 h-5 text-[#3B82F6]" />
                  <span className="font-sans text-xs sm:text-sm text-gray-300 leading-snug">
                    {point.title}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
});

export default IntroSection;