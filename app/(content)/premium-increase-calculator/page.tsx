import Link from "next/link";
import { SoloCalculatorPageView } from "@/components/calculators/SoloCalculatorPageView";
import { HubLcpPreload } from "@/components/seo/HubLcpPreload";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { ArrowRight } from "@/components/icons";
import { SOLO_PREMIUM_INCREASE } from "@/lib/solo-calculator-configs";
import { buildPageMetadata, buildPageTitle } from "@/lib/seo-metadata";

const PAGE_TITLE = "Premium Escalation Fiduciary Diagnostic | Life Insurance";
const PAGE_DESCRIPTION =
  "Understand how escalating life insurance premiums may compound over 10–20 years — and when a fiduciary policy review is appropriate.";

const premiumFallback = (
  <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl bg-stone-50 px-6 py-10 text-center ring-1 ring-stone-200/90">
    <p className="text-sm font-semibold uppercase tracking-wide text-cinematic-teal">
      Personalised modelling
    </p>
    <h3 className="mt-3 text-xl font-bold text-[#1D1D1F]">
      Year-by-year premium comparison requires your policy schedule
    </h3>
    <p className="mt-3 max-w-md text-sm leading-relaxed text-stone-600">
      Enter actual premiums from your policy or quote during a fiduciary review — we compare escalating,
      level, and behaviour-linked structures using your real numbers.
    </p>
    <Link
      href="/contact"
      prefetch={false}
      className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-samsung-blue px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-cta-glow-blue hover:bg-[#004a9e]"
    >
      Request a policy review
      <ArrowRight className="h-4 w-4" aria-hidden />
    </Link>
  </div>
);

export const metadata = buildPageMetadata({
  path: "/premium-increase-calculator",
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
});

export default function PremiumIncreaseCalculatorPage() {
  return (
    <>
      <HubLcpPreload src={SOLO_PREMIUM_INCREASE.heroImage} variant="split" />
      <PageJsonLd
        path="/premium-increase-calculator"
        webPage={{ name: buildPageTitle(PAGE_TITLE), description: PAGE_DESCRIPTION }}
      />
      <SoloCalculatorPageView {...SOLO_PREMIUM_INCREASE} fallbackPanel={premiumFallback} />
    </>
  );
}
