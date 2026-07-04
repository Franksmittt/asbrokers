import Link from "next/link";
import { RelatedContent } from "@/components/seo/RelatedContent";
import { EstateDutyCalculator } from "@/components/EstateDutyCalculator";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import {
  WarmPageWithFooter,
  WarmPrimaryLink,
  WarmSection,
  WarmSimpleHero,
} from "@/components/warm/WarmShell";
import { WARM_BODY, WARM_CARD, WARM_H2, WARM_H3, WARM_LINK, WARM_META } from "@/lib/warm-theme";
import { getRelatedLinks } from "@/lib/related-content";
import { buildPageMetadata } from "@/lib/seo-metadata";

const PAGE_TITLE = "Estate Duty & Executor Cost Calculator South Africa";
const PAGE_DESCRIPTION =
  "Illustrative estate duty, abatement, and executor-cost awareness for South African residents. Not a SARS assessment, FSP 17273 educational tool with liquidity planning context.";

export const metadata = buildPageMetadata({
  path: "/estate-duty-calculator",
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    "estate duty calculator South Africa",
    "executor fees estimate",
    "estate liquidity planning",
    "SARS estate duty awareness",
    "FSP 17273",
  ],
});

export default function EstateDutyCalculatorPage() {
  return (
    <WarmPageWithFooter>
      <PageJsonLd path="/estate-duty-calculator" webPage={{ name: PAGE_TITLE, description: PAGE_DESCRIPTION }} />

      <WarmSimpleHero
        centered
        kicker="Phase 2: Risk Architecture · Fiduciary Liability"
        title="Estate Duty Calculator"
        description="Understand the cost of dying. Calculate estate duty, executor fees, and the total cash your estate will need at death, before your family has to find out the hard way."
      />

      <WarmSection narrow className="py-8">
        <div className="flex flex-wrap justify-center gap-6 text-sm text-stone-500">
          <span>Estate duty payable</span>
          <span>Executor fees</span>
          <span>Total estate costs</span>
        </div>
      </WarmSection>

      <WarmSection alt narrow>
        <div className="space-y-4">
          <h2 className={WARM_H3}>Understanding estate duty (headline level only)</h2>
          <p className={WARM_BODY}>
            <strong className="text-shark">Estate duty</strong> is a tax levied on the dutiable amount of a deceased
            person&apos;s South African estate. The net estate considers allowable deductions and abatements in terms of{" "}
            <strong className="text-shark">current statute and SARS guidance</strong>. Rates commonly discussed include
            portions taxed at <strong className="text-shark">20%</strong> and higher bands at{" "}
            <strong className="text-shark">25%</strong>, but your outcome depends on assets, debts, rollovers to surviving
            spouses where applicable, and filing accuracy.
          </p>
          <p className={WARM_BODY}>
            <strong className="text-shark">Executor fees</strong> (often commission-based subject to regulation and agreed
            terms) and <strong className="text-shark">liquidity timing</strong> mean families sometimes must raise cash
            before inheritances flow. Life policies and liquid investments may help - if ownership and beneficiary structures
            were set up correctly and remain appropriate.
          </p>
          <p className={WARM_META}>
            This calculator uses simplified assumptions to surface magnitude, not to replace a conveyancer, accountant, or
            SARS filing. Laws and abatements change; verify with professionals for your estate.
          </p>
          <p className="pt-2">
            <Link href="/solutions/estate-planning" className={WARM_LINK}>
              Estate planning services overview
            </Link>
            {" · "}
            <Link href="/annual-estate-reduction-strategy" className={WARM_LINK}>
              Donations modelling tool
            </Link>
          </p>
        </div>
      </WarmSection>

      <WarmSection narrow>
        <div className={WARM_CARD}>
          <EstateDutyCalculator />
        </div>
      </WarmSection>

      <WarmSection alt narrow>
        <div className={WARM_CARD}>
          <h2 className={`${WARM_H2} mb-6`}>Liquidity Stress Test</h2>
          <p className={`${WARM_BODY} mb-4`}>
            The figure above is a high-level estimate of the cash your estate must produce at death. SARS can claim{" "}
            <strong className="text-shark">20% on the first R30 million</strong> and{" "}
            <strong className="text-shark">25% on amounts above that</strong>, plus executor fees. All of it is
            payable in cash before heirs receive their inheritances.
          </p>
          <p className={`${WARM_BODY} mb-4`}>
            Estate duty is calculated on the total value of your estate at death, including property, investments,
            policies, cash, and other assets, after allowable deductions. This calculator is not designed for
            precision. Its purpose is awareness: to expose the liquidity gap before it becomes a crisis.
          </p>
          <p className={`${WARM_BODY} font-medium text-shark`}>
            You have just run a liquidity stress test. The next step is to reduce the number.
          </p>
        </div>
      </WarmSection>

      <WarmSection narrow>
        <h2 className={`${WARM_H2} mb-6`}>The Hidden Problem</h2>
        <p className={`${WARM_BODY} mb-4`}>
          What often catches families off guard is not poor investment performance, but the fact that growth inside an
          estate quietly increases the eventual tax bill over time. Capital locked in low-yield, traditional
          structures makes it worse: when the estate freezes, that capital cannot be turned into cash quickly
          enough. The liquidity crisis is exacerbated precisely when families can least afford it.
        </p>
        <p className={`${WARM_BODY} mb-4`}>
          When sufficient liquidity is not available, estates are often forced to sell assets under pressure, delay
          finalisation, or disrupt long-term plans.
        </p>
        <p className={WARM_BODY}>
          The good news is that estate duty exposure can usually be reduced legally and gradually, but only if
          planning starts early and is applied consistently.
        </p>
      </WarmSection>

      <WarmSection alt narrow>
        <h2 className={`${WARM_H2} mb-6`}>Strategic Capital Migration</h2>
        <p className={`${WARM_BODY} mb-4`}>
          The first step in mathematically reducing your exposure is the annual donations allowance. South African
          tax residents may donate up to <strong className="text-shark">R100,000 per individual</strong> or{" "}
          <strong className="text-shark">R200,000 per married couple</strong> each tax year free of donations tax.
          By using this exemption and redirecting growth outside your personal estate (for example into a family
          trust), future estate duty can be reduced without drastic once-off decisions.
        </p>
        <p className={`${WARM_BODY} mb-2`}>This result is not a prediction.</p>
        <p className={`${WARM_BODY} font-medium text-shark`}>
          It is a planning signal. The size of the problem is shown above; the solution requires structured action over
          time.
        </p>
      </WarmSection>

      <WarmSection narrow>
        <div className={`${WARM_CARD} text-center`}>
          <h2 className={`${WARM_H2} mb-6`}>Next Step</h2>
          <p className={`${WARM_BODY} mb-8`}>
            If you would like to see how annual donations, when invested correctly, can reduce estate duty and shift
            long-term growth outside your estate, the next calculator will walk you through that strategy.
          </p>
          <WarmPrimaryLink href="/annual-estate-reduction-strategy">
            Engineer Your Estate Reduction Strategy →
          </WarmPrimaryLink>
        </div>
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
          <Link href="/income-in-retirement" className={WARM_LINK}>
            Income in retirement
          </Link>
          <Link href="/solutions" className={WARM_LINK}>
            Solutions hub
          </Link>
          <Link href="/solutions/estate-planning" className={WARM_LINK}>
            Estate planning
          </Link>
          <Link href="/solutions/business-insurance" className={WARM_LINK}>
            Business insurance
          </Link>
        </div>
      </WarmSection>

      <RelatedContent links={getRelatedLinks("/estate-duty-calculator")} />
    </WarmPageWithFooter>
  );
}
