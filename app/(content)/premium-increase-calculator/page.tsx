import Link from "next/link";
import { PremiumComparisonCalculator } from "@/components/PremiumComparisonCalculator";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import {
  WarmPageWithFooter,
  WarmPrimaryLink,
  WarmSection,
  WarmSimpleHero,
} from "@/components/warm/WarmShell";
import { WARM_BODY, WARM_CARD, WARM_CARD_MUTED, WARM_H2, WARM_H3, WARM_LINK, WARM_META } from "@/lib/warm-theme";
import { buildPageMetadata } from "@/lib/seo-metadata";

const PAGE_TITLE = "Life Insurance Premium Sustainability & Escalation Tool";
const PAGE_DESCRIPTION =
  "Compare year-by-year life policy premiums you enter yourself. Model long-term affordability, escalation, and level vs increasing structures, education only, not a quote or product recommendation.";

export const metadata = buildPageMetadata({
  path: "/premium-increase-calculator",
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    "life insurance premium increase",
    "escalating vs level premiums South Africa",
    "premium sustainability calculator",
    "long-term life cover cost",
    "FSP 17273",
  ],
});

export default function PremiumIncreaseCalculatorPage() {
  return (
    <WarmPageWithFooter>
      <PageJsonLd path="/premium-increase-calculator" webPage={{ name: PAGE_TITLE, description: PAGE_DESCRIPTION }} />

      <WarmSimpleHero
        centered
        kicker="Phase 2: Risk Architecture · Uncapped Liability"
        title="The Premium Liability Test"
        description="The cheapest policy today is often mathematically engineered to become entirely unaffordable at exactly the age you need it most. Project your actual long-term liability."
      />

      <WarmSection alt narrow>
        <h2 className={`${WARM_H3} mb-4 text-center md:text-left`}>
          Premium sustainability - not only today&apos;s debit order
        </h2>
        <p className={`${WARM_BODY} mb-4`}>
          Long-term <strong className="text-shark">risk insurance</strong> premiums can rise because of scheduled
          escalation, age-based rating, benefit reviews, or changes in insurer pricing assumptions. The starting premium is
          a poor proxy for total lifetime cost. This tool lets you <strong className="text-shark">type in the actual
          premiums</strong> shown on schedules or quotes year by year - so you see the rand trajectory, not marketing
          percentages alone.
        </p>
        <ul className={`${WARM_META} space-y-2 list-disc pl-5`}>
          <li>Educational; does not calculate premiums for you or recommend switching products.</li>
          <li>Assumes the figures you enter are accurate; verify against your insurer documentation.</li>
          <li>Outcomes depend on future insurer behaviour - illustrations are not guarantees.</li>
        </ul>
      </WarmSection>

      <WarmSection>
        <div className={`mx-auto max-w-6xl ${WARM_CARD} overflow-hidden`}>
          <PremiumComparisonCalculator />
        </div>
      </WarmSection>

      <WarmSection alt>
        <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-1 md:grid-cols-3">
          <div className={WARM_CARD}>
            <h2 className={`${WARM_H3} mb-4`}>The Illusion</h2>
            <p className={WARM_BODY}>
              Age-rated premiums and exponential compounding are rarely shown in year one. A low starting premium masks the true cost. Over 10–20 years, scheduled escalation plus age-rating can double or triple your premium, making the &quot;cheapest&quot; policy the most expensive to hold.
            </p>
          </div>
          <div className={WARM_CARD}>
            <h2 className={`${WARM_H3} mb-4`}>The Trap</h2>
            <p className={WARM_BODY}>
              Guarantee periods typically expire after 10–15 years. At that point premiums can jump sharply at review. By then you are older, may have developed conditions, and cancelling or replacing cover is costly or impossible. The liability compounds exactly when you are least able to restructure.
            </p>
          </div>
          <div className={WARM_CARD}>
            <h2 className={`${WARM_H3} mb-4`}>The Fiduciary Alternative</h2>
            <p className={WARM_BODY}>
              Purpose-Built Risk Architecture: level premiums or behaviour-linked models designed for long-term sustainability. Not all policies are engineered to spike. Let our fiduciaries restructure your cover so it remains affordable when you need it most.
            </p>
          </div>
        </div>
      </WarmSection>

      <WarmSection narrow>
        <h2 className={`${WARM_H2} mb-6`}>Why This Calculator Is Different</h2>
        <p className={`${WARM_BODY} mb-4`}>
          This calculator does not estimate premiums. It requires you to manually enter the actual premiums shown on
          your policy or quote document for each year. That is deliberate.
        </p>
        <p className={`${WARM_BODY} mb-4`}>By doing this, the calculator allows you to:</p>
        <ul className={`space-y-2 ${WARM_BODY}`}>
          {[
            "See the real rand cost of premium increases over time",
            "Compare insurers year by year, not by headline percentages",
            "Identify when premiums begin to accelerate",
            "Understand the total cost of cover, not just the starting price",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="text-samsung-blue">→</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className={`${WARM_BODY} mt-4`}>
          This turns abstract escalation percentages into real numbers you can plan around.
        </p>
      </WarmSection>

      <WarmSection alt narrow>
        <h2 className={`${WARM_H2} mb-6`}>A Note on Behaviour-Linked and Structured Premium Products</h2>
        <p className={`${WARM_BODY} mb-4`}>
          Not all escalating premiums are bad. Some products, particularly behaviour-linked structures, can work very
          well for the right client:
        </p>
        <ul className={`space-y-2 ${WARM_BODY} mb-4`}>
          {[
            "High-income earners",
            "Clients with strong wellness participation",
            "Clients actively engaged with their bank or medical aid benefits",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="text-samsung-blue">→</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className={WARM_BODY}>
          When used correctly, these structures can deliver excellent long-term value. The problem arises when they are
          used for the wrong client, or when the long-term premium behaviour is not properly understood upfront. This
          calculator is about fit and sustainability, not criticism of specific insurers or models.
        </p>
      </WarmSection>

      <WarmSection narrow>
        <h2 className={`${WARM_H2} mb-6`}>Why BrightRock Is Often Used as a Comparison</h2>
        <p className={`${WARM_BODY} mb-4`}>
          BrightRock is frequently referenced in premium discussions because its approach focuses on:
        </p>
        <ul className={`space-y-2 ${WARM_BODY} mb-4`}>
          {[
            "Showing actual future premium amounts, not only percentages",
            "Allowing advisers and clients to see what will be paid each year",
            "Making premium patterns more predictable and transparent",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="text-samsung-blue">→</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className={WARM_BODY}>
          By contrast, many traditional products describe escalation patterns in percentages, while the actual premiums
          paid may diverge significantly over time due to age-rating and review events. This calculator helps make
          those differences visible.
        </p>
      </WarmSection>

      <WarmSection alt narrow>
        <h2 className={`${WARM_H2} mb-6`}>How to Use This Calculator Properly</h2>
        <p className={`${WARM_BODY} mb-4`}>Enter:</p>
        <ol className={`list-decimal list-inside ${WARM_BODY} space-y-2 mb-4`}>
          <li>Take your policy schedule or quotation</li>
          <li>Enter the actual monthly premium for each year exactly as shown</li>
          <li>Compare different products side-by-side</li>
        </ol>
        <p className={`${WARM_BODY} mb-4`}>Review:</p>
        <ul className={`space-y-2 ${WARM_BODY} mb-4`}>
          <li className="flex items-start gap-2">
            <span className="text-samsung-blue">→</span>
            <span>Year-by-year increases</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-samsung-blue">→</span>
            <span>Long-term affordability</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-samsung-blue">→</span>
            <span>Total premiums paid over time</span>
          </li>
        </ul>
        <p className={WARM_BODY}>
          The goal is not to chase the lowest premium; it is to avoid unpleasant surprises later.
        </p>
      </WarmSection>

      <WarmSection narrow>
        <h2 className={`${WARM_H2} mb-6`}>Who This Calculator Is Ideal For</h2>
        <p className={`${WARM_BODY} mb-4`}>This tool is especially useful for:</p>
        <ul className={`space-y-2 ${WARM_BODY}`}>
          {[
            "Clients reviewing existing life insurance policies",
            "Anyone considering replacing or upgrading cover",
            "High-income earners comparing premium structures",
            "Business owners with long-term cover needs",
            "Advisers and clients who want transparency before committing",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="text-samsung-blue">→</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </WarmSection>

      <WarmSection alt narrow>
        <h2 className={`${WARM_H2} mb-6`}>The Real Question This Calculator Answers</h2>
        <p className={`${WARM_BODY} font-medium text-shark text-lg mb-4`}>
          &quot;Can I still afford this policy in 10, 15, or 20 years not just today?&quot;
        </p>
        <p className={WARM_BODY}>That question matters more than the starting premium.</p>
      </WarmSection>

      <WarmSection narrow>
        <div className={`${WARM_CARD} text-center`}>
          <h2 className={`${WARM_H2} mb-4`}>Stop Funding Structural Liabilities</h2>
          <p className={`${WARM_BODY} mb-8`}>
            If your projection shows an unsustainable premium spike, your risk architecture is fundamentally flawed. Let our fiduciaries restructure your cover before the liability compounds.
          </p>
          <WarmPrimaryLink href="/contact">Initiate Fiduciary Risk Audit →</WarmPrimaryLink>
        </div>
      </WarmSection>

      <WarmSection alt narrow>
        <div className={WARM_CARD_MUTED}>
          <h2 className={`${WARM_H3} mb-3`}>Regulatory note</h2>
          <p className={`${WARM_META} mb-3`}>
            AS Brokers CC is an authorised financial services provider (FSP 17273). This calculator is a transparency aid; it
            is not a personalised quote, suitability analysis, or replacement advice. Replacing or cancelling cover can have
            underwriting consequences; discuss changes with a qualified adviser. References to product philosophies or insurers on
            this page describe market mechanics generally - not an endorsement or criticism of any brand.
          </p>
          <p className={WARM_META}>
            <Link href="/regulatory-compliance" className={WARM_LINK}>FAIS disclosure &amp; complaints</Link>
            {" · "}
            <Link href="/solutions/life-insurance" className={WARM_LINK}>Personal life insurance</Link>
          </p>
        </div>
      </WarmSection>

      <WarmSection narrow>
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
          <a
            href="https://wa.me/27662276044"
            target="_blank"
            rel="noopener noreferrer"
            className={WARM_LINK}
          >
            Contact us on WhatsApp · +27 66 227 6044
          </a>
          <Link href="/" className={WARM_LINK}>
            Home
          </Link>
          <Link href="/retirement" className={WARM_LINK}>
            Retirement income
          </Link>
          <Link href="/solutions" className={WARM_LINK}>
            Insurance & risk planning
          </Link>
          <Link href="/solutions" className={WARM_LINK}>
            Business risk management
          </Link>
          <Link href="/solutions" className={WARM_LINK}>
            Estate planning
          </Link>
        </div>
      </WarmSection>
    </WarmPageWithFooter>
  );
}
