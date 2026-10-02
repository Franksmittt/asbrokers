"use client";

import Link from "next/link";
import { useActionState } from "react";

import { signInWithCrmPin, type CrmPinState } from "@/app/login/pin-actions";

type PinLoginFormProps = {
  nextPath: string;
};

export function PinLoginForm({ nextPath }: PinLoginFormProps) {
  const [state, formAction, isPending] = useActionState<CrmPinState, FormData>(
    signInWithCrmPin,
    null
  );

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="next" value={nextPath} />

      <div>
        <label htmlFor="pin" className="mb-1 block text-sm font-medium text-[#3F3F46]">
          Access PIN
        </label>
        <input
          id="pin"
          name="pin"
          type="password"
          inputMode="numeric"
          pattern="\d{5}"
          maxLength={5}
          autoComplete="one-time-code"
          required
          placeholder="•••••"
          className="w-full rounded-2xl border border-[#E5E5E5] bg-[#FAFAF8] px-4 py-3 text-center text-2xl tracking-[0.4em] text-[#1D1D1F] placeholder:text-[#A1A1AA] focus:outline-none focus:ring-2 focus:ring-[#006B6B]/35"
        />
      </div>

      <p className="text-xs text-[#71717a]">
        Enter your 5-digit staff PIN for CRM, Studio, and Command Workspace.
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
        aria-label={isPending ? "Signing in" : "Sign in with PIN"}
        className="w-full rounded-2xl bg-[#006B6B] py-3.5 font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {isPending ? "Signing in…" : "Sign in"}
      </button>

      <p className="text-center text-xs text-[#71717a]">
        <Link
          href="/login/forgot"
          className="font-medium text-[#0057B8] underline-offset-2 hover:underline"
        >
          Forgot your PIN?
        </Link>
      </p>
    </form>
  );
}
