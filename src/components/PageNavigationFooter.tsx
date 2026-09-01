import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigation, PageId } from "../navigation/NavigationContext";
import { useTranslation } from "../i18n/LanguageContext";
import { motion } from "motion/react";
import { getNextNavItem } from "./Navigation";
import { usePersonalItems } from "../lib/personalRoute";
import ScanCard from "./ScanCard";

const NEXT_LABEL: Record<string, string> = {
  ru: "Следующий раздел",
  en: "Next Section",
  es: "Siguiente Sección",
  zh: "下一章节",
  tr: "Sonraki Bölüm",
  hi: "अगला भाग",
  ar: "القسم التالي",
  pt: "Próxima Seção",
  fr: "Section Suivante",
  de: "Nächster Abschnitt",
  ja: "次のセクション",
};

export const PAGE_DESCRIPTIONS: Record<PageId, Record<string, string>> = {
  features: {

    ru: "Все работающие функции TN1 и честный статус разработок",

    en: "All working TN1 features and an honest development status",

  },

  research: {

    ru: "Метрики F1 = 0.9975 (независимый eval-сет 18 502 строк), методология и НИР",

    en: "F1 = 0.9975 metrics (independent eval set of 18,502 rows), methodology and research award",

  },

  "privacy-architecture": {

    ru: "Как устроена локальная обработка и защита данных",

    en: "How on-device processing and data protection work",

  },

  home: {
    ru: "Вернуться на главную страницу TrustNode",
    en: "Return to the main TrustNode landing page",
    es: "Volver a la página principal de TrustNode",
    zh: "返回 TrustNode 主页",
    tr: "TrustNode ana sayfasına geri dön",
    hi: "TrustNode के मुख्य पृष्ठ पर लौटें",
    ar: "العودة إلى صفحة TrustNode الرئيسية",
    pt: "Retornar à página inicial do TrustNode",
    fr: "Retourner à la page d'accueil de TrustNode",
    de: "Zurück zur Hauptseite von TrustNode",
    ja: "TrustNodeメインページに戻る",
  },
  "how-it-works": {
    ru: "Подробный разбор ИБ-купола и Помощника",
    en: "Deep dive into the security dome and Assistant",
    es: "Análisis detallado de la cúpula y el asistente",
    zh: "深入了解安全穹顶与 智能助手",
    tr: "Güvenlik kubbesi ve Asistanı hakkında detaylı inceleme",
    hi: "सुरक्षा डोम और सहायक का विस्तृत विवरण",
    ar: "شرح مفصل لقبة الأمان والمساعد",
    pt: "Análise detalhada do domo de segurança e assistente",
    fr: "Analyse détaillée du dôme de sécurité et de l'assistant",
    de: "Detaillierte Analyse der Sicherheitskuppel und des Assistenten",
    ja: "セキュリティドームとアシスタントの詳細解説",
  },
  tech: {
    ru: "Технические подробности и доказательства разработки",
    en: "Technical details and active development evidence",
    es: "Detalles técnicos y evidencia de desarrollo activo",
    zh: "技术细节与活跃开发证据",
    tr: "Teknik detaylar ve aktif geliştirme kanıtları",
    hi: "तकनीकी विवरण and सक्रिय विकास साक्ष्य",
    ar: "التفاصيل التقنية وأدلة التطوير النشط",
    pt: "Detalhes técnicos e evidências de desenvolvimento ativo",
    fr: "Détails techniques et preuves de développement actif",
    de: "Technische Details und Nachweise der aktiven Entwicklung",
    ja: "技術的な詳細とアクティブな開発実績",
  },
  roadmap: {
    ru: "Карта разработки, научные грамоты и ONNX-ядро",
    en: "Development roadmap, academic credentials, and ONNX engine",
    es: "Mapa de desarrollo, credenciales académicas y motor ONNX",
    zh: "研发路线图、学术凭证及 ONNX 核心引擎",
    tr: "Geliştirme yol haritası, akademik belgeler ve ONNX motoru",
    hi: "विकास रोडमैप, शैक्षणिक कrediेंशियल्स और ONNX इंजन",
    ar: "خريطة طريق التطوير والمؤهلات الأكاديمية ومحرك ONNX",
    pt: "Roteiro de desenvolvimento, credenciais acadêmicas e motor ONNX",
    fr: "Feuille de route de développement, diplômes universitaires et moteur ONNX",
    de: "Entwicklungs-Roadmap, akademische Referenzen und ONNX-Motor",
    ja: "開発ロードマップ、学術的資格、およびONNXエンジン",
  },
  about: {
    ru: "История создания проекта и команда",
    en: "Origin story and the core team",
    es: "Historia del proyecto y el equipo central",
    zh: "创立历程以及核心团队",
    tr: "Kuruluş hikayesi ve çekirdek ekip",
    hi: "परियोजना इतिहास और मुख्य टीम",
    ar: "قصة التأسيس والفريق الأساسي",
    pt: "História de origem e equipe principal",
    fr: "Histoire de création et équipe principale",
    de: "Entstehungsgeschichte und Kernteam",
    ja: "誕生ストーリー、そしてコアチーム",
  },
  comparison: {
    ru: "Сравнить TrustNode с альтернативами по функциям и офлайн-защите",
    en: "Compare TrustNode with alternatives across features and offline protection",
    es: "Compare TrustNode con alternativas por funciones y protección offline",
    zh: "按功能与离线防护对比 TrustNode 和其他方案",
    tr: "Özellikler ve çevrimdışı koruma açısından TrustNode'u alternatiflerle karşılaştırın",
    hi: "फ़ीचर्स और ऑफलाइन सुरक्षा के आधार पर TrustNode की तुलना विकल्पों से करें",
    ar: "قارن TrustNode بالبدائل من حيث الميزات والحماية دون اتصال",
    pt: "Compare o TrustNode com alternativas por recursos e proteção offline",
    fr: "Comparez TrustNode aux alternatives selon les fonctions et la protection hors ligne",
    de: "Vergleichen Sie TrustNode mit Alternativen nach Funktionen und Offline-Schutz",
    ja: "機能とオフライン保護で TrustNode を他製品と比較します",
  },
  download: {
    ru: "Скачать TrustNode и получить доступ к бета-версии",
    en: "Download TrustNode and get beta access",
    es: "Descargue TrustNode y obtenga acceso beta",
    zh: "下载 TrustNode 并获取测试版访问权限",
    tr: "TrustNode'u indirin ve beta erişimi alın",
    hi: "TrustNode डाउनलोड करें और बीटा एक्सेस प्राप्त करें",
    ar: "نزّل TrustNode واحصل على وصول تجريبي",
    pt: "Baixe o TrustNode e obtenha acesso beta",
    fr: "Téléchargez TrustNode et obtenez un accès bêta",
    de: "Laden Sie TrustNode herunter und erhalten Sie Beta-Zugriff",
    ja: "TrustNodeをダウンロードしてベータアクセスを入手",
  },
  news: {
    ru: "Новости проекта из Telegram и VK",
    en: "Project news from Telegram and VK",
    es: "Noticias del proyecto desde Telegram y VK",
    zh: "来自 Telegram 和 VK 的项目新闻",
    tr: "Telegram ve VK'dan proje haberleri",
    hi: "Telegram और VK से प्रोजेक्ट समाचार",
    ar: "أخبار المشروع من Telegram و VK",
    pt: "Notícias do projeto do Telegram e VK",
    fr: "Actualités du projet depuis Telegram et VK",
    de: "Projekt-Neuigkeiten aus Telegram und VK",
    ja: "Telegram と VK からのプロジェクトニュース",
  },
  sections: {
    ru: "Полный список разделов сайта на одной странице",
    en: "The full list of site sections on one page",
  },
  "not-found": {},
  privacy: {},
  terms: {},
  glossary: {
    ru: "Простые объяснения терминов безопасности: RASP, ONNX, фишинг и другие",
    en: "Plain-language explanations of security terms: RASP, ONNX, phishing and more",
    es: "Explicaciones sencillas de términos de seguridad: RASP, ONNX, phishing y más",
    zh: "通俗解释安全术语：RASP、ONNX、网络钓鱼等",
    tr: "Güvenlik terimlerinin sade açıklamaları: RASP, ONNX, oltalama ve daha fazlası",
    hi: "सुरक्षा शब्दों की सरल व्याख्या: RASP, ONNX, फ़िशिंग और अन्य",
    ar: "شرح مبسط لمصطلحات الأمان: RASP وONNX والتصيد وغيرها",
    pt: "Explicações simples de termos de segurança: RASP, ONNX, phishing e mais",
    fr: "Explications simples des termes de sécurité : RASP, ONNX, phishing et plus",
    de: "Einfache Erklärungen von Sicherheitsbegriffen: RASP, ONNX, Phishing u. a.",
    ja: "セキュリティ用語のわかりやすい解説：RASP、ONNX、フィッシングなど",
  },
  test: {
    ru: "Интерактивный тест: 6 сценариев мошенничества — распознайте обман",
    en: "Interactive quiz: 6 scam scenarios — can you spot the fraud?",
    es: "Cuestionario interactivo: 6 escenarios de fraude — ¿reconoces el engaño?",
    zh: "互动测验：6 个诈骗场景 — 你能识破骗局吗？",
    tr: "Etkileşimli test: 6 dolandırıcılık senaryosu — aldatmacayı tanıyabilir misiniz?",
    hi: "इंटरैक्टिव क्विज़: 6 धोखाधड़ी परिदृश्य — क्या आप ठगी पहचान सकते हैं?",
    ar: "اختبار تفاعلي: 6 سيناريوهات احتيال — هل تستطيع اكتشاف الخداع؟",
    pt: "Teste interativo: 6 cenários de fraude — reconhece o golpe?",
    fr: "Quiz interactif : 6 scénarios d'arnaque — saurez-vous repérer l'escroquerie ?",
    de: "Interaktiver Test: 6 Betrugsszenarien — erkennen Sie den Schwindel?",
    ja: "インタラクティブテスト：詐欺シナリオ6問 — あなたは見抜けますか？",
  },
  help: {
    ru: "Пошаговая инструкция: что делать, если вас обманули мошенники",
    en: "Step-by-step guide: what to do if scammers got you",
    es: "Guía paso a paso: qué hacer si le han estafado",
    zh: "分步指南：被骗后该怎么办",
    tr: "Adım adım rehber: dolandırıldıysanız ne yapmalı",
    hi: "चरण-दर-चरण मार्गदर्शिका: ठगे जाने पर क्या करें",
    ar: "دليل خطوة بخطوة: ماذا تفعل إذا تم احتيالك",
    pt: "Guia passo a passo: o que fazer se for enganado",
    fr: "Guide pas à pas : que faire si vous êtes victime d'arnaque",
    de: "Schritt-für-Schritt-Anleitung: Was tun, wenn Sie betrogen wurden",
    ja: "ステップバイステップガイド：詐欺に遭ったらどうする",
  },
};

interface PageNavigationFooterProps {
  currentPage: PageId;
}

export default function PageNavigationFooter({ currentPage }: PageNavigationFooterProps) {
  const { navigateTo } = useNavigation();
  const { t, language } = useTranslation();
  // Порядок переходов — из схемы, ограниченной персональным маршрутом квиза;
  // список всегда замыкается страницей «Скачать» (FINALE_ID из personalRoute).
  const seq = usePersonalItems();

  // «Скачать» — финал сайта: после неё карточки «следующий раздел» нет.
  if (currentPage === "download") return null;

  const i = seq.indexOf(currentPage);
  const nextId = i === -1 || i === seq.length - 1 ? seq[0] : seq[i + 1];
  const nextPage = { id: nextId };

  // Get localized labels
  const pageLabel = t.pageNames[nextPage.id] || nextPage.id;
  const pageDesc = PAGE_DESCRIPTIONS[nextPage.id]?.[language] || PAGE_DESCRIPTIONS[nextPage.id]?.en || "";
  const nextLabel = NEXT_LABEL[language] || NEXT_LABEL.en;

  const handleNextNavigation = () => {
    navigateTo(nextPage.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full py-10 px-4 bg-[#0A0A0B]/90 relative overflow-hidden select-none" id="page-nav-footer">
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[500px] h-[150px] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.03)_0%,rgba(0,0,0,0)_70%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto flex flex-col items-center">
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          onClick={handleNextNavigation}
          className="group relative w-full md:max-w-2xl cursor-pointer"
        >
          <ScanCard
            accent="59,130,246"
            borderColor="border-[#3C404A]/30"
            cardClassName="bg-[#12141A] backdrop-blur-md hover:border-[#3B82F6]/45 hover:shadow-glow-md"
            onClick={handleNextNavigation}
            padding="p-6 sm:p-8"
            className="sm:flex-row sm:items-center sm:justify-between gap-6"
          >
          {/* Accent light overlay */}
          <div className="absolute -inset-px rounded-xl bg-gradient-to-r from-[#3B82F6]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          
          <div className="relative z-10">
            {/* Small Monospaced Badge */}
            <div className="flex items-center gap-1.5 mb-2.5">
              <Sparkles className="w-3.5 h-3.5 text-[#3B82F6] animate-pulse" />
              <span className="font-mono text-[9px] sm:text-[10px] font-bold tracking-[0.18em] text-[#3B82F6] uppercase">
                {nextLabel}
              </span>
            </div>

            {/* Next Page Title */}
            <h4 className="font-display font-medium text-xl sm:text-2xl text-[#F5F5F0] group-hover:text-[#3B82F6] transition-colors mb-2">
              {pageLabel}
            </h4>
            
            {/* Description */}
            <p className="font-sans text-xs sm:text-sm text-gray-500 max-w-md leading-relaxed">
              {pageDesc}
            </p>
          </div>

          {/* Action indicator arrow */}
          <div className="relative z-10 flex items-center gap-2 self-end sm:self-center shrink-0">
            <div className="w-10 h-10 rounded-full border border-[#3B82F6]/20 bg-[#3B82F6]/5 group-hover:border-[#3B82F6]/50 group-hover:bg-[#3B82F6]/15 flex items-center justify-center text-[#3B82F6] group-hover:text-white transition duration-300 group-hover:scale-[1.05]">
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
          </ScanCard>
        </motion.div>
      </div>
    </div>
  );
}
