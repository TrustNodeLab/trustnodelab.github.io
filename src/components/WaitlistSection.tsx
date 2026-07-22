import React, { useState } from "react";
import { Send, Video, Users, Gem, ArrowUpRight, Cpu, Clipboard, CheckCircle, ShieldAlert, Sparkles } from "lucide-react";
import { useTranslation } from "../i18n/LanguageContext";
import { LanguageCode } from "../i18n/languages";
import { motion, AnimatePresence } from "motion/react";

const SOCIAL_META = [
  {
    id: "telegram",
    icon: <Send className="w-6 h-6 text-sky-400 group-hover:scale-110 transition-transform" />,
    url: "https://t.me/TrustNode_team?direct",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  },
  {
    id: "vk",
    icon: <Users className="w-6 h-6 text-blue-400 group-hover:scale-110 transition-transform" />,
    url: "https://vk.com/trustnode",
    badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  },
  {
    id: "tiktok",
    icon: <Video className="w-6 h-6 text-rose-400 group-hover:scale-110 transition-transform" />,
    url: "https://www.tiktok.com/@trusrnode?_r=1&_t=ZS-97fr5YVyPCs",
    badgeColor: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  },
];

// Multilingual labels for the interactive license console
const CONSOLE_TEXT: Record<LanguageCode, Record<string, string>> = {
  ru: {
    title: "Консоль предварительной генерации купола",
    subtitle: "Сформируйте локальный цифровой отпечаток для вашей персональной сборки",
    inputLabel: "Ваш Telegram @username или E-mail",
    inputPlaceholder: "Например: @ivan_crypto или mail@example.com",
    osLabel: "Мобильная платформа",
    cpuLabel: "Микроархитектура ЦП",
    btnSubmit: "Инициировать генерацию ключей",
    btnGenerating: "Генерация локального купола...",
    copyBtn: "Копировать ID билета",
    copied: "Скопировано в буфер обмена!",
    ticketTitle: "ЛИЦЕНЗИОННЫЙ БИЛЕТ СФОРМИРОВАН",
    ticketLabel: "СКОПИРУЙТЕ ЭТОТ ID И ОТПРАВЬТЕ ЕГО НАМ В TELEGRAM / VK ДЛЯ МОМЕНТАЛЬНОГО ПОДКЛЮЧЕНИЯ ВНЕ ОЧЕРЕДИ",
    envAnalysis: "АНАЛИЗ ОКРУЖЕНИЯ УСТРОЙСТВА И СОЗДАНИЕ ВАЛЮТЫ БЕЗОПАСНОСТИ",
    errContactRequired: "Пожалуйста, укажите ваши контактные данные"
  },
  en: {
    title: "Dome Pre-Generation Console",
    subtitle: "Formulate a local digital fingerprint for your customized build",
    inputLabel: "Your Telegram @username or E-mail",
    inputPlaceholder: "E.g., @jack_crypto or email@domain.com",
    osLabel: "Mobile OS Platform",
    cpuLabel: "CPU Microarchitecture",
    btnSubmit: "Initiate Key Generation",
    btnGenerating: "Generating Local Dome Keys...",
    copyBtn: "Copy Ticket ID",
    copied: "Copied to clipboard!",
    ticketTitle: "LICENSE TICKET CONFIGURED",
    ticketLabel: "COPY THIS TICKET ID AND SEND IT TO US IN TELEGRAM / VK FOR INSTANT PRIORITY VERIFICATION",
    envAnalysis: "ANALYZING DEVICE ENVIRONMENT & ALLOCATING MEMORY ENVELOPE",
    errContactRequired: "Please provide your contact handle"
  },
  es: {
    title: "Consola de Pre-Generación del Domo",
    subtitle: "Formule una huella digital local para su compilación personalizada",
    inputLabel: "Su Telegram @usuario o Correo electrónico",
    inputPlaceholder: "Ej: @pedro_crypto o correo@dominio.com",
    osLabel: "Plataforma Móvil",
    cpuLabel: "Microarquitectura de CPU",
    btnSubmit: "Iniciar Generación de Claves",
    btnGenerating: "Generando Claves de Seguridad...",
    copyBtn: "Copiar ID de Boleto",
    copied: "¡Copiado al portapapeles!",
    ticketTitle: "BOLETO DE LICENCIA CONFIGURADO",
    ticketLabel: "COPIE ESTE ID Y ENVÍELO A TELEGRAM / VK PARA UNA VERIFICACIÓN PRIORITARIA INSTANTÁNEA",
    envAnalysis: "ANALIZANDO EL ENTORNO DEL DISPOSITIVO Y RESERVANDO MEMORIA SECTOR",
    errContactRequired: "Por favor, proporcione su contacto"
  },
  zh: {
    title: "安全防护盾预生成终端",
    subtitle: "为您的专属定制版本生成本地设备数字指纹",
    inputLabel: "您的 Telegram 用户名 (@) 或 电子邮箱",
    inputPlaceholder: "例如：@blockchain_expert 或 user@example.com",
    osLabel: "移动操作系统平台",
    cpuLabel: "处理器微架构",
    btnSubmit: "开始生成本地私钥对",
    btnGenerating: "正在隔离运行内存生成防护罩...",
    copyBtn: "复制许可证 ID 兑换券",
    copied: "已复制到剪贴板！",
    ticketTitle: "专用许可证兑换券生成成功",
    ticketLabel: "请复制下方许可证 ID，并通过 Telegram 或 VK 发送给官方客服，即可享受免排队快速人工通道激活",
    envAnalysis: "正在分析移动设备底层芯片兼容性并生成高强度 AES 加密封包",
    errContactRequired: "请填写您的联系方式"
  },
  hi: {
    title: "सुरक्षा डोम प्री-जनरेशन कंसोल",
    subtitle: "अपने कस्टम निर्माण के लिए स्थानीय डिजिटल फिंगरप्रिंट तैयार करें",
    inputLabel: "आपका टेलीग्राम @username या ई-मेल",
    inputPlaceholder: "जैसे: @rahul_crypto या email@domain.com",
    osLabel: "मोबाइल ओएस प्लेटफॉर्म",
    cpuLabel: "सीपीयू माइक्रोआर्किटेक्चर",
    btnSubmit: "कुंजी जनरेशन शुरू करें",
    btnGenerating: "सुरक्षित डोम उत्पन्न किया जा रहा है...",
    copyBtn: "टिकट आईडी कॉपी करें",
    copied: "क्लिपबोर्ड पर कॉपी किया गया!",
    ticketTitle: "लाइसेंस टिकट कॉन्फ़िगर हो गया",
    ticketLabel: "इस टिकट आईडी को कॉपी करें और तुरंत प्राथमिकता सत्यापन के लिए हमें टेलीग्राम / वीके पर भेजें",
    envAnalysis: "डिवाइस वातावरण का विश्लेषण और मेमोरी लिफाफा आवंटन जारी",
    errContactRequired: "कृपया अपना संपर्क हैंडल प्रदान करें"
  },
  ar: {
    title: "لوحة ما قبل التوليد لقبة الحماية",
    subtitle: "قم بصياغة بصمة رقمية محلية لإصدارك المخصص",
    inputLabel: "حساب تيليجرام الخاص بك أو البريد الإلكتروني",
    inputPlaceholder: "مثال: @ahmed_crypto أو email@domain.com",
    osLabel: "منصة نظام تشغيل الجوال",
    cpuLabel: "بنية المعالج الدقيقة",
    btnSubmit: "بدء توليد المفاتيح الأمنية",
    btnGenerating: "جاري إنشاء قبة الحماية المحلية...",
    copyBtn: "نسخ معرف التذكرة",
    copied: "تم النسخ إلى الحافظة!",
    ticketTitle: "تم إعداد تذكرة الترخيص",
    ticketLabel: "انسخ معرف التذكرة هذا وأرسله إلينا على تيليجرام / VK للحصول على تفعيل فوري وذو أولوية",
    envAnalysis: "جاري تحليل بيئة الجهاز وتخصيص مساحة الذاكرة الآمنة",
    errContactRequired: "يرجى تقديم وسيلة الاتصال الخاصة بك"
  },
  pt: {
    title: "Console de Pré-Geração do Domo",
    subtitle: "Formule uma assinatura digital local para sua compilação personalizada",
    inputLabel: "Seu Telegram @usuario ou E-mail",
    inputPlaceholder: "Ex: @lucas_crypto ou email@dominio.com",
    osLabel: "Plataforma Móvel OS",
    cpuLabel: "Microarquitetura de CPU",
    btnSubmit: "Iniciar Geração de Chaves",
    btnGenerating: "Gerando Chaves do Domo...",
    copyBtn: "Copiar ID do Ticket",
    copied: "Copiado para a área de transferência!",
    ticketTitle: "TICKET DE LICENÇA CONFIGURADO",
    ticketLabel: "COPIE ESTE ID DO TICKET E ENVIE PARA NÓS NO TELEGRAM / VK PARA ATIVAÇÃO COM PRIORIDADE MÁXIMA",
    envAnalysis: "ANALISANDO O AMBIENTE DO DISPOSITIVO E ALOCANDO MEMÓRIA SECURE RAM",
    errContactRequired: "Por favor, informe suas informações de contato"
  },
  fr: {
    title: "Console de Pré-Génération du Dôme",
    subtitle: "Formulez une empreinte numérique locale pour votre build sur-mesure",
    inputLabel: "Votre Telegram @nom_utilisateur ou E-mail",
    inputPlaceholder: "Ex : @jean_crypto ou email@domaine.com",
    osLabel: "Plateforme Mobile",
    cpuLabel: "Microarchitecture du Processeur",
    btnSubmit: "Lancer la Génération de Clés",
    btnGenerating: "Génération du dôme de sécurité...",
    copyBtn: "Copier l'ID du Ticket",
    copied: "Copié dans le presse-papiers !",
    ticketTitle: "TICKET DE LICENCE CONFIGURÉ",
    ticketLabel: "COPIEZ CET ID DE TICKET ET ENVOYEZ-LE NOUS SUR TELEGRAM / VK POUR UNE ACTIVATION PRIORITAIRE SANS ATTENTE",
    envAnalysis: "ANALYSE DE L'ENVIRONNEMENT DE L'APPAREIL ET ALLOCATION DE LA CAPSULE DE SÉCURITÉ",
    errContactRequired: "Veuillez fournir un moyen de contact valide"
  },
  de: {
    title: "Dome-Vorgenerierungskonsole",
    subtitle: "Formulieren Sie einen lokalen digitalen Fingerabdruck für Ihren maßgeschneiderten Build",
    inputLabel: "Ihr Telegram @benutzername oder E-Mail",
    inputPlaceholder: "Z.B. @max_crypto oder email@domain.com",
    osLabel: "Mobile Betriebssystem-Plattform",
    cpuLabel: "CPU-Mikroarchitektur",
    btnSubmit: "Schlüsselgenerierung initiieren",
    btnGenerating: "Generiere Sicherheits-Schutzkuppel...",
    copyBtn: "Ticket-ID kopieren",
    copied: "In die Zwischenablage kopiert!",
    ticketTitle: "LIZENZ-TICKET KONFIGURIERT",
    ticketLabel: "KOPIEREN SIE DIESE TICKET-ID UND SENDEN SIE SIE UNS AUF TELEGRAM / VK FÜR EINE SOFORTIGE PRIORISIERTE FREISCHALTUNG",
    envAnalysis: "GERÄTEUMGEBUNG WIRD ANALYSIERT UND SICHERER SPEICHERUMSCHLAG ZUGEWIESEN",
    errContactRequired: "Bitte geben Sie einen Kontaktnamen an"
  },
  ja: {
    title: "セキュリティドーム事前生成コンソール",
    subtitle: "パーソナライズされたビルドを作成するためのデバイス固有のデジタルフットプリントを生成します",
    inputLabel: "お客様の Telegram @ユーザー名、または Eメール",
    inputPlaceholder: "例: @taro_crypto、または email@domain.com",
    osLabel: "モバイルOSプラットフォーム",
    cpuLabel: "CPUマイクロアーキテクチャ",
    btnSubmit: "ライセンス鍵の生成を開始",
    btnGenerating: "ローカルセキュリティドームをRAM上に生成中...",
    copyBtn: "チケットIDをコピー",
    copied: "クリップボードにコピーしました！",
    ticketTitle: "ライセンスチケットの設定が完了しました",
    ticketLabel: "このチケットIDをコピーし、TelegramまたはVKの公式チャットに送信してください。優先レーンにて即座にインストール鍵を発行いたします。",
    envAnalysis: "デバイスの動作環境をエミュレートし、高強度なハードウェア暗号エンベロープをバインド中",
    errContactRequired: "ご連絡先の入力をお願いいたします"
  },
  tr: {
    title: "Kubbe Ön-Üretim Konsolu",
    subtitle: "Özel derlemeniz için yerel dijital parmak izi oluşturun",
    inputLabel: "Telegram @kullanıcıadınız veya E-postanız",
    inputPlaceholder: "Örn: @can_crypto veya eposta@domain.com",
    osLabel: "Mobil Platform OS",
    cpuLabel: "İşlemci Mikro Mimarisi",
    btnSubmit: "Anahtar Üretimini Başlat",
    btnGenerating: "Yerel Kubbe Anahtarları Üretiliyor...",
    copyBtn: "Bilet ID'sini Kopyala",
    copied: "Panoya kopyalandı!",
    ticketTitle: "LİSANS BİLETİ YAPILANDIRILDI",
    ticketLabel: "ANINDA ÖNCELİKLİ DOĞRULAMA İÇİN BU BİLET ID'SİNİ KOPYALAYIP TELEGRAM / VK ÜZERİNDEN BİZE GÖNDERİN",
    envAnalysis: "CİHAZ ORTAMI ANALİZ EDİLİYOR & BELLEK ALANI TAHSİS EDİLİYOR",
    errContactRequired: "Lütfen iletişim bilginizi belirtin"
  }
};

interface Tier {
  id: "free" | "standard" | "vip";
  name: string;
  price: string;
  badge: string;
  desc: string;
  features: string[];
}

const TIERS_DICT: Record<LanguageCode, Tier[]> = {
  ru: [
    {
      id: "free",
      name: "Free (Базовый)",
      price: "0₽ / мес",
      badge: "БАЗОВЫЙ КУПОЛ",
      desc: "Первичный спам-фильтр и локальные эвристики входящих потоков.",
      features: [
        "Signature Heuristics Layer",
        "Работа полностью offline",
        "Регулярные обновления баз",
        "Блокировка известных URL"
      ]
    },
    {
      id: "standard",
      name: "Standard (Рекомендуемый)",
      price: "299₽ / мес",
      badge: "ИНТЕЛЛЕКТУАЛЬНЫЙ КУПОЛ",
      desc: "On-Device ИИ нового поколения с семантическим ИБ-фильтром.",
      features: [
        "Все функции тарифа Free",
        "ML-модель rubert-tiny2",
        "Детекция социнженерии в мессенджерах",
        "RASP-мониторинг и защита RAM"
      ]
    },
    {
      id: "vip",
      name: "Pro VIP (Семейный)",
      price: "599₽ / мес",
      badge: "СЕМЕЙНЫЙ КУПОЛ + VK BEACON",
      desc: "Абсолютная защита пожилых родственников и доверенный консенсус.",
      features: [
        "Все функции тарифа Standard",
        "Семейная Parent-Child защита",
        "Beacon-оповещения контактов через VK",
        "Персональные VIP-сборки под ЦП"
      ]
    }
  ],
  en: [
    {
      id: "free",
      name: "Free (Basic)",
      price: "0₽ / mo",
      badge: "BASIC DOME",
      desc: "Primary spam filter and local heuristics for incoming streams.",
      features: [
        "Signature Heuristics Layer",
        "100% offline local processing",
        "Regular signature updates",
        "Known malicious URL blocks"
      ]
    },
    {
      id: "standard",
      name: "Standard (Recommended)",
      price: "299₽ / mo",
      badge: "INTELLIGENT DOME",
      desc: "On-Device AI of the next generation with semantic security filter.",
      features: [
        "All Free tier features",
        "rubert-tiny2 ML-model (28.4MB)",
        "Real-time social eng. detection",
        "Aegis RASP memory monitoring"
      ]
    },
    {
      id: "vip",
      name: "Pro VIP (Family Defense)",
      price: "599₽ / mo",
      badge: "FAMILY DOME + VK BEACON",
      desc: "Complete protection for family members with secure consensus routing.",
      features: [
        "All Standard tier features",
        "Parent-Child Guardian defense",
        "Instant VK Beacon contact notifications",
        "Priority support & specialized CPU builds"
      ]
    }
  ],
  es: [
    {
      id: "free",
      name: "Free (Básico)",
      price: "0₽ / mes",
      badge: "CÚPULA BÁSICA",
      desc: "Filtro de spam primario y heurística local para flujos entrantes.",
      features: [
        "Capa heurística de firma",
        "Procesamiento local 100% offline",
        "Actualizaciones regulares de firmas",
        "Bloqueo de URLs maliciosas conocidas"
      ]
    },
    {
      id: "standard",
      name: "Standard (Recomendado)",
      price: "299₽ / mes",
      badge: "CÚPULA INTELIGENTE",
      desc: "IA en el dispositivo de próxima generación con filtro de seguridad semántico.",
      features: [
        "Todas las funciones de la tarifa Free",
        "Modelo ML rubert-tiny2 (28.4MB)",
        "Detección de ing. social en tiempo real",
        "Monitoreo de memoria Aegis RASP"
      ]
    },
    {
      id: "vip",
      name: "Pro VIP (Defensa Familiar)",
      price: "599₽ / mes",
      badge: "CÚPULA FAMILIAR + FARO VK",
      desc: "Protección completa para miembros de la familia con enrutamiento de consenso seguro.",
      features: [
        "Todas las funciones de la tarifa Standard",
        "Defensa guardián Padre-Hijo",
        "Notificaciones de contacto de faro VK instantáneas",
        "Soporte de prioridad y compilaciones de CPU especiales"
      ]
    }
  ],
  zh: [
    {
      id: "free",
      name: "免费（基础版）",
      price: "0₽ / 局",
      badge: "基础防护盾",
      desc: "针对输入流的初步垃圾信息过滤和本地启发式检测。",
      features: [
        "特征启发式图层",
        "100% 离线本地处理",
        "定期特征库更新",
        "已知恶意 URL 拦截"
      ]
    },
    {
      id: "standard",
      name: "标准版（推荐）",
      price: "299₽ / 局",
      badge: "智能防护盾",
      desc: "配备语义安全过滤器的下一代端侧人工智能。",
      features: [
        "包含免费版所有功能",
        "rubert-tiny2 轻量模型 (28.4MB)",
        "实时社交工程欺诈检测",
        "Aegis RASP 内存运行时保护"
      ]
    },
    {
      id: "vip",
      name: "Pro VIP（家庭守护）",
      price: "599₽ / 局",
      badge: "家庭防护盾 + VK 信标",
      desc: "通过安全共识路由为家庭成员提供全方位绝对守护。",
      features: [
        "包含标准版所有功能",
        "家长-子女守护者防御",
        "即时 VK 信标联系人警报",
        "专属 VIP 芯片特别优化构建"
      ]
    }
  ],
  tr: [
    {
      id: "free",
      name: "Free (Temel)",
      price: "0₽ / ay",
      badge: "TEMEL KUBBE",
      desc: "Gelen akışlar için birincil spam filtresi ve yerel buluşsal yöntemler.",
      features: [
        "İmza Sezgisel Katmanı",
        "%100 çevrimdışı yerel işleme",
        "Düzenli imza güncellemeleri",
        "Bilinen kötü amaçlı URL engelleme"
      ]
    },
    {
      id: "standard",
      name: "Standard (Önerilen)",
      price: "299₽ / ay",
      badge: "AKILLI KUBBE",
      desc: "Anlamsal güvenlik filtreli yeni nesil Cihaz İçi Yapay Zeka.",
      features: [
        "Tüm Free tarifesi özellikleri",
        "rubert-tiny2 ML modeli (28.4MB)",
        "Gerçek zamanlı sosyal müh. tespiti",
        "Aegis RASP bellek izleme"
      ]
    },
    {
      id: "vip",
      name: "Pro VIP (Aile Koruması)",
      price: "599₽ / ay",
      badge: "AİLE KUBBESİ + VK FARI",
      desc: "Güvenli konsensüs yönlendirmesi ile aile üyeleri için tam koruma.",
      features: [
        "Tüm Standard tarifesi özellikleri",
        "Ebeveyn-Çocuk Koruyucu savunması",
        "Anında VK Farı iletişim bildirimleri",
        "Öncelikli destek ve özel CPU sürümleri"
      ]
    }
  ],
  hi: [
    {
      id: "free",
      name: "फ्री (बुनियादी)",
      price: "0₽ / माह",
      badge: "बुनियादी डोम",
      desc: "आने वाले प्रवाह के लिए प्राथमिक स्पैम फ़िल्टर और स्थानीय अनुमान।",
      features: [
        "सिग्नेचर हेुरिस्टिक्स लेयर",
        "100% ऑफ़लाइन स्थानीय प्रसंस्करण",
        "नियमित सिग्नेचर अपडेट",
        "ज्ञात दुर्भावनापूर्ण URL ब्लॉक"
      ]
    },
    {
      id: "standard",
      name: "स्टैंडर्ड (अनुशंसित)",
      price: "299₽ / माह",
      badge: "इंटेलिजेंट डोम",
      desc: "सिमेंटिक सुरक्षा फ़िल्टर के साथ अगली पीढ़ी का ऑन-डिवाइस एआई।",
      features: [
        "सभी फ्री टैरिफ सुविधाएं",
        "rubert-tiny2 एमएल मॉडल (28.4MB)",
        "वास्तविक समय सामाजिक इंजी. जांच",
        "एजिस RASP मेमोरी निगरानी"
      ]
    },
    {
      id: "vip",
      name: "प्रो VIP (पारिवारिक सुरक्षा)",
      price: "599₽ / माह",
      badge: "पारिवारिक डोम + VK बीकन",
      desc: "सुरक्षित सर्वसम्मति रूटिंग के साथ परिवार के सदस्यों के लिए पूर्ण सुरक्षा।",
      features: [
        "सभी स्टैंडर्ड टैरिफ सुविधाएं",
        "अभिभावक-बच्चा संरक्षक रक्षा",
        "तत्काल VK बीकन संपर्क सूचनाएं",
        "प्राथमिकता सहायता और विशेष सीपीयू निर्माण"
      ]
    }
  ],
  ar: [
    {
      id: "free",
      name: "مجاني (أساسي)",
      price: "0₽ / شهرياً",
      badge: "قبة أساسية",
      desc: "تصفية البريد العشوائي الأساسية والاستدلالات المحلية للتدفقات الواردة.",
      features: [
        "طبقة الاستدلال على التوقيع",
        "معالجة محلية أوفلاين 100%",
        "تحديثات دورية للتوقيعات",
        "حظر عناوين URL الضارة المعروفة"
      ]
    },
    {
      id: "standard",
      name: "قياسي (موصى به)",
      price: "299₽ / شهرياً",
      badge: "قبة ذكية",
      desc: "ذكاء اصطناعي على الجهاز من الجيل القادم مع مرشح أمان دلالي.",
      features: [
        "جميع ميزات الباقة المجانية",
        "نموذج ML rubert-tiny2 (28.4MB)",
        "كشف الهندسة الاجتماعية في الوقت الفعلي",
        "مراقبة ذاكرة Aegis RASP"
      ]
    },
    {
      id: "vip",
      name: "بريميوم VIP (حماية العائلة)",
      price: "599₽ / شهرياً",
      badge: "قبة عائلية + منارة VK",
      desc: "حماية كاملة لأفراد العائلة مع توجيه إجماع آمن.",
      features: [
        "جميع ميزات الباقة القياسية",
        "دفاع حارس الوالدين والطفل",
        "إشعارات اتصال منارة VK الفورية",
        "الدعم ذو الأولوية وإصدارات المعالجة الخاصة"
      ]
    }
  ],
  pt: [
    {
      id: "free",
      name: "Grátis (Básico)",
      price: "0₽ / mês",
      badge: "DOMO BÁSICO",
      desc: "Filtro de spam primário e heurísticas locais para fluxos de entrada.",
      features: [
        "Camada Heurística de Assinatura",
        "Processamento local 100% offline",
        "Atualizações regulares de assinaturas",
        "Bloqueio de URLs maliciosas conhecidas"
      ]
    },
    {
      id: "standard",
      name: "Standard (Recomendado)",
      price: "299₽ / mês",
      badge: "DOMO INTELIGENTE",
      desc: "IA no dispositivo de última geração com filtro de segurança semântico.",
      features: [
        "Todas as funções da tarifa Free",
        "Modelo ML rubert-tiny2 (28.4MB)",
        "Detecção de eng. social em tempo real",
        "Monitoramento de memória Aegis RASP"
      ]
    },
    {
      id: "vip",
      name: "Pro VIP (Defesa Familiar)",
      price: "599₽ / mês",
      badge: "DOMO FAMILIAR + SINAL VK",
      desc: "Proteção completa para membros da família com roteamento de consenso seguro.",
      features: [
        "Todas as funções da tarifa Standard",
        "Defesa guardiã Pai-Filho",
        "Notificações de contato VK instantâneas",
        "Suporte prioritário e compilações de CPU especiais"
      ]
    }
  ],
  fr: [
    {
      id: "free",
      name: "Gratuit (Basique)",
      price: "0₽ / mois",
      badge: "DÔME DE BASE",
      desc: "Filtre anti-spam primaire et heuristique locale pour les flux entrants.",
      features: [
        "Heuristique basée sur la signature",
        "Traitement local 100% hors ligne",
        "Mises à jour régulières des signatures",
        "Blocage d'URLs malveillantes connues"
      ]
    },
    {
      id: "standard",
      name: "Standard (Recommandé)",
      price: "299₽ / mois",
      badge: "DÔME INTELLIGENT",
      desc: "IA locale de nouvelle génération avec filtre de sécurité sémantique.",
      features: [
        "Toutes les fonctions du tarif Gratuit",
        "Modèle ML rubert-tiny2 (28.4Mo)",
        "Détection d'ingénierie sociale en temps réel",
        "Surveillance mémoire Aegis RASP"
      ]
    },
    {
      id: "vip",
      name: "Pro VIP (Défense Famille)",
      price: "599₽ / mois",
      badge: "DÔME FAMILIAL + BALISE VK",
      desc: "Protection complète pour les membres de la famille avec routage consensus sécurisé.",
      features: [
        "Toutes les fonctions du tarif Standard",
        "Défense tuteur Parent-Enfant",
        "Notifications de contact balise VK instantanées",
        "Support prioritaire & versions CPU dédiées"
      ]
    }
  ],
  de: [
    {
      id: "free",
      name: "Kostenlos (Basis)",
      price: "0₽ / Monat",
      badge: "BASIS-KUPPEL",
      desc: "Primärer Spam-Filter und lokale Heuristiken für eingehende Streams.",
      features: [
        "Signatur-Heuristik-Ebene",
        "100% Offline-Verarbeitung vor Ort",
        "Regelmäßige Signatur-Updates",
        "Blockierung bekannter bösartiger URLs"
      ]
    },
    {
      id: "standard",
      name: "Standard (Empfohlen)",
      price: "299₽ / Monat",
      badge: "INTELLIGENTE KUPPEL",
      desc: "On-Device KI der nächsten Generation mit semantischem Sicherheitsfilter.",
      features: [
        "Alle Funktionen des kostenlosen Tarifs",
        "rubert-tiny2 ML-Modell (28,4 MB)",
        "Echtzeit-Erkennung von Social Engineering",
        "Aegis RASP Speicherüberwachung"
      ]
    },
    {
      id: "vip",
      name: "Pro VIP (Familienschutz)",
      price: "599₽ / Monat",
      badge: "FAMILIEN-KUPPEL + VK-BAKE",
      desc: "Vollständiger Schutz für Familienmitglieder mit sicherem Konsens-Routing.",
      features: [
        "Alle Standard-Tariffunktionen",
        "Eltern-Kind-Wächter-Verتهيئة",
        "Sofortige VK-Baken-Kontaktbenachrichtigungen",
        "Priorisierter Support & spezielle CPU-Builds"
      ]
    }
  ],
  ja: [
    {
      id: "free",
      name: "無料（基本プラン）",
      price: "0₽ / 月",
      badge: "ベーシックドーム",
      desc: "受信ストリームに対する一次スパムフィルターおよびローカルヒューリスティック解析。",
      features: [
        "シグネチャヒューリスティック層",
        "100%完全オフライン端末内処理",
        "シグネチャデータベースの定期更新",
        "既知の悪質なURLブロック"
      ]
    },
    {
      id: "standard",
      name: "標準（おすすめ）",
      price: "299₽ / 月",
      badge: "インテリジェントドーム",
      desc: "セマンティックセキュリティフィルターを搭載した、次世代のオンデバイスAI。",
      features: [
        "無料プランのすべての機能",
        "rubert-tiny2 MLモデル (28.4MB)",
        "リアルタイムでのソーシャルエンジニアリング検知",
        "Aegis RASP 実行時メモリ監視"
      ]
    },
    {
      id: "vip",
      name: "Pro VIP（ファミリー保護）",
      price: "599₽ / 月",
      badge: "ファミリードーム ＋ VK信標",
      desc: "安全な合意ルーティングにより、ご家族全員を強力に保護。",
      features: [
        "標準プランのすべての機能",
        "親から子を見守るガーディアン機能",
        "VK信標を通じた緊急連絡先への即時通知",
        "優先サポート＆特定CPU向けビルド"
      ]
    }
  ]
};

const SELECT_BTN_DICT: Record<LanguageCode, string> = {
  ru: "Выбрать тариф",
  en: "Select Tier",
  es: "Seleccionar Tarifa",
  zh: "选择套餐",
  tr: "Tarifeyi Seç",
  hi: "टैरिफ चुनें",
  ar: "اختر الباقة",
  pt: "Selecionar Tarifa",
  fr: "Choisir ce Tarif",
  de: "Tarif Auswählen",
  ja: "プランを選択"
};

const SECTION_TEXT: Record<LanguageCode, { badge: string; titleLine1: string; titleHighlight: string; subtitle: string; }> = {
  ru: {
    badge: "ПРИВАТНЫЙ СПИСОК ОЖИДАНИЯ",
    titleLine1: "Присоединиться к",
    titleHighlight: "бета-тестированию",
    subtitle: "Сформируйте ваш персональный локальный отпечаток и получите уникальный лицензионный билет для подключения вне очереди."
  },
  en: {
    badge: "PRIVATE WAITLIST // BETA",
    titleLine1: "Join the Private",
    titleHighlight: "Beta Testing",
    subtitle: "Generate your personal local fingerprint and obtain a unique license ticket for instant priority connection."
  },
  es: {
    badge: "LISTA DE ESPERA PRIVADA // BETA",
    titleLine1: "Únase a la prueba",
    titleHighlight: "Beta Privada",
    subtitle: "Genere su huella digital local personal y obtenga un boleto de licencia único para una conexión prioritaria instantánea."
  },
  zh: {
    badge: "私有等待队列 // 测试版",
    titleLine1: "加入私有内测",
    titleHighlight: "计划团队",
    subtitle: "生成您的个人本地设备指纹，并获取唯一的许可证兑换券以享受即时优先接入。"
  },
  tr: {
    badge: "ÖZEL BEKLEME LİSTESİ // BETA",
    titleLine1: "Özel Beta",
    titleHighlight: "Testine Katılın",
    subtitle: "Kendi yerel parmak izinizi oluşturun ve öncelikli anında bağlantı için benzersiz bir lisans bileti alın."
  },
  hi: {
    badge: "प्राइवेट प्रतीक्षा सूची // बीटा",
    titleLine1: "प्राइवेट बीटा",
    titleHighlight: "परीक्षण में शामिल हों",
    subtitle: "अपना व्यक्तिगत स्थानीय फ़िंगरप्रिंट जनरेट करें और तत्काल प्राथमिकता कनेक्शन के लिए एक अद्वितीय लाइसेंस टिकट प्राप्त करें।"
  },
  ar: {
    badge: "قائمة الانتظار الخاصة // التجريبية",
    titleLine1: "الانضمام إلى الاختبار",
    titleHighlight: "التجريبي الخاص",
    subtitle: "قم بتوليد بصمتك المحلية الفريدة واحصل على تذكرة ترخيص مميزة لتوصيل جهازك بشكل فوري."
  },
  pt: {
    badge: "LISTA DE ESPERA PRIVADA // BETA",
    titleLine1: "Participe do teste",
    titleHighlight: "Beta Privado",
    subtitle: "Gere sua assinatura digital local pessoal e obtenha um ticket de licença exclusivo para conexão prioritária instantânea."
  },
  fr: {
    badge: "LISTE D'ATTENTE PRIVÉE // BÊTA",
    titleLine1: "Rejoignez le test",
    titleHighlight: "Bêta Privé",
    subtitle: "Générez votre empreinte locale personnelle et obtenez un ticket de licence unique pour une connexion prioritaire instantanée."
  },
  de: {
    badge: "PRIVATE WARTELISTE // BETA",
    titleLine1: "Treten Sie dem",
    titleHighlight: "Beta-Test bei",
    subtitle: "Generieren Sie Ihren persönlichen lokalen Fingerabdruck und erhalten Sie ein einzigartiges Lizenz-Ticket für sofortigen prioritären Anschluss."
  },
  ja: {
    badge: "プライベート待機リスト // ベータ",
    titleLine1: "プライベートベータ",
    titleHighlight: "テストに参加する",
    subtitle: "デバイス固有のローカルフィンガープリントを生成し、優先的に接続するための特別なライセンスチケットを発行します。"
  }
};

const WaitlistSection = React.memo(function WaitlistSection() {
  const { t, language } = useTranslation();
  const ct = t.waitlist.console;
  const sect = SECTION_TEXT[language] || SECTION_TEXT.en;
  const BACK_BY_LANG: Record<LanguageCode, string> = {
    ru: "Назад", en: "Back", es: "Volver", zh: "返回", tr: "Geri", hi: "वापस", ar: "رجوع", pt: "Voltar", fr: "Retour", de: "Zurück", ja: "戻る"
  };
  
  const socials = t.waitlist.socials.map((s, i) => ({
    ...SOCIAL_META[i],
    name: s.name,
    desc: s.desc,
    badge: s.badge,
    actionText: s.action,
  }));

  // Form states
  const [selectedTier, setSelectedTier] = useState<"free" | "standard" | "vip">("standard");
  const [contactInfo, setContactInfo] = useState("");
  const [os, setOs] = useState("Android");
  const [cpu, setCpu] = useState("Snapdragon / Tensor (NPU)");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stepLog, setStepLog] = useState<string[]>([]);
  const [ticketId, setTicketId] = useState("");
  const [copied, setCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [pdConsent, setPdConsent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactInfo.trim()) {
      setErrorMessage(ct.errContactRequired);
      return;
    }
    if (!pdConsent) {
      const consentErr = language === "ru" ? "Необходимо дать согласие на обработку персональных данных" : "You must consent to personal data processing";
      setErrorMessage(consentErr);
      return;
    }
    setErrorMessage("");
    setIsSubmitting(true);
    setStepLog([]);

    // Custom logs delay simulation
    const logs = [
      "[SYS] Querying main TrustNode cluster...",
      "[SYS] Binding unique CPU ID...",
      "[SYS] Allocating isolated RAM sandbox boundaries...",
      `[SYS] Configuring local dome for ${selectedTier.toUpperCase()} protection...`,
      "[SYS] Encrypting license payload envelope (AES-GCM-256)...",
      "[SYS] Persisting registration token to TrustNode central database...",
      "[SYS] Secure database handshake completed! Ready to sign."
    ];

    fetch("/api/waitlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contactInfo: contactInfo.trim(),
        tier: selectedTier,
        os: os,
        cpu: cpu
      })
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to save to database");
        }
        return res.json();
      })
      .then((data) => {
        if (data.error) {
          setErrorMessage(data.error);
          setIsSubmitting(false);
          return;
        }

        let logIdx = 0;
        const interval = setInterval(() => {
          if (logIdx < logs.length) {
            setStepLog(prev => [...prev, logs[logIdx]]);
            logIdx++;
          } else {
            clearInterval(interval);
            setTicketId(data.token);
            setIsSubmitting(false);
          }
        }, 400);
      })
      .catch((err) => {
        console.error("Database save error:", err);
        setErrorMessage(language === "ru" ? "Ошибка подключения к базе данных" : "Database connection error");
        setIsSubmitting(false);
      });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(ticketId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const particles = Array.from({ length: 15 });

  return (
    <section 
      className="relative w-full py-24 sm:py-36 px-4 border-t border-[#1F2937]/30 bg-[#070709] overflow-hidden" 
      id="waitlist"
    >
      {/* Background tech grids / orbits */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(46,125,255,0.06)_0%,rgba(0,0,0,0)_70%)] pointer-events-none animate-pulse duration-5000" />
      
      {/* Animated geometric nodes */}
      <div className="absolute left-[10%] top-[30%] w-1.5 h-1.5 rounded-full bg-[#2E7DFF]/40 animate-ping pointer-events-none" />
      <div className="absolute right-[15%] bottom-[25%] w-2 h-2 rounded-full bg-[#2E7DFF]/20 animate-pulse pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Decorative Badge */}
        <div className="text-center flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0A162C]/80 border border-[#2E7DFF]/30 shadow-[0_0_15px_rgba(46,125,255,0.1)]">
            <Gem className="w-4 h-4 text-[#2E7DFF]" />
            <span className="font-mono text-[10px] sm:text-xs font-semibold tracking-wider text-[#2E7DFF] uppercase">
              {sect.badge}
            </span>
          </div>
        </div>

        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-display font-bold text-4xl sm:text-6xl text-[#F5F5F0] tracking-tight mb-6 leading-tight">
            {sect.titleLine1} <br />
            <span className="text-[#2E7DFF]">{sect.titleHighlight}</span>
          </h2>

          <p className="font-sans text-sm sm:text-base text-gray-400 leading-relaxed">
            {sect.subtitle}
          </p>
        </div>

        {/* HIGH-TECH INTERACTIVE LICENSE TICKET CONSOLE */}
        <div className="max-w-xl mx-auto mb-20 relative">
          
          <AnimatePresence mode="wait">
            {!ticketId ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                className="p-6 sm:p-8 rounded-3xl border border-white/[0.05] bg-[#0C0D11] relative overflow-hidden shadow-2xl text-left"
              >
                {/* Neon decorative mesh backing */}
                <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#2E7DFF]/40 to-transparent" />
                <div className="absolute -inset-10 bg-[radial-gradient(circle_at_center,rgba(46,125,255,0.03)_0%,transparent_70%)] pointer-events-none" />

                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[#111622] border border-[#2E7DFF]/20 flex items-center justify-center">
                    <Cpu className="w-5 h-5 text-[#2E7DFF]" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base text-[#F5F5F0]">{ct.title}</h3>
                    <p className="font-sans text-[11px] text-gray-500">{ct.subtitle}</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Contact input */}
                  <div>
                    <label className="block font-mono text-[10px] text-gray-400 uppercase tracking-wider mb-1.5 font-bold">
                      {ct.inputLabel}
                    </label>
                    <input 
                      type="text" 
                      value={contactInfo}
                      onChange={(e) => setContactInfo(e.target.value)}
                      placeholder={ct.inputPlaceholder}
                      disabled={isSubmitting}
                      className="w-full bg-[#030406] border border-white/[0.06] focus:border-[#2E7DFF]/60 rounded-xl px-4 py-3 text-xs sm:text-sm text-[#F5F5F0] placeholder-gray-600 focus:outline-none transition-all duration-300 font-mono"
                    />
                    {errorMessage && (
                      <p className="text-[#EF4444] font-mono text-[10px] mt-1.5 flex items-center gap-1">
                        <ShieldAlert className="w-3 h-3" /> {errorMessage}
                      </p>
                    )}
                  </div>

                  {/* Level of protection selector inside the form console */}
                  <div>
                    <label className="block font-mono text-[10px] text-gray-400 uppercase tracking-wider mb-1.5 font-bold">
                      {language === "ru" ? "Желаемый уровень защиты" : "Desired Protection Level"}
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: "free", label: "Free" },
                        { id: "standard", label: "Standard" },
                        { id: "vip", label: "Pro VIP" }
                      ].map((lvl) => {
                        const isLvlSelected = selectedTier === lvl.id;
                        return (
                          <button
                            key={lvl.id}
                            type="button"
                            onClick={() => setSelectedTier(lvl.id as any)}
                            className={`py-2 px-3 rounded-xl border text-center font-sans text-xs font-bold transition-all ${
                              isLvlSelected
                                ? "bg-[#2E7DFF]/20 border-[#2E7DFF] text-white shadow-[0_0_15px_rgba(46,125,255,0.1)]"
                                : "bg-[#030406] border-white/[0.05] text-gray-400 hover:border-white/[0.15] hover:text-gray-300"
                            }`}
                          >
                            {lvl.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Environment details Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-[10px] text-gray-400 uppercase tracking-wider mb-1.5 font-bold">
                        {ct.osLabel}
                      </label>
                      <select 
                        value={os}
                        onChange={(e) => setOs(e.target.value)}
                        disabled={isSubmitting}
                        className="w-full bg-[#030406] border border-white/[0.06] focus:border-[#2E7DFF]/60 rounded-xl px-3 py-2.5 text-xs text-gray-300 focus:outline-none cursor-pointer font-sans"
                      >
                        <option value="Android">Android (rubert-tiny2)</option>
                        <option value="iOS">Apple iOS (ONNX Port)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] text-gray-400 uppercase tracking-wider mb-1.5 font-bold">
                        {ct.cpuLabel}
                      </label>
                      <select 
                        value={cpu}
                        onChange={(e) => setCpu(e.target.value)}
                        disabled={isSubmitting}
                        className="w-full bg-[#030406] border border-white/[0.06] focus:border-[#2E7DFF]/60 rounded-xl px-3 py-2.5 text-xs text-gray-300 focus:outline-none cursor-pointer font-sans"
                      >
                        <option value="Snapdragon NPU">Snapdragon (NPU Core)</option>
                        <option value="Apple Neural">Apple Silicon (ANE)</option>
                        <option value="MediaTek CPU">MediaTek APU (Local)</option>
                      </select>
                    </div>
                  </div>

                  {/* Submission logs display when submitting */}
                  {isSubmitting && (
                    <div className="bg-[#030406] border border-white/[0.04] p-3 rounded-xl font-mono text-[9px] text-[#2E7DFF] space-y-1">
                      <div className="flex items-center gap-2 mb-1.5 border-b border-white/[0.04] pb-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2E7DFF] animate-ping" />
                        <span className="font-bold uppercase tracking-wider">{ct.envAnalysis}</span>
                      </div>
                      {stepLog.map((log, idx) => (
                        <div key={idx} className="opacity-80">{log}</div>
                      ))}
                    </div>
                  )}

                  {/* Согласие на обработку ПД (ФЗ-152) */}
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div className="relative flex items-center justify-center mt-0.5 select-none shrink-0">
                      <input
                        type="checkbox"
                        checked={pdConsent}
                        onChange={(e) => setPdConsent(e.target.checked)}
                        className="sr-only"
                      />
                      <div className={`w-4 h-4 rounded border transition-all duration-300 flex items-center justify-center ${
                        pdConsent
                          ? "bg-[#2E7DFF] border-[#2E7DFF] shadow-[0_0_8px_rgba(46,125,255,0.3)]"
                          : "border-white/[0.12] bg-[#030304] group-hover:border-[#2E7DFF]/50"
                      }`}>
                        {pdConsent && <CheckCircle className="w-3 h-3 text-white" />}
                      </div>
                    </div>
                    <span className="font-sans text-[10px] text-gray-500 select-none group-hover:text-gray-400 transition-colors leading-relaxed">
                      {language === "ru"
                        ? "Я даю согласие на обработку моих персональных данных в соответствии с "
                        : "I consent to the processing of my personal data in accordance with the "}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          if (typeof window !== "undefined") {
                            window.dispatchEvent(new CustomEvent("open-privacy-modal"));
                          }
                        }}
                        className="text-[#2E7DFF] hover:underline"
                      >
                        {language === "ru" ? "Политикой конфиденциальности" : "Privacy Policy"}
                      </button>
                    </span>
                  </label>

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 px-4 rounded-xl font-sans text-xs font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                      isSubmitting
                        ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                        : "bg-[#2E7DFF] text-white hover:bg-[#2E7DFF]/90 cursor-pointer shadow-[0_0_15px_rgba(46,125,255,0.15)] hover:shadow-[0_0_20px_rgba(46,125,255,0.35)]"
                    }`}
                  >
                    {isSubmitting ? ct.btnGenerating : ct.btnSubmit}
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="ticket"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                className="p-6 sm:p-8 rounded-3xl border border-[#2E7DFF]/45 bg-[#0A111F]/90 text-center relative overflow-hidden shadow-2xl"
              >
                {/* Floating confetti-like particles for completion */}
                {particles.map((_, idx) => {
                  const angle = (idx / particles.length) * 360;
                  const radius = 50 + Math.random() * 80;
                  const x = Math.cos((angle * Math.PI) / 180) * radius;
                  const y = Math.sin((angle * Math.PI) / 180) * radius;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
                      animate={{ opacity: 0, scale: [0, 1.2, 0], x, y }}
                      transition={{ duration: 1.5, delay: 0.05, ease: "easeOut" }}
                      className="absolute w-2 h-2 rounded-full bg-[#2E7DFF] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none"
                    />
                  );
                })}

                <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#2E7DFF] to-transparent" />
                <div className="absolute -inset-10 bg-[radial-gradient(circle_at_center,rgba(46,125,255,0.08)_0%,transparent_70%)] pointer-events-none" />

                <div className="flex flex-col items-center justify-center relative z-10">
                  <div className="w-14 h-14 rounded-full bg-[#101F3B] border border-[#2E7DFF]/40 flex items-center justify-center mb-5 shadow-[0_0_20px_rgba(46,125,255,0.3)]">
                    <CheckCircle className="w-8 h-8 text-emerald-400 animate-pulse" />
                  </div>

                  <span className="font-mono text-[9px] text-[#2E7DFF] uppercase tracking-[0.2em] font-bold block mb-1">
                    {ct.ticketTitle}
                  </span>
                  <div className="text-xs text-[#2E7DFF] font-mono mb-2 uppercase tracking-wider font-semibold">
                    [{selectedTier} DOME ACTIVATION]
                  </div>
                  <h4 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight mb-4">
                    {ticketId}
                  </h4>

                  <p className="font-sans text-[11px] sm:text-xs text-gray-300 leading-relaxed max-w-md mx-auto mb-6">
                    {ct.ticketLabel}
                  </p>

                  <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
                    <button
                      onClick={handleCopy}
                      className="w-full sm:flex-1 py-3 px-4 rounded-xl font-sans text-xs font-bold bg-[#111A2E] border border-[#2E7DFF]/40 text-gray-200 hover:text-white hover:bg-[#15233D] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {copied ? <Sparkles className="w-4 h-4 text-emerald-400" /> : <Clipboard className="w-4 h-4" />}
                      {copied ? ct.copied : ct.copyBtn}
                    </button>
                    <button
                      onClick={() => setTicketId("")}
                      className="w-full sm:w-auto py-3 px-5 rounded-xl font-sans text-xs font-bold bg-transparent border border-white/[0.05] text-gray-500 hover:text-gray-300 transition-colors cursor-pointer"
                    >
                      {BACK_BY_LANG[language] || "Back"}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* Dynamic Social Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 sm:mb-24">
          {socials.map((social) => (
            <a
              key={social.id}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col justify-between p-6 sm:p-8 rounded-2xl border border-[#1F2937]/40 bg-[#0F0F12]/80 hover:bg-[#111C2E]/60 hover:border-[#2E7DFF]/55 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(46,125,255,0.08)] cursor-pointer text-left overflow-hidden"
            >
              {/* Top ambient hover gradient */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_top_right,rgba(46,125,255,0.15)_0%,rgba(0,0,0,0)_70%)] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-[#111827] border border-[#1F2937] flex items-center justify-center shadow-inner">
                    {social.icon}
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[9px] font-mono font-medium border ${social.badgeColor}`}>
                    {social.badge}
                  </span>
                </div>

                <h3 className="font-display font-bold text-lg sm:text-xl text-[#F5F5F0] mb-3 group-hover:text-[#2E7DFF] transition-colors">
                  {social.name}
                </h3>

                <p className="font-sans text-xs sm:text-sm text-gray-400 leading-relaxed mb-6">
                  {social.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-[#1F2937]/30 flex items-center justify-between mt-auto">
                <span className="font-mono text-xs font-semibold text-[#2E7DFF]">
                  {social.actionText}
                </span>
                <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-[#2E7DFF] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </div>
            </a>
          ))}
        </div>

        {/* Security disclaimer */}
        <div className="text-center">
          <p className="font-mono text-[10px] tracking-widest text-gray-600 mb-2 uppercase">
            {t.waitlist.disclaimer1}
          </p>
          <p className="font-mono text-[9px] text-gray-700 uppercase">
            {t.waitlist.disclaimer2}
          </p>
        </div>

      </div>
    </section>
  );
});

export default WaitlistSection;
