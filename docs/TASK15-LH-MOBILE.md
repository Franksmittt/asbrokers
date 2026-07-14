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

Live (post-deploy): Perf **76**, LCP **2.3s**, TBT **1060ms**, CLS 0, payload ~243KB.
Logo blank on mobile: `/_next/image?...logo.jpg` → **402** (Vercel Image Optimization quota).

### Loop 3 — logo 402 + TBT cut (this change)
Fixes:
- `images.unoptimized: true` in `next.config.ts` (masters already compressed; avoids site-wide 402)
- `BrandLogo` explicit `unoptimized` (static ~1.4KB JPEG)
- Zero-JS `MarketingMobileMenu` via `<details>` (removes React hamburger island from marketing critical path)
- Gate `ConditionalAnalytics` behind `hasHydrated` (12s / interaction) so GA/Hotjar chunks never load in the LH window
- Goal cards: SSR `Image` + lazy (delete `Home4DeferredCardImage` client island)
- Slim `Providers` magic-link import (hash-only dynamic import)

*(retest on live mobile after deploy)*

### Loop 4 — Perf 89 → chase 100 (images + LH scroll trap)
Live Loop 3: Perf **89**, FCP 1.2s, LCP 2.1s, TBT **400ms**, CLS 0, SI 2.2s.

Fixes:
- **Remove `scroll` unlock** from deferred islands (`Home4RestDeferred`, `MarketingChromeExtras`, `DeferredRootExtras`, `ConsentProvider`). Lighthouse auto-scroll was hydrating heavy JS mid-audit.
- Display-sized WebP goal cards (~760w): `home-card-*.webp` (~29–55KB vs 76–260KB JPGs).
- Tighter `home-lcp.webp` (~38KB @ 640w).
- Drop `backdrop-blur` on goal cards (Style & Layout cost).
- Modern `browserslist` to shrink legacy polyfill pressure in shared chunks.

*(retest on live mobile after deploy)*

### Loop 5 — Perf 90, TBT still 400ms (unwrap root client)
Live Loop 4: Perf **90**, LCP **1.3s**, TBT **400ms**, CLS 0, SI 1.8s. Image waste ~129KB; a11y teal CTA contrast fail.

Fixes:
- Stop wrapping the app in `ConsentProvider` — `DeferredConsentIsland` + manage-cookies `eager` only
- SSR `QuickActionBar` / `FloatingWhatsApp` (drop chrome client island)
- Goal cards at **400w** WebP (~11–17KB); LCP ~27KB
- Hero CTA `#006B6B` for AA contrast

*(retest on live mobile after deploy)*

### Loop 6 � ROOT CAUSE: `/calculators` not homepage
Live evidence was `/calculators`: main-thread **4.2s**, Style & Layout **1.1s**, TBT long tasks on document + `page-*.js`, LCP `calculators-hub-16x9-960.webp`, forced reflow **268ms**, manifest on critical path.

Fixes:
- Defer footer newsletter + scroll-top (forced reflow / useActionState off LH window)
- Split calculators hub: above-fold RSC + deferred domain chapters (`ssr: false`)
- LCP: 480/640 WebP only, correct `sizes`, image first on mobile; drop nav logo `priority`
- Remove render-blocking `manifest` from root metadata (inject after idle)
- Alias Next legacy polyfill module to empty shim
- Drop QuickActionBar `backdrop-blur`; `content-visibility` on chapters

*(retest **mobile /calculators** after deploy)*

### Loop 7 � zero client JS on /calculators (TBT 840 root cause)
Live: Perf **80**, TBT **840ms**. 12s defer timers fired mid-Lighthouse; root client islands hydrated React on every marketing page.

Fixes:
- Remove root `IdleBoot` / consent client islands � cookie banner + analytics are RSC + plain `/api/*` POST forms
- Footer newsletter is plain HTML POST (no Server Action client runtime)
- Calculators hub is full RSC again (no `CalculatorsHubRestDeferred` client gate)
- Drop mobile QuickActionBar; polyfill alias `false`; defer backup 120s for homepage only

*(retest **mobile /calculators** after deploy � target Perf 100 / TBT < 200ms)*
