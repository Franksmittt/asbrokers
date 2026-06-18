"use client";

import Link from "next/link";
import { Footer } from "@/components/Footer";
import { ArrowRight, HeartPulse, LineChart, Scroll } from "@/components/icons";

const PILLARS = [
  {
    id: "health",
    title: "Health",
    subtitle: "Wellness & protection",
    description: "Discover your Retirement Health Gap™ and build habits for a long, active retirement.",
    href: "/healthy-retirement-blueprint",
    icon: HeartPulse,
    status: "active" as const,
  },
  {
    id: "wealth",
    title: "Wealth",
    subtitle: "Retirement & investments",
    description: "Retirement readiness, income planning, and structured capital solutions.",
    href: "/retirement-survival-blueprint",
    icon: LineChart,
    status: "partial" as const,
  },
  {
    id: "legacy",
    title: "Legacy",
    subtitle: "Estate & succession",
    description: "Wills, trusts, liquidity, and the conversations families avoid until it is too late.",
    href: "/legacy-readiness-checklist",
    icon: Scroll,
    status: "active" as const,
  },
];

const PHASES = [
  { phase: 1, title: "Healthy Retirement Blueprint™", status: "Available now", href: "/healthy-retirement-blueprint", pillar: "Health" },
  { phase: 1, title: "Legacy Readiness Checklist™", status: "Available now", href: "/legacy-readiness-checklist", pillar: "Legacy" },
  { phase: 2, title: "Legacy Readiness Guide™", status: "Coming soon", href: null, pillar: "Legacy" },
  { phase: 3, title: "Estate Planning Review™", status: "Coming soon", href: "/contact", pillar: "Legacy" },
  { phase: 4, title: "Legacy Conversations Guide™", status: "Coming soon", href: null, pillar: "Legacy" },
  { phase: 5, title: "Trust & Estate Planning Implementation™", status: "Advisory engagement", href: "/contact", pillar: "Legacy" },
];

export function LegacyConversationsHub() {
  return (
    <div className="min-h-screen bg-[#0a0a0c]">
      <section className="px-4 pb-12 pt-28 sm:px-6 md:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#00549F]">
            Legacy Conversations™
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            Health · Wealth · Legacy
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
            A structured journey for South African families — from wellness and retirement readiness to estate
            planning and succession. Start where your need is greatest.
          </p>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 md:px-8">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            const card = (
              <div
                className={`h-full rounded-3xl border p-6 backdrop-blur-xl ${
                  pillar.status === "active"
                    ? "border-[#00549F]/40 bg-[#00549F]/10"
                    : "border-white/10 bg-white/5"
                }`}
              >
                <Icon className={`mb-4 h-8 w-8 ${pillar.status === "active" ? "text-[#00549F]" : "text-zinc-500"}`} />
                <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">{pillar.subtitle}</p>
                <h2 className="mt-1 text-xl font-bold text-white">{pillar.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">{pillar.description}</p>
                {pillar.status === "active" && (
                  <span className="mt-4 inline-block rounded-full bg-[#00549F]/20 px-3 py-1 text-xs font-semibold text-[#7eb8e8]">
                    Phase 1 live
                  </span>
                )}
                {pillar.status === "partial" && (
                  <span className="mt-4 inline-block rounded-full bg-white/5 px-3 py-1 text-xs text-zinc-400">
                    Tools available
                  </span>
                )}
              </div>
            );

            if (pillar.href) {
              return (
                <Link key={pillar.id} href={pillar.href} className="group block transition hover:scale-[1.01]">
                  {card}
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#00549F] group-hover:underline">
                    Explore <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              );
            }

            return <div key={pillar.id}>{card}</div>;
          })}
        </div>
      </section>

      <section className="px-4 pb-24 sm:px-6 md:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-2xl font-bold text-white">Health · Wealth · Legacy journeys</h2>
          <ol className="mt-10 space-y-4">
            {PHASES.map((item) => (
              <li
                key={`${item.pillar}-${item.title}`}
                className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4"
              >
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#00549F]">
                    {item.pillar} · Phase {item.phase}
                  </p>
                  <p className="font-semibold text-white">{item.title}</p>
                  <p className="text-sm text-zinc-500">{item.status}</p>
                </div>
                {item.href && item.status === "Available now" ? (
                  <Link
                    href={item.href}
                    className="rounded-xl bg-[#00549F] px-4 py-2 text-xs font-bold uppercase text-white"
                  >
                    Start
                  </Link>
                ) : item.href ? (
                  <Link href={item.href} className="text-sm font-medium text-[#00549F] hover:underline">
                    Enquire
                  </Link>
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Footer />
    </div>
  );
}
