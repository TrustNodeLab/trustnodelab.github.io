import { motion } from "motion/react";
import { useTranslation } from "../i18n/LanguageContext";
import { useNavigation } from "../navigation/NavigationContext";
import { Cpu, ShieldCheck, Ticket, BarChart3, Layers, Milestone, Users } from "lucide-react";

const LOCALIZED_CARDS: Record<string, {
  tech: { badge: string; title: string; desc: string; btn: string };
  roadmap: { badge: string; title: string; desc: string; btn: string };
}> = {
  ru: {
    tech: {
      badge: "КОД И НЕЙРОСЕТИ",
      title: "Технические подробности",
      desc: "Архитектура с открытым исходным кодом: локальный запуск ONNX-моделей, квантование весов INT8 и замеры задержки работы ИИ прямо в браузере и на CPU.",
      btn: "Открыть технический стек →"
    },
    roadmap: {
      badge: "ВЕРИФИКАЦИЯ // СХЕМА",
      title: "Дорожная карта",
      desc: "Заявка на патент ФИПС, научные грамоты, вехи разработки и интерактивная схема архитектуры защитного купола.",
      btn: "Посмотреть карту разработки →"
    }
  },
  en: {
    tech: {
      badge: "CODE & NEURAL NETWORKS",
      title: "Technical Stack & Code",
      desc: "Open-source architecture: secure on-device execution of local ONNX models, INT8 weight quantization, and active latency metrics on CPU.",
      btn: "Explore technical stack →"
    },
    roadmap: {
      badge: "VERIFICATION // DIAGRAM",
      title: "Roadmap & Validation",
      desc: "Patent applications, academic diplomas, chronological roadmap milestones, and interactive system architecture schemes.",
      btn: "View development roadmap →"
    }
  },
  es: {
    tech: {
      badge: "CÓDIGO Y REDES NEURONALES",
      title: "Tecnología y Código",
      desc: "Arquitectura de código abierto: ejecución segura en el dispositivo de modelos ONNX locales con cuantización INT8 y métricas de latencia en CPU.",
      btn: "Ver pila tecnológica →"
    },
    roadmap: {
      badge: "VERIFICACIÓN // ESQUEMA",
      title: "Mapa de Ruta",
      desc: "Solicitud de patente oficial, diplomas académicos, hitos cronológicos del mapa de desarrollo y esquemas interactivos de arquitectura.",
      btn: "Ver mapa de desarrollo →"
    }
  },
  zh: {
    tech: {
      badge: "代码与神经网络",
      title: "技术栈与源代码",
      desc: "开源架构：在设备端安全执行本地 ONNX 模型、INT8 权重量化，以及 CPU 上的实时运行延迟指标。",
      btn: "探索技术栈 →"
    },
    roadmap: {
      badge: "验证与架构图",
      title: "路线图与验证",
      desc: "已申请专利、学术证书、研发步骤里程碑以及交互式软件架构拓扑图。",
      btn: "查看研发路线图 →"
    }
  },
  tr: {
    tech: {
      badge: "KOD VE SİNİR AĞLARI",
      title: "Teknik Altyapı & Kod",
      desc: "Açık kaynaklı mimari: INT8 ağırlık nicemlemeli yerel ONNX modellerinin cihaz üstü güvenli yürütümü ve CPU gecikme ölçümleri.",
      btn: "Teknik altyapıyı incele →"
    },
    roadmap: {
      badge: "DOĞRULAMA // ŞEMA",
      title: "Yol Haritası",
      desc: "Patent başvurusu, akademik diplomalar, kronolojik yol haritası aşamaları ve etkileşimli sistem mimarisi şemaları.",
      btn: "Yol haritasını görüntüle →"
    }
  },
  hi: {
    tech: {
      badge: "कोड और तंत्रिका नेटवर्क",
      title: "तकनीकी विवरण और कोड",
      desc: "ओपन-सोर्स आर्किटेक्चर: स्थानीय ONNX मॉडलों का ऑन-डिवाइस सुरक्षित निष्पादन, INT8 क्वांटाइज़ेशन और CPU पर विलंबता मेट्रिक्स।",
      btn: "तकनीकी स्टैक देखें →"
    },
    roadmap: {
      badge: "सत्यापन // आरेख",
      title: "विकास रोडमैप",
      desc: "पेटेंट आवेदन, शैक्षणिक डिप्लोमा, विकास मील के पत्थर और इंटरैक्टिव सिस्टम आर्किटेक्चर आरेख।",
      btn: "रोдमैप देखें →"
    }
  },
  ar: {
    tech: {
      badge: "الرموز والشبكات العصبية",
      title: "المجموعة التقنية والأكواد",
      desc: "بنية مفتوحة المصدر: تشغيل آمن على الجهاز لنماذج ONNX المحلية، تكميم الأوزان بدقة INT8 ومقاييس زمن الانتقال على المعالج.",
      btn: "استكشاف المجموعة التقنية →"
    },
    roadmap: {
      badge: "التحقق // المخطط",
      title: "خريطة الطريق والتحقق",
      desc: "طلبات براءات الاختراع، الشهادات الأكاديمية، معالم خريطة الطريق الزمنية والمخططات التفاعلية لبنية النظام.",
      btn: "عرض خريطة الطريق →"
    }
  },
  pt: {
    tech: {
      badge: "CÓDIGO E REDES NEURAIS",
      title: "Tecnologia e Código",
      desc: "Arquitetura de código aberto: execução segura no dispositivo de modelos ONNX locais, quantização de pesos INT8 e métricas de latência no CPU.",
      btn: "Explorar pilha técnica →"
    },
    roadmap: {
      badge: "VERIFICAÇÃO // ESQUEMA",
      title: "Roteiro de Desenvolvimento",
      desc: "Pedido de patente oficial, diplomas acadêmicos, marcos cronológicos de desenvolvimento e esquemas de arquitetura de sistema interativos.",
      btn: "Ver roteiro de desenvolvimento →"
    }
  },
  fr: {
    tech: {
      badge: "CODE & RÉSEAUX NEURONAUX",
      title: "Technologie & Code",
      desc: "Architecture open-source : exécution sécurisée sur l'appareil de modèles ONNX locaux, quantification des poids en INT8 et mesures de latence CPU.",
      btn: "Explorer la pile technique →"
    },
    roadmap: {
      badge: "VÉRIFICATION // DIAGRAMME",
      title: "Feuille de Route",
      desc: "Demande de brevet officielle, diplômes universitaires, jalons chronologiques de réalisation et schémas interactifs d'architecture système.",
      btn: "Voir la feuille de route →"
    }
  },
  de: {
    tech: {
      badge: "CODE & NEURONALE NETZE",
      title: "Technologie & Code",
      desc: "Open-Source-Architektur: Sichere On-Device-Ausführung lokaler ONNX-Modelle, INT8-Gewichtungsquantisierung und CPU-Latenzmetriken.",
      btn: "Tech-Stack erkunden →"
    },
    roadmap: {
      badge: "VERIFIKATION // SCHEMATIK",
      title: "Entwicklungs-Roadmap",
      desc: "Patentanmeldung, akademische Zeugnisse, chronologische Meilensteine und interaktive Systemarchitekturschemata.",
      btn: "Roadmap anzeigen →"
    }
  },
  ja: {
    tech: {
      badge: "コードとニューラルネットワーク",
      title: "技術スタックとソースコード",
      desc: "オープンソースアーキテクチャ：ローカルONNXモデルのデバイス上での安全な実行、INT8重み量子化、およびCPUでのレイテンシメトリクス。",
      btn: "技術スタックを探索 →"
    },
    roadmap: {
      badge: "検証 // アーキテクチャ図",
      title: "ロードマップと検証",
      desc: "特許出願、学術論文、タイムラインに沿った開発ロードマップのマイルストーン、およびインタラクティブなシステムアーキテクチャ図。",
      btn: "ロードマップを表示 →"
    }
  }
};

export default function ExplorePagesSection() {
  const { t, language } = useTranslation();
  const { navigateTo } = useNavigation();

  const c = t.explore;
  const currentLang = language || "ru";
  const localized = LOCALIZED_CARDS[currentLang] || LOCALIZED_CARDS.en || LOCALIZED_CARDS.ru;

  return (
    <section 
      className="relative w-full py-16 sm:py-24 px-4 overflow-hidden border-t border-[#1F2937]/35 bg-[#0A0A0B] select-none"
      id="explore-portal-section"
    >
      {/* Decorative ambient gradients */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-72 h-72 rounded-full bg-[#2E7DFF]/5 filter blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full bg-[#2E7DFF]/5 filter blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Section Header */}
        <div className="text-center max-w-2xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0A162C]/70 border border-[#2E7DFF]/30 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2E7DFF] animate-pulse" />
            <span className="font-mono text-[9px] sm:text-[10px] font-bold tracking-[0.15em] text-[#2E7DFF]">
              EXPLORE PROTOCOL PORTAL
            </span>
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-4xl text-[#F5F5F0] tracking-tight mb-4">
            {c.title}
          </h2>
          <p className="font-sans text-xs sm:text-sm text-gray-500 max-w-lg mx-auto">
            {c.subtitle}
          </p>
        </div>

        {/* Explore Cards Grid (expanded to 3 columns on desktop for all 6 pages) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          
          {/* Card 1: Technology Page (how-it-works) */}
          <motion.div 
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            onClick={() => navigateTo("how-it-works")}
            className="group relative flex flex-col justify-between p-6 sm:p-8 rounded-2xl border border-[#1F2937]/50 bg-[#070709]/90 hover:border-[#2E7DFF]/55 transition-all duration-300 cursor-pointer shadow-[0_4px_30px_rgba(0,0,0,0.6)]"
            id="explore-tech-card"
          >
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-[#2E7DFF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            
            <div>
              {/* Icon & Badge */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-11 h-11 rounded-xl bg-[#0A162C]/80 border border-[#2E7DFF]/25 flex items-center justify-center text-[#2E7DFF] group-hover:shadow-[0_0_15px_rgba(46,125,255,0.3)] transition-all">
                  <Cpu className="w-5 h-5" />
                </div>
                <span className="font-mono text-[9px] tracking-widest text-[#2E7DFF] font-bold bg-[#2E7DFF]/5 px-2.5 py-1 rounded border border-[#2E7DFF]/15">
                  {c.card1Badge}
                </span>
              </div>

              {/* Title & Desc */}
              <h3 className="font-display font-bold text-lg sm:text-xl text-[#F5F5F0] group-hover:text-[#2E7DFF] transition-colors mb-3">
                {c.card1Title}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-gray-400 leading-relaxed mb-6">
                {c.card1Desc}
              </p>
            </div>

            {/* CTA Link Button */}
            <span className="inline-flex font-mono text-[11px] font-bold text-[#2E7DFF] group-hover:text-white group-hover:translate-x-1.5 transition-all">
              {c.card1Btn}
            </span>
          </motion.div>

          {/* Card 2: Tech Page (tech) */}
          <motion.div 
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            onClick={() => navigateTo("tech")}
            className="group relative flex flex-col justify-between p-6 sm:p-8 rounded-2xl border border-[#1F2937]/50 bg-[#070709]/90 hover:border-[#2E7DFF]/55 transition-all duration-300 cursor-pointer shadow-[0_4px_30px_rgba(0,0,0,0.6)]"
            id="explore-tech-page-card"
          >
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-[#2E7DFF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            
            <div>
              {/* Icon & Badge */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-11 h-11 rounded-xl bg-[#0A162C]/80 border border-[#2E7DFF]/25 flex items-center justify-center text-[#2E7DFF] group-hover:shadow-[0_0_15px_rgba(46,125,255,0.3)] transition-all">
                  <Layers className="w-5 h-5" />
                </div>
                <span className="font-mono text-[9px] tracking-widest text-[#2E7DFF] font-bold bg-[#2E7DFF]/5 px-2.5 py-1 rounded border border-[#2E7DFF]/15">
                  {localized.tech.badge}
                </span>
              </div>

              {/* Title & Desc */}
              <h3 className="font-display font-bold text-lg sm:text-xl text-[#F5F5F0] group-hover:text-[#2E7DFF] transition-colors mb-3">
                {localized.tech.title}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-gray-400 leading-relaxed mb-6">
                {localized.tech.desc}
              </p>
            </div>

            {/* CTA Link Button */}
            <span className="inline-flex font-mono text-[11px] font-bold text-[#2E7DFF] group-hover:text-white group-hover:translate-x-1.5 transition-all">
              {localized.tech.btn}
            </span>
          </motion.div>

          {/* Card 3: Roadmap Page (roadmap) */}
          <motion.div 
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            onClick={() => navigateTo("roadmap")}
            className="group relative flex flex-col justify-between p-6 sm:p-8 rounded-2xl border border-[#1F2937]/50 bg-[#070709]/90 hover:border-[#2E7DFF]/55 transition-all duration-300 cursor-pointer shadow-[0_4px_30px_rgba(0,0,0,0.6)]"
            id="explore-roadmap-page-card"
          >
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-[#2E7DFF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            
            <div>
              {/* Icon & Badge */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-11 h-11 rounded-xl bg-[#0A162C]/80 border border-[#2E7DFF]/25 flex items-center justify-center text-[#2E7DFF] group-hover:shadow-[0_0_15px_rgba(46,125,255,0.3)] transition-all">
                  <Milestone className="w-5 h-5" />
                </div>
                <span className="font-mono text-[9px] tracking-widest text-[#2E7DFF] font-bold bg-[#2E7DFF]/5 px-2.5 py-1 rounded border border-[#2E7DFF]/15">
                  {localized.roadmap.badge}
                </span>
              </div>

              {/* Title & Desc */}
              <h3 className="font-display font-bold text-lg sm:text-xl text-[#F5F5F0] group-hover:text-[#2E7DFF] transition-colors mb-3">
                {localized.roadmap.title}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-gray-400 leading-relaxed mb-6">
                {localized.roadmap.desc}
              </p>
            </div>

            {/* CTA Link Button */}
            <span className="inline-flex font-mono text-[11px] font-bold text-[#2E7DFF] group-hover:text-white group-hover:translate-x-1.5 transition-all">
              {localized.roadmap.btn}
            </span>
          </motion.div>

          {/* Card 4: About Page (about) */}
          <motion.div 
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            onClick={() => navigateTo("about")}
            className="group relative flex flex-col justify-between p-6 sm:p-8 rounded-2xl border border-[#1F2937]/50 bg-[#070709]/90 hover:border-[#2E7DFF]/55 transition-all duration-300 cursor-pointer shadow-[0_4px_30px_rgba(0,0,0,0.6)]"
            id="explore-about-card"
          >
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-[#2E7DFF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            <div>
              {/* Icon & Badge */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-11 h-11 rounded-xl bg-[#0A162C]/80 border border-[#2E7DFF]/25 flex items-center justify-center text-[#2E7DFF] group-hover:shadow-[0_0_15px_rgba(46,125,255,0.3)] transition-all">
                  <Users className="w-5 h-5" />
                </div>
                <span className="font-mono text-[9px] tracking-widest text-[#2E7DFF] font-bold bg-[#2E7DFF]/5 px-2.5 py-1 rounded border border-[#2E7DFF]/15">
                  {c.card2Badge}
                </span>
              </div>

              {/* Title & Desc */}
              <h3 className="font-display font-bold text-lg sm:text-xl text-[#F5F5F0] group-hover:text-[#2E7DFF] transition-colors mb-3">
                {c.card2Title}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-gray-400 leading-relaxed mb-6">
                {c.card2Desc}
              </p>
            </div>

            {/* CTA Link Button */}
            <span className="inline-flex font-mono text-[11px] font-bold text-[#2E7DFF] group-hover:text-white group-hover:translate-x-1.5 transition-all">
              {c.card2Btn}
            </span>
          </motion.div>

          {/* Card 5: Early Access Page (early-access) */}
          <motion.div 
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            onClick={() => navigateTo("early-access")}
            className="group relative flex flex-col justify-between p-6 sm:p-8 rounded-2xl border border-[#1F2937]/50 bg-[#070709]/90 hover:border-[#2E7DFF]/55 transition-all duration-300 cursor-pointer shadow-[0_4px_30px_rgba(0,0,0,0.6)]"
            id="explore-early-access-card"
          >
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-[#2E7DFF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            
            <div>
              {/* Icon & Badge */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-11 h-11 rounded-xl bg-[#0A162C]/80 border border-[#2E7DFF]/25 flex items-center justify-center text-[#2E7DFF] group-hover:shadow-[0_0_15px_rgba(46,125,255,0.3)] transition-all">
                  <Ticket className="w-5 h-5" />
                </div>
                <span className="font-mono text-[9px] tracking-widest text-[#2E7DFF] font-bold bg-[#2E7DFF]/5 px-2.5 py-1 rounded border border-[#2E7DFF]/15">
                  {c.card3Badge}
                </span>
              </div>

              {/* Title & Desc */}
              <h3 className="font-display font-bold text-lg sm:text-xl text-[#F5F5F0] group-hover:text-[#2E7DFF] transition-colors mb-3">
                {c.card3Title}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-gray-400 leading-relaxed mb-6">
                {c.card3Desc}
              </p>
            </div>

            {/* CTA Link Button */}
            <span className="inline-flex font-mono text-[11px] font-bold text-[#2E7DFF] group-hover:text-white group-hover:translate-x-1.5 transition-all">
              {c.card3Btn}
            </span>
          </motion.div>

          {/* Card 6: Comparison Page (comparison) */}
          <motion.div 
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            onClick={() => navigateTo("comparison")}
            className="group relative flex flex-col justify-between p-6 sm:p-8 rounded-2xl border border-[#1F2937]/50 bg-[#070709]/90 hover:border-[#2E7DFF]/55 transition-all duration-300 cursor-pointer shadow-[0_4px_30px_rgba(0,0,0,0.6)]"
            id="explore-comparison-card"
          >
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-[#2E7DFF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            <div>
              {/* Icon & Badge */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-11 h-11 rounded-xl bg-[#0A162C]/80 border border-[#2E7DFF]/25 flex items-center justify-center text-[#2E7DFF] group-hover:shadow-[0_0_15px_rgba(46,125,255,0.3)] transition-all">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <span className="font-mono text-[9px] tracking-widest text-[#2E7DFF] font-bold bg-[#2E7DFF]/5 px-2.5 py-1 rounded border border-[#2E7DFF]/15">
                  {c.card4Badge}
                </span>
              </div>

              {/* Title & Desc */}
              <h3 className="font-display font-bold text-lg sm:text-xl text-[#F5F5F0] group-hover:text-[#2E7DFF] transition-colors mb-3">
                {c.card4Title}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-gray-400 leading-relaxed mb-6">
                {c.card4Desc}
              </p>
            </div>

            {/* CTA Link Button */}
            <span className="inline-flex font-mono text-[11px] font-bold text-[#2E7DFF] group-hover:text-white group-hover:translate-x-1.5 transition-all">
              {c.card4Btn}
            </span>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
