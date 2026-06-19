"use server";

import { syncHealthyRetirementToHubSpot } from "@/lib/hubspot.service";
import { notifyStaffLead } from "@/lib/email/notifications";
import { insertHealthyRetirementAssessment } from "@/lib/healthy-retirement/repository";
import { calculateHealthyRetirementScore } from "@/lib/healthy-retirement/scoring";
import type { HealthyRetirementAnswers } from "@/lib/healthy-retirement/questions";
import { healthyRetirementSubmitSchema } from "@/lib/validations/healthy-retirement";

export type HealthyRetirementSubmitState = {
  success: boolean;
  message?: string;
  reportId?: string;
  score?: number;
  gap?: number;
  bandLabel?: string;
  fieldErrors?: Record<string, string[]>;
};

export async function submitHealthyRetirementAssessment(
  _prev: HealthyRetirementSubmitState,
  formData: FormData
): Promise<HealthyRetirementSubmitState> {
  const raw = {
    firstName: String(formData.get("firstName") ?? ""),
    email: String(formData.get("email") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    age: String(formData.get("age") ?? ""),
    exerciseDays: String(formData.get("exerciseDays") ?? ""),
    walk30Minutes: String(formData.get("walk30Minutes") ?? ""),
    smoke: String(formData.get("smoke") ?? ""),
    sleepHours: String(formData.get("sleepHours") ?? ""),
    checkup12Months: String(formData.get("checkup12Months") ?? ""),
    knowBloodPressure: String(formData.get("knowBloodPressure") ?? ""),
    knowCholesterol: String(formData.get("knowCholesterol") ?? ""),
    healthRating: String(formData.get("healthRating") ?? ""),
    retirement20Years: String(formData.get("retirement20Years") ?? ""),
    website: String(formData.get("website") ?? ""),
  };

  const parsed = healthyRetirementSubmitSchema.safeParse(raw);
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

  const answers: HealthyRetirementAnswers = {
    age: parsed.data.age,
    exerciseDays: parsed.data.exerciseDays,
    walk30Minutes: parsed.data.walk30Minutes,
    smoke: parsed.data.smoke,
    sleepHours: parsed.data.sleepHours,
    checkup12Months: parsed.data.checkup12Months,
    knowBloodPressure: parsed.data.knowBloodPressure,
    knowCholesterol: parsed.data.knowCholesterol,
    healthRating: parsed.data.healthRating,
    retirement20Years: parsed.data.retirement20Years,
  };

  const result = calculateHealthyRetirementScore(answers);

  const reportId = await insertHealthyRetirementAssessment({
    firstName: parsed.data.firstName,
    email: parsed.data.email,
    phone: parsed.data.phone,
    answers,
    healthScore: result.score,
    healthGap: result.gap,
    scoreBand: result.band,
  });

  await syncHealthyRetirementToHubSpot({
    firstName: parsed.data.firstName,
    email: parsed.data.email,
    phone: parsed.data.phone,
    healthScore: result.score,
    healthGap: result.gap,
    scoreBand: result.band,
  });

  try {
    const emailResult = await notifyStaffLead("Healthy Retirement Blueprint", {
      Name: parsed.data.firstName,
      Email: parsed.data.email,
      Phone: parsed.data.phone ?? "",
      "Health score": String(result.score),
      "Health gap": String(result.gap),
    });
    if (!emailResult.ok && process.env.NODE_ENV === "development") {
      console.error("[Healthy Retirement] Resend failed:", emailResult.error);
    }
  } catch {
    /* non-blocking */
  }

  if (!reportId) {
    return {
      success: true,
      message: "Your results are ready. We could not save your details — contact AS Brokers for your full blueprint.",
      score: result.score,
      gap: result.gap,
      bandLabel: result.bandLabel,
      reportId: "preview",
    };
  }

  return {
    success: true,
    message: "Your Healthy Retirement Blueprint™ is ready.",
    reportId,
    score: result.score,
    gap: result.gap,
    bandLabel: result.bandLabel,
  };
}
