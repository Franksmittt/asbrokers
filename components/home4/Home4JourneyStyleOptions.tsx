import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import { Home4Reveal, Home4SectionHeader, HOME4_WRAP } from "@/components/home4/Home4Blocks";
import type { FunnelStage } from "@/lib/home4-journey";
import { getAlt } from "@/lib/image-alt";

const JOURNEY_IMAGES: Record<string, string> = {
  "01": "/images/insights-inset-1x1.jpg",
  "02": "/images/calculators-hub-16x9.jpg",
  "03": "/images/about-krugersdorp-trust-16x9.jpg",
  "04": "/images/contact-trust.jpg",
};

function OptionLabel({ letter, name }: { letter: string; name: string }) {
  return (
    <div className="mb-6 flex flex-wrap items-center gap-3">
      <span className="inline-flex items-center rounded-md bg-shark px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-white">
        Option {letter}
      </span>
      <span className="text-sm font-medium text-stone-500">{name}</span>
    </div>
  );
}

/** Option A — photo-led steps. Real images, no icon boxes, no connector lines. */
export function JourneyOptionA({ stages }: { stages: FunnelStage[] }) {
  return (
    <div>
      <OptionLabel letter="A" name="Photo steps" />
      <Home4SectionHeader
        kicker="Your journey"
        title="Start your journey"
        description="Move from curiosity to clarity: education first, advice when you're ready."
      />
      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {stages.map((stage, index) => (
          <Home4Reveal key={`a-${stage.step}`} delay={index * 0.05}>
            <Link
              href={stage.href}
              prefetch={false}
              className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-samsung-blue focus-visible:ring-offset-2"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={JOURNEY_IMAGES[stage.step] ?? "/images/insights-inset-1x1.jpg"}
                  alt={getAlt(JOURNEY_IMAGES[stage.step] ?? "", stage.title)}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-700 ease-apple group-hover:scale-[1.03]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">
                Step {stage.step}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-shark">{stage.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">{stage.description}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-samsung-blue">
                {stage.cta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </span>
            </Link>
          </Home4Reveal>
        ))}
      </div>
    </div>
  );
}

/** Option B — editorial timeline. Typography-first, one vertical story on mobile, clean row on desktop. */
export function JourneyOptionB({ stages }: { stages: FunnelStage[] }) {
  return (
    <div>
      <OptionLabel letter="B" name="Editorial timeline" />
      <Home4SectionHeader
        kicker="Your journey"
        title="Start your journey"
        description="Move from curiosity to clarity: education first, advice when you're ready."
      />
      <ol className="mt-12 list-none space-y-0 border-t border-stone-300">
        {stages.map((stage, index) => (
          <li key={`b-${stage.step}`} className="border-b border-stone-300">
            <Home4Reveal delay={index * 0.04}>
              <Link
                href={stage.href}
                prefetch={false}
                className="group grid gap-3 py-7 transition-colors hover:bg-white/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-samsung-blue focus-visible:ring-offset-2 sm:grid-cols-[5.5rem_1fr_auto] sm:items-baseline sm:gap-8 sm:py-8"
              >
                <span className="font-serif text-3xl tracking-tight text-stone-300 sm:text-4xl" aria-hidden>
                  {stage.step}
                </span>
                <div>
                  <h3 className="text-xl font-semibold tracking-tight text-shark">{stage.title}</h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-stone-600 sm:text-base">
                    {stage.description}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-samsung-blue sm:justify-self-end">
                  {stage.cta}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </span>
              </Link>
            </Home4Reveal>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Option C — magazine split. One hero image + stacked text steps beside it. */
export function JourneyOptionC({ stages }: { stages: FunnelStage[] }) {
  return (
    <div>
      <OptionLabel letter="C" name="Magazine split" />
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-14">
        <Home4Reveal>
          <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[5/6] lg:aspect-auto lg:min-h-[34rem]">
            <Image
              src="/images/home4-why-independence-4x3.jpg"
              alt={getAlt(
                "/images/home4-why-independence-4x3.jpg",
                "Independent adviser guiding a client through their financial journey"
              )}
              fill
              unoptimized
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </Home4Reveal>

        <div>
          <Home4SectionHeader
            kicker="Your journey"
            title="Start your journey"
            description="Move from curiosity to clarity: education first, advice when you're ready."
          />
          <ol className="mt-10 list-none space-y-8">
            {stages.map((stage, index) => (
              <li key={`c-${stage.step}`}>
                <Home4Reveal delay={index * 0.05}>
                  <Link
                    href={stage.href}
                    prefetch={false}
                    className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-samsung-blue focus-visible:ring-offset-2"
                  >
                    <div className="flex items-baseline gap-4">
                      <span className="text-xs font-bold uppercase tracking-[0.18em] text-cinematic-teal">
                        {stage.step}
                      </span>
                      <h3 className="text-lg font-semibold text-shark sm:text-xl">{stage.title}</h3>
                    </div>
                    <p className="mt-2 pl-12 text-sm leading-relaxed text-stone-600 sm:text-[15px]">
                      {stage.description}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1.5 pl-12 text-sm font-semibold text-samsung-blue">
                      {stage.cta}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                    </span>
                  </Link>
                </Home4Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

/** Temporary comparison block — pick A/B/C, then we delete the rest. */
export function Home4JourneyStyleOptions({ stages }: { stages: FunnelStage[] }) {
  return (
    <section
      data-chunk-boundary="true"
      className="border-y border-amber-300/60 bg-amber-50/40 py-16 md:py-24"
      aria-label="Journey style options for review"
    >
      <div className={HOME4_WRAP}>
        <div className="mb-14 max-w-3xl rounded-2xl border border-amber-400/40 bg-amber-100/70 px-5 py-4 text-sm text-amber-950 sm:px-6">
          <p className="font-semibold">Review only — three journey styles</p>
          <p className="mt-1 text-amber-900/90">
            Tell us which option you like (A, B, or C). We will keep that one and remove the others.
          </p>
        </div>

        <div className="space-y-24 md:space-y-28">
          <div className="rounded-3xl bg-warm-canvas p-6 ring-1 ring-stone-200/80 sm:p-8 md:p-10">
            <JourneyOptionA stages={stages} />
          </div>
          <div className="rounded-3xl bg-warm-canvas p-6 ring-1 ring-stone-200/80 sm:p-8 md:p-10">
            <JourneyOptionB stages={stages} />
          </div>
          <div className="rounded-3xl bg-warm-canvas p-6 ring-1 ring-stone-200/80 sm:p-8 md:p-10">
            <JourneyOptionC stages={stages} />
          </div>
        </div>
      </div>
    </section>
  );
}
