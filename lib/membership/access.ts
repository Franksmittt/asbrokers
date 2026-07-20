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
 * Active Financial Freedom Community™ membership unlocks members-only planners
 * (e.g. Goal Engineering Planner™ / Asset 017).
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

/** Public + members routes that reference the Goal Engineering Planner™. */
export const GOAL_ENGINEERING_PLANNER_ID = "asset-017-personal-goal";
export const GOAL_ENGINEERING_EMBED_PATH = "/embed-calculators/asset-017-personal-goal.html";
export const FINANCIAL_FREEDOM_REGISTER_PATH = "/financial-freedom-community/register";
export const FINANCIAL_FREEDOM_COMMUNITY_PATH = "/financial-freedom-community";
