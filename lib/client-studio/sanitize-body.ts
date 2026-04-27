import sanitizeHtml from "sanitize-html";

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
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    allowProtocolRelative: false,
    allowVulnerableTags: false,
    allowedIframeHostnames: ["www.youtube.com", "youtube.com", "www.youtube-nocookie.com", "player.vimeo.com"],
  });
}
