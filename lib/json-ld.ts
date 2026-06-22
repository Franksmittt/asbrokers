/** XSS-safe JSON-LD serialization (shared across layout, pages, FAQ schema). */
export function escapeJsonLd(obj: unknown): string {
  return JSON.stringify(obj)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}
