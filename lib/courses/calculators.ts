import {
  formatPublicCalculatorTitle,
  formatStaffCalculatorLabel,
  getCalculatorById,
  getStaffRegistryCalculators,
  type CalculatorRegistryEntry,
} from "@/lib/calculators/registry";

export const DEFAULT_COURSE_CALCULATOR_ID = "asset-001-retirement-growth";
export const RETIRED_COURSE_CALCULATOR_IDS = new Set(["asset-017-personal-goal"]);

export type CourseCalculatorOption = {
  id: string;
  label: string;
  title: string;
  embedPath: string;
};

function toOption(entry: CalculatorRegistryEntry): CourseCalculatorOption {
  return {
    id: entry.id,
    label: formatStaffCalculatorLabel(entry),
    title: formatPublicCalculatorTitle(entry),
    embedPath: entry.embedPath,
  };
}

export function sanitizeCourseCalculatorId(id: string | undefined | null): string {
  const value = (id ?? "").trim();
  if (!value || RETIRED_COURSE_CALCULATOR_IDS.has(value)) {
    return DEFAULT_COURSE_CALCULATOR_ID;
  }
  return getCalculatorById(value) ? value : DEFAULT_COURSE_CALCULATOR_ID;
}

/** Every embeddable AS Brokers calculator Albert can drop into a lesson. */
export function listCourseCalculators(currentId?: string): CourseCalculatorOption[] {
  const options = getStaffRegistryCalculators()
    .filter((entry) => !RETIRED_COURSE_CALCULATOR_IDS.has(entry.id))
    .map(toOption);
  const resolved = currentId ? sanitizeCourseCalculatorId(currentId) : "";
  if (resolved && !options.some((row) => row.id === resolved)) {
    const current = getCalculatorById(resolved);
    if (current) options.unshift(toOption(current));
  }
  return options;
}
