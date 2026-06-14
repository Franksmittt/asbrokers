"use server";

import { Resend } from "resend";

import { syncContactToHubSpot } from "@/lib/hubspot.service";
import {
  businessBlueprintLeadSchema,
  type BusinessBlueprintActionState,
  type BusinessBlueprintLeadPayload,
} from "@/lib/validations/schema";

const GUIDE_PATH = "/blueprints/business-survival-blueprint";

function formDataToObject(formData: FormData): Record<string, unknown> {
  const consent = formData.get("consent");
  return {
    fullName: formData.get("fullName") ?? "",
    phone: formData.get("phone") ?? "",
    email: formData.get("email") ?? "",
    businessName: formData.get("businessName") ?? "",
    businessStage: formData.get("businessStage") ?? "",
    biggestRisk: formData.get("biggestRisk") ?? "",
    continuityReadiness: formData.get("continuityReadiness") ?? "",
    consent: consent === "true" || consent === "on",
    website: formData.get("website") ?? "",
  };
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function absoluteGuideUrl() {
  const base = process.env.APP_URL ?? process.env.NEXT_PUBLIC_APP_URL ?? "https://www.asbrokers.co.za";
  return new URL(GUIDE_PATH, base).toString();
}

async function sendBusinessEmails(payload: BusinessBlueprintLeadPayload) {
  if (!process.env.RESEND_API_KEY) return;

  const resend = new Resend(process.env.RESEND_API_KEY);
  const from = process.env.RESEND_FROM ?? "AS Brokers <onboarding@resend.dev>";
  const guideUrl = absoluteGuideUrl();
  const safeName = escapeHtml(payload.fullName);
  const safeBusiness = escapeHtml(payload.businessName);
  const safeStage = escapeHtml(payload.businessStage);
  const safeRisk = escapeHtml(payload.biggestRisk);
  const safeReadiness = escapeHtml(payload.continuityReadiness);

  await resend.emails.send({
    from,
    to: [payload.email],
    subject: "Your Business Survival Blueprint",
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111827">
        <p>Hi ${safeName},</p>
        <p>Here is your AS Brokers Business Survival Blueprint:</p>
        <p><a href="${guideUrl}" style="color:#be123c;font-weight:bold">Open the Business Survival Blueprint</a></p>
        <p>The key question is simple: could your business survive a major disruption?</p>
        <p>Use the workbook to review commercial insurance, business interruption, key person risk, buy-and-sell cover, liability, cyber, succession, and continuity planning.</p>
        <p style="font-size:12px;color:#6b7280">AS Brokers CC · FSP 17273 · This educational material is not personalised financial advice.</p>
      </div>
    `,
  });

  const notificationTo =
    process.env.LEAD_NOTIFICATION_EMAIL ?? process.env.CONTACT_NOTIFICATION_EMAIL ?? process.env.RESEND_INTERNAL_TO;

  if (notificationTo) {
    await resend.emails.send({
      from,
      to: [notificationTo],
      subject: `New Business Survival Blueprint lead: ${payload.businessName}`,
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111827">
          <h2>New Business Survival Blueprint lead</h2>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Business:</strong> ${safeBusiness}</p>
          <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(payload.phone)}</p>
          <p><strong>Business stage:</strong> ${safeStage}</p>
          <p><strong>Biggest risk:</strong> ${safeRisk}</p>
          <p><strong>Continuity readiness:</strong> ${safeReadiness}</p>
          <p><strong>Suggested CRM topic:</strong> blueprint_business</p>
        </div>
      `,
    });
  }
}

export async function submitBusinessBlueprintLead(
  _prevState: BusinessBlueprintActionState,
  formData: FormData
): Promise<BusinessBlueprintActionState> {
  const raw = formDataToObject(formData);
  const parsed = businessBlueprintLeadSchema.safeParse(raw);

  if (!parsed.success) {
    const flat = parsed.error.flatten();
    return {
      success: false,
      message: "Please fix the errors below.",
      fieldErrors: flat.fieldErrors as BusinessBlueprintActionState["fieldErrors"],
    };
  }

  const payload = parsed.data;

  if (payload.website && String(payload.website).length > 0) {
    return {
      success: true,
      message: "Thank you. Your Business Survival Blueprint is ready.",
    };
  }

  const hubspotResult = await syncContactToHubSpot({
    fullName: payload.fullName,
    phone: payload.phone,
    email: payload.email,
    topics: ["blueprint_business", payload.businessStage, payload.biggestRisk, payload.continuityReadiness],
    consent: true,
    website: "",
  });

  if (!hubspotResult.success) {
    return {
      success: false,
      message:
        hubspotResult.error ??
        "Could not save your workbook request. Please try again or contact AS Brokers on WhatsApp.",
    };
  }

  try {
    await sendBusinessEmails(payload);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("[Business Blueprint] Email delivery failed:", error);
    }
  }

  return {
    success: true,
    message:
      "Your Business Survival Blueprint is ready. Please check your inbox, then book a review if you want help pressure-testing the risks.",
  };
}
