import { z } from "zod";

/**
 * Zod input schemas for deterministic financial tools.
 * Enforces SA regulatory limits (R100k min, 2.5–17.5% drawdown, non-negative amounts).
 */

export const calculateEstateDutySchema = z.object({
  grossEstateValue: z.number().min(0, "Gross estate value must be ≥ 0"),
  liabilities: z.number().min(0, "Liabilities must be ≥ 0"),
  spousalInheritance: z.number().min(0, "Spousal inheritance must be ≥ 0"),
  charityDonations: z.number().min(0).optional().default(0),
});

export const calculateStrategicIncomeSchema = z.object({
  capitalAmount: z.number().min(100_000, "Minimum investment is R100,000"),
});

export const calcAmethystAnnuitySchema = z.object({
  capitalAmount: z.number().min(100_000, "Minimum capital is R100,000"),
  drawdownPercentage: z.number().min(2.5).max(17.5, "Drawdown must be between 2.5% and 17.5%"),
});

export type EstateDutyInput = z.infer<typeof calculateEstateDutySchema>;
export type StrategicIncomeInput = z.infer<typeof calculateStrategicIncomeSchema>;
export type AmethystAnnuityInput = z.infer<typeof calcAmethystAnnuitySchema>;
