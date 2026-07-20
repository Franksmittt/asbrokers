import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/site-url";
import { normalizePath } from "@/lib/seo";
import { OG_STATIC_FALLBACK } from "@/lib/og-fonts";

export const META_DESCRIPTION_IDEAL = 160;
export const META_DESCRIPTION_MIN = 120;
export const BRAND_NAME = "AS Brokers CC";

/** Strip HTML tags and collapse whitespace (HtmlRAG-lite). */
export function stripHtml(input: string): string {
  return input
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Remove common nav/footer boilerplate from scraped HTML strings.
 * Do NOT strip FSP 17273, that is a trust token for meta/OG and entity copy.
 */
export function pruneHtmlRagLite(input: string): string {
  let text = stripHtml(input);
  const boilerplate = [
    /skip to main content/gi,
    /all rights reserved/gi,
    /whatsapp \+27/gi,
    /book (a )?private (actuarial )?consultation/gi,
  ];
  for (const pattern of boilerplate) {
    text = text.replace(pattern, " ");
  }
  return text.replace(/\s+/g, " ").trim();
}

/** Clamp meta description, ideal 150–160 chars; hard max ~300 tokens (~1200 chars). */
export function clampMetaDescription(
  raw: string,
  options: { ideal?: number; max?: number; min?: number } = {}
): string {
  const ideal = options.ideal ?? META_DESCRIPTION_IDEAL;
  const max = options.max ?? 1200;
  const min = options.min ?? META_DESCRIPTION_MIN;
  // Intentional meta copy: strip tags only, never run nav/footer boilerplate pruning
  // (that path previously erased "FSP 17273" from every SERP/OG description).
  const text = stripHtml(raw).replace(/\s+/g, " ").trim();
  if (!text) return "";
  if (text.length <= ideal) return text;
  const slice = text.slice(0, ideal);
  const lastSpace = slice.lastIndexOf(" ");
  const trimmed = (lastSpace > min ? slice.slice(0, lastSpace) : slice).trim();
  return trimmed.endsWith(".") ? trimmed : `${trimmed}.`;
}

export function buildPageTitle(entityTitle: string, includeBrand = true): string {
  const clean = entityTitle.replace(/\s*\|\s*AS Brokers.*$/i, "").trim();
  if (!includeBrand) return clean;
  if (/as brokers/i.test(clean)) return clean;
  return `${clean} | ${BRAND_NAME}`;
}

/** Absolute dynamic OG URL, passes HtmlRAG title/description into Satori template (Phase 6.5). */
export function buildDynamicOgImageUrl(title: string, description: string): string {
  const params = new URLSearchParams({
    title: title.replace(/\s*\|\s*AS Brokers CC$/i, "").trim() || BRAND_NAME,
    description: clampMetaDescription(description, { ideal: 120 }),
  });
  return absoluteUrl(`/api/og?${params.toString()}`);
}

function buildOgImageSet(title: string, description: string) {
  const dynamic = buildDynamicOgImageUrl(title, description);
  const fallback = absoluteUrl(OG_STATIC_FALLBACK);
  return {
    openGraph: [
      { url: dynamic, width: 1200, height: 630, alt: title },
      { url: fallback, width: 1200, height: 630, alt: BRAND_NAME },
    ] as const,
    twitter: [dynamic] as const,
  };
}

export type BuildPageMetadataInput = {
  path: string;
  title: string;
  description: string;
  /** Prefer structured excerpt over HTML when available. */
  excerpt?: string | null;
  ogImagePath?: string;
  noIndex?: boolean;
  keywords?: string[];
};

/** Robots directive for CRM, portal, studio, auth, internal, and dynamic report routes. */
export const PRIVATE_ROUTE_ROBOTS: NonNullable<Metadata["robots"]> = {
  index: false,
  follow: false,
};

export function privateRouteMetadata(title: string, description?: string): Metadata {
  return {
    title,
    description: description ?? title,
    robots: PRIVATE_ROUTE_ROBOTS,
  };
}

/** Programmatic Metadata with canonical, Open Graph, and Twitter (Phase 5.1). */
export function buildPageMetadata(input: BuildPageMetadataInput): Metadata {
  const path = normalizePath(input.path);
  const canonical = absoluteUrl(path);
  const descriptionSource = input.excerpt ?? input.description;
  const description = clampMetaDescription(descriptionSource);
  // Root layout template appends "| AS Brokers CC" to document titles, keep entity title brand-free.
  const title = buildPageTitle(input.title, false);
  const brandedTitle = buildPageTitle(title, true);
  const ogImages = input.ogImagePath
    ? {
        openGraph: [
          { url: absoluteUrl(input.ogImagePath), width: 1200, height: 630, alt: brandedTitle },
        ] as const,
        twitter: [absoluteUrl(input.ogImagePath)] as const,
      }
    : buildOgImageSet(brandedTitle, description);

  return {
    title,
    description,
    keywords: input.keywords,
    alternates: { canonical },
    robots: input.noIndex ? PRIVATE_ROUTE_ROBOTS : undefined,
    openGraph: {
      type: "website",
      locale: "en_ZA",
      url: canonical,
      siteName: BRAND_NAME,
      title: brandedTitle,
      description,
      images: [...ogImages.openGraph],
    },
    twitter: {
      card: "summary_large_image",
      title: brandedTitle,
      description,
      images: [...ogImages.twitter],
    },
  };
}

export function buildArticleMetadata(input: {
  path: string;
  title: string;
  excerpt?: string | null;
  description?: string | null;
  noIndex?: boolean;
  canonicalOverride?: string;
}): Metadata {
  const path = normalizePath(input.path);
  const canonical = input.canonicalOverride ?? absoluteUrl(path);
  const description = clampMetaDescription(input.excerpt ?? input.description ?? input.title);
  const title = buildPageTitle(input.title);
  const ogImages = buildOgImageSet(title, description);

  return {
    title,
    description,
    alternates: { canonical },
    robots: input.noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "article",
      locale: "en_ZA",
      url: canonical,
      siteName: BRAND_NAME,
      title,
      description,
      images: [...ogImages.openGraph],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [...ogImages.twitter],
    },
  };
}

/** Default OG image URL for JSON-LD and legacy references. */
export function defaultOgImageUrl(title?: string, description?: string): string {
  if (title && description) return buildDynamicOgImageUrl(title, description);
  return absoluteUrl("/opengraph-image");
}
