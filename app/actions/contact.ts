"use server";

import { contactFormSchema } from "@/lib/validations/schema";
import type { ContactActionState } from "@/lib/validations/schema";
import { syncContactToHubSpot } from "@/lib/hubspot.service";
import { notifyStaffContactEnquiry } from "@/lib/email/notifications";
import { contactLeadScore, serviceCategoryFromContactTopics } from "@/lib/crm/contact-lead";
import { insertCrmLead } from "@/lib/crm/insert-lead";

const SUBMIT_ERROR =
  "We could not send your enquiry right now. Please try again or WhatsApp us on +27 66 227 6044.";

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
 * Server Action for main contact form. Emails Albert immediately via Resend.
 * HubSpot sync and visitor auto-replies are optional / deferred.
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

  const crmLeadId = await insertCrmLead({
    sourceFunnel: "contact_form",
    serviceCategory: serviceCategoryFromContactTopics(payload.topics),
    leadScore: contactLeadScore(payload.topics),
    rawPayload: {
      name: payload.fullName,
      email: payload.email,
      phone: payload.phone,
      intent: payload.topics.length ? payload.topics.join(", ") : "General enquiry",
      topics: payload.topics,
    },
  });

  const emailResult = await notifyStaffContactEnquiry({
    fullName: payload.fullName,
    email: payload.email,
    phone: payload.phone,
    topics: payload.topics,
  });

  if (!emailResult.ok) {
    if (process.env.NODE_ENV === "development") {
      console.error("[Contact] Resend failed:", emailResult.error);
    }
    if (!crmLeadId) {
      return { success: false, message: SUBMIT_ERROR };
    }
  }

  void syncContactToHubSpot(payload).catch((e) => {
    if (process.env.NODE_ENV === "development") {
      console.error("[Contact] HubSpot sync failed (non-blocking):", e);
    }
  });

  const triggerSecret = process.env.TRIGGER_SECRET_KEY;
  if (triggerSecret) {
    void fetch("https://api.trigger.dev/api/v1/tasks/generate-financial-pdf/trigger", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${triggerSecret}`,
      },
      body: JSON.stringify({
        payload: { email: payload.email, fullName: payload.fullName },
      }),
    }).catch((e) => {
      if (process.env.NODE_ENV === "development") {
        console.error("[Contact] PDF task trigger failed:", e);
      }
    });
  }

  return { success: true, message: "Thank you. We'll be in touch." };
}

export type { ContactActionState };
