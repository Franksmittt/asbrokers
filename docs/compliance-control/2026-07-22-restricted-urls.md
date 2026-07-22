# Restricted URLs — containment 2026-07-22

All paths below return **HTTP 302** to `/calculators` via middleware (`lib/compliance/containment.ts` + `middleware.ts`).  
`X-Robots-Tag: noindex, nofollow` is set on the redirect response.  
**Not** permanent 301.

## Calculator pages

| Asset | Restricted URL(s) |
|-------|-------------------|
| 006 | `/calculators/asset-006-income-tax`, `/income-tax-calculator` (legacy → holding) |
| 007 | `/calculators/estate-duty-calculator`, `/calculators/asset-007-estate-duty`, `/estate-duty-calculator` |
| 008 | `/calculators/asset-008-estate-reduction`, `/annual-estate-reduction-strategy` |
| 009 | `/calculators/asset-009-everest-142-income`, `/immediate-higher-income-calculator` |
| 010 | `/calculators/asset-010-everest-128-income`, `/everest-128-product` |
| 011 | `/calculators/asset-011-everest-128-vs-142` |
| 012 | `/calculators/asset-012-strategic-growth`, `/everest-strategic-growth-145` |
| 013 | `/calculators/asset-013-everest-income-vs-growth` |
| 014 | `/calculators/asset-014-living-annuity` |
| 015 | `/calculators/underinsurance-calculator`, `/calculators/asset-015-average-clause`, `/underinsurance-calculator`, `/how-underinsurance-reduces-your-claim` |

## Embeds

| File |
|------|
| `/embed-calculators/asset-006-income-tax.html` |
| `/embed-calculators/asset-007-estate-duty.html` |
| `/embed-calculators/asset-008-estate-reduction.html` |
| `/embed-calculators/asset-009-everest-142-income.html` |
| `/embed-calculators/asset-010-everest-128-income.html` |
| `/embed-calculators/asset-011-everest-128-vs-142.html` |
| `/embed-calculators/asset-012-strategic-growth.html` |
| `/embed-calculators/asset-013-everest-income-vs-growth.html` |
| `/embed-calculators/asset-014-living-annuity.html` |
| `/embed-calculators/asset-015-average-clause.html` |
| `/embed-calculators/amethyst-living-annuity-illustration.html` |

## Product / Everest surfaces

| Path |
|------|
| `/everest-wealth` |
| `/everest-wealth/about` |
| `/everest-amethyst-living-annuity` |
| `/everest-128-product` |
| `/everest-strategic-growth-145` |
| `/immediate-higher-income-calculator` |

## Still public (with review notices)

| Asset | URL |
|-------|-----|
| 001 | `/calculators/asset-001-retirement-growth` |
| 002 | `/calculators/asset-002-retirement-reality-check` |
| 003 | `/calculators/asset-003-retirement-premium` |
| 004 | `/calculators/asset-004-life-of-capital` |
| 005 | `/calculators/asset-005-future-value` |
| 016 | `/calculators/asset-016-growth-comparison` |
| 017 | `/calculators/goal-engineering-planner` (members gate unchanged) |
| Holding | `/calculators` |
