# Calculators  -  Formula & Tax Context

Local context for the `/calculators` tree and all calculator components. Use when modifying or adding financial logic.

---

## Tax & Regulatory (SA)

- **SARS 2026/27 (Budget 2026):** Brackets 245,100 (18%), 383,100 (44,118+26%), 530,200 (79,998+31%), 695,800 (125,599+36%), 887,000 (185,215+39%), 1,878,600 (259,783+41%), above (666,339+45%). Rebates: Primary 17,820; 65+ add 9,765; 75+ add 3,249.
- **Dividends Withholding Tax (DWT):** 20% flat at source on dividend income (Everest voluntary products). No marginal income tax on that portion.
- **Interest exemption:** SARS annual interest exemption (e.g. R23,800 under 65)  -  relevant for interest-based products, not for dividend yields.
- **Estate duty:** Primary abatement R3.5m. 20% on first R30m dutiable, 25% above. Section 4q spouse exempt. Executor 3.5% + 15% VAT on gross estate.
- **Donations:** R100,000 per person / R200,000 per couple per year (no donations tax if within limit).

---

## Retirement & Run-Out

- **Retirement Reality:** PV of growing annuity. Income need at retirement = today’s monthly × (1 + inflation)^yearsToRetirement; gross up for tax; first year withdrawal × [1 − ((1+inf)/(1+growth))^N] / (growth − inflation). Growth must exceed inflation.
- **Life of Capital / Run-Out:** Each year: capital × (1 + return) − annual withdrawal; then withdrawal × (1 + inflation) for next year. Repeat until capital ≤ 0 or cap (e.g. 100 years).

---

## Everest Wealth

- **12.8% Strategic Income:** Gross = capital × 12.8%. Net after 20% DWT. Monthly = net/12. Loyalty bonus = 10% of capital at month 60 only.
- **14.2% Onyx Income+:** Gross = capital × 14.2%. Net after 20% DWT. No bonus.
- **14.5% Strategic Growth:** Value at 60 months = capital × (1.145)^5. Tax = 20% on (value − capital). Net = value − tax.
- **Amethyst:** Drawdown 2.5%–17.5%. Gross income = capital × drawdown%. Tax on drawdown via SARS marginal brackets (65+ rebates). Growth inside annuity tax-free.

---

## Inflation & Future Value

- **Cost of inflation:** Future cost = PV × (1 + i)^n. Future buying power = PV / (1 + i)^n. Purchasing power lost % = (1 − 1/(1+i)^n) × 100.

---

When changing formulas, preserve exact constants (e.g. R3.5m, 20%/25%, 3.5%+VAT) and document source (SARS, product terms).
