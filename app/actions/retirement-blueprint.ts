"use server";

import { Resend } from "resend";

import { syncContactToHubSpot } from "@/lib/hubspot.service";
import {
  retirementBlueprintLeadSchema,
  type RetirementBlueprintActionState,
  type RetirementBlueprintLeadPayload,
} from "@/lib/validations/schema";

const GUIDE_PATH = "/blueprints/retirement-survival-blueprint";

function formDataToObject(formData: FormData): Record<string, unknown> {
  const consent = formData.get("consent");
  return {
    fullName: formData.get("fullName") ?? "",
    phone: formData.get("phone") ?? "",
    email: formData.get("email") ?? "",
    retirementTimeline: formData.get("retirementTimeline") ?? "",
    currentConcern: formData.get("currentConcern") ?? "",
    capitalRange: formData.get("capitalRange") ?? "",
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

function estimatedCapitalAmount(capitalRange: string): number | undefined {
  if (capitalRange === "under-500k") return 250_000;
  if (capitalRange === "500k-1m") return 750_000;
  if (capitalRange === "1m-5m") return 1_000_001;
  if (capitalRange === "5m-plus") return 5_000_000;
  return undefined;
}

function absoluteGuideUrl() {
  const base = process.env.APP_URL ?? process.env.NEXT_PUBLIC_APP_URL ?? "https://www.asbrokers.co.za";
  return new URL(GUIDE_PATH, base).toString();
}

async function sendBlueprintEmails(payload: RetirementBlueprintLeadPayload) {
  if (!process.env.RESEND_API_KEY) return;

  const resend = new Resend(process.env.RESEND_API_KEY);
  const from = process.env.RESEND_FROM ?? "AS Brokers <onboarding@resend.dev>";
  const guideUrl = absoluteGuideUrl();
  const safeName = escapeHtml(payload.fullName);
  const safeConcern = escapeHtml(payload.currentConcern);
  const safeTimeline = escapeHtml(payload.retirementTimeline);
  const safeCapital = escapeHtml(payload.capitalRange);

  await resend.emails.send({
    from,
    to: [payload.email],
    subject: "Your Retirement Survival Blueprint",
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111827">
        <p>Hi ${safeName},</p>
        <p>Here is your AS Brokers Retirement Survival Blueprint:</p>
        <p><a href="${guideUrl}" style="color:#0f766e;font-weight:bold">Open the Retirement Survival Blueprint</a></p>
        <p>The key question is simple: will your money survive your retirement?</p>
        <p>Next, review your income, inflation, drawdown, and capital preservation assumptions. If you would like a private review, reply to this email or book a conversation with AS Brokers.</p>
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
      subject: `New Retirement Survival Blueprint lead: ${payload.fullName}`,
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111827">
          <h2>New Retirement Survival Blueprint lead</h2>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(payload.phone)}</p>
          <p><strong>Timeline:</strong> ${safeTimeline}</p>
          <p><strong>Main concern:</strong> ${safeConcern}</p>
          <p><strong>Capital range:</strong> ${safeCapital}</p>
          <p><strong>Suggested CRM topic:</strong> blueprint_retirement</p>
        </div>
      `,
    });
  }
}

export async function submitRetirementBlueprintLead(
  _prevState: RetirementBlueprintActionState,
  formData: FormData
): Promise<RetirementBlueprintActionState> {
  const raw = formDataToObject(formData);
  const parsed = retirementBlueprintLeadSchema.safeParse(raw);

  if (!parsed.success) {
    const flat = parsed.error.flatten();
    return {
      success: false,
      message: "Please fix the errors below.",
      fieldErrors: flat.fieldErrors as RetirementBlueprintActionState["fieldErrors"],
    };
  }

  const payload = parsed.data;

  if (payload.website && String(payload.website).length > 0) {
    return {
      success: true,
      message: "Thank you. Your Retirement Survival Blueprint is ready.",
    };
  }

  const hubspotResult = await syncContactToHubSpot({
    fullName: payload.fullName,
    phone: payload.phone,
    email: payload.email,
    topics: ["blueprint_retirement", payload.retirementTimeline, payload.currentConcern],
    consent: true,
    website: "",
    capitalAmount: estimatedCapitalAmount(payload.capitalRange),
  });

  if (!hubspotResult.success) {
    return {
      success: false,
      message:
        hubspotResult.error ??
        "Could not save your blueprint request. Please try again or contact AS Brokers on WhatsApp.",
    };
  }

  try {
    await sendBlueprintEmails(payload);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("[Retirement Blueprint] Email delivery failed:", error);
    }
  }

  return {
    success: true,
    message: "Your Retirement Survival Blueprint is ready. Please check your inbox, then book a review if you want help with the numbers.",
  };
}
