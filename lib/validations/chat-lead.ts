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
 * Tool input for Gemini, must stay JSON-Schema friendly.
 * Do NOT use z.literal(true): Gemini rejects boolean enum values (TYPE_STRING).
 */
export const chatCallbackLeadToolSchema = z.object({
  fullName: z.string().min(2, "Name is required").max(120),
  phone: z.string().min(9, "Phone is required").max(40),
  email: z.string().email("Valid email is required").max(160),
  interest: chatLeadInterestSchema.optional(),
  notes: z.string().max(500).optional(),
  /** True only after the user clearly agrees to be contacted (POPIA). */
  consent: z
    .boolean()
    .describe("Set true only if the user explicitly agreed AS Brokers may contact them (POPIA)."),
});

/** Runtime validation after the model calls the tool. */
export const chatCallbackLeadSchema = chatCallbackLeadToolSchema.superRefine((data, ctx) => {
  if (data.consent !== true) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["consent"],
      message: "User must explicitly consent to be contacted before capturing details",
    });
  }
});

export type ChatCallbackLeadInput = z.infer<typeof chatCallbackLeadToolSchema>;
