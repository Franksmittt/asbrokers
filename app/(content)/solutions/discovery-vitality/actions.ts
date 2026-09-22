"use server";

import { notifyStaffLead } from "@/lib/email/notifications";
import { insertCrmLead } from "@/lib/crm/insert-lead";
import { getLeadAttribution } from "@/lib/crm/lead-attribution";
import {
  discoveryVitalityLeadSchema,
  vitalityInterestLabels,
  type DiscoveryVitalitySubmitState,
} from "@/lib/validations/discovery-vitality";

const SUBMIT_ERROR =
  "We could not send your request right now. Please try again or WhatsApp us on +27 66 227 6044.";

export async function submitDiscoveryVitalityLead(
  _prev: DiscoveryVitalitySubmitState,
  formData: FormData
): Promise<DiscoveryVitalitySubmitState> {
  const raw = {
    fullName: String(formData.get("fullName") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    email: String(formData.get("email") ?? ""),
    interest: String(formData.get("interest") ?? ""),
    consent: formData.get("consent") === "true" || formData.get("consent") === "on",
    website: String(formData.get("website") ?? ""),
  };

  const parsed = discoveryVitalityLeadSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      success: false,
      message: "Please fix the errors below.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  if (parsed.data.website) {
    return { success: true, message: "Thank you. We will be in touch shortly." };
  }

  const interestLabel = vitalityInterestLabels[parsed.data.interest];
  const attribution = await getLeadAttribution();

  const crmLeadId = await insertCrmLead({
    sourceFunnel: "discovery_vitality",
    serviceCategory: "medical_wellness",
    leadScore: parsed.data.interest === "new_to_vitality" ? 32 : 26,
    rawPayload: {
      name: parsed.data.fullName,
      email: parsed.data.email,
      phone: parsed.data.phone,
      intent: "Discovery Vitality signup via AS Brokers",
      source: "discovery_vitality_form",
      interest: parsed.data.interest,
      interestLabel,
      topics: ["wellness", "medical"],
      ...(attribution ? { attribution } : {}),
    },
  });

  try {
    const emailResult = await notifyStaffLead("Discovery Vitality enquiry", {
      Name: parsed.data.fullName,
      Email: parsed.data.email,
      Phone: parsed.data.phone,
      Interest: interestLabel,
      Source: "Discovery Vitality landing page",
    });
    if (!emailResult.ok && process.env.NODE_ENV === "development") {
      console.error("[Discovery Vitality] Resend failed:", emailResult.error);
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
      "Request received. An authorised representative of FSP 17273 will contact you within one business day. No product is recommended from this form alone.",
  };
}
