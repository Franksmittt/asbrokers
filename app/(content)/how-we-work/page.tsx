import {
  WarmHero,
  WarmPageWithFooter,
  WarmPrimaryLink,
  WarmProse,
  WarmSecondaryLink,
  WarmSection,
} from "@/components/warm/WarmShell";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { getPrimaryPageImage } from "@/lib/primary-page-images";
import { WARM_BODY, WARM_CARD, WARM_H2, WARM_H3, WARM_LEAD } from "@/lib/warm-theme";

const PAGE_TITLE = "How We Work | Structured Financial Advice";
const PAGE_DESCRIPTION =
  "AS Brokers uses a four-step process, diagnose, design, implement, and review, for retirement, risk, and legacy planning. FSP 17273, Krugersdorp.";

const heroImage = getPrimaryPageImage("/how-we-work") ?? "/images/about-fiduciary-plaque-4x3.jpg";

const pillars = [
  {
    title: "Diagnose",
    body: "We start with your current position: retirement runway, tax leakage, estate drag, and insurance gaps. We use calculators to make risk visible before any recommendation.",
  },
  {
    title: "Design",
    body: "We structure a practical plan using the right mix of retirement, protection, and legacy tools. Every recommendation must match your goals, liquidity needs, and timeline.",
  },
  {
    title: "Implement",
    body: "Once agreed, we execute the plan end-to-end: product setup, portfolio allocation, and policy structure. You get a clear implementation path, not theory.",
  },
  {
    title: "Review",
    body: "Financial plans are living systems. We review performance, adjust for life and market changes, and keep your structure aligned with outcomes over time.",
  },
];

const reviewChecks = [
  "Will your retirement income still hold under inflation pressure?",
  "Are tax and estate costs reducing what your family receives?",
  "Is your insurance structure still aligned to your current liabilities?",
  "Are your product choices delivering the role they were selected for?",
];

export default function HowWeWorkPage() {
  return (
    <WarmPageWithFooter>
      <PageJsonLd path="/how-we-work" webPage={{ name: PAGE_TITLE, description: PAGE_DESCRIPTION }} />

      <WarmHero
        kicker="How we work"
        title="Structured Advice. Measurable Outcomes."
        description="Most people get product pitches. We run a repeatable process that diagnoses risk, designs a strategy, implements with precision, and reviews for long-term control."
        imageSrc={heroImage}
        priority
        maxWidth="4xl"
      />

      <WarmSection>
        <div className="mb-10 max-w-3xl">
          <h2 className={`${WARM_H2} mb-3`}>Our four-step client process</h2>
          <p className={WARM_LEAD}>
            The same framework is used across retirement, risk, and legacy work so you always know where you are in the
            journey.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {pillars.map((item) => (
            <article key={item.title} className={WARM_CARD}>
              <h3 className={`${WARM_H3} mb-2`}>{item.title}</h3>
              <p className={WARM_BODY}>{item.body}</p>
            </article>
          ))}
        </div>
      </WarmSection>

      <WarmSection alt>
        <div className="grid items-start gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className={`${WARM_H2} mb-3`}>What we check at every review</h2>
            <p className={WARM_LEAD}>
              Reviews are not admin meetings. They are decision meetings focused on preserving outcomes.
            </p>
          </div>
          <div className="lg:col-span-7">
            <div className={WARM_CARD}>
              <ul className="space-y-3">
                {reviewChecks.map((item) => (
                  <li key={item} className={`flex items-start gap-2 ${WARM_BODY}`}>
                    <span className="mt-0.5 font-semibold text-cinematic-teal">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </WarmSection>

      <WarmSection>
        <div className={`${WARM_CARD} mx-auto max-w-4xl text-center`}>
          <h2 className={`${WARM_H2} mb-3`}>Ready for a structured review?</h2>
          <p className={`mx-auto mb-8 max-w-2xl ${WARM_LEAD}`}>
            Bring your current portfolio, policies, and goals. We will show where the gaps are and what to do next.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <WarmPrimaryLink href="/contact">Book consultation</WarmPrimaryLink>
            <WarmSecondaryLink href="/calculators">Explore calculators</WarmSecondaryLink>
          </div>
        </div>
      </WarmSection>
    </WarmPageWithFooter>
  );
}
