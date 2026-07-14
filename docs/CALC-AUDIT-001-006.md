# Calculator Audit: ASSET 001–006

**Source doc (Google Doc text export):**  
`agent-tools/e4f62fab-9261-4621-9f35-0a9bfc4bf758.txt` — Albert’s ASSET 001–006 export

**Embeds:** `public/embed-calculators/asset-001-*.html` … `asset-006-*.html`

**Method:**  
- Parsed each Asset section (CSS root ids, field labels/defaults, JS).  
- Normalized whitespace/punctuation and compared full JS function bodies doc ↔ embed.  
- Compared CSS property maps, labels, CTA/error/disclaimer presence, and SARS constants.  
- **Albert is source of truth** where he conflicts with `AGENTS.md` / `CONTEXT.md` (conflicts noted, not “fixed” away from Albert).

**Executive count vs Albert’s Google Doc:** **6 MATCH** · **0 NEEDS UPDATE** · **0 REWRITE**

**Files changed this audit:**  
- `public/embed-calculators/asset-004-life-of-capital.html` — label copy aligned to Albert (`— net after tax`).

---

## ASSET 001 — Retirement Growth Rate Calculator

| Field | Value |
|---|---|
| Doc title | AS Brokers Retirement Growth Rate Calculator |
| Root id | `#asb-growth-rate-calculator` |
| Embed | `public/embed-calculators/asset-001-retirement-growth.html` |
| Verdict | **MATCH** |
| Priority | LOW |

### Layout / style
- White card `#ffffff`, dark inputs `#2f3336`, button/main results `#111827`, 2-col `.asb-grid`, CTA link + error — **aligned with doc**.
- Defaults: ages `50` / `65` / `90`; income `40000`; inflation `6`; capital `500000`; savings `5000`; savings↑ `10`; growth in retirement `8`; income↑ retirement `6`.
- CTA: `/insights/retirement-growth-rate-calculator`.

### Formulas / constants
| Item | Doc / Embed |
|---|---|
| Future monthly income | `monthlyIncomeToday × (1+inflation)^yearsToRetirement` |
| Capital required | Monthly PV loop over retirement months at retirement growth |
| Projection | Monthly grow + escalated savings to retirement |
| Required growth | Binary search `low=-0.9999` … expand `high`, **140** iterations |
| Functions | `growthFormatRand`, `growthGetNumber`, `calculateRequiredGrowthRate`, nested `projectedCapitalAtGrowth` — **MATCH** |

### Missing UI
None vs doc.

---

## ASSET 002 — Retirement Reality Check Calculator

| Field | Value |
|---|---|
| Doc title | AS Brokers Retirement Reality Check Calculator |
| Root id | `#asb-reality-check-calculator` |
| Embed | `public/embed-calculators/asset-002-retirement-reality-check.html` |
| Verdict | **MATCH** (vs **last** of 3 doc copies) |
| Priority | LOW |

### Doc structure note
Albert’s export contains **three** successive Reality Check implementations under Asset002:

| Copy | Character |
|---|---|
| 1 | Older/shorter: no planning age; no income lifespan / today’s-money fields |
| 2 | Mid revision: planning age + lifespan; missing “today’s money” / “value built from future savings” refinements |
| 3 | **Authoritative** — full field set + `estimatedMonthlyIncomeTodayValue`; embed JS **FULL MATCH** after normalize |

Frank note in doc (not in embed markup): *“Frank die calculator sit tans as Retirement Readiness Calculator voor”* — naming discrepancy on the live site may exist; embed title correctly follows Albert (**Reality Check**, not Readiness).

### Layout / style
- Matches white-card system; `.asb-button:hover` present in doc copy 3 and embed.
- Defaults: ages `40` / `65` / `90`; capital `500000`; premium `5000`; premium↑ `10`; growth `10`; drawdown `8`; growth in retirement `10`; income↑ `6`.
- CTA: disabled button (“link below”) — no href in doc or embed.

### Formulas / constants (copy 3 ↔ embed)
| Item | Doc / Embed |
|---|---|
| Pre-retirement projection | Monthly growth on capital + escalated premiums |
| Starting income | `projectedCapital × drawdownRate / 12` |
| Today’s money | `estimatedMonthlyIncome / (1+incomeIncrease)^yearsToRetirement` |
| Lifespan | Monthly withdraw escalating income vs growth until capital ≤ 0 or planning horizon |
| Functions | `realityFormatRand`, `realityGetNumber`, `calculateRetirementRealityCheck` — **MATCH** |

### Context note (not a doc drift)
`CONTEXT.md` describes Reality Check as a closed-form PV of growing annuity. Albert’s implementation is a **projection + drawdown + monthly run-out** model. Embed follows Albert.

### Missing UI
None vs authoritative copy 3.

---

## ASSET 003 — Retirement Premium Calculator

| Field | Value |
|---|---|
| Doc title | AS Brokers Retirement Premium Calculator |
| Root id | `#asb-retirement-premium-calculator` |
| Embed | `public/embed-calculators/asset-003-retirement-premium.html` |
| Verdict | **MATCH** |
| Priority | LOW |

### Layout / style
- Standard white card; CTA link to `/insights/retirement-premium-calculator`.
- Defaults: ages `50` / `65` / `90`; income `40000`; inflation `6`; savings↑ `10`; growth before `10`; growth during `8`; income↑ `6`.

### Formulas / constants
| Item | Doc / Embed |
|---|---|
| Capital required | Same retirement monthly PV approach as ASSET 001 |
| Required premium | Solve starting monthly saving given growth + annual escalation (`futureValueOfSavings`) |
| Functions | `premiumFormatRand`, `premiumGetNumber`, `calculateRetirementPremium`, `futureValueOfSavings` — **MATCH** |

### Missing UI
None vs doc.

---

## ASSET 004 — Life of Capital Calculator

| Field | Value |
|---|---|
| Doc title | Life of Capital Calculator (section header ASSET 004) |
| Root id | `#asb-life-of-capital-calculator` |
| Embed | `public/embed-calculators/asset-004-life-of-capital.html` |
| Verdict | **MATCH** (after label fix) |
| Priority | LOW |

### Layout / style
- Standard white card; disabled CTA button (no article href in doc).
- Defaults: age `65`; capital `5000000`; net income `35000`; return `10`; tax `25`; inflation `7`.
- **Fixed this audit:** embed label was `Monthly income needed (net after tax)`; Albert uses `Monthly income needed — net after tax`.

### Formulas / constants
| Item | Doc / Embed |
|---|---|
| Gross withdrawal | `net / (1 − taxRate)` |
| First-year withdrawal rate | `(gross × 12) / capital` |
| Risk bands | `<5%` / `≤7%` / `>7%` assessment strings |
| Run-out | Monthly: grow at `monthlyReturn`, subtract gross; escalate net by inflation yearly; cap **100 years** |
| Functions | `lifeFormatRand`, `lifeGetNumber`, `calculateLifeOfCapital` — **MATCH** |

### Context note (not a doc drift)
`CONTEXT.md` describes a **yearly** capital × (1+return) − withdrawal loop. Albert + embed use **monthly** steps. Albert kept.

### Missing UI
None vs doc after label fix.

---

## ASSET 005 — Future Value Calculator

| Field | Value |
|---|---|
| Doc title | AS Brokers Future Value Calculator |
| Root id | `#asb-future-value-calculator` |
| Embed | `public/embed-calculators/asset-005-future-value.html` |
| Verdict | **MATCH** |
| Priority | LOW |

### Layout / style
- Standard white card; `.asb-button:hover` in doc + embed; disabled CTA.
- Defaults: present value `50000`; inflation `6`; years `20`.

### Formulas / constants
| Item | Doc / Embed |
|---|---|
| Future value | `PV × (1+i)^n` |
| Future buying power | `PV / (1+i)^n` |
| Purchasing power lost % | `(1 − 1/(1+i)^n) × 100` |
| Functions | `futureFormatRand`, `futureGetNumber`, `calculateFutureValue` — **MATCH** |

Aligned with `CONTEXT.md` inflation section.

### Missing UI
None vs doc.

---

## ASSET 006 — Income Tax Calculator

| Field | Value |
|---|---|
| Doc title | AS Brokers Income Tax Calculator |
| Root id | `#asb-income-tax-calculator` |
| Embed | `public/embed-calculators/asset-006-income-tax.html` |
| Verdict | **MATCH** |
| Priority | LOW |

### Layout / style
- Standard white card; disabled CTA; intro cites **2026/27** tables.
- Defaults: monthly income `50000`; age `45`.

### Formulas / constants (SARS 2026/27)
| Bracket / rebate | Doc | Embed | AGENTS / CONTEXT |
|---|---|---|---|
| ≤ 245,100 @ 18% | yes | yes | yes |
| ≤ 383,100 → 44,118 + 26% | yes | yes | yes |
| ≤ 530,200 → 79,998 + 31% | yes | yes | yes |
| ≤ 695,800 → 125,599 + 36% | yes | yes | yes |
| ≤ 887,000 → 185,215 + 39% | yes | yes | yes |
| ≤ 1,878,600 → 259,783 + 41% | yes | yes | yes |
| above → 666,339 + 45% | yes | yes | yes |
| Primary / 65+ / 75+ rebates | 17,820 / 9,765 / 3,249 | same | same |

Outputs: annual tax after rebate, monthly PAYE, net monthly, effective rate — **MATCH**.

Functions: `taxFormatRand`, `taxGetNumber`, `calculateAnnualTaxBeforeRebate`, `calculateRebate`, `calculateIncomeTax` — **MATCH**.

### Missing UI
None vs doc.

---

## Compliance / context notes (summary)

1. **ASSET 002 naming:** Doc mentions Frank’s “Retirement Readiness” naming; Albert’s calculator title remains **Reality Check** — embed correct.
2. **ASSET 002 / 004 vs CONTEXT.md:** Narrative formulas in `CONTEXT.md` differ in *form* (closed-form annuity / yearly loop) from Albert’s monthly implementations — **do not override Albert**.
3. **ASSET 006:** Brackets and rebates are consistent across Albert, embeds, and `AGENTS.md` / `CONTEXT.md` for SARS 2026/27.
4. **AGENTS.md** was not modified.
