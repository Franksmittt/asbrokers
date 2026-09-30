"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { studentLoginAction, type StudentLoginState } from "@/app/(content)/learn/login/actions";

const initial: StudentLoginState = { ok: false };

export function StudentLoginForm({ nextPath }: { nextPath: string }) {
  const router = useRouter();
  const [state, setState] = useState<StudentLoginState>(initial);
  const [pending, startTransition] = useTransition();

  return (
    <form
      className="space-y-4"
      action={(formData) => {
        formData.set("next", nextPath);
        startTransition(async () => {
          const result = await studentLoginAction(initial, formData);
          setState(result);
          if (result.ok && result.next) {
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
      {state.message ? (
        <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
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
    </form>
  );
}
