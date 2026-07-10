import Image from "next/image";
import Link from "next/link";
import { HOME4_WRAP } from "@/components/home4/Home4Blocks";
import { getAlt } from "@/lib/image-alt";
import { HUB_HERO_SIZES } from "@/lib/hub-lcp";

/** Above-fold home hero — full-bleed photo, brand-first, no dashboard chrome. */
export function Home4Hero() {
  return (
    <section data-chunk-boundary="true" className="relative min-h-[88vh] overflow-hidden sm:min-h-[92vh]">
      <div className="absolute inset-0">
        <Image
          src="/images/home4-why-independence-4x3.jpg"
          alt={getAlt("/images/home4-why-independence-4x3.jpg", "Relaxed consultation with an independent adviser")}
          fill
          unoptimized
          priority
          fetchPriority="high"
          className="object-cover object-[center_30%]"
          sizes={HUB_HERO_SIZES}
        />
        {/* Single soft scrim for type — no stacked muddy gradients */}
        <div className="absolute inset-0 bg-shark/55" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-warm-canvas to-transparent" />
      </div>

      <div className="relative flex min-h-[88vh] flex-col justify-end pb-16 pt-32 sm:min-h-[92vh] sm:pb-20 sm:pt-36 md:pb-24 md:pt-40">
        <div className={`${HOME4_WRAP} max-w-3xl`}>
          <p className="font-serif text-3xl tracking-tight text-white sm:text-4xl md:text-5xl">
            AS Brokers
          </p>
          <h1 className="mt-5 max-w-2xl text-2xl font-semibold tracking-tight text-white/95 sm:text-3xl md:text-4xl md:leading-snug">
            Independent advice for retirement, investments, insurance, and estate planning.
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
            25+ years helping South African families and business owners. FSP 17273, Krugersdorp.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="#home-pathways"
              prefetch={false}
              className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3.5 text-sm font-semibold text-shark transition duration-300 ease-apple hover:bg-white/90"
            >
              Choose what you need
            </Link>
            <Link
              href="/contact"
              prefetch={false}
              className="inline-flex items-center justify-center rounded-2xl border border-white/40 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition duration-300 ease-apple hover:bg-white/20"
            >
              Book a consultation
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
