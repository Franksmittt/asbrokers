"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  cancelSchedule,
  createEdition,
  deleteEdition,
  duplicateEdition,
  getEdition,
  getEditionByDate,
  publishEdition,
  scheduleEdition,
  seedSampleEdition,
  suggestedEditionDate,
  unpublishEdition,
  updateEdition,
} from "@/lib/newsletter/store";
import { sendNewsletterTestEmail, sendNewsletterToSubscribers } from "@/lib/newsletter/send";
import type {
  ArticleOfTheWeek,
  CoursesSection,
  ContentType,
  NewsletterEdition,
  NewsletterSection,
  SectionDynamicContent,
  WatchChallenge,
} from "@/lib/newsletter/types";

function revalidateNewsletterPaths(date?: string) {
  revalidatePath("/studio/newsletter");
  revalidatePath("/newsletter");
  revalidatePath("/newsletter/archive");
  if (date) {
    revalidatePath(`/studio/newsletter/${date}`);
    revalidatePath(`/newsletter/${date}`);
    revalidatePath(`/newsletter/${date}/email`);
    revalidatePath(`/studio/newsletter/${date}/preview`);
  }
}

export async function createEditionAction(formData: FormData) {
  const date = (formData.get("date") as string) || suggestedEditionDate();
  if (!date) return;

  const existing = await getEditionByDate(date);
  if (existing) {
    redirect(`/studio/newsletter/${date}`);
  }

  await createEdition(date);
  revalidateNewsletterPaths(date);
  redirect(`/studio/newsletter/${date}`);
}

export async function duplicateEditionAction(formData: FormData) {
  const sourceId = formData.get("sourceId") as string;
  const date = (formData.get("date") as string) || suggestedEditionDate();
  if (!sourceId || !date) return;

  try {
    const copy = await duplicateEdition(sourceId, date);
    if (!copy) return;
    revalidateNewsletterPaths(date);
    redirect(`/studio/newsletter/${date}`);
  } catch (error) {
    console.error("[newsletter] duplicate failed:", error);
  }
}

export async function seedEditionAction() {
  await seedSampleEdition();
  revalidatePath("/studio/newsletter");
}

export async function seedMockEditionsAction() {
  const { seedMockEditions } = await import("@/lib/newsletter/seed-mocks");
  await seedMockEditions();
  revalidatePath("/studio/newsletter");
  revalidatePath("/newsletter");
}

export async function saveEditionDraftAction(
  edition: NewsletterEdition
): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    const existing = await getEdition(edition.id);
    if (!existing) return { ok: false, error: "Edition not found" };

    await updateEdition(edition.id, {
      subjectLine: edition.subjectLine,
      previewText: edition.previewText,
      articleOfTheWeek: edition.articleOfTheWeek,
      watchChallenge: edition.watchChallenge,
      courses: edition.courses,
      sectionContent: edition.sectionContent,
      // Keep lifecycle fields from server unless explicitly changed elsewhere
    });
    revalidateNewsletterPaths(existing.date);
    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Failed to save draft",
    };
  }
}

export async function updateArticleOfTheWeekAction(formData: FormData) {
  const editionId = formData.get("editionId") as string;
  const title = formData.get("title") as string;
  const intro = formData.get("intro") as string;
  const whyItMatters = formData.get("whyItMatters") as string;
  const articleHref = formData.get("articleHref") as string;
  const relatedCalculatorLabel = formData.get("relatedCalculatorLabel") as string;
  const relatedCalculatorHref = formData.get("relatedCalculatorHref") as string;
  const relatedVideoLabel = formData.get("relatedVideoLabel") as string;
  const relatedVideoHref = formData.get("relatedVideoHref") as string;
  const relatedCourseLabel = formData.get("relatedCourseLabel") as string;
  const relatedCourseHref = formData.get("relatedCourseHref") as string;

  const articleOfTheWeek: ArticleOfTheWeek = {
    title,
    intro,
    whyItMatters,
    articleHref,
    relatedCalculator:
      relatedCalculatorLabel && relatedCalculatorHref
        ? { label: relatedCalculatorLabel, href: relatedCalculatorHref }
        : undefined,
    relatedVideo:
      relatedVideoLabel && relatedVideoHref
        ? { label: relatedVideoLabel, href: relatedVideoHref }
        : undefined,
    relatedCourse:
      relatedCourseLabel && relatedCourseHref
        ? { label: relatedCourseLabel, href: relatedCourseHref }
        : undefined,
  };

  const updated = await updateEdition(editionId, { articleOfTheWeek });
  revalidateNewsletterPaths(updated?.date);
}

export async function updateWatchChallengeAction(formData: FormData) {
  const editionId = formData.get("editionId") as string;
  const latestUpdateHref = formData.get("latestUpdateHref") as string;
  const challengeHref = formData.get("challengeHref") as string;
  const vitalityHref = formData.get("vitalityHref") as string;

  const watchChallenge: WatchChallenge = {
    latestUpdateHref: latestUpdateHref || undefined,
    challengeHref,
    vitalityHref,
  };

  const updated = await updateEdition(editionId, { watchChallenge });
  revalidateNewsletterPaths(updated?.date);
}

export async function updateCoursesAction(formData: FormData) {
  const editionId = formData.get("editionId") as string;
  const coursesJson = formData.get("courses") as string;

  try {
    const availableCourses = JSON.parse(coursesJson);
    const courses: CoursesSection = { availableCourses };
    const updated = await updateEdition(editionId, { courses });
    revalidateNewsletterPaths(updated?.date);
  } catch (e) {
    console.error("Failed to parse courses JSON:", e);
  }
}

export async function updateSectionContentAction(formData: FormData) {
  const editionId = formData.get("editionId") as string;
  const sectionContentJson = formData.get("sectionContent") as string;

  try {
    const sectionContent: SectionDynamicContent[] = JSON.parse(sectionContentJson);
    const updated = await updateEdition(editionId, { sectionContent });
    revalidateNewsletterPaths(updated?.date);
  } catch (e) {
    console.error("Failed to parse section content JSON:", e);
  }
}

export async function addSectionContentAction(formData: FormData) {
  const editionId = formData.get("editionId") as string;
  const sectionId = formData.get("sectionId") as NewsletterSection;
  const type = formData.get("type") as ContentType;
  const label = formData.get("label") as string;
  const href = formData.get("href") as string;
  const existingContentJson = formData.get("existingContent") as string;

  if (!sectionId || !type || !label || !href) return;

  try {
    const existingSectionContent: SectionDynamicContent[] = existingContentJson
      ? JSON.parse(existingContentJson)
      : [];

    const sectionIndex = existingSectionContent.findIndex((s) => s.sectionId === sectionId);

    if (sectionIndex >= 0) {
      existingSectionContent[sectionIndex]!.content.push({ type, label, href });
    } else {
      existingSectionContent.push({
        sectionId,
        content: [{ type, label, href }],
      });
    }

    const updated = await updateEdition(editionId, { sectionContent: existingSectionContent });
    revalidateNewsletterPaths(updated?.date);
  } catch (e) {
    console.error("Failed to add section content:", e);
  }
}

export async function removeSectionContentAction(formData: FormData) {
  const editionId = formData.get("editionId") as string;
  const sectionId = formData.get("sectionId") as NewsletterSection;
  const contentIndex = parseInt(formData.get("contentIndex") as string, 10);
  const existingContentJson = formData.get("existingContent") as string;

  try {
    const existingSectionContent: SectionDynamicContent[] = existingContentJson
      ? JSON.parse(existingContentJson)
      : [];

    const sectionIndex = existingSectionContent.findIndex((s) => s.sectionId === sectionId);

    if (sectionIndex >= 0) {
      existingSectionContent[sectionIndex]!.content.splice(contentIndex, 1);
      if (existingSectionContent[sectionIndex]!.content.length === 0) {
        existingSectionContent.splice(sectionIndex, 1);
      }
    }

    const updated = await updateEdition(editionId, { sectionContent: existingSectionContent });
    revalidateNewsletterPaths(updated?.date);
  } catch (e) {
    console.error("Failed to remove section content:", e);
  }
}

export async function publishEditionAction(formData: FormData) {
  const editionId = formData.get("editionId") as string;
  const updated = await publishEdition(editionId);
  revalidateNewsletterPaths(updated?.date);
}

export async function unpublishEditionAction(formData: FormData) {
  const editionId = formData.get("editionId") as string;
  const updated = await unpublishEdition(editionId);
  revalidateNewsletterPaths(updated?.date);
}

export async function deleteEditionAction(formData: FormData) {
  const editionId = formData.get("editionId") as string;
  await deleteEdition(editionId);
  revalidatePath("/studio/newsletter");
  redirect("/studio/newsletter");
}

export async function scheduleEditionAction(
  editionId: string,
  scheduledAt: string
): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!scheduledAt || Number.isNaN(new Date(scheduledAt).getTime())) {
    return { ok: false, error: "Pick a valid schedule date/time" };
  }
  const updated = await scheduleEdition(editionId, scheduledAt);
  if (!updated) return { ok: false, error: "Edition not found" };
  revalidateNewsletterPaths(updated.date);
  return { ok: true };
}

export async function cancelScheduleAction(
  editionId: string
): Promise<{ ok: true } | { ok: false; error: string }> {
  const updated = await cancelSchedule(editionId);
  if (!updated) return { ok: false, error: "Edition not found" };
  revalidateNewsletterPaths(updated.date);
  return { ok: true };
}

export async function sendNewsletterTestAction(
  editionId: string,
  to: string
): Promise<{ ok: true; id?: string } | { ok: false; error: string }> {
  const result = await sendNewsletterTestEmail(editionId, to);
  const edition = await getEdition(editionId);
  revalidateNewsletterPaths(edition?.date);
  return result;
}

export async function sendNewsletterNowAction(
  editionId: string
): Promise<
  | { ok: true; sent: number; failed: number }
  | { ok: false; error: string }
> {
  const result = await sendNewsletterToSubscribers(editionId);
  const edition = await getEdition(editionId);
  revalidateNewsletterPaths(edition?.date);
  if (!result.ok) return result;
  return { ok: true, sent: result.sent, failed: result.failed };
}
