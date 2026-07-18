# AS BROKERS — PERFECT-10 RE-AUDIT: `/calculators`

**Date:** 2026-07-18  
**Scope:** Calculators hub Perfect-10 (hostile, read-only)  
**Live:** https://www.asbrokers.co.za/calculators  
**Repo HEAD:** `c3113a3` (Merge PR #38 restore home chat bar)  
**Home `/`:** Frank signed DONE (page review); this audit does **not** reopen home.  
**Action:** AUDIT ONLY — no product refactors, no UI redesign, no commits.

Authority dims: Engineering · Content/GEO · Discoverability · Design/Brand · Trust/Conv/A11y · Operate.

---

## SECTION 1 — PROJECT SNAPSHOT (context + calculators focus)

| # | Item | Evidence / finding |
|---|---|---|
| 1 | Framework | Next.js **^15.5.12**, React **^19.0.0**, Tailwind **^3.4.0** — `package.json` |
| 2 | Hosting | **Vercel** — live `server: Vercel`, `x-vercel-cache: PRERENDER` on `/calculators` |
| 3 | Canonical | Live canonical `https://www.asbrokers.co.za/calculators`; site `metadataBase` www; apex → www |
| 4 | Product shape | Hybrid: marketing hub + 17 ASSET tools + WhatsApp; CRM/portal/Studio separate |
| 5 | Geo | Krugersdorp / West Rand / Gauteng in Org/LB schema; hub copy is national SA tool library |
| 6 | Primary MONEY URLs | `/`, `/calculators`, `/everest-wealth`, `/contact`, `/retirement-planning`, `/investments`, `/insurance`, `/estate-planning`, `/solutions/discovery-health`, `/about`, product Everest URLs, blueprints |
| 7 | Route tree | `/calculators` RSC page → `CalculatorsHubView` + `CalculatorsHubBelowFold` (RSC); `/calculators/[slug]` ×17; solo calculator landings; `/embed/calculators/[id]` redirects to hub |
| 8 | CI | `.github/workflows/ci.yml`: build, a11y, visual, lighthouse, seo-wrs, master-audit. SEO suite includes `/calculators` |
| 9 | Perfect-10 docs | `ASBROKERS-PERFECT-10-REAUDIT.md` (site), this file (hub), scorecard/entity/sameAs/incident/90-day present |
| 10 | CMS | Blog Studio only for insights; hub is code-driven catalog (`lib/calculators/hub-catalog.ts`) — **no Sanity** |
| 11 | Env NAMES | Origin, GA/Hotjar, Studio/DB, CRM Supabase, WhatsApp, Resend, AI, Trigger — unchanged; none required for static hub HTML |
| 12 | Fonts | Figtree + Source Serif 4 via `next/font` (root); hub uses `font-serif` on H1/H2 |
| 13 | Images | LCP: responsive WebP **480/640** (~14–21KB) + preload; master JPG **~123KB** still used for **OG** (`ogImagePath`) |
| 14 | Security | Live: HSTS (no preload), XFO DENY, nosniff, Permissions-Policy, **CSP Report-Only** |
| 15 | robots / sitemap / llms / security.txt | Sitemap includes calculators + ASSET locs (18 hits for “calculators”); `llms.txt` lists hub; `security.txt` present sitewide; hub **indexable** (no robots noindex) |

---

## SECTION 2 — SCORE TABLE (page: `/calculators`)

| Category | Score /10 | PASS | FAIL | PARTIAL | UNKNOWN | N/A |
|---|---|---|---|---|---|---|
| Engineering | **9.2** | 7 | 0 | 2 | 0 | 0 |
| Content / GEO | **8.4** | 6 | 1 | 2 | 0 | 0 |
| Discoverability | **9.5** | 6 | 0 | 1 | 0 | 0 |
| Design / Brand | **8.0** | 3 | 0 | 3 | 0 | 0 |
| Trust / Conv / A11y | **9.3** | 6 | 0 | 1 | 0 | 0 |
| Operate / Perfect-10 | **9.0** | 5 | 0 | 2 | 0 | 0 |

**Overall /10 (audit baseline): 8.9**  
**Perfect-10 ready for `/calculators`?: NO** at audit time (close — blocked by SERP meta truncation + brand/schema polish, not by CWV)

> **Implementation note (same day):** hub Perfect-10 quick wins shipped on branch
> `cursor/calculators-perfect-10-f2bd` — meta rewrite, schema title align, OG compress,
> brand kicker, nav declutter. Re-score after deploy; expect Content/GEO + Design ≥9.5.

### Top 10 FAIL / remaining gaps (impact order)

1. **Meta description truncates mid-sentence** — live: “…Then book FSP 17273 to.” Source string is 175 chars; `clampMetaDescription` ideal 160 cuts after “to”. SERP/OG look broken.
2. **Schema WebPage/CollectionPage `name` ≠ public title** — JSON-LD: “Financial Calculators & Actuarial Planning Tools…”; `<title>`: “Financial Calculators \| ASSET Library FSP 17273…”. Entity/title drift.
3. **Brand-in-hero weak vs H1** — kicker is “ASSET library · FSP 17273”; H1 dominates; “AS Brokers” is nav-level. Brand test soft for a money hub.
4. **Hero is inset bordered media card** — not full-bleed; acceptable for tool hub but first viewport is text+card split + “On this page” pill strip (design clutter risk on mobile).
5. **OG image = 122KB JPG master** while LCP already has tight WebPs — wasted social/crawl bytes.
6. **Stale code comment** — `CalculatorsHubView` claims below-fold “hydrate after idle”; `CalculatorsHubBelowFold` is **RSC** (no `"use client"`). Docs drift.
7. **`Organization.sameAs: []`** — sitewide owner TODO; caps GEO entity hardness (not page-specific).
8. **CSP still Report-Only** — sitewide; not calculators-specific.
9. **Page-review tracker** — `/calculators` still PENDING; home DONE per Frank (tracker PR may lag).
10. **Lab LH crash risk** — agent LH run crashed mid-flight but emitted Perf **99** / A11y·BP·SEO **100**; treat as soft evidence until CI/prod recheck.

### Top 5 quick wins (LIST ONLY — do not implement)

1. Rewrite hub `description` to ≤160 chars ending on a full sentence, keep **FSP 17273**.
2. Align `PageJsonLd` `webPage.name` with `buildPageMetadata` title (one string).
3. Point `ogImagePath` at a compressed WebP (or ≤40KB JPG) already in `public/images/`.
4. Strengthen first-viewport brand: “AS Brokers” in kicker or H1 subline without diluting BLUF.
5. Delete/fix the false “hydrate after idle” comment so future perf work doesn’t re-gate SSR content.

---

## SECTION 3 — ROUTE + INTENT MAP

| Path | pageRole | intent | RSC or client? | schema | sitemap? | notes |
|---|---|---|---|---|---|---|
| `/calculators` | hub / money | ungated ASSET library | **RSC** page + views | CollectionPage+WebPage, FAQ(6), Breadcrumb(2), ItemList(17), Org/LB | Y | LCP preload WebP; meta clamp FAIL |
| `/calculators/[slug]` | tool | educational calc | RSC shell + embed | varies | Y | 17 tools |
| Solo landings (e.g. `/estate-duty-calculator`) | tool | deep links | RSC | Y | Y | related to hub |
| `/embed/calculators/[id]` | embed | iframe | redirect → hub | — | N | |
| `/crm/calculators` | staff | private | app | — | N | noindex app |

**Flags**
- Whole-page `"use client"` on hub: **PASS** (hub is RSC).
- Thin/duplicate intent: low — hub indexes 17 tools with problem-led cards.
- Orphans: low; ItemList + internal domain anchors.
- Discovery Health: N/A to this page (separate money URL).

---

## SECTION 4 — SCHEMA / ENTITY

| Node | Live status on `/calculators` |
|---|---|
| Organization | Present; **`sameAs: []`**; FSP PropertyValue; phone/email |
| LocalBusiness | Present; NAP street Unit 2 The Bridge… (owner verify sitewide) |
| FinancialService | Present |
| WebSite | Present |
| Person | Albert Schuurman, Johnny Farinha |
| WebPage + CollectionPage | Present; **`isAccessibleForFree: true`** |
| FAQPage | **faqCount 6** — matches authored `calculatorsFAQs` (no pad); VisibleFaqSection uses authored list |
| BreadcrumbList | Home → Calculators |
| ItemList | **17** ASSET tools |

**FAQ honesty:** PASS — UI and JSON-LD share the same 6 authored FAQs.  
**FAIS/FSP:** Strong on-page + FAQ Q1; meta retains FSP but **sentence is cut**.  
**sameAs:** EMPTY — `docs/entity-sameas-todo.md`.

---

## SECTION 5 — GEO / CONTENT (`/calculators`)

| Field | Live / code evidence |
|---|---|
| **Title** | Financial Calculators \| ASSET Library FSP 17273 \| AS Brokers CC |
| **Meta** | “…Then book FSP 17273 **to.**” — **TRUNCATED** (FAIL) |
| **H1** | Run the numbers before anyone sells you a product |
| **BLUF** | Seventeen educational calculators… Test assumptions yourself, then contact us if you want advice |
| **Who** | Independent FSP 17273 / Albert’s ASSET library (kicker) |
| **How** | Educate → calculate → bring results / WhatsApp |
| **Why** | Ungated; education before product pitch |
| **Moat** | 17 ungated ASSET tools + Category 1.8 Everest education path |
| **CTA** | Start here · Browse Everest tools · Contact / WhatsApp |
| **Internal links** | Domain chapters, ASSET cards, Understanding Everest, contact, related content |

**Brand test:** Removing nav, first viewport still signals ASSET/FSP but **AS Brokers wordmark is weak** vs H1 — PARTIAL.

---

## SECTION 6 — PERFORMANCE / CWV

**Mobile Lighthouse** `https://www.asbrokers.co.za/calculators` (this agent, headless; Chrome tab crashed after metrics):

| Category | Score |
|---|---|
| Performance | **99** (soft — crash) |
| Accessibility | **100** |
| Best Practices | **100** |
| SEO | **100** |

| Metric | Value |
|---|---|
| FCP | 1.3 s |
| LCP | 2.0 s |
| TBT | **20 ms** |
| CLS | 0.001 |
| SI | 1.3 s |

**Opportunities noted:** unused CSS ~16KiB; unused JS ~41KiB (shared App Router).  
**Code-inferred:** LCP strategy is already strong (480/640 WebP + preload + image-first mobile). Remaining social payload is OG JPG ~123KB.

Compare home (prior): home needed chat deferral for TBT; **calculators TBT is already excellent**.

---

## SECTION 7 — DISCOVERABILITY

| Check | Result |
|---|---|
| Indexable | PASS — no noindex |
| Canonical | PASS — www `/calculators` |
| Sitemap | PASS — hub + ASSET URLs present |
| llms.txt | PASS — hub listed with correct canonical |
| GSC meta | PASS sitewide |
| Orphan risk | LOW for hub tools (ItemList + cards) |
| manage-cookies / studio / crm | Sitewide noindex patterns (not this page) |

---

## SECTION 8 — TRUST + CONVERSION

| Area | Status |
|---|---|
| FAIS disclaimer | PASS — FAQ + body “illustrative only” |
| WhatsApp | PASS — in how-it-works + below-fold |
| Contact CTA | PASS — FAQ primary CTA + related |
| Forms on hub | None above fold (lead capture after tools) — OK |
| A11y lab | PASS 100 (soft) |
| Consent/CLS | Site deferred consent; CLS ~0 |
| BODY `#52525b` on `#F7F6F3` | Contrast ~7.1:1 — AA PASS |

---

## SECTION 9 — OPERATE GAP LIST (YES/NO)

| Artifact | Present? |
|---|---|
| Synthetic monitoring | NO |
| Visual baselines | YES (CI; path coverage TBD for hub) |
| Weekly scorecard template | YES |
| Incident runbook | YES |
| Entity verification log | YES |
| Brand DNA pack | NO dedicated |
| Moat worksheets | PARTIAL |
| AI red-team pack | NO |
| 90-day plan | YES |
| sameAs todo filled? | NO |
| SEO WRS covers `/calculators` | YES — `tests/seo.spec.ts` |

---

## SECTION 10 — CONSTRAINTS + OWNER INPUTS

### HARD CONSTRAINTS
- Warm marketing layouts / Home4 language  
- CRM / portal / Studio / DB  
- WhatsApp + calculator embeds  
- FAIS educational tone (not advice)  
- Do not re-gate SSR hub content behind click/idle  

### OWNER INPUTS STILL NEEDED (sitewide)
1. Verified `sameAs` URLs  
2. NAP street vs online-only confirmation  
3. Whether “AS Brokers” must be hero-level on tool hubs (brand rule vs problem-led H1)

### Fork note
Perfect-10 for this task = **marketing calculators hub**. Individual ASSET slugs are a later batch unless Frank flags one.

---

## SECTION 11 — TASK BACKLOG (PLAN ONLY)

| Task | Goal (1 line) | Risk if skipped |
|---|---|---|
| **1** | Fix `/calculators` meta to ≤160 chars, complete sentence, keep FSP 17273 | Broken SERP snippet |
| **2** | Align JSON-LD CollectionPage/WebPage name with public title | Title/schema mismatch |
| **3** | Compress/retarget OG image off 123KB JPG | Heavy social/crawl image |
| **4** | Brand kicker polish (AS Brokers + ASSET + FSP) without cluttering hero | Weak brand test |
| **5** | Page-review pass: spacing/layout/images with Frank; mark DONE in tracker | Handoff incomplete |
| **6** | Optional: mobile “On this page” pill strip declutter | Visual noise |
| **7** | Owner sameAs / NAP (sitewide) | Entity ceiling |

**DO NOT start Task 1 in this audit turn.**

---

## REGRESSIONS VS SITE PERFECT-10 / HOME

| Area | Calculators status |
|---|---|
| FSP stripped from meta | **NOT present** — FSP retained (sentence cut instead) |
| FAQ pad-to-6 | **PASS** — authored 6 ≡ schema 6 |
| manage-cookies noindex | N/A (site fixed) |
| Giant PNG LCP | **PASS** — WebP LCP |
| Home TBT chat issue | **N/A** — hub TBT ~20ms |
| Home page review | **DONE** (Frank) — do not reopen |

---

## QUESTIONS (max 8)

1. Prefer meta CTA “…book FSP 17273 in Krugersdorp.” or “…interpret your numbers with FSP 17273.”?  
2. Should schema name match title exactly (drop “Actuarial Planning Tools”)?  
3. Keep inset hero card, or move to fuller-bleed lifestyle plane on desktop?  
4. Must “AS Brokers” appear in the H1 band, or is ASSET + FSP enough for this hub?  
5. OG: reuse `calculators-hub-16x9-640.webp` or keep JPG for compatibility?  
6. Batch-review all 17 `/calculators/[slug]` after hub sign-off, or only flagged tools?  
7. Wire hub into weekly LH CI URL list beyond seo-wrs?  
8. Any Everest compliance line that must appear above the fold beyond current kicker?

---

## SUGGESTED TASK 1 (one-liner ONLY — do not start)

**Rewrite `/calculators` meta description to a complete ≤160-character sentence that keeps FSP 17273 and stops clamping to “…to.”**
