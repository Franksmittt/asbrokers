"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { canAccessCourseStudio } from "@/lib/courses/studio-access";
import { courseSettingsSchema, lessonSettingsSchema } from "@/lib/courses/schema";
import { slugify } from "@/lib/courses/ids";
import { studioCoursePath, studioLessonPath } from "@/lib/courses/paths";
import type { BlockType, LessonBlock, LessonOffer } from "@/lib/courses/types";
import {
  addBlock,
  addLesson,
  createCourse,
  deleteBlock,
  deleteCourse,
  deleteLesson,
  reorderBlock,
  reorderLessons,
  updateBlock,
  updateCourse,
  updateLesson,
} from "@/lib/courses/store";

async function requireStudio(): Promise<void> {
  if (!(await canAccessCourseStudio())) {
    redirect("/studio/blog/login?next=/studio/courses");
  }
}

function formString(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "");
}

function formChecked(formData: FormData, key: string): boolean {
  const value = formData.get(key);
  return value === "on" || value === "true" || value === "1";
}

export async function createCourseAction(formData: FormData): Promise<void> {
  await requireStudio();
  const title = formString(formData, "title").trim();
  const slugRaw = formString(formData, "slug").trim();
  const parsed = courseSettingsSchema.pick({ title: true, slug: true }).safeParse({
    title,
    slug: slugRaw || slugify(title),
  });
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message ?? "Could not create course.");
  }
  const course = createCourse(parsed.data);
  revalidatePath("/studio/courses");
  revalidatePath("/learn");
  redirect(studioCoursePath(course.id));
}

export async function updateCourseAction(formData: FormData): Promise<void> {
  await requireStudio();
  const courseId = formString(formData, "courseId");
  const parsed = courseSettingsSchema.safeParse({
    title: formString(formData, "title"),
    slug: formString(formData, "slug"),
    introduction: formString(formData, "introduction"),
    featuredImageUrl: formString(formData, "featuredImageUrl") || null,
    status: formString(formData, "status"),
    sortOrder: formString(formData, "sortOrder"),
    registrationRequired: formChecked(formData, "registrationRequired"),
    sequentialLocking: formChecked(formData, "sequentialLocking"),
  });
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message ?? "Could not save course.");
  }
  updateCourse(courseId, parsed.data);
  revalidatePath("/studio/courses");
  revalidatePath(studioCoursePath(courseId));
  revalidatePath("/learn");
  revalidatePath(`/learn/${parsed.data.slug}`);
}

export async function deleteCourseAction(formData: FormData): Promise<void> {
  await requireStudio();
  deleteCourse(formString(formData, "courseId"));
  revalidatePath("/studio/courses");
  revalidatePath("/learn");
  redirect("/studio/courses");
}

export async function addLessonAction(formData: FormData): Promise<void> {
  await requireStudio();
  const courseId = formString(formData, "courseId");
  const title = formString(formData, "title").trim() || "New lesson";
  const slug = formString(formData, "slug").trim() || slugify(title);
  const lesson = addLesson(courseId, title, slug);
  revalidatePath(studioCoursePath(courseId));
  redirect(studioLessonPath(courseId, lesson.id));
}

export async function updateLessonAction(formData: FormData): Promise<void> {
  await requireStudio();
  const courseId = formString(formData, "courseId");
  const lessonId = formString(formData, "lessonId");
  const parsed = lessonSettingsSchema.safeParse({
    title: formString(formData, "title"),
    slug: formString(formData, "slug"),
    status: formString(formData, "status"),
    isFinal: formChecked(formData, "isFinal"),
    responseRequired: formChecked(formData, "responseRequired"),
    responsePrompt: formString(formData, "responsePrompt"),
    offerHeading: formString(formData, "offerHeading"),
    offerBody: formString(formData, "offerBody"),
    offerButtonText: formString(formData, "offerButtonText"),
    offerButtonUrl: formString(formData, "offerButtonUrl"),
    offerOpenInNewTab: formChecked(formData, "offerOpenInNewTab"),
  });
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message ?? "Could not save lesson.");
  }
  const offer: LessonOffer | null =
    parsed.data.isFinal && parsed.data.offerButtonText && parsed.data.offerButtonUrl
      ? {
          heading: parsed.data.offerHeading || "Ready to take the next step?",
          body: parsed.data.offerBody,
          buttonText: parsed.data.offerButtonText,
          buttonUrl: parsed.data.offerButtonUrl,
          openInNewTab: parsed.data.offerOpenInNewTab,
        }
      : parsed.data.isFinal
        ? {
            heading: parsed.data.offerHeading || "Ready to take the next step?",
            body: parsed.data.offerBody,
            buttonText: parsed.data.offerButtonText || "Continue",
            buttonUrl: parsed.data.offerButtonUrl || "/contact",
            openInNewTab: parsed.data.offerOpenInNewTab,
          }
        : null;
  updateLesson(courseId, lessonId, {
    title: parsed.data.title,
    slug: parsed.data.slug,
    status: parsed.data.status,
    isFinal: parsed.data.isFinal,
    responseRequired: parsed.data.responseRequired,
    responsePrompt: parsed.data.responsePrompt,
    offer,
  });
  revalidatePath(studioCoursePath(courseId));
  revalidatePath(studioLessonPath(courseId, lessonId));
  revalidatePath("/learn");
}

export async function deleteLessonAction(formData: FormData): Promise<void> {
  await requireStudio();
  const courseId = formString(formData, "courseId");
  deleteLesson(courseId, formString(formData, "lessonId"));
  revalidatePath(studioCoursePath(courseId));
  redirect(studioCoursePath(courseId));
}

export async function reorderLessonAction(formData: FormData): Promise<void> {
  await requireStudio();
  const courseId = formString(formData, "courseId");
  const direction = formString(formData, "direction") === "up" ? "up" : "down";
  reorderLessons(courseId, formString(formData, "lessonId"), direction);
  revalidatePath(studioCoursePath(courseId));
}

export async function addBlockAction(formData: FormData): Promise<void> {
  await requireStudio();
  const courseId = formString(formData, "courseId");
  const lessonId = formString(formData, "lessonId");
  const type = formString(formData, "type") as BlockType;
  addBlock(courseId, lessonId, type);
  revalidatePath(studioLessonPath(courseId, lessonId));
}

export async function deleteBlockAction(formData: FormData): Promise<void> {
  await requireStudio();
  const courseId = formString(formData, "courseId");
  const lessonId = formString(formData, "lessonId");
  deleteBlock(courseId, lessonId, formString(formData, "blockId"));
  revalidatePath(studioLessonPath(courseId, lessonId));
}

export async function reorderBlockAction(formData: FormData): Promise<void> {
  await requireStudio();
  const courseId = formString(formData, "courseId");
  const lessonId = formString(formData, "lessonId");
  const direction = formString(formData, "direction") === "up" ? "up" : "down";
  reorderBlock(courseId, lessonId, formString(formData, "blockId"), direction);
  revalidatePath(studioLessonPath(courseId, lessonId));
}

export async function updateBlockAction(formData: FormData): Promise<void> {
  await requireStudio();
  const courseId = formString(formData, "courseId");
  const lessonId = formString(formData, "lessonId");
  const blockId = formString(formData, "blockId");
  const type = formString(formData, "type") as BlockType;
  const patch = blockPatchFromForm(type, formData);
  updateBlock(courseId, lessonId, blockId, patch);
  revalidatePath(studioLessonPath(courseId, lessonId));
}

function blockPatchFromForm(type: BlockType, formData: FormData): Partial<LessonBlock> {
  switch (type) {
    case "heading":
      return {
        type,
        text: formString(formData, "text"),
        level: formString(formData, "level") === "3" ? 3 : 2,
      };
    case "text":
      return { type, body: formString(formData, "body") };
    case "video":
      return { type, url: formString(formData, "url"), caption: formString(formData, "caption") };
    case "calculator":
      return { type, calculatorId: formString(formData, "calculatorId") };
    case "image":
      return {
        type,
        url: formString(formData, "url"),
        alt: formString(formData, "alt"),
        caption: formString(formData, "caption"),
      };
    case "callout":
      return {
        type,
        variant: (formString(formData, "variant") || "key") as "info" | "key" | "warning" | "example",
        title: formString(formData, "title"),
        body: formString(formData, "body"),
      };
    case "cta":
      return {
        type,
        heading: formString(formData, "heading"),
        body: formString(formData, "body"),
        buttonText: formString(formData, "buttonText"),
        buttonUrl: formString(formData, "buttonUrl"),
        openInNewTab: formChecked(formData, "openInNewTab"),
      };
  }
}
