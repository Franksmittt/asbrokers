# Task 8 — Insights dual-CMS reliability

Date: 2026-07-13  
Status: **DONE**

## Chosen policy: **A — Studio-first**

**Why:** AGENTS.md / Blog Studio docs treat `/studio/blog` + Postgres `client_insight_posts` as the live publishing path. The previous feed preferred Sanity on slug conflicts and **dropped** matching Studio posts, so republishes from Blog Studio could vanish from `/insights` while Sanity still “won.”

## Behaviour

| Source | Role |
| --- | --- |
| Blog Studio (Postgres / Supabase REST fallback) | **Primary** — all published posts with `publishedAt` |
| Sanity | **Legacy supplement** — only slug+locale keys not already claimed by Studio |
| Either source failing alone | Does **not** empty the feed; warnings logged |

Aligned read paths (no write/schema changes):

- `lib/insights/feed.ts` — Studio-first merge + dedupe
- `app/(content)/insights/[slug]/page.tsx` — Studio article before Sanity
- `app/sitemap.ts` — Studio URLs registered before Sanity (first-writer wins)

## Empty-state behavior

Unchanged UI in `InsightsFeedFilter`: when `articles.length === 0`, shows existing “The next article is being written” panel with Semigration + calculators CTAs. Hub stays **indexable** (no noindex). Featured falls back to static Semigration flagship in `InsightsHubPageView`. No fake articles invented.

## Files changed

| File | Change |
| --- | --- |
| `lib/insights/feed.ts` | Studio-first merge; isolated source failures |
| `app/(content)/insights/[slug]/page.tsx` | Studio-first article + metadata |
| `app/sitemap.ts` | Studio before Sanity in insight URL push order |
| `docs/TASK8-INSIGHTS-FEED.md` | This proof |

## Confirmation: CRM / Studio write systems untouched

- No edits to Blog Studio clients, CRM, portal, auth, Drizzle migrations, or Sanity schemas.
- No layout/CSS/FAQ redesign on `/insights`.
- Contact Task 7 left alone.

## Residual risks / dual-CMS debt

1. Sanity content still serves for unique legacy slugs until migrated or unpublished.
2. Article body formats differ (Studio HTML vs Sanity Portable Text) — expected.
3. Empty library still possible if **both** Studio DB and Sanity are empty/misconfigured (`DATABASE_URL` / Sanity project missing).
4. Playwright visual baselines for insights not in suite; no snapshot update this task.
5. Long-term: retire Sanity insights once all evergreen posts live in Studio.

## Suggested Task 9 (one-liner only)

Migrate remaining Sanity-only insight slugs into Blog Studio (or explicitly archive them) so the public library can drop the Sanity fallback.
