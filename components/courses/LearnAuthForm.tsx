"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import {
  studentSignInAction,
  studentSignUpAction,
  type AccountAuthState,
} from "@/app/(content)/learn/account/actions";
import { studentAccountPath, studentForgotPasswordPath } from "@/lib/courses/paths";

const initial: AccountAuthState = { ok: false };

type Mode = "signin" | "signup";

export function LearnAuthForm({
  initialMode,
  nextPath,
}: {
  initialMode: Mode;
  nextPath: string;
}) {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>(initialMode);
  const [state, setState] = useState<AccountAuthState>(initial);
  const [pending, startTransition] = useTransition();

  function switchMode(next: Mode) {
    setMode(next);
    setState(initial);
    const url = studentAccountPath({ mode: next, next: nextPath });
    window.history.replaceState(null, "", url);
  }

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 rounded-full bg-stone-100 p-1 text-sm font-semibold">
        <button
          type="button"
          onClick={() => switchMode("signin")}
          className={`rounded-full py-2 transition ${
            mode === "signin" ? "bg-white text-shark shadow-sm" : "text-stone-500"
          }`}
        >
          Sign in
        </button>
        <button
          type="button"
          onClick={() => switchMode("signup")}
          className={`rounded-full py-2 transition ${
            mode === "signup" ? "bg-white text-shark shadow-sm" : "text-stone-500"
          }`}
        >
          Create account
        </button>
      </div>

      {mode === "signin" ? (
        <form
          className="space-y-4"
          action={(formData) => {
            formData.set("next", nextPath);
            startTransition(async () => {
              const result = await studentSignInAction(initial, formData);
              setState(result);
              if (result.ok && result.next) {
                router.push(result.next);
                router.refresh();
              }
            });
          }}
        >
          <Field label="Email" name="email" type="email" autoComplete="email" required />
          <Field
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
          />
          {state.message && !state.ok ? <ErrorBox message={state.message} /> : null}
          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-full bg-[#0057B8] py-3 text-sm font-semibold text-white hover:bg-[#004a9e] disabled:opacity-60"
          >
            {pending ? "Signing in…" : "Sign in"}
          </button>
          <p className="text-center text-xs text-stone-500">
            <Link href={studentForgotPasswordPath()} className="font-medium text-[#0057B8] hover:underline">
              Forgot password?
            </Link>
          </p>
        </form>
      ) : (
        <form
          className="space-y-4"
          action={(formData) => {
            formData.set("next", nextPath);
            startTransition(async () => {
              const result = await studentSignUpAction(initial, formData);
              setState(result);
              if (result.ok && result.next) {
                router.push(result.next);
                router.refresh();
              }
            });
          }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="First name" name="firstName" autoComplete="given-name" required />
            <Field label="Surname" name="surname" autoComplete="family-name" required />
          </div>
          <Field label="Email" name="email" type="email" autoComplete="email" required />
          <Field
            label="Password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            hint="At least 8 characters, with a letter and a number"
          />
          <Field
            label="Confirm password"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            required
          />
          <label className="flex items-start gap-2 text-sm text-stone-600">
            <input type="checkbox" name="privacyConsent" required className="mt-1" />
            <span>
              I agree to the{" "}
              <Link href="/privacy" className="font-medium text-[#0057B8] hover:underline">
                privacy notice
              </Link>{" "}
              so AS Brokers can keep my learning progress.
            </span>
          </label>
          <label className="flex items-start gap-2 text-sm text-stone-600">
            <input type="checkbox" name="marketingConsent" className="mt-1" />
            <span>Send me occasional tips and offers from AS Brokers (optional).</span>
          </label>
          {state.message && !state.ok ? <ErrorBox message={state.message} /> : null}
          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-full bg-[#0057B8] py-3 text-sm font-semibold text-white hover:bg-[#004a9e] disabled:opacity-60"
          >
            {pending ? "Creating account…" : "Create free account"}
          </button>
        </form>
      )}
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  autoComplete,
  required,
  hint,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  hint?: string;
}) {
  return (
    <label className="block text-sm font-medium text-stone-700">
      {label}
      <input
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="mt-1 w-full rounded-xl border border-stone-200 bg-[#F7F6F3] px-3 py-2.5 text-shark outline-none ring-[#0057B8]/30 focus:ring-2"
      />
      {hint ? <span className="mt-1 block text-xs font-normal text-stone-500">{hint}</span> : null}
    </label>
  );
}

function ErrorBox({ message }: { message: string }) {
  return (
    <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
      {message}
    </p>
  );
}
