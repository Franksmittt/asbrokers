/**
 * Detect and replace image placeholders in studio article HTML.
 * AI tools often use different tokens than the legacy single string.
 */

/** Preferred token — documented in brand guide and inserted by “Add image slot”. */
export const PRIMARY_IMAGE_PLACEHOLDER = "YOUR_IMAGE_URL_HERE";

/** Longest-first so shorter tokens do not double-count longer ones. */
const IMAGE_PLACEHOLDER_MARKERS = [
  "YOUR_IMAGE_URL_HERE",
  "[IMAGE_SLOT]",
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

/** Longest-first alternation so YOUR_IMAGE_URL does not partially match YOUR_IMAGE_URL_HERE. */
const MARKER_PATTERN = [...IMAGE_PLACEHOLDER_MARKERS]
  .sort((a, b) => b.length - a.length)
  .map(escapeRegExp)
  .join("|");

function findFirstMarkerMatch(html: string): { index: number; length: number } | null {
  const m = new RegExp(MARKER_PATTERN).exec(html);
  if (!m || m[0] === undefined) return null;
  return { index: m.index, length: m[0].length };
}

function findFirstEmptyImgBounds(html: string): { start: number; end: number } | null {
  const re = /<img\b[^>]*>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    const tag = m[0];
    if (IMAGE_PLACEHOLDER_MARKERS.some((marker) => tag.includes(marker))) continue;
    const srcMatch = tag.match(/\bsrc\s*=\s*["']([^"']*)["']/i) ?? tag.match(/\bsrc\s*=\s*([^\s>]+)/i);
    if (!srcMatch) {
      return { start: m.index, end: m.index + tag.length };
    }
    const val = (srcMatch[1] ?? "").trim();
    if (!val || val === "#") {
      return { start: m.index, end: m.index + tag.length };
    }
  }
  return null;
}

/** Short preview for studio UI: ordered list of upcoming image slots (document order). */
export function listImageSlotHints(html: string, maxHints = 10): string[] {
  const hints: string[] = [];
  let remaining = html;
  while (hints.length < maxHints) {
    const marker = findFirstMarkerMatch(remaining);
    const empty = findFirstEmptyImgBounds(remaining);
    const pickMarker = marker && (!empty || marker.index < empty.start);
    const pickEmpty = empty && (!marker || empty.start < marker.index);
    if (pickMarker && marker) {
      const ctxStart = Math.max(0, marker.index - 24);
      const ctx = remaining.slice(ctxStart, marker.index + marker.length + 40).replace(/\s+/g, " ");
      hints.push(`Placeholder ${hints.length + 1}: ${ctx.slice(0, 120)}${ctx.length > 120 ? "…" : ""}`);
      remaining =
        remaining.slice(0, marker.index) + "\0".repeat(marker.length) + remaining.slice(marker.index + marker.length);
      continue;
    }
    if (pickEmpty && empty) {
      hints.push(`Empty <img> ${hints.length + 1} (needs src)`);
      remaining = remaining.slice(0, empty.start) + "\0".repeat(empty.end - empty.start) + remaining.slice(empty.end);
      continue;
    }
    break;
  }
  return hints;
}

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

/** Replace the first remaining slot in document order (then markers vs empty img). */
export function replaceNextImageSlot(html: string, url: string): string {
  const esc = escapeAttr(url);
  const marker = findFirstMarkerMatch(html);
  const empty = findFirstEmptyImgBounds(html);

  const useMarker = marker && (!empty || marker.index < empty.start);
  const useEmpty = empty && (!marker || empty.start < marker.index);

  if (useMarker && marker) {
    return html.slice(0, marker.index) + esc + html.slice(marker.index + marker.length);
  }
  if (useEmpty && empty) {
    const segment = html.slice(empty.start, empty.end);
    const filled = replaceFirstEmptyImgSrc(segment, url);
    return html.slice(0, empty.start) + filled + html.slice(empty.end);
  }
  if (marker) {
    return html.slice(0, marker.index) + esc + html.slice(marker.index + marker.length);
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

export function replaceImageSlotAtIndex(html: string, slotIndex: number, url: string): string {
  if (slotIndex < 0) return html;
  let remaining = html;
  let current = 0;
  while (true) {
    const marker = findFirstMarkerMatch(remaining);
    const empty = findFirstEmptyImgBounds(remaining);
    const pickMarker = marker && (!empty || marker.index < empty.start);
    const pickEmpty = empty && (!marker || empty.start < marker.index);
    if (pickMarker && marker) {
      if (current === slotIndex) {
        const esc = escapeAttr(url);
        return html.slice(0, marker.index) + esc + html.slice(marker.index + marker.length);
      }
      remaining =
        remaining.slice(0, marker.index) + "\0".repeat(marker.length) + remaining.slice(marker.index + marker.length);
      current += 1;
      continue;
    }
    if (pickEmpty && empty) {
      if (current === slotIndex) {
        const segment = html.slice(empty.start, empty.end);
        const filled = replaceFirstEmptyImgSrc(segment, url);
        return html.slice(0, empty.start) + filled + html.slice(empty.end);
      }
      remaining = remaining.slice(0, empty.start) + "\0".repeat(empty.end - empty.start) + remaining.slice(empty.end);
      current += 1;
      continue;
    }
    break;
  }
  return html;
}
