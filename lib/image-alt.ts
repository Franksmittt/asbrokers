/**
 * Build-time alt text dictionary lookup (Phase 7.3).
 * Reads data/image-metadata.json — zero runtime API calls.
 */
import dictionary from "@/data/image-metadata.json";

export const ALT_TEXT_MAX = 125;

const GENERIC_ALT = new Set([
  "image",
  "photo",
  "picture",
  "thumbnail",
  "img",
  "banner",
  "hero",
  "logo",
  "icon",
]);

type DictionaryEntry = { alt: string; hash?: string | null };
type ImageMetadataDictionary = {
  version: number;
  updatedAt?: string;
  entries: Record<string, DictionaryEntry>;
};

const catalog = dictionary as ImageMetadataDictionary;

/** Normalize public image paths for dictionary lookup. */
export function normalizeImagePath(path: string): string {
  if (!path) return "/images/unknown";
  if (path.startsWith("http://") || path.startsWith("https://")) {
    try {
      return decodeURIComponent(new URL(path).pathname);
    } catch {
      return path;
    }
  }
  const withLeading = path.startsWith("/") ? path : `/images/${path.replace(/^images\//, "")}`;
  return decodeURIComponent(withLeading);
}

export function isGenericAlt(alt: string): boolean {
  const trimmed = alt.trim();
  if (!trimmed) return true;
  const lower = trimmed.toLowerCase();
  if (GENERIC_ALT.has(lower)) return true;
  if (/\.(jpe?g|png|webp|avif|gif)$/i.test(lower)) return true;
  if (/^(image|photo|picture)\s+(of|for)\b/i.test(lower)) return true;
  return false;
}

export function clampAlt(text: string, max = ALT_TEXT_MAX): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const slice = clean.slice(0, max);
  const lastSpace = slice.lastIndexOf(" ");
  return `${(lastSpace > 40 ? slice.slice(0, lastSpace) : slice).trim()}…`;
}

function defaultAltFromPath(path: string): string {
  const filename = path.split("/").pop()?.replace(/\.[^.]+$/, "") ?? "Site visual";
  const words = filename
    .replace(/[_()]+/g, " ")
    .replace(/-/g, " ")
    .replace(/\b\d+x\d+\b/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  return clampAlt(`${words || "AS Brokers financial planning visual"} — AS Brokers CC`);
}

/** Descriptive alt for screen readers and answer engines. Dictionary first, then context, then path fallback. */
export function getAlt(path: string, contextAlt?: string): string {
  const key = normalizeImagePath(path);
  const fromDictionary = catalog.entries[key]?.alt;
  if (fromDictionary && !isGenericAlt(fromDictionary)) return clampAlt(fromDictionary);
  if (contextAlt && !isGenericAlt(contextAlt)) return clampAlt(contextAlt);
  return defaultAltFromPath(key);
}

/** Paths flagged decorative in the dictionary (empty alt + aria-hidden on wrapper). */
export function isDecorativeImage(path: string): boolean {
  const key = normalizeImagePath(path);
  const entry = catalog.entries[key];
  return entry?.alt === "";
}

export function getDictionaryEntry(path: string): DictionaryEntry | undefined {
  return catalog.entries[normalizeImagePath(path)];
}

/** Schema.org width/height for primary ImageObject nodes (Phase 7.5). */
export function getImageSchemaDimensions(path: string): { width: number; height: number } {
  const key = normalizeImagePath(path);
  if (key.includes("/opengraph-image") || key.includes("/api/og")) {
    return { width: 1200, height: 630 };
  }
  const filename = key.split("/").pop() ?? "";
  if (/16x9/i.test(filename)) return { width: 1200, height: 675 };
  if (/4x3/i.test(filename)) return { width: 1200, height: 900 };
  if (/1x1/i.test(filename)) return { width: 800, height: 800 };
  if (/16x10/i.test(filename)) return { width: 1200, height: 750 };
  return { width: 1200, height: 630 };
}
