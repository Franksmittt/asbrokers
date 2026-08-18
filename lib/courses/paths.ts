export function coursePath(slug: string): string {
  return `/learn/${slug}`;
}

export function registerPath(slug: string): string {
  return `/learn/${slug}/register`;
}

export function lessonPath(courseSlug: string, lessonSlug: string): string {
  return `/learn/${courseSlug}/${lessonSlug}`;
}

export function studioCoursePath(courseId: string): string {
  return `/studio/courses/${courseId}`;
}

export function studioLessonPath(courseId: string, lessonId: string): string {
  return `/studio/courses/${courseId}/lessons/${lessonId}`;
}
