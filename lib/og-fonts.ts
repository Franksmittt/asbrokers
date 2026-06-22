export const OG_CACHE_CONTROL = "public, max-age=3600, stale-while-revalidate=86400";
export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = "image/png";
export const OG_STATIC_FALLBACK = "/images/og-default.jpg";

const FONT_MODULE_URL = new URL("./fonts/Inter-Bold.woff", import.meta.url);

export type OgFont = {
  name: string;
  data: ArrayBuffer;
  weight: 700;
  style: "normal";
};

/** Module-scope font cache — single ArrayBuffer per edge isolate (Phase 6.2). */
let cachedFont: ArrayBuffer | null = null;
let fontPromise: Promise<ArrayBuffer> | null = null;

export function loadOgFontData(): Promise<ArrayBuffer> {
  if (cachedFont) return Promise.resolve(cachedFont);
  if (!fontPromise) {
    fontPromise = fetch(FONT_MODULE_URL).then(async (res) => {
      if (!res.ok) throw new Error(`Failed to load OG font (${res.status})`);
      cachedFont = await res.arrayBuffer();
      return cachedFont;
    });
  }
  return fontPromise;
}

export async function getOgFonts(): Promise<OgFont[]> {
  const data = await loadOgFontData();
  return [{ name: "Inter", data, weight: 700, style: "normal" }];
}

export function truncateOgText(text: string, max: number): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const slice = clean.slice(0, max);
  const lastSpace = slice.lastIndexOf(" ");
  return `${(lastSpace > 40 ? slice.slice(0, lastSpace) : slice).trim()}…`;
}
