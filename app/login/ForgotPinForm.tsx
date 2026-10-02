"use client";

import Link from "next/link";
import { useActionState } from "react";

import { requestCrmPinReset, type CrmPinState } from "@/app/login/pin-actions";

export function ForgotPinForm() {
  const [state, formAction, isPending] = useActionState<CrmPinState, FormData>(
    requestCrmPinReset,
    null
  );

  return (
    <form action={formAction} className="space-y-6">
      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-[#3F3F46]">
          Work email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="you@asbrokers.co.za"
          className="w-full rounded-2xl border border-[#E5E5E5] bg-[#FAFAF8] px-4 py-3 text-[#1D1D1F] placeholder:text-[#A1A1AA] focus:outline-none focus:ring-2 focus:ring-[#006B6B]/35"
        />
      </div>

      <p className="text-xs text-[#71717a]">
        We only send reset links to registered AS Brokers staff emails.
      </p>

      {state?.message ? (
        <p
          role="status"
          className={
            state.success
              ? "rounded-2xl border border-[#A7F3D0] bg-[#ECFDF5] px-4 py-3 text-sm text-[#065F46]"
              : "rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900"
          }
        >
          {state.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-2xl bg-[#006B6B] py-3.5 font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {isPending ? "Sending…" : "Email reset link"}
      </button>

      <p className="text-center text-xs text-[#71717a]">
        <Link href="/login" className="font-medium text-[#0057B8] underline-offset-2 hover:underline">
          Back to PIN sign-in
        </Link>
      </p>
    </form>
  );
}
