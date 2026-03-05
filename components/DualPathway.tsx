"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck, LineChart } from "./icons";

export function DualPathway() {
  return (
    <section className="relative z-10 py-16 md:py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white text-center mb-4">
          How can we help you?
        </h2>
        <p className="text-zinc-400 text-center max-w-xl mx-auto mb-12">
          Choose your path and we&apos;ll guide you to the right solutions.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <Link
            href="/#solutions"
            className="group flex flex-col md:flex-row items-center gap-6 p-8 rounded-[2rem] bg-[#151518] border border-white/5 hover:border-white/15 transition-all duration-300"
          >
            <div className="bg-white/10 w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-teal-500/20 transition-colors">
              <ShieldCheck className="w-8 h-8 text-teal-400" />
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold text-white mb-2">I want to protect my assets</h3>
              <p className="text-zinc-500 text-sm mb-4">
                Short-term insurance, commercial cover, and risk management for your property, vehicles, and business.
              </p>
              <span className="inline-flex items-center gap-2 text-teal-400 font-semibold text-sm group-hover:gap-3 transition-all">
                Explore protection <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>
          <Link
            href="/#wealth"
            className="group flex flex-col md:flex-row items-center gap-6 p-8 rounded-[2rem] bg-[#151518] border border-white/5 hover:border-white/15 transition-all duration-300"
          >
            <div className="bg-white/10 w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-blue-500/20 transition-colors">
              <LineChart className="w-8 h-8 text-blue-400" />
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold text-white mb-2">I want to grow my capital</h3>
              <p className="text-zinc-500 text-sm mb-4">
                Retirement planning, living annuities, and Code 1.8 alternative investments with Everest Wealth.
              </p>
              <span className="inline-flex items-center gap-2 text-blue-400 font-semibold text-sm group-hover:gap-3 transition-all">
                Explore wealth <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
