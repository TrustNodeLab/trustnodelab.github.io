import React from "react";
import { ShieldCheck, Mic, Link2, QrCode, Lock, Trash2, WifiOff, FileCheck, Cpu, Eye, AlertTriangle, FlaskConical, Award } from "lucide-react";
import { useTranslation } from "../i18n/LanguageContext";
import { useDepth } from "../context/DepthContext";

type L = Record<string, any>;
const T = (d: L, lang: string) => d[lang] || d.en;

const FEATURES: L = {
  ru: {
    title: "Возможности TrustNode", sub: "Только то, что реально работает в приложении сегодня — без приукрашивания",
    badge: "ПРОВЕРЕНО ПО КОДУ TN1",
    cards: [
      { i: "cpu", t: "Текстовый анализ ruBERT V4", s: "ruBERT — лёгкая языковая модель; ONNX — формат для быстрой работы на телефоне.", d: "F1 = 0.9930 на 140 вручную размеченных логах (один прогон, не кросс-валидация), recall 1.0 — ни одной пропущенной угрозы. Модель ~28 МБ." },
      { i: "mic", t: "Защита звонков", s: "Распознавание речи на устройстве — в дорожной карте (оценка Vosk / W2V BERT).", d: "Разговор переводится в текст прямо на устройстве; конвейер ищет признаки давления и показывает полноэкранный алерт. Статус: Roadmap · оценка вариантов, пока не в MVP." },
      { i: "link", t: "Проверка ссылок", d: "Офлайн-анализ на фишинг: поддельные домены, гомоглифы (буквы-двойники), вредоносные URL." },
      { i: "qr", t: "QR-сканер", d: "Проверяет QR-коды офлайн до перехода по ссылке — платежные реквизиты и фишинговые страницы распознаются заранее." },
      { i: "lock", t: "Шифрование всего", s: "SQLCipher — зашифрованная база данных; EncryptedFile — шифрование файлов.", d: "База Room под SQLCipher 4.5.7, записи звонков хранятся как EncryptedFile (.tnc), ключи — Android Keystore + StrongBox." },
      { i: "eye", t: "RASP fail-closed", s: "RASP — самозащита приложения от взлома.", d: "При обнаружении root, отладчика или подмены APK приложение блокируется: безопаснее отказать в работе, чем работать во взломанной среде." },
      { i: "filecheck", t: "Согласие перед записью голоса", d: "BiometricConsentManager требует отдельного подтверждения (в т.ч. биометрического) до начала записи звука звонков." },
      { i: "trash", t: "Удаление данных", d: "Ручное удаление покрывает 30 защищённых хранилищ и обе зашифрованные базы; метаданные угроз автоочищаются каждые 24 часа." }
    ],
    honestTitle: "Честно о статусе", honestBadge: "В РАЗРАБОТКЕ",
    honest: [
      { t: "ECHO — поведенческий контур", d: "Архитектура следующего поколения: 7 детекторов манипулятивных паттернов разговора. В активной разработке." },
      { t: "Nordic Shield UI", d: "Новый интерфейс приложения в тёмной теме. В процессе, цель — 1 сентября." },
      { t: "Расширенный анализ звонков", d: "Сейчас MVP: транскрипция + базовый анализ транскрипта. Глубокая семантика живого разговора — в roadmap. Живые звонки end-to-end ещё не тестировались." }
    ],
    compat: "Совместимость: Android 7.0+ (API 24), работает без Google Play Services. Полная поддержка чистого Android; на Huawei/EMUI часть функций аудиозаписи звонков может ограничиваться производителем.",
    cta: "Скачать в RuStore"
  },
  en: {
    title: "TrustNode Features", sub: "Only what actually works in the app today — no embellishment",
    badge: "VERIFIED AGAINST TN1 CODE",
    cards: [
      { i: "cpu", t: "ruBERT V4 text analysis", s: "ruBERT is a lightweight language model; ONNX is a format for fast on-phone inference.", d: "F1 = 0.9930 on 140 hand-labeled logs (single pass, no cross-validation), recall 1.0 — zero missed threats. ~28 MB model." },
      { i: "mic", t: "Call protection", s: "On-device speech recognition — on the roadmap (evaluating Vosk / W2V BERT).", d: "The call is transcribed on-device; the pipeline detects pressure patterns and shows a full-screen alert. Status: Roadmap · evaluating options, not yet in MVP." },
      { i: "link", t: "Link checking", d: "Offline phishing analysis: fake domains, homoglyphs (look-alike letters), malicious URLs." },
      { i: "qr", t: "QR scanner", d: "Checks QR codes offline before you follow them — payment details and phishing pages are recognized in advance." },
      { i: "lock", t: "Everything encrypted", s: "SQLCipher — encrypted database; EncryptedFile — file encryption.", d: "Room database under SQLCipher 4.5.7, call recordings stored as EncryptedFile (.tnc), keys in Android Keystore + StrongBox." },
      { i: "eye", t: "RASP fail-closed", s: "RASP — app self-defense against tampering.", d: "On root, debugger, or APK tampering the app locks itself: refusing to run in a compromised environment is safer than running there." },
      { i: "filecheck", t: "Consent before voice recording", d: "BiometricConsentManager requires separate confirmation (incl. biometric) before call-audio recording starts." },
      { i: "trash", t: "Data deletion", d: "Manual deletion covers 30 secured stores and both encrypted databases; threat metadata auto-cleans every 24 hours." }
    ],
    honestTitle: "Honest status", honestBadge: "IN DEVELOPMENT",
    honest: [
      { t: "ECHO — behavioral layer", d: "Next-generation architecture: 7 detectors of manipulative conversation patterns. In active development." },
      { t: "Nordic Shield UI", d: "New dark-theme interface for the app. In progress, target September 1." },
      { t: "Extended call analysis", d: "Currently MVP: transcription + basic transcript analysis. Deep semantics of live conversation — on the roadmap. Live calls not yet tested end-to-end." }
    ],
    compat: "Compatibility: Android 7.0+ (API 24), works without Google Play Services. Full support on stock Android; on Huawei/EMUI some call-audio functions may be limited by the manufacturer.",
    cta: "Download on RuStore"
  },
  simpleRu: {
    title: "Возможности TrustNode", sub: "Только то, что реально работает в приложении сегодня — без приукрашивания",
    badge: "ПРОВЕРЕНО ПО КОДУ TN1",
    cards: [
      { i: "cpu", t: "Умный анализ текста", s: "Понимает русский язык прямо на устройстве.", d: "Точно отличает мошеннические сообщения от настоящих. Точность 97%, ни одна угроза не пропущена. Работает без интернета." },
      { i: "mic", t: "Защита звонков", s: "Распознавание речи на устройстве — в дорожной карте (оценка Vosk / W2V BERT).", d: "Статус: Roadmap · разговор переводится в текст на устройстве; пока не в MVP." },
      { i: "link", t: "Проверка ссылок", d: "Проверяет ссылки на подделки и обман — даже офлайн." },
      { i: "qr", t: "QR-сканер", d: "Проверяет QR-коды до перехода по ссылке — не даёт попасть на мошенническую страницу." },
      { i: "lock", t: "Зашифрованные данные", d: "Все ваши данные надёжно зашифрованы. Даже если телефон попадёт в чужие руки, информацию не прочитают." },
      { i: "eye", t: "Самозащита приложения", d: "Если кто-то пытается взломать приложение, оно само себя блокирует. Безопаснее отказать в работе, чем работать во взломанном виде." },
      { i: "filecheck", t: "Согласие перед записью голоса", d: "Запись звука звонка начинается только с вашего явного разрешения." },
      { i: "trash", t: "Удаление данных", d: "Вы можете удалить все данные одним действием. Метаданные угроз автоматически очищаются каждые 24 часа." }
    ],
    honestTitle: "Честно о статусе", honestBadge: "В РАЗРАБОТКЕ",
    honest: [
      { t: "Анализ поведения в разговоре", d: "Следующий шаг: распознавание манипуляций в реальном времени. Активная разработка." },
      { t: "Новый дизайн приложения", d: "Обновлённый интерфейс в тёмной теме. В процессе." },
      { t: "Расширенный анализ звонков", d: "Сейчас анализирует базовые признаки. Глубокий анализ живого разговора — в планах." }
    ],
    compat: "Работает на Android 7.0 и новее. Не требует Google Play.",
    cta: "Скачать в RuStore"
  },
  simpleEn: {
    title: "TrustNode Features", sub: "Only what actually works in the app today — no embellishment",
    badge: "VERIFIED AGAINST TN1 CODE",
    cards: [
      { i: "cpu", t: "Smart text analysis", s: "Understands Russian right on your device.", d: "Accurately distinguishes scam messages from real ones. 97% accuracy, zero threats missed. Works offline." },
      { i: "mic", t: "Call protection", s: "On-device speech recognition is on the roadmap (evaluating Vosk / W2V BERT).", d: "Status: Roadmap · converts the call to text on your device; not in MVP yet." },
      { i: "link", t: "Link checking", d: "Checks links for fakes and scams — even offline." },
      { i: "qr", t: "QR scanner", d: "Checks QR codes before you follow them — prevents landing on a scam page." },
      { i: "lock", t: "Encrypted data", d: "All your data is securely encrypted. Even if your phone falls into the wrong hands, no one can read your information." },
      { i: "eye", t: "App self-protection", d: "If someone tries to hack the app, it locks itself. Safer to refuse than to run in a compromised state." },
      { i: "filecheck", t: "Consent before voice recording", d: "Call recording only starts with your explicit permission." },
      { i: "trash", t: "Data deletion", d: "Delete all your data with one tap. Threat metadata auto-clears every 24 hours." }
    ],
    honestTitle: "Honest status", honestBadge: "IN DEVELOPMENT",
    honest: [
      { t: "Conversation behavior analysis", d: "Next step: detecting manipulation in real time. Active development." },
      { t: "New app design", d: "Updated dark-theme interface. In progress." },
      { t: "Extended call analysis", d: "Currently analyzes basic patterns. Deep live-conversation analysis is on the roadmap." }
    ],
    compat: "Works on Android 7.0+. No Google Play required.",
    cta: "Download on RuStore"
  },
  simpleTr: {
    title: "TrustNode Özellikleri", sub: "Uygulamada gerçekten çalışan her şey — abartı yok",
    badge: "KOD İLE DOĞRULANDI",
    cards: [
      { i: "cpu", t: "Akıllı metin analizi", s: "Rusça dilini doğrudan cihazınızda anlar.", d: "Dolandırıcılık mesajlarını gerçeklerden tam olarak ayırt eder. Doğruluk %97, tehdit kaçırma yok. Çevrimdışı çalışır." },
      { i: "mic", t: "Arama koruması", s: "Cihaz üzerinde konuşma tanıması yol haritasındadır (Vosk / W2V BERT değerlendiriliyor).", d: "Durum: Roadmap · aramayı cihazınızda metne dönüştürür; henüz MVP'de değil." },
      { i: "link", t: "Bağlantı kontrolü", d: "Bağlantıları sahte ve dolandırıcılık için kontrol eder — çevrimdışı bile." },
      { i: "qr", t: "QR tarayıcı", d: "QR kodlarını takip etmeden önce kontrol eder — dolandırıcılık sayfasına düşmenizi önler." },
      { i: "lock", t: "Şifreli veri", d: "Tüm verileriniz güvenle şifrelenir. Telefonunuz yanlış ellerde olsa bile, bilgilerinizi kimse okuyamaz." },
      { i: "eye", t: "Uygulama kendini koruma", d: "Biri uygulamayı hacklemeye çalışırsa, kendini kilitler. Bozuk ortamda çalışmaktan daha güvenlidir." },
      { i: "filecheck", t: "Ses kaydından önce onay", d: "Arama kaydı yalnızca açık izninizle başlar." },
      { i: "trash", t: "Veri silme", d: "Tüm verilerinizi tek dokunuşla silin. Tehdit meta verileri her 24 saatte otomatik temizlenir." }
    ],
    honestTitle: "Dürüst durum", honestBadge: "GELİŞTİRMEDE",
    honest: [
      { t: "Konuşma davranışı analizi", d: "Sonraki adım: gerçek zamanlı manipülasyon tespiti. Aktif geliştirme." },
      { t: "Yeni uygulama tasarımı", d: "Güncellenmiş koyu tema arayüzü. Devam ediyor." },
      { t: "Gelişmiş analiz", d: "Şu an temel kalıpları analiz ediyor. Derin canlı konuşma analizi yol haritasında." }
    ],
    compat: "Android 7.0+ üzerinde çalışır. Google Play gerekmez.",
    cta: "RuStore'dan İndir"
  },
  simpleEs: {
    title: "Funciones de TrustNode", sub: "Solo lo que realmente funciona en la app hoy — sin exagerar",
    badge: "VERIFICADO CON EL CÓDIGO TN1",
    cards: [
      { i: "cpu", t: "Análisis inteligente de texto", s: "Entiende el ruso directamente en tu dispositivo.", d: "Distingue con precisión los mensajes de estafa de los reales. 97% de precisión, ninguna amenaza perdida. Funciona sin internet." },
      { i: "mic", t: "Protección de llamadas", s: "El reconocimiento de voz en el dispositivo está en la hoja de ruta (evaluando Vosk / W2V BERT).", d: "Estado: Roadmap · convierte la llamada a texto en tu dispositivo; aún no en MVP." },
      { i: "link", t: "Verificación de enlaces", d: "Revisa los enlaces para detectar falsos y estafas — incluso sin conexión." },
      { i: "qr", t: "Escáner QR", d: "Revisa los códigos QR antes de seguirlos — evita caer en páginas de estafa." },
      { i: "lock", t: "Datos cifrados", d: "Todos tus datos están cifrados de forma segura. Aunque tu teléfono caiga en manos equivocadas, nadie puede leer tu información." },
      { i: "eye", t: "Auto-protección de la app", d: "Si alguien intenta hackear la app, se bloquea sola. Es más seguro negarse a funcionar que ejecutarse en un estado comprometido." },
      { i: "filecheck", t: "Consentimiento antes de grabar voz", d: "La grabación de llamadas solo comienza con tu permiso explícito." },
      { i: "trash", t: "Eliminación de datos", d: "Elimina todos tus datos con un toque. Los metadatos de amenazas se limpian automáticamente cada 24 horas." }
    ],
    honestTitle: "Estado honesto", honestBadge: "EN DESARROLLO",
    honest: [
      { t: "Análisis de comportamiento conversacional", d: "Siguiente paso: detectar manipulación en tiempo real. En desarrollo activo." },
      { t: "Nuevo diseño de app", d: "Interfaz actualizada con tema oscuro. En progreso." },
      { t: "Análisis extendido", d: "Actualmente analiza patrones básicos. El análisis profundo de conversaciones está en el roadmap." }
    ],
    compat: "Funciona en Android 7.0+. No requiere Google Play.",
    cta: "Descargar en RuStore"
  },
  simpleZh: {
    title: "TrustNode 功能", sub: "只展示应用中真正可用的功能——不夸大",
    badge: "已通过 TN1 代码验证",
    cards: [
      { i: "cpu", t: "智能文本分析", s: "在您的设备上直接理解俄语。", d: "准确区分诈骗消息和正常消息。准确率 97%，零漏报。离线工作。" },
      { i: "mic", t: "通话保护", s: "设备端语音识别已列入路线图（评估 Vosk / W2V BERT）", d: "状态：Roadmap · 在您的设备上将通话转为文字；尚未进入 MVP。" },
      { i: "link", t: "链接检查", d: "检查链接是否为诈骗——即使离线也能工作。" },
      { i: "qr", t: "二维码扫描器", d: "在点击前检查二维码——防止进入诈骗页面。" },
      { i: "lock", t: "数据加密", d: "您的所有数据都经过安全加密。即使手机落入他人之手，也无法读取您的信息。" },
      { i: "eye", t: "应用自我保护", d: "如果有人试图入侵应用，它会自动锁定。宁可拒绝运行，也不在不安全的环境下工作。" },
      { i: "filecheck", t: "录音前需授权", d: "通话录音仅在您明确授权后才开始。" },
      { i: "trash", t: "数据删除", d: "一键删除所有数据。威胁元数据每 24 小时自动清除。" }
    ],
    honestTitle: "真实状态", honestBadge: "开发中",
    honest: [
      { t: "对话行为分析", d: "下一步：实时检测操控行为。正在积极开发中。" },
      { t: "全新应用设计", d: "更新的暗色主题界面。开发中。" },
      { t: "扩展通话分析", d: "目前分析基本模式。深度实时对话分析在规划中。" }
    ],
    compat: "支持 Android 7.0+。无需 Google Play。",
    cta: "在 RuStore 下载"
  },
  simpleHi: {
    title: "TrustNode सुविधाएँ", sub: "ऐप में आज जो वास्तव में काम करता है — बिना किसी सजावट के",
    badge: "TN1 कोड से सत्यापित",
    cards: [
      { i: "cpu", t: "स्मार्ट टेक्स्ट विश्लेषण", s: "आपके डिवाइस पर सीधे रूसी समझता है।", d: "धोखाधड़ी वाले संदेशों को असली से सटीकता से अलग करता है। 97% सटीकता, कोई खतरा नहीं छूटता। ऑफ़लाइन काम करता है।" },
      { i: "mic", t: "कॉल सुरक्षा", s: "डिवाइस पर वाक् पहचान रोडमैप में है (Vosk / W2V BERT का मूल्यांकन)।", d: "स्थिति: Roadmap · कॉल को आपके डिवाइस पर टेक्स्ट में बदलता है; अभी MVP में नहीं।" },
      { i: "link", t: "लिंक जाँच", d: "लिंक को नकली और धोखाधड़ी के लिए जाँचता है — ऑफ़लाइन भी।" },
      { i: "qr", t: "QR स्कैनर", d: "QR कोड को फ़ॉलो करने से पहले जाँचता है — धोखाधड़ी वाले पेज पर जाने से रोकता है।" },
      { i: "lock", t: "एन्क्रिप्टेड डेटा", d: "आपका सारा डेटा सुरक्षित रूप से एन्क्रिप्टेड है। फ़ोन गलत हाथों में पड़ जाए तब भी कोई आपकी जानकारी नहीं पढ़ सकता।" },
      { i: "eye", t: "ऐप की स्व-सुरक्षा", d: "अगर कोई ऐप को हैक करने की कोशिश करे, तो यह खुद को लॉक कर लेता है। समझौता किए गए वातावरण में काम करने से मना करना ज़्यादा सुरक्षित है।" },
      { i: "filecheck", t: "आवाज़ रिकॉर्डिंग से पहले सहमति", d: "कॉल रिकॉर्डिंग केवल आपकी स्पष्ट अनुमति से शुरू होती है।" },
      { i: "trash", t: "डेटा हटाना", d: "एक टैप में अपना सारा डेटा हटाएँ। खतरा मेटाडेटा हर 24 घंटे में अपने आप साफ़ हो जाता है।" }
    ],
    honestTitle: "ईमानदार स्थिति", honestBadge: "विकास में",
    honest: [
      { t: "बातचीत के व्यवहार का विश्लेषण", d: "अगला कदम: रीयल-टाइम में हेरफेर का पता लगाना। सक्रिय विकास जारी।" },
      { t: "नया ऐप डिज़ाइन", d: "अपडेटेड डार्क-थीम इंटरफ़ेस। प्रगति में।" },
      { t: "विस्तृत कॉल विश्लेषण", d: "अभी बुनियादी पैटर्न का विश्लेषण करता है। गहरा लाइव बातचीत विश्लेषण रोडमैप में है।" }
    ],
    compat: "Android 7.0+ पर काम करता है। Google Play की आवश्यकता नहीं।",
    cta: "RuStore से डाउनलोड करें"
  },
  simpleAr: {
    title: "ميزات TrustNode", sub: "ما يفعله بالفعل في التطبيق اليوم — بدون مبالغة",
    badge: "موثق بالكود TN1",
    cards: [
      { i: "cpu", t: "تحليل ذكي للنصوص", s: "يفهم اللغة الروسية مباشرة على جهازك.", d: "يميز بدقة بين رسائل الاحتيال والرسائل الحقيقية. دقة 97%، لا توجد تهديدات فائتة. يعمل بدون إنترنت." },
      { i: "mic", t: "حماية المكالمات", s: "التعرف على الكلام على الجهاز في خارطة الطريق (تقييم Vosk / W2V BERT)", d: "الحالة: Roadmap · يحول المكالمة إلى نص على جهازك؛ ليس بعد في MVP." },
      { i: "link", t: "التحقق من الروابط", d: "يفحص الروابط بحثًا عن التزوير والاحتيال — حتى بدون اتصال." },
      { i: "qr", t: "ماسح QR", d: "يفحص رموز QR قبل المتابعة — يمنعك من الوصول إلى صفحة احتيالية." },
      { i: "lock", t: "بيانات مشفرة", d: "جميع بياناتك مشفرة بأمان. حتى لو وقع هاتفك في أيدي خاطئة، لا أحد يمكنه قراءة معلوماتك." },
      { i: "eye", t: "حماية التطبيق الذاتية", d: "إذا حاول أحد اختراق التطبيق، يُقفل تلقائيًا. الأمان يكمن في رفض العمل في بيئة مخترقة." },
      { i: "filecheck", t: "الموافقة قبل تسجيل الصوت", d: "تبدأ تسجيل المكالمات فقط بتصريحك الصريح." },
      { i: "trash", t: "حذف البيانات", d: "احذف جميع بياناتك بنقرة واحدة. يتم مسح البيانات الوصفية للتهديدات تلقائيًا كل 24 ساعة." }
    ],
    honestTitle: "الوضع الصادق", honestBadge: "قيد التطوير",
    honest: [
      { t: "تحليل سلوك المحادثة", d: "الخطوة التالية: اكتشاف التلاعب في الوقت الفعلي. تطوير نشط." },
      { t: "تصميم التطبيق الجديد", d: "واجهة محدّثة بألوان داكنة. قيد التنفيذ." },
      { t: "تحليل متقدم", d: "حالياً يحلل الأنماط الأساسية. التحليل العميق للمحادثات الحية في خارطة الطريق." }
    ],
    compat: "يعمل على Android 7.0+. لا يتطلب Google Play.",
    cta: "تحميل من RuStore"
  },
  simplePt: {
    title: "Recursos do TrustNode", sub: "Apenas o que realmente funciona no app hoje — sem exagero",
    badge: "VERIFICADO PELO CÓDIGO TN1",
    cards: [
      { i: "cpu", t: "Análise inteligente de texto", s: "Entende russo direto no seu dispositivo.", d: "Distingue com precisão mensagens de golpe das reais. 97% de precisão, nenhuma ameaça perdida. Funciona offline." },
      { i: "mic", t: "Proteção de chamadas", s: "O reconhecimento de fala no dispositivo está no roadmap (avaliando Vosk / W2V BERT).", d: "Status: Roadmap · converte a chamada em texto no seu dispositivo; ainda não no MVP." },
      { i: "link", t: "Verificação de links", d: "Verifica links para falsos e golpes — até offline." },
      { i: "qr", t: "Leitor QR", d: "Verifica códigos QR antes de segui-los — evita cair em páginas de golpe." },
      { i: "lock", t: "Dados criptografados", d: "Todos os seus dados estão criptografados com segurança. Mesmo que seu celular caia em mãos erradas, ninguém pode ler suas informações." },
      { i: "eye", t: "Auto-proteção do app", d: "Se alguém tentar invadir o app, ele trava sozinho. Mais seguro recusar do que rodar em ambiente comprometido." },
      { i: "filecheck", t: "Consentimento antes de gravar voz", d: "A gravação de chamadas só começa com sua permissão explícita." },
      { i: "trash", t: "Exclusão de dados", d: "Exclua todos os seus dados com um toque. Metadados de ameaças são limpos automaticamente a cada 24 horas." }
    ],
    honestTitle: "Status honesto", honestBadge: "EM DESENVOLVIMENTO",
    honest: [
      { t: "Análise de comportamento da conversa", d: "Próximo passo: detectar manipulação em tempo real. Desenvolvimento ativo." },
      { t: "Novo design do app", d: "Interface atualizada com tema escuro. Em andamento." },
      { t: "Análise estendida", d: "Atualmente analisa padrões básicos. Análise profunda de conversas ao vivo está no roadmap." }
    ],
    compat: "Funciona no Android 7.0+. Não precisa do Google Play.",
    cta: "Baixar na RuStore"
  },
  simpleFr: {
    title: "Fonctionnalités TrustNode", sub: "Ce qui fonctionne réellement dans l'app aujourd'hui — sans enjoliver",
    badge: "VÉRIFIÉ PAR LE CODE TN1",
    cards: [
      { i: "cpu", t: "Analyse intelligente du texte", s: "Comprend le russe directement sur votre appareil.", d: "Distingue avec précision les messages d'arnaque des vrais. 97% de précision, aucune menace ratée. Fonctionne hors ligne." },
      { i: "mic", t: "Protection des appels", s: "La reconnaissance vocale sur l'appareil est dans la feuille de route (évaluation Vosk / W2V BERT).", d: "Statut : Roadmap · convertit l'appel en texte sur votre appareil ; pas encore en MVP." },
      { i: "link", t: "Vérification des liens", d: "Vérifie les liens pour les fausses et arnaques — même hors ligne." },
      { i: "qr", t: "Scanner QR", d: "Vérifie les codes QR avant de les suivre — empêche d'atterrir sur une page d'arnaque." },
      { i: "lock", t: "Données chiffrées", d: "Toutes vos données sont sécurisées par chiffrement. Même si votre téléphone tombe entre de mauvaises mains, personne ne peut lire vos informations." },
      { i: "eye", t: "Auto-protection de l'app", d: "Si quelqu'un essaie de pirater l'app, elle se verrouille. Plus sûr de refuser que de fonctionner dans un état compromis." },
      { i: "filecheck", t: "Consentement avant l'enregistrement vocal", d: "L'enregistrement des appels ne commence qu'avec votre permission explicite." },
      { i: "trash", t: "Suppression des données", d: "Supprimez toutes vos données d'un toucher. Les métadonnées de menaces sont nettoyées automatiquement toutes les 24 heures." }
    ],
    honestTitle: "État honnête", honestBadge: "EN DÉVELOPPEMENT",
    honest: [
      { t: "Analyse du comportement conversationnel", d: "Prochaine étape : détecter la manipulation en temps réel. Développement actif." },
      { t: "Nouveau design de l'app", d: "Interface mise à jour avec thème sombre. En cours." },
      { t: "Analyse étendue", d: "Actuellement analyse les motifs de base. L'analyse approfondie des conversations en direct est dans la feuille de route." }
    ],
    compat: "Fonctionne sur Android 7.0+. Pas besoin de Google Play.",
    cta: "Télécharger sur RuStore"
  },
  simpleDe: {
    title: "TrustNode Funktionen", sub: "Nur was in der App heute wirklich funktioniert — ohne Übertreibung",
    badge: "MIT TN1-CODE VERIFIZIERT",
    cards: [
      { i: "cpu", t: "Intelligente Textanalyse", s: "Versteht Russisch direkt auf Ihrem Gerät.", d: "Unterscheidet Betrugsnachrichten von echten mit hoher Genauigkeit. 97% Genauigkeit, keine Bedrohungen verpasst. Funktioniert offline." },
      { i: "mic", t: "Anrufschutz", s: "Geräteseitige Spracherkennung ist in der Roadmap (Vosk / W2V BERT werden bewertet).", d: "Status: Roadmap · wandelt den Anruf auf Ihrem Gerät in Text um; noch nicht im MVP." },
      { i: "link", t: "Link-Überprüfung", d: "Überprüft Links auf Fälschungen und Betrug — auch offline." },
      { i: "qr", t: "QR-Scanner", d: "Überprüft QR-Codes, bevor Sie ihnen folgen — verhindert, auf eine Betrugsseite zu gelangen." },
      { i: "lock", t: "Verschlüsselte Daten", d: "Alle Ihre Daten sind sicher verschlüsselt. Selbst wenn Ihr Telefon in falsche Hände gerät, kann niemand Ihre Informationen lesen." },
      { i: "eye", t: "App-Selbstschutz", d: "Wenn jemand versucht, die App zu hacken, sperrt sie sich selbst. Sicherer, die Arbeit zu verweigern, als in einem kompromittierten Zustand zu laufen." },
      { i: "filecheck", t: "Einwilligung vor Sprachaufnahme", d: "Die Anrufaufnahme beginnt nur mit Ihrer ausdrücklichen Genehmigung." },
      { i: "trash", t: "Datenlöschung", d: "Löschen Sie alle Ihre Daten mit einem Tippen. Bedrohungs-Metadaten werden alle 24 Stunden automatisch gelöscht." }
    ],
    honestTitle: "Ehrlicher Status", honestBadge: "IN ENTWICKLUNG",
    honest: [
      { t: "Gesprächsverhaltensanalyse", d: "Nächster Schritt: Manipulation in Echtzeit erkennen. Aktive Entwicklung." },
      { t: "Neues App-Design", d: "Aktualisierte Dunkel-Theme-Oberfläche. In Arbeit." },
      { t: "Erweiterte Analyse", d: "Analysiert derzeit grundlegende Muster. Tiefgehende Live-Gesprächsanalyse steht auf der Roadmap." }
    ],
    compat: "Funktioniert auf Android 7.0+. Kein Google Play nötig.",
    cta: "Bei RuStore herunterladen"
  },
  simpleJa: {
    title: "TrustNode の機能", sub: "アプリで実際に今日動作していることのみ — 大げさな表現なし",
    badge: "TN1 コードで検証済み",
    cards: [
      { i: "cpu", t: "スマートなテキスト分析", s: "デバイス上で直接ロシア語を理解します。", d: "詐欺メッセージと本物を正確に区別します。精度 97%、漏れゼロ。オフラインで動作。" },
      { i: "mic", t: "通話保護", s: "端末上での音声認識はロードマップに掲載（Vosk / W2V BERT を評価中）", d: "ステータス: Roadmap · デバイス上で通話をテキストに変換；まだ MVP ではありません。" },
      { i: "link", t: "リンク検証", d: "フィッシングや詐欺のリンクをチェック — オフラインでも動作。" },
      { i: "qr", t: "QR スキャナー", d: "QR コードをフォローする前にチェック — 詐欺ページへのアクセスを防止。" },
      { i: "lock", t: "暗号化されたデータ", d: "すべてのデータが安全に暗号化されています。-phone が悪意ある人の手に渡っても、情報は読めません。" },
      { i: "eye", t: "アプリの自己保護", d: "誰かがアプリをハッキングしようとすると、自動でロックします。危険な状態で動作するより、拒否の方が安全です。" },
      { i: "filecheck", t: "録音前の同意", d: "通話録音はあなたの明示的な許可でのみ開始されます。" },
      { i: "trash", t: "データ削除", d: "タップ一つで全データを削除。脅威のメタデータは 24 時間ごとに自動クリア。" }
    ],
    honestTitle: "正直なステータス", honestBadge: "開発中",
    honest: [
      { t: "会話行動の分析", d: "次のステップ：リアルタイムで操作を検出。開発中。" },
      { t: "新しいアプリデザイン", d: "ダークテーマの更新されたインターフェース。開発中。" },
      { t: "拡張通話分析", d: "現在は基本パターンを分析。ライブ会話の深い分析はロードマップにあります。" }
    ],
    compat: "Android 7.0+ で動作。Google Play は不要です。",
    cta: "RuStore でダウンロード"
  }
};

const RESEARCH: L = {
  ru: {
    title: "Исследования и признание", sub: "Метрики, методология и внешняя валидация проекта", badge: "ФАКТЫ // ЦИФРЫ",
    mTitle: "Тест модели v4", mSub: "140 вручную размеченных логов (один прогон, не кросс-валидация)",
    metrics: [["Accuracy", "0.9930"], ["Precision", "0.9928"], ["Recall", "1.0 — ни одной пропущенной угрозы"], ["F1", "0.9930"], ["Пропуски (FN)", "0"], ["Разметка", "140 логов, ручная"]],
    tokTitle: "Почему метрика изменилась",
    tokDesc: "Ранние метрики были на автоматически размеченном датасете (20 000 сообщений). Новые метрики — на 140 вручную размеченных логах (один прогон). F1 вырос до 0.9930 за счёт честной ручной разметки и исправления токенизатора.",
    benchTitle: "Стендовые прогоны",
    bench: [
      ["TTS → STT → ML (сквозной голосовой стенд)", "12/12 мошеннических семплов детектированы"],
      ["Реальные тексты из интернета (40 шт.)", "F1 = 0.935, один пропуск"],
      ["Ограничение", "Метрики получены на Python-стенде, не на живом устройстве"]
    ],
    nirTitle: "НИР-конкурс", nirDesc: "I место — региональный этап НИР, секция «Информационные технологии». Приглашение на всероссийский федеральный финал, Москва, сентябрь 2026.",
    note: "Все цифры на странице взяты из отчётов репозитория (independent_metrics.json, acceptance_report_v4.json). Мы публикуем и ограничения — это часть доверия."
  },
  en: {
    title: "Research & Recognition", sub: "Metrics, methodology and external validation", badge: "FACTS // NUMBERS",
    mTitle: "v4 model test", mSub: "140 hand-labeled logs (single pass, no cross-validation)",
    metrics: [["Accuracy", "0.9930"], ["Precision", "0.9928"], ["Recall", "1.0 — zero missed threats"], ["F1", "0.9930"], ["Misses (FN)", "0"], ["Dataset", "140 logs, hand-labeled"]],
    tokTitle: "Why the metric changed",
    tokDesc: "Early metrics used an automatically labeled dataset (20,000 messages). New metrics are on 140 hand-labeled logs (single pass). F1 improved to 0.9930 through honest hand-labeling and tokenizer fixes.",
    benchTitle: "Bench runs",
    bench: [
      ["TTS → STT → ML (end-to-end voice bench)", "12/12 fraud samples detected"],
      ["Real internet texts (40 samples)", "F1 = 0.935, one miss"],
      ["Limitation", "Metrics were measured on a Python bench, not on a live device"]
    ],
    nirTitle: "Research competition", nirDesc: "1st place — regional NIR stage, Information Technology track. Invitation to the national super-final, Moscow, September 2026.",
    note: "Every number here comes from repository reports (independent_metrics.json, acceptance_report_v4.json). We publish limitations too — that is part of trust."
  },
  simpleRu: {
    title: "Исследования и признание", sub: "Результаты тестирования и оценка экспертов", badge: "ФАКТЫ // ЦИФРЫ",
    mTitle: "Тест модели", mSub: "140 вручную размеченных логов (один прогон)",
    metrics: [["Точность", "99.3%"], ["Верно определены мошенники", "100%"], ["Пропуски угроз", "0"], ["Разметка", "140 логов, ручная"]],
    tokTitle: "Как считались метрики",
    tokDesc: "Метрики получены на 140 вручную размеченных логах (один прогон, не кросс-валидация). Честные цифры без завышения.",
    benchTitle: "Тесты на реальных данных",
    bench: [
      ["Голосовые сценарии (12 шт.)", "Все 12 мошеннических сценариев распознаны"],
      ["Тексты из интернета (40 шт.)", "Точность 93.5%, один пропуск"],
      ["Ограничение", "Метрики получены в лабораторных условиях, не на живом устройстве"]
    ],
    nirTitle: "НИР-конкурс", nirDesc: "I место — региональный этап НИР, секция «Информационные технологии». Приглашение на всероссийский федеральный финал, Москва, сентябрь 2026.",
    note: "Все цифры на странице взяты из отчётов репозитория. Мы публикуем и ограничения — это часть доверия."
  },
  simpleEn: {
    title: "Research & Recognition", sub: "Test results and expert evaluation", badge: "FACTS // NUMBERS",
    mTitle: "Model test", mSub: "140 hand-labeled logs (single pass)",
    metrics: [["Accuracy", "99.3%"], ["Fraud detected", "100%"], ["Threats missed", "0"], ["Dataset", "140 logs, hand-labeled"]],
    tokTitle: "How metrics were computed",
    tokDesc: "Metrics are based on 140 hand-labeled logs (single pass, no cross-validation). Honest numbers, no inflation.",
    benchTitle: "Real-world tests",
    bench: [
      ["Voice scenarios (12 total)", "All 12 scam scenarios detected"],
      ["Internet texts (40 total)", "93.5% accuracy, one miss"],
      ["Limitation", "Results from lab tests, not a live device"]
    ],
    nirTitle: "Research competition", nirDesc: "1st place — regional NIR stage, Information Technology track. Invitation to the national super-final, Moscow, September 2026.",
    note: "Every number here comes from repository reports. We publish limitations too — that is part of trust."
  },
  simpleTr: {
    title: "Araştırma ve Tanınma", sub: "Test sonuçları ve uzman değerlendirmesi", badge: "GERÇEKLER // RAKAMLAR",
    mTitle: "Bağımsız model testi", mSub: "140 elle etiketlenmiş kayıt (tek geçiş)",
    metrics: [["Doğruluk", "%99.3"], ["Tespit edilen dolandırıcılık", "%100"], ["Kaçırılan tehditler", "0"], ["Veri seti", "140 kayıt, elle etiketlenmiş"]],
    tokTitle: "Metrikler nasıl hesaplandı",
    tokDesc: "Metrikler 140 elle etiketlenmiş kayıta dayanmaktadır (tek geçiş, çapraz doğrulama yok). Dürüst rakamlar, şişirme yok.",
    benchTitle: "Gerçek dünya testleri",
    bench: [
      ["Ses senaryoları (12 toplam)", "12 dolandırıcılık senaryosunun tamamı tespit edildi"],
      ["İnternet metinleri (40 toplam)", "%93.5 doğruluk, bir kaçırma"],
      ["Kısıtlama", "Sonuçlar laboratuvar testlerinden, canlı cihazdan değil"]
    ],
    nirTitle: "Araştırma yarışması", nirDesc: "1. sıra — bölgesel NIR aşaması, Bilişim Teknolojileri dalı. Ulusal final'e davet, Moskova, Eylül 2026.",
    note: "Buradaki her rakam depo raporlarından gelmektedir. Sınırlamaları da yayınlıyoruz — bu güvenin bir parçası."
  },
  simpleEs: {
    title: "Investigación y Reconocimiento", sub: "Resultados de pruebas y evaluación de expertos", badge: "HECHOS // NÚMEROS",
    mTitle: "Prueba independiente del modelo", mSub: "140 registros etiquetados manualmente (una ejecución)",
    metrics: [["Precisión", "99.3%"], ["Fraude detectado", "100%"], ["Amenazas perdidas", "0"], ["Conjunto", "140 registros, etiquetado manual"]],
    tokTitle: "Cómo se calcularon las métricas",
    tokDesc: "Las métricas se basan en 140 registros etiquetados manualmente (una ejecución, sin validación cruzada). Cifras honestas, sin inflación.",
    benchTitle: "Pruebas del mundo real",
    bench: [
      ["Escenarios de voz (12 total)", "Los 12 escenarios de fraude detectados"],
      ["Textos de internet (40 total)", "93.5% de precisión, un fallo"],
      ["Limitación", "Resultados de pruebas de laboratorio, no de un dispositivo en vivo"]
    ],
    nirTitle: "Competencia de investigación", nirDesc: "1er lugar — etapa regional NIR, sector Tecnología de la Información. Invitación a la final nacional, Moscú, septiembre 2026.",
    note: "Cada número aquí proviene de informes del repositorio. Publicamos limitaciones también — eso es parte de la confianza."
  },
  simpleZh: {
    title: "研究与认可", sub: "测试结果和专家评估", badge: "事实 // 数据",
    mTitle: "独立模型测试", mSub: "140 条人工标注的日志（单次运行）",
    metrics: [["准确率", "99.3%"], ["欺诈检出率", "100%"], ["漏报数", "0"], ["数据集", "140 条日志，人工标注"]],
    tokTitle: "指标如何计算",
    tokDesc: "指标基于 140 条人工标注的日志（单次运行，非交叉验证）。诚实的数字，无虚高。",
    benchTitle: "真实场景测试",
    bench: [
      ["语音场景（共 12 个）", "12 个诈骗场景全部检出"],
      ["网络文本（共 40 个）", "准确率 93.5%，漏报一个"],
      ["局限性", "结果来自实验室测试，非实际设备"]
    ],
    nirTitle: "研究竞赛", nirDesc: "第一名 — 地区级科研竞赛，信息技术赛道。受邀参加全国总决赛，莫斯科，2026 年 9 月。",
    note: "页面上的所有数字均来自代码仓库报告。我们也公开局限性——这是信任的一部分。"
  },
  simpleHi: {
    title: "अनुसंधान और मान्यता", sub: "परीक्षण परिणाम और विशेषज्ञ मूल्यांकन", badge: "तथ्य // आंकड़े",
    mTitle: "स्वतंत्र मॉडल परीक्षण", mSub: "140 हस्त-चिह्नित लॉग (एक बार)",
    metrics: [["सटीकता", "99.3%"], ["पकड़ी गई धोखाधड़ी", "100%"], ["छूटी धमकियाँ", "0"], ["डेटासेट", "140 लॉग, हस्त-चिह्नित"]],
    tokTitle: "मेट्रिक्स कैसे गणना की गई",
    tokDesc: "मेट्रिक्स 140 हस्त-चिह्नित लॉग पर आधारित हैं (एक बार, कोई क्रॉस-वैलिडेशन नहीं)। ईमानदार आंकड़े, कोई बढ़ावा नहीं।",
    benchTitle: "वास्तविक परीक्षण",
    bench: [
      ["आवाज़ परिदृश्य (कुल 12)", "12 में से सभी 12 धोखाधड़ी परिदृश्य पकड़े गए"],
      ["इंटरनेट टेक्स्ट (कुल 40)", "93.5% सटीकता, एक चूक"],
      ["सीमा", "परिणाम प्रयोगशाला परीक्षणों से, वास्तविक डिवाइस से नहीं"]
    ],
    nirTitle: "अनुसंधान प्रतियोगिता", nirDesc: "प्रथम स्थान — क्षेत्रीय NIR चरण, सूचना प्रौद्योगिकी ट्रैक। राष्ट्रीय सुपर-फाइनल के लिए निमंत्रण, मॉस्को, सितंबर 2026।",
    note: "यहाँ हर संख्या रिपॉज़िटरी रिपोर्ट से आती है। हम सीमाएँ भी प्रकाशित करते हैं — यह विश्वास का हिस्सा है।"
  },
  simpleAr: {
    title: "البحث والاعتراف", sub: "نتائج الاختبار وتقييم الخبراء", badge: "حقائق // أرقام",
    mTitle: "اختبار مستقل للنموذج", mSub: "140 سجلًا مُصنّفًا يدويًا (تشغيل واحد)",
    metrics: [["الدقة", "99.3%"], ["الاحتيال المكتشف", "100%"], ["التهديدات الفائتة", "0"], ["مجموعة البيانات", "140 سجلًا، تصنيف يدوي"]],
    tokTitle: "كيف حُسبت المقاييس",
    tokDesc: "تعتمد المقاييس على 140 سجلًا مُصنّفًا يدويًا (تشغيل واحد، بدون تحقق متقاطع). أرقام صادقة، بدون تضخيم.",
    benchTitle: "اختبارات عالمية حقيقية",
    bench: [
      ["سيناريوهات صوتية (12 إجمالاً)", "تم اكتشاف جميع سيناريوهات الاحтиال الـ 12"],
      ["نصوص الإنترنت (40 إجمالاً)", "دقة 93.5%، فائت واحد"],
      ["قيود", "النتائج من اختبارات مختبرية، ليس من جهاز حقيقي"]
    ],
    nirTitle: "مسابقة بحثية", nirDesc: "المركز الأول — مرحلة NIR الإقليمية، مسار تكنولوجيا المعلومات. دعوة للنهائيات الوطنية، موسكو، سبتمبر 2026.",
    note: "كل رقم هنا يأتي من تقارير المستودع. ننشر القيود أيضًا — هذا جزء من الثقة."
  },
  simplePt: {
    title: "Pesquisa e Reconhecimento", sub: "Resultados de testes e avaliação de especialistas", badge: "FATOS // NÚMEROS",
    mTitle: "Teste independente do modelo", mSub: "140 registros rotulados manualmente (uma execução)",
    metrics: [["Precisão", "99.3%"], ["Fraude detectado", "100%"], ["Ameaças perdidas", "0"], ["Conjunto", "140 registros, rotulagem manual"]],
    tokTitle: "Como as métricas foram calculadas",
    tokDesc: "As métricas baseiam-se em 140 registros rotulados manualmente (uma execução, sem validação cruzada). Números honestos, sem inflação.",
    benchTitle: "Testes do mundo real",
    bench: [
      ["Cenários de voz (12 total)", "Todos os 12 cenários de fraude detectados"],
      ["Textos da internet (40 total)", "93.5% de precisão, uma falha"],
      ["Limitação", "Resultados de testes laboratoriais, não de dispositivo real"]
    ],
    nirTitle: "Competição de pesquisa", nirDesc: "1º lugar — etapa regional NIR, área de Tecnologia da Informação. Convite para a final nacional, Moscou, setembro de 2026.",
    note: "Todo número aqui vem de relatórios do repositório. Publicamos limitações também — isso é parte da confiança."
  },
  simpleFr: {
    title: "Recherche et Reconnaissance", sub: "Résultats de tests et évaluation d'experts", badge: "FAITS // CHIFFRES",
    mTitle: "Test indépendant du modèle", mSub: "140 journaux étiquetés manuellement (une exécution)",
    metrics: [["Précision", "99.3%"], ["Fraude détectée", "100%"], ["Menaces manquées", "0"], ["Ensemble", "140 journaux, étiquetage manuel"]],
    tokTitle: "Comment les métriques ont été calculées",
    tokDesc: "Les métriques reposent sur 140 journaux étiquetés manuellement (une exécution, pas de validation croisée). Chiffres honnêtes, sans gonflage.",
    benchTitle: "Tests en conditions réelles",
    bench: [
      ["Scénarios vocaux (12 au total)", "Les 12 scénarios de fraude détectés"],
      ["Textes internet (40 au total)", "93.5% de précision, une manquée"],
      ["Limitation", "Résultats de tests en laboratoire, pas sur un appareil réel"]
    ],
    nirTitle: "Compétition de recherche", nirDesc: "1er prix — étape régionale NIR, parcours Technologies de l'Information. Invitation à la finale nationale, Moscou, septembre 2026.",
    note: "Chaque chiffre ici provient de rapports du dépôt. Nous publions aussi les limitations — c'est partie de la confiance."
  },
  simpleDe: {
    title: "Forschung und Anerkennung", sub: "Testergebnisse und Expertenbewertung", badge: "FAKTA // ZAHLEN",
    mTitle: "Unabhängiger Modelltest", mSub: "140 manuell gekennzeichnete Logs (einfacher Durchlauf)",
    metrics: [["Genauigkeit", "99.3%"], ["Erkannter Betrug", "100%"], ["Verpasste Bedrohungen", "0"], ["Datensatz", "140 Logs, manuell gekennzeichnet"]],
    tokTitle: "Wie die Metriken berechnet wurden",
    tokDesc: "Die Metriken basieren auf 140 manuell gekennzeichneten Logs (einfacher Durchlauf, kein Cross-Validation). Ehrliche Zahlen, keine Aufblähung.",
    benchTitle: "Tests aus der Praxis",
    bench: [
      ["Sprachszenarien (12 gesamt)", "Alle 12 Betrugsszenarien erkannt"],
      ["Internet-Texte (40 gesamt)", "93,5% Genauigkeit, eine Verfehlung"],
      ["Einschränkung", "Ergebnisse aus Labortests, nicht auf einem echten Gerät"]
    ],
    nirTitle: "Forschungswettbewerb", nirDesc: "1. Platz — regionale NIR-Etappe, IT-Spurrunde. Einladung zum nationalen Finale, Moskau, September 2026.",
    note: "Jede Zahl hier stammt aus Repository-Berichten. Wir veröffentlichen auch Einschränkungen — das ist Teil des Vertrauens."
  },
  simpleJa: {
    title: "研究と評価", sub: "テスト結果と専門家の評価", badge: "事実 // 数値",
    mTitle: "独立したモデルテスト", mSub: "140件の手動ラベル付きログ（1回の実行）",
    metrics: [["精度", "99.3%"], ["詐欺検出率", "100%"], ["漏れ", "0"], ["データセット", "140件のログ、手動ラベル"]],
    tokTitle: "指標の計算方法",
    tokDesc: "指標は140件の手動ラベル付きログに基づいています（1回の実行、交差検証なし）。正直な数字、水増しなし。",
    benchTitle: "実際のテスト",
    bench: [
      ["音声シナリオ（全 12 件）", "12 件の詐欺シナリオすべてを検出"],
      ["インターネットテキスト（全 40 件）", "精度 93.5%、1 件の見落とし"],
      ["制限事項", "実機ではなくラボテストの結果です"]
    ],
    nirTitle: "研究コンペティション", nirDesc: "1 位 — 地区 NIR ステージ、情報技術トラック。全国決勝への招待、モスクワ、2026 年 9 月。",
    note: "ここ のすべての数字はリポジトリレポートから引用しています。制限事項も公開しています — それは信頼の一部です。"
  }
};

const PRIVACY: L = {
  ru: {
    title: "Архитектура приватности", sub: "Данные не покидают устройство — это свойство архитектуры, а не обещание", badge: "PRIVACY BY DESIGN",
    principlesTitle: "Принципы",
    principles: [
      ["Локально по умолчанию", "Все внешние API отключены на уровне сборки (ENABLE_EXTERNAL_APIS=false); ноль телеметрии."],
      ["Минимум собираемого", "Приложение анализирует трафик и текст локально; на серверы не отправляется ничего — включая логи."]
    ],
    storageTitle: "Где и как хранятся данные",
    storage: [
      ["База угроз", "Room под SQLCipher 4.5.7 — файл trustnode_encrypted.db, ключ в памяти, fail-closed при ошибке загрузки."],
      ["Записи звонков", "Только с согласия; хранятся как EncryptedFile (.tnc, AES256-GCM-HKDF), ключи — Keystore/StrongBox."],
      ["Жизненный цикл", "Метаданные угроз автоочищаются каждые 24 часа; ручное удаление верифицирует 30 защищённых хранилищ и 2 базы, затем перезапуск."],
      ["Права субъекта 152-ФЗ", "Экспорт всех данных (ст. 14), исправление (ст. 16), удаление — раздел «Мои данные»."]
    ],
    raspTitle: "Самозащита (RASP) — fail-closed",
    raspDesc: "Проверки подписи APK, root/debugger/Xposed работают по принципу fail-closed: при любой ошибке проверки устройство считается скомпрометированным и доступ блокируется. Лучше ложная блокировка чистого телефона, чем тихая работа под наблюдением.",
    consentTitle: "Голос и согласия",
    consentDesc: "Запись звука звонка начинается только после каскада явных согласий (микрофон → запись вызовов → отдельное биометрическое согласие на обработку голосовых данных, ст. 11 152-ФЗ). Без них голосовые функции просто выключены."
  },
  en: {
    title: "Privacy Architecture", sub: "Data never leaves the device — it's an architectural property, not a promise", badge: "PRIVACY BY DESIGN",
    principlesTitle: "Principles",
    principles: [
      ["Local by default", "All external APIs are disabled at build level (ENABLE_EXTERNAL_APIS=false); zero telemetry."],
      ["Minimal collection", "The app analyzes traffic and text locally; nothing goes to servers — logs included."]
    ],
    storageTitle: "Where data lives and how",
    storage: [
      ["Threat database", "Room under SQLCipher 4.5.7 — trustnode_encrypted.db, key held in memory, fail-closed on load errors."],
      ["Call recordings", "Consent-only; stored as EncryptedFile (.tnc, AES256-GCM-HKDF), keys in Keystore/StrongBox."],
      ["Data lifecycle", "Threat metadata auto-cleans every 24 hours; manual deletion verifies 30 secured stores and 2 databases, then restarts."],
      ["152-FZ data-subject rights", "Export everything (Art. 14), correction (Art. 16), deletion — the \"My Data\" section."]
    ],
    raspTitle: "Self-defense (RASP) — fail-closed",
    raspDesc: "APK signature, root/debugger/Xposed checks are fail-closed: any check error marks the device compromised and blocks access. A false lock of a clean phone beats silent operation under surveillance.",
    consentTitle: "Voice & consents",
    consentDesc: "Call-audio recording starts only after an explicit consent cascade (microphone → call recording → separate biometric consent for voice data processing, Art. 11 of 152-FZ). Without them, voice features are simply off."
  },
  simpleRu: {
    title: "Архитектура приватности", sub: "Ваши данные остаются на телефоне — это главная идея приложения", badge: "ПРИВАТНОСТЬ ПО ДИЗАЙНУ",
    principlesTitle: "Главные принципы",
    principles: [
      ["Работает только на вашем телефоне", "Приложение не отправляет ваши разговоры и переписку никуда. Вся защита работает прямо на устройстве — без интернета и без слежки."],
      ["Собираем минимум", "Всё проверяется на самом телефоне. Мы ничего не отправляем на серверы, даже служебные логи."]
    ],
    storageTitle: "Как хранятся ваши данные",
    storage: [
      ["База угроз", "Список опасных сайтов и номеров хранится в зашифрованном виде на телефоне. Ключ от шифра — только в памяти устройства."],
      ["Записи звонков", "Записываются только с вашего согласия и тоже хранятся зашифрованными на телефоне."],
      ["Очистка", "Лишние служебные данные удаляются сами каждые 24 часа. Удалить всё вручную можно в один тап."],
      ["Ваши права", "Вы можете выгрузить, поправить или удалить свои данные в разделе «Мои данные»."]
    ],
    raspTitle: "Приложение защищает само себя",
    raspDesc: "Если кто-то пытается взломать или подделать приложение, оно просто отключается. Лучше не открыть его на честном телефоне, чем работать под чужим контролем.",
    consentTitle: "Голос и согласия",
    consentDesc: "Запись звонка начинается только после вашего прямого разрешения — на микрофон, на запись и на обработку голоса. Без разрешения голосовые функции выключены."
  },
  simpleEn: {
    title: "Privacy Architecture", sub: "Your data stays on your phone — that's the core idea of the app", badge: "PRIVACY BY DESIGN",
    principlesTitle: "Key principles",
    principles: [
      ["Works only on your phone", "The app never sends your calls and chats anywhere. All protection runs right on the device — no internet needed, no tracking."],
      ["Collects the minimum", "Everything is checked on your phone itself. We send nothing to servers — not even logs."]
    ],
    storageTitle: "How your data is stored",
    storage: [
      ["Threat database", "The list of dangerous sites and numbers is stored encrypted on your phone. The encryption key lives only in the device's memory."],
      ["Call recordings", "Recorded only with your consent and also stored encrypted on the phone."],
      ["Cleanup", "Unneeded service data deletes itself every 24 hours. You can wipe everything manually in one tap."],
      ["Your rights", "You can export, correct, or delete your data in the \"My Data\" section."]
    ],
    raspTitle: "The app protects itself",
    raspDesc: "If someone tries to hack or fake the app, it simply shuts off. Better to not open on an honest phone than to run under someone else's control.",
    consentTitle: "Voice & consents",
    consentDesc: "Call recording starts only after your explicit permission — for the microphone, for recording, and for voice processing. Without permission, voice features stay off."
  }
};

const ICONS: Record<string, any> = { cpu: Cpu, mic: Mic, link: Link2, qr: QrCode, lock: Lock, eye: Eye, filecheck: FileCheck, trash: Trash2 };

function PageShell({ badge, title, sub, children }: any) {
  return (
    <section className="relative w-full py-16 sm:py-20 px-4 bg-[#0A0A0B]">
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#3B82F6]/20 to-transparent pointer-events-none" />
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block font-mono text-[10px] tracking-widest text-[#3B82F6] border border-[#3B82F6]/30 rounded-full px-3 py-1 mb-5">[ {badge} ]</span>
          <h2 className="font-display font-medium text-3xl sm:text-5xl text-[#F5F5F0] tracking-tighter mb-4">{title}</h2>
          <p className="font-sans text-sm sm:text-base text-gray-400">{sub}</p>
        </div>
        {children}
      </div>
    </section>
  );
}

export function FeaturesSection() {
  const { language } = useTranslation();
  const { isSimple } = useDepth();
  const t = isSimple
    ? (T(FEATURES, `simple${language.charAt(0).toUpperCase() + language.slice(1)}`) || T(FEATURES, language))
    : T(FEATURES, language);
  return (
    <PageShell badge={t.badge} title={t.title} sub={t.sub}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {t.cards.map((c: any, i: number) => { const I = ICONS[c.i] || ShieldCheck; return (
          <div key={i} className="rounded-2xl border border-white/[0.06] bg-[#0E0F12] p-5 hover:border-[#3B82F6]/30 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[#12141A] border border-[#3B82F6]/15 flex items-center justify-center mb-4"><I className="w-5 h-5 text-[#3B82F6]" /></div>
            <h3 className="font-medium text-[#F5F5F0] mb-1">{c.t}</h3>
            {c.s && <p className="text-xs font-mono text-gray-500 mb-2">{c.s}</p>}
            <p className="text-sm text-gray-400 leading-relaxed">{c.d}</p>
          </div>
        ); })}
      </div>
      <div className="rounded-2xl border border-amber-500/20 bg-amber-500/[0.03] p-6 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-4 h-4 text-amber-500" />
          <span className="font-mono text-xs tracking-widest text-amber-500">{t.honestBadge}</span>
          <h3 className="font-medium text-[#F5F5F0] ml-2">{t.honestTitle}</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {t.honest.map((h: any, i: number) => (
            <div key={i}><h4 className="text-sm font-medium text-[#F5F5F0] mb-1">{h.t}</h4><p className="text-xs text-gray-400 leading-relaxed">{h.d}</p></div>
          ))}
        </div>
        <p className="mt-4 text-xs text-gray-500 font-mono">{t.compat}</p>
      </div>
      <div className="text-center">
        <a href="https://rustore.ru" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#3B82F6] hover:bg-[#2f6fe0] text-white font-medium transition-colors">
          <ShieldCheck className="w-5 h-5" />{t.cta}
        </a>
      </div>
    </PageShell>
  );
}

export function ResearchSection() {
  const { language } = useTranslation();
  const { isSimple } = useDepth();
  const t = isSimple
    ? (T(RESEARCH, `simple${language.charAt(0).toUpperCase() + language.slice(1)}`) || T(RESEARCH, language))
    : T(RESEARCH, language);
  return (
    <PageShell badge={t.badge} title={t.title} sub={t.sub}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="rounded-2xl border border-white/[0.06] bg-[#0E0F12] p-6">
          <div className="flex items-center gap-2 mb-1"><FlaskConical className="w-4 h-4 text-[#3B82F6]" /><h3 className="font-medium text-[#F5F5F0]">{t.mTitle}</h3></div>
          <p className="text-xs font-mono text-gray-500 mb-4">{t.mSub}</p>
          <div className="w-full overflow-x-auto">
            <table className="w-full text-sm min-w-[320px]"><tbody>
              {t.metrics.map(([k, v]: any, i: number) => (
                <tr key={i} className="border-b border-white/[0.04] last:border-0">
                  <td className="py-2 pr-3 text-gray-400 whitespace-nowrap">{k}</td>
                  <td className="py-2 text-right font-mono text-[#3B82F6] font-semibold">{v}</td>
                </tr>))}
            </tbody></table>
          </div>
        </div>
        <div className="space-y-6">
          <div className="rounded-2xl border border-white/[0.06] bg-[#0E0F12] p-6">
            <h3 className="font-medium text-[#F5F5F0] mb-2">{t.tokTitle}</h3>
            <p className="text-sm text-gray-400 leading-relaxed">{t.tokDesc}</p>
          </div>
          <div className="rounded-2xl border border-white/[0.06] bg-[#0E0F12] p-6">
            <h3 className="font-medium text-[#F5F5F0] mb-3">{t.benchTitle}</h3>
            {t.bench.map(([k, v]: any, i: number) => (
              <div key={i} className="flex justify-between gap-3 py-1.5 border-b border-white/[0.04] last:border-0 text-sm">
                <span className="text-gray-400">{k}</span><span className="font-mono text-[#3B82F6] text-right">{v}</span>
              </div>))}
          </div>
        </div>
      </div>
      <div className="mb-8">
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.03] p-6">
          <div className="flex items-center gap-2 mb-2"><Award className="w-4 h-4 text-emerald-400" /><h3 className="font-medium text-[#F5F5F0]">{t.nirTitle}</h3></div>
          <p className="text-sm text-gray-400 leading-relaxed">{t.nirDesc}</p>
        </div>
      </div>
      <p className="text-center text-xs font-mono text-gray-600">{t.note}</p>
    </PageShell>
  );
}

export function PrivacyArchitectureSection() {
  const { language } = useTranslation();
  const { isSimple } = useDepth();
  const t = isSimple
    ? (T(PRIVACY, `simple${language.charAt(0).toUpperCase() + language.slice(1)}`) || T(PRIVACY, language))
    : T(PRIVACY, language);
  const List = ({ items }: any) => (
    <div className="space-y-4">{items.map(([k, v]: any, i: number) => (
      <div key={i} className="flex gap-4">
        <WifiOff className="w-4 h-4 mt-1 text-[#3B82F6] shrink-0" />
        <div><h4 className="text-sm font-medium text-[#F5F5F0] mb-1">{k}</h4><p className="text-sm text-gray-400 leading-relaxed">{v}</p></div>
      </div>))}</div>
  );
  return (
    <PageShell badge={t.badge} title={t.title} sub={t.sub}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-white/[0.06] bg-[#0E0F12] p-6">
          <h3 className="font-medium text-[#F5F5F0] mb-4">{t.principlesTitle}</h3>
          <List items={t.principles} />
        </div>
        <div className="rounded-2xl border border-white/[0.06] bg-[#0E0F12] p-6">
          <h3 className="font-medium text-[#F5F5F0] mb-4">{t.storageTitle}</h3>
          <List items={t.storage} />
        </div>
        <div className="rounded-2xl border border-white/[0.06] bg-[#0E0F12] p-6">
          <div className="flex items-center gap-2 mb-3"><ShieldCheck className="w-4 h-4 text-[#3B82F6]" /><h3 className="font-medium text-[#F5F5F0]">{t.raspTitle}</h3></div>
          <p className="text-sm text-gray-400 leading-relaxed">{t.raspDesc}</p>
        </div>
        <div className="rounded-2xl border border-white/[0.06] bg-[#0E0F12] p-6">
          <div className="flex items-center gap-2 mb-3"><Mic className="w-4 h-4 text-[#3B82F6]" /><h3 className="font-medium text-[#F5F5F0]">{t.consentTitle}</h3></div>
          <p className="text-sm text-gray-400 leading-relaxed">{t.consentDesc}</p>
        </div>
      </div>
    </PageShell>
  );
}

export default React.memo(function NewPages() { return null; });
