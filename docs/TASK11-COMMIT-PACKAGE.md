# Task 11 — Commit package check (NO COMMIT)

Date: 2026-07-13  
Purpose: Staging checklist for the eventual human commit covering Perfect-10 Tasks 1–11. **Do not commit from this doc alone.**

## Suggested commit message (draft only)

```
Harden GEO/schema/security and Studio-first insights; batch RSC hubs and contact shell.
```

## Include (expected)

### Code / config

| Path | Task area |
| --- | --- |
| `lib/seo.ts` | ContactPoint, WhatsApp, FAQ JSON authenticity, isAccessibleForFree |
| `lib/insights/feed.ts` | Studio-first feed |
| `lib/calculators/page-configs.ts` | FAQ schema authenticity (no pre-pad) |
| `app/sitemap.ts` | manage-cookies out; Studio-first insight URLs |
| `app/(content)/manage-cookies/layout.tsx` | noindex |
| `app/(content)/calculators/page.tsx` | authored FAQs to JSON-LD |
| `app/(content)/insights/[slug]/page.tsx` | Studio-first article read |
| `next.config.ts` | htmlLimitedBots, security headers, CSP-RO, HSTS no preload |
| `package.json` | `insights:inventory` script |
| `.gitignore` | generated inventory dumps |
| `components/contact/ContactPageView.tsx` | RSC shell |
| `components/contact/ContactIntakeBanner.client.tsx` | **new** searchParams leaf |
| `components/seo/VisibleFaqSection.tsx` | comment only |
| `components/solutions/MedicalAidPageView.tsx` | RSC |
| `components/insurance/InsuranceHubPageView.tsx` | RSC |
| `components/estate-planning/EstatePlanningPageView.tsx` | RSC |
| `components/investments/InvestmentsPageView.tsx` | RSC |
| `components/retirement-planning/RetirementPlanningPageView.tsx` | RSC |
| `components/everest/EverestWealthAboutPageView.tsx` | RSC |
| `components/everest/EverestProductPageView.tsx` | RSC |
| `components/calculators/SoloCalculatorPageView.tsx` | RSC |
| `components/calculators/AssetCalculatorPageView.tsx` | RSC |
| `scripts/insights-source-inventory.ts` | **new** inventory |

### Docs (proof / ops)

| Path |
| --- |
| `docs/ASBROKERS-PERFECT-10-AUDIT.txt` |
| `docs/TASK1-GEO-HYGIENE.md` … `docs/TASK11-SANITY-INVENTORY.md` |
| `docs/TASK11-COMMIT-PACKAGE.md` (this file) |
| `docs/entity-sameas-todo.md` |
| `docs/entity-verification-log.md` |
| `docs/incident-runbook.md` |
| `docs/post-launch-90-day.md` |
| `docs/weekly-scorecard-template.md` |
| `docs/TASK10-PERFECT10-SWEEP.md` |

## Exclude (never stage)

- `.env`, `.env.local`, `.env.vercel*`, any `vercel env pull` temps
- `docs/insights-source-inventory.generated.md` / `.json` (gitignored)
- `node_modules/`, `.next/`, `test-results/`, `playwright-report/`, `.lighthouseci/`
- Secrets, PIN values, service-role keys, Resend/Supabase tokens
- Unrelated dirty files outside this Perfect-10 package (review `git status` before commit)

## Pre-commit sanity

1. Confirm `lib/insights/feed.ts` still merges Sanity as fallback.
2. Confirm no temp env files in the tree.
3. Human runs `git add` selectively, then commits when ready.
