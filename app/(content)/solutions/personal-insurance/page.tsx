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
  path: "/solutions/personal-insurance",
  title: "Personal Short-Term Insurance | Home, Car & All Risk",
  description:
    "Independent short-term insurance advice in Krugersdorp: home, motor, all risk, liability and travel. FAIS-aligned guidance on how cover works and what to watch for.",
  keywords: [
    "short-term insurance South Africa",
    "home insurance Gauteng",
    "car insurance broker",
    "independent insurance adviser",
    "FSP 17273",
    "personal lines insurance",
  ],
});

export default function PersonalInsurancePage() {
  return (
    <WarmPageWithFooter>
      <article>
        <WarmSimpleHero
          kicker="AS Brokers · Short-Term Insurance"
          title="Personal Short-Term Insurance"
          description="When You Need Protection That Actually Protects"
          centered
        >
          <p className={`mx-auto mt-4 max-w-3xl ${WARM_BODY}`}>
            Short-term insurance (non-life) protects things you own and liabilities you might incur - your home, vehicles,
            portable valuables, and legal liability. As an{" "}
            <strong className="font-medium text-shark">independent authorised financial services provider (FSP 17273)</strong>, AS
            Brokers helps you structure cover against real risks, with claims and wording in mind - not only the lowest
            headline premium.
          </p>
          <p className={`trust-hallmark mt-6 ${WARM_META}`}>FSP 17273 · Krugersdorp, Gauteng</p>
        </WarmSimpleHero>

        <WarmSection alt narrow>
          <h2 className={`mb-4 ${WARM_H3}`}>What personal short-term insurance is (and is not)</h2>
          <WarmProse>
            <p>
              In South Africa, short-term insurance is regulated under the{" "}
              <strong className="text-shark">Short-Term Insurance Act</strong> and overseen by the{" "}
              <strong className="text-shark">FSCA</strong>. Policies transfer specified financial risks to an insurer in
              exchange for premium. Pay-outs depend on the <strong className="text-shark">policy wording</strong>, events
              that occur, and compliance with conditions - there is no investment return “guarantee” in the way you might see
              with certain long-term products.
            </p>
            <p>
              A good broker helps you align <strong className="text-shark">sums insured</strong>,{" "}
              <strong className="text-shark">excesses</strong>, and <strong className="text-shark">extensions</strong>{" "}
              (e.g. car hire, watercraft, all-risk specified items) with how you actually live - so that at claim time the
              contract does what you expected.
            </p>
          </WarmProse>
        </WarmSection>

        <WarmSection narrow>
          <h2 className={`mb-4 ${WARM_H3}`}>Cover types we typically structure</h2>
          <ul className={`space-y-3 ${WARM_BODY}`}>
            <li>· <strong className="text-shark">Home:</strong> buildings, contents, geysers, accidental damage - reviewed against rebuilding and replacement values.</li>
            <li>· <strong className="text-shark">Motor:</strong> private or business use; comprehensive vs limited cover; tracking and security conditions where relevant.</li>
            <li>· <strong className="text-shark">Portable valuables:</strong> all-risk for jewellery, electronics, tools - often where underinsurance shows up first.</li>
            <li>· <strong className="text-shark">Watercraft & leisure:</strong> tailored extensions where standard policies stop.</li>
            <li>· <strong className="text-shark">Personal liability:</strong> legal liability to third parties - limits and exclusions differ by insurer.</li>
            <li>· <strong className="text-shark">Travel:</strong> medical emergencies, cancellation, baggage - wording and territorial limits matter.</li>
          </ul>
          <p className={`mt-6 text-sm ${WARM_META}`}>
            Exact benefits depend on the insurer’s policy schedule. We do not promise specific claim outcomes; we work
            to reduce gaps before a loss happens.
          </p>
        </WarmSection>

        <WarmSection alt narrow>
          <h2 className={`mb-4 ${WARM_H3}`}>Why sums insured and average matter</h2>
          <WarmProse>
            <p>
              Many disputes arise from <strong className="text-shark">underinsurance</strong> and average (co-insurance)
              clauses: if you insure a building or contents for less than the cost to reinstate, the insurer may reduce a
              claim proportionally. Regular reviews - especially after renovations, new purchases, or load-shedding-related
              losses - help keep values credible.
            </p>
            <p>
              Motor vehicles need attention too: agreed value vs market value, finance/lease requirements, and use of the
              vehicle (personal vs business) must match the schedule.
            </p>
          </WarmProse>
        </WarmSection>

        <WarmSection narrow>
          <h2 className={`mb-4 ${WARM_H3}`}>Claims and ongoing service</h2>
          <WarmProse>
            <p>
              Short-term insurance is judged at <strong className="text-shark">claim time</strong>. AS Brokers focuses on
              structured cover upfront and support when you need to claim - documentation, timelines, and liaison with
              insurers. Every claim is assessed by the insurer against policy terms; we do not control their final decision.
            </p>
            <p className={WARM_META}>
              Combined experience across commercial and personal lines means we see patterns that generic call-centre
              scripts often miss.
            </p>
          </WarmProse>
        </WarmSection>

        <WarmSection alt narrow>
          <div className={WARM_CARD}>
            <h2 className={`mb-3 text-lg font-bold text-shark`}>Regulatory note</h2>
            <p className={`text-xs leading-relaxed ${WARM_META}`}>
              This page is for general information only, not personalised financial advice. Product terms, premiums, and
              underwriting decisions are determined by insurers. AS Brokers CC is an authorised financial services
              provider (FSP 17273). For tailored recommendations, book a consultation. See our{" "}
              <Link href="/regulatory-compliance" className={WARM_LINK}>
                regulatory disclosure
              </Link>
              .
            </p>
          </div>
        </WarmSection>

        <WarmSection narrow>
          <h2 className={`mb-4 ${WARM_H3}`}>Related planning</h2>
          <ul className={`space-y-2 text-sm ${WARM_BODY}`}>
            <li>
              <Link href="/solutions/business-insurance" className={WARM_LINK}>Commercial short-term insurance</Link>{" "}
              if you also carry business assets or turnover through a company.
            </li>
            <li>
              <Link href="/solutions/life-insurance" className={WARM_LINK}>Personal life and disability cover</Link>{" "}
              for income and debt risks short-term insurance does not address.
            </li>
            <li>
              <Link href="/calculators" className={WARM_LINK}>Calculators hub</Link> for retirement and estate context.
            </li>
          </ul>
        </WarmSection>

        <WarmSection narrow>
          <div className="text-center">
            <WarmPrimaryLink href="/contact">Get your personal insurance reviewed</WarmPrimaryLink>
          </div>
        </WarmSection>
      </article>
      <RelatedContent variant="warm" links={getRelatedLinks("/solutions/personal-insurance")} />
    </WarmPageWithFooter>
  );
}
