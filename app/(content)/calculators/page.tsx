import Link from "next/link";
import { Footer } from "@/components/Footer";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { ArrowRight } from "@/components/icons";
import { HOME4_WRAP } from "@/components/home4/Home4Blocks";
import {
  CONTAINMENT_ALLOWED_CALCULATOR_IDS,
  CONTAINMENT_EFFECTIVE_AT,
} from "@/lib/compliance/containment";
import { HUB_DISPLAY_TITLES, HUB_CALCULATOR_PROBLEMS } from "@/lib/calculators/hub-catalog";
import { calculatorPagePath } from "@/lib/calculators/page-path";
import { buildPageMetadata, buildPageTitle } from "@/lib/seo-metadata";
import {
  HUB_TEAL as TEAL,
  HUB_CANVAS as CANVAS,
  HUB_INK as INK,
  HUB_BODY as BODY,
} from "@/lib/hub-design-tokens";

const PAGE_TITLE = "AS Brokers Financial Calculators";
const PAGE_DESCRIPTION =
  "Selected educational calculators from AS Brokers CC (FSP 17273) are available while product-specific tools complete compliance review. Illustrative only.";

export const metadata = buildPageMetadata({
  path: "/calculators",
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    "financial calculators South Africa",
    "retirement planning calculators",
    "AS Brokers FSP 17273",
    "educational calculators",
  ],
});

const available = CONTAINMENT_ALLOWED_CALCULATOR_IDS.map((id) => ({
  id,
  title: HUB_DISPLAY_TITLES[id] ?? id,
  problem: HUB_CALCULATOR_PROBLEMS[id] ?? "",
  href: calculatorPagePath(id),
}));

/**
 * Temporary compliance holding page (containment 2026-07-22).
 * Neutral wording only. No product providers. No urgency or promotional language.
 */
export default function CalculatorsPage() {
  return (
    <>
      <PageJsonLd
        path="/calculators"
        webPage={{
          name: buildPageTitle(PAGE_TITLE),
          description: PAGE_DESCRIPTION,
        }}
      />
      <main>
        <header
          className="border-b border-stone-200/80 pb-12 pt-28 md:pb-16 md:pt-36"
          style={{ backgroundColor: CANVAS }}
        >
          <div className={HOME4_WRAP}>
            <p
              className="text-[11px] font-semibold uppercase tracking-[0.14em]"
              style={{ color: TEAL }}
            >
              AS Brokers CC · FSP 17273
            </p>
            <h1
              className="mt-4 max-w-3xl font-bold tracking-tight"
              style={{ fontSize: "clamp(1.875rem, 1.4rem + 1.8vw, 2.75rem)", color: INK }}
            >
              AS Brokers Financial Calculators
            </h1>
            <div className="mt-6 max-w-3xl space-y-4">
              <p
                className="leading-relaxed"
                style={{ fontSize: "clamp(1.0625rem, 1rem + 0.2vw, 1.1875rem)", color: BODY }}
              >
                Our financial calculators are being reviewed and updated as part of our ongoing
                compliance, accuracy and quality-control process.
              </p>
              <p
                className="leading-relaxed"
                style={{ fontSize: "clamp(1.0625rem, 1rem + 0.2vw, 1.1875rem)", color: BODY }}
              >
                Selected educational calculators remain available. Product-specific calculators and
                comparisons will return once their assumptions, calculations, disclosures and
                supporting information have completed review.
              </p>
              <p
                className="leading-relaxed"
                style={{ fontSize: "clamp(1.0625rem, 1rem + 0.2vw, 1.1875rem)", color: BODY }}
              >
                The calculators provide general illustrations only. They do not consider a user&apos;s
                complete financial circumstances and do not constitute a personal financial
                recommendation.
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <a
                href="#available-educational-calculators"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-samsung-blue px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#004a9e]"
              >
                View Available Educational Calculators
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
              <Link
                href="/contact?source=calculator_holding_assessment"
                prefetch={false}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-sm font-semibold ring-1 ring-stone-200 transition hover:bg-stone-50"
                style={{ color: INK }}
              >
                Request a Personal Financial Assessment
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
            <p className="mt-6 text-xs text-stone-500">
              Containment effective {CONTAINMENT_EFFECTIVE_AT}. Prior page versions retained in the
              compliance control file.
            </p>
          </div>
        </header>

        <section
          id="available-educational-calculators"
          className="scroll-mt-28 border-b border-stone-200/80 py-12 md:py-16"
          style={{ backgroundColor: "#FDFCFA" }}
        >
          <div className={HOME4_WRAP}>
            <h2
              className="font-bold tracking-tight"
              style={{ fontSize: "clamp(1.25rem, 1.1rem + 0.5vw, 1.5rem)", color: INK }}
            >
              Available educational calculators
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-stone-600">
              These tools remain available for general illustration while the broader review
              continues. Each page displays a calculator review notice.
            </p>
            <ul className="mt-8 grid list-none grid-cols-1 gap-4 md:grid-cols-2">
              {available.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    prefetch={false}
                    className="flex h-full flex-col rounded-2xl bg-white p-5 ring-1 ring-stone-200/90 transition hover:ring-stone-300 sm:p-6"
                  >
                    <p className="font-semibold text-shark">{item.title}</p>
                    {item.problem ? (
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-stone-600">{item.problem}</p>
                    ) : null}
                    <span
                      className="mt-4 inline-flex items-center gap-2 text-sm font-semibold"
                      style={{ color: TEAL }}
                    >
                      Open calculator
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
