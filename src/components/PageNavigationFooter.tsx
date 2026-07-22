import React from "react";
import { ArrowRight, Sparkles, Cpu, Layers, Milestone, Users, Ticket, BarChart3, ArrowUpRight } from "lucide-react";
import { useNavigation, PageId } from "../navigation/NavigationContext";
import { useTranslation } from "../i18n/LanguageContext";
import { motion } from "motion/react";

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

interface PageConfig {
  id: PageId;
  description: Record<string, string>;
}

const PAGES_SEQ: PageConfig[] = [
  {
    id: "how-it-works",
    description: {
      ru: "Подробный разбор ИБ-купола и ассистента Kira",
      en: "Deep dive into the security dome and Kira Assistant",
      es: "Análisis detallado de la cúpula y el asistente Kira",
      zh: "深入了解安全穹顶与 Kira 智能助手",
      tr: "Güvenlik kubbesi ve Kira Asistanı hakkında detaylı inceleme",
      hi: "सुरक्षा डोम और Kira सहायक का विस्तृत विवरण",
      ar: "شرح مفصل لقبة الأمان ومساعد Kira",
      pt: "Análise detalhada do domo de segurança e assistente Kira",
      fr: "Analyse détaillée du dôme de sécurité et de l'assistant Kira",
      de: "Detaillierte Analyse der Sicherheitskuppel und des Kira-Assistenten",
      ja: "セキュリティドームとKiraアシスタントの詳細解説",
    }
  },
  {
    id: "tech",
    description: {
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
      ja: "技術的な詳細とアクティブな开发実績",
    }
  },
  {
    id: "roadmap",
    description: {
      ru: "Карта разработки, научные грамоты и ONNX-ядро",
      en: "Development roadmap, academic credentials, and ONNX engine",
      es: "Mapa de desarrollo, credenciales académicas y motor ONNX",
      zh: "研发路线图、学术凭证及 ONNX 核心引擎",
      tr: "Geliştirme yol haritası, akademik belgeler ve ONNX motoru",
      hi: "विकास रोडमैप, शैक्षणिक कредиंशियल्स और ONNX इंजन",
      ar: "خريطة طريق التطوير والمؤهلات الأكاديمية ومحرك ONNX",
      pt: "Roteiro de desenvolvimento, credenciais acadêmicas e motor ONNX",
      fr: "Feuille de route de développement, diplômes universitaires et moteur ONNX",
      de: "Entwicklungs-Roadmap, akademische Referenzen und ONNX-Motor",
      ja: "開発ロードマップ、学術的資格、およびONNXエンジン",
    }
  },
  {
    id: "about",
    description: {
      ru: "Заявка на патент, история создания и команда",
      en: "Patent application, origin story, and the core team",
      es: "Solicitud de patente, historia y el equipo central",
      zh: "已申请专利、创立历程以及核心团队",
      tr: "Patent başvurusu, kuruluş hikayesi ve çekirdek ekip",
      hi: "पेटेंट आवेदन, इतिहास और मुख्य टीम",
      ar: "طلب براءة الاختراع وقصة التأسيس والفريق الأساسي",
      pt: "Pedido de patente, história de origem e equipe principal",
      fr: "Demande de brevet, histoire de création et équipe principale",
      de: "Patentanmeldung, Entstehungsgeschichte und Kernteam",
      ja: "特許出願、誕生ストーリー、そしてコアチーム",
    }
  },
  {
    id: "comparison",
    description: {
      ru: "Сравнение TrustNode с существующими решениями на рынке",
      en: "Compare TrustNode with existing market solutions",
      es: "Compare TrustNode con las soluciones de mercado existentes",
      zh: "将 TrustNode 与市面上现有的解决方案进行对比",
      tr: "TrustNode'u mevcut piyasa çözümleriyle karşılaştırın",
      hi: "मौजूदा बाजार समाधानों के साथ TrustNode की तुलना करें",
      ar: "مقارنة TrustNode مع الحلول الحالية في السوق",
      pt: "Compare o TrustNode com as soluções de mercado existentes",
      fr: "Comparez TrustNode avec les solutions existantes du marché",
      de: "Vergleichen Sie TrustNode mit bestehenden Marktlösungen",
      ja: "TrustNodeと既存の市場ソリューションを比較する",
    }
  },
  {
    id: "early-access",
    description: {
      ru: "Получение приоритетного доступа и участие в закрытом тестировании",
      en: "Get priority access and join the private testing phase",
      es: "Obtenga acceso prioritario y únase a la fase de prueba privada",
      zh: "获取优先体验资格并加入非公开测试阶段",
      tr: "Öncelikli erişim sağlayın ve özel test aşamasına katılın",
      hi: "प्राथमिकता प्राप्त करें और निजी परीक्षण चरण में शामिल हों",
      ar: "احصل на وصول ذي أولوية وانضم إلى مرحلة الاختبار الخاصة",
      pt: "Obtenha acesso prioritário e participe da fase de testes privada",
      fr: "Obtenez un accès prioritaire et rejoignez la phase de test privée",
      de: "Erhalten Sie vorab Zugriff und nehmen Sie an der geschlossenen Testphase teil",
      ja: "優先アクセスを取得して、プライベートテストフェーズに参加する",
    }
  },
  {
    id: "home",
    description: {
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
    }
  }
];

const ALL_SUBPAGES: PageId[] = ["how-it-works", "tech", "roadmap", "about", "early-access", "comparison"];

const PAGE_ICONS: Record<string, React.ComponentType<any>> = {
  "how-it-works": Cpu,
  tech: Layers,
  roadmap: Milestone,
  about: Users,
  "early-access": Ticket,
  comparison: BarChart3
};

const UNVISITED_SECTION_LABELS: Record<string, { heading: string; subtitle: string }> = {
  ru: {
    heading: "НЕИЗУЧЕННЫЕ РАЗДЕЛЫ ПРОТОКОЛА",
    subtitle: "Разделы, которые вы еще не посещали. Защитный контур требует 100% верификации."
  },
  en: {
    heading: "UNEXPLORED PROTOCOL NODES",
    subtitle: "Sections you haven't visited yet. Complete coverage requires 100% verification."
  },
  es: {
    heading: "NODOS DE PROTOCOLO INEXPLORADOS",
    subtitle: "Secciones que aún no has visitado. La cobertura completa requiere una verificación del 100%."
  },
  zh: {
    heading: "未探索的安全节点",
    subtitle: "您尚未访问过的模块。完整防御圈需要 100% 验证。"
  },
  tr: {
    heading: "KEŞFEDİLMEMİŞ GÜVENLİK DÜĞÜMLERİ",
    subtitle: "Henüz ziyaret etmediğiniz bölümler. Tam kapsama alanı %100 doğrulama gerektirir."
  },
  hi: {
    heading: "अन्वेषित प्रोटोकॉल नोड्स",
    subtitle: "ऐसे अनुभाग जिन पर आपने अभी तक विज़िट नहीं किया है। पूर्ण सुरक्षा के लिए 100% सत्यापन आवश्यक है।"
  },
  ar: {
    heading: "عقد البروتوكول غير المستكشفة",
    subtitle: "الأقسام التي لم تقم بزيارتها بعد. التغطية الكاملة تتطلب تحققاً بنسبة 100٪."
  },
  pt: {
    heading: "NODOS DE PROTOCOLO INEXPLORADOS",
    subtitle: "Seções que você ainda não visitou. A cobertura total exige 100% de verificação."
  },
  fr: {
    heading: "NODES DE PROTOCOLE NON EXPLORÉS",
    subtitle: "Sections non visitées. La couverture complète nécessite une vérification à 100 %."
  },
  de: {
    heading: "UNERKUNDETE PROTOKOLLKNOTEN",
    subtitle: "Bereiche, die Sie noch nicht besucht haben. Die vollständige Abdeckung erfordert 100 % Verifizierung."
  },
  ja: {
    heading: "未探索のプロトコルノード",
    subtitle: "まだアクセスしていないセクション。完全なシールドには100％の検証が必要です。"
  }
};

const ALL_SUBPAGE_CONFIGS: Record<string, Record<string, string>> = {
  "how-it-works": {
    ru: "Разбор защитного купола и ИИ-ассистента Kira",
    en: "Deep dive into the security dome and Kira Assistant",
    es: "Análisis de la cúpula y el asistente Kira",
    zh: "深入了解安全穹顶与 Kira 智能助手",
    tr: "Güvenlik kubbesi ve Kira Asistanı incelemesi",
    hi: "सुरक्षा डोम और Kira सहायक का विवरण",
    ar: "شرح لقبة الأمان ومساعد Kira",
    pt: "Análise do domo de segurança e assistente Kira",
    fr: "Analyse du dôme de sécurité et de l'assistant Kira",
    de: "Analyse der Sicherheitskuppel und Kira-Assistent",
    ja: "セキュリティドームとKiraアシスタントの解説"
  },
  tech: {
    ru: "Технические подробности и замеры скорости ИИ",
    en: "Technical details and local AI latency metrics",
    es: "Detalles técnicos y latencia local de IA",
    zh: "技术细节与本地人工智能运行延迟指标",
    tr: "Teknik detaylar ve yerel yapay zeka gecikmesi",
    hi: "तकनीकी विवरण और स्थानीय एआई विलंबता मीट्रिक",
    ar: "التفاصيل التقنية ومقاييس زمن استجابة الذكاء الاصطناعي",
    pt: "Detalhes técnicos e latência de IA local",
    fr: "Détails techniques et latence de l'IA locale",
    de: "Technische Details und lokale KI-Latenzmetriken",
    ja: "技術的な詳細とローカルAIのレイテンシ指標"
  },
  roadmap: {
    ru: "Карта разработки, заявки на патент и верификация",
    en: "Development roadmap, patent applications, and verification",
    es: "Mapa de desarrollo, solicitudes de patente y verificación",
    zh: "研发路线图、已申请专利与技术验证证明",
    tr: "Geliştirme yol haritası, patent başvuruları ve doğrulama",
    hi: "विकास रोडमैप, पेटेंट आवेदन और सत्यापन",
    ar: "خريطة طريق التطوير وطلبات براءات الاختراع والتحقق",
    pt: "Roteiro de desenvolvimento, pedidos de patente e verificação",
    fr: "Feuille de route de développement, demandes de brevet et vérification",
    de: "Entwicklungs-Roadmap, Patentanmeldungen und Verifizierung",
    ja: "開発ロードマップ、特許出願、および技術検証"
  },
  about: {
    ru: "История создания, заявка на патент ФИПС и наша команда",
    en: "Origin story, patent application, and core team",
    es: "Historia de origen, solicitud de patente y equipo",
    zh: "已申请专利、创立历程以及核心团队介绍",
    tr: "Kuruluş hikayesi, patent başvurusu ve çekirdek ekip",
    hi: "उत्पत्ति की कहानी, पेटेंट आवेदन और मुख्य टीम",
    ar: "قصة التأسيس وطلب براءة الاختراع الرسمي والفريق",
    pt: "História de origem, pedido de patente e equipe principal",
    fr: "Histoire de création, demande de brevet et équipe",
    de: "Entstehung, Patentanmeldung und Kernteam",
    ja: "誕生ストーリー、特許出願、熟練開発チーム"
  },
  "early-access": {
    ru: "Получение приоритетного доступа до релиза",
    en: "Get priority VIP/Pro access before release",
    es: "Obtener acceso VIP prioritario antes del lanzamiento",
    zh: "在正式发布前获取优先 VIP/Pro 权限",
    tr: "Yayınlanmadan önce öncelikli VIP erişimi alın",
    hi: "रिलीज़ से पहले प्राथमिकता वीआईपी/प्रो एक्सेस प्राप्त करें",
    ar: "الحصول على وصول VIP ذي أولوية قبل الإصدار",
    pt: "Obtenha acesso VIP/Pro prioritário antes do lançamento",
    fr: "Obtenez un accès VIP prioritaire avant la sortie",
    de: "Erhalten Sie vor dem Release Prioritäts-VIP-Zugriff",
    ja: "リリース前に優先VIP/Proアクセスを取得"
  },
  comparison: {
    ru: "Сравнение TrustNode с аналогами на рынке",
    en: "Compare TrustNode with market competitors",
    es: "Comparar TrustNode con los competidores del mercado",
    zh: "将 TrustNode 与市场竞品进行多维对比",
    tr: "TrustNode'u piyasadaki rakiplerle karşılaştırın",
    hi: "बाजार के प्रतिस्पर्धियों के साथ TrustNode की तुलना करें",
    ar: "مقارنة TrustNode مع المنافسين في السوق",
    pt: "Compare o TrustNode com os concorrentes de mercado",
    fr: "Comparez TrustNode avec les concurrents du marché",
    de: "Vergleichen Sie TrustNode com Marktkonkurrenten",
    ja: "TrustNodeと市場の競合他社を比較"
  }
};

interface PageNavigationFooterProps {
  currentPage: PageId;
}

export default function PageNavigationFooter({ currentPage }: PageNavigationFooterProps) {
  const { navigateTo } = useNavigation();
  const { t, language } = useTranslation();

  // Find index of current page in sequence
  const currentIndex = PAGES_SEQ.findIndex((p) => p.id === currentPage);
  
  // Determine the next page in sequence
  let nextPage = PAGES_SEQ[0];
  if (currentIndex !== -1) {
    const nextPageIndex = (currentIndex + 1) % PAGES_SEQ.length;
    nextPage = PAGES_SEQ[nextPageIndex];
  }

  // Get localized labels
  const pageLabel = t.pageNames[nextPage.id] || nextPage.id;
  const pageDesc = nextPage.description[language] || nextPage.description.en;
  const nextLabel = NEXT_LABEL[language] || NEXT_LABEL.en;

  const handleNextNavigation = () => {
    navigateTo(nextPage.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full py-12 px-4 border-t border-[#1F2937]/30 bg-[#060608]/90 relative overflow-hidden select-none" id="page-nav-footer">
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#2E7DFF]/20 to-transparent pointer-events-none" />
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[500px] h-[150px] bg-[radial-gradient(circle_at_center,rgba(46,125,255,0.03)_0%,rgba(0,0,0,0)_70%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto flex flex-col items-center">
        {/* Next page card */}
        {currentIndex !== -1 && (
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            onClick={handleNextNavigation}
            className="group relative w-full md:max-w-2xl p-6 sm:p-8 border border-[#1F2937]/30 bg-[#070709]/75 backdrop-blur-md rounded-3xl hover:border-[#2E7DFF]/45 hover:shadow-[0_0_25px_rgba(46,125,255,0.12)] transition-all duration-300 cursor-pointer overflow-hidden flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6"
          >
            {/* Accent light overlay */}
            <div className="absolute -inset-px rounded-3xl bg-gradient-to-r from-[#2E7DFF]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            
            <div className="relative z-10">
              {/* Small Monospaced Badge */}
              <div className="flex items-center gap-1.5 mb-2.5">
                <Sparkles className="w-3.5 h-3.5 text-[#2E7DFF] animate-pulse" />
                <span className="font-mono text-[9px] sm:text-[10px] font-bold tracking-[0.18em] text-[#2E7DFF] uppercase">
                  {nextLabel}
                </span>
              </div>

              {/* Next Page Title */}
              <h4 className="font-display font-bold text-xl sm:text-2xl text-[#F5F5F0] group-hover:text-[#2E7DFF] transition-colors mb-2">
                {pageLabel}
              </h4>
              
              {/* Description */}
              <p className="font-sans text-xs sm:text-sm text-gray-500 max-w-md leading-relaxed">
                {pageDesc}
              </p>
            </div>

            {/* Action indicator arrow */}
            <div className="relative z-10 flex items-center gap-2 self-end sm:self-center shrink-0">
              <div className="w-10 h-10 rounded-full border border-[#2E7DFF]/20 bg-[#2E7DFF]/5 group-hover:border-[#2E7DFF]/50 group-hover:bg-[#2E7DFF]/15 flex items-center justify-center text-[#2E7DFF] group-hover:text-white transition-all duration-300 group-hover:scale-110">
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
