import Link from "next/link";
import Image from "next/image";
import { HOME4_WRAP } from "@/components/home4/Home4Blocks";
import { ArrowRight } from "@/components/icons";
import { getAlt } from "@/lib/image-alt";
import { HUB_HERO_SIZES } from "@/lib/hub-lcp";
import {
  OFFICE_PHONE_DISPLAY,
  OFFICE_PHONE_TEL_HREF,
} from "@/lib/office-phone";
import {
  WHATSAPP_DISPLAY,
  whatsappUrl,
  WHATSAPP_BUSINESS_INSURANCE_MESSAGE,
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
            Independent business insurance brokers in Krugersdorp · FSP 17273 · Since 1998
          </p>
          {/* Keep whitespace before <br/> so textContent matches SSR text (WRS h1 parity test). */}
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl leading-[1.08]">
            Your business carries risks{" "}
            <br className="hidden sm:block" />
            you can&rsquo;t see. We find them{" "}
            <br className="hidden sm:block" />
            before a claim does.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg md:text-xl">
            AS Brokers is an independent Category 1.8 broker based on Commissioner Street,
            Krugersdorp. We survey the commercial market, including Santam, Bryte, King Price, and
            others, run a proper needs analysis, place structured cover, and stand with you at every
            claim and annual review.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#home-callback"
              className="inline-flex items-center gap-2 rounded-2xl bg-[#006B6B] px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:bg-[#005858]"
            >
              Request a same-day callback
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
            <a
              href={whatsappUrl(WHATSAPP_BUSINESS_INSURANCE_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl bg-white/95 px-6 py-3.5 text-sm font-semibold text-shark transition hover:bg-white"
            >
              WhatsApp {WHATSAPP_DISPLAY}
            </a>
          </div>
          <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-semibold text-white/85">
            <a
              href={OFFICE_PHONE_TEL_HREF}
              className="underline-offset-4 hover:text-white hover:underline"
            >
              Office {OFFICE_PHONE_DISPLAY}
            </a>
            <Link
              href="/business-risk-review"
              prefetch={false}
              className="underline-offset-4 hover:text-white hover:underline"
            >
              Or start a free cover review
            </Link>
            <Link
              href="/besigheidsversekering-krugersdorp"
              prefetch={false}
              className="underline-offset-4 hover:text-white hover:underline"
            >
              Afrikaans · Krugersdorp
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
