import type { PageId } from "../navigation/NavigationContext";

/* ============================================================================
   navigationSchema — ЕДИНЫЙ ИСТОЧНИК правды о разделах сайта.
   Квиз, резервная сетка и блок «следующий раздел» рендерятся отсюда.
   «Главная» (логотип-якорь) и «Скачать» (CTA) в схему не входят намеренно.
   ========================================================================== */

export type NavGroupKey = "start" | "deeper";

export interface NavSection {
  id: PageId;
  title: string;          // ru-заголовок (локализация через t.pageNames при рендере)
  description: string;    // 2–3 строки, ru
  colorAccent: string;    // системные цвета групп: sapphire / coral
  group: NavGroupKey;
  path: string;
}

export const NAV_SECTIONS: NavSection[] = [
  {
    id: "how-it-works",
    title: "Как это работает",
    description:
      "Слои защиты TN1: от офлайн-транскрипции звонка до полноэкранного алерта. И как встроенный Помощник объясняет каждую угрозу простым языком.",
    colorAccent: "#1D4ED8",
    group: "start",
    path: "/how-it-works",
  },
  {
    id: "features",
    title: "Возможности",
    description:
      "8 работающих функций — от текстового анализа с F1 = 0.9975 до удаления данных из 30 хранилищ. Плюс честный статус того, что ещё в разработке.",
    colorAccent: "#1D4ED8",
    group: "start",
    path: "/features",
  },
  {
    id: "tech",
    title: "Технологии",
    description:
      "ruBERT V8 (~29 МБ, ONNX INT8), SQLCipher, RASP fail-closed — технические детали защиты и доказательства реальной разработки.",
    colorAccent: "#1D4ED8",
    group: "start",
    path: "/tech",
  },
  {
    id: "privacy-architecture",
    title: "Архитектура приватности",
    description:
      "Почему данные не покидают устройство: шифрование всего, внешние API отключены по умолчанию, автоочистка метаданных каждые 24 часа.",
    colorAccent: "#EF4444",
    group: "deeper",
    path: "/privacy-architecture",
  },
  {
    id: "roadmap",
    title: "Карта разработки",
    description:
      "Что уже готово в TN1, что в работе прямо сейчас (ECHO, Nordic Shield UI) и что запланировано дальше. Без обещаний ради обещаний.",
    colorAccent: "#EF4444",
    group: "deeper",
    path: "/roadmap",
  },
  {
    id: "about",
    title: "О проекте",
    description:
      "История TrustNode: от студенческого исследования в Челябинске до I места регионального НИР и федерального финала в Москве.",
    colorAccent: "#EF4444",
    group: "deeper",
    path: "/about",
  },
  {
    id: "research",
    title: "Исследования",
    description:
      "Независимый eval-сет 18 502 строк (F1 = 0.9975), сквозной стенд TTS→STT→ML и внешняя валидация проекта.",
    colorAccent: "#EF4444",
    group: "deeper",
    path: "/research",
  },
  {
    id: "comparison",
    title: "Сравнение",
    description:
      "Честная таблица: TrustNode против Kaspersky, Truecaller и других решений — по функциям, офлайн-работе и цене, без маркетинга.",
    colorAccent: "#EF4444",
    group: "deeper",
    path: "/comparison",
  },
  {
    id: "news",
    title: "Новости",
    description:
      "Анонсы команды TrustNode: релизы приложения, результаты исследований и прогресс разработки.",
    colorAccent: "#EF4444",
    group: "deeper",
    path: "/news",
  },
  {
    id: "download",
    title: "Скачать",
    description:
      "Скачать APK TrustNode с GitHub или RuStore. Системные требования и часто задаваемые вопросы.",
    colorAccent: "#EF4444",
    group: "deeper",
    path: "/download",
  },
  {
    id: "privacy",
    title: "Конфиденциальность",
    description:
      "Политика обработки персональных данных в соответствии с Federal Law 152-FZ. Сайт не собирает персональные данные.",
    colorAccent: "#EF4444",
    group: "deeper",
    path: "/privacy",
  },
  {
    id: "terms",
    title: "Условия",
    description:
      "Условия использования сайта и приложения TrustNode. Отказ от ответственности и ограничения.",
    colorAccent: "#EF4444",
    group: "deeper",
    path: "/terms",
  },
  {
    id: "glossary",
    title: "Глоссарий",
    description:
      "Короткие объяснения ключевых терминов антифрод-защиты, машинного обучения и приватности — без сложного жаргона.",
    colorAccent: "#EF4444",
    group: "deeper",
    path: "/glossary",
  },
  {
    id: "test",
    title: "Проверь себя",
    description:
      "Интерактивный тест: распознайте мошенника в реальных сценариях звонков, сообщений и ссылок. Полезно для всей семьи.",
    colorAccent: "#EF4444",
    group: "deeper",
    path: "/test",
  },
  {
    id: "help",
    title: "Что делать, если обманули",
    description:
      "Пошаговый чек-лист: заблокировать карту, сообщить в банк, подать заявление, собрать доказательства. Действия на случай мошенничества.",
    colorAccent: "#EF4444",
    group: "deeper",
    path: "/help",
  },
];

/* Легенда цветовой системы карточек (единая для квиза и резервной сетки):
   sapphire #1D4ED8 — базовые разделы для знакомства,
   coral    #EF4444 — глубокие/справочные разделы. */
export const GROUP_COLORS: Record<NavGroupKey, string> = {
  start: "#1D4ED8",
  deeper: "#EF4444",
};

/** Плоский порядок разделов — канонический маршрут навигации сайта. */
export const SCHEMA_IDS: PageId[] = NAV_SECTIONS.map((s) => s.id);
