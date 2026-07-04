import Link from "next/link";
import { AmethystAnnuityCalculator } from "@/components/AmethystAnnuityCalculator";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { WarmHero, WarmPageWithFooter, WarmPrimaryLink, WarmSection } from "@/components/warm/WarmShell";
import { getPrimaryPageImage } from "@/lib/primary-page-images";
import { buildPageMetadata } from "@/lib/seo-metadata";
import { WARM_BODY, WARM_CARD, WARM_H2, WARM_LINK } from "@/lib/warm-theme";

const PAGE_TITLE = "Amethyst Living Annuity | Targeted 10.2% Retirement Income";
const PAGE_DESCRIPTION =
  "Amethyst Living Annuity for pension, provident, preservation and RA funds. Drawdown 2.5%–17.5%. Non-Regulation 28. Tax-sheltered growth. SARS 2026/27 estimate for 65+.";

export const metadata = buildPageMetadata({
  path: "/everest-amethyst-living-annuity",
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
});

const amethystFAQs = [
  {
    question: "Is the Amethyst Living Annuity subject to Regulation 28?",
    answer:
      "The Amethyst Living Annuity is governed by the Long-term Insurance Act and FSCA regulations applicable to living annuities. It is not restricted by Regulation 28 of the Pension Funds Act (which applies to pension and RA funds before retirement). This allows greater investment flexibility, including exposure to the structured return profile that targets around 10.2% net per annum.",
  },
  {
    question: "What drawdown rates can I choose?",
    answer:
      "Pension fund rules for living annuities allow an annual drawdown of between 2.5% and 17.5% of the capital value. You can select a rate within this range to match your income needs. The Amethyst product targets a structured net return of approximately 10.2% per year; if your drawdown is below the return, capital can be preserved or grow.",
  },
  {
    question: "How is tax applied to the Amethyst Living Annuity?",
    answer:
      "Growth inside the annuity is tax-free. Only the income you draw down is taxed at your marginal income tax rate (e.g. under SARS 2026/27 tables). This is different from interest or rental income outside an annuity wrapper, which are fully taxable at your marginal rate.",
  },
];

export default function AmethystAnnuityPage() {
  const heroImage =
    getPrimaryPageImage("/everest-amethyst-living-annuity") ?? "/images/living-annuity-inset-1x1.jpg";

  return (
    <WarmPageWithFooter>
      <PageJsonLd
        path="/everest-amethyst-living-annuity"
        webPage={{ name: PAGE_TITLE, description: PAGE_DESCRIPTION }}
        faqs={amethystFAQs}
      />
      <WarmHero
        kicker="Phase 3: Retirement Liquidity Architecture"
        title="Insulated Retirement: The Amethyst Living Annuity"
        description="Transfer your Pension, Provident, or Retirement Annuity into a structured return profile. Model targeted income (~10.2% net) and a 9% capital maturity bonus while understanding liquidity, tax, and product risks."
        imageSrc={heroImage}
        maxWidth="4xl"
      />

      <WarmSection>
        <div className={`${WARM_CARD} overflow-hidden p-0`}>
          <AmethystAnnuityCalculator />
        </div>
      </WarmSection>

      <WarmSection alt>
        <div className="grid gap-6 md:grid-cols-2">
          <div className={WARM_CARD}>
            <h2 className={WARM_H2}>The Yield Architecture</h2>
            <p className={`mt-4 ${WARM_BODY}`}>
              The Amethyst targets a structured net return of{" "}
              <span className="font-bold text-cinematic-teal">~10.2%</span> per year, with a{" "}
              <span className="font-bold text-cinematic-teal">9%</span> capital maturity bonus after five years. Returns are not guaranteed and should be assessed with the full product disclosure pack.
            </p>
            <p className="mt-3 text-xs leading-relaxed text-stone-500">
              Income tax is calculated based on standard SARS drawdown tables.
            </p>
          </div>
          <div className={WARM_CARD}>
            <h2 className={WARM_H2}>Strategic Deployment</h2>
            <p className={`mt-4 ${WARM_BODY}`}>
              For retirees seeking a structured alternative to daily market volatility: zero ongoing fund-switching fees, no performance monitoring, and a defined product framework. Your income and capital growth must still be reviewed against your drawdown, liquidity, and tax needs.
            </p>
          </div>
        </div>
      </WarmSection>

      <WarmSection>
        <div className={`${WARM_CARD} text-center ring-samsung-blue/20`}>
          <WarmPrimaryLink href="/contact" className="w-full sm:w-auto">
            Initiate Section 14 Pension Transfer Review →
          </WarmPrimaryLink>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-stone-500">
          <a href="https://wa.me/27662276044" target="_blank" rel="noopener noreferrer" className="hover:text-shark">
            WhatsApp +27 66 227 6044
          </a>
          <Link href="/everest-wealth" className={WARM_LINK}>
            Investment options
          </Link>
          <Link href="/contact" className={WARM_LINK}>
            Contact
          </Link>
        </div>
      </WarmSection>
    </WarmPageWithFooter>
  );
}
