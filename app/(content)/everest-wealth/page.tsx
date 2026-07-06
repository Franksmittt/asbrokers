import { EverestWealthPageView } from "@/components/everest-wealth/EverestWealthPageView";
import { HubLcpPreload } from "@/components/seo/HubLcpPreload";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { HUB_LCP_IMAGES } from "@/lib/hub-lcp";
import { buildPageMetadata, buildPageTitle } from "@/lib/seo-metadata";

const PAGE_TITLE = "Investments & Everest Wealth | Smarter Investing for Every Stage";
const PAGE_DESCRIPTION =
  "Everest Wealth and independent investment advice for South Africans. Strategic Income, Onyx Income+, Strategic Growth, and Amethyst Living Annuity. FSP 17273.";

const everestWealthFAQs = [
  {
    question: "How are Everest Wealth returns taxed compared to interest?",
    answer:
      "Returns from Everest Wealth unlisted preference shares are distributed as dividends and subject to a flat 20% Dividends Withholding Tax (DWT) at source. Interest income and salary are taxed at your marginal income tax rate, which can be up to 45%. For high earners, the 20% DWT can preserve significantly more of your yield than marginal tax on interest.",
  },
  {
    question: "What is the minimum investment for Everest voluntary products?",
    answer:
      "Participation in the Strategic Growth, Strategic Income, or Onyx Income+ portfolios requires a minimum lump-sum investment of R100,000. This threshold is set by the product issuer and is enforced for all investors.",
  },
  {
    question: "Can I withdraw my capital early from Everest voluntary products?",
    answer:
      "Everest Wealth voluntary capital products are illiquid. Redemptions are not an automatic investor right and are subject to the discretion of the security issuer. If an exceptional early withdrawal is approved, you must give a 120-day notice period. An early exit penalty of up to 15% of the capital amount may be applied to protect the fund and remaining shareholders.",
  },
  {
    question: "Why is there a 120-day notice and 15% early exit penalty?",
    answer:
      "Unlisted private equity is illiquid by nature. The 120-day notice and potential 15% early exit penalty protect the underlying assets and remaining investors from sudden liquidity demands. They are disclosed in the product terms and form part of the structural risk of these alternative investments.",
  },
];

export const metadata = buildPageMetadata({
  path: "/everest-wealth",
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
});

export default function EverestWealthPage() {
  return (
    <>
      <HubLcpPreload src={HUB_LCP_IMAGES["/everest-wealth"]} variant="split" />
      <PageJsonLd
        path="/everest-wealth"
        webPage={{ name: buildPageTitle(PAGE_TITLE), description: PAGE_DESCRIPTION }}
        faqs={everestWealthFAQs}
      />
      <EverestWealthPageView faqs={everestWealthFAQs} />
    </>
  );
}
