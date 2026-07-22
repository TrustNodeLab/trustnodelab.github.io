import { LanguageCode } from "../languages";

export const title: Partial<Record<LanguageCode, string>> = {
  ru: "Голосовой ассистент KIRA",
  en: "KIRA Voice Assistant",
  es: "Asistente de Voz KIRA",
  zh: "KIRA 语音助手",
  hi: "कीра (KIRA) वॉयс असिस्टेंट",
  ar: "المساعد الصوتي KIRA",
  pt: "Assistente de Voz KIRA",
  fr: "Assistant Vocal KIRA",
  de: "KIRA Sprachassistent",
  ja: "音声アシスタント KIRA",
  tr: "KIRA Sesli Asistan"
};

export const subtitle: Partial<Record<LanguageCode, string>> = {
  ru: "Интеллектуальный речевой контур в разработке — по плану будет работать прямо в оперативной памяти телефона",
  en: "An intelligent, speech-capable companion in development — planned to run fully within your local RAM",
  es: "Un bucle de voz inteligente en desarrollo — planeado para ejecutarse directamente en la memoria RAM de su teléfono",
  zh: "开发中的智能语音分析回路 — 计划直接在手机运行内存中运行",
  hi: "एक बुद्धिमान भाषण-सक्षम साथी जो विकासाधीन है — योजना है कि यह पूरी तरह से स्थानीय रैम के भीतर चलेगा",
  ar: "دائرة كلامية ذكية قيد التطوير — من المخطط أن تعمل مباشرة في ذاكرة الوصول العشوائي (RAM) لهاتفك",
  pt: "Um circuito de fala inteligente em desenvolvimento — com plano de operar diretamente na memória RAM do celular",
  fr: "Un circuit de parole intelligent en développement — prévu pour fonctionner entièrement dans la mémoire RAM locale du smartphone",
  de: "Ein intelligenter, sprachfähiger Begleiter in Entwicklung — geplant, vollständig im lokalen RAM zu laufen",
  ja: "開発中のインテリジェントな音声認識回路 — スマートフォンの RAM 上で完全に動作する予定です",
  tr: "Geliştirme aşamasında akıllı, konuşma yeteneğine sahip bir yardımcı — tamamen yerel RAM içinde çalışması planlanıyor"
};

// Complete zh typo in translation
subtitle.zh = "直接在手机运行内存中运行的智能语音分析回路";

export const badge: Partial<Record<LanguageCode, string>> = {
  ru: "ПРОГРАММНЫЙ ПЛАН: KIRA",
  en: "PROJECT TIMELINE: KIRA",
  es: "CRONOGRAMA DEL PROYECTO: KIRA",
  zh: "项目规划：KIRA",
  hi: "परियोजना समयरेखा: KIRA",
  ar: "خطة البرنامج: KIRA",
  pt: "PLANO DO PROJETO: KIRA",
  fr: "CALENDRIER DU PROJET : KIRA",
  de: "PROJEKTZEITPLAN: KIRA",
  ja: "プロジェクト計画：KIRA",
  tr: "PROJE ZAMAN ÇİZELGESİ: KIRA"
};

export const features: Partial<Record<LanguageCode, Array<{ title: string; desc: string }>>> = {
  ru: [
    { title: "Локальный Интент-Классификатор — согласно плану", desc: "Roadmap: дообученная надстройка над основной rubert-tiny2 будет распознавать 15-20 специализированных интентов безопасности, добавляя к модели всего ~200 КБ весов." },
    { title: "Работа на 100% Офлайн — согласно плану", desc: "Roadmap: без обращений к облачным LLM — вся семантическая структура и шаблоны ответов будут упакованы в приложение, работая без сети в режиме сверхнизкой задержки." },
    { title: "Синтетический Датасет Коллаборации", desc: "Обучающие диалоги мошеннических схем уже генерируются в облаке Google Colab с помощью Llama 3.1 и Qwen2.5 — эта часть работы ведётся уже сейчас." }
  ],
  en: [
    { title: "Local Intent Classifier — per roadmap", desc: "Roadmap: a fine-tuned add-on on top of rubert-tiny2 will resolve 15-20 specific security intents, adding only ~200 KB." },
    { title: "100% Offline Execution — per roadmap", desc: "Roadmap: without external LLM API calls, response templates will run fully offline with microsecond latency." },
    { title: "Advanced Training Datasets", desc: "Synthetic dialogues of social-engineering schemes are already generated in Google Colab using Llama 3.1 and Qwen2.5 — this part of the work is underway." }
  ],
  es: [
    { title: "Clasificador de Intenciones Local — según roadmap", desc: "Roadmap: una extensión sobre rubert-tiny2 reconocerá 15-20 intenciones de seguridad, añadiendo solo ~200 KB." },
    { title: "Ejecución 100% Fuera de Línea — según roadmap", desc: "Roadmap: sin conexiones a LLM en la nube, las plantillas funcionarán sin conexión con latencia ultra baja." },
    { title: "Conjunto de Datos Sintéticos", desc: "Los diálogos sintéticos ya se generan en Google Colab con Llama 3.1 y Qwen2.5 — esta parte está en curso." }
  ],
  zh: [
    { title: "本地意图分类器 — 路线图", desc: "路线图：基于 rubert-tiny2 的微调组件未来将识别 15-20 个安全意图，仅增加约 200 KB。" },
    { title: "100% 离线执行 — 路线图", desc: "路线图：未来将无需云端 API，离线运行并保持低延迟。" },
    { title: "先进训练数据集", desc: "欺诈计划的合成对话已在 Google Colab 中使用 Llama 3.1 和 Qwen2.5 生成 — 这部分工作正在进行。" }
  ],
  hi: [
    { title: "स्थानीय इरादा वर्गीकारक — रोडमैप", desc: "रोडमैप: rubert-tiny2 पर आधारित ऐड-ऑन भविष्य में 15-20 सुरक्षा इरादों को हल करेगा, केवल ~200 KB जोड़कर।" },
    { title: "100% ऑफ़लाइन निष्पादन — रोडमैप", desc: "रोडमैप: बाहरी LLM API के बिना भविष्य में पूरी तरह ऑफ़लाइन काम करेगा।" },
    { title: "उन्नत प्रशिक्षण डेटासेट", desc: "धोखाधड़ी योजनाओं के संवाद पहले से ही Google Colab में तैयार किए जा रहे हैं — यह भाग जारी है।" }
  ],
  ar: [
    { title: "مصنف النوايا المحلي — خارطة طريق", desc: "خارطة الطريق: إضافة فوق rubert-tiny2 ستتعرف مستقبلاً على 15-20 نية أمنية، بإضافة ~200 كيلوبايت فقط." },
    { title: "تشغيل أوفلاين بنسبة 100% — خارطة طريق", desc: "خارطة الطريق: دون اتصالات سحابية، ستعمل القوالب أوفلاين بالكامل مستقبلاً." },
    { title: "مجموعات البيانات التدريبية المتقدمة", desc: "يتم بالفعل إنشاء حوارات تركيبية في Google Colab — هذا الجزء جارٍ حاليًا." }
  ],
  pt: [
    { title: "Classificador de Intenção Local — roadmap", desc: "Roadmap: extensão sobre rubert-tiny2 reconhecerá 15-20 intenções, adicionando apenas ~200 KB." },
    { title: "Execução 100% Off-line — roadmap", desc: "Roadmap: sem chamadas em nuvem, funcionará totalmente off-line com baixa latência." },
    { title: "Dataset de Treinamento Avançado", desc: "Diálogos sintéticos já são gerados no Google Colab — essa parte já está em andamento." }
  ],
  fr: [
    { title: "Classificateur d'Intents Local — feuille de route", desc: "Feuille de route : un module sur rubert-tiny2 résoudra 15-20 intentions, pour ~200 Ko seulement." },
    { title: "Exécution 100 % hors ligne — feuille de route", desc: "Feuille de route : sans appel API externe, fonctionnement hors ligne à venir." },
    { title: "Jeux de données d'entraînement avancés", desc: "Les dialogues synthétiques sont déjà générés dans Google Colab — cette partie est en cours." }
  ],
  de: [
    { title: "Lokaler Intent-Klassifikator — Roadmap", desc: "Roadmap: ein Add-On auf rubert-tiny2 wird künftig 15-20 Intents erkennen, nur ~200 KB." },
    { title: "100% Offline-Ausführung — Roadmap", desc: "Roadmap: künftig ohne externe API vollständig offline." },
    { title: "Fortschrittliche Trainingsdaten", desc: "Synthetische Dialoge werden bereits in Google Colab generiert — dieser Teil läuft bereits." }
  ],
  ja: [
    { title: "ローカル意図分類器 — ロードマップ", desc: "ロードマップ：rubert-tiny2 ベースの追加レイヤーが将来15〜20個の意図を識別予定（約200 KB追加）。" },
    { title: "100% オフライン動作 — ロードマップ", desc: "ロードマップ：将来的にクラウド不要で完全オフライン動作予定。" },
    { title: "高度な合成データセット", desc: "詐欺対話データセットはすでに Google Colab で生成中 — この部分は現在進行中です。" }
  ],
  tr: [
    { title: "Yerel Niyet Sınıflandırıcı — yol haritası", desc: "Yol haritası: rubert-tiny2 üzerine eklenti gelecekte 15-20 niyeti çözecek, yalnızca ~200 KB ile." },
    { title: "%100 Çevrimdışı Çalışma — yol haritası", desc: "Yol haritası: harici API olmadan gelecekte tam çevrimdışı çalışacak." },
    { title: "Gelişmiş Eğitim Veri Kümesi", desc: "Sentetik diyaloglar zaten Google Colab'de üretiliyor — bu kısım halihazırda devam ediyor." }
  ]
};
