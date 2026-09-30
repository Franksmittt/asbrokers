"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import {
  requestStudentOtpAction,
  verifyStudentOtpAction,
  type StudentLoginState,
} from "@/app/(content)/learn/login/actions";

const initial: StudentLoginState = { ok: false, step: "email" };

export function StudentLoginForm({ nextPath }: { nextPath: string }) {
  const router = useRouter();
  const [state, setState] = useState<StudentLoginState>(initial);
  const [pending, startTransition] = useTransition();
  const step = state.step ?? "email";

  return (
    <div className="space-y-4">
      {step === "email" ? (
        <form
          className="space-y-4"
          action={(formData) => {
            formData.set("next", nextPath);
            startTransition(async () => {
              const result = await requestStudentOtpAction(initial, formData);
              setState(result);
              if (result.ok && result.direct && result.next) {
                router.push(result.next);
                router.refresh();
              }
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
              placeholder="you@example.com"
            />
          </label>
          {state.message && !state.ok ? (
            <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {state.message}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-full bg-[#0057B8] py-3 text-sm font-semibold text-white hover:bg-[#004a9e] disabled:opacity-60"
          >
            {pending ? "Checking…" : "Continue"}
          </button>
          <p className="text-center text-xs text-stone-500">
            We email a one-time code when messaging is configured. Same email you used to register.
          </p>
        </form>
      ) : (
        <form
          className="space-y-4"
          action={(formData) => {
            formData.set("next", nextPath);
            formData.set("email", state.email ?? "");
            startTransition(async () => {
              const result = await verifyStudentOtpAction(state, formData);
              setState(result);
              if (result.ok && result.next) {
                router.push(result.next);
                router.refresh();
              }
            });
          }}
        >
          <p className="text-sm text-stone-600">
            Enter the 6-digit code sent to <span className="font-medium text-shark">{state.email}</span>
          </p>
          <label className="block text-sm font-medium text-stone-700">
            Sign-in code
            <input
              name="code"
              inputMode="numeric"
              autoComplete="one-time-code"
              required
              maxLength={6}
              className="mt-1 w-full rounded-xl border border-stone-200 bg-[#F7F6F3] px-3 py-2.5 tracking-[0.3em] text-shark outline-none ring-[#0057B8]/30 focus:ring-2"
              placeholder="••••••"
            />
          </label>
          {state.message ? (
            <p
              className={`rounded-xl px-3 py-2 text-sm ${
                state.ok
                  ? "border border-stone-200 bg-stone-50 text-stone-600"
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
            {pending ? "Signing in…" : "Open my dashboard"}
          </button>
          <button
            type="button"
            className="w-full text-center text-xs font-medium text-stone-500 hover:text-shark"
            onClick={() => setState({ ok: false, step: "email" })}
          >
            Use a different email
          </button>
        </form>
      )}
    </div>
  );
}
