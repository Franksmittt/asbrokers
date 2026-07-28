"use server";

import { insertCrmLead } from "@/lib/crm/insert-lead";
import { getLeadAttribution } from "@/lib/crm/lead-attribution";
import { notifyStaffLead } from "@/lib/email/notifications";
import {
  CALLBACK_SOURCES,
  callbackLeadSchema,
  type CallbackActionState,
} from "@/lib/validations/callback-lead";

const SUBMIT_ERROR =
  "We could not send your request right now. Please try again or WhatsApp us on +27 66 227 6044.";

export async function requestCallback(
  _prev: CallbackActionState,
  formData: FormData
): Promise<CallbackActionState> {
  const raw = {
    fullName: String(formData.get("fullName") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    email: String(formData.get("email") ?? ""),
    note: String(formData.get("note") ?? ""),
    consent: formData.get("consent") === "on" || formData.get("consent") === "true",
    source: String(formData.get("source") ?? ""),
    website: String(formData.get("website") ?? ""),
  };

  const parsed = callbackLeadSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      success: false,
      message: "Please fix the errors below.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  // Honeypot: report success without storing anything.
  if (parsed.data.website) {
    return { success: true };
  }

  const config = CALLBACK_SOURCES[parsed.data.source];
  const intent = parsed.data.note?.trim()
    ? `${config.intent}: ${parsed.data.note.trim()}`
    : config.intent;
  const attribution = await getLeadAttribution();

  const crmLeadId = await insertCrmLead({
    sourceFunnel: "callback_form",
    serviceCategory: config.serviceCategory,
    leadScore: config.leadScore,
    rawPayload: {
      name: parsed.data.fullName,
      email: parsed.data.email || undefined,
      phone: parsed.data.phone,
      intent,
      source: `callback_${parsed.data.source}`,
      notes: parsed.data.note?.trim() || undefined,
      consent: true,
      consentChannel: "callback_form",
      ...(attribution ? { attribution } : {}),
    },
  });

  try {
    const emailResult = await notifyStaffLead("Callback request", {
      Name: parsed.data.fullName,
      Phone: parsed.data.phone,
      Email: parsed.data.email || undefined,
      Note: parsed.data.note?.trim() || undefined,
      Page: config.label,
    });
    if (!emailResult.ok && process.env.NODE_ENV === "development") {
      console.error("[callback] Resend failed:", emailResult.error);
    }
  } catch {
    /* non-blocking */
  }

  if (!crmLeadId) {
    return { success: false, message: SUBMIT_ERROR };
  }

  return { success: true };
}
