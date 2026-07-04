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
  path: "/solutions/business-insurance",
  title: "Business Short-Term Insurance | Commercial, Liability & BI",
  description:
    "Commercial property, business interruption, liability, fleet and industry risks for South African businesses. Independent broker in Krugersdorp, education-led, FAIS-aligned.",
  keywords: [
    "business insurance South Africa",
    "commercial short-term insurance",
    "public liability cover",
    "business interruption insurance",
    "SME insurance broker Gauteng",
  ],
});

export default function BusinessInsurancePage() {
  return (
    <WarmPageWithFooter>
      <article>
        <WarmSimpleHero
          kicker="AS Brokers · Business Insurance"
          title="Business Short-Term Insurance"
          description="Protecting the Businesses That Create South Africa's Wealth"
          centered
        >
          <p className={`mx-auto mt-4 max-w-3xl ${WARM_BODY}`}>
            From stock and machinery to <strong className="font-medium text-shark">public liability</strong>,{" "}
            <strong className="font-medium text-shark">employers&apos; liability</strong>, and{" "}
            <strong className="font-medium text-shark">business interruption</strong>, commercial short-term cover is
            how operating companies survive fires, thefts, liability claims, and supply shocks. AS Brokers (FSP 17273)
            structures programmes around how your <em>actual</em> business earns and loses money - not generic templates.
          </p>
          <p className={`trust-hallmark mt-6 ${WARM_META}`}>FSP 17273 · Independent advice</p>
        </WarmSimpleHero>

        <WarmSection alt narrow>
          <h2 className={`mb-4 ${WARM_H3}`}>How commercial short-term cover fits together</h2>
          <WarmProse>
            <p>
              Policies are contracts: they list insured events, exclusions, sub-limits, and conditions.{" "}
              <strong className="text-shark">Material facts</strong> must be disclosed to insurers before inception and at
              renewal; non-disclosure can void cover or reduce claims. We help you document turnover, processes, security,
              and occupancy so underwriting matches reality.
            </p>
            <p>
              <strong className="text-shark">Business interruption (BI)</strong> typically needs a clear link to
              material damage and defined indemnity periods; getting the gross profit or revenue definition wrong is a
              common source of disappointment at claim stage. We spend time on that link, not only on the fire section.
            </p>
          </WarmProse>
        </WarmSection>

        <WarmSection narrow>
          <h2 className={`mb-4 ${WARM_H3}`}>What we typically arrange</h2>
          <ul className={`space-y-3 ${WARM_BODY}`}>
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
          <p className={`mt-6 text-sm ${WARM_META}`}>
            Availability depends on insurer and occupation class. We do not guarantee acceptance or premium.
          </p>
        </WarmSection>

        <WarmSection alt narrow>
          <h2 className={`mb-4 ${WARM_H3}`}>Risk first, insurance second</h2>
          <WarmProse>
            <p>
              We start with a simple question set: What stops revenue? What capex would you need to replace in 90 days?
              Which contracts or regulators impose insurance obligations? That frames priorities before comparing quotes. A
              large share of our practice sits in <strong className="text-shark">business short-term</strong> - we treat it as core engineering, not a side product.
            </p>
            <p>
              For owner-managed businesses, we often coordinate with{" "}
              <Link href="/solutions/business-life" className={WARM_LINK}>business life</Link>{" "}
              structures (key person, buy-and-sell, surety) so personal and balance-sheet risks do not contradict each other.
            </p>
          </WarmProse>
        </WarmSection>

        <WarmSection narrow>
          <div className={WARM_CARD}>
            <h2 className="mb-3 text-lg font-bold text-shark">Regulatory note</h2>
            <p className={`text-xs leading-relaxed ${WARM_META}`}>
              Information on this page is educational and not a substitute for advice tailored to your business. Premiums,
              deductibles, and claim outcomes depend on insurer terms and the facts of each loss. AS Brokers CC (FSP 17273)
              acts as intermediary where products are placed with licensed insurers. See{" "}
              <Link href="/regulatory-compliance" className={WARM_LINK}>FAIS disclosure</Link>.
            </p>
          </div>
        </WarmSection>

        <WarmSection narrow>
          <div className="text-center">
            <WarmPrimaryLink href="/contact">Review your business risk structure</WarmPrimaryLink>
          </div>
        </WarmSection>
      </article>
      <RelatedContent variant="warm" links={getRelatedLinks("/solutions/business-insurance")} />
    </WarmPageWithFooter>
  );
}
