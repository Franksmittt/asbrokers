"use server";

import { syncLegacyChecklistLeadToHubSpot } from "@/lib/hubspot.service";
import { notifyStaffLead } from "@/lib/email/notifications";
import { insertLegacyChecklistLead } from "@/lib/legacy-checklist/repository";
import { legacyChecklistLeadSchema } from "@/lib/validations/legacy-checklist";

export type LegacyChecklistSubmitState = {
  success: boolean;
  message?: string;
  checklistUrl?: string;
  fieldErrors?: Record<string, string[]>;
};

export async function submitLegacyChecklistLead(
  _prev: LegacyChecklistSubmitState,
  formData: FormData
): Promise<LegacyChecklistSubmitState> {
  const raw = {
    firstName: String(formData.get("firstName") ?? ""),
    surname: String(formData.get("surname") ?? ""),
    email: String(formData.get("email") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    age: formData.get("age") ?? "",
    businessOwner: String(formData.get("businessOwner") ?? ""),
    website: String(formData.get("website") ?? ""),
  };

  const parsed = legacyChecklistLeadSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      success: false,
      message: "Please fix the errors below.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  if (parsed.data.website) {
    return { success: true, message: "Thank you.", checklistUrl: "/legacy-readiness-checklist/checklist/preview" };
  }

  const leadId = await insertLegacyChecklistLead({
    firstName: parsed.data.firstName,
    surname: parsed.data.surname,
    email: parsed.data.email,
    phone: parsed.data.phone,
    age: parsed.data.age,
    businessOwner: parsed.data.businessOwner,
  });

  await syncLegacyChecklistLeadToHubSpot({
    firstName: parsed.data.firstName,
    surname: parsed.data.surname,
    email: parsed.data.email,
    phone: parsed.data.phone,
    businessOwner: parsed.data.businessOwner,
  });

  try {
    const emailResult = await notifyStaffLead("Legacy Readiness Checklist", {
      Name: `${parsed.data.firstName} ${parsed.data.surname}`,
      Email: parsed.data.email,
      Phone: parsed.data.phone ?? "",
      "Business owner": parsed.data.businessOwner,
    });
    if (!emailResult.ok && process.env.NODE_ENV === "development") {
      console.error("[Legacy Checklist] Resend failed:", emailResult.error);
    }
  } catch {
    /* non-blocking */
  }

  if (!leadId) {
    return {
      success: true,
      message:
        "Your checklist is ready. We could not save your details right now — please contact AS Brokers if you would like a follow-up.",
      checklistUrl: "/legacy-readiness-checklist/checklist/preview",
    };
  }

  return {
    success: true,
    message: "Your Legacy Readiness Checklist is ready.",
    checklistUrl: `/legacy-readiness-checklist/checklist/${leadId}`,
  };
}
