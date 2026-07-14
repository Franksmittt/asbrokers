# AS Brokers — project handover (14 Jul 2026)

Live site: **https://www.asbrokers.co.za**  
Repo: `main` → Vercel production.

## What is live and verified

| Area | Status |
|---|---|
| Marketing pages + calculators (ASSET 001–017) | Working — 17/17 embeds + landing pages |
| Contact + newsletter → CRM leads + Resend | Working (local QA 14 Jul; needs `DATABASE_URL` + Resend on Vercel) |
| Blog Studio `/studio/blog` | Working — drafts, calculator embeds, Insights publish path |
| CRM `/login` PIN → leads / kanban | Working — notifications bell shows **New leads** |
| Internal links | 0×404 on 57-page crawl |
| SEO Phase 1 | Complete per `ROADMAP.md` |

QA evidence: `docs/QA-VERIFICATION-SUMMARY.md`. Albert calculator audits: `docs/CALC-AUDIT-001-006.*`, `docs/CALC-AUDIT-007-017.*`.

## Staff access

| Surface | URL | Auth |
|---|---|---|
| CRM | `/login` → `/crm` | Unique 5-digit PIN per person: Albert (superuser), Developer (superuser), Petro (manager), Johnny (staff). PINs in Vercel env (Developer default `85879`). |
| Blog Studio | `/studio/blog/login` | `CLIENT_STUDIO_PASSWORD` |
| Client portal | `/portal` | **Prototype only** — mock data; “Client portal” nav currently goes to CRM PIN login |

## Production env checklist (Vercel)

Critical:

- `DATABASE_URL` — Postgres (forms, CRM, Studio posts)
- `RESEND_API_KEY`, `RESEND_FROM`, `RESEND_NOTIFY_EMAIL`
- `GOOGLE_GENERATIVE_AI_API_KEY` — `/chat` + RAG (not OpenAI)
- `CLIENT_STUDIO_PASSWORD`, `CLIENT_STUDIO_SESSION_SECRET`
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_APP_URL`, `NEXT_PUBLIC_SITE_URL` → `https://www.asbrokers.co.za`
- Override CRM PINs: `CRM_SUPERUSER_PIN`, `CRM_TEST_PIN_JOHNNY`, `CRM_TEST_PIN_PETRO`, `CRM_PIN_SESSION_SECRET`

Optional integrations:

- HubSpot (`HUBSPOT_ACCESS_TOKEN`) — sync is non-blocking if unset
- WhatsApp Cloud API vars — CRM inbox outbound
- Trigger.dev — PDF-after-contact
- GA4 / Hotjar — after cookie consent

Full names also in `.env.example`. **Ignore stale OpenAI references in older `BACKEND.md` sections** — stack uses Gemini.

## Out of scope / document for the client (not launch blockers)

1. **Client portal** — mock UI; message send / document upload are prototypes.
2. **Paid R299 planning guides** — “coming soon”, no checkout.
3. **HubSpot custom properties** — create `platform_lead_score`, `financial_inquiry_topic`, `financial_capital_input` if sync is required.
4. **Entity `sameAs` social/GBP URLs** — `docs/entity-sameas-todo.md`.
5. **Rolls-Royce CRM vision** (portal RLS, Everest API, PWA) — `docs/CRM_ROLLS_ROYCE.md` / Phase 2+.

## Multi-step funnels

Healthy Retirement, Legacy Checklist, Business Risk, Retirement Survival are **assessments**, not one-field forms. Completing them writes to CRM + dedicated admin lists under CRM → Funnel exports. Smoke-clicking “Continue” is not a valid test.

## Local QA commands

```bash
npm run build && npm run start -- -p 3120
node scripts/qa-smoke-e2e.mjs http://127.0.0.1:3120
node scripts/qa-forms-crm-studio.mjs http://127.0.0.1:3120
node scripts/qa-notifications.mjs
npm run seo:audit:links   # needs Python 3
```

## Deploy note

Latest handoff commits on `main` include CRM notifications + footer discoverability for previously orphan pages. Confirm Vercel deployment is **Ready** after push before client demo.
