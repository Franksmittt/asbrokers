import type { EstateDutyInput, StrategicIncomeInput, AmethystAnnuityInput } from "./schemas";

const PRIMARY_ABATEMENT = 3_500_000;
const DUTY_THRESHOLD = 30_000_000;
const DUTY_RATE_FIRST = 0.2;
const DUTY_RATE_ABOVE = 0.25;
const DUTY_ON_FIRST_30M = 6_000_000;
const EXECUTOR_FEE_RATE = 0.04025;

const GROSS_RATE_128 = 0.128;
const DIVIDEND_TAX_RATE = 0.2;
const BONUS_RATE = 0.1;

/** SARS 2026/27 tax before rebates (annual taxable income). Age 65+ rebates: 17,820 + 9,765 = 27,585 */
function taxBeforeRebates(annual: number): number {
  if (annual <= 0) return 0;
  if (annual <= 245_100) return annual * 0.18;
  if (annual <= 383_100) return 44_118 + (annual - 245_100) * 0.26;
  if (annual <= 530_200) return 79_998 + (annual - 383_100) * 0.31;
  if (annual <= 695_800) return 125_599 + (annual - 530_200) * 0.36;
  if (annual <= 887_000) return 185_215 + (annual - 695_800) * 0.39;
  if (annual <= 1_878_600) return 259_783 + (annual - 887_000) * 0.41;
  return 666_339 + (annual - 1_878_600) * 0.45;
}
const REBATES_65 = 17_820 + 9_765;

export interface EstateDutyResult {
  grossEstateValue: number;
  netValue: number;
  dutiableAmount: number;
  executorFees: number;
  estateDutyPayable: number;
  totalEstateCosts: number;
}

export function calculateEstateDuty(input: EstateDutyInput): EstateDutyResult {
  const { grossEstateValue, liabilities, spousalInheritance, charityDonations = 0 } = input;
  const executorFees = grossEstateValue * EXECUTOR_FEE_RATE;
  const totalDeductions = liabilities + spousalInheritance + charityDonations + executorFees;
  const netValue = Math.max(0, grossEstateValue - totalDeductions);
  const dutiableAmount = Math.max(0, netValue - PRIMARY_ABATEMENT);

  let estateDutyPayable = 0;
  if (dutiableAmount <= DUTY_THRESHOLD) {
    estateDutyPayable = dutiableAmount * DUTY_RATE_FIRST;
  } else {
    estateDutyPayable = DUTY_ON_FIRST_30M + (dutiableAmount - DUTY_THRESHOLD) * DUTY_RATE_ABOVE;
  }

  const totalEstateCosts = executorFees + estateDutyPayable;
  return {
    grossEstateValue,
    netValue,
    dutiableAmount,
    executorFees,
    estateDutyPayable,
    totalEstateCosts,
  };
}

export interface StrategicIncome128Result {
  capitalAmount: number;
  grossAnnualDividend: number;
  netAnnualDividend: number;
  netMonthlyIncome: number;
  loyaltyBonus: number;
  total5YearReturn: number;
  returnOnCapitalPct: number;
}

export function calculateStrategicIncome128(input: StrategicIncomeInput): StrategicIncome128Result {
  const { capitalAmount } = input;
  const grossAnnualDividend = capitalAmount * GROSS_RATE_128;
  const netAnnualDividend = grossAnnualDividend * (1 - DIVIDEND_TAX_RATE);
  const netMonthlyIncome = netAnnualDividend / 12;
  const loyaltyBonus = capitalAmount * BONUS_RATE;
  const total5YearReturn = netAnnualDividend * 5 + loyaltyBonus;
  const returnOnCapitalPct = (total5YearReturn / capitalAmount) * 100;

  return {
    capitalAmount,
    grossAnnualDividend,
    netAnnualDividend,
    netMonthlyIncome,
    loyaltyBonus,
    total5YearReturn,
    returnOnCapitalPct,
  };
}

export interface AmethystAnnuityResult {
  capitalAmount: number;
  drawdownPercentage: number;
  grossAnnualIncome: number;
  grossMonthlyIncome: number;
  annualTaxPayable: number;
  estimatedMonthlyTax: number;
  netMonthlyIncome: number;
}

export function calculateAmethystLivingAnnuity(input: AmethystAnnuityInput): AmethystAnnuityResult {
  const { capitalAmount, drawdownPercentage } = input;
  const drawdownDec = drawdownPercentage / 100;
  const grossAnnualIncome = capitalAmount * drawdownDec;
  const grossMonthlyIncome = grossAnnualIncome / 12;
  const taxBefore = taxBeforeRebates(grossAnnualIncome);
  const annualTaxPayable = Math.max(0, taxBefore - REBATES_65);
  const estimatedMonthlyTax = annualTaxPayable / 12;
  const netMonthlyIncome = grossMonthlyIncome - estimatedMonthlyTax;

  return {
    capitalAmount,
    drawdownPercentage,
    grossAnnualIncome,
    grossMonthlyIncome,
    annualTaxPayable,
    estimatedMonthlyTax,
    netMonthlyIncome,
  };
}
