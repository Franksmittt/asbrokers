import type { CrmRole, ServiceCategory } from "@/lib/crm/types";

import { CRM_PIN_SUPERUSER_EMAIL, CRM_PIN_SUPERUSER_ID, CRM_PIN_SUPERUSER_NAME } from "@/lib/crm/constants";

/**
 * PIN-login staff identities for Command Workspace (/login).
 * Env PINs are the bootstrap defaults; staff can replace them via email reset.
 */
export type CrmTeamMemberKey =
  | "albert"
  | "elize"
  | "petro"
  | "monique"
  | "johnny"
  | "shanel"
  | "corne"
  | "developer";

export type CrmTeamMember = {
  key: CrmTeamMemberKey;
  id: string;
  email: string;
  name: string;
  /** E.164 or local SA display number for staff directory / WhatsApp. */
  phone?: string;
  role: CrmRole;
  /** Bootstrap PIN from env (may be empty until set via reset). */
  pin: string;
  canUseAi: boolean;
  focus: string;
  serviceLines: ServiceCategory[];
};

export const CRM_TEAM_MEMBERS: Record<CrmTeamMemberKey, CrmTeamMember> = {
  albert: {
    key: "albert",
    id: CRM_PIN_SUPERUSER_ID,
    email: CRM_PIN_SUPERUSER_EMAIL,
    name: CRM_PIN_SUPERUSER_NAME,
    role: "admin",
    pin: process.env.CRM_SUPERUSER_PIN?.trim() || process.env.CRM_PIN_ALBERT?.trim() || "",
    canUseAi: true,
    focus: "Key Individual · owner oversight (superuser)",
    serviceLines: ["retirement_everest"],
  },
  elize: {
    key: "elize",
    id: "e7a1c4b2-9d5f-4e8a-b3c1-6f2d8a0e4b17",
    email: "elize@asbrokers.co.za",
    name: "Elize",
    role: "admin",
    pin: process.env.CRM_PIN_ELIZE?.trim() || "",
    canUseAi: true,
    focus: "Superuser · firm oversight",
    serviceLines: [
      "retirement_everest",
      "short_term_business",
      "short_term_personal",
      "estate_business",
      "life_personal",
      "medical_wellness",
      "claims",
    ],
  },
  petro: {
    key: "petro",
    id: "c9f5d3b2-7a4e-5b3f-0d2c-8e6f9a3b5d82",
    email: "petro@asbrokers.co.za",
    name: "Petro Vermeulen",
    phone: "+27833261800",
    role: "admin",
    pin: process.env.CRM_TEST_PIN_PETRO?.trim() || process.env.CRM_PIN_PETRO?.trim() || "",
    canUseAi: false,
    focus: "Manager · operations & team oversight",
    serviceLines: [
      "retirement_everest",
      "short_term_business",
      "short_term_personal",
      "estate_business",
      "life_personal",
      "medical_wellness",
      "claims",
    ],
  },
  monique: {
    key: "monique",
    id: "d2e8f1a4-3b7c-4d9e-a1f0-5c6b8d9e2a31",
    email: "monique@asbrokers.co.za",
    name: "Monique Schuurman",
    role: "admin",
    pin: process.env.CRM_PIN_MONIQUE?.trim() || "",
    canUseAi: false,
    focus: "Manager · personal short-term, medical & newsletter",
    serviceLines: ["short_term_personal", "medical_wellness", "life_personal"],
  },
  johnny: {
    key: "johnny",
    id: "b8e4c2a1-6f3d-4a2e-9c1b-7d5e8f2a4c91",
    email: "johnny@asbrokers.co.za",
    name: "Johnny Farinha",
    role: "staff",
    pin: process.env.CRM_TEST_PIN_JOHNNY?.trim() || process.env.CRM_PIN_JOHNNY?.trim() || "",
    canUseAi: false,
    focus: "Short-term & business insurance · Brits / North West",
    serviceLines: ["short_term_business", "short_term_personal", "estate_business", "life_personal"],
  },
  shanel: {
    key: "shanel",
    id: "f1a9b6c3-8e2d-4f7a-9b0c-1d2e3f4a5b6c",
    email: "claims@asbrokers.co.za",
    name: "Shanel van Niekerk",
    role: "staff",
    pin: process.env.CRM_PIN_SHANEL?.trim() || "",
    canUseAi: false,
    focus: "Claims consultant",
    serviceLines: ["claims", "short_term_personal", "short_term_business"],
  },
  corne: {
    key: "corne",
    id: "a6b7c8d9-e0f1-4a2b-8c3d-4e5f6a7b8c9d",
    email: "corne@asbrokers.co.za",
    name: "Corne",
    role: "staff",
    pin: process.env.CRM_PIN_CORNE?.trim() || "",
    canUseAi: false,
    focus: "Staff · operations & newsletter support",
    serviceLines: ["short_term_personal", "medical_wellness", "life_personal"],
  },
  /** Endpoint / build superuser, PIN fixed at 85879 (also overridable via env). */
  developer: {
    key: "developer",
    id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    email: "developer@asbrokers.co.za",
    name: "Developer",
    role: "admin",
    pin: process.env.CRM_PIN_DEVELOPER?.trim() || "85879",
    canUseAi: true,
    focus: "Technical superuser · full CRM access",
    serviceLines: [
      "retirement_everest",
      "short_term_business",
      "short_term_personal",
      "estate_business",
      "life_personal",
      "medical_wellness",
      "claims",
    ],
  },
};

export const CRM_TEAM_MEMBER_LIST = Object.values(CRM_TEAM_MEMBERS);

/** Staff emails allowed to request a PIN reset link (case-insensitive). */
export const CRM_STAFF_EMAIL_ALLOWLIST = new Set(
  CRM_TEAM_MEMBER_LIST.map((m) => m.email.trim().toLowerCase()).filter(Boolean)
);

export function normalizeStaffEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function isAllowlistedStaffEmail(email: string): boolean {
  return CRM_STAFF_EMAIL_ALLOWLIST.has(normalizeStaffEmail(email));
}

export function lookupCrmTeamMemberByEmail(email: string): CrmTeamMember | null {
  const normalized = normalizeStaffEmail(email);
  if (!normalized) return null;
  return CRM_TEAM_MEMBER_LIST.find((m) => m.email.trim().toLowerCase() === normalized) ?? null;
}

/** Sync lookup against bootstrap env PINs only (overrides applied in pin-store). */
export function lookupCrmPinUser(pin: string): CrmTeamMember | null {
  const trimmed = pin.trim();
  if (!trimmed) return null;
  return CRM_TEAM_MEMBER_LIST.find((member) => member.pin.length > 0 && member.pin === trimmed) ?? null;
}

export function getTeamMember(key: string): CrmTeamMember | null {
  if (key in CRM_TEAM_MEMBERS) {
    return CRM_TEAM_MEMBERS[key as CrmTeamMemberKey];
  }
  const byId = CRM_TEAM_MEMBER_LIST.find((m) => m.id === key);
  if (byId) return byId;
  const byName = CRM_TEAM_MEMBER_LIST.find(
    (m) => m.name.toLowerCase() === key.toLowerCase() || m.key === key.toLowerCase()
  );
  return byName ?? null;
}

export function resolveTeamMemberByNameFragment(fragment: string): CrmTeamMember | null {
  const q = fragment.trim().toLowerCase();
  if (!q) return null;
  return (
    CRM_TEAM_MEMBER_LIST.find(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.key.includes(q) ||
        m.name.split(" ")[0]?.toLowerCase() === q
    ) ?? null
  );
}

export function isAlbertTeamMember(userId: string): boolean {
  return userId === CRM_TEAM_MEMBERS.albert.id;
}

/** Albert + Elize + Developer, full AI / owner-level CRM tools. */
export function isCrmSuperuser(userId: string): boolean {
  return CRM_TEAM_MEMBER_LIST.some((m) => m.id === userId && m.canUseAi);
}

export function teamRosterForAiPrompt(): string {
  return CRM_TEAM_MEMBER_LIST.filter((m) => m.key !== "developer")
    .map(
      (m) =>
        `- ${m.name} (${m.key}, id=${m.id}, role=${m.role}): ${m.focus}. Lines: ${m.serviceLines.join(", ")}`
    )
    .join("\n");
}
