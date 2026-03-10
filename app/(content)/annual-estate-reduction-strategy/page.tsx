import Link from "next/link";
import { Footer } from "@/components/Footer";
import { EstateReductionCalculator } from "@/components/EstateReductionCalculator";

export const metadata = {
  title: "Trust Donation Calculator | Annual Donations & Estate Planning SA | AS Brokers",
  description:
    "Use the annual donations exemption to legally reduce estate duty. Calculate how much you can eliminate over time through structured annual donations.",
};

export default function AnnualEstateReductionPage() {
  return (
    <div className="bg-[#0a0a0c] min-h-screen">
      {/* Hero */}
      <section className="pt-28 pb-12 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-zinc-500 text-sm font-medium uppercase tracking-widest mb-3">
            Phase 2: Risk Architecture · Fiduciary Liability.
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-4">
            Strategic Capital Migration Plan.
          </h1>
          <p className="text-xl text-zinc-400 leading-relaxed mb-4">
            Leverage the R100k/R200k exemption to systematically dismantle your estate tax liability and secure generational wealth.
          </p>
          <p className="text-zinc-500">
            Calculate how much estate duty you can eliminate over time through structured annual donations, and see the
            cumulative savings before it&apos;s too late to act.
          </p>
        </div>
      </section>

      {/* Teaser */}
      <section className="py-8 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap gap-6 justify-center text-sm text-zinc-400">
            <span>Annual donation strategy</span>
            <span>Cumulative duty saved</span>
            <span>Estate exposure reduction</span>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-12 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          <EstateReductionCalculator />
        </div>
      </section>

      {/* How This Calculator Fits In */}
      <section className="py-16 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            Annual Estate Reduction Strategy. How This Calculator Fits In
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            South African residents are allowed to donate up to R100,000 per person per year (or R200,000 per married
            couple) without triggering donations tax. When used consistently, this allowance becomes one of the most
            practical and reliable tools for reducing future estate duty.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-4">
            Instead of trying to restructure an estate late in life, this strategy works gradually and predictably. Each
            year, a portion of wealth is moved out of your personal estate in a compliant way. Over time, this reduces:
          </p>
          <ul className="space-y-2 text-zinc-400 mb-4">
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-0.5">→</span>
              <span>The value of your estate subject to estate duty</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-0.5">→</span>
              <span>Executor&apos;s fees</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-0.5">→</span>
              <span>The cash-flow pressure placed on heirs</span>
            </li>
          </ul>
        </div>
      </section>

      {/* How This Strategy Works in Practice – Bento card + wealth engineering */}
      <section className="py-12 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-[2rem] bg-[#151518] border border-white/10 p-6 md:p-8 lg:p-10">
            <h2 className="text-2xl font-bold text-white mb-6">How This Strategy Works in Practice</h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              In practice, these annual donations are often made to a family trust, allowing capital to leave the estate
              while remaining protected, managed, and earmarked for long-term family objectives. Moving capital to a
              trust is only step one. Deploying that capital into high-yield, unlisted alternative assets ensures the
              trust outpaces inflation and compounds wealth outside your estate.
            </p>
            <p className="text-zinc-400 leading-relaxed">
              The real power of the strategy is not the size of any single donation, but the discipline of repeating it
              year after year.
            </p>
          </div>
        </div>
      </section>

      {/* What This Calculator Demonstrates */}
      <section className="py-12 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">What This Calculator Demonstrates</h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            This calculator illustrates that effect. By entering your current age and selecting whether the strategy
            applies to an individual or a couple, you can see how small, consistent annual donations can compound into a
            meaningful reduction in estate value over time.
          </p>
          <p className="text-zinc-400 leading-relaxed">
            The figures shown are not meant to predict exact outcomes. Their purpose is to make the long-term impact
            visible and understandable, using the same framework used daily to explain estate-duty reduction strategies
            to clients in a practical, numbers-driven way.
          </p>
        </div>
      </section>

      {/* Important Context */}
      <section className="py-12 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">Important Context</h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            It&apos;s important to understand that this is not a loophole or a once-off transaction. It is a long-term
            estate structuring strategy that works best when started early, implemented correctly, and reviewed regularly
            as part of a broader estate and retirement plan.
          </p>
          <p className="text-zinc-400 leading-relaxed">
            When combined with proper trust structuring and a well-drafted will, including the deliberate use of the R3.5
            million estate-duty abatement, this approach can materially reduce estate duty and executor fees across
            generations, while keeping capital protected and controlled.
          </p>
        </div>
      </section>

      {/* Don't Wait */}
      <section className="py-16 px-4 sm:px-6 md:px-8 border-t border-white/5 bg-black/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">Don&apos;t Wait</h2>
          <p className="text-zinc-300 font-medium mb-4">
            Every Year You Don&apos;t Donate Is a Year of Savings Lost
          </p>
          <p className="text-zinc-400 leading-relaxed mb-4">
            The R100,000 annual exemption doesn&apos;t roll over. If you don&apos;t use it this year, it&apos;s gone. You
            can&apos;t catch up next year by donating R200,000; you&apos;ll trigger donations tax on the excess.
          </p>
          <p className="text-zinc-400 leading-relaxed">
            A couple starting at <span className="text-cinematic-teal font-semibold">50</span> migrating R200k/year
            protects <span className="text-cinematic-teal font-semibold">R3m</span>. Starting at{" "}
            <span className="text-cinematic-teal font-semibold">60</span> protects only{" "}
            <span className="text-cinematic-teal font-semibold">R1m</span>. Same strategy, half the result. The earlier
            you start, the more your heirs keep. The math is simple, but only if you act on it.
          </p>
        </div>
      </section>

      {/* Initiate Your Fiduciary Audit */}
      <section className="py-16 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">Initiate Your Fiduciary Audit</h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            You know the liability. You know the strategy. Now, let our wealth engineers structure your trust, route
            your donations, and secure your high-yield allocations.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 w-full bg-white text-black font-bold px-6 py-4 rounded-[2rem] hover:bg-zinc-200 transition-colors"
          >
            Book Fiduciary Consultation
          </Link>
        </div>
      </section>

      {/* Quick links */}
      <section className="py-12 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <a
              href="https://wa.me/27672429946"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              WhatsApp us · 067 242 9946
            </a>
            <Link href="/solutions" className="text-blue-400 hover:underline">
              Income in retirement
            </Link>
            <Link href="/solutions" className="text-blue-400 hover:underline">
              Insurance & risk planning
            </Link>
            <Link href="/solutions" className="text-blue-400 hover:underline">
              Estate planning
            </Link>
            <Link href="/solutions" className="text-blue-400 hover:underline">
              Business insurance
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
