# Calculator Audit: ASSET 007–017

**Source docs (Google Doc text exports):**
1. `agent-tools/9bd64391-52a1-4edc-ab88-668373d1b709.txt` — ASSET 007–012
2. `agent-tools/29f8b6e5-84c6-46aa-8db1-554e07bc600e.txt` — ASSET 013–017

**Embeds:** `public/embed-calculators/asset-007-*.html` … `asset-017-*.html`

**Method:** Full JS function bodies normalized and compared (whitespace/quotes normalized). CSS tokens, defaults, CTA/error/disclaimer presence, and tables checked against doc markup.

**Executive count vs Albert’s Google Docs:** **11 MATCH** · **0 REWRITE**

(Compliance note only: ASSET 008 uses Albert’s R150k/R300k donation options; `AGENTS.md` / SARS annual exemption wording is R100k/R200k — flag for Albert, do not “fix” without his sign-off.)

---

## ASSET 007 — Estate Duty & Executor Fee Calculator

| Field | Value |
|---|---|
| Doc title | AS Brokers Estate Duty & Executor Fee Calculator |
| Root id | `#asb-estate-duty-calculator` |
| Embed | `public/embed-calculators/asset-007-estate-duty.html` |
| Verdict | **MATCH** |
| Priority | — |

### Layout / style
- White card (`#ffffff`), dark inputs `#2f3336`, button/main results `#111827`, 2-col `.asb-grid`, CTA + error — **aligned with doc**.
- Defaults: gross `5000000`, liabilities `500000`, spouse `0`.

### Formulas / constants (doc JS ~L284–389; embed ~L279–384)
| Constant / formula | Doc | Embed |
|---|---|---|
| Section 4A abatement | `3500000` | same |
| Duty ≤ R30m | `dutiable × 0.20` | same |
| Duty > R30m | `30m×0.20 + (excess)×0.25` | same |
| Net before abatement | `max(0, gross − liabilities − spouse)` | same |
| Executor fee | `gross × 0.035` + VAT `× 0.15` | same |
| Total cash need | duty + executor fees | same |

Functions: `estateFormatRand`, `estateGetNumber`, `calculateEstateDutyAmount`, `calculateEstateDuty` — **all MATCH**.

### Missing UI
None vs doc (CTA, disclaimer, error, summary present).

---

## ASSET 008 — Estate Reduction Strategy Calculator

| Field | Value |
|---|---|
| Doc title | AS Brokers Estate Reduction Strategy Calculator |
| Root id | `#asb-estate-reduction-calculator` |
| Embed | `public/embed-calculators/asset-008-estate-reduction.html` |
| Verdict | **MATCH** (Albert’s doc) |
| Priority | Compliance note only |

### Layout / style
- Matches standard white-card system; select styled dark (`#2f3336`); hover `#374151` present in both.
- Donation options in both doc and embed: **Single R150,000 / Couple R300,000**.

### Formulas / constants (doc ~L686–793; embed ~L288–395)
| Constant / formula | Doc | Embed |
|---|---|---|
| Period | `plannedAge − currentAge` | same |
| Total donations | `annual × period` | same |
| Estate duty saving | `totalDonations × 0.20` | same |
| Trust FV loop | grow then add donation each year | same |
| Couple label | `annualDonation === 300000` | same |

Functions: all **MATCH** vs Google Doc.

### Compliance note (not a doc drift)
Albert’s Google Doc and the live embed both use **R150k / R300k**. `AGENTS.md` cites SARS annual donations tax exemption **R100k / R200k**. Leave as Albert specified until he confirms a change.

### Missing UI
None vs doc.

---

## ASSET 009 — 14.2% Income Calculator

| Field | Value |
|---|---|
| Doc title | AS Brokers 14.2% Income Calculator |
| Root id | `#asb-income-142-calculator` |
| Embed | `public/embed-calculators/asset-009-everest-142-income.html` |
| Verdict | **MATCH** |
| Priority | — |

### Layout / style
Standard white card; dark inputs; CTA; error — match.

### Formulas / constants (doc ~L1084–1180; embed script)
| Formula | Doc / Embed |
|---|---|
| Defaults | amount `1000000`, return `14.2`, DWT `20` |
| Gross annual | `amount × returnRate` |
| Tax | `gross × dividendTaxRate` |
| Net annual / monthly | gross − tax; `/ 12` |
| Net return rate | `returnRate × (1 − dividendTaxRate)` |
| Min investment gate | **none** (unlike 012/013) |

Functions: all **MATCH**.

### Missing UI
None vs doc. Note: no R100k minimum validation in either source.

---

## ASSET 010 — 12.8% Income Calculator

| Field | Value |
|---|---|
| Doc title | AS Brokers 12.8% Income Calculator |
| Root id | `#asb-income-128-calculator` |
| Embed | `public/embed-calculators/asset-010-everest-128-income.html` |
| Verdict | **MATCH** |
| Priority | — |

### Formulas / constants (doc ~L1502–1633)
| Formula | Doc / Embed |
|---|---|
| Defaults | `1000000`, return `12.8`, DWT `20`, bonus `10` |
| Income | same net-of-DWT path as 009 |
| Gross / net bonus | `amount × bonusRate`; tax at DWT; net = gross − tax |
| 5-year total | `(netAnnual × 5) + netBonus` |
| Return on capital | `totalFiveYearNetIncome / amount` |
| Net return rate | `returnRate × (1 − dividendTaxRate)` |

Functions: all **MATCH**.

### Missing UI
None. No R100k min gate in doc or embed.

---

## ASSET 011 — 12.8% vs 14.2% Income Comparison

| Field | Value |
|---|---|
| Doc title | AS Brokers 12.8% vs 14.2% Income Comparison Calculator |
| Root id | `#asb-income-comparison-calculator` |
| Embed | `public/embed-calculators/asset-011-everest-128-vs-142.html` |
| Verdict | **MATCH** |
| Priority | — |

### Formulas / constants (doc ~L2010–2172)
| Formula | Doc / Embed |
|---|---|
| Defaults | amount `1000000`, DWT `20`, A `12.8`, B `14.2`, bonusA `10` |
| Per option | gross → DWT → net annual/monthly; 5y income = net×5 |
| Bonus A only | gross/tax/net; `totalFiveYearA = 5yIncomeA + netBonusA`; B has no bonus |
| Winners | `>` comparisons (ties → Option B) |
| Diffs | `Math.abs` monthly and 5y |

Comparison table + CTA present. Functions: all **MATCH**.

---

## ASSET 012 — Strategic Growth / Five-Year Maturity

| Field | Value |
|---|---|
| Doc title | Strategic Growth / Five-Year Maturity Value Calculator |
| Root id | `#asb-strategic-growth-calculator` |
| Embed | `public/embed-calculators/asset-012-strategic-growth.html` |
| Verdict | **MATCH** |
| Priority | **LOW** (cosmetic markup only) |

### Formulas / constants (doc ~L2519–2619; embed ~L345–435)
| Formula | Doc / Embed |
|---|---|
| Min investment | `< 100000` → error |
| Defaults | `1000000`, return `14.5`, years `5`, DWT `20` |
| Gross maturity | `amount × (1+r)^years` |
| Tax on growth | `(grossValue − amount) × DWT` |
| Projected value | `amount + netGrowth` |
| Year table | gross `amount × (1+r)^year` and year growth (**pre-DWT**) |

Core math **identical**.

### Layout deltas (non-formula)
Google Doc export lost table cell tags; embed correctly uses `<td>…</td>` and wraps tax summary lines in `<strong>` / `<br>`. Presentation-only.

### Missing UI
None vs intended doc (CTA includes liquidity note).

---

## ASSET 013 — Everest Income vs Growth

| Field | Value |
|---|---|
| Doc title | Everest Income vs Growth Calculator |
| Root id | `#asb-everest-strategy-comparison-calculator` |
| Embed | `public/embed-calculators/asset-013-everest-income-vs-growth.html` |
| Verdict | **MATCH** |
| Priority | — |

### Formulas / constants (doc ~L389–579)
| Path | Formula |
|---|---|
| Shared | min `100000`; defaults amount `1m`, DWT `20`, years `5`, rates `12.8` / bonus `10` / `14.2` / `14.5` |
| 12.8 income | net income × years; bonus if `years >= 5`; total = capital + income + netBonus |
| 14.2 income | net income × years; no bonus; total = capital + income |
| 14.5 growth | compound gross; DWT on growth only; maturity = capital + netGrowth |
| Winners | sort monthly / total options descending |

Functions: all **MATCH**. Comparison table + CTA present. Static `R 0` for 14.2 bonus cell matches doc.

---

## ASSET 014 — Living Annuity

| Field | Value |
|---|---|
| Doc title | Living Annuity (Everest-style) |
| Root id | `#asb-everest-living-annuity-calculator` |
| Embed | `public/embed-calculators/asset-014-living-annuity.html` |
| Verdict | **MATCH** |
| Priority | — |

### Formulas / constants (doc ~L917–1071)
| Formula | Doc / Embed |
|---|---|
| Drawdown band | `0.025`–`0.175` (options 2.5% … 17.5%) |
| Default return | `12.8`; inflation dividend default `9` |
| Income | `capital × drawdown`; monthly `/12` |
| Surplus | `returnAmount − income`; `% = return − drawdown` |
| Inflation dividend | `capital × inflationDividendRate` |
| 5-year | `annualIncome × 5`; total = that + inflation dividend amount |
| PIT | **not** calculated (stated in summary) |

Functions: all **MATCH**. CTA / error / disclaimer present.

---

## ASSET 015 — Average Clause Calculator

| Field | Value |
|---|---|
| Doc title | Average Clause Calculator |
| Root id | `.asb-average-calculator` / `.asb-calc-card` (no `#asb-…` white-card id) |
| Embed | `public/embed-calculators/asset-015-average-clause.html` |
| Verdict | **MATCH** |
| Priority | — |

### Layout / style
**Intentional variant theme** (dark glass `#1f2a2a`, teal/gold accents) — same in doc and embed. Live calc on `input` (no button / no `.asb-error` / no `.asb-cta`) — matches doc.

### Formulas (doc ~L1308–1352; embed ~L171–197)
```
averagePercentage = min(sumInsured / actualValue, 1)
claimPayable = claimAmount × averagePercentage
uninsuredPortion = max(claimAmount − claimPayable, 0)
```
`formatRand` uses `R` + `en-ZA` with commas → spaces. **MATCH**.

Defaults: sum `1000000`, actual `2000000`, claim `1000000`.

---

## ASSET 016 — Growth Rate Comparison (“Power of Growth”)

| Field | Value |
|---|---|
| Doc title | The Power of Growth Calculator |
| Root id | `.asb-growth-calculator` |
| Embed | `public/embed-calculators/asset-016-growth-comparison.html` |
| Verdict | **MATCH** |
| Priority | — |

### Layout / style
**Variant theme** — cream card `#f8f7ef`, blue gradient header `#0057d9→#008cff`, light inputs `#fbfaf5` (not dark `#2f3336`). Matches doc design family, not the Everest white-card family.

### Formulas (doc ~L1619–1674; embed ~L191–228)
| Formula | Doc / Embed |
|---|---|
| Monthly rate | `(1 + annualGrowth)^(1/12) − 1` |
| Loop | each month: grow balance, then add contribution; after each year bump contribution by `annualIncrease` |
| Growth earned | `balance − totalInvested` |
| Live update | `input` + `change` listeners |

Defaults: initial `100000`, years `10`, monthly `500`, increases/growth `10`. Currency options R/$/€/£/¥/none. **MATCH**.

---

## ASSET 017 — Personal Goal Setting Calculator

| Field | Value |
|---|---|
| Doc title | AS Brokers Personal Goal Growth Calculator |
| Root id | `#asb-goal-calculator` |
| Embed | `public/embed-calculators/asset-017-personal-goal.html` |
| Verdict | **MATCH** |
| Priority | **LOW** (table markup polish only) |

### Formulas (doc ~L1975–2180; embed ~L224–360)
| Formula | Doc / Embed |
|---|---|
| Contribution schedule | `contribution × (1+annualIncrease)^floor((month−1)/12)` |
| Month order | add contribution, then apply `value × monthlyRate` growth |
| Required rate | binary search 200 iters, low `-0.99` … high `10` |
| Annual equiv | `(1+monthlyRate)^12 − 1` |
| Growth created | `final − start − totalContributions` |
| CSV download | same columns |

Defaults: start `27`, target `12000000`, months `72`, contribution `0`, increase `0`, manual rate `19.7959`.

### Layout deltas
`renderTable` in embed uses proper `<td>` cells; Google Doc export had whitespace-only `innerHTML` fragments. Formula logic **MATCH**; embed markup is the correct implementation of the intended table.

Blue button `#0057ff` (not `#111827`) — matches this asset’s doc theme.

---

## Cross-cutting notes

1. **Design families in the docs themselves**
   - 007–014: white card + dark inputs `#2f3336` + button `#111827`
   - 015: dark glass insurance card
   - 016: blue/cream “Power of Growth”
   - 017: white cards + blue CTA `#0057ff`

2. **R100k minimum** enforced only where the docs say so (012, 013). Income calculators 009–011 do not gate at R100k in either source.

3. **DWT default 20%** consistently across Everest income/growth calcs.

4. **Shared doc+embed compliance flag:** Asset 008 donation bands R150k/R300k vs SARS R100k/R200k — only HIGH open item.

---

## Verdict summary

| Asset | Verdict | Priority | Notes |
|---|---|---|---|
| 007 Estate Duty | MATCH | — | Abatement, duty bands, executor+VAT exact |
| 008 Estate Reduction | NEEDS UPDATE | HIGH | Matches doc, but donation constants wrong vs SARS/AGENTS |
| 009 14.2% Income | MATCH | — | |
| 010 12.8% Income | MATCH | — | Bonus + DWT path exact |
| 011 12.8 vs 14.2 | MATCH | — | |
| 012 Strategic Growth | MATCH | LOW | Markup polish only |
| 013 Income vs Growth | MATCH | — | Three-strategy math exact |
| 014 Living Annuity | MATCH | — | 2.5–17.5% band exact |
| 015 Average Clause | MATCH | — | Variant theme by design |
| 016 Growth Comparison | MATCH | — | Variant theme by design |
| 017 Personal Goal | MATCH | LOW | Table cell markup polish |

**Totals: 10 MATCH · 1 NEEDS UPDATE · 0 REWRITE**
