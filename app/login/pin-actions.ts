"use server";

import { redirect } from "next/navigation";

import {
  completeCrmPinReset,
  requestCrmPinResetEmail,
} from "@/lib/crm/pin-reset";
import {
  setCrmPinSession,
  verifyCrmPinInput,
} from "@/lib/crm/pin-session";
import { crmPinForgotSchema, crmPinResetSchema } from "@/lib/validations/crm-pin";

export type CrmPinState = {
  success: boolean;
  message: string;
} | null;

const GENERIC_FORGOT_MESSAGE =
  "If that email is registered for staff access, we sent a reset link.";

function safeStaffNext(raw: string): string {
  const next = raw.trim() || "/crm";
  const candidate = next.startsWith("/") ? next : "/crm";
  const allowed =
    candidate.startsWith("/crm") ||
    candidate.startsWith("/workspace") ||
    candidate.startsWith("/studio");
  return allowed ? candidate : "/crm";
}

export async function signInWithCrmPin(
  _prev: CrmPinState,
  formData: FormData
): Promise<CrmPinState> {
  const pin = String(formData.get("pin") ?? "").trim();
  const safeNext = safeStaffNext(String(formData.get("next") ?? "/crm"));

  if (!/^\d{5}$/.test(pin)) {
    return { success: false, message: "Enter the 5-digit access PIN." };
  }

  const member = await verifyCrmPinInput(pin);
  if (!member) {
    return { success: false, message: "Incorrect PIN. Please try again." };
  }

  await setCrmPinSession(member.key);
  redirect(safeNext);
}

export async function requestCrmPinReset(
  _prev: CrmPinState,
  formData: FormData
): Promise<CrmPinState> {
  const parsed = crmPinForgotSchema.safeParse({ email: formData.get("email") });
  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message ?? "Enter a valid work email.",
    };
  }

  try {
    await requestCrmPinResetEmail(parsed.data.email);
  } catch (error) {
    console.error("[crm-pin-reset] request failed:", error);
  }

  // Anti-enumeration: same copy whether or not the email is allowlisted.
  return { success: true, message: GENERIC_FORGOT_MESSAGE };
}

export async function resetCrmPin(
  _prev: CrmPinState,
  formData: FormData
): Promise<CrmPinState> {
  const parsed = crmPinResetSchema.safeParse({
    token: formData.get("token"),
    pin: formData.get("pin"),
    confirmPin: formData.get("confirmPin"),
  });
  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message ?? "Could not update PIN.",
    };
  }

  const result = await completeCrmPinReset(parsed.data.token, parsed.data.pin);
  if (!result.ok) {
    return { success: false, message: result.error };
  }

  await setCrmPinSession(result.member.key);
  redirect("/crm");
}
