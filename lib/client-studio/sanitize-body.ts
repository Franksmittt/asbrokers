import sanitizeHtml from "sanitize-html";
import { getSiteOrigin } from "@/lib/site-url";

const EXTERNAL_IFRAME_HOSTNAMES = [
  "www.youtube.com",
  "youtube.com",
  "www.youtube-nocookie.com",
  "player.vimeo.com",
] as const;

const CALCULATOR_EMBED_PREFIXES = ["/embed-calculators/"] as const;

function siteIframeHostnames(): string[] {
  const hosts: string[] = [...EXTERNAL_IFRAME_HOSTNAMES];
  try {
    const hostname = new URL(getSiteOrigin()).hostname;
    if (hostname && !hosts.includes(hostname)) hosts.push(hostname);
  } catch {
    /* keep external hosts only */
  }
  if (process.env.NODE_ENV !== "production") {
    for (const host of ["localhost", "127.0.0.1"]) {
      if (!hosts.includes(host)) hosts.push(host);
    }
  }
  return hosts;
}

function isCalculatorEmbedPath(pathname: string): boolean {
  return CALCULATOR_EMBED_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

function isAllowedCalculatorIframeSrc(src: string): boolean {
  if (CALCULATOR_EMBED_PREFIXES.some((prefix) => src.startsWith(prefix))) return true;
  try {
    const { hostname, pathname } = new URL(src, getSiteOrigin());
    return siteIframeHostnames().includes(hostname) && isCalculatorEmbedPath(pathname);
  } catch {
    return false;
  }
}

/**
 * Strips scripts/event handlers while keeping typical article HTML.
 * Applied when saving a published version; public pages use stored output.
 */
export function sanitizeInsightBody(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat([
      "section",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "img",
      "figure",
      "figcaption",
      "hr",
      "table",
      "thead",
      "tbody",
      "tfoot",
      "tr",
      "th",
      "td",
      "colgroup",
      "col",
      "iframe",
      "script",
      "form",
      "label",
      "input",
      "textarea",
      "button",
      "select",
      "option",
    ]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      "*": ["class", "style", "id"],
      img: ["src", "srcset", "alt", "title", "width", "height", "loading", "class"],
      table: ["class"],
      th: ["colspan", "rowspan", "class"],
      td: ["colspan", "rowspan", "class"],
      a: ["href", "name", "target", "rel", "class"],
      iframe: [
        "src",
        "title",
        "width",
        "height",
        "allow",
        "allowfullscreen",
        "loading",
        "referrerpolicy",
        "frameborder",
      ],
      script: ["src", "type", "async", "defer", "crossorigin", "integrity", "referrerpolicy", "id", "class"],
      form: ["action", "method", "class", "id", "name", "autocomplete", "novalidate"],
      label: ["for", "class", "id"],
      input: [
        "type",
        "id",
        "name",
        "value",
        "min",
        "max",
        "step",
        "placeholder",
        "required",
        "readonly",
        "disabled",
        "checked",
        "autocomplete",
        "inputmode",
        "class",
        "style",
      ],
      textarea: ["id", "name", "rows", "cols", "placeholder", "required", "readonly", "disabled", "class", "style"],
      button: ["type", "disabled", "class", "style"],
      select: ["id", "name", "required", "disabled", "class", "style"],
      option: ["value", "selected", "disabled", "class", "style"],
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    allowProtocolRelative: false,
    allowVulnerableTags: true,
    allowedIframeHostnames: siteIframeHostnames(),
    // Calculator embeds use same-origin paths like /embed/calculators/future-value.
    allowIframeRelativeUrls: true,
    transformTags: {
      iframe: (tagName, attribs) => {
        const src = attribs.src;
        if (typeof src === "string" && src.startsWith("/") && !isAllowedCalculatorIframeSrc(src)) {
          delete attribs.src;
        }
        return { tagName, attribs };
      },
    },
  });
}
