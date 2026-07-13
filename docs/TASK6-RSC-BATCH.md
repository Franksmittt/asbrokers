# Task 6 — Batch RSC (no-hooks hubs)

Date: 2026-07-13  
Scope: Directive-only `"use client"` removal on marketing PageViews with no hooks / browser APIs / client event state. Interactive hubs kept. FAQ UI pad unchanged. No CRM/Studio.

## Inventory table

| File / route(s) | Action | Reason |
| --- | --- | --- |
| `components/insurance/InsuranceHubPageView.tsx` → `/insurance` | **REMOVED** `"use client"` | No hooks; static Links + images |
| `components/estate-planning/EstatePlanningPageView.tsx` → `/estate-planning` | **REMOVED** | No hooks; RSC SVG waterfall |
| `components/investments/InvestmentsPageView.tsx` → `/investments` | **REMOVED** | No hooks; RSC viz |
| `components/retirement-planning/RetirementPlanningPageView.tsx` → `/retirement-planning` | **REMOVED** | No hooks; RSC viz |
| `components/everest/EverestWealthAboutPageView.tsx` → `/everest-wealth/about` | **REMOVED** | No hooks; content + Links |
| `components/everest/EverestProductPageView.tsx` → Everest product routes | **REMOVED** | No hooks in parent; `EverestCalculatorEmbed` stays client child |
| `components/calculators/SoloCalculatorPageView.tsx` → legacy solo calc routes | **REMOVED** | No hooks in parent; embed + `CalculatorLeadCapture` stay client children |
| `components/calculators/AssetCalculatorPageView.tsx` → `/calculators/[slug]` | **REMOVED** | No hooks in parent; same client widgets |
| `components/contact/ContactPageView.tsx` → `/contact` | **KEPT** client | `useSearchParams` + form path |
| `components/insights/InsightsHubPageView.tsx` → `/insights` | **KEPT** client | `useState` / filters / `document` scroll |
| `components/legal/ManageCookiesPageView.tsx` → `/manage-cookies` | **KEPT** client | consent `onClick` + `window.location` |
| `components/solutions/MedicalAidPageView.tsx` → `/solutions/medical-aid` | Already RSC (Task 5) | — |
| `components/about/AboutPageView.tsx` → `/about` | Already RSC | — |
| `components/everest-wealth/EverestWealthPageView.tsx` → `/everest-wealth` | Already RSC | — |
| `components/calculators/CalculatorsHubView.tsx` → `/calculators` | Already RSC | — |

## Counts

| | Count |
| --- | --- |
| **REMOVED** this task | **8** |
| **KEPT** interactive PageViews | **3** |
| Already RSC (prior) | 4 |

## Files changed

- 8 PageViews above (directive-only)
- `docs/TASK6-RSC-BATCH.md` (this proof)

## Verification

- Directive-only: no className / markup / copy edits → intentional visual delta = none.
- Playwright visual suite still home + contact only; safe because DOM structure unchanged.
- Converted parents may still render existing client children (`EverestCalculatorEmbed`, `CalculatorLeadCapture`, Footer islands) — correct RSC composition.
- CRM/Studio/portal not touched.

## Confirmation: CRM / Studio untouched

No edits under `components/crm`, `components/client-studio`, `components/portal`, auth, DB, CSP, fonts, or FAQ UI pad logic.

## Suggested Task 7 (one-liner only)

Split `/contact` into an RSC shell + tiny client leaves (`useSearchParams` banner + deferred form), with visual regression on the existing contact baseline.
