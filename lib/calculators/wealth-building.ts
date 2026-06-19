export type WealthBuildingInput = {
  initialAmount: number;
  annualGrowthRatePercent: number;
  years: number;
  monthlyContribution: number;
  annualContributionIncreasePercent: number;
};

export type WealthBuildingResult = {
  totalInvested: number;
  growthEarned: number;
  futureValue: number;
};

/**
 * Compound growth with monthly contributions and annual contribution escalations.
 * Monthly rate derived from annual: (1 + r)^(1/12) − 1
 */
export function calculateWealthBuilding(input: WealthBuildingInput): WealthBuildingResult {
  const {
    initialAmount,
    annualGrowthRatePercent,
    years,
    monthlyContribution,
    annualContributionIncreasePercent,
  } = input;

  const annualRate = annualGrowthRatePercent / 100;
  const monthlyRate = Math.pow(1 + annualRate, 1 / 12) - 1;
  const contribEscalation = annualContributionIncreasePercent / 100;

  let balance = Math.max(0, initialAmount);
  let totalInvested = Math.max(0, initialAmount);
  let monthlyContrib = Math.max(0, monthlyContribution);
  const totalMonths = Math.max(0, Math.floor(years * 12));

  for (let month = 1; month <= totalMonths; month++) {
    balance *= 1 + monthlyRate;
    balance += monthlyContrib;
    totalInvested += monthlyContrib;

    if (month % 12 === 0 && month < totalMonths) {
      monthlyContrib *= 1 + contribEscalation;
    }
  }

  const futureValue = balance;
  const growthEarned = futureValue - totalInvested;

  return { totalInvested, growthEarned, futureValue };
}

export type CurrencyOption =
  | "none"
  | "ZAR"
  | "USD"
  | "EUR"
  | "GBP"
  | "JPY";

export const CURRENCY_OPTIONS: { value: CurrencyOption; label: string }[] = [
  { value: "none", label: "No Currency" },
  { value: "ZAR", label: "South African Rand (R)" },
  { value: "USD", label: "US Dollar ($)" },
  { value: "EUR", label: "Euro (€)" },
  { value: "GBP", label: "British Pound (£)" },
  { value: "JPY", label: "Japanese Yen (¥)" },
];

export function formatWealthAmount(value: number, currency: CurrencyOption): string {
  if (!Number.isFinite(value)) return "—";

  if (currency === "none") {
    return value.toLocaleString("en-ZA", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  const locale =
    currency === "ZAR"
      ? "en-ZA"
      : currency === "USD"
        ? "en-US"
        : currency === "EUR"
          ? "de-DE"
          : currency === "GBP"
            ? "en-GB"
            : "ja-JP";

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}
