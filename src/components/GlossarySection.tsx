import React from "react";
import { motion } from "motion/react";
import { useTranslation } from "../i18n/LanguageContext";
import { useEcoMode } from "../context/EcoModeContext";
import type { LanguageCode } from "../i18n/languages";
import SectionBadge from "./SectionBadge";
import ScanCard from "./ScanCard";

/* ============================================================================
   GlossarySection — глоссарий антифрод / ML / приватности.
   14 терминов, 11 языков. Данные встроены в компонент.
   ========================================================================== */

interface GlossaryEntry {
  term: string;
  abbr?: string;        // расшифровка аббревиатуры (если term — акроним)
  short: Record<LanguageCode, string>;  // 1–2 предложения, plain language
  technical?: string;   // необязательная техническая строка (показывается только в ru)
  category: GlossaryCategory;
}

type GlossaryCategory = "ml" | "fraud" | "privacy" | "legal";

/* ---- Titles / badges / category labels per language ---- */

const TITLE_BY_LANG: Record<LanguageCode, string> = {
  ru: "Глоссарий",
  en: "Glossary",
  tr: "Sözlük",
  es: "Glosario",
  zh: "术语表",
  hi: "शब्दावली",
  ar: "مسرد",
  pt: "Glossário",
  fr: "Glossaire",
  de: "Glossar",
  ja: "用語集",
};

const BADGE_BY_LANG: Record<LanguageCode, string> = {
  ru: "ГЛОССАРИЙ",
  en: "GLOSSARY",
  tr: "SÖZLÜK",
  es: "GLOSARIO",
  zh: "术语表",
  hi: "शब्दावली",
  ar: "مسرد",
  pt: "GLOSSÁRIO",
  fr: "GLOSSAIRE",
  de: "GLOSSAR",
  ja: "用語集",
};

const SUBTITLE_BY_LANG: Record<LanguageCode, string> = {
  ru: "Ключевые термины антифрод-защиты, машинного обучения и приватности",
  en: "Key terms in anti-fraud protection, machine learning, and privacy",
  tr: "Dolandırıcılık koruması, makine öğrenimi ve gizlilikteki temel terimler",
  es: "Términos clave en protección contra fraude, aprendizaje automático y privacidad",
  zh: "反欺诈保护、机器学习和隐私方面的关键术语",
  hi: "धोखाधड़ी से सुरक्षा, मशीन लर्निंग और गोपनीयता के प्रमुख शब्द",
  ar: "المصطلحات الأساسية في الحماية من الاحتيال والتعلم الآلي والخصوصية",
  pt: "Termos-chave em proteção contra fraude, aprendizado de máquina e privacidade",
  fr: "Termes clés en protection contre la fraude, apprentissage automatique et confidentialité",
  de: "Schlüsselbegriffe zum Betrugsschutz, maschinellem Lernen und Datenschutz",
  ja: "不正詐欺防止、機械学習、プライバシーの主要用語",
};

const CATEGORY_LABELS: Record<GlossaryCategory, Record<LanguageCode, string>> = {
  ml: {
    ru: "Машинное обучение",
    en: "Machine Learning",
    tr: "Makine Öğrenimi",
    es: "Aprendizaje Automático",
    zh: "机器学习",
    hi: "मशीन लर्निंग",
    ar: "التعلم الآلي",
    pt: "Aprendizado de Máquina",
    fr: "Apprentissage Automatique",
    de: "Maschinelles Lernen",
    ja: "機械学習",
  },
  fraud: {
    ru: "Антифрод",
    en: "Anti-Fraud",
    tr: "Dolandırıcılıkla Mücadele",
    es: "Anti-fraude",
    zh: "反欺诈",
    hi: "धोखाधड़ी विरोध",
    ar: "مكافحة الاحتيال",
    pt: "Anti-fraude",
    fr: "Anti-fraude",
    de: "Betrugsbekämpfung",
    ja: "不正詐欺防止",
  },
  privacy: {
    ru: "Приватность",
    en: "Privacy",
    tr: "Gizlilik",
    es: "Privacidad",
    zh: "隐私",
    hi: "गोपनीयता",
    ar: "الخصوصية",
    pt: "Privacidade",
    fr: "Confidentialité",
    de: "Datenschutz",
    ja: "プライバシー",
  },
  legal: {
    ru: "Законодательство",
    en: "Legal",
    tr: "Yasal",
    es: "Legal",
    zh: "法律",
    hi: "कानूनी",
    ar: "قانوني",
    pt: "Jurídico",
    fr: "Juridique",
    de: "Rechtliches",
    ja: "法規制",
  },
};

/* ---- Glossary entries (14 terms, all 11 languages) ---- */

const GLOSSARY: GlossaryEntry[] = [
  // — ML —
  {
    term: "RASP",
    abbr: "Runtime Application Self-Protection",
    short: {
      ru: "Технология, которая защищает приложение в реальном времени, анализируя его поведение прямо во время выполнения.",
      en: "Technology that protects an application in real time by analyzing its behavior during execution.",
      tr: "Uygulamanın çalışma zamanında davranışını analiz ederek gerçek zamanlı koruma sağlayan teknoloji.",
      es: "Tecnología que protege una aplicación en tiempo real analizando su comportamiento durante la ejecución.",
      zh: "在应用程序运行时通过分析其行为来实时保护应用的技术。",
      hi: "अनुप्रयोग के निष्पादन के दौरान उसके व्यवहार का विश्लेषण करके वास्तविक समय में सुरक्षा प्रदान करने वाली तकनीक।",
      ar: "تقنية تحمي التطبيق في الوقت الفعلي بتحليل سلوكه أثناء التنفيذ.",
      pt: "Tecnologia que protege um aplicativo em tempo real analisando seu comportamento durante a execução.",
      fr: "Technologie qui protège une application en temps réel en analysant son comportement pendant l'exécution.",
      de: "Technologie, die eine Anwendung in Echtzeit schützt, indem sie ihr Verhalten während der Ausführung analysiert.",
      ja: "アプリケーションの実行中に動作を分析し、リアルタイムで保護する技術。",
    },
    technical: "Встраивается в runtime приложения; блокирует эксплойты без сигнатур.",
    category: "ml",
  },
  {
    term: "ONNX",
    abbr: "Open Neural Network Exchange",
    short: {
      ru: "Открытый формат для обмена моделями машинного обучения между разными фреймворками (PyTorch, TensorFlow и др.).",
      en: "Open format for exchanging machine learning models between different frameworks (PyTorch, TensorFlow, etc.).",
      tr: "Farklı yapay zeka çerçeveleri arasında makine öğrenimi modellerini paylaşmak için kullanılan açık format.",
      es: "Formato abierto para intercambiar modelos de aprendizaje automático entre diferentes frameworks.",
      zh: "用于在不同机器学习框架（如 PyTorch、TensorFlow 等）之间交换模型的开放格式。",
      hi: "विभिन्न फ्रेमवर्क (PyTorch, TensorFlow आदि) के बीच ML मॉडल साझा करने के लिए खुला प्रारूप।",
      ar: "صيغة مفتوحة لتبادل نماذج التعلم الآلي بين أطر عمل مختلفة.",
      pt: "Formato aberto para trocar modelos de aprendizado de máquina entre diferentes frameworks.",
      fr: "Format ouvert pour échanger des modèles d'apprentissage automatique entre différents frameworks.",
      de: "Offenes Austauschformat für ML-Modelle zwischen verschiedenen Frameworks.",
      ja: "PyTorch、TensorFlowなどの異なるフレームワーク間でMLモデルを交換するためのオープンフォーマット。",
    },
    technical: "TrustNode экспортирует ONNX INT8 (динамическая квантизация) для on-device инференса.",
    category: "ml",
  },
  {
    term: "RMS",
    abbr: "Root Mean Square",
    short: {
      ru: "Статистическая мера «средней» амплитуды сигнала. В аудиоанализе показывает громкость звука.",
      en: "A statistical measure of a signal's average amplitude. In audio analysis it represents the loudness of sound.",
      tr: "Bir sinyalin ortalama genliğinin istatistiksel ölçümü. Ses analizinde sesin yüksekliğini gösterir.",
      es: "Medida estadística de la amplitud promedio de una señal. En análisis de audio representa el volumen del sonido.",
      zh: "信号平均幅度的统计度量。在音频分析中表示声音的响度。",
      hi: "संकेत की औसत आयाम का सांख्यिकीय माप। ऑडियो विश्लेषण में ध्वनि की आवाज़ को दर्शाता है।",
      ar: "مقياس إحصائي لمتوسط سعة الإشارة. في تحليل الصوت يمثل مستوى صوت الصوت.",
      pt: "Medida estatística da amplitude média de um sinal. Na análise de áudio representa o volume do som.",
      fr: "Mesure statistique de l'amplitude moyenne d'un signal. En analyse audio, elle représente le volume sonore.",
      de: "Statistische Maßzahl der mittleren Amplitude eines Signals. In der Audioanalyse zeigt sie die Lautstärke.",
      ja: "信号の平均振幅の統計的尺度。音声分析では音量を表す。",
    },
    technical: "RMS-энергия аудиофрагмента используется для обнаружения аномалий в голосовых каналах.",
    category: "ml",
  },
  {
    term: "ZCR",
    abbr: "Zero Crossing Rate",
    short: {
      ru: "Как часто аудиосигнал пересекает нулевую линию. Высокий ZCR может указывать на шум или подмену.",
      en: "How often an audio signal crosses the zero line. A high ZCR can indicate noise or audio spoofing.",
      tr: "Bir ses sinyalinin sıfır çizgisini kaç kez kestiği. Yüksek ZCR gürültü veya ses sahteciliğini gösterebilir.",
      es: "Frecuencia con la que una señal de audio cruza la línea cero. Un ZCR alto puede indicar ruido o suplantación de audio.",
      zh: "音频信号穿过零线的频率。高 ZCR 可能表示噪声或音频伪造。",
      hi: "ऑडियो सिग्नल शून्य रेखा को कितनी बार पार करता है। उच्च ZCR शोर या ऑडियो स्पूफिंग का संकेत हो सकता है।",
      ar: "عدد مرات عبور إشارة الصوت لخط الصفر. قد يشير ZCR العالي إلى الضوضاء أو التزوير الصوتي.",
      pt: "Frequência com que um sinal de áudio cruza a linha zero. Um ZCR alto pode indicar ruído ou falsificação de áudio.",
      fr: "Fréquence à laquelle un signal audio traverse la ligne zéro. Un ZCR élevé peut indiquer du bruit ou une falsification audio.",
      de: "Wie oft ein Audiosignal die Nulllinie kreuzt. Ein hoher ZCR kann auf Rauschen oder Audio-Spoofing hindeuten.",
      ja: "オーディオ信号がゼロ線を通過する頻度。高いZCRはノイズやオーディオ偽装を示す可能性がある。",
    },
    technical: "ZCR-признак в паре с RMS повышает точность детекции deepfake-голоса.",
    category: "ml",
  },
  {
    term: "ECHO",
    short: {
      ru: "Внутренний пайплайн TrustNode: сбор аудио → RMS + ZCR + MFCC → ruBERT-классификатор → решение.",
      en: "TrustNode's internal pipeline: audio capture → RMS + ZCR + MFCC → ruBERT classifier → decision.",
      tr: "TrustNode dahili hattı: ses yakalama → RMS + ZCR + MFCC → ruBERT sınıflandırıcı → karar.",
      es: "Pipeline interno de TrustNode: captura de audio → RMS + ZCR + MFCC → clasificador ruBERT → decisión.",
      zh: "TrustNode 内部管线：音频采集 → RMS + ZCR + MFCC → ruBERT 分类器 → 判定。",
      hi: "TrustNode की आंतरिक पाइपलाइन: ऑडियो कैप्चर → RMS + ZCR + MFCC → ruBERT क्लासिफायर → निर्णय।",
      ar: "الخط الداخلي لـ TrustNode: التقاط الصوت → RMS + ZCR + MFCC → مصنف ruBERT → القرار.",
      pt: "Pipeline interno do TrustNode: captação de áudio → RMS + ZCR + MFCC → classificador ruBERT → decisão.",
      fr: "Pipeline interne de TrustNode : capture audio → RMS + ZCR + MFCC → classificateur ruBERT → décision.",
      de: "TrustNode-interner Pipeline: Audio-Erfassung → RMS + ZCR + MFCC → ruBERT-Klassifikator → Entscheidung.",
      ja: "TrustNodeの内部パイプライン：音声キャプチャ → RMS + ZCR + MFCC → ruBERT分類器 → 判断。",
    },
    technical: "ECHO = Engine for Channel Hazard Observation. Имя пайплайна, не акроним протокола.",
    category: "ml",
  },
  // — Fraud —
  {
    term: "Spoofing",
    short: {
      ru: "Подмена Caller ID или другого идентификатора, чтобы звонок выглядел как вызов от доверенного номера.",
      en: "Spoofing the Caller ID or another identifier to make a call appear to come from a trusted number.",
      tr: "Bir aramanın güvenilir bir numaradan geliyormuş gibi görünmesi için Arayan Kimliği'ni taklit etmek.",
      es: "Falsificar el Caller ID u otro identificador para que una llamada parezca provenir de un número confiable.",
      zh: "伪造来电显示或其他标识，使通话看起来来自可信号码。",
      hi: "कॉलर आईडी या किसी अन्य पहचानकर्ता को नकली बनाकर कॉल को विश्वसनीय नंबर से आने वाला दिखाना।",
      ar: "تزوير معرف المتصل أو معرّف آخر لجعل المكالمة تبدو قادمة من رقم موثوق.",
      pt: "Falsificar o Caller ID ou outro identificador para fazer uma chamada parecer vir de um número confiável.",
      fr: "Usurper l'identité de l'appelant ou un autre identifiant pour faire croire qu'un appel provient d'un numéro de confiance.",
      de: "Caller-ID oder einen anderen Bezeichner fälschen, um einen Anruf als Vertrauensanruf erscheinen zu lassen.",
      ja: "通話相手のIDやその他の識別情報を偽装し、信頼できる番号からの呼び出しのように見せかけること。",
    },
    technical: "TrustNode определяет spoofing по несоответствию SIM-записи и SIP-заголовков.",
    category: "fraud",
  },
  {
    term: "Phishing",
    short: {
      ru: "Массовая рассылка поддельных писем или сообщений с целью украсть пароли, номера карт или личные данные.",
      en: "Mass-sending fake emails or messages to steal passwords, card numbers, or personal data.",
      tr: "Şifreleri, kart numaralarını veya kişisel verileri çalmak için sahte e-posta veya mesaj göndermek.",
      es: "Envío masivo de correos o mensajes falsos para robar contraseñas, números de tarjeta o datos personales.",
      zh: "大量发送伪造邮件或消息，以窃取密码、银行卡号或个人数据。",
      hi: "पासवर्ड, कार्ड नंबर या व्यक्तिगत डेटा चुराने के लिए नकली ईमेल या संदेशों का बड़े पैमाने पर भेजना।",
      ar: "إرسال رسائل بريد إلكتروني أو رسائل مزيفة بشكل جماعي لسرقة كلمات المرور أو أرقام البطاقات أو البيانات الشخصية.",
      pt: "Envio em massa de e-mails ou mensagens falsas para roubar senhas, números de cartão ou dados pessoais.",
      fr: "Envoi massif de faux e-mails ou messages pour voler des mots de passe, numéros de carte ou données personnelles.",
      de: "Massenversand gefälschter E-Mails oder Nachrichten zum Stehlen von Passwörtern, Kartennummern oder persönlichen Daten.",
      ja: "パスワード、カード番号、個人情報を盗むために偽のメールやメッセージを大量送信すること。",
    },
    technical: "TrustNode анализирует ссылки и заголовки в реальном времени; модель выдаёт phishing-score.",
    category: "fraud",
  },
  {
    term: "Vishing",
    short: {
      ru: "Голосовой фишинг — телефонные звонки, в которых мошенник притворяется работником банка, полиции и т. д.",
      en: "Voice phishing — phone calls where a scammer pretends to be a bank employee, police officer, etc.",
      tr: "Sesli dolandırıcılık — telefon görüşmelerinde dolandırıcının banka çalışanı, polis memuru gibi davranması.",
      es: "Vishing — llamadas telefónicas donde el estafador finge ser un empleado de banco, policía, etc.",
      zh: "语音钓鱼 — 诈骗者在电话中假装是银行员工、警察等进行的电话诈骗。",
      hi: "विशिंग — फ़ोन कॉल जहाँ धोखेबाज़ बैंक कर्मचारी, पुलिस अधिकारी आदि बनकर बात करता है।",
      ar: "التصيد الصوتي — مكالمات هاتفية يتظاهر فيها المحتال بأنه موظف بنك أو ضابط شرطة.",
      pt: "Vishing — chamadas telefônicas onde o golpista finge ser funcionário de banco, policial, etc.",
      fr: "Vishing — appels téléphoniques où l'arnaqueur se fait passer pour un employé de banque, policier, etc.",
      de: "Vishing — Telefonanrufe, bei denen Betrüger sich als Bankmitarbeiter, Polizist usw. ausgeben.",
      ja: "ヴィッシング — 詐欺師が銀行員や警察官などになりすまして行う電話フィッシング。",
    },
    technical: "ECHO-пайплайн анализирует тональность, темп и эмоциональное давление голоса.",
    category: "fraud",
  },
  {
    term: "Smishing",
    short: {
      ru: "Фишинг через SMS — короткие сообщения с вредоносными ссылками или просьбой перезвонить.",
      en: "Phishing via SMS — short messages with malicious links or a request to call back.",
      tr: "SMS dolandırıcılığı — zararlı bağlantılara sahip kısa mesajlar veya geri arama talebi.",
      es: "Smishing — phishing por SMS: mensajes cortos con enlaces maliciosos o solicitud de devolver la llamada.",
      zh: "短信钓鱼 — 通过短信发送带有恶意链接或要求回电的短消息。",
      hi: "स्मिशिंग — SMS के माध्यम से फ़िशिंग: हानिकारक लिंक या कॉल बैक अनुरोध वाले छोटे संदेश।",
      ar: "التصيد عبر الرسائل القصيرة — رسائل قصيرة تحتوي على روابط ضارة أو طلب إعادة الاتصال.",
      pt: "Smishing — phishing via SMS: mensagens curtas com links maliciosos ou pedido para ligar de volta.",
      fr: "Smishing — phishing par SMS : courts messages avec des liens malveillants ou une demande de rappel.",
      de: "Smishing — Phishing per SMS: kurze Nachrichten mit schädlichen Links oder Rückrufaufforderung.",
      ja: "スミッシング — 悪意のあるリンクや折り返し電話の依頼を含む短いSMSメッセージによるフィッシング。",
    },
    technical: "TrustNode проверяет URL-токены в SMS и сверяет с базами фишинговых доменов.",
    category: "fraud",
  },
  {
    term: "SIM Swap",
    short: {
      ru: "Мошенник оформляет новую SIM-карту на имя жертвы, перехватывая SMS-коды двухфакторной аутентификации.",
      en: "A fraudster obtains a new SIM card in the victim's name, intercepting SMS two-factor authentication codes.",
      tr: "Dolandırıcının mağdur adına yeni bir SIM kart alarak iki faktörlü SMS doğrulama kodlarını ele geçirmesi.",
      es: "El estafador obtiene una nueva SIM a nombre de la víctima, interceptando códigos de autenticación SMS.",
      zh: "诈骗者以受害者名义办理新 SIM 卡，拦截短信双因素验证码。",
      hi: "धोखेबाज़ पीड़ित के नाम पर नई SIM कार्ड प्राप्त करके SMS दो-कारक प्रमाणीकरण कोड इंटरसेप्ट करता है।",
      ar: "احتيال تبديل بطاقة SIM — حيث يحصل المحتال على بطاقة SIM جديدة باسم الضحية لاعتراض أكواد التحقق الثنائية.",
      pt: "Troca de SIM — o fraudador obtém um novo cartão SIM no nome da vítima, interceptando códigos de autenticação SMS.",
      fr: "SIM Swap — l'arnaquer obtient une nouvelle carte SIM au nom de la victime, interceptant les codes SMS à deux facteurs.",
      de: "SIM Swap — Betrüger beantragt eine neue SIM-Karte auf den Namen des Opfers und fängt SMS-2FA-Codes ab.",
      ja: "SIMスワップ — 詐欺師が被害者の名前で新しいSIMカードを取得し、SMSの二要素認証コードを傍受する。",
    },
    technical: "TrustNode определяет аномалии переноса номера по метаданным вызова и геолокации.",
    category: "fraud",
  },
  {
    term: "Deepfake Voice",
    short: {
      ru: "Искусственно сгенерированный голос с помощью ИИ, который точно имитирует речь реального человека.",
      en: "AI-generated voice that closely imitates a real person's speech patterns.",
      tr: "Yapay zeka tarafından üretilen ve gerçek bir kişinin konuşma tarzını birebir taklit eden ses.",
      es: "Voz generada por IA que imita fielmente el patrón de habla de una persona real.",
      zh: "利用 AI 生成的声音，精确模仿真人说话模式。",
      hi: "AI द्वारा उत्पन्न आवाज़ जो वास्तविक व्यक्ति की बोलने की शैली की सटीक नकल करती है।",
      ar: "صوت مولّد بالذكاء الاصطناعي يحاكي بدقة أنماط كلام شخص حقيقي.",
      pt: "Voz gerada por IA que imita fielmente o padrão de fala de uma pessoa real.",
      fr: "Voix générée par l'IA qui imite fidèlement les schémas de parole d'une vraie personne.",
      de: "KI-generierte Stimme, die die Sprachmuster einer realen Person genau nachahmt.",
      ja: "AIによって生成された、本物の人物の話し方を正確に模倣した音声。",
    },
    technical: "Детекция через ZCR-дисперсию, RMS-профиль и CNN-эмбеддинги аудио.",
    category: "fraud",
  },
  // — Privacy —
  {
    term: "On-Device Inference",
    short: {
      ru: "Обработка данных и вывод модели происходят прямо на устройстве пользователя, без отправки на сервер.",
      en: "Data processing and model inference happen directly on the user's device without sending data to a server.",
      tr: "Veri işleme ve model çıkışı doğrudan kullanıcının cihazında gerçekleşir, sunucuya veri gönderilmez.",
      es: "El procesamiento de datos e inferencia del modelo ocurren directamente en el dispositivo del usuario sin enviar datos a un servidor.",
      zh: "数据处理和模型推理直接在用户设备上进行，无需将数据发送到服务器。",
      hi: "डेटा प्रसंस्करण और मॉडल अनुमान उपयोगकर्ता के डिवाइस पर सीधे होते हैं, सर्वर पर डेटा नहीं भेजा जाता।",
      ar: "معالجة البيانات واستدلال النموذج تحدث مباشرة على جهاز المستخدم دون إرسال البيانات إلى الخادم.",
      pt: "O processamento de dados e a inferência do modelo ocorrem diretamente no dispositivo do usuário sem enviar dados a um servidor.",
      fr: "Le traitement des données et l'inférence du modèle se font directement sur l'appareil de l'utilisateur sans envoyer de données à un serveur.",
      de: "Datenverarbeitung und Modellinferenz finden direkt auf dem Gerät des Nutzers statt, ohne Daten an einen Server zu senden.",
      ja: "データ処理とモデル推論はユーザーデバイス上で直接行われ、サーバーにデータを送信しません。",
    },
    technical: "TrustNode использует ONNX Runtime (CPU) — никаких сетевых запросов при анализе.",
    category: "privacy",
  },
  {
    term: "End-to-End Encryption",
    short: {
      ru: "Данные шифруются на устройстве отправителя и расшифровываются только на устройстве получателя.",
      en: "Data is encrypted on the sender's device and decrypted only on the recipient's device.",
      tr: "Veriler gönderenin cihazında şifrelenir ve yalnızca alıcının cihazında çözülür.",
      es: "Los datos se cifran en el dispositivo del remitente y se descifran solo en el dispositivo del destinatario.",
      zh: "数据在发送方设备上加密，仅在接收方设备上解密。",
      hi: "डेटा प्रेषक के डिवाइस पर एन्क्रिप्ट होता है और केवल प्राप्तकर्ता के डिवाइस पर डिक्रिप्ट होता है।",
      ar: "تشفير من طرف إلى طرف — البيانات مشفرة على جهاز المرسل وفقط المستلم يفك تشفيرها.",
      pt: "Os dados são criptografados no dispositivo do remetente e descriptografados apenas no dispositivo do destinatário.",
      fr: "Les données sont chiffrées sur l'appareil de l'expéditeur et déchiffrées uniquement sur l'appareil du destinataire.",
      de: "Daten werden auf dem Gerät des Absenders verschlüsselt und nur auf dem Gerät des Empfängers entschlüsselt.",
      ja: "データは送信者デバイスで暗号化され、受信者デバイスでのみ復号化される。",
    },
    technical: "Signal-протокол (X3DH + Double Ratchet) для обмена сообщениями.",
    category: "privacy",
  },
  // — Legal —
  {
    term: "152-FZ",
    short: {
      ru: "Федеральный закон №152-ФЗ «О персональных данных» — основной российский закон о защите персональных данных.",
      en: "Federal Law No. 152-FZ \"On Personal Data\" — Russia's main law on personal data protection.",
      tr: "Federal Yasa No. 152-FZ \"Kişisel Veriler Hakkında\" — Rusya'nın kişisel verilerin korunmasına ilişkin temel yasası.",
      es: "Ley Federal N.º 152-FZ \"Sobre Datos Personales\" — la ley principal de Rusia sobre protección de datos personales.",
      zh: "联邦法律第 152-FZ 号《个人数据法》— 俄罗斯个人数据保护的主要法律。",
      hi: "संघीय कानून संख्या 152-FZ \"व्यक्तिगत डेटा पर\" — व्यक्तिगत डेटा सुरक्षा पर रूस का मुख्य कानून।",
      ar: "القانون الفيدرالي رقم 152-FZ \"حول البيانات الشخصية\" — القانون الرئيسي الروسي لحماية البيانات الشخصية.",
      pt: "Lei Federal nº 152-FZ \"Sobre Dados Pessoais\" — principal lei russa sobre proteção de dados pessoais.",
      fr: "Loi fédérale n° 152-FZ \"sur les données personnelles\" — principale loi russe sur la protection des données personnelles.",
      de: "Bundesgesetz Nr. 152-FZ \"Über personenbezogene Daten\" — Russlands Hauptgesetz zum Schutz personenbezogener Daten.",
      ja: "連邦法第152-FZ号「個人データについて」— 個人データ保護に関するロシアの主要法律。",
    },
    technical: "Определяет категории данных, права субъектов, обязанности оператора и условия трансграничной передачи.",
    category: "legal",
  },
];

/* ---- Category ordering ---- */
const CATEGORY_ORDER: GlossaryCategory[] = ["ml", "fraud", "privacy", "legal"];

/* ---- Helper: map category keys to icon symbols (pure text, no emoji) ---- */
const CATEGORY_ICON: Record<GlossaryCategory, string> = {
  ml: "ML",
  fraud: "!",
  privacy: "*",
  legal: "\u00A7", // §
};

/* ---- Render ---- */

export default function GlossarySection() {
  const { language } = useTranslation();
  const { ecoMode } = useEcoMode();

  const badgeText = BADGE_BY_LANG[language] ?? BADGE_BY_LANG.en;
  const titleText = TITLE_BY_LANG[language] ?? TITLE_BY_LANG.en;
  const subtitleText = SUBTITLE_BY_LANG[language] ?? SUBTITLE_BY_LANG.en;

  // Group entries by category
  const grouped: GlossaryEntry[][] = CATEGORY_ORDER.map((cat) =>
    GLOSSARY.filter((e) => e.category === cat),
  ).filter((arr) => arr.length > 0);

  return (
    <section
      className="relative w-full py-16 sm:py-20 px-4 bg-[#070709] overflow-hidden"
      id="glossary"
    >
      {/* subtle radial accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.04)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <SectionBadge variant="pill" label={badgeText} className="mb-6" />
          <h2 className="font-display font-medium text-3xl sm:text-5xl text-[#F5F5F0] tracking-tighter mb-4">
            {titleText}
          </h2>
          <p className="font-sans text-sm text-gray-400 leading-relaxed">
            {subtitleText}
          </p>
        </div>

        {/* Category groups */}
        <div className="flex flex-col gap-10">
          {grouped.map((entries, gi) => {
            const cat = entries[0].category;
            const catLabel = CATEGORY_LABELS[cat]?.[language] ?? CATEGORY_LABELS[cat].en;
            const catKey = `cat-${gi}`;

            return (
              <motion.div
                key={catKey}
                initial={ecoMode ? false : { opacity: 0, y: 16 }}
                whileInView={ecoMode ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.25, delay: gi * 0.04, ease: "easeOut" }}
              >
                {/* Category subheading */}
                <div className="flex items-center gap-3 mb-5">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-[#12141A] border border-[#3B82F6]/10 font-mono text-[10px] font-bold text-[#3B82F6]">
                    {CATEGORY_ICON[cat]}
                  </span>
                  <h3 className="font-mono text-xs font-semibold tracking-wider text-gray-300 uppercase">
                    {catLabel}
                  </h3>
                  <div className="flex-1 h-px bg-white/[0.04]" />
                </div>

                {/* Terms grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {entries.map((entry) => {
                    const termText = entry.abbr
                      ? `${entry.term} \u2014 ${entry.abbr}`
                      : entry.term;
                    const descText =
                      entry.short[language] ?? entry.short.en;
                    const techText = entry.technical ?? "";

                    return (
                      <ScanCard
                        key={entry.term}
                        borderColor="border-white/[0.04]"
                        padding="p-5 sm:p-6"
                      >
                        <h4 className="font-mono text-sm font-bold text-[#2DD4BF] mb-1.5">
                          {termText}
                        </h4>
                        <p className="font-sans text-sm text-gray-300 leading-relaxed mb-2">
                          {descText}
                        </p>
                        {techText ? (
                          <p className="font-mono text-[11px] text-gray-500 leading-relaxed">
                            {techText}
                          </p>
                        ) : null}
                      </ScanCard>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
