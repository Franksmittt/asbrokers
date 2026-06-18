const WITHDRAWAL_RATE = 0.05;
const RATE_PRECISION = 0.0001;
const DEFAULT_INFLATION = 0.06;
const DEFAULT_PROJECTION_GROWTH = 0.1;

export type BlueprintInputs = {
  currentAge: number;
  freedomAge: number;
  desiredMonthlyIncomeToday: number;
  lifeExpectancy: number;
  currentSavings: number;
  monthlySavings: number;
  inflationRate?: number;
  projectionGrowthRate?: number;
};

export type BlueprintResults = {
  yearsToFreedom: number;
  futureMonthlyIncome: number;
  annualIncomeRequired: number;
  capitalRequired: number;
  projectedCapital: number;
  financialFreedomGap: number;
  freedomRatePercent: number;
  financialFreedomScore: number;
  onTrack: boolean;
};

function projectFutureValue(
  currentValue: number,
  monthlyInvestment: number,
  years: number,
  annualGrowthRate: number
): number {
  const months = years * 12;
  const monthlyRate = Math.pow(1 + annualGrowthRate, 1 / 12) - 1;
  const lumpSum = currentValue * Math.pow(1 + annualGrowthRate, years);

  if (Math.abs(monthlyRate) < 1e-12) {
    return lumpSum + monthlyInvestment * months;
  }

  const annuity = monthlyInvestment * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
  return lumpSum + annuity;
}

function solveRequiredGrowthRate(
  currentValue: number,
  monthlyInvestment: number,
  years: number,
  requiredCapital: number
): number {
  if (requiredCapital <= 0) return 0;
  if (years <= 0) return 0;
  if (monthlyInvestment <= 0 && currentValue <= 0) return 10;

  const atZero = projectFutureValue(currentValue, monthlyInvestment, years, 0);
  if (atZero >= requiredCapital) return 0;

  let low = 0;
  let high = 0.5;
  const absoluteMax = 10;

  while (projectFutureValue(currentValue, monthlyInvestment, years, high) < requiredCapital && high < absoluteMax) {
    high = Math.min(high * 2, absoluteMax);
  }

  while (high - low > RATE_PRECISION) {
    const mid = (low + high) / 2;
    const futureValue = projectFutureValue(currentValue, monthlyInvestment, years, mid);
    if (futureValue >= requiredCapital) {
      high = mid;
    } else {
      low = mid;
    }
  }

  return high;
}

function calculateFinancialFreedomScore(
  projectedCapital: number,
  capitalRequired: number,
  freedomRatePercent: number
): number {
  if (capitalRequired <= 0) return 100;
  const progressScore = Math.min(100, Math.max(0, (projectedCapital / capitalRequired) * 100));
  if (freedomRatePercent <= 8) return Math.min(100, Math.round(progressScore + 10));
  if (freedomRatePercent <= 15) return Math.round(progressScore);
  const rateDrag = Math.min(25, (freedomRatePercent - 15) * 1.5);
  return Math.max(0, Math.round(progressScore - rateDrag));
}

export function calculateBlueprintResults(input: BlueprintInputs): BlueprintResults | { error: string } {
  const yearsToFreedom = input.freedomAge - input.currentAge;
  if (yearsToFreedom <= 0) {
    return { error: "Your financial freedom age needs to be after your current age." };
  }
  if (input.desiredMonthlyIncomeToday <= 0) {
    return { error: "Enter a valid desired monthly income." };
  }
  if (input.lifeExpectancy <= input.freedomAge) {
    return { error: "Life expectancy should be greater than your financial freedom age." };
  }

  const inflation = input.inflationRate ?? DEFAULT_INFLATION;
  const projectionGrowth = input.projectionGrowthRate ?? DEFAULT_PROJECTION_GROWTH;

  const futureMonthlyIncome = input.desiredMonthlyIncomeToday * Math.pow(1 + inflation, yearsToFreedom);
  const annualIncomeRequired = futureMonthlyIncome * 12;
  const capitalRequired = annualIncomeRequired / WITHDRAWAL_RATE;
  const projectedCapital = projectFutureValue(
    input.currentSavings,
    input.monthlySavings,
    yearsToFreedom,
    projectionGrowth
  );
  const financialFreedomGap = capitalRequired - projectedCapital;
  const freedomRate = solveRequiredGrowthRate(
    input.currentSavings,
    input.monthlySavings,
    yearsToFreedom,
    capitalRequired
  );
  const freedomRatePercent = freedomRate * 100;
  const financialFreedomScore = calculateFinancialFreedomScore(
    projectedCapital,
    capitalRequired,
    freedomRatePercent
  );

  return {
    yearsToFreedom,
    futureMonthlyIncome,
    annualIncomeRequired,
    capitalRequired,
    projectedCapital,
    financialFreedomGap,
    freedomRatePercent,
    financialFreedomScore,
    onTrack: financialFreedomGap <= 0,
  };
}

export function formatBlueprintRand(value: number): string {
  if (!Number.isFinite(value) || Number.isNaN(value)) return "R0";
  return `R${Math.round(value).toLocaleString("en-ZA")}`;
}
