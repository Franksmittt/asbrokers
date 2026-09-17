/**
 * AS Brokers Weekly Newsletter Types
 * Based on Albert's newsletter builder specification
 */

export type NewsletterSection =
  | "financial-freedom"
  | "retirement-planning"
  | "investments"
  | "medical-aid"
  | "gap-cover"
  | "personal-insurance"
  | "business-insurance"
  | "life-disability"
  | "business-life-insurance"
  | "estate-planning"
  | "trusts-structuring"
  | "discovery-bank"
  | "vitality-wellness";

export type ContentType = "article" | "video" | "course" | "calculator" | "webinar" | "checklist";

/** Optional content link within a section */
export interface SectionContent {
  type: ContentType;
  label: string;
  href: string;
}

/** Evergreen section configuration */
export interface EvergreenSection {
  id: NewsletterSection;
  title: string;
  shortTitle: string;
  evergreenText: string;
  bulletPoints?: string[];
  contactCtaLabel: string;
  contactCtaHref: string;
}

/** Dynamic content for a specific newsletter edition */
export interface SectionDynamicContent {
  sectionId: NewsletterSection;
  content: SectionContent[];
}

/** Article of the Week - main weekly content */
export interface ArticleOfTheWeek {
  title: string;
  intro: string;
  whyItMatters: string;
  articleHref: string;
  relatedCalculator?: { label: string; href: string };
  relatedVideo?: { label: string; href: string };
  relatedCourse?: { label: string; href: string };
}

/** 104-Week Watch Challenge section */
export interface WatchChallenge {
  latestUpdateHref?: string;
  challengeHref: string;
  vitalityHref: string;
}

/** Courses section */
export interface CoursesSection {
  availableCourses: Array<{
    title: string;
    description: string;
    href: string;
  }>;
}

/** Complete newsletter edition */
export interface NewsletterEdition {
  id: string;
  date: string; // YYYY-MM-DD format
  status: "draft" | "published";
  articleOfTheWeek: ArticleOfTheWeek;
  watchChallenge: WatchChallenge;
  courses: CoursesSection;
  sectionContent: SectionDynamicContent[];
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

/** Newsletter edition for display (with resolved evergreen content) */
export interface ResolvedNewsletterEdition extends NewsletterEdition {
  evergreenSections: EvergreenSection[];
}
