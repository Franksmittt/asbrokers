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

export function studentLoginPath(next?: string): string {
  if (next && next.startsWith("/learn")) {
    return `/learn/login?next=${encodeURIComponent(next)}`;
  }
  return "/learn/login";
}

export function studentCoursesPath(): string {
  return "/learn/dashboard/courses";
}

export function studentProfilePath(): string {
  return "/learn/dashboard/profile";
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
