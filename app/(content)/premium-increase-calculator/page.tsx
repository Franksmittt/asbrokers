import Link from "next/link";
import { Footer } from "@/components/Footer";
import { PremiumComparisonCalculator } from "@/components/PremiumComparisonCalculator";

export const metadata = {
  title: "Life Insurance Premium Sustainability & Escalation Tool | AS Brokers FSP 17273",
  description:
    "Compare year-by-year life policy premiums you enter yourself. Model long-term affordability, escalation, and level vs increasing structures - education only, not a quote or product recommendation.",
  keywords: [
    "life insurance premium increase",
    "escalating vs level premiums South Africa",
    "premium sustainability calculator",
    "long-term life cover cost",
    "FSP 17273",
  ],
};

export default function PremiumIncreaseCalculatorPage() {
  return (
    <div className="bg-[#0a0a0c] min-h-screen">
      {/* Hero */}
      <section className="pt-28 pb-12 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-zinc-500 text-sm font-medium uppercase tracking-widest mb-3">
            Phase 2: Risk Architecture · Uncapped Liability.
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-4">
            The Premium Liability Test.
          </h1>
          <p className="text-xl text-zinc-400 leading-relaxed">
            The cheapest policy today is often mathematically engineered to become entirely unaffordable at exactly the age you need it most. Project your actual long-term liability.
          </p>
        </div>
      </section>

      {/* Intro context */}
      <section className="py-10 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-white mb-4 text-center md:text-left">Premium sustainability - not only today’s debit order</h2>
          <p className="text-zinc-400 text-sm leading-relaxed mb-4">
            Long-term <strong className="text-zinc-300">risk insurance</strong> premiums can rise because of scheduled
            escalation, age-based rating, benefit reviews, or changes in insurer pricing assumptions. The starting premium is
            a poor proxy for total lifetime cost. This tool lets you <strong className="text-zinc-300">type in the actual
            premiums</strong> shown on schedules or quotes year by year - so you see the rand trajectory, not marketing
            percentages alone.
          </p>
          <ul className="text-zinc-500 text-sm space-y-2 list-disc pl-5 marker:text-zinc-600">
            <li>Educational; does not calculate premiums for you or recommend switching products.</li>
            <li>Assumes the figures you enter are accurate; verify against your insurer documentation.</li>
            <li>Outcomes depend on future insurer behaviour - illustrations are not guarantees.</li>
          </ul>
        </div>
      </section>

      {/* Calculator – massive Bento card */}
      <section className="py-12 px-4 sm:px-6 md:px-8">
        <div className="max-w-6xl mx-auto rounded-[2rem] border border-white/10 overflow-hidden">
          <PremiumComparisonCalculator />
        </div>
      </section>

      {/* 3-column Bento: The Illusion, The Trap, The Fiduciary Alternative */}
      <section className="py-16 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-[2rem] bg-[#151518] border border-white/10 p-6 md:p-8">
              <h2 className="text-xl font-bold text-white mb-4">The Illusion</h2>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Age-rated premiums and exponential compounding are rarely shown in year one. A low starting premium masks the true cost. Over 10–20 years, scheduled escalation plus age-rating can double or triple your premium, making the &quot;cheapest&quot; policy the most expensive to hold.
              </p>
            </div>
            <div className="rounded-[2rem] bg-[#151518] border border-white/10 p-6 md:p-8">
              <h2 className="text-xl font-bold text-white mb-4">The Trap</h2>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Guarantee periods typically expire after 10–15 years. At that point premiums can jump sharply at review. By then you are older, may have developed conditions, and cancelling or replacing cover is costly or impossible. The liability compounds exactly when you are least able to restructure.
              </p>
            </div>
            <div className="rounded-[2rem] bg-[#151518] border border-white/10 p-6 md:p-8">
              <h2 className="text-xl font-bold text-white mb-4">The Fiduciary Alternative</h2>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Purpose-Built Risk Architecture: level premiums or behaviour-linked models designed for long-term sustainability. Not all policies are engineered to spike. Let our fiduciaries restructure your cover so it remains affordable when you need it most.
              </p>
            </div>
          </div>
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

      {/* CTA – Squircle with glowing border */}
      <section className="py-16 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-[2rem] bg-[#151518] border border-blue-500/20 shadow-[0_0_40px_rgba(59,130,246,0.12)] p-8 md:p-10 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Stop Funding Structural Liabilities.</h2>
            <p className="text-zinc-400 leading-relaxed mb-8">
              If your projection shows an unsustainable premium spike, your risk architecture is fundamentally flawed. Let our fiduciaries restructure your cover before the liability compounds.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-white text-black font-bold px-6 py-4 rounded-[2rem] hover:bg-zinc-200 transition-colors"
            >
              Initiate Fiduciary Risk Audit →
            </Link>
          </div>
        </div>
      </section>

      {/* Regulatory / limitations */}
      <section className="py-12 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto rounded-2xl bg-white/[0.04] border border-white/10 p-6 md:p-8">
          <h2 className="text-lg font-bold text-white mb-3">Regulatory note</h2>
          <p className="text-zinc-500 text-xs leading-relaxed mb-3">
            AS Brokers CC is an authorised financial services provider (FSP 17273). This calculator is a transparency aid; it
            is not a personalised quote, suitability analysis, or replacement advice. Replacing or cancelling cover can have
            underwriting consequences; discuss changes with a qualified adviser. References to product philosophies or insurers on
            this page describe market mechanics generally - not an endorsement or criticism of any brand.
          </p>
          <p className="text-zinc-500 text-xs leading-relaxed">
            <Link href="/regulatory-compliance" className="text-cinematic-teal hover:underline">FAIS disclosure &amp; complaints</Link>
            {" · "}
            <Link href="/solutions/life-insurance" className="text-cinematic-teal hover:underline">Personal life insurance</Link>
          </p>
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
