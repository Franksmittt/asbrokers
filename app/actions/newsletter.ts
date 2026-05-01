"use server";

import { newsletterSchema } from "@/lib/validations/schema";
import { syncNewsletterToHubSpot } from "@/lib/hubspot.service";

export type NewsletterActionState = { success: boolean; message?: string; fieldErrors?: { email?: string[] } };

const INITIAL_STATE: NewsletterActionState = { success: false };

/**
 * Server Action for footer newsletter signup. Zod validation, HubSpot sync (+10 lead score).
 */
export async function subscribeNewsletter(
  _prevState: NewsletterActionState,
  formData: FormData
): Promise<NewsletterActionState> {
  const email = String(formData.get("email") ?? "").trim();
  const parsed = newsletterSchema.safeParse({ email });

  if (!parsed.success) {
    const flat = parsed.error.flatten();
    return {
      success: false,
      message: "Please fix the errors below.",
      fieldErrors: flat.fieldErrors as { email?: string[] },
    };
  }

  const result = await syncNewsletterToHubSpot(parsed.data);

  if (!result.success) {
    return {
      success: false,
      message: result.error ?? "Could not subscribe. Please try again.",
    };
  }

  return { success: true, message: "Subscribed!" };
}
