"use server";

import { financialFreedomRegistrationSchema } from "@/lib/validations/membership-registration";

export type FinancialFreedomRegisterState = {
  success: boolean;
  message: string;
};

/**
 * Captures Financial Freedom Community™ registration interest.
 * Payment activation + Supabase member provisioning come in the next build.
 */
export async function submitFinancialFreedomRegistration(
  _prev: FinancialFreedomRegisterState,
  formData: FormData
): Promise<FinancialFreedomRegisterState> {
  const raw = {
    firstName: String(formData.get("firstName") ?? ""),
    surname: String(formData.get("surname") ?? ""),
    email: String(formData.get("email") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    identityNumber: String(formData.get("identityNumber") ?? ""),
    city: String(formData.get("city") ?? ""),
    province: String(formData.get("province") ?? ""),
    primaryGoal: String(formData.get("primaryGoal") ?? ""),
    howDidYouHear: String(formData.get("howDidYouHear") ?? "") || undefined,
    consentPrivacy: formData.get("consentPrivacy") === "true" ? true : undefined,
    consentProgramme: formData.get("consentProgramme") === "true" ? true : undefined,
    website: String(formData.get("website") ?? ""),
  };

  if (raw.website) {
    return { success: true, message: "Thank you." };
  }

  const parsed = financialFreedomRegistrationSchema.safeParse(raw);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message ?? "Please check your details.";
    return { success: false, message: first };
  }

  /** Persist later via Supabase + payment provider. Log for ops visibility in non-prod. */
  if (process.env.NODE_ENV !== "production") {
    console.info("[ffc-register]", {
      email: parsed.data.email,
      name: `${parsed.data.firstName} ${parsed.data.surname}`,
      status: "registered_unpaid",
    });
  }

  return {
    success: true,
    message:
      "Registration captured. Payment checkout is the next step, once payment is confirmed, membership activates and unlocks the Goal Engineering Planner™.",
  };
}
