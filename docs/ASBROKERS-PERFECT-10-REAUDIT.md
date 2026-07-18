# AS BROKERS — PERFECT-10 RE-AUDIT (HOSTILE, READ-ONLY)

**Date:** 2026-07-18  
**Auditor stance:** Hostile Principal Engineer + SEO/GEO + CWV + Search Console readiness  
**Live:** https://www.asbrokers.co.za/  
**Repo HEAD audited:** `6eb7ab0` (Merge PR #33 homepage lifestyle images)  
**Action:** AUDIT ONLY — no product refactors, no UI redesign, no commits.

Authority dims: Engineering · Content/GEO · Discoverability · Design/Brand · Trust/Conv/A11y · Operate.

---

## SECTION 1 — PROJECT SNAPSHOT

| # | Item | Evidence / finding |
|---|---|---|
| 1 | Framework | Next.js App Router **^15.5.12**, React **^19.0.0**, Tailwind **^3.4.0**, AI SDK **^6.0.116** — `package.json` |
| 2 | Hosting | **Vercel** (live headers, `vercel.com/endpointmedia/asbrokers`, deploy ids in HTML) |
| 3 | Canonical | `https://www.asbrokers.co.za` — `lib/site-url.ts` `DEFAULT_ORIGIN`; `app/layout.tsx` `metadataBase`; live apex `asbrokers.co.za` → **307** → www |
| 4 | Product shape | **Hybrid:** marketing + ASSET calculators + WhatsApp + Blog Studio + staff CRM + mock portal. Not commerce. |
| 5 | Geo positioning | Local/regional: Krugersdorp / West Rand / Gauteng in schema + copy. Also remote WA/email. |
| 6 | Primary MONEY URLs | `/`, `/contact`, `/everest-wealth`, `/calculators`, `/retirement-planning`, `/investments`, `/insurance`, `/estate-planning`, `/solutions/discovery-health`, `/solutions/medical-aid`, `/retirement-survival-blueprint`, `/legacy-readiness-checklist`, `/business-risk-review`, `/insights`, `/about` |
| 7 | Route tree | Public `(content)/*`; calculators hub + 17 ASSET slugs; legal; `/chat` `/quiz`; Studio `/studio/blog/*`; CRM `/crm/*`; portal `/portal/*`; login/auth; embed/internal |
| 8 | CI | `.github/workflows/ci.yml`: `build`, `accessibility`, `visual-regression`, `lighthouse`, `seo-wrs`, `master-audit`. **Latest main run FAIL** (build OK; a11y/visual/LH/seo-wrs fail) — run `29650389624` |
| 9 | Perfect-10 docs | Present: `docs/ASBROKERS-PERFECT-10-AUDIT.txt` (2026-07-13), `TASK10-PERFECT10-SWEEP.md`, `weekly-scorecard-template.md`, `entity-verification-log.md`, `entity-sameas-todo.md`, `incident-runbook.md`, `post-launch-90-day.md`. This file = re-audit. |
| 10 | CMS | **Blog Studio only** at runtime (Postgres `client_insight_posts`). **No Sanity** in `package.json` / `.env.example`. Docs still mention Sanity in places (drift). |
| 11 | Env NAMES only | Origin: `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_APP_URL`. Analytics: `NEXT_PUBLIC_GA_MEASUREMENT_ID`, `NEXT_PUBLIC_HOTJAR_ID`. Studio: `CLIENT_STUDIO_*`, `DATABASE_URL`, `SUPABASE_BLOG_IMAGES_BUCKET`. CRM: Supabase keys + `CRM_*_PIN*`. WhatsApp: `WHATSAPP_*`, `META_APP_SECRET`. Email: `RESEND_*`. AI: `GOOGLE_GENERATIVE_AI_API_KEY`. Trigger: `TRIGGER_*`. GSC scripts (optional): `GSC_PROPERTY`, `GOOGLE_APPLICATION_CREDENTIALS`. **Sanity residual: none in `.env.example`.** |
| 12 | Fonts | Marketing: Tailwind **system-ui** stack (`tailwind.config.ts`). No `next/font` on root layout. OG path uses Inter (`lib/og-fonts.ts`). |
| 13 | Images | `next/image` used widely. **Giants remain:** `home4-import/card1.jpg` ~7.6MB, `card3.png` ~7.6MB, `card4.png` ~8.3MB (card4 unreferenced); `everest-wealth-hero-maize-growth-4x3.jpg` ~928KB. |
| 14 | Security headers | Live: HSTS `max-age=63072000; includeSubDomains` (**no preload**), `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`, **CSP Report-Only** (not enforcing). Middleware: `X-Robots-Tag` for private prefixes (studio matcher caveat). |
| 15 | robots / sitemap / llms / security.txt / manifest | Live `robots.txt`: Allow `/`, Disallow `/api/`, GPTBot/ClaudeBot/CCBot blocked, OAI-SearchBot/Perplexity/Claude-Web allowed, Sitemap line present. Sitemap **44** locs (marketing + ASSET + insights; no crm/portal/studio). `llms.txt` live but **stale links**. **`security.txt` 404**. Manifest exists, **`icons: []`**. GSC verification meta present: `zgoH05kyB4lknFvZmobzDyb9Hl9au5byOwC9fNZgyp4`. |

---

## SECTION 2 — SCORE TABLE

| Category | Score /10 | PASS | FAIL | PARTIAL | UNKNOWN | N/A |
|---|---|---|---|---|---|---|
| Engineering | **7.5** | 8 | 3 | 3 | 0 | 0 |
| Content / GEO | **6.0** | 5 | 4 | 3 | 1 | 0 |
| Discoverability | **7.0** | 5 | 3 | 2 | 1 | 0 |
| Design / Brand | **7.5** | 4 | 1 | 2 | 0 | 0 |
| Trust / Conv / A11y | **7.0** | 4 | 2 | 3 | 0 | 0 |
| Operate / Perfect-10 | **6.5** | 5 | 3 | 2 | 1 | 0 |

**Overall /10: 7.0**  
**Perfect-10 ready?: NO**

### Top 10 FAIL / remaining gaps (impact order)

1. **Meta descriptions strip `FSP 17273` sitewide** — `pruneHtmlRagLite` in `lib/seo-metadata.ts` treats `/fsp 17273/gi` as boilerplate; live home meta reads “…contact independent , Krugersdorp”; Discovery “…AS Brokers CC ( ) in Krugersdorp…”. Kills brand/trust tokens in SERP snippets + OG.
2. **`/manage-cookies` is indexable** — layout sets `noIndex: true`, but `page.tsx` re-exports `buildPageMetadata` **without** `noIndex`, overriding robots. Live HTML has **no** `noindex`. Prior GEO hygiene claim is **regressed**.
3. **`Organization.sameAs: []`** — still empty; owner TODO open (`docs/entity-sameas-todo.md`). Entity hardness incomplete for Knowledge Graph / local pack.
4. **CI red on `main`** — a11y (~0.96 vs 0.98), Lighthouse home **perf 0.51** / a11y 0.96, visual job Playwright image **v1.49.1 vs package 1.61.0**, seo-wrs contact H1 length. Build+Vercel ship; quality gates do not.
5. **~7–8MB PNG giants** still in `public/images/home4-import/` and still referenced (card1/card3) — CWV / transfer risk.
6. **No `security.txt`** (`.well-known/security.txt` → 404).
7. **`llms.txt` / `llms-full.txt` stale** — still link `/solutions`, `/retirement`, `/how-we-work`, `/estate-duty-calculator` (redirect/retired paths). Mis-orients answer engines.
8. **NAP street address unverified vs “online now”** — schema emits `Unit 2, The Bridge, 47 Commissioner Street`. Owner said no real storefront. Honesty / LocalBusiness risk until confirmed or removed.
9. **CSP still Report-Only** — headers exist (prior FAIL fixed), but not enforcing.
10. **Contact H1 `"Contact us"` (10 chars)** — SEO/WRS test expects >10; thin H1 for a money URL.

### Top 5 quick wins (LIST ONLY — do not implement)

1. Stop stripping `FSP 17273` from `clampMetaDescription` / `pruneHtmlRagLite` (or whitelist intentional meta copy).
2. Add `noIndex: true` to `manage-cookies/page.tsx` metadata (match layout).
3. Rewrite `public/llms.txt` (+ full) to current canonical money URLs only.
4. Add `.well-known/security.txt` with contact email.
5. Align CI Playwright docker image to **v1.61.0** (unblocks visual job).

---

## SECTION 3 — ROUTE + INTENT MAP

| Path | pageRole | intent | RSC or client? | schema | sitemap? | notes |
|---|---|---|---|---|---|---|
| `/` | hub / money | Everest+calc lead | **RSC** page; client islands deferred | Org+LB+WebPage; `isAccessibleForFree` | Y | H1 capital question; meta FSP stripped |
| `/calculators` | hub / money | ungated ASSET | RSC hub view | CollectionPage+FAQ | Y | Lifestyle hero shipped |
| `/calculators/asset-*` | tool | educational calc | RSC shells + embeds | varies | Y | 17 tools |
| `/everest-wealth` | money | Cat 1.8 education | RSC | Service+FAQ | Y | Strong BLUF H1 |
| `/solutions/discovery-health` | money | medical broker GEO | RSC page + view | Service+FAQ+Breadcrumb | Y | GEO package solid; meta FSP hole |
| `/contact` | money | conversion | RSC shell + client form | FAQ (6) | Y | H1 thin; UI FAQ pad via `ensureSixFaqs` |
| `/retirement-planning` | money | retirement hub | RSC | Y | Y | |
| `/insurance` | hub | risk architecture | RSC | Y | Y | |
| `/estate-planning` | hub | estate | RSC | Y | Y | |
| `/investments` | hub | investments | RSC | Y | Y | LCP still points at packhouse asset in hub-lcp |
| `/insights` | content | education | RSC Studio-fed | Y | Y | Sanity runtime gone |
| `/about` | trust | entity | RSC | Y | Y | Still uses fake storefront image asset |
| `/manage-cookies` | utility | POPIA prefs | RSC | WebPage | **N** | **Should be noindex — LIVE NOT** |
| `/login` `/crm` `/portal` `/studio` | app | private | private layouts | — | N | login has X-Robots + meta noindex; studio login meta noindex |
| `/team` | legacy | — | redirects → `/how-we-work` → `/about` | — | N | |
| `/sales-funnel-mockup` | mock | — | noIndex coded | — | N | |

**Flags**
- Whole-page `"use client"` money hubs: **largely fixed** vs Jul 13 audit (home/calculators/discovery pages are RSC). Client leaves remain for forms/chat/embeds — acceptable.
- Discovery Health: **PASS** for GEO structure.
- Orphans: low for money set; `llms.txt` points at retired paths (discoverability debt).

---

## SECTION 4 — SCHEMA / ENTITY

| Node | Live status |
|---|---|
| Organization | Present; phone + PostalAddress; **`sameAs: []`**; `isAccessibleForFree: true`; FSP as PropertyValue |
| LocalBusiness | Present; same NAP; **no sameAs field**; `isAccessibleForFree: true` |
| FinancialService | Present |
| WebSite | Present |
| Person | Albert Schuurman, Johnny Farinha |
| WebPage | Present + `isAccessibleForFree: true` on sampled money URLs |
| FAQPage | Discovery/contact/everest/calculators — **faqCount 6**; JSON-LD uses `faqsForJsonLd` (no pad). Contact **UI** still calls `ensureSixFaqs` — visible pad risk if page FAQs < 6 |
| BreadcrumbList | Discovery + calculators |
| Service | Discovery + Everest |

**sameAs:** EMPTY — `docs/entity-sameas-todo.md` status unchanged. Do not invent.

**NAP consistency:** Schema street/phone consistent in code. **Owner must verify** street vs online-only reality (Frank: no storefront). Phone `+27116601445` / WA `+27662276044` in entity log.

**FAIS/FSP honesty:** Body copy and JSON-LD still carry FSP 17273. **Meta/OG descriptions actively remove FSP 17273** — trust/SERP contradiction. Educational disclaimers present on home/calculators.

---

## SECTION 5 — GEO / CONTENT (HOME + MONEY + DISCOVERY)

### `/`
- **Title:** Everest Wealth Education & Independent Advice | AS Brokers CC  
- **Meta (LIVE):** “…contact independent , Krugersdorp…” — **FSP token missing**  
- **H1:** Will this capital last, and what income can it support?  
- **BLUF:** Run Everest income calculator → Category 1.8 adviser Krugersdorp, not call centre  
- **Who/How/Why:** Independent FSP / education-before-advice / calculators then contact  
- **Moat:** Cat 1.8 access + ungated ASSET + local independent (not product factory)  
- **CTA:** Calculate 12.8% · WhatsApp · contact  
- **Internal links:** Everest, calculators, about, journey stages  

### `/solutions/discovery-health`
- **Title:** Discovery Health Medical Aid Broker South Africa | AS Brokers CC  
- **Meta (LIVE):** “AS Brokers CC ( ) in Krugersdorp…” — **empty paren where FSP was**  
- **H1:** Discovery Health medical aid broker for South African families  
- **BLUF / moat:** Independent of Discovery; Gap stacking; free audit; FSP 17273 West Rand (on-page)  
- **CTA:** free audit / contact  
- **Schema:** Service + FAQ(6) + Breadcrumb — **PASS**  

### `/everest-wealth`
- **H1:** Need monthly income without betting on the next market correction?  
- **BLUF:** Cat 1.8 education on 12.8/14.2/14.5 profiles  
- **Meta:** FSP stripped from snippet path; Category 1.8 remains  

### `/contact`
- **H1:** Contact us (**thin**)  
- **Meta:** FAIS enquiry disclaimer; FSP stripped  
- **CTA:** form + WhatsApp  

---

## SECTION 6 — PERFORMANCE / CWV

**Production Lighthouse from this agent:** **BLOCKED** (`PROTOCOL_TIMEOUT` in headless Chrome on the cloud runner).

**CI Lighthouse (main, run 29650389624, lab mobile, assert ≥0.98):**
| URL | Perf | A11y |
|---|---|---|
| `/` | **0.51** FAIL | 0.96 FAIL |
| `/contact` | 0.95 FAIL | 0.96 FAIL |
| `/privacy` | (asserted in suite; same a11y band) | |

**Code-inferred opportunities (not lab-confirmed on prod):**
- Giant PNGs in `home4-import/` still referenced by product pages  
- Deferred chat/consent islands on home  
- Hotjar/GA after consent  
- Assert bar 0.98 is extremely strict for hybrid marketing+third-parties  

CLS assert max 0.1 in `lighthouserc.js` — cookie banner historically CLS-sensitive (PARTIAL / watch).

---

## SECTION 7 — DISCOVERABILITY

| Check | Result |
|---|---|
| robots Sitemap line | PASS — `Sitemap: https://www.asbrokers.co.za/sitemap.xml` |
| llms.txt quality | **FAIL/PARTIAL** — stale retired URLs |
| GSC verification meta | PASS — present on live |
| GSC API scripts | Present (`scripts/gsc-canonical-check.mjs`); env-gated SKIP if unset — **UNKNOWN** if wired in CI/prod |
| IndexNow / Bing | **UNKNOWN / not evidenced** |
| noindex manage-cookies | **FAIL** live |
| noindex studio/login/crm | PASS (meta and/or redirect+X-Robots) |
| Sitemap hygiene | PASS — 44 public URLs; private absent |
| Orphan risk | LOW for money; llms mis-links are the debt |

---

## SECTION 8 — TRUST + CONVERSION

| Area | Status |
|---|---|
| About / Contact / Privacy | Present; About still carries synthetic storefront image asset |
| Forms → CRM + Resend | Wired (HubSpot removed 2026-07-18) |
| WhatsApp | Primary conversion path on home/contact |
| Consent / cookies | Banner + manage-cookies page; **manage-cookies indexable** |
| A11y CI | FAIL ~0.96 (contrast / nav keyboard flakes historically) |
| Thank-you noindex | Dynamic report routes use private metadata patterns — OK |
| FAIS tone | Generally strong on-page; meta FSP erasure undermines SERP trust |

---

## SECTION 9 — OPERATE GAP LIST (YES/NO)

| Artifact | Present? |
|---|---|
| Synthetic monitoring (uptime) | **NO** |
| Visual baselines | **YES** but CI **broken** (Playwright image mismatch) |
| Weekly scorecard template | **YES** — `docs/weekly-scorecard-template.md` |
| Incident runbook | **YES** — `docs/incident-runbook.md` |
| Entity verification log | **YES** — unverified rows |
| Brand DNA doc | **NO** dedicated DNA pack |
| Moat worksheets | **PARTIAL** (page overviews / GEO on Discovery; not a full worksheet set) |
| AI red-team pack | **NO** |
| 90-day plan | **YES** — `docs/post-launch-90-day.md` |
| sameAs todo filled? | **NO** — empty |

---

## SECTION 10 — CONSTRAINTS + OWNER INPUTS

### HARD CONSTRAINTS (do not break later)
- Warm marketing layouts / 2-week design language  
- CRM / portal / Studio / DB write paths  
- WhatsApp + calculators  
- FAIS/FSP compliance tone (educational ≠ advice)

### OWNER INPUTS STILL NEEDED
1. Verified **sameAs** URLs (GBP, LinkedIn, Facebook, FSCA register permalink) — paste only live URLs  
2. Confirm **street NAP**: keep `Unit 2, The Bridge…` or switch to service-area / online-only schema  
3. Confirm GSC property access + whether IndexNow/Bing desired  
4. Whether CI perf bar 0.98 is intentional or should be recalibrated for hybrid stack  
5. Social proof: keep letter-avatar testimonials or supply real consented photos  

### Fork note
Perfect-10 applies to **marketing shell**. CRM/portal/studio remain noindex app surfaces.

---

## SECTION 11 — TASK BACKLOG (PLAN ONLY)

| Task | Goal (1 line) | Risk if skipped |
|---|---|---|
| **1** | Stop meta/`pruneHtmlRagLite` from stripping `FSP 17273`; restore SERP/OG trust tokens | Snippets look broken; brand/FSP absent in Google |
| **2** | Fix `/manage-cookies` `noIndex` on **page** metadata | Utility page indexed; GEO hygiene regression |
| **3** | Refresh `llms.txt` + `llms-full.txt` to live canonicals only | Answer engines crawl dead paths |
| **4** | Add `security.txt` | Basic trust/ops miss |
| **5** | Align Playwright CI image to 1.61.0 | Visual job forever red |
| **6** | Compress/replace `home4-import` 7MB PNGs | Perf debt on product pages |
| **7** | Owner-fill `sameAs` + verify NAP | Weak entity / local pack |
| **8** | Contact H1 + a11y contrast pass | Money URL SEO test + a11y gate |
| **9** | CSP enforce after report review | XSS surface remains advisory-only |
| **10** | Recalibrate or fix home LH 0.51 drivers | False sense of “perf done” |

**DO NOT start Task 1 in this audit turn.**

---

## REGRESSIONS VS PRIOR PERFECT-10 WORK (2026-07-13 → 2026-07-18)

| Prior gap | Now |
|---|---|
| No security headers | **FIXED** (HSTS, XFO, CSP-RO, etc.) |
| RSC hubs / client PageViews | **MOSTLY FIXED** |
| No `isAccessibleForFree` | **FIXED** |
| Sanity dual CMS | **FIXED** (Studio only runtime) |
| FAQ JSON-LD pad-to-6 | **FIXED** for JSON-LD (`faqsForJsonLd`); UI pad remains on some pages |
| Ops docs missing | **FIXED** (templates/logs exist) |
| sameAs empty | **UNCHANGED FAIL** |
| Giant PNGs | **UNCHANGED FAIL** |
| **NEW** FSP stripped from metas | **REGRESSION / FAIL** |
| **NEW** manage-cookies noindex broken by page metadata override | **REGRESSION / FAIL** |
| llms stale | **STILL FAIL** |
| CI red | **STILL FAIL** (worse home LH 0.51 in latest run) |

---

## QUESTIONS (max 8)

1. Is `Unit 2, The Bridge, 47 Commissioner Street` still a real client-facing address, or should LocalBusiness drop street for online/service-area?  
2. Which verified profiles exist for `sameAs` (GBP / LinkedIn / Facebook / FSCA)?  
3. Is stripping FSP from metas intentional for “HtmlRAG-lite”, or a mistake?  
4. Should `/manage-cookies` remain noindex (recommended)?  
5. Is LH assert ≥0.98 non-negotiable for handoff, or recalibrate?  
6. Wire `GSC_PROPERTY` + credentials in CI, or keep local SKIP?  
7. Want IndexNow / Bing Webmaster?  
8. About page fake storefront — replace on `/about` next, or leave until page review?

---

## SUGGESTED TASK 1 (one-liner ONLY — do not start)

**Fix `pruneHtmlRagLite` / `clampMetaDescription` so intentional `FSP 17273` is preserved in public meta + OG descriptions sitewide.**
