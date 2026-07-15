# Discovery Health — Organic Rank Odds Audit

**URL:** https://www.asbrokers.co.za/solutions/discovery-health  
**Updated:** 15 July 2026 (content GEO upgrade)

## Target queries

### Primary (money)
**Discovery Health medical aid broker** (commercial investigation → transactional)

### Secondary (5–10)
1. Discovery Health broker South Africa  
2. Discovery Gap Cover broker  
3. Is a medical aid broker free / does broker cost extra  
4. Discovery Health 2026 plans explained  
5. Discovery Health MSA ATB PHF  
6. Switch Discovery Health broker  
7. Medical aid broker Krugersdorp / West Rand  
8. Discovery Health vs going direct  
9. Medical aid and gap cover stack South Africa  

### Intent map
| Query cluster | Intent | Page role |
|---|---|---|
| Discovery + broker | Commercial investigation | Primary landing |
| Plans / MSA / ATB / 2026 | Informational | Educate → form |
| Gap Cover + Discovery | Commercial | Stack section + CTA |
| Broker free / go direct | Objection handling | Moat + FAQ |
| Krugersdorp / West Rand | Local + commercial | BLUF + NAP/trust |

## Current gaps (before GEO upgrade)

| Gap | Severity |
|---|---|
| H1 brand/marketing-led (“Stop guessing…”) not query-aligned | High |
| BLUF missing geography (Krugersdorp / West Rand / SA) + named entity density | High |
| No original moat (process table / fit-unfit decision) — plan matrix is scheme-public data | High |
| Who / How / Why not explicit as human-readable blocks | Medium |
| Hero image path is JPG only (`risk-arch-medical.jpg`); no on-page LCP image | Medium |
| Related OUT links thin (no contact; no average-clause tool) | Medium |
| Organization `knowsAbout` omitted Discovery / medical brokerage | Low |
| `sameAs` empty sitewide | Owner action |
| No published Studio insight posts on Discovery medical aid to link | Constraint |

## Internal inlinks TO `/solutions/discovery-health` (pre-upgrade)

| From | Mechanism |
|---|---|
| `/solutions/medical-aid` | Hero secondary CTA + related |
| `/insurance` | Demarcation section link + related |
| Footer legal/discoverability row | Text link |
| `lib/home4-journey.ts` | Journey chip |
| `lib/related-content` hubs | medical-aid, insurance |
| `lib/problem-messaging` | medical-aid secondary CTA |
| `public/llms.txt` + `llms-full.txt` | AEO |
| `app/sitemap.ts` | XML |

**Clicks from home:** Home → Insurance or Medical journey → Discovery (≤3). Not orphan.

## Schema honesty

| Type | Status |
|---|---|
| WebPage + Service + FAQPage + BreadcrumbList | Present; FAQ mirrors authored 6 Q&As |
| Organization / FinancialService / LocalBusiness | Sitewide graph; NAP matches contact patterns |
| Product spam | Avoided |
| Breadcrumbs | Home → Insurance → Medical aid → Discovery (matches cluster) |
| ImageObject | Via primary image path |

## Already excellent (do not break)

- Sitemap / llms / GSC verify wiring  
- POPIA form → CRM (`discovery_health` funnel)  
- WCAG AA teal (`#0F766E`) after a11y pass  
- FAIS framing; independent of Discovery Ltd  
- Illustrative premium disclaimers  
- Chunk boundaries + RelatedContent + VisibleFaqSection  

## Cannibalization

| URL | Intent | Differentiation |
|---|---|---|
| `/solutions/medical-aid` | Gap vs scheme demarcation, all schemes | Parent hub; no DHMS plan matrix |
| `/solutions/discovery-health` | Discovery Health Medical Scheme + Gap stack + broker audit | This page owns Discovery-named queries |
| `/insurance` | Full risk architecture | Links down; does not compete on DHMS |

## Before → after (Phase 2–4)

| Factor | Before | After |
|---|---|---|
| H1 | Marketing slogan | Query-aligned Discovery broker + SA |
| BLUF | Partial | Who/what/where/CTA ~60 words |
| Moat | Public plan cards only | Fit/unfit table + broker process timeline |
| Who/How/Why | Implicit | Explicit sections |
| Image | Schema JPG only | On-page next/image WebP |
| Outlinks | 2–3 | Medical-aid, insurance, contact, average-clause calc, blueprint |
| knowsAbout | No Discovery | + Discovery Health Medical Scheme / medical brokerage |
| Title double brand | Fixed sitewide earlier | Kept brand-free entity + layout template |

## Verify (local prod, 15 Jul 2026)

| Metric | Mobile |
|---|---|
| Performance | **99** |
| Accessibility | **100** |
| Best practices | **100** |
| SEO | **100** |

HTML checks: canonical present, FAQPage + BreadcrumbList + dateModified, fit/process/Who-How-Why blocks, WebP hero, single brand title.

**Diff status:** Ready locally — **not committed** (await human ask).

## Owner actions remaining

1. Ask agent to commit + push when ready  
2. Google Search Console → Request indexing for `/solutions/discovery-health` after deploy  
3. Confirm sitemap fetch still healthy in GSC  
4. Fill `sameAs` (GBP + real social) — see `docs/entity-sameas-todo.md`  
5. Optional: GBP post linking this URL (owner-written)  
6. Optional: publish one Studio insight on Discovery/gap (then add related link)  

## Honest ranking note

Controllable Perfect-10 factors are maximized. #1 for “Discovery Health medical aid broker” is not guaranteed against Discovery.co.za, national comparison aggregators, and entrenched FSPs.
