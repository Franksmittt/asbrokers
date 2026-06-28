import { z } from "zod";

import type { CrmRole } from "@/lib/crm/types";

export const CRM_PERMISSION_KEYS = [
  "viewAllLeads",
  "viewAllClients",
  "manageWhatsApp",
  "manageNotes",
  "manageTasks",
  "viewFunnelExports",
] as const;

export type CrmPermissionKey = (typeof CRM_PERMISSION_KEYS)[number];

export type CrmStaffPermissions = Record<CrmPermissionKey, boolean>;

export const PERMISSION_LABELS: Record<CrmPermissionKey, { label: string; hint: string }> = {
  viewAllLeads: {
    label: "View all leads",
    hint: "When off, only leads assigned to this person are visible.",
  },
  viewAllClients: {
    label: "View all clients",
    hint: "When off, only clients assigned to this person are visible.",
  },
  manageWhatsApp: {
    label: "WhatsApp inbox",
    hint: "Send and read WhatsApp messages in the CRM.",
  },
  manageNotes: {
    label: "Team notes",
    hint: "Add and read shared team notes.",
  },
  manageTasks: {
    label: "Tasks",
    hint: "Create and complete follow-up tasks.",
  },
  viewFunnelExports: {
    label: "Funnel exports",
    hint: "Access business risk, legacy checklist, and retirement funnel admin pages.",
  },
};

export const ADMIN_PERMISSIONS: CrmStaffPermissions = {
  viewAllLeads: true,
  viewAllClients: true,
  manageWhatsApp: true,
  manageNotes: true,
  manageTasks: true,
  viewFunnelExports: true,
};

export const DEFAULT_STAFF_PERMISSIONS: CrmStaffPermissions = {
  viewAllLeads: false,
  viewAllClients: false,
  manageWhatsApp: true,
  manageNotes: true,
  manageTasks: true,
  viewFunnelExports: false,
};

const permissionSchema = z.object({
  viewAllLeads: z.boolean(),
  viewAllClients: z.boolean(),
  manageWhatsApp: z.boolean(),
  manageNotes: z.boolean(),
  manageTasks: z.boolean(),
  viewFunnelExports: z.boolean(),
});

export const crmStaffPermissionsSchema = permissionSchema;

export function resolveStaffPermissions(
  role: CrmRole,
  stored: Partial<CrmStaffPermissions> | null | undefined
): CrmStaffPermissions {
  if (role === "admin") return ADMIN_PERMISSIONS;
  return { ...DEFAULT_STAFF_PERMISSIONS, ...stored };
}

export function permissionsForRole(role: CrmRole): CrmStaffPermissions {
  return role === "admin" ? ADMIN_PERMISSIONS : DEFAULT_STAFF_PERMISSIONS;
}
