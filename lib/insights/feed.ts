import "server-only";

import { desc, eq } from "drizzle-orm";

import { clientInsightPosts, getDb } from "@/lib/db";
import { cachedSanityFetch } from "@/sanity/lib/fetch";
import { insightsListQuery } from "@/sanity/lib/queries";

export type InsightFeedItem = {
  id: string;
  title: string;
  slug: string;
  locale: string;
  publishedAt: string;
  excerpt: string | null;
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
    source: "sanity",
  }));

  if (!db) {
    return sanityItems.sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  }

  const studioRows = await db
    .select()
    .from(clientInsightPosts)
    .where(eq(clientInsightPosts.status, "published"))
    .orderBy(desc(clientInsightPosts.publishedAt));

  const studioItems: InsightFeedItem[] = studioRows
    .filter((r) => r.publishedAt)
    .map((r) => ({
      id: r.id,
      title: r.title,
      slug: r.slug,
      locale: r.locale,
      publishedAt: r.publishedAt!.toISOString(),
      excerpt: r.excerpt,
      source: "studio" as const,
    }));

  return [...sanityItems, ...studioItems].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}
