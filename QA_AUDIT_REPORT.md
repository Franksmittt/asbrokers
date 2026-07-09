# QA Audit Report

Generated: 2026-07-09T11:34:54.247Z  
Routes scanned: **71**

## Step 1 — GSC indexing & metadata

### Noindex enforcement (`robots: { index: false, follow: false }`)

Private routes are blocked via **route-group layouts** (`privateRouteMetadata` in `lib/seo-metadata.ts`) and/or page-level robots:

| Route pattern | Enforcement |
|---------------|-------------|
| `/crm/*` | `app/(crm)/layout.tsx` |
| `/portal/*` | `app/(portal)/layout.tsx` |
| `/studio/*` | `app/studio/layout.tsx` + `app/studio/blog/layout.tsx` |
| `/auth/*` | `app/auth/layout.tsx` |
| `/login` | `app/login/layout.tsx` |
| `/internal/*` | `app/internal/layout.tsx` + `app/internal/pdf-report/layout.tsx` |
| `/embed/*` | `app/embed/layout.tsx` |
| `/sales-funnel-mockup` | Page `noIndex: true` via `buildPageMetadata` |
| `/team` | Page `privateRouteMetadata` (redirect stub) |
| `/healthy-retirement-blueprint/report/[id]` | Page-level robots |
| `/business-risk-review/report/[id]` | Page-level robots |
| `/legacy-readiness-checklist/checklist/[id]` | Page-level robots |

✅ All private route patterns have noindex coverage.



### Public metadata & canonicals

Converted to `buildPageMetadata` (canonical + OG/Twitter) this audit:

- `/legacy-conversations`
- `/retirement-survival-blueprint`
- `/legacy-readiness-checklist`
- `/quiz` — **re-indexed** (removed erroneous `noIndex`)
- `/chat` — **re-indexed** (removed erroneous `noIndex`)

✅ No public static routes missing programmatic metadata.

## Step 2 — Lighthouse code enforcement

### LCP — hero `priority={true}`

| Component | Status |
|-----------|--------|
| `Home4Hero` | ✅ `priority` + `fetchPriority="high"` |
| `ContactHero` | ✅ `priority` + `fetchPriority="high"` |
| `HubSplitHero` | ✅ defaults `priority={true}` + `fetchPriority="high"` |
| `SoloCalculatorPageView` | ✅ `priority` + `fetchPriority="high"` |
| Hub PageViews (About, Retirement, Investments, Insurance, Estate, Insights, Everest) | ✅ verified `priority` on hero images |
| `/insights/semigration-retirement` | ✅ `priority` prop added |
| `ClientInsightArticle` | ✅ `priority` prop added |

### CLS — images & calculator iframes

- `EverestCalculatorEmbed` — ✅ `aspect-[4/3]` wrapper + explicit iframe `width`/`height`
- Solo calculator heroes — ✅ `aspect-[4/3]` containers with `fill` images
- Hub split heroes — ✅ `aspect-[4/3]` containers

### Accessibility

| Location | Fix |
|----------|-----|
| `ContactEnquiryForm` | ✅ All inputs have `<label htmlFor>`; topics use `aria-labelledby`; submit `aria-label` added |
| `FooterNewsletter` | ✅ Email `aria-label`; subscribe button `aria-label` (pre-existing) |
| `PinLoginForm` | ✅ PIN `<label>`; submit `aria-label` added |

## Step 3 — Skinny content verification

Standalone calculators use `SoloCalculatorPageView` with educational side-panels from `lib/solo-calculator-configs.ts`:

- `/income-tax-calculator` — ✅ side-panel paragraphs + bullets + fiduciary notes
- `/estate-duty-calculator` — ✅ side-panel paragraphs + bullets + fiduciary notes
- `/cost-of-inflation-over-time` — ✅ side-panel paragraphs + bullets + fiduciary notes
- `/annual-estate-reduction-strategy` — ✅ side-panel paragraphs + bullets + fiduciary notes
- `/premium-increase-calculator` — ✅ side-panel paragraphs + bullets + fiduciary notes
- `/income-in-retirement` — ✅ side-panel paragraphs + bullets + fiduciary notes

✅ **No public calculator routes are iframe-only** — all include kicker, hero copy, side-panel education, CTA, related content, and footer.

## Summary

| Check | Result |
|-------|--------|
| Private routes noindex | ✅ Enforced |
| Public hubs unique metadata + canonical | ✅ Verified / fixed |
| Hero LCP priority | ✅ Enforced |
| CLS on embeds | ✅ Fixed |
| Form accessibility | ✅ Verified / enhanced |
| Skinny content | ✅ None flagged |

---

*Re-run: `node scripts/qa-audit-codebase.mjs`*
