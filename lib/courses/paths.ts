export function coursePath(slug: string): string {
  return `/learn/${slug}`;
}

export function registerPath(slug: string): string {
  return `/learn/${slug}/register`;
}

export function lessonPath(courseSlug: string, lessonSlug: string): string {
  return `/learn/${courseSlug}/${lessonSlug}`;
}

export function studentDashboardPath(): string {
  return "/learn/dashboard";
}

export function studentAccountPath(opts?: {
  mode?: "signin" | "signup";
  next?: string;
}): string {
  const params = new URLSearchParams();
  if (opts?.mode) params.set("mode", opts.mode);
  if (opts?.next && opts.next.startsWith("/learn") && !opts.next.includes("://")) {
    params.set("next", opts.next);
  }
  const qs = params.toString();
  return qs ? `/learn/account?${qs}` : "/learn/account";
}

/** @deprecated Prefer studentAccountPath — kept for older links. */
export function studentLoginPath(next?: string): string {
  return studentAccountPath({ mode: "signin", next });
}

export function studentForgotPasswordPath(): string {
  return "/learn/account/forgot";
}

export function studentResetPasswordPath(token?: string): string {
  if (token) return `/learn/account/reset?token=${encodeURIComponent(token)}`;
  return "/learn/account/reset";
}

export function studentCoursesPath(): string {
  return "/learn/dashboard/courses";
}

export function studentProfilePath(): string {
  return "/learn/dashboard/profile";
}

export function studentJourneyPath(): string {
  return "/learn/dashboard/courses";
}

export function studioLearnersPath(): string {
  return "/studio/courses/learners";
}

export function studioCoursePath(courseId: string): string {
  return `/studio/courses/${courseId}`;
}

export function studioLessonPath(courseId: string, lessonId: string): string {
  return `/studio/courses/${courseId}/lessons/${lessonId}`;
}

export function studioCourseAnalyticsPath(): string {
  return "/studio/courses/analytics";
}

export function studioStudentPortalPath(): string {
  return "/studio/courses/portal";
}
