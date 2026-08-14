"use server";

import { cookies } from "next/headers";
import { createHash, timingSafeEqual } from "crypto";

import {
  EVEREST_SOFT_LOCK_COOKIE,
  EVEREST_SOFT_LOCK_COOKIE_OPTIONS,
  getEverestSoftLockPassword,
  signEverestSoftLockToken,
} from "@/lib/compliance/everest-soft-lock";

export type EverestUnlockResult = { ok: true } | { ok: false; error: string };

function passwordsMatch(plain: string, expected: string): boolean {
  const a = createHash("sha256").update(plain.trim()).digest();
  const b = createHash("sha256").update(expected).digest();
  try {
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export async function unlockEverestWealth(formData: FormData): Promise<EverestUnlockResult> {
  const password = String(formData.get("password") ?? "");
  if (!password.trim()) {
    return { ok: false, error: "Enter the access password." };
  }
  if (!passwordsMatch(password, getEverestSoftLockPassword())) {
    return { ok: false, error: "Incorrect password." };
  }

  const token = await signEverestSoftLockToken();
  const c = await cookies();
  c.set(EVEREST_SOFT_LOCK_COOKIE, token, {
    ...EVEREST_SOFT_LOCK_COOKIE_OPTIONS,
    secure: process.env.NODE_ENV === "production",
  });
  return { ok: true };
}

export async function lockEverestWealth(): Promise<void> {
  const c = await cookies();
  c.set(EVEREST_SOFT_LOCK_COOKIE, "", {
    path: "/",
    maxAge: 0,
  });
}
