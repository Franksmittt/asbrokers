export type CalculatorCodeSnippet = {
  id: string;
  title: string;
  sourcePath: string;
  code: string;
};

export function isEmbedReadyCalculatorSnippet(snippet: CalculatorCodeSnippet): boolean {
  return snippet.code.trim().startsWith("<");
}

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
    code: `<div id="estate-duty-calculator" style="background:#111115;border:1px solid #27272a;border-radius:12px;padding:16px;margin:16px 0;display:grid;gap:12px;">
  <label style="display:grid;gap:6px;color:#d4d4d8;font-size:13px;">Gross estate value (R)
    <input type="number" data-field="gross" value="5000000" style="padding:10px;background:#0a0a0c;border:1px solid #27272a;border-radius:8px;color:#fff;">
  </label>
  <label style="display:grid;gap:6px;color:#d4d4d8;font-size:13px;">Liabilities (R)
    <input type="number" data-field="liabilities" value="0" style="padding:10px;background:#0a0a0c;border:1px solid #27272a;border-radius:8px;color:#fff;">
  </label>
  <label style="display:grid;gap:6px;color:#d4d4d8;font-size:13px;">Bequests to spouse (R)
    <input type="number" data-field="spouse" value="0" style="padding:10px;background:#0a0a0c;border:1px solid #27272a;border-radius:8px;color:#fff;">
  </label>
  <div style="color:#a1a1aa;font-size:12px;">Executor fees: <strong data-out="executor" style="color:#14b8a6;">R 0.00</strong></div>
  <div style="color:#a1a1aa;font-size:12px;">Estate duty: <strong data-out="duty" style="color:#14b8a6;">R 0.00</strong></div>
  <div style="color:#fff;font-size:14px;">Total estate costs: <strong data-out="total" style="color:#14b8a6;">R 0.00</strong></div>
</div>
<script>
(() => {
  const root = document.getElementById("estate-duty-calculator");
  if (!root || root.dataset.bound === "1") return;
  root.dataset.bound = "1";
  const get = (name) => root.querySelector('[data-field="' + name + '"]');
  const out = (name) => root.querySelector('[data-out="' + name + '"]');
  const fmt = new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR", minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const PRIMARY_ABATEMENT = 3500000, DUTY_THRESHOLD = 30000000, DUTY_RATE_FIRST = 0.2, DUTY_RATE_ABOVE = 0.25, DUTY_ON_FIRST_30M = 6000000, EXECUTOR_FEE_RATE = 0.04025;
  const recalc = () => {
    const gross = Number.parseFloat(get("gross")?.value || "0") || 0;
    const liabilities = Number.parseFloat(get("liabilities")?.value || "0") || 0;
    const spouse = Number.parseFloat(get("spouse")?.value || "0") || 0;
    const executorFees = gross * EXECUTOR_FEE_RATE;
    const totalDeductions = liabilities + spouse + executorFees;
    const netEstate = Math.max(0, gross - totalDeductions);
    const dutiableEstate = Math.max(0, netEstate - PRIMARY_ABATEMENT);
    const estateDutyPayable = dutiableEstate <= DUTY_THRESHOLD ? dutiableEstate * DUTY_RATE_FIRST : DUTY_ON_FIRST_30M + (dutiableEstate - DUTY_THRESHOLD) * DUTY_RATE_ABOVE;
    out("executor").textContent = fmt.format(executorFees);
    out("duty").textContent = fmt.format(estateDutyPayable);
    out("total").textContent = fmt.format(executorFees + estateDutyPayable);
  };
  root.querySelectorAll("input").forEach((el) => el.addEventListener("input", recalc));
  recalc();
})();
</script>`,
  },
  {
    id: "income-tax",
    title: "Income Tax Calculator",
    sourcePath: "components/IncomeTaxCalculator.tsx",
    code: `<div id="income-tax-calculator" style="background:#111115;border:1px solid #27272a;border-radius:12px;padding:16px;margin:16px 0;display:grid;gap:12px;">
  <label style="display:grid;gap:6px;color:#d4d4d8;font-size:13px;">Taxable annual income (R)
    <input type="number" data-field="income" value="500000" style="padding:10px;background:#0a0a0c;border:1px solid #27272a;border-radius:8px;color:#fff;">
  </label>
  <label style="display:grid;gap:6px;color:#d4d4d8;font-size:13px;">Age
    <input type="number" data-field="age" value="45" style="padding:10px;background:#0a0a0c;border:1px solid #27272a;border-radius:8px;color:#fff;">
  </label>
  <div style="color:#fff;font-size:14px;">Estimated annual tax: <strong data-out="tax" style="color:#14b8a6;">R 0.00</strong></div>
</div>
<script>
(() => {
  const root = document.getElementById("income-tax-calculator");
  if (!root || root.dataset.bound === "1") return;
  root.dataset.bound = "1";
  const get = (name) => root.querySelector('[data-field="' + name + '"]');
  const out = (name) => root.querySelector('[data-out="' + name + '"]');
  const fmt = new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR", minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const TAX_BRACKETS = [{ limit: 245100, baseTax: 0, rate: 0.18 }, { limit: 383100, baseTax: 44118, rate: 0.26 }, { limit: 530200, baseTax: 79998, rate: 0.31 }, { limit: 695800, baseTax: 125599, rate: 0.36 }, { limit: 887000, baseTax: 185215, rate: 0.39 }, { limit: 1878600, baseTax: 259783, rate: 0.41 }, { limit: Infinity, baseTax: 666339, rate: 0.45 }];
  const BRACKET_THRESHOLDS = [0, 245100, 383100, 530200, 695800, 887000, 1878600];
  const calc = (taxableAnnual, age) => {
    const rebate = age >= 75 ? 30834 : age >= 65 ? 27585 : 17820;
    let taxBeforeRebate = 0;
    for (let i = 0; i < TAX_BRACKETS.length; i++) {
      const bracket = TAX_BRACKETS[i], prev = BRACKET_THRESHOLDS[i] ?? 0;
      if (taxableAnnual <= bracket.limit) { taxBeforeRebate = bracket.baseTax + (taxableAnnual - prev) * bracket.rate; break; }
    }
    return Math.max(0, taxBeforeRebate - rebate);
  };
  const recalc = () => {
    const income = Number.parseFloat(get("income")?.value || "0") || 0;
    const age = Number.parseFloat(get("age")?.value || "0") || 0;
    out("tax").textContent = fmt.format(calc(income, age));
  };
  root.querySelectorAll("input").forEach((el) => el.addEventListener("input", recalc));
  recalc();
})();
</script>`,
  },
  {
    id: "premium-comparison",
    title: "Premium Comparison Calculator",
    sourcePath: "components/PremiumComparisonCalculator.tsx",
    code: `<div id="premium-comparison-calculator" style="background:#111115;border:1px solid #27272a;border-radius:12px;padding:16px;margin:16px 0;display:grid;gap:12px;">
  <label style="display:grid;gap:6px;color:#d4d4d8;font-size:13px;">Current monthly premium (R)
    <input type="number" data-field="current" value="2500" style="padding:10px;background:#0a0a0c;border:1px solid #27272a;border-radius:8px;color:#fff;">
  </label>
  <label style="display:grid;gap:6px;color:#d4d4d8;font-size:13px;">Expected annual increase (%)
    <input type="number" data-field="increase" value="8" style="padding:10px;background:#0a0a0c;border:1px solid #27272a;border-radius:8px;color:#fff;">
  </label>
  <div style="color:#a1a1aa;font-size:12px;">5-year cumulative premium: <strong data-out="five" style="color:#14b8a6;">R 0.00</strong></div>
  <div style="color:#fff;font-size:14px;">10-year cumulative premium: <strong data-out="ten" style="color:#14b8a6;">R 0.00</strong></div>
</div>
<script>
(() => {
  const root = document.getElementById("premium-comparison-calculator");
  if (!root || root.dataset.bound === "1") return;
  root.dataset.bound = "1";
  const fmt = new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR", minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const get = (name) => root.querySelector('[data-field="' + name + '"]');
  const out = (name) => root.querySelector('[data-out="' + name + '"]');
  const cumulative = (monthly, increasePct, years) => {
    let total = 0;
    let m = monthly;
    for (let y = 0; y < years; y++) {
      total += m * 12;
      m *= 1 + increasePct / 100;
    }
    return total;
  };
  const recalc = () => {
    const current = Number.parseFloat(get("current")?.value || "0") || 0;
    const increase = Number.parseFloat(get("increase")?.value || "0") || 0;
    out("five").textContent = fmt.format(cumulative(current, increase, 5));
    out("ten").textContent = fmt.format(cumulative(current, increase, 10));
  };
  root.querySelectorAll("input").forEach((el) => el.addEventListener("input", recalc));
  recalc();
})();
</script>`,
  },
  {
    id: "retirement-reality",
    title: "Retirement Reality Calculator",
    sourcePath: "components/RetirementRealityCalculator.tsx",
    code: `<div id="retirement-reality-calculator" style="background:#111115;border:1px solid #27272a;border-radius:12px;padding:16px;margin:16px 0;display:grid;gap:12px;">
  <label style="display:grid;gap:6px;color:#d4d4d8;font-size:13px;">Monthly income today (R)
    <input type="number" data-field="monthly" value="30000" style="padding:10px;background:#0a0a0c;border:1px solid #27272a;border-radius:8px;color:#fff;">
  </label>
  <label style="display:grid;gap:6px;color:#d4d4d8;font-size:13px;">Current age / Retirement age
    <input type="number" data-field="currentAge" value="45" style="padding:10px;background:#0a0a0c;border:1px solid #27272a;border-radius:8px;color:#fff;">
    <input type="number" data-field="retirementAge" value="65" style="padding:10px;background:#0a0a0c;border:1px solid #27272a;border-radius:8px;color:#fff;">
  </label>
  <div style="color:#fff;font-size:14px;">Capital required at retirement: <strong data-out="capital" style="color:#14b8a6;">R 0.00</strong></div>
</div>
<script>
(() => {
  const root = document.getElementById("retirement-reality-calculator");
  if (!root || root.dataset.bound === "1") return;
  root.dataset.bound = "1";
  const fmt = new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR", minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const get = (name) => root.querySelector('[data-field="' + name + '"]');
  const out = root.querySelector('[data-out="capital"]');
  const recalc = () => {
    const currentAge = Number.parseFloat(get("currentAge")?.value || "45") || 45;
    const retirementAge = Number.parseFloat(get("retirementAge")?.value || "65") || 65;
    const monthlyIncomeToday = Number.parseFloat(get("monthly")?.value || "0") || 0;
    const yearsToRetirement = Math.max(0, retirementAge - currentAge);
    const yearsInRetirement = 25;
    const inflation = 0.06, growth = 0.10, tax = 0.30;
    const futureMonthlyNet = monthlyIncomeToday * Math.pow(1 + inflation, yearsToRetirement);
    const futureMonthlyGross = futureMonthlyNet / (1 - tax);
    const firstYearAnnualWithdrawal = futureMonthlyGross * 12;
    const pvFactor = (1 - Math.pow((1 + inflation) / (1 + growth), yearsInRetirement)) / (growth - inflation);
    out.textContent = fmt.format(firstYearAnnualWithdrawal * pvFactor);
  };
  root.querySelectorAll("input").forEach((el) => el.addEventListener("input", recalc));
  recalc();
})();
</script>`,
  },
  {
    id: "life-of-capital",
    title: "Life of Capital Calculator",
    sourcePath: "components/LifeOfCapitalCalculator.tsx",
    code: `<div id="life-of-capital-calculator" style="background:#111115;border:1px solid #27272a;border-radius:12px;padding:16px;margin:16px 0;display:grid;gap:12px;">
  <label style="display:grid;gap:6px;color:#d4d4d8;font-size:13px;">Capital amount (R)
    <input type="number" data-field="capital" value="5000000" style="padding:10px;background:#0a0a0c;border:1px solid #27272a;border-radius:8px;color:#fff;">
  </label>
  <label style="display:grid;gap:6px;color:#d4d4d8;font-size:13px;">Monthly income needed (R)
    <input type="number" data-field="income" value="30000" style="padding:10px;background:#0a0a0c;border:1px solid #27272a;border-radius:8px;color:#fff;">
  </label>
  <div style="color:#fff;font-size:14px;">Estimated years capital lasts: <strong data-out="years" style="color:#14b8a6;">0</strong></div>
</div>
<script>
(() => {
  const root = document.getElementById("life-of-capital-calculator");
  if (!root || root.dataset.bound === "1") return;
  root.dataset.bound = "1";
  const get = (name) => root.querySelector('[data-field="' + name + '"]');
  const out = root.querySelector('[data-out="years"]');
  const recalc = () => {
    const capitalAmount = Number.parseFloat(get("capital")?.value || "0") || 0;
    const monthlyIncomeNeeded = Number.parseFloat(get("income")?.value || "0") || 0;
    const returnDec = 0.09, taxDec = 0.30, inflationDec = 0.06;
    let annualWithdrawal = (monthlyIncomeNeeded / (1 - taxDec)) * 12;
    let capital = capitalAmount, years = 0;
    for (let year = 1; year <= 100; year++) {
      capital += capital * returnDec;
      capital -= annualWithdrawal;
      if (capital <= 0) { years = year; break; }
      annualWithdrawal += annualWithdrawal * inflationDec;
      years = year;
    }
    out.textContent = String(years);
  };
  root.querySelectorAll("input").forEach((el) => el.addEventListener("input", recalc));
  recalc();
})();
</script>`,
  },
];

export function getCalculatorCodePackText(): string {
  return CALCULATOR_CODE_SNIPPETS.filter(isEmbedReadyCalculatorSnippet).map(
    (s) => `# ${s.title}\nSource: ${s.sourcePath}\n\n${s.code}`
  ).join("\n\n------------------------------\n\n");
}
