import { z } from "zod";

/** Interest tags for chat callback routing into CRM service categories. */
export const chatLeadInterestSchema = z.enum([
  "discovery_health",
  "everest_retirement",
  "estate_planning",
  "insurance",
  "general_callback",
]);

export type ChatLeadInterest = z.infer<typeof chatLeadInterestSchema>;

/**
 * Digital Wealth Assistant callback / leave-details capture.
 * POPIA: consent must be explicit from the user before the tool runs.
 */
export const chatCallbackLeadSchema = z.object({
  fullName: z.string().trim().min(2, "Name is required").max(120),
  phone: z.string().trim().min(9, "Phone is required").max(40),
  email: z.string().trim().email("Valid email is required").max(160),
  interest: chatLeadInterestSchema.optional(),
  notes: z.string().trim().max(500).optional(),
  /** Must be true only after the user clearly agrees to be contacted (POPIA). */
  consent: z.literal(true),
});

export type ChatCallbackLeadInput = z.infer<typeof chatCallbackLeadSchema>;
