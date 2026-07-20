"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CalculatorToolPanel } from "@/components/calculators/CalculatorToolPanel";
import { Lock } from "@/components/icons";
import {
  FINANCIAL_FREEDOM_COMMUNITY_PATH,
  FINANCIAL_FREEDOM_REGISTER_PATH,
  hasActiveFinancialFreedomMembership,
} from "@/lib/membership/access";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { isSupabaseBrowserConfigured } from "@/lib/membership/supabase-browser";

type Props = {
  calculatorSrc: string;
  calculatorTitle: string;
  calculatorId: string;
  calculatorPath: string;
  joinHref?: string;
  registerHref?: string;
  adviceHref?: string;
};

type GateState = "checking" | "locked" | "unlocked";

/**
 * Members-only calculator shell: public visitors see a lock + join/login CTAs.
 * Active Financial Freedom Community™ members (or staff) unlock the planner iframe.
 */
export function MembersOnlyCalculatorGate({
  calculatorSrc,
  calculatorTitle,
  calculatorId,
  calculatorPath,
  joinHref = FINANCIAL_FREEDOM_COMMUNITY_PATH,
  registerHref = FINANCIAL_FREEDOM_REGISTER_PATH,
  adviceHref = "/contact?source=retirement_planning_session_asset_017",
}: Props) {
  const [state, setState] = useState<GateState>("checking");
  const loginHref = `/login?next=${encodeURIComponent(calculatorPath)}`;

  useEffect(() => {
    let cancelled = false;

    async function resolveAccess() {
      if (!isSupabaseBrowserConfigured()) {
        if (!cancelled) setState("locked");
        return;
      }
      try {
        const supabase = createSupabaseBrowserClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (cancelled) return;
        setState(hasActiveFinancialFreedomMembership(user) ? "unlocked" : "locked");
      } catch {
        if (!cancelled) setState("locked");
      }
    }

    void resolveAccess();
    return () => {
      cancelled = true;
    };
  }, []);

  if (state === "unlocked") {
    return (
      <CalculatorToolPanel
        calculatorSrc={calculatorSrc}
        calculatorTitle={calculatorTitle}
        calculatorId={calculatorId}
        calculatorPath={calculatorPath}
      />
    );
  }

  return (
    <div
      className="relative mt-6 overflow-hidden rounded-3xl bg-[#1D1D1F] p-6 text-white shadow-2xl ring-1 ring-white/10 sm:p-8"
      role="region"
      aria-label="Members only planner"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at top right, rgba(212,175,55,0.18), transparent 55%)",
        }}
        aria-hidden
      />
      <div className="relative">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15">
            <Lock className="h-5 w-5 text-[#D4AF37]" aria-hidden />
          </span>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#D4AF37]">
              Members only
            </p>
            <h3 className="mt-1 text-xl font-bold tracking-tight sm:text-2xl">
              Goal Engineering Planner™
            </h3>
          </div>
        </div>

        <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/75">
          This planner is proprietary Intellectual Property inside the Retirement Gap Method™.
          It is available exclusively to members of the Financial Freedom Community™ after
          registration and programme payment.
        </p>

        <ul className="mt-5 space-y-2 text-sm text-white/70">
          <li>· Reverse-engineer the growth required to reach a goal</li>
          <li>· Build a month-by-month planning roadmap</li>
          <li>· Save progress into your Financial Blueprint™ (members area)</li>
        </ul>

        {state === "checking" ? (
          <p className="mt-6 text-sm text-white/50">Checking membership…</p>
        ) : (
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <Link
              href={registerHref}
              className="inline-flex items-center justify-center rounded-2xl bg-[#D4AF37] px-5 py-3.5 text-center text-sm font-bold text-[#1D1D1F] transition hover:opacity-90"
            >
              Join the Financial Freedom Community
            </Link>
            <Link
              href={loginHref}
              className="inline-flex items-center justify-center rounded-2xl bg-white/10 px-5 py-3.5 text-center text-sm font-bold text-white ring-1 ring-white/20 transition hover:bg-white/15"
            >
              Member login
            </Link>
            <Link
              href={joinHref}
              className="inline-flex items-center justify-center rounded-2xl bg-transparent px-5 py-3.5 text-center text-sm font-semibold text-white/80 ring-1 ring-white/15 transition hover:bg-white/5 sm:col-span-1"
            >
              Learn about the community
            </Link>
            <Link
              href={adviceHref}
              className="inline-flex items-center justify-center rounded-2xl bg-transparent px-5 py-3.5 text-center text-sm font-semibold text-white/80 ring-1 ring-white/15 transition hover:bg-white/5"
            >
              Book a Retirement Planning Session
            </Link>
          </div>
        )}

        <p className="mt-6 text-xs leading-relaxed text-white/45">
          Educational planning tool. Not financial, investment, tax or legal advice. Access
          requires an active programme membership after signup and payment.
        </p>
      </div>
    </div>
  );
}
