"use server";

import { redirect } from "next/navigation";

import {
  setCrmPinSession,
  verifyCrmPinInput,
} from "@/lib/crm/pin-session";
import { resolveCrmIdentity } from "@/lib/crm/resolve-session";

export type CrmPinState = {
  success: boolean;
  message: string;
} | null;

export async function signInWithCrmPin(
  _prev: CrmPinState,
  formData: FormData
): Promise<CrmPinState> {
  const pin = String(formData.get("pin") ?? "").trim();
  const next = String(formData.get("next") ?? "/crm").trim() || "/crm";
  const safeNext = next.startsWith("/") ? next : "/crm";

  if (!/^\d{5}$/.test(pin)) {
    return { success: false, message: "Enter the 5-digit access PIN." };
  }

  const member = verifyCrmPinInput(pin);
  if (!member) {
    return { success: false, message: "Incorrect PIN. Please try again." };
  }

  await setCrmPinSession(member.key);
  redirect(safeNext.startsWith("/crm") ? safeNext : "/crm");
}

export async function assertCrmPinOrSupabaseSession(): Promise<boolean> {
  const identity = await resolveCrmIdentity();
  return identity !== null;
}
