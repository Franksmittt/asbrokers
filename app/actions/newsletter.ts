"use server";

import { newsletterSchema } from "@/lib/validations/schema";
import { syncNewsletterToHubSpot } from "@/lib/hubspot.service";
import { notifyStaffNewsletterSignup } from "@/lib/email/notifications";

export type NewsletterActionState = { success: boolean; message?: string; fieldErrors?: { email?: string[] } };

const SUBMIT_ERROR = "Could not subscribe right now. Please try again later.";

/**
 * Footer newsletter signup. Notifies Albert via Resend; HubSpot sync deferred.
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

  const emailResult = await notifyStaffNewsletterSignup(parsed.data.email);
  if (!emailResult.ok) {
    if (process.env.NODE_ENV === "development") {
      console.error("[Newsletter] Resend failed:", emailResult.error);
    }
    return { success: false, message: SUBMIT_ERROR };
  }

  void syncNewsletterToHubSpot(parsed.data).catch((e) => {
    if (process.env.NODE_ENV === "development") {
      console.error("[Newsletter] HubSpot sync failed (non-blocking):", e);
    }
  });

  return { success: true, message: "Subscribed!" };
}
