import Link from "next/link";
import { RelatedContent } from "@/components/seo/RelatedContent";
import {
  WarmPageWithFooter,
  WarmPrimaryLink,
  WarmProse,
  WarmSection,
  WarmSimpleHero,
} from "@/components/warm/WarmShell";
import { getRelatedLinks } from "@/lib/related-content";
import { buildPageMetadata } from "@/lib/seo-metadata";
import { WARM_BODY, WARM_CARD, WARM_H3, WARM_LINK, WARM_META } from "@/lib/warm-theme";

export const metadata = buildPageMetadata({
  path: "/solutions/business-life",
  title: "Business Life Insurance | Buy-and-Sell, Key Person & Surety",
  description:
    "Buy-and-sell agreements, key-person cover, loan account insurance, and contingent liability for South African companies. Technical structuring with FSP 17273.",
  keywords: [
    "buy and sell agreement insurance",
    "key person insurance South Africa",
    "business assurance",
    "directors surety insurance",
    "FSP 17273",
  ],
});

export default function BusinessLifePage() {
  return (
    <WarmPageWithFooter>
      <article>
        <WarmSimpleHero
          kicker="AS Brokers · Business Assurance"
          title="Business Life Insurance & Employee Benefits"
          description="Protecting Your Partners, Directors, and Key Employees"
          centered
        >
          <p className={`mx-auto mt-4 max-w-3xl ${WARM_BODY}`}>
            When a shareholder or director dies, the company, family, and creditors can all pull in different directions.
            <strong className="font-medium text-shark"> Business risk insurance</strong> (buy-and-sell, key person,
            contingent liability, credit loan / loan account cover) provides liquidity to execute a prior agreement or stabilise
            cash flow - <em>if</em> policies, beneficiaries, and valuations match the legal structure. AS Brokers specialises in
            this sequence: <strong className="font-medium text-shark">contract first, insurance funds the agreement</strong>.
          </p>
          <p className={`trust-hallmark mt-6 ${WARM_META}`}>FSP 17273 · Legal and valuation partners where required</p>
        </WarmSimpleHero>

        <WarmSection alt narrow>
          <h2 className={`mb-4 ${WARM_H3}`}>Core structures we work on</h2>
          <ul className={`space-y-4 ${WARM_BODY}`}>
            <li>
              <strong className="text-shark">Buy-and-sell (or similar shareholder protection).</strong> A binding agreement
              sets how shares are priced and transferred; policies fund the purchase so survivors keep control and estates
              receive cash. Poor valuation clauses and outdated ownership details cause failures - we stress-test these with your attorney.
            </li>
            <li>
              <strong className="text-shark">Key person insurance.</strong> Pays the company if a person critical to revenue
              or operations dies or becomes disabled (per definitions). Sum insured should reflect recruitment cost, lost margin,
              and contractual exposures - not an arbitrary round number.
            </li>
            <li>
              <strong className="text-shark">Contingent liability / surety-related cover.</strong> Where directors signed
              personal sureties, death can trigger lender calls. Specific contingent products may apply - underwriting and
              bank coordination matter.
            </li>
            <li>
              <strong className="text-shark">Loan account and credit protection.</strong> Debit loan accounts on a
              shareholder&apos;s death can strain both company and family. Insurance and agreement design should reflect who
              owes whom and how debt will be settled.
            </li>
          </ul>
          <p className={`mt-6 text-sm ${WARM_META}`}>
            Employee group risk and pension arrangements are quoted per scheme rules; scope varies by headcount and insurer.
          </p>
        </WarmSection>

        <WarmSection narrow>
          <h2 className={`mb-4 ${WARM_H3}`}>Who should prioritise this conversation</h2>
          <WarmProse>
            <p>
              Founders with multiple shareholders, any board member with <strong className="text-shark">personal surety</strong>,
              businesses with large intangible value tied to individuals, and companies with sizeable intercompany loans.
              If your balance sheet or shareholders&apos; agreement changed since policies were taken, a review is overdue.
            </p>
            <p>
              Pair with <Link href="/solutions/business-insurance" className={WARM_LINK}>commercial short-term cover</Link>{" "}
              so operational and ownership risks do not duplicate or leave voids.
            </p>
          </WarmProse>
        </WarmSection>

        <WarmSection alt narrow>
          <h2 className={`mb-4 ${WARM_H3}`}>Compliance and realism</h2>
          <WarmProse>
            <p>
              We do not promise that cover will pay in every scenario - claims depend on event definitions, disclosure, and policy
              maintenance. Premiums follow underwriting and may be revised. Where valuations are material, we expect independent
              professionals to sign off figures used in agreements.
            </p>
          </WarmProse>
        </WarmSection>

        <WarmSection narrow>
          <div className={WARM_CARD}>
            <h2 className="mb-3 text-lg font-bold text-shark">Regulatory note</h2>
            <p className={`text-xs leading-relaxed ${WARM_META}`}>
              This material is general; implementation requires legal agreements you sign with counsel. AS Brokers CC is FSP
              17273. Long-term insurance is subject to Policyholder Protection Rules and insurer-specific terms.{" "}
              <Link href="/regulatory-compliance" className={WARM_LINK}>Read disclosures</Link>.
            </p>
          </div>
        </WarmSection>

        <WarmSection narrow>
          <div className="text-center">
            <WarmPrimaryLink href="/contact">Review your business assurance and contracts</WarmPrimaryLink>
          </div>
        </WarmSection>
      </article>
      <RelatedContent variant="warm" links={getRelatedLinks("/solutions/business-life")} />
    </WarmPageWithFooter>
  );
}
