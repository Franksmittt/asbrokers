import Link from "next/link";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Business Life Insurance | Buy-and-Sell, Key Person & Surety | AS Brokers FSP 17273",
  description:
    "Buy-and-sell agreements, key-person cover, loan account insurance, and contingent liability for South African companies - technical structuring with independent FSP 17273.",
  keywords: [
    "buy and sell agreement insurance",
    "key person insurance South Africa",
    "business assurance",
    "directors surety insurance",
    "FSP 17273",
  ],
};

export default function BusinessLifePage() {
  return (
    <div className="bg-[#0a0a0c] min-h-screen">
      <article>
        <section className="pt-28 pb-12 px-4 sm:px-6 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-zinc-500 text-sm font-medium uppercase tracking-widest mb-3">AS Brokers · Business Assurance</p>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">Business Life Insurance & Employee Benefits</h1>
            <p className="text-xl text-zinc-400">Protecting Your Partners, Directors, and Key Employees</p>
            <p className="text-zinc-500 mt-4 max-w-3xl mx-auto leading-relaxed">
              When a shareholder or director dies, the company, family, and creditors can all pull in different directions.
              <strong className="text-zinc-400 font-medium"> Business risk insurance</strong> (buy-and-sell, key person,
              contingent liability, credit loan / loan account cover) provides liquidity to execute a prior agreement or stabilise
              cash flow - <em>if</em> policies, beneficiaries, and valuations match the legal structure. AS Brokers specialises in
              this sequence: <strong className="text-zinc-400 font-medium">contract first, insurance funds the agreement</strong>.
            </p>
            <p className="trust-hallmark text-xs text-zinc-600 mt-6">FSP 17273 · Legal and valuation partners where required</p>
          </div>
        </section>

        <section className="py-12 px-4 sm:px-6 md:px-8 border-t border-white/5">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-white mb-4">Core structures we work on</h2>
            <ul className="text-zinc-400 space-y-4 text-sm leading-relaxed">
              <li>
                <strong className="text-white">Buy-and-sell (or similar shareholder protection).</strong> A binding agreement
                sets how shares are priced and transferred; policies fund the purchase so survivors keep control and estates
                receive cash. Poor valuation clauses and outdated ownership details cause failures - we stress-test these with your attorney.
              </li>
              <li>
                <strong className="text-white">Key person insurance.</strong> Pays the company if a person critical to revenue
                or operations dies or becomes disabled (per definitions). Sum insured should reflect recruitment cost, lost margin,
                and contractual exposures - not an arbitrary round number.
              </li>
              <li>
                <strong className="text-white">Contingent liability / surety-related cover.</strong> Where directors signed
                personal sureties, death can trigger lender calls. Specific contingent products may apply - underwriting and
                bank coordination matter.
              </li>
              <li>
                <strong className="text-white">Loan account and credit protection.</strong> Debit loan accounts on a
                shareholder&apos;s death can strain both company and family. Insurance and agreement design should reflect who
                owes whom and how debt will be settled.
              </li>
            </ul>
            <p className="text-zinc-500 text-sm mt-6">
              Employee group risk and pension arrangements are quoted per scheme rules; scope varies by headcount and insurer.
            </p>
          </div>
        </section>

        <section className="py-12 px-4 sm:px-6 md:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-white mb-4">Who should prioritise this conversation</h2>
            <p className="text-zinc-400 text-sm leading-relaxed mb-4">
              Founders with multiple shareholders, any board member with <strong className="text-zinc-300">personal surety</strong>,
              businesses with large intangible value tied to individuals, and companies with sizeable intercompany loans.
              If your balance sheet or shareholders&apos; agreement changed since policies were taken, a review is overdue.
            </p>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Pair with <Link href="/solutions/business-insurance" className="text-cinematic-teal hover:underline">commercial short-term cover</Link>{" "}
              so operational and ownership risks do not duplicate or leave voids.
            </p>
          </div>
        </section>

        <section className="py-12 px-4 sm:px-6 md:px-8 border-t border-white/5">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-white mb-4">Compliance and realism</h2>
            <p className="text-zinc-400 text-sm leading-relaxed mb-4">
              We do not promise that cover will pay in every scenario - claims depend on event definitions, disclosure, and policy
              maintenance. Premiums follow underwriting and may be revised. Where valuations are material, we expect independent
              professionals to sign off figures used in agreements.
            </p>
          </div>
        </section>

        <section className="py-12 px-4 sm:px-6 md:px-8">
          <div className="max-w-4xl mx-auto rounded-2xl bg-white/[0.04] border border-white/10 p-6 md:p-8">
            <h2 className="text-lg font-bold text-white mb-3">Regulatory note</h2>
            <p className="text-zinc-500 text-xs leading-relaxed">
              This material is general; implementation requires legal agreements you sign with counsel. AS Brokers CC is FSP
              17273. Long-term insurance is subject to Policyholder Protection Rules and insurer-specific terms.{" "}
              <Link href="/regulatory-compliance" className="text-cinematic-teal hover:underline">Read disclosures</Link>.
            </p>
          </div>
        </section>

        <section className="py-12 px-4 sm:px-6 md:px-8 border-t border-white/5">
          <div className="max-w-4xl mx-auto text-center">
            <Link href="/contact" prefetch={false} className="inline-flex items-center gap-2 bg-white text-black font-bold px-6 py-3 rounded-full hover:bg-zinc-200 transition-colors">
              Review your business assurance and contracts
            </Link>
          </div>
        </section>
      </article>
      <Footer />
    </div>
  );
}
