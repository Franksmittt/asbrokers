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

/** Above-fold home hero: brand + factual education path + contact. */
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
            AS Brokers CC · Authorised FSP 17273 · Category 1.8
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl leading-[1.08]">
            Independent financial education
            <br />
            and advice services
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg md:text-xl">
            Use educational calculators to explore retirement and capital questions, then contact an
            authorised representative of AS Brokers CC in Krugersdorp when you want a personal needs
            analysis. Website content is factual information, not a product recommendation.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href={calculatorPagePath("asset-002-retirement-reality-check")}
              prefetch={false}
              className="inline-flex items-center gap-2 rounded-2xl bg-[#006B6B] px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:bg-[#005858]"
            >
              Open Retirement Reality Check
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
              Or request a needs analysis online
            </Link>
          </p>
          <p className="mt-5 text-xs leading-relaxed text-white/70">
            Calculators and page content are illustrative and educational only under the FAIS Act.
            They do not assess your full circumstances or constitute personal financial advice.
          </p>
        </div>
      </div>
    </section>
  );
}
