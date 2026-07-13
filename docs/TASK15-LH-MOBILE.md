# Task 15 — Mobile Lighthouse Performance (homepage)

Target: https://www.asbrokers.co.za / local `next start`  
Form factor: **mobile** · Category: **performance**

## Phase 0 — Baseline map

| Item | Detail |
| --- | --- |
| Page | Homepage `/` (Home4) |
| LCP element | `Home4Hero` `<Image className="object-cover">` → `/images/everest-copper-industrial-4x3.jpg` |
| Killer cause | `unoptimized` on next/image + multi‑MB PNG/JPEG masters |
| CLS | 0 (preserve) |

### Heavy assets (before)

| Asset | Before | Display ~ | Component |
| --- | --- | --- | --- |
| risk-arch-commercial.png | ~6.4 MB | 380×212 | Home4GoalCard / Insurance |
| risk-arch-estate.png | ~6.4 MB | 426×238 | Home4GoalCard / Estate |
| everest-copper-industrial-4x3.jpg | ~1.3 MB | full-bleed LCP | Home4Hero |
| calculators-capital-lifespan-4x3.jpg | ~780 KB | goal card | Home4GoalCard |
| logo.jpg | ~7.5 KB @ 200² | ~36×36 | BrandLogo |

Live audit Performance ~**54**, LCP ~**11.9s**, TBT ~**880ms**, payload ~**15 MB**.

## Loop log

### Loop 0 — before fix (live evidence)
| Metric | Value |
| --- | --- |
| Performance | ~54 |
| LCP | ~11.9s |
| TBT | ~880ms |
| CLS | 0 |

### Loop 1 — image masters + enable optimizer
| Metric | Median (3 runs) |
| --- | --- |
| Performance | **59** (56 / 59 / 64) |
| LCP | ~3.9–4.6s |
| TBT | ~950–1990ms |
| CLS | 0 |
| SI | ~2.9–6.7s |

Payload fixed (LCP image ~69KB via `/_next/image`). Remaining: **TBT** from early below-fold hydration.

### Loop 2 — TBT deferrals (in progress)
Fixes:
- `Home4RestDeferred`: interaction or 12s (was idle@2.5s)
- Split `QuizProviders` so `nuqs` leaves marketing Providers
- Dynamic `CookieConsent` + `ConditionalAnalytics`
- Gate `MagicLinkHashHandler` behind hash token
- Drop goal-card `priority` (LCP-only hero); hero quality 65

*(scores after rebuild)*
