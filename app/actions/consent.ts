"use server";

import { cookies } from "next/headers";
import { CONSENT_COOKIE, type ConsentCookieValue } from "@/lib/consent-cookie";

async function writeConsent(level: ConsentCookieValue) {
  const jar = await cookies();
  jar.set(CONSENT_COOKIE, level, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}

export async function acceptAllCookies() {
  await writeConsent("all");
}

export async function acceptEssentialCookies() {
  await writeConsent("essential");
}

export async function clearConsentCookie() {
  const jar = await cookies();
  jar.delete(CONSENT_COOKIE);
}
