/**
 * Newsletter edition storage - in-memory store for v1.
 * Will be replaced with Supabase persistence in Phase 2.
 */

import type { NewsletterEdition, ResolvedNewsletterEdition } from "./types";
import { EVERGREEN_SECTIONS } from "./evergreen-sections";

const editions = new Map<string, NewsletterEdition>();

/** Generate a unique edition ID based on date */
function generateEditionId(date: string): string {
  return `newsletter-${date}`;
}

/** Create a new newsletter edition with default structure */
export function createEdition(date: string): NewsletterEdition {
  const id = generateEditionId(date);
  const now = new Date().toISOString();

  const edition: NewsletterEdition = {
    id,
    date,
    status: "draft",
    articleOfTheWeek: {
      title: "",
      intro: "",
      whyItMatters: "",
      articleHref: "",
    },
    watchChallenge: {
      challengeHref: "/financial-freedom-community",
      vitalityHref: "/contact?topic=vitality",
    },
    courses: {
      availableCourses: [
        {
          title: "Retirement vs Financial Freedom",
          description:
            "Retirement is a stage of life. Financial freedom is a financial position. This course explains the difference and why financial freedom should be the broader objective of a financial plan.",
          href: "/learn/retirement-vs-financial-freedom",
        },
      ],
    },
    sectionContent: [],
    createdAt: now,
    updatedAt: now,
  };

  editions.set(id, edition);
  return edition;
}

/** Get an edition by ID */
export function getEdition(id: string): NewsletterEdition | undefined {
  return editions.get(id);
}

/** Get an edition by date (YYYY-MM-DD) */
export function getEditionByDate(date: string): NewsletterEdition | undefined {
  const id = generateEditionId(date);
  return editions.get(id);
}

/** List all editions, sorted by date descending */
export function listEditions(): NewsletterEdition[] {
  return Array.from(editions.values()).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

/** List only published editions */
export function listPublishedEditions(): NewsletterEdition[] {
  return listEditions().filter((e) => e.status === "published");
}

/** Get the latest published edition */
export function getLatestPublishedEdition(): NewsletterEdition | undefined {
  const published = listPublishedEditions();
  return published[0];
}

/** Update an edition */
export function updateEdition(
  id: string,
  updates: Partial<Omit<NewsletterEdition, "id" | "createdAt">>
): NewsletterEdition | undefined {
  const existing = editions.get(id);
  if (!existing) return undefined;

  const updated: NewsletterEdition = {
    ...existing,
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  editions.set(id, updated);
  return updated;
}

/** Publish an edition */
export function publishEdition(id: string): NewsletterEdition | undefined {
  return updateEdition(id, {
    status: "published",
    publishedAt: new Date().toISOString(),
  });
}

/** Unpublish an edition (revert to draft) */
export function unpublishEdition(id: string): NewsletterEdition | undefined {
  return updateEdition(id, {
    status: "draft",
    publishedAt: undefined,
  });
}

/** Delete an edition */
export function deleteEdition(id: string): boolean {
  return editions.delete(id);
}

/** Resolve an edition with evergreen content */
export function resolveEdition(edition: NewsletterEdition): ResolvedNewsletterEdition {
  return {
    ...edition,
    evergreenSections: EVERGREEN_SECTIONS,
  };
}

/** Get resolved edition by ID */
export function getResolvedEdition(id: string): ResolvedNewsletterEdition | undefined {
  const edition = getEdition(id);
  return edition ? resolveEdition(edition) : undefined;
}

/** Get resolved edition by date */
export function getResolvedEditionByDate(date: string): ResolvedNewsletterEdition | undefined {
  const edition = getEditionByDate(date);
  return edition ? resolveEdition(edition) : undefined;
}

/** Initialize with sample data for development */
export function seedSampleEdition(): NewsletterEdition {
  const today = new Date();
  const monday = new Date(today);
  monday.setDate(today.getDate() - today.getDay() + 1);
  const dateStr = monday.toISOString().split("T")[0];

  const edition = createEdition(dateStr);
  return updateEdition(edition.id, {
    articleOfTheWeek: {
      title: "Understanding Your Retirement Gap",
      intro:
        "Many South Africans approach retirement with a dangerous gap between what they have saved and what they will actually need. This article explains how to measure and address your retirement gap before it becomes a crisis.",
      whyItMatters:
        "If you do not measure your retirement gap early, you may find yourself unable to maintain your standard of living in retirement. Early awareness creates options.",
      articleHref: "/insights/retirement-gap-method",
      relatedCalculator: {
        label: "Retirement Gap Calculator",
        href: "/retirement-gap-method",
      },
    },
    watchChallenge: {
      latestUpdateHref: "/insights/104-week-challenge-update",
      challengeHref: "/financial-freedom-community",
      vitalityHref: "/contact?topic=vitality",
    },
    sectionContent: [
      {
        sectionId: "retirement-planning",
        content: [
          { type: "calculator", label: "Retirement Gap Calculator", href: "/retirement-gap-method" },
          { type: "course", label: "Retirement Planning Course", href: "/learn/retirement-vs-financial-freedom" },
        ],
      },
      {
        sectionId: "business-insurance",
        content: [
          { type: "webinar", label: "Albert & Johnny Weekly Webinar", href: "/insights/business-insurance-webinar" },
        ],
      },
      {
        sectionId: "estate-planning",
        content: [
          { type: "calculator", label: "Estate Duty Calculator", href: "/estate-duty-calculator" },
        ],
      },
    ],
  })!;
}
