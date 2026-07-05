"use client";

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
        <label htmlFor="pin" className="mb-1 block text-sm font-medium text-zinc-300">
          CRM access PIN
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
          className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-center text-2xl tracking-[0.4em] text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-cinematic-teal/50"
        />
      </div>

      <p className="text-xs text-zinc-500">
        Enter the 5-digit PIN provided by AS Brokers for this demonstration.
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
        {isPending ? "Opening CRM…" : "Enter CRM"}
      </button>
    </form>
  );
}
