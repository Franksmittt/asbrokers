import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { CalculatorToolPanel } from "@/components/calculators/CalculatorToolPanel";
import { MembersOnlyCalculatorGate } from "@/components/membership/MembersOnlyCalculatorGate";
import { RelatedContent } from "@/components/seo/RelatedContent";
import { VisibleFaqSection } from "@/components/seo/VisibleFaqSection";
import { getRelatedLinks } from "@/lib/related-content";
import type { CalculatorPageConfig } from "@/lib/calculators/page-configs";
import { createLightSurfaceAssigner } from "@/lib/calculators/section-surface";
import { ContextBoxSection } from "@/components/calculators/ContextBoxSection";
import { PracticalWaysCompare } from "@/components/calculators/PracticalWaysCompare";
import { HOME4_WRAP } from "@/components/home4/Home4Blocks";
import { ArrowRight, ChevronRight, Lock } from "@/components/icons";
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
  decisionQuestion,
  strategyDiagram,
  contextBox,
  audienceGuide,
  assumptionCallout,
  heroCta,
  methodProgress,
  resultGuide,
  withdrawalGuide,
  timelineExample,
  valueProgress,
  lifestyleExample,
  incomeFlow,
  decisionComparison,
  practicalWays,
  methodSection,
  assessmentSection,
  journey,
  terminalCta,
  terminalOptions,
  readingSectionsPlacement = "after-results",
  membersOnly = false,
}: CalculatorPageConfig) {
  const relatedLinks = getRelatedLinks(path);
  const heroPrimaryHref = heroCta?.primaryHref ?? (membersOnly ? "#members-planner" : "#calculator-tool");
  const heroPrimaryLabel = heroCta?.primaryLabel ?? (membersOnly ? "See how to unlock" : "Use the calculator");
  const decisionQuestionPlacement = decisionQuestion?.placement ?? "after-hero";
  const toolSectionId = membersOnly ? "members-planner" : "calculator-tool";
  /** Light banding after the hero (canvas). Prefer cream ↔ canvas; double-light OK after dark chapters. */
  const lightSurface = createLightSurfaceAssigner("cream");
  const decisionQuestionBlock = decisionQuestion ? (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-stretch lg:gap-8">
      <div className="rounded-3xl bg-white px-6 py-6 ring-1 ring-stone-200/90 sm:px-8 sm:py-8 lg:col-span-5">
        <p
          id={`${path}-decision-question-heading`}
          className="text-[11px] font-semibold uppercase tracking-[0.14em]"
          style={{ color: TEAL }}
        >
          {decisionQuestion.label ?? "Decision Question"}
        </p>
        <p
          className="mt-4 font-serif text-xl font-semibold tracking-tight sm:text-2xl"
          style={{ color: INK }}
        >
          {decisionQuestion.question}
        </p>
      </div>
      <div className="flex flex-col justify-center rounded-3xl bg-[#1D1D1F] px-6 py-6 text-white sm:px-8 sm:py-8 lg:col-span-7">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#D4AF37]">
          Use this before you calculate
        </p>
        <p className="mt-3 text-base leading-relaxed text-white/75 sm:text-lg">
          Answer the question honestly first. The calculator then helps you measure the consequence—
          not choose a product.
        </p>
      </div>
    </div>
  ) : null;
  const strategyDiagramBlock = strategyDiagram ? (
    <div className="mt-8 max-w-3xl">
      {strategyDiagram.eyebrow ? (
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: TEAL }}>
          {strategyDiagram.eyebrow}
        </p>
      ) : null}
      <div className={`grid grid-cols-1 gap-4 sm:grid-cols-2 ${strategyDiagram.eyebrow ? "mt-4" : ""}`}>
        {strategyDiagram.branches.map((branch) => (
          <article
            key={branch.question}
            className="rounded-2xl bg-white p-5 text-center ring-1 ring-stone-200/90 sm:p-6"
          >
            <p className="font-semibold text-shark">{branch.question}</p>
            <p className="mt-3 text-lg font-semibold" style={{ color: TEAL }} aria-hidden>
              ↓
            </p>
            <ul className="mt-3 space-y-2">
              {branch.outcomes.map((outcome) => (
                <li key={outcome} className="text-sm leading-relaxed text-stone-600">
                  {outcome}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  ) : null;
  const renderReadingBlock = () =>
    readingSections.map((section) => (
      <section
        key={section.heading}
        data-chunk-boundary="true"
        className="border-b border-stone-200/80 py-12 md:py-16"
        style={lightSurface.next()}
      >
        <div className={HOME4_WRAP}>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
            <h2
              className="font-bold tracking-tight lg:col-span-4"
              style={{ fontSize: "clamp(1.25rem, 1.1rem + 0.5vw, 1.625rem)", color: INK }}
            >
              {section.heading}
            </h2>
            <div className="space-y-4 lg:col-span-8">
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
        </div>
      </section>
    ));

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
              <p className="mt-2 flex flex-wrap items-center gap-2 text-sm font-medium text-stone-600">
                {membersOnly ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1D1D1F] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#D4AF37]">
                    <Lock className="h-3 w-3" aria-hidden />
                    Members only
                  </span>
                ) : null}
                <span>{kicker}</span>
              </p>
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

      {decisionQuestion && decisionQuestionPlacement === "after-hero" ? (
        <section
          data-chunk-boundary="true"
          className="border-b border-stone-200/80 py-8 md:py-10"
          style={lightSurface.next()}
          aria-labelledby={`${path}-decision-question-heading`}
        >
          <div className={HOME4_WRAP}>{decisionQuestionBlock}</div>
        </section>
      ) : null}

      {contextBox ? <ContextBoxSection path={path} contextBox={contextBox} /> : null}

      {audienceGuide ? (
        <section
          data-chunk-boundary="true"
          className="border-b border-stone-200/80 py-12 md:py-16"
          style={lightSurface.next()}
          aria-labelledby={`${path}-audience-heading`}
        >
          <div className={HOME4_WRAP}>
            <h2
              id={`${path}-audience-heading`}
              className="max-w-3xl font-bold tracking-tight"
              style={{ fontSize: "clamp(1.25rem, 1.1rem + 0.5vw, 1.5rem)", color: INK }}
            >
              {audienceGuide.heading}
            </h2>
            {audienceGuide.intro ? (
              <p
                className="mt-4 max-w-3xl leading-relaxed"
                style={{ fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)", color: BODY }}
              >
                {audienceGuide.intro}
              </p>
            ) : null}
            <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {audienceGuide.items.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-2xl bg-white p-4 ring-1 ring-stone-200/90 sm:p-5"
                >
                  <span className="mt-0.5 font-bold" style={{ color: TEAL }} aria-hidden>
                    ✓
                  </span>
                  <span
                    className="leading-relaxed"
                    style={{ fontSize: "clamp(0.9375rem, 0.9rem + 0.12vw, 1rem)", color: BODY }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
            {audienceGuide.examples && audienceGuide.examples.length > 0 ? (
              <div className="mt-10 max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.12em]" style={{ color: TEAL }}>
                  {audienceGuide.examplesHeading ?? "Examples include"}
                </p>
                <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {audienceGuide.examples.map((example) => (
                    <li key={example} className="flex items-start gap-2 text-sm leading-relaxed text-stone-600">
                      <span className="mt-0.5 font-bold" style={{ color: TEAL }} aria-hidden>
                        ·
                      </span>
                      {example}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {audienceGuide.exclusionNote ? (
              <p
                className="mt-8 max-w-3xl leading-relaxed"
                style={{ fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)", color: BODY }}
              >
                {audienceGuide.exclusionNote}
              </p>
            ) : null}
          </div>
        </section>
      ) : null}

      <section
        data-chunk-boundary="true"
        className="border-b border-stone-200/80 py-12 md:py-16"
        style={lightSurface.next()}
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

      {methodProgress ? (
        <section
          data-chunk-boundary="true"
          className="border-b border-stone-200/80 py-10 md:py-12"
          style={lightSurface.next()}
          aria-labelledby={`${path}-method-progress-heading`}
        >
          <div className={HOME4_WRAP}>
            <h2
              id={`${path}-method-progress-heading`}
              className="font-bold tracking-tight"
              style={{ fontSize: "clamp(1.125rem, 1.05rem + 0.35vw, 1.375rem)", color: INK }}
            >
              {methodProgress.heading ?? "Where you are in the Retirement Gap Method™"}
            </h2>
            <ol
              className={`mt-8 grid list-none gap-4 md:items-stretch ${
                methodProgress.steps.length >= 6
                  ? "md:grid-cols-2 xl:grid-cols-3"
                  : methodProgress.steps.length >= 4
                    ? "md:grid-cols-2 xl:grid-cols-4"
                    : "md:grid-cols-3"
              }`}
            >
              {methodProgress.steps.map((step) => {
                const card = (
                  <div
                    className={`flex h-full flex-col rounded-2xl p-5 ring-1 sm:p-6 ${
                      step.current
                        ? "bg-shark text-white ring-shark"
                        : "bg-white ring-stone-200/90"
                    }`}
                  >
                    <p
                      className="text-[11px] font-semibold uppercase tracking-[0.14em]"
                      style={{ color: step.current ? "#5EEAD4" : TEAL }}
                    >
                      {step.completed && !step.current ? "✓ " : ""}
                      {step.stepLabel}
                    </p>
                    <p
                      className={`mt-2 font-serif text-lg font-semibold tracking-tight ${
                        step.current ? "text-white" : "text-shark"
                      }`}
                    >
                      {step.title}
                    </p>
                    <p
                      className={`mt-2 text-sm leading-relaxed ${
                        step.current ? "text-white/70" : "text-stone-600"
                      }`}
                    >
                      {step.description}
                    </p>
                  </div>
                );
                return (
                  <li key={step.stepLabel + step.title} className="flex">
                    {step.href && !step.current ? (
                      <Link href={step.href} prefetch={false} className="flex w-full min-w-0">
                        {card}
                      </Link>
                    ) : (
                      card
                    )}
                  </li>
                );
              })}
            </ol>
          </div>
        </section>
      ) : null}

      {assumptionCallout ? (
        <section
          data-chunk-boundary="true"
          className="border-b border-stone-200/80 py-10 md:py-12"
          style={lightSurface.next()}
          aria-labelledby={`${path}-assumptions-heading`}
        >
          <div className={HOME4_WRAP}>
            <div className="grid grid-cols-1 gap-6 rounded-3xl bg-white p-6 ring-1 ring-stone-200/90 sm:p-8 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-4">
                <h2
                  id={`${path}-assumptions-heading`}
                  className="text-sm font-semibold uppercase tracking-[0.12em]"
                  style={{ color: TEAL }}
                >
                  {assumptionCallout.heading}
                </h2>
              </div>
              <div className="space-y-3 lg:col-span-8">
                {assumptionCallout.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)} className="text-sm leading-relaxed text-stone-600">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {(decisionQuestionPlacement === "before-calculator" && decisionQuestion) || strategyDiagram ? (
        <section
          data-chunk-boundary="true"
          className="border-b border-stone-200/80 py-10 md:py-12"
          style={lightSurface.next()}
          aria-labelledby={
            decisionQuestionPlacement === "before-calculator" && decisionQuestion
              ? `${path}-decision-question-heading`
              : `${path}-strategy-diagram-heading`
          }
        >
          <div className={HOME4_WRAP}>
            {decisionQuestionPlacement === "before-calculator" ? decisionQuestionBlock : null}
            {strategyDiagram?.heading ? (
              <h2
                id={`${path}-strategy-diagram-heading`}
                className={`font-bold tracking-tight ${
                  decisionQuestionPlacement === "before-calculator" && decisionQuestion ? "mt-8" : ""
                }`}
                style={{ fontSize: "clamp(1.125rem, 1.05rem + 0.35vw, 1.375rem)", color: INK }}
              >
                {strategyDiagram.heading}
              </h2>
            ) : strategyDiagram ? (
              <h2 id={`${path}-strategy-diagram-heading`} className="sr-only">
                Strategy overview
              </h2>
            ) : null}
            {strategyDiagramBlock}
          </div>
        </section>
      ) : null}

      <section
        id={toolSectionId}
        data-chunk-boundary="true"
        className="scroll-mt-28 border-b border-stone-200/80 py-12 md:py-16 md:scroll-mt-32"
        style={lightSurface.next()}
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
            {membersOnly ? (
              <MembersOnlyCalculatorGate
                calculatorSrc={calculatorSrc}
                calculatorTitle={calculatorTitle}
                calculatorId={assetCode}
                calculatorPath={path}
              />
            ) : (
              <CalculatorToolPanel
                calculatorSrc={calculatorSrc}
                calculatorTitle={calculatorTitle}
                calculatorId={assetCode}
                calculatorPath={path}
              />
            )}
          </div>
        </div>
      </section>

      {resultGuide ? (
        <section
          data-chunk-boundary="true"
          className="border-b border-stone-200/80 py-12 md:py-16"
          style={lightSurface.next()}
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
            {resultGuide.bands && resultGuide.bands.length > 0 ? (
              <>
                <p className="mt-6 text-sm font-semibold uppercase tracking-[0.12em]" style={{ color: TEAL }}>
                  {resultGuide.bandsLead ?? "If your required annual growth rate is:"}
                </p>
                <div
                  className={`mt-4 grid grid-cols-1 gap-4 ${
                    resultGuide.bands.length >= 4 ? "sm:grid-cols-2 xl:grid-cols-4" : "md:grid-cols-3"
                  }`}
                >
                  {resultGuide.bands.map((band) => {
                    const toneColor =
                      band.tone === "excellent"
                        ? "#0F766E"
                        : band.tone === "reasonable"
                          ? "#A16207"
                          : band.tone === "caution"
                            ? "#C2410C"
                            : band.tone === "high-risk"
                              ? "#B91C1C"
                              : INK;
                    return (
                      <article
                        key={band.label}
                        className="flex h-full flex-col rounded-2xl bg-white p-5 ring-1 ring-stone-200/90 sm:p-6"
                      >
                        <h3
                          className="font-serif text-xl font-semibold tracking-tight"
                          style={{ color: toneColor }}
                        >
                          {band.label}
                        </h3>
                        <p className="mt-3 flex-1 text-sm leading-relaxed text-stone-600">{band.description}</p>
                      </article>
                    );
                  })}
                </div>
              </>
            ) : null}
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
            {resultGuide.highlightMetrics && resultGuide.highlightMetrics.length > 0 ? (
              <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
                {resultGuide.highlightMetrics.map((metric) => (
                  <article
                    key={metric.label}
                    className="rounded-2xl bg-shark p-5 text-white ring-1 ring-shark sm:p-6"
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-teal-300">
                      Highlight
                    </p>
                    <h3 className="mt-2 font-serif text-xl font-semibold tracking-tight text-white">
                      {metric.label}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/75">{metric.description}</p>
                  </article>
                ))}
              </div>
            ) : null}
            {resultGuide.footer ? (
              <p className="mt-6 max-w-3xl text-sm leading-relaxed text-stone-600">{resultGuide.footer}</p>
            ) : null}
          </div>
        </section>
      ) : null}

      {decisionComparison ? (
        <section
          data-chunk-boundary="true"
          className="border-b border-stone-200/80 py-12 md:py-16"
          style={lightSurface.next()}
          aria-labelledby={`${path}-decision-comparison-heading`}
        >
          <div className={HOME4_WRAP}>
            <h2
              id={`${path}-decision-comparison-heading`}
              className="max-w-3xl font-bold tracking-tight"
              style={{ fontSize: "clamp(1.25rem, 1.1rem + 0.5vw, 1.625rem)", color: INK }}
            >
              {decisionComparison.heading}
            </h2>
            {decisionComparison.intro ? (
              <p
                className="mt-4 max-w-3xl leading-relaxed"
                style={{ fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)", color: BODY }}
              >
                {decisionComparison.intro}
              </p>
            ) : null}
            <div className="mt-8 overflow-hidden rounded-2xl bg-white ring-1 ring-stone-200/90">
              <div className="grid grid-cols-1 gap-0 sm:grid-cols-2">
                <div className="border-b border-stone-200/80 bg-stone-50 px-5 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-stone-500 sm:border-r">
                  Retirement objective
                </div>
                <div className="hidden border-b border-stone-200/80 bg-stone-50 px-5 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-stone-500 sm:block">
                  Calculator to explore
                </div>
                {decisionComparison.rows.map((row) => {
                  const tool = row.href && !row.current ? (
                    <Link
                      href={row.href}
                      prefetch={false}
                      className="font-semibold hover:underline"
                      style={{ color: TEAL }}
                    >
                      {row.toolLabel}
                    </Link>
                  ) : (
                    <span className="font-semibold text-shark">{row.toolLabel}</span>
                  );
                  return (
                    <div key={row.objective} className="contents">
                      <div
                        className={`border-b border-stone-200/80 px-5 py-4 text-sm leading-relaxed text-stone-700 sm:border-r ${
                          row.current ? "bg-teal-50/60" : ""
                        }`}
                      >
                        <p className="sm:hidden text-[11px] font-semibold uppercase tracking-[0.12em] text-stone-500">
                          Retirement objective
                        </p>
                        <p className="sm:mt-0 mt-1">{row.objective}</p>
                      </div>
                      <div
                        className={`border-b border-stone-200/80 px-5 py-4 text-sm leading-relaxed ${
                          row.current ? "bg-teal-50/60" : ""
                        }`}
                      >
                        <p className="sm:hidden text-[11px] font-semibold uppercase tracking-[0.12em] text-stone-500">
                          Calculator to explore
                        </p>
                        <p className="sm:mt-0 mt-1">
                          {row.current ? "This calculator — " : null}
                          {tool}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {decisionComparison.footer ? (
              <p className="mt-6 max-w-3xl text-sm leading-relaxed text-stone-600">
                {decisionComparison.footer}
              </p>
            ) : null}
          </div>
        </section>
      ) : null}

      {withdrawalGuide ? (
        <section
          data-chunk-boundary="true"
          className="border-b border-stone-200/80 py-12 md:py-16"
          style={lightSurface.next()}
          aria-labelledby={`${path}-withdrawal-guide-heading`}
        >
          <div className={HOME4_WRAP}>
            <h2
              id={`${path}-withdrawal-guide-heading`}
              className="max-w-3xl font-bold tracking-tight"
              style={{ fontSize: "clamp(1.25rem, 1.1rem + 0.5vw, 1.625rem)", color: INK }}
            >
              {withdrawalGuide.heading}
            </h2>
            <p
              className="mt-4 max-w-3xl leading-relaxed"
              style={{ fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)", color: BODY }}
            >
              {withdrawalGuide.intro}
            </p>
            {withdrawalGuide.exampleRateLabel ? (
              <div className="mt-6 max-w-xl rounded-2xl bg-white p-5 ring-1 ring-stone-200/90 sm:p-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: TEAL }}>
                  {withdrawalGuide.exampleRateLabel}
                </p>
                {withdrawalGuide.exampleRateNote ? (
                  <p className="mt-2 text-sm leading-relaxed text-stone-600">{withdrawalGuide.exampleRateNote}</p>
                ) : null}
              </div>
            ) : null}
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {withdrawalGuide.levels.map((level) => (
                <article
                  key={level.label}
                  className="rounded-2xl bg-white p-5 ring-1 ring-stone-200/90 sm:p-6"
                >
                  <h3 className="font-semibold text-shark">{level.label}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-600">{level.description}</p>
                </article>
              ))}
            </div>
            <p
              className="mt-6 max-w-3xl leading-relaxed"
              style={{ fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)", color: BODY }}
            >
              {withdrawalGuide.closing}
            </p>
          </div>
        </section>
      ) : null}

      {timelineExample ? (
        <section
          data-chunk-boundary="true"
          className="border-b border-stone-200/80 py-12 md:py-16"
          style={lightSurface.next()}
          aria-labelledby={`${path}-timeline-heading`}
        >
          <div className={HOME4_WRAP}>
            <h2
              id={`${path}-timeline-heading`}
              className="max-w-3xl font-bold tracking-tight"
              style={{ fontSize: "clamp(1.25rem, 1.1rem + 0.5vw, 1.625rem)", color: INK }}
            >
              {timelineExample.heading}
            </h2>
            <p
              className="mt-4 max-w-3xl leading-relaxed"
              style={{ fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)", color: BODY }}
            >
              {timelineExample.intro}
            </p>
            <div className="mt-8 max-w-4xl rounded-2xl bg-white p-5 ring-1 ring-stone-200/90 sm:p-8">
              <div className="flex justify-between gap-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-stone-500 sm:text-xs">
                {timelineExample.ages.map((age) => (
                  <span key={age}>Age {age}</span>
                ))}
              </div>
              <div className="mt-4 h-4 overflow-hidden rounded-full bg-stone-100 ring-1 ring-stone-200/80">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${Math.min(100, Math.max(0, timelineExample.barPercent))}%`,
                    backgroundColor: TEAL,
                  }}
                />
              </div>
              <p className="mt-4 text-sm font-semibold" style={{ color: INK }}>
                {timelineExample.exhaustedLabel}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-stone-600">{timelineExample.footer}</p>
            </div>
          </div>
        </section>
      ) : null}

      {valueProgress ? (
        <section
          data-chunk-boundary="true"
          className="border-b border-stone-200/80 py-12 md:py-16"
          style={lightSurface.next()}
          aria-labelledby={`${path}-value-progress-heading`}
        >
          <div className={HOME4_WRAP}>
            <h2
              id={`${path}-value-progress-heading`}
              className="max-w-3xl font-bold tracking-tight"
              style={{ fontSize: "clamp(1.25rem, 1.1rem + 0.5vw, 1.625rem)", color: INK }}
            >
              {valueProgress.heading}
            </h2>
            <p
              className="mt-4 max-w-3xl leading-relaxed"
              style={{ fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)", color: BODY }}
            >
              {valueProgress.intro}
            </p>
            {valueProgress.assumptionNote ? (
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-stone-600">
                {valueProgress.assumptionNote}
              </p>
            ) : null}
            <ol className="mt-8 flex list-none flex-col gap-0 sm:flex-row sm:flex-wrap sm:items-stretch sm:gap-0">
              {valueProgress.steps.map((step, index) => (
                <li key={step.label} className="flex min-w-0 flex-1 flex-col sm:flex-row sm:items-stretch">
                  <div className="flex flex-1 flex-col rounded-2xl bg-white p-5 text-center ring-1 ring-stone-200/90 sm:p-6">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: TEAL }}>
                      {step.label}
                    </p>
                    <p
                      className="mt-3 font-serif text-2xl font-semibold tracking-tight sm:text-3xl"
                      style={{ color: INK }}
                    >
                      {step.value}
                    </p>
                  </div>
                  {index < valueProgress.steps.length - 1 ? (
                    <div
                      className="flex items-center justify-center py-2 sm:px-2 sm:py-0"
                      aria-hidden
                    >
                      <span className="text-lg font-semibold sm:hidden" style={{ color: TEAL }}>
                        ↓
                      </span>
                      <span className="hidden text-lg font-semibold sm:inline" style={{ color: TEAL }}>
                        →
                      </span>
                    </div>
                  ) : null}
                </li>
              ))}
            </ol>
            {valueProgress.footer ? (
              <p className="mt-6 max-w-3xl text-sm leading-relaxed text-stone-600">{valueProgress.footer}</p>
            ) : null}
          </div>
        </section>
      ) : null}

      {lifestyleExample ? (
        <section
          data-chunk-boundary="true"
          className="border-b border-stone-200/80 py-12 md:py-16"
          style={lightSurface.next()}
          aria-labelledby={`${path}-lifestyle-heading`}
        >
          <div className={HOME4_WRAP}>
            <h2
              id={`${path}-lifestyle-heading`}
              className="max-w-3xl font-bold tracking-tight"
              style={{ fontSize: "clamp(1.25rem, 1.1rem + 0.5vw, 1.625rem)", color: INK }}
            >
              {lifestyleExample.heading}
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
              <article className="rounded-2xl bg-white p-6 ring-1 ring-stone-200/90 sm:p-8">
                <h3 className="font-semibold text-shark">{lifestyleExample.todayHeading}</h3>
                <ul className="mt-4 space-y-2">
                  {lifestyleExample.todayItems.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-stone-600">
                      <span className="mt-0.5 font-bold" style={{ color: TEAL }} aria-hidden>
                        ·
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
              <article className="rounded-2xl bg-white p-6 ring-1 ring-stone-200/90 sm:p-8">
                <h3 className="font-semibold text-shark">{lifestyleExample.laterHeading}</h3>
                <p
                  className="mt-4 leading-relaxed"
                  style={{ fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)", color: BODY }}
                >
                  {lifestyleExample.laterBody}
                </p>
              </article>
            </div>
            {lifestyleExample.footer ? (
              <p className="mt-6 max-w-3xl text-sm leading-relaxed text-stone-600">{lifestyleExample.footer}</p>
            ) : null}
          </div>
        </section>
      ) : null}

      {incomeFlow ? (
        <section
          data-chunk-boundary="true"
          className="border-b border-stone-200/80 py-12 md:py-16"
          style={lightSurface.next()}
          aria-labelledby={`${path}-income-flow-heading`}
        >
          <div className={HOME4_WRAP}>
            <h2
              id={`${path}-income-flow-heading`}
              className="max-w-3xl font-bold tracking-tight"
              style={{ fontSize: "clamp(1.25rem, 1.1rem + 0.5vw, 1.625rem)", color: INK }}
            >
              {incomeFlow.heading}
            </h2>
            {incomeFlow.intro ? (
              <p
                className="mt-4 max-w-3xl leading-relaxed"
                style={{ fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)", color: BODY }}
              >
                {incomeFlow.intro}
              </p>
            ) : null}
            <ol className="mt-8 mx-auto flex max-w-md list-none flex-col items-center gap-0">
              {incomeFlow.steps.map((step, index) => (
                <li key={step} className="flex w-full flex-col items-center">
                  <div className="w-full rounded-2xl bg-white px-5 py-4 text-center ring-1 ring-stone-200/90 sm:px-6">
                    <p className="font-semibold text-shark">{step}</p>
                  </div>
                  {index < incomeFlow.steps.length - 1 ? (
                    <span className="py-2 text-lg font-semibold" style={{ color: TEAL }} aria-hidden>
                      ↓
                    </span>
                  ) : null}
                </li>
              ))}
            </ol>
            {incomeFlow.footer ? (
              <p className="mt-6 max-w-3xl text-sm leading-relaxed text-stone-600">{incomeFlow.footer}</p>
            ) : null}
          </div>
        </section>
      ) : null}

      {readingSectionsPlacement === "after-results" ? renderReadingBlock() : null}

      {practicalWays ? <PracticalWaysCompare path={path} practicalWays={practicalWays} /> : null}

      {readingSectionsPlacement === "after-practical" ? renderReadingBlock() : null}

      {methodSection ? (
        <section
          data-chunk-boundary="true"
          className="border-b border-stone-200/80 bg-shark py-12 text-white md:py-16"
          aria-labelledby={`${path}-method-heading`}
        >
          <div className={HOME4_WRAP}>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-7">
                <h2
                  id={`${path}-method-heading`}
                  className="font-bold tracking-tight text-white"
                  style={{ fontSize: "clamp(1.25rem, 1.1rem + 0.5vw, 1.625rem)" }}
                >
                  {methodSection.heading}
                </h2>
                <div className="mt-6 space-y-4 text-white/75">
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
              </div>
              <div className="flex flex-col justify-between gap-8 lg:col-span-5">
                {methodSection.bullets.length > 0 ? (
                  <ul className="space-y-3">
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
                <div className="flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6">
                  <Link
                    href={methodSection.ctaHref}
                    prefetch={false}
                    className="inline-flex items-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-semibold text-white transition hover:opacity-90"
                    style={{ backgroundColor: TEAL }}
                  >
                    {methodSection.ctaLabel}
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                  {methodSection.secondaryCtaLabel && methodSection.secondaryCtaHref ? (
                    <Link
                      href={methodSection.secondaryCtaHref}
                      prefetch={false}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#5EEAD4] hover:opacity-80"
                    >
                      {methodSection.secondaryCtaLabel}
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                  ) : (
                    <Link
                      href="/calculators"
                      prefetch={false}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#5EEAD4] hover:opacity-80"
                    >
                      Back to the Retirement Gap Toolkit™
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}
      {methodSection ? lightSurface.afterDark() : null}

      {assessmentSection ? (
        <section
          data-chunk-boundary="true"
          className="border-b border-stone-200/80 py-12 md:py-16"
          style={lightSurface.next()}
          aria-labelledby={`${path}-assessment-heading`}
        >
          <div className={HOME4_WRAP}>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch lg:gap-10">
              <div className="flex flex-col lg:col-span-6">
                <h2
                  id={`${path}-assessment-heading`}
                  className="font-bold tracking-tight"
                  style={{ fontSize: "clamp(1.35rem, 1.15rem + 0.7vw, 1.75rem)", color: INK }}
                >
                  {assessmentSection.heading}
                </h2>
                <p
                  className="mt-5 leading-relaxed"
                  style={{ fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)", color: BODY }}
                >
                  {assessmentSection.intro}
                </p>
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
              <aside className="flex lg:col-span-6">
                <ul className="flex w-full flex-col justify-center gap-3 rounded-3xl bg-white p-6 ring-1 ring-stone-200/90 sm:p-8">
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
              </aside>
            </div>
          </div>
        </section>
      ) : null}

      {journey ? (
        <section
          data-chunk-boundary="true"
          className="border-b border-stone-200/80 py-12 md:py-16"
          style={lightSurface.next()}
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
      {lightSurface.afterDark()}

      {terminalOptions ? (
        <section className="border-t border-stone-200/80 py-12 md:py-14" style={lightSurface.next()}>
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
        <section className="border-t border-stone-200/80 py-12 md:py-14" style={lightSurface.next()}>
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
