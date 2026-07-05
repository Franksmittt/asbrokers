import { cookies } from "next/headers";
import type { User } from "@supabase/supabase-js";

import type { CrmRole } from "@/lib/crm/types";
import {
  CRM_PIN_SUPERUSER_EMAIL,
  CRM_PIN_SUPERUSER_ID,
  CRM_PIN_SUPERUSER_NAME,
} from "@/lib/crm/constants";
import {
  CRM_TEAM_MEMBERS,
  lookupCrmPinUser,
  type CrmTeamMember,
  type CrmTeamMemberKey,
} from "@/lib/crm/team-members";

export {
  CRM_PIN_SUPERUSER_EMAIL,
  CRM_PIN_SUPERUSER_ID,
  CRM_PIN_SUPERUSER_NAME,
} from "@/lib/crm/constants";

export const CRM_PIN_COOKIE = "asb-crm-pin-session";
const MAX_AGE_SEC = 60 * 60 * 12;

export function getConfiguredCrmPin(): string {
  return CRM_TEAM_MEMBERS.albert.pin;
}

function getSigningSecret(): string {
  const explicit = process.env.CRM_PIN_SESSION_SECRET?.trim();
  if (explicit && explicit.length >= 16) return explicit;
  const studio = process.env.CLIENT_STUDIO_SESSION_SECRET?.trim();
  if (studio && studio.length >= 16) return studio;
  return `asbrokers-crm-pin-v1:${getConfiguredCrmPin()}`;
}

function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function hexToBytes(hex: string): Uint8Array | null {
  if (hex.length % 2 !== 0) return null;
  const out = new Uint8Array(hex.length / 2);
  for (let i = 0; i < out.length; i++) {
    const byte = Number.parseInt(hex.slice(i * 2, i * 2 + 2), 16);
    if (!Number.isFinite(byte)) return null;
    out[i] = byte;
  }
  return out;
}

function timingSafeEqualBytes(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i]! ^ b[i]!;
  return diff === 0;
}

async function hmacSha256Hex(secret: string, message: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return bytesToHex(new Uint8Array(sig));
}

function parseMemberKey(value: string | undefined): CrmTeamMemberKey {
  if (value && value in CRM_TEAM_MEMBERS) {
    return value as CrmTeamMemberKey;
  }
  return "albert";
}

async function signToken(memberKey: CrmTeamMemberKey): Promise<string> {
  const exp = Math.floor(Date.now() / 1000) + MAX_AGE_SEC;
  const nonce = bytesToHex(crypto.getRandomValues(new Uint8Array(12)));
  const payload = `${exp}.${nonce}.${memberKey}`;
  const sig = await hmacSha256Hex(getSigningSecret(), payload);
  return `${payload}.${sig}`;
}

export async function verifyPinSessionToken(token: string): Promise<CrmTeamMemberKey | null> {
  const secret = getSigningSecret();
  const parts = token.split(".");
  if (parts.length < 4) {
    // Legacy token: exp.nonce.sig → Albert
    if (parts.length === 3) {
      const [expStr, nonce, sig] = parts;
      const exp = Number.parseInt(expStr, 10);
      if (!Number.isFinite(exp) || Date.now() / 1000 > exp) return null;
      const expected = await hmacSha256Hex(secret, `${expStr}.${nonce}`);
      const a = hexToBytes(sig);
      const b = hexToBytes(expected);
      if (!a || !b || !timingSafeEqualBytes(a, b)) return null;
      return "albert";
    }
    return null;
  }

  const sig = parts.pop()!;
  const memberKey = parseMemberKey(parts.pop());
  const nonce = parts.pop()!;
  const expStr = parts.join(".");
  const exp = Number.parseInt(expStr, 10);
  if (!Number.isFinite(exp) || Date.now() / 1000 > exp) return null;
  const payload = `${expStr}.${nonce}.${memberKey}`;
  const expected = await hmacSha256Hex(secret, payload);
  const a = hexToBytes(sig);
  const b = hexToBytes(expected);
  if (!a || !b || !timingSafeEqualBytes(a, b)) return null;
  return memberKey;
}

export function verifyCrmPinInput(pin: string): CrmTeamMember | null {
  return lookupCrmPinUser(pin);
}

export async function getCrmPinSessionMemberKey(): Promise<CrmTeamMemberKey | null> {
  try {
    const c = await cookies();
    const raw = c.get(CRM_PIN_COOKIE)?.value;
    if (!raw) return null;
    return verifyPinSessionToken(raw);
  } catch {
    return null;
  }
}

export async function hasCrmPinSession(): Promise<boolean> {
  return (await getCrmPinSessionMemberKey()) !== null;
}

export async function hasCrmPinSessionFromCookieValue(raw: string | undefined): Promise<boolean> {
  if (!raw) return false;
  return (await verifyPinSessionToken(raw)) !== null;
}

export async function setCrmPinSession(memberKey: CrmTeamMemberKey): Promise<void> {
  const token = await signToken(memberKey);
  const c = await cookies();
  c.set(CRM_PIN_COOKIE, token, {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: MAX_AGE_SEC,
  });
}

export async function clearCrmPinSession(): Promise<void> {
  const c = await cookies();
  c.set(CRM_PIN_COOKIE, "", { path: "/", maxAge: 0 });
}

export function crmPinUser(memberKey: CrmTeamMemberKey = "albert"): User {
  const member = CRM_TEAM_MEMBERS[memberKey];
  return {
    id: member.id,
    email: member.email,
    app_metadata: { role: member.role },
    user_metadata: { full_name: member.name },
    aud: "authenticated",
    created_at: new Date(0).toISOString(),
  } as User;
}

/** @deprecated Use crmPinUser("albert") */
export function crmPinSuperuser(): User {
  return crmPinUser("albert");
}

export function crmPinRole(memberKey: CrmTeamMemberKey = "albert"): CrmRole {
  return CRM_TEAM_MEMBERS[memberKey].role;
}

export function crmPinMemberName(memberKey: CrmTeamMemberKey): string {
  return CRM_TEAM_MEMBERS[memberKey].name;
}
