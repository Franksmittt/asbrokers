import "server-only";

import { listPublishedStudioPosts } from "@/lib/client-studio/posts";
import { resolveStudioInsightCoverImage, STUDIO_INSIGHT_COVER_FALLBACK } from "@/lib/insights/cover-image";
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

/**
 * Public Insights feed, Blog Studio / Postgres only.
 * Legacy Sanity insights fallback removed (Task 12); Studio is the intentional CMS.
 */
export async function getInsightFeed(): Promise<InsightFeedItem[]> {
  const studioRows = await listPublishedStudioPosts().catch((err) => {
    console.warn("[insights feed] Studio list failed:", err);
    return [] as Awaited<ReturnType<typeof listPublishedStudioPosts>>;
  });

  const studioItems: InsightFeedItem[] = studioRows
    .filter((r) => r.publishedAt)
    .map((r) => {
      const cover = resolveStudioInsightCoverImage({
        heroImageUrl: r.heroImageUrl,
        bodyHtmlPublished: r.bodyHtmlPublished,
        bodyHtml: r.bodyHtml,
      });
      return {
        id: r.id,
        title: r.title,
        slug: r.slug,
        locale: r.locale,
        publishedAt: r.publishedAt!.toISOString(),
        excerpt: r.excerpt,
        author: "AS Brokers",
        // Prefer real Studio covers; only null the generic fallback so the UI can choose its own placeholder.
        thumbnailUrl: cover === STUDIO_INSIGHT_COVER_FALLBACK ? r.heroImageUrl : cover,
        source: "studio" as const,
        categories: normalizeInsightCategories(r.categories),
      };
    });

  return studioItems.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}
