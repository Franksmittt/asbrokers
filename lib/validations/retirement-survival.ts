import { z } from "zod";

export const retirementSurvivalSubmitSchema = z.object({
  firstName: z.string().trim().min(1, "Please enter your first name."),
  email: z.string().trim().email("Please enter a valid email address."),
  phone: z
    .string()
    .trim()
    .optional()
    .transform((value) => value || undefined),
  currentAge: z.coerce.number().min(18).max(100),
  freedomAge: z.coerce.number().min(40).max(100),
  desiredMonthlyIncomeToday: z.coerce.number().min(1),
  lifeExpectancy: z.coerce.number().min(60).max(110),
  currentSavings: z.coerce.number().min(0),
  monthlySavings: z.coerce.number().min(0),
  investmentsOwned: z.string().optional(),
  financialFreedomScore: z.coerce.number().min(0).max(100),
  financialFreedomGap: z.coerce.number(),
  freedomRatePercent: z.coerce.number(),
  capitalRequired: z.coerce.number(),
  projectedCapital: z.coerce.number(),
  yearsToFreedom: z.coerce.number(),
  onTrack: z
    .union([z.literal("true"), z.literal("false"), z.boolean()])
    .transform((value) => value === true || value === "true"),
  website: z.string().max(0).optional(),
});

export type RetirementSurvivalSubmitPayload = z.infer<typeof retirementSurvivalSubmitSchema>;
