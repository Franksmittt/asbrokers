"use client";

import Link from "next/link";
import { ArrowRight } from "./icons";
import { useLeadForm } from "./LeadFormContext";
import { HeroCalculator } from "./HeroCalculator";

export function Hero() {
  const { openLeadForm } = useLeadForm();

  return (
    <section
      id="vault"
      className="absolute inset-0 z-10 flex flex-col px-4 sm:px-6 md:px-8 pt-24 pb-8 overflow-auto"
    >
      <div className="max-w-6xl mx-auto w-full flex-1 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 lg:gap-12 md:items-center">
        {/* Columns 1 & 2 (66%): copy */}
        <div className="md:col-span-2 flex flex-col text-left">
          <div className="inline-flex items-center gap-2 w-fit px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-medium mb-5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500" />
            </span>
            Alberton, Gauteng · Est. 1998 · FSP 17273
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.15] mb-4">
            Protecting Your Legacy.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-teal-300 to-blue-500">
              Engineering Your Wealth.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-zinc-400 font-light leading-relaxed mb-6 max-w-lg">
            Independent financial advice and Code 1.8 alternative investments. Fiduciary architecture, risk management, and wealth structuring from the East Rand to the Western Cape.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={openLeadForm}
              className="bg-white text-black px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:bg-zinc-200 flex items-center gap-2"
            >
              Financial Health Check <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              href="#lab"
              className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-5 py-2.5 rounded-full text-sm font-medium transition-all flex items-center backdrop-blur-md"
            >
              Run The Numbers
            </Link>
          </div>
        </div>

        {/* Mobile only: scroll hint in flow between copy and calculator so it never overlaps */}
        <a
          href="#lab"
          className="flex md:hidden flex-col items-center gap-0.5 text-zinc-500 hover:text-zinc-400 transition-colors text-xs py-4"
          aria-label="Scroll to content"
        >
          <span className="uppercase tracking-widest">Scroll for more</span>
          <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>

        {/* Column 3 (33%): calculator */}
        <div className="md:col-span-1 flex justify-start md:justify-end min-w-0">
          <HeroCalculator />
        </div>
      </div>

      {/* Desktop only: scroll hint fixed at bottom (no overlap with 66/33 layout) */}
      <a
        href="#lab"
        className="hidden md:flex absolute bottom-4 left-1/2 -translate-x-1/2 flex-col items-center gap-0.5 text-zinc-500 hover:text-zinc-400 transition-colors text-xs"
        aria-label="Scroll to content"
      >
        <span className="uppercase tracking-widest">Scroll</span>
        <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </a>
    </section>
  );
}
