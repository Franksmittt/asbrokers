import Link from "next/link";
import { Footer } from "@/components/Footer";
import { FinancialFreedomRegisterForm } from "@/components/membership/FinancialFreedomRegisterForm";
import { HOME4_WRAP } from "@/components/home4/Home4Blocks";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { buildPageMetadata, buildPageTitle } from "@/lib/seo-metadata";

const CANVAS = "#F7F6F3";
const INK = "#1D1D1F";
const GOLD = "#D4AF37";

export const metadata = buildPageMetadata({
  path: "/financial-freedom-community/register",
  title: "Register | Financial Freedom Community™",
  description:
    "Register for the Financial Freedom Community™. After signup and payment you unlock the Goal Engineering Planner™ and members learning tools. FSP 17273.",
  keywords: ["Financial Freedom Community register", "Goal Engineering Planner membership"],
  noIndex: true,
});

export default function FinancialFreedomRegisterPage() {
  return (
    <>
      <PageJsonLd
        path="/financial-freedom-community/register"
        webPage={{
          name: buildPageTitle("Register | Financial Freedom Community™"),
          description: "Membership registration for the 12-week Financial Freedom Community™.",
        }}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Financial Freedom Community™", path: "/financial-freedom-community" },
          { name: "Register", path: "/financial-freedom-community/register" },
        ]}
      />
      <main style={{ backgroundColor: CANVAS }} className="overflow-x-clip text-shark">
        <section className="border-b border-stone-200 bg-[#1D1D1F] py-12 text-white md:py-16">
          <div className={HOME4_WRAP}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em]" style={{ color: GOLD }}>
              Step 1 of 2 — Registration
            </p>
            <h1 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
              Create your community registration
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/75">
              Complete your details below. After registration you will continue to payment. Active
              membership unlocks the Goal Engineering Planner™ and the members learning centre.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className={`${HOME4_WRAP} max-w-2xl`}>
            <FinancialFreedomRegisterForm />
            <p className="mt-8 text-sm text-stone-600">
              Already registered?{" "}
              <Link href="/login?next=/calculators/goal-engineering-planner" className="font-semibold text-teal-800">
                Member login
              </Link>
              {" · "}
              <Link href="/financial-freedom-community" className="font-semibold text-teal-800">
                About the community
              </Link>
            </p>
            <p className="mt-4 text-xs leading-relaxed text-stone-500" style={{ color: "#78716c" }}>
              Payment checkout integrates next. Until then, submissions are stored as registration
              interest with status <em>registered_unpaid</em>.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
