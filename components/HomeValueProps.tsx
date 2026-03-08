"use client";

import Link from "next/link";
import { ShieldCheck, LineChart, User } from "./icons";

const props = [
  {
    icon: ShieldCheck,
    title: "100% Independent",
    body: "Authorised Category 1.8 Advice. We're not tied to a single product house—our advice is built around your goals, not quotas.",
    href: "/solutions",
    cta: "Our solutions",
  },
  {
    icon: LineChart,
    title: "Zero Advice Fees on Investments",
    body: "No advice fees on investments. Retirement, living annuities, and Code 1.8 alternative investments under one roof.",
    href: "/calculators",
    cta: "Calculators and tools",
  },
  {
    icon: User,
    title: "Personal Concierge Service",
    body: "No call centres. You deal with experienced advisers who know your file—a true concierge relationship.",
    href: "/contact",
    cta: "Start a conversation",
  },
];

export function HomeValueProps() {
  return (
    <section className="relative z-10 py-20 md:py-24 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
      <div>
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
              className="group block p-6 md:p-8 rounded-[2rem] rim-light border-0 hover:bg-white/[0.07] transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-5 group-hover:bg-cinematic-teal/20 transition-colors duration-500">
                <item.icon className="w-6 h-6 text-cinematic-teal" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4 tracking-[0.01em]">{item.body}</p>
              <span className="text-cinematic-teal text-sm font-semibold group-hover:underline">
                {item.cta} →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
