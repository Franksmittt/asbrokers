import "server-only";

import { insertCrmLead } from "@/lib/crm/insert-lead";
import type { ServiceCategory } from "@/lib/crm/types";
import { notifyStaffLead } from "@/lib/email/notifications";
import {
  chatCallbackLeadSchema,
  type ChatCallbackLeadInput,
  type ChatLeadInterest,
} from "@/lib/validations/chat-lead";

const INTEREST_TO_SERVICE: Record<ChatLeadInterest, ServiceCategory> = {
  discovery_health: "medical_wellness",
  everest_retirement: "retirement_everest",
  estate_planning: "estate_business",
  insurance: "short_term_personal",
  general_callback: "retirement_everest",
};

const INTEREST_LABEL: Record<ChatLeadInterest, string> = {
  discovery_health: "Discovery Health / medical aid",
  everest_retirement: "Everest Wealth / retirement",
  estate_planning: "Estate planning",
  insurance: "Insurance",
  general_callback: "General callback",
};

export type CaptureCallbackLeadResult =
  | {
      ok: true;
      message: string;
      leadId: string | null;
      name: string;
      interestLabel: string;
    }
  | {
      ok: false;
      message: string;
      error?: string;
    };

export async function captureCallbackLead(
  raw: unknown
): Promise<CaptureCallbackLeadResult> {
  const parsed = chatCallbackLeadSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      ok: false,
      message:
        "I still need a valid name, phone, email, and your clear yes to be contacted before I can log a callback.",
      error: parsed.error.issues.map((i) => i.message).join("; "),
    };
  }

  const data: ChatCallbackLeadInput = parsed.data;
  const interest = data.interest ?? "general_callback";
  const serviceCategory = INTEREST_TO_SERVICE[interest];
  const interestLabel = INTEREST_LABEL[interest];
  const intent = data.notes?.trim()
    ? `Chat callback: ${interestLabel}: ${data.notes.trim()}`
    : `Chat callback: ${interestLabel}`;

  const leadId = await insertCrmLead({
    sourceFunnel: "chat_callback",
    serviceCategory,
    leadScore: 32,
    pipelineStatus: "new",
    rawPayload: {
      name: data.fullName,
      email: data.email,
      phone: data.phone,
      intent,
      source: "digital_wealth_assistant",
      interest,
      interestLabel,
      notes: data.notes?.trim() || undefined,
      consent: true,
      consentChannel: "chat_explicit",
      topics:
        interest === "discovery_health"
          ? ["medical_gap", "medical"]
          : interest === "estate_planning"
            ? ["estate", "will"]
            : interest === "insurance"
              ? ["short_personal"]
              : interest === "everest_retirement"
                ? ["everest"]
                : ["general"],
    },
  });

  try {
    await notifyStaffLead("Chat callback request", {
      Name: data.fullName,
      Email: data.email,
      Phone: data.phone,
      Interest: interestLabel,
      Notes: data.notes?.trim() || "(none)",
      Source: "Digital Wealth Assistant (/chat)",
      ...(leadId ? { "CRM Lead ID": leadId } : {}),
    });
  } catch {
    /* non-blocking */
  }

  if (!leadId) {
    return {
      ok: false,
      message:
        "I could not save your details just now. Please WhatsApp AS Brokers on +27 66 227 6044 or use the contact form, and we will still help.",
    };
  }

  return {
    ok: true,
    leadId,
    name: data.fullName,
    interestLabel,
    message:
      "Details received. An AS Brokers adviser (FSP 17273) will call you back within one business day.",
  };
}
