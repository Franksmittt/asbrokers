import Link from "next/link";
import { RetirementShortfallCalculator } from "@/components/RetirementShortfallCalculator";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { WarmHero, WarmPageWithFooter, WarmPrimaryLink, WarmSecondaryLink, WarmSection } from "@/components/warm/WarmShell";
import { getPrimaryPageImage } from "@/lib/primary-page-images";
import { buildPageMetadata } from "@/lib/seo-metadata";
import { WARM_CARD } from "@/lib/warm-theme";

const PAGE_TITLE = "Retirement Readiness Calculator | Gap & Contribution Planning";
const PAGE_DESCRIPTION =
  "Estimate your retirement capital shortfall, projected savings, and monthly contribution required. Educational retirement readiness tool for South Africans. FSP 17273.";

const readinessFAQs = [
  {
    question: "What is the Retirement Readiness Calculator?",
    answer:
      "It compares the retirement capital you may need against the projected value of your current savings, estimates any shortfall, and illustrates a starting monthly contribution that could help close the gap.",
  },
  {
    question: "How is this different from the Retirement Reality Calculator?",
    answer:
      "Retirement Reality estimates the lump sum required at retirement to fund income for life. Retirement Readiness adds your current savings and contribution path to show whether you are on track and what gap remains.",
  },
];

export const metadata = buildPageMetadata({
  path: "/retirement-readiness",
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
});

export default function RetirementReadinessPage() {
  const heroImage = getPrimaryPageImage("/retirement-readiness") ?? "/images/living-annuity-inset-1x1.jpg";

  return (
    <WarmPageWithFooter>
      <PageJsonLd path="/retirement-readiness" webPage={{ name: PAGE_TITLE, description: PAGE_DESCRIPTION }} faqs={readinessFAQs} />

      <WarmHero
        kicker="Retirement Planning"
        title="Retirement Readiness Calculator"
        description="Are you on track? Compare required retirement capital against projected savings, see your gap, and explore what a starting contribution might look like."
        imageSrc={heroImage}
        maxWidth="4xl"
      />

      <WarmSection>
        <div id="calculator" className={`scroll-mt-24 ${WARM_CARD} overflow-hidden p-0`}>
          <RetirementShortfallCalculator />
        </div>
      </WarmSection>

      <WarmSection alt>
        <div className="flex max-w-4xl flex-wrap gap-3">
          <WarmSecondaryLink href="/retirement">Retirement Reality Calculator</WarmSecondaryLink>
          <WarmSecondaryLink href="/calculators">All calculators</WarmSecondaryLink>
          <WarmPrimaryLink href="/contact">Speak to AS Brokers</WarmPrimaryLink>
        </div>
      </WarmSection>
    </WarmPageWithFooter>
  );
}
