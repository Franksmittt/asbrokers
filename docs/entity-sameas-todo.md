# Entity `sameAs` — owner TODO

**Status:** Organization / LocalBusiness JSON-LD currently emit `sameAs: []`.

Do **not** invent URLs. Owner must supply only verified profiles:

| Profile | URL (paste when live) | Notes |
|---|---|---|
| Google Business Profile | | Prefer canonical maps URL |
| LinkedIn (company) | | |
| Facebook | | |
| X / Twitter | | Optional |
| Other directory (FSCA public register link) | | If stable permalink exists |

Once URLs are confirmed, add them to `sameAs` in `lib/seo.ts` (`buildOrganizationNode` / LocalBusiness) in one PR.
