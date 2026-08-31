export const title: Record<string, string> = {
  "ru": "Помощник TrustNode",
  "en": "TrustNode Assistant",
  "es": "Asistente de TrustNode",
  "zh": "TrustNode 助手",
  "tr": "TrustNode Asistanı",
  "hi": "TrustNode सहायक",
  "ar": "مساعد TrustNode",
  "pt": "Assistente do TrustNode",
  "fr": "Assistant TrustNode",
  "de": "TrustNode-Assistent",
  "ja": "TrustNode アシスタント"
};

export const subtitle: Record<string, string> = {
  "ru": "Офлайн-помощник с базой знаний по схемам мошенничества, работающий прямо на устройстве",
  "en": "An offline assistant with a knowledge base of fraud schemes, running fully on your device",
  "es": "Un asistente sin conexión con una base de conocimiento sobre esquemas de fraude que funciona en el dispositivo",
  "zh": "内置防诈骗知识库的离线助手，完全在设备上运行",
  "tr": "Cihazda çalışan, dolandırıcılık şemaları bilgi tabanına sahip çevrimdışı asistan",
  "hi": "धोखाधड़ी योजनाओं के ज्ञान आधार वाला ऑफ़लाइन सहायक, पूरी तरह आपके डिवाइस पर चलता है",
  "ar": "مساعد بدون اتصال بقاعدة معرفة بأساليب الاحتيال، يعمل بالكامل على جهازك",
  "pt": "Um assistente offline com uma base de conhecimento sobre esquemas de fraude, rodando no dispositivo",
  "fr": "Un assistant hors ligne avec une base de connaissances sur les schémas de fraude, fonctionnant sur l'appareil",
  "de": "Ein Offline-Assistent mit einer Wissensbasis über Betrugsmaschen, direkt auf dem Gerät",
  "ja": "詐欺の手口に関するナレッジベースを備えたオフラインアシスタント、端末上で動作"
};

export const badge: Record<string, string> = {
  "ru": "ВСТРОЕННЫЙ ПОМОЩНИК",
  "en": "BUILT-IN ASSISTANT",
  "es": "ASISTENTE INTEGRADO",
  "zh": "内置助手",
  "tr": "YERLEŞİK ASİSTAN",
  "hi": "इनबिल्ट सहायक",
  "ar": "المساعد المدمج",
  "pt": "ASSISTENTE INTEGRADO",
  "fr": "ASSISTANT INTÉGRÉ",
  "de": "INTEGRIERTER ASSISTENT",
  "ja": "内蔵アシスタント"
};

export const features: Record<string, Array<{ title: string; desc: string }>> = {
  "ru": [
    {
      "title": "База знаний о схемах мошенничества",
      "desc": "Локальная база знаний о схемах мошенничества: помощник объясняет, как работает та или иная схема, и что делать в конкретной ситуации."
    },
    {
      "title": "Работа на 100% Офлайн",
      "desc": "Никаких обращений к облачным LLM. Вся семантическая структура и шаблоны ответов упакованы в приложение, работая без сети в режиме сверхнизкой задержки."
    },
    {
      "title": "Объясняет вердикты и даёт советы",
      "desc": "Расшифровывает, почему сообщение или звонок помечены как опасные, и подсказывает безопасный порядок действий простым языком."
    }
  ],
  "en": [
    {
      "title": "Knowledge Base of Fraud Schemes",
      "desc": "A local knowledge base about fraud schemes: the assistant explains how each scheme works and what to do in a specific situation."
    },
    {
      "title": "100% Offline Execution",
      "desc": "No expensive, slow external LLM API calls. Fully offline response templates and semantic structure keep execution latency down to microseconds."
    },
    {
      "title": "Explains Verdicts & Gives Advice",
      "desc": "Explains why a message or call was flagged as dangerous and suggests a safe course of action in plain language."
    }
  ],
  "es": [
    {
      "title": "Base de conocimiento sobre esquemas de fraude",
      "desc": "Base de conocimiento local sobre esquemas de fraude: el asistente explica cómo funciona cada esquema y qué hacer en cada situación."
    },
    {
      "title": "Ejecución 100% sin conexión",
      "desc": "Sin llamadas a LLM en la nube. Toda la estructura semántica y las plantillas de respuesta están empaquetadas en la aplicación y funcionan sin red con latencia ultra baja."
    },
    {
      "title": "Explica veredictos y da consejos",
      "desc": "Explica por qué un mensaje o llamada fue marcado como peligroso y sugiere el procedimiento seguro en lenguaje sencillo."
    }
  ],
  "zh": [
    {
      "title": "防诈骗知识库",
      "desc": "关于诈骗手法的本地知识库：助手会解释每种骗术的运作方式，以及在具体情况下该怎么做。"
    },
    {
      "title": "100% 离线运行",
      "desc": "不调用云端大模型。所有语义结构与应答模板都打包在应用中，离线以超低延迟运行。"
    },
    {
      "title": "解读判定并给出建议",
      "desc": "说明消息或来电为何被标记为危险，并用通俗语言建议安全的处理步骤。"
    }
  ],
  "tr": [
    {
      "title": "Dolandırıcılık Şemaları Bilgi Tabanı",
      "desc": "Dolandırıcılık şemaları hakkında yerel bilgi tabanı: asistan her şemanın nasıl çalıştığını ve belirli bir durumda ne yapılması gerektiğini açıklar."
    },
    {
      "title": "%100 Çevrimdışı Çalışma",
      "desc": "Bulut tabanlı LLM çağrıları yok. Tüm anlamsal yapı ve yanıt şablonları uygulamaya gömülüdür, ağ olmadan ultra düşük gecikmeyle çalışır."
    },
    {
      "title": "Kararları açıklar ve tavsiye verir",
      "desc": "Bir mesajın veya aramanın neden tehlikeli işaretlendiğini açıklar ve güvenli adımları basit bir dille önerir."
    }
  ],
  "hi": [
    {
      "title": "धोखाधड़ी योजनाओं का ज्ञान आधार",
      "desc": "धोखाधड़ी योजनाओं के बारे में स्थानीय ज्ञान आधार: सहायक समझाता है कि हर योजना कैसे काम करती है और किसी स्थिति में क्या करना चाहिए।"
    },
    {
      "title": "100% ऑफ़लाइन निष्पादन",
      "desc": "कोई क्लाउड LLM कॉल नहीं। पूरा सिमेंटिक ढांचा और उत्तर टेम्पलेट ऐप में शामिल हैं, बिना नेटवर्क अल्ट्रा-लो लेटेंसी में चलते हैं।"
    },
    {
      "title": "फ़ैसले समझाता है और सलाह देता है",
      "desc": "बताता है कि संदेश या कॉल खतरनाक क्यों चिह्नित हुआ और सरल भाषा में सुरक्षित कदम सुझाता है।"
    }
  ],
  "ar": [
    {
      "title": "قاعدة معرفة بأساليب الاحتيال",
      "desc": "قاعدة معرفة محلية عن أساليب الاحتيال: يشرح المساعد كيف يعمل كل أسلوب وماذا تفعل في كل حالة."
    },
    {
      "title": "تشغيل أوفلاين بنسبة 100%",
      "desc": "لا استدعاءات لنماذج LLM السحابية. الهيكل الدلالي وقوالب الردود مدمجة في التطبيق وتعمل دون شبكة بزمن استجابة منخفض جداً."
    },
    {
      "title": "يشرح الأحكام ويقدم النصائح",
      "desc": "يوضح لماذا تم وضع علامة خطر على رسالة أو مكالمة، ويقترح الخطوات الآمنة بلغة بسيطة."
    }
  ],
  "pt": [
    {
      "title": "Base de conhecimento sobre esquemas de fraude",
      "desc": "Uma base de conhecimento local sobre esquemas de fraude: o assistente explica como cada esquema funciona e o que fazer em cada situação."
    },
    {
      "title": "Execução 100% off-line",
      "desc": "Sem chamadas a LLMs na nuvem. Toda a estrutura semântica e os modelos de resposta estão embutidos no aplicativo e funcionam sem rede com latência ultrabaixa."
    },
    {
      "title": "Explica veredictos e dá conselhos",
      "desc": "Explica por que uma mensagem ou chamada foi marcada como perigosa e sugere ações seguras em linguagem simples."
    }
  ],
  "fr": [
    {
      "title": "Base de connaissances sur les schémas de fraude",
      "desc": "Une base locale sur les schémas de fraude : l'assistant explique comment chaque schéma fonctionne et quoi faire dans chaque situation."
    },
    {
      "title": "Exécution 100 % hors ligne",
      "desc": "Aucun appel aux LLM du cloud. Toute la structure sémantique et les modèles de réponse sont intégrés à l'application et fonctionnent hors ligne avec une latence ultra-faible."
    },
    {
      "title": "Explique les verdicts et conseille",
      "desc": "Explique pourquoi un message ou un appel a été signalé comme dangereux et propose la marche à suivre en langage simple."
    }
  ],
  "de": [
    {
      "title": "Wissensbasis über Betrugsmaschen",
      "desc": "Eine lokale Wissensbasis über Betrugsmaschen: Der Assistent erklärt, wie jede Masche funktioniert und was im konkreten Fall zu tun ist."
    },
    {
      "title": "100 % Offline-Ausführung",
      "desc": "Keine Aufrufe cloudbasierter LLMs. Die gesamte semantische Struktur und die Antwortvorlagen sind in der App enthalten und laufen ohne Netz mit ultraniegriger Latenz."
    },
    {
      "title": "Erklärt Urteile und gibt Ratschläge",
      "desc": "Erklärt, warum eine Nachricht oder ein Anruf als gefährlich eingestuft wurde, und nennt sichere nächste Schritte in einfacher Sprache."
    }
  ],
  "ja": [
    {
      "title": "詐欺の手口ナレッジベース",
      "desc": "詐欺手法に関するローカル知識ベース：アシスタントが各手法の仕組みと具体的な対処法を説明します。"
    },
    {
      "title": "100% オフライン動作",
      "desc": "クラウドLLMへの問い合わせは一切なし。意味構造と応答テンプレートはすべてアプリに同梱され、ネットワークなしで超低遅延で動作します。"
    },
    {
      "title": "判定を解説しアドバイスを提供",
      "desc": "メッセージや通話が危険と判定された理由を説明し、安全な対応を平易な言葉で提案します。"
    }
  ]
};
