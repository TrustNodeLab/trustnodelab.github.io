import React from "react";
import { Bot, WifiOff, HardDrive, Cpu, FileText, Radio, Mic } from "lucide-react";
import { motion } from "motion/react";
import { useTranslation } from "../i18n/LanguageContext";
import { LanguageCode } from "../i18n/languages";
import { useEcoMode } from "../context/EcoModeContext";
import { useDepth } from "../context/DepthContext";
import SectionBadge from "./SectionBadge";
import ScanCard from "./ScanCard";

// Deterministic pseudo-random equalizer heights per bar (for variety across idle loops)
const EQ_BASE = [10, 22, 16, 30, 14, 26, 20, 34, 18, 28, 12, 24];

const TITLE_BY_LANG: Partial<Record<LanguageCode, string>> = {
  "ru": "Помощник TrustNode",
  "en": "TrustNode Assistant",
  "es": "Asistente de TrustNode",
  "zh": "TrustNode 助手",
  "tr": "TrustNode Asistanı",
  "hi": "TrustNode सहायक",
  "ar": "مساعد TrustNode",
  "pt": "Assistente do TrustNode",
  "fr": "Assistant TrustNode",
  "de": "TrustNode-Assistent",
  "ja": "TrustNode アシスタント"
};

const SUBTITLE_BY_LANG: Partial<Record<LanguageCode, string>> = {
  "ru": "Офлайн-помощник с базой знаний по схемам мошенничества, работающий прямо на устройстве",
  "en": "An offline assistant with a knowledge base of fraud schemes, running fully on your device",
  "es": "Un asistente sin conexión con una base de conocimiento sobre esquemas de fraude que funciona en el dispositivo",
  "zh": "内置防诈骗知识库的离线助手，完全在设备上运行",
  "tr": "Cihazda çalışan, dolandırıcılık şemaları bilgi tabanına sahip çevrimdışı asistan",
  "hi": "धोखाधड़ी योजनाओं के ज्ञान आधार वाला ऑफ़लाइन सहायक, पूरी तरह आपके डिवाइस पर चलता है",
  "ar": "مساعد بدون اتصال بقاعدة معرفة بأساليب الاحتيال، يعمل بالكامل على جهازك",
  "pt": "Um assistente offline com uma base de conhecimento sobre esquemas de fraude, rodando no dispositivo",
  "fr": "Un assistant hors ligne avec une base de connaissances sur les schémas de fraude, fonctionnant sur l'appareil",
  "de": "Ein Offline-Assistent mit einer Wissensbasis über Betrugsmaschen, direkt auf dem Gerät",
  "ja": "詐欺の手口に関するナレッジベースを備えたオフラインアシスタント、端末上で動作"
};

const BADGE_BY_LANG: Partial<Record<LanguageCode, string>> = {
  "ru": "ВСТРОЕННЫЙ ПОМОЩНИК",
  "en": "BUILT-IN ASSISTANT",
  "es": "ASISTENTE INTEGRADO",
  "zh": "内置助手",
  "tr": "YERLEŞİK ASİSTAN",
  "hi": "इनबिल्ट सहायक",
  "ar": "المساعد المدمج",
  "pt": "ASSISTENTE INTEGRADO",
  "fr": "ASSISTANT INTÉGRÉ",
  "de": "INTEGRIERTER ASSISTENT",
  "ja": "内蔵アシスタント"
};

const KIRA_STATUS_BY_LANG: Record<LanguageCode, string> = {
  ru: "РАБОТАЕТ В ПРИЛОЖЕНИИ",
  en: "LIVE IN THE APP",
  es: "ACTIVO EN LA APP",
  zh: "已在应用中上线",
  tr: "UYGULAMADA AKTİF",
  hi: "ऐप में सक्रिय",
  ar: "يعمل داخل التطبيق",
  pt: "ATIVO NO APP",
  fr: "ACTIF DANS L'APP",
  de: "AKTIV IN DER APP",
  ja: "アプリ内で稼働中"
};

const FEATURES_BY_LANG: Partial<Record<LanguageCode, Array<{ title: string; desc: string }>>> = {
  ru: [
    {
      title: "Локальный Интент-Классификатор",
      desc: "Дообученная надстройка над основной ruBERT. Распознает 15-20 специализированных интентов безопасности, добавляя к модели всего ~200 КБ весов."
    },
    {
      title: "Работа на 100% Офлайн",
      desc: "Никаких обращений к облачным LLM. Вся семантическая структура и шаблоны ответов упакованы в приложение, работая без сети в режиме сверхнизкой задержки."
    },
    {
      title: "Синтетический Датасет Коллаборации",
      desc: "Обучена на узкоспециализированных синтетических диалогах мошеннических схем, сгенерированных в облаке Google Colab с помощью Llama 3.1 и Qwen2.5."
    }
  ],
  en: [
    {
      title: "Local Intent Classifier",
      desc: "A highly optimized fine-tuned add-on on top of the main ruBERT model. Resolves 15-20 specific security intents, introducing a mere 200 KB memory footprint."
    },
    {
      title: "100% Offline Execution",
      desc: "No expensive, slow external LLM API calls. Fully offline response templates and speech processing algorithms keep execution latency down to microseconds."
    },
    {
      title: "Advanced Training Datasets",
      desc: "Trained on synthetic dialogues of social-engineering schemes synthesized in Google Colab using advanced Llama 3.1 and Qwen2.5 models for ultimate accuracy."
    }
  ],
  es: [
    {
      title: "Clasificador de Intenciones Local",
      desc: "Extensión entrenada sobre la red ruBERT básica. Reconoce entre 15 y 20 intenciones de seguridad especializadas, añadiendo solo ~200 KB de peso al modelo."
    },
    {
      title: "Ejecución 100% Fuera de Línea",
      desc: "Sin conexiones a LLM en la nube. Toda la estructura semántica y las plantillas de respuestas están empaquetadas en la aplicación, funcionando sin conexión con latencia ultra baja."
    },
    {
      title: "Conjunto de Datos Sintéticos",
      desc: "Entrenada con diálogos sintéticos altamente especializados de esquemas de fraude, generados en la nube de Google Colab mediante Llama 3.1 y Qwen2.5."
    }
  ],
  zh: [
    {
      title: "本地意图分类器",
      desc: "基于主 ruBERT 的微调附加组件。可识别 15-20 个特定的安全意图，仅增加约 200 KB 的模型权重。"
    },
    {
      title: "100% 离线执行",
      desc: "无需请求云端大模型 API。所有语义结构和应答模板都打包在应用中，在无网状态下以超低延迟运行。"
    },
    {
      title: "先进训练数据集",
      desc: "在高度专业的欺诈计划合成对话上进行训练，这些对话是使用先进的 Llama 3.1 和 Qwen2.5 模型在 Google Colab 中生成的。"
    }
  ],
  hi: [
    {
      title: "स्थानीय इरादा वर्गीकारक",
      desc: "मुख्य ruBERT के शीर्ष पर एक अत्यधिक अनुकूलित फाइन-ट्यून्ड ऐड-ऑन। केवल 200 KB मेमोरी फ़ुटप्रिंट के साथ 15-20 विशिष्ट सुरक्षा इरादों को हल करता है।"
    },
    {
      title: "100% ऑफ़लाइन निष्पादन",
      desc: "कोई महंगा, धीमा बाहरी LLM API कॉल नहीं। पूरी तरह से ऑफ़लाइन प्रतिक्रिया टेम्पलेट और भाषण प्रसंस्करण एल्गोरिदम निष्पादन विलंबता को सूक्ष्मसेकंड तक कम रखते हैं।"
    },
    {
      title: "उन्नत प्रशिक्षण डेटासेट",
      desc: "अंतिम सटीकता के लिए उन्नत Llama 3.1 और Qwen2.5 मॉडल का उपयोग करके Google Colab में संश्लेषित सोशल-इंजीनियरिंग योजनाओं के सिंथेटिक संवादों पर प्रशिक्षित।"
    }
  ],
  ar: [
    {
      title: "مصنف النوايا المحلي",
      desc: "إضافة مدربة ومحسنة فوق نموذج ruBERT الأساسي. يتعرف على 15-20 نية أمنية متخصصة، مضافًا إلى وزن النموذج ~200 كيلوبايت فقط."
    },
    {
      title: "تشغيل أوفلاين بنسبة 100%",
      desc: "لا توجد اتصالات بنماذج لغوية سحابية مكلفة. جميع هياكل الدلالات وقوالب الاستجابة معبأة في التطبيق، وتعمل بدون شبكة بزمن انتقال فائق القصر."
    },
    {
      title: "مجموعات البيانات التدريبية المتقدمة",
      desc: "تم تدريبه على حوارات تركيبية متخصصة للغاية لخطط الاحتيال، تم إنشاؤها في سحابة Google Colab باستخدام نموذجي Llama 3.1 و Qwen2.5."
    }
  ],
  pt: [
    {
      title: "Classificador de Intenção Local",
      desc: "Extensão ajustada sobre a rede ruBERT principal. Reconoce de 15 a 20 intenções de segurança específicas, adicionando apenas ~200 KB de peso ao modelo."
    },
    {
      title: "Execução 100% Off-line",
      desc: "Sem chamadas para LLMs em nuvem. Toda a estrutura semântica e os modelos de resposta estão embutidos no aplicativo, rodando sem rede em modo de latência ultra baixa."
    },
    {
      title: "Dataset de Treinamento Avançado",
      desc: "Treinado em diálogos sintéticos altamente especializados de esquemas de fraude, gerados no Google Colab usando Llama 3.1 e Qwen2.5."
    }
  ],
  fr: [
    {
      title: "Classificateur d'Intents Local",
      desc: "Un module complémentaire affiné et hautement optimisé au-dessus du modèle principal ruBERT. Résout 15 à 20 intentions de sécurité spécifiques pour une empreinte mémoire de seulement 200 Ko."
    },
    {
      title: "Exécution 100 % hors ligne",
      desc: "Aucun appel d'API LLM externe lent et coûteux. Les modèles de réponse entièrement hors ligne et les algorithmes de traitement de la parole maintiennent la latence d'exécution à l'échelle de la microseconde."
    },
    {
      title: "Jeux de données d'entraînement avancés",
      desc: "Entraîné sur des dialogues synthétiques de schémas d'ingénierie sociale synthétisés dans Google Colab à l'aide de modèles avancés Llama 3.1 et Qwen2.5 pour une précision ultime."
    }
  ],
  de: [
    {
      title: "Lokaler Intent-Klassifikator",
      desc: "Ein hochgradig optimiertes, feingetuntes Add-On auf Basis des ruBERT-Hauptmodells. Erkennt 15-20 spezifische Sicherheits-Intents bei nur 200 KB Speicherbedarf."
    },
    {
      title: "100% Offline-Ausführung",
      desc: "Keine teuren, langsamen externen LLM-API-Aufrufe. Vollständige Offline-Antwortvorlagen und Sprachverarbeitungsalgorithmen halten die Latenz im Mikrosekundenbereich."
    },
    {
      title: "Fortschrittliche Trainingsdaten",
      desc: "Trainiert mit hochspezialisierten synthetischen Dialogen von Betrugsszenarien, die in Google Colab mit Llama 3.1 und Qwen2.5 generiert wurden."
    }
  ],
  ja: [
    {
      title: "ローカル意図分類器",
      desc: "ベースとなる ruBERT 上に構築された追加の調整レイヤー。わずか約200 KBのウェイト追加で、15〜20個のセキュリティに特化した意図を識別します。"
    },
    {
      title: "100% オフライン動作",
      desc: "クラウド上の大規模言語モデル（LLM）への問い合わせは一切不要。すべての意味構造と応答テンプレートはアプリ内にパッケージ化され、ネットワークなしで超低遅延で機能します。"
    },
    {
      title: "高度な合成データセット",
      desc: "Google Colab上にて Llama 3.1 や Qwen2.5 などの先端モデルを用いて生成された、ソーシャルエンジニアリング詐欺に特化した合成対話データセットで訓練されています。"
    }
  ]
};

/* ── Simplified variants (depth="simple": no technical jargon) ──────────── */
const SIMPLE_TITLE_BY_LANG: Partial<Record<LanguageCode, string>> = {
  ru: "Помощник в приложении",
  en: "In-App Helper",
  es: "Ayudante de la App",
  zh: "应用内助手",
  tr: "Uygulama İçi Yardımcı",
  hi: "ऐप में सहायक",
  ar: "مساعد داخل التطبيق",
  pt: "Assistente no App",
  fr: "Assistant dans l'App",
  de: "Helfer in der App",
  ja: "アプリ内ヘルパー"
};

const SIMPLE_SUBTITLE_BY_LANG: Partial<Record<LanguageCode, string>> = {
  ru: "Помогает распознать мошенничество — работает прямо на вашем телефоне, без интернета",
  en: "Helps detect scams — works right on your phone, no internet needed",
  es: "Ayuda a detectar estafas — funciona directamente en tu teléfono, sin internet",
  zh: "帮助识别诈骗——直接在您手机上工作，无需联网",
  tr: "Dolandırıcılığı tespit etmeye yardımcı olur — doğrudan telefonunuzda çalışır, internet gerekmez",
  hi: "धोखाधड़ी पहचानने में मदद करता है — सीधे आपके फ़ोन पर काम करता है, बिना इंटरनेट",
  ar: "يساعد في اكتشاف الاحتيال — يعمل مباشرة على هاتفك، بدون إنترنت",
  pt: "Ajuda a detectar fraudes — funciona diretamente no seu celular, sem internet",
  fr: "Aide à détecter les arnaques — fonctionne directement sur votre téléphone, sans internet",
  de: "Hilt bei der Erkennung von Betrug — funktioniert direkt auf Ihrem Telefon, ohne Internet",
  ja: "詐欺の検出をサポート — あなたの電話で直接動作、インターネット不要"
};

const SIMPLE_FEATURES_BY_LANG: Partial<Record<LanguageCode, Array<{ title: string; desc: string }>>> = {
  ru: [
    {
      title: "Понимает намерения",
      desc: "Определяет, хочет ли собеседник помочь, обмануть или оказать давление — и предупреждает вас."
    },
    {
      title: "Работает без интернета",
      desc: "Не нужен Wi-Fi или мобильный интернет. Помощник всегда доступен — даже в лесу или в метро."
    },
    {
      title: "Учится на примерах",
      desc: "Обучен на реальных сценариях мошенничества, чтобы распознавать новые уловки."
    }
  ],
  en: [
    {
      title: "Understands Intent",
      desc: "Detects whether the caller wants to help, deceive, or pressure you — and warns you."
    },
    {
      title: "Works Without Internet",
      desc: "No Wi-Fi or mobile data needed. The helper is always available — even in a forest or subway."
    },
    {
      title: "Learned from Real Scams",
      desc: "Trained on real fraud scenarios to recognize new tricks as they emerge."
    }
  ],
  es: [
    {
      title: "Entiende la Intención",
      desc: "Detecta si la persona quiere ayudar, engañar o presionar — y te avisa."
    },
    {
      title: "Funciona sin Internet",
      desc: "No necesita Wi-Fi ni datos móviles. El ayudante siempre está disponible — incluso en un bosque o metro."
    },
    {
      title: "Aprendió de Estafas Reales",
      desc: "Entrenado con escenarios de fraude reales para reconocer nuevos trucos."
    }
  ],
  zh: [
    {
      title: "理解意图",
      desc: "检测对方是想帮助你、欺骗你还是给你施压——并发出警告。"
    },
    {
      title: "无需联网",
      desc: "不需要 Wi-Fi 或移动数据。助手随时可用——即使在森林或地铁里。"
    },
    {
      title: "从真实案例学习",
      desc: "在真实诈骗场景上训练，能够识别新出现的骗术。"
    }
  ],
  tr: [
    {
      title: "Niyeti Anlar",
      desc: "Arayanın yardım mı etmek istediğini, aldatmak mı yoksa baskı yapmak mıtığını algılar ve sizi uyarır."
    },
    {
      title: "İnternetsiz Çalışır",
      desc: "Wi-Fi veya mobil veri gerekmez. Asistan her zaman kullanılabilecek — ormanda veya metroda bile."
    },
    {
      title: "Gerçek Dolandırıcılıktan Öğrendi",
      desc: "Yeni taktikleri tanımak için gerçek dolandırıcılık senaryolarıyla eğitildi."
    }
  ],
  hi: [
    {
      title: "इरादा समझता है",
      desc: "पता लगाता है कि कॉल करने वाला मदद करना चाहता है, धोखा देना चाहता है, या दबाव बनाना — और चेतावनी देता है।"
    },
    {
      title: "बिना इंटरनेट काम करता है",
      desc: "Wi-Fi या मोबाइल डेटा की ज़रूरत नहीं। सहायक हमेशा उपलब्ध — जंगल या मेट्रो में भी।"
    },
    {
      title: "असली धोखाधड़ी से सीखा",
      desc: "नए तरीकों को पहचानने के लिए वास्तविक धोखाधड़ी परिदृश्यों पर प्रशिक्षित।"
    }
  ],
  ar: [
    {
      title: "يفهم النية",
      desc: "يكتشف ما إذا كان المتصل يريد المساعدة أو الخداع أو الضغط — ويحذرك."
    },
    {
      title: "يعمل بدون إنترنت",
      desc: "لا يحتاج Wi-Fi أو بيانات الهاتف. المساعد متاح دائمًا — حتى في الغابة أو المترو."
    },
    {
      title: "تعلم من حالات احتيال حقيقية",
      desc: "تم تدريبه على سيناريوهات احتيال حقيقية للتعرف على الحيل الجديدة."
    }
  ],
  pt: [
    {
      title: "Entende a Intenção",
      desc: "Detecta se a pessoa quer ajudar, enganar ou pressionar — e avisa você."
    },
    {
      title: "Funciona sem Internet",
      desc: "Não precisa de Wi-Fi ou dados móveis. O assistente está sempre disponível — até na floresta ou no metrô."
    },
    {
      title: "Aprendeu com Fraudes Reais",
      desc: "Treinado com cenários de fraude reais para reconhecer novos truques."
    }
  ],
  fr: [
    {
      title: "Comprend l'Intention",
      desc: "Détecte si la personne veut aider, tromper ou faire pression — et vous avertit."
    },
    {
      title: "Fonctionne sans Internet",
      desc: "Pas besoin de Wi-Fi ni de données mobiles. L'assistant est toujours disponible — même en forêt ou dans le métro."
    },
    {
      title: "A Appris des Arnaques Réelles",
      desc: "Entraîné sur de vrais scénarios de fraude pour reconnaître les nouvelles astuces."
    }
  ],
  de: [
    {
      title: "Versteht die Absicht",
      desc: "Erkennt, ob der Anrufer helfen, täuschen oder unter Druck setzen möchte — und warnt Sie."
    },
    {
      title: "Funktioniert ohne Internet",
      desc: "Kein WLAN oder mobile Daten nötig. Der Helfer ist immer verfügbar — sogar im Wald oder in der U-Bahn."
    },
    {
      title: "Von Echten Betrugsfällen Gelernt",
      desc: "Mit echten Betrugsszenarien trainiert, um neue Tricks zu erkennen."
    }
  ],
  ja: [
    {
      title: "意図を理解",
      desc: "相手が助けたいのか、騙そうとしたりプレッシャーを与えようとしたりしているのかを検知し、警告します。"
    },
    {
      title: "インターネット不要",
      desc: "Wi-Fiやモバイルデータは不要。アシスタントは常に利用可能 — 森や地下鉄でも。"
    },
    {
      title: "実際の詐欺から学んだ",
      desc: "新しい手口を認識するため、実際の詐欺シナリオで訓練されています。"
    }
  ]
};

const FEATURE_ICONS = [
  <Cpu className="w-5 h-5 text-[#3B82F6]" />,
  <WifiOff className="w-5 h-5 text-[#3B82F6]" />,
  <HardDrive className="w-5 h-5 text-[#3B82F6]" />,
  <FileText className="w-5 h-5 text-[#3B82F6]" />,
  <Bot className="w-5 h-5 text-[#3B82F6]" />
];

const KiraAssistantSection = React.memo(function KiraAssistantSection() {
  const { t, language } = useTranslation();
  const { ecoMode } = useEcoMode();
  const { isSimple } = useDepth();

  const title = isSimple
    ? (SIMPLE_TITLE_BY_LANG[language] ?? TITLE_BY_LANG[language] ?? TITLE_BY_LANG.en)
    : (t.kira?.title || TITLE_BY_LANG[language] || TITLE_BY_LANG.en);
  const subtitle = isSimple
    ? (SIMPLE_SUBTITLE_BY_LANG[language] ?? SUBTITLE_BY_LANG[language] ?? SUBTITLE_BY_LANG.en)
    : (t.kira?.subtitle || SUBTITLE_BY_LANG[language] || SUBTITLE_BY_LANG.en);
  const badgeText = t.kira?.badge || BADGE_BY_LANG[language] || BADGE_BY_LANG.en;

  const baseFeatures = (t.kira && t.kira.features && t.kira.features.length ? t.kira.features : (FEATURES_BY_LANG[language] || FEATURES_BY_LANG.en)) || [];
  const currentFeatures = isSimple
    ? (SIMPLE_FEATURES_BY_LANG[language] ?? SIMPLE_FEATURES_BY_LANG.en ?? baseFeatures)
    : baseFeatures;
  const featuresList = currentFeatures.map((feat: any, index: number) => ({
    icon: FEATURE_ICONS[index] || FEATURE_ICONS[0],
    title: feat.title,
    desc: feat.desc,
  }));

  return (
    <section 
      className="relative w-full py-16 sm:py-20 px-4 bg-[#0A0A0B]" 
      id="kira-assistant"
    >
      {/* Background */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#3B82F6]/20 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.03)_0%,rgba(0,0,0,0)_70%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
          <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
            <SectionBadge variant="brackets" label={badgeText} />
            <div className="inline-flex items-center gap-1.5 font-mono text-[10px] sm:text-xs font-bold tracking-wider text-amber-500 uppercase">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              <span>
                {KIRA_STATUS_BY_LANG[language] || KIRA_STATUS_BY_LANG.en}
              </span>
            </div>
          </div>
          
          <h2 className="font-display font-medium text-3xl sm:text-5xl text-[#F5F5F0] tracking-tighter mb-6">
            {title}
          </h2>
          
          <p className="font-sans text-sm sm:text-base text-gray-400 max-w-xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Split block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-5xl mx-auto">
          
          {/* Visual: voice console */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl border border-white/[0.06] bg-[#0E0F12] overflow-hidden p-8 min-h-[320px] flex flex-col items-center justify-center">
              <div className="absolute top-4 left-4 font-mono text-[9px] text-amber-500 tracking-wider uppercase flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                TRUSTNODE ASSISTANT // ON-DEVICE
              </div>

              {/* Rings */}
              <div className="relative w-44 h-44 flex items-center justify-center">
                {!ecoMode && (
                  <>
                    <motion.div
                      className="absolute w-28 h-28 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/25"
                      animate={{ scale: [0.7, 1.15], opacity: [0.7, 0] }}
                      transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut", delay: 0 }}
                    />
                    <motion.div
                      className="absolute w-28 h-28 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/25"
                      animate={{ scale: [0.7, 1.15], opacity: [0.6, 0] }}
                      transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut", delay: 0.8 }}
                    />
                    <motion.div
                      className="absolute w-28 h-28 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/25"
                      animate={{ scale: [0.7, 1.15], opacity: [0.5, 0] }}
                      transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut", delay: 1.6 }}
                    />
                  </>
                )}
                <div className={`absolute w-16 h-16 rounded-full bg-[#3B82F6]/20 border border-[#3B82F6]/30 ${ecoMode ? "" : "animate-pulse"}`} />
                <div className="w-14 h-14 rounded-full bg-[#3B82F6] flex items-center justify-center shadow-glow-lg">
                  <Mic className="w-6 h-6 text-white" />
                </div>
              </div>

              {/* Equalizer */}
              <div className="flex items-center justify-center gap-1.5 mt-8 h-8">
                {EQ_BASE.map((height, idx) => {
                  const props = {
                    key: idx,
                    className: "w-[2px] bg-[#3B82F6]/60 rounded-full",
                  };
                  if (ecoMode) {
                    return <div {...props} style={{ height: `${height}px` }} />;
                  }
                  return (
                    <motion.div
                      {...props}
                      animate={{ height: [6, height, 6] }}
                      transition={{
                        duration: 0.9 + (idx % 5) * 0.18,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: idx * 0.09,
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          {/* Details list */}
          <div className="lg:col-span-7 space-y-6">
            {featuresList.map((feat, index) => (
              <ScanCard
                key={index}
                padding="p-4"
                className="flex-row items-start gap-4"
                cardClassName="hover:border-[#3B82F6]/30"
              >
                <div className="w-10 h-10 rounded-xl bg-[#12141A]/50 border border-[#3B82F6]/15 flex items-center justify-center shrink-0 group-hover:border-[#3B82F6]/40 transition duration-300">
                  {feat.icon}
                </div>
                <div>
                  <h4 className="font-display font-medium text-base text-[#F5F5F0] mb-1 group-hover:text-[#3B82F6] transition duration-300">
                    {feat.title}
                  </h4>
                  <p className="font-sans text-xs sm:text-sm text-gray-400 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              </ScanCard>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
});

export default KiraAssistantSection;
