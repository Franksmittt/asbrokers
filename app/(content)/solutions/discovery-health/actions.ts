"use server";

import { notifyStaffLead } from "@/lib/email/notifications";
import { insertCrmLead } from "@/lib/crm/insert-lead";
import {
  discoveryHealthLeadSchema,
  discoveryStatusLabels,
  type DiscoveryHealthSubmitState,
} from "@/lib/validations/discovery-health";

const SUBMIT_ERROR =
  "We could not send your request right now. Please try again or WhatsApp us on +27 66 227 6044.";

export async function submitDiscoveryHealthLead(
  _prev: DiscoveryHealthSubmitState,
  formData: FormData
): Promise<DiscoveryHealthSubmitState> {
  const raw = {
    fullName: String(formData.get("fullName") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    email: String(formData.get("email") ?? ""),
    currentStatus: String(formData.get("currentStatus") ?? ""),
    consent: formData.get("consent") === "true" || formData.get("consent") === "on",
    website: String(formData.get("website") ?? ""),
  };

  const parsed = discoveryHealthLeadSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      success: false,
      message: "Please fix the errors below.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  if (parsed.data.website) {
    return { success: true, message: "Thank you. A healthcare analyst will be in touch." };
  }

  const statusLabel = discoveryStatusLabels[parsed.data.currentStatus];

  const crmLeadId = await insertCrmLead({
    sourceFunnel: "discovery_health",
    serviceCategory: "medical_wellness",
    leadScore: parsed.data.currentStatus === "looking_to_switch" ? 35 : 28,
    rawPayload: {
      name: parsed.data.fullName,
      email: parsed.data.email,
      phone: parsed.data.phone,
      intent: "Discovery Health + Gap stack audit",
      source: "discovery_health_form",
      currentStatus: parsed.data.currentStatus,
      currentStatusLabel: statusLabel,
      topics: ["medical_gap", "medical"],
    },
  });

  try {
    const emailResult = await notifyStaffLead("Discovery Health plan audit", {
      Name: parsed.data.fullName,
      Email: parsed.data.email,
      Phone: parsed.data.phone,
      Status: statusLabel,
      Source: "Discovery Health landing page",
    });
    if (!emailResult.ok && process.env.NODE_ENV === "development") {
      console.error("[Discovery Health] Resend failed:", emailResult.error);
    }
  } catch {
    /* non-blocking */
  }

  if (!crmLeadId) {
    return { success: false, message: SUBMIT_ERROR };
  }

  return {
    success: true,
    message:
      "Request received. A certified adviser will contact you within one business day for a zero-cost FAIS-compliant coverage audit.",
  };
}
