"use server";

import { revalidatePath } from "next/cache";

import { WEALTH_CANVAS_PROMPTS, type WealthCanvasPromptId } from "@/lib/courses/clarity-track";
import { studentProfilePath } from "@/lib/courses/paths";
import {
  saveWealthCanvasAnswers,
  setTopAchieversOptIn,
} from "@/lib/courses/store";
import { getCourseStudentId } from "@/lib/courses/student-session";

export async function saveWealthCanvasAction(formData: FormData): Promise<void> {
  const studentId = await getCourseStudentId();
  if (!studentId) throw new Error("Sign in required.");

  const answers: Partial<Record<WealthCanvasPromptId, string>> = {};
  for (const prompt of WEALTH_CANVAS_PROMPTS) {
    const value = String(formData.get(prompt.id) ?? "").trim().slice(0, 500);
    if (value) answers[prompt.id] = value;
  }
  await saveWealthCanvasAnswers(studentId, answers);
  revalidatePath(studentProfilePath());
  revalidatePath("/learn/dashboard");
}

export async function setTopAchieversOptInAction(formData: FormData): Promise<void> {
  const studentId = await getCourseStudentId();
  if (!studentId) throw new Error("Sign in required.");
  const enabled = formData.get("showOnTopAchievers") === "on";
  await setTopAchieversOptIn(studentId, enabled);
  revalidatePath(studentProfilePath());
}
