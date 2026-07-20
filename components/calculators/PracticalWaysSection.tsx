import Link from "next/link";
import type { CalculatorPracticalWays } from "@/lib/calculators/page-configs";
import { HOME4_WRAP } from "@/components/home4/Home4Blocks";
import { ArrowRight } from "@/components/icons";
import { HUB_TEAL as TEAL } from "@/lib/hub-design-tokens";

type Props = {
  path: string;
  practicalWays: CalculatorPracticalWays;
};

function itemLabel(item: CalculatorPracticalWays["items"][number]) {
  return typeof item === "string" ? item : item.label;
}

function itemHref(item: CalculatorPracticalWays["items"][number]) {
  return typeof item === "string" ? undefined : item.href;
}

/** Winner: dark band with numbered horizontal levers. */
export function PracticalWaysSection({ path, practicalWays }: Props) {
  return (
    <section
      data-chunk-boundary="true"
      className="border-b border-stone-200/80 bg-shark py-14 text-white md:py-20"
      aria-labelledby={`${path}-practical-heading`}
    >
      <div className={HOME4_WRAP}>
        <h2
          id={`${path}-practical-heading`}
          className="max-w-3xl font-bold tracking-tight text-white"
          style={{ fontSize: "clamp(1.35rem, 1.15rem + 0.7vw, 1.75rem)" }}
        >
          {practicalWays.heading}
        </h2>
        <p
          className="mt-5 max-w-3xl leading-relaxed text-white/70"
          style={{ fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)" }}
        >
          {practicalWays.intro}
        </p>
        <ol className="mt-10 grid list-none gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {practicalWays.items.map((item, index) => {
            const label = itemLabel(item);
            const href = itemHref(item);
            return (
              <li key={label} className="border-t border-white/20 pt-5">
                <p className="font-serif text-3xl font-semibold tabular-nums text-[#5EEAD4]">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-white/85 sm:text-base">
                  {href ? (
                    <Link
                      href={href}
                      prefetch={false}
                      className="font-semibold text-[#5EEAD4] hover:opacity-80"
                    >
                      {label}
                    </Link>
                  ) : (
                    label
                  )}
                </p>
              </li>
            );
          })}
        </ol>
        <p
          className="mt-10 max-w-3xl leading-relaxed text-white/60"
          style={{ fontSize: "clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)" }}
        >
          {practicalWays.closing}
        </p>
        {practicalWays.ctaLabel && practicalWays.ctaHref ? (
          <p className="mt-8">
            <Link
              href={practicalWays.ctaHref}
              prefetch={false}
              className="inline-flex items-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-semibold text-white transition hover:opacity-90"
              style={{ backgroundColor: TEAL }}
            >
              {practicalWays.ctaLabel}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </p>
        ) : null}
      </div>
    </section>
  );
}
