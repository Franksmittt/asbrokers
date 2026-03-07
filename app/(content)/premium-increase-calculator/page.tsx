import Link from "next/link";
import { Footer } from "@/components/Footer";
import { PremiumComparisonCalculator } from "@/components/PremiumComparisonCalculator";

export const metadata = {
  title: "Premium Increase Problem Calculator | Life Insurance Premium Escalation | AS Brokers",
  description:
    "Expose the long-term cost of escalating life insurance premiums. Compare policies year by year and see why the cheapest today can become the most expensive to keep.",
};

export default function PremiumIncreaseCalculatorPage() {
  return (
    <div className="bg-[#0a0a0c] min-h-screen">
      {/* Hero */}
      <section className="pt-28 pb-12 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-zinc-500 text-sm font-medium uppercase tracking-widest mb-3">
            AS Brokers · Life Insurance
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-4">
            The Premium Increase Problem
          </h1>
          <p className="text-xl text-zinc-400 leading-relaxed mb-4">
            Your life insurance premium looks affordable today. But what will it cost you in 10, 15, or 20 years?
          </p>
          <p className="text-zinc-500">
            This calculator exposes the long-term cost of escalating premiums, and shows why the cheapest policy today
            often becomes the most expensive one to keep.
          </p>
        </div>
      </section>

      {/* Teaser */}
      <section className="py-8 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-lg font-bold text-white mb-4">Solving the Increase Problem</h2>
          <p className="text-zinc-400">Compare increases</p>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-12 px-4 sm:px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          <PremiumComparisonCalculator />
        </div>
      </section>

      {/* The Premium Increase Problem - Why cheapest can become most expensive */}
      <section className="py-16 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            The Premium Increase Problem
          </h2>
          <p className="text-zinc-300 font-medium mb-4">
            Why the cheapest premium today can become the most expensive mistake later
          </p>
          <p className="text-zinc-400 leading-relaxed mb-4">
            Most people buy life insurance based on one number: the starting premium. What is often not properly
            understood, or clearly shown, is how that premium changes over time.
          </p>
          <p className="text-zinc-400 leading-relaxed">
            This calculator is designed to expose a common and costly issue in the South African insurance market: premium
            increases that accelerate faster than clients expect, eventually making policies unaffordable.
          </p>
        </div>
      </section>

      {/* What Usually Goes Wrong */}
      <section className="py-12 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">What Usually Goes Wrong</h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            In many cases, clients are sold on a low starting premium with reassurance that:
          </p>
          <ul className="space-y-2 text-zinc-400 mb-4">
            <li className="flex items-start gap-2">
              <span className="text-blue-400">→</span>
              <span>&quot;The increase is only 5% per year&quot;</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">→</span>
              <span>&quot;Premiums are guaranteed for a period&quot;</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">→</span>
              <span>&quot;This is standard industry practice&quot;</span>
            </li>
          </ul>
          <p className="text-zinc-400 leading-relaxed mb-4">What is not always made clear:</p>
          <ul className="space-y-2 text-zinc-400">
            {[
              "Premium increases may combine scheduled escalation and age-rating",
              "The actual annual increase can be far higher than the quoted percentage",
              "Guarantee periods typically expire after 10–15 years",
              "Premiums can then jump sharply at review points",
              "Clients only discover the problem years later, when cancelling is no longer easy",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-red-400">✗</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-zinc-400 leading-relaxed mt-4">
            This is how many policies become unsustainable just when cover is needed most.
          </p>
        </div>
      </section>

      {/* Why This Calculator Is Different */}
      <section className="py-12 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">Why This Calculator Is Different</h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            This calculator does not estimate premiums. It requires you to manually enter the actual premiums shown on
            your policy or quote document for each year. That is deliberate.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-4">By doing this, the calculator allows you to:</p>
          <ul className="space-y-2 text-zinc-400">
            {[
              "See the real rand cost of premium increases over time",
              "Compare insurers year by year, not by headline percentages",
              "Identify when premiums begin to accelerate",
              "Understand the total cost of cover, not just the starting price",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-blue-400">→</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-zinc-400 leading-relaxed mt-4">
            This turns abstract escalation percentages into real numbers you can plan around.
          </p>
        </div>
      </section>

      {/* Behaviour-Linked and Structured Premium Products */}
      <section className="py-12 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">
            A Note on Behaviour-Linked and Structured Premium Products
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            Not all escalating premiums are bad. Some products, particularly behaviour-linked structures, can work very
            well for the right client:
          </p>
          <ul className="space-y-2 text-zinc-400 mb-4">
            {[
              "High-income earners",
              "Clients with strong wellness participation",
              "Clients actively engaged with their bank or medical aid benefits",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-blue-400">→</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-zinc-400 leading-relaxed">
            When used correctly, these structures can deliver excellent long-term value. The problem arises when they are
            used for the wrong client, or when the long-term premium behaviour is not properly understood upfront. This
            calculator is about fit and sustainability, not criticism of specific insurers or models.
          </p>
        </div>
      </section>

      {/* Why BrightRock Is Often Used as a Comparison */}
      <section className="py-12 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">Why BrightRock Is Often Used as a Comparison</h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            BrightRock is frequently referenced in premium discussions because its approach focuses on:
          </p>
          <ul className="space-y-2 text-zinc-400 mb-4">
            {[
              "Showing actual future premium amounts, not only percentages",
              "Allowing advisers and clients to see what will be paid each year",
              "Making premium patterns more predictable and transparent",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-blue-400">→</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-zinc-400 leading-relaxed">
            By contrast, many traditional products describe escalation patterns in percentages, while the actual premiums
            paid may diverge significantly over time due to age-rating and review events. This calculator helps make
            those differences visible.
          </p>
        </div>
      </section>

      {/* How to Use This Calculator Properly */}
      <section className="py-12 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">How to Use This Calculator Properly</h2>
          <p className="text-zinc-400 leading-relaxed mb-4">Enter:</p>
          <ol className="list-decimal list-inside text-zinc-400 space-y-2 mb-4">
            <li>Take your policy schedule or quotation</li>
            <li>Enter the actual monthly premium for each year exactly as shown</li>
            <li>Compare different products side-by-side</li>
          </ol>
          <p className="text-zinc-400 leading-relaxed mb-4">Review:</p>
          <ul className="space-y-2 text-zinc-400 mb-4">
            <li className="flex items-start gap-2">
              <span className="text-blue-400">→</span>
              <span>Year-by-year increases</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">→</span>
              <span>Long-term affordability</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">→</span>
              <span>Total premiums paid over time</span>
            </li>
          </ul>
          <p className="text-zinc-400 leading-relaxed">
            The goal is not to chase the lowest premium; it is to avoid unpleasant surprises later.
          </p>
        </div>
      </section>

      {/* Who This Calculator Is Ideal For */}
      <section className="py-12 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">Who This Calculator Is Ideal For</h2>
          <p className="text-zinc-400 leading-relaxed mb-4">This tool is especially useful for:</p>
          <ul className="space-y-2 text-zinc-400">
            {[
              "Clients reviewing existing life insurance policies",
              "Anyone considering replacing or upgrading cover",
              "High-income earners comparing premium structures",
              "Business owners with long-term cover needs",
              "Advisers and clients who want transparency before committing",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-blue-400">→</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* The Real Question */}
      <section className="py-12 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">The Real Question This Calculator Answers</h2>
          <p className="text-zinc-300 font-medium text-lg mb-4">
            &quot;Can I still afford this policy in 10, 15, or 20 years not just today?&quot;
          </p>
          <p className="text-zinc-400 leading-relaxed">That question matters more than the starting premium.</p>
        </div>
      </section>

      {/* Take the Next Step */}
      <section className="py-16 px-4 sm:px-6 md:px-8 border-t border-white/5 bg-black/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-6">Take the Next Step</h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            If you&apos;d like help interpreting the results, or understanding whether your current policy structure is
            sustainable, we can review it with you.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-8">
            Let us help you choose cover that still works when you need it most.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-black font-bold px-6 py-3 rounded-full hover:bg-zinc-200 transition-colors"
          >
            Request a policy review below
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
              Contact us on WhatsApp · 067 242 9946
            </a>
            <Link href="/" className="text-zinc-400 hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/retirement" className="text-zinc-400 hover:text-white transition-colors">
              Retirement income
            </Link>
            <Link href="/solutions" className="text-zinc-400 hover:text-white transition-colors">
              Insurance & risk planning
            </Link>
            <Link href="/solutions" className="text-zinc-400 hover:text-white transition-colors">
              Business risk management
            </Link>
            <Link href="/solutions" className="text-zinc-400 hover:text-white transition-colors">
              Estate planning
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
