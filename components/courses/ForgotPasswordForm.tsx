"use client";

import Link from "next/link";
import { useState, useTransition } from "react";

import {
  studentForgotPasswordAction,
  type AccountAuthState,
} from "@/app/(content)/learn/account/actions";
import { studentAccountPath } from "@/lib/courses/paths";

const initial: AccountAuthState = { ok: false };

export function ForgotPasswordForm() {
  const [state, setState] = useState<AccountAuthState>(initial);
  const [pending, startTransition] = useTransition();

  return (
    <form
      className="space-y-4"
      action={(formData) => {
        startTransition(async () => {
          setState(await studentForgotPasswordAction(initial, formData));
        });
      }}
    >
      <label className="block text-sm font-medium text-stone-700">
        Email
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          className="mt-1 w-full rounded-xl border border-stone-200 bg-[#F7F6F3] px-3 py-2.5 text-shark outline-none ring-[#0057B8]/30 focus:ring-2"
        />
      </label>
      {state.message ? (
        <p
          className={`rounded-xl px-3 py-2 text-sm ${
            state.ok
              ? "border border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border border-red-200 bg-red-50 text-red-700"
          }`}
        >
          {state.message}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-[#0057B8] py-3 text-sm font-semibold text-white hover:bg-[#004a9e] disabled:opacity-60"
      >
        {pending ? "Sending…" : "Email reset link"}
      </button>
      <p className="text-center text-xs text-stone-500">
        <Link href={studentAccountPath({ mode: "signin" })} className="font-medium text-[#0057B8] hover:underline">
          Back to sign in
        </Link>
      </p>
    </form>
  );
}
