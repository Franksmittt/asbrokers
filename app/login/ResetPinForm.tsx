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
        <label htmlFor="pin" className="mb-1 block text-sm font-medium text-zinc-300">
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
          className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-center text-2xl tracking-[0.4em] text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-cinematic-teal/50"
        />
      </div>

      <div>
        <label htmlFor="confirmPin" className="mb-1 block text-sm font-medium text-zinc-300">
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
          className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-center text-2xl tracking-[0.4em] text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-cinematic-teal/50"
        />
      </div>

      <p className="text-xs text-zinc-500">
        Choose a unique 5-digit PIN. You will use it for CRM, Studio, and Command Workspace.
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
        {isPending ? "Saving…" : "Set new PIN"}
      </button>

      <p className="text-center text-xs text-zinc-500">
        <Link
          href="/login/forgot"
          className="font-medium text-zinc-300 underline-offset-2 hover:underline"
        >
          Request a new reset link
        </Link>
      </p>
    </form>
  );
}
