# Task 12 — Retire legacy Sanity insights fallback (Studio-only)

Date: 2026-07-13  
Status: **DONE**

## Decision basis

- Blog Studio is the intentional CMS Albert wants.
- Task 11: Vercel production has **no** `SANITY*` / `NEXT_PUBLIC_SANITY_*` env vars; public Sanity fallback could not serve real articles in prod.
- Keeping dead dual-read paths only added failure modes and Studio publish friction (Sanity slug conflict checks).

## What changed

| Surface | Before | After |
| --- | --- | --- |
| `/insights` feed (`lib/insights/feed.ts`) | Studio + Sanity merge | **Studio only** |
| `/insights/[slug]` | Studio then Sanity Portable Text | **Studio only** → `notFound()` if missing |
| `app/sitemap.ts` | Studio then Sanity insight URLs | **Studio only** |
| Blog Studio save/publish | Blocked if Sanity slug conflict | Sanity check **removed** (Studio is SoT) |

## Files changed

- `lib/insights/feed.ts`
- `app/(content)/insights/[slug]/page.tsx`
- `app/sitemap.ts`
- `app/studio/blog/actions.ts` (remove Sanity slug conflict gate + imports)
- `scripts/insights-source-inventory.ts` (policy reminder text)
- `docs/TASK12-STUDIO-ONLY-INSIGHTS.md` (this proof)

## Explicitly NOT done

- Did **not** delete Sanity packages, `/studio` Sanity tool route, or Sanity schema files (can be a later cleanup).
- Did **not** hard-delete any Sanity cloud content (none reachable without Project ID).
- Did **not** touch CRM / portal / auth / DB migrations / layout CSS.
- Inventory script still *can* read Sanity if Project ID is added later (optional archaeology).

## Residual risk

1. Any article that existed **only** in Sanity and never in Studio will now 404. Task 11 could not prove such rows exist (no Project ID). Studio currently has **51** published posts locally.
2. Static route `/insights/semigration-retirement` remains in sitemap `STATIC_PATHS` if that page is a separate non-CMS route — unchanged.
3. Optional later: uninstall Sanity deps / remove `sanity/` app folder once confirmed unused.

## Confirmation

- Public insights source of truth: **Blog Studio only**
- Sanity insights fallback: **REMOVED** from feed, article page, and sitemap
