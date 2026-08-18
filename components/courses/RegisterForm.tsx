"use client";

import { useActionState } from "react";

import { registerForCourse, type LearnActionState } from "@/app/(content)/learn/actions";
import { WARM_BTN_PRIMARY } from "@/lib/warm-theme";

const initial: LearnActionState = { ok: true };

export function RegisterForm({ courseSlug, courseTitle }: { courseSlug: string; courseTitle: string }) {
  const [state, formAction, pending] = useActionState(registerForCourse, initial);

  return (
    <form action={formAction} className="space-y-5 rounded-3xl bg-white p-6 shadow-xl ring-1 ring-stone-200 sm:p-8">
      <input type="hidden" name="courseSlug" value={courseSlug} />
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-semibold text-stone-800">
          First name
          <input
            name="firstName"
            required
            autoComplete="given-name"
            className="mt-2 w-full rounded-xl border border-stone-300 bg-white px-3 py-3 text-base text-stone-900"
          />
        </label>
        <label className="block text-sm font-semibold text-stone-800">
          Surname
          <input
            name="surname"
            required
            autoComplete="family-name"
            className="mt-2 w-full rounded-xl border border-stone-300 bg-white px-3 py-3 text-base text-stone-900"
          />
        </label>
      </div>
      <label className="block text-sm font-semibold text-stone-800">
        Email address
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          className="mt-2 w-full rounded-xl border border-stone-300 bg-white px-3 py-3 text-base text-stone-900"
        />
      </label>

      <label className="flex items-start gap-3 text-sm text-stone-700">
        <input type="checkbox" name="privacyConsent" value="true" required className="mt-1" />
        <span>
          I agree that AS Brokers CC (FSP 17273) may store my name and email to give me access to{" "}
          <strong>{courseTitle}</strong>, remember my course progress, and keep a private record of any
          lesson answers I submit. This is not a public comment section. See the{" "}
          <a href="/privacy" className="font-medium text-samsung-blue hover:underline">
            privacy notice
          </a>
          .
        </span>
      </label>
      <label className="flex items-start gap-3 text-sm text-stone-700">
        <input type="checkbox" name="marketingConsent" value="true" className="mt-1" />
        <span>Optional: I would like occasional educational emails from AS Brokers. I can unsubscribe at any time.</span>
      </label>

      {state.message && !state.ok ? (
        <p className="text-sm font-medium text-red-700" role="alert">
          {state.message}
        </p>
      ) : null}

      <button type="submit" disabled={pending} className={`${WARM_BTN_PRIMARY} w-full disabled:opacity-60`}>
        {pending ? "Starting…" : "Start the free course"}
      </button>
    </form>
  );
}
