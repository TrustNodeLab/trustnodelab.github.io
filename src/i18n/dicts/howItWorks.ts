import { LanguageCode } from "../languages";

export const sevenLayers: Partial<Record<LanguageCode, Array<{ name: string; tech: string; desc: string }>>> = {
  ru: [
    { name: "Акустический анализ (на устройстве, experimental)", tech: "On-device acoustic features (RMS / ZCR / Silence / Energy) · experimental", desc: "Акустические признаки считаются на устройстве в реальном времени (RMS, ZCR, паузы, энергия). Это не блокировка и не спектрометр в браузере — признаки используются как дополнительный сигнал. Логика экспериментальная, считается на устройстве через acoustic-features (или напрямую, если libsignal недоступен)." },
    { name: "ML-классификация (ruBERT)", tech: "ONNX Runtime / INT8 / ~28 MB", desc: "Используется облегчённая нейросеть ruBERT (ONNX INT8, ~28 МБ) для анализа текста и метаданных на устройстве. Обновления моделей и баз данных поставляются вместе с обновлением приложения — интернет не требуется для повседневной работы, только для установки новых версий." },
    { name: "Распознавание речи (ASR) — Roadmap (оценка вариантов)", tech: "ASR — Roadmap (Vosk / W2V BERT / альтернативы)", desc: "Распознавание речи на устройстве — в дорожной карте. Рассматриваются варианты Vosk (STT, ~45 МБ) и альтернативы (W2V BERT и др.). Выбор зависит от качества, размера и производительности. Пока не в MVP." },
    { name: "Семантический анализ содержания — В разработке (Roadmap)", tech: "DeGenome (18 примитивов) — Roadmap", desc: "Семантический анализ содержания разговора: детекция ключевых фраз-триггеров, признаков психологического давления и требований срочных действий. Следующий этап эволюции TrustNode." },
    { name: "Репутационный контур (PCD) — В разработке (Roadmap)", tech: "PCD Identity Profiles — Roadmap", desc: "Сверяет манеру общения звонящего с профилями поведенческой идентичности организаций. В разработке (Roadmap)." },
    { name: "Сверка с базой номеров — В разработке (Roadmap)", tech: "Local Blacklist DB — Roadmap", desc: "Быстрая локальная проверка номера по базе подозрительных номеров и чёрным спискам. В разработке (Roadmap)." },
    { name: "Итоговый вердикт · ECHO (в разработке)", tech: "Threshold Calibration / PostProc / LegitContextRule / ECHO", desc: "Итоговый вердикт принимается многоступенчатым конвейером: пороговая калибровка (threshold calibration) сопоставляет оценки слоёв, постобработка PostProc фильтрует ложные срабатывания, правило LegitContextRule проверяет легитимный контекст звонка, а ECHO-протокол добавляет поведенческие детекторы манипулятивных паттернов. При угрозе — полноэкранное предупреждение." }
  ],
  en: [
    { name: "Acoustic Analysis (on-device, experimental)", tech: "On-device acoustic features (RMS / ZCR / Silence / Energy) · experimental", desc: "Acoustic features are computed on-device in real time (RMS, ZCR, pauses, energy). This is not a block and not a browser spectrometer — the features are used as an additional signal. The logic is experimental and runs on-device via acoustic-features (or directly if libsignal is unavailable)." },
    { name: "ML Classification (ruBERT)", tech: "ONNX Runtime / INT8 / ~28 MB", desc: "Uses the lightweight ruBERT neural network (ONNX INT8, ~28 MB) to analyze text and metadata on-device. Model and database updates ship with app updates — no internet is required for daily use, only to install new versions." },
    { name: "Speech Recognition (ASR) — Roadmap (evaluating options)", tech: "ASR — Roadmap (Vosk / W2V BERT / alternatives)", desc: "On-device speech recognition — on the roadmap. Evaluating Vosk (STT, ~45 MB) and alternatives (W2V BERT, etc.). Choice depends on quality, size, and performance. Not yet in MVP." },
    { name: "Semantic Content Analysis — Roadmap", tech: "DeGenome (18 Primitives) — Roadmap", desc: "Semantic analysis of the conversation's content: detection of key trigger phrases, signs of psychological pressure, and demands for urgent action. The next stage of TrustNode's evolution." },
    { name: "Reputation Verification (PCD) — Roadmap", tech: "PCD Identity Profiles — Roadmap", desc: "Cross-checks the caller's manner of speech against corporate identity profiles (PCD). In development (Roadmap)." },
    { name: "Number Blacklist Check — Roadmap", tech: "Local Blacklist DB — Roadmap", desc: "A fast local check of the number against a database of suspicious numbers and blacklists. In development (Roadmap)." },
    { name: "Final Verdict · ECHO (in development)", tech: "Threshold Calibration / PostProc / LegitContextRule / ECHO", desc: "The final verdict is produced by a multi-stage pipeline: threshold calibration weighs the layer scores, PostProc filters false positives, LegitContextRule validates legitimate call context, and the ECHO protocol adds behavioral detectors for manipulative patterns. On threat — full-screen warning." }
  ],
  es: [
    { name: "Análisis acústico (en el dispositivo, experimental)", tech: "Características acústicas en el dispositivo (RMS / ZCR / Silence / Energy) · experimental", desc: "Las características acústicas se calculan en el dispositivo en tiempo real (RMS, ZCR, pausas, energía). No es un bloqueo ni un espectrómetro en el navegador: las características se usan como señal adicional. La lógica es experimental y se ejecuta en el dispositivo a través de acoustic-features (o directamente si libsignal no está disponible)." },
    { name: "Clasificación ML (ruBERT)", tech: "ONNX Runtime / INT8 / ~28 MB", desc: "Se utiliza una red neuronal ligera ruBERT (ONNX INT8, ~28 MB) para analizar texto y metadatos en el dispositivo. Las actualizaciones de modelos y bases de datos llegan con la actualización de la app; no se requiere internet para el uso diario, solo para instalar nuevas versiones." },
    { name: "Reconocimiento de voz (ASR) — Roadmap (evaluando opciones)", tech: "ASR — Roadmap (Vosk / W2V BERT / alternativas)", desc: "Reconocimiento de voz en el dispositivo — en la hoja de ruta. Se evalúan Vosk (STT, ~45 MB) y alternativas (W2V BERT, etc.). La elección depende de calidad, tamaño y rendimiento. Aún no está en MVP." },
    { name: "Análisis semántico del contenido — En desarrollo (Roadmap)", tech: "DeGenome (18 Primitives) — Roadmap", desc: "Análisis semántico del contenido de la conversación: detección de frases clave, indicios de presión psicológica y exigencias de acciones urgentes. La siguiente etapa de la evolución de TrustNode." },
    { name: "Verificación de reputación (PCD) — En desarrollo (Roadmap)", tech: "PCD Identity Profiles — Roadmap", desc: "Compara la forma de hablar del interlocutor con los perfiles de identidad corporativa (PCD). En desarrollo (Roadmap)." },
    { name: "Comprobación de números en lista negra — En desarrollo (Roadmap)", tech: "Local Blacklist DB — Roadmap", desc: "Verificación local rápida del número contra una base de números sospechosos y listas negras. En desarrollo (Roadmap)." },
    { name: "Veredicto final · ECHO (en desarrollo)", tech: "Threshold Calibration / PostProc / LegitContextRule / ECHO", desc: "El veredicto final lo produce un pipeline multietapa: la calibración de umbrales sopesa las puntuaciones de las capas, PostProc filtra falsos positivos, LegitContextRule valida el contexto legítimo de la llamada y el protocolo ECHO añade detectores conductuales de patrones manipulativos. Ante amenazas — advertencia a pantalla completa." }
  ],
  zh: [
    { name: "声学分析（设备端，实验性）", tech: "设备端声学特征 (RMS / ZCR / Silence / Energy) · experimental", desc: "在设备端实时计算声学特征（RMS、ZCR、停顿、能量）。这不是拦截，也不是浏览器中的频谱仪——这些特征仅作为附加信号使用。该逻辑为实验性，通过 acoustic-features 在设备端运行（若 libsignal 不可用则直接计算）。" },
    { name: "ML 分类 (ruBERT)", tech: "ONNX Runtime / INT8 / ~28 MB", desc: "使用轻量级神经网络 ruBERT（ONNX INT8，约 29 MB）在设备端分析文本和元数据。模型与数据库随应用更新一起发布——日常使用无需联网，仅在安装新版本时需要。" },
    { name: "语音识别 (ASR) — 路线图（评估方案）", tech: "ASR — 路线图 (Vosk / W2V BERT / 其他方案)", desc: "设备端语音识别——列入路线图。正在评估 Vosk (STT, ~45 MB) 和替代方案 (W2V BERT 等)。选择取决于质量、大小和性能。尚未进入 MVP。" },
    { name: "对话内容语义分析 — 开发中 (Roadmap)", tech: "DeGenome (18基元) — Roadmap", desc: "对话内容语义分析：检测关键触发短语、心理施压迹象以及要求紧急操作的指令。TrustNode 进化的下一阶段。" },
    { name: "信誉验证 (PCD) — 开发中 (Roadmap)", tech: "PCD Identity Profiles — Roadmap", desc: "将对方说话方式与企业身份配置文件 (PCD) 进行比对。开发中（Roadmap）。" },
    { name: "号码黑名单核验 — 开发中 (Roadmap)", tech: "Local Blacklist DB — Roadmap", desc: "在设备端快速将号码与可疑号码库及黑名单进行比对。开发中（Roadmap）。" },
    { name: "最终裁决 · ECHO（开发中）", tech: "Threshold Calibration / PostProc / LegitContextRule / ECHO", desc: "最终裁决由多阶段流水线生成：阈值校准（threshold calibration）权衡各层评分，PostProc 后处理过滤误报，LegitContextRule 规则校验合法通话情境，ECHO 协议添加行为检测器识别操纵性对话模式。检测到威胁时——全屏警告。" }
  ],
  hi: [
    { name: "ध्वनिक विश्लेषण (डिवाइस पर, प्रयोगात्मक)", tech: "डिवाइस पर ध्वनिक विशेषताएँ (RMS / ZCR / Silence / Energy) · प्रयोगात्मक", desc: "ध्वनिक विशेषताएँ डिवाइस पर रीयल-टाइम में गणना की जाती हैं (RMS, ZCR, ठहराव, ऊर्जा)। यह ब्लॉक नहीं है और ब्राउज़र स्पेक्ट्रोमीटर नहीं है — विशेषताएँ अतिरिक्त संकेत के रूप में उपयोग होती हैं। यह तर्क प्रयोगात्मक है और acoustic-features के माध्यम से डिवाइस पर चलता है (या libsignal उपलब्ध न होने पर सीधे)।" },
    { name: "ML वर्गीकरण (ruBERT)", tech: "ONNX Runtime / INT8 / ~28 MB", desc: "डिवाइस पर टेक्स्ट और मेटाडेटा का विश्लेषण करने के लिए हल्के ruBERT न्यूरल नेटवर्क (ONNX INT8, ~28 MB) का उपयोग किया जाता है। मॉडल और डेटाबेस अपडेट ऐप अपडेट के साथ आते हैं; दैनिक उपयोग के लिए इंटरनेट की आवश्यकता नहीं होती, केवल नए संस्करण स्थापित करने के लिए होती है।" },
    { name: "वाक् पहचान (ASR) — रोडमैप (विकल्पों का मूल्यांकन)", tech: "ASR — रोडमैप (Vosk / W2V BERT / वैकल्पिक)", desc: "ऑन-डिवाइस वाक् पहचान — रोडमैप में है। Vosk (STT, ~45 MB) और वैकल्पिक (W2V BERT आदि) का मूल्यांकन चल रहा है। चयन गुणवत्ता, आकार और प्रदर्शन पर निर्भर करता है। अभी MVP में नहीं।" },
    { name: "सामग्री का सिमेंटिक विश्लेषण — विकासाधीन (Roadmap)", tech: "DeGenome (18 प्रिमिटिव्स) — Roadmap", desc: "बातचीत की सामग्री का सिमेंटिक विश्लेषण: मुख्य ट्रिगर वाक्यांशों, मनोवैज्ञानिक दबाव के संकेतों और तत्काल कार्रवाई की मांगों का पता लगाना। TrustNode विकास का अगला चरण।" },
    { name: "प्रतिष्ठा सत्यापन (PCD) — विकासाधीन (Roadmap)", tech: "PCD Identity Profiles — Roadmap", desc: "कॉलर के बोलने के तरीके की तुलना कॉर्पोरेट पहचान प्रोफाइल (PCD) से करता है। विकासाधीन (Roadmap)।" },
    { name: "नंबर ब्लैकलिस्ट जाँच — विकासाधीन (Roadmap)", tech: "Local Blacklist DB — Roadmap", desc: "संदिग्ध नंबरों के डेटाबेस और ब्लैकलिस्ट के विरुद्ध नंबर की त्वरित स्थानीय जाँच। विकासाधीन (Roadmap)।" },
    { name: "अंतिम फैसला · ECHO (विकासाधीन)", tech: "Threshold Calibration / PostProc / LegitContextRule / ECHO", desc: "अंतिम फैसला एक बहु-चरणीय पाइपलाइन द्वारा उत्पन्न होता है: थ्रेशोल्ड कैलिब्रेशन स्तरों के स्कोर को तौलता है, PostProc झूठी सकारात्मकताओं को फ़िल्टर करता है, LegitContextRule वैध कॉल संदर्भ की पुष्टि करता है, और ECHO प्रोटोकॉल हेरफेर पैटर्न के व्यवहारिक डिटेक्टर जोड़ता है। खतरे पर — फुल-स्क्रीन चेतावनी।" }
  ],
  ar: [
    { name: "التحليل الصوتي (على الجهاز، تجريبي)", tech: "ميزات صوتية على الجهاز (RMS / ZCR / Silence / Energy) · تجريبي", desc: "تُحسب الميزات الصوتية على الجهاز في الوقت الفعلي (RMS، ZCR، التوقفات، الطاقة). هذا ليس حظرًا وليس مطيافًا في المتصفح — تُستخدم الميزات كإشارة إضافية. المنطق تجريبي ويعمل على الجهاز عبر acoustic-features (أو مباشرة إذا كان libsignal غير متاح)." },
    { name: "تصنيف التعلم الآلي (ruBERT)", tech: "ONNX Runtime / INT8 / ~28 MB", desc: "تُستخدم شبكة عصبية خفيفة ruBERT (ONNX INT8، ~28 م.ب) لتحليل النصوص والبيانات الوصفية على الجهاز. تُنشر تحديثات النماذج وقواعد البيانات مع تحديث التطبيق؛ ولا يلزم الإنترنت للاستخدام اليومي، بل فقط لتثبيت إصدارات جديدة." },
    { name: "التعرف على الكلام (ASR) — خارطة طريق (تقييم الخيارات)", tech: "ASR — خارطة طريق (Vosk / W2V BERT / بدائل)", desc: "التعرف على الكلام على الجهاز — في خارطة الطريق. يتم تقييم Vosk (STT، ~45 م.ب) والبدائل (W2V BERT وغيرها). يعتمد الاختيار على الجودة والحجم والأداء. ليس بعد في MVP." },
    { name: "التحليل الدلالي للمحتوى — قيد التطوير (Roadmap)", tech: "DeGenome (18 عنصرًا أساسيًا) — Roadmap", desc: "التحليل الدلالي لمحتوى المحادثة: كشف العبارات المفتاحية المحفزة ومؤشرات الضغط النفسي ومطالب التصرف العاجل. المرحلة التالية من تطور TrustNode." },
    { name: "التحقق من السمعة (PCD) — قيد التطوير (Roadmap)", tech: "PCD Identity Profiles — Roadmap", desc: "يطابق أسلوب حديث المتصل مع ملفات الهوية المؤسسية (PCD). قيد التطوير (Roadmap)." },
    { name: "فحص قائمة الأرقام السوداء — قيد التطوير (Roadmap)", tech: "Local Blacklist DB — Roadmap", desc: "فحص محلي سريع للرقم مقابل قاعدة أرقام مشبوهة وقوائم سوداء. قيد التطوير (Roadmap)." },
    { name: "الحكم النهائي · ECHO (قيد التطوير)", tech: "Threshold Calibration / PostProc / LegitContextRule / ECHO", desc: "يُنتج الحكم النهائي عبر خط أنابيب متعدد المراحل: معايرة العتبة تُرجّح درجات الطبقات، وتقوم PostProc بتصفية الإيجابيات الكاذبة، وتتحقق LegitContextRule من سياق المكالمة الشرعي، ويضيف بروتوكول ECHO كواشف سلوكية لأنماط التلاعب. عند التهديد — تحذير بملء الشاشة." }
  ],
  pt: [
    { name: "Análise acústica (no dispositivo, experimental)", tech: "Recursos acústicos no dispositivo (RMS / ZCR / Silence / Energy) · experimental", desc: "Os recursos acústicos são calculados no dispositivo em tempo real (RMS, ZCR, pausas, energia). Não é um bloqueio nem um espectrômetro no navegador — os recursos são usados como sinal adicional. A lógica é experimental e roda no dispositivo via acoustic-features (ou diretamente se libsignal não estiver disponível)." },
    { name: "Classificação ML (ruBERT)", tech: "ONNX Runtime / INT8 / ~28 MB", desc: "Usa-se a rede neural leve ruBERT (ONNX INT8, ~28 MB) para analisar texto e metadados no dispositivo. As atualizações de modelos e bancos de dados chegam com a atualização do app; não é preciso internet no uso diário, apenas para instalar novas versões." },
    { name: "Reconhecimento de fala (ASR) — Roadmap (avaliando opções)", tech: "ASR — Roadmap (Vosk / W2V BERT / alternativas)", desc: "Reconhecimento de fala no dispositivo — no roadmap. Avaliando Vosk (STT, ~45 MB) e alternativas (W2V BERT, etc.). A escolha depende de qualidade, tamanho e desempenho. Ainda não está no MVP." },
    { name: "Análise semântica do conteúdo — Em desenvolvimento (Roadmap)", tech: "DeGenome (18 primitivas) — Roadmap", desc: "Análise semântica do conteúdo da conversa: detecção de frases-chave disparadoras, sinais de pressão psicológica e exigências de ações urgentes. A próxima etapa da evolução do TrustNode." },
    { name: "Verificação de reputação (PCD) — Em desenvolvimento (Roadmap)", tech: "PCD Identity Profiles — Roadmap", desc: "Compara o estilo de fala do interlocutor com perfis de identidade corporativa (PCD). Em desenvolvimento (Roadmap)." },
    { name: "Checagem de números em lista negra — Em desenvolvimento (Roadmap)", tech: "Local Blacklist DB — Roadmap", desc: "Verificação local rápida do número contra um banco de números suspeitos e listas negras. Em desenvolvimento (Roadmap)." },
    { name: "Veredicto final · ECHO (em desenvolvimento)", tech: "Threshold Calibration / PostProc / LegitContextRule / ECHO", desc: "O veredito final é produzido por um pipeline de várias etapas: a calibração de limiares pondera as pontuações das camadas, o PostProc filtra falsos positivos, a LegitContextRule valida o contexto legítimo da chamada e o protocolo ECHO adiciona detectores comportamentais de padrões manipulativos. Em caso de ameaça — aviso em tela cheia." }
  ],
  fr: [
    { name: "Analyse acoustique (sur l'appareil, expérimental)", tech: "Caractéristiques acoustiques sur l'appareil (RMS / ZCR / Silence / Energy) · expérimental", desc: "Les caractéristiques acoustiques sont calculées sur l'appareil en temps réel (RMS, ZCR, pauses, énergie). Ce n'est ni un blocage ni un spectromètre dans le navigateur — ces caractéristiques servent de signal supplémentaire. La logique est expérimentale et s'exécute sur l'appareil via acoustic-features (ou directement si libsignal est indisponible)." },
    { name: "Classification ML (ruBERT)", tech: "ONNX Runtime / INT8 / ~28 MB", desc: "Un réseau neuronal léger ruBERT (ONNX INT8, ~28 Mo) analyse texte et métadonnées sur l'appareil. Les mises à jour de modèles et de bases sont livrées avec l'application ; internet n'est pas requis au quotidien, seulement pour installer de nouvelles versions." },
    { name: "Reconnaissance vocale (ASR) — Roadmap (évaluation des options)", tech: "ASR — Roadmap (Vosk / W2V BERT / alternatives)", desc: "Reconnaissance vocale sur l'appareil — dans le feuille de route. Évaluation de Vosk (STT, ~45 Mo) et d'alternatives (W2V BERT, etc.). Le choix dépend de la qualité, de la taille et des performances. Pas encore en MVP." },
    { name: "Analyse sémantique du contenu — En développement (Roadmap)", tech: "DeGenome (18 primitives) — Roadmap", desc: "Analyse sémantique du contenu de la conversation : détection de phrases-clés déclencheurs, signes de pression psychologique et exigences d'actions urgentes. Prochaine étape de l'évolution de TrustNode." },
    { name: "Vérification de réputation (PCD) — En développement (Roadmap)", tech: "PCD Identity Profiles — Roadmap", desc: "Compare la façon de parler de l'appelant aux profils d'identité d'entreprise (PCD). En développement (Roadmap)." },
    { name: "Contrôle de numéros en liste noire — En développement (Roadmap)", tech: "Local Blacklist DB — Roadmap", desc: "Vérification locale rapide du numéro contre une base de numéros suspects et des listes noires. En développement (Roadmap)." },
    { name: "Verdict final · ECHO (en développement)", tech: "Threshold Calibration / PostProc / LegitContextRule / ECHO", desc: "Le verdict final est produit par un pipeline multi-étapes : la calibration des seuils pondère les scores des couches, PostProc filtre les faux positifs, LegitContextRule valide le contexte légitime de l'appel et le protocole ECHO ajoute des détecteurs comportementaux de schémas manipulateurs. En cas de menace — alerte plein écran." }
  ],
  de: [
    { name: "Akustische Analyse (auf dem Gerät, experimentell)", tech: "Akustische Merkmale auf dem Gerät (RMS / ZCR / Silence / Energy) · experimentell", desc: "Akustische Merkmale werden auf dem Gerät in Echtzeit berechnet (RMS, ZCR, Pausen, Energie). Dies ist keine Sperre und kein Spektrometer im Browser — die Merkmale dienen als zusätzliches Signal. Die Logik ist experimentell und läuft auf dem Gerät über acoustic-features (oder direkt, wenn libsignal nicht verfügbar ist)." },
    { name: "ML-Klassifikation (ruBERT)", tech: "ONNX Runtime / INT8 / ~28 MB", desc: "Ein leichtgewichtiges neuronales Netz ruBERT (ONNX INT8, ~28 MB) analysiert Text und Metadaten auf dem Gerät. Modell- und Datenbank-Updates kommen mit dem App-Update; Internet ist im Alltag nicht nötig, nur zum Installieren neuer Versionen." },
    { name: "Spracherkennung (ASR) — Roadmap (Optionen werden bewertet)", tech: "ASR — Roadmap (Vosk / W2V BERT / Alternativen)", desc: "Geräteseitige Spracherkennung — in der Roadmap. Vosk (STT, ~45 MB) und Alternativen (W2V BERT usw.) werden bewertet. Die Wahl hängt von Qualität, Größe und Leistung ab. Noch nicht im MVP." },
    { name: "Semantische Inhaltsanalyse — In Entwicklung (Roadmap)", tech: "DeGenome (18 Primitive) — Roadmap", desc: "Semantische Analyse des Gesprächsinhalts: Erkennung von Schlüssel-Triggerphrasen, Anzeichen psychologischen Drucks und Forderungen nach sofortigem Handeln. Die nächste Stufe der TrustNode-Evolution." },
    { name: "Reputationsprüfung (PCD) — In Entwicklung (Roadmap)", tech: "PCD Identity Profiles — Roadmap", desc: "Gleicht den Sprechstil des Anrufers mit Unternehmensidentitätsprofilen (PCD) ab. In Entwicklung (Roadmap)." },
    { name: "Nummern-Blacklist-Abgleich — In Entwicklung (Roadmap)", tech: "Local Blacklist DB — Roadmap", desc: "Schneller lokaler Abgleich der Nummer gegen eine Datenbank verdächtiger Nummern und Blacklists. In Entwicklung (Roadmap)." },
    { name: "Endgültiger Befund · ECHO (in Entwicklung)", tech: "Threshold Calibration / PostProc / LegitContextRule / ECHO", desc: "Das endgültige Urteil erzeugt eine mehrstufige Pipeline: die Schwellenwertkalibrierung gewichtet die Stufen-Scores, PostProc filtert Fehlalarme, LegitContextRule prüft den legitimen Gesprächskontext und das ECHO-Protokoll fügt Verhaltensdetektoren für manipulative Muster hinzu. Bei Bedrohung — Vollbildwarnung." }
  ],
  ja: [
    { name: "音響解析（端末上、実験的）", tech: "端末上の音響特徴 (RMS / ZCR / Silence / Energy) · experimental", desc: "音響特徴は端末上でリアルタイムに計算されます（RMS、ZCR、間、エネルギー）。これはブロックでもブラウザのスペクトロメーターでもありません — 特徴は追加のシグナルとして使用されます。ロジックは実験的で、acoustic-features を介して端末上で動作します（libsignal が利用できない場合は直接計算）。" },
    { name: "ML分類（ruBERT）", tech: "ONNX Runtime / INT8 / ~28 MB", desc: "軽量ニューラルネットワーク ruBERT（ONNX INT8、約29MB）を端末上でテキスト・メタデータ分析に使用します。モデルとデータベースの更新はアプリ更新に同梱され、日常利用にインターネットは不要です（新バージョンのインストール時のみ必要）。" },
    { name: "音声認識（ASR）— ロードマップ（選択肢の評価中）", tech: "ASR — ロードマップ (Vosk / W2V BERT / 代替案)", desc: "端末上での音声認識 — ロードマップに掲載。Vosk (STT, ~45 MB) と代替案 (W2V BERT など) を評価中。選択は品質・サイズ・性能に依存。まだ MVP ではありません。" },
    { name: "会話内容の意味解析 — 開発中（Roadmap）", tech: "DeGenome (18プリミティブ) — Roadmap", desc: "会話内容の意味解析：重要なトリガーフレーズ、心理的圧迫の兆候、緊急対応の要求を検出します。TrustNode進化の次のステージ。" },
    { name: "評判検証（PCD）— 開発中（Roadmap）", tech: "PCD Identity Profiles — Roadmap", desc: "発信者の話し方を企業アイデンティティプロファイル（PCD）と照合します。開発中（Roadmap）。" },
    { name: "番号ブラックリスト照合 — 開発中（Roadmap）", tech: "Local Blacklist DB — Roadmap", desc: "番号を疑わしい番号データベースやブラックリストと高速に照合します。開発中（Roadmap）。" },
    { name: "最終判定 · ECHO（開発中）", tech: "Threshold Calibration / PostProc / LegitContextRule / ECHO", desc: "最終判定は多段パイプラインによって生成されます。しきい値キャリブレーションが各レイヤーのスコアを重み付けし、PostProc が誤検知をフィルタリングし、LegitContextRule が正当な通話コンテキストを検証し、ECHO プロトコルが操作的な会話パターンの行動検出器を追加します。脅威時—全画面警告。" }
  ],
  tr: [
    { name: "Akustik Analiz (cihazda, deneysel)", tech: "Cihazda akustik özellikler (RMS / ZCR / Silence / Energy) · deneysel", desc: "Akustik özellikler cihazda gerçek zamanlı olarak hesaplanır (RMS, ZCR, duraklamalar, enerji). Bu bir engelleme değil ve tarayıcıda spektrometre değil — özellikler ek sinyal olarak kullanılır. Mantık deneyseldir ve acoustic-features üzerinden cihazda çalışır (libsignal yoksa doğrudan)." },
    { name: "ML Sınıflandırma (ruBERT)", tech: "ONNX Runtime / INT8 / ~28 MB", desc: "Metin ve meta verileri cihaz üzerinde analiz etmek için hafif bir ruBERT sinir ağı (ONNX INT8, ~28 MB) kullanılır. Model ve veritabanı güncellemeleri uygulama güncellemesiyle gelir; günlük kullanımda internet gerekmez, yalnızca yeni sürüm kurulumunda gerekir." },
    { name: "Konuşma Tanıma (ASR) — Yol Haritası (seçenekler değerlendiriliyor)", tech: "ASR — Yol Haritası (Vosk / W2V BERT / alternatifler)", desc: "Cihaz üzerinde konuşma tanıması — yol haritasında. Vosk (STT, ~45 MB) ve alternatifler (W2V BERT vb.) değerlendiriliyor. Seçim kaliteye, boyuta ve performansa bağlı. Henüz MVP'de değil." },
    { name: "İçerik Semantik Analizi — Geliştiriliyor (Roadmap)", tech: "DeGenome (18 Primitives) — Roadmap", desc: "Konuşma içeriğinin semantik analizi: anahtar tetikleyici ifadelerin, psikolojik baskı belirtilerinin ve acil eylem taleplerinin tespiti. TrustNode evriminin bir sonraki aşaması." },
    { name: "İtibar Doğrulama (PCD) — Geliştiriliyor (Roadmap)", tech: "PCD Identity Profiles — Roadmap", desc: "Arayanın konuşma tarzını kurumsal kimlik profilleriyle (PCD) karşılaştırır. Geliştiriliyor (Roadmap)." },
    { name: "Numara Kara Liste Kontrolü — Geliştiriliyor (Roadmap)", tech: "Local Blacklist DB — Roadmap", desc: "Numaranın şüpheli numaralar veritabanına ve kara listelere karşı hızlı yerel kontrolü. Geliştiriliyor (Roadmap)." },
    { name: "Nihai Karar · ECHO (geliştiriliyor)", tech: "Threshold Calibration / PostProc / LegitContextRule / ECHO", desc: "Nihai karar çok aşamalı bir hat ile üretilir: eşik kalibrasyonu katman puanlarını ağırlıklandırır, PostProc yanlış pozitifleri filtreler, LegitContextRule kuralı aramanın meşru bağlamını doğrular ve ECHO protokolü manipülatif kalıplar için davranışsal dedektörler ekler. Tehditte — tam ekran uyarı." }
  ]
};

export const btnSimplified: Partial<Record<LanguageCode, string>> = {
  ru: "Упрощенная структура",
  en: "Simplified View",
  es: "Vista simplificada",
  zh: "简化视图",
  hi: "सरलीकृत दृश्य",
  ar: "عرض مبسط",
  pt: "Estrutura simplificada",
  fr: "Structure simplifiée",
  de: "Vereinfachte Struktur",
  ja: "簡易構造表示",
  tr: "Basitleştirilmiş Görünüm"
};

export const btnAdvanced: Partial<Record<LanguageCode, string>> = {
  ru: "TrustNode 2.0 (7 слоев)",
  en: "TrustNode 2.0 (7 Layers)",
  es: "TrustNode 2.0 (7 capas)",
  zh: "TrustNode 2.0（7层）",
  hi: "TrustNode 2.0 (7 परतें)",
  ar: "TrustNode 2.0 (7 طبقات)",
  pt: "TrustNode 2.0 (7 camadas)",
  fr: "TrustNode 2.0 (7 couches)",
  de: "TrustNode 2.0 (7 Schichten)",
  ja: "TrustNode 2.0（7レイヤー）",
  tr: "TrustNode 2.0 (7 Katman)"
};

export const pipelineHeader: Partial<Record<LanguageCode, string>> = {
  ru: "Полные слои TrustNode 2.0",
  en: "Official TrustNode 2.0 Pipeline",
  es: "Canalización oficial TrustNode 2.0",
  zh: "官方 TrustNode 2.0 流程",
  hi: "आधिकारिक TrustNode 2.0 पाइपलाइन",
  ar: "مخطط حماية TrustNode 2.0 الرسمي",
  pt: "Camadas oficiais do TrustNode 2.0",
  fr: "Pipeline officiel TrustNode 2.0",
  de: "Offizielle TrustNode 2.0 Pipeline",
  ja: "公式 TrustNode 2.0 パイプライン",
  tr: "Resmi TrustNode 2.0 Hattı"
};
