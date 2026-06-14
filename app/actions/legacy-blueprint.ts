"use server";

import { Resend } from "resend";

import { syncContactToHubSpot } from "@/lib/hubspot.service";
import {
  legacyBlueprintLeadSchema,
  type LegacyBlueprintActionState,
  type LegacyBlueprintLeadPayload,
} from "@/lib/validations/schema";

const GUIDE_PATH = "/blueprints/legacy-blueprint";

function formDataToObject(formData: FormData): Record<string, unknown> {
  const consent = formData.get("consent");
  return {
    fullName: formData.get("fullName") ?? "",
    phone: formData.get("phone") ?? "",
    email: formData.get("email") ?? "",
    familySituation: formData.get("familySituation") ?? "",
    estateConcern: formData.get("estateConcern") ?? "",
    estateReadiness: formData.get("estateReadiness") ?? "",
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

async function sendLegacyEmails(payload: LegacyBlueprintLeadPayload) {
  if (!process.env.RESEND_API_KEY) return;

  const resend = new Resend(process.env.RESEND_API_KEY);
  const from = process.env.RESEND_FROM ?? "AS Brokers <onboarding@resend.dev>";
  const guideUrl = absoluteGuideUrl();
  const safeName = escapeHtml(payload.fullName);
  const safeFamily = escapeHtml(payload.familySituation);
  const safeConcern = escapeHtml(payload.estateConcern);
  const safeReadiness = escapeHtml(payload.estateReadiness);

  await resend.emails.send({
    from,
    to: [payload.email],
    subject: "Your Legacy Conversations Guide",
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111827">
        <p>Hi ${safeName},</p>
        <p>Here is your AS Brokers Legacy Conversations Guide:</p>
        <p><a href="${guideUrl}" style="color:#b45309;font-weight:bold">Open the Legacy Conversations Guide</a></p>
        <p>The key question is simple: what happens to your family and wealth if you die tomorrow?</p>
        <p>Use the guide to start reviewing wills, trusts, beneficiary nominations, estate liquidity, executor issues, and family wealth transfer conversations.</p>
        <p style="font-size:12px;color:#6b7280">AS Brokers CC · FSP 17273 · This educational material is not legal, tax, or personalised financial advice.</p>
      </div>
    `,
  });

  const notificationTo =
    process.env.LEAD_NOTIFICATION_EMAIL ?? process.env.CONTACT_NOTIFICATION_EMAIL ?? process.env.RESEND_INTERNAL_TO;

  if (notificationTo) {
    await resend.emails.send({
      from,
      to: [notificationTo],
      subject: `New Legacy Conversations Guide lead: ${payload.fullName}`,
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111827">
          <h2>New Legacy Conversations Guide lead</h2>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(payload.phone)}</p>
          <p><strong>Family situation:</strong> ${safeFamily}</p>
          <p><strong>Main concern:</strong> ${safeConcern}</p>
          <p><strong>Estate readiness:</strong> ${safeReadiness}</p>
          <p><strong>Suggested CRM topic:</strong> blueprint_legacy</p>
        </div>
      `,
    });
  }
}

export async function submitLegacyBlueprintLead(
  _prevState: LegacyBlueprintActionState,
  formData: FormData
): Promise<LegacyBlueprintActionState> {
  const raw = formDataToObject(formData);
  const parsed = legacyBlueprintLeadSchema.safeParse(raw);

  if (!parsed.success) {
    const flat = parsed.error.flatten();
    return {
      success: false,
      message: "Please fix the errors below.",
      fieldErrors: flat.fieldErrors as LegacyBlueprintActionState["fieldErrors"],
    };
  }

  const payload = parsed.data;

  if (payload.website && String(payload.website).length > 0) {
    return {
      success: true,
      message: "Thank you. Your Legacy Conversations Guide is ready.",
    };
  }

  const hubspotResult = await syncContactToHubSpot({
    fullName: payload.fullName,
    phone: payload.phone,
    email: payload.email,
    topics: ["blueprint_legacy", payload.familySituation, payload.estateConcern, payload.estateReadiness],
    consent: true,
    website: "",
  });

  if (!hubspotResult.success) {
    return {
      success: false,
      message:
        hubspotResult.error ??
        "Could not save your guide request. Please try again or contact AS Brokers on WhatsApp.",
    };
  }

  try {
    await sendLegacyEmails(payload);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("[Legacy Blueprint] Email delivery failed:", error);
    }
  }

  return {
    success: true,
    message: "Your Legacy Conversations Guide is ready. Please check your inbox, then book a review if you want help with the family wealth questions.",
  };
}
