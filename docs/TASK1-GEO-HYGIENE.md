# Task 1 — GEO hygiene (implemented)

Date: 2026-07-13  
Scope: schema / robots metadata / sitemap only. No layout, CSS, CRM, Studio, fonts, CSP, or FAQ UI changes.

## Files changed

| File | Action |
| --- | --- |
| `lib/seo.ts` | Added `isAccessibleForFree: true` on Organization, LocalBusiness, WebPage, Article nodes |
| `app/sitemap.ts` | Removed `/manage-cookies` from `STATIC_PATHS` |
| `app/(content)/manage-cookies/layout.tsx` | Set `noIndex: true` via `buildPageMetadata` |
| `docs/entity-sameas-todo.md` | **New** — sameAs deferred (no real profile URLs in repo) |
| `docs/TASK1-GEO-HYGIENE.md` | **New** — this proof doc |

Unrelated leftover (not from this task): `ASBROKERS-PERFECT-10-AUDIT.txt` may still be untracked.

## Before / after schema snippets

### Organization (excerpt)

Before:

```json
{
  "@type": "Organization",
  "identifier": { "@type": "PropertyValue", "name": "FSP Number", "value": "17273" },
  "sameAs": []
}
```

After:

```json
{
  "@type": "Organization",
  "identifier": { "@type": "PropertyValue", "name": "FSP Number", "value": "17273" },
  "sameAs": [],
  "isAccessibleForFree": true
}
```

### WebPage (excerpt)

Before: no `isAccessibleForFree`.

After: every page graph WebPage includes `"isAccessibleForFree": true`.

### Article (excerpt)

Before: no `isAccessibleForFree`.

After: Article nodes include `"isAccessibleForFree": true`.

### LocalBusiness

Same flag added: `"isAccessibleForFree": true`.

## sameAs outcome

- Searched marketing nav, footer (`lib/site-navigation.ts`), about, and site constants for LinkedIn / Facebook / Instagram / YouTube / X URLs.
- **No real AS Brokers profile URLs found.**
- Left `sameAs: []` unchanged (did not invent URLs).
- Created `docs/entity-sameas-todo.md` for owner-confirmed profiles.

## Utility URL actions

| URL | Action | Reason |
| --- | --- | --- |
| `/manage-cookies` | **noindex** + **removed from sitemap** | Pure preference utility; clear to de-index |
| `/chat` | **Skipped** (still indexable + in sitemap) | `scripts/verify-phase5-seo.ts` and phase-2 WRS treat chat/quiz as public lead magnets |
| `/quiz` | **Skipped** (still indexable + in sitemap) | Same explicit product intent as `/chat` |

## Confirmation: CRM / Studio untouched

- No edits under `app/(crm)/`, `app/studio/`, portal, Supabase, Sanity schemas, auth, or Trigger/WhatsApp.
- No `*PageView.tsx`, Tailwind, layout structure, `next/font`, CSP, or FAQ UI changes.
- Only SEO builder, cookie-layout metadata, sitemap list, and docs above.
