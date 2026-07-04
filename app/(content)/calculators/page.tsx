import Link from "next/link";
import { Footer } from "@/components/Footer";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { buildPageMetadata } from "@/lib/seo-metadata";

export const metadata = buildPageMetadata({
  path: "/calculators",
  title: "Financial Calculators",
  description:
    "AS Brokers financial calculators are being refreshed. Book a consultation for personalised planning. FSP 17273.",
});

export default function CalculatorsPage() {
  return (
    <>
      <PageJsonLd
        path="/calculators"
        webPage={{
          name: "Financial Calculators | AS Brokers CC",
          description:
            "AS Brokers financial calculators are being refreshed. Book a consultation for personalised planning.",
        }}
      />

      <section className="pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 md:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">Planning tools</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Our calculators are being refreshed.
          </h1>
          <p className="mt-5 text-base leading-relaxed text-stone-600 sm:text-lg">
            We are rebuilding our planning calculators with clearer assumptions and a warmer experience.
            The new AS Brokers calculator library (ASSET 001–017) is available in insights and the team office.
            The public calculator hub will return here soon.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact"
              prefetch={false}
              className="inline-flex items-center justify-center rounded-2xl bg-samsung-blue px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-samsung-blue/20 transition-all duration-300 ease-in-out hover:bg-[#004a9e] hover:shadow-cta-glow-blue"
            >
              Speak with an adviser
            </Link>
            <Link
              href="/insights"
              prefetch={false}
              className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3.5 text-sm font-semibold text-shark ring-1 ring-stone-200 transition-colors duration-300 ease-in-out hover:bg-stone-50"
            >
              Read insights
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
