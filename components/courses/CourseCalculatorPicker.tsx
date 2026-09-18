"use client";

import { useEffect, useState } from "react";

import { CourseCalculatorFrame } from "@/components/courses/CourseCalculatorFrame";
import {
  DEFAULT_COURSE_CALCULATOR_ID,
  sanitizeCourseCalculatorId,
  type CourseCalculatorOption,
} from "@/lib/courses/calculators";

const SELECT_CLASS =
  "mt-1 w-full rounded-md border border-[#2a2a2a] bg-black px-3 py-2 text-sm text-white outline-none focus:border-[#3ecf8e]/40 [&>option]:bg-[#0a0a0a] [&>option]:text-zinc-50";

type Props = {
  calculators: CourseCalculatorOption[];
  currentId: string;
};

export function CourseCalculatorPicker({ calculators, currentId }: Props) {
  const savedId = sanitizeCourseCalculatorId(currentId);
  const [query, setQuery] = useState("");
  const [previewId, setPreviewId] = useState(savedId);

  useEffect(() => {
    setPreviewId(sanitizeCourseCalculatorId(currentId));
    setQuery("");
  }, [currentId]);

  const selected =
    calculators.find((calc) => calc.id === previewId) ??
    calculators.find((calc) => calc.id === DEFAULT_COURSE_CALCULATOR_ID) ??
    calculators[0];

  return (
    <div className="space-y-3">
      <p className="text-xs text-zinc-500">
        Choose any calculator from the AS Brokers library, then press Save calculator. Picking an
        option does not reload the page.
      </p>
      <input
        type="search"
        value={query}
        onChange={(event) => {
          const nextQuery = event.target.value;
          setQuery(nextQuery);
          const needle = nextQuery.trim().toLowerCase();
          if (!needle) return;
          const match = calculators.find((calc) =>
            `${calc.label} ${calc.title} ${calc.id}`.toLowerCase().includes(needle)
          );
          if (!match) return;
          setPreviewId(match.id);
          const select = event.currentTarget.form?.elements.namedItem("calculatorId");
          if (select instanceof HTMLSelectElement) select.value = match.id;
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter") event.preventDefault();
        }}
        placeholder="Search calculators (name or ASSET code)"
        className={SELECT_CLASS}
      />
      <select
        name="calculatorId"
        required
        key={savedId}
        defaultValue={savedId}
        onChange={(event) => setPreviewId(event.target.value)}
        className={SELECT_CLASS}
      >
        {calculators.map((calc) => (
          <option key={calc.id} value={calc.id}>
            {calc.label}
          </option>
        ))}
      </select>
      {selected?.embedPath ? (
        <div className="overflow-hidden rounded-xl border border-[#2a2a2a] bg-black">
          <p className="border-b border-[#2a2a2a] px-3 py-2 text-[11px] uppercase tracking-wide text-zinc-500">
            Preview · {selected.title}
          </p>
          <CourseCalculatorFrame embedPath={selected.embedPath} title={selected.title} />
        </div>
      ) : (
        <p className="text-xs text-amber-200">Pick a calculator from the list to place it in this lesson.</p>
      )}
    </div>
  );
}
