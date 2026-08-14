"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { unlockEverestWealth } from "@/app/(content)/everest-wealth/actions";

export function EverestSoftLockGate() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const res = await unlockEverestWealth(formData);
      if (!res.ok) {
        setError(res.error);
        return;
      }
      router.refresh();
    });
  }

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-16" style={{ backgroundColor: "#F7F6F3" }}>
      <div className="w-full max-w-md border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-teal-800">Everest Wealth</p>
        <h1 className="mt-3 font-serif text-2xl font-semibold tracking-tight text-shark">
          Soft-locked review page
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-stone-600">
          This consolidated Everest Wealth briefing (profiles, constraints, and calculators) is not
          public yet. Enter the access password to continue.
        </p>

        <form action={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="everest-password" className="mb-1 block text-sm font-medium text-stone-700">
              Access password
            </label>
            <input
              id="everest-password"
              name="password"
              type="password"
              inputMode="numeric"
              autoComplete="current-password"
              required
              className="w-full rounded-lg border border-stone-300 bg-white px-4 py-3 text-shark placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-teal-700/30"
              placeholder="•••••"
            />
          </div>
          {error ? (
            <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">{error}</p>
          ) : null}
          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-lg bg-teal-800 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
          >
            {isPending ? "Checking…" : "Unlock Everest Wealth"}
          </button>
        </form>

        <p className="mt-5 text-[11px] leading-relaxed text-stone-500">
          Educational material only under FAIS. Not advice, not a quotation, and not for public
          distribution until Albert approves release.
        </p>
      </div>
    </div>
  );
}
