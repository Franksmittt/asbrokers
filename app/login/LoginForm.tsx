"use client";

import { useActionState } from "react";

import { signInWithMagicLink, type MagicLinkState } from "@/app/login/actions";

type LoginFormProps = {
  nextPath: string;
};

export function LoginForm({ nextPath }: LoginFormProps) {
  const [state, formAction, isPending] = useActionState<MagicLinkState, FormData>(
    signInWithMagicLink,
    null
  );

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="next" value={nextPath} />

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
          className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-cinematic-teal/50"
        />
      </div>

      <p className="text-xs text-zinc-500">
        We&apos;ll send a one-time secure link. No password required.
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
        disabled={isPending || state?.success === true}
        className="w-full rounded-2xl bg-white py-3.5 font-semibold text-black transition-colors hover:bg-zinc-200 disabled:opacity-50"
      >
        {isPending ? "Dispatching…" : "Send secure link"}
      </button>
    </form>
  );
}
