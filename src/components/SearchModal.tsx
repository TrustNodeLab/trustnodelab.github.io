import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, X, ArrowRight } from "lucide-react";
import { useTranslation } from "../i18n/LanguageContext";
import { useEcoMode } from "../context/EcoModeContext";
import { useNavigation } from "../navigation/NavigationContext";
import type { PageId } from "../navigation/NavigationContext";
import type { LanguageCode } from "../i18n/languages";

/* ============================================================================
   SearchModal — клиентский поиск по сайту (Ctrl+K / Cmd+K).
   Статический индекс страниц; фильтрация по ключевым словам текущего языка.
   ========================================================================== */

interface SearchEntry {
  slug: string;
  title: Record<string, string>;
  keywords: Record<string, string[]>;
}

/**
 * Статический индекс страниц.
 * slug — строковый ключ (совпадает с URL-пути).
 * title — заголовок для отображения на каждом языке.
 * keywords — массив ключевых слов для поиска на каждом языке.
 */
const SEARCH_INDEX: SearchEntry[] = [
  {
    slug: "how-it-works",
    title: {
      ru: "Как это работает",
      en: "How It Works",
      tr: "Nasıl Çalışır",
      es: "Cómo Funciona",
      zh: "工作原理",
      hi: "यह कैसे काम करता है",
      ar: "كيف يعمل",
      pt: "Como Funciona",
      fr: "Comment ça Marche",
      de: "So Funktioniert es",
      ja: "仕組み",
    },
    keywords: {
      ru: ["как это работает", "семь слоёв", "архитектура", "обработка", "pipeline", "слои", " на устройстве"],
      en: ["how it works", "seven layers", "architecture", "processing", "pipeline", "on-device"],
      tr: ["nasıl çalışır", "yedi katman", "mimari", "işlem", "pipeline", "cihaz üzerinde"],
      es: ["cómo funciona", "siete capas", "arquitectura", "procesamiento", "pipeline", "en el dispositivo"],
      zh: ["工作原理", "七层", "架构", "处理", "管线", "设备上"],
      hi: ["यह कैसे काम करता है", "सात परतें", "वास्तुकला", "प्रसंस्करण", "पाइपलाइन", "डिवाइस पर"],
      ar: ["كيف يعمل", "سبع طبقات", "هندسة معمارية", "معالجة", "خط أنابيب", "على الجهاز"],
      pt: ["como funciona", "sete camadas", "arquitetura", "processamento", "pipeline", "no dispositivo"],
      fr: ["comment ça marche", "sept couches", "architecture", "traitement", "pipeline", "sur l'appareil"],
      de: ["so funktioniert es", "sieben schichten", "architektur", "verarbeitung", "pipeline", "auf gerät"],
      ja: ["仕組み", "7層", "アーキテクチャ", "処理", "パイプライン", "デバイス上"],
    },
  },
  {
    slug: "tech",
    title: {
      ru: "Технологии",
      en: "Technology",
      tr: "Teknoloji",
      es: "Tecnología",
      zh: "技术",
      hi: "तकनीक",
      ar: "التكنولوجيا",
      pt: "Tecnologia",
      fr: "Technologie",
      de: "Technologie",
      ja: "技術",
    },
    keywords: {
      ru: ["технологии", "модель", "onnx", "rubert", "нейросеть", "ml", "machine learning", "искусственный интеллект", "ai"],
      en: ["technology", "model", "onnx", "rubert", "neural network", "ml", "machine learning", "artificial intelligence", "ai"],
      tr: ["teknoloji", "model", "onnx", "rubert", "sinir ağı", "ml", "makine öğrenimi", "yapay zeka"],
      es: ["tecnología", "modelo", "onnx", "rubert", "red neuronal", "ml", "aprendizaje automático", "inteligencia artificial"],
      zh: ["技术", "模型", "onnx", "rubert", "神经网络", "机器学习", "人工智能"],
      hi: ["तकनीक", "मॉडल", "onnx", "rubert", "न्यूरल नेटवर्क", "मशीन लर्निंग", "कृत्रिम बुद्धिमत्ता"],
      ar: ["تكنولوجيا", "نموذج", "onnx", "rubert", "شبكة عصبية", "تعلم آلي", "ذكاء اصطناعي"],
      pt: ["tecnologia", "modelo", "onnx", "rubert", "rede neural", "ml", "aprendizado de máquina", "inteligência artificial"],
      fr: ["technologie", "modèle", "onnx", "rubert", "réseau neuronal", "ml", "apprentissage automatique", "intelligence artificielle"],
      de: ["technologie", "modell", "onnx", "rubert", "neuronales netz", "ml", "maschinelles lernen", "künstliche intelligenz"],
      ja: ["技術", "モデル", "onnx", "rubert", "ニューラルネットワーク", "機械学習", "人工知能"],
    },
  },
  {
    slug: "features",
    title: {
      ru: "Возможности",
      en: "Features",
      tr: "Özellikler",
      es: "Características",
      zh: "功能",
      hi: "विशेषताएँ",
      ar: "الميزات",
      pt: "Recursos",
      fr: "Fonctionnalités",
      de: "Funktionen",
      ja: "機能",
    },
    keywords: {
      ru: ["возможности", "функции", "блокировка", "защита", "звонки", "спам", "фишинг", "рассылка"],
      en: ["features", "functions", "blocking", "protection", "calls", "spam", "phishing", "scam"],
      tr: ["özellikler", "fonksiyonlar", "engelleme", "koruma", "aramalar", "spam", "phishing", "dolandırıcılık"],
      es: ["características", "funciones", "bloqueo", "protección", "llamadas", "spam", "phishing", "estafa"],
      zh: ["功能", "特性", "拦截", "保护", "电话", "垃圾信息", "钓鱼", "诈骗"],
      hi: ["विशेषताएँ", "फ़ंक्शन", "ब्लॉकिंग", "सुरक्षा", "कॉल", "स्पैम", "फ़िशिंग", "धोखाधड़ी"],
      ar: ["ميزات", "وظائف", "حماية", "حماية", "مكالمات", "رسائل غير مرغوب", "تصيد", "احتيال"],
      pt: ["recursos", "funções", "bloqueio", "proteção", "chamadas", "spam", "phishing", "golpe"],
      fr: ["fonctionnalités", "fonctions", "blocage", "protection", "appels", "spam", "phishing", "arnaque"],
      de: ["funktionen", "blockierung", "schutz", "anrufe", "spam", "phishing", "betrug"],
      ja: ["機能", "特徴", "ブロック", "保護", "通話", "スパム", "フィッシング", "詐欺"],
    },
  },
  {
    slug: "research",
    title: {
      ru: "Исследования",
      en: "Research",
      tr: "Araştırma",
      es: "Investigación",
      zh: "研究",
      hi: "अनुसंधान",
      ar: "الأبحاث",
      pt: "Pesquisa",
      fr: "Recherche",
      de: "Forschung",
      ja: "研究",
    },
    keywords: {
      ru: ["исследования", "наука", "исследование", "результаты", "оценка модели", "benchmark"],
      en: ["research", "science", "study", "results", "model evaluation", "benchmark"],
      tr: ["araştırma", "bilim", "çalışma", "sonuçlar", "model değerlendirmesi", "benchmark"],
      es: ["investigación", "ciencia", "estudio", "resultados", "evaluación del modelo", "benchmark"],
      zh: ["研究", "科学", "研究", "结果", "模型评估", "基准测试"],
      hi: ["अनुसंधान", "विज्ञान", "अध्ययन", "परिणाम", "मॉडल मूल्यांकन", "बेंचमार्क"],
      ar: ["أبحاث", "علم", "دراسة", "نتائج", "تقييم النموذج", "معيار"],
      pt: ["pesquisa", "ciência", "estudo", "resultados", "avaliação do modelo", "benchmark"],
      fr: ["recherche", "science", "étude", "résultats", "évaluation du modèle", "benchmark"],
      de: ["forschung", "wissenschaft", "studie", "ergebnisse", "modellbewertung", "benchmark"],
      ja: ["研究", "科学", "研究", "結果", "モデル評価", "ベンチマーク"],
    },
  },
  {
    slug: "comparison",
    title: {
      ru: "Сравнение",
      en: "Comparison",
      tr: "Karşılaştırma",
      es: "Comparación",
      zh: "对比",
      hi: "तुलना",
      ar: "مقارنة",
      pt: "Comparação",
      fr: "Comparaison",
      de: "Vergleich",
      ja: "比較",
    },
    keywords: {
      ru: ["сравнение", "сравнить", "аналоги", "отличия", "конкуренты", "преимущества"],
      en: ["comparison", "compare", "alternatives", "differences", "competitors", "advantages"],
      tr: ["karşılaştırma", "karşılaştır", "alternatifler", "farklar", "rakipler", "avantajlar"],
      es: ["comparación", "comparar", "alternativas", "diferencias", "competidores", "ventajas"],
      zh: ["对比", "比较", "替代品", "差异", "竞争对手", "优势"],
      hi: ["तुलना", "तुलना करें", "विकल्प", "अंतर", "प्रतिस्पर्धी", "लाभ"],
      ar: ["مقارنة", "قارن", "بدائل", "اختلافات", "منافسون", "مزايا"],
      pt: ["comparação", "comparar", "alternativas", "diferenças", "concorrentes", "vantagens"],
      fr: ["comparaison", "comparer", "alternatives", "différences", "concurrents", "avantages"],
      de: ["vergleich", "vergleichen", "alternativen", "unterschiede", "konkurrenten", "vorteile"],
      ja: ["比較", "比較する", "代替品", "違い", "競合", "利点"],
    },
  },
  {
    slug: "download",
    title: {
      ru: "Скачать",
      en: "Download",
      tr: "İndir",
      es: "Descargar",
      zh: "下载",
      hi: "डाउनलोड",
      ar: "تحميل",
      pt: "Baixar",
      fr: "Télécharger",
      de: "Herunterladen",
      ja: "ダウンロード",
    },
    keywords: {
      ru: ["скачать", "установить", "загрузить", "apk", "android", "приложение", "google play", "rustore"],
      en: ["download", "install", "apk", "android", "app", "google play", "rustore"],
      tr: ["indir", "yükle", "apk", "android", "uygulama", "google play", "rustore"],
      es: ["descargar", "instalar", "apk", "android", "aplicación", "google play", "rustore"],
      zh: ["下载", "安装", "apk", "android", "应用", "google play", "rustore"],
      hi: ["डाउनलोड", "इंस्टॉल", "apk", "android", "ऐप", "google play", "rustore"],
      ar: ["تحميل", "تثبيت", "apk", "android", "تطبيق", "google play", "rustore"],
      pt: ["baixar", "instalar", "apk", "android", "aplicativo", "google play", "rustore"],
      fr: ["télécharger", "installer", "apk", "android", "application", "google play", "rustore"],
      de: ["herunterladen", "installieren", "apk", "android", "app", "google play", "rustore"],
      ja: ["ダウンロード", "インストール", "apk", "android", "アプリ", "google play", "rustore"],
    },
  },
  {
    slug: "roadmap",
    title: {
      ru: "Карта разработки",
      en: "Roadmap",
      tr: "Yol Haritası",
      es: "Hoja de Ruta",
      zh: "路线图",
      hi: "रोडमैप",
      ar: "خارطة الطريق",
      pt: "Roteiro",
      fr: "Feuille de Route",
      de: "Fahrplan",
      ja: "ロードマップ",
    },
    keywords: {
      ru: ["карта разработки", "роадмап", "план", "дата выпуска", "обновления", "бета", "релиз"],
      en: ["roadmap", "plan", "release date", "updates", "beta", "release"],
      tr: ["yol haritası", "plan", "çıkış tarihi", "güncellemeler", "beta", "yayın"],
      es: ["hoja de ruta", "plan", "fecha de lanzamiento", "actualizaciones", "beta", "lanzamiento"],
      zh: ["路线图", "计划", "发布日期", "更新", "测试版", "发布"],
      hi: ["रोडमैप", "योजना", "रिलीज़ की तारीख", "अपडेट", "बीटा", "रिलीज़"],
      ar: ["خارطة الطريق", "خطة", "تاريخ الإصدار", "تحديثات", "إصدار تجريبي", "إصدار"],
      pt: ["roteiro", "plano", "data de lançamento", "atualizações", "beta", "lançamento"],
      fr: ["feuille de route", "plan", "date de sortie", "mises à jour", "bêta", "sortie"],
      de: ["fahrplan", "plan", "veröffentlichungsdatum", "updates", "beta", "veröffentlichung"],
      ja: ["ロードマップ", "計画", "リリース日", "アップデート", "ベータ", "リリース"],
    },
  },
  {
    slug: "glossary",
    title: {
      ru: "Глоссарий",
      en: "Glossary",
      tr: "Sözlük",
      es: "Glosario",
      zh: "词汇表",
      hi: "शब्दकोश",
      ar: "مصطلحات",
      pt: "Glossário",
      fr: "Glossaire",
      de: "Glossar",
      ja: "用語集",
    },
    keywords: {
      ru: ["глоссарий", "термины", "определения", "словарь", "что такое", "расшифровка"],
      en: ["glossary", "terms", "definitions", "dictionary", "what is", "meaning"],
      tr: ["sözlük", "terimler", "tanımlar", "sözlük", "nedir", "anlam"],
      es: ["glosario", "términos", "definiciones", "diccionario", "qué es", "significado"],
      zh: ["词汇表", "术语", "定义", "词典", "什么是", "含义"],
      hi: ["शब्दकोश", "शब्द", "परिभाषाएँ", "शब्दकोश", "क्या है", "अर्थ"],
      ar: ["مصطلحات", "شروط", "تعريفات", "قاموس", "ما هو", "معنى"],
      pt: ["glossário", "termos", "definições", "dicionário", "o que é", "significado"],
      fr: ["glossaire", "termes", "définitions", "dictionnaire", "c'est quoi", "signification"],
      de: ["glossar", "begriffe", "definitionen", "wörterbuch", "was ist", "bedeutung"],
      ja: ["用語集", "用語", "定義", "辞書", "とは", "意味"],
    },
  },
  {
    slug: "test",
    title: {
      ru: "Проверь себя",
      en: "Spot the Scam",
      tr: "Aldatmacayı Yakala",
      es: "Detecta la Estafa",
      zh: "识破骗局",
      hi: "धोखा पहचानें",
      ar: "اكتشف الاحتيال",
      pt: "Detecte a Golpe",
      fr: "Repérez l'Arnaque",
      de: "Trick Erkennen",
      ja: "詐欺を見抜く",
    },
    keywords: {
      ru: ["проверь себя", "тест", "квиз", "самопроверка", "мошенничество", "тест на фишинг", "как распознать"],
      en: ["spot the scam", "test", "quiz", "self-test", "fraud", "phishing test", "how to recognize"],
      tr: ["aldatmacayı yakala", "test", "quiz", "kendini test et", "dolandırıcılık", "phishing testi", "nasıl tanınır"],
      es: ["detecta la estafa", "test", "cuestionario", "autoevaluación", "fraude", "test de phishing", "cómo reconocer"],
      zh: ["识破骗局", "测试", "测验", "自测", "诈骗", "钓鱼测试", "如何识别"],
      hi: ["धोखा पहचानें", "परीक्षा", "प्रश्नोत्तरी", "स्व-परीक्षा", "धोखाधड़ी", "फ़िशिंग टेस्ट", "कैसे पहचानें"],
      ar: ["اكتشف الاحتيال", "اختبار", "اختبار", "اختبار ذاتي", "احتيال", "اختبار التصيد", "كيف تتعرف"],
      pt: ["detecte o golpe", "teste", "quiz", "autoavaliação", "fraude", "teste de phishing", "como reconhecer"],
      fr: ["repérez l'arnaque", "test", "quiz", "auto-évaluation", "fraude", "test phishing", "comment reconnaître"],
      de: ["trick erkennen", "test", "quiz", "selbsttest", "betrug", "phishing-test", "wie erkennen"],
      ja: ["詐欺を見抜く", "テスト", "クイズ", "セルフテスト", "詐欺", "フィッシングテスト", "見抜き方"],
    },
  },
  {
    slug: "help",
    title: {
      ru: "Что делать, если обманули",
      en: "What to Do If Scammed",
      tr: "Dolandırılırsan Ne Yapmalısın",
      es: "Qué Hacer Si Te Estafaron",
      zh: "被骗了怎么办",
      hi: "धोखा लगे तो क्या करें",
      ar: "ماذا تفعل إذا تم خداعك",
      pt: "O Que Fazer Se Golpeado",
      fr: "Que Faire en Cas d'Arnaque",
      de: "Was Tun Bei Betrug",
      ja: "騙された場合の対処法",
    },
    keywords: {
      ru: ["что делать", "обманули", "мошенники", "заблокировать карту", "полиция", "жалоба", "пошаговая инструкция", "помощь"],
      en: ["what to do", "scammed", "fraudsters", "block card", "police", "complaint", "step by step", "help"],
      tr: ["ne yapmalı", "dolandırıldı", "dolandırıcılar", "kartı bloke", "polis", "şikayet", "adım adım", "yardım"],
      es: ["qué hacer", "estafado", "estafadores", "bloquear tarjeta", "policía", "queja", "paso a paso", "ayuda"],
      zh: ["怎么办", "被骗", "诈骗犯", "冻结银行卡", "报警", "投诉", "一步步", "帮助"],
      hi: ["क्या करें", "धोखा", "ठग", "कार्ड ब्लॉक", "पुलिस", "शिकायत", "चरण दर चरण", "सहायता"],
      ar: ["ماذا تفعل", "خداع", "محتالين", "حظر البطاقة", "شرطة", "شكوى", "خطوة بخطوة", "مساعدة"],
      pt: ["o que fazer", "golpeado", "golpistas", "bloquear cartão", "polícia", "reclamação", "passo a passo", "ajuda"],
      fr: ["que faire", "arnaque", "arnaqueurs", "bloquer carte", "police", "plainte", "étape par étape", "aide"],
      de: ["was tun", "betrug", "betrüger", "karte sperren", "polizei", "beschwerde", "schritt für schritt", "hilfe"],
      ja: ["どうする", "詐欺", "詐欺師", "カード停止", "警察", "苦情", "ステップ", "ヘルプ"],
    },
  },
  {
    slug: "news",
    title: {
      ru: "Новости",
      en: "News",
      tr: "Haberler",
      es: "Noticias",
      zh: "新闻",
      hi: "समाचार",
      ar: "أخبار",
      pt: "Notícias",
      fr: "Actualités",
      de: "Nachrichten",
      ja: "ニュース",
    },
    keywords: {
      ru: ["новости", "обновления", "анонсы", "telegram", "vk", "сообщения"],
      en: ["news", "updates", "announcements", "telegram", "vk", "posts"],
      tr: ["haberler", "güncellemeler", "duyurular", "telegram", "vk", "gönderiler"],
      es: ["noticias", "actualizaciones", "anuncios", "telegram", "vk", "publicaciones"],
      zh: ["新闻", "更新", "公告", "telegram", "vk", "帖子"],
      hi: ["समाचार", "अपडेट", "घोषणाएँ", "telegram", "vk", "पोस्ट"],
      ar: ["أخبار", "تحديثات", "إعلانات", "telegram", "vk", "منشورات"],
      pt: ["notícias", "atualizações", "anúncios", "telegram", "vk", "publicações"],
      fr: ["actualités", "mises à jour", "annonces", "telegram", "vk", "publications"],
      de: ["nachrichten", "updates", "ankündigungen", "telegram", "vk", "beiträge"],
      ja: ["ニュース", "更新", "告知", "telegram", "vk", "投稿"],
    },
  },
  {
    slug: "privacy",
    title: {
      ru: "Политика конфиденциальности",
      en: "Privacy Policy",
      tr: "Gizlilik Politikası",
      es: "Política de Privacidad",
      zh: "隐私政策",
      hi: "गोपनीयता नीति",
      ar: "سياسة الخصوصية",
      pt: "Política de Privacidade",
      fr: "Politique de Confidentialité",
      de: "Datenschutzrichtlinie",
      ja: "プライバシーポリシー",
    },
    keywords: {
      ru: ["конфиденциальность", "приватность", "персональные данные", "152-фз", "gdpr", "данные", " privacy"],
      en: ["privacy", "confidentiality", "personal data", "152-fz", "gdpr", "data", "privacy policy"],
      tr: ["gizlilik", "kişisel veri", "152-fz", "gdpr", "veri", "gizlilik politikası"],
      es: ["privacidad", "datos personales", "152-fz", "gdpr", "datos", "política de privacidad"],
      zh: ["隐私", "个人数据", "152-fz", "gdpr", "数据", "隐私政策"],
      hi: ["गोपनीयता", "व्यक्तिगत डेटा", "152-fz", "gdpr", "डेटा", "गोपनीयता नीति"],
      ar: ["خصوصية", "بيانات شخصية", "152-fz", "gdpr", "بيانات", "سياسة الخصوصية"],
      pt: ["privacidade", "dados pessoais", "152-fz", "gdpr", "dados", "política de privacidade"],
      fr: ["confidentialité", "données personnelles", "152-fz", "gdpr", "données", "politique de confidentialité"],
      de: ["datenschutz", "personenbezogene daten", "152-fz", "gdpr", "daten", "datenschutzrichtlinie"],
      ja: ["プライバシー", "個人情報", "152-fz", "gdpr", "データ", "プライバシーポリシー"],
    },
  },
  {
    slug: "terms",
    title: {
      ru: "Пользовательское соглашение",
      en: "Terms of Service",
      tr: "Kullanım Koşulları",
      es: "Términos de Servicio",
      zh: "服务条款",
      hi: "सेवा की शर्तें",
      ar: "شروط الخدمة",
      pt: "Termos de Serviço",
      fr: "Conditions d'Utilisation",
      de: "Nutzungsbedingungen",
      ja: "利用規約",
    },
    keywords: {
      ru: ["пользовательское соглашение", "условия", "лицензия", "оговорки", "ограничения"],
      en: ["terms of service", "terms", "license", "disclaimers", "limitations"],
      tr: ["kullanım koşulları", "şartlar", "lisans", "sorumluluk reddi", "sınırlamalar"],
      es: ["términos de servicio", "términos", "licencia", "descargos", "limitaciones"],
      zh: ["服务条款", "条款", "许可", "免责声明", "限制"],
      hi: ["सेवा की शर्तें", "शर्तें", "लाइसेंस", "अस्वीकरण", "सीमाएँ"],
      ar: ["شروط الخدمة", "شروط", "ترخيص", "إخلاء مسؤولية", "قيود"],
      pt: ["termos de serviço", "termos", "licença", "isenções", "limitações"],
      fr: ["conditions d'utilisation", "conditions", "licence", "avertissements", "limitations"],
      de: ["nutzungsbedingungen", "bedingungen", "lizenz", "haftungsausschluss", "beschränkungen"],
      ja: ["利用規約", "条件", "ライセンス", "免責事項", "制限"],
    },
  },
  {
    slug: "about",
    title: {
      ru: "О проекте",
      en: "About Us",
      tr: "Hakkımızda",
      es: "Sobre Nosotros",
      zh: "关于我们",
      hi: "हमारे बारे में",
      ar: "من نحن",
      pt: "Sobre Nós",
      fr: "À Propos",
      de: "Über Uns",
      ja: "私たちについて",
    },
    keywords: {
      ru: ["о проекте", "команда", "история", "миссия", "trustnode", "разработчики"],
      en: ["about us", "team", "story", "mission", "trustnode", "developers"],
      tr: ["hakkımızda", "ekip", "hikaye", "misyon", "trustnode", "geliştiriciler"],
      es: ["sobre nosotros", "equipo", "historia", "misión", "trustnode", "desarrolladores"],
      zh: ["关于我们", "团队", "故事", "使命", "trustnode", "开发者"],
      hi: ["हमारे बारे में", "टीम", "कहानी", "मिशन", "trustnode", "डेवलपर"],
      ar: ["من نحن", "فريق", "قصة", "مهمة", "trustnode", "مطورون"],
      pt: ["sobre nós", "equipe", "história", "missão", "trustnode", "desenvolvedores"],
      fr: ["à propos", "équipe", "histoire", "mission", "trustnode", "développeurs"],
      de: ["über uns", "team", "geschichte", "mission", "trustnode", "entwickler"],
      ja: ["私たちについて", "チーム", "ストーリー", "ミッション", "trustnode", "開発者"],
    },
  },
  {
    slug: "privacy-architecture",
    title: {
      ru: "Архитектура приватности",
      en: "Privacy Architecture",
      tr: "Gizlilik Mimarisi",
      es: "Arquitectura de Privacidad",
      zh: "隐私架构",
      hi: "गोपनीयता वास्तुकला",
      ar: "هندسة الخصوصية",
      pt: "Arquitetura de Privacidade",
      fr: "Architecture de Confidentialité",
      de: "Datenschutzarchitektur",
      ja: "プライバシーアーキテクチャ",
    },
    keywords: {
      ru: ["архитектура приватности", "безопасность", "шифрование", "end-to-end", "encrypt", "хранилище"],
      en: ["privacy architecture", "security", "encryption", "end-to-end", "encrypt", "storage"],
      tr: ["gizlilik mimarisi", "güvenlik", "şifreleme", "uçtan uca", "şifrele", "depolama"],
      es: ["arquitectura de privacidad", "seguridad", "cifrado", "extremo a extremo", "cifrar", "almacenamiento"],
      zh: ["隐私架构", "安全", "加密", "端到端", "加密", "存储"],
      hi: ["गोपनीयता वास्तुकला", "सुरक्षा", "एन्क्रिप्शन", "एंड-टू-एंड", "एन्क्रिप्ट", "भंडारण"],
      ar: ["هندسة الخصوصية", "أمان", "تشفير", "من طرف إلى طرف", "تشفير", "تخزين"],
      pt: ["arquitetura de privacidade", "segurança", "criptografia", "ponto a ponto", "criptografar", "armazenamento"],
      fr: ["architecture de confidentialité", "sécurité", "chiffrement", "de bout en bout", "chiffrer", "stockage"],
      de: ["datenschutzarchitektur", "sicherheit", "verschlüsselung", "end-to-end", "verschlüsseln", "speicherung"],
      ja: ["プライバシーアーキテクチャ", "セキュリティ", "暗号化", "エンドツーエンド", "暗号化", "ストレージ"],
    },
  },
];

/* ---------- Mapping slug → PageId ---------- */

/**
 * Known PageId values wired in the NavigationContext type.
 */
const SLUG_TO_PAGE: Record<string, PageId> = {
  "how-it-works": "how-it-works",
  tech: "tech",
  about: "about",
  download: "download",
  comparison: "comparison",
  news: "news",
  roadmap: "roadmap",
  privacy: "privacy",
  terms: "terms",
  features: "features",
  research: "research",
  "privacy-architecture": "privacy-architecture",
  sections: "sections",
  glossary: "glossary",
  test: "test",
  help: "help",
};

/* ---------- Labels per language ---------- */

const LABELS: Record<string, { placeholder: string; noResults: string; footerHint: string; openHint: string }> = {
  ru: { placeholder: "Поиск по сайту\u2026", noResults: "Ничего не найдено", footerHint: "Esc \u2014 закрыть", openHint: "Ctrl+K \u2014 поиск" },
  en: { placeholder: "Search the site\u2026", noResults: "No results found", footerHint: "Esc \u2014 close", openHint: "Ctrl+K \u2014 search" },
  tr: { placeholder: "Sitede ara\u2026", noResults: "Sonuç bulunamadı", footerHint: "Esc \u2014 kapat", openHint: "Ctrl+K \u2014 ara" },
  es: { placeholder: "Buscar en el sitio\u2026", noResults: "Sin resultados", footerHint: "Esc \u2014 cerrar", openHint: "Ctrl+K \u2014 buscar" },
  zh: { placeholder: "搜索本站\u2026", noResults: "未找到结果", footerHint: "Esc \u2014 关闭", openHint: "Ctrl+K \u2014 搜索" },
  hi: { placeholder: "साइट पर खोजें\u2026", noResults: "कोई परिणाम नहीं", footerHint: "Esc \u2014 बंद करें", openHint: "Ctrl+K \u2014 खोज" },
  ar: { placeholder: "بحث في الموقع\u2026", noResults: "لا توجد نتائج", footerHint: "Esc \u2014 إغلاق", openHint: "Ctrl+K \u2014 بحث" },
  pt: { placeholder: "Pesquisar no site\u2026", noResults: "Sem resultados", footerHint: "Esc \u2014 fechar", openHint: "Ctrl+K \u2014 pesquisar" },
  fr: { placeholder: "Rechercher sur le site\u2026", noResults: "Aucun résultat", footerHint: "Esc \u2014 fermer", openHint: "Ctrl+K \u2014 rechercher" },
  de: { placeholder: "Auf der Seite suchen\u2026", noResults: "Keine Ergebnisse", footerHint: "Esc \u2014 schließen", openHint: "Ctrl+K \u2014 suchen" },
  ja: { placeholder: "サイト内検索\u2026", noResults: "結果なし", footerHint: "Esc \u2014 閉じる", openHint: "Ctrl+K \u2014 検索" },
};

/* ---------- Helpers ---------- */

function getLabels(lang: LanguageCode) {
  return LABELS[lang] ?? LABELS.en;
}

function filterEntries(query: string, lang: LanguageCode): SearchEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  return SEARCH_INDEX.filter((entry) => {
    // Check keywords for current language, fallback to ru then en
    const kw = entry.keywords[lang] ?? entry.keywords.ru ?? entry.keywords.en ?? [];
    // Also check the title
    const title = (entry.title[lang] ?? entry.title.ru ?? entry.title.en ?? "").toLowerCase();
    if (title.includes(q)) return true;
    return kw.some((k) => k.toLowerCase().includes(q));
  });
}

/* ---------- Component ---------- */

export default function SearchModal() {
  const { language } = useTranslation();
  const { ecoMode } = useEcoMode();
  const { navigateTo } = useNavigation();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIdx, setSelectedIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const labels = getLabels(language);
  const results = filterEntries(query, language).slice(0, 8);

  /* Reset selection when results change */
  useEffect(() => {
    setSelectedIdx(0);
  }, [results.length, query]);

  /* Focus input when opened */
  useEffect(() => {
    if (open) {
      // small delay so the animation starts before focus
      const id = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(id);
    }
  }, [open]);

  /* Scroll selected item into view */
  useEffect(() => {
    const el = listRef.current?.children[selectedIdx] as HTMLElement | undefined;
    el?.scrollIntoView({ block: "nearest" });
  }, [selectedIdx]);

  /* Global keyboard listener */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Ctrl+K / Cmd+K → open
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
        setQuery("");
        return;
      }

      // Only handle keys when modal is open
      if (!open) return;

      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        return;
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIdx((prev) => Math.min(prev + 1, results.length - 1));
        return;
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIdx((prev) => Math.max(prev - 1, 0));
        return;
      }

      if (e.key === "Enter" && results.length > 0) {
        e.preventDefault();
        const entry = results[selectedIdx];
        if (entry) {
          const pageId = SLUG_TO_PAGE[entry.slug] ?? "sections";
          navigateTo(pageId);
          setOpen(false);
          setQuery("");
        }
        return;
      }
    },
    [open, results, selectedIdx, navigateTo],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  /* Navigate on result click */
  const handleResultClick = (slug: string) => {
    const pageId = SLUG_TO_PAGE[slug] ?? "sections";
    navigateTo(pageId);
    setOpen(false);
    setQuery("");
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-start justify-center pt-[15vh]"
          initial={ecoMode ? undefined : { opacity: 0 }}
          animate={ecoMode ? undefined : { opacity: 1 }}
          exit={ecoMode ? undefined : { opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={labels.openHint}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          {/* Panel */}
          <motion.div
            className="relative z-10 w-full max-w-lg mx-4 bg-[#12141A] border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
            initial={ecoMode ? undefined : { opacity: 0, scale: 0.96, y: -10 }}
            animate={ecoMode ? undefined : { opacity: 1, scale: 1, y: 0 }}
            exit={ecoMode ? undefined : { opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search input */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.06]">
              <Search className="w-4 h-4 text-gray-500 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={labels.placeholder}
                className="flex-1 bg-transparent font-mono text-sm text-gray-200 placeholder-gray-600 outline-none"
                autoComplete="off"
                spellCheck={false}
              />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="p-1 text-gray-500 hover:text-gray-300 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Results */}
            <div ref={listRef} className="max-h-80 overflow-y-auto">
              {query.trim() && results.length === 0 && (
                <div className="px-4 py-8 text-center">
                  <p className="font-mono text-xs text-gray-500">{labels.noResults}</p>
                </div>
              )}

              {results.map((entry, idx) => {
                const title = entry.title[language] ?? entry.title.ru ?? entry.title.en ?? entry.slug;
                const isSelected = idx === selectedIdx;
                return (
                  <button
                    key={entry.slug}
                    type="button"
                    onClick={() => handleResultClick(entry.slug)}
                    className={`w-full flex items-center justify-between gap-3 px-4 py-3 text-left transition-colors cursor-pointer ${
                      isSelected ? "bg-white/[0.06]" : "hover:bg-white/[0.03]"
                    }`}
                  >
                    <div className="min-w-0">
                      <span className="block font-sans text-sm text-gray-200 truncate">
                        {title}
                      </span>
                      <span className="block font-mono text-[10px] text-gray-600 tracking-wider uppercase mt-0.5">
                        /{entry.slug}
                      </span>
                    </div>
                    <ArrowRight className={`w-3 h-3 shrink-0 transition-colors ${isSelected ? "text-[#3B82F6]" : "text-gray-700"}`} />
                  </button>
                );
              })}
            </div>

            {/* Footer hint */}
            <div className="flex items-center justify-between px-4 py-2.5 border-t border-white/[0.06] bg-[#0E1015]">
              <span className="font-mono text-[10px] text-gray-600 tracking-wider">
                {labels.openHint}
              </span>
              <span className="font-mono text-[10px] text-gray-600 tracking-wider">
                {labels.footerHint}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
