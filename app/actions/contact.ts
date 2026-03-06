"use server";

import { z } from "zod";

const contactSchema = z.object({
  fullName: z.string().min(2),
  phone: z.string().min(9),
  email: z.string().email(),
  topics: z.array(z.string()).min(1),
  consent: z.literal(true),
  website: z.string().max(0).optional(),
});

export type ContactFormPayload = z.infer<typeof contactSchema>;

export interface SubmitContactResult {
  success: boolean;
  error?: string;
}

/**
 * Server Action: submit contact enquiry.
 * Validates with Zod; in production would send to HubSpot CRM.
 * API keys must stay server-side only.
 */
export async function submitContactEnquiry(data: unknown): Promise<SubmitContactResult> {
  const parsed = contactSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: "Invalid form data." };
  }
  const payload = parsed.data;
  if (payload.website && payload.website.length > 0) {
    return { success: true }; // honeypot: treat as success but do not store
  }
  // TODO: HubSpot API — create/update contact, set properties, trigger lead scoring
  // const hubspot = getHubSpotClient(); await hubspot.contacts.createOrUpdate(...)
  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-console
    console.log("[Contact] Enquiry received:", { fullName: payload.fullName, topics: payload.topics });
  }
  return { success: true };
}
