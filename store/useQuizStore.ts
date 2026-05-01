import { create } from "zustand";

export const AGE_BRACKETS = ["Under 40", "40-55", "55+"] as const;
export const PRIMARY_CONCERNS = [
  "Retirement Shortfall",
  "Estate Taxes",
  "Business Risk",
  "Low Investment Yields",
] as const;
export const CAPITAL_RANGES = [
  { id: "under-100k", label: "Under R100,000", min: 0, max: 99_999 },
  { id: "100k-500k", label: "R100,000 – R500,000", min: 100_000, max: 499_999 },
  { id: "500k-plus", label: "R500,000+", min: 500_000, max: Infinity },
] as const;

export type AgeBracket = (typeof AGE_BRACKETS)[number];
export type PrimaryConcern = (typeof PRIMARY_CONCERNS)[number];
export type CapitalRangeId = (typeof CAPITAL_RANGES)[number]["id"];

type QuizState = {
  ageBracket: AgeBracket | null;
  primaryConcern: PrimaryConcern | null;
  availableCapital: CapitalRangeId | null;
  setAgeBracket: (value: AgeBracket) => void;
  setPrimaryConcern: (value: PrimaryConcern) => void;
  setAvailableCapital: (value: CapitalRangeId | null) => void;
  reset: () => void;
};

const initialState = {
  ageBracket: null as AgeBracket | null,
  primaryConcern: null as PrimaryConcern | null,
  availableCapital: null as CapitalRangeId | null,
};

export const useQuizStore = create<QuizState>((set) => ({
  ...initialState,
  setAgeBracket: (ageBracket) => set({ ageBracket }),
  setPrimaryConcern: (primaryConcern) => set({ primaryConcern }),
  setAvailableCapital: (value) => set({ availableCapital: value }),
  reset: () => set(initialState),
}));

/** Returns true if user has more than R100,000 available (for Everest 12.8% rule). */
export function hasCapitalOver100k(rangeId: CapitalRangeId | null): boolean {
  if (!rangeId) return false;
  return rangeId !== "under-100k";
}
