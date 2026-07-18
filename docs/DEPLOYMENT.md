# AS Brokers — Deployment & Search Console

## Pre-deploy CI gates

| Gate | Command | Notes |
|------|---------|-------|
| Build | `npm run build` | Required |
| WCAG 2.1 AA | `npm run test:a11y` | Playwright + axe-core |
| Visual regression | `npm run test:visual` | Baselines from Linux Docker CI |
| Lighthouse | `npm run test:lighthouse` | Run on **Linux CI** (local Windows scores are flaky) |
| SEO / WRS | `npm run test:seo` | Googlebot UA, payload, hydration, SSR |

## Google Search Console setup (post-launch)

### 1. Verify domain property

1. Open [Google Search Console](https://search.google.com/search-console).
2. Add property type **URL prefix**: `https://www.asbrokers.co.za/`
3. Verify via DNS TXT (recommended) or HTML file upload.
4. Confirm `NEXT_PUBLIC_SITE_URL=https://www.asbrokers.co.za` in production env.

### 2. Submit sitemap

- Sitemap URL: **https://www.asbrokers.co.za/sitemap.xml**
- Search Console → Sitemaps → enter `sitemap.xml` → Submit.

### 3. Request indexing (launch week)

Request indexing for:

1. `https://www.asbrokers.co.za/`
2. `https://www.asbrokers.co.za/contact`
3. `https://www.asbrokers.co.za/calculators`
4. `https://www.asbrokers.co.za/about`
5. `https://www.asbrokers.co.za/everest-wealth`
6. `https://www.asbrokers.co.za/solutions`

### 4. Weekly monitoring

- **Coverage** — fix “Excluded” / “Error” URLs.
- **Core Web Vitals** — mobile field + lab; investigate regressions.
- **URL Inspection** — spot-check canonical parity after template changes.

### 5. Automated canonical check (optional)

Requires a service account with Search Console API access on the GSC property.

```bash
export GSC_PROPERTY="https://www.asbrokers.co.za/"
export GOOGLE_APPLICATION_CREDENTIALS="/path/to/service-account.json"
# optional: export GSC_SAMPLE_URLS="https://www.asbrokers.co.za/,https://www.asbrokers.co.za/contact"

node scripts/gsc-canonical-check.mjs
```

Exits **0** if credentials are absent (local dev skip). Exits **1** if `userCanonical` ≠ `googleCanonical` on any sample URL.

## Master verification (Phase 12)

```bash
npm run test:master
```

Runs lint, TypeScript, build, B2A token check, static SEO audit, a11y, SEO/WRS, visual regression. **Lighthouse runs on Linux CI only** (skipped locally on Windows).

CI job: `master-audit` (aggregates all gates on Ubuntu).

## Pre-launch checklist

### Environment variables (production)

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | `https://www.asbrokers.co.za` — canonical origin |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Analytics (optional; consent-gated) |
| Supabase URL + anon key | Auth, RLS, storage |
| `RESEND_API_KEY` | Contact form email |
| `GSC_PROPERTY` + `GOOGLE_APPLICATION_CREDENTIALS` | Post-deploy canonical check |

### Pre-deploy automated gates

- [ ] `npm run test:master` passes on Linux CI (`master-audit` job green)
- [ ] `accessibility`, `visual-regression`, `lighthouse`, `seo-wrs` jobs green
- [ ] Lighthouse homepage performance ≥ 90 (CI artifact / `lhci-reports/`)

### Supabase RLS smoke (manual)

- [ ] Client role cannot read other clients' rows
- [ ] Staff sees assigned clients only; admin sees all
- [ ] Storage policies match POPIA expectations


### Search Console (launch week)

- [ ] Domain property verified
- [ ] Sitemap submitted: `https://www.asbrokers.co.za/sitemap.xml`
- [ ] Request indexing: `/`, `/contact`, `/calculators`, `/about`, `/everest-wealth`, `/solutions`
- [ ] `npm run gsc:canonical` after deploy (service account)

### Post-launch monitoring (weekly)

- [ ] GSC Coverage + Core Web Vitals
- [ ] `npm run seo:audit` (full suite with `--live` after deploy)

## Phase 9 note (Lighthouse)

Local Lighthouse on Windows often scores below Linux CI due to CPU throttling calibration. Treat **GitHub Actions `lighthouse` job** as the deploy gate for performance ≥ 90 on `/` and `/contact`.
