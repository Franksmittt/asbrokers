"use client";

import Link from "next/link";
import { LineChart, HeartPulse, Briefcase, Scroll, ArrowRight } from "./icons";

export function SolutionsBento() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
      {/* Retirement - 2 col, 2 row */}
      <div className="md:col-span-2 md:row-span-2 glass-card glass-card-hover bg-gradient-to-br from-[#121214] to-[#1a1a24] rounded-[2rem] p-6 sm:p-8 md:p-12 border border-white/5 relative overflow-hidden group hover:border-blue-500/30 transition-colors">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-3xl rounded-full -mr-20 -mt-20 group-hover:bg-blue-600/20 transition-all duration-700" />
        <div className="relative z-10 h-full flex flex-col justify-between">
          <div>
            <div className="bg-white/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md">
              <LineChart className="w-7 h-7 text-blue-400" />
            </div>
            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white">Retirement & Investment</h3>
            <p className="text-zinc-400 text-lg max-w-md leading-relaxed">
              Fixed-income solutions engineered for certainty. We construct portfolios designed to weather volatility and outpace inflation, ensuring your lifestyle never downgrades.
            </p>
          </div>
          <Link
            href="/solutions#retirement"
            className="flex items-center gap-2 text-blue-400 font-semibold hover:text-blue-300 w-max group-hover:gap-4 transition-all"
          >
            Explore Income Planning <ArrowRight className="w-5 h-5" />
          </Link>
          <Link href="/everest-wealth" className="flex items-center gap-2 text-zinc-400 text-sm hover:text-white mt-2 w-max">
            Everest Wealth calculators
          </Link>
        </div>
      </div>

      {/* Insurance */}
      <Link href="/solutions#insurance" className="glass-card glass-card-hover bg-[#121214] rounded-[2rem] p-6 sm:p-8 border border-white/5 flex flex-col justify-between group hover:border-white/20 transition-colors block min-h-[200px] md:min-h-0">
        <div>
          <HeartPulse className="w-8 h-8 text-red-400 mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Insurance & Risk</h3>
          <p className="text-sm text-zinc-500 leading-relaxed">
            Uncompromising personal and commercial cover. Protection for what matters most.
          </p>
        </div>
        <span className="text-blue-400 text-sm font-medium group-hover:underline">Personal, business, life</span>
      </Link>

      {/* Business */}
      <Link href="/solutions#insurance" className="bg-[#121214] rounded-[2rem] p-6 sm:p-8 border border-white/5 flex flex-col justify-between group hover:border-white/20 transition-colors block min-h-[200px] md:min-h-0">
        <div>
          <Briefcase className="w-8 h-8 text-amber-400 mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Business Structuring</h3>
          <p className="text-sm text-zinc-500 leading-relaxed">
            Buy-and-sell agreements, key person cover, and tax-efficient corporate asset protection.
          </p>
        </div>
        <span className="text-blue-400 text-sm font-medium group-hover:underline">Business insurance</span>
      </Link>

      {/* Estate */}
      <Link href="/solutions#estate" className="bg-[#121214] rounded-[2rem] p-6 sm:p-8 border border-white/5 flex flex-col justify-between group hover:border-white/20 transition-colors block min-h-[200px] md:min-h-0">
        <div>
          <Scroll className="w-8 h-8 text-teal-400 mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Fiduciary & Estate</h3>
          <p className="text-sm text-zinc-500 leading-relaxed">
            Wills, Trusts, and comprehensive generational wealth transfer strategies.
          </p>
        </div>
        <span className="text-blue-400 text-sm font-medium group-hover:underline">Estate duty calculators</span>
      </Link>

      {/* Medical - 2 col */}
      <div className="md:col-span-2 bg-gradient-to-r from-teal-900/40 to-[#121214] rounded-[2rem] p-6 sm:p-8 border border-white/5 flex flex-col justify-center group hover:border-teal-500/30 transition-colors relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-2xl font-bold text-white mb-2">Medical & Wellness Integration</h3>
          <p className="text-zinc-400 max-w-lg mb-6">
            Premium medical aid and gap cover structuring. Because true wealth requires the health to enjoy it.
          </p>
          <Link
            href="/solutions#medical"
            className="inline-flex items-center gap-2 text-white bg-white/10 px-4 py-2 rounded-full text-sm font-medium hover:bg-white/20 transition-colors w-max backdrop-blur-md"
          >
            Medical and gap cover
          </Link>
        </div>
      </div>
    </div>
  );
}
