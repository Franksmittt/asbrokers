import Link from "next/link";
import { Footer } from "@/components/Footer";
import { HOME4_WRAP } from "@/components/home4/Home4Blocks";
import { ArrowRight, Lock } from "@/components/icons";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { HubLcpPreload } from "@/components/seo/HubLcpPreload";
import { calculatorPagePath } from "@/lib/calculators/page-path";
import { buildPageMetadata, buildPageTitle } from "@/lib/seo-metadata";

const CANVAS = "#F7F6F3";
const INK = "#1D1D1F";
const BODY = "#3f3a36";
const TEAL = "#0F766E";
const GOLD = "#D4AF37";

export const metadata = buildPageMetadata({
  path: "/financial-freedom-community",
  title: "Financial Freedom Community™ | 12-Week Programme",
  description:
    "Join the Financial Freedom Community™ — a 12-week educational programme that unlocks members-only planning tools including the Goal Engineering Planner™. FSP 17273.",
  keywords: [
    "Financial Freedom Community",
    "12-week financial freedom programme",
    "Goal Engineering Planner",
    "Retirement Gap Method",
  ],
});

export default function FinancialFreedomCommunityPage() {
  const plannerHref = calculatorPagePath("asset-017-personal-goal");

  return (
    <>
      <HubLcpPreload src="/images/calc-lcp/asset-017.webp" variant="calc-split" />
      <PageJsonLd
        path="/financial-freedom-community"
        webPage={{
          name: buildPageTitle("Financial Freedom Community™"),
          description:
            "12-week educational programme unlocking members-only Retirement Gap Method™ planning tools.",
        }}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Financial Freedom Community™", path: "/financial-freedom-community" },
        ]}
      />
      <main style={{ backgroundColor: CANVAS }} className="overflow-x-clip text-shark">
        <section className="border-b border-stone-200 bg-[#1D1D1F] py-16 text-white md:py-20">
          <div className={HOME4_WRAP}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em]" style={{ color: GOLD }}>
              Financial Freedom Community™
            </p>
            <h1
              className="mt-4 max-w-3xl font-bold tracking-tight"
              style={{ fontSize: "clamp(1.75rem, 1.4rem + 1.2vw, 2.75rem)" }}
            >
              Education first. Then unlock the planning tools.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
              The 12-week programme builds financial literacy and unlocks proprietary members-area
              tools — including the Goal Engineering Planner™ — after registration and payment.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/financial-freedom-community/register"
                className="inline-flex items-center gap-2 rounded-2xl px-5 py-3.5 text-sm font-bold text-[#1D1D1F]"
                style={{ backgroundColor: GOLD }}
              >
                Start registration
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                href={plannerHref}
                className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-5 py-3.5 text-sm font-semibold text-white ring-1 ring-white/20"
              >
                <Lock className="h-4 w-4" aria-hidden />
                Goal Engineering Planner™
              </Link>
            </div>
          </div>
        </section>

        <section className="border-b border-stone-200 py-14 md:py-16">
          <div className={`${HOME4_WRAP} max-w-3xl`}>
            <h2 className="text-2xl font-bold tracking-tight" style={{ color: INK }}>
              How access works
            </h2>
            <ol className="mt-6 space-y-4 text-base leading-relaxed" style={{ color: BODY }}>
              <li>
                <strong style={{ color: INK }}>1. Register</strong> — name, surname, email, mobile,
                location and goal context.
              </li>
              <li>
                <strong style={{ color: INK }}>2. Pay</strong> — complete programme payment to
                activate membership.
              </li>
              <li>
                <strong style={{ color: INK }}>3. Unlock</strong> — access the Goal Engineering
                Planner™ and members learning centre tools.
              </li>
            </ol>
            <p className="mt-6 text-sm leading-relaxed text-stone-600">
              Prefer personalised advice without the programme?{" "}
              <Link href="/contact?source=retirement_planning_session_ffc" className="font-semibold" style={{ color: TEAL }}>
                Book a Retirement Planning Session
              </Link>
              .
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
