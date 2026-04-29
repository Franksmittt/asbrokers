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

/** Drizzle wraps PG errors on `cause`; top-level message is often only "Failed query: ...". */
function collectErrorText(error: unknown): string {
  const parts: string[] = [];
  let e: unknown = error;
  const seen = new Set<unknown>();
  for (let i = 0; i < 8 && e != null && !seen.has(e); i += 1) {
    seen.add(e);
    if (e instanceof Error) {
      parts.push(e.message);
      e = e.cause;
    } else if (typeof e === "object" && e !== null && "message" in e) {
      parts.push(String((e as { message: unknown }).message));
      e = "cause" in e ? (e as { cause: unknown }).cause : undefined;
    } else {
      parts.push(String(e));
      break;
    }
  }
  return parts.join(" | ");
}

function isMissingCalculatorColumnsError(error: unknown): boolean {
  const text = collectErrorText(error);
  if (!text.includes("calculator_name") && !text.includes("calculator_code")) return false;
  return (
    text.includes("does not exist") ||
    text.includes("42703") ||
    (text.includes("column") && text.includes("calculator"))
  );
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

  let studioRows: Array<{
    id: string;
    title: string;
    slug: string;
    locale: string;
    excerpt: string | null;
    publishedAt: Date | null;
  }> = [];
  try {
    studioRows = await db
      .select()
      .from(clientInsightPosts)
      .where(eq(clientInsightPosts.status, "published"))
      .orderBy(desc(clientInsightPosts.publishedAt));
  } catch (error) {
    // Backward compatibility: older DBs may not have newly added optional columns yet.
    if (isMissingCalculatorColumnsError(error)) {
      return sanityItems.sort(
        (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
    }
    throw error;
  }

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
