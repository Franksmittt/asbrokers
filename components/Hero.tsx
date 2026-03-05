"use client";

import Link from "next/link";
import { ArrowRight } from "./icons";
import { useLeadForm } from "./LeadFormContext";

export function Hero() {
  const { openLeadForm } = useLeadForm();

  return (
    <section
      id="vault"
      className="relative pt-40 pb-20 px-6 flex flex-col items-center text-center min-h-[90vh] justify-center z-10"
    >
      <div className="max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-medium mb-8 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
          </span>
          Alberton, Gauteng · Est. 1998 · FSP 17273
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white leading-[1.05] mb-6">
          Protecting Your Legacy. <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-teal-300 to-blue-500">
            Engineering Your Wealth.
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-zinc-400 font-light tracking-tight max-w-2xl mx-auto mb-10 leading-relaxed">
          Independent financial advice and Code 1.8 alternative investments. Albert Schuurman and team deliver fiduciary architecture, risk management, and elite wealth structuring from the East Rand to the Western Cape.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={openLeadForm}
            className="w-full sm:w-auto bg-white text-black px-8 py-4 rounded-full text-lg font-semibold transition-all hover:scale-105 flex items-center justify-center gap-2"
          >
            Financial Health Check <ArrowRight className="w-5 h-5" />
          </button>
          <Link
            href="#lab"
            className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white border border-white/10 px-8 py-4 rounded-full text-lg font-medium transition-all flex items-center justify-center backdrop-blur-md"
          >
            Run The Numbers
          </Link>
        </div>
      </div>
    </section>
  );
}
