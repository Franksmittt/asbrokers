import "server-only";

import { listPublishedStudioPosts } from "@/lib/client-studio/posts";
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
  /** Public insights are Blog Studio only (legacy Sanity fallback retired). */
  source: "studio";
  categories: string[];
};

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
 * Public Insights feed — Blog Studio / Postgres only.
 * Legacy Sanity insights fallback removed (Task 12); Studio is the intentional CMS.
 */
export async function getInsightFeed(): Promise<InsightFeedItem[]> {
  const studioRows = await listPublishedStudioPosts().catch((err) => {
    console.warn("[insights feed] Studio list failed:", err);
    return [] as Awaited<ReturnType<typeof listPublishedStudioPosts>>;
  });

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

  return studioItems.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}
