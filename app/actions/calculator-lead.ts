"use server";

import {
  calculatorLeadSchema,
  type CalculatorLeadActionState,
} from "@/lib/validations/schema";
import { notifyStaffLead } from "@/lib/email/notifications";
import { insertCrmLead } from "@/lib/crm/insert-lead";
import type { ServiceCategory } from "@/lib/crm/types";
import { WHATSAPP_DISPLAY } from "@/lib/whatsapp";

const SUBMIT_ERROR = `We could not send your details right now. Please try again or WhatsApp us on ${WHATSAPP_DISPLAY}.`;

function serviceCategoryFromCalculatorPath(path: string): ServiceCategory {
  const p = path.toLowerCase();
  if (p.includes("estate") || p.includes("duty") || p.includes("donation") || p.includes("will")) {
    return "estate_business";
  }
  if (p.includes("medical") || p.includes("gap")) {
    return "medical_wellness";
  }
  if (p.includes("insurance") || p.includes("risk") || p.includes("claim")) {
    return "short_term_personal";
  }
  return "retirement_everest";
}

function calculatorLeadScore(capitalAmount?: number): number {
  let score = 35;
  if (capitalAmount && capitalAmount > 1_000_000) score += 20;
  else if (capitalAmount && capitalAmount >= 100_000) score += 10;
  return score;
}

/**
 * Soft lead capture after calculator use. Does not gate results.
 * Writes CRM lead + staff email.
 */
export async function submitCalculatorLead(
  _prevState: CalculatorLeadActionState,
  formData: FormData
): Promise<CalculatorLeadActionState> {
  const consent = formData.get("consent");
  const raw = {
    fullName: formData.get("fullName") ?? "",
    phone: formData.get("phone") ?? "",
    email: formData.get("email") ?? "",
    capitalAmount: formData.get("capitalAmount") ?? "",
    consent: consent === "true" || consent === "on",
    website: formData.get("website") ?? "",
    calculatorId: formData.get("calculatorId") ?? "",
    calculatorPath: formData.get("calculatorPath") ?? "",
  };

  const parsed = calculatorLeadSchema.safeParse(raw);
  if (!parsed.success) {
    const flat = parsed.error.flatten();
    return {
      success: false,
      message: "Please fix the errors below.",
      fieldErrors: flat.fieldErrors as CalculatorLeadActionState["fieldErrors"],
    };
  }

  const payload = parsed.data;
  if (payload.website && String(payload.website).length > 0) {
    return { success: true, message: "Thank you. We'll be in touch." };
  }

  const calculatorPath = payload.calculatorPath ?? "";
  const serviceCategory = serviceCategoryFromCalculatorPath(calculatorPath);
  const leadScore = calculatorLeadScore(payload.capitalAmount);

  const crmLeadId = await insertCrmLead({
    sourceFunnel: "calculator_lead",
    serviceCategory,
    leadScore,
    rawPayload: {
      name: payload.fullName,
      email: payload.email,
      phone: payload.phone,
      intent: "Calculator follow-up / capital assessment",
      topics: ["everest"],
      source: "calculator_lead",
      calculatorId: payload.calculatorId ?? "",
      calculatorPath,
      ...(typeof payload.capitalAmount === "number"
        ? { capitalAmount: payload.capitalAmount }
        : {}),
    },
  });

  const emailResult = await notifyStaffLead("Calculator lead", {
    Name: payload.fullName,
    Email: payload.email,
    Phone: payload.phone,
    Calculator: payload.calculatorId || calculatorPath || "Unknown",
    Path: calculatorPath || undefined,
    Capital:
      typeof payload.capitalAmount === "number"
        ? `R${payload.capitalAmount.toLocaleString("en-ZA")}`
        : undefined,
  });

  if (!emailResult.ok) {
    if (process.env.NODE_ENV === "development") {
      console.error("[CalculatorLead] Resend failed:", emailResult.error);
    }
    if (!crmLeadId) {
      return { success: false, message: SUBMIT_ERROR };
    }
  }

  return {
    success: true,
    message: "Thank you. We'll be in touch to walk through your numbers.",
  };
}

export type { CalculatorLeadActionState };
