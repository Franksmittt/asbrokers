import type { ServiceCategory } from "@/lib/crm/types";
import type { CourseRecord } from "@/lib/courses/types";

/**
 * Map a course to a CRM service category for advisor routing + attribution.
 * Prefer explicit course.serviceCategory when present; else slug/title heuristics.
 */
export function resolveCourseServiceCategory(
  course: Pick<CourseRecord, "slug" | "title"> & { serviceCategory?: string | null }
): ServiceCategory {
  const explicit = course.serviceCategory?.trim();
  if (
    explicit === "retirement_everest" ||
    explicit === "short_term_business" ||
    explicit === "estate_business" ||
    explicit === "short_term_personal" ||
    explicit === "life_personal" ||
    explicit === "medical_wellness" ||
    explicit === "claims"
  ) {
    return explicit;
  }

  const hay = `${course.slug} ${course.title}`.toLowerCase();
  if (/medical|gap.?cover|vitality|wellness|discovery health/.test(hay)) {
    return "medical_wellness";
  }
  if (/business.?insur|commercial|average.?clause|underinsur/.test(hay)) {
    return "short_term_business";
  }
  if (/personal.?insur|home|car|motor|household/.test(hay)) {
    return "short_term_personal";
  }
  if (/estate|will|trust|legacy|executor/.test(hay)) {
    return "estate_business";
  }
  if (/life|disability|risk cover/.test(hay)) {
    return "life_personal";
  }
  if (/claim/.test(hay)) {
    return "claims";
  }
  // Default educational money courses → retirement / Everest lane
  return "retirement_everest";
}
