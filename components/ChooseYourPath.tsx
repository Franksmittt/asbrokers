"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck, LineChart } from "./icons";
import { TiltCard } from "./TiltCard";

/**
 * Post-hero self-selection: two paths (Protect / Grow). Moved from hero for v1.2 simplification.
 */
export function ChooseYourPath() {
  return (
    <section
      className="relative z-10 py-16 md:py-24 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto"
      aria-labelledby="choose-path-heading"
    >
      <h2 id="choose-path-heading" className="text-2xl md:text-3xl font-bold tracking-tight text-white text-center mb-4">
        Choose your path
      </h2>
      <p className="text-zinc-400 text-center max-w-xl mx-auto mb-12">
        We&apos;ll guide you to the right solutions.
      </p>
      <div className="grid md:grid-cols-2 gap-6">
        <TiltCard>
          <Link
            href="/#solutions"
            className="group flex flex-col md:flex-row items-center gap-6 p-8 rounded-[2rem] rim-light border-0 h-full hover:bg-white/[0.07] transition-colors duration-500"
          >
            <div className="bg-white/10 w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-cinematic-teal/20 transition-colors">
              <ShieldCheck className="w-8 h-8 text-cinematic-teal" />
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold text-white mb-2">Protect assets</h3>
              <p className="text-zinc-500 text-sm mb-4">
                Short-term insurance, life cover, estate structuring (wills/trusts).
              </p>
              <span className="inline-flex items-center gap-2 text-cinematic-teal font-semibold text-sm group-hover:gap-3 transition-all">
                Explore protection <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>
        </TiltCard>
        <TiltCard>
          <Link
            href="/everest-wealth"
            className="group flex flex-col md:flex-row items-center gap-6 p-8 rounded-[2rem] rim-light border-0 h-full hover:bg-white/[0.07] transition-colors duration-500"
          >
            <div className="bg-white/10 w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-gold-orange/20 transition-colors">
              <LineChart className="w-8 h-8 text-gold-orange" />
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold text-white mb-2">Grow capital</h3>
              <p className="text-zinc-500 text-sm mb-4">
                Retirement planning, living annuities, Everest fixed-returns.
              </p>
              <span className="inline-flex items-center gap-2 text-gold-orange font-semibold text-sm group-hover:gap-3 transition-all">
                Explore wealth <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>
        </TiltCard>
      </div>
    </section>
  );
}
