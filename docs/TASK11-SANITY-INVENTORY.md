# Task 11 — Legacy Sanity inventory (Part A)

Date: 2026-07-13  
Part A status: **HARD_BLOCKED**

## Why blocked

Blog Studio is the intentional CMS. Sanity is legacy Insights leftover. A true sanity-only list requires reading the Sanity project.

Checked safely (values never logged):

| Source | Sanity vars found |
| --- | --- |
| `.env.local` | `NEXT_PUBLIC_SANITY_DATASET`, `NEXT_PUBLIC_SANITY_STUDIO_URL` only — **no** `NEXT_PUBLIC_SANITY_PROJECT_ID` |
| `.env` | Not present |
| `vercel env pull` (development) | No Sanity keys (OIDC only in this pull) |
| `vercel env pull --environment production` | **Zero** `SANITY*` / `NEXT_PUBLIC_SANITY_*` keys on Vercel production |

Missing var **names** (required for inventory):

1. `NEXT_PUBLIC_SANITY_PROJECT_ID`
2. Optional: `SANITY_VIEWER_TOKEN` (if dataset needs auth)
3. Usually also: `NEXT_PUBLIC_SANITY_DATASET` (local has this; Vercel prod does not)

**Do not interpret local studio-only counts as sanity-only = 0.** Without Project ID, Sanity was skipped.

## Partial Studio-only signal (not a full inventory)

`npm run insights:inventory` with current local env:

| Bucket | Count | Trust |
| --- | ---: | --- |
| sanity-only | 0* | Untrusted — Sanity skipped |
| studio-only | 51 | OK (Postgres) |
| both | 0* | Untrusted |

## Human checklist (5 lines) — then re-run

1. In Vercel → Project → Settings → Environment Variables, add `NEXT_PUBLIC_SANITY_PROJECT_ID` (and dataset if needed) for Production/Preview, **or** put the same names into local `.env.local`.
2. Optionally add `SANITY_VIEWER_TOKEN` if public CDN reads are insufficient.
3. From repo root: `vercel env pull .env.local --environment production --yes` (or merge Project ID into existing `.env.local` manually — do not paste secrets into chat).
4. Run: `npm run insights:inventory`
5. Paste real counts + sanity-only slug/title list into this doc (or a follow-up Task 11b) before any Sanity unpublish.

## Part B — migration

**Skipped** (blocked on Part A). Migrated: **0**.

When inventory shows `sanity-only > 0`: migrate evergreen in Blog Studio UI; verify URL; **unpublish** in Sanity — never hard-delete; re-inventory.

When a **real** inventory shows `sanity-only = 0`: document that; Sanity **code fallback may be removed in a later task only** (not Task 11).

## Confirmation

- Sanity fallback in `lib/insights/feed.ts` / article route / sitemap: **still present**
- No Sanity content deleted
- Temp Vercel env pull files deleted from workspace after inspection
