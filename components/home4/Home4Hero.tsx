import Link from "next/link";
import Image from "next/image";
import { HOME4_WRAP } from "@/components/home4/Home4Blocks";
import { ArrowRight } from "@/components/icons";
import { getAlt } from "@/lib/image-alt";
import { HUB_HERO_SIZES } from "@/lib/hub-lcp";
import { calculatorPagePath } from "@/lib/calculators/page-path";
import {
  WHATSAPP_DISPLAY,
  whatsappUrl,
  WHATSAPP_CAPITAL_ASSESSMENT_MESSAGE,
} from "@/lib/whatsapp";

/** Above-fold home hero: one problem, one primary CTA, WhatsApp as same-day path. */
export function Home4Hero() {
  return (
    <section data-chunk-boundary="true" className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/home-lcp.webp"
          alt={getAlt(
            "/images/home-lcp.webp",
            "South African couple on a sunlit patio, calm retirement and lasting capital"
          )}
          fill
          priority
          fetchPriority="high"
          unoptimized
          className="object-cover"
          sizes={HUB_HERO_SIZES}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-shark/90 via-shark/70 to-shark/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-warm-canvas via-transparent to-shark/25" />
      </div>

      <div className="relative pt-32 pb-40 sm:pt-36 sm:pb-48 md:pt-40 md:pb-56">
        <div className={`${HOME4_WRAP} max-w-3xl`}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/80 sm:text-sm sm:tracking-[0.18em]">
            Independent · FSP 17273 · Category 1.8 · Education before advice
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl leading-[1.08]">
            Will this capital last, and what
            <br />
            income can it support?
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg md:text-xl">
            Run Albert&apos;s Everest income calculator first. Then contact us and speak with an
            independent Category 1.8 adviser in Krugersdorp, not a call centre.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href={calculatorPagePath("asset-010-everest-128-income")}
              prefetch={false}
              className="inline-flex items-center gap-2 rounded-2xl bg-[#006B6B] px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:bg-[#005858]"
            >
              Calculate 12.8% target income
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <a
              href={whatsappUrl(WHATSAPP_CAPITAL_ASSESSMENT_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl bg-white/95 px-6 py-3.5 text-sm font-semibold text-shark transition hover:bg-white"
            >
              WhatsApp {WHATSAPP_DISPLAY}
            </a>
          </div>
          <p className="mt-4">
            <Link
              href="/contact?source=home_hero"
              prefetch={false}
              className="text-sm font-semibold text-white/85 underline-offset-4 hover:text-white hover:underline"
            >
              Or contact us online
            </Link>
          </p>
          <p className="mt-5 text-xs leading-relaxed text-white/70">
            Targeted returns are not guarantees. R100k min · liquidity and DWT constraints apply ·
            educational only under FAIS.
          </p>
        </div>
      </div>
    </section>
  );
}
