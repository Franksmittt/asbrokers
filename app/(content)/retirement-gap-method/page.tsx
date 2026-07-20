import Link from "next/link";
import { Footer } from "@/components/Footer";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { HOME4_WRAP } from "@/lib/layout-constants";
import { ArrowRight } from "@/components/icons";
import { buildPageMetadata, buildPageTitle } from "@/lib/seo-metadata";

const PAGE_TITLE = "The Retirement Gap Method™ | Coming Soon";
const PAGE_DESCRIPTION =
  "The Retirement Gap Method™ explains how the Toolkit calculators work together. Full educational content for Asset 018 is coming soon.";

const CANVAS = "#F7F6F3";
const INK = "#1D1D1F";
const BODY = "#3f3a36";
const HAIRLINE = "#E5E5E5";
const TEAL = "#0F766E";

export const metadata = buildPageMetadata({
  path: "/retirement-gap-method",
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    "Retirement Gap Method",
    "Retirement Gap Toolkit",
    "retirement education South Africa",
    "AS Brokers FSP 17273",
  ],
});

/**
 * Asset 018 placeholder — full Method content lands when Albert supplies the brief.
 * Keep indexed so Toolkit internal links resolve cleanly.
 */
export default function RetirementGapMethodPlaceholderPage() {
  return (
    <>
      <PageJsonLd
        path="/retirement-gap-method"
        webPage={{
          name: buildPageTitle(PAGE_TITLE),
          description: PAGE_DESCRIPTION,
        }}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "The Retirement Gap Toolkit™", path: "/calculators" },
          { name: "The Retirement Gap Method™", path: "/retirement-gap-method" },
        ]}
      />
      <div style={{ backgroundColor: CANVAS }} className="min-h-[70vh] overflow-x-clip text-shark">
        <header className="border-b pb-14 pt-28 md:pb-20 md:pt-36" style={{ borderColor: HAIRLINE }}>
          <div className={HOME4_WRAP}>
            <p
              className="text-[11px] font-semibold uppercase tracking-[0.14em] sm:text-xs sm:tracking-[0.18em]"
              style={{ color: TEAL }}
            >
              Asset 018 · Coming soon
            </p>
            <h1
              className="mt-5 max-w-3xl font-serif font-semibold tracking-tight text-balance"
              style={{
                fontSize: "clamp(1.875rem, 1.4rem + 2vw, 3rem)",
                lineHeight: 1.15,
                color: INK,
              }}
            >
              The Retirement Gap Method™
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed" style={{ color: BODY }}>
              The Retirement Gap Toolkit™ gives you the numbers. The Retirement Gap Method™ helps
              you understand what those numbers mean—how the calculators fit together, which
              decisions matter most, and how to improve your retirement position.
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed" style={{ color: BODY }}>
              Full educational content for this page is being prepared. In the meantime, explore
              the Toolkit calculators, then book a Retirement Gap Review when you are ready.
            </p>
            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6">
              <Link
                href="/calculators"
                prefetch={false}
                className="inline-flex items-center gap-2 rounded bg-samsung-blue px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#004a9e]"
              >
                Explore the Retirement Gap Toolkit™
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                href="/contact?source=retirement_gap_method"
                prefetch={false}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#006B6B] hover:opacity-80"
              >
                Book a Retirement Gap Review
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>
        </header>

        <section className="py-14 md:py-20" aria-labelledby="method-placeholder-heading">
          <div className={HOME4_WRAP}>
            <h2
              id="method-placeholder-heading"
              className="font-serif text-xl font-semibold tracking-tight sm:text-2xl"
              style={{ color: INK }}
            >
              What you will find here soon
            </h2>
            <ul
              className="mt-6 max-w-2xl list-disc space-y-2 pl-5 text-sm leading-relaxed sm:text-base"
              style={{ color: BODY }}
            >
              <li>How to understand your Retirement Gap.</li>
              <li>How to interpret Toolkit calculator results.</li>
              <li>Common retirement planning mistakes to avoid.</li>
              <li>The financial decisions that matter most.</li>
              <li>Practical next steps—including Workshop and Community pathways.</li>
            </ul>
            <p className="mt-8 text-sm" style={{ color: BODY }}>
              Educational purposes only. This is not personalised financial advice. AS Brokers CC
              (FSP 17273).
            </p>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
