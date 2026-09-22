import type { CourseStudent } from "./types";

/**
 * Public classroom label: first name + surname initial.
 * Example: Frank Smit → "Frank S."
 */
export function formatStudentDisplayName(student: Pick<CourseStudent, "firstName" | "surname">): string {
  const first = student.firstName.trim();
  const initial = student.surname.trim().charAt(0).toUpperCase();
  if (!first) return initial ? `${initial}.` : "Student";
  return initial ? `${first} ${initial}.` : first;
}
