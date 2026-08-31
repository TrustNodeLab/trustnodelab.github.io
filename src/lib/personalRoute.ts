import { useEffect, useState } from "react";
import type { PageId } from "../navigation/NavigationContext";
import { NAV_ITEMS } from "../components/Navigation";

/* Персональный маршрут из квиза: единое хранилище для всех точек навигации.
   Навигация на внутренних страницах показывает ТОЛЬКО выбранные разделы;
   полный список живёт на отдельной странице /sections.
   Ключ v2: смена версии сбрасывает маршруты, собранные старыми версиями квиза
   (пока пользователь не ответил — ничего не «собрано»). */

const KEY = "tn_personal_route_v2"; // JSON: PageId[]

/** Событие: скролл можно разблокировать (квиз пройден). */
export const UNLOCK_SCROLL_EVENT = "tn-unlock-scroll";
export function requestScrollUnlock() {
  window.dispatchEvent(new Event(UNLOCK_SCROLL_EVENT));
}

export function getPersonalRoute(): PageId[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr)) return [];
    return arr.filter((id) => NAV_ITEMS.includes(id));
  } catch {
    return [];
  }
}

export function setPersonalRoute(ids: PageId[]) {
  localStorage.setItem(KEY, JSON.stringify(ids));
  window.dispatchEvent(new Event("tn-route-change"));
}

export function clearPersonalRoute() {
  localStorage.removeItem(KEY);
  window.dispatchEvent(new Event("tn-route-change"));
}

/** Финал навигации: страница «Скачать» всегда замыкает маршрут —
    лаконичное завершение сайта вне зависимости от подборки квиза. */
export const FINALE_ID: PageId = "download";

export function withFinale(items: PageId[]): PageId[] {
  return items.includes(FINALE_ID) ? items : [...items, FINALE_ID];
}

/** Активный список разделов: персональный маршрут, либо полный.
    Всегда заканчивается финалом (FINALE_ID). */
export function usePersonalItems(): PageId[] {
  const [items, setItems] = useState<PageId[]>(() => getPersonalRoute());
  useEffect(() => {
    const sync = () => setItems(getPersonalRoute());
    window.addEventListener("tn-route-change", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("tn-route-change", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  return withFinale(items.length ? items : NAV_ITEMS);
}
