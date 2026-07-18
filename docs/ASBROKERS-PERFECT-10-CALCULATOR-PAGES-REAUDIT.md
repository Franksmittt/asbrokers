# AS BROKERS — PERFECT-10 RE-AUDIT: 17 ASSET calculator landings

**Date:** 2026-07-18  
**Scope:** Hostile Perfect-10 audit of **all 17** public `/calculators/[slug]` ASSET tool landings (shell / GEO / discoverability / trust / CWV).  
**Live base:** `https://www.asbrokers.co.za/calculators/{slug}`  
**Repo HEAD (audit):** `70520c1` (main — hub Perfect-10 PR #40 merged)  
**Hub `/calculators`:** Frank signed **DONE** (page review). This audit does **not** reopen the hub.  
**Action:** **AUDIT ONLY** — no product refactors, no UI redesign, **no edits to calculator embeds / formulas**.

### Hard constraint (owner)

> Calculators are sensitive. **Do not change** `public/embed-calculators/*.html`, embed registry math, or iframe behaviour.  
> Future fixes = **page shell only**: `lib/calculators/page-configs.ts` copy/meta/FAQ/hero paths, `AssetCalculatorPageView` chrome, SEO/schema wiring, images — **leave the tools as-is**.

Authority dims: Engineering · Content/GEO · Discoverability · Design/Brand · Trust/Conv/A11y · Operate.

---

## SECTION 1 — PROJECT SNAPSHOT (context + ASSET landings)

| # | Item | Evidence / finding |
|---|---|---|
| 1 | Framework | Next.js **^15.5.12**, React **^19.0.0**, Tailwind **^3.4.0** — `package.json` |
| 2 | Hosting | **Vercel** — live `x-vercel-cache: HIT` / PRERENDER on sample landings |
| 3 | Canonical | Each landing: `https://www.asbrokers.co.za/calculators/asset-0XX-…`; `metadataBase` www |
| 4 | Product shape | Hybrid: marketing **RSC shell** + same-origin **static HTML iframe** (`/embed-calculators/*.html`) + lead capture + WhatsApp; CRM/portal/Studio separate |
| 5 | Geo | Org/LB Krugersdorp / West Rand; landing copy is national SA tool intent |
| 6 | Primary MONEY URLs | Hub + 17 ASSET URLs; Everest / retirement / estate / insurance hubs; note: several **product URLs 308 → calculators** (see §3/§7) |
| 7 | Route tree | `app/(content)/calculators/[slug]/page.tsx` → `AssetCalculatorPageView` + `PageJsonLd` + `HubLcpPreload`; `dynamicParams = false`; `generateStaticParams` = 17 |
| 8 | CI | `.github/workflows/ci.yml`: build, a11y, visual, lighthouse, seo-wrs, master-audit. Hub covered; **per-slug LH not asserted in CI** (lab sample only) |
| 9 | Perfect-10 docs | Site reaudit + hub reaudit + **this file** |
| 10 | CMS | Code-driven `lib/calculators/page-configs.ts` + `registry.ts` — **no Sanity** |
| 11 | Env NAMES | Origin, GA/Hotjar, Studio/DB, CRM, WhatsApp, Resend, AI — none required for static shell HTML |
| 12 | Fonts | Figtree + Source Serif 4 (`next/font`); landings use sans H1 (hub uses serif more) |
| 13 | Images | Split hero `next/image` priority; **source JPGs often 140–289KB**; LH flags responsive/next-gen savings 45–200KB |
| 14 | Security | HSTS (no preload), XFO DENY, **CSP Report-Only** (sitewide) |
| 15 | robots / sitemap / llms / security.txt | All **17** locs in sitemap; hub in `llms.txt`; **individual ASSET URLs absent from llms.txt**; landings indexable |

**Architecture (do not break):**

```
RSC page → AssetCalculatorPageView (shell)
         → EverestCalculatorEmbed ("use client") → iframe /embed-calculators/{file}.html
         → CalculatorLeadCapture ("use client")
```

`HubReveal` is **CSS-only** (no Framer on critical path).

---

## SECTION 2 — SCORE TABLE (cohort: 17 ASSET landings)

| Category | Score /10 | PASS | FAIL | PARTIAL | UNKNOWN | N/A |
|---|---|---|---|---|---|---|
| Engineering | **8.6** | 6 | 0 | 3 | 0 | 0 |
| Content / GEO | **7.6** | 4 | 2 | 3 | 0 | 0 |
| Discoverability | **8.4** | 5 | 1 | 2 | 0 | 0 |
| Design / Brand | **7.4** | 2 | 1 | 3 | 0 | 0 |
| Trust / Conv / A11y | **7.8** | 4 | 2 | 2 | 0 | 0 |
| Operate / Perfect-10 | **8.2** | 4 | 0 | 3 | 0 | 0 |

**Overall /10 (cohort): 8.0**  
**Perfect-10 ready for 17 ASSET landings?: NO**

Controllable ceiling is high (CWV already strong; structure is sound). Gaps are **shell SEO/trust/a11y**, not calculator math.

### Top 10 FAIL / remaining gaps (impact order)

1. **ASSET 001 meta loses FSP 17273** — source `seoDescription` 170 chars; live clamp to 159 ends “…contributions.” — **FSP stripped**. Same failure mode as pre-fix hub.
2. **Living annuity shell omits 2.5%–17.5% drawdown band** — ASSET 014 (`page-configs`) mentions “regulatory min/max” but **never states 2.5–17.5**; Amethyst named without liquidity warning. Violates workspace Everest/Amethyst honesty rule on **shell** (embed untouched).
3. **Brand-in-hero weak on all 17** — kicker = `{category} · {ASSET code}` only; “AS Brokers” is title-suffix / nav. Brand test fails without nav (same class of issue hub fixed).
4. **Hero masters oversized** — e.g. income-tax inset **289KB**, Everest suite **266KB**, retirement-inset **247KB**. Mobile LH: LCP ~2.7–3.3s; responsive-image opp **115–200KB**.
5. **Thin FAQ GEO on 14/17 pages** — FAQ counts: 001=6, 002=2, 004=2, 009=2, **rest=1**. Honest (no pad-to-6) but weak entity depth vs hub.
6. **Dynamic `/api/og` truncates descriptions mid-word** — OG `description` clamped to ~120 and cut (e.g. “…Illustrative+retirement+p.”). Social/crawl presentation soft.
7. **Step labels fail colour contrast** — `text-cinematic-teal` `#00a3a3` on white = **3.1:1** (need 4.5). Hits a11y 97 on sampled pages (shared shell).
8. **Product money URLs 308 → calculators** — live: `/everest-128-product`, `/everest-strategic-growth-145`, `/everest-amethyst-living-annuity` → ASSET 010/012/014. Intent cannibalisation; tracker still lists product pages as PENDING.
9. **`llms.txt` lists hub only** — no ASSET deep links for AI crawlers that honour Allow (OAI-SearchBot etc.).
10. **Sitewide `sameAs: []` + CSP Report-Only** — caps GEO entity hardness / operate; not landing-specific.

### Top 5 quick wins (LIST ONLY — do not implement; shell-only)

1. Rewrite **ASSET 001** `seoDescription` ≤160 with trailing **FSP 17273.** (mirror hub fix).
2. On **ASSET 014** shell copy/FAQ: state **2.5%–17.5%** drawdown band + educational/not-advice; add liquidity note if Amethyst/voluntary context appears — **do not touch embed HTML**.
3. Brand kicker pattern: `AS Brokers · {ASSET} · FSP 17273` (or category + brand) on all 17 shells.
4. Darken step label teal (or use ink) for AA contrast — one shared class in `AssetCalculatorPageView`.
5. Compress / swap hero sources for the worst offenders (tax, Everest suite, retirement inset) **without** changing iframe tools; optionally set dedicated `ogImagePath` per page or a shared calculators OG.

---

## SECTION 3 — ROUTE + INTENT MAP (all 17)

| Path | pageRole | intent | RSC or client? | schema | sitemap? | notes |
|---|---|---|---|---|---|---|
| `/calculators/asset-001-retirement-growth` | tool | retirement growth rate | RSC shell + iframe client | WebPage+FAQ(6)+BC | Y | **Meta FSP clamp FAIL** |
| `/calculators/asset-002-retirement-reality-check` | tool | income vs capital | RSC+iframe | FAQ(2) | Y | Hero ~247KB |
| `/calculators/asset-003-retirement-premium` | tool | monthly funding | RSC+iframe | FAQ(1) | Y | Thin FAQ |
| `/calculators/asset-004-life-of-capital` | tool | capital longevity | RSC+iframe | FAQ(2) | Y | Alias: `/income-in-retirement` → here |
| `/calculators/asset-005-future-value` | tool | inflation / FV | RSC+iframe | FAQ(1) | Y | Alias: `/cost-of-inflation-over-time` |
| `/calculators/asset-006-income-tax` | tool | SARS 2026/27 illus. | RSC+iframe | FAQ(1) | Y | Alias: `/income-tax-calculator`; heaviest hero |
| `/calculators/asset-007-estate-duty` | tool | duty + executor | RSC+iframe | FAQ(1) | Y | Alias: `/estate-duty-calculator` |
| `/calculators/asset-008-estate-reduction` | tool | R100k/R200k donations | RSC+iframe | FAQ(1) | Y | Alias: `/annual-estate-reduction-strategy` |
| `/calculators/asset-009-everest-142-income` | tool | 14.2% income | RSC+iframe | FAQ(2) | Y | R100k + liquidity in shell; LH LCP 3.3s |
| `/calculators/asset-010-everest-128-income` | tool | 12.8% + bonus | RSC+iframe | FAQ(1) | Y | **Product URL redirects here** |
| `/calculators/asset-011-everest-128-vs-142` | tool | income compare | RSC+iframe | FAQ(1) | Y | Smallest hero (~40KB) |
| `/calculators/asset-012-strategic-growth` | tool | 14.5% growth | RSC+iframe | FAQ(1) | Y | **Product URL redirects here** |
| `/calculators/asset-013-everest-income-vs-growth` | tool | 3-way compare | RSC+iframe | FAQ(1) | Y | |
| `/calculators/asset-014-living-annuity` | tool | LA drawdown | RSC+iframe | FAQ(1) | Y | **Missing 2.5–17.5 in shell**; product URL redirects here |
| `/calculators/asset-015-average-clause` | tool | underinsurance | RSC+iframe | FAQ(1) | Y | |
| `/calculators/asset-016-growth-comparison` | tool | compound growth | RSC+iframe | FAQ(1) | Y | |
| `/calculators/asset-017-personal-goal` | tool | goal funding | RSC+iframe | FAQ(1) | Y | Hero = `home4-import/card1.jpg` (dup of retire hero bytes) |

**Flags**

- Whole-page `"use client"` money landings: **PASS** (page is RSC).
- Thin/duplicate intent: **PARTIAL** — legacy solo routes mostly 308 → ASSET; **Everest product URLs also 308 → ASSET** (product vs calculator intent collision).
- Orphans: **PASS** — all 17 in sitemap; hub ItemList links them.
- Discovery Health: N/A.
- **Out of scope but adjacent:** `/premium-increase-calculator` still a live Solo page (not ASSET 001–017).

---

## SECTION 4 — SCHEMA / ENTITY

| Node | Status on ASSET landings |
|---|---|
| Organization / LocalBusiness / FinancialService | Present (site graph); **`sameAs: []`** |
| WebPage | Present; **`isAccessibleForFree: true`** (verified ASSET 001) |
| WebPage.`name` | Matches branded `<title>` (PASS — unlike pre-fix hub drift) |
| FAQPage | Present when FAQs authored; count = visible authored list (**no pad-to-6**) |
| BreadcrumbList | Calculators → category → tool title |
| SoftwareApplication / HowTo | **Not** used (HowTo is on-page copy only) |

**FAQ honesty:** PASS mechanistically (UI = JSON-LD). **PARTIAL** for GEO depth: 14 pages ship a single FAQ.  
**FAIS/FSP:** Strong fiduciary panel on every shell; **SERP FSP broken on ASSET 001 only** via clamp.  
**Everest honesty (shell):** 009–013 mention R100k / targeted / liquidity in copy — good. **014 Amethyst band incomplete.**

---

## SECTION 5 — GEO / CONTENT (per-tool matrix)

| ASSET | Title (short) | Meta len live | FSP in meta | H1 BLUF quality | Brand kicker | Moat notes |
|---|---|---|---|---|---|---|
| 001 | Retirement Growth Rate… | **159** | **NO** (clamped) | Strong question H1 | Category only | 6 FAQs; best GEO depth |
| 002 | Retirement Reality Check… | 157 | YES | Strong | Category | 2 FAQs |
| 003 | Retirement Premium… | 149 | YES | Strong | Category | 1 FAQ |
| 004 | Life of Capital… | 139 | YES | Strong | Category | Drawdown stress-test |
| 005 | Inflation / Future Value | 144 | YES | Strong | Category | |
| 006 | Income Tax 2026/27 | 145 | YES | OK (generic) | Category | Tax year named |
| 007 | Estate Duty… | 141 | YES | OK | Category | R3.5m abatement |
| 008 | Estate Reduction… | 125 | YES | Strong | Category | R100k/R200k |
| 009 | Everest 14.2%… | 137 | YES | Strong | Category | R100k + DWT |
| 010 | Everest 12.8%… | 131 | YES | Strong | Category | Loyalty bonus |
| 011 | 12.8 vs 14.2… | 138 | YES | Strong | Category | |
| 012 | 14.5% Strategic Growth | 134 | YES | Strong | Category | |
| 013 | Income vs Growth… | 123 | YES | OK | Category | |
| 014 | Living Annuity… | 144 | YES | OK | Category | **No 2.5–17.5 stated** |
| 015 | Average Clause… | 152 | YES | Strong | Category | |
| 016 | Power of Growth… | 131 | YES | Strong | Category | |
| 017 | Personal Goal… | 134 | YES | Strong | Category | |

**Who / How / Why / CTA (shared shell pattern):** side panel + 4 how-to steps + fiduciary notes + “Use the calculator” → `#calculator-tool` + terminal Contact/WhatsApp/Everest. **PASS** structure.  
**Internal links:** RelatedContent + category crumbs + Everest hub CTA. **PASS**.

---

## SECTION 6 — PERFORMANCE / CWV (mobile Lighthouse, agent env)

Environment: headless Chromium via `npx lighthouse@12` against **production**.  
`robots-txt` audit flaky in this env (“unable to download”) — **treat SEO 92 as soft**; live `robots.txt` is valid and lists Sitemap. Console noise included `ERR_INSUFFICIENT_RESOURCES` on `og-default.jpg` (agent resource limit — not necessarily prod UX).

| URL | Perf | A11y | BP | SEO* | LCP | TBT | CLS |
|---|---|---|---|---|---|---|---|
| `/calculators/asset-001-retirement-growth` | **96** | **97** | **96** | 92* | 2.7s | 20ms | 0.001 |
| `/calculators/asset-009-everest-142-income` | **92** | **97** | **96** | 92* | 3.3s | 10ms | 0.001 |
| `/calculators/asset-015-average-clause` | **96** | **97** | **93** | **100** | 2.8s | 30ms | 0.001 |

\*SEO docked by robots download failure in lab, not by missing title/meta.

**Top opportunities (shell images — not embeds):**

- Properly size images: **115–200 KiB**
- Next-gen formats: **42–68 KiB**
- Unused JS/CSS: modest (lead capture + iframe host)

**Inference for other 14:** same `AssetCalculatorPageView` → expect Perf **90–97**, TBT low, CLS fine; LCP tracks **hero master weight**. Worst LCP risk: ASSET 006 / 009 / 002 heroes.

**Do not “optimise” by lazy-killing the iframe or gating the tool behind idle** — that previously broke hub UX.

---

## SECTION 7 — DISCOVERABILITY

| Check | Result |
|---|---|
| Sitemap includes all 17 | **PASS** (live sitemap locs verified) |
| Canonical per slug | **PASS** |
| Indexable (no noindex) | **PASS** |
| Legacy aliases → ASSET | **PASS** (estate-duty, inflation, income-in-retirement, etc.) |
| Everest **product** URLs → ASSET | **FAIL for product intent** (308 to calculators) — owner decision needed |
| `llms.txt` deep links | **FAIL** — hub only |
| GSC/Bing/IndexNow evidence | **UNKNOWN** in this audit |
| Orphan risk | Low among ASSET set |

---

## SECTION 8 — TRUST + CONVERSION

| Check | Result |
|---|---|
| Educational / not-advice fiduciary panel | **PASS** (every page) |
| FSP 17273 in shell | **PASS** on-page; **FAIL** in ASSET 001 meta |
| Everest R100k + liquidity (009–013) | **PASS** (copy + fiduciary extras) |
| Amethyst / LA 2.5–17.5 (014) | **FAIL** on shell |
| Lead capture after tool | Present (`CalculatorLeadCapture`) |
| WhatsApp + Contact CTAs | Present |
| FAQ honesty | **PASS** (no pad) |
| A11y contrast (step labels) | **FAIL** shared shell (`#00a3a3` on white) |
| Consent/cookies CLS | Sitewide; CLS lab ~0 on samples |

---

## SECTION 9 — OPERATE GAP LIST (YES/NO)

| Item | Status |
|---|---|
| Synthetic monitoring (per ASSET) | **NO** |
| Visual baselines (per ASSET) | **PARTIAL** (CI visual exists; not confirmed 17-wide) |
| Weekly scorecard | Sitewide docs — **PARTIAL** |
| Incident runbook | Sitewide — **YES** (docs) |
| Entity verification log | **PARTIAL** / sameAs empty |
| Brand DNA | **YES** |
| Moat worksheets | **PARTIAL** |
| AI red-team | **NO** (not evidenced) |
| 90-day plan | **YES** (docs) |
| sameAs todo filled? | **NO** |

---

## SECTION 10 — CONSTRAINTS + OWNER INPUTS

**HARD CONSTRAINTS**

- Warm 2-week marketing layouts — keep
- **Do not modify calculator embeds / formulas**
- CRM / portal / Studio / DB — out of scope
- WhatsApp + calculators remain
- FAIS/FSP tone; Everest R100k; Amethyst 2.5–17.5 honesty on **shell**
- Do not invent `sameAs` / NAP / GBP / social URLs

**OWNER INPUTS still needed**

1. Confirm Everest **product** pages should exist again vs stay redirected to ASSET tools.  
2. `sameAs` / GBP / social URLs when ready.  
3. NAP street confirm sitewide.  
4. Whether to deepen FAQs to 3–5 per tool or keep thin-honest.  
5. Priority order for shell pass (suggest: 001 meta → 014 band → shared contrast/brand → hero compress batch).

---

## SECTION 11 — TASK BACKLOG (PLAN ONLY — do not start)

| Task | Goal (1 line) | Risk if skipped |
|---|---|---|
| **1** | Shell Perfect-10 batch: ASSET 001 meta FSP + ASSET 014 2.5–17.5 + shared brand kicker + step contrast — **no embed edits** | SERP trust miss; Amethyst compliance gap; a11y dock sitewide on calcs |
| **2** | Hero image compress/swap for worst LCP offenders (006, 009, 002, …) via `page-configs` paths only | Mobile LCP stuck ~3s on Everest tools |
| **3** | FAQ depth pass (2–4 honest FAQs) on thin tools; keep visible↔schema parity | Weak GEO vs competitors |
| **4** | `llms.txt` + optional static OG for calculator family | AI/social discoverability lag |
| **5** | Resolve product URL vs calculator redirect strategy with Frank | Product pages remain ghosts; tracker misleading |
| **6** | After shell ship: Frank page-review sign-off → mark 17 DONE in tracker | Batch stays IN PROGRESS forever |

**Suggested Task 1 one-liner ONLY:**  
Shell-only Perfect-10 pass for ASSET landings: fix 001 meta FSP, 014 drawdown band copy, brand kicker + step contrast — **do not touch embeds**.

---

## APPENDIX A — Live scrape summary (2026-07-18)

All 17 returned 200, correct iframe `src="/embed-calculators/asset-0XX-….html"`, canonical self, FAQ LD count matched config, no brand-kicker string `AS Brokers ·` in HTML.

## APPENDIX B — Hero source weights (repo `public/`)

| Bytes | Path | Used by |
|---|---|---|
| 289154 | income-tax-calculator-inset-1x1.jpg | 006 |
| 266068 | everest-suite-hero-16x9.jpg | 009 |
| 248063 | everest-growth-145-inset-1x1.jpg | 012 |
| 246563 | retirement-inset-1x1.jpg | 002 |
| 212122 | everest-copper-industrial-4x3.jpg | 013 |
| 185681 | inflation-cost-inset-1x1.jpg | 005 |
| 167802 | annual-estate-reduction-inset-1x1.jpg | 008 |
| 162221 | home4-goal-insure-16x9.jpg | 015 |
| 159228 | home4-goal-estate-16x9.jpg | 007 |
| 153662 | home4-goal-retire-16x9.jpg / home4-import/card1.jpg | 001 / 017 |
| 142264 | calculators-capital-lifespan-4x3.jpg | 004 |
| 141036 | everest-128-inset-1x1.jpg | 010 |
| 128508 | living-annuity-inset-1x1.jpg | 014 |
| 107792 | home-actuarial-engine-16x9.jpg | 016 |
| 96853 | calculators-education-16x9.jpg | 003 |
| 39932 | everest-visual.jpg | 011 |

---

## STATUS

**DONE** — read-only audit complete.  
**Path:** `docs/ASBROKERS-PERFECT-10-CALCULATOR-PAGES-REAUDIT.md`  
**Overall:** **8.0 / 10** · Perfect-10 ready?: **NO**  
**Embeds:** not modified; not recommended for “quick” code surgery.
