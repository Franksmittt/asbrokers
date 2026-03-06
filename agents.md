# AS Brokers - Project Memory Bank

Primary long-term memory for Cursor AI and developers.

## Tech Stack
- Next.js 15 (App Router), React 19, TypeScript (strict), Tailwind CSS, Framer Motion, Recharts, React Hook Form, Zod.
- Future: Vercel AI SDK 3.0, HubSpot CRM.

## Business Context
- AS Brokers CC. FSP 17273. Category 1.8 - Everest Wealth distribution.
- Everest: 12.8% Strategic Income (R100k min, 10% bonus at month 60), 14.2% Onyx (R100k min, no bonus), 14.5% Growth (R100k min, compound only), Amethyst Living Annuity (drawdown 2.5%-17.5%).
- Tax: 20% DWT on dividends; marginal income tax on interest. SARS 2026/27 brackets in Income Tax and Amethyst calcs.
- Estate: R3.5m abatement, 20%/25% duty, executor 3.5%+VAT. Donations R100k/R200k per year.

## Architecture
- Default RSC; 'use client' only for forms, calculators, animations.
- Server Actions for all data mutations (forms, CRM). Zod at boundaries.
- Glassmorphism: bg-white/5, backdrop-blur-xl, ring-1 ring-white/10. Respect prefers-reduced-motion.

## Liquidity Warning (Everest Voluntary)
- 120-day notice; 15% early exit penalty may apply. Show in UI.

See app/calculators/CONTEXT.md for formula details. ROADMAP.md for phases.
