import Link from "next/link";
import Image from "next/image";
import { HOME4_WRAP } from "@/components/home4/Home4Blocks";
import { ArrowRight } from "@/components/icons";
import { getAlt } from "@/lib/image-alt";
import { HUB_HERO_SIZES } from "@/lib/hub-lcp";
import { calculatorPagePath } from "@/lib/calculators/page-path";

/** Above-fold home hero — conversion-first: Everest + education, other products still reachable below. */
export function Home4Hero() {
  return (
    <section data-chunk-boundary="true" className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/everest-copper-industrial-4x3.jpg"
          alt={getAlt(
            "/images/everest-copper-industrial-4x3.jpg",
            "Real-economy industrial assets behind structured income education"
          )}
          fill
          unoptimized
          priority
          fetchPriority="high"
          className="object-cover"
          sizes={HUB_HERO_SIZES}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-shark/90 via-shark/70 to-shark/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-warm-canvas via-transparent to-shark/25" />
      </div>

      <div className="relative pt-32 pb-40 sm:pt-36 sm:pb-48 md:pt-40 md:pb-56">
        <div className={`${HOME4_WRAP} max-w-3xl`}>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80 sm:text-sm">
            Independent · FSP 17273 · Category 1.8 · Education before advice
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl leading-[1.08]">
            Structured income education — then advice that fits
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg md:text-xl">
            Run Albert&apos;s ASSET calculators, learn how Everest Wealth preference-share profiles
            work where suitable, and book a capital assessment with an independent Category 1.8
            adviser — not a call centre. Retirement, insurance, medical, and estate stay on the
            table when your problem needs them.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href={calculatorPagePath("asset-010-everest-128-income")}
              prefetch={false}
              className="inline-flex items-center gap-2 rounded-2xl bg-cinematic-teal px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:bg-[#008f8f]"
            >
              Calculate 12.8% target income
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href="/calculators"
              prefetch={false}
              className="inline-flex items-center gap-2 rounded-2xl bg-white/95 px-6 py-3.5 text-sm font-semibold text-shark transition hover:bg-white"
            >
              Open all calculators
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href="/contact?source=home_hero"
              prefetch={false}
              className="inline-flex items-center gap-2 px-2 py-3.5 text-sm font-semibold text-white underline-offset-4 hover:underline"
            >
              Book a capital assessment
            </Link>
          </div>
          <p className="mt-5 text-xs leading-relaxed text-white/70">
            Targeted returns are not guarantees. R100k min · liquidity and DWT constraints apply ·
            educational only under FAIS.
          </p>
        </div>
      </div>
    </section>
  );
}
