# Post-launch 90-day ops plan

Operational plan for https://www.asbrokers.co.za after launch. Not wellness or marketing copy.

## Days 0–7 (stabilize)

- [ ] Confirm production env: `NEXT_PUBLIC_SITE_URL=https://www.asbrokers.co.za`
- [ ] GSC: sitemap `https://www.asbrokers.co.za/sitemap.xml` submitted
- [ ] Spot-check canonicals on home, contact, retirement, insurance, estate, insights
- [ ] Cookie consent → Accept All → confirm GA/Hotjar load (no enforcing CSP yet)
- [ ] CRM + Blog Studio smoke: login, one lead view, one draft publish
- [ ] Review CSP Report-Only console / future report endpoint (see TASK2-HARDENING.md)

## Days 8–30 (measure)

- [ ] Weekly GSC coverage + CWV glance (no invented targets)
- [ ] Review 404s / 410s from Vercel logs
- [ ] Confirm `/manage-cookies` stays noindex; `/chat` + `/quiz` still indexable (lead magnets)
- [ ] Collect owner social / GBP URLs → `docs/entity-sameas-todo.md`

## Days 31–60 (harden)

- [ ] Decide CSP enforce vs stay Report-Only based on real violation samples
- [ ] Fill `docs/entity-verification-log.md` NAP checks against live SERP/GBP
- [ ] Re-run `npm run seo:audit` (or CI equivalent) once after major content freeze

## Days 61–90 (review)

- [ ] Owner review of scorecard trends (fill real numbers only)
- [ ] Decide next Perfect-10 batch (fonts / RSC hubs / FAQ policy) — separate tasks
- [ ] Archive or update this checklist with completed dates

## Explicit non-goals (90 days)

- Invented conversion % or AUM targets
- Enforcing CSP before Hotjar/GA/Sanity are clean in reports
- noindex on `/chat` or `/quiz` without a new owner decision
