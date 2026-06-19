import type { MetadataRoute } from "next";
import "server-only";
import { listPublishedStudioPosts } from "@/lib/client-studio/posts";
import { absoluteUrl, insightUrlPath } from "@/lib/site-url";
import { sanityFetch } from "@/sanity/lib/live";
import { insightArticlesSitemapQuery } from "@/sanity/lib/queries";

export const revalidate = 3600;

/** Public marketing/site pages — no auth, CRM, Studio, APIs, internal tools. */
const STATIC_PATHS = [
  "/",
  "/about",
  "/annual-estate-reduction-strategy",
  "/calculators",
  "/chat",
  "/complaints",
  "/conflict-of-interest",
  "/contact",
  "/cost-of-inflation-over-time",
  "/estate-duty-calculator",
  "/everest-128-product",
  "/everest-amethyst-living-annuity",
  "/everest-strategic-growth-145",
  "/everest-wealth",
  "/everest-wealth/about",
  "/how-we-work",
  "/immediate-higher-income-calculator",
  "/income-in-retirement",
  "/income-tax-calculator",
  "/insights",
  "/insights/semigration-retirement",
  "/lab",
  "/manage-cookies",
  "/premium-increase-calculator",
  "/privacy",
  "/quiz",
  "/regulatory-compliance",
  "/retirement",
  "/retirement-readiness",
  "/retirement-survival-blueprint",
  "/business-risk-review",
  "/legacy-conversations",
  "/legacy-readiness-checklist",
  "/healthy-retirement-blueprint",
  "/solutions",
  "/solutions/business-insurance",
  "/solutions/business-life",
  "/solutions/estate-planning",
  "/solutions/life-insurance",
  "/solutions/medical-aid",
  "/solutions/personal-insurance",
  "/team",
  "/terms",
  "/wealth-building-calculator",
] as const;

type SanitySitemapRow = {
  slug: string;
  locale: string;
  publishedAt: string;
  sanityUpdatedAt?: string;
};

function maxModified(...inputs: Array<string | Date | undefined | null>): Date | undefined {
  let best: number | undefined;
  for (const raw of inputs) {
    if (raw == null) continue;
    const t = raw instanceof Date ? raw.getTime() : new Date(raw).getTime();
    if (!Number.isNaN(t) && (best === undefined || t > best)) best = t;
  }
  return best !== undefined ? new Date(best) : undefined;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const seen = new Set<string>();
  const entries: MetadataRoute.Sitemap = [];

  const push = (path: string, lastModified?: Date) => {
    const url = absoluteUrl(path);
    if (seen.has(url)) return;
    seen.add(url);
    entries.push(lastModified ? { url, lastModified } : { url });
  };

  for (const path of STATIC_PATHS) push(path);

  let sanityRows: SanitySitemapRow[] = [];
  const sanityProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim();
  if (sanityProjectId && sanityProjectId !== "placeholder") {
    try {
      sanityRows = await sanityFetch<SanitySitemapRow[]>(insightArticlesSitemapQuery);
    } catch (err) {
      console.error("[sitemap] Sanity query failed:", err);
      sanityRows = [];
    }
  }

  for (const row of sanityRows) {
    if (!row?.slug?.trim()) continue;
    const lastMod = maxModified(row.publishedAt, row.sanityUpdatedAt);
    push(insightUrlPath(row.slug, row.locale || "en"), lastMod ?? undefined);

    if (entries.length >= 49500) break;
  }

  const studio = await listPublishedStudioPosts();
  for (const row of studio) {
    if (!row.publishedAt || !row.slug?.trim()) continue;
    const lastMod = maxModified(row.publishedAt, row.updatedAt);
    push(insightUrlPath(row.slug, row.locale || "en"), lastMod);
    if (entries.length >= 49500) break;
  }

  entries.sort((a, b) => a.url.localeCompare(b.url));

  return entries;
}
