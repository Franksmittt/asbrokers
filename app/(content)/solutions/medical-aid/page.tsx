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
  path: "/solutions/medical-aid",
  title: "Medical Aid & Gap Cover South Africa",
  description:
    "Medical scheme options, gap cover as short-term insurance, and health planning for families and professionals. Independent FSP 17273, CMS schemes vs insurance products explained.",
  keywords: [
    "medical aid South Africa",
    "gap cover insurance",
    "medical scheme options",
    "health insurance adviser Gauteng",
    "FSP 17273",
  ],
});

export default function MedicalAidPage() {
  return (
    <WarmPageWithFooter>
      <article>
        <WarmSimpleHero
          kicker="AS Brokers · Health & Integration"
          title="Medical Aid & Gap Cover"
          description="The Health to Enjoy the Wealth You Build"
          centered
        >
          <p className={`mx-auto mt-4 max-w-3xl ${WARM_BODY}`}>
            In South Africa, <strong className="font-medium text-shark">registered medical schemes</strong> fall under
            the <strong className="font-medium text-shark">Medical Schemes Act</strong> and oversight distinct from typical
            FAIS long-term products. <strong className="font-medium text-shark">Gap cover</strong> is usually a{" "}
            <strong className="font-medium text-shark">short-term insurance</strong> policy that pays toward in-hospital
            shortfalls when specialists charge above scheme tariff - subject to policy caps, waiting periods, and insurer rules.
            We help you compare options in plain language; we do not promise scheme benefit outcomes or claim approvals.
          </p>
          <p className={`trust-hallmark mt-6 ${WARM_META}`}>FSP 17273 · Scheme rules and PMBs apply per scheme</p>
        </WarmSimpleHero>

        <WarmSection alt narrow>
          <h2 className={`mb-4 ${WARM_H3}`}>Medical schemes: what to compare</h2>
          <WarmProse>
            <p>
              Scheme options differ by <strong className="text-shark">network</strong>,{" "}
              <strong className="text-shark">savings accounts</strong>, <strong className="text-shark">day-to-day</strong>
              {" "}rules, and <strong className="text-shark">chronic medicine</strong> programmes. Prescribed Minimum Benefits
              (PMBs) exist for certain conditions within scheme frameworks - but practical access still depends on scheme
              formularies, designated service providers, and pre-authorisation. Always read the scheme’s rules each year;
              benefits and contributions change.
            </p>
            <p className={WARM_META}>
              We assist with structured comparisons; final membership is between you and the scheme you select.
            </p>
          </WarmProse>
        </WarmSection>

        <WarmSection narrow>
          <h2 className={`mb-4 ${WARM_H3}`}>Gap cover: how it fits</h2>
          <WarmProse>
            <p>
              Gap policies are not substitutes for scheme membership for in-hospital care; they work alongside your scheme,
              within annual caps introduced under regulations that limit gap exposure relative to scheme benefits. Waiting
              periods for pre-existing conditions, oncology sub-limits, and co-payment riders vary - disclosure at application is
              critical to avoid later repudiation.
            </p>
            <p>
              If you change schemes, review gap alignment; combination mismatches are a frequent source of frustration.
            </p>
          </WarmProse>
        </WarmSection>

        <WarmSection alt narrow>
          <h2 className={`mb-4 ${WARM_H3}`}>Integration with risk and income planning</h2>
          <WarmProse>
            <p>
              Executives often carry <Link href="/solutions/life-insurance" className={WARM_LINK}>severe illness</Link>{" "}
              and <strong className="text-shark">income protection</strong> alongside medical benefits. We map overlaps so
              you are not paying twice for the same risk event without knowing it, or leaving oncology shortfalls uncovered because
              products were bought in isolation.
            </p>
          </WarmProse>
        </WarmSection>

        <WarmSection narrow>
          <h2 className={`mb-4 ${WARM_H3}`}>Wellness and day-to-day costs</h2>
          <WarmProse>
            <p>
              Day-to-day spend, dental, and optical are often self-funded or scheme-specific. We can discuss budgeting and
              alternative structures that fit your tax and cash-flow picture - without presenting unlicensed “health insurance” as
              a magic substitute for a medical scheme where the law expects scheme membership.
            </p>
          </WarmProse>
        </WarmSection>

        <WarmSection alt narrow>
          <div className={WARM_CARD}>
            <h2 className="mb-3 text-lg font-bold text-shark">Regulatory note</h2>
            <p className={`mb-3 text-xs leading-relaxed ${WARM_META}`}>
              Medical schemes are regulated by the Council for Medical Schemes (CMS). This page summarises general distinctions
              only; it is not a substitute for scheme brochures or insurer policy books. FSP 17273 for intermediary services
              within our licence categories.{" "}
              <Link href="/regulatory-compliance" className={WARM_LINK}>Disclosures</Link>.
            </p>
            <p className={`text-xs leading-relaxed ${WARM_META}`}>
              Medical scheme broker remuneration is regulated and capped by CMS rules, and is usually paid by the scheme rather
              than as a separate fee added by AS Brokers for scheme placement. We will disclose how we are remunerated before
              you make a decision.
            </p>
          </div>
        </WarmSection>

        <WarmSection narrow>
          <div className="text-center">
            <WarmPrimaryLink href="/contact">Review my medical aid and gap cover</WarmPrimaryLink>
          </div>
        </WarmSection>
      </article>
      <RelatedContent variant="warm" links={getRelatedLinks("/solutions/medical-aid")} />
    </WarmPageWithFooter>
  );
}
