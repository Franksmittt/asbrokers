# Entity `sameAs` TODO

Organization / LocalBusiness JSON-LD currently ships `sameAs: []` because no verified public profile URLs exist in the marketing site (nav, footer, about, or site constants).

Do **not** invent URLs. When Albert / Johnny confirm live profiles, add the **same** absolute HTTPS URLs to `sameAs` on **both** `buildOrganizationNode` and `buildLocalBusinessNode` in `lib/seo.ts`.

## Profiles to confirm and collect

| Platform | Needed URL | Status |
| --- | --- | --- |
| LinkedIn (company) | `https://www.linkedin.com/company/...` | Missing |
| Facebook (page) | `https://www.facebook.com/...` | Missing |
| Instagram | `https://www.instagram.com/...` | Missing |
| YouTube | `https://www.youtube.com/@...` or `/channel/...` | Missing |
| X / Twitter | `https://x.com/...` | Missing |
| Google Business Profile | Maps / GBP share URL | Missing |
| FSCA / other official directories | Only if a stable public entity page exists | Missing |

## Acceptance when ready

1. Owner confirms each URL is live and branded as AS Brokers CC (or Albert/Johnny as Person entities if preferred).
2. Update `sameAs` arrays in `lib/seo.ts` only (no invented placeholders).
3. Re-run schema orphan / SEO verify scripts.
4. Delete or mark this file done.
