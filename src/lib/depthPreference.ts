/* ============================================================================
   depthPreference — хранение выбора глубины контента из квиза.
   "simple" = без терминов (по умолчанию)
   "full"   = технические подробности
   ========================================================================== */

export type DepthLevel = "simple" | "full";

const KEY = "tn_depth_preference";

export function getDepthPreference(): DepthLevel {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw === "simple" || raw === "full") return raw;
  } catch { /* ignore */ }
  return "simple"; // default: simple
}

export function setDepthPreference(level: DepthLevel) {
  localStorage.setItem(KEY, level);
  window.dispatchEvent(new Event("tn-depth-change"));
}

export function clearDepthPreference() {
  localStorage.removeItem(KEY);
  window.dispatchEvent(new Event("tn-depth-change"));
}
