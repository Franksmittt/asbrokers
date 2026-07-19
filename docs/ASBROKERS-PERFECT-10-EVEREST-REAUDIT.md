# AS BROKERS — PERFECT-10 RE-AUDIT: `/everest-wealth`

**Date:** 2026-07-19  
**Scope:** Everest Wealth hub Perfect-10 (same checklist as home + `/calculators`)  
**Live baseline:** https://www.asbrokers.co.za/everest-wealth  
**Action:** Audit + shell Perfect-10 implementation (this branch)

Authority dims: Engineering · Content/GEO · Discoverability · Design/Brand · Trust/Conv/A11y · Operate.

---

## SECTION 1 — SNAPSHOT

| # | Item | Finding |
|---|---|---|
| 1 | Framework | Next.js 15 App Router, RSC page + `EverestWealthPageView` |
| 2 | Hosting | Vercel; sitemap + llms.txt already list hub |
| 3 | Canonical | `https://www.asbrokers.co.za/everest-wealth` |
| 4 | Product shape | Money hub: education → constraints → profiles → ASSET tools → FAQ → contact |
| 5 | Related | `/everest-wealth/about`, ASSET 009–014, `/calculators#investments` |
| 6 | Images | Hero maize + compare dining-table photo (PR #52) |
| 7 | FAIS | Targeted returns, R100k, 120-day notice, 15% early exit, DWT, not advice |

---

## SECTION 2 — BASELINE SCORE (pre-fix live)

| Category | Score /10 | Notes |
|---|---|---|
| Engineering | 8.5 | RSC hub; hero was heavy JPG + no dedicated HubLcpPreload alignment |
| Content / GEO | 7.5 | **Meta truncated** mid-sentence (`profiles,.`) |
| Discoverability | 9.0 | Canonical/sitemap/llms OK; OG used large hero master |
| Design / Brand | 8.0 | Brand kicker weak (“Everest…” without AS Brokers hero signal) |
| Trust / Conv / A11y | 8.5 | Constraints present; dedicated liquidity callout missing |
| Operate | 8.5 | Page-review PENDING |

**Overall baseline: ~8.3 / 10 — not Perfect-10 ready**

### Top FAIL / gaps (impact order)

1. Meta/OG description clamped to broken `…targeted profiles,.` (no FSP in SERP snippet)
2. Hero LCP served ~160KB JPG; Hub LCP map pointed at full WebP without page preload sync
3. Brand test soft — “AS Brokers” not hero-level in kicker
4. No explicit liquidity warning band (facts grid only)
5. OG social image = heavy hero master
6. BreadcrumbList missing on PageJsonLd (home/calculators pattern)
7. Page-review tracker still PENDING for this URL

---

## SECTION 3 — FIXES SHIPPED (this PR)

1. Rewrite `PAGE_DESCRIPTION` to **154 chars**, complete sentence, keeps **FSP 17273**
2. Brand kicker → `AS Brokers · Everest Wealth · Category 1.8 · FSP 17273`
3. Hero BLUF names AS Brokers CC (FSP 17273)
4. Responsive WebP LCP (`480/640/960`) + `HubLcpPreload` + native `<picture>`
5. Compressed `everest-wealth-og.jpg` for social/crawl
6. Server-rendered **Liquidity warning** under voluntary capital facts
7. `content-visibility-auto` on below-fold chapters
8. Breadcrumbs on PageJsonLd; alt entries for new assets
9. Tracker → `/everest-wealth` **IN PROGRESS**

---

## SECTION 4 — CONSTRAINTS (unchanged)

- Do not invent `sameAs` / NAP  
- FAIS educational tone; targeted ≠ guaranteed  
- R100k / 2.5–17.5% Amethyst band where living annuity mentioned  
- Warm Home4 document language; no HubSpot  
- Compare-section photo stays (Frank Drive asset)

---

## SECTION 5 — RETEST AFTER DEPLOY

- SERP meta: full sentence ending cleanly; includes FSP 17273  
- LCP: 480w WebP preload matches painted hero  
- Mobile LH + a11y on `/everest-wealth`  
- Visual: brand kicker + liquidity band + compare image  
