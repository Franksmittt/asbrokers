/**
 * Student registration / login is paused while Albert builds course content.
 * Flip this to `true` when we re-enable the student database and register flow.
 */
export const COURSE_STUDENT_AUTH_ENABLED = false;

export function courseRequiresStudentAuth(course: { registrationRequired: boolean }): boolean {
  return COURSE_STUDENT_AUTH_ENABLED && course.registrationRequired;
}
