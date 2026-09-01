import { useState } from "react";
import { ChevronDown, AlertTriangle } from "lucide-react";
import { motion } from "motion/react";
import { useTranslation } from "../i18n/LanguageContext";
import { useEcoMode } from "../context/EcoModeContext";
import type { LanguageCode } from "../i18n/languages";
import SectionBadge from "./SectionBadge";
import ScanCard from "./ScanCard";

/* ============================================================================
   HelpChecklistSection — Чек-лист «Что делать, если вас обманули».
   Evergreen emergency steps, 11 languages, self-contained content.
   ========================================================================== */

interface StepDef {
  title: string;
  description: string;
  details: string[];
}

interface ChecklistContent {
  badge: string;
  title: string;
  subtitle: string;
  steps: StepDef[];
  warningTitle: string;
  warningItems: string[];
  progressLabel: string;
  allDoneLabel: string;
}

const CONTENT: Record<LanguageCode, ChecklistContent> = {
  ru: {
    badge: "ЭКСТРЕННЫЙ ЧЕК-ЛИСТ",
    title: "Что делать, если вас обманули",
    subtitle: "Пошаговый план действий. Чем быстрее выполните — тем больше шансов вернуть средства и остановить мошенников.",
    steps: [
      {
        title: "Немедленно заблокируйте карту / счёт",
        description: "Позвоните в банк по официальному номеру (указан на обороте карты или в приложении). НЕ перезванивайте на номер, с которого вам звонили.",
        details: [
          "В приложении банка обычно есть кнопка «Заблокировать карту» — это самый быстрый способ",
          "Если карты нет под рукой — позвоните на горячую линию банка",
          "Попросите заблокировать и дебетовую, и кредитную карту, если мошенники могли получить доступ к обеим",
        ],
      },
      {
        title: "Смените пароли и отозвайте доступы",
        description: "Поменяйте пароли от банковского приложения, почты и всех аккаунтов, к которым был доступ по SMS-кодам.",
        details: [
          "Начните с банковского приложения — смените пароль и PIN-код",
          "Почта — к ней привязаны восстановления всех остальных аккаунтов",
          "Если вы сообщили код из SMS — немедленно сменийте пароль той службы",
          "Отзовите доступ к любым сторонним приложениям, которым вы давали разрешение",
        ],
      },
      {
        title: "Официально сообщите в банк",
        description: "Подайте письменное заявление о мошеннической транзакции. Это обязательный шаг для возврата средств.",
        details: [
          "Напишите заявление в отделении банка или через интернет-банк (раздел «Оспаривание транзакций»)",
          "Укажите точную сумму, дату и время операции",
          "Сохраните номер заявления — по нему будете отслеживать статус",
          "По закону банк обязан рассмотреть заявление в течение 30 дней (в некоторых случаях — до 60)",
        ],
      },
      {
        title: "Подайте заявление в полицию",
        description: "Обратитесь в отдел полиции или подайте заявление онлайн через официальный портал.",
        details: [
          "Приходите с паспортом и распечаткой переписок / скриншотов",
          "Укажите все известные данные: номер телефона мошенника, реквизиты карты, сумму",
          "Попросите копию заявления с регистрационным номером",
          "Если мошенники из-за рубежа — заявление всё равно подавайте, это важно для статистики и возможноhelpful для следствия",
        ],
      },
      {
        title: "Соберите и сохраните все доказательства",
        description: "Сохраните SMS, скриншоты звонков, переписки, чеки и любую информацию о мошеннике.",
        details: [
          "Скриншоты всех SMS и мессенджеров (не удаляйте оригиналы)",
          "История звонков — номер, время, длительность",
          "Выписка по счёту с детализацией операций",
          "Любые ссылки, QR-коды или файлы, которые присылал мошенник",
        ],
      },
      {
        title: "Куда жаловаться на мошенника",
        description: "Помимо банка и полиции, есть дополнительные каналы для подачи жалоб.",
        details: [
          "Омбудсмен банка — если банк не реагирует на заявление",
          "Регулятор (Центральный банк) — подайте жалобу через интернет-приёмную",
          "Площадка / маркетплейс — если мошенник действовал через конкретную платформу",
          "Роспотребнадзор — если речь о навязанных платных услугах или «защитных» подписках",
        ],
      },
    ],
    warningTitle: "Чего НЕЛЬЗЯ делать",
    warningItems: [
      "Не платите «за разблокировку» — ни банк, ни полиция не берёт плату за блокировку или расследование",
      "Не сообщайте коды из SMS и одноразовые пароли — nikому, включая «сотрудников банка»",
      "Не устанавливайте приложения для удалённого доступа (AnyDesk, RustDesk и т.п.) по просьбе «из банка»",
      "Не перезванивайте на номера, с которых вам звонили — звоните только на официальную горячую линию",
    ],
    progressLabel: "Выполнено из {n}",
    allDoneLabel: "Все шаги выполнены. Сохраните копию этого чек-листа на случай, если понадобится вернуться.",
  },
  en: {
    badge: "EMERGENCY CHECKLIST",
    title: "What to do if you've been scammed",
    subtitle: "A step-by-step action plan. The faster you act, the better your chances of recovering your money and stopping the scammers.",
    steps: [
      {
        title: "Block your card / freeze your account immediately",
        description: "Call your bank using the official number (on the back of your card or in the app). Do NOT call back the number that contacted you.",
        details: [
          "Most banking apps have a 'Block card' button — this is the fastest option",
          "If you don't have the card nearby, call the bank's hotline",
          "Ask to block both debit and credit cards if the scammers may have accessed both",
        ],
      },
      {
        title: "Change passwords and revoke access",
        description: "Update passwords for your banking app, email, and any accounts linked to SMS verification codes.",
        details: [
          "Start with the banking app — change password and PIN",
          "Email — it's the key to recovering all your other accounts",
          "If you shared an SMS code, immediately change the password of that service",
          "Revoke access for any third-party apps you granted permissions to",
        ],
      },
      {
        title: "File an official report with your bank",
        description: "Submit a written claim disputing the fraudulent transaction. This is essential for getting your money back.",
        details: [
          "File the claim at a branch or through online banking (look for 'Dispute transactions')",
          "Include the exact amount, date, and time of the transaction",
          "Keep the reference number — you'll need it to track the status",
          "By law, the bank must review your claim within 30 days (up to 60 in some cases)",
        ],
      },
      {
        title: "Report to the police",
        description: "Visit your local police station or file a report online through the official portal.",
        details: [
          "Bring your ID and printouts of conversations / screenshots",
          "Include all known details: scammer's phone number, card details, amount",
          "Ask for a stamped copy of your report with a registration number",
          "Even if scammers are abroad, filing a report matters for statistics and investigation",
        ],
      },
      {
        title: "Collect and preserve all evidence",
        description: "Save SMS, call logs, screenshots, receipts, and any information about the scammer.",
        details: [
          "Screenshot all SMS and messenger conversations (don't delete originals)",
          "Call history — number, time, duration",
          "Bank statement with transaction details",
          "Any links, QR codes, or files the scammer sent you",
        ],
      },
      {
        title: "Where else to complain about fraud",
        description: "Beyond the bank and police, there are additional channels for filing complaints.",
        details: [
          "Bank ombudsman — if the bank doesn't respond to your claim",
          "Financial regulator — submit a complaint through the official online portal",
          "Platform / marketplace — if the scammer operated through a specific service",
          "Consumer protection agency — for unwanted paid services or subscription traps",
        ],
      },
    ],
    warningTitle: "What NOT to do",
    warningItems: [
      "Do not pay 'to unlock' — neither the bank nor police charges for blocking or investigation",
      "Never share SMS codes or one-time passwords — with anyone, including 'bank employees'",
      "Do not install remote access apps (AnyDesk, RustDesk, etc.) at the request of someone claiming to be from the bank",
      "Do not call back numbers that contacted you — only call the official hotline",
    ],
    progressLabel: "Completed: {n}",
    allDoneLabel: "All steps completed. Save a copy of this checklist in case you need to refer back to it.",
  },
  tr: {
    badge: "ACIL KONTROL LİSTESİ",
    title: "Dolandırıldıysanız ne yapmalısınız",
    subtitle: "Adım adım hareket planı. Ne kadar hızlı hareket ederseniz, paranızı geri kazanma ve dolandırıcıları durdurma şansınız o kadar artar.",
    steps: [
      {
        title: "Kartınızı / hesabınızı hemen bloke edin",
        description: "Bankanızı resmi numaradan arayın (kartın arkasında veya uygulamada). Sizi arayan numarayı GERİ ARAMAYIN.",
        details: [
          "Banka uygulamasında genellikle 'Kartı bloke et' butonu vardır — en hızlı yol budur",
          "Kartınız yanınızda değilse, bankanın müşteri hizmetlerini arayın",
          "Dolandırıcıların her iki karta da erişimi varsa hem banka hem kredi kartını bloke ettirin",
        ],
      },
      {
        title: "Şifrelerinizi değiştirin ve erişimleri iptal edin",
        description: "Bankacılık uygulamanızın, e-postanızın ve SMS doğrulama kodlarıyla bağlantılı tüm hesapların şifresini değiştirin.",
        details: [
          "Banka uygulamasından başlayın — şifre ve PIN kodunu değiştirin",
          "E-posta — diğer tüm hesaplarınızın kurtarılmasına bağlıdır",
          "SMS kodunu paylaştıysanız, o hizmetin şifresini hemen değiştirin",
          "İzin verdiğiniz üçüncü taraf uygulamalarının erişimini iptal edin",
        ],
      },
      {
        title: "Bankanıza resmi olarak bildirin",
        description: "Sahte işlemle ilgili yazılı itiraz başvurusu yapın. Paranızı geri almak için bu şarttır.",
        details: [
          "Başvuruyu şubeden veya internet bankacılığından yapın (İşlemlere İtiraz bölümü)",
          "İşlemin tutarını, tarihini ve saatini kesin olarak belirtin",
          "Başvuru numaranızı saklayın — durumu takip etmek için gerekecek",
          "Yasaya göre banka 30 gün içinde (bazen 60 güne kadar) başvurunuzu incelemelidir",
        ],
      },
      {
        title: "Polise şikayette bulunun",
        description: "En yakın karakola gidin veya resmi portal üzerinden çevrimiçi başvuru yapın.",
        details: [
          "Kimlik kartınız ve konuşmaların çıktıları / ekran görüntüleri ile gidin",
          "Bilinen tüm bilgileri belirtin: dolandırıcının telefon numarası, kart bilgileri, tutar",
          "Şikayetinizin damgalı bir kopyasını ve kayıt numarasını isteyin",
          "Dolandırıcılar yurt dışındaysa bile şikayette bulunun, istatistik ve soruşturma için önemlidir",
        ],
      },
      {
        title: "Tüm kanıtları toplayın ve saklayın",
        description: "SMS'leri, arama kayıtlarını, ekran görüntülerini, makbuzları ve dolandırıcıya ait tüm bilgileri saklayın.",
        details: [
          "Tüm SMS ve mesajlaşma uygulamalarının ekran görüntülerini alın (orijinalleri silmeyin)",
          "Arama geçmişi — numara, süre, tarih",
          "İşlem detaylarıyla banka hesap özeti",
          "Dolandırıcının gönderdiği tüm bağlantılar, QR kodları veya dosyalar",
        ],
      },
      {
        title: "Şikayet edebileceğiniz diğer yerler",
        description: "Banka ve polisin yanı sıra, şikayette bulunabileceğiniz ek kanallar vardır.",
        details: [
          "Banka ombudsmanı — banka başvurunuza yanıt vermezse",
          "Düzenleyici kurum — resmi çevrimiçi portal üzerinden şikayette bulunun",
          "Platform / pazar yeri — dolandırıcı belirli bir hizmet üzerinden çalıştıysa",
          "Tüketici koruma kuruluşu — istenmeyen ücretli hizmetler veya abonelik tuzakları için",
        ],
      },
    ],
    warningTitle: "Yapmamanız gerekenler",
    warningItems: [
      "'Kilidi açmak için' ödeme yapmayın — ne banka ne de polis bloke etme veya soruşturma için ücret talep eder",
      "SMS kodlarını veya tek kullanımlık şifreleri kimseyle paylaşmayın — 'banka çalışanları' dahil",
      "Banka adına arayan kişilerin isteğiyle uzaktan erişim uygulamaları (AnyDesk, RustDesk vb.) yüklemeyin",
      "Sizi arayan numaraları geri aramayın — sadece resmi müşteri hizmetlerini arayın",
    ],
    progressLabel: "Tamamlanan: {n}",
    allDoneLabel: "Tüm adımlar tamamlandı. Gerektiğinde başvurmak üzere bu kontrol listesinin bir kopyasını saklayın.",
  },
  es: {
    badge: "LISTA DE VERIFICACION DE EMERGENCIA",
    title: "Que hacer si te han estafado",
    subtitle: "Plan de accion paso a paso. Cuanto antes actues, mas posibilidades tendras de recuperar tu dinero y detener a los estafadores.",
    steps: [
      {
        title: "Bloquea tu tarjeta / congela tu cuenta inmediatamente",
        description: "Llama al banco usando el numero oficial (en el reverso de la tarjeta o en la aplicacion). NO devuelvas la llamada al numero que te contacto.",
        details: [
          "La mayoria de aplicaciones bancarias tienen un boton 'Bloquear tarjeta' — es la opcion mas rapida",
          "Si no tienes la tarjeta a mano, llama a la linea de atencion al cliente",
          "Pide bloquear tanto la tarjeta de debito como la de credito si los estafadores pudieron acceder a ambas",
        ],
      },
      {
        title: "Cambia contrasenas y revoca accesos",
        description: "Actualiza las contrasenas de tu aplicacion bancaria, correo electronico y todas las cuentas vinculadas a codigos SMS.",
        details: [
          "Empieza por la aplicacion bancaria — cambia contrasena y PIN",
          "Correo electronico — es la clave para recuperar todas las demas cuentas",
          "Si compartiste un codigo SMS, cambia inmediatamente la contrasena de ese servicio",
          "Revoca el acceso a cualquier aplicacion de terceros a la que le diste permisos",
        ],
      },
      {
        title: "Presenta una reclamacion oficial al banco",
        description: "Envia una reclamacion por escrito impugnando la transaccion fraudulenta. Este es un paso obligatorio para recuperar el dinero.",
        details: [
          "Presenta la reclamacion en una sucursal o a traves de la banca online (seccion 'Impugnar transacciones')",
          "Indica el monto exacto, fecha y hora de la operacion",
          "Guarda el numero de referencia — lo necesitaras para dar seguimiento",
          "Por ley, el banco debe revisar la reclamacion en 30 dias (hasta 60 en algunos casos)",
        ],
      },
      {
        title: "Denuncia a la policia",
        description: "Acude a la comisaria o presenta la denuncia online a traves del portal oficial.",
        details: [
          "Lleva tu documento de identidad e impresiones de conversaciones / capturas de pantalla",
          "Incluye todos los datos conocidos: numero del estafador, detalles de la tarjeta, monto",
          "Solicita una copia sellada de la denuncia con numero de registro",
          "Aunque los estafadores sean del extranjero, presentar la denuncia es importante para la estadistica e investigacion",
        ],
      },
      {
        title: "Reune y conserva todas las pruebas",
        description: "Guarda los SMS, registros de llamadas, capturas de pantalla, recibos y cualquier informacion sobre el estafador.",
        details: [
          "Captura de pantalla de todos los SMS y conversaciones de mensajeria (no elimines los originales)",
          "Historial de llamadas — numero, duracion, fecha",
          "Extracto bancario con detalle de las operaciones",
          "Cualquier enlace, codigo QR o archivo que te haya enviado el estafador",
        ],
      },
      {
        title: "Donde presentar reclamaciones adicionales",
        description: "Ademas del banco y la policia, existen canales adicionales para presentar quejas.",
        details: [
          "Defensor del banco — si el banco no responde a tu reclamacion",
          "Organismo regulador — presenta la queja a traves del portal oficial en linea",
          "Plataforma / marketplace — si el estafador opero a traves de un servicio especifico",
          "Agencia de proteccion al consumidor — para servicios de pago no deseados o suscripciones fraudulentas",
        ],
      },
    ],
    warningTitle: "Que NO debes hacer",
    warningItems: [
      "No pagues 'para desbloquear' — ni el banco ni la policia cobran por bloquear o investigar",
      "Nunca compartas codigos SMS o contrasenas de un solo uso — con nadie, incluyendo 'empleados del banco'",
      "No instales aplicaciones de acceso remoto (AnyDesk, RustDesk, etc.) a solicitud de alguien que dice ser del banco",
      "No devuelvas llamadas a numeros que te contactaron — solo llama a la linea de atencion oficial",
    ],
    progressLabel: "Completados: {n}",
    allDoneLabel: "Todos los pasos completados. Guarda una copia de esta lista por si necesitas consultarla de nuevo.",
  },
  zh: {
    badge: "紧急清单",
    title: "被骗后该怎么办",
    subtitle: "分步行动计划。行动越快，追回资金和阻止诈骗者的可能性越大。",
    steps: [
      {
        title: "立即冻结银行卡/账户",
        description: "拨打银行官方电话（卡片背面或应用中）。不要回拨来电号码。",
        details: [
          "银行应用通常有\u201c冻结卡片\u201d按钮——这是最快的方式",
          "如果卡片不在身边，拨打银行客服热线",
          "如诈骗者可能获取了两张卡，请同时冻结借记卡和信用卡",
        ],
      },
      {
        title: "更改密码并撤销权限",
        description: "修改银行应用、邮箱以及所有绑定短信验证码的账户密码。",
        details: [
          "从银行应用开始——更改密码和PIN码",
          "邮箱——它是恢复所有其他账户的关键",
          "如果泄露了短信验证码，立即更改该服务的密码",
          "撤销您授予的所有第三方应用的访问权限",
        ],
      },
      {
        title: "向银行正式报告",
        description: "提交书面申诉，对欺诈交易提出异议。这是追回资金的必要步骤。",
        details: [
          "在网点或网上银行提交（\u201c交易争议\u201d栏目）",
          "注明交易的确切金额、日期和时间",
          "保存申诉编号——用于跟踪进度",
          "法律规定银行须在30天内（部分情况60天）审核申诉",
        ],
      },
      {
        title: "向警方报案",
        description: "前往当地派出所或通过官方渠道在线报案。",
        details: [
          "携带身份证件和聊天记录/截图打印件",
          "提供所有已知信息：诈骗者电话、卡号、金额",
          "索取带登记编号的报案回执副本",
          "即使诈骗者在境外也要报案，这对统计和调查很重要",
        ],
      },
      {
        title: "收集并保存所有证据",
        description: "保存短信、通话记录、截图、凭证及任何诈骗者信息。",
        details: [
          "截取所有短信和即时通讯对话（不要删除原始记录）",
          "通话记录——号码、时间、时长",
          "银行账户交易明细",
          "诈骗者发送的任何链接、二维码或文件",
        ],
      },
      {
        title: "其他投诉渠道",
        description: "除银行和警方外，还有其他投诉渠道。",
        details: [
          "银行投诉专员——如银行未回应您的申诉",
          "监管机构——通过官方在线门户提交投诉",
          "平台/电商——如诈骗者通过特定平台作案",
          "消费者保护机构——针对强制收费服务或订阅陷阱",
        ],
      },
    ],
    warningTitle: "不要做的事情",
    warningItems: [
      "不要支付\u201c解锁费\u201d——银行和警方不收取冻结或调查费用",
      "不要向任何人透露短信验证码或一次性密码，包括\u201c银行工作人员\u201d",
      "不要应\u201c银行\u201d要求安装远程访问应用（AnyDesk、RustDesk等）",
      "不要回拨来电——只拨打官方客服热线",
    ],
    progressLabel: "已完成 {n} 项",
    allDoneLabel: "所有步骤已完成。保存此清单副本，以备将来查阅。",
  },
  ar: {
    badge: "قائمة مساعدات طارئة",
    title: "ماذا تفعل إذا تم خداعك",
    subtitle: "خطة عمل خطوة بخطوة. كلما تصرفت بسرعة، زادت فرصك في استعادة أموالك وإيقاف المحتالين.",
    steps: [
      {
        title: "احظر بطاقتك / جمّد حسابك فوراً",
        description: "اتصل بالبنك من الرقم الرسمي (على ظهر البطاقة أو في التطبيق). لا تُعيد الاتصال بالرقم الذي تواصل معك.",
        details: [
          "يحتوي تطبيق البنك عادةً على زر 'حظر البطاقة' — هذه أسرع طريقة",
          "إذا لم تكن البطاقة بجانبك، اتصل بخط assistance البنك",
          "اطلب حظر البطاقتي الائتمانية والخصم إذا كان المحتالون قد وصلا إلى كلتيهما",
        ],
      },
      {
        title: "غيّر كلمات المرور وألغِ الصلاحيات",
        description: "حدّث كلمات المرور لتطبيق البنك والبريد الإلكتروني وجميع الحسابات المرتبطة برموز التحقق.",
        details: [
          "ابدأ بتطبيق البنك — غيّر كلمة المرور ورقم التعريف",
          "البريد الإلكتروني — هو المفتاح لاستعادة بقية حساباتك",
          "إذا أ_shareت رمز SMS، غيّر كلمة المرور تلك الخدمة فوراً",
          "ألغِ صلاحيات أي تطبيقات طرف ثالث منحتها حق الوصول",
        ],
      },
      {
        title: "أبلغ البنك رسمياً",
        description: "قدّم شكوى خطية لطعن في المعاملة الاحتيالية. هذه خطوة ضرورية لاستعادة أموالك.",
        details: [
          "قدّم الشكوى في الفرع أو عبر الإنترنت (قسم 'طعن المعاملات')",
          "حدد المبلغ والوقت والتواريخ بدقة",
          "احتفظ برقم الشكوى — ستحتاجه لتتبع الحالة",
          "وفقاً للقانون، يجب على البنك مراجعة الشكوى خلال 30 يوماً (أحياناً 60 يوماً)",
        ],
      },
      {
        title: "أبلغ الشرطة",
        description: "قم بزيارة مركز الشرطة أو قدّم البلاغ عبر الإنترنت.",
        details: [
          "احضر بطاقة الهوية ونسخاً من المحادثات / لقطات الشاشة",
          "اذكر جميع المعروف: رقم المحتال وبيانات البطاقة والمبلغ",
          "اطلب نسخة مختومة من البلاغ مع رقم تسجيل",
          "حتى لو كان المحتالون من الخارج، قدم البلاغ — مهم للإحصاء والتحقيق",
        ],
      },
      {
        title: "اجمع واحفظ جميع الأدلة",
        description: "احفظ الرسائل القصيرة وسجل المكالمات ولقطات الشاشة والإيصالات ومعلومات المحتال.",
        details: [
          "لقطات شاشة لجميع الرسائل والمحادثات (لا تحذف الأصل)",
          "سجل المكالمات — الرقم والمدة والوقت",
          "كشف حساب بنكي مع تفاصيل المعاملات",
          "أي روابط أو رموز QR أو ملفات أرسلها المحتال",
        ],
      },
      {
        title: "أماكن أخرى للشكوى",
        description: "بالإضافة إلى البنك والشرطة، توجد قنوات أخرى لتقديم الشكاوى.",
        details: [
          "مفوض البنك — إذا لم يرد البنك على شكواك",
          "جهة التنظيم — قدّم شكوى عبر البوابة الرسمية",
          "المنصة / السوق — إذا عمل المحتال عبر خدمة معينة",
          "وكالة حماية المستهلك — للخدمات المدفوعة غير المرغوب فيها",
        ],
      },
    ],
    warningTitle: "ما لا يجب فعله",
    warningItems: [
      "لا تدفع 'لفتح القفل' — لا البنك ولا الشرطة تتقاضى رسوماً للحظر أو التحقيق",
      "لا تشارك رموز SMS أو كلمات المرورisposable مع أي شخص، بما في ذلك 'موظفي البنك'",
      "لا تثبت تطبيقات الوصول عن بُعد (AnyDesk, RustDesk, إلخ) بناءً على طلب شخص يقول إنه من البنك",
      "لا تُعيد الاتصال بأرقام تواصلت معك — اتصل بالخط الرسمي فقط",
    ],
    progressLabel: "مكتمل: {n}",
    allDoneLabel: "تمت جميع الخطوات. احفظ نسخة من هذه القائمة للمراجعة.",
  },
  pt: {
    badge: "LISTA DE VERIFICACAO DE EMERGENCIA",
    title: "O que fazer se voce foi enganado",
    subtitle: "Plano de acao passo a passo. Quanto mais rapido voce agir, maiores serao suas chances de recuperar seu dinheiro e parar os golpistas.",
    steps: [
      {
        title: "Bloqueie seu cartao / congele sua conta imediatamente",
        description: "Ligue para o banco pelo numero oficial (no verso do cartao ou no aplicativo). NAO devolva a ligacao para o numero que entrou em contato.",
        details: [
          "A maioria dos aplicativos bancarios tem um botao 'Bloquear cartao' — e a opcao mais rapida",
          "Se o cartao nao estiver por perto, ligue para a central de atendimento",
          "Peça para bloquear tanto o cartao de debito quanto o de credito",
        ],
      },
      {
        title: "Alterne senhas e revoke acessos",
        description: "Atualize senhas do aplicativo bancario, e-mail e todas as contas vinculadas a codigos SMS.",
        details: [
          "Comece pelo aplicativo bancario — mude senha e PIN",
          "E-mail — e a chave para recuperar todas as outras contas",
          "Se voce compartilhou um codigo SMS, mude a senha daquele servico imediatamente",
          "Revogue o acesso de quaisquer aplicativos de terceiros",
        ],
      },
      {
        title: "Registre uma reclamacao oficial no banco",
        description: "Envie uma reclamacao por escrito contestando a transacao fraudulenta. E etapa obrigatoria para recuperar o dinheiro.",
        details: [
          "Registre na agencia ou via internet banking (secao 'Contestar transacoes')",
          "Indique o valor exato, data e hora da operacao",
          "Guarde o numero do protocolo — necessario para acompanhar",
          "Por lei, o banco deve analisar em ate 30 dias (ate 60 em alguns casos)",
        ],
      },
      {
        title: "Registre um boletim de ocorrencia",
        description: "Dirija-se a delegacia ou faca o registro online pelo portal oficial.",
        details: [
          "Leve documento de identidade e impressoes de conversas / capturas de tela",
          "InformTodos os dados conhecidos: telefone, dados do cartao, valor",
          "Solicite uma copia do boletim com numero de registro",
          "Mesmo se os golpistas estiverem no exterior, registre — importante para estatisticas",
        ],
      },
      {
        title: "Colete e preserve todas as provas",
        description: "Guarde SMS, historico de ligacoes, capturas de tela, comprovantes e informacoes sobre o golpista.",
        details: [
          "Capturas de tela de todas as SMS e conversas (nao exclua os originais)",
          "Historico de ligacoes — numero, duracao, data",
          "Extrato bancario com detalhamento das transacoes",
          "Quaisquer links, codigos QR ou arquivos enviados pelo golpista",
        ],
      },
      {
        title: "Onde reclamar sobre a fraude",
        description: "Alem do banco e da policia, existem canais adicionais para registro de reclamacoes.",
        details: [
          "Ombudsman do banco — se o banco nao responder",
          "Orgao regulador — registre reclamacao no portal oficial",
          "Plataforma / marketplace — se o golpista atuou por meio de um servico",
          "Defensoria do consumidor — para servicos nao desejados ou assinaturas",
        ],
      },
    ],
    warningTitle: "O que NAO fazer",
    warningItems: [
      "Nao pague 'para desbloquear' — nem o banco nem a policia cobram por bloqueio ou investigacao",
      "Nunca compartilhe codigos SMS ou senhas de uso unico — com ninguem, incluindo 'funcionarios do banco'",
      "Nao instale aplicativos de acesso remoto (AnyDesk, RustDesk, etc.) a pedido de alguem que diz ser do banco",
      "Nao devolva ligacoes — ligue apenas para a central de atendimento oficial",
    ],
    progressLabel: "Concluido: {n}",
    allDoneLabel: "Todas as etapas concluidas. Salve uma copia desta lista para consulta futura.",
  },
  hi: {
    badge: "आपातकालीन चेकलिस्ट",
    title: "अगर आप धोखाधड़ी के शिकार हो गए हैं तो क्या करें",
    subtitle: "चरण-दर-चरण कार्य योजना। जितनी जल्दी कार्रवाई करेंगे, पैसे वापस पाने और धोखेबाजों को रोकने की संभावना उतनी अधिक होगी।",
    steps: [
      {
        title: "तुरंत कार्ड / खाता ब्लॉक करें",
        description: "बैंक को आधिकारिक नंबर पर कॉल करें (कार्ड के पीछे या ऐप में)। उस नंबर पर वापस कॉल न करें जिसने आपसे संपर्क किया।",
        details: [
          "बैंकिंग ऐप में आमतौर पर 'कार्ड ब्लॉक करें' बटन होता है — यह सबसे तेज़ तरीका है",
          "अगर कार्ड पास नहीं है तो बैंक की हेल्पलाइन पर कॉल करें",
          "अगर दोनों कार्डों तक पहुंच हो सकती है तो डेबिट और क्रेडिट दोनों ब्लॉक करवाएं",
        ],
      },
      {
        title: "पासवर्ड बदलें और पहुंच रद्द करें",
        description: "बैंकिंग ऐप, ईमेल और SMS कोड से जुड़े सभी खातों का पासवर्ड बदलें।",
        details: [
          "बैंकिंग ऐप से शुरू करें — पासवर्ड और PIN बदलें",
          "ईमेल — यह अन्य सभी खातों की रिकवरी की कुंजी है",
          "SMS कोड शेयर किया है तो उस सेवा का पासवर्ड तुरंत बदलें",
          "सभी तीसरे पक्ष के ऐप्स की पहुंच रद्द करें",
        ],
      },
      {
        title: "बैंक को आधिकारिक शिकायत दर्ज करें",
        description: "धोखाधड़ी वाले लेनदेन को चुनौती देने के लिए लिखित दावा दर्ज करें। यह पैसे वापस पाने के लिए आवश्यक है।",
        details: [
          "शाखा में या इंटरनेट बैंकिंग के माध्यम से दावा दर्ज करें ('लेनदेन विवाद' अनुभाग)",
          "लेनदेन की सही राशि, तिथि और समय दर्ज करें",
          "दावा संख्या सुरक्षित रखें — स्थिति ट्रैक करने के लिए आवश्यक",
          "कानून के अनुसार, बैंक को 30 दिनों के भीतर समीक्षा करनी होगी",
        ],
      },
      {
        title: "पुलिस में रिपोर्ट दर्ज करें",
        description: "निकटतम थाने में जाएं या आधिकारिक पोर्टल के माध्यम से ऑनलाइन रिपोर्ट दर्ज करें।",
        details: [
          "पहचान पत्र और बातचीत के प्रिंटआउट / स्क्रीनशॉट लेकर जाएं",
          "सभी ज्ञात जानकारी दर्ज करें: धोखेबाज का नंबर, कार्ड विवरण, राशि",
          "पंजीकरण संख्या के साथ रिपोर्ट की प्रति लें",
          "धोखेबाज विदेश में भी हों तो रिपोर्ट दर्ज करें",
        ],
      },
      {
        title: "सभी सबूत इकट्ठा करें और सुरक्षित रखें",
        description: "SMS, कॉल इतिहास, स्क्रीनशॉट, रसीदें और धोखेबाज की जानकारी सुरक्षित रखें।",
        details: [
          "सभी SMS और मैसेंजर बातचीत के स्क्रीनशॉट लें (मूल न हटाएं)",
          "कॉल इतिहास — नंबर, अवधि, तिथि",
          "लेनदेन विवरण के साथ बैंक स्टेटमेंट",
          "धोखेबाज द्वारा भेजे गए लिंक, QR कोड या फ़ाइलें",
        ],
      },
      {
        title: "अन्य शिकायत चैनल",
        description: "बैंक और पुलिस के अलावा, शिकायत दर्ज करने के अन्य चैनल भी हैं।",
        details: [
          "बैंक ओम्बुड्समैन — अगर बैंक जवाब न दे",
          "विनियामक — आधिकारिक पोर्टल पर शिकायत दर्ज करें",
          "प्लेटफ़ॉर्म — अगर धोखेबाज किसी विशेष सेवा के माध्यम से सक्रिय था",
          "उपभोक्ता संरक्षण — अनचाही सेवाओं या सदस्यता जाल के लिए",
        ],
      },
    ],
    warningTitle: "क्या नहीं करना है",
    warningItems: [
      "'अनब्लॉक करने' के लिए भुगतान न करें — न बैंक और न पुलिस ब्लॉक या जांच के लिए शुल्क लेती है",
      "SMS कोड या वन-टाइम पासवर्ड किसी के साथ साझा न करें — 'बैंक कर्मचारियों' सहित",
      "रिमोट एक्सेस ऐप (AnyDesk, RustDesk आदि) स्थापित न करें जो कोई 'बैंक से' कहे",
      "वापस कॉल न करें — केवल आधिकारिक हेल्पलाइन पर कॉल करें",
    ],
    progressLabel: "पूर्ण: {n}",
    allDoneLabel: "सभी चरण पूर्ण। भविष्य में संदर्भ के लिए इस चेकलिस्ट की एक कॉपी सहेजें।",
  },
  fr: {
    badge: "LISTE DE CONTROLE D'URGENCE",
    title: "Que faire si vous avez ete arnaque",
    subtitle: "Plan d'action etape par etape. Plus vous agissez vite, plus vous avez de chances de recuperer votre argent et d'arreter les arnaqueurs.",
    steps: [
      {
        title: "Bloquez votre carte / gele votre compte immediatement",
        description: "Appelez la banque au numero officiel (au dos de la carte ou dans l'application). NE rappelez PAS le numero qui vous a contacte.",
        details: [
          "La plupart des applications bancaires ont un bouton 'Bloquer la carte' — c'est l'option la plus rapide",
          "Si la carte n'est pas a portee de main, appelez la ligne d'assistance",
          "Demandez de bloquer a la fois la carte de debit et de credit si les arnaqueurs ont pu y acceder",
        ],
      },
      {
        title: "Changez les mots de passe et revoquez les acces",
        description: "Mettez a jour les mots de passe de l'application bancaire, de l'e-mail et de tous les comptes lies aux codes SMS.",
        details: [
          "Commencez par l'application bancaire — changez le mot de passe et le PIN",
          "E-mail — c'est la cle pour recuperer tous les autres comptes",
          "Si vous avez partage un code SMS, changez immediatement le mot de passe de ce service",
          "Revoquez l'acces a toutes les applications tierces auxquelles vous avez donne des permissions",
        ],
      },
      {
        title: "Deposez une reclam officielle aupres de la banque",
        description: "Soumettez une plainte ecrite contestant la transaction frauduleuse. C'est une etape obligatoire pour recuperer l'argent.",
        details: [
          "Deposez la plainte en agence ou via la banque en ligne (section 'Contester les transactions')",
          "Indiquez le montant exact, la date et l'heure de l'operation",
          "Conservez le numero de reference — il sera necessaire pour suivre l'avancement",
          "La loi impose a la banque d'examiner la reclam dans les 30 jours (jusqu'a 60 dans certains cas)",
        ],
      },
      {
        title: "Portez plainte aupres de la police",
        description: "Rendez-vous au commissariat ou deposez la plainte en ligne via le portail officiel.",
        details: [
          "Apportez votre piece d'identite et des impressions de conversations / captures d'ecran",
          "Mentionnez toutes les donnees connues : numero de l'arnaqueur, coordonnees de la carte, montant",
          "Demandez une copie de la plainte avec un numero d'enregistrement",
          "Meme si les arnaqueurs sont a l'etranger, deposer la plainte est important pour les statistiques",
        ],
      },
      {
        title: "Collectez et conservez toutes les preuves",
        description: "Conservez les SMS, les historiques d'appels, les captures d'ecran, les recus et toute information sur l'arnaqueur.",
        details: [
          "Captures d'ecran de tous les SMS et conversations (ne supprimez pas les originaux)",
          "Historique des appels — numero, duree, date",
          "Releve bancaire avec le detail des operations",
          "Tous les liens, codes QR ou fichiers envoyes par l'arnaqueur",
        ],
      },
      {
        title: "Ou porter d'autres plaintes",
        description: "En plus de la banque et de la police, il existe d'autres canaux pour deposer des plaintes.",
        details: [
          "Mediateur de la banque — si la banque ne repond pas",
          "Autorite de regulation — deposez la plainte via le portail officiel",
          "Plateforme / marketplace — si l'arnaqueur operait via un service specifique",
          "Association de defense des consommateurs — pour les services non sollicites",
        ],
      },
    ],
    warningTitle: "Ce qu'il ne faut PAS faire",
    warningItems: [
      "Ne payez pas 'pour deverrouiller' — ni la banque ni la police ne facturent le blocage ou l'enquete",
      "Ne partagez jamais les codes SMS ou mots de passe a usage unique — avec personne, y compris les 'employes de la banque'",
      "N'installez pas d'applications d'acces a distance (AnyDesk, RustDesk, etc.) a la demande de quelqu'un se presentant comme un employe de banque",
      "Ne rappelez pas les numeros qui vous ont contact — appelez uniquement la ligne officielle",
    ],
    progressLabel: "Termine : {n}",
    allDoneLabel: "Toutes les etapes sont terminees. Sauvegardez une copie de cette liste pour reference future.",
  },
  de: {
    badge: "NOTFALL-CHECKLISTE",
    title: "Was tun, wenn Sie betrogen wurden",
    subtitle: "Schritt-fuer-Schritt-Massnahmenplan. Je schneller Sie handeln, desto hoeher Ihre Chancen, das Geld zurueckzubekommen.",
    steps: [
      {
        title: "Karte sofort sperren / Konto einfrieren",
        description: "Rufen Sie die Bank unter der offiziellen Nummer an (auf der Rueckseite der Karte oder in der App). Rueckruf nicht zur Nummer, die Sie kontaktiert hat.",
        details: [
          "Banking-Apps haben meist einen 'Karte sperren' Button — schnellste Option",
          "Wenn die Karte nicht griffbereit ist, rufen Sie die Hotline an",
          "Lassen Sie bei Bedarf sowohl Debit- als auch Kreditkarte sperren",
        ],
      },
      {
        title: "Passwoerter aendern und Zugriffe entziehen",
        description: "Aktualisieren Sie Passwoerter fuer Banking-App, E-Mail und alle Konten mit SMS-Verifizierung.",
        details: [
          "Beginnen Sie mit der Banking-App — Passwort und PIN aendern",
          "E-Mail — Schluessel zur Wiederherstellung aller anderen Konten",
          "Wenn Sie einen SMS-Code geteilt haben, aendern Sie sofort das Passwort des Dienstes",
          "Entziehen Sie Drittanbieter-Apps die Berechtigungen",
        ],
      },
      {
        title: "Offizielle Beschwerde bei der Bank einreichen",
        description: "Reichen Sie einen schriftlichen Einspruch gegen die betruegerische Transaktion ein. Dies ist noetig, um das Geld zurueckzubekommen.",
        details: [
          "Einspruch in der Filiale oder im Online-Banking einreichen ('Transaktionen beanstanden')",
          "Genauen Betrag, Datum und Uhrzeit der Transaktion angeben",
          "Referenznummer aufbewahren — noetig fuer den Status",
          "Bank muss laut Gesetz innerhalb von 30 Tagen pruefen (in einigen Faellen 60)",
        ],
      },
      {
        title: "Anzeige bei der Polizei erstatten",
        description: "Besuchen Sie die naechste Polizeidienststelle oder erstatten Sie online Anzeige.",
        details: [
          "Personalausweis und Ausdrucke von Chats / Screenshots mitbringen",
          "Alle bekannten Daten angeben: Telefonnummer, Kartendetails, Betrag",
          "Kopie der Anzeige mit Aktenzeichen anfordern",
          "Auch bei Taeter im Ausland Anzeige erstatten — wichtig fuer Statistik und Ermittlungen",
        ],
      },
      {
        title: "Alle Beweise sichern",
        description: "Sichern Sie SMS, Anruflisten, Screenshots, Quittungen und alle Informationen ueber den Taeter.",
        details: [
          "Screenshots aller SMS und Messenger-Chats (Originale nicht loeschen)",
          "Anrufliste — Nummer, Dauer, Datum",
          "Kontoauszug mit Transaktionsdetails",
          "Alle Links, QR-Codes oder Dateien, die der Taeter gesendet hat",
        ],
      },
      {
        title: "Weitere Beschwerdemoglichkeiten",
        description: "Zusammen mit Bank und Polizei gibt es weitere Kanaele fuer Beschwerden.",
        details: [
          "Bank-Ombudsmann — wenn die Bank nicht reagiert",
          "Aufsichtsbehoerde — Beschwerde ueber das offizielle Portal",
          "Plattform / Marketplace — wenn der Taeter ueber einen bestimmten Dienst agierte",
          "Verbraucherschutz — fuer unerwuenschte Dienste oder Abo-Fallen",
        ],
      },
    ],
    warningTitle: "Was NICHT zu tun ist",
    warningItems: [
      "Zahlen Sie nicht 'zur Entsperrung' — weder Bank noch Polizei berechnen Gebuehren fuer Sperre oder Ermittlung",
      "Teilen Sie niemals SMS-Codes oder Einmalpasswoerter — mit niemandem, einschliesslich 'Bankmitarbeiter'",
      "Installieren Sie keine Fernzugriffs-Apps (AnyDesk, RustDesk usw.) auf Bitten von 'Bankmitarbeitern'",
      "Rufen Sie nicht zurueck — rufen Sie nur die offizielle Hotline an",
    ],
    progressLabel: "Erledigt: {n}",
    allDoneLabel: "Alle Schritte abgeschlossen. Speichern Sie eine Kopie dieser Checkliste fuer spaetere Referenz.",
  },
  ja: {
    badge: "緊急チェックリスト",
    title: "詐欺に遭った場合の対処法",
    subtitle: "段階的な対応プラン。早ほど行動するほど、資金の回復と詐欺師の阻止の可能性が高まります。",
    steps: [
      {
        title: "カード/口座を直ちにブロックする",
        description: "銀行に正式な番号（カード裏面またはアプリ内）で電話してください。連絡してきた番号には折り返し電話しないでください。",
        details: [
          "銀行アプリに「カードをブロック」ボタンがあることが多い — 最速の方法です",
          "カードが手元にない場合は銀行のヘルプラインに電話してください",
          "詐欺師が両方にアクセスできた可能性がある場合は、デビットカードとクレジットカードの両方をブロックしてください",
        ],
      },
      {
        title: "パスワードを変更しアクセスを無効化する",
        description: "銀行アプリ、メール、SMS認証コードに関連するすべてのアカウントのパスワードを変更します。",
        details: [
          "銀行アプリから始める — パスワードとPINを変更",
          "メール — 他のすべてのアカウントの回復鍵です",
          "SMSコードを共有した場合は、そのサービスのパスワードを直ちに変更",
          "許可したサードパーティアプリのアクセスを無効化",
        ],
      },
      {
        title: "銀行に正式に申し立てる",
        description: "不正取引に対する書面の異議申し立てを提出します。資金を回収するために不可欠です。",
        details: [
          "支店またはインターネットバンキングで提出（「取引異議」セクション）",
          "取引の正確な金額、日時を記載",
          "申立番号を保管 — ステータス追跡に必要",
          "法律により、銀行は30日以内（場合によっては60日）に審査が必要",
        ],
      },
      {
        title: "警察に届出を出す",
        description: "最寄りの警察署に行くか、公式ポータルからオンラインで届出を出してください。",
        details: [
          "本人確認書類とチャット履歴/スクリーンショットのコピーを持っていく",
          "既知の情報をすべて記載：詐欺師の番号、カード情報、金額",
          "届出の控えと登録番号のコピーを受け取る",
          "詐欺師が海外でも届出は重要 — 統計と捜査に必要",
        ],
      },
      {
        title: "すべての証拠を収集・保存する",
        description: "SMS、通話履歴、スクリーンショット、領収書、詐欺師に関する情報をすべて保存します。",
        details: [
          "すべてのSMSやメッセンジャーの会話のスクリーンショット（原本は削除しない）",
          "通話履歴 — 番号、時間、日付",
          "取引明細付き銀行口座照会",
          "詐欺師が送ったリンク、QRコード、ファイル",
        ],
      },
      {
        title: "その他の苦情窓口",
        description: "銀行と警察以外にも、苦情を申し立てる.additional channels があります。",
        details: [
          "銀行のオンブズマン — 銀場が対応しない場合",
          "規制当局 — 公式オンラインポータルで苦情を申し立てる",
          "プラットフォーム / マーケットプレイス — 詐欺師が特定のサービスを通じて活動した場合",
          "消費者保護機関 — 望まない有料サービスやサブスクリプションの罠に対し",
        ],
      },
    ],
    warningTitle: "やってはいけないこと",
    warningItems: [
      "「ロック解除」のための支払い — 銀行も警察もブロックや調査に料金を請求しません",
      "SMSコードやワンタイムパスワードを共有しない — 「銀行の従業員」を含め誰にも",
      "「銀行から」と称する人の要請でリモートアクセスアプリ（AnyDesk、RustDeskなど）をインストールしない",
      "連絡してきた番号には折り返さない — 公式ヘルプラインのみに電話する",
    ],
    progressLabel: "完了: {n}",
    allDoneLabel: "すべてのステップが完了しました。将来の参照のためにこのチェックリストのコピーを保存してください。",
  },
};

/* ---------- Helpers ---------- */

const STEPS_PER_LANG = 6;

function progressPercent(done: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((done / total) * 100);
}

/* ---------- Component ---------- */

export default function HelpChecklistSection() {
  const { language } = useTranslation();
  const { ecoMode } = useEcoMode();

  const content = CONTENT[language] ?? CONTENT.en;

  const [expandedSteps, setExpandedSteps] = useState<Set<number>>(new Set());
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const totalSteps = content.steps.length;
  const doneCount = completedSteps.size;
  const allDone = doneCount === totalSteps;

  const toggleExpand = (idx: number) => {
    setExpandedSteps((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  const toggleComplete = (idx: number) => {
    setCompletedSteps((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  const pct = progressPercent(doneCount, totalSteps);

  return (
    <section
      id="help"
      className="relative w-full py-16 sm:py-20 px-4 bg-[#0A0A0B] overflow-hidden"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.04)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <SectionBadge variant="pill" label={content.badge} className="mb-6" />
          <h2 className="font-display font-medium text-3xl sm:text-5xl text-[#F5F5F0] tracking-tighter mb-6">
            {content.title}
          </h2>
          <p className="font-sans text-sm sm:text-base text-gray-400 max-w-xl mx-auto leading-relaxed">
            {content.subtitle}
          </p>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-[11px] text-gray-500 tracking-wider uppercase">
              {content.progressLabel.replace("{n}", `${doneCount}/${totalSteps}`)}
            </span>
            <span className="font-mono text-[11px] text-[#2DD4BF] font-semibold">
              {pct}%
            </span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: allDone
                  ? "linear-gradient(90deg, #2DD4BF, #3B82F6)"
                  : "linear-gradient(90deg, #3B82F6, #2DD4BF)",
              }}
              initial={ecoMode ? { width: `${pct}%` } : { width: "0%" }}
              animate={{ width: `${pct}%` }}
              transition={ecoMode ? { duration: 0 } : { duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Steps */}
        <div className="flex flex-col gap-3">
          {content.steps.map((step, idx) => {
            const isExpanded = expandedSteps.has(idx);
            const isDone = completedSteps.has(idx);

            return (
              <motion.div
                key={idx}
                initial={ecoMode ? false : { opacity: 0, y: 16 }}
                whileInView={ecoMode ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{
                  duration: 0.2,
                  delay: Math.min(idx * 0.03, 0.15),
                  ease: "easeOut",
                }}
              >
                <ScanCard
                  padding="p-0"
                  borderColor={
                    isDone
                      ? "border-[#2DD4BF]/40"
                      : isExpanded
                        ? "border-[#3B82F6]/30"
                        : "border-white/[0.06]"
                  }
                  cardClassName="bg-[#12141A]"
                >
                  {/* Step header */}
                  <div className="flex items-start gap-3 p-5 sm:p-6">
                    {/* Checkbox */}
                    <button
                      type="button"
                      onClick={() => toggleComplete(idx)}
                      className={`mt-0.5 shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors cursor-pointer ${
                        isDone
                          ? "bg-[#2DD4BF] border-[#2DD4BF]"
                          : "border-gray-600 hover:border-[#3B82F6]"
                      }`}
                      aria-label={`${doneCount}`}
                    >
                      {isDone && (
                        <span className="text-[#0A0A0B] text-xs font-bold leading-none">
                          &#10003;
                        </span>
                      )}
                    </button>

                    {/* Title + expand */}
                    <button
                      type="button"
                      onClick={() => toggleExpand(idx)}
                      aria-expanded={isExpanded}
                      className="flex-1 text-left cursor-pointer"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs font-bold text-[#3B82F6] tracking-wider shrink-0">
                            {String(idx + 1).padStart(2, "0")}
                          </span>
                          <span
                            className={`font-display font-medium text-sm sm:text-base ${
                              isDone ? "text-[#2DD4BF]" : isExpanded ? "text-[#F5F5F0]" : "text-gray-300"
                            } transition-colors`}
                          >
                            {step.title}
                          </span>
                        </div>
                        <ChevronDown
                          className={`w-4 h-4 shrink-0 transition-transform duration-300 text-[#3B82F6] ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                    </button>
                  </div>

                  {/* Expandable content */}
                    {isExpanded && (
                      <motion.div
                        key="content"
                        initial={ecoMode ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 sm:px-6 pb-5 sm:pb-6 ml-8">
                          <p className="font-sans text-sm text-gray-300 leading-relaxed mb-3">
                            {step.description}
                          </p>
                          <ul className="flex flex-col gap-2">
                            {step.details.map((detail, dIdx) => (
                              <li key={dIdx} className="flex items-start gap-2 text-sm text-gray-400 leading-relaxed">
                                <span className="font-mono text-[#2DD4BF] mt-0.5 shrink-0">-</span>
                                <span className="font-sans">{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                </ScanCard>
              </motion.div>
            );
          })}
        </div>

        {/* Warning box */}
        <motion.div
          initial={ecoMode ? false : { opacity: 0, y: 16 }}
          whileInView={ecoMode ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.2, delay: 0.15, ease: "easeOut" }}
          className="mt-8"
        >
          <div className="rounded-2xl bg-[#12141A] border border-[#EF4444]/20 p-6 sm:p-8">
            <div className="flex items-center gap-2.5 mb-4">
              <AlertTriangle className="w-4 h-4 text-[#EF4444] shrink-0" />
              <h3 className="font-display font-medium text-base sm:text-lg text-[#EF4444]">
                {content.warningTitle}
              </h3>
            </div>
            <ul className="flex flex-col gap-2.5">
              {content.warningItems.map((item, wIdx) => (
                <li key={wIdx} className="flex items-start gap-2.5 text-sm text-gray-300 leading-relaxed">
                  <span className="font-mono text-[#EF4444] mt-0.5 shrink-0 font-bold">
                    &#10007;
                  </span>
                  <span className="font-sans">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* All done message */}
          {allDone && (
            <motion.div
              initial={ecoMode ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="mt-6 text-center"
            >
              <p className="font-sans text-sm text-[#2DD4BF] leading-relaxed">
                {content.allDoneLabel}
              </p>
            </motion.div>
          )}
      </div>
    </section>
  );
}
