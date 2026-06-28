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
        <label htmlFor="studio-password" className="block text-sm font-medium text-zinc-300 mb-1">
          Studio password
        </label>
        <input
          id="studio-password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="w-full rounded-lg border border-[#2a2a2a] bg-[#0a0a0a] px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-[#3ecf8e]/30"
          placeholder="Provided by AS Brokers"
        />
      </div>
      {error && (
        <p className="rounded-lg border border-red-500/30 bg-red-950/40 px-3 py-2 text-sm text-red-300">{error}</p>
      )}
      <p className="text-[11px] leading-relaxed text-zinc-500">
        This password is only for writing articles. It is not linked to email or banking.
      </p>
      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-md bg-[#3ecf8e] py-3 text-sm font-medium text-black transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {isPending ? "Signing in…" : "Enter studio"}
      </button>
    </form>
  );
}
