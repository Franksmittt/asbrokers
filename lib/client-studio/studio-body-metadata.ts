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

export function firstImageSrcFromHtml(html: string | null | undefined): string | null {
  if (!html) return null;
  const { cleanHtml } = extractStudioBodyMetadata(html);
  const match = cleanHtml.match(/<img\b[^>]*\bsrc\s*=\s*["']([^"']+)["'][^>]*>/i);
  const src = match?.[1]?.trim();
  return src || null;
}
