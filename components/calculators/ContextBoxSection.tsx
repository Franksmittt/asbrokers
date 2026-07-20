import Link from "next/link";
import type { CalculatorContextBox } from "@/lib/calculators/page-configs";
import { HOME4_WRAP } from "@/components/home4/Home4Blocks";
import {
  HUB_TEAL as TEAL,
  HUB_CANVAS as CANVAS,
  HUB_BODY as BODY,
} from "@/lib/hub-design-tokens";

const CREAM = "#FDFCFA";

type Props = {
  path: string;
  contextBox: CalculatorContextBox;
};

/** Winner: split panes — dark intent + cream explanation. */
export function ContextBoxSection({ path, contextBox }: Props) {
  return (
    <section
      data-chunk-boundary="true"
      className="border-b border-stone-200/80 py-10 md:py-14"
      style={{ backgroundColor: CANVAS }}
      aria-labelledby={`${path}-context-heading`}
    >
      <div className={HOME4_WRAP}>
        <div className="overflow-hidden rounded-[1.75rem] ring-1 ring-stone-300/70 lg:grid lg:grid-cols-12">
          <div className="bg-[#1D1D1F] px-6 py-10 text-white sm:px-8 sm:py-12 lg:col-span-5 lg:px-10 lg:py-14">
            <h2
              id={`${path}-context-heading`}
              className="font-bold tracking-tight text-white"
              style={{ fontSize: "clamp(1.35rem, 1.15rem + 0.7vw, 1.75rem)" }}
            >
              {contextBox.heading}
            </h2>
            {contextBox.highlightQuestion ? (
              <p
                className="mt-8 font-serif font-semibold tracking-tight text-white"
                style={{
                  fontSize: "clamp(1.5rem, 1.25rem + 1.1vw, 2.125rem)",
                  lineHeight: 1.25,
                }}
              >
                {contextBox.highlightQuestion}
              </p>
            ) : null}
          </div>
          <div
            className="flex flex-col justify-center px-6 py-10 sm:px-8 sm:py-12 lg:col-span-7 lg:px-12 lg:py-14"
            style={{ backgroundColor: CREAM }}
          >
            <div className="space-y-4">
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
            <p className="mt-8 text-sm leading-relaxed text-stone-600">
              Part of the{" "}
              <Link
                href="/calculators"
                prefetch={false}
                className="font-semibold hover:underline"
                style={{ color: TEAL }}
              >
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
      </div>
    </section>
  );
}
