/**
 * Newsletter edition storage with file + Postgres snapshot persistence
 * (same approach as Course Studio so Albert’s editions survive restarts).
 */

import type { NewsletterEdition, ResolvedNewsletterEdition } from "./types";
import { EVERGREEN_SECTIONS } from "./evergreen-sections";
import {
  loadNewsletterSnapshot,
  saveNewsletterSnapshot,
  type NewsletterStudioSnapshot,
} from "./persist";

type NewsletterStoreGlobal = {
  __asbNewsletterStore?: Map<string, NewsletterEdition>;
  __asbNewsletterHydrated?: boolean;
  __asbNewsletterHydratePromise?: Promise<void> | null;
  __asbNewsletterPersistEnabled?: boolean;
};

const globalForNewsletter = globalThis as NewsletterStoreGlobal;

function persistEnabled(): boolean {
  return globalForNewsletter.__asbNewsletterPersistEnabled !== false;
}

function editionsMap(): Map<string, NewsletterEdition> {
  const value = globalForNewsletter.__asbNewsletterStore;
  if (!value) {
    throw new Error("Newsletter store used before ensureNewsletterStore().");
  }
  return value;
}

function snapshotFromStore(): NewsletterStudioSnapshot {
  return {
    version: 1,
    editions: Array.from(editionsMap().values()),
  };
}

async function persistIfEnabled(): Promise<void> {
  if (!persistEnabled()) return;
  await saveNewsletterSnapshot(snapshotFromStore());
}

export async function ensureNewsletterStore(): Promise<void> {
  if (globalForNewsletter.__asbNewsletterHydrated) return;
  if (!globalForNewsletter.__asbNewsletterHydratePromise) {
    globalForNewsletter.__asbNewsletterHydratePromise = (async () => {
      const map = new Map<string, NewsletterEdition>();
      if (persistEnabled()) {
        const snapshot = await loadNewsletterSnapshot();
        for (const edition of snapshot?.editions ?? []) {
          map.set(edition.id, edition);
        }
      }
      globalForNewsletter.__asbNewsletterStore = map;
      globalForNewsletter.__asbNewsletterHydrated = true;
    })();
  }
  await globalForNewsletter.__asbNewsletterHydratePromise;
}

/** Generate a unique edition ID based on date */
function generateEditionId(date: string): string {
  return `newsletter-${date}`;
}

/** Create a new newsletter edition with default structure */
export async function createEdition(date: string): Promise<NewsletterEdition> {
  await ensureNewsletterStore();
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

  editionsMap().set(id, edition);
  await persistIfEnabled();
  return edition;
}

/** Get an edition by ID */
export async function getEdition(id: string): Promise<NewsletterEdition | undefined> {
  await ensureNewsletterStore();
  return editionsMap().get(id);
}

/** Get an edition by date (YYYY-MM-DD) */
export async function getEditionByDate(date: string): Promise<NewsletterEdition | undefined> {
  await ensureNewsletterStore();
  return editionsMap().get(generateEditionId(date));
}

/** List all editions, sorted by date descending */
export async function listEditions(): Promise<NewsletterEdition[]> {
  await ensureNewsletterStore();
  return Array.from(editionsMap().values()).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

/** List only published editions */
export async function listPublishedEditions(): Promise<NewsletterEdition[]> {
  const all = await listEditions();
  return all.filter((e) => e.status === "published");
}

/** Get the latest published edition */
export async function getLatestPublishedEdition(): Promise<NewsletterEdition | undefined> {
  const published = await listPublishedEditions();
  return published[0];
}

/** Update an edition */
export async function updateEdition(
  id: string,
  updates: Partial<Omit<NewsletterEdition, "id" | "createdAt">>
): Promise<NewsletterEdition | undefined> {
  await ensureNewsletterStore();
  const existing = editionsMap().get(id);
  if (!existing) return undefined;

  const updated: NewsletterEdition = {
    ...existing,
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  editionsMap().set(id, updated);
  await persistIfEnabled();
  return updated;
}

/** Publish an edition */
export async function publishEdition(id: string): Promise<NewsletterEdition | undefined> {
  return updateEdition(id, {
    status: "published",
    publishedAt: new Date().toISOString(),
  });
}

/** Unpublish an edition (revert to draft) */
export async function unpublishEdition(id: string): Promise<NewsletterEdition | undefined> {
  return updateEdition(id, {
    status: "draft",
    publishedAt: undefined,
  });
}

/** Delete an edition */
export async function deleteEdition(id: string): Promise<boolean> {
  await ensureNewsletterStore();
  const ok = editionsMap().delete(id);
  if (ok) await persistIfEnabled();
  return ok;
}

/** Resolve an edition with evergreen content */
export function resolveEdition(edition: NewsletterEdition): ResolvedNewsletterEdition {
  return {
    ...edition,
    evergreenSections: EVERGREEN_SECTIONS,
  };
}

/** Get resolved edition by ID */
export async function getResolvedEdition(id: string): Promise<ResolvedNewsletterEdition | undefined> {
  const edition = await getEdition(id);
  return edition ? resolveEdition(edition) : undefined;
}

/** Get resolved edition by date */
export async function getResolvedEditionByDate(
  date: string
): Promise<ResolvedNewsletterEdition | undefined> {
  const edition = await getEditionByDate(date);
  return edition ? resolveEdition(edition) : undefined;
}

/** Initialize with sample data for development */
export async function seedSampleEdition(): Promise<NewsletterEdition> {
  const today = new Date();
  const monday = new Date(today);
  monday.setDate(today.getDate() - today.getDay() + 1);
  const dateStr = monday.toISOString().split("T")[0]!;

  const existing = await getEditionByDate(dateStr);
  if (existing) return existing;

  const edition = await createEdition(dateStr);
  return (
    (await updateEdition(edition.id, {
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
    })) ?? edition
  );
}
