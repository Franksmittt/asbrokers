"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  createEdition,
  updateEdition,
  publishEdition,
  unpublishEdition,
  deleteEdition,
  seedSampleEdition,
  getEditionByDate,
} from "@/lib/newsletter/store";
import type {
  ArticleOfTheWeek,
  WatchChallenge,
  CoursesSection,
  SectionDynamicContent,
  NewsletterSection,
  ContentType,
} from "@/lib/newsletter/types";

export async function createEditionAction(formData: FormData) {
  const date = formData.get("date") as string;
  if (!date) return;

  const existing = getEditionByDate(date);
  if (existing) {
    redirect(`/studio/newsletter/${date}`);
  }

  createEdition(date);
  revalidatePath("/studio/newsletter");
  redirect(`/studio/newsletter/${date}`);
}

export async function seedEditionAction() {
  seedSampleEdition();
  revalidatePath("/studio/newsletter");
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

  updateEdition(editionId, { articleOfTheWeek });
  revalidatePath("/studio/newsletter");
  revalidatePath("/newsletter");
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

  updateEdition(editionId, { watchChallenge });
  revalidatePath("/studio/newsletter");
  revalidatePath("/newsletter");
}

export async function updateCoursesAction(formData: FormData) {
  const editionId = formData.get("editionId") as string;
  const coursesJson = formData.get("courses") as string;

  try {
    const availableCourses = JSON.parse(coursesJson);
    const courses: CoursesSection = { availableCourses };
    updateEdition(editionId, { courses });
    revalidatePath("/studio/newsletter");
    revalidatePath("/newsletter");
  } catch (e) {
    console.error("Failed to parse courses JSON:", e);
  }
}

export async function updateSectionContentAction(formData: FormData) {
  const editionId = formData.get("editionId") as string;
  const sectionContentJson = formData.get("sectionContent") as string;

  try {
    const sectionContent: SectionDynamicContent[] = JSON.parse(sectionContentJson);
    updateEdition(editionId, { sectionContent });
    revalidatePath("/studio/newsletter");
    revalidatePath("/newsletter");
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
      existingSectionContent[sectionIndex].content.push({ type, label, href });
    } else {
      existingSectionContent.push({
        sectionId,
        content: [{ type, label, href }],
      });
    }

    updateEdition(editionId, { sectionContent: existingSectionContent });
    revalidatePath("/studio/newsletter");
    revalidatePath("/newsletter");
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
      existingSectionContent[sectionIndex].content.splice(contentIndex, 1);
      if (existingSectionContent[sectionIndex].content.length === 0) {
        existingSectionContent.splice(sectionIndex, 1);
      }
    }

    updateEdition(editionId, { sectionContent: existingSectionContent });
    revalidatePath("/studio/newsletter");
    revalidatePath("/newsletter");
  } catch (e) {
    console.error("Failed to remove section content:", e);
  }
}

export async function publishEditionAction(formData: FormData) {
  const editionId = formData.get("editionId") as string;
  publishEdition(editionId);
  revalidatePath("/studio/newsletter");
  revalidatePath("/newsletter");
}

export async function unpublishEditionAction(formData: FormData) {
  const editionId = formData.get("editionId") as string;
  unpublishEdition(editionId);
  revalidatePath("/studio/newsletter");
  revalidatePath("/newsletter");
}

export async function deleteEditionAction(formData: FormData) {
  const editionId = formData.get("editionId") as string;
  deleteEdition(editionId);
  revalidatePath("/studio/newsletter");
  redirect("/studio/newsletter");
}
