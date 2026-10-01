/**
 * Minimal Markdown → warm Insights HTML for Phase 1.
 * Authors paste prose (headings, lists, quotes); presentation stays locked to Paper & Ink.
 */

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function inlineMarkdown(text: string): string {
  let out = escapeHtml(text);
  out = out.replace(/`([^`]+)`/g, "<code>$1</code>");
  out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  out = out.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  out = out.replace(
    /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g,
    '<a href="$2" rel="noopener noreferrer">$1</a>'
  );
  return out;
}

/** True when the paste looks like Markdown/prose rather than an HTML document fragment. */
export function looksLikeMarkdownSource(source: string): boolean {
  const trimmed = source.trim();
  if (!trimmed) return false;
  if (/<(?:section|article|div|p|h[1-6]|ul|ol|table|figure)\b/i.test(trimmed)) return false;
  return (
    /^#{1,4}\s+\S/m.test(trimmed) ||
    /^[-*]\s+\S/m.test(trimmed) ||
    /^\d+\.\s+\S/m.test(trimmed) ||
    /^>\s+\S/m.test(trimmed) ||
    (!/</.test(trimmed) && trimmed.includes("\n"))
  );
}

export function markdownToWarmInsightHtml(markdown: string): string {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const blocks: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i] ?? "";
    if (!line.trim()) {
      i += 1;
      continue;
    }

    const heading = /^(#{1,4})\s+(.+)$/.exec(line);
    if (heading) {
      const level = heading[1]!.length;
      blocks.push(`<h${level}>${inlineMarkdown(heading[2]!.trim())}</h${level}>`);
      i += 1;
      continue;
    }

    if (/^>\s?/.test(line)) {
      const quoteLines: string[] = [];
      while (i < lines.length && /^>\s?/.test(lines[i] ?? "")) {
        quoteLines.push((lines[i] ?? "").replace(/^>\s?/, ""));
        i += 1;
      }
      blocks.push(
        `<blockquote><p>${inlineMarkdown(quoteLines.join(" "))}</p></blockquote>`
      );
      continue;
    }

    if (/^[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i] ?? "")) {
        items.push(`<li>${inlineMarkdown((lines[i] ?? "").replace(/^[-*]\s+/, ""))}</li>`);
        i += 1;
      }
      blocks.push(`<ul>${items.join("")}</ul>`);
      continue;
    }

    if (/^\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i] ?? "")) {
        items.push(`<li>${inlineMarkdown((lines[i] ?? "").replace(/^\d+\.\s+/, ""))}</li>`);
        i += 1;
      }
      blocks.push(`<ol>${items.join("")}</ol>`);
      continue;
    }

    if (/^---+$/.test(line.trim())) {
      blocks.push("<hr />");
      i += 1;
      continue;
    }

    const para: string[] = [line];
    i += 1;
    while (i < lines.length && (lines[i] ?? "").trim() && !/^(#{1,4}\s|[-*]\s|\d+\.\s|>\s?|---+$)/.test(lines[i] ?? "")) {
      para.push(lines[i] ?? "");
      i += 1;
    }
    blocks.push(`<p>${inlineMarkdown(para.join(" "))}</p>`);
  }

  return [
    '<section data-asb-insight="markdown">',
    ...blocks,
    "</section>",
  ].join("\n");
}

export function normalizeStudioBodyInput(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return "";
  if (looksLikeMarkdownSource(trimmed)) {
    return markdownToWarmInsightHtml(trimmed);
  }
  return trimmed;
}
