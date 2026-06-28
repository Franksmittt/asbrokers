import { z } from "zod";

import { crmStaffPermissionsSchema } from "@/lib/crm/permissions";

export const inviteCrmUserSchema = z.object({
  fullName: z.string().trim().min(2, "Name is required.").max(120),
  email: z.string().trim().email("Enter a valid email address."),
  phone: z
    .string()
    .trim()
    .max(32)
    .optional()
    .transform((value) => value || undefined),
  role: z.enum(["admin", "staff"]),
  permissions: crmStaffPermissionsSchema.optional(),
});

export const updateCrmUserSchema = z.object({
  userId: z.string().uuid(),
  fullName: z.string().trim().min(2).max(120),
  phone: z
    .string()
    .trim()
    .max(32)
    .optional()
    .transform((value) => value || undefined),
  role: z.enum(["admin", "staff"]),
  permissions: crmStaffPermissionsSchema.optional(),
  isActive: z.boolean(),
});

export const resendInviteSchema = z.object({
  userId: z.string().uuid(),
});

export type InviteCrmUserInput = z.infer<typeof inviteCrmUserSchema>;
export type UpdateCrmUserInput = z.infer<typeof updateCrmUserSchema>;
