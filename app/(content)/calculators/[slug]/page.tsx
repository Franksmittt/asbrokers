import { notFound } from "next/navigation";
import { AssetCalculatorPageView } from "@/components/calculators/AssetCalculatorPageView";
import { HubLcpPreload } from "@/components/seo/HubLcpPreload";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import {
  CALCULATOR_PAGE_SLUGS,
  getCalculatorPageConfig,
} from "@/lib/calculators/page-configs";
import { buildPageMetadata, buildPageTitle } from "@/lib/seo-metadata";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return CALCULATOR_PAGE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const config = getCalculatorPageConfig(slug);
  if (!config) return {};

  return buildPageMetadata({
    path: config.path,
    title: config.seoTitle,
    description: config.seoDescription,
    keywords: config.keywords,
    /** Shared compressed OG — avoid dynamic /api/og mid-word truncation on tool pages. */
    ogImagePath: "/images/calculators-hub-og.jpg",
  });
}

export default async function CalculatorAssetPage({ params }: Props) {
  const { slug } = await params;
  const config = getCalculatorPageConfig(slug);
  if (!config) notFound();

  return (
    <>
      <HubLcpPreload src={config.heroImage} variant="calc-split" />
      <PageJsonLd
        path={config.path}
        webPage={{
          name: buildPageTitle(config.seoTitle),
          description: config.seoDescription,
        }}
        faqs={config.faqs}
        breadcrumbs={[
          { name: "Retirement Gap Toolkit™", path: "/calculators" },
          { name: config.calculatorTitle, path: config.path },
        ]}
      />
      <AssetCalculatorPageView {...config} />
    </>
  );
}

/** Pre-render all calculator landing pages at build time. */
export const dynamicParams = false;
