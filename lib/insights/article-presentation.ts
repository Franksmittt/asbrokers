/**
 * Presentation-only adjustments for published insight HTML.
 * Wording and image sources stay as authored. Classes mark the title and
 * cover figure that the page masthead already shows, so they are not repeated.
 */

export function normalizeInsightText(value: string): string {
  return value
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&#38;/gi, "&")
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&quot;/gi, '"')
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

export function imageIdentity(src: string): string {
  const decoded = src.replace(/&amp;/gi, "&").replace(/&#38;/gi, "&").trim();
  try {
    const url = new URL(decoded, "https://www.asbrokers.co.za");
    const path = url.searchParams.get("path");
    if (path) return `studio:${decodeURIComponent(path)}`;
    return `${url.pathname}${url.search}`;
  } catch {
    return decoded;
  }
}

function addClassToTag(tag: string, className: string): string {
  if (/\bclass\s*=\s*["']/i.test(tag)) {
    return tag.replace(/\bclass\s*=\s*(["'])([\s\S]*?)\1/i, (_, quote: string, value: string) => {
      const parts = value.split(/\s+/).filter(Boolean);
      if (parts.includes(className)) return `class=${quote}${value}${quote}`;
      return `class=${quote}${value} ${className}${quote}`;
    });
  }
  return tag.replace(/^<(\w+)/i, `<$1 class="${className}"`);
}

function markRepeatedTitle(html: string, title: string): string {
  const expected = normalizeInsightText(title);
  if (!expected) return html;
  const match = /<h([12])\b([^>]*)>([\s\S]*?)<\/h\1>/i.exec(html);
  if (!match) return html;
  if (normalizeInsightText(match[3] ?? "") !== expected) return html;
  const open = `<h${match[1]}${match[2] ?? ""}>`;
  const next = addClassToTag(open, "insight-repeat-title");
  return html.slice(0, match.index) + next + html.slice(match.index + open.length);
}

function markRepeatedCover(html: string, coverSrc: string | null | undefined): string {
  if (!coverSrc) return html;
  const coverKey = imageIdentity(coverSrc);
  const match = /<img\b[^>]*>/i.exec(html);
  if (!match) return html;
  const srcMatch = /\bsrc\s*=\s*(["'])([\s\S]*?)\1/i.exec(match[0]);
  if (!srcMatch?.[2] || imageIdentity(srcMatch[2]) !== coverKey) return html;

  const imgStart = match.index;
  const before = html.slice(0, imgStart);
  const figureOpen = before.lastIndexOf("<figure");
  const figureClose = before.lastIndexOf("</figure");
  if (figureOpen !== -1 && figureOpen > figureClose) {
    const figureTagEnd = html.indexOf(">", figureOpen);
    if (figureTagEnd !== -1) {
      const figureTag = html.slice(figureOpen, figureTagEnd + 1);
      const nextTag = addClassToTag(figureTag, "insight-repeat-cover");
      return html.slice(0, figureOpen) + nextTag + html.slice(figureTagEnd + 1);
    }
  }

  const nextImg = addClassToTag(match[0], "insight-repeat-cover");
  return html.slice(0, imgStart) + nextImg + html.slice(imgStart + match[0].length);
}

export function presentInsightArticleHtml(
  html: string,
  options: { title: string; coverSrc?: string | null }
): string {
  return markRepeatedCover(markRepeatedTitle(html, options.title), options.coverSrc);
}
