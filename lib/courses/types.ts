/**
 * Course platform domain types.
 * Architecture: Course → Lessons → Content blocks → Student progress.
 * Content is CMS-managed. Do not hard-code a specific course into routes.
 */

export const PUBLISH_STATUSES = ["draft", "published"] as const;
export type PublishStatus = (typeof PUBLISH_STATUSES)[number];

export const CALLOUT_VARIANTS = ["info", "key", "warning", "example"] as const;
export type CalloutVariant = (typeof CALLOUT_VARIANTS)[number];

export const BLOCK_TYPES = [
  "heading",
  "text",
  "video",
  "calculator",
  "image",
  "callout",
  "cta",
] as const;
export type BlockType = (typeof BLOCK_TYPES)[number];

export const COURSE_EVENT_TYPES = [
  "course_started",
  "lesson_opened",
  "lesson_completed",
  "course_completed",
  "offer_clicked",
] as const;
export type CourseEventType = (typeof COURSE_EVENT_TYPES)[number];

export const HEADING_LEVELS = [2, 3] as const;
export type HeadingLevel = (typeof HEADING_LEVELS)[number];

export type LessonOffer = {
  heading: string;
  body: string;
  buttonText: string;
  buttonUrl: string;
  openInNewTab: boolean;
};

export type HeadingBlock = {
  id: string;
  type: "heading";
  sortOrder: number;
  level: HeadingLevel;
  text: string;
};

export type TextBlock = {
  id: string;
  type: "text";
  sortOrder: number;
  body: string;
};

export type VideoBlock = {
  id: string;
  type: "video";
  sortOrder: number;
  url: string;
  caption?: string;
};

export type CalculatorBlock = {
  id: string;
  type: "calculator";
  sortOrder: number;
  calculatorId: string;
};

export type ImageBlock = {
  id: string;
  type: "image";
  sortOrder: number;
  url: string;
  alt: string;
  caption?: string;
};

export type CalloutBlock = {
  id: string;
  type: "callout";
  sortOrder: number;
  variant: CalloutVariant;
  title?: string;
  body: string;
};

export type CtaBlock = {
  id: string;
  type: "cta";
  sortOrder: number;
  heading?: string;
  body?: string;
  buttonText: string;
  buttonUrl: string;
  openInNewTab: boolean;
};

export type LessonBlock =
  | HeadingBlock
  | TextBlock
  | VideoBlock
  | CalculatorBlock
  | ImageBlock
  | CalloutBlock
  | CtaBlock;

export type CourseLesson = {
  id: string;
  courseId: string;
  title: string;
  slug: string;
  sortOrder: number;
  status: PublishStatus;
  isFinal: boolean;
  responseRequired: boolean;
  responsePrompt: string;
  offer: LessonOffer | null;
  blocks: LessonBlock[];
  createdAt: string;
  updatedAt: string;
};

export type CourseRecord = {
  id: string;
  title: string;
  slug: string;
  introduction: string;
  featuredImageUrl: string | null;
  status: PublishStatus;
  sortOrder: number;
  registrationRequired: boolean;
  sequentialLocking: boolean;
  createdAt: string;
  updatedAt: string;
  lessons: CourseLesson[];
};

export type CourseStudent = {
  id: string;
  firstName: string;
  surname: string;
  email: string;
  phone: string | null;
  marketingConsent: boolean;
  privacyConsent: boolean;
  createdAt: string;
};

export type CourseEnrollment = {
  id: string;
  studentId: string;
  courseId: string;
  startedAt: string;
  completedAt: string | null;
  currentLessonId: string | null;
  offerClickedAt: string | null;
};

export type LessonProgress = {
  id: string;
  enrollmentId: string;
  lessonId: string;
  openedAt: string;
  completedAt: string | null;
};

export type LessonResponse = {
  id: string;
  enrollmentId: string;
  lessonId: string;
  answer: string;
  submittedAt: string;
};

export type CourseEvent = {
  id: string;
  studentId: string;
  courseId: string;
  lessonId: string | null;
  enrollmentId: string | null;
  type: CourseEventType;
  createdAt: string;
};

export type LessonAccess = "available" | "locked" | "completed";

export type StudentCourseState = {
  student: CourseStudent;
  enrollment: CourseEnrollment;
  completedLessonIds: string[];
  responsesByLessonId: Record<string, LessonResponse>;
  offerClicked: boolean;
};
