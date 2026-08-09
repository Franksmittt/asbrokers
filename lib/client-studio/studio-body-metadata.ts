export type StudioBodyMetadata = {
  rawHtml?: string;
  imageUrls?: Record<string, string>;
  calcSelection?: Record<string, string>;
  videoUrls?: Record<string, string>;
};

const STUDIO_BODY_META_RE = /<!--\s*studio_meta:(\{[\s\S]*?\})\s*-->/i;

function asStringMap(value: unknown): Record<string, string> {
  if (!value || typeof value !== "object") return {};
  const out: Record<string, string> = {};
  for (const [key, entry] of Object.entries(value as Record<string, unknown>)) {
    if (typeof entry !== "string") continue;
    if (!entry.trim()) continue;
    out[key] = entry;
  }
  return out;
}

function parseStudioBodyMetadata(json: string): StudioBodyMetadata | null {
  try {
    const parsed = JSON.parse(json) as unknown;
    if (!parsed || typeof parsed !== "object") return null;
    const source = parsed as Record<string, unknown>;
    return {
      rawHtml: typeof source.rawHtml === "string" ? source.rawHtml : undefined,
      imageUrls: asStringMap(source.imageUrls),
      calcSelection: asStringMap(source.calcSelection),
      videoUrls: asStringMap(source.videoUrls),
    };
  } catch {
    return null;
  }
}

export function extractStudioBodyMetadata(
  html: string | null | undefined
): { cleanHtml: string; metadata: StudioBodyMetadata | null } {
  if (!html) return { cleanHtml: "", metadata: null };
  const match = html.match(STUDIO_BODY_META_RE);
  if (!match?.[1]) return { cleanHtml: html, metadata: null };
  const metadata = parseStudioBodyMetadata(match[1]);
  return {
    cleanHtml: html.replace(STUDIO_BODY_META_RE, "").trimEnd(),
    metadata,
  };
}

export function withEmbeddedStudioBodyMetadata(
  html: string,
  metadata: StudioBodyMetadata | null
): string {
  const clean = html.replace(STUDIO_BODY_META_RE, "").trimEnd();
  if (!metadata) return clean;
  const hasAnyData =
    Boolean(metadata.rawHtml?.trim()) ||
    Object.keys(metadata.imageUrls ?? {}).length > 0 ||
    Object.keys(metadata.calcSelection ?? {}).length > 0 ||
    Object.keys(metadata.videoUrls ?? {}).length > 0;
  if (!hasAnyData) return clean;
  const marker = `<!--studio_meta:${JSON.stringify(metadata)}-->`;
  return `${clean}\n${marker}`;
}

const INVALID_IMAGE_SRC_TOKENS = [
  "YOUR_IMAGE_URL_HERE",
  "{{IMAGE_URL}}",
  "REPLACE_WITH_IMAGE_URL",
  "YOUR_IMAGE_URL",
];

function decodeHtmlEntities(value: string): string {
  return value
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">");
}

export function firstImageSrcFromHtml(html: string | null | undefined): string | null {
  if (!html) return null;
  const { cleanHtml } = extractStudioBodyMetadata(html);
  const imgTagRegex = /<img\b[^>]*>/gi;

  for (const match of cleanHtml.matchAll(imgTagRegex)) {
    const tag = match[0];
    const srcMatch = tag.match(/\bsrc\s*=\s*["']([^"']*)["']/i) ?? tag.match(/\bsrc\s*=\s*([^\s>]+)/i);
    const src = decodeHtmlEntities((srcMatch?.[1] ?? "").trim());
    if (!src) continue;
    if (src === "#") continue;
    if (src.toLowerCase().startsWith("javascript:")) continue;
    if (src.startsWith("blob:")) continue;
    if (INVALID_IMAGE_SRC_TOKENS.some((token) => src.includes(token))) continue;
    return src;
  }
  return null;
}
