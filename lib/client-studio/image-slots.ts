/**
 * Detect and replace image placeholders in studio article HTML.
 * AI tools often use different tokens than the legacy single string.
 */

/** Preferred token — documented in brand guide and inserted by “Add image slot”. */
export const PRIMARY_IMAGE_PLACEHOLDER = "YOUR_IMAGE_URL_HERE";

/** Longest-first so shorter tokens do not double-count longer ones. */
const IMAGE_PLACEHOLDER_MARKERS = [
  "YOUR_IMAGE_URL_HERE",
  "{{IMAGE_URL}}",
  "REPLACE_WITH_IMAGE_URL",
  "YOUR_IMAGE_URL",
] as const;

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function escapeAttr(u: string): string {
  return u.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

/** Human-readable list for UI copy. */
export const IMAGE_PLACEHOLDER_MARKERS_LABEL = IMAGE_PLACEHOLDER_MARKERS.join(", ");

function countMarkerOccurrences(html: string): number {
  let total = 0;
  let remainder = html;
  for (const marker of IMAGE_PLACEHOLDER_MARKERS) {
    const re = new RegExp(escapeRegExp(marker), "g");
    const matches = remainder.match(re);
    total += matches?.length ?? 0;
    remainder = remainder.replace(re, "");
  }
  return total;
}

/** <img> tags that still need a real URL (empty / # only; skips tags that already contain a text marker). */
function countEmptyOrHashImgTags(html: string): number {
  let c = 0;
  for (const m of html.matchAll(/<img\b[^>]*>/gi)) {
    const tag = m[0];
    if (IMAGE_PLACEHOLDER_MARKERS.some((marker) => tag.includes(marker))) continue;
    const srcMatch = tag.match(/\bsrc\s*=\s*["']([^"']*)["']/i) ?? tag.match(/\bsrc\s*=\s*([^\s>]+)/i);
    if (!srcMatch) {
      c += 1;
      continue;
    }
    const val = (srcMatch[1] ?? "").trim();
    if (!val || val === "#") c += 1;
  }
  return c;
}

/** Slots the uploader can fill (text markers + empty img src). */
export function countImageUploadSlots(html: string): number {
  return countMarkerOccurrences(html) + countEmptyOrHashImgTags(html);
}

function replaceFirstEmptyImgSrc(html: string, url: string): string {
  const esc = escapeAttr(url);
  const noSrc = html.replace(
    /<img(?![^>]*\bsrc=)(\s[^>]*?)>/i,
    `<img src="${esc}"$1>`
  );
  if (noSrc !== html) return noSrc;
  return html.replace(
    /<img\b([^>]*?)\bsrc\s*=\s*(["'])\s*\2([^>]*?)>/i,
    (_m, before, _q, after) => `<img${before}src="${esc}"${after}>`
  );
}

/** Replace the first remaining slot (any supported marker, else first empty img). */
export function replaceNextImageSlot(html: string, url: string): string {
  for (const marker of IMAGE_PLACEHOLDER_MARKERS) {
    if (html.includes(marker)) {
      return html.replace(marker, url);
    }
  }
  return replaceFirstEmptyImgSrc(html, url);
}

export function replaceImagePlaceholdersSequentially(html: string, urls: string[]): string {
  let next = html;
  for (const u of urls) {
    next = replaceNextImageSlot(next, u);
  }
  return next;
}
