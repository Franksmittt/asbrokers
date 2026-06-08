import "server-only";

import { listPublishedStudioPosts } from "@/lib/client-studio/posts";
import { cachedSanityFetch } from "@/sanity/lib/fetch";
import { insightsListQuery } from "@/sanity/lib/queries";
import { normalizeInsightCategories } from "@/lib/insights/insightCategories";

export type InsightFeedItem = {
  id: string;
  title: string;
  slug: string;
  locale: string;
  publishedAt: string;
  excerpt: string | null;
  author: string;
  thumbnailUrl: string | null;
  source: "sanity" | "studio";
  categories: string[];
};

type SanityStub = {
  _id: string;
  title: string;
  slug: string;
  locale: string;
  publishedAt: string;
  excerpt: string | null;
  thumbnailUrl?: string | null;
};

function toIso(d: string | Date): string {
  if (typeof d === "string") return d;
  return d.toISOString();
}

function firstImageSrcFromHtml(html: string | null | undefined): string | null {
  if (!html) return null;

  const invalidSrcTokens = ["YOUR_IMAGE_URL_HERE", "{{IMAGE_URL}}", "REPLACE_WITH_IMAGE_URL", "YOUR_IMAGE_URL"];
  const imgTagRegex = /<img\b[^>]*>/gi;
  const decodeHtmlEntities = (value: string): string =>
    value
      .replace(/&amp;/gi, "&")
      .replace(/&quot;/gi, '"')
      .replace(/&#39;/gi, "'")
      .replace(/&lt;/gi, "<")
      .replace(/&gt;/gi, ">");

  for (const m of html.matchAll(imgTagRegex)) {
    const tag = m[0];
    const srcMatch = tag.match(/\bsrc\s*=\s*["']([^"']*)["']/i) ?? tag.match(/\bsrc\s*=\s*([^\s>]+)/i);
    const src = decodeHtmlEntities((srcMatch?.[1] ?? "").trim());
    if (!src) continue;
    if (src === "#") continue;
    if (src.toLowerCase().startsWith("javascript:")) continue;
    if (invalidSrcTokens.some((token) => src.includes(token))) continue;
    return src;
  }
  return null;
}

/**
 * Sanity articles plus published studio HTML posts, newest first.
 */
export async function getInsightFeed(): Promise<InsightFeedItem[]> {
  const [sanityRows, studioRows] = await Promise.all([
    cachedSanityFetch<SanityStub[]>(insightsListQuery).catch(() => [] as SanityStub[]),
    listPublishedStudioPosts(),
  ]);

  const sanityItems: InsightFeedItem[] = sanityRows.map((a) => ({
    id: a._id,
    title: a.title,
    slug: a.slug,
    locale: a.locale,
    publishedAt: toIso(a.publishedAt),
    excerpt: a.excerpt,
    author: "AS Brokers",
    thumbnailUrl: a.thumbnailUrl ?? null,
    source: "sanity",
    categories: [],
  }));

  const studioItems: InsightFeedItem[] = studioRows
    .filter((r) => r.publishedAt)
    .map((r) => ({
      id: r.id,
      title: r.title,
      slug: r.slug,
      locale: r.locale,
      publishedAt: r.publishedAt!.toISOString(),
      excerpt: r.excerpt,
      author: "AS Brokers",
      thumbnailUrl: r.heroImageUrl ?? firstImageSrcFromHtml(r.bodyHtmlPublished),
      source: "studio" as const,
      categories: normalizeInsightCategories(r.categories),
    }));

  const sanitySlugKeys = new Set(sanityItems.map((item) => `${item.slug}::${item.locale}`));
  const studioItemsWithoutSanitySlugConflict = studioItems.filter(
    (item) => !sanitySlugKeys.has(`${item.slug}::${item.locale}`)
  );

  return [...sanityItems, ...studioItemsWithoutSanitySlugConflict].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}
