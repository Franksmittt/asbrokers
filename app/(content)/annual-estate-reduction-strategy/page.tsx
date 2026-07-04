import Link from "next/link";
import { EstateReductionCalculator } from "@/components/EstateReductionCalculator";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import {
  WarmPageWithFooter,
  WarmPrimaryLink,
  WarmSection,
  WarmSimpleHero,
} from "@/components/warm/WarmShell";
import { WARM_BODY, WARM_CARD, WARM_H2, WARM_LINK } from "@/lib/warm-theme";
import { buildPageMetadata } from "@/lib/seo-metadata";

const PAGE_TITLE = "Trust Donation Calculator | Annual Donations & Estate Planning SA";
const PAGE_DESCRIPTION =
  "Use the annual donations exemption to legally reduce estate duty. Calculate how much you can eliminate over time through structured annual donations.";

export const metadata = buildPageMetadata({
  path: "/annual-estate-reduction-strategy",
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
});

export default function AnnualEstateReductionPage() {
  return (
    <WarmPageWithFooter>
      <PageJsonLd path="/annual-estate-reduction-strategy" webPage={{ name: PAGE_TITLE, description: PAGE_DESCRIPTION }} />

      <WarmSimpleHero
        centered
        kicker="Phase 2: Risk Architecture · Fiduciary Liability"
        title="Strategic Capital Migration Plan"
        description="Leverage the R100k/R200k exemption to systematically dismantle your estate tax liability and secure generational wealth."
      >
        <p className="mt-4 text-sm text-stone-500">
          Calculate how much estate duty you can eliminate over time through structured annual donations, and see the
          cumulative savings before it&apos;s too late to act.
        </p>
      </WarmSimpleHero>

      <WarmSection narrow className="py-8">
        <div className="flex flex-wrap justify-center gap-6 text-sm text-stone-500">
          <span>Annual donation strategy</span>
          <span>Cumulative duty saved</span>
          <span>Estate exposure reduction</span>
        </div>
      </WarmSection>

      <WarmSection>
        <div className={`mx-auto max-w-4xl ${WARM_CARD}`}>
          <EstateReductionCalculator />
        </div>
      </WarmSection>

      <WarmSection alt narrow>
        <h2 className={`${WARM_H2} mb-6`}>
          Annual Estate Reduction Strategy. How This Calculator Fits In
        </h2>
        <p className={`${WARM_BODY} mb-4`}>
          South African residents are allowed to donate up to R100,000 per person per year (or R200,000 per married
          couple) without triggering donations tax. When used consistently, this allowance becomes one of the most
          practical and reliable tools for reducing future estate duty.
        </p>
        <p className={`${WARM_BODY} mb-4`}>
          Instead of trying to restructure an estate late in life, this strategy works gradually and predictably. Each
          year, a portion of wealth is moved out of your personal estate in a compliant way. Over time, this reduces:
        </p>
        <ul className={`space-y-2 ${WARM_BODY} mb-4`}>
          <li className="flex items-start gap-2">
            <span className="text-samsung-blue mt-0.5">→</span>
            <span>The value of your estate subject to estate duty</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-samsung-blue mt-0.5">→</span>
            <span>Executor&apos;s fees</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-samsung-blue mt-0.5">→</span>
            <span>The cash-flow pressure placed on heirs</span>
          </li>
        </ul>
      </WarmSection>

      <WarmSection narrow>
        <div className={WARM_CARD}>
          <h2 className={`${WARM_H2} mb-6`}>How This Strategy Works in Practice</h2>
          <p className={`${WARM_BODY} mb-4`}>
            In practice, these annual donations are often made to a family trust, allowing capital to leave the estate
            while remaining protected, managed, and earmarked for long-term family objectives. Moving capital to a
            trust is only step one. Deploying that capital into high-yield, unlisted alternative assets ensures the
            trust outpaces inflation and compounds wealth outside your estate.
          </p>
          <p className={WARM_BODY}>
            The real power of the strategy is not the size of any single donation, but the discipline of repeating it
            year after year.
          </p>
        </div>
      </WarmSection>

      <WarmSection alt narrow>
        <h2 className={`${WARM_H2} mb-6`}>What This Calculator Demonstrates</h2>
        <p className={`${WARM_BODY} mb-4`}>
          This calculator illustrates that effect. By entering your current age and selecting whether the strategy
          applies to an individual or a couple, you can see how small, consistent annual donations can compound into a
          meaningful reduction in estate value over time.
        </p>
        <p className={WARM_BODY}>
          The figures shown are not meant to predict exact outcomes. Their purpose is to make the long-term impact
          visible and understandable, using the same framework used daily to explain estate-duty reduction strategies
          to clients in a practical, numbers-driven way.
        </p>
      </WarmSection>

      <WarmSection narrow>
        <h2 className={`${WARM_H2} mb-6`}>Important Context</h2>
        <p className={`${WARM_BODY} mb-4`}>
          It&apos;s important to understand that this is not a loophole or a once-off transaction. It is a long-term
          estate structuring strategy that works best when started early, implemented correctly, and reviewed regularly
          as part of a broader estate and retirement plan.
        </p>
        <p className={WARM_BODY}>
          When combined with proper trust structuring and a well-drafted will, including the deliberate use of the R3.5
          million estate-duty abatement, this approach can materially reduce estate duty and executor fees across
          generations, while keeping capital protected and controlled.
        </p>
      </WarmSection>

      <WarmSection alt narrow>
        <h2 className={`${WARM_H2} mb-6`}>Don&apos;t Wait</h2>
        <p className={`${WARM_BODY} font-medium text-shark mb-4`}>
          Every Year You Don&apos;t Donate Is a Year of Savings Lost
        </p>
        <p className={`${WARM_BODY} mb-4`}>
          The R100,000 annual exemption doesn&apos;t roll over. If you don&apos;t use it this year, it&apos;s gone. You
          can&apos;t catch up next year by donating R200,000; you&apos;ll trigger donations tax on the excess.
        </p>
        <p className={WARM_BODY}>
          A couple starting at <span className="font-semibold text-cinematic-teal">50</span> migrating R200k/year
          protects <span className="font-semibold text-cinematic-teal">R3m</span>. Starting at{" "}
          <span className="font-semibold text-cinematic-teal">60</span> protects only{" "}
          <span className="font-semibold text-cinematic-teal">R1m</span>. Same strategy, half the result. The earlier
          you start, the more your heirs keep. The math is simple, but only if you act on it.
        </p>
      </WarmSection>

      <WarmSection narrow>
        <h2 className={`${WARM_H2} mb-6`}>Initiate Your Fiduciary Audit</h2>
        <p className={`${WARM_BODY} mb-6`}>
          You know the liability. You know the strategy. Now, let our wealth engineers structure your trust, route
          your donations, and secure your high-yield allocations.
        </p>
        <WarmPrimaryLink href="/contact" className="w-full sm:w-auto">
          Book Fiduciary Consultation
        </WarmPrimaryLink>
      </WarmSection>

      <WarmSection alt narrow>
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
          <a
            href="https://wa.me/27662276044"
            target="_blank"
            rel="noopener noreferrer"
            className={WARM_LINK}
          >
            WhatsApp us · +27 66 227 6044
          </a>
          <Link href="/solutions" className={WARM_LINK}>
            Income in retirement
          </Link>
          <Link href="/solutions" className={WARM_LINK}>
            Insurance & risk planning
          </Link>
          <Link href="/solutions" className={WARM_LINK}>
            Estate planning
          </Link>
          <Link href="/solutions" className={WARM_LINK}>
            Business insurance
          </Link>
        </div>
      </WarmSection>
    </WarmPageWithFooter>
  );
}
