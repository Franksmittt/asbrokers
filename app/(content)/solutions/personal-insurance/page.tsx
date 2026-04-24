import Link from "next/link";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Personal Short-Term Insurance South Africa | Home, Car & All Risk | AS Brokers FSP 17273",
  description:
    "Independent short-term insurance advice in Krugersdorp and Gauteng: home, motor, all risk, liability and travel. How cover works, what to watch for, and FAIS-aligned guidance - no empty promises.",
  keywords: [
    "short-term insurance South Africa",
    "home insurance Gauteng",
    "car insurance broker",
    "independent insurance adviser",
    "FSP 17273",
    "personal lines insurance",
  ],
};

export default function PersonalInsurancePage() {
  return (
    <div className="bg-[#0a0a0c] min-h-screen">
      <article>
        <section className="pt-28 pb-12 px-4 sm:px-6 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-zinc-500 text-sm font-medium uppercase tracking-widest mb-3">AS Brokers · Short-Term Insurance</p>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">Personal Short-Term Insurance</h1>
            <p className="text-xl text-zinc-400">When You Need Protection That Actually Protects</p>
            <p className="text-zinc-500 mt-4 max-w-3xl mx-auto leading-relaxed">
              Short-term insurance (non-life) protects things you own and liabilities you might incur - your home, vehicles,
              portable valuables, and legal liability. As an{" "}
              <strong className="text-zinc-400 font-medium">independent authorised financial services provider (FSP 17273)</strong>, AS
              Brokers helps you structure cover against real risks, with claims and wording in mind - not only the lowest
              headline premium.
            </p>
            <p className="trust-hallmark text-xs text-zinc-600 mt-6">FSP 17273 · Krugersdorp, Gauteng</p>
          </div>
        </section>

        <section className="py-12 px-4 sm:px-6 md:px-8 border-t border-white/5">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-white mb-4">What personal short-term insurance is (and is not)</h2>
            <p className="text-zinc-400 text-sm leading-relaxed mb-4">
              In South Africa, short-term insurance is regulated under the{" "}
              <strong className="text-zinc-300">Short-Term Insurance Act</strong> and overseen by the{" "}
              <strong className="text-zinc-300">FSCA</strong>. Policies transfer specified financial risks to an insurer in
              exchange for premium. Pay-outs depend on the <strong className="text-zinc-300">policy wording</strong>, events
              that occur, and compliance with conditions - there is no investment return “guarantee” in the way you might see
              with certain long-term products.
            </p>
            <p className="text-zinc-400 text-sm leading-relaxed">
              A good broker helps you align <strong className="text-zinc-300">sums insured</strong>,{" "}
              <strong className="text-zinc-300">excesses</strong>, and <strong className="text-zinc-300">extensions</strong>{" "}
              (e.g. car hire, watercraft, all-risk specified items) with how you actually live - so that at claim time the
              contract does what you expected.
            </p>
          </div>
        </section>

        <section className="py-12 px-4 sm:px-6 md:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-white mb-4">Cover types we typically structure</h2>
            <ul className="text-zinc-400 space-y-3 text-sm leading-relaxed">
              <li>· <strong className="text-zinc-200">Home:</strong> buildings, contents, geysers, accidental damage - reviewed against rebuilding and replacement values.</li>
              <li>· <strong className="text-zinc-200">Motor:</strong> private or business use; comprehensive vs limited cover; tracking and security conditions where relevant.</li>
              <li>· <strong className="text-zinc-200">Portable valuables:</strong> all-risk for jewellery, electronics, tools - often where underinsurance shows up first.</li>
              <li>· <strong className="text-zinc-200">Watercraft & leisure:</strong> tailored extensions where standard policies stop.</li>
              <li>· <strong className="text-zinc-200">Personal liability:</strong> legal liability to third parties - limits and exclusions differ by insurer.</li>
              <li>· <strong className="text-zinc-200">Travel:</strong> medical emergencies, cancellation, baggage - wording and territorial limits matter.</li>
            </ul>
            <p className="text-zinc-500 text-sm mt-6">
              Exact benefits depend on the insurer’s policy schedule. We do not promise specific claim outcomes; we work
              to reduce gaps before a loss happens.
            </p>
          </div>
        </section>

        <section className="py-12 px-4 sm:px-6 md:px-8 border-t border-white/5">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-white mb-4">Why sums insured and average matter</h2>
            <p className="text-zinc-400 text-sm leading-relaxed mb-4">
              Many disputes arise from <strong className="text-zinc-300">underinsurance</strong> and average (co-insurance)
              clauses: if you insure a building or contents for less than the cost to reinstate, the insurer may reduce a
              claim proportionally. Regular reviews - especially after renovations, new purchases, or load-shedding-related
              losses - help keep values credible.
            </p>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Motor vehicles need attention too: agreed value vs market value, finance/lease requirements, and use of the
              vehicle (personal vs business) must match the schedule.
            </p>
          </div>
        </section>

        <section className="py-12 px-4 sm:px-6 md:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-white mb-4">Claims and ongoing service</h2>
            <p className="text-zinc-400 text-sm leading-relaxed mb-4">
              Short-term insurance is judged at <strong className="text-zinc-300">claim time</strong>. AS Brokers focuses on
              structured cover upfront and support when you need to claim - documentation, timelines, and liaison with
              insurers. Every claim is assessed by the insurer against policy terms; we do not control their final decision.
            </p>
            <p className="text-zinc-500 text-sm">
              Combined experience across commercial and personal lines means we see patterns that generic call-centre
              scripts often miss.
            </p>
          </div>
        </section>

        <section className="py-12 px-4 sm:px-6 md:px-8 border-t border-white/5">
          <div className="max-w-4xl mx-auto rounded-2xl bg-white/[0.04] border border-white/10 p-6 md:p-8">
            <h2 className="text-lg font-bold text-white mb-3">Regulatory note</h2>
            <p className="text-zinc-500 text-xs leading-relaxed">
              This page is for general information only, not personalised financial advice. Product terms, premiums, and
              underwriting decisions are determined by insurers. AS Brokers CC is an authorised financial services
              provider (FSP 17273). For tailored recommendations, book a consultation. See our{" "}
              <Link href="/regulatory-compliance" className="text-cinematic-teal hover:underline">
                regulatory disclosure
              </Link>
              .
            </p>
          </div>
        </section>

        <section className="py-12 px-4 sm:px-6 md:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-white mb-4">Related planning</h2>
            <ul className="text-sm text-zinc-400 space-y-2">
              <li>
                <Link href="/solutions/business-insurance" className="text-cinematic-teal hover:underline">Commercial short-term insurance</Link>{" "}
                if you also carry business assets or turnover through a company.
              </li>
              <li>
                <Link href="/solutions/life-insurance" className="text-cinematic-teal hover:underline">Personal life and disability cover</Link>{" "}
                for income and debt risks short-term insurance does not address.
              </li>
              <li>
                <Link href="/calculators" className="text-cinematic-teal hover:underline">Calculators hub</Link> for retirement and estate context.
              </li>
            </ul>
          </div>
        </section>

        <section className="py-12 px-4 sm:px-6 md:px-8 border-t border-white/5">
          <div className="max-w-4xl mx-auto text-center">
            <Link href="/contact" prefetch={false} className="inline-flex items-center gap-2 bg-white text-black font-bold px-6 py-3 rounded-full hover:bg-zinc-200 transition-colors">
              Get your personal insurance reviewed
            </Link>
          </div>
        </section>
      </article>
      <Footer />
    </div>
  );
}
