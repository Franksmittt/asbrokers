/**
 * Student registration / login for /learn.
 * When true, courses with registrationRequired show the register form and
 * comments use real names (e.g. Frank S.).
 */
export const COURSE_STUDENT_AUTH_ENABLED = true;

export function courseRequiresStudentAuth(course: { registrationRequired: boolean }): boolean {
  return COURSE_STUDENT_AUTH_ENABLED && course.registrationRequired;
}
