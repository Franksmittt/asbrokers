import Link from "next/link";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Business Short-Term Insurance | Commercial, Liability & BI | AS Brokers FSP 17273",
  description:
    "Commercial property, business interruption, liability, fleet and industry risks for South African businesses. Independent broker in Krugersdorp and Gauteng - education-led, FAIS-aligned.",
  keywords: [
    "business insurance South Africa",
    "commercial short-term insurance",
    "public liability cover",
    "business interruption insurance",
    "SME insurance broker Gauteng",
  ],
};

export default function BusinessInsurancePage() {
  return (
    <div className="bg-[#0a0a0c] min-h-screen">
      <article>
        <section className="pt-28 pb-12 px-4 sm:px-6 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-zinc-500 text-sm font-medium uppercase tracking-widest mb-3">AS Brokers · Business Insurance</p>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">Business Short-Term Insurance</h1>
            <p className="text-xl text-zinc-400">Protecting the Businesses That Create South Africa&apos;s Wealth</p>
            <p className="text-zinc-500 mt-4 max-w-3xl mx-auto leading-relaxed">
              From stock and machinery to <strong className="text-zinc-400 font-medium">public liability</strong>,{" "}
              <strong className="text-zinc-400 font-medium">employers&apos; liability</strong>, and{" "}
              <strong className="text-zinc-400 font-medium">business interruption</strong>, commercial short-term cover is
              how operating companies survive fires, thefts, liability claims, and supply shocks. AS Brokers (FSP 17273)
              structures programmes around how your <em>actual</em> business earns and loses money - not generic templates.
            </p>
            <p className="trust-hallmark text-xs text-zinc-600 mt-6">FSP 17273 · Independent advice</p>
          </div>
        </section>

        <section className="py-12 px-4 sm:px-6 md:px-8 border-t border-white/5">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-white mb-4">How commercial short-term cover fits together</h2>
            <p className="text-zinc-400 text-sm leading-relaxed mb-4">
              Policies are contracts: they list insured events, exclusions, sub-limits, and conditions.{" "}
              <strong className="text-zinc-300">Material facts</strong> must be disclosed to insurers before inception and at
              renewal; non-disclosure can void cover or reduce claims. We help you document turnover, processes, security,
              and occupancy so underwriting matches reality.
            </p>
            <p className="text-zinc-400 text-sm leading-relaxed">
              <strong className="text-zinc-300">Business interruption (BI)</strong> typically needs a clear link to
              material damage and defined indemnity periods; getting the gross profit or revenue definition wrong is a
              common source of disappointment at claim stage. We spend time on that link, not only on the fire section.
            </p>
          </div>
        </section>

        <section className="py-12 px-4 sm:px-6 md:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-white mb-4">What we typically arrange</h2>
            <ul className="text-zinc-400 space-y-3 text-sm leading-relaxed">
              <li>· Buildings, plant, machinery, and electronic equipment</li>
              <li>· Stock (including seasonal peaks and transit where needed)</li>
              <li>· Business interruption and increased cost of working</li>
              <li>· Public liability, products liability, and professional indemnity where the trade requires it</li>
              <li>· Employers&apos; liability / compensation exposure (per scheme rules and products available)</li>
              <li>· Money, fidelity, and crime-type extensions where relevant</li>
              <li>· Goods in transit, own damage, and fleet programmes</li>
              <li>· Contract works, plant hire, and industry-specific extensions</li>
              <li>· Cyber and electronic risks (scope and exclusions vary widely - we match you to wording you can explain to your board)</li>
            </ul>
            <p className="text-zinc-500 text-sm mt-6">
              Availability depends on insurer and occupation class. We do not guarantee acceptance or premium.
            </p>
          </div>
        </section>

        <section className="py-12 px-4 sm:px-6 md:px-8 border-t border-white/5">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-white mb-4">Risk first, insurance second</h2>
            <p className="text-zinc-400 text-sm leading-relaxed mb-4">
              We start with a simple question set: What stops revenue? What capex would you need to replace in 90 days?
              Which contracts or regulators impose insurance obligations? That frames priorities before comparing quotes. A
              large share of our practice sits in <strong className="text-zinc-300">business short-term</strong> - we treat it as core engineering, not a side product.
            </p>
            <p className="text-zinc-400 text-sm leading-relaxed">
              For owner-managed businesses, we often coordinate with{" "}
              <Link href="/solutions/business-life" className="text-cinematic-teal hover:underline">business life</Link>{" "}
              structures (key person, buy-and-sell, surety) so personal and balance-sheet risks do not contradict each other.
            </p>
          </div>
        </section>

        <section className="py-12 px-4 sm:px-6 md:px-8">
          <div className="max-w-4xl mx-auto rounded-2xl bg-white/[0.04] border border-white/10 p-6 md:p-8">
            <h2 className="text-lg font-bold text-white mb-3">Regulatory note</h2>
            <p className="text-zinc-500 text-xs leading-relaxed">
              Information on this page is educational and not a substitute for advice tailored to your business. Premiums,
              deductibles, and claim outcomes depend on insurer terms and the facts of each loss. AS Brokers CC (FSP 17273)
              acts as intermediary where products are placed with licensed insurers. See{" "}
              <Link href="/regulatory-compliance" className="text-cinematic-teal hover:underline">FAIS disclosure</Link>.
            </p>
          </div>
        </section>

        <section className="py-12 px-4 sm:px-6 md:px-8 border-t border-white/5">
          <div className="max-w-4xl mx-auto text-center">
            <Link href="/contact" prefetch={false} className="inline-flex items-center gap-2 bg-white text-black font-bold px-6 py-3 rounded-full hover:bg-zinc-200 transition-colors">
              Review your business risk structure
            </Link>
          </div>
        </section>
      </article>
      <Footer />
    </div>
  );
}
