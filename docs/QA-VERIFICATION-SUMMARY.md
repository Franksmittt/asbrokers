# QA verification summary (14 Jul 2026)

Local base: `http://127.0.0.1:3120` (production build via `npm run start -p 3120`).

## 1. Calculators — PASS

- All **17** ASSET embed HTML files compute with defaults (no JS page errors).
- All **17** `/calculators/asset-00X-*` landing pages return **200** with embed iframe.
- Albert HTML audit previously documented in `docs/CALC-AUDIT-001-006.*` and `docs/CALC-AUDIT-007-017.*`.

## 2. Blog Studio — PASS

- Login with `CLIENT_STUDIO_PASSWORD` works.
- Mock draft created: calculator **ASSET 001** selected, **Save draft** succeeded (`Status: Draft saved`).
- Evidence: `docs/QA-FORMS-CRM-STUDIO.json`.

## 3. Forms → CRM leads — PASS (with notes)

| Form | UI success | CRM / DB |
|---|---|---|
| Contact `/contact` | Request received | Lead appears on `/crm/leads` (name + score) |
| Newsletter `/insights` | Subscribed | DB + list as **Newsletter subscriber** |
| Multi-step funnels (Healthy Retirement, Legacy, Business Risk, Survival) | Multi-step assessments | Need full questionnaire completion; not smoke-clickable. Dedicated CRM admin pages exist for funnel exports. |

Confirmed inserts in Postgres (`crm_leads`): contact_form + newsletter rows from this QA run.

## 4. CRM notifications — FIXED (this session)

- Was a decorative bell with no handler.
- Now opens a **New leads** panel (status=`new`) with badge count and links to lead detail / filtered leads list.
- Change: `components/crm/CrmHeader.tsx` (requires rebuild/redeploy to appear in production).

## 5. Internal links / 404s — PASS (crawl)

- Playwright crawl of **57** marketing pages from home + major hubs: **0 × 404**.
- Graph audit (`npm run seo:audit:links`) finds **orphan / low in-degree** pages (not 404s):
  - `/chat`, `/conflict-of-interest`, `/legacy-conversations`, `/premium-increase-calculator`, `/quiz`
- `/conflict-of-interest` and `/legacy-conversations` were reachable by direct URL in the 404 crawl (200). Orphans mean weak in-links from the homepage graph, not broken routes.

## Artifacts

- `docs/QA-SMOKE-E2E-REPORT.json`
- `docs/QA-FORMS-CRM-STUDIO.json`
- `asbrokers_internal_link_graph_audit_findings.txt`
- Scripts: `scripts/qa-smoke-e2e.mjs`, `scripts/qa-forms-crm-studio.mjs`

## Recommended follow-ups

1. Commit/deploy `CrmHeader` notifications wiring so production gets the badge + panel.
2. Optionally add footer/nav links to orphan pages if they should be discoverable.
3. Full Playwright paths for multi-step funnel assessments if those CRM export tables need live QA each release.
