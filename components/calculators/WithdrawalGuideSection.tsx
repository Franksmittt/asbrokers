import type { CalculatorWithdrawalGuide } from "@/lib/calculators/page-configs";
import { HOME4_WRAP } from "@/components/home4/Home4Blocks";

type Props = {
  path: string;
  withdrawalGuide: CalculatorWithdrawalGuide;
};

function levelTone(label: string): string {
  const key = label.toLowerCase();
  if (key.startsWith("green")) return "#5EEAD4";
  if (key.startsWith("yellow")) return "#FDE68A";
  if (key.startsWith("orange")) return "#FDBA74";
  if (key.startsWith("red")) return "#FCA5A5";
  return "#5EEAD4";
}

/** Winner: dark band with coloured risk ladder. */
export function WithdrawalGuideSection({ path, withdrawalGuide }: Props) {
  return (
    <section
      data-chunk-boundary="true"
      className="border-b border-stone-200/80 bg-shark py-14 text-white md:py-20"
      aria-labelledby={`${path}-withdrawal-guide-heading`}
    >
      <div className={HOME4_WRAP}>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <h2
              id={`${path}-withdrawal-guide-heading`}
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
              const accent = levelTone(level.label);
              return (
                <li
                  key={level.label}
                  className="flex gap-4 rounded-2xl bg-white/5 p-5 ring-1 ring-white/10 sm:gap-5 sm:p-6"
                >
                  <span
                    className="font-serif text-2xl font-semibold tabular-nums"
                    style={{ color: accent }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-semibold tracking-tight" style={{ color: accent }}>
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
