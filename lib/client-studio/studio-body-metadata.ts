export type StudioBodyMetadata = {
  rawHtml?: string;
  imageUrls?: Record<string, string>;
  calcSelection?: Record<string, string>;
  videoUrls?: Record<string, string>;
};

const STUDIO_BODY_META_OPEN = /<!--\s*studio_meta:/i;
const STUDIO_BODY_META_CLOSE = "-->";

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

/**
 * Find the studio metadata comment by comment delimiters, not by the first `}`.
 * Draft HTML often stores CSS/`rawHtml` inside the JSON payload, so a non-greedy
 * `\{...\}` regex truncates mid-string and drops calculator selections on reload.
 */
function findStudioBodyMetadataMarker(
  html: string
): { fullMatch: string; json: string; start: number; end: number } | null {
  const open = html.match(STUDIO_BODY_META_OPEN);
  if (!open || open.index == null) return null;
  const jsonStart = open.index + open[0].length;
  const closeIndex = html.indexOf(STUDIO_BODY_META_CLOSE, jsonStart);
  if (closeIndex < 0) return null;
  return {
    fullMatch: html.slice(open.index, closeIndex + STUDIO_BODY_META_CLOSE.length),
    json: html.slice(jsonStart, closeIndex).trim(),
    start: open.index,
    end: closeIndex + STUDIO_BODY_META_CLOSE.length,
  };
}

export function extractStudioBodyMetadata(
  html: string | null | undefined
): { cleanHtml: string; metadata: StudioBodyMetadata | null } {
  if (!html) return { cleanHtml: "", metadata: null };
  const marker = findStudioBodyMetadataMarker(html);
  if (!marker) return { cleanHtml: html, metadata: null };
  const metadata = parseStudioBodyMetadata(marker.json);
  return {
    cleanHtml: `${html.slice(0, marker.start)}${html.slice(marker.end)}`.trimEnd(),
    metadata,
  };
}

export function withEmbeddedStudioBodyMetadata(
  html: string,
  metadata: StudioBodyMetadata | null
): string {
  const clean = extractStudioBodyMetadata(html).cleanHtml;
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
