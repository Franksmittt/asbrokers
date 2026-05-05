export type CalculatorCodeSnippet = {
  id: string;
  title: string;
  sourcePath: string;
  code: string;
};

export const CALCULATOR_CODE_SNIPPETS: CalculatorCodeSnippet[] = [
  {
    id: "everest-income-embed",
    title: "Everest 12.8 Income Calculator (Blog Embed)",
    sourcePath: "custom/embed/everest-income-calculator",
    code: `<div id="everest-income-calculator" style="background:#111115; border:1px solid #27272a; border-radius:0.75rem; padding:1.5rem; margin:1.5rem 0; display:flex; flex-direction:column; gap:1.5rem;">
  <div>
    <label for="inv-amount" style="display:block; font-size:13px; color:#a1a1aa; margin-bottom:0.5rem; font-weight:600;">Investment Amount</label>
    <div style="display:flex; align-items:center; background:#0a0a0c; border:1px solid #27272a; border-radius:0.5rem; overflow:hidden;">
      <span style="padding:0.8rem 1.2rem; color:#71717a; font-weight:700; background:#111115; border-right:1px solid #27272a;">R</span>
      <input type="number" id="inv-amount" value="100000" min="100000" step="10000" style="width:100%; padding:0.8rem; background:transparent; border:none; color:#ffffff; font-size:1.2rem; outline:none; font-family:inherit;">
    </div>
  </div>
  <div style="display:grid; grid-template-columns:repeat(2, 1fr); gap:1rem;">
    <div style="background:#0a0a0c; border:1px solid #27272a; border-radius:0.5rem; padding:1rem;">
      <div style="font-size:11px; letter-spacing:1px; text-transform:uppercase; color:#71717a;">Est. Monthly Net Income</div>
      <div id="calc-out-monthly" style="font-size:1.4rem; font-weight:700; color:#14b8a6; margin-top:4px;">R 0.00</div>
    </div>
    <div style="background:#0a0a0c; border:1px solid #27272a; border-radius:0.5rem; padding:1rem;">
      <div style="font-size:11px; letter-spacing:1px; text-transform:uppercase; color:#71717a;">Est. Annual Net Income</div>
      <div id="calc-out-annual" style="font-size:1.4rem; font-weight:700; color:#14b8a6; margin-top:4px;">R 0.00</div>
    </div>
    <div style="background:#0a0a0c; border:1px solid #27272a; border-radius:0.5rem; padding:1rem;">
      <div style="font-size:11px; letter-spacing:1px; text-transform:uppercase; color:#71717a;">Total 5-Year Net Income</div>
      <div id="calc-out-5year" style="font-size:1.2rem; font-weight:600; color:#ffffff; margin-top:4px;">R 0.00</div>
    </div>
    <div style="background:#0a0a0c; border:1px solid #27272a; border-radius:0.5rem; padding:1rem;">
      <div style="font-size:11px; letter-spacing:1px; text-transform:uppercase; color:#71717a;">Est. 5-Year Bonus (Net)</div>
      <div id="calc-out-bonus" style="font-size:1.2rem; font-weight:600; color:#ffffff; margin-top:4px;">R 0.00</div>
    </div>
  </div>
  <div style="background:#0d1f1d; border:1px solid #14b8a6; border-radius:0.5rem; padding:1.2rem; text-align:center;">
    <div style="font-size:11px; letter-spacing:1.5px; text-transform:uppercase; color:#2dd4bf;">Total Est. Return (5 Yrs + Bonus)</div>
    <div id="calc-out-total" style="font-size:1.8rem; font-weight:700; color:#14b8a6; margin-top:4px;">R 0.00</div>
  </div>
</div>
<script>
  (function initEverestIncomeCalculator() {
    const root = document.getElementById("everest-income-calculator");
    if (!root || root.dataset.bound === "1") return;
    root.dataset.bound = "1";

    const ANNUAL_RATE = 0.128;
    const NET_FACTOR = 0.80;
    const BONUS_RATE = 0.10;
    const TERM_YEARS = 5;

    function calculateIncome(investmentAmount) {
      const grossAnnual = investmentAmount * ANNUAL_RATE;
      const netAnnual = grossAnnual * NET_FACTOR;
      const netMonthly = netAnnual / 12;
      const net5Year = netAnnual * TERM_YEARS;
      const bonusNet = investmentAmount * BONUS_RATE * NET_FACTOR;
      const totalNet = net5Year + bonusNet;
      return { netAnnual, netMonthly, net5Year, bonusNet, totalNet };
    }

    const inputEl = document.getElementById("inv-amount");
    const outMonthly = document.getElementById("calc-out-monthly");
    const outAnnual = document.getElementById("calc-out-annual");
    const out5Year = document.getElementById("calc-out-5year");
    const outBonus = document.getElementById("calc-out-bonus");
    const outTotal = document.getElementById("calc-out-total");
    if (!inputEl || !outMonthly || !outAnnual || !out5Year || !outBonus || !outTotal) return;

    const zarFormatter = new Intl.NumberFormat("en-ZA", {
      style: "currency",
      currency: "ZAR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    function updateCalculator() {
      let val = Number.parseFloat(inputEl.value);
      if (!Number.isFinite(val) || val < 0) val = 0;
      const results = calculateIncome(val);
      outMonthly.textContent = zarFormatter.format(results.netMonthly);
      outAnnual.textContent = zarFormatter.format(results.netAnnual);
      out5Year.textContent = zarFormatter.format(results.net5Year);
      outBonus.textContent = zarFormatter.format(results.bonusNet);
      outTotal.textContent = zarFormatter.format(results.totalNet);
    }

    inputEl.addEventListener("input", updateCalculator);
    updateCalculator();
  })();
</script>`,
  },
  {
    id: "estate-duty",
    title: "Estate Duty Calculator",
    sourcePath: "components/EstateDutyCalculator.tsx",
    code: `const PRIMARY_ABATEMENT = 3_500_000;
const DUTY_THRESHOLD = 30_000_000;
const DUTY_RATE_FIRST = 0.2;
const DUTY_RATE_ABOVE = 0.25;
const DUTY_ON_FIRST_30M = 6_000_000;
const EXECUTOR_FEE_RATE = 0.04025; // 3.5% + VAT

function calculateEstateCosts(grossEstateValue, liabilities, bequestsToSpouse) {
  const executorFees = grossEstateValue * EXECUTOR_FEE_RATE;
  const totalDeductions = liabilities + bequestsToSpouse + executorFees;
  const netEstate = Math.max(0, grossEstateValue - totalDeductions);
  const dutiableEstate = Math.max(0, netEstate - PRIMARY_ABATEMENT);
  const estateDutyPayable =
    dutiableEstate <= DUTY_THRESHOLD
      ? dutiableEstate * DUTY_RATE_FIRST
      : DUTY_ON_FIRST_30M + (dutiableEstate - DUTY_THRESHOLD) * DUTY_RATE_ABOVE;
  return { executorFees, estateDutyPayable, totalEstateCosts: executorFees + estateDutyPayable };
}`,
  },
  {
    id: "income-tax",
    title: "Income Tax Calculator",
    sourcePath: "components/IncomeTaxCalculator.tsx",
    code: `const TAX_BRACKETS = [
  { limit: 245100, baseTax: 0, rate: 0.18 },
  { limit: 383100, baseTax: 44118, rate: 0.26 },
  { limit: 530200, baseTax: 79998, rate: 0.31 },
  { limit: 695800, baseTax: 125599, rate: 0.36 },
  { limit: 887000, baseTax: 185215, rate: 0.39 },
  { limit: 1878600, baseTax: 259783, rate: 0.41 },
  { limit: Infinity, baseTax: 666339, rate: 0.45 },
];
const BRACKET_THRESHOLDS = [0, 245100, 383100, 530200, 695800, 887000, 1878600];

function calculateAnnualTax(taxableAnnual, age) {
  const rebate = age >= 75 ? 30834 : age >= 65 ? 27585 : 17820;
  let taxBeforeRebate = 0;
  for (let i = 0; i < TAX_BRACKETS.length; i++) {
    const bracket = TAX_BRACKETS[i];
    const prevLimit = BRACKET_THRESHOLDS[i] ?? 0;
    if (taxableAnnual <= bracket.limit) {
      taxBeforeRebate = bracket.baseTax + (taxableAnnual - prevLimit) * bracket.rate;
      break;
    }
  }
  return Math.max(0, taxBeforeRebate - rebate);
}`,
  },
  {
    id: "premium-comparison",
    title: "Premium Comparison Calculator",
    sourcePath: "components/PremiumComparisonCalculator.tsx",
    code: `function rowAnnualTotal(row) {
  return row.monthlyPremium * 12;
}

function rowChangePct(rows, index) {
  if (index <= 0) return null;
  const prev = rows[index - 1].monthlyPremium;
  const curr = rows[index].monthlyPremium;
  if (prev <= 0) return null;
  return ((curr - prev) / prev) * 100;
}

function averageAnnualIncrease(rows) {
  let sum = 0, count = 0;
  for (let i = 1; i < rows.length; i++) {
    const pct = rowChangePct(rows, i);
    if (pct !== null) { sum += pct; count++; }
  }
  return count === 0 ? null : sum / count;
}

function cumulativeSpend(rows, upToYears) {
  let total = 0;
  for (let i = 0; i < Math.min(upToYears, rows.length); i++) {
    total += rowAnnualTotal(rows[i]);
  }
  return total;
}`,
  },
  {
    id: "retirement-reality",
    title: "Retirement Reality Calculator",
    sourcePath: "components/RetirementRealityCalculator.tsx",
    code: `// Lump sum required at retirement using growing-annuity PV
function retirementCapitalRequired({
  currentAge, retirementAge, lifeExpectancy, monthlyIncomeToday, inflationRate, growthRate, taxRate
}) {
  const yearsToRetirement = Math.max(0, retirementAge - currentAge);
  const yearsInRetirement = Math.max(0, lifeExpectancy - retirementAge);
  const inflation = inflationRate / 100;
  const growth = growthRate / 100;
  const tax = taxRate / 100;

  const futureMonthlyNet = monthlyIncomeToday * Math.pow(1 + inflation, yearsToRetirement);
  const futureMonthlyGross = futureMonthlyNet / (1 - tax);
  const firstYearAnnualWithdrawal = futureMonthlyGross * 12;
  if (growth <= inflation) throw new Error("Growth must exceed inflation");

  const pvFactor =
    (1 - Math.pow((1 + inflation) / (1 + growth), yearsInRetirement)) / (growth - inflation);
  return firstYearAnnualWithdrawal * pvFactor;
}`,
  },
  {
    id: "life-of-capital",
    title: "Life of Capital Calculator",
    sourcePath: "components/LifeOfCapitalCalculator.tsx",
    code: `// Year-by-year simulation
function runSimulation(capitalAmount, monthlyIncomeNeeded, expectedReturn, estimatedTax, inflationRate) {
  const returnDec = expectedReturn / 100;
  const taxDec = estimatedTax / 100;
  const inflationDec = inflationRate / 100;
  let annualWithdrawal = (monthlyIncomeNeeded / (1 - taxDec)) * 12;
  let capital = capitalAmount;

  for (let year = 1; year <= 100; year++) {
    capital += capital * returnDec;
    capital -= annualWithdrawal;
    if (capital <= 0) return { yearsLasted: year, isSustainableForever: false };
    annualWithdrawal += annualWithdrawal * inflationDec;
  }
  return { yearsLasted: 100, isSustainableForever: true };
}`,
  },
];

export function getCalculatorCodePackText(): string {
  return CALCULATOR_CODE_SNIPPETS.map(
    (s) => `# ${s.title}\nSource: ${s.sourcePath}\n\n${s.code}`
  ).join("\n\n------------------------------\n\n");
}
