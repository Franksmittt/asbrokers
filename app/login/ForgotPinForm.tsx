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
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-zinc-300">
          Work email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="you@asbrokers.co.za"
          className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-cinematic-teal/50"
        />
      </div>

      <p className="text-xs text-zinc-500">
        We only send reset links to registered AS Brokers staff emails.
      </p>

      {state?.message ? (
        <p
          role="status"
          className={
            state.success
              ? "rounded-2xl border border-cinematic-teal/30 bg-cinematic-teal/10 px-4 py-3 text-sm text-cinematic-teal"
              : "rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-300"
          }
        >
          {state.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-2xl bg-white py-3.5 font-semibold text-black transition-colors hover:bg-zinc-200 disabled:opacity-50"
      >
        {isPending ? "Sending…" : "Email reset link"}
      </button>

      <p className="text-center text-xs text-zinc-500">
        <Link href="/login" className="font-medium text-zinc-300 underline-offset-2 hover:underline">
          Back to PIN sign-in
        </Link>
      </p>
    </form>
  );
}
