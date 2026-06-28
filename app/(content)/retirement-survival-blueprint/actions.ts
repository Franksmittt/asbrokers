"use server";

import { formatBlueprintRand } from "@/lib/blueprint/calculations";
import { insertCrmLead } from "@/lib/crm/insert-lead";
import { notifyStaffLead } from "@/lib/email/notifications";
import { retirementSurvivalSubmitSchema } from "@/lib/validations/retirement-survival";

export type RetirementSurvivalSubmitState = {
  success: boolean;
  message?: string;
  fieldErrors?: Record<string, string[]>;
};

export async function submitRetirementSurvivalBlueprint(
  _prev: RetirementSurvivalSubmitState,
  formData: FormData
): Promise<RetirementSurvivalSubmitState> {
  const raw = {
    firstName: String(formData.get("firstName") ?? ""),
    email: String(formData.get("email") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    currentAge: String(formData.get("currentAge") ?? ""),
    freedomAge: String(formData.get("freedomAge") ?? ""),
    desiredMonthlyIncomeToday: String(formData.get("desiredMonthlyIncomeToday") ?? ""),
    lifeExpectancy: String(formData.get("lifeExpectancy") ?? ""),
    currentSavings: String(formData.get("currentSavings") ?? ""),
    monthlySavings: String(formData.get("monthlySavings") ?? ""),
    investmentsOwned: String(formData.get("investmentsOwned") ?? ""),
    financialFreedomScore: String(formData.get("financialFreedomScore") ?? ""),
    financialFreedomGap: String(formData.get("financialFreedomGap") ?? ""),
    freedomRatePercent: String(formData.get("freedomRatePercent") ?? ""),
    capitalRequired: String(formData.get("capitalRequired") ?? ""),
    projectedCapital: String(formData.get("projectedCapital") ?? ""),
    yearsToFreedom: String(formData.get("yearsToFreedom") ?? ""),
    onTrack: String(formData.get("onTrack") ?? "false"),
    website: String(formData.get("website") ?? ""),
  };

  const parsed = retirementSurvivalSubmitSchema.safeParse(raw);
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

  const data = parsed.data;
  const gapLabel = data.onTrack ? "On track" : formatBlueprintRand(data.financialFreedomGap);

  const crmLeadId = await insertCrmLead({
    sourceFunnel: "retirement_survival_blueprint",
    serviceCategory: "retirement_everest",
    leadScore: Math.min(100, Math.max(10, data.financialFreedomScore)),
    rawPayload: {
      name: data.firstName,
      email: data.email,
      phone: data.phone ?? "",
      intent: "Retirement Survival Blueprint",
      funnelData: {
        assessment: "Retirement Survival Blueprint",
        score: `${data.financialFreedomScore} / 100`,
        keyRisk: data.onTrack ? "On track" : `Gap ${gapLabel}`,
        capital: formatBlueprintRand(data.capitalRequired),
      },
      blueprint: {
        currentAge: data.currentAge,
        freedomAge: data.freedomAge,
        desiredMonthlyIncomeToday: data.desiredMonthlyIncomeToday,
        lifeExpectancy: data.lifeExpectancy,
        currentSavings: data.currentSavings,
        monthlySavings: data.monthlySavings,
        investmentsOwned: data.investmentsOwned ?? "",
        financialFreedomScore: data.financialFreedomScore,
        financialFreedomGap: data.financialFreedomGap,
        freedomRatePercent: data.freedomRatePercent,
        capitalRequired: data.capitalRequired,
        projectedCapital: data.projectedCapital,
        yearsToFreedom: data.yearsToFreedom,
        onTrack: data.onTrack,
      },
    },
  });

  void notifyStaffLead("Retirement Survival Blueprint", {
    Name: data.firstName,
    Email: data.email,
    Phone: data.phone ?? "",
    "Freedom score": String(data.financialFreedomScore),
    Gap: gapLabel,
    "Freedom rate": `${data.freedomRatePercent.toFixed(2)}%`,
  }).catch(() => {
    /* non-blocking */
  });

  if (!crmLeadId) {
    return {
      success: false,
      message:
        "We could not save your blueprint right now. Please contact AS Brokers and we will assist you.",
    };
  }

  return {
    success: true,
    message: "Your Retirement Survival Blueprint has been saved.",
  };
}
