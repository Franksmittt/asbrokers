# Task 9 — Sanity → Studio insights migration path

Date: 2026-07-13  
Status: **DONE** (inventory tooling + runbook). Sanity fallback **still present** (Task 8 policy unchanged).

## Goal

Make it safe to eventually retire Sanity insights by inventorying overlaps and documenting migrate → verify → archive. **Do not remove Sanity fallback until sanity-only count = 0.**

## How to run the inventory

```bash
# Needs .env.local with at least one side configured:
#   NEXT_PUBLIC_SANITY_PROJECT_ID (+ optional SANITY_VIEWER_TOKEN)
#   DATABASE_URL  OR  NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY

npm run insights:inventory
```

Outputs (gitignored):

- `docs/insights-source-inventory.generated.md`
- `docs/insights-source-inventory.generated.json`

### Local run (this machine, 2026-07-13)

| Bucket | Count |
| --- | ---: |
| sanity-only | 0* |
| studio-only | 51 |
| both | 0* |
| total | 51 |

\* Sanity was **skipped** (`NEXT_PUBLIC_SANITY_PROJECT_ID` missing/placeholder in local `.env.local`). Re-run on a machine/env with production Sanity credentials to get a true sanity-only list before archiving anything.

## Inventory table template (fill after a complete run)

| slug | locale | title | source | sanity publishedAt | studio status | studio publishedAt | action |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `example-slug` | en | Example title | sanity-only | ISO date | — | — | migrate → Studio |
| | | | | | | | |

Paste rows from the generated markdown after `npm run insights:inventory` with both sources connected.

## Recommended order

1. **Run inventory** with Sanity + Studio env present; save the generated report.
2. **Prioritize sanity-only evergreen / high-traffic** (GSC top pages, linked from hubs, Semigration-class guides).
3. **Republish each in Blog Studio** (`/studio/blog/workspace`) using the editor checklist below.
4. **Verify** `/insights/{slug}` serves Studio (Task 8 Studio-first) and meta title/description look correct.
5. **Only then** unpublish or archive the Sanity article in Sanity Studio (never mass-delete from this repo).
6. **Re-run inventory** until `sanity-only = 0`.
7. **Only then** consider a future task to remove Sanity fallback from `lib/insights/feed.ts` / article route / sitemap.

## Archive policy

| Stage | Allowed |
| --- | --- |
| Before Studio republish verified live | **No** Sanity unpublish/delete |
| After Studio post is published + URL checked | Unpublish or archive **that** Sanity doc only |
| Mass delete from scripts/repo | **Forbidden** |
| Remove Sanity fallback in code | **Forbidden** until sanity-only count = 0 (separate task) |

## Blog Studio editor checklist (SEO parity)

When migrating a Sanity article into Studio:

1. **slug** — exact same `slug` + `locale` as Sanity (critical for URLs and dedupe keys).
2. **title** — match public H1 / Sanity title unless intentionally improving.
3. **metaTitle** — copy Sanity `seo.metaTitle` when set; else title.
4. **metaDescription** — copy Sanity `seo.metaDescription` / excerpt.
5. **excerpt** — card/featured blurb for `/insights` list.
6. **heroImageUrl** — set or ensure first body `<img>` is valid (feed thumbnail).
7. **categories** — map to Studio topic filters (retirement / investments / insurance / estate, etc.).
8. **body** — convert Portable Text → Studio HTML carefully (tables, FAIS disclosures, calculator embeds).
9. **status** — `published` + `publishedAt` set.
10. **Smoke** — open `/insights/{slug}?locale=en`, confirm Studio body (not stale Sanity) after Task 8 Studio-first.

Canonical: public site uses `https://www.asbrokers.co.za/insights/{slug}` via `buildArticleMetadata`; do not invent alternate domains.

## Confirmation: what this task did / did not do

| Did | Did not |
| --- | --- |
| Added `scripts/insights-source-inventory.ts` + `npm run insights:inventory` | Remove Sanity fallback |
| Wrote this runbook | Change `/insights` layout/CSS |
| Documented archive gate | CRM / portal / auth / DB migrations |
| | Mass-delete Sanity content |

## Residual dual-CMS debt

- True sanity-only list still needs a prod-credential inventory run.
- Portable Text → HTML conversion is manual/editorial effort.
- Sitemap + feed still merge both sources (Studio-first) until sanity-only = 0.
