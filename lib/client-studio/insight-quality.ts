/**
 * Insights quality constitution (Phase 1): ban dark/night HTML, enforce warm canvas tokens.
 * Full Markdown-only authoring lands in a later phase; this gates and rewrites freeform HTML.
 */

/** Dark backgrounds only — brand ink (#1D1D1F) is allowed for text. */
const DARK_BACKGROUND_STYLE =
  /background(?:-color)?\s*:\s*(?:#0[0-9a-f]{2,5}|#1[0-2][0-9a-f]{2,4}|#050506|#0a0a0a|#121212|rgb\(\s*0\s*,\s*0\s*,\s*0|rgba\(\s*0\s*,\s*0\s*,\s*0)/i;

const LIGHT_ON_DARK_TEXT_STYLE =
  /(?:^|;)\s*color\s*:\s*(?:#fff(?:fff)?|white|#fafafa|#f4f4f5|#e4e4e7|#d4d4d8|#a1a1aa|#99f6e4)\b/i;

const DARK_CLASS_TOKENS = [
  "bg-black",
  "bg-zinc-900",
  "bg-zinc-950",
  "bg-neutral-900",
  "bg-neutral-950",
  "bg-gray-900",
  "bg-gray-950",
  "bg-slate-900",
  "bg-slate-950",
  "bg-[#050506]",
  "bg-[#0a0a0a]",
  "bg-[#0f0f0f]",
  "bg-[#111111]",
  "bg-[#121212]",
  "bg-[#1d1d1f]",
  "bg-white/5",
  "bg-black/",
  "from-black",
  "to-black",
  "via-black",
  "prose-invert",
  "dark:",
  "text-white",
  "text-zinc-100",
  "text-zinc-200",
  "text-zinc-300",
  "border-white/10",
  "ring-white/10",
  "shadow-black",
] as const;

export type InsightQualityIssue = {
  code: string;
  message: string;
};

function lower(html: string): string {
  return html.toLowerCase();
}

export function findInsightQualityIssues(html: string): InsightQualityIssue[] {
  const issues: InsightQualityIssue[] = [];
  const hay = lower(html);

  if (!html.trim()) {
    issues.push({ code: "empty", message: "Article body is empty." });
    return issues;
  }

  for (const token of DARK_CLASS_TOKENS) {
    if (hay.includes(token.toLowerCase())) {
      issues.push({
        code: "dark-class",
        message: `Dark or night-mode class detected (${token}). Insights must use the warm paper canvas.`,
      });
      break;
    }
  }

  if (DARK_BACKGROUND_STYLE.test(html) || LIGHT_ON_DARK_TEXT_STYLE.test(html)) {
    issues.push({
      code: "dark-style",
      message: "Inline styles use dark backgrounds or light-on-dark text. Strip or rewrite before publishing.",
    });
  }

  if (/color-scheme\s*:\s*dark/i.test(html) || /class=["'][^"']*\bdark\b/i.test(html)) {
    issues.push({
      code: "dark-scheme",
      message: "Dark color-scheme or .dark wrappers are banned on Insights.",
    });
  }

  return issues;
}

/** Rewrite common AI dark-mode tokens to warm Paper & Ink equivalents. */
export function enforceWarmInsightHtml(html: string): string {
  let out = html;

  const classMap: Array<[RegExp, string]> = [
    [/\bbg-black(?:\/\d+)?\b/g, "bg-white"],
    [/\bbg-zinc-(?:8|9)00\b/g, "bg-white"],
    [/\bbg-zinc-950\b/g, "bg-white"],
    [/\bbg-neutral-(?:8|9)00\b/g, "bg-white"],
    [/\bbg-neutral-950\b/g, "bg-white"],
    [/\bbg-gray-(?:8|9)00\b/g, "bg-white"],
    [/\bbg-gray-950\b/g, "bg-white"],
    [/\bbg-slate-(?:8|9)00\b/g, "bg-white"],
    [/\bbg-slate-950\b/g, "bg-white"],
    [/\bbg-white\/5\b/g, "bg-white"],
    [/\bbg-white\/10\b/g, "bg-white"],
    [/\bfrom-black\b/g, "from-[#F7F6F3]"],
    [/\bto-black\b/g, "to-white"],
    [/\bvia-black\b/g, "via-[#F7F6F3]"],
    [/\bprose-invert\b/g, "prose-stone"],
    [/\bdark:[^\s"']+/g, ""],
    [/\btext-white\b/g, "text-[#1D1D1F]"],
    [/\btext-zinc-50\b/g, "text-[#1D1D1F]"],
    [/\btext-zinc-100\b/g, "text-[#1D1D1F]"],
    [/\btext-zinc-200\b/g, "text-[#2B2B2E]"],
    [/\btext-zinc-300\b/g, "text-[#52525b]"],
    [/\btext-zinc-400\b/g, "text-[#71717a]"],
    [/\btext-teal-200\b/g, "text-[#006B6B]"],
    [/\btext-emerald-300\b/g, "text-[#0F766E]"],
    [/\bborder-white\/10\b/g, "border-[#E5E5E5]"],
    [/\bborder-white\/20\b/g, "border-[#E5E5E5]"],
    [/\bring-white\/10\b/g, "ring-[#E5E5E5]"],
    [/\btext-\[#3ecf8e\](?:\/\d+)?\b/g, "text-[#006B6B]"],
  ];

  for (const [re, replacement] of classMap) {
    out = out.replace(re, replacement);
  }

  out = out.replace(/\sstyle=(["'])([\s\S]*?)\1/gi, (_full, quote: string, styleRaw: string) => {
    let style = styleRaw;
    style = style
      .replace(/background(?:-color)?\s*:\s*#0[0-9a-f]{2,5}\b/gi, "background:#ffffff")
      .replace(/background(?:-color)?\s*:\s*#1[0-9a-f]{2,5}\b/gi, "background:#ffffff")
      .replace(/background(?:-color)?\s*:\s*#050506\b/gi, "background:#F7F6F3")
      .replace(/background(?:-color)?\s*:\s*rgba?\(\s*0\s*,\s*0\s*,\s*0[^)]*\)/gi, "background:#ffffff")
      .replace(/color\s*:\s*#fff(?:fff)?\b/gi, "color:#1D1D1F")
      .replace(/color\s*:\s*white\b/gi, "color:#1D1D1F")
      .replace(/color\s*:\s*#fafafa\b/gi, "color:#1D1D1F")
      .replace(/color\s*:\s*#f4f4f5\b/gi, "color:#2B2B2E")
      .replace(/color\s*:\s*#e4e4e7\b/gi, "color:#52525b")
      .replace(/color\s*:\s*#d4d4d8\b/gi, "color:#52525b")
      .replace(/color\s*:\s*#a1a1aa\b/gi, "color:#71717a")
      .replace(/color\s*:\s*#99f6e4\b/gi, "color:#006B6B")
      .replace(/color\s*:\s*#5eead4\b/gi, "color:#006B6B")
      .replace(/color\s*:\s*#3ecf8e\b/gi, "color:#006B6B")
      .replace(/border(?:-color)?\s*:\s*rgba\(\s*255\s*,\s*255\s*,\s*255[^)]*\)/gi, "border-color:#E5E5E5")
      .replace(/color-scheme\s*:\s*dark/gi, "color-scheme:light");

    if (!style.trim()) return "";
    return ` style=${quote}${style}${quote}`;
  });

  out = out.replace(/\sclass=(["'])\s*\1/gi, "");
  return out;
}

export function prepareInsightHtmlForPublish(html: string): {
  html: string;
  issues: InsightQualityIssue[];
} {
  const warmed = enforceWarmInsightHtml(html);
  const issues = findInsightQualityIssues(warmed);
  return { html: warmed, issues };
}

export function insightQualityGateMessage(issues: InsightQualityIssue[]): string | null {
  if (issues.length === 0) return null;
  const first = issues[0]!;
  const extra = issues.length > 1 ? ` (+${issues.length - 1} more)` : "";
  return `${first.message}${extra} Fix the HTML or paste warm Paper & Ink markup, then publish again.`;
}
