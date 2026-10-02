"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { studioLogin } from "../actions";

export function StudioLoginForm({ nextPath }: { nextPath: string }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(fd: FormData) {
    setError(null);
    fd.set("next", nextPath);
    startTransition(async () => {
      const res = await studioLogin(fd);
      if (!res.ok) {
        setError(res.error);
        return;
      }
      router.push(res.next);
      router.refresh();
    });
  }

  return (
    <form action={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="studio-password" className="block text-sm font-medium text-[#3F3F46] mb-1">
          Studio password
        </label>
        <input
          id="studio-password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="w-full rounded-lg border border-[#E5E5E5] bg-white px-4 py-3 text-[#1D1D1F] placeholder:text-[#A1A1AA] focus:outline-none focus:ring-2 focus:ring-[#006B6B]/30"
          placeholder="Provided by AS Brokers"
        />
      </div>
      {error && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">{error}</p>
      )}
      <p className="text-[11px] leading-relaxed text-[#52525b]">
        This password opens Insights, Courses, and Newsletter. If you already signed into the CRM, you can skip this and open Studio directly.
      </p>
      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-md bg-[#006B6B] py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {isPending ? "Signing in…" : "Enter Studio"}
      </button>
    </form>
  );
}
