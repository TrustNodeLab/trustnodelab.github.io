/* ============================================================================
   scrollLock — централизованная блокировка скролла страницы.
   Проблема, которую решает: несколько компонентов (кинематик в App.tsx,
   CinematicOverlays, QuizFlow, полноэкранное меню Header) независимо пишут
   documentElement.style.overflow и восстанавливают «свой» снимок. Вложенные
   локи восстанавливали устаревшее значение ("hidden") и скролл залипал на
   страницах, открытых до снятия всех локов (например /sections).
   Решение — счётчик ссылок: hidden ставится при первом acquire, снимается
   только когда все владельцы вызвали release.
   ========================================================================== */

let count = 0;
let savedOverflow = "";

export function acquireScrollLock(): void {
  if (count === 0) {
    savedOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
  }
  count += 1;
}

export function releaseScrollLock(): void {
  if (count === 0) return;
  count -= 1;
  if (count === 0) {
    document.documentElement.style.overflow = savedOverflow;
    savedOverflow = "";
  }
}

/** Принудительно снять все локи (страховка при навигации). */
export function resetScrollLock(): void {
  if (count > 0) {
    count = 0;
    savedOverflow = "";
    document.documentElement.style.overflow = "";
  }
}
