"use client";

import { useTransition } from "react";
import { useState } from "react";
import { mockLogin } from "@/app/login/actions";
import type { MockRole } from "@/lib/mock-auth";
import { MOCK_STAFF } from "@/lib/mock-crm";

export function LoginForm({ next }: { next: string }) {
  const [name, setName] = useState("");
  const [role, setRole] = useState<MockRole>("staff");
  const [staffId, setStaffId] = useState("s5");
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(() => mockLogin(role, name, staffId));
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
      <div>
        <label className="block text-sm font-medium text-zinc-300 mb-2">Sign in as</label>
        <div className="grid grid-cols-2 gap-2">
          {(["admin", "staff"] as const).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              className={`py-3 px-4 rounded-2xl text-sm font-medium capitalize transition-all ${
                role === r
                  ? "bg-cinematic-teal/20 text-cinematic-teal border border-cinematic-teal/40"
                  : "bg-white/5 text-zinc-400 border border-white/10 hover:bg-white/10 hover:text-white"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
        <p className="text-zinc-500 text-xs mt-2">
          {role === "admin" && "Full CRM access. All leads and settings."}
          {role === "staff" && "Assigned leads and tasks only."}
        </p>
      </div>
      {role === "staff" && (
        <div>
          <label htmlFor="staff" className="block text-sm font-medium text-zinc-300 mb-1">
            Sign in as (staff member)
          </label>
          <select
            id="staff"
            value={staffId}
            onChange={(e) => setStaffId(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl bg-black/40 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-cinematic-teal/50"
          >
            {MOCK_STAFF.filter((s) => s.id !== "s1").map((s) => (
              <option key={s.id} value={s.id}>{s.name} – {s.role}</option>
            ))}
          </select>
        </div>
      )}
      <button
        type="submit"
        disabled={isPending}
        className="w-full py-3.5 rounded-2xl bg-white text-black font-semibold hover:bg-zinc-200 transition-colors disabled:opacity-50"
      >
        {isPending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
