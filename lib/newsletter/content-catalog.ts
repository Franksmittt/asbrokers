/**
 * Content sources for Newsletter Studio pickers.
 * Snapshots title + href at selection time (archive-safe).
 */

import "server-only";

import { HUB_CALCULATORS } from "@/lib/calculators/hub-catalog";
import { listPublishedStudioPosts } from "@/lib/client-studio/posts";
import { listPublishedCourses } from "@/lib/courses/store";

import type { ContentPickItem } from "./content-types";

export type { ContentPickItem, ContentPickKind } from "./content-types";
export { filterContentItems } from "./content-types";

const STATIC_PAGES: ContentPickItem[] = [
  {
    kind: "page",
    id: "ffc",
    label: "Financial Freedom Community",
    href: "/financial-freedom-community",
    description: "104-Week Watch Challenge home",
  },
  {
    kind: "page",
    id: "vitality-contact",
    label: "Vitality / Wellness contact",
    href: "/contact?topic=vitality",
    description: "Contact form pre-tagged for Vitality",
  },
  {
    kind: "page",
    id: "contact",
    label: "Contact AS Brokers",
    href: "/contact",
  },
  {
    kind: "page",
    id: "calculators-hub",
    label: "Calculators hub",
    href: "/calculators",
  },
  {
    kind: "page",
    id: "learn",
    label: "Clarity Track courses",
    href: "/learn",
  },
];

export async function listNewsletterContentCatalog(): Promise<{
  articles: ContentPickItem[];
  calculators: ContentPickItem[];
  courses: ContentPickItem[];
  pages: ContentPickItem[];
}> {
  const [posts, courses] = await Promise.all([
    listPublishedStudioPosts().catch(() => []),
    listPublishedCourses().catch(() => []),
  ]);

  const articles: ContentPickItem[] = posts.map((post) => ({
    kind: "article" as const,
    id: post.id,
    label: post.title || post.slug,
    href: `/insights/${post.slug}`,
    description: post.excerpt?.slice(0, 140) || undefined,
  }));

  const calculators: ContentPickItem[] = HUB_CALCULATORS.map((calc) => ({
    kind: "calculator" as const,
    id: calc.id,
    label: calc.title,
    href: calc.href,
    description: calc.problem,
  }));

  const courseItems: ContentPickItem[] = courses.map((course) => ({
    kind: "course" as const,
    id: course.id,
    label: course.title,
    href: `/learn/${course.slug}`,
    description: course.introduction?.slice(0, 140) || undefined,
  }));

  return {
    articles,
    calculators,
    courses: courseItems,
    pages: STATIC_PAGES,
  };
}
