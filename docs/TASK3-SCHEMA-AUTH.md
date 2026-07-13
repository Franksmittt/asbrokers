# Task 3 — Schema authenticity + HSTS cleanup

Date: 2026-07-13  
Scope: FAQ JSON-LD authenticity, ContactPoint/knowsAbout from existing NAP, HSTS `preload` removal. No layout / CRM / Studio / enforcing CSP.

## Files changed

| File | Action |
| --- | --- |
| `next.config.ts` | HSTS: drop `preload`; keep `max-age=63072000; includeSubDomains` |
| `lib/seo.ts` | Schema FAQ path no longer pads; ContactPoint + knowsAbout + email on Org/LocalBusiness; `faqsForJsonLd()` |
| `lib/calculators/page-configs.ts` | Stop baking `ensureSixFaqs` into configs (UI pads in VisibleFaqSection) |
| `app/(content)/calculators/page.tsx` | Pass authored FAQs to PageJsonLd (no pre-pad) |
| `components/seo/VisibleFaqSection.tsx` | Comment only: UI pad vs schema split |
| `docs/TASK3-SCHEMA-AUTH.md` | **New** — this proof |

## A) HSTS

Before: `max-age=63072000; includeSubDomains; preload`  
After: `max-age=63072000; includeSubDomains`  
CSP remains Report-Only; no `report-to` endpoint added.

## B) FAQ JSON-LD — FIXED (schema path split)

- `ensureSixFaqs` still pads visible FAQ UI (3×2) via `VisibleFaqSection` / PageViews — **UI unchanged**.
- `buildPageGraph` now uses `faqsForJsonLd()` (authored items only; no `COMMON_SITE_FAQS` fillers).
- Calculator page configs no longer pre-pad FAQs before `PageJsonLd`.
- Calculators hub passes authored FAQs to schema; VisibleFaqSection still pads for display.

## C) ContactPoint snippet (Organization / LocalBusiness)

Facts from existing site only (`lib/seo.ts` NAP, contact FAQ / Resend email, office phone):

```json
{
  "@type": "ContactPoint",
  "telephone": "+27116601445",
  "email": "albert@asbrokers.co.za",
  "contactType": "customer service",
  "areaServed": [
    { "@type": "AdministrativeArea", "name": "West Rand" },
    { "@type": "City", "name": "Krugersdorp" },
    { "@type": "Country", "name": "South Africa" }
  ],
  "availableLanguage": ["English"]
}
```

`knowsAbout` (short, site-positioned): Retirement Planning, Investments, Insurance, Estate Planning, Everest Wealth.

`sameAs` still `[]` (owner URLs pending). WhatsApp number not added as a second ContactPoint (phone field already used for office line).

## Confirmation: layout / CRM / Studio untouched

- No PageView structure, Tailwind, spacing, typography, or FAQ on-page content edits.
- No CRM / Studio / portal / DB / auth / CSP enforce / chat-quiz index policy changes.
- No commit performed (human’s job unless explicitly asked).
