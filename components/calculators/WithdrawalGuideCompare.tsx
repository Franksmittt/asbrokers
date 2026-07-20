import type { CalculatorWithdrawalGuide } from "@/lib/calculators/page-configs";
import { HOME4_WRAP } from "@/components/home4/Home4Blocks";
import {
  HUB_TEAL as TEAL,
  HUB_CANVAS as CANVAS,
  HUB_INK as INK,
  HUB_BODY as BODY,
} from "@/lib/hub-design-tokens";

const CREAM = "#FDFCFA";

type Props = {
  path: string;
  withdrawalGuide: CalculatorWithdrawalGuide;
};

function levelTone(label: string): { accent: string; soft: string; onDark: string } {
  const key = label.toLowerCase();
  if (key.startsWith("green")) {
    return { accent: "#0F766E", soft: "#CCFBF1", onDark: "#5EEAD4" };
  }
  if (key.startsWith("yellow")) {
    return { accent: "#A16207", soft: "#FEF3C7", onDark: "#FDE68A" };
  }
  if (key.startsWith("orange")) {
    return { accent: "#C2410C", soft: "#FFEDD5", onDark: "#FDBA74" };
  }
  if (key.startsWith("red")) {
    return { accent: "#B91C1C", soft: "#FEE2E2", onDark: "#FCA5A5" };
  }
  return { accent: TEAL, soft: "#E7E5E4", onDark: "#5EEAD4" };
}

function CompareLabel({ letter, name, onDark = false }: { letter: string; name: string; onDark?: boolean }) {
  return (
    <div className="mb-8 flex flex-wrap items-center gap-3">
      <span
        className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
          onDark ? "bg-white text-shark" : "bg-[#1D1D1F] text-white"
        }`}
      >
        {letter}
      </span>
      <p
        className={`text-[11px] font-semibold uppercase tracking-[0.16em] ${
          onDark ? "text-white/50" : "text-stone-500"
        }`}
      >
        Option {letter} · {name}
      </p>
    </div>
  );
}

/** A — Full-width traffic-light tiles (4 across). */
function OptionA({ path, withdrawalGuide }: Props) {
  return (
    <section
      id="withdrawal-option-a"
      data-chunk-boundary="true"
      className="border-b border-stone-200/80 py-14 md:py-20"
      style={{ backgroundColor: CANVAS }}
      aria-labelledby={`${path}-withdrawal-a-heading`}
    >
      <div className={HOME4_WRAP}>
        <CompareLabel letter="A" name="Traffic-light tiles" />
        <h2
          id={`${path}-withdrawal-a-heading`}
          className="max-w-3xl font-bold tracking-tight"
          style={{ fontSize: "clamp(1.35rem, 1.15rem + 0.7vw, 1.75rem)", color: INK }}
        >
          {withdrawalGuide.heading}
        </h2>
        <p
          className="mt-5 max-w-3xl leading-relaxed"
          style={{ fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)", color: BODY }}
        >
          {withdrawalGuide.intro}
        </p>
        {withdrawalGuide.exampleRateLabel ? (
          <div className="mt-8 rounded-2xl bg-white px-5 py-4 ring-1 ring-stone-200/90 sm:px-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: TEAL }}>
              {withdrawalGuide.exampleRateLabel}
            </p>
            {withdrawalGuide.exampleRateNote ? (
              <p className="mt-2 text-sm leading-relaxed text-stone-600">{withdrawalGuide.exampleRateNote}</p>
            ) : null}
          </div>
        ) : null}
        <div
          className={`mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 ${
            withdrawalGuide.levels.length >= 4 ? "xl:grid-cols-4" : ""
          }`}
        >
          {withdrawalGuide.levels.map((level) => {
            const tone = levelTone(level.label);
            return (
              <article
                key={level.label}
                className="flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-stone-200/90"
              >
                <div className="h-1.5 w-full" style={{ backgroundColor: tone.accent }} aria-hidden />
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h3 className="font-semibold tracking-tight" style={{ color: tone.accent }}>
                    {level.label}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-stone-600">{level.description}</p>
                </div>
              </article>
            );
          })}
        </div>
        <p
          className="mt-8 max-w-3xl leading-relaxed"
          style={{ fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)", color: BODY }}
        >
          {withdrawalGuide.closing}
        </p>
      </div>
    </section>
  );
}

/** B — Dark band with coloured risk ladder. */
function OptionB({ path, withdrawalGuide }: Props) {
  return (
    <section
      id="withdrawal-option-b"
      data-chunk-boundary="true"
      className="border-b border-stone-200/80 bg-shark py-14 text-white md:py-20"
      aria-labelledby={`${path}-withdrawal-b-heading`}
    >
      <div className={HOME4_WRAP}>
        <CompareLabel letter="B" name="Dark risk ladder" onDark />
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <h2
              id={`${path}-withdrawal-b-heading`}
              className="font-bold tracking-tight text-white"
              style={{ fontSize: "clamp(1.35rem, 1.15rem + 0.7vw, 1.75rem)" }}
            >
              {withdrawalGuide.heading}
            </h2>
            <p
              className="mt-5 leading-relaxed text-white/70"
              style={{ fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)" }}
            >
              {withdrawalGuide.intro}
            </p>
            {withdrawalGuide.exampleRateLabel ? (
              <div className="mt-8 rounded-2xl bg-white/5 px-5 py-4 ring-1 ring-white/15">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5EEAD4]">
                  {withdrawalGuide.exampleRateLabel}
                </p>
                {withdrawalGuide.exampleRateNote ? (
                  <p className="mt-2 text-sm leading-relaxed text-white/65">
                    {withdrawalGuide.exampleRateNote}
                  </p>
                ) : null}
              </div>
            ) : null}
            <p
              className="mt-8 leading-relaxed text-white/55"
              style={{ fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)" }}
            >
              {withdrawalGuide.closing}
            </p>
          </div>
          <ol className="list-none space-y-4 lg:col-span-7">
            {withdrawalGuide.levels.map((level, index) => {
              const tone = levelTone(level.label);
              return (
                <li
                  key={level.label}
                  className="flex gap-4 rounded-2xl bg-white/5 p-5 ring-1 ring-white/10 sm:gap-5 sm:p-6"
                >
                  <span
                    className="font-serif text-2xl font-semibold tabular-nums"
                    style={{ color: tone.onDark }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-semibold tracking-tight" style={{ color: tone.onDark }}>
                      {level.label}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/70 sm:text-[0.9375rem]">
                      {level.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

/** C — Editorial split: copy left, soft colour-wash bands right. */
function OptionC({ path, withdrawalGuide }: Props) {
  return (
    <section
      id="withdrawal-option-c"
      data-chunk-boundary="true"
      className="border-b border-stone-200/80 py-14 md:py-20"
      style={{ backgroundColor: CREAM }}
      aria-labelledby={`${path}-withdrawal-c-heading`}
    >
      <div className={HOME4_WRAP}>
        <CompareLabel letter="C" name="Colour-wash bands" />
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <h2
              id={`${path}-withdrawal-c-heading`}
              className="font-bold tracking-tight"
              style={{ fontSize: "clamp(1.35rem, 1.15rem + 0.7vw, 1.75rem)", color: INK }}
            >
              {withdrawalGuide.heading}
            </h2>
            <p
              className="mt-5 leading-relaxed"
              style={{ fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)", color: BODY }}
            >
              {withdrawalGuide.intro}
            </p>
            {withdrawalGuide.exampleRateLabel ? (
              <div className="mt-8 border-t border-stone-300/80 pt-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: TEAL }}>
                  {withdrawalGuide.exampleRateLabel}
                </p>
                {withdrawalGuide.exampleRateNote ? (
                  <p className="mt-2 text-sm leading-relaxed text-stone-600">
                    {withdrawalGuide.exampleRateNote}
                  </p>
                ) : null}
              </div>
            ) : null}
            <p
              className="mt-8 leading-relaxed"
              style={{ fontSize: "clamp(0.9375rem, 0.9rem + 0.12vw, 1rem)", color: BODY }}
            >
              {withdrawalGuide.closing}
            </p>
          </div>
          <div className="space-y-3 lg:col-span-8">
            {withdrawalGuide.levels.map((level) => {
              const tone = levelTone(level.label);
              return (
                <article
                  key={level.label}
                  className="rounded-2xl px-5 py-5 sm:px-6 sm:py-6"
                  style={{ backgroundColor: tone.soft }}
                >
                  <h3 className="font-semibold tracking-tight" style={{ color: tone.accent }}>
                    {level.label}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: INK }}>
                    {level.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Temporary live compare: three Starting Withdrawal Rate layouts.
 * Remove after a winner is chosen.
 */
export function WithdrawalGuideCompare({ path, withdrawalGuide }: Props) {
  return (
    <>
      <div
        className="sticky top-16 z-30 border-b border-stone-200/90 bg-white/95 py-3 backdrop-blur-md md:top-20"
        role="navigation"
        aria-label="Compare withdrawal rate layouts"
      >
        <div className={`${HOME4_WRAP} flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between`}>
          <p className="text-sm font-medium text-stone-700">
            Compare <span className="font-semibold text-shark">Starting Withdrawal Rate</span>, pick A, B,
            or C
          </p>
          <div className="flex flex-wrap gap-2">
            {(
              [
                { id: "withdrawal-option-a", label: "A · Tiles" },
                { id: "withdrawal-option-b", label: "B · Dark ladder" },
                { id: "withdrawal-option-c", label: "C · Colour bands" },
              ] as const
            ).map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="rounded-full bg-stone-100 px-3.5 py-1.5 text-xs font-semibold text-stone-700 transition hover:bg-stone-200"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
      <OptionA path={path} withdrawalGuide={withdrawalGuide} />
      <OptionB path={path} withdrawalGuide={withdrawalGuide} />
      <OptionC path={path} withdrawalGuide={withdrawalGuide} />
    </>
  );
}
