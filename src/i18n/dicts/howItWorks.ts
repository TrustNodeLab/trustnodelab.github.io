import { LanguageCode } from "../languages";

export const sevenLayers: Partial<Record<LanguageCode, Array<{ name: string; tech: string; desc: string }>>> = {
  ru: [
    { name: "Быстрые эвристики (HeuristicsLayer)", tech: "Regex & Signature Maps", desc: "Первичный мгновенный фильтр входящих потоков. Блокирует известные паттерны спам-сетей, подозрительные ссылки и сигнатуры мошеннических скриптов без нагрузки на батарею." },
    { name: "Нейросетевой классификатор (BertPhantomClassifier)", tech: "ONNX Runtime / 28.4 MB Local Model", desc: "Локальный анализ текста звонков и сообщений. Нейросеть rubert-tiny2 обрабатывает данные строго на устройстве, отдельно от алгоритмов консенсуса." },
    { name: "Сценарии социнженерии (Social Eng. Layer) — по заявке на патент", tech: "DeGenome (18 примитивов) · в разработке", desc: "Архитектура (по заявке на патент): будет выявлять таксономию манипуляций по 18 примитивам DeGenome — искусственную спешку, запугивание, требования конфиденциальности и эмоциональный прессинг." },
    { name: "Поведенческий анализ (Behavioral Layer) — по заявке на патент", tech: "Context-Aware State Machine · в разработке", desc: "Архитектура (по заявке на патент): будет следить за динамикой взаимодействия в реальном времени — скоростью набора текста, задержками ответов, частотой переходов между экранами мобильного банка." },
    { name: "Репутационный контур (Reputation Layer) — по заявке на патент", tech: "PCD Identity Profiles · в разработке", desc: "Архитектура (по заявке на патент): будет сверять манеру общения звонящего с профилями поведенческой идентичности организаций — кто, когда и в каком тоне действительно имеет право звонить от лица банка или ведомства." },
    { name: "Консенсус и принятие решений (Consensus Agent) — по заявке на патент", tech: "Consensus Voting Engine · в разработке", desc: "Архитектура (по заявке на патент): алгоритм консенсуса JudgeAgent будет независимо взвешивать оценки со всех уровней системы, при угрозе блокировать действия и оповещать доверенные контакты." },
    { name: "Иммунная память (Immune Memory) — по заявке на патент", tech: "Adaptive Incident Shield · в разработке", desc: "Архитектура (по заявке на патент): долгосрочная изолированная память об атаках, которая будет локально адаптировать профили защиты на основе предотвращённых инцидентов." }
  ],
  en: [
    { name: "Fast Heuristics (HeuristicsLayer)", tech: "Regex & Signature Maps", desc: "An instant, lightweight filter for incoming data streams. Blocks known spam-networks, phishing links, and malicious automation patterns without draining battery power." },
    { name: "Neural Classification (BertPhantomClassifier)", tech: "ONNX Runtime / 28.4 MB Local Model", desc: "Local real-time multimodal analysis (text, voice, screen behavior, and network traffic). The rubert-tiny2 on-device neural network operates strictly offline, separate from consensus voting algorithms." },
    { name: "Social Engineering (Social Eng. Layer) — per patent app.", tech: "DeGenome (18 Primitives) · in development", desc: "Roadmap: will identify manipulation tactics using the DeGenome taxonomy of 18 primitives — artificial urgency, pressure speech, fear triggers, and isolation requests." },
    { name: "Behavioral Auditing (Behavioral Layer) — per patent app.", tech: "Context-Aware State Machine · in development", desc: "Roadmap: will continuously track live user interactions — typing cadence, cognitive processing delays, and switching frequencies between financial and calling apps." },
    { name: "Reputation Verification (Reputation Layer) — per patent app.", tech: "PCD Identity Profiles · in development", desc: "Roadmap: will cross-check caller traits with corporate identity profiles (PCD), identifying mismatches with official protocols." },
    { name: "Consensus Resolution (Consensus Agent) — per patent app.", tech: "Consensus Voting Engine · in development", desc: "Roadmap: a dedicated consensus voting algorithm (JudgeAgent) will aggregate risk markers from all levels to lock executions and send alerts." },
    { name: "Immune Memory — per patent app.", tech: "Adaptive Incident Shield · in development", desc: "Roadmap: a localized secure attack repository that will enable on-device fine-tuning of security filters based on recently mitigated threats." }
  ],
  es: [
    { name: "Heurística rápida (HeuristicsLayer)", tech: "Regex & Signature Maps", desc: "Un filtro instantáneo y ligero para flujos de datos entrantes. Bloquea redes de spam conocidas, enlaces de phishing y patrones de automatización maliciosos sin agotar la batería." },
    { name: "Clasificación neuronal (BertPhantomClassifier)", tech: "ONNX Runtime / 28.4 MB Local Model", desc: "Una red neuronal rubert-tiny2 comprimida que analiza transcripciones de llamadas y textos en tiempo real. Detecta guiones conversacionales ocultos, manipulación y roles como 'cuenta segura'." },
    { name: "Ingeniería social (Social Eng. Layer) — según solicitud de patente", tech: "DeGenome (18 Primitives) · en desarrollo", desc: "Roadmap: identificará tácticas de manipulación mediante la taxonomía DeGenome — urgencia artificial, discursos de presión, desencadenantes de miedo y solicitudes de aislamiento." },
    { name: "Auditoría de comportamiento (Behavioral Layer) — según solicitud de patente", tech: "Context-Aware State Machine · en desarrollo", desc: "Roadmap: realizará un seguimiento continuo de interacciones — cadencia de escritura, retrasos cognitivos y cambios entre apps." },
    { name: "Verificación de reputación (Reputation Layer) — según solicitud de patente", tech: "PCD Identity Profiles · en desarrollo", desc: "Roadmap: verificará las características del llamador con perfiles de identidad corporativa (PCD)." },
    { name: "Resolución de consenso (Consensus Agent) — según solicitud de patente", tech: "Consensus Voting Engine · en desarrollo", desc: "Roadmap: un motor JudgeAgent agregará marcadores de riesgo de todos los niveles para bloquear ejecuciones y alertar." },
    { name: "Memoria inmune (Immune Memory) — según solicitud de patente", tech: "Adaptive Incident Shield · en desarrollo", desc: "Roadmap: repositorio local seguro de ataques que permitirá ajuste fino según amenazas recientes." }
  ],
  zh: [
    { name: "快速启发式分析 (HeuristicsLayer)", tech: "Regex & Signature Maps", desc: "对输入数据流进行即时、轻量级的过滤。在不消耗电池电量的情况下，阻止已知的垃圾邮件网络、钓鱼链接和恶意自动化模式。" },
    { name: "神经网络分类 (BertPhantomClassifier)", tech: "ONNX Runtime / 28.4 MB Local Model", desc: "一个压缩的 rubert-tiny2 神经网络，实时分析通话记录和文本。检测隐藏的对话脚本、操纵行为和诸如“安全账户”之类扮演的角色。" },
    { name: "社会工程学分析 (Social Eng. Layer) — 专利申请路线图", tech: "DeGenome (18基元) · 开发中", desc: "路线图：未来将使用 DeGenome 分类法识别操纵策略——人为紧迫感、施压言论、恐惧触发和孤立请求。" },
    { name: "行为审计 (Behavioral Layer) — 专利申请路线图", tech: "Context-Aware State Machine · 开发中", desc: "路线图：未来将持续跟踪用户实时交互——打字节奏、认知延迟及应用切换频率。" },
    { name: "信誉验证 (Reputation Layer) — 专利申请路线图", tech: "PCD Identity Profiles · 开发中", desc: "路线图：未来将把呼叫者特征与企业身份档案 (PCD) 交叉比对。" },
    { name: "共识决策 (Consensus Agent) — 专利申请路线图", tech: "Consensus Voting Engine · 开发中", desc: "路线图：JudgeAgent 引擎未来将汇总风险标记以锁定执行并通知联系人。" },
    { name: "免疫记忆 (Immune Memory) — 专利申请路线图", tech: "Adaptive Incident Shield · 开发中", desc: "路线图：未来将建立本地安全攻击存储库以微调防护。" }
  ],
  hi: [
    { name: "त्वरित हेयुरिस्टिक्स (HeuristicsLayer)", tech: "Regex & Signature Maps", desc: "आने वाले डेटा स्ट्रीम के लिए एक त्वरित, हल्का फ़िल्टर। बिना बैटरी खर्च किए ज्ञात स्पैम-नेटवर्क, फ़िशिंग लिंक और दुर्भावनापूर्ण ऑटोमेशन पैटर्न को रोकता है।" },
    { name: "न्यूरल वर्गीकरण (BertPhantomClassifier)", tech: "ONNX Runtime / 28.4 MB Local Model", desc: "एक संपीड़ित rubert-tiny2 न्यूरल नेटवर्क जो वास्तविक समय में कॉल ट्रांसक्रिप्ट और टेक्स्ट का विश्लेषण करता है। छिपी हुई बातचीत की स्क्रिप्ट, हेरफेर और 'सुरक्षित खाता' जैसी भूमिकाओं का पता लगाता है।" },
    { name: "सोशल इंजीनियरिंग (Social Eng. Layer) — पेटेंट आवेदन रोडमैप", tech: "DeGenome (18 प्रिमिटिव्स) · विकासाधीन", desc: "रोडमैप: भविष्य में DeGenome वर्गीकरण से हेरफेर की रणनीति पहचानी जाएगी।" },
    { name: "व्यवहार ऑडिटिंग (Behavioral Layer) — पेटेंट आवेदन रोडमैप", tech: "Context-Aware State Machine · विकासाधीन", desc: "रोडमैप: भविष्य में लाइव इंटरैक्शन ट्रैक किया जाएगा।" },
    { name: "प्रतिष्ठा सत्यापन (Reputation Layer) — पेटेंट आवेदन रोडमैप", tech: "PCD Identity Profiles · विकासाधीन", desc: "रोडमैप: भविष्य में कॉलर लक्षणों को PCD प्रोफाइल से मिलाया जाएगा।" },
    { name: "सर्वसम्मति समाधान (Consensus Agent) — पेटेंट आवेदन रोडमैप", tech: "Consensus Voting Engine · विकासाधीन", desc: "रोडमैप: JudgeAgent इंजन भविष्य में जोखिम मार्कर एकत्र कर सूचित करेगा।" },
    { name: "प्रतिरक्षा मेमोरी (Immune Memory) — पेटेंट आवेदन रोडमैप", tech: "Adaptive Incident Shield · विकासाधीन", desc: "रोडमैप: भविष्य में स्थानीय हमला रिपॉजिटरी सुरक्षा फ़िल्टर को ट्यून करेगी।" }
  ],
  ar: [
    { name: "الاستدلال السريع (HeuristicsLayer)", tech: "Regex & Signature Maps", desc: "فلتر فوري وخفيف لتدفقات البيانات الواردة. يحظر شبكات البريد العشوائي المعروفة، وروابط التصيد الاحتيالي، وأنماط الأتمتة الخبيثة دون استهلاك البطارية." },
    { name: "التصنيف العصبي (BertPhantomClassifier)", tech: "ONNX Runtime / 28.4 MB Local Model", desc: "شبكة عصبية مضغوطة من طراز rubert-tiny2 تحلل النصوص والمكالمات في الوقت الفعلي. تكتشف سيناريوهات الحوار المخفية، والتلاعب، وأدوار مثل 'الحساب الآمن'." },
    { name: "الهندسة الاجتماعية (Social Eng. Layer) — وفقًا لطلب براءة الاختراع", tech: "DeGenome · قيد التطوير", desc: "خارطة الطريق: ستحدد تكتيكات التلاعب باستخدام تصنيف DeGenome مستقبلاً." },
    { name: "التدقيق السلوكي (Behavioral Layer) — وفقًا لطلب براءة الاختراع", tech: "Context-Aware State Machine · قيد التطوير", desc: "خارطة الطريق: ستتابع تفاعلات المستخدم المباشرة مستقبلاً." },
    { name: "التحقق من السمعة (Reputation Layer) — وفقًا لطلب براءة الاختراع", tech: "PCD Identity Profiles · قيد التطوير", desc: "خارطة الطريق: ستطابق سمات المتصل مع ملفات الهوية المؤسسية مستقبلاً." },
    { name: "حل التوافق (Consensus Agent) — وفقًا لطلب براءة الاختراع", tech: "Consensus Voting Engine · قيد التطوير", desc: "خارطة الطريق: سيجمع محرك JudgeAgent مؤشرات الخطر مستقبلاً لتنبيه جهات الاتصال." },
    { name: "الذاكرة المناعية (Immune Memory) — وفقًا لطلب براءة الاختراع", tech: "Adaptive Incident Shield · قيد التطوير", desc: "خارطة الطريق: سيتيح مستودع الهجمات المحلي ضبط الفلاتر مستقبلاً." }
  ],
  pt: [
    { name: "Heurísticas rápidas (HeuristicsLayer)", tech: "Regex & Signature Maps", desc: "Um filtro instantâneo e leve para fluxos de dados recebidos. Bloqueia redes de spam conhecidas, links suspeitos e assinaturas de scripts fraudulentos sem consumir bateria." },
    { name: "Classificação neuronal (BertPhantomClassifier)", tech: "ONNX Runtime / 28.4 MB Local Model", desc: "Uma rede neural rubert-tiny2 compactada que analisa a semântica da chamada ou texto da mensagem em tempo real. Detecta manipulação oculta, cenários de encenação ('conta segura', 'parente em apuros')." },
    { name: "Engenharia social (Social Eng. Layer) — conforme pedido de patente", tech: "DeGenome · em desenvolvimento", desc: "Roadmap: identificará táticas de manipulação usando a taxonomia DeGenome no futuro." },
    { name: "Análise comportamental (Behavioral Layer) — conforme pedido de patente", tech: "Context-Aware State Machine · em desenvolvimento", desc: "Roadmap: monitorará a dinâmica da interação futuramente." },
    { name: "Verificação de reputação (Reputation Layer) — conforme pedido de patente", tech: "PCD Identity Profiles · em desenvolvimento", desc: "Roadmap: comparará características do chamador com perfis PCD no futuro." },
    { name: "Consenso PHANTOM (Consensus Agent) — conforme pedido de patente", tech: "Consensus Voting Engine · em desenvolvimento", desc: "Roadmap: o mecanismo JudgeAgent ponderará avaliações futuramente." },
    { name: "Memoria imune (Immune Memory) — conforme pedido de patente", tech: "Adaptive Incident Shield · em desenvolvimento", desc: "Roadmap: memória isolada de ataques que adaptará perfis futuramente." }
  ],
  fr: [
    { name: "Heuristiques rapides (HeuristicsLayer)", tech: "Regex & Signature Maps", desc: "Un filtre instantané et léger pour les flux de données entrants. Bloque les réseaux de spam connus, les liens suspects et les scripts frauduleux sans consommer de bourse." },
    { name: "Classification neuronale (BertPhantomClassifier)", tech: "ONNX Runtime / 28.4 MB Local Model", desc: "Un réseau de neurones compressé rubert-tiny2 analysant la sémantique de l'appel ou du message en temps réel. Détecte les manipulations cachées et scénarios de rôles (« compte sécurisé »)." },
    { name: "Ingénierie sociale (Social Eng. Layer) — selon la demande de brevet", tech: "DeGenome · en développement", desc: "Feuille de route : identifiera les tactiques de manipulation via DeGenome à l'avenir." },
    { name: "Analyse comportementale (Behavioral Layer) — selon la demande de brevet", tech: "Context-Aware State Machine · en développement", desc: "Feuille de route : suivra la dynamique des interactions à l'avenir." },
    { name: "Vérification de réputation (Reputation Layer) — selon la demande de brevet", tech: "PCD Identity Profiles · en développement", desc: "Feuille de route : vérifiera les traits de l'appelant via PCD à l'avenir." },
    { name: "Résolution par consensus (Consensus Agent) — selon la demande de brevet", tech: "Consensus Voting Engine · en développement", desc: "Feuille de route : le moteur JudgeAgent agrégera les marqueurs de risque à l'avenir." },
    { name: "Mémoire immunitaire (Immune Memory) — selon la demande de brevet", tech: "Adaptive Incident Shield · en développement", desc: "Feuille de route : répertoire local qui adaptera les profils à l'avenir." }
  ],
  de: [
    { name: "Schnelle Heuristiken (HeuristicsLayer)", tech: "Regex & Signature Maps", desc: "Ein sofortiger, leichtgewichtiger Filter für eingehende Datenströme. Blockiert bekannte Spam-Netzwerke, Phishing-Links und bösartige Automatisierungsmuster ohne Akkubelastung." },
    { name: "Neuronale Klassifikation (BertPhantomClassifier)", tech: "ONNX Runtime / 28.4 MB Local Model", desc: "Ein komprimiertes rubert-tiny2 neuronales Netz, das Anrufe und Texte in Echtzeit analysiert. Erkennt versteckte Gesprächsskripte, Manipulationen und Rollen wie „sicheres Konto“." },
    { name: "Social Engineering (Social Eng. Layer) — laut Patentanmeldung", tech: "DeGenome · in Entwicklung", desc: "Roadmap: wird künftig Manipulationstaktiken mittels DeGenome identifizieren." },
    { name: "Verhaltensanalyse (Behavioral Layer) — laut Patentanmeldung", tech: "Context-Aware State Machine · in Entwicklung", desc: "Roadmap: wird künftig Live-Interaktionen verfolgen." },
    { name: "Reputationsüberprüfung (Reputation Layer) — laut Patentanmeldung", tech: "PCD Identity Profiles · in Entwicklung", desc: "Roadmap: wird künftig Anrufermerkmale mit PCD-Profilen abgleichen." },
    { name: "Konsens-Entscheidung (Consensus Agent) — laut Patentanmeldung", tech: "Consensus Voting Engine · in Entwicklung", desc: "Roadmap: die JudgeAgent-Engine wird künftig Risikomarker aggregieren." },
    { name: "Immungedächtnis (Immune Memory) — laut Patentanmeldung", tech: "Adaptive Incident Shield · in Entwicklung", desc: "Roadmap: lokaler Angriffsspeicher wird künftig Filter anpassen." }
  ],
  ja: [
    { name: "高速ヒューリスティック (HeuristicsLayer)", tech: "Regex & Signature Maps", desc: "受信データストリームに対する即時・軽量フィルター。バッテリーを消費せず、既知のスパムネットワーク、フィッシングリンク、悪意ある自動化パターンを遮断します。" },
    { name: "ニューラル分類 (BertPhantomClassifier)", tech: "ONNX Runtime / 28.4 MB Local Model", desc: "リアルタイムで通話音声やテキストを解析する圧縮版 rubert-tiny2 ニューラルネットワーク。隠された誘導手口や、「安全な口座」といった役割を検出します。" },
    { name: "ソーシャルエンジニアリング (Social Eng. Layer) — 特許出願ロードマップ", tech: "DeGenome・開発中", desc: "ロードマップ：将来的に DeGenome 分類法で操作手口を特定予定。" },
    { name: "行動監査 (Behavioral Layer) — 特許出願ロードマップ", tech: "Context-Aware State Machine・開発中", desc: "ロードマップ：将来的にリアルタイム操作を追跡予定。" },
    { name: "評判検証 (Reputation Layer) — 特許出願ロードマップ", tech: "PCD Identity Profiles・開発中", desc: "ロードマップ：将来的に PCD プロファイルと照合予定。" },
    { name: "合意形成 (Consensus Agent) — 特許出願ロードマップ", tech: "Consensus Voting Engine・開発中", desc: "ロードマップ：JudgeAgent が将来的にリスクを集計予定。" },
    { name: "免疫記憶 (Immune Memory) — 特許出願ロードマップ", tech: "Adaptive Incident Shield・開発中", desc: "ロードマップ：将来的にローカル攻撃リポジトリでフィルター調整予定。" }
  ],
  tr: [
    { name: "Hızlı Sezgisel Analiz (HeuristicsLayer)", tech: "Regex & Signature Maps", desc: "Gelen veri akışları için anında, hafif bir filtre. Pil gücünü tüketmeden bilinen spam ağlarını, kimlik avı bağlantılarını ve kötü amaçlı otomasyon kalıplarını engeller." },
    { name: "Sinirsel Sınıflandırma (BertPhantomClassifier)", tech: "ONNX Runtime / 28.4 MB Local Model", desc: "Yerel gerçek zamanlı multimodal analiz (metin, ses, ekran davranışı ve ağ trafiği). Cihaz içi rubert-tiny2 sinir ağı, mutabakat oylama algoritmalarından ayrı olarak kesinlikle çevrimdışı çalışır." },
    { name: "Sosyal Mühendislik (Social Eng. Layer) — patent başvurusuna göre", tech: "DeGenome · geliştirme aşamasında", desc: "Yol haritası: gelecekte DeGenome ile manipülasyon taktiklerini tanımlayacak." },
    { name: "Davranışsal Denetim (Behavioral Layer) — patent başvurusuna göre", tech: "Context-Aware State Machine · geliştirme aşamasında", desc: "Yol haritası: gelecekte canlı etkileşimleri izleyecek." },
    { name: "İtibar Doğrulama (Reputation Layer) — patent başvurusuna göre", tech: "PCD Identity Profiles · geliştirme aşamasında", desc: "Yol haritası: gelecekte PCD profilleriyle çapraz kontrol yapacak." },
    { name: "Mutabakat Kararı (Consensus Agent) — patent başvurusuna göre", tech: "Consensus Voting Engine · geliştirme aşamasında", desc: "Yol haritası: JudgeAgent gelecekte risk belirteçlerini toplayacak." },
    { name: "Bağışıklık Belleği (Immune Memory) — patent başvurusuna göre", tech: "Adaptive Incident Shield · geliştirme aşamasında", desc: "Yol haritası: gelecekte yerel saldırı deposu filtreleri ayarlayacak." }
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
  ru: "Архитектура PHANTOM 2.0 (по заявке на патент, roadmap, 7 слоёв)",
  en: "PHANTOM 2.0 Patent-Pending Architecture (Roadmap, 7 Layers)",
  es: "Arquitectura PHANTOM 2.0 (según solicitud de patente, roadmap, 7 capas)",
  zh: "PHANTOM 2.0 专利申请架构（路线图，7层）",
  hi: "PHANTOM 2.0 पेटेंट आवेदन आर्किटेक्चर (रोडमैप, 7 परतें)",
  ar: "بنية PHANTOM 2.0 قيد تسجيل براءة اختراع (خارطة طريق، 7 طبقات)",
  pt: "Arquitetura PHANTOM 2.0 (conforme pedido de patente, roadmap, 7 camadas)",
  fr: "Architecture PHANTOM 2.0 (demande de brevet, feuille de route, 7 couches)",
  de: "Patentangemeldete PHANTOM 2.0 Architektur (Roadmap, 7 Schichten)",
  ja: "特許出願中 PHANTOM 2.0 アーキテクチャ（ロードマップ、7レイヤー）",
  tr: "Patent Başvurusu PHANTOM 2.0 Mimarisi (Yol Haritası, 7 Katman)"
};

export const pipelineHeader: Partial<Record<LanguageCode, string>> = {
  ru: "Архитектура PHANTOM 2.0 (по заявке на патент) — план развития",
  en: "Patent-Pending PHANTOM 2.0 Architecture — Development Roadmap",
  es: "Arquitectura PHANTOM 2.0 (según solicitud de patente) — hoja de ruta",
  zh: "PHANTOM 2.0 专利申请架构 — 发展路线图",
  hi: "पेटेंट आवेदन PHANTOM 2.0 आर्किटेक्चर — विकास रोडमैप",
  ar: "بنية PHANTOM 2.0 (طلب براءة اختراع) — خارطة الطريق",
  pt: "Arquitetura PHANTOM 2.0 (conforme pedido de patente) — plano de desenvolvimento",
  fr: "Architecture PHANTOM 2.0 (demande de brevet) — feuille de route",
  de: "Patentangemeldete PHANTOM 2.0 Architektur — Entwicklungs-Roadmap",
  ja: "特許出願中 PHANTOM 2.0 アーキテクチャ — 開発ロードマップ",
  tr: "Patent Başvurusu PHANTOM 2.0 Mimarisi — Yol Haritası"
};
