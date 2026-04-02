import Link from "next/link";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Estate Planning, Wills & Trusts South Africa | AS Brokers FSP 17273 Krugersdorp",
  description:
    "Educational guide to wills, trusts, estate duty awareness, and liquidity planning. Coordinate with attorneys; independent FSP 17273 in Gauteng—no unrealistic promises.",
  keywords: [
    "estate planning South Africa",
    "wills and trusts Gauteng",
    "estate duty planning",
    "financial adviser estate liquidity",
    "FSP 17273",
  ],
};

export default function EstatePlanningPage() {
  return (
    <div className="bg-[#0a0a0c] min-h-screen">
      <article>
        <section className="pt-28 pb-12 px-4 sm:px-6 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-zinc-500 text-sm font-medium uppercase tracking-widest mb-3">AS Brokers · Legacy Structuring</p>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">Estate Planning & Trusts</h1>
            <p className="text-xl text-zinc-400">Secure Your Legacy With Clear Documents and Tax-Efficient Structures</p>
            <p className="text-zinc-500 mt-4 max-w-3xl mx-auto leading-relaxed">
              <strong className="text-zinc-400 font-medium">Estate planning</strong> is the process of aligning your will,
              beneficiaries, ownership of assets, and liquidity (cash at death) with your family&apos;s needs. In South
              Africa, <strong className="text-zinc-400 font-medium">SARS estate duty</strong>, executor fees, and outstanding
              debt must often be settled before heirs inherit. AS Brokers (FSP 17273) focuses on the{" "}
              <strong className="text-zinc-400 font-medium">financial and risk</strong> side—coordinating with your{" "}
              <strong className="text-zinc-400 font-medium">attorney</strong> who drafts binding legal instruments.
            </p>
            <p className="trust-hallmark text-xs text-zinc-600 mt-6">FSP 17273 · Krugersdorp, Gauteng</p>
          </div>
        </section>

        <section className="py-12 px-4 sm:px-6 md:px-8 border-t border-white/5">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-white mb-4">Why liquidity matters as much as a will</h2>
            <p className="text-zinc-400 text-sm leading-relaxed mb-4">
              A valid will states <em>who</em> receives what, but your estate is a separate legal entity until wound up. If
              there is insufficient cash, the executor may need to sell assets (sometimes under pressure), postpone
              distributions, or negotiate with SARS. <strong className="text-zinc-300">Life policy structuring</strong>,{" "}
              liquid investments, and loan account planning can improve cash availability—subject to policy terms and tax rules.
            </p>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Rough duty and fee estimates help families grasp scale; they are not filing positions. Use our tools as{" "}
              <strong className="text-zinc-300">awareness aids</strong>, then involve professionals for your specific facts.
            </p>
          </div>
        </section>

        <section className="py-12 px-4 sm:px-6 md:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-white mb-4">How we typically help clients prepare</h2>
            <ul className="text-zinc-400 space-y-3 text-sm leading-relaxed">
              <li>· Mapping assets and liabilities so the will matches actual ownership (especially companies and trusts).</li>
              <li>· Checking whether <strong className="text-zinc-300">beneficiary nominations</strong> on policies align with the will and trust deeds.</li>
              <li>· Discussing <strong className="text-zinc-300">trusts</strong> where minors, protection, or business continuity require them—implementation remains with legal counsel.</li>
              <li>· Introducing <strong className="text-zinc-300">donations strategy</strong> (annual exemptions) as part of long-term duty management—not once-off “schemes”.</li>
              <li>· Coordinating with <Link href="/solutions/business-life" className="text-cinematic-teal hover:underline">buy-and-sell and key-person</Link> funding so the estate is not the only source of cash.</li>
            </ul>
          </div>
        </section>

        <section className="py-12 px-4 sm:px-6 md:px-8 border-t border-white/5">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-white mb-4">Tools to stress-test the numbers</h2>
            <p className="text-zinc-400 text-sm leading-relaxed mb-4">
              Illustrations depend on assumptions you enter; they are not SARS assessments or executor guarantees.
            </p>
            <ul className="text-zinc-400 space-y-3 text-sm">
              <li>
                <Link href="/estate-duty-calculator" prefetch={false} className="text-cinematic-teal hover:underline font-medium">
                  Estate duty calculator
                </Link>
                <span className="text-zinc-500"> — high-level duty and cost awareness.</span>
              </li>
              <li>
                <Link href="/annual-estate-reduction-strategy" prefetch={false} className="text-cinematic-teal hover:underline font-medium">
                  Annual estate reduction strategy
                </Link>
                <span className="text-zinc-500"> — model recurring donations within exemption limits.</span>
              </li>
              <li>
                <Link href="/retirement" prefetch={false} className="text-cinematic-teal hover:underline font-medium">
                  Retirement capital calculator
                </Link>
                <span className="text-zinc-500"> — income sustainability angle.</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="py-12 px-4 sm:px-6 md:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-white mb-4">Common misunderstandings</h2>
            <ul className="text-zinc-400 space-y-3 text-sm leading-relaxed list-disc pl-5 marker:text-zinc-600">
              <li>“My will avoids estate duty.” A will directs assets; it does not automatically remove duty if assets remain in your estate.</li>
              <li>“Trusts are always tax-free.” Trusts have their own tax and governance rules; they must be fit for purpose and properly administered.</li>
              <li>“I’ll sort it later.” Duty exposure grows with asset values; early, consistent planning usually offers more options.</li>
            </ul>
          </div>
        </section>

        <section className="py-12 px-4 sm:px-6 md:px-8 border-t border-white/5">
          <div className="max-w-4xl mx-auto rounded-2xl bg-white/[0.04] border border-white/10 p-6 md:p-8">
            <h2 className="text-lg font-bold text-white mb-3">Legal and tax boundaries</h2>
            <p className="text-zinc-500 text-xs leading-relaxed">
              AS Brokers does not draft wills or trust deeds and does not provide legal or tax advice on this website.
              Calculators and articles are educational. Estate duty rates, abatements, and donations-tax rules change with law
              and SARS interpretation; verify current position with qualified professionals. FSP 17273.{" "}
              <Link href="/regulatory-compliance" className="text-cinematic-teal hover:underline">Disclosures</Link>.
            </p>
          </div>
        </section>

        <section className="py-12 px-4 sm:px-6 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Link href="/contact" prefetch={false} className="inline-flex items-center gap-2 bg-white text-black font-bold px-6 py-3 rounded-full hover:bg-zinc-200 transition-colors">
              Discuss estate planning with an adviser
            </Link>
          </div>
        </section>
      </article>
      <Footer />
    </div>
  );
}
