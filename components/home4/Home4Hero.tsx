import Image from "next/image";
import { HOME4_WRAP } from "@/components/home4/Home4Blocks";
import { getAlt } from "@/lib/image-alt";
import { HUB_HERO_SIZES } from "@/lib/hub-lcp";

/** Above-fold home hero — server-rendered for LCP (no client hydration). */
export function Home4Hero() {
  return (
    <section data-chunk-boundary="true" className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/home4-why-independence-4x3.jpg"
          alt={getAlt("/images/home4-why-independence-4x3.jpg", "Relaxed consultation with an independent adviser")}
          fill
          unoptimized
          priority
          fetchPriority="high"
          className="object-cover"
          sizes={HUB_HERO_SIZES}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-shark/85 via-shark/55 to-shark/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-warm-canvas via-transparent to-shark/20" />
      </div>

      <div className="relative pt-32 pb-36 sm:pt-36 sm:pb-44 md:pt-40 md:pb-52">
        <div className={`${HOME4_WRAP} max-w-3xl`}>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80 sm:text-sm">
            Independent · FSP 17273 · Krugersdorp
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl leading-[1.08]">
            What do you need help with today?
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg md:text-xl">
            Independent financial advice, retirement planning, investments, insurance and estate planning
            for South Africans.
          </p>
        </div>
      </div>
    </section>
  );
}
