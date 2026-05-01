import { z } from "zod";

/** Minimum lump-sum investment for Everest Wealth voluntary products (Strategic Growth, Strategic Income, Onyx). */
export const EVEREST_MIN_INVESTMENT = 100_000;

export const investmentLeadSchema = z.object({
  investmentAmount: z
    .number({ required_error: "Investment amount is required" })
    .min(EVEREST_MIN_INVESTMENT, `Minimum investment is R${EVEREST_MIN_INVESTMENT.toLocaleString()}`),
  fullName: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(9, "Valid phone required"),
  consent: z.literal(true, { errorMap: () => ({ message: "Consent is required" }) }),
});

export type InvestmentLeadPayload = z.infer<typeof investmentLeadSchema>;
