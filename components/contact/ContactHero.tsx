import Image from "next/image";
import { HOME4_WRAP } from "@/components/home4/Home4Blocks";
import { getAlt } from "@/lib/image-alt";
import { HUB_CANVAS, HUB_TEAL, HUB_INK, HUB_BODY } from "@/lib/hub-design-tokens";
import { HUB_SPLIT_HERO_SIZES } from "@/lib/hub-lcp";

const GRID = `${HOME4_WRAP} grid grid-cols-12 gap-6 lg:gap-8`;
const HERO_IMAGE = "/images/contact-trust.jpg";

/** Contact split hero — server-rendered for LCP. */
export function ContactHero() {
  return (
    <header
      data-chunk-boundary="true"
      className="pb-12 pt-28 md:pb-16 md:pt-36 lg:pb-20 lg:pt-40"
      style={{ backgroundColor: HUB_CANVAS }}
    >
      <div className={`${GRID} items-center gap-y-8`}>
        <div className="order-1 col-span-12 lg:order-2 lg:col-span-6">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[0_16px_48px_rgba(29,29,31,0.1)] ring-1 ring-stone-300/70">
            <Image
              src={HERO_IMAGE}
              alt={getAlt(
                HERO_IMAGE,
                "Welcoming financial advisory consultation with clients in a bright, professional meeting room"
              )}
              fill
              priority
              fetchPriority="high"
              className="object-cover object-center"
              sizes={HUB_SPLIT_HERO_SIZES}
              quality={70}
            />
          </div>
        </div>

        <div className="order-2 col-span-12 lg:order-1 lg:col-span-6">
          <p
            className="font-semibold uppercase tracking-[0.2em]"
            style={{ fontSize: "clamp(0.6875rem, 0.62rem + 0.25vw, 0.75rem)", color: HUB_TEAL }}
          >
            Contact · Krugersdorp · West Rand
          </p>
          <h1
            className="mt-4 font-bold tracking-tight"
            style={{
              fontSize: "clamp(1.875rem, 1.35rem + 2vw, 2.75rem)",
              lineHeight: 1.12,
              color: HUB_INK,
            }}
          >
            Let&apos;s build your financial future together.
          </h1>
          <p
            className="mt-5 max-w-xl leading-relaxed"
            style={{
              fontSize: "clamp(1.0625rem, 1rem + 0.2vw, 1.1875rem)",
              lineHeight: 1.65,
              color: HUB_BODY,
            }}
          >
            Speak with our independent fiduciary experts about your retirement, investments, insurance, or
            estate planning.
          </p>
        </div>
      </div>
    </header>
  );
}
