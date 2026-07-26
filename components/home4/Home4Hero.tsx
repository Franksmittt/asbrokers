import Link from "next/link";
import Image from "next/image";
import { HOME4_WRAP } from "@/components/home4/Home4Blocks";
import { ArrowRight } from "@/components/icons";
import { getAlt } from "@/lib/image-alt";
import { HUB_HERO_SIZES } from "@/lib/hub-lcp";
import {
  WHATSAPP_DISPLAY,
  whatsappUrl,
  WHATSAPP_CAPITAL_ASSESSMENT_MESSAGE,
} from "@/lib/whatsapp";

/** Above-fold home hero: business-owner positioning + contact. */
export function Home4Hero() {
  return (
    <section data-chunk-boundary="true" className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/home-lcp.webp"
          alt={getAlt(
            "/images/home-lcp.webp",
            "South African business owner reviewing commercial insurance with an independent broker"
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
            Independent insurance broking for business owners · FSP 17273 · Since 1998
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl leading-[1.08]">
            Your business carries risks
            <br />
            you can&rsquo;t see. We find them
            <br />
            before a claim does.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg md:text-xl">
            AS Brokers is an independent Category 1.8 broker serving business owners across Gauteng.
            We survey the commercial market — Santam, Bryte, King Price, and others — run a proper
            needs analysis, place structured cover, and stand with you at every claim and annual
            review.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/business-risk-review"
              prefetch={false}
              className="inline-flex items-center gap-2 rounded-2xl bg-[#006B6B] px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:bg-[#005858]"
            >
              Start a free Business Risk Review
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
        </div>
      </div>
    </section>
  );
}
