# Task 2 — Safe hardening (implemented)

Date: 2026-07-13  
Scope: `htmlLimitedBots`, security headers (CSP **Report-Only**), Perfect-10 ops stubs. No layout / CRM / Studio / font / FAQ / analytics ID changes.

## Files changed

| File | Action |
| --- | --- |
| `next.config.ts` | Added `htmlLimitedBots` full-union regex; `headers()` security + CSP-RO |
| `docs/ASBROKERS-PERFECT-10-AUDIT.txt` | Moved from repo root (content preserved) |
| `docs/entity-sameas-todo.md` | Clarified: same URLs on Organization **and** LocalBusiness |
| `docs/incident-runbook.md` | **New** stub |
| `docs/post-launch-90-day.md` | **New** stub |
| `docs/entity-verification-log.md` | **New** (NAP/FSP/domain from `lib/seo.ts`) |
| `docs/weekly-scorecard-template.md` | **New** (blank measured fields only) |
| `docs/TASK2-HARDENING.md` | **New** — this proof |

## htmlLimitedBots regex

Custom config **replaces** Next defaults. Pattern is Next 15.5 `HTML_LIMITED_BOT_UA_RE` **plus** explicit `Googlebot` / `bingbot` / `Applebot` and answer-engine UAs aligned with `lib/crawler-policy.ts` allows:

```
/[\w-]+-Google|Google-[\w-]+|Googlebot|Chrome-Lighthouse|Slurp|DuckDuckBot|baiduspider|yandex|sogou|bitlybot|tumblr|vkShare|quora link preview|redditbot|ia_archiver|Bingbot|BingPreview|bingbot|applebot|Applebot|facebookexternalhit|facebookcatalog|Twitterbot|LinkedInBot|Slackbot|Discordbot|WhatsApp|SkypeUriPreview|Yeti|googleweblight|OAI-SearchBot|ChatGPT-User|PerplexityBot|Claude-Web|anthropic-ai|Bytespider|meta-externalagent/i
```

Training scrapers (`GPTBot`, `ClaudeBot`, `CCBot`) remain edge-blocked via middleware / robots — not relied on for metadata streaming.

## Security headers (all `/:path*`)

| Header | Value |
| --- | --- |
| `X-Frame-Options` | `DENY` |
| `X-Content-Type-Options` | `nosniff` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()` |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` (HTTPS prod www) |
| `Content-Security-Policy-Report-Only` | See below — **not** enforcing |

### CSP Report-Only — what it allows / needs next

**Allows (script / connect / frame themes):**

- Self + `'unsafe-inline'` / `'unsafe-eval'` (Next / Sanity studio practicality while RO)
- Google Analytics / Tag Manager hosts
- Hotjar (`static.hotjar.com`, `script.hotjar.com`, `*.hotjar.com` / `*.hotjar.io`, `vars.hotjar.com`, Hotjar WSS)
- Sanity CDN / API / studio hosts
- Supabase HTTPS + WSS
- Vercel live / va scripts

**Not done yet (next hardening pass):**

1. Add a `report-uri` / `report-to` endpoint and collect real violations in prod.
2. Remove `'unsafe-eval'` / tighten `'unsafe-inline'` once hashes or nonces are planned.
3. Flip to enforcing `Content-Security-Policy` only after Hotjar, GA, Sanity Studio, and CRM show clean reports.
4. Consider path-specific CSP for `/studio` vs marketing if studio needs broader sources.

Enforcing CSP was deliberately **not** enabled so Hotjar/GA/Sanity are not broken.

## Human decisions respected

- `/chat` + `/quiz`: left indexable (no Task 2 change).
- `sameAs`: still empty; todo doc updated for dual Organization + LocalBusiness.
- Audit txt kept under `docs/`.

## Confirmation: layout / CRM / Studio untouched

- No `*PageView.tsx`, Tailwind, spacing, typography, `next/font`, FAQ UI, or RSC hub conversions.
- No CRM / Blog Studio / portal / DB / Supabase schema / Sanity schema / Trigger / WhatsApp / auth changes.
- Middleware auth/crawler logic unchanged (headers live in `next.config.ts` only).
