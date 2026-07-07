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
  path: "/solutions/life-insurance",
  title: "Life Insurance, Disability & Severe Illness",
  description:
    "Death cover, permanent disability, income protection, and severe illness. Independent long-term risk advice in Krugersdorp, structured around income first, not product hype.",
  keywords: [
    "life insurance South Africa",
    "income protection disability",
    "severe illness cover",
    "financial adviser life cover",
    "FSP 17273",
  ],
});

export default function LifeInsurancePage() {
  return (
    <WarmPageWithFooter>
      <article>
        <WarmSimpleHero
          kicker="AS Brokers · Life Insurance"
          title="Personal Life Insurance"
          description="It's Not About Dying. It's About What Happens to Your Income."
          centered
        >
          <p className={`mx-auto mt-4 max-w-3xl ${WARM_BODY}`}>
            Long-term <strong className="font-medium text-shark">risk insurance</strong> (life, disability, income
            protection, severe illness) pays defined benefits when specific insured events happen - subject to policy terms,
            waiting periods, and underwriting. AS Brokers (FSP 17273) helps you align cover with{" "}
            <strong className="font-medium text-shark">debt, dependants, tax, and replacement income</strong>, then
            reviews escalation (level vs escalating premiums) so affordability lasts, not just year one.
          </p>
          <p className={`trust-hallmark mt-6 ${WARM_META}`}>FSP 17273 · Category 1.8 where unlisted wealth applies</p>
        </WarmSimpleHero>

        <WarmSection alt narrow>
          <h2 className={`mb-4 ${WARM_H3}`}>The four pillars most portfolios need to balance</h2>
          <ul className={`space-y-4 ${WARM_BODY}`}>
            <li>
              <strong className="text-shark">Death cover.</strong> Liquidity for executor costs, debt redemption, and
              dependants&apos; maintenance. Beneficiary nominations and trust wording should match your will - misalignment is a
              common planning failure.
            </li>
            <li>
              <strong className="text-shark">Permanent disability.</strong> If you cannot earn in your own or suited
              occupation, death cover does not help - you still have living costs. Definitions and waiting periods differ by
              product; we compare wording, not marketing leaflets alone.
            </li>
            <li>
              <strong className="text-shark">Temporary disability / income protection.</strong> Replaces part of income
              during recovery from illness or injury. Waiting periods, benefit periods, and “own occupation” vs “any
              occupation” definitions drive real-world outcomes.
            </li>
            <li>
              <strong className="text-shark">Severe illness (dread disease).</strong> Lump sums for treatment,
              lifestyle changes, or reducing debt when a listed condition is diagnosed - subject to policy lists and
              severity criteria.
            </li>
          </ul>
        </WarmSection>

        <WarmSection narrow>
          <h2 className={`mb-4 ${WARM_H3}`}>Escalation, guarantees, and reviews</h2>
          <WarmProse>
            <p>
              Premiums may be <strong className="text-shark">level</strong> or <strong className="text-shark">escalating</strong>, and may include age-rated elements depending on product design.
              After guarantee or review windows, premiums can change - sometimes sharply. That affects whether you can keep
              cover when you are older or have new health history. We use tools such as our{" "}
              <Link href="/calculators" className={WARM_LINK}>premium comparison calculator</Link>{" "}
              so year-by-year costs are visible before you commit - not only the first debit order.
            </p>
            <p className={WARM_META}>
              No forecast on this site is a promise of future premiums; insurers price according to their tables and risk rules.
            </p>
          </WarmProse>
        </WarmSection>

        <WarmSection alt narrow>
          <h2 className={`mb-4 ${WARM_H3}`}>Tax and estate interaction (headline only)</h2>
          <WarmProse>
            <p>
              Life policies can have estate duty, income tax, and donations-tax dimensions depending on ownership,
              beneficiary structure, and estate liquidity. We flag where your accountant or attorney should refine
              structures; we do not provide tax or legal advice on this page.
            </p>
            <p>
              For <strong className="text-shark">liquidity at death</strong>, see also{" "}
              <Link href="/calculators" className={WARM_LINK}>estate duty calculator</Link> and{" "}
              <Link href="/estate-planning" className={WARM_LINK}>estate planning</Link>.
            </p>
          </WarmProse>
        </WarmSection>

        <WarmSection narrow>
          <div className={WARM_CARD}>
            <h2 className="mb-3 text-lg font-bold text-shark">Regulatory note</h2>
            <p className={`text-xs leading-relaxed ${WARM_META}`}>
              Long-term insurance is governed by the Long-Term Insurance Act and insurer policy terms. Benefits are not
              guaranteed except where the contract explicitly states guarantees; medical underwriting may decline or
              load risk. This page is general information - not personal advice. AS Brokers CC, FSP 17273.{" "}
              <Link href="/regulatory-compliance" className={WARM_LINK}>Full disclosures</Link>.
            </p>
          </div>
        </WarmSection>

        <WarmSection narrow>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/calculators" prefetch={false} className={`text-sm font-medium ${WARM_LINK}`}>
              Premium sustainability tool
            </Link>
            <WarmPrimaryLink href="/contact">Request a life insurance review</WarmPrimaryLink>
          </div>
        </WarmSection>
      </article>
      <RelatedContent variant="warm" links={getRelatedLinks("/solutions/life-insurance")} />
    </WarmPageWithFooter>
  );
}
