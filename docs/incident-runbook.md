# Incident runbook (AS Brokers)

Concise ops checklist for production incidents on https://www.asbrokers.co.za.

## Severity (use one)

| Level | Meaning | Example |
| --- | --- | --- |
| SEV1 | Site down / auth broken for all staff or clients | Vercel outage, bad deploy 5xx |
| SEV2 | Major feature broken | CRM login, Blog Studio publish, contact form |
| SEV3 | Degraded / SEO / analytics | CSP reports spike, sitemap error, GA missing |

## First 15 minutes

1. Confirm scope: marketing only vs `/crm` / `/portal` / `/studio`.
2. Check [Vercel dashboard](https://vercel.com) → project → Deployments + Runtime Logs.
3. Check Supabase status if CRM/portal/auth involved.
4. Do **not** rotate secrets or force-push unless owner-approved.

## Rollback

1. Vercel → previous healthy production deployment → Promote.
2. Re-verify: `/`, `/contact`, `/login` (if auth), one CRM route if staff-impacting.
3. Note deployment ID and time in the weekly scorecard / entity log as needed.

## Contacts (fill real numbers later)

| Role | Name | Channel |
| --- | --- | --- |
| Owner / FSP | Albert Schuurman | TBD |
| Co-owner | Johnny Farinha | TBD |
| Tech | Cursor / deploy operator | This repo + Vercel |

## Post-incident

- What broke, when, blast radius.
- Fix or rollback ID.
- Follow-up ticket (CSP enforce, env, RLS, etc.).
- No fake root-cause narratives — leave blank until known.
