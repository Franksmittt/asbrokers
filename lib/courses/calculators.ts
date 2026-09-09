import {
  formatPublicCalculatorTitle,
  formatStaffCalculatorLabel,
  getCalculatorById,
  getStaffRegistryCalculators,
  type CalculatorRegistryEntry,
} from "@/lib/calculators/registry";

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

/** Every embeddable AS Brokers calculator Albert can drop into a lesson. */
export function listCourseCalculators(currentId?: string): CourseCalculatorOption[] {
  const options = getStaffRegistryCalculators().map(toOption);
  if (currentId && !options.some((row) => row.id === currentId)) {
    const current = getCalculatorById(currentId);
    options.unshift(
      current
        ? toOption(current)
        : {
            id: currentId,
            label: `${currentId} (not in library)`,
            title: currentId,
            embedPath: "",
          }
    );
  }
  return options;
}
