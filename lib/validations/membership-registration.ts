import { z } from "zod";

/**
 * Financial Freedom Community™ member registration fields.
 * Signup → payment → active membership unlocks Goal Engineering Planner™
 * and other members-area learning tools.
 *
 * Registration UI + payment checkout come in a follow-up; this schema is the contract.
 */
export const financialFreedomRegistrationSchema = z.object({
  firstName: z.string().min(1, "Please enter your first name").max(80),
  surname: z.string().min(1, "Please enter your surname").max(80),
  email: z.string().email("Please enter a valid email"),
  phone: z
    .string()
    .min(9, "Please enter a valid South African mobile number")
    .max(20),
  /** Optional SA ID / passport for programme admin */
  identityNumber: z.string().max(20).optional().or(z.literal("")),
  city: z.string().min(2, "Please enter your city").max(80),
  province: z.enum(
    [
      "Gauteng",
      "Western Cape",
      "KwaZulu-Natal",
      "Eastern Cape",
      "Free State",
      "Limpopo",
      "Mpumalanga",
      "North West",
      "Northern Cape",
      "Outside South Africa",
    ],
    { errorMap: () => ({ message: "Please select a province" }) }
  ),
  /** Why they are joining — coaching context */
  primaryGoal: z
    .string()
    .min(3, "Please share your primary financial goal")
    .max(500),
  howDidYouHear: z
    .enum([
      "AS Brokers website",
      "Referral",
      "Social media",
      "YouTube",
      "Existing client",
      "Other",
    ])
    .optional(),
  /** POPIA / programme consent */
  consentPrivacy: z.literal(true, {
    errorMap: () => ({ message: "Please accept the privacy notice to continue" }),
  }),
  consentProgramme: z.literal(true, {
    errorMap: () => ({
      message: "Please confirm you want to join the Financial Freedom Community™",
    }),
  }),
  website: z.string().max(0).optional(),
});

export type FinancialFreedomRegistrationPayload = z.infer<
  typeof financialFreedomRegistrationSchema
>;

export type FinancialFreedomRegistrationFieldErrors = Partial<
  Record<keyof FinancialFreedomRegistrationPayload, string[]>
>;

/** Membership lifecycle after registration + payment. */
export type FfcMembershipStatus =
  | "none"
  | "registered_unpaid"
  | "payment_pending"
  | "active"
  | "expired"
  | "cancelled";

/**
 * App metadata keys written to Supabase Auth after payment succeeds.
 * Used by `hasActiveFinancialFreedomMembership`.
 */
export const FFC_APP_METADATA = {
  statusKey: "ffc_membership",
  activeValue: "active",
  programmeKey: "ffc_programme",
  programmeValue: "12-week-financial-freedom-community",
} as const;

/** Fields collected for My Financial Blueprint™ (member profile saves). */
export const financialBlueprintGoalSchema = z.object({
  goalLabel: z.string().min(2).max(160),
  currentValue: z.number().positive(),
  targetValue: z.number().positive(),
  timeHorizonMonths: z.number().int().positive().max(600),
  monthlyContribution: z.number().min(0).optional(),
  requiredAnnualReturnPct: z.number().optional(),
  createdAt: z.string().datetime().optional(),
  lastReviewedAt: z.string().datetime().optional(),
});

export type FinancialBlueprintGoal = z.infer<typeof financialBlueprintGoalSchema>;
