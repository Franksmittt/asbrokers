# Internal links frozen / redirected — containment 2026-07-22

Links were **not permanently deleted**. Restore markers use `CONTAINMENT 2026-07-22` comments in source.

| Surface | File | Original target | Action |
|---------|------|-----------------|--------|
| Primary nav | `lib/site-navigation.ts` | `/everest-wealth` | Removed from PRIMARY_NAV |
| Footer how-we-help | `lib/site-navigation.ts` | `/everest-wealth` | Removed from FOOTER_HOW_WE_HELP |
| Home hero CTA | `components/home4/Home4Hero.tsx` | Asset 010 Everest income | Changed to Asset 002 Reality Check; 2026-07-24 factual hero + FAIS notice |
| Home goal card investments | `lib/home4-journey.ts` | `/everest-wealth` + product calcs | Pointed to `/investments` + `/calculators` |
| Home calculator tiles | `lib/home4-journey.ts` | 010, 013, estate duty | Replaced with 002, 001, 004, 005 |
| Home journey stage 03 | `lib/home4-journey.ts` | `/everest-wealth` | Pointed to contact / needs analysis |
| Home pathways / trust | `components/home4/Home4BelowFoldRest.tsx` | Everest hub CTAs | Pointed to `/calculators` / `/regulatory-compliance`; disclaimer band added |
| Home chat prompts | `components/home/HomeChatBar.tsx`, `components/chat/TypewriterPrompt.tsx` | Ask about Everest… | Neutral education prompts (2026-07-24) |
| Home related content | `lib/related-content.ts` | Everest yield education | Frozen to factual investments / educational calculators / needs analysis |
| Investments tools | `components/investments/InvestmentsPageView.tsx` | 009–013, Everest hub, Amethyst section, yield shelf | Removed from live page (2026-07-24); educational 016/017 + `/calculators` only |
| Investments related content | `lib/related-content.ts` | Everest about + Asset 013 | Frozen to retirement-planning / calculators / regulatory-compliance / contact |
| Insights handoffs | `components/insights/InsightsHubPageView.tsx` | estate duty, underinsurance | Pointed to `/calculators` |
| Retirement planning | `components/retirement-planning/RetirementPlanningPageView.tsx` | `/everest-wealth/about` | Pointed to `/investments` |
| Method toolkit list | `lib/retirement-gap-method/content.ts` | Asset 014 | Pointed to `/calculators` |
| Footer resources | `lib/site-navigation.ts` | Everest Wealth / Understanding Everest | Removed from FOOTER_RESOURCES |
| FAQ secondary CTA | `components/seo/VisibleFaqSection.tsx` | `/everest-wealth/about` | Pointed to `/investments` |
| Calculator terminal CTA | `components/calculators/AssetCalculatorPageView.tsx` | `/everest-wealth` | Pointed to `/investments` |
| Semigration insight | `app/(content)/insights/semigration-retirement/page.tsx` | Amethyst / living annuity | Pointed to `/calculators` |
| Estate hub tools | `components/estate-planning/EstatePlanningPageView.tsx` | 007, 008 | Pointed to `/calculators` |
| Insurance hub tool | `components/insurance/InsuranceHubPageView.tsx` | 015 | Pointed to `/calculators` |
| Insurance related content | `lib/related-content.ts` (`/insurance`) | free coverage audit CTA | Softened Discovery copy; contact needs-analysis |
| Insights related content | `lib/related-content.ts` (`/insights`) | Amethyst mention | Softened to educational retirement / calculators framing |
| Quiz results | `components/quiz/QuizPageClient.tsx` | Everest / Amethyst / product Assets | Educational hubs + live educational calcs + contact only |
| Discovery Health tool | `components/solutions/DiscoveryHealthPageView.tsx` | 015 | Pointed to `/calculators` |
| Related content (life) | `lib/related-content.ts` | underinsurance calculator | Pointed to `/calculators` |
| RelatedContent render | `components/seo/RelatedContent.tsx` | any restricted href | Sanitized via `containmentSafePublicHref` |
| Calculator journey links | `components/calculators/AssetCalculatorPageView.tsx` | 013/014 etc. | Sanitized via `containmentSafePublicHref`; 2026-07-24 live journeys rewritten off restricted product calcs |
| Calculator page disclaimer | `components/calculators/AssetCalculatorPageView.tsx` | n/a | Added Section 1(3)(a) band on every educational calculator page (2026-07-24) |
| Calculators hub | `app/(content)/calculators/page.tsx` | Toolkit catalogue | Holding page + FAIS disclaimer (2026-07-24) |
| llms.txt | `public/llms.txt` | Everest + 007–015 product URLs | Removed; educational only |
| Sitemap | `app/sitemap.ts` | All restricted calc + Everest hubs | Excluded |
| Legacy redirects | `next.config.ts` | Product/legislation calcs | Temporary `permanent: false` → `/calculators` |

### External / ops freeze (manual — not in this repo)

Record and pause promotion outside the codebase:

- YouTube descriptions linking to restricted URLs
- Social media buttons / posts
- Email automation sequences
- WhatsApp automation templates that deep-link product calculators
- Lead magnets / ads / remarketing that promote restricted URLs

WhatsApp helper (`lib/whatsapp.ts`) has no hard-coded product calculator URLs.
