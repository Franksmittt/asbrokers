# Task 13 — Dead Sanity surface cleanup

Date: 2026-07-13  
Status: **DONE**

## Part A — Usage audit

### Still “live” before this task (removed)

| Path | Role |
| --- | --- |
| `app/studio/[[...tool]]/*` | Embedded Sanity Studio UI at `/studio` |
| `sanity/**` | Sanity config, schemas, client, queries |
| `app/api/draft-mode/enable/route.ts` | Sanity draft-mode enable |
| `app/(content)/insights/layout.tsx` | `next-sanity` `VisualEditing` when draftMode |
| `components/portable-text/*` | Sanity Portable Text article renderer (orphaned after Task 12) |
| deps `sanity`, `next-sanity`, `@portabletext/react`, `styled-components` | Package weight for above |

### Intentionally kept (not Sanity CMS)

| Path | Why |
| --- | --- |
| `app/studio/blog/**` | **Blog Studio** (Albert’s CMS) |
| `lib/client-studio/**` | Blog Studio data layer |
| `lib/insights/feed.ts` | Studio-only public feed (Task 12) |
| CSP hosts `*.sanity.io` / `cdn.sanity.io` | Left in Report-Only policy in case any legacy image URLs remain in HTML; harmless |
| `PRIVATE_ROUTE_PREFIXES` `/studio` | Still covers Blog Studio |

### Docs / scripts

- Inventory script updated to **Studio-only** (no `@sanity/client` import).
- `/studio` and `/studio/` redirect to `/studio/blog` (non-permanent).

## Part B — Removed

- Entire `sanity/` directory
- `app/studio/[[...tool]]/`
- `app/api/draft-mode/`
- `components/portable-text/`
- Dependencies: `sanity`, `next-sanity`, `@portabletext/react`, `styled-components`
- Insights layout no longer imports `VisualEditing`

## Part C — Verify notes

- Blog Studio paths under `/studio/blog` unchanged (`layout.tsx`, `blog/**` intact).
- Public insights remain Studio-only (Task 12); insights layout is a passthrough (no VisualEditing).
- CRM / portal / auth / DB migrations untouched.
- `npm uninstall` refreshed `package-lock.json` (873 packages removed with Sanity stack).
- Runtime TS imports of `next-sanity` / `@/sanity/*` / Portable Text: **none** (comment-only mention in insights layout).
- Typecheck: run `npx tsc --noEmit` as available after uninstall.

## Residual (intentional)

- Historical mentions in older Task 9–11 docs / generated inventory may still say Sanity — docs drift, not runtime.
- Remote Sanity project archive = human ops (not required for the app).
- No `NEXT_PUBLIC_SANITY_*` required for the app to build or serve Insights.
