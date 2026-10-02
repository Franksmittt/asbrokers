"use client";

import Link from "next/link";
import { useActionState } from "react";

import { resetCrmPin, type CrmPinState } from "@/app/login/pin-actions";

type ResetPinFormProps = {
  token: string;
};

export function ResetPinForm({ token }: ResetPinFormProps) {
  const [state, formAction, isPending] = useActionState<CrmPinState, FormData>(
    resetCrmPin,
    null
  );

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="token" value={token} />

      <div>
        <label htmlFor="pin" className="mb-1 block text-sm font-medium text-[#3F3F46]">
          New 5-digit PIN
        </label>
        <input
          id="pin"
          name="pin"
          type="password"
          inputMode="numeric"
          pattern="\d{5}"
          maxLength={5}
          autoComplete="new-password"
          required
          placeholder="•••••"
          className="w-full rounded-2xl border border-[#E5E5E5] bg-[#FAFAF8] px-4 py-3 text-center text-2xl tracking-[0.4em] text-[#1D1D1F] placeholder:text-[#A1A1AA] focus:outline-none focus:ring-2 focus:ring-[#006B6B]/35"
        />
      </div>

      <div>
        <label htmlFor="confirmPin" className="mb-1 block text-sm font-medium text-[#3F3F46]">
          Confirm PIN
        </label>
        <input
          id="confirmPin"
          name="confirmPin"
          type="password"
          inputMode="numeric"
          pattern="\d{5}"
          maxLength={5}
          autoComplete="new-password"
          required
          placeholder="•••••"
          className="w-full rounded-2xl border border-[#E5E5E5] bg-[#FAFAF8] px-4 py-3 text-center text-2xl tracking-[0.4em] text-[#1D1D1F] placeholder:text-[#A1A1AA] focus:outline-none focus:ring-2 focus:ring-[#006B6B]/35"
        />
      </div>

      <p className="text-xs text-[#71717a]">
        Choose a unique 5-digit PIN. You will use it for CRM, Studio, and Command Workspace.
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
        {isPending ? "Saving…" : "Set new PIN"}
      </button>

      <p className="text-center text-xs text-[#71717a]">
        <Link
          href="/login/forgot"
          className="font-medium text-[#0057B8] underline-offset-2 hover:underline"
        >
          Request a new reset link
        </Link>
      </p>
    </form>
  );
}
