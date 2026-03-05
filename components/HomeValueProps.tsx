"use client";

import Link from "next/link";
import { ShieldCheck, LineChart, User } from "./icons";

const props = [
  {
    icon: ShieldCheck,
    title: "Independent",
    body: "We're not tied to a single product house. Our advice is built around your goals, not quotas.",
    href: "/solutions",
    cta: "Our solutions",
  },
  {
    icon: LineChart,
    title: "Full-service",
    body: "Retirement, insurance, estate, and business structuring under one roof. One relationship.",
    href: "/calculators",
    cta: "Calculators and tools",
  },
  {
    icon: User,
    title: "Personal",
    body: "No call centres. You deal with experienced advisers who know your file.",
    href: "/contact",
    cta: "Start a conversation",
  },
];

export function HomeValueProps() {
  return (
    <section className="relative z-10 py-20 md:py-24 px-4 sm:px-6 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-3">
          Why AS Brokers
        </h2>
        <p className="text-zinc-400 text-center max-w-xl mx-auto mb-14">
          Independent advice, full-service planning, and a team that stays in your corner.
        </p>
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {props.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group block p-6 md:p-8 rounded-2xl bg-[#151518] border border-white/5 hover:border-white/15 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-5 group-hover:bg-blue-500/20 transition-colors">
                <item.icon className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed mb-4">{item.body}</p>
              <span className="text-blue-400 text-sm font-semibold group-hover:underline">
                {item.cta} →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
