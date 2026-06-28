"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import type { User } from "@supabase/supabase-js";

import {
  crmAuthRedirectOrigin,
  dispatchCrmInviteEmail,
  dispatchCrmSignInEmail,
} from "@/lib/auth/invite-email";
import type { CrmStaffPermissions } from "@/lib/crm/permissions";
import { resolveStaffPermissions } from "@/lib/crm/permissions";
import { permissionsPayloadForRole, requireAdminAccess } from "@/lib/crm/staff-access";
import { canAccessCrmRole, crmRoleFromUser } from "@/lib/crm/session";
import type { CrmRole, CrmStaffUser } from "@/lib/crm/types";
import { crmStaffProfiles, getDb } from "@/lib/db";
import { getSupabaseService } from "@/lib/supabase/server";
import {
  inviteCrmUserSchema,
  resendInviteSchema,
  updateCrmUserSchema,
} from "@/lib/validations/crm-users";

export type UserActionResult = { ok: true } | { ok: false; error: string };

function redirectToCrm(): string {
  const origin = crmAuthRedirectOrigin();
  return `${origin}/auth/callback/implicit?next=/crm`;
}

function mapAuthUserToStaff(
  authUser: User,
  profile: typeof crmStaffProfiles.$inferSelect | null
): CrmStaffUser | null {
  const role = crmRoleFromUser(authUser);
  if (!canAccessCrmRole(role) && !profile) return null;

  const resolvedRole: CrmRole =
    profile?.role === "admin" || profile?.role === "staff"
      ? (profile.role as CrmRole)
      : role ?? "staff";

  if (!canAccessCrmRole(resolvedRole) && !profile) return null;

  const fullName =
    profile?.fullName ??
    (typeof authUser.user_metadata?.full_name === "string"
      ? authUser.user_metadata.full_name
      : authUser.email?.split("@")[0]?.replace(/\./g, " ") ?? "Team member");

  const phone =
    profile?.phone ??
    (typeof authUser.user_metadata?.phone === "string" ? authUser.user_metadata.phone : null);

  const permissions = resolveStaffPermissions(
    resolvedRole,
    (profile?.permissions as Partial<CrmStaffPermissions> | undefined) ?? undefined
  );

  const lastSignIn = authUser.last_sign_in_at ?? null;
  const invitePending = !lastSignIn;

  return {
    id: authUser.id,
    fullName,
    email: profile?.email ?? authUser.email ?? "",
    phone,
    role: resolvedRole,
    isActive: profile?.isActive ?? true,
    permissions,
    createdAt: profile?.createdAt?.toISOString() ?? authUser.created_at,
    lastSignInAt: lastSignIn,
    invitePending,
  };
}

async function countActiveAdmins(excludeUserId?: string): Promise<number> {
  const db = getDb();
  const supabase = getSupabaseService();
  if (!db || !supabase) return 0;

  const profiles = await db
    .select({ id: crmStaffProfiles.id, isActive: crmStaffProfiles.isActive })
    .from(crmStaffProfiles)
    .where(eq(crmStaffProfiles.role, "admin"));

  const activeFromProfiles = profiles.filter(
    (row) => row.isActive && row.id !== excludeUserId
  ).length;

  if (activeFromProfiles > 0) {
    return activeFromProfiles;
  }

  const { data } = await supabase.auth.admin.listUsers({ perPage: 200 });
  return (
    data.users?.filter((user) => {
      if (user.id === excludeUserId) return false;
      if (user.banned_until) return false;
      return crmRoleFromUser(user) === "admin";
    }).length ?? 0
  );
}

/** List CRM team members — admin only. */
export async function listCrmUsers(): Promise<CrmStaffUser[]> {
  await requireAdminAccess();

  const supabase = getSupabaseService();
  const db = getDb();
  if (!supabase || !db) return [];

  try {
    const [{ data: authData }, profileRows] = await Promise.all([
      supabase.auth.admin.listUsers({ perPage: 200 }),
      db.select().from(crmStaffProfiles),
    ]);

    const profileById = new Map(profileRows.map((row) => [row.id, row]));
    const seen = new Set<string>();
    const users: CrmStaffUser[] = [];

    for (const authUser of authData.users ?? []) {
      const mapped = mapAuthUserToStaff(authUser, profileById.get(authUser.id) ?? null);
      if (mapped) {
        users.push(mapped);
        seen.add(authUser.id);
      }
    }

    for (const profile of profileRows) {
      if (seen.has(profile.id)) continue;
      const { data: single } = await supabase.auth.admin.getUserById(profile.id);
      if (single.user) {
        const mapped = mapAuthUserToStaff(single.user, profile);
        if (mapped) users.push(mapped);
      } else {
        users.push({
          id: profile.id,
          fullName: profile.fullName,
          email: profile.email,
          phone: profile.phone,
          role: profile.role as CrmRole,
          isActive: profile.isActive,
          permissions: resolveStaffPermissions(
            profile.role as CrmRole,
            profile.permissions as Partial<CrmStaffPermissions>
          ),
          createdAt: profile.createdAt.toISOString(),
          lastSignInAt: null,
          invitePending: true,
        });
      }
    }

    return users.sort((a, b) => a.fullName.localeCompare(b.fullName));
  } catch (error) {
    console.error("[CRM users] listCrmUsers failed:", error);
    return [];
  }
}

/** Invite a new team member — sends secure magic invite link. */
export async function inviteCrmUser(raw: unknown): Promise<UserActionResult> {
  const admin = await requireAdminAccess();
  const parsed = inviteCrmUserSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const { fullName, email, phone, role, permissions } = parsed.data;
  const normalizedEmail = email.toLowerCase();
  const db = getDb();
  const supabase = getSupabaseService();
  if (!db || !supabase) {
    return { ok: false, error: "Database or auth is not configured." };
  }

  const permissionsPayload = permissionsPayloadForRole(role, permissions);
  const redirectTo = redirectToCrm();

  const inviteResult = await dispatchCrmInviteEmail(normalizedEmail, fullName, redirectTo);
  if (!inviteResult.ok) {
    return { ok: false, error: inviteResult.error };
  }

  let userId = inviteResult.userId;
  if (!userId) {
    const { data: listed } = await supabase.auth.admin.listUsers({ perPage: 200 });
    userId =
      listed.users?.find((user) => user.email?.toLowerCase() === normalizedEmail)?.id ?? undefined;
  }

  if (userId) {
    const { error: updateError } = await supabase.auth.admin.updateUserById(userId, {
      app_metadata: { role },
      user_metadata: { full_name: fullName, phone: phone ?? null },
    });
    if (updateError) {
      return { ok: false, error: updateError.message };
    }

    await db
      .insert(crmStaffProfiles)
      .values({
        id: userId,
        fullName,
        email: normalizedEmail,
        phone: phone ?? null,
        role,
        isActive: true,
        permissions: permissionsPayload,
        createdBy: admin.user.id,
        updatedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: crmStaffProfiles.id,
        set: {
          fullName,
          email: normalizedEmail,
          phone: phone ?? null,
          role,
          isActive: true,
          permissions: permissionsPayload,
          updatedAt: new Date(),
        },
      });
  }

  revalidatePath("/crm/settings");
  return { ok: true };
}

/** Update team member profile, role, permissions, or active status. */
export async function updateCrmUser(raw: unknown): Promise<UserActionResult> {
  const admin = await requireAdminAccess();
  const parsed = updateCrmUserSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const { userId, fullName, phone, role, permissions, isActive } = parsed.data;
  const db = getDb();
  const supabase = getSupabaseService();
  if (!db || !supabase) {
    return { ok: false, error: "Database or auth is not configured." };
  }

  if (userId === admin.user.id) {
    if (!isActive) {
      return { ok: false, error: "You cannot revoke your own access." };
    }
    if (role !== "admin") {
      return { ok: false, error: "You cannot demote your own admin role." };
    }
  }

  if (!isActive || role !== "admin") {
    const adminCount = await countActiveAdmins(userId);
    const targetIsAdmin =
      role === "admin" ||
      (await db
        .select({ role: crmStaffProfiles.role })
        .from(crmStaffProfiles)
        .where(eq(crmStaffProfiles.id, userId))
        .limit(1)
        .then((rows) => rows[0]?.role === "admin"));

    if (targetIsAdmin && !isActive && adminCount === 0) {
      return { ok: false, error: "At least one active admin is required." };
    }
    if (targetIsAdmin && role !== "admin" && adminCount === 0) {
      return { ok: false, error: "At least one admin is required on the team." };
    }
  }

  const permissionsPayload = permissionsPayloadForRole(role, permissions);

  const { data: authUser, error: fetchError } = await supabase.auth.admin.getUserById(userId);
  if (fetchError || !authUser.user) {
    return { ok: false, error: "User not found." };
  }

  const email = authUser.user.email?.toLowerCase() ?? "";
  const banDuration = isActive ? "none" : "876000h";

  const { error: authError } = await supabase.auth.admin.updateUserById(userId, {
    app_metadata: { role: isActive ? role : "revoked" },
    user_metadata: { full_name: fullName, phone: phone ?? null },
    ban_duration: banDuration,
  });
  if (authError) {
    return { ok: false, error: authError.message };
  }

  await db
    .insert(crmStaffProfiles)
    .values({
      id: userId,
      fullName,
      email,
      phone: phone ?? null,
      role,
      isActive,
      permissions: permissionsPayload,
      createdBy: admin.user.id,
      updatedAt: new Date(),
    })
    .onConflictDoUpdate({
      target: crmStaffProfiles.id,
      set: {
        fullName,
        email,
        phone: phone ?? null,
        role,
        isActive,
        permissions: permissionsPayload,
        updatedAt: new Date(),
      },
    });

  revalidatePath("/crm/settings");
  return { ok: true };
}

/** Re-send invite or sign-in link. */
export async function resendCrmUserInvite(raw: unknown): Promise<UserActionResult> {
  await requireAdminAccess();
  const parsed = resendInviteSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, error: "Invalid user." };
  }

  const supabase = getSupabaseService();
  const db = getDb();
  if (!supabase || !db) {
    return { ok: false, error: "Auth is not configured." };
  }

  const { data, error } = await supabase.auth.admin.getUserById(parsed.data.userId);
  if (error || !data.user?.email) {
    return { ok: false, error: "User not found." };
  }

  const [profile] = await db
    .select()
    .from(crmStaffProfiles)
    .where(eq(crmStaffProfiles.id, parsed.data.userId))
    .limit(1);

  const redirectTo = redirectToCrm();
  const fullName = profile?.fullName ?? "";
  const neverSignedIn = !data.user.last_sign_in_at;

  const result = neverSignedIn
    ? await dispatchCrmInviteEmail(data.user.email, fullName, redirectTo)
    : await dispatchCrmSignInEmail(data.user.email, redirectTo);

  if (!result.ok) {
    return { ok: false, error: result.error };
  }

  return { ok: true };
}
