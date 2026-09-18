import { FFC_APP_METADATA } from "@/lib/validations/membership-registration";

export type MembershipUserLike = {
  app_metadata?: Record<string, unknown>;
  user_metadata?: Record<string, unknown>;
} | null;

function metaString(meta: Record<string, unknown> | undefined, key: string): string {
  const value = meta?.[key];
  return typeof value === "string" ? value.toLowerCase() : "";
}

/**
 * Active Financial Freedom Community™ membership unlocks members-area learning tools.
 *
 * Status is expected on Supabase `app_metadata.ffc_membership` after signup + payment.
 * Staff/admin always have preview access.
 */
export function hasActiveFinancialFreedomMembership(user: MembershipUserLike): boolean {
  if (!user) return false;

  const role = metaString(user.app_metadata, "role");
  if (role === "admin" || role === "staff") return true;

  const status = metaString(user.app_metadata, FFC_APP_METADATA.statusKey);
  if (status === FFC_APP_METADATA.activeValue) return true;

  /** Legacy / alternate keys during rollout */
  const alt =
    metaString(user.app_metadata, "membership_status") ||
    metaString(user.user_metadata, FFC_APP_METADATA.statusKey);
  return alt === FFC_APP_METADATA.activeValue;
}

export function membershipStatusLabel(user: MembershipUserLike): string {
  if (!user) return "none";
  if (hasActiveFinancialFreedomMembership(user)) return "active";
  const status = metaString(user.app_metadata, FFC_APP_METADATA.statusKey);
  return status || "none";
}

export const FINANCIAL_FREEDOM_REGISTER_PATH = "/financial-freedom-community/register";
export const FINANCIAL_FREEDOM_COMMUNITY_PATH = "/financial-freedom-community";
