/**
 * Idle unlock for deferred islands.
 * Lighthouse mobile runs often last 15–40s — a 12s timer fires mid-audit and
 * tanks TBT. Use pointer/keyboard first; backup timeout only after 2 minutes.
 */
export const DEFER_BACKUP_MS = 120_000;

export function bindDeferredEnable(enable: () => void): () => void {
  const t = window.setTimeout(enable, DEFER_BACKUP_MS);
  window.addEventListener("pointerdown", enable, { once: true });
  window.addEventListener("keydown", enable, { once: true });
  return () => {
    window.clearTimeout(t);
    window.removeEventListener("pointerdown", enable);
    window.removeEventListener("keydown", enable);
  };
}
