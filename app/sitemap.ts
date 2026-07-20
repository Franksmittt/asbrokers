import type { MetadataRoute } from "next";
import "server-only";
import { CALCULATOR_PAGE_SLUGS } from "@/lib/calculators/page-configs";
import { calculatorPagePath } from "@/lib/calculators/page-path";
import { listPublishedStudioPosts } from "@/lib/client-studio/posts";
import { absoluteUrl, insightUrlPath } from "@/lib/site-url";

/** Always resolve CMS posts at request time, avoids stale build-time sitemap cache. */
export const dynamic = "force-dynamic";

/** Public marketing/site pages, no auth, CRM, Studio, APIs, internal tools, or noindex routes. */
const STATIC_PATHS = [
  "/",
  "/about",
  "/calculators",
  "/chat",
  "/complaints",
  "/conflict-of-interest",
  "/contact",
  "/everest-wealth",
  "/everest-wealth/about",
  "/solutions/medical-aid",
  "/solutions/discovery-health",
  "/premium-increase-calculator",
  "/insurance",
  "/investments",
  "/insights",
  "/insights/semigration-retirement",
  "/privacy",
  "/quiz",
  "/regulatory-compliance",
  "/retirement-gap-method",
  "/financial-freedom-community",
  "/retirement-planning",
  "/retirement-survival-blueprint",
  "/business-risk-review",
  "/legacy-conversations",
  "/legacy-readiness-checklist",
  "/healthy-retirement-blueprint",
  "/estate-planning",
  "/terms",
] as const;

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
    const url = absoluteUrl(path.split("?")[0] ?? path);
    if (seen.has(url)) return;
    seen.add(url);
    entries.push(lastModified ? { url, lastModified } : { url });
  };

  for (const path of STATIC_PATHS) push(path);

  for (const slug of CALCULATOR_PAGE_SLUGS) push(calculatorPagePath(slug));

  /** Insights URLs from Blog Studio only (legacy Sanity sitemap rows retired). */
  const studio = await listPublishedStudioPosts();
  for (const row of studio) {
    if (!row.slug?.trim()) continue;
    const lastMod = maxModified(row.publishedAt ?? row.updatedAt, row.updatedAt);
    push(insightUrlPath(row.slug, row.locale || "en"), lastMod);
    if (entries.length >= 49500) break;
  }

  entries.sort((a, b) => a.url.localeCompare(b.url));

  return entries;
}
