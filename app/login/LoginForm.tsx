"use client";

import { useTransition, useState } from "react";
import { mockLogin } from "@/app/login/actions";

export function LoginForm() {
  const [name, setName] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(() => mockLogin(name));
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-zinc-300 mb-1">
          Your name (optional)
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Albert"
          className="w-full px-4 py-3 rounded-2xl bg-black/40 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-cinematic-teal/50"
        />
      </div>
      <p className="text-zinc-500 text-xs">
        Sign in to the team office: Wealth Presentation and Sanity Studio for blog posts and content.
      </p>
      <button
        type="submit"
        disabled={isPending}
        className="w-full py-3.5 rounded-2xl bg-white text-black font-semibold hover:bg-zinc-200 transition-colors disabled:opacity-50"
      >
        {isPending ? "Signing in…" : "Sign in to office"}
      </button>
    </form>
  );
}
