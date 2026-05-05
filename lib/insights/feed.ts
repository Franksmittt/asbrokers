import "server-only";

import { getDb } from "@/lib/db";
import { listPublishedClientInsightPosts } from "@/lib/client-studio/client-insight-db";
import { cachedSanityFetch } from "@/sanity/lib/fetch";
import { insightsListQuery } from "@/sanity/lib/queries";

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
};

type SanityStub = {
  _id: string;
  title: string;
  slug: string;
  locale: string;
  publishedAt: string;
  excerpt: string | null;
};

function toIso(d: string | Date): string {
  if (typeof d === "string") return d;
  return d.toISOString();
}

function firstImageSrcFromHtml(html: string | null | undefined): string | null {
  if (!html) return null;
  const match = html.match(/<img[\s\S]*?\ssrc=["']([^"']+)["'][\s\S]*?>/i);
  const src = match?.[1]?.trim();
  if (!src) return null;
  if (src.startsWith("javascript:")) return null;
  return src;
}

/**
 * Sanity articles plus published studio HTML posts, newest first.
 */
export async function getInsightFeed(): Promise<InsightFeedItem[]> {
  const [sanityRows, db] = await Promise.all([
    cachedSanityFetch<SanityStub[]>(insightsListQuery).catch(() => [] as SanityStub[]),
    Promise.resolve(getDb()),
  ]);

  const sanityItems: InsightFeedItem[] = sanityRows.map((a) => ({
    id: a._id,
    title: a.title,
    slug: a.slug,
    locale: a.locale,
    publishedAt: toIso(a.publishedAt),
    excerpt: a.excerpt,
    author: "AS Brokers",
    thumbnailUrl: null,
    source: "sanity",
  }));

  if (!db) {
    return sanityItems.sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  }

  let studioItems: InsightFeedItem[] = [];
  try {
    const studioRows = await listPublishedClientInsightPosts(db);
    studioItems = studioRows
      .filter((r) => r.publishedAt)
      .map((r) => ({
        id: r.id,
        title: r.title,
        slug: r.slug,
        locale: r.locale,
        publishedAt: r.publishedAt!.toISOString(),
        excerpt: r.excerpt,
        author: "AS Brokers",
        thumbnailUrl: firstImageSrcFromHtml(r.bodyHtmlPublished),
        source: "studio" as const,
      }));
  } catch (err) {
    console.error("[insights feed] studio posts query failed (listing may omit HTML articles):", err);
  }

  return [...sanityItems, ...studioItems].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}
