"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState, useTransition } from "react";

import {
  inviteCrmUser,
  resendCrmUserInvite,
  updateCrmUser,
} from "@/app/actions/users";
import { X } from "@/components/icons";
import {
  CRM_PERMISSION_KEYS,
  DEFAULT_STAFF_PERMISSIONS,
  PERMISSION_LABELS,
  type CrmPermissionKey,
  type CrmStaffPermissions,
} from "@/lib/crm/permissions";
import type { CrmRole, CrmStaffUser } from "@/lib/crm/types";
import { cn } from "@/lib/utils";

type FormMode = "add" | "edit" | null;

type UserFormState = {
  fullName: string;
  email: string;
  phone: string;
  role: CrmRole;
  isActive: boolean;
  permissions: CrmStaffPermissions;
};

function emptyForm(): UserFormState {
  return {
    fullName: "",
    email: "",
    phone: "",
    role: "staff",
    isActive: true,
    permissions: { ...DEFAULT_STAFF_PERMISSIONS },
  };
}

function userToForm(user: CrmStaffUser): UserFormState {
  return {
    fullName: user.fullName,
    email: user.email,
    phone: user.phone ?? "",
    role: user.role,
    isActive: user.isActive,
    permissions: { ...user.permissions },
  };
}

function PermissionToggles({
  role,
  permissions,
  onChange,
}: {
  role: CrmRole;
  permissions: CrmStaffPermissions;
  onChange: (key: CrmPermissionKey, value: boolean) => void;
}) {
  const disabled = role === "admin";

  return (
    <div className="space-y-3">
      <p className="text-xs font-medium uppercase tracking-wider text-[#52525b]">Access controls</p>
      {CRM_PERMISSION_KEYS.map((key) => (
        <label
          key={key}
          className={cn(
            "flex items-start gap-3 rounded-lg border border-[#E5E5E5] px-3 py-2.5",
            disabled ? "opacity-60" : "hover:border-[#006B6B]/30"
          )}
        >
          <input
            type="checkbox"
            checked={disabled ? true : permissions[key]}
            disabled={disabled}
            onChange={(event) => onChange(key, event.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-[#E5E5E5] bg-[#F7F6F3] accent-[#3ecf8e]"
          />
          <span>
            <span className="block text-sm text-[#1D1D1F]">{PERMISSION_LABELS[key].label}</span>
            <span className="mt-0.5 block text-xs text-[#52525b]">{PERMISSION_LABELS[key].hint}</span>
          </span>
        </label>
      ))}
      {disabled ? (
        <p className="text-xs text-[#52525b]">Admins always have full access.</p>
      ) : null}
    </div>
  );
}

function UserFormModal({
  mode,
  editingUser,
  onClose,
  onSaved,
}: {
  mode: "add" | "edit";
  editingUser: CrmStaffUser | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState<UserFormState>(
    mode === "edit" && editingUser ? userToForm(editingUser) : emptyForm()
  );
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    startTransition(async () => {
      if (mode === "add") {
        const result = await inviteCrmUser({
          fullName: form.fullName,
          email: form.email,
          phone: form.phone || undefined,
          role: form.role,
          permissions: form.role === "staff" ? form.permissions : undefined,
        });
        if (!result.ok) {
          setError(result.error);
          return;
        }
      } else if (editingUser) {
        const result = await updateCrmUser({
          userId: editingUser.id,
          fullName: form.fullName,
          phone: form.phone || undefined,
          role: form.role,
          isActive: form.isActive,
          permissions: form.role === "staff" ? form.permissions : undefined,
        });
        if (!result.ok) {
          setError(result.error);
          return;
        }
      }

      onSaved();
      onClose();
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1D1D1F]/40 p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="user-form-title"
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-lg border border-[#E5E5E5] bg-white shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-[#E5E5E5] px-5 py-4">
          <h2 id="user-form-title" className="text-lg font-semibold text-[#1D1D1F]">
            {mode === "add" ? "Add team member" : "Edit team member"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-[#52525b] hover:bg-[#F0F0EE] hover:text-[#1D1D1F]"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-5">
          {mode === "add" ? (
            <p className="rounded-md border border-[#A7F3D0] bg-[#006B6B]/5 px-3 py-2 text-xs leading-relaxed text-[#3F3F46]">
              They&apos;ll receive a secure invite link by email, no password needed. Once they
              accept, they can sign in anytime with a magic link.
            </p>
          ) : null}

          <label className="block space-y-1.5">
            <span className="text-xs font-medium text-[#52525b]">Full name</span>
            <input
              required
              value={form.fullName}
              onChange={(event) => setForm((prev) => ({ ...prev, fullName: event.target.value }))}
              className="w-full rounded-md border border-[#E5E5E5] bg-[#F7F6F3] px-3 py-2 text-sm text-[#1D1D1F] outline-none focus:border-[#006B6B]/40"
              placeholder="Albert Smith"
            />
          </label>

          <label className="block space-y-1.5">
            <span className="text-xs font-medium text-[#52525b]">Email address</span>
            <input
              required
              type="email"
              value={form.email}
              readOnly={mode === "edit"}
              onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
              className={cn(
                "w-full rounded-md border border-[#E5E5E5] bg-[#F7F6F3] px-3 py-2 text-sm text-[#1D1D1F] outline-none focus:border-[#006B6B]/40",
                mode === "edit" && "cursor-not-allowed text-[#52525b]"
              )}
              placeholder="advisor@asbrokers.co.za"
            />
          </label>

          <label className="block space-y-1.5">
            <span className="text-xs font-medium text-[#52525b]">Contact number</span>
            <input
              value={form.phone}
              onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
              className="w-full rounded-md border border-[#E5E5E5] bg-[#F7F6F3] px-3 py-2 text-sm text-[#1D1D1F] outline-none focus:border-[#006B6B]/40"
              placeholder="+27 82 000 0000"
            />
          </label>

          <label className="block space-y-1.5">
            <span className="text-xs font-medium text-[#52525b]">Role</span>
            <select
              value={form.role}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  role: event.target.value as CrmRole,
                }))
              }
              className="w-full rounded-md border border-[#E5E5E5] bg-[#F7F6F3] px-3 py-2 text-sm text-[#1D1D1F] outline-none focus:border-[#006B6B]/40"
            >
              <option value="staff">Staff, limited access (configurable)</option>
              <option value="admin">Admin, full access (super user)</option>
            </select>
          </label>

          {mode === "edit" ? (
            <label className="flex items-center gap-3 rounded-lg border border-[#E5E5E5] px-3 py-2.5">
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, isActive: event.target.checked }))
                }
                className="h-4 w-4 rounded border-[#E5E5E5] bg-[#F7F6F3] accent-[#3ecf8e]"
              />
              <span>
                <span className="block text-sm text-[#1D1D1F]">Active access</span>
                <span className="text-xs text-[#52525b]">Turn off to revoke CRM access immediately.</span>
              </span>
            </label>
          ) : null}

          <PermissionToggles
            role={form.role}
            permissions={form.permissions}
            onChange={(key, value) =>
              setForm((prev) => ({
                ...prev,
                permissions: { ...prev.permissions, [key]: value },
              }))
            }
          />

          {error ? <p className="text-sm text-red-400">{error}</p> : null}

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md px-4 py-2 text-sm text-[#52525b] hover:text-[#1D1D1F]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={pending}
              className="rounded-md bg-[#006B6B] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
            >
              {pending ? "Saving…" : mode === "add" ? "Send invite" : "Save changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function CrmSettingsClient({ initialUsers }: { initialUsers: CrmStaffUser[] }) {
  const router = useRouter();
  const [users, setUsers] = useState(initialUsers);
  const [formMode, setFormMode] = useState<FormMode>(null);
  const [editingUser, setEditingUser] = useState<CrmStaffUser | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [resendingId, setResendingId] = useState<string | null>(null);

  useEffect(() => {
    setUsers(initialUsers);
  }, [initialUsers]);

  const sortedUsers = useMemo(
    () => [...users].sort((a, b) => a.fullName.localeCompare(b.fullName)),
    [users]
  );

  const refresh = useCallback(() => {
    router.refresh();
    setUsers(initialUsers);
  }, [initialUsers, router]);

  const handleResend = async (userId: string) => {
    setActionError(null);
    setResendingId(userId);
    const result = await resendCrmUserInvite({ userId });
    setResendingId(null);
    if (!result.ok) {
      setActionError(result.error);
    }
  };

  const openEdit = (user: CrmStaffUser) => {
    setEditingUser(user);
    setFormMode("edit");
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-[-0.03em] text-[#1D1D1F]">Settings</h1>
          <p className="mt-2 max-w-2xl text-sm text-[#52525b]">
            Manage who can access the CRM, what they can see, and send secure invite links. Super
            users (admins) can add staff, adjust permissions, or revoke access at any time.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setEditingUser(null);
            setFormMode("add");
          }}
          className="rounded-md bg-[#006B6B] px-4 py-2 text-sm font-semibold text-white"
        >
          Add team member
        </button>
      </header>

      {actionError ? (
        <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
          {actionError}
        </p>
      ) : null}

      <div className="overflow-x-auto rounded-lg border border-[#E5E5E5]">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-[#E5E5E5] bg-white text-xs uppercase tracking-wider text-[#52525b]">
            <tr>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Phone</th>
              <th className="px-4 py-3 font-medium">Role</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E5E5]">
            {sortedUsers.map((user) => (
              <tr key={user.id} className="bg-[#FAFAF8]">
                <td className="px-4 py-3 font-medium text-[#1D1D1F]">{user.fullName}</td>
                <td className="px-4 py-3 text-[#52525b]">{user.email}</td>
                <td className="px-4 py-3 text-[#52525b]">{user.phone ?? ", "}</td>
                <td className="px-4 py-3">
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-xs font-medium",
                      user.role === "admin"
                        ? "bg-[#E8F3F3] text-[#006B6B]"
                        : "bg-zinc-800 text-[#3F3F46]"
                    )}
                  >
                    {user.role === "admin" ? "Admin" : "Staff"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {!user.isActive ? (
                    <span className="text-xs text-red-400">Revoked</span>
                  ) : user.invitePending ? (
                    <span className="text-xs text-amber-400">Invite pending</span>
                  ) : (
                    <span className="text-xs text-[#52525b]">Active</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    {user.invitePending || !user.lastSignInAt ? (
                      <button
                        type="button"
                        disabled={resendingId === user.id}
                        onClick={() => void handleResend(user.id)}
                        className="rounded-md border border-[#E5E5E5] px-2.5 py-1 text-xs text-[#3F3F46] hover:border-[#006B6B]/35 hover:text-[#1D1D1F] disabled:opacity-50"
                      >
                        {resendingId === user.id ? "Sending…" : "Resend link"}
                      </button>
                    ) : null}
                    <button
                      type="button"
                      onClick={() => openEdit(user)}
                      className="rounded-md border border-[#E5E5E5] px-2.5 py-1 text-xs text-[#3F3F46] hover:border-[#006B6B]/35 hover:text-[#1D1D1F]"
                    >
                      Edit
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {sortedUsers.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-[#52525b]">
                  No team members yet. Add your first advisor above.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      {formMode ? (
        <UserFormModal
          mode={formMode}
          editingUser={editingUser}
          onClose={() => {
            setFormMode(null);
            setEditingUser(null);
          }}
          onSaved={refresh}
        />
      ) : null}
    </div>
  );
}
