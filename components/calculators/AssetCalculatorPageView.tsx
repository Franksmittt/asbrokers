import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { CalculatorToolPanel } from "@/components/calculators/CalculatorToolPanel";
import { RelatedContent } from "@/components/seo/RelatedContent";
import { VisibleFaqSection } from "@/components/seo/VisibleFaqSection";
import { getRelatedLinks } from "@/lib/related-content";
import type { CalculatorPageConfig } from "@/lib/calculators/page-configs";
import { HOME4_WRAP } from "@/components/home4/Home4Blocks";
import { ArrowRight, ChevronRight } from "@/components/icons";
import { getAlt } from "@/lib/image-alt";
import {
  HUB_TEAL as TEAL,
  HUB_CANVAS as CANVAS,
  HUB_INK as INK,
  HUB_BODY as BODY,
} from "@/lib/hub-design-tokens";
import { CALC_SPLIT_HERO_QUALITY, CALC_SPLIT_HERO_SIZES } from "@/lib/hub-lcp";
import { WHATSAPP_DISPLAY, whatsappUrl, WHATSAPP_CALCULATOR_MESSAGE } from "@/lib/whatsapp";

const GRID = `${HOME4_WRAP} grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8`;

export function AssetCalculatorPageView({
  path,
  assetCode,
  kicker,
  heroTitle,
  heroSubtitle,
  heroImage,
  heroImageAlt,
  calculatorSrc,
  calculatorTitle,
  calculatorLead,
  sidePanelTitle,
  sidePanelParagraphs,
  sidePanelBullets,
  fiduciaryNotes = [],
  howToSteps,
  readingSections,
  faqs,
  categoryLabel,
  categoryHref,
  contextBox,
  heroCta,
  resultGuide,
  practicalWays,
  methodSection,
  assessmentSection,
  journey,
  terminalCta,
  terminalOptions,
}: CalculatorPageConfig) {
  const relatedLinks = getRelatedLinks(path);
  const heroPrimaryHref = heroCta?.primaryHref ?? "#calculator-tool";
  const heroPrimaryLabel = heroCta?.primaryLabel ?? "Use the calculator";

  return (
    <>
      <header
        data-chunk-boundary="true"
        className="border-b border-stone-200/80 pb-12 pt-28 md:pb-16 md:pt-36 lg:pb-20 lg:pt-40"
        style={{ backgroundColor: CANVAS }}
      >
        <div className={HOME4_WRAP}>
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex flex-wrap items-center gap-1 text-sm text-stone-500"
          >
            <Link href="/calculators" prefetch={false} className="font-medium hover:text-samsung-blue">
              Retirement Gap Toolkit™
            </Link>
            <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-50" aria-hidden />
            <Link href={categoryHref} prefetch={false} className="font-medium hover:text-samsung-blue">
              {categoryLabel}
            </Link>
            <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-50" aria-hidden />
            <span className="text-stone-700">{calculatorTitle}</span>
          </nav>

          {/* Uniform equal-height hero: text column defines height; image stretches to match. */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start lg:gap-10 xl:items-stretch">
            <div className="flex min-w-0 flex-col justify-center">
              <p
                className="font-semibold uppercase tracking-[0.12em] sm:tracking-[0.18em]"
                style={{ fontSize: "clamp(0.6875rem, 0.62rem + 0.25vw, 0.75rem)", color: TEAL }}
              >
                AS Brokers · {assetCode} · FSP 17273
              </p>
              <p className="mt-2 text-sm font-medium text-stone-600">{kicker}</p>
              <h1
                className="mt-3 font-bold tracking-tight"
                style={{
                  fontSize: "clamp(1.875rem, 1.35rem + 2vw, 2.75rem)",
                  lineHeight: 1.12,
                  color: INK,
                }}
              >
                {heroTitle}
              </h1>
              <p
                className="mt-5 max-w-xl leading-relaxed"
                style={{
                  fontSize: "clamp(1.0625rem, 1rem + 0.2vw, 1.1875rem)",
                  lineHeight: 1.65,
                  color: BODY,
                }}
              >
                {heroSubtitle}
              </p>
              <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6">
                <Link
                  href={heroPrimaryHref}
                  prefetch={false}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-samsung-blue px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-cta-glow-blue transition hover:bg-[#004a9e]"
                >
                  {heroPrimaryLabel}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
                {heroCta?.secondaryLabel && heroCta.secondaryHref ? (
                  <Link
                    href={heroCta.secondaryHref}
                    prefetch={false}
                    className="inline-flex items-center gap-2 text-sm font-semibold hover:opacity-80"
                    style={{ color: TEAL }}
                  >
                    {heroCta.secondaryLabel}
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                ) : null}
              </div>
            </div>

            <div className="relative aspect-[4/3] h-full w-full overflow-hidden rounded-2xl shadow-[0_16px_48px_rgba(29,29,31,0.1)] ring-1 ring-stone-300/70 xl:aspect-auto xl:min-h-[22rem]">
              <Image
                src={heroImage}
                alt={getAlt(heroImage, heroImageAlt)}
                fill
                quality={CALC_SPLIT_HERO_QUALITY}
                priority
                fetchPriority="high"
                // Site-wide images.unoptimized — calc-lcp WebPs are pre-sized ~400×300.
                unoptimized
                className="object-cover object-center"
                sizes={CALC_SPLIT_HERO_SIZES}
              />
            </div>
          </div>
        </div>
      </header>

      {contextBox ? (
        <section
          data-chunk-boundary="true"
          className="border-b border-stone-200/80 py-12 md:py-16"
          style={{ backgroundColor: "#FDFCFA" }}
          aria-labelledby={`${path}-context-heading`}
        >
          <div className={HOME4_WRAP}>
            <div className="max-w-3xl rounded-2xl bg-white p-6 ring-1 ring-stone-200/90 sm:p-8">
              <h2
                id={`${path}-context-heading`}
                className="font-bold tracking-tight"
                style={{ fontSize: "clamp(1.25rem, 1.1rem + 0.5vw, 1.5rem)", color: INK }}
              >
                {contextBox.heading}
              </h2>
              <div className="mt-4 space-y-4">
                {contextBox.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 48)}
                    className="leading-relaxed"
                    style={{ fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)", color: BODY }}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
              {contextBox.highlightQuestion ? (
                <p
                  className="mt-5 font-serif text-lg font-semibold tracking-tight sm:text-xl"
                  style={{ color: TEAL }}
                >
                  {contextBox.highlightQuestion}
                </p>
              ) : null}
              <p className="mt-6 text-sm leading-relaxed text-stone-600">
                Part of the{" "}
                <Link href="/calculators" prefetch={false} className="font-semibold hover:underline" style={{ color: TEAL }}>
                  Retirement Gap Toolkit™
                </Link>
                . After you run the numbers, continue with the{" "}
                <Link
                  href="/retirement-gap-method"
                  prefetch={false}
                  className="font-semibold hover:underline"
                  style={{ color: TEAL }}
                >
                  Retirement Gap Method™
                </Link>
                .
              </p>
            </div>
          </div>
        </section>
      ) : null}

      <section
        data-chunk-boundary="true"
        className="border-b border-stone-200/80 py-12 md:py-16"
        style={{ backgroundColor: contextBox ? CANVAS : "#FDFCFA" }}
      >
        <div className={HOME4_WRAP}>
          <h2
            className="font-bold tracking-tight"
            style={{ fontSize: "clamp(1.25rem, 1.1rem + 0.5vw, 1.5rem)", color: INK }}
          >
            How to use this calculator
          </h2>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-stone-600">
            Work through the steps below, then open the tool. Results are illustrative. Book FSP 17273 advice
            when you want numbers tailored to your situation.
          </p>
          <ol className="mt-10 grid list-none gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:items-stretch">
            {howToSteps.map((step, index) => (
              <li key={step.title} className="flex">
                <div className="flex h-full w-full flex-col rounded-2xl bg-white p-5 ring-1 ring-stone-200/90">
                  <span
                    className="text-xs font-bold uppercase tracking-[0.16em]"
                    style={{ color: TEAL }}
                  >
                    Step {index + 1}
                  </span>
                  <h3 className="mt-2 font-semibold text-shark">{step.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-stone-600">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        id="calculator-tool"
        data-chunk-boundary="true"
        className="scroll-mt-28 border-b border-stone-200/80 py-12 md:py-16 md:scroll-mt-32"
        style={{ backgroundColor: CANVAS }}
        aria-labelledby={`${path}-calculator-heading`}
      >
        <div className={GRID}>
          <div className="min-w-0 lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <h2
                className="font-bold tracking-tight"
                style={{ fontSize: "clamp(1.125rem, 1.05rem + 0.4vw, 1.375rem)", color: INK }}
              >
                {sidePanelTitle}
              </h2>
              {sidePanelParagraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 48)}
                  className="mt-4 leading-relaxed"
                  style={{ fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)", color: BODY }}
                >
                  {paragraph}
                </p>
              ))}
              {sidePanelBullets.length > 0 ? (
                <ul className="mt-5 space-y-2">
                  {sidePanelBullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-2 leading-relaxed text-stone-700"
                      style={{ fontSize: "clamp(0.9375rem, 0.9rem + 0.12vw, 1rem)" }}
                    >
                      <span className="mt-0.5 font-bold" style={{ color: TEAL }} aria-hidden>
                        ·
                      </span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              ) : null}
              {fiduciaryNotes.length > 0 ? (
                <div className="mt-6 rounded-2xl bg-stone-50 p-5 ring-1 ring-stone-200/90">
                  <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">Before you begin</p>
                  <ul className="mt-3 space-y-2">
                    {fiduciaryNotes.map((note) => (
                      <li key={note} className="text-sm leading-relaxed text-stone-600">
                        {note}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>

          <div className="min-w-0 lg:col-span-8">
            <h2 id={`${path}-calculator-heading`} className="text-xl font-bold text-shark sm:text-2xl">
              {calculatorTitle}
            </h2>
            <p className="mt-2 max-w-2xl text-base leading-relaxed text-stone-600">{calculatorLead}</p>
            {/* Calculator engine: iframe embed only — do not alter CalculatorToolPanel or embed HTML. */}
            <CalculatorToolPanel
              calculatorSrc={calculatorSrc}
              calculatorTitle={calculatorTitle}
              calculatorId={assetCode}
              calculatorPath={path}
            />
          </div>
        </div>
      </section>

      {resultGuide ? (
        <section
          data-chunk-boundary="true"
          className="border-b border-stone-200/80 py-12 md:py-16"
          style={{ backgroundColor: "#FDFCFA" }}
          aria-labelledby={`${path}-result-guide-heading`}
        >
          <div className={HOME4_WRAP}>
            <h2
              id={`${path}-result-guide-heading`}
              className="max-w-3xl font-bold tracking-tight"
              style={{ fontSize: "clamp(1.25rem, 1.1rem + 0.5vw, 1.625rem)", color: INK }}
            >
              {resultGuide.heading}
            </h2>
            {resultGuide.intro ? (
              <p
                className="mt-4 max-w-3xl leading-relaxed"
                style={{ fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)", color: BODY }}
              >
                {resultGuide.intro}
              </p>
            ) : null}
            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.12em]" style={{ color: TEAL }}>
              {resultGuide.bandsLead ?? "If your required annual growth rate is:"}
            </p>
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
              {resultGuide.bands.map((band) => (
                <article
                  key={band.label}
                  className="flex h-full flex-col rounded-2xl bg-white p-5 ring-1 ring-stone-200/90 sm:p-6"
                >
                  <h3 className="font-serif text-xl font-semibold tracking-tight" style={{ color: INK }}>
                    {band.label}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-stone-600">{band.description}</p>
                </article>
              ))}
            </div>
            {resultGuide.metricsListed && resultGuide.metricsListed.length > 0 ? (
              <div className="mt-8 max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.12em]" style={{ color: TEAL }}>
                  What the calculator illustrates
                </p>
                <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {resultGuide.metricsListed.map((metric) => (
                    <li key={metric} className="flex items-start gap-2 text-sm leading-relaxed text-stone-600">
                      <span className="mt-0.5 font-bold" style={{ color: TEAL }} aria-hidden>
                        ·
                      </span>
                      {metric}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {resultGuide.footer ? (
              <p className="mt-6 max-w-3xl text-sm leading-relaxed text-stone-600">{resultGuide.footer}</p>
            ) : null}
          </div>
        </section>
      ) : null}

      {readingSections.map((section, index) => (
        <section
          key={section.heading}
          data-chunk-boundary="true"
          className={`border-b border-stone-200/80 py-12 md:py-16 ${index % 2 === 0 ? "bg-[#FDFCFA]" : ""}`}
          style={index % 2 === 1 ? { backgroundColor: CANVAS } : undefined}
        >
          <div className={HOME4_WRAP}>
            <h2
              className="max-w-3xl font-bold tracking-tight"
              style={{ fontSize: "clamp(1.25rem, 1.1rem + 0.5vw, 1.625rem)", color: INK }}
            >
              {section.heading}
            </h2>
            <div className="mt-6 max-w-4xl space-y-4">
              {section.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 48)}
                  className="leading-relaxed"
                  style={{ fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)", color: BODY }}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>
      ))}

      {practicalWays ? (
        <section
          data-chunk-boundary="true"
          className="border-b border-stone-200/80 py-12 md:py-16"
          style={{ backgroundColor: CANVAS }}
          aria-labelledby={`${path}-practical-heading`}
        >
          <div className={HOME4_WRAP}>
            <h2
              id={`${path}-practical-heading`}
              className="max-w-3xl font-bold tracking-tight"
              style={{ fontSize: "clamp(1.25rem, 1.1rem + 0.5vw, 1.625rem)", color: INK }}
            >
              {practicalWays.heading}
            </h2>
            <p
              className="mt-4 max-w-3xl leading-relaxed"
              style={{ fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)", color: BODY }}
            >
              {practicalWays.intro}
            </p>
            <ol className="mt-8 max-w-3xl list-decimal space-y-3 pl-5">
              {practicalWays.items.map((item) => (
                <li
                  key={item}
                  className="leading-relaxed"
                  style={{ fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)", color: BODY }}
                >
                  {item}
                </li>
              ))}
            </ol>
            <p
              className="mt-6 max-w-3xl leading-relaxed"
              style={{ fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)", color: BODY }}
            >
              {practicalWays.closing}
            </p>
            {practicalWays.ctaLabel && practicalWays.ctaHref ? (
              <p className="mt-8">
                <Link
                  href={practicalWays.ctaHref}
                  prefetch={false}
                  className="inline-flex items-center gap-2 rounded-2xl bg-samsung-blue px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#004a9e]"
                >
                  {practicalWays.ctaLabel}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </p>
            ) : null}
          </div>
        </section>
      ) : null}

      {assessmentSection ? (
        <section
          data-chunk-boundary="true"
          className="border-b border-stone-200/80 py-12 md:py-16"
          style={{ backgroundColor: "#FDFCFA" }}
          aria-labelledby={`${path}-assessment-heading`}
        >
          <div className={HOME4_WRAP}>
            <div className="max-w-3xl rounded-2xl bg-white p-6 ring-1 ring-stone-200/90 sm:p-8">
              <h2
                id={`${path}-assessment-heading`}
                className="font-bold tracking-tight"
                style={{ fontSize: "clamp(1.25rem, 1.1rem + 0.5vw, 1.5rem)", color: INK }}
              >
                {assessmentSection.heading}
              </h2>
              <p
                className="mt-4 leading-relaxed"
                style={{ fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)", color: BODY }}
              >
                {assessmentSection.intro}
              </p>
              <ul className="mt-5 space-y-2">
                {assessmentSection.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-start gap-2 leading-relaxed text-stone-700"
                    style={{ fontSize: "clamp(0.9375rem, 0.9rem + 0.12vw, 1rem)" }}
                  >
                    <span className="mt-0.5 font-bold" style={{ color: TEAL }} aria-hidden>
                      ·
                    </span>
                    {bullet}
                  </li>
                ))}
              </ul>
              <p className="mt-8">
                <Link
                  href={assessmentSection.ctaHref}
                  prefetch={false}
                  className="inline-flex items-center gap-2 rounded-2xl bg-samsung-blue px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#004a9e]"
                >
                  {assessmentSection.ctaLabel}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </p>
            </div>
          </div>
        </section>
      ) : null}

      {methodSection ? (
        <section
          data-chunk-boundary="true"
          className="border-b border-stone-200/80 bg-shark py-12 text-white md:py-16"
          aria-labelledby={`${path}-method-heading`}
        >
          <div className={HOME4_WRAP}>
            <h2
              id={`${path}-method-heading`}
              className="max-w-3xl font-bold tracking-tight text-white"
              style={{ fontSize: "clamp(1.25rem, 1.1rem + 0.5vw, 1.625rem)" }}
            >
              {methodSection.heading}
            </h2>
            <div className="mt-6 max-w-3xl space-y-4 text-white/75">
              {methodSection.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 48)}
                  className="leading-relaxed"
                  style={{ fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)" }}
                >
                  {paragraph}
                </p>
              ))}
            </div>
            {methodSection.bullets.length > 0 ? (
              <ul className="mt-6 grid max-w-3xl grid-cols-1 gap-2 sm:grid-cols-2">
                {methodSection.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2 text-sm text-white/80 sm:text-base">
                    <span className="mt-0.5 font-bold text-[#5EEAD4]" aria-hidden>
                      ·
                    </span>
                    {bullet}
                  </li>
                ))}
              </ul>
            ) : null}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href={methodSection.ctaHref}
                prefetch={false}
                className="inline-flex items-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-semibold text-white transition hover:opacity-90"
                style={{ backgroundColor: TEAL }}
              >
                {methodSection.ctaLabel}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                href="/calculators"
                prefetch={false}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#5EEAD4] hover:opacity-80"
              >
                Back to the Retirement Gap Toolkit™
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      {journey ? (
        <section
          data-chunk-boundary="true"
          className="border-b border-stone-200/80 py-12 md:py-16"
          style={{ backgroundColor: "#FDFCFA" }}
          aria-labelledby={`${path}-journey-heading`}
        >
          <div className={HOME4_WRAP}>
            <h2
              id={`${path}-journey-heading`}
              className="max-w-3xl font-bold tracking-tight"
              style={{ fontSize: "clamp(1.25rem, 1.1rem + 0.5vw, 1.625rem)", color: INK }}
            >
              {journey.heading}
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-stone-600">
              Follow a logical learning sequence through the{" "}
              <Link href="/calculators" prefetch={false} className="font-semibold hover:underline" style={{ color: TEAL }}>
                Retirement Gap Toolkit™
              </Link>
              , then the{" "}
              <Link
                href="/retirement-gap-method"
                prefetch={false}
                className="font-semibold hover:underline"
                style={{ color: TEAL }}
              >
                Retirement Gap Method™
              </Link>
              .
            </p>
            <ul className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
              {journey.items.map((item) => (
                <li key={item.href + item.assetCode}>
                  <Link
                    href={item.href}
                    prefetch={false}
                    className="group flex h-full flex-col rounded-2xl bg-white p-5 ring-1 ring-stone-200/90 transition hover:ring-stone-300 sm:p-6"
                  >
                    {item.stepLabel ? (
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-500">
                        {item.stepLabel}
                      </p>
                    ) : null}
                    <p
                      className={`text-[11px] font-semibold uppercase tracking-[0.14em] ${item.stepLabel ? "mt-2" : ""}`}
                      style={{ color: TEAL }}
                    >
                      {item.assetCode}
                    </p>
                    <p className="mt-2 font-serif text-lg font-semibold tracking-tight text-shark sm:text-xl">
                      {item.title}
                    </p>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-stone-600">{item.description}</p>
                    <span
                      className="mt-4 inline-flex items-center gap-2 text-sm font-semibold transition group-hover:opacity-80"
                      style={{ color: TEAL }}
                    >
                      Continue
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <VisibleFaqSection
        faqs={faqs}
        primaryCta={{
          href:
            terminalOptions?.options[0].ctaHref ??
            terminalCta?.primaryHref ??
            "/contact?source=calculator_faq",
          label:
            terminalOptions?.options[0].ctaLabel ?? terminalCta?.primaryLabel ?? "Contact us",
        }}
        secondaryCta={{
          href:
            terminalOptions?.options[1].ctaHref ??
            terminalCta?.secondaryHref ??
            "/retirement-gap-method",
          label:
            terminalOptions?.options[1].ctaLabel ??
            terminalCta?.secondaryLabel ??
            "Retirement Gap Method™",
        }}
      />

      {terminalOptions ? (
        <section className="border-t border-stone-200/80 py-12 md:py-14" style={{ backgroundColor: CANVAS }}>
          <div className={HOME4_WRAP}>
            <h2
              className="text-center font-bold tracking-tight"
              style={{ fontSize: "clamp(1.25rem, 1.1rem + 0.5vw, 1.5rem)", color: INK }}
            >
              {terminalOptions.heading}
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
              {terminalOptions.options.map((option, index) => (
                <article
                  key={option.title}
                  className="flex h-full flex-col rounded-2xl bg-white p-6 ring-1 ring-stone-200/90 sm:p-8"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: TEAL }}>
                    Option {index + 1}
                  </p>
                  <h3 className="mt-3 font-serif text-xl font-semibold tracking-tight text-shark">
                    {option.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-stone-600">{option.description}</p>
                  <p className="mt-6">
                    <Link
                      href={option.ctaHref}
                      prefetch={false}
                      className={
                        index === 0
                          ? "inline-flex items-center gap-2 rounded-2xl bg-samsung-blue px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#004a9e]"
                          : "inline-flex items-center gap-2 text-sm font-semibold hover:opacity-80"
                      }
                      style={index === 0 ? undefined : { color: TEAL }}
                    >
                      {option.ctaLabel}
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className="border-t border-stone-200/80 py-12 md:py-14" style={{ backgroundColor: CANVAS }}>
          <div className={`${HOME4_WRAP} text-center`}>
            <h2
              className="font-bold tracking-tight"
              style={{ fontSize: "clamp(1.25rem, 1.1rem + 0.5vw, 1.5rem)", color: INK }}
            >
              {terminalCta?.heading ?? "Ready for advice built around your numbers?"}
            </h2>
            <p
              className="mx-auto mt-3 max-w-2xl leading-relaxed"
              style={{ fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)", color: BODY }}
            >
              {terminalCta?.body ??
                "Illustrative tools are a starting point, not personalised advice. Speak with an independent FSP 17273 adviser in Krugersdorp when you want clarity on retirement, investments, insurance, or estate planning."}
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                href={terminalCta?.primaryHref ?? "/contact?source=calculator_terminal"}
                prefetch={false}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-samsung-blue px-7 py-3.5 font-semibold text-white shadow-md shadow-cta-glow-blue transition hover:bg-[#004a9e]"
                style={{ fontSize: "clamp(0.9375rem, 0.9rem + 0.12vw, 1rem)" }}
              >
                {terminalCta?.primaryLabel ?? "Contact us"}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              {terminalCta ? (
                <Link
                  href={terminalCta.secondaryHref}
                  prefetch={false}
                  className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3.5 text-sm font-semibold ring-1 ring-stone-200 transition hover:bg-stone-50"
                  style={{ color: INK }}
                >
                  {terminalCta.secondaryLabel}
                </Link>
              ) : (
                <>
                  <a
                    href={whatsappUrl(`${WHATSAPP_CALCULATOR_MESSAGE} Calculator: ${calculatorTitle}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3.5 text-sm font-semibold ring-1 ring-stone-200 transition hover:bg-stone-50"
                    style={{ color: INK }}
                  >
                    WhatsApp {WHATSAPP_DISPLAY}
                  </a>
                  <Link
                    href="/everest-wealth"
                    prefetch={false}
                    className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3.5 text-sm font-semibold ring-1 ring-stone-200 transition hover:bg-stone-50"
                    style={{ color: INK }}
                  >
                    Everest Wealth hub
                  </Link>
                </>
              )}
            </div>
          </div>
        </section>
      )}

      {!journey && relatedLinks.length > 0 ? (
        <RelatedContent variant="warm" links={relatedLinks} />
      ) : null}
      <Footer />
    </>
  );
}
