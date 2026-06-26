import type { User } from "@supabase/supabase-js";

import type { CrmRole } from "@/lib/crm/types";

export function userAppRole(user: User): string {
  const raw = user.app_metadata?.role;
  return typeof raw === "string" ? raw.toLowerCase() : "";
}

export function crmRoleFromUser(user: User): CrmRole | null {
  const role = userAppRole(user);
  if (role === "admin") return "admin";
  if (role === "staff") return "staff";
  return null;
}

export function staffDisplayName(user: User): string {
  const meta = user.user_metadata?.full_name;
  if (typeof meta === "string" && meta.trim()) return meta.trim();
  const email = user.email?.split("@")[0];
  return email ? email.replace(/\./g, " ") : "Advisor";
}

export function canAccessCrmRole(role: CrmRole | null): role is CrmRole {
  return role === "admin" || role === "staff";
}
