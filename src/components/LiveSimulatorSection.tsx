import React, { useState, useEffect, useRef } from "react";
import { Mic, Bot, Phone, PhoneOff, AlertTriangle, ShieldCheck, Play, RotateCcw, Cpu, Terminal, Radio } from "lucide-react";
import { useTranslation } from "../i18n/LanguageContext";
import { LanguageCode } from "../i18n/languages";
import { motion, AnimatePresence } from "motion/react";

interface Scenario {
  id: string;
  name: string;
  caller: string;
  speech: string[];
  threatMilestones: number[]; // Threat level at each sentence
  triggers: string[]; // Keywords highlighted
}

const SIMULATOR_TITLE: Partial<Record<LanguageCode, string>> = {
  ru: "Интерактивный симулятор PHANTOM 2.0",
  en: "Interactive PHANTOM 2.0 Simulator",
  es: "Simulador Interactivo PHANTOM 2.0",
  zh: "PHANTOM 2.0 互动模拟终端",
  hi: "इंटरैक्टिव फैंटम (PHANTOM) 2.0 सिमुलेटर",
  ar: "محاكي PHANTOM 2.0 التفاعلي",
  pt: "Simulador Interativo PHANTOM 2.0",
  fr: "Simulateur Interactif PHANTOM 2.0",
  de: "Interaktiver PHANTOM 2.0 Simulator",
  ja: "インタラクティブ PHANTOM 2.0 シミュレーター",
  tr: "İnteraktif PHANTOM 2.0 Simülatörü"
};

const SIMULATOR_SUBTITLE: Partial<Record<LanguageCode, string>> = {
  ru: "Запустите один из сценариев угроз и посмотрите, как 7 оборонных слоев TrustNode анализируют семантику диалога в реальном времени прямо в ОЗУ устройства.",
  en: "Trigger a social engineering attack scenario and observe how TrustNode's 7 security layers parse call semantics in real-time, 100% on-device.",
  es: "Inicie uno de los escenarios de amenazas y observe cómo las 7 capas de seguridad de TrustNode analizan la semántica del diálogo en tiempo real directamente en la RAM.",
  zh: "启动以下社交工程威胁场景，亲眼见证 TrustNode 的 7 重防御层如何在设备运行内存（RAM）中实时解析对话语义并拦截攻击。",
  hi: "एक सामाजिक इंजीनियरिंग हमले के परिदृश्य को शुरू करें और देखें कि कैसे TrustNode के 7 सुरक्षा परतें वास्तविक समय में कॉल सिमेंटिक्स का विश्लेषण करती हैं, 100% ऑन-डिवाइस।",
  ar: "قم بتشغيل أحد سيناريوهات التهديد وشاهد كيف تقوم طبقات الدفاع السبع لـ TrustNode بتحليل دلالات الحوار في الوقت الفعلي مباشرة في ذاكرة الوصول العشوائي للجهاز.",
  pt: "Inicie um dos cenários de ameaça e veja como as 7 camadas de segurança do TrustNode analisam a semântica do diálogo em tempo real diretamente na RAM do aparelho.",
  fr: "Lancez un scénario d'attaque et observez comment les 7 couches de sécurité de TrustNode analysent la sémantique de l'appel en temps réel, entièrement sur l'appareil.",
  de: "Starten Sie eines der Bedrohungsszenarien und beobachten Sie, wie die 7 Schutzebenen von TrustNode die Gesprächssemantik in Echtzeit lokal im RAM analysieren.",
  ja: "ソーシャルエンジニアリング攻撃のシナリオを実行し、TrustNodeの7つの防御レイヤーがスマートフォンのRAM上で、どのようにリアルタイムにダイアログのセマンティクスを解析・遮断するかをご覧ください。",
  tr: "Bir sosyal mühendislik saldırı senaryosunu başlatın ve TrustNode'un 7 güvenlik katmanının, cihazın RAM'i üzerinde %100 yerel olarak konuşma anlamını nasıl gerçek zamanlı çözümlediğini izleyin."
};

const SCENARIOS_BY_LANG: Partial<Record<LanguageCode, Scenario[]>> = {
  ru: [
    {
      id: "bank",
      name: "Служба безопасности банка",
      caller: "Майор полиции / СБ Банка",
      speech: [
        "Алло, здравствуйте! Я капитан полиции Соловьев совместно с Центробанком.",
        "По вашему счету зафиксирована попытка несанкционированного перевода на сумму 45 000 рублей.",
        "Для предотвращения кражи мы заблокировали операцию, но мошенники пытаются сменить ваш привязанный телефон.",
        "Вам необходимо прямо сейчас перевести все ваши сбережения на защищенный сейфовый ячейковый счет.",
        "Назовите код из СМС, который мы вам отправили, чтобы подтвердить перевод на защищенную ячейку!"
      ],
      threatMilestones: [15, 35, 60, 85, 98],
      triggers: ["Центробанком", "несанкционированного перевода", "перевести все ваши сбережения", "Назовите код из СМС", "защищенный сейфовый"]
    },
    {
      id: "delivery",
      name: "Фальшивая служба доставки",
      caller: "Бот-курьер службы доставки",
      speech: [
        "Здравствуйте! Доставка вашего заказа задерживается, так как адрес указан некорректно.",
        "Ваша посылка находится на распределительном узле, хранение платное начиная с сегодняшнего дня.",
        "Пожалуйста, перейдите по ссылке в СМС: trustnode-tracking-ru.net/id824 и оплатите пошлину 15 рублей.",
        "Там же нужно подтвердить свои паспортные данные и реквизиты карты для проверки владельца.",
        "Если вы не сделаете это в течение 1 часа, посылка будет утилизирована без права компенсации."
      ],
      threatMilestones: [10, 25, 55, 80, 95],
      triggers: ["оплатите пошлину", "подтвердить свои паспортные данные", "реквизиты карты", "утилизирована", "trustnode-tracking-ru.net"]
    },
    {
      id: "investment",
      name: "Инвестиционный VIP-клуб",
      caller: "VIP-аналитик TrustCapital",
      speech: [
        "Приветствую! Поздравляю, вы получили доступ в закрытую платформу гарантированного дохода!",
        "Наши алгоритмы на базе искусственного интеллекта дают 100% проходимость сделок по криптоактивам.",
        "Вам не нужно ничего делать. Просто внесите сегодня стартовые 8 000 рублей на наш тестовый счет.",
        "Уже завтра утром на вашей карте будет пассивный доход в размере 24 000 рублей без каких-либо рисков.",
        "Предложение ограничено, в группе осталось всего 2 свободных места. Переводите деньги прямо сейчас!"
      ],
      threatMilestones: [12, 30, 58, 82, 97],
      triggers: ["гарантированного дохода", "100% проходимость", "внесите сегодня", "без каких-либо рисков", "Переводите деньги прямо сейчас"]
    }
  ],
  en: [
    {
      id: "bank",
      name: "Fake Bank Security",
      caller: "Federal Police / Bank Security",
      speech: [
        "Hello! This is Detective Miller from the Financial Crimes Unit, calling regarding your account.",
        "We have detected an unauthorized transfer attempt of $1,500 initiated from an unknown device.",
        "To protect your balance, we must transfer your remaining funds to our temporary secured vault.",
        "Please provide the one-time verification code we just sent to your phone to authorize the transfer.",
        "Do not hang up or talk to anyone, or you will be held legally liable for aiding cyber-criminals."
      ],
      threatMilestones: [15, 40, 65, 88, 98],
      triggers: ["Financial Crimes Unit", "unauthorized transfer", "secured vault", "verification code", "legally liable"]
    },
    {
      id: "delivery",
      name: "Package Delivery Phishing",
      caller: "Courier Service Automated Bot",
      speech: [
        "Hello, your package delivery has been suspended due to an incomplete apartment number.",
        "The package is currently held at our sorting center, and return-to-sender fees will apply starting tomorrow.",
        "Please visit trustnode-tracking-secure.com/id824 immediately to pay a small $1.50 verification fee.",
        "You will need to input your credit card details and full billing address to verify ownership.",
        "Failure to verify ownership within 2 hours will result in automatic parcel destruction."
      ],
      threatMilestones: [10, 25, 55, 82, 95],
      triggers: ["suspended", "trustnode-tracking-secure.com", "verification fee", "credit card details", "destruction"]
    },
    {
      id: "investment",
      name: "VIP Crypto Investment",
      caller: "Senior Broker at TrustCapital",
      speech: [
        "Hello! Congratulations, your profile was selected for our exclusive high-yield VIP tier.",
        "Our proprietary AI neural software guarantees 100% win-rate on modern crypto derivatives.",
        "All you need is to make a quick initial deposit of $100 today to activate your premium terminal.",
        "By tomorrow morning, you will receive $500 in pure passive profit directly back to your Visa card.",
        "Spots are strictly limited, only 2 left. Send the crypto or bank transfer right now to claim it!"
      ],
      threatMilestones: [12, 32, 60, 85, 97],
      triggers: ["high-yield VIP", "guarantees 100% win-rate", "initial deposit", "passive profit", "right now"]
    }
  ],
  es: [
    {
      id: "bank",
      name: "Falsa Seguridad Bancaria",
      caller: "Detective / Seguridad del Banco",
      speech: [
        "¡Hola! Soy el detective Ramírez de la Unidad de Delitos Financieros, le llamo por su cuenta.",
        "Detectamos un intento de transferencia no autorizada de $1.500 desde un dispositivo desconocido.",
        "Para proteger su saldo, debemos transferir sus fondos restantes a nuestra bóveda temporal segura.",
        "Por favor, indique el código de verificación que le acabamos de enviar para autorizar la transferencia.",
        "No cuelgue ni hable con nadie, o será legalmente responsable por ayudar a ciberdelincuentes."
      ],
      threatMilestones: [15, 40, 65, 88, 98],
      triggers: ["Unidad de Delitos Financieros", "transferencia no autorizada", "bóveda temporal segura", "código de verificación", "legalmente responsable"]
    },
    {
      id: "delivery",
      name: "Phishing de Paquetería",
      caller: "Bot Automático de Mensajería",
      speech: [
        "Hola, la entrega de su paquete se ha suspendido por un número de apartamento incompleto.",
        "Su paquete está retenido en nuestro centro de distribución; desde mañana se aplicarán cargos de devolución.",
        "Visite trustnode-tracking-secure.com/id824 de inmediato y pague una pequeña tarifa de verificación de $1,50.",
        "Deberá introducir los datos de su tarjeta y dirección de facturación completa para verificar su identidad.",
        "Si no verifica su identidad en 2 horas, el paquete será destruido automáticamente."
      ],
      threatMilestones: [10, 25, 55, 82, 95],
      triggers: ["suspendida", "trustnode-tracking-secure.com", "tarifa de verificación", "datos de su tarjeta", "destruido"]
    },
    {
      id: "investment",
      name: "Inversión Cripto VIP",
      caller: "Broker Senior de TrustCapital",
      speech: [
        "¡Hola! Felicidades, su perfil fue seleccionado para nuestro nivel VIP exclusivo de alto rendimiento.",
        "Nuestro software de IA propietario garantiza un 100% de acierto en derivados cripto modernos.",
        "Solo necesita hacer hoy un depósito inicial rápido de $100 para activar su terminal premium.",
        "Mañana por la mañana recibirá $500 de ganancia pasiva directamente en su tarjeta Visa.",
        "Los cupos son limitados, solo quedan 2. ¡Envíe la transferencia ahora mismo para reclamarlo!"
      ],
      threatMilestones: [12, 32, 60, 85, 97],
      triggers: ["VIP de alto rendimiento", "garantiza un 100%", "depósito inicial", "ganancia pasiva", "ahora mismo"]
    }
  ],
  zh: [
    {
      id: "bank",
      name: "虚假银行安全部门",
      caller: "警官 / 银行安全部",
      speech: [
        "您好！我是金融犯罪调查处的米勒警官，就您的账户情况与您联系。",
        "系统检测到有人从未知设备发起一笔1500美元的未授权转账。",
        "为保护您的资金，我们必须将您剩余的资金转入我们的临时安全保险账户。",
        "请提供我们刚发送到您手机的一次性验证码，以便授权此次转账。",
        "请不要挂断电话或与任何人交谈，否则您将因协助网络犯罪而承担法律责任。"
      ],
      threatMilestones: [15, 40, 65, 88, 98],
      triggers: ["金融犯罪调查处", "未授权转账", "安全保险账户", "验证码", "法律责任"]
    },
    {
      id: "delivery",
      name: "虚假快递钓鱼信息",
      caller: "快递公司自动机器人",
      speech: [
        "您好，由于门牌号信息不完整，您的包裹配送已被暂停。",
        "包裹目前存放在我们的分拣中心，从明天起将收取退件费用。",
        "请立即访问 trustnode-tracking-secure.com/id824 并支付1.5美元的小额验证费。",
        "您需要输入信用卡信息和完整账单地址以验证所有权。",
        "如果2小时内未完成验证，包裹将被自动销毁。"
      ],
      threatMilestones: [10, 25, 55, 82, 95],
      triggers: ["已暂停", "trustnode-tracking-secure.com", "验证费", "信用卡信息", "销毁"]
    },
    {
      id: "investment",
      name: "VIP加密货币投资",
      caller: "TrustCapital高级经纪人",
      speech: [
        "您好！恭喜您，您的账户已被选中加入我们独家的高收益VIP等级。",
        "我们专有的AI神经网络软件可保证现代加密货币衍生品交易100%胜率。",
        "您只需今天完成100美元的快速初始存款即可激活您的高级终端。",
        "明天早上，您将直接在您的Visa卡上收到500美元的纯被动收益。",
        "名额非常有限，仅剩2个。请立即转账以锁定名额！"
      ],
      threatMilestones: [12, 32, 60, 85, 97],
      triggers: ["高收益VIP", "保证100%胜率", "初始存款", "被动收益", "立即"]
    }
  ],
  ar: [
    {
      id: "bank",
      name: "أمن مصرفي مزيف",
      caller: "محقق / أمن البنك",
      speech: [
        "مرحبا! معك المحقق ميلر من وحدة الجرائم المالية، أتصل بخصوص حسابك.",
        "رصدنا محاولة تحويل غير مصرح بها بقيمة 1500 دولار من جهاز مجهول.",
        "لحماية رصيدك، يجب علينا تحويل أموالك المتبقية إلى خزنتنا الآمنة المؤقتة.",
        "يرجى تزويدنا برمز التحقق الذي أرسلناه للتو إلى هاتفك لتفويض عملية التحويل.",
        "لا تُغلق الخط ولا تتحدث مع أي أحد، وإلا ستكون مسؤولا قانونيا عن مساعدة مجرمي الإنترنت."
      ],
      threatMilestones: [15, 40, 65, 88, 98],
      triggers: ["وحدة الجرائم المالية", "تحويل غير مصرح", "خزنتنا الآمنة", "رمز التحقق", "مسؤولا قانونيا"]
    },
    {
      id: "delivery",
      name: "احتيال توصيل الطرود",
      caller: "روبوت آلي لشركة التوصيل",
      speech: [
        "مرحبا، تم تعليق توصيل طردك بسبب رقم شقة غير مكتمل.",
        "طردك محتجز حاليا في مركز الفرز، وستُطبّق رسوم إعادة الإرسال بدءا من الغد.",
        "يرجى زيارة trustnode-tracking-secure.com/id824 فورا ودفع رسوم تحقق بسيطة قدرها 1.50 دولار.",
        "ستحتاج إلى إدخال بيانات بطاقتك الائتمانية وعنوان الفوترة الكامل للتحقق من الملكية.",
        "عدم التحقق خلال ساعتين سيؤدي إلى إتلاف الطرد تلقائيا."
      ],
      threatMilestones: [10, 25, 55, 82, 95],
      triggers: ["تم تعليق", "trustnode-tracking-secure.com", "رسوم تحقق", "بطاقتك الائتمانية", "إتلاف"]
    },
    {
      id: "investment",
      name: "استثمار كريبتو VIP",
      caller: "وسيط أول في TrustCapital",
      speech: [
        "مرحبا! تهانينا، تم اختيار ملفك للانضمام إلى فئتنا الحصرية عالية العائد VIP.",
        "برنامجنا الخاص بالذكاء الاصطناعي يضمن نسبة نجاح 100% في مشتقات العملات الرقمية الحديثة.",
        "كل ما عليك هو إيداع مبدئي سريع بقيمة 100 دولار اليوم لتفعيل طرفيتك المميزة.",
        "بحلول صباح الغد، ستحصل على 500 دولار كأرباح سلبية خالصة مباشرة إلى بطاقة فيزا الخاصة بك.",
        "الأماكن محدودة جدا، تبقى مكانان فقط. أرسل التحويل الآن للمطالبة به!"
      ],
      threatMilestones: [12, 32, 60, 85, 97],
      triggers: ["VIP عالية العائد", "يضمن نسبة نجاح 100%", "إيداع مبدئي", "أرباح سلبية", "الآن"]
    }
  ],
  fr: [
    {
      id: "bank",
      name: "Fausse Sécurité Bancaire",
      caller: "Inspecteur / Sécurité de la Banque",
      speech: [
        "Bonjour ! Je suis l'inspecteur Miller de l'unité des crimes financiers, au sujet de votre compte.",
        "Nous avons détecté une tentative de virement non autorisé de 1500 $ depuis un appareil inconnu.",
        "Pour protéger votre solde, nous devons transférer vos fonds restants vers notre coffre sécurisé temporaire.",
        "Veuillez fournir le code de vérification que nous venons de vous envoyer pour autoriser le virement.",
        "Ne raccrochez pas et ne parlez à personne, sinon vous serez tenu légalement responsable d'avoir aidé des cybercriminels."
      ],
      threatMilestones: [15, 40, 65, 88, 98],
      triggers: ["unité des crimes financiers", "virement non autorisé", "coffre sécurisé", "code de vérification", "tenu légalement responsable"]
    },
    {
      id: "delivery",
      name: "Phishing de Livraison de Colis",
      caller: "Bot Automatisé du Service de Livraison",
      speech: [
        "Bonjour, la livraison de votre colis a été suspendue en raison d'un numéro d'appartement incomplet.",
        "Votre colis est actuellement retenu à notre centre de tri, des frais de retour s'appliqueront dès demain.",
        "Veuillez visiter trustnode-tracking-secure.com/id824 immédiatement et payer de petits frais de vérification de 1,50 $.",
        "Vous devrez saisir les informations de votre carte bancaire et votre adresse de facturation complète pour vérifier la propriété.",
        "Le défaut de vérification sous 2 heures entraînera la destruction automatique du colis."
      ],
      threatMilestones: [10, 25, 55, 82, 95],
      triggers: ["suspendue", "trustnode-tracking-secure.com", "frais de vérification", "carte bancaire", "destruction"]
    },
    {
      id: "investment",
      name: "Investissement Crypto VIP",
      caller: "Courtier Senior chez TrustCapital",
      speech: [
        "Bonjour ! Félicitations, votre profil a été sélectionné pour notre niveau VIP exclusif à haut rendement.",
        "Notre logiciel d'IA propriétaire garantit un taux de réussite de 100% sur les dérivés crypto modernes.",
        "Il vous suffit d'effectuer aujourd'hui un dépôt initial rapide de 100 $ pour activer votre terminal premium.",
        "Dès demain matin, vous recevrez 500 $ de profit passif directement sur votre carte Visa.",
        "Les places sont très limitées, il n'en reste que 2. Envoyez le virement dès maintenant pour la réserver !"
      ],
      threatMilestones: [12, 32, 60, 85, 97],
      triggers: ["VIP à haut rendement", "garantit un taux de réussite de 100%", "dépôt initial", "profit passif", "dès maintenant"]
    }
  ],
  de: [
    {
      id: "bank",
      name: "Gefälschte Banksicherheit",
      caller: "Ermittler / Bank-Sicherheitsdienst",
      speech: [
        "Hallo! Hier ist Ermittler Miller von der Abteilung für Finanzkriminalität, es geht um Ihr Konto.",
        "Wir haben einen nicht autorisierten Überweisungsversuch von 1.500 $ von einem unbekannten Gerät festgestellt.",
        "Um Ihr Guthaben zu schützen, müssen wir Ihr verbleibendes Guthaben in unseren temporären Sicherheitstresor überweisen.",
        "Bitte geben Sie den Verifizierungscode an, den wir soeben an Ihr Telefon gesendet haben, um die Überweisung zu autorisieren.",
        "Legen Sie nicht auf und sprechen Sie mit niemandem, sonst haften Sie rechtlich für die Unterstützung von Cyberkriminellen."
      ],
      threatMilestones: [15, 40, 65, 88, 98],
      triggers: ["Abteilung für Finanzkriminalität", "nicht autorisierten Überweisung", "Sicherheitstresor", "Verifizierungscode", "rechtlich haften"]
    },
    {
      id: "delivery",
      name: "Paketzustellungs-Phishing",
      caller: "Automatisierter Bot des Zustelldienstes",
      speech: [
        "Hallo, die Zustellung Ihres Pakets wurde aufgrund einer unvollständigen Wohnungsnummer ausgesetzt.",
        "Ihr Paket wird derzeit in unserem Sortierzentrum aufbewahrt, ab morgen fallen Rücksendegebühren an.",
        "Bitte besuchen Sie sofort trustnode-tracking-secure.com/id824 und zahlen Sie eine kleine Verifizierungsgebühr von 1,50 $.",
        "Sie müssen Ihre Kreditkartendaten und die vollständige Rechnungsadresse eingeben, um den Besitz zu verifizieren.",
        "Wird der Besitz nicht innerhalb von 2 Stunden verifiziert, wird das Paket automatisch vernichtet."
      ],
      threatMilestones: [10, 25, 55, 82, 95],
      triggers: ["ausgesetzt", "trustnode-tracking-secure.com", "Verifizierungsgebühr", "Kreditkartendaten", "vernichtet"]
    },
    {
      id: "investment",
      name: "VIP-Krypto-Investment",
      caller: "Senior-Broker bei TrustCapital",
      speech: [
        "Hallo! Herzlichen Glückwunsch, Ihr Profil wurde für unsere exklusive Hochrendite-VIP-Stufe ausgewählt.",
        "Unsere proprietäre KI-Software garantiert eine Erfolgsquote von 100% bei modernen Krypto-Derivaten.",
        "Sie müssen lediglich heute eine schnelle Ersteinzahlung von 100 $ tätigen, um Ihr Premium-Terminal zu aktivieren.",
        "Bereits morgen früh erhalten Sie 500 $ reinen passiven Gewinn direkt auf Ihre Visa-Karte.",
        "Die Plätze sind streng limitiert, nur noch 2 übrig. Senden Sie die Überweisung jetzt, um sich Ihren Platz zu sichern!"
      ],
      threatMilestones: [12, 32, 60, 85, 97],
      triggers: ["Hochrendite-VIP", "garantiert eine Erfolgsquote von 100%", "Ersteinzahlung", "passiven Gewinn", "jetzt"]
    }
  ],
  pt: [
    {
      id: "bank",
      name: "Falsa Segurança Bancária",
      caller: "Detetive / Segurança do Banco",
      speech: [
        "Olá! Aqui é o detetive Miller, da Unidade de Crimes Financeiros, ligando sobre sua conta.",
        "Detectamos uma tentativa de transferência não autorizada de $1.500 a partir de um dispositivo desconhecido.",
        "Para proteger seu saldo, precisamos transferir seus fundos restantes para nosso cofre temporário seguro.",
        "Por favor, informe o código de verificação que acabamos de enviar ao seu telefone para autorizar a transferência.",
        "Não desligue nem fale com ninguém, ou você será legalmente responsabilizado por ajudar cibercriminosos."
      ],
      threatMilestones: [15, 40, 65, 88, 98],
      triggers: ["Unidade de Crimes Financeiros", "transferência não autorizada", "cofre temporário seguro", "código de verificação", "legalmente responsabilizado"]
    },
    {
      id: "delivery",
      name: "Phishing de Entrega de Pacotes",
      caller: "Bot Automatizado da Transportadora",
      speech: [
        "Olá, a entrega do seu pacote foi suspensa devido a um número de apartamento incompleto.",
        "Seu pacote está retido em nosso centro de triagem; taxas de devolução serão aplicadas a partir de amanhã.",
        "Acesse trustnode-tracking-secure.com/id824 imediatamente e pague uma pequena taxa de verificação de $1,50.",
        "Você precisará informar os dados do seu cartão de crédito e o endereço de cobrança completo para verificar a propriedade.",
        "A falha em verificar a propriedade em 2 horas resultará na destruição automática do pacote."
      ],
      threatMilestones: [10, 25, 55, 82, 95],
      triggers: ["suspensa", "trustnode-tracking-secure.com", "taxa de verificação", "dados do seu cartão", "destruição"]
    },
    {
      id: "investment",
      name: "Investimento Cripto VIP",
      caller: "Corretor Sênior da TrustCapital",
      speech: [
        "Olá! Parabéns, seu perfil foi selecionado para nosso nível VIP exclusivo de alto rendimento.",
        "Nosso software proprietário de IA garante 100% de taxa de acerto em derivativos cripto modernos.",
        "Basta fazer hoje um depósito inicial rápido de $100 para ativar seu terminal premium.",
        "Já amanhã de manhã, você receberá $500 em lucro passivo puro diretamente no seu cartão Visa.",
        "As vagas são estritamente limitadas, restam apenas 2. Envie a transferência agora mesmo para garantir a sua!"
      ],
      threatMilestones: [12, 32, 60, 85, 97],
      triggers: ["VIP de alto rendimento", "garante 100% de taxa de acerto", "depósito inicial", "lucro passivo", "agora mesmo"]
    }
  ],
  hi: [
    {
      id: "bank",
      name: "नकली बैंक सुरक्षा",
      caller: "जासूस / बैंक सुरक्षा",
      speech: [
        "नमस्ते! मैं वित्तीय अपराध इकाई से जासूस मिलर बोल रहा हूँ, आपके खाते के संबंध में कॉल कर रहा हूँ।",
        "हमने एक अज्ञात डिवाइस से $1,500 के एक अनधिकृत ट्रांसफर के प्रयास का पता लगाया है।",
        "आपके शेष धन की सुरक्षा के लिए, हमें आपकी बची हुई राशि हमारे अस्थायी सुरक्षित वॉल्ट में स्थानांतरित करनी होगी।",
        "कृपया वह वन-टाइम सत्यापन कोड बताएं जो हमने अभी आपके फोन पर भेजा है, ताकि ट्रांसफर अधिकृत हो सके।",
        "फोन मत काटिए और किसी से बात मत कीजिए, वरना साइबर अपराधियों की मदद करने के लिए आप कानूनी रूप से जिम्मेदार होंगे।"
      ],
      threatMilestones: [15, 40, 65, 88, 98],
      triggers: ["वित्तीय अपराध इकाई", "अनधिकृत ट्रांसफर", "सुरक्षित वॉल्ट", "सत्यापन कोड", "कानूनी रूप से जिम्मेदार"]
    },
    {
      id: "delivery",
      name: "पैकेज डिलीवरी फ़िशिंग",
      caller: "कूरियर सेवा का स्वचालित बॉट",
      speech: [
        "नमस्ते, अधूरे अपार्टमेंट नंबर के कारण आपके पैकेज की डिलीवरी रोक दी गई है।",
        "आपका पैकेज हमारे सॉर्टिंग सेंटर में रखा हुआ है, कल से रिटर्न शुल्क लागू होगा।",
        "कृपया तुरंत trustnode-tracking-secure.com/id824 पर जाएं और $1.50 का छोटा सत्यापन शुल्क चुकाएं।",
        "स्वामित्व सत्यापित करने के लिए आपको अपने क्रेडिट कार्ड का विवरण और पूरा बिलिंग पता दर्ज करना होगा।",
        "2 घंटे के भीतर स्वामित्व सत्यापित न करने पर पैकेज स्वतः नष्ट कर दिया जाएगा।"
      ],
      threatMilestones: [10, 25, 55, 82, 95],
      triggers: ["रोक दी गई", "trustnode-tracking-secure.com", "सत्यापन शुल्क", "क्रेडिट कार्ड का विवरण", "नष्ट"]
    },
    {
      id: "investment",
      name: "VIP क्रिप्टो निवेश",
      caller: "TrustCapital का वरिष्ठ ब्रोकर",
      speech: [
        "नमस्ते! बधाई हो, आपकी प्रोफ़ाइल हमारे विशेष उच्च-प्रतिफल VIP स्तर के लिए चुनी गई है।",
        "हमारा स्वामित्व वाला AI सॉफ़्टवेयर आधुनिक क्रिप्टो डेरिवेटिव्स पर 100% जीत-दर की गारंटी देता है।",
        "आपको बस आज अपने प्रीमियम टर्मिनल को सक्रिय करने के लिए $100 की त्वरित शुरुआती जमा राशि देनी है।",
        "कल सुबह तक, आपको सीधे आपके वीज़ा कार्ड पर $500 का शुद्ध निष्क्रिय लाभ प्राप्त होगा।",
        "स्थान बेहद सीमित हैं, केवल 2 बचे हैं। इसे पाने के लिए अभी ट्रांसफर भेजें!"
      ],
      threatMilestones: [12, 32, 60, 85, 97],
      triggers: ["उच्च-प्रतिफल VIP", "100% जीत-दर की गारंटी", "शुरुआती जमा", "निष्क्रिय लाभ", "अभी"]
    }
  ],
  ja: [
    {
      id: "bank",
      name: "偽の銀行セキュリティ",
      caller: "刑事 / 銀行セキュリティ",
      speech: [
        "もしもし、金融犯罪対策課のミラー刑事です。お客様の口座についてご連絡しました。",
        "身元不明の端末から1,500ドルの不正送金の試みが検出されました。",
        "残高を保護するため、残りの資金を当行の一時的な安全金庫へ移していただく必要があります。",
        "送金を承認するため、今お送りしたワンタイム認証コードを教えてください。",
        "電話を切ったり誰かに相談したりしないでください。さもないとサイバー犯罪者への幇助として法的責任を問われます。"
      ],
      threatMilestones: [15, 40, 65, 88, 98],
      triggers: ["金融犯罪対策課", "不正送金", "安全金庫", "認証コード", "法的責任"]
    },
    {
      id: "delivery",
      name: "荷物配送フィッシング",
      caller: "配送業者の自動応答ボット",
      speech: [
        "こんにちは、アパートの部屋番号が不完全なため、お荷物の配送が保留されています。",
        "お荷物は現在仕分けセンターに保管されており、明日から返送手数料が発生します。",
        "至急 trustnode-tracking-secure.com/id824 にアクセスし、1.50ドルの少額確認手数料をお支払いください。",
        "所有者確認のため、クレジットカード情報と請求先住所を全て入力する必要があります。",
        "2時間以内に確認が完了しない場合、荷物は自動的に廃棄されます。"
      ],
      threatMilestones: [10, 25, 55, 82, 95],
      triggers: ["保留", "trustnode-tracking-secure.com", "確認手数料", "クレジットカード情報", "廃棄"]
    },
    {
      id: "investment",
      name: "VIP暗号資産投資",
      caller: "TrustCapitalのシニアブローカー",
      speech: [
        "こんにちは！おめでとうございます、お客様のプロフィールが当社の特別高利回りVIP会員に選ばれました。",
        "当社独自のAIソフトウェアは最新の暗号資産デリバティブで100%の勝率を保証します。",
        "本日100ドルの初期入金をしていただくだけで、プレミアム端末が有効化されます。",
        "明日の朝までに、純粋な受動的利益500ドルが直接あなたのVisaカードに入金されます。",
        "枠は非常に限られており、残り2枠のみです。今すぐ送金してこの権利を確保してください！"
      ],
      threatMilestones: [12, 32, 60, 85, 97],
      triggers: ["高利回りVIP", "100%の勝率を保証", "初期入金", "受動的利益", "今すぐ"]
    }
  ],
  tr: [
    {
      id: "bank",
      name: "Sahte Banka Güvenliği",
      caller: "Dedektif / Banka Güvenliği",
      speech: [
        "Merhaba! Ben Mali Suçlar Biriminden Dedektif Miller, hesabınızla ilgili arıyorum.",
        "Bilinmeyen bir cihazdan 1.500 dolarlık yetkisiz bir transfer girişimi tespit ettik.",
        "Bakiyenizi korumak için, kalan fonlarınızı geçici güvenli kasamıza aktarmamız gerekiyor.",
        "Transferi onaylamak için telefonunuza az önce gönderdiğimiz tek kullanımlık doğrulama kodunu belirtin.",
        "Telefonu kapatmayın ve kimseyle konuşmayın, aksi halde siber suçlulara yardım etmekten yasal olarak sorumlu tutulursunuz."
      ],
      threatMilestones: [15, 40, 65, 88, 98],
      triggers: ["Mali Suçlar Birimi", "yetkisiz transfer", "güvenli kasa", "doğrulama kodu", "yasal olarak sorumlu"]
    },
    {
      id: "delivery",
      name: "Sahte Kargo Teslimatı",
      caller: "Kargo Şirketi Otomatik Botu",
      speech: [
        "Merhaba, eksik daire numarası nedeniyle paket teslimatınız askıya alındı.",
        "Paketiniz şu anda ayrım merkezimizde tutuluyor, yarından itibaren iade ücreti uygulanacak.",
        "Lütfen hemen trustnode-tracking-secure.com/id824 adresini ziyaret edin ve 1,50 dolarlık küçük bir doğrulama ücreti ödeyin.",
        "Sahipliği doğrulamak için kredi kartı bilgilerinizi ve tam fatura adresinizi girmeniz gerekecek.",
        "2 saat içinde doğrulama yapılmazsa paket otomatik olarak imha edilecektir."
      ],
      threatMilestones: [10, 25, 55, 82, 95],
      triggers: ["askıya alındı", "trustnode-tracking-secure.com", "doğrulama ücreti", "kredi kartı bilgileri", "imha"]
    },
    {
      id: "investment",
      name: "VIP Kripto Yatırımı",
      caller: "TrustCapital Kıdemli Brokeri",
      speech: [
        "Merhaba! Tebrikler, profiliniz özel yüksek getirili VIP kadememiz için seçildi.",
        "Özel yapay zeka yazılımımız modern kripto türevlerinde %100 kazanma oranı garanti ediyor.",
        "Premium terminalinizi etkinleştirmek için bugün sadece 100 dolarlık hızlı bir başlangıç yatırımı yapmanız yeterli.",
        "Yarın sabaha kadar, doğrudan Visa kartınıza 500 dolar tamamen pasif kâr olarak yatırılacak.",
        "Kontenjan kesinlikle sınırlı, sadece 2 yer kaldı. Hemen şimdi transfer göndererek yerinizi ayırtın!"
      ],
      threatMilestones: [12, 32, 60, 85, 97],
      triggers: ["yüksek getirili VIP", "%100 kazanma oranı garanti", "başlangıç yatırımı", "pasif kâr", "hemen şimdi"]
    }
  ]
};

// Map default scenarios for languages not defined to EN
const getScenarios = (lang: LanguageCode): Scenario[] => {
  return SCENARIOS_BY_LANG[lang] || SCENARIOS_BY_LANG.en;
};

const LAYER_LABELS_BY_LANG: Partial<Record<LanguageCode, string[]>> = {
  ru: [
    "Слой 1: Анализ голоса и интонаций (распознавание волнения и стресса)",
    "Слой 2: Проверка темпа речи (выявление чтения мошеннического текста)",
    "Слой 3: Анализ ключевых слов (поиск фраз-триггеров мошенников)",
    "Слой 4: Оценка давления на жертву (обнаружение психологического контроля)",
    "Слой 5: Контроль срочности (анализ требований немедленного перевода денег)",
    "Слой 6: Быстрая локальная сверка (проверка по известным номерам и базам)",
    "Слой 7: Итоговый вердикт купола (принятие решения о блокировке звонка)"
  ],
  en: [
    "Layer 1: Voice & Vocal Stress (detecting background stress & nervous tension)",
    "Layer 2: Speech Rate & Pacing (identifying robotic script reading)",
    "Layer 3: Word & Phrase Analysis (searching for known manipulative keywords)",
    "Layer 4: Psychological Pressure (modeling tactics of verbal intimidation)",
    "Layer 5: Forced Urgency Control (evaluating claims of fake emergency)",
    "Layer 6: Local Safe Database Match (hashing against local offline threat lists)",
    "Layer 7: Smart Decision Engine (compiling final security score & quick alerts)"
  ],
  es: [
    "Capa 1: Acústico-Prosódico (ruido de fondo y estrés de voz)",
    "Capa 2: Fonético-Intonativo (pausas anormales y lectura de guion)",
    "Capa 3: Léxico-Semántico (búsqueda de frases clave de estafa)",
    "Capa 4: Sintáctico-Discursivo (estructura de manipulación psicológica)",
    "Capa 5: Pragmático-Contextual (evaluación de urgencia falsa)",
    "Capa 6: Coincidencia de registro local (cotejo de hashes de amenazas)",
    "Capa 7: Matriz de decisión heurística (cálculo de puntuación final)"
  ],
  zh: [
    "第 1 层：声学与韵律分析（分析背景噪音、语调和情绪压力）",
    "第 2 层：语音与语调分析（检测不自然停顿和脚本读音模式）",
    "第 3 层：词汇与语义分析（提取欺诈和诱导性敏感词组）",
    "第 4 层：句法与话语分析（识别心理控制和诱导施压框架）",
    "第 5 层：语用与语境分析（评估假冒权威与人为紧急情绪）",
    "第 6 层：本地威胁库碰撞（在本地安全数据库中高速碰撞特征）",
    "第 7 层：启发式决策矩阵（加权计算综合威胁度并触发报警拦截）"
  ],
  hi: [
    "परत 1: ध्वनिक-प्रोसॉडिक (पृष्ठभूमि शोर और मुखर तनाव का विश्लेषण)",
    "परत 2: ध्वन्यात्मक-intonational (असामान्य ठहराव और स्क्रिप्ट पढ़ने का पता लगाना)",
    "परत 3: लेक्सिको-सिमेंटिक (हेरफेर वाले घोटाले के शब्दों को खोजना)",
    "परत 4: सिंटैक्टिक-प्रवचन (मनोवैज्ञानिक नियंत्रण का संरचनात्मक मॉडलिंग)",
    "परत 5: व्यावहारिक-प्रासंगिक (जबरन तात्कालिकता और अधिकार का मूल्यांकन)",
    "परत 6: स्थानीय रजिस्ट्री क्रॉस-मैच (स्थानीय खतरे के खिलाफ मिलान)",
    "परt 7: हेयुरिस्टिक डिसीजन मैट्रिक्स (अंतिम खतरे के स्कोर संकलन)"
  ],
  ar: [
    "الطبقة 1: الصوتية العروضية (تحليل ضوضاء الخلفية والتوتر الصوتي)",
    "الطبقة 2: الفونيمية التنغيمية (كشف السكتات غير الطبيعية وقراءة النصوص)",
    "الطبقة 3: المعجمية الدلالية (رصد الكلمات المفتاحية الاحتيالية والمضللة)",
    "الطبقة 4: النحوية الخطابية (نمذجة هيكل الضغط النفسي والسيطرة)",
    "الطبقة 5: التداولية السياقية (تقييم دوافع الاستعجال والضغط الوهمي)",
    "الطبقة 6: مقارنة السجلات المحلية (مطابقة البصمات مع قواعد التهديد المحلية)",
    "الطبقة 7: مصفوفة القرار الاستدلالي (تجميع الدرجات النهائية وإطلاق التحذير)"
  ],
  pt: [
    "Camada 1: Acústico-Prosódico (ruído de fundo e estresse vocal)",
    "Camada 2: Fonético-Entonacional (pausas anômalas e leitura de roteiro)",
    "Camada 3: Léxico-Semântico (palavras-chave e frases de engenharia social)",
    "Camada 4: Sintático-Discursivo (estrutura de manipulação psicológica)",
    "Camada 5: Pragmático-Contextual (análise de falsa urgência e autoridade)",
    "Camada 6: Comparação de Registro Local (verificação contra banco de ameaças local)",
    "Camada 7: Matriz de Decisão Heurística (cálculo de risco final e alertas)"
  ],
  fr: [
    "Couche 1 : Acoustico-prosodique (analyse du bruit de fond et du stress vocal)",
    "Couche 2 : Phonético-intonative (détection des pauses anormales et lecture de script)",
    "Couche 3 : Lexico-sémantique (identification des phrases clés de manipulation)",
    "Couche 4 : Syntactico-discursive (modélisation de l'emprise psychologique)",
    "Couche 5 : Pragmatico-contextuelle (évaluation de l'urgence forcée et de l'autorité)",
    "Couche 6 : Concordance locale (hachage et comparaison avec la base locale de menaces)",
    "Couche 7 : Matrice de décision heuristique (compilation du score de menace final)"
  ],
  de: [
    "Ebene 1: Akustisch-Prosodisch (Hintergrundgeräusche und Stimmenstress)",
    "Ebene 2: Phonemisch-Intonatorisch (anormale Pausen und Skriptlesen)",
    "Ebene 3: Lexikalisch-Semantisch (manipulative Betrugs-Schlüsselwörter)",
    "Ebene 4: Syntaktisch-Diskursiv (Modellierung psychologischer Kontrolle)",
    "Ebene 5: Pragmatisch-Kontextuell (Dringlichkeitsprüfung & Autoritätstrigger)",
    "Ebene 6: Lokaler Signatur-Abgleich (Abgleich mit der lokalen Bedrohungsdatenbank)",
    "Ebene 7: Heuristische Entscheidungsmatrix (Berechnung des finalen Bedrohungsscores)"
  ],
  ja: [
    "第1レイヤー：音響・プロソディ解析（背景ノイズ・感情ストレスの検知）",
    "第2レイヤー：音韻・イントネーション解析（不自然なポーズや読み上げ検出）",
    "第3レイヤー：語彙・セマンティック解析（詐欺的な誘導・キーワードの抽出）",
    "第4レイヤー：構文・ディスコース解析（心理的コントロールや圧力パターンの構造化）",
    "第5レイヤー：プラグマティック・コンテキスト解析（偽りの緊急性や権威の利用判定）",
    "第6レイヤー：ローカルデータベース照合（ローカル脅威情報の高速シグネチャ検索）",
    "第7レイヤー：ヒューリスティック意思決定マトリクス（加权による統合的な脅威度判定と警告）"
  ],
  tr: [
    "Katman 1: Akustik-Prozodik Analiz (arka plan gürültüsü ve ses stresinin tespiti)",
    "Katman 2: Fonetik-Tonlama Analizi (anormal duraklamalar ve senaryo okuma tespiti)",
    "Katman 3: Sözcüksel-Anlamsal Analiz (manipülatif dolandırıcılık anahtar kelimelerinin taranması)",
    "Katman 4: Sözdizimsel-Söylem Analizi (psikolojik baskı taktiklerinin modellenmesi)",
    "Katman 5: Bağlamsal Aciliyet Kontrolü (sahte acil durum iddialarının değerlendirilmesi)",
    "Katman 6: Yerel Veritabanı Eşleştirmesi (yerel tehdit listeleriyle hızlı karşılaştırma)",
    "Katman 7: Akıllı Karar Motoru (nihai güvenlik skorunun ve hızlı uyarıların derlenmesi)"
  ]
};

const CONSOLE_LOGS_BY_LANG: Partial<Record<LanguageCode, Record<string, string[]>>> = {
  ru: {
    scanning: [
      "[OK] Запуск речевого кодека OPUS. Входящий поток перенаправлен в локальное ОЗУ.",
      "[INFO] Инициализация Rubert-tiny2 в локальной песочнице.",
      "[OK] Калибровка фонового шума. Шумоподавление: Активно.",
      "[INFO] Сканирование спектра голоса на признаки синтеза..."
    ],
    done: [
      "[ALERT] Слои 3, 4 и 5 зафиксировали критические семантические аномалии.",
      "[SUCCESS] Локальная база SQLCipher заблокирована на запись во избежание сброса.",
      "[BLOCKED] KIRA: Семантическая блокировка входящего воздействия.",
      "[DOME HARDENED] Угроза нейтрализована. Лог стерт из ОЗУ. Устройство в безопасности."
    ]
  },
  en: {
    scanning: [
      "[OK] OPUS audio stream codec active. Routing voice payload directly to local secure RAM.",
      "[INFO] Initializing Rubert-tiny2 classifier inside device sandbox.",
      "[OK] Calibrating ambient room acoustics. Noise cancellation: Active.",
      "[INFO] Scanning frequency spectrum for AI voice cloning signatures..."
    ],
    done: [
      "[ALERT] Layers 3, 4, and 5 compiled critical semantic anomalies.",
      "[SUCCESS] Core SQLCipher user state secured to prevent tampering.",
      "[BLOCKED] KIRA: Real-time semantic active countermeasure deployed.",
      "[DOME HARDENED] Threat neutralized. Call memory flushed. Core systems secure."
    ]
  },
  es: {
    scanning: [
      "[OK] Códec de audio OPUS activo. Enrutando la voz directamente a la RAM local segura.",
      "[INFO] Inicializando el clasificador Rubert-tiny2 dentro del sandbox del dispositivo.",
      "[OK] Calibrando la acústica ambiental. Cancelación de ruido: Activa.",
      "[INFO] Escaneando el espectro de frecuencias en busca de clonación de voz por IA..."
    ],
    done: [
      "[ALERT] Las capas 3, 4 y 5 detectaron anomalías semánticas críticas.",
      "[SUCCESS] Estado del usuario en SQLCipher asegurado para evitar manipulaciones.",
      "[BLOCKED] KIRA: Contramedida semántica activa desplegada en tiempo real.",
      "[DOME HARDENED] Amenaza neutralizada. Memoria de la llamada eliminada. Sistemas seguros."
    ]
  },
  zh: {
    scanning: [
      "[OK] OPUS音频编解码器已激活。语音数据流直接路由至本地安全内存。",
      "[INFO] 正在设备沙盒内初始化 Rubert-tiny2 分类器。",
      "[OK] 正在校准环境声学噪音。噪声消除：已启用。",
      "[INFO] 正在扫描频谱以检测AI语音克隆特征..."
    ],
    done: [
      "[ALERT] 第3、4、5层检测到关键语义异常。",
      "[SUCCESS] 核心SQLCipher用户状态已锁定，防止篡改。",
      "[BLOCKED] KIRA：已部署实时语义主动对抗措施。",
      "[DOME HARDENED] 威胁已解除。通话记录已清除。核心系统安全。"
    ]
  },
  ar: {
    scanning: [
      "[OK] مرمز صوت OPUS نشط. توجيه الصوت مباشرة إلى الذاكرة العشوائية المحلية الآمنة.",
      "[INFO] تهيئة مصنف Rubert-tiny2 داخل الحماية الرقمية للجهاز.",
      "[OK] معايرة صوتيات الغرفة المحيطة. إلغاء الضوضاء: نشط.",
      "[INFO] مسح طيف التردد بحثا عن بصمات استنساخ الصوت بالذكاء الاصطناعي..."
    ],
    done: [
      "[ALERT] رصدت الطبقات 3 و4 و5 حالات شاذة دلالية حرجة.",
      "[SUCCESS] تم تأمين حالة المستخدم في SQLCipher لمنع العبث.",
      "[BLOCKED] KIRA: تم نشر إجراء مضاد دلالي فوري.",
      "[DOME HARDENED] تم تحييد التهديد. تم مسح ذاكرة المكالمة. الأنظمة الأساسية آمنة."
    ]
  },
  fr: {
    scanning: [
      "[OK] Codec audio OPUS actif. Acheminement de la voix directement vers la RAM locale sécurisée.",
      "[INFO] Initialisation du classificateur Rubert-tiny2 dans le bac à sable de l'appareil.",
      "[OK] Étalonnage de l'acoustique ambiante. Annulation du bruit : Active.",
      "[INFO] Analyse du spectre de fréquences à la recherche de signatures de clonage vocal par IA..."
    ],
    done: [
      "[ALERT] Les couches 3, 4 et 5 ont détecté des anomalies sémantiques critiques.",
      "[SUCCESS] État utilisateur SQLCipher sécurisé pour empêcher toute altération.",
      "[BLOCKED] KIRA : Contre-mesure sémantique active déployée en temps réel.",
      "[DOME HARDENED] Menace neutralisée. Mémoire de l'appel effacée. Systèmes sécurisés."
    ]
  },
  de: {
    scanning: [
      "[OK] OPUS-Audio-Codec aktiv. Sprachdaten werden direkt in den lokalen, sicheren RAM geleitet.",
      "[INFO] Rubert-tiny2-Klassifikator wird in der Geräte-Sandbox initialisiert.",
      "[OK] Kalibrierung der Raumakustik. Rauschunterdrückung: Aktiv.",
      "[INFO] Frequenzspektrum wird auf KI-Stimmenklonungssignaturen gescannt..."
    ],
    done: [
      "[ALERT] Ebenen 3, 4 und 5 haben kritische semantische Anomalien festgestellt.",
      "[SUCCESS] SQLCipher-Nutzerstatus gesichert, um Manipulationen zu verhindern.",
      "[BLOCKED] KIRA: Aktive semantische Gegenmaßnahme in Echtzeit eingeleitet.",
      "[DOME HARDENED] Bedrohung neutralisiert. Anrufspeicher gelöscht. Kernsysteme sicher."
    ]
  },
  pt: {
    scanning: [
      "[OK] Codec de áudio OPUS ativo. Roteando o fluxo de voz diretamente para a RAM local segura.",
      "[INFO] Inicializando o classificador Rubert-tiny2 dentro do sandbox do dispositivo.",
      "[OK] Calibrando a acústica ambiente. Cancelamento de ruído: Ativo.",
      "[INFO] Varrendo o espectro de frequência em busca de assinaturas de clonagem de voz por IA..."
    ],
    done: [
      "[ALERT] As camadas 3, 4 e 5 detectaram anomalias semânticas críticas.",
      "[SUCCESS] Estado do usuário no SQLCipher protegido para evitar adulteração.",
      "[BLOCKED] KIRA: Contramedida semântica ativa implantada em tempo real.",
      "[DOME HARDENED] Ameaça neutralizada. Memória da chamada apagada. Sistemas centrais seguros."
    ]
  },
  hi: {
    scanning: [
      "[OK] OPUS ऑडियो स्ट्रीम कोडेक सक्रिय। वॉइस डेटा सीधे स्थानीय सुरक्षित RAM में भेजा जा रहा है।",
      "[INFO] डिवाइस सैंडबॉक्स के भीतर Rubert-tiny2 क्लासिफायर को इनिशियलाइज़ किया जा रहा है।",
      "[OK] परिवेशीय ध्वनिकी को कैलिब्रेट किया जा रहा है। शोर रद्दीकरण: सक्रिय।",
      "[INFO] AI आवाज़ क्लोनिंग के संकेतों के लिए फ़्रीक्वेंसी स्पेक्ट्रम को स्कैन किया जा रहा है..."
    ],
    done: [
      "[ALERT] परत 3, 4 और 5 ने गंभीर सिमेंटिक विसंगतियों का पता लगाया।",
      "[SUCCESS] छेड़छाड़ रोकने के लिए कोर SQLCipher उपयोगकर्ता स्थिति सुरक्षित की गई।",
      "[BLOCKED] KIRA: रीयल-टाइम सक्रिय सिमेंटिक प्रति-उपाय तैनात किया गया।",
      "[DOME HARDENED] खतरा निष्प्रभावी हो गया। कॉल मेमोरी हटा दी गई। मुख्य सिस्टम सुरक्षित हैं।"
    ]
  },
  ja: {
    scanning: [
      "[OK] OPUSオーディオコーデックが有効です。音声データをローカルの安全なRAMへ直接転送中。",
      "[INFO] デバイスサンドボックス内でRubert-tiny2分類器を初期化中。",
      "[OK] 周囲の音響を較正中。ノイズキャンセリング：有効。",
      "[INFO] AI音声クローンの特徴を検出するため周波数スペクトルをスキャン中..."
    ],
    done: [
      "[ALERT] レイヤー3、4、5が重大な意味的異常を検出しました。",
      "[SUCCESS] 改ざん防止のためコアのSQLCipherユーザー状態を保護しました。",
      "[BLOCKED] KIRA：リアルタイムの意味的対抗措置を展開しました。",
      "[DOME HARDENED] 脅威を無力化しました。通話メモリを消去しました。コアシステムは安全です。"
    ]
  },
  tr: {
    scanning: [
      "[OK] OPUS ses codec'i aktif. Ses akışı doğrudan yerel güvenli RAM'e yönlendiriliyor.",
      "[INFO] Cihaz korumalı alanı içinde Rubert-tiny2 sınıflandırıcısı başlatılıyor.",
      "[OK] Ortam akustiği kalibre ediliyor. Gürültü engelleme: Aktif.",
      "[INFO] Yapay zeka ses klonlama imzaları için frekans spektrumu taranıyor..."
    ],
    done: [
      "[ALERT] Katman 3, 4 ve 5 kritik anlamsal anormallikler tespit etti.",
      "[SUCCESS] Müdahaleyi önlemek için çekirdek SQLCipher kullanıcı durumu güvence altına alındı.",
      "[BLOCKED] KIRA: Gerçek zamanlı aktif anlamsal karşı önlem devreye alındı.",
      "[DOME HARDENED] Tehdit etkisiz hale getirildi. Çağrı belleği temizlendi. Çekirdek sistemler güvende."
    ]
  }
};

export const LiveSimulatorSection = React.memo(function LiveSimulatorSection() {
  const { language } = useTranslation();
  const title = SIMULATOR_TITLE[language] || SIMULATOR_TITLE.en;
  const subtitle = SIMULATOR_SUBTITLE[language] || SIMULATOR_SUBTITLE.en;

  const scenarios = getScenarios(language);
  const [activeScenarioIdx, setActiveScenarioIdx] = useState<number>(0);
  const currentScenario = scenarios[activeScenarioIdx] || scenarios[0];

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentSentenceIdx, setCurrentSentenceIdx] = useState<number>(-1);
  const [threatLevel, setThreatLevel] = useState<number>(5);
  const [activeLayersCount, setActiveLayersCount] = useState<number>(0);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const [visibleSentence, setVisibleSentence] = useState<string>("");
  const sentenceIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const transcriptionEndRef = useRef<HTMLDivElement>(null);
  const transcriptionContainerRef = useRef<HTMLDivElement>(null);

  // UI labels based on language
  const SIM_UI: Record<string, Record<string, string>> = {
    ru: { start: "Запустить симуляцию", reset: "Сбросить", caller: "Собеседник", incoming: "Входящий вызов...", secure: "СЕССИЯ ЗАЩИЩЕНА", threat: "Шкала угрозы социального инжиниринга", logs: "ЛОГ СИСТЕМЫ ОБОРОНЫ PHANTOM", finished: "СИМУЛЯЦИЯ ЗАВЕРШЕНА // УГРОЗА БЛОКИРОВАНА", warning: "KIRA: ОБНАРУЖЕНА УГРОЗА! ПОВЕСЬТЕ ТРУБКУ!", clickStart: "Нажмите кнопку ниже, чтобы запустить симуляцию голосового потока", statusHeader: "СТАТУС СЛОЕВ ФИЛЬТРАЦИИ PHANTOM 2.0" },
    en: { start: "Start Simulation", reset: "Reset", caller: "Caller", incoming: "Incoming call...", secure: "SESSION SECURED", threat: "Social Engineering Threat Level", logs: "PHANTOM DEFENSE LOG", finished: "SIMULATION COMPLETE // ATTACK BLOCKED", warning: "KIRA: ATTEMPTED FRAUD DETECTED! HANG UP!", clickStart: "Click 'Start Simulation' below to stream voice data packets", statusHeader: "PHANTOM 2.0 DEFENSE LAYER STATUS" },
    es: { start: "Iniciar Simulación", reset: "Reiniciar", caller: "Interlocutor", incoming: "Llamada entrante...", secure: "SESIÓN PROTEGIDA", threat: "Nivel de Amenaza de Ingeniería Social", logs: "REGISTRO DE DEFENSA PHANTOM", finished: "SIMULACIÓN COMPLETADA // ATAQUE BLOQUEADO", warning: "KIRA: ¡FRAUDE DETECTADO! ¡CUELGUE!", clickStart: "Haga clic en 'Iniciar simulación' abajo para transmitir datos de voz", statusHeader: "ESTADO DE CAPAS PHANTOM 2.0" },
    zh: { start: "开始模拟", reset: "重置", caller: "对方", incoming: "来电中...", secure: "会话已加密保护", threat: "社交工程威胁级别", logs: "PHANTOM 防御日志", finished: "模拟完成 // 攻击已被拦截", warning: "KIRA：检测到诈骗危险！请立即挂机！", clickStart: "点击下方按钮启动语音流模拟", statusHeader: "PHANTOM 2.0 防御层状态" },
    tr: { start: "Simülasyonu Başlat", reset: "Sıfırla", caller: "Arayan", incoming: "Gelen arama...", secure: "OTURUM GÜVENLİ", threat: "Sosyal Mühendislik Tehdit Seviyesi", logs: "PHANTOM SAVUNMA GÜNLÜĞÜ", finished: "SİMÜLASYON TAMAMLANDI // SALDIRI ENGELLENDİ", warning: "KIRA: DOLANDIRICILIK ALGILANDI! TELEFONU KAPATIN!", clickStart: "Ses veri paketlerini akıtmak için 'Simülasyonu Başlat'a tıklayın", statusHeader: "PHANTOM 2.0 SAVUNMA KATMANI DURUMU" },
    hi: { start: "सिमुलेशन शुरू करें", reset: "रीसेट करें", caller: "कैलर", incoming: "आने वाली कॉल...", secure: "सत्र सुरक्षित", threat: "सामाजिक इंजीनियरिंग खतरा स्तर", logs: "PHANTOM रक्षा लॉग", finished: "सिमुलेशन पूरा // हमला अवरुद्ध", warning: "KIRA: धोखाधड़ी का पता चला! फोन काटें!", clickStart: "वॉइस स्ट्रीम सिमुलेशन शुरू करने के लिए नीचे क्लिक करें", statusHeader: "PHANTOM 2.0 रक्षा स्तर स्थिति" },
    ar: { start: "بدء المحاكاة", reset: "إعادة ضبط", caller: "المتصل", incoming: "مكالمة واردة...", secure: "جلسة آمنة", threat: "مستوى تهديد الهندسة الاجتماعية", logs: "سجل دفاع PHANTOM", finished: "اكتملت المحاكاة // تم حظر الهجوم", warning: "KIRA: تم اكتشاف محاولة احتيال! أغلِق الخط!", clickStart: "انقر على زر البدء أدناه لبدء محاكاة تدفق الصوت", statusHeader: "حالة طبقات الحماية PHANTOM 2.0" },
    pt: { start: "Iniciar Simulação", reset: "Reiniciar", caller: "Chamador", incoming: "Chamada recebida...", secure: "SESSÃO PROTEGIDA", threat: "Nível de Ameaça de Engenharia Social", logs: "REGISTRO DE DEFESA PHANTOM", finished: "SIMULAÇÃO CONCLUÍDA // ATAQUE BLOQUEADO", warning: "KIRA: FRAUDE DETECTADA! DESLIGUE O TELEFONE!", clickStart: "Clique no botão abaixo para iniciar a simulação de voz", statusHeader: "STATUS DA CAMADA DE DEFESA PHANTOM 2.0" },
    fr: { start: "Lancer la simulation", reset: "Réinitialiser", caller: "Appelant", incoming: "Appel entrant...", secure: "SÉANCE SÉCURISÉE", threat: "Niveau de Menace d'Ingénierie Sociale", logs: "JOURNAL DE DÉFENSE PHANTOM", finished: "SIMULATION TERMINÉE // ATTAQUE BLOQUÉE", warning: "KIRA : FRAUDE DÉTECTÉE ! RACCROCHEZ !", clickStart: "Cliquez sur le bouton ci-dessous pour démarrer la simulation", statusHeader: "ÉTAT DES COUCHES PHANTOM 2.0" },
    de: { start: "Simulation starten", reset: "Zurücksetzen", caller: "Anrufer", incoming: "Eingehender Anruf...", secure: "SITZUNG GESICHERT", threat: "Bedrohungsstufe für Social Engineering", logs: "PHANTOM-ABWEHRLOGBUCH", finished: "SIMULATION ABGESCHLOSSEN // ANGRIFF BLOCKIERT", warning: "KIRA: BETRUGSVERSUCH ERKANNT! AUFLEGEN!", clickStart: "Klicken Sie unten, um die Sprachdatensimulation zu starten", statusHeader: "PHANTOM 2.0 SCHUTZSCHICHT-STATUS" },
    ja: { start: "シミュレーション開始", reset: "リセット", caller: "発信者", incoming: "着信中...", secure: "セッション保護中", threat: "ソーシャルエンジニアリング脅威レベル", logs: "PHANTOM防御ログ", finished: "シミュレーション完了 // 攻撃ブロック", warning: "KIRA: 詐欺攻撃を検知！すぐに切断してください！", clickStart: "下のボタンをクリックして音声ストリームを開始してください", statusHeader: "PHANTOM 2.0 防御レイヤーステータス" }
  };
  const sui = SIM_UI[language] || SIM_UI.en;
  const btnStart = sui.start;
  const btnReset = sui.reset;
  const callerLabel = sui.caller;
  const incomingLabel = sui.incoming;
  const secureLabel = sui.secure;
  const threatMeterLabel = sui.threat;
  const logsLabel = sui.logs;
  const simulationFinishedLabel = sui.finished;
  const warningBubbleLabel = sui.warning;

  const layers = LAYER_LABELS_BY_LANG[language] || LAYER_LABELS_BY_LANG.en;

  useEffect(() => {
    // Clear simulation on language or scenario change
    resetSimulation();
  }, [language, activeScenarioIdx]);

  useEffect(() => {
    const container = transcriptionContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [currentSentenceIdx, visibleSentence]);

  const resetSimulation = () => {
    if (sentenceIntervalRef.current) clearInterval(sentenceIntervalRef.current);
    setIsPlaying(false);
    setCurrentSentenceIdx(-1);
    setThreatLevel(5);
    setActiveLayersCount(0);
    setVisibleSentence("");
    
    // Set initial system logs
    const defaultLogs = CONSOLE_LOGS_BY_LANG[language]?.scanning || CONSOLE_LOGS_BY_LANG.en.scanning;
    setConsoleLogs([...defaultLogs]);
  };

  const startSimulation = () => {
    if (isPlaying) return;
    setIsPlaying(true);
    setCurrentSentenceIdx(0);
    setThreatLevel(currentScenario.threatMilestones[0]);
    setActiveLayersCount(2); // Layer 1 and 2 light up early
    setVisibleSentence("");

    // Simulate typing text for the first sentence
    animateSentenceTyping(currentScenario.speech[0]);

    let step = 0;
    sentenceIntervalRef.current = setInterval(() => {
      step++;
      if (step >= currentScenario.speech.length) {
        clearInterval(sentenceIntervalRef.current!);
        setIsPlaying(false);
        // Complete remaining logs and layers
        setActiveLayersCount(7);
        const doneLogs = CONSOLE_LOGS_BY_LANG[language]?.done || CONSOLE_LOGS_BY_LANG.en.done;
        setConsoleLogs(prev => [...prev, ...doneLogs]);
        return;
      }

      setCurrentSentenceIdx(step);
      setThreatLevel(currentScenario.threatMilestones[step]);
      
      // Gradually activate defense layers
      if (step === 1) setActiveLayersCount(3);
      if (step === 2) setActiveLayersCount(4);
      if (step === 3) setActiveLayersCount(5);
      if (step === 4) setActiveLayersCount(7);

      // Add relevant high-tech logs dynamically based on milestones
      const currentSentence = currentScenario.speech[step];
      animateSentenceTyping(currentSentence);

      // Injected log entries
      if (step === 1) {
        setConsoleLogs(prev => [
          ...prev,
          `[SCAN] LAYER_3: Lexical match detected phrase: "${currentScenario.triggers[0] || 'fraud pattern'}"`,
        ]);
      }
      if (step === 2) {
        setConsoleLogs(prev => [
          ...prev,
          `[WARN] LAYER_4: Manipulation scheme detected. Semantic anomaly weight: 0.72.`,
          `[SCAN] LAYER_3: Match found: "${currentScenario.triggers[1] || 'unauthorized'}"`
        ]);
      }
      if (step === 3) {
        setConsoleLogs(prev => [
          ...prev,
          `[CRITICAL] LAYER_5: Authority coercion detected. Hostile dialog patterns matched with 94% probability.`,
          `[SCAN] LAYER_6: Phrase "${currentScenario.triggers[2] || 'verification code'}" matches blacklisted signatures.`
        ]);
      }
    }, 4500);
  };

  const animateSentenceTyping = (text: string) => {
    setVisibleSentence("");
    let charIdx = 0;
    const timer = setInterval(() => {
      setVisibleSentence(prev => prev + text.charAt(charIdx));
      charIdx++;
      if (charIdx >= text.length) {
        clearInterval(timer);
      }
    }, 20);
  };

  // Helper to color triggers in transcription
  const highlightTriggers = (text: string) => {
    let highlighted = text;
    currentScenario.triggers.forEach(trigger => {
      const regex = new RegExp(`(${trigger})`, "gi");
      highlighted = highlighted.replace(regex, `<span class="text-[#EF4444] font-bold border-b border-[#EF4444]/40">$1</span>`);
    });
    return <span dangerouslySetInnerHTML={{ __html: highlighted }} />;
  };

  return (
    <section 
      className="relative w-full py-16 sm:py-20 px-4 border-t border-[#1F2937]/30 bg-[#0A0A0B] overflow-hidden" 
      id="live-simulator"
    >
      {/* Visual tech matrix background decoration */}
      <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-[#2E7DFF]/[0.015] to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(46,125,255,0.03)_0%,rgba(0,0,0,0)_70%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111827] border border-[#2E7DFF]/20 mb-6">
            <Radio className="w-3.5 h-3.5 text-[#2E7DFF] animate-pulse" />
            <span className="font-mono text-[10px] sm:text-xs font-semibold tracking-wider text-[#2E7DFF] uppercase">
              INTERACTIVE TEST CONSOLE // PHANTOM 2.0
            </span>
          </div>
          
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-[#F5F5F0] tracking-tight mb-6">
            {title}
          </h2>
          
          <p className="font-sans text-sm sm:text-base text-gray-400 max-w-xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Dynamic Scenario Selection Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto mb-12">
          {scenarios.map((sc, idx) => (
            <button
              key={sc.id}
              onClick={() => {
                if (!isPlaying) {
                  setActiveScenarioIdx(idx);
                }
              }}
              disabled={isPlaying}
              className={`px-4 py-2.5 rounded-xl font-sans text-xs sm:text-sm font-semibold border transition-all duration-300 flex items-center gap-2 ${
                isPlaying ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              } ${
                activeScenarioIdx === idx
                  ? "bg-[#2E7DFF]/15 border-[#2E7DFF] text-[#2E7DFF] shadow-[0_0_15px_rgba(46,125,255,0.15)]"
                  : "bg-[#0B0C0E]/60 border-white/[0.04] text-gray-400 hover:text-[#F5F5F0] hover:bg-white/[0.02]"
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              {sc.name}
            </button>
          ))}
        </div>

        {/* Live Simulator Workbench Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto items-stretch">
          
          {/* PHONE CALL SIMULATOR COLUMN (Col 5) */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-[#090A0E] border border-white/[0.04] relative overflow-hidden shadow-2xl min-h-[500px]">
            
            {/* Flashing Intrusion Danger Ambient Cover */}
            <AnimatePresence>
              {threatLevel >= 75 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.4, 0.1, 0.4, 0] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-[#EF4444]/15 pointer-events-none z-15"
                />
              )}
            </AnimatePresence>

            {/* Simulated Phone UI Header */}
            <div className="flex items-center justify-between z-10">
              <div className="flex items-center gap-1.5 bg-white/[0.02] border border-white/[0.05] px-2.5 py-1 rounded-md font-mono text-[9px] text-[#2E7DFF]">
                <div className="w-1.5 h-1.5 rounded-full bg-[#2E7DFF] animate-pulse" />
                <span>GSM // SECURE LINE</span>
              </div>
              <span className="font-mono text-[10px] text-gray-500">
                {isPlaying ? "00:24" : "00:00"}
              </span>
            </div>

            {/* Caller Active Badge / Interactive Headpiece */}
            <div className="flex flex-col items-center justify-center my-8 text-center z-10 relative">
              <div className="relative w-20 h-20 rounded-full bg-[#111319] border border-white/[0.05] flex items-center justify-center mb-4">
                {/* Active Caller waves */}
                {isPlaying && (
                  <>
                    <div className="absolute inset-0 rounded-full border border-[#EF4444]/40 animate-ping" style={{ animationDuration: "2.5s" }} />
                    <div className="absolute -inset-2 rounded-full border border-[#EF4444]/20 animate-ping" style={{ animationDuration: "3.5s" }} />
                  </>
                )}
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${threatLevel >= 75 ? "bg-[#EF4444]/10 border border-[#EF4444]/30" : "bg-[#2E7DFF]/10 border border-[#2E7DFF]/20"}`}>
                  <Phone className={`w-6 h-6 ${threatLevel >= 75 ? "text-[#EF4444]" : "text-[#2E7DFF]"} ${isPlaying ? "animate-pulse" : ""}`} />
                </div>
              </div>
              <span className="font-mono text-[9px] uppercase text-[#2E7DFF] tracking-wider mb-0.5">{callerLabel}</span>
              <h4 className="font-display font-bold text-base text-[#F5F5F0]">{currentScenario.caller}</h4>
              <p className="font-mono text-[10px] text-gray-500 mt-1">{isPlaying ? "ACTIVE AUDIO WAVE STREAM" : incomingLabel}</p>
            </div>

            {/* LIVE DIALOG TRANSCRIPTION CANVAS */}
            <div 
              ref={transcriptionContainerRef}
              className="flex-1 min-h-[160px] max-h-[220px] overflow-y-auto p-4 rounded-2xl bg-[#030406] border border-white/[0.02] flex flex-col gap-3 relative scrollbar-thin z-10"
            >
              {currentSentenceIdx === -1 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
                  <Mic className="w-6 h-6 text-gray-600 mb-2 animate-bounce" />
                  <p className="font-sans text-xs text-gray-500 leading-relaxed">
                    {sui.clickStart}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {currentScenario.speech.slice(0, currentSentenceIdx).map((sent, i) => (
                    <div key={i} className="text-left bg-white/[0.01] p-3 rounded-xl border border-white/[0.02]">
                      <p className="font-mono text-[9px] text-gray-500 mb-1">
                        SENC-{String(i+1).padStart(2, "0")} // SECURE_RAM_TRANSCRIPTION
                      </p>
                      <p className="font-sans text-xs text-gray-300 leading-relaxed">
                        {highlightTriggers(sent)}
                      </p>
                    </div>
                  ))}

                  {/* Active Sentence Typing */}
                  {visibleSentence && (
                    <motion.div 
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-left bg-[#110D12] p-3 rounded-xl border border-[#EF4444]/15"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono text-[9px] text-[#EF4444] uppercase tracking-wider flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444] animate-ping" />
                          LIVE PARSING...
                        </span>
                      </div>
                      <p className="font-sans text-xs text-[#F5F5F0] leading-relaxed">
                        {highlightTriggers(visibleSentence)}
                      </p>
                    </motion.div>
                  )}
                  <div ref={transcriptionEndRef} />
                </div>
              )}
            </div>

            {/* KIRA Real-time Threat Overlay Box */}
            <AnimatePresence>
              {threatLevel >= 75 && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="mt-4 p-4 rounded-xl bg-[#7F1D1D]/40 border border-[#EF4444]/40 flex items-center gap-3 z-10"
                >
                  <AlertTriangle className="w-5 h-5 text-[#EF4444] shrink-0 animate-bounce" />
                  <div className="text-left">
                    <p className="font-mono text-[10px] font-black text-[#EF4444] uppercase tracking-wider">
                      {warningBubbleLabel}
                    </p>
                    <p className="font-sans text-[11px] text-gray-300 leading-normal mt-0.5">
                      {(language === "ru" ? "Фраз обнаружено: " : "Threat triggers matching: ") + currentScenario.triggers.slice(0, currentSentenceIdx + 1).length + (language === "ru" ? ". Запущен процесс экстренного глушения семантики." : ". Active intercept loop deployed.")}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Simulation Controls Footer */}
            <div className="grid grid-cols-2 gap-3 mt-6 z-10">
              <button
                onClick={startSimulation}
                disabled={isPlaying || currentSentenceIdx !== -1}
                className={`py-3 px-4 rounded-xl font-sans text-xs font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                  isPlaying || currentSentenceIdx !== -1
                    ? "bg-gray-800 text-gray-500 border border-transparent cursor-not-allowed"
                    : "bg-[#2E7DFF] text-[#F5F5F0] hover:bg-[#2E7DFF]/90 cursor-pointer shadow-[0_0_15px_rgba(46,125,255,0.2)] hover:shadow-[0_0_20px_rgba(46,125,255,0.4)]"
                }`}
              >
                <Play className="w-3.5 h-3.5" />
                {btnStart}
              </button>
              <button
                onClick={resetSimulation}
                className="py-3 px-4 rounded-xl font-sans text-xs font-bold bg-[#111216] border border-white/[0.05] text-gray-400 hover:text-white hover:bg-white/[0.02] cursor-pointer transition-colors flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                {btnReset}
              </button>
            </div>

          </div>

          {/* NEURAL HUD AND LOGS COLUMN (Col 7) */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-6">
            
            {/* THREAT CLIMBER HUD */}
            <div className="p-6 rounded-3xl bg-[#090A0E] border border-white/[0.04]">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-mono text-xs font-bold text-gray-400 uppercase tracking-wider">
                  {threatMeterLabel}
                </h4>
                <span className={`font-mono text-xs font-black ${threatLevel >= 75 ? "text-[#EF4444]" : threatLevel >= 40 ? "text-amber-500" : "text-[#2E7DFF]"}`}>
                  {threatLevel}% THREAT_LEVEL
                </span>
              </div>
              
              {/* Dynamic Progress Bar */}
              <div className="w-full h-3.5 bg-[#030406] rounded-full overflow-hidden border border-white/[0.02] p-[2px]">
                <motion.div 
                  className={`w-full h-full rounded-full origin-left ${threatLevel >= 75 ? "bg-[#EF4444]" : threatLevel >= 40 ? "bg-amber-500" : "bg-[#2E7DFF]"} shadow-[0_0_12px_currentColor]`}
                  initial={{ scaleX: 0.05 }}
                  animate={{ scaleX: threatLevel / 100 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>

              {/* Secure Shield Confirmation */}
              {threatLevel >= 95 && (
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="mt-4 p-3 rounded-xl bg-[#101B2B] border border-[#2E7DFF]/30 flex items-center justify-center gap-2.5"
                >
                  <ShieldCheck className="w-4 h-4 text-[#2E7DFF] animate-pulse" />
                  <span className="font-mono text-[10px] font-black tracking-wider text-[#2E7DFF] uppercase">
                    {simulationFinishedLabel}
                  </span>
                </motion.div>
              )}
            </div>

            {/* 7 LAYER PIPELINE STATUS TRACKER */}
            <div className="p-6 rounded-3xl bg-[#090A0E] border border-white/[0.04] flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-mono text-xs font-bold text-gray-400 uppercase tracking-wider">
                    {sui.statusHeader}
                  </h4>
                  <span className="font-mono text-[10px] text-gray-500">
                    {activeLayersCount}/7 ACTIVE
                  </span>
                </div>

                <div className="space-y-2.5">
                  {layers.map((layerLabel, index) => {
                    const isActive = index < activeLayersCount;
                    const isScanning = index === activeLayersCount && isPlaying;
                    const isThreatLayer = index >= 2 && index < 5 && threatLevel >= 50; // Middle layers highlighting threat
                    
                    return (
                      <div 
                        key={index}
                        className={`p-2.5 sm:p-3 rounded-xl border transition-all duration-300 flex items-center justify-between ${
                          isActive 
                            ? isThreatLayer && threatLevel >= 75
                              ? "bg-[#2E1010]/50 border-[#EF4444]/40 shadow-[0_0_8px_rgba(239,68,68,0.15)]"
                              : "bg-[#0B1527]/60 border-[#2E7DFF]/35" 
                            : isScanning
                              ? "bg-white/[0.01] border-[#2E7DFF]/30 animate-pulse"
                              : "bg-transparent border-white/[0.02]"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-2.5 h-2.5 rounded-full ${
                            isActive
                              ? isThreatLayer && threatLevel >= 75
                                ? "bg-[#EF4444]"
                                : "bg-[#2E7DFF]"
                              : isScanning
                                ? "bg-amber-400 animate-ping"
                                : "bg-gray-800"
                          }`} />
                          <span className={`font-mono text-[10px] sm:text-xs tracking-tight ${
                            isActive
                              ? isThreatLayer && threatLevel >= 75
                                ? "text-[#EF4444] font-semibold"
                                : "text-gray-200"
                              : "text-gray-500"
                          }`}>
                            {layerLabel}
                          </span>
                        </div>

                        <span className={`font-mono text-[9px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded ${
                          isActive
                            ? isThreatLayer && threatLevel >= 75
                              ? "bg-[#EF4444]/15 text-[#EF4444]"
                              : "bg-[#2E7DFF]/15 text-[#2E7DFF]"
                            : isScanning
                              ? "bg-amber-400/10 text-amber-400"
                              : "bg-transparent text-gray-700"
                        }`}>
                          {isActive 
                            ? isThreatLayer && threatLevel >= 75 ? "ALERT" : "VERIFIED" 
                            : isScanning ? "SCANNING" : "STANDBY"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* REAL-TIME ENCRYPTED TERMINAL CONSOLE */}
            <div className="p-5 rounded-3xl bg-[#030406] border border-white/[0.04] h-48 flex flex-col justify-between">
              <div className="flex items-center gap-2 border-b border-white/[0.04] pb-2 mb-2">
                <Terminal className="w-4 h-4 text-gray-500" />
                <span className="font-mono text-[9px] text-gray-400 uppercase tracking-widest font-semibold">
                  {logsLabel}
                </span>
                <span className="ml-auto w-2 h-2 rounded-full bg-[#2E7DFF] animate-ping" />
              </div>

              <div className="flex-1 overflow-y-auto font-mono text-[10px] text-gray-400 text-left space-y-1.5 scrollbar-thin">
                {consoleLogs.map((log, index) => {
                  let colorClass = "text-gray-400";
                  if (log.startsWith("[OK]")) colorClass = "text-[#2E7DFF]";
                  else if (log.startsWith("[SUCCESS]") || log.startsWith("[DOME")) colorClass = "text-[#10B981] font-bold";
                  else if (log.startsWith("[WARN]")) colorClass = "text-amber-500";
                  else if (log.startsWith("[CRITICAL]") || log.startsWith("[ALERT]") || log.startsWith("[BLOCKED]")) colorClass = "text-[#EF4444] font-black";

                  return (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`leading-normal ${colorClass}`}
                    >
                      {log}
                    </motion.div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
});

export default LiveSimulatorSection;
