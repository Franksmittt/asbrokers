# Task 10 — Full inventory attempt + Perfect-10 remaining sweep

Date: 2026-07-13  
Overall status: **PARTIAL** (Part A blocked on Sanity env; Part B complete)

Sanity fallback in code: **STILL PRESENT** (do not remove until verified sanity-only = 0 with both sources connected).

---

## Part A — Sanity inventory

### Result: BLOCKED_WITH_REASON

Local `.env.local` has Studio/Postgres + Supabase keys, but **no** `NEXT_PUBLIC_SANITY_PROJECT_ID` (comment notes Sanity as legacy / unused for active Blog Studio). Inventory cannot count Sanity articles without that project id (+ optional `SANITY_VIEWER_TOKEN`).

Re-run when production Sanity credentials are available:

```bash
npm run insights:inventory
```

### Counts from this session (Studio side only)

| Bucket | Count | Note |
| --- | ---: | --- |
| sanity-only | 0* | *Sanity skipped — not a verified zero |
| studio-only | **51** | From `client_insight_posts` via DATABASE_URL |
| both | 0* | *Unverified without Sanity |
| total | 51 | Studio-only inventory |

Generated files remain gitignored (`docs/insights-source-inventory.generated.*`).

### Migration this task

**0 migrations performed.** Without a real sanity-only list, no Studio republish candidates can be safely prioritized. When Part A unblocks:

1. Paste sanity-only rows from generated inventory into the checklist below.
2. Migrate evergreen/high-traffic first (human in Blog Studio UI).
3. Unpublish/archive Sanity **after** Studio URL verified — never hard-delete.
4. Re-inventory until sanity-only = 0, **then** a future task may remove code fallback.

#### Checklist template (fill after full inventory)

| Priority | slug | title | Studio republished? | Live URL OK? | Sanity unpublished? |
| --- | --- | --- | --- | --- | --- |
| 1 | | | | | |
| 2 | | | | | |
| 3 | | | | | |

---

## Part B — Perfect-10 remaining scorecard

| Item | Status | Notes |
| --- | --- | --- |
| Tasks 1–3 GEO/schema/HSTS/FAQ JSON authenticity | **DONE** | `isAccessibleForFree`, manage-cookies noindex, ContactPoint+WhatsApp, FAQ schema no pad |
| Task 2 headers + CSP Report-Only + `htmlLimitedBots` | **DONE** | CSP **not** enforcing (intentional) |
| Task 4 next/font | **ACCEPTED EXCEPTION** | System stacks intentional; Inter only for OG |
| Task 4/5–7 RSC hubs + contact shell | **DONE** | Contact visual gate blocked by **stale Linux baselines**, not RSC regression |
| Task 8 Studio-first feed | **DONE** | Sanity still fallback |
| Task 9 inventory tooling + runbook | **DONE** | `npm run insights:inventory` |
| `sameAs` empty | **WAITING ON OWNER URLS** | See `docs/entity-sameas-todo.md` — do not invent |
| Playwright baselines (home/contact) | **NEEDS LINUX CI REFRESH** | Snapshots still old dark UI |
| Fonts (system-ui / Georgia–Palatino) | **ACCEPTED EXCEPTION** | No next/font until deliberate brand choice |
| CSP Report-Only | **INTENTIONAL** | Hotjar/GA/Sanity safe; enforce later after reports |
| `/manage-cookies` client PageView | **ACCEPTABLE** | Consent + `window` — leave client |
| Insights Sanity fallback | **KEEP** until sanity-only = 0 (verified) | |
| `/insights` PageView still `"use client"` | **OPEN** | Filters/state — interactive leaf split later |
| Synthetic prod monitoring / weekly scorecard automation | **OPTIONAL NEXT** | Template exists: `docs/weekly-scorecard-template.md` |
| IndexNow / Bing Webmaster | **UNKNOWN / OPTIONAL** | Not evidenced in repo |
| HSTS without preload | **DONE** | Task 3 |

### Interactive hubs left (client by design)

| Route / view | Why client |
| --- | --- |
| `/insights` (`InsightsHubPageView`) | Topic filters, state, scroll |
| `/manage-cookies` (`ManageCookiesPageView`) | Consent setters + redirect |

### Owner action list

1. Provide verified social / GBP URLs for `sameAs` (Organization **and** LocalBusiness).
2. Refresh Playwright home + contact snapshots on **Linux CI**.
3. Add `NEXT_PUBLIC_SANITY_PROJECT_ID` (+ viewer token if needed) to a local/CI env and re-run `npm run insights:inventory`.
4. Migrate any sanity-only evergreen posts in Blog Studio; unpublish Sanity only after verify.
5. Confirm whether IndexNow/Bing submission is desired.
6. Decide when to review CSP Report-Only → enforce.
7. Optional: fill first weekly scorecard from `docs/weekly-scorecard-template.md`.
8. Optional: RSC-split `/insights` filters into client leaves (engineering).

### Top 8 remaining Perfect-10 gaps (owner + engineering)

1. Owner: `sameAs` profile URLs  
2. Engineering/CI: refresh visual baselines (Linux)  
3. Ops: full Sanity+Studio inventory with prod Sanity env  
4. Editorial: migrate remaining sanity-only (if any) then unpublish  
5. Engineering (later): remove Sanity fallback only when sanity-only = 0  
6. Engineering (later): `/insights` interactive leaf split  
7. Security (later): CSP enforce after clean reports  
8. Optional: IndexNow / Bing + automated weekly scorecard  

---

## Files changed (this task)

| File | Action |
| --- | --- |
| `docs/TASK10-PERFECT10-SWEEP.md` | **New** — this scorecard |

No code/layout/CRM/CSP/font/sameAs changes.

## Confirmation

- Sanity fallback untouched  
- No mass migration / no Sanity deletes  
- Generated inventory gitignored  
- No commit performed  
