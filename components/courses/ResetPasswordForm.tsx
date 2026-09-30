"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import {
  studentResetPasswordAction,
  type AccountAuthState,
} from "@/app/(content)/learn/account/actions";

const initial: AccountAuthState = { ok: false };

export function ResetPasswordForm({ token }: { token: string }) {
  const router = useRouter();
  const [state, setState] = useState<AccountAuthState>(initial);
  const [pending, startTransition] = useTransition();

  return (
    <form
      className="space-y-4"
      action={(formData) => {
        formData.set("token", token);
        startTransition(async () => {
          const result = await studentResetPasswordAction(initial, formData);
          setState(result);
          if (result.ok && result.next) {
            router.push(result.next);
            router.refresh();
          }
        });
      }}
    >
      <label className="block text-sm font-medium text-stone-700">
        New password
        <input
          name="password"
          type="password"
          required
          autoComplete="new-password"
          className="mt-1 w-full rounded-xl border border-stone-200 bg-[#F7F6F3] px-3 py-2.5 text-shark outline-none ring-[#0057B8]/30 focus:ring-2"
        />
        <span className="mt-1 block text-xs font-normal text-stone-500">
          At least 8 characters, with a letter and a number
        </span>
      </label>
      <label className="block text-sm font-medium text-stone-700">
        Confirm password
        <input
          name="confirmPassword"
          type="password"
          required
          autoComplete="new-password"
          className="mt-1 w-full rounded-xl border border-stone-200 bg-[#F7F6F3] px-3 py-2.5 text-shark outline-none ring-[#0057B8]/30 focus:ring-2"
        />
      </label>
      {state.message && !state.ok ? (
        <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.message}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-[#0057B8] py-3 text-sm font-semibold text-white hover:bg-[#004a9e] disabled:opacity-60"
      >
        {pending ? "Saving…" : "Set new password"}
      </button>
    </form>
  );
}
