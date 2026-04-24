"use server";

import { contactFormSchema } from "@/lib/validations/schema";
import type { ContactActionState } from "@/lib/validations/schema";
import { syncContactToHubSpot } from "@/lib/hubspot.service";

const INITIAL_STATE: ContactActionState = { success: false };

function formDataToObject(formData: FormData): Record<string, unknown> {
  const topicsRaw = formData.get("topics");
  let topics: string[] = [];
  if (typeof topicsRaw === "string") {
    try {
      const parsed = JSON.parse(topicsRaw) as unknown;
      topics = Array.isArray(parsed) ? parsed.filter((t): t is string => typeof t === "string") : [];
    } catch {
      topics = [];
    }
  } else if (topicsRaw != null) {
    topics = [String(topicsRaw)];
  }
  const consent = formData.get("consent");
  return {
    fullName: formData.get("fullName") ?? "",
    phone: formData.get("phone") ?? "",
    email: formData.get("email") ?? "",
    topics,
    consent: consent === "true" || consent === "on",
    website: formData.get("website") ?? "",
  };
}

/**
 * Server Action for main contact form. useActionState(submitContactEnquiry, initialState).
 * Validates with Zod, returns field-level errors via flatten(); syncs to HubSpot with cumulative lead scoring.
 */
export async function submitContactEnquiry(
  _prevState: ContactActionState,
  formData: FormData
): Promise<ContactActionState> {
  const raw = formDataToObject(formData);
  const parsed = contactFormSchema.safeParse(raw);

  if (!parsed.success) {
    const flat = parsed.error.flatten();
    return {
      success: false,
      message: "Please fix the errors below.",
      fieldErrors: flat.fieldErrors as ContactActionState["fieldErrors"],
    };
  }

  const payload = parsed.data;

  if (payload.website && String(payload.website).length > 0) {
    return { success: true, message: "Thank you. We'll be in touch." };
  }

  const result = await syncContactToHubSpot(payload);

  if (!result.success) {
    return {
      success: false,
      message: result.error ?? "Could not save your enquiry. Please try again or contact us on WhatsApp.",
    };
  }

  const triggerSecret = process.env.TRIGGER_SECRET_KEY;
  if (triggerSecret) {
    try {
      await fetch("https://api.trigger.dev/api/v1/tasks/generate-financial-pdf/trigger", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${triggerSecret}`,
        },
        body: JSON.stringify({
          payload: { email: payload.email, fullName: payload.fullName },
        }),
      });
    } catch (e) {
      if (process.env.NODE_ENV === "development") {
        console.error("[Contact] PDF task trigger failed:", e);
      }
    }
  }

  return { success: true, message: "Thank you. We'll be in touch." };
}

export type { ContactActionState };
