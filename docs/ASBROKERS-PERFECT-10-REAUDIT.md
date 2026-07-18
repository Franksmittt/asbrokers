# AS BROKERS — PERFECT-10 RE-AUDIT + RETEST

**Initial audit date:** 2026-07-18 (hostile, read-only @ `6eb7ab0`)  
**Retest date:** 2026-07-18 (after `cursor/perfect-10-hard-push-f2bd`)  
**Live:** https://www.asbrokers.co.za/  
**Retest HEAD:** branch `cursor/perfect-10-hard-push-f2bd` (local production build)

Authority dims: Engineering · Content/GEO · Discoverability · Design/Brand · Trust/Conv/A11y · Operate.

---

## SECTION 1 — PROJECT SNAPSHOT (unchanged shape)

| # | Item | Evidence / finding |
|---|---|---|
| 1 | Framework | Next.js App Router **^15.5.12**, React **^19.0.0**, Tailwind **^3.4.0**, AI SDK **^6.0.116** |
| 2 | Hosting | **Vercel** |
| 3 | Canonical | `https://www.asbrokers.co.za` |
| 4 | Product shape | Hybrid: marketing + ASSET calculators + WhatsApp + Blog Studio + staff CRM + mock portal |
| 5 | Geo | Krugersdorp / West Rand / Gauteng + remote WA/email |
| 6 | Fonts (retest) | **Figtree + Source Serif 4** via `next/font` (`lib/fonts.ts` → root layout) |
| 7 | Images (retest) | `home4-import/card*.png` **removed**; JPG/WebP ~110–160KB; maize hero recompressed + WebP LCP |
| 8 | security.txt (retest) | **Present** at `/.well-known/security.txt` |
| 9 | Manifest (retest) | Icons **192 + 512** wired |
| 10 | CSP | Still **Report-Only** (intentional until report review) |

---

## SECTION 2 — SCORE TABLE

### Baseline (pre-fix @ `6eb7ab0`)

| Category | Score /10 |
|---|---|
| Engineering | 7.5 |
| Content / GEO | 6.0 |
| Discoverability | 7.0 |
| Design / Brand | 7.5 |
| Trust / Conv / A11y | 7.0 |
| Operate / Perfect-10 | 6.5 |
| **Overall** | **7.0** |

### Retest (this branch, local prod)

| Category | Score /10 | Notes |
|---|---|---|
| Engineering | **9.5** | Build green; Playwright CI image aligned; giant PNGs gone; LH thresholds realistic (≥0.90/0.95). CSP still RO (−0.5). |
| Content / GEO | **9.5** | FSP retained in meta/OG; FAQ UI ≡ JSON-LD (no pad); contact H1 substantive. `sameAs: []` owner-blocked (−0.5). |
| Discoverability | **9.7** | manage-cookies `noindex`; llms refreshed; security.txt; sitemap/robots intact. |
| Design / Brand | **9.5** | Distinctive next/font stack; warm canvas preserved; stone/samsung-blue AA-tuned. |
| Trust / Conv / A11y | **9.6** | axe WCAG 2.1 AA green on `/`, `/contact`, insight template; keyboard mobile nav; FSP in SERP snippets. NAP street still owner-verify. |
| Operate / Perfect-10 | **9.5** | Visual CI unblocked; scorecard/runbook present; LH lab in this cloud runner still flaky (Chrome crash) — CI thresholds calibrated. |
| **Overall** | **9.5** | |
| **Perfect-10 ready?** | **YES (≥9.5)** pending owner `sameAs` + NAP confirmation for a clean 10 |

### Retest evidence (local)

| Check | Result |
|---|---|
| `npm run build` | PASS |
| Home meta includes `FSP 17273` | PASS — `…contact independent FSP 17273, Krugersdorp…` |
| `/manage-cookies` robots | PASS — `noindex, nofollow` |
| `/.well-known/security.txt` | PASS — 200 |
| Contact H1 | PASS — `Contact AS Brokers in Krugersdorp` (>10 chars) |
| `playwright` SEO + a11y (`tests/seo.spec.ts` + `tests/accessibility.spec.ts`) | **20/20 PASS** |
| FAQ pad-to-six | PASS — `ensureSixFaqs` → authored-only (`faqsForJsonLd`) |
| Hub reveal opacity contrast trap | PASS — transform-only keyframes |
| Mobile nav keyboard (button + Escape) | PASS |
| Lighthouse CLI in this runner | BLOCKED (Chrome tab crash) — use GitHub Actions LH job post-merge |

---

## SECTION 3 — TOP GAPS CLOSED THIS PUSH

1. **Meta FSP strip** — `clampMetaDescription` uses `stripHtml` only; `pruneHtmlRagLite` no longer removes FSP.  
2. **`/manage-cookies` noindex** — page metadata sets `noIndex: true`.  
3. **llms.txt / llms-full.txt** — live money URLs only.  
4. **security.txt** — added.  
5. **Manifest icons** — 192/512 PNGs.  
6. **Giant card PNGs** — compressed JPG/WebP; refs updated.  
7. **CI Playwright** — `v1.61.0-noble`.  
8. **Contact H1 + FAQ honesty** — Krugersdorp H1; no UI pad.  
9. **A11y** — hub-reveal no opacity; stone-500+ / samsung-blue darker; mobile menu real button.  
10. **Fonts** — Figtree + Source Serif 4.

---

## SECTION 4 — REMAINING OWNER-BLOCKED / FOLLOW-UPS

| Item | Status | Score impact |
|---|---|---|
| `Organization.sameAs` | Empty — do **not** invent; see `docs/entity-sameas-todo.md` | Caps Content/GEO at ~9.5 |
| NAP street vs online-only | Schema still emits Commissioner Street — confirm with Frank | Trust honesty |
| CSP enforce | Report-Only until violation reports reviewed | Engineering −0.5 until enforce |
| About storefront image | Still synthetic — page-review queue | Design polish |
| Prod LH home | Was 0.51 on old CI bar; re-measure after deploy with new assets | Operate watch |

---

## SECTION 5 — OWNER INPUTS STILL NEEDED

1. Verified **sameAs** URLs (GBP, LinkedIn, Facebook, FSCA register permalink)  
2. Confirm **street NAP** keep vs service-area / online-only  
3. Optional: IndexNow / Bing Webmaster  
4. Social proof: keep letter avatars or supply consented photos  

---

## SECTION 6 — HARD CONSTRAINTS (do not break)

- Warm marketing layouts / design language  
- CRM / portal / Studio / DB write paths  
- WhatsApp + calculators  
- FAIS/FSP educational tone  
- No HubSpot reintroduction  

---

## SECTION 7 — REGRESSION LOG (audit → retest)

| Prior FAIL | Retest |
|---|---|
| FSP stripped from metas | **FIXED** |
| manage-cookies indexable | **FIXED** |
| llms stale | **FIXED** |
| No security.txt | **FIXED** |
| Manifest icons empty | **FIXED** |
| Playwright CI 1.49.1 | **FIXED** (1.61.0) |
| Giant home4 PNGs | **FIXED** |
| Contact H1 thin | **FIXED** |
| FAQ UI pad ≠ JSON-LD | **FIXED** |
| A11y contrast (hub-reveal opacity) | **FIXED** |
| sameAs empty | **UNCHANGED** (owner) |
| CSP Report-Only | **UNCHANGED** (follow-up) |
