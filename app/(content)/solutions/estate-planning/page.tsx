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
  path: "/solutions/estate-planning",
  title: "Estate Planning, Wills & Trusts South Africa",
  description:
    "Educational guide to wills, trusts, estate duty awareness, and liquidity planning. Coordinate with attorneys; independent FSP 17273 in Krugersdorp and Gauteng.",
  keywords: [
    "estate planning South Africa",
    "wills and trusts Gauteng",
    "estate duty planning",
    "financial adviser estate liquidity",
    "FSP 17273",
  ],
});

export default function EstatePlanningPage() {
  return (
    <WarmPageWithFooter>
      <article>
        <WarmSimpleHero
          kicker="AS Brokers · Legacy Structuring"
          title="Estate Planning & Trusts"
          description="Secure Your Legacy With Clear Documents and Tax-Efficient Structures"
          centered
        >
          <p className={`mx-auto mt-4 max-w-3xl ${WARM_BODY}`}>
            <strong className="font-medium text-shark">Estate planning</strong> is the process of aligning your will,
            beneficiaries, ownership of assets, and liquidity (cash at death) with your family&apos;s needs. In South
            Africa, <strong className="font-medium text-shark">SARS estate duty</strong>, executor fees, and outstanding
            debt must often be settled before heirs inherit. AS Brokers (FSP 17273) focuses on the{" "}
            <strong className="font-medium text-shark">financial and risk</strong> side - coordinating with your{" "}
            <strong className="font-medium text-shark">attorney</strong> who drafts binding legal instruments.
          </p>
          <p className={`trust-hallmark mt-6 ${WARM_META}`}>FSP 17273 · Krugersdorp, Gauteng</p>
        </WarmSimpleHero>

        <WarmSection alt narrow>
          <h2 className={`mb-4 ${WARM_H3}`}>Why liquidity matters as much as a will</h2>
          <WarmProse>
            <p>
              A valid will states <em>who</em> receives what, but your estate is a separate legal entity until wound up. If
              there is insufficient cash, the executor may need to sell assets (sometimes under pressure), postpone
              distributions, or negotiate with SARS. <strong className="text-shark">Life policy structuring</strong>,{" "}
              liquid investments, and loan account planning can improve cash availability - subject to policy terms and tax rules.
            </p>
            <p>
              Rough duty and fee estimates help families grasp scale; they are not filing positions. Use our tools as{" "}
              <strong className="text-shark">awareness aids</strong>, then involve professionals for your specific facts.
            </p>
          </WarmProse>
        </WarmSection>

        <WarmSection narrow>
          <h2 className={`mb-4 ${WARM_H3}`}>How we typically help clients prepare</h2>
          <ul className={`space-y-3 ${WARM_BODY}`}>
            <li>· Mapping assets and liabilities so the will matches actual ownership (especially companies and trusts).</li>
            <li>· Checking whether <strong className="text-shark">beneficiary nominations</strong> on policies align with the will and trust deeds.</li>
            <li>· Discussing <strong className="text-shark">trusts</strong> where minors, protection, or business continuity require them - implementation remains with legal counsel.</li>
            <li>· Introducing <strong className="text-shark">donations strategy</strong> (annual exemptions) as part of long-term duty management - not once-off “schemes”.</li>
            <li>· Coordinating with <Link href="/solutions/business-life" className={WARM_LINK}>buy-and-sell and key-person</Link> funding so the estate is not the only source of cash.</li>
          </ul>
        </WarmSection>

        <WarmSection alt narrow>
          <h2 className={`mb-4 ${WARM_H3}`}>Tools to stress-test the numbers</h2>
          <WarmProse>
            <p>
              Illustrations depend on assumptions you enter; they are not SARS assessments or executor guarantees.
            </p>
          </WarmProse>
          <ul className={`mt-4 space-y-3 text-sm ${WARM_BODY}`}>
            <li>
              <Link href="/calculators" prefetch={false} className={`font-medium ${WARM_LINK}`}>
                Estate duty calculator
              </Link>
              <span className={WARM_META}>  -  high-level duty and cost awareness.</span>
            </li>
            <li>
              <Link href="/calculators" prefetch={false} className={`font-medium ${WARM_LINK}`}>
                Annual estate reduction strategy
              </Link>
              <span className={WARM_META}>  -  model recurring donations within exemption limits.</span>
            </li>
            <li>
              <Link href="/retirement" prefetch={false} className={`font-medium ${WARM_LINK}`}>
                Retirement capital calculator
              </Link>
              <span className={WARM_META}>  -  income sustainability angle.</span>
            </li>
          </ul>
        </WarmSection>

        <WarmSection narrow>
          <h2 className={`mb-4 ${WARM_H3}`}>Common misunderstandings</h2>
          <ul className={`list-disc space-y-3 pl-5 leading-relaxed marker:text-stone-400 ${WARM_BODY}`}>
            <li>“My will avoids estate duty.” A will directs assets; it does not automatically remove duty if assets remain in your estate.</li>
            <li>“Trusts are always tax-free.” Trusts have their own tax and governance rules; they must be fit for purpose and properly administered.</li>
            <li>“I’ll sort it later.” Duty exposure grows with asset values; early, consistent planning usually offers more options.</li>
          </ul>
        </WarmSection>

        <WarmSection alt narrow>
          <div className={WARM_CARD}>
            <h2 className="mb-3 text-lg font-bold text-shark">Legal and tax boundaries</h2>
            <p className={`text-xs leading-relaxed ${WARM_META}`}>
              AS Brokers does not draft wills or trust deeds and does not provide legal or tax advice on this website.
              Calculators and articles are educational. Estate duty rates, abatements, and donations-tax rules change with law
              and SARS interpretation; verify current position with qualified professionals. FSP 17273.{" "}
              <Link href="/regulatory-compliance" className={WARM_LINK}>Disclosures</Link>.
            </p>
          </div>
        </WarmSection>

        <WarmSection narrow>
          <div className="text-center">
            <WarmPrimaryLink href="/contact">Discuss estate planning with an adviser</WarmPrimaryLink>
          </div>
        </WarmSection>
      </article>
      <RelatedContent variant="warm" links={getRelatedLinks("/solutions/estate-planning")} />
    </WarmPageWithFooter>
  );
}
