import Link from "next/link";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Life Insurance, Disability & Severe Illness South Africa | AS Brokers FSP 17273",
  description:
    "Death cover, permanent disability, income protection, and severe illness. Independent long-term risk advice in Krugersdorp and Gauteng—structured around income first, not product hype.",
  keywords: [
    "life insurance South Africa",
    "income protection disability",
    "severe illness cover",
    "financial adviser life cover",
    "FSP 17273",
  ],
};

export default function LifeInsurancePage() {
  return (
    <div className="bg-[#0a0a0c] min-h-screen">
      <article>
        <section className="pt-28 pb-12 px-4 sm:px-6 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-zinc-500 text-sm font-medium uppercase tracking-widest mb-3">AS Brokers · Life Insurance</p>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">Personal Life Insurance</h1>
            <p className="text-xl text-zinc-400">It&apos;s Not About Dying. It&apos;s About What Happens to Your Income.</p>
            <p className="text-zinc-500 mt-4 max-w-3xl mx-auto leading-relaxed">
              Long-term <strong className="text-zinc-400 font-medium">risk insurance</strong> (life, disability, income
              protection, severe illness) pays defined benefits when specific insured events happen—subject to policy terms,
              waiting periods, and underwriting. AS Brokers (FSP 17273) helps you align cover with{" "}
              <strong className="text-zinc-400 font-medium">debt, dependants, tax, and replacement income</strong>, then
              reviews escalation (level vs escalating premiums) so affordability lasts, not just year one.
            </p>
            <p className="trust-hallmark text-xs text-zinc-600 mt-6">FSP 17273 · Category 1.8 where unlisted wealth applies</p>
          </div>
        </section>

        <section className="py-12 px-4 sm:px-6 md:px-8 border-t border-white/5">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-white mb-4">The four pillars most portfolios need to balance</h2>
            <ul className="text-zinc-400 space-y-4 text-sm leading-relaxed">
              <li>
                <strong className="text-white">Death cover.</strong> Liquidity for executor costs, debt redemption, and
                dependants&apos; maintenance. Beneficiary nominations and trust wording should match your will—misalignment is a
                common planning failure.
              </li>
              <li>
                <strong className="text-white">Permanent disability.</strong> If you cannot earn in your own or suited
                occupation, death cover does not help—you still have living costs. Definitions and waiting periods differ by
                product; we compare wording, not marketing leaflets alone.
              </li>
              <li>
                <strong className="text-white">Temporary disability / income protection.</strong> Replaces part of income
                during recovery from illness or injury. Waiting periods, benefit periods, and “own occupation” vs “any
                occupation” definitions drive real-world outcomes.
              </li>
              <li>
                <strong className="text-white">Severe illness (dread disease).</strong> Lump sums for treatment,
                lifestyle changes, or reducing debt when a listed condition is diagnosed—subject to policy lists and
                severity criteria.
              </li>
            </ul>
          </div>
        </section>

        <section className="py-12 px-4 sm:px-6 md:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-white mb-4">Escalation, guarantees, and reviews</h2>
            <p className="text-zinc-400 text-sm leading-relaxed mb-4">
              Premiums may be <strong className="text-zinc-300">level</strong> or <strong className="text-zinc-300">escalating</strong>, and may include age-rated elements depending on product design.
              After guarantee or review windows, premiums can change—sometimes sharply. That affects whether you can keep
              cover when you are older or have new health history. We use tools such as our{" "}
              <Link href="/premium-increase-calculator" className="text-cinematic-teal hover:underline">premium comparison calculator</Link>{" "}
              so year-by-year costs are visible before you commit—not only the first debit order.
            </p>
            <p className="text-zinc-500 text-sm">
              No forecast on this site is a promise of future premiums; insurers price according to their tables and risk rules.
            </p>
          </div>
        </section>

        <section className="py-12 px-4 sm:px-6 md:px-8 border-t border-white/5">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-white mb-4">Tax and estate interaction (headline only)</h2>
            <p className="text-zinc-400 text-sm leading-relaxed mb-4">
              Life policies can have estate duty, income tax, and donations-tax dimensions depending on ownership,
              beneficiary structure, and estate liquidity. We flag where your accountant or attorney should refine
              structures; we do not provide tax or legal advice on this page.
            </p>
            <p className="text-zinc-400 text-sm leading-relaxed">
              For <strong className="text-zinc-300">liquidity at death</strong>, see also{" "}
              <Link href="/estate-duty-calculator" className="text-cinematic-teal hover:underline">estate duty calculator</Link> and{" "}
              <Link href="/solutions/estate-planning" className="text-cinematic-teal hover:underline">estate planning</Link>.
            </p>
          </div>
        </section>

        <section className="py-12 px-4 sm:px-6 md:px-8">
          <div className="max-w-4xl mx-auto rounded-2xl bg-white/[0.04] border border-white/10 p-6 md:p-8">
            <h2 className="text-lg font-bold text-white mb-3">Regulatory note</h2>
            <p className="text-zinc-500 text-xs leading-relaxed">
              Long-term insurance is governed by the Long-Term Insurance Act and insurer policy terms. Benefits are not
              guaranteed except where the contract explicitly states guarantees; medical underwriting may decline or
              load risk. This page is general information—not personal advice. AS Brokers CC, FSP 17273.{" "}
              <Link href="/regulatory-compliance" className="text-cinematic-teal hover:underline">Full disclosures</Link>.
            </p>
          </div>
        </section>

        <section className="py-12 px-4 sm:px-6 md:px-8 border-t border-white/5">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/premium-increase-calculator" prefetch={false} className="text-cinematic-teal hover:underline text-sm font-medium">
              Premium sustainability tool
            </Link>
            <Link href="/contact" prefetch={false} className="inline-flex items-center gap-2 bg-white text-black font-bold px-6 py-3 rounded-full hover:bg-zinc-200 transition-colors">
              Request a life insurance review
            </Link>
          </div>
        </section>
      </article>
      <Footer />
    </div>
  );
}
