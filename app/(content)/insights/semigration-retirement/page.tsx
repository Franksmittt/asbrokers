import Link from "next/link";
import {
  HubContentSection,
  HubSplitHero,
  PageWithFooter,
} from "@/components/hub/HubContentShell";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { getPrimaryPageImage } from "@/lib/primary-page-images";
import { buildPageMetadata } from "@/lib/seo-metadata";

const PAGE_TITLE = "Semigration & Retirement Villages Western Cape";
const PAGE_DESCRIPTION =
  "Semigration and retirement villages Western Cape: financial planning for HNWIs relocating from Gauteng to the coast. Retirement capital, estate planning, and lifestyle transition.";

export const metadata = buildPageMetadata({
  path: "/insights/semigration-retirement",
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
});

export default function SemigrationRetirementPage() {
  const heroImage = getPrimaryPageImage("/insights/semigration-retirement") ?? "/images/home4-why-independence-4x3.jpg";

  return (
    <PageWithFooter>
      <PageJsonLd path="/insights/semigration-retirement" webPage={{ name: PAGE_TITLE, description: PAGE_DESCRIPTION }} />
      <HubSplitHero
        kicker="Insights"
        title="Semigration & Retirement Villages Western Cape"
        description="A significant demographic shift is under way: high-net-worth individuals and families are relocating from Gauteng to the Western Cape (semigration), driven by lifestyle, governance, and energy resilience. That move often involves redeploying capital, downsizing or upgrading property, and rethinking retirement income and estate planning."
        imageSrc={heroImage}
        imageAlt="Semigration and retirement village planning in the Western Cape"
        priority
      />

      <HubContentSection narrow>
        <div className="space-y-8">
          <div className="rounded-3xl bg-white p-6 shadow-xl ring-1 ring-stone-200/90 sm:p-8">
            <h2 className="text-xl font-bold tracking-tight text-[#1D1D1F]">Retirement villages Western Cape</h2>
            <p className="mt-4 leading-relaxed text-[#2B2B2E]">
              Retirement villages and coastal nodes, from Hermanus and George to the Cape Winelands, attract buyers who want security, healthcare access, and community. Financing the move and sustaining income in retirement often requires a clear picture of existing retirement capital, drawdown strategies, and tax-efficient structures such as living annuities.
            </p>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-xl ring-1 ring-stone-200/90 sm:p-8">
            <h2 className="text-xl font-bold tracking-tight text-[#1D1D1F]">Planning for the transition</h2>
            <p className="mt-4 leading-relaxed text-[#2B2B2E]">
              Whether you are considering semigration or already relocating, aligning your retirement capital, estate plan, and income needs with your new lifestyle is essential. We help clients structure drawdown rates, assess targeted-return and living annuity options, and ensure liquidity and tax efficiency through the transition.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/retirement-planning"
              prefetch={false}
              className="inline-flex items-center justify-center rounded-2xl bg-samsung-blue px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-[#004a9e]"
            >
              Retirement planning hub
            </Link>
            <Link
              href="/everest-amethyst-living-annuity"
              prefetch={false}
              className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-stone-800 ring-1 ring-stone-200/90 hover:bg-stone-50"
            >
              Living Annuity Calculator
            </Link>
            <Link
              href="/contact"
              prefetch={false}
              className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-stone-800 ring-1 ring-stone-200/90 hover:bg-stone-50"
            >
              Contact us
            </Link>
          </div>
        </div>
      </HubContentSection>
    </PageWithFooter>
  );
}
