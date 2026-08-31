import { useState } from "react";
import { motion } from "motion/react";
import { useTranslation } from "../i18n/LanguageContext";
import { useEcoMode } from "../context/EcoModeContext";
import SectionBadge from "./SectionBadge";
import ScanCard from "./ScanCard";
import type { LanguageCode } from "../i18n/languages";

/* ============================================================================
   ScamQuizSection — «Проверь себя»: 6 сценариев, пользователь выбирает
   правильное действие, получает обратную связь. Безопасный evergreen-контент.
   ========================================================================== */

type ScenarioOption = { text: Record<LanguageCode, string> };
type Scenario = {
  scenario: Record<LanguageCode, string>;
  options: ScenarioOption[];
  correctIndex: number;
  explanation: Record<LanguageCode, string>;
};

const LANG_KEYS: LanguageCode[] = [
  "ru", "en", "tr", "es", "zh", "hi", "ar", "pt", "fr", "de", "ja",
];

const L = (map: Record<LanguageCode, string>, lang: LanguageCode) =>
  map[lang] ?? map.en;

/* ── Static UI strings ─────────────────────────────────────────────────────── */

const BADGE_BY_LANG: Record<LanguageCode, string> = {
  ru: "ПРОВЕРЬ СЕБЯ", en: "TEST YOURSELF", tr: "KENDİNİ DENE",
  es: "PON A PRUEBA", zh: "测试你", hi: "अपनी जाँच करें",
  ar: "اختبر نفسك", pt: "TESTE-SE", fr: "TESTEZ-VOUS",
  de: "SELBSTTEST", ja: "セルフチェック",
};

const TITLE_BY_LANG: Record<LanguageCode, string> = {
  ru: "Распознаешь ли ты мошенника?",
  en: "Can You Spot a Scam?",
  tr: "Bir Dolandırıcıyı Tanır mısınız?",
  es: "¿Puedes Detectar una Estafa?",
  zh: "你能识别骗局吗？",
  hi: "क्या आप धोखेबाज़ को पहचान सकते हैं?",
  ar: "هل تستطيع اكتشاف عملية الاحتيال؟",
  pt: "Você Consegue Identificar uma Golpe?",
  fr: "Savez-vous Repérer une Arnaque ?",
  de: "Erkennen Sie einen Betrug?",
  ja: "詐欺を見破れますか？",
};

const SUBTITLE_BY_LANG: Record<LanguageCode, string> = {
  ru: "6 реальных ситуаций — выбери безопасное действие и узнай, почему.",
  en: "6 real scenarios — pick the safest action and learn why.",
  tr: "6 gerçek senaryo — en güvenli seçimi yapın ve nedenini öğrenin.",
  es: "6 escenarios reales: elige la acción más segura y descubre por qué.",
  zh: "6 个真实场景——选择最安全的做法并了解原因。",
  hi: "6 वास्तविक परिदृश्य — सबसे सुरक्षित कार्रवाई चुनें और जानें क्यों।",
  ar: "6 سيناريوهات حقيقية — اختر الإجراء الأكثر أمانًا واكتشف السبب.",
  pt: "6 cenários reais — escolha a ação mais segura e saiba por quê.",
  fr: "6 scénarios réels — choisissez l\u2019action la plus sûre et découvrez pourquoi.",
  de: "6 reale Szenarien — wählen Sie die sicherste Handlung und erfahren Sie warum.",
  ja: "6 つのリアルなシナリオ — 最も安全な行動を選んで理由を学ぼう。",
};

const PROGRESS_BY_LANG: Record<LanguageCode, string> = {
  ru: "Вопрос", en: "Question", tr: "Soru", es: "Pregunta",
  zh: "问题", hi: "प्रश्न", ar: "سؤال", pt: "Pergunta",
  fr: "Question", de: "Frage", ja: "質問",
};

const OF_BY_LANG: Record<LanguageCode, string> = {
  ru: "из", en: "of", tr: "/", es: "de",
  zh: "/", hi: "/", ar: "من", pt: "de",
  fr: "sur", de: "von", ja: "/",
};

const CORRECT_BY_LANG: Record<LanguageCode, string> = {
  ru: "Правильно!", en: "Correct!", tr: "Doğru!", es: "Correcto!",
  zh: "正确！", hi: "सही!", ar: "صحيح!", pt: "Correto!",
  fr: "Correct !", de: "Richtig!", ja: "正解！",
};

const WRONG_BY_LANG: Record<LanguageCode, string> = {
  ru: "Неправильно", en: "Incorrect", tr: "Yanlış", es: "Incorrecto",
  zh: "不正确", hi: "गलत", ar: "خطأ", pt: "Incorreto",
  fr: "Incorrect", de: "Falsch", ja: "不正解",
};

const NEXT_BTN_BY_LANG: Record<LanguageCode, string> = {
  ru: "Далее", en: "Next", tr: "İleri", es: "Siguiente",
  zh: "下一步", hi: "अगला", ar: "التالي", pt: "Próximo",
  fr: "Suivant", de: "Weiter", ja: "次へ",
};

const RESTART_BTN_BY_LANG: Record<LanguageCode, string> = {
  ru: "Пройти ещё раз", en: "Try Again", tr: "Tekrar Dene", es: "Intentar de Nuevo",
  zh: "再试一次", hi: "पुनः प्रयास करें", ar: "حاول مرة أخرى", pt: "Tentar Novamente",
  fr: "Recommencer", de: "Nochmal", ja: "もう一度",
};

const RESULT_BTN_BY_LANG: Record<LanguageCode, string> = {
  ru: "Результат", en: "Result", tr: "Sonuç", es: "Resultado",
  zh: "结果", hi: "परिणाम", ar: "النتيجة", pt: "Resultado",
  fr: "Résultat", de: "Ergebnis", ja: "結果",
};

const SCORE_TITLE_BY_LANG: Record<LanguageCode, string> = {
  ru: "Ваш результат", en: "Your Score", tr: "Sonucunuz", es: "Tu Puntuación",
  zh: "你的得分", hi: "आपका स्कोर", ar: " نتيجتك", pt: "Sua Pontuação",
  fr: "Votre Score", de: "Ihr Ergebnis", ja: "スコア",
};

const PERFECT_BY_LANG: Record<LanguageCode, string> = {
  ru: "Отлично! Вы отлично разбираетесь в безопасном поведении в сети.",
  en: "Excellent! You have a strong understanding of online safety.",
  tr: "Mükemmel! Çevrimiçi güvenlik konusunda güçlü bir anlayışınız var.",
  es: "¡Excelente! Tienes un sólido conocimiento de seguridad en línea.",
  zh: "优秀！你对网络安全有很强的理解。",
  hi: "उत्कृष्ट! आपकी ऑनलाइन सुरक्षा की समझ बहुत अच्छी है।",
  ar: "ممتاز! لديك فهم قوي لأمان الإنترنت.",
  pt: "Excelente! Você tem um sólido conhecimento de segurança online.",
  fr: "Excellent ! Vous avez une solide compréhension de la sécurité en ligne.",
  de: "Ausgezeichnet! Sie haben ein starkes Verständnis für Internetsicherheit.",
  ja: "素晴らしい！オンラインセキュリティへの理解が深いです。",
};

const GOOD_BY_LANG: Record<LanguageCode, string> = {
  ru: "Хороший результат! Немного практики — и вы будете чувствовать себя увереннее.",
  en: "Good score! A bit more practice and you\u2019ll feel even more confident.",
  tr: "İyi sonuç! Biraz daha pratik yaparsanız kendinizi daha güvende hissedeceksiniz.",
  es: "¡Buen resultado! Un poco más de práctica y te sentirás más seguro.",
  zh: "不错的结果！再多练习一下，你会更加自信。",
  hi: "अच्छा स्कोर! थोड़ा और अभ्यास और आप अधिक आत्मविश्वास महसूस करेंगे।",
  ar: "نتيجة جيدة! مزيد من الممارسة وستشعر بثقة أكبر.",
  pt: "Bom resultado! Um pouco mais de prática e você se sentirá mais confiante.",
  fr: "Bon score ! Un peu plus de pratique et vous vous sentirez plus confiant.",
  de: "Gutes Ergebnis! Mit etwas Übung fühlen Sie sich noch sicherer.",
  ja: "良い結果です！もう少し練習すれば、より自信を感じられるでしょう。",
};

const LOW_BY_LANG: Record<LanguageCode, string> = {
  ru: "Не переживайте — мошенники становятся всё изощрённее. Прочитайте объяснения, и вы уже будете лучше защищены.",
  en: "Don\u2019t worry \u2014 scammers are getting more sophisticated. Read the explanations and you\u2019ll be better protected.",
  tr: "Endişelenmeyin — dolandırıcılar giderek daha sofistike hale geliyor. Açıklamaları okuyun, kendinizi daha iyi koruyacaksınız.",
  es: "No se preocupe — los estafadores son cada vez más sofisticados. Lea las explicaciones y estará mejor protegido.",
  zh: "不用担心——诈骗手段越来越高明。阅读解释后，您会得到更好的保护。",
  hi: "चिंता न करें — धोखेबाज़ और भी चालाक होते जा रहे हैं। व्याख्या पढ़ें, आप बेहतर सुरक्षित रहेंगे।",
  ar: "لا تقلق — المحتالون يصبحون أكثر ذكاءً. اقرأ التفسيرات وستكون محميًا بشكل أفضل.",
  pt: "Não se preocupe — os golpistas estão cada vez mais sofisticados. Leia as explicações e estará mais protegido.",
  fr: "Pas de panique — les arnaqueurs sont de plus en plus sophistiqués. Lisez les explications et vous serez mieux protégé.",
  de: "Keine Sorge — Betrüger werden immer raffinierter. Lesen Sie die Erklärungen, dann sind Sie besser geschützt.",
  ja: "心配しないでください — 詐欺師はますます巧妙になっています。解説を読めば、より良い保護が得られます。",
};

/* ── Scenarios ─────────────────────────────────────────────────────────────── */

const SCENARIOS: Scenario[] = [
  {
    scenario: {
      ru: "Вам звонит «из банка». Спешит: «Вашу карту заблокировали, срочно назовите код из SMS, иначе потеряете деньги!» Голос — как у настоящего сотрудника.",
      en: "Someone calls claiming to be from your bank. They say your card is locked and urgently need the SMS code — or you\u2019ll lose your money. The voice sounds like a real employee.",
      tr: "Sizi \"bankadan\" arayan biri: \"Kartınız bloke edildi, SMS kodunu hemen söyleyin, yoksa paranızı kaybedersiniz!\" sesi gerçekten bir banka çalışanına benziyor.",
      es: "Te llaman supuestamente del banco. Dicen que tu tarjeta está bloqueada y necesitan urgentemente el código SMS. La voz parece la de un empleado real.",
      zh: "有人打电话自称是银行的。说你的卡被锁了，急需短信验证码，否则钱就没了。声音听起来像真正的银行职员。",
      hi: "\"बैंक\" से कॉल आता है। बताया जाता है कि आपका कार्ड ब्लॉक हो गया है और तुरंत SMS कोड बताएं, नहीं तो पैसे डूब जाएंगे! आवाज़ असली कर्मचारी जैसी है।",
      ar: "يتصل بك شخص مدّعي أنه من البنك. يقول إن بطاقتك محظورة ويحتاج كود الرسالة النصية بشكل عاجل — وإلا ستفقد أموالك. الصوت يبدو حقيقياً.",
      pt: "Alguém liga dizendo ser do banco. Alega que seu cartão está bloqueado e precisa urgentemente do código SMS. A voz parece a de um funcionário real.",
      fr: "Quelqu\u2019un vous appelle en se présentant comme votre banque. Votre carte est bloquée, il faut urgentement le code SMS. La voix semble authentique.",
      de: "Jemand ruft an und gibt sich als Bankmitarbeiter aus. Ihre Karte sei gesperrt, der SMS-Code wird dringend gebraucht — sonst verlieren Sie Ihr Geld. Die Stimme klingt echt.",
      ja: "「銀行」から電話がかかってきた。「カードがブロックされました。至急SMSのコードを教えてください。否则お金が失われます！」声は本物の銀行員のように聞こえる。",
    },
    options: [
      { text: { ru: "Назвать код из SMS, чтобы не потерять деньги", en: "Share the SMS code to avoid losing money", tr: "Paranızı kaybetmemek için SMS kodunu paylaşın", es: "Compartir el código SMS para no perder dinero", zh: "告诉对方验证码以免损失钱", hi: "पैसे न खोने के लिए SMS कोड बता दें", ar: "شارك كود الرسالة النصية لتجنب خسارة المال", pt: "Compartilhar o código SMS para não perder dinheiro", fr: "Partager le code SMS pour ne pas perdre d\u2019argent", de: "Den SMS-Code mitteilen, um kein Geld zu verlieren", ja: "お金を失わないようにSMSコードを教える" } },
      { text: { ru: "Положить трубку и позвонить в банк по официальному номеру с карты", en: "Hang up and call your bank back using the number on your card", tr: "Telefonu kapatıp kartınızdaki resmi numaradan bankayı arayın", es: "Colgar y llamar al banco con el número de la tarjeta", zh: "挂断电话，用卡上的官方号码回拨银行", hi: "फ़ोन रख दें और कार्ड पर लिखे आधिकारिक नंबर से बैंक को कॉल करें", ar: "أغلق الخط واتصل بالبنك باستخدام الرقم الرسمي الموجود على بطاقتك", pt: "Desligar e ligar para o banco usando o número do cartão", fr: "Raccrocher et rappeler votre banque avec le numéro de votre carte", de: "Auflegen und die Bank unter der offiziellen Kartennummer zurückrufen", ja: "電話を切って、カード裏面の公式番号に銀行に折り返す" } },
      { text: { ru: "Попросить перезвонить позже и проверить статус карты в приложении банка", en: "Ask them to call back later and check your card status in your banking app", tr: "Daha sonra aramasını isteyin ve banka uygulamanızdan durumu kontrol edin", es: "Pedir que llamen más tarde y verificar el estado en la app del banco", zh: "让对方晚点再打来，然后自己在银行App里查看卡的状态", hi: "बाद में फ़ोन करने को कहें और बैंक ऐप में कार्ड की स्थिति जाँचें", ar: "اطلب الاتصال لاحقاً وتحقق من حالة بطاقتك في تطبيق البنك", pt: "Pedir para ligarem mais tarde e verificar o status no app do banco", fr: "Demander de rappeler plus tard et vérifier le statut dans l\u2019appli bancaire", de: "Zurückrufen bitten und den Kartenstatus in der Banking-App prüfen", ja: "後で折り返すように頼み、銀行アプリでカードの状態を確認する" } },
    ],
    correctIndex: 1,
    explanation: {
      ru: "Банк никогда не просит коды из SMS по телефону. Это классическая схема «фишинга в голосовом формате» (vishing). Всегда кладите трубку и перезванивайте по номеру, который напечатан на обратной стороне вашей карты или на официальном сайте банка.",
      en: "Banks never ask for SMS codes over the phone. This is classic vishing. Always hang up and call back using the number printed on your card or the bank\u2019s official website.",
      tr: "Bankalar asla telefonda SMS kodu istemez. Bu klasik bir vishing (sesli dolandırıcılık) tuzağıdır. Her zaman telefonu kapatın ve kartınızın arkasındaki veya bankanın resmi web sitesindeki numarayı arayın.",
      es: "Los bancos nunca piden códigos SMS por teléfono. Esto es un clásico vishing. Cuelgue siempre y llame usando el número de su tarjeta o la web oficial del banco.",
      zh: "银行绝不会通过电话索要短信验证码。这是典型的语音钓鱼（vishing）。请始终挂断电话，然后用卡背面或银行官网上的号码回拨。",
      hi: "बैंक कभी फ़ोन पर SMS कोड नहीं माँगता। यह क्लासिक vishing (वॉयस फ़िशिंग) है। हमेशा फ़ोन रखें और अपने कार्ड या बैंक की आधिकारिक वेबसाइट पर लिखे नंबर से वापस कॉल करें।",
      ar: "البنوك لا تطلب أكواد الرسائل النصية أبداً عبر الهاتف. هذا احتيال صوتي كلاسيكي.أغل الخط دائماً واتصل بالرقم المكتوب على بطاقتك أو الموقع الرسمي للبنك.",
      pt: "Bancos nunca pedem códigos SMS por telefone. Isso é vishing clássico. Sempre desligue e ligue usando o número do cartão ou o site oficial do banco.",
      fr: "Les banques ne demandent jamais de code SMS par téléphone. C\u2019est du vishing classique. Raccrochez toujours et rappeler avec le numéro de votre carte ou le site officiel de la banque.",
      de: "Banken fordern niemals SMS-Codes am Telefon. Das ist klassischer Vishing. Legen Sie immer auf und rufen Sie unter der Nummer auf Ihrer Karte oder der Bank-Website an.",
      ja: "銀行が電話でSMSコードを求めることはありません。これは典型的なボイスフィッシングです。必ず電話を切り、カード裏面または銀行の公式サイトの番号にかけ直してください。",
    },
  },
  {
    scenario: {
      ru: "Друг прислал ссылку в мессенджере: «Посмотри, какие крутые фото!» Ссылка ведёт на незнакомый сайт с просьбой «войти через ВКонтакте».",
      en: "A friend sends a link in a messenger: \"Check out these cool photos!\" The link leads to an unfamiliar site asking you to \"Log in with VK\" or social account.",
      tr: "Bir arkadaşınız mesajda bir link gönderdi: \"Şu harika fotoğraflara bak!\" Link bilinmeyen bir siteye gidiyor ve \"VK ile giriş yap\" diyor.",
      es: "Un amigo te envía un enlace: \"¡Mira estas fotos increíbles!\" El enlace lleva a un sitio desconocido que te pide \"Iniciar sesión con VK\".",
      zh: "朋友在聊天中发来链接：「看看这些超棒的照片！」链接指向一个陌生网站，要求「通过VK登录」。",
      hi: "एक दोस्त ने मैसेंजर में लिंक भेजा: \"देखो ये कितनी कमाल की फ़ोटो!\" लिंक एक अनजान वेबसाइट पर जाता है जो \"VK से लॉगिन\" माँगता है।",
      ar: "أرسل لك صديق رابط في ماسجر: \"شاهد هذه الصور الرائعة!\" الرابط يقود إلى موقع غير معروف يطلب \"تسجيل الدخول عبر VK\".",
      pt: "Um amigo envia um link no messenger: \"Confira essas fotos incríveis!\" O link leva a um site desconhecido pedindo \"Entrar com VK\".",
      fr: "Un ami vous envoie un lien : \"Regarde ces super photos !\" Le lien mène à un site inconnu demandant de \"Se connecter avec VK\".",
      de: "Ein Freund schickt einen Link: \"Schau dir diese tollen Fotos an!\" Der Link führt zu einer unbekannten Seite, die Sie bitten, sich \"über VK einzuloggen\".",
      ja: "友人がメッセンジャーでリンクを送ってきた。「このクールな写真を見て！」リンクは見慣れないサイトに繋がり、「VKでログイン」と要求している。",
    },
    options: [
      { text: { ru: "Войти через VK — друг же отправил, значит безопасно", en: "Log in with VK — since my friend sent it, it should be safe", tr: "VK ile giriş yapın — arkadaşım gönderdiyse güvendedir", es: "Iniciar sesión con VK — si mi amigo lo envió, debe ser seguro", zh: "通过VK登录——朋友发的，应该安全", hi: "VK से लॉगिन करें — दोस्त ने भेजा है तो सुरक्षित है", ar: "سجّل الدخول عبر VK — صديقي أرسله لذلك آمن", pt: "Entrar com VK — se meu amigo enviou, deve ser seguro", fr: "Se connecter avec VK — c\u2019est mon ami, donc c\u2019est sûr", de: "Sich mit VK einloggen — wenn mein Freund es geschickt hat, ist es sicher", ja: "VKでログイン——友人が送ったから安全のはず" } },
      { text: { ru: "Написать другу (по другому каналу) и спросить, правда ли он отправлял ссылку", en: "Message your friend separately and ask if they really sent that link", tr: "Arkadaşınıza ayrı bir kanaldan yazıp gerçekten o linki gönderip göndermediğini sorun", es: "Escribe a tu amigo por otro canal y pregunta si realmente envió ese enlace", zh: "通过其他方式联系朋友，确认是否真的发送了链接", hi: "दूसरे माध्यम से दोस्त को लिखें और पूछें कि क्या उसने सच में यह लिंक भेजा", ar: "اتصل بصديقك بطريقة أخرى واسأل إن كان قد أرسل هذا الرابط فعلاً", pt: "Entre em contato com seu amigo por outro canal e pergunte se foi ele mesmo", fr: "Contactez votre ami par un autre canal pour vérifier s\u2019il a vraiment envoyé ce lien", de: "Schreiben Sie Ihrem Freund über einen anderen Kanal und fragen Sie, ob er diesen Link wirklich geschickt hat", ja: "別の方法で友人に連絡し、本当にこのリンクを送ったか確認する" } },
      { text: { ru: "Открыть ссылку, но не входить через VK — просто посмотреть", en: "Open the link but don\u2019t log in — just take a look", tr: "Linke tıklayın ama VK ile giriş yapmayın — sadece bir göz atın", es: "Abrir el enlace pero no iniciar sesión — solo mirar", zh: "打开链接但不登录VK——只看看", hi: "लिंक खोलें लेकिन VK से लॉगिन न करें — बस देखें", ar: "افتح الرابط لكن لا تسجّل الدخول — فقط شاهد", pt: "Abrir o link mas não entrar com VK — só dar uma olhada", fr: "Ouvrir le lien sans se connecter — juste regarder", de: "Den Link öffnen, aber nicht einloggen — nur anschauen", ja: "リンクを開くがVKではログインしない——ただ見るとする" } },
    ],
    correctIndex: 1,
    explanation: {
      ru: "Аккаунт друга мог быть взломан. Мошенники массово рассылают ссылки от имени реальных контактов. Прежде чем переходить по ссылке — свяжитесь с другом другим способом (звонок, личная встреча). Никогда не вводите данные для входа на подозрительных сайтах.",
      en: "Your friend\u2019s account may have been hacked. Scammers mass-send links from real accounts. Before clicking, verify with your friend through another channel (call, in person). Never enter login credentials on suspicious sites.",
      tr: "Arkadaşınızın hesabı hacklenmiş olabilir. Dolandırıcılar gerçek hesaplardan toplu link gönderir. Tıklamadan önce arkadaşınızı başka bir kanaldan doğrulayın. Şüpheli sitelere asla giriş bilgisi girmeyin.",
      es: "La cuenta de tu amigo pudo haber sido hackeada. Los estafadores envían enlaces desde cuentas reales. Antes de hacer clic, verifica con tu amigo por otro medio. Nunca ingreses credenciales en sitios sospechosos.",
      zh: "你朋友的账号可能被盗了。骗子会利用真实账号大量发送链接。在点击之前，请通过其他方式（电话、见面）向朋友确认。切勿在可疑网站输入登录信息。",
      hi: "आपके दोस्त का अकाउंट हैक हो सकता है। धोखेबाज़ असली अकाउंट से लिंक भेजते हैं। लिंक पर क्लिक करने से पहले दूसरे माध्यम से पुष्टि करें। संदिग्ध साइटों पर कभी लॉगिन न डालें।",
      ar: "قد يكون حساب صديك قد تم اختراقه. المحتالون يرسلون روابط من حسابات حقيقية. قبل النقر، تحقق مع صديقك بطريقة أخرى. لا تدخل بيانات تسجيل الدخول أبداً في مواقع مشبوهة.",
      pt: "A conta do seu amigo pode ter sido hackeada. Golpistas enviam links de contas reais. Antes de clicar, verifique com seu amigo por outro canal. Nunca insira credenciais em sites suspeitos.",
      fr: "Le compte de votre ami a pu être piraté. Les arnaqueurs envoient des liens depuis de vrais comptes. Avant de cliquer, vérifiez avec votre ami par un autre canal. Ne saisissez jamais vos identifiants sur des sites suspects.",
      de: "Das Konto Ihres Freundes wurde möglicherweise gehackt. Betrüger versenden Links von echten Konten. Klicken Sie nicht, sondern überprüfen Sie über einen anderen Kanal. Geben Sie niemals Anmeldedaten auf verdächtigen Seiten ein.",
      ja: "友人のアカウントがハッキングされた可能性があります。詐欺師は本物のアカウントから大量にリンクを送信します。クリックする前に、別の方法（電話等）で友人に確認してください。怪しいサイトでログイン情報を絶対に入力しないでください。",
    },
  },
  {
    scenario: {
      ru: "Вы ищете квартиру. Нашли отличный вариант на доске объявлений: низкая цена, хорошие фото. Арендодатель просит перевести «задаток» 5 000 руб. на карту, чтобы забронировать, — говорит, что другие тоже присматриваются.",
      en: "You\u2019re looking for an apartment. You found a great deal — low price, nice photos. The landlord asks for a 5,000 ruble deposit via bank transfer to \"reserve\" it, saying others are interested too.",
      tr: "Daire arıyorsunuz. Harika bir ilan buldunuz — düşük fiyat, güzel fotoğraflar. Ev sahibi \"ayırma\" için banka havalesiyle depozito istiyor ve başkalarının da baktığını söylüyor.",
      es: "Buscas un apartamento. Encontraste una gran oferta. El propietario pide un depósito por transferencia bancaria para \"reservar\" el piso, diciendo que otros también están interesados.",
      zh: "你在找房子。看到一个很好的房源：价格低、照片漂亮。房东要求先汇款「定金」5000卢布到他的卡上以「预留」，说还有其他人也在看。",
      hi: "आप घर ढूँढ रहे हैं। एक बढ़िया विकल्प मिला — कम कीमत, अच्छी फ़ोटो। मालिक \"बुकिंग\" के लिए कार्ड में पैसे भेजने को कहता है, कहता है कि दूसरे भी देख रहे हैं।",
      ar: "تبحث عن شقة. وجدت عرضاً رائعاً. المالك يطلب إيداعاً عبر التحويل البنكي ل\"حجز\" الشقة ويقول إن آخرين مهتمون أيضاً.",
      pt: "Você procura um apartamento. Encontrou um ótimo anúncio. O proprietário pede um depósito por transferência para \"reservar\" o imóvel, dizendo que outros estão interessados.",
      fr: "Vous cherchez un appartement. Vous trouvez une super offre. Le propriétaire demande un virement pour \"réserver\" le logement, en disant que d\u2019autres sont intéressés.",
      de: "Sie suchen eine Wohnung. Sie finden ein tolles Angebot. Der Vermieter verlangt eine Überweisung zur \"Reservierung\" und sagt, andere Interessenten stehen bereit.",
      ja: "部屋を探している。素晴らしい物件を見つけた。家賃が安く、写真もきれい。大家は「予約」のために銀行振込で「保証金」を要求し、他にも見てる人がいると言う。",
    },
    options: [
      { text: { ru: "Перевести задаток — жалко упустить такую цену", en: "Send the deposit — it would be a shame to lose such a great price", tr: "Depozitoyu gönderin — bu fiyatı kaçırmak yazık olur", es: "Enviar el depósito — sería una lástima perder este precio", zh: "汇定金——这么好的价格错过了太可惜", hi: "जमा राशि भेज दें — ऐसी कीमत छूटने का दुख होगा", ar: "أرسل الإيداع — من الأسف أن تفوّت هذه السعر", pt: "Enviar o depósito — seria uma pena perder esse preço", fr: "Envoyer l\u2019acompte — dommage de rater ce prix", de: "Die Kaution überweisen — schade, so ein gutes Angebot zu verpassen", ja: "保証金を送る——こんなにいい物件を逃すのはもったいない" } },
      { text: { ru: "Попросить показать квартиру лично и встретиться с собственником перед любыми переводами", en: "Ask to see the apartment in person and meet the landlord before sending any money", tr: "Para göndermeden önce daireyi bizzat görmeyi ve ev sahibiyle buluşmayı isteyin", es: "Pedir ver el apartamento en persona y reunirse con el propietario antes de enviar dinero", zh: "先要求实地看房并与房东见面，确认后再付款", hi: "पैसे भेजने से पहले घर देखने और मालिक से मिलने की माँग करें", ar: "اطلب رؤية الشقة شخصياً والتقابل بالمالك قبل إرسال أي أموال", pt: "Pedir para ver o apartamento pessoalmente e conhecer o proprietário antes de enviar dinheiro", fr: "Demander à visiter l\u2019appartement et rencontrer le propriétaire avant tout virement", de: "Vor einer Zahlung die Wohnung persönlich besichtigen und den Vermieter treffen", ja: "お金を送る前に部屋を実際に見せてもらい、大家に会う" } },
      { text: { ru: "Посмотреть другие варианты на этом же сайте, не связываться с этим", en: "Look for other listings on the same site and avoid this landlord", tr: "Aynı sitede başka ilanlara bakın ve bu ev sahibinden kaçının", es: "Buscar otros anuncios en el mismo sitio y evitar a este propietario", zh: "在这个网站上找其他房源，不跟这个房东打交道", hi: "इसी साइट पर दूसरे विकल्प देखें और इस मालिक से न जुड़ें", ar: "ابحث عن إعلانات أخرى في نفس الموقع وتخلَّ عن هذا المالك", pt: "Procurar outros anúncios no mesmo site e evitar este proprietário", fr: "Chercher d\u2019autres annonces et éviter ce propriétaire", de: "Andere Angebote auf der gleichen Seite suchen und diesen Vermieter meiden", ja: "同じサイトで他の物件を探し、この大家とは関わらない" } },
    ],
    correctIndex: 1,
    explanation: {
      ru: "Перевод денег до личной встречи и осмотра — главный признак мошенничества с арендой. Настоящий арендодатель покажет квартиру. Всегда проверяйте: паспорт собственника, правоустанавливающие документы, сверьте данные через реестр. Не платите за «бронь» незнакомым людям.",
      en: "Transferring money before an in-person viewing is the biggest red flag in rental scams. A real landlord will show the apartment. Always verify ownership documents, check the registry, and never pay for \"reservation\" to strangers.",
      tr: "Görüşme öncesi para transferi kira dolandırıcılığının en büyük alarm sinyalidir. Gerçek ev sahibi daireyi gösterir. Her zaman sahiplik belgelerini doğrulayın ve yabancılara \"rezervasyon\" ücreti ödemeyin.",
      es: "Transferir dinero antes de ver el inmueble es la mayor señal de alarma. Un propietario real mostrará el apartamento. Verifique documentos de propiedad y no pague por \"reservar\" a desconocidos.",
      zh: "看房前就汇款是租房诈骗最大的警示信号。真正的房东会带你实地看房。务必核实产权文件，不要向陌生人支付「预留费」。",
      hi: "घर देखने से पहले पैसे भेजना सबसे बड़ा खतरे का संकेत है। असली मालिक घर दिखाएगा। हमेशा स्वामित्व दस्तावेज़ जाँचें और अनजान लोगों को \"बुकिंग फ़ीस\" न दें।",
      ar: "إرسال الأموال قبل رؤية الشقة هو أكبر علامة تحذيرية. المالك الحقيقي سيُريك الشقة. تحقق دائماً من وثائق الملكية ولا تدفع \"رسوم حجز\" لغرباء.",
      pt: "Enviar dinheiro antes de ver o imóvel é o maior sinal de alerta. Um verdadeiro proprietário mostrará o apartamento. Verifique documentos e não pague \"reserva\" a desconhecidos.",
      fr: "Envoyer de l\u2019argent avant la visite est le plus grand signal d\u2019alarme. Un vrai propriétaire vous montrera l\u2019appartement. Vérifiez toujours les documents et ne payez jamais de \"réserve\" à des inconnus.",
      de: "Geld senden vor der Besichtigung ist das größte Warnsignal. Ein echter Vermieter zeigt die Wohnung. Überprüfen Sie immer Eigentumsurkunden und zahlen Sie nie \"Reservierungsgebühren\" an Fremde.",
      ja: "現地を見る前にお金を送ることは、家賃詐欺最大の警告サインです。本物の大家は部屋を見せます。所有権書類を必ず確認し、見知らぬ人に「予約料」を払わないでください。",
    },
  },
  {
    scenario: {
      ru: "Пришло SMS: «Ваша посылка задержана. Оплатите доставку: bank-link.ru/pay». Сумма — всего 199 руб. Вы не ждёте посылку, но вдруг это та, которую обещал друг?",
      en: "You get a text: \"Your parcel is delayed. Pay delivery fee: bank-link.ru/pay\" — just 199 rubles. You\u2019re not expecting a package, but maybe a friend said they were sending something?",
      tr: "Bir SMS geldi: \"Paketiniz gecikti. Kargo ücretini ödeyin: bank-link.ru/pay\" — sadece 199 ruble. Paket beklemiyorsunuz ama belki bir arkadaş bir şey gönderdiğini söylemişti?",
      es: "Recibes un SMS: \"Tu paquete está retrasado. Paga la entrega: bank-link.ru/pay\" — solo 199 rublos. No esperas un paquete, pero tal vez un amigo dijo que enviaba algo.",
      zh: "收到短信：「您的包裹被扣留了，请支付运费：bank-link.ru/pay」只要199卢布。你没有等包裹，但也许有朋友说要寄东西给你？",
      hi: "SMS आया: \"आपका पार्सल रुक गया है। डिलीवरी शुल्क भरें: bank-link.ru/pay\" — सिर्फ़ 199 रुपये। आप पार्सल नहीं उम्मीद कर रहे, लेकिन शायद किसी दोस्त ने भेजने की बात कही थी?",
      ar: "وصلت رسالة نصية: \"طردك متأخر. ادفع رسوم التوصيل: bank-link.ru/pay\" — 199 روبلا فقط. لا تنتظر طرداً لكن ربما صديقك قال إنه يرسل شيئاً؟",
      pt: "Você recebe um SMS: \"Seu pacote está atrasado. Pague a entrega: bank-link.ru/pay\" — apenas 199 rublos. Você não espera nenhum pacote, mas talvez um amigo disse que estava enviando algo?",
      fr: "Vous recevez un SMS : \"Votre colis est retardé. Payez la livraison : bank-link.ru/pay\" — seulement 199 roubles. Vous n\u2019attendez pas de colis, mais un ami a peut-être dit qu\u2019il envoyait quelque chose ?",
      de: "Sie erhalten eine SMS: \"Ihr Paket ist verzögert. Bezahlen Sie die Lieferung: bank-link.ru/pay\" — nur 199 Rubel. Sie erwarten kein Paket, aber vielleicht schickt ein Freund etwas?",
      ja: "SMSが届いた。「荷物が遅延しています。配送料を支払ってください：bank-link.ru/pay」199ルーブル。荷物は待っていないが、友人が送ると言っていたかも？",
    },
    options: [
      { text: { ru: "Перейти по ссылке и оплатить 199 руб. — жалко, если посылку вернут", en: "Click the link and pay 199 rubles — would be a shame if the parcel gets returned", tr: "Linke tıklayıp 199 rubleyi ödeyin — paket iade edilirse yazık olur", es: "Hacer clic y pagar 199 rublos — sería una pena que devuelvan el paquete", zh: "点击链接支付199卢布——万一包裹被退回就可惜了", hi: "लिंक पर क्लिक करके 199 रुपये भर दें — पार्सल वापस हो गया तो अफ़सोस", ar: "انقر على الرابط وادفع 199 روبلاً — من الأسف أن يُعاد الطرد", pt: "Clicar no link e pagar 199 rublos — seria uma pena se o pacote fosse devolvido", fr: "Cliquer et payer 199 roubles — dommage que le colis soit retourné", de: "Auf den Link klicken und 199 Rubel bezahlen — schade, wenn das Paket zurückgeht", ja: "リンクをクリックして199ルーブルを支払う——荷物が返送されるのはもったいない" } },
      { text: { ru: "Удалить SMS. Если посылка настоящая — отправитель предупредит другим способом", en: "Delete the SMS. If the parcel is real, the sender will notify you another way", tr: "SMS\u2019i silin. Paket gerçekse, gönderen başka bir yolla haberdar eder", es: "Eliminar el SMS. Si el paquete es real, el remitente avisará por otro medio", zh: "删除短信。如果是真的包裹，寄件人会用其他方式通知你", hi: "SMS हटा दें। अगर पार्सल असली है, तो भेजने वाला दूसरे तरीके से बताएगा", ar: "احذف الرسالة. إذا كان الطرد حقيقياً، سيخبرك المرسل بطريقة أخرى", pt: "Excluir o SMS. Se o pacote for real, o remetente avisará de outra forma", fr: "Supprimez le SMS. Si le colis est réel, l\u2019expéditeur vous préviendra autrement", de: "Löschen Sie die SMS. Bei einem echten Paket wird der Absender Sie anderweitig informieren", ja: "SMSを削除する。荷物が本物なら、送り主は別の方法で連絡してくる" } },
      { text: { ru: "Проверить трек-номер на Почте России или в приложении банка — там будут настоящие уведомления", en: "Check the tracking number on the Post of Russia site or your banking app — real notifications appear there", tr: "Takip numarasını Posta sitesinde veya banka uygulamanızda kontrol edin — gerçek bildirimler orada görünür", es: "Verificar el número de seguimiento en el sitio oficial — las notificaciones reales aparecen allí", zh: "去俄罗斯邮政官网或银行App查追踪号——真正的通知会在那里显示", hi: "ट्रैकिंग नंबर रूस की पोस्ट वेबसाइट या बैंक ऐप में जाँचें — असली सूचनाएँ वहाँ दिखेंगी", ar: "تحقق من رقم التتبع في موقع البريد الروسي أو تطبيق البنك — الإشعارات الحقيقية تظهر هناك", pt: "Verificar o código de rastreamento no site dos Correios — as notificações reais aparecem lá", fr: "Vérifiez le numéro de suivi sur le site officiel — les vraies notifications y apparaissent", de: "Prüfen Sie die Sendungsverfolgung auf der Post-Website oder in der Banking-App", ja: "追跡番号をロシア郵便のサイトや銀行アプリで確認——本物の通知はそこに表示される" } },
    ],
    correctIndex: 1,
    explanation: {
      ru: "Это массовая мошенническая рассылка. Ссылка ведёт на фишинговый сайт, который украст данные вашей карты. Настоящая Почта России не отправляет SMS с просьбой оплатить доставку по ссылке. Если у вас есть реальный трек-номер — проверьте его на официальном сайте.",
      en: "This is a mass phishing SMS. The link leads to a phishing site that steals your card data. Real postal services don\u2019t ask you to pay via text link. If you have a real tracking number, check it on the official website.",
      tr: "Bu toplu bir SMS dolandırıcılığıdır. Link kart bilgilerinizi çalan bir phishing sitesine gider. Gerçek posta hizmetleri SMS ile linkle ödeme istemez. Gerçek bir takip numaranız varsa resmi siteden kontrol edin.",
      es: "Es un SMS de phishing masivo. El enlace roba tus datos bancarios. Los servicios postales reales no piden pago por enlace en SMS. Verifica en el sitio oficial.",
      zh: "这是大规模钓鱼短信。链接指向窃取银行卡数据的假网站。真正的邮政服务不会通过短信链接要求付款。如有真实快递单号，请在官网查询。",
      hi: "यह एक बड़ी फ़िशिंग SMS अभियान है। लिंक आपका कार्ड डेटा चुराने वाली साइट पर ले जाता है। असली पोस्टल सेवाएँ SMS लिंक से भुगतान नहीं माँगतीं।",
      ar: "هذه رسالة احتيال جماعية. الرابط يقود إلى موقع يسرق بيانات بطاقتك. خدمات البريد الحقيقية لا تطلب الدفع عبر رابط في رسالة نصية.",
      pt: "É um SMS de phishing em massa. O link rouba seus dados bancários. Serviços postais reais não pedem pagamento via link em SMS. Verifique no site oficial.",
      fr: "C\u2019est un SMS de phishing massif. Le lien vole vos données bancaires. Les services postels ne demandent pas paiement par lien SMS. Vérifiez sur le site officiel.",
      de: "Dies ist eine Massen-Phishing-SMS. Der Link stiehlt Ihre Kartendaten. Echte Postdienste verlangen keine Bezahlung per SMS-Link. Prüfen Sie auf der offiziellen Website.",
      ja: "これは大规模フィッシングSMSです。リンクはカード情報を盗むフィッシングサイトに繋がります。本物の郵便局がSMSリンクで支払いを要求することはありません。",
    },
  },
  {
    scenario: {
      ru: "Звонок с незнакомого номера. «Говорит следователь. Возбуждено уголовное дело, ваш счёт заморожен. Назовите данные паспорта для проверки.» Звучит убедительно, называют ваше имя.",
      en: "A call from an unknown number: \"This is an investigator. A criminal case has been opened and your account is frozen. Give your passport details for verification.\" They sound convincing and know your name.",
      tr: "Bilinmeyen numaradan arama: \"Soruşturmacıyım. Ceza davası açıldı, hesabınız donduruldu. Doğrulama için pasaport bilgilerinizi verin.\" İnandırıcı konuşuyorlar ve adınızı biliyorlar.",
      es: "Llamada de número desconocido: \"Soy investigador. Se abrió un caso criminal y su cuenta está congelada. Dé sus datos de pasaporte para verificación.\" Suenan convincentes y saben su nombre.",
      zh: "陌生号码来电：「我是调查员。已立案调查，您的账户被冻结了。请提供护照信息以供核实。」对方说话很有说服力，还叫得出你的名字。",
      hi: "अज्ञात नंबर से कॉल: \"जाँच अधिकारी बोल रहा हूँ। मामला दर्ज हो गया है, आपका अकाउंट फ्रीज़ हो गया है। सत्यापन के लिए पासपोर्ट डेटा बताएं।\" बहुत भरोसेमंद लगता है, आपका नाम भी जानता है।",
      ar: "اتصال من رقم مجهول: \"هذا محقق. تم فتح قضية جنائية وحسابك مجمد. أعطِ بيانات جواز سفرك للتحقق.\" يوقعون بشكل مقنع ويعرفون اسمك.",
      pt: "Chamada de número desconocido: \"Sou investigador. Um caso criminal foi aberto e sua conta está congelada. Forneça seus dados de passaporte para verificação.\" Parecem convincentes e sabem seu nome.",
      fr: "Appel d\u2019un numéro inconnu : \"Commissaire. Une enquête est ouverte, votre compte est bloqué. Donnez vos données de passeport pour vérification.\" Ils semblent convaincants et connaissent votre nom.",
      de: "Anruf von unbekannter Nummer: „Hier spricht der Ermittler. Ein Strafverfahren wurde eröffnet und Ihr Konto ist gesperrt. Teilen Sie Ihre Passdaten zur Prüfung mit.\" Klingt überzeugend und kennt Ihren Namen.",
      ja: "不明な番号から着信。「捜査官です。刑事事件が立件され、口座が凍結されました。確認のためパスポート情報を教えてください。」很有说服力，还能说出你的名字。",
    },
    options: [
      { text: { ru: "Назвать данные паспорта — это же следователь, отказать нельзя", en: "Provide passport details — it\u2019s an investigator, I can\u2019t refuse", tr: "Pasaport bilgilerini verin — bu bir soruşturmacı, reddedemezsiniz", es: "Dar los datos del pasaporte — es un investigador, no puedo negarme", zh: "提供护照信息——对方是调查员，不能拒绝", hi: "पासपोर्ट डेटा बता दें — ये जाँच अधिकारी हैं, मना नहीं कर सकते", ar: "أعطِ بيانات جواز السفر — هذا محقق، لا يمكنك الرفض", pt: "Fornecer dados do passaporte — é um investigador, não posso recusar", fr: "Donner ses données de passeport — c\u2019est un enquêteur, on ne peut pas refuser", de: "Passdaten mitteilen — es ist ein Ermittler, ich kann nicht ablehnen", ja: "パスポート情報を教える——捜査官だから断れない" } },
      { text: { ru: "Положить трубку. Ни один следователь не запрашивает паспортные данные по телефону — это запрещено.", en: "Hang up. No investigator can request passport data by phone — that\u2019s illegal.", tr: "Telefonu kapatın. Hiçbir soruşturmacı telefonda pasaport bilgisi isteyemez — bu yasağa aykırıdır.", es: "Colgar. Ningún investigador solicita datos de pasaporte por teléfono — es ilegal.", zh: "挂断电话。没有任何调查员会通过电话索要护照信息——这是违法的。", hi: "फ़ोन रख दें। कोई जाँच अधिकारी फ़ोन पर पासपोर्ट डेटा नहीं माँगता — यह ग़ैरक़ानूनी है।", ar: "أغلق الخط. لا يحق لأي محقق طلب بيانات جواز السفر عبر الهاتف — هذا محظور.", pt: "Desligar. Nenhum investigador solicita dados de passaporte por telefone — é ilegal.", fr: "Raccrocher. Aucun enquêteur ne demande des données de passeport par téléphone — c\u2019est illégal.", de: "Auflegen. Kein Ermittler darf Passdaten am Telefon verlangen — das ist illegal.", ja: "電話を切る。捜査官が電話でパスポート情報を要求することはない——違法です。" } },
      { text: { ru: "Попросить перезвонить на номер 112 и назвать номер уголовного дела для проверки", en: "Ask them to call back from 112 and provide the case number for verification", tr: "112\u2019den geri aramalarını ve dava numarasını vermelerini isteyin", es: "Pedir que llamen desde el 112 y proporcionen el número de caso", zh: "要求对方从112打来并提供案件编号以供核实", hi: "112 से वापस कॉल करने और केस नंबर देने को कहें", ar: "اطلب الاتصال من 112 وإعطاء رقم القضية للتحقق", pt: "Pedir que liguem do 112 e forneçam o número do caso", fr: "Demander de rappeler depuis le 112 et fournir le numéro de dossier", de: "Zurückrufen vom 112 und Fallnummer zur Prüfung angeben", ja: "112から折り返すよう頼み、事件番号を教えてもらう" } },
    ],
    correctIndex: 1,
    explanation: {
      ru: "Следователи и сотрудники банка НИКОГДА не запрашивают паспортные данные, коды карт или SMS по телефону. Это уголовное преступление (ст. 159 УК РФ — мошенничество). Мошенники используют скрипты, где знают ваше имя и фамилию — эти данные легко купить в даркнете. Положите трубку и перезвоните на горячую линию банка или по номеру 112.",
      en: "Investigators and bank employees NEVER request passport data, card codes, or SMS codes by phone. That\u2019s a crime. Scammers use scripts with your name — easily bought online. Hang up and call 112 or your bank\u2019s hotline.",
      tr: "Soruşturmacılar ve banka çalışanları asla telefonda pasaport bilgisi, kart kodları veya SMS kodları istemez. Bu suçtur. Dolandırıcılar adınızı bilen senaryolar kullanır — internetten kolayca satın alabilirler. Telefonu kapatın ve 112\u2019yi veya banka hattını arayın.",
      es: "Los investigadores NUNCA solicitan datos de pasaporte o códigos por teléfono. Es un delito. Los estafadores usan scripts con tu nombre — fácilmente comprable. Cuelgue y llame al 112.",
      zh: "调查员和银行员工绝不会通过电话索要护照信息、卡号或验证码。这是犯罪行为。骗子使用含有你姓名的脚本。挂断电话，拨打112或银行客服热线。",
      hi: "जाँच अधिकारी और बैंक कर्मचारी फ़ोन पर कभी पासपोर्ट डेटा या कोड नहीं माँगते। यह अपराध है। धोखेबाज़ आपका नाम जानते हैं — यह डेटा आसानी से मिलता है। फ़ोन रखें और 112 पर कॉल करें।",
      ar: "المحققون والبنوك لا تطلب بيانات جواز السفر أو الأكواد أبداً عبر الهاتف. هذا جريمة. المحتالون يعرفون اسمك من قوائم مسروقة. أغل الخط واتصل على 112.",
      pt: "Investigadores e bancos NUNCA pedem dados de passaporte ou códigos por telefone. É crime. Golpistas usam scripts com seu nome — facilmente obtido. Desligue e ligue 112.",
      fr: "Les enquêteurs ne demandent JAMAIS de données de passeport par téléphone. C\u2019est un délit. Les arnaqueurs utilisent des scripts avec votre nom. Raccrochez et appelez le 112.",
      de: "Ermittler fordern NIE Passdaten am Telefon. Das ist ein Verbrechen. Betrüger nutzen Skripte mit Ihrem Namen. Legen auf und rufen Sie 112 an.",
      ja: "捜査官や銀行員が電話でパスポート情報を要求することはありません。犯罪です。詐欺師はあなたの名前を知ったスクリプトを使います。電話を切って112に電話してください。",
    },
  },
  {
    scenario: {
      ru: "В кафе официант приносит счёт. На столе лежит QR-код со словами «Отсканируйте для оплаты». Код похож на тот, что висит у кассы, но чуть другой — с наклейкой поверх.",
      en: "At a café, the waiter brings the bill. There\u2019s a QR code on the table that says \"Scan to pay.\" It looks similar to the one at the register but slightly different — seems like a sticker placed on top.",
      tr: "Bir kafede garson hesabı getiriyor. Masada \"Ödemek için tarayın\" yazan bir QR kod var. Kasadakine benziyor ama biraz farklı — üzerine yapıştırılmış gibi görünüyor.",
      es: "En un café, el mesero trae la cuenta. Hay un código QR que dice \"Escanear para pagar.\" Parece similar al de la caja pero ligeramente diferente — como una pegatina encima.",
      zh: "在咖啡馆，服务员拿来账单。桌上有个二维码写着「扫码付款」。它看起来和收银台那个很像，但有点不同——像是有人贴了张贴纸在上面。",
      hi: "कैफ़े में वेटर बिल लाता है। मेज़ पर एक QR कोड है जिसपर लिखा है \"भुगतान के लिए स्कैन करें।\" यह कैश काउंटर वाले जैसा दिखता है लेकिन थोड़ा अलग है — जैसे कोई स्टिकर लगाई हो।",
      ar: "في مقهى، يجلب النادل الفاتورة. على الطاولة رمز QR مكتوب عليه \"امسح للدفع\". يبدو مشابهاً للرمز عند الصندوق لكن مختلف قليلاً — كأن ملصقاً فوقه.",
      pt: "Em um café, o garçom traz a conta. Há um QR code na mesa dizendo \"Escaneie para pagar.\" Parece com o da caixa, mas ligeiramente diferente — como uma etiqueta colada por cima.",
      fr: "Au café, l\u2019apporteur d\u2019addition pose un QR code : \"Scannez pour payer.\" Il ressemble à celui de la caisse mais est légèrement différent — comme un autocollant par-dessus.",
      de: "Im Caf\u00E9 bringt der Kellner die Rechnung. Auf dem Tisch liegt ein QR-Code: \u201EScannen zum Bezahlen.\u201C Er sieht \u00E4hnlich wie an der Kasse aus, scheint aber ein Aufkleber dar\u00FCber zu sein.",
      ja: "カフェでウェイターが請求書を持ってきた。テーブルに「スキャンして支払い」と書かれたQRコードがある。レジのものに似ているが、少し違う——上にステッカーが貼られたように見える。",
    },
    options: [
      { text: { ru: "Отсканировать код с телефона и оплатить — удобно", en: "Scan and pay from your phone — convenient", tr: "Telefonunuzla tarayıp ödeme yapın — pratik", es: "Escanear y pagar — es más práctico", zh: "用手机扫码支付——方便", hi: "फ़ोन से स्कैन करके भुगतान करें — सुविधाजनक", ar: "امسح بالهاتف وادفع — مريح", pt: "Escanear e pagar pelo celular — prático", fr: "Scanner et payer depuis votre téléphone — pratique", de: "Mit dem Handy scannen und bezahlen — bequem", ja: "スマホでスキャンして支払い——便利" } },
      { text: { ru: "Попросить официанта принестиPortable-терминал или оплатить наличными — QR-код может быть поддельным", en: "Ask the waiter for a card terminal or pay cash — the QR code could be fake", tr: "Garsondan POS terminalsı isteyin veya nakit ödeyin — sahte QR kod olabilir", es: "Pedir terminal de pago o pagar en efectivo — el QR podría ser falso", zh: "要求服务员拿刷卡机或付现金——二维码可能是假的", hi: "वेटर से पेमेंट टर्मिनल माँगें या कैश दें — QR कोड नकली हो सकता है", ar: "اطلب جهاز الدفع من النادل أو ادفع نقداً — رمز QR قد يكون مزيفاً", pt: "Pedir terminal de pagamento ou pagar em dinheiro — o QR pode ser falso", fr: "Demander un terminal de paiement ou payer en espèces — le QR pourrait être faux", de: "Ein Kartenterminal verlangen oder bar bezahlen — der QR-Code könnte gefälscht sein", ja: "ウェイターにカード決済機を持ってくるよう頼むか現金で支払う——QRコードが偽物かもしれない" } },
      { text: { ru: "Проверить, что URL после сканирования совпадает с официальным сайтом кафе", en: "Verify the URL after scanning matches the café\u2019s official website", tr: "Tarama sonrası URL\u2019nin kafenin resmi web sitesiyle eşleştiğini doğrulayın", es: "Verificar que la URL coincida con el sitio oficial del café", zh: "扫码后检查网址是否与咖啡馆官网一致", hi: "स्कैन के बाद URL जाँचें कि वह कैफ़े की आधिकारिक वेबसाइट से मेल खाता है", ar: "تحقق أن الرابط بعد المسح يتطابق مع الموقع الرسمي للمقهى", pt: "Verificar se a URL corresponde ao site oficial do café", fr: "Vérifier que l\u2019URL correspond au site officiel du café", de: "Prüfen, ob die URL nach dem Scannen mit der offiziellen Café-Website übereinstimmt", ja: "スキャン後にURLがカフェの公式サイトと一致するか確認する" } },
    ],
    correctIndex: 1,
    explanation: {
      ru: "Подмена QR-кодов (quishing) — популярный способ мошенничества: стикер с чужим QR наклеивается поверх настоящего. Оплачивая по такому коду, вы отправляете деньги мошеннику. Всегда лучше попросить терминал или проверить URL после сканирования. Настоящий QR-код не переклеивают.",
      en: "QR code swapping (quishing) is a popular scam: a fake sticker is placed over the real code. Paying through it sends your money to scammers. Always ask for a card terminal or verify the URL after scanning.",
      tr: "QR kod değiştirme (quishing) yaygın bir dolandırıcılık yöntemi: sahte etiket gerçek kodun üzerine yapıştırılır. Böylece ödediğiniz para dolandırıcıya gider. Her zaman POS terminali isteyin veya URL\u2019yi doğrulayın.",
      es: "La sustitución de códigos QR (quishing) es un fraude común. Siempre pida terminal o verifique la URL. Un QR real no se pega encima de otro.",
      zh: "替换二维码（quishing）是常见的诈骗手法：假贴纸覆盖真码。通过假码付款会把钱转给骗子。建议要求刷卡机或扫码后验证网址。",
      hi: "QR कोड बदलना (quishing) एक आम धोखाधड़ी है: असली कोड पर नकली स्टिकर लगा दिया जाता है। हमेशा टर्मिनल माँगें या URL जाँचें।",
      ar: "تبديل رموز QR (quishing) احتيال شائع: ملصق مزيف يُوضع فوق الرمز الحقيقي. اطلب دائماً جهاز دفع أو تحقق من الرابط.",
      pt: "Troca de QR code (quishing) é golpe comum. Sempre peça terminal ou verifique a URL. Um QR real não é colado sobre outro.",
      fr: "Le remplacement de QR codes (quishing) est une arnaque courante. Demandez toujours un terminal ou vérifiez l\u2019URL.",
      de: "QR-Code-Tausch (quishing) ist ein gängiger Betrug. Verlangen Sie immer ein Kartenterminal oder prüfen Sie die URL.",
      ja: "QRコードのすり替え（クイッシング）は一般的な詐欺です。かならずカード決済機を頼むか、スキャン後にURLを確認してください。",
    },
  },
];

/* ── Helpers ────────────────────────────────────────────────────────────────── */

const motionProps = (ecoMode: boolean, delay: number) => ({
  initial: ecoMode ? false : ({ opacity: 0, y: 16 } as const),
  animate: ecoMode ? undefined : ({ opacity: 1, y: 0 } as const),
  transition: ecoMode
    ? undefined
    : ({ duration: 0.35, delay, ease: "easeOut" } as const),
});

/* ── Component ─────────────────────────────────────────────────────────────── */

export default function ScamQuizSection() {
  const { language } = useTranslation();
  const { ecoMode } = useEcoMode();

  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const lang = language ?? "ru";
  const total = SCENARIOS.length;
  const scenario = SCENARIOS[currentQ];

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === scenario.correctIndex) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentQ + 1 >= total) {
      setFinished(true);
    } else {
      setCurrentQ((q) => q + 1);
      setSelected(null);
    }
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  };

  const pct = Math.round((score / total) * 100);

  return (
    <section
      className="relative w-full py-16 sm:py-20 px-4 bg-[#0A0A0B] overflow-hidden"
      id="scam-quiz"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.04)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <SectionBadge variant="pill" label={L(BADGE_BY_LANG, lang)} className="mb-6" />
          <h1 className="font-display font-medium text-3xl sm:text-5xl text-[#F5F5F0] tracking-tighter mb-4">
            {L(TITLE_BY_LANG, lang)}
          </h1>
          <p className="font-sans text-sm text-gray-400 leading-relaxed max-w-xl mx-auto">
            {L(SUBTITLE_BY_LANG, lang)}
          </p>
        </div>

        {!finished ? (
          <motion.div key={`q-${currentQ}`} {...motionProps(ecoMode, 0)}>
            {/* Progress */}
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-xs text-gray-500 tracking-wider">
                {L(PROGRESS_BY_LANG, lang)} {currentQ + 1} {L(OF_BY_LANG, lang)} {total}
              </span>
              <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[#3B82F6] rounded-full"
                  animate={{ width: `${((currentQ + 1) / total) * 100}%` }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </div>
            </div>

            {/* Scenario */}
            <ScanCard borderColor="border-white/[0.06]">
              <p className="font-sans text-sm sm:text-base text-gray-300 leading-relaxed">
                {L(scenario.scenario, lang)}
              </p>
            </ScanCard>

            {/* Options */}
            <div className="flex flex-col gap-3 mt-6">
              {scenario.options.map((opt, idx) => {
                const isCorrect = idx === scenario.correctIndex;
                const isChosen = idx === selected;
                const revealed = selected !== null;

                let borderClass = "border-white/[0.06] hover:border-[#3B82F6]/40";
                if (revealed && isCorrect) {
                  borderClass = "border-[#2DD4BF]/60";
                } else if (revealed && isChosen && !isCorrect) {
                  borderClass = "border-[#EF4444]/60";
                } else if (revealed) {
                  borderClass = "border-white/[0.03] opacity-60";
                }

                return (
                  <motion.button
                    key={idx}
                    type="button"
                    disabled={revealed}
                    onClick={() => handleSelect(idx)}
                    className={`w-full text-left px-5 py-4 rounded-xl bg-[#0A0A0B]/95 border transition-all duration-200 cursor-${revealed ? "default" : "pointer"} disabled:cursor-default ${borderClass}`}
                    whileHover={revealed ? undefined : { scale: 1.01 }}
                    transition={{ duration: 0.15 }}
                  >
                    <div className="flex items-start gap-3">
                      <span className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-colors duration-200 ${
                        revealed && isCorrect
                          ? "bg-[#2DD4BF]/20 text-[#2DD4BF]"
                          : revealed && isChosen && !isCorrect
                            ? "bg-[#EF4444]/20 text-[#EF4444]"
                            : "bg-white/5 text-gray-500"
                      }`}>
                        {revealed && isCorrect
                          ? "\u2713"
                          : revealed && isChosen && !isCorrect
                            ? "\u2717"
                            : String.fromCharCode(65 + idx)}
                      </span>
                      <span className={`font-sans text-sm leading-relaxed ${
                        revealed && isCorrect
                          ? "text-[#2DD4BF]"
                          : revealed && isChosen && !isCorrect
                            ? "text-[#EF4444]"
                            : "text-gray-300"
                      }`}>
                        {L(opt.text, lang)}
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Feedback + Next */}
            {selected !== null && (
              <motion.div {...motionProps(ecoMode, 0.1)}>
                <ScanCard
                  borderColor={
                    selected === scenario.correctIndex
                      ? "border-[#2DD4BF]/30"
                      : "border-[#EF4444]/30"
                  }
                  padding="p-5 sm:p-6"
                  className="mt-6"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`font-mono text-xs font-bold tracking-wider uppercase ${
                      selected === scenario.correctIndex ? "text-[#2DD4BF]" : "text-[#EF4444]"
                    }`}>
                      {selected === scenario.correctIndex
                        ? L(CORRECT_BY_LANG, lang)
                        : L(WRONG_BY_LANG, lang)}
                    </span>
                  </div>
                  <p className="font-sans text-sm text-gray-300 leading-relaxed">
                    {L(scenario.explanation, lang)}
                  </p>
                </ScanCard>

                <div className="flex justify-end mt-6">
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-6 py-2.5 rounded-xl bg-[#3B82F6] text-white font-mono text-xs font-bold tracking-wider uppercase hover:bg-[#2563EB] transition-colors cursor-pointer"
                  >
                    {currentQ + 1 >= total ? L(RESULT_BTN_BY_LANG, lang) : L(NEXT_BTN_BY_LANG, lang)}
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        ) : (
          /* ── Final screen ─────────────────────────────────────────── */
          <motion.div key="result" {...motionProps(ecoMode, 0)}>
            <ScanCard borderColor="border-white/[0.06]" padding="p-8 sm:p-10">
              <div className="text-center">
                <p className="font-mono text-xs text-gray-500 tracking-wider uppercase mb-4">
                  {L(SCORE_TITLE_BY_LANG, lang)}
                </p>
                <p className="font-display font-medium text-5xl sm:text-6xl text-[#F5F5F0] tracking-tight mb-2">
                  {score}
                  <span className="text-gray-600 text-2xl sm:text-3xl"> / {total}</span>
                </p>
                <p className="font-mono text-xs text-gray-500 mb-6">
                  {pct}%
                </p>

                <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

                <p className="font-sans text-sm text-gray-300 leading-relaxed max-w-md mx-auto mb-8">
                  {pct === 100 ? L(PERFECT_BY_LANG, lang) : L(GOOD_BY_LANG, lang)}
                </p>

                <button
                  type="button"
                  onClick={handleRestart}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-[#3B82F6]/30 text-[#3B82F6] font-mono text-xs font-bold tracking-wider uppercase hover:bg-[#3B82F6]/10 transition-colors cursor-pointer"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  {L(RESTART_BTN_BY_LANG, lang)}
                </button>
              </div>
            </ScanCard>
          </motion.div>
        )}
      </div>
    </section>
  );
}
