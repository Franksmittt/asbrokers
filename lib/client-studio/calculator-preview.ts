/**
 * Helpers that keep calculator iframes loading inside the Studio srcDoc preview
 * and recover calculator choices from already-saved draft HTML.
 */

const CALC_TOKEN = "[CALCULATOR_SLOT]";
const CALCULATOR_IFRAME_RE =
  /<iframe\b[^>]*\bsrc\s*=\s*(["'])([^"']*\/embed-calculators\/[^"']+)\1[^>]*>\s*<\/iframe>/gi;

function calculatorIdFromSrc(src: string): string | null {
  try {
    const pathname = src.startsWith("http") ? new URL(src).pathname : src;
    const file = pathname.split("/").pop()?.trim() ?? "";
    if (!file.toLowerCase().endsWith(".html")) return null;
    return file.slice(0, -".html".length) || null;
  } catch {
    return null;
  }
}

/** Turn saved calculator iframes back into selectable Studio slots. */
export function recoverCalculatorSlotsFromHtml(html: string): {
  html: string;
  calcSelection: Record<number, string>;
} {
  const calcSelection: Record<number, string> = {};
  let index = 0;
  const next = html.replace(CALCULATOR_IFRAME_RE, (_full, _quote: string, src: string) => {
    const id = calculatorIdFromSrc(src);
    if (!id) return _full;
    calcSelection[index] = id;
    index += 1;
    return CALC_TOKEN;
  });
  return { html: next, calcSelection };
}

/**
 * Make calculator embeds reliable inside about:srcdoc previews:
 * absolute same-origin URLs + eager load + resize marker.
 */
export function hardenCalculatorIframesForPreview(html: string, origin: string): string {
  const base = origin.replace(/\/$/, "");
  return html.replace(CALCULATOR_IFRAME_RE, (full, quote: string, src: string) => {
    const absoluteSrc = src.startsWith("http")
      ? src
      : `${base}${src.startsWith("/") ? src : `/${src}`}`;
    let next = full.replace(`src=${quote}${src}${quote}`, `src=${quote}${absoluteSrc}${quote}`);
    if (/\bloading\s*=/.test(next)) {
      next = next.replace(/\bloading\s*=\s*(["'])[^"']*\1/i, 'loading="eager"');
    } else {
      next = next.replace(/<iframe\b/i, '<iframe loading="eager"');
    }
    if (!/\bdata-asb-calculator-embed\s*=/.test(next)) {
      next = next.replace(/<iframe\b/i, '<iframe data-asb-calculator-embed="true"');
    }
    if (/\bstyle\s*=/.test(next)) {
      next = next.replace(/\bstyle\s*=\s*(["'])([\s\S]*?)\1/i, (_m, styleQuote: string, styleValue: string) => {
        let style = styleValue;
        if (!/min-height\s*:/i.test(style)) style += ";min-height:640px";
        if (!/(^|;)\s*height\s*:/i.test(style)) style += ";height:640px";
        return `style=${styleQuote}${style}${styleQuote}`;
      });
    } else {
      next = next.replace(
        /<iframe\b/i,
        '<iframe style="display:block;width:100%;height:640px;min-height:640px;border:0;border-radius:12px;background:#0a0a0c;"'
      );
    }
    return next;
  });
}
