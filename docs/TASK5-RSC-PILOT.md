# Task 5 — RSC hub pilot

Date: 2026-07-13  
Scope: Convert **one** marketing hub to an RSC shell with client leaves only where needed. Pixel-same UI. No next/font. No other hubs.

## Chosen route + why

**`/solutions/medical-aid`** (`components/solutions/MedicalAidPageView.tsx`)

- `/about` was priority #1 but is **already** a Server Component (no `"use client"`).
- Medical Aid is on the Perfect-10 audit FAIL list for client PageViews, content-heavy, and has **zero** interactivity (no hooks, motion, forms, or searchParams).
- Safe pilot: drop `"use client"` only — no markup/className/copy changes; no new client leaves required.

## Files changed

| File | Action |
| --- | --- |
| `components/solutions/MedicalAidPageView.tsx` | Removed `"use client"`; file is now an RSC PageView |
| `docs/TASK5-RSC-PILOT.md` | **New** — this proof |

No new `*.client.tsx` files (nothing interactive to extract).

## Server vs client

| Layer | Role |
| --- | --- |
| `app/(content)/solutions/medical-aid/page.tsx` | Already RSC (metadata + PageJsonLd + view) |
| `MedicalAidPageView` | **Now RSC** — static sections, Image, Links, FAQ pad via `ensureSixFaqs` (UI unchanged) |
| `Footer` → `FooterClientIslands` | Existing client leaves for newsletter / scroll-top only (unchanged) |
| `VisibleFaqSection` / `RelatedContent` / `TrustDiagrams` | Already server-safe; unchanged |

## Visual test result

Suite `tests/visual.spec.ts` covers **homepage + contact only** (no medical-aid baseline).

- Pilot change is directive-only (no DOM/class/style edits) → intentional visual delta = **none**.
- Full Playwright visual run: **SKIPPED** here — Linux CI baselines; Windows local runs are flaky per `docs/DEPLOYMENT.md`; suite does not screenshot this route.

Recommendation for CI: after merge, confirm existing home/contact visual job still green (collateral unchanged).

## Confirmation: other hubs + CRM/studio untouched

- No edits to insurance, investments, estate, retirement, insights, contact, calculators, everest, about, or other PageViews.
- No CRM / Studio / portal / DB / auth / CSP / font / FAQ UI pad removal.

## Residual risk

- Footer still pulls small client islands on this page (pre-existing, same as other hubs).
- FAQ still pads to six in the **visible** UI via `ensureSixFaqs` (Task 3 schema authenticity left UI alone by design).
- Next pilots (e.g. `/estate-planning`, `/insurance`) are similarly “use client”-only with no hooks and should follow the same one-hub pattern.
