"use server";

import { calculateBusinessRiskScore } from "@/lib/business-risk/scoring";
import { insertBusinessRiskReview } from "@/lib/business-risk/repository";
import { notifyStaffLead } from "@/lib/email/notifications";
import { businessRiskLeadSchema } from "@/lib/validations/business-risk";

export type BusinessRiskSubmitState = {
  success: boolean;
  message?: string;
  reportId?: string;
  fieldErrors?: Record<string, string[]>;
};

export async function submitBusinessRiskReview(
  _prev: BusinessRiskSubmitState,
  formData: FormData
): Promise<BusinessRiskSubmitState> {
  const raw = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    company: String(formData.get("company") ?? ""),
    industry: String(formData.get("industry") ?? ""),
    selectedCoverIds: formData.getAll("selectedCoverIds").map(String),
    website: String(formData.get("website") ?? ""),
  };

  const parsed = businessRiskLeadSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      success: false,
      message: "Please fix the errors below.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  if (parsed.data.website) {
    return { success: true, message: "Thank you." };
  }

  const score = calculateBusinessRiskScore(parsed.data.selectedCoverIds);
  const reportId = await insertBusinessRiskReview({
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone,
    company: parsed.data.company,
    industry: parsed.data.industry,
    coverageScore: score.coveredCount,
    totalItems: score.totalCount,
    protectionPercent: score.protectionPercent,
    gapCount: score.gapCount,
    protectionBand: score.band,
    selectedCoverIds: score.selectedIds,
    missingCoverIds: score.missingIds,
  });

  if (!reportId) {
    return {
      success: false,
      message:
        "We could not save your review right now. Please contact AS Brokers directly and we will assist you.",
    };
  }

  try {
    await notifyStaffLead("Business Risk Review", {
      Name: parsed.data.name,
      Email: parsed.data.email,
      Phone: parsed.data.phone,
      Company: parsed.data.company,
      Industry: parsed.data.industry,
      "Protection %": String(score.protectionPercent),
    });
  } catch {
    /* non-blocking */
  }

  return {
    success: true,
    message: "Your Business Risk Review has been saved.",
    reportId,
  };
}
