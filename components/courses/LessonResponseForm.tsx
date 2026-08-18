"use client";

import { useActionState } from "react";

import { continueLesson, submitLessonAnswer, type LearnActionState } from "@/app/(content)/learn/actions";
import { WARM_BTN_PRIMARY } from "@/lib/warm-theme";

const initial: LearnActionState = { ok: true };

export function LessonResponseForm({
  courseSlug,
  lessonSlug,
  prompt,
  required,
  alreadySubmitted,
}: {
  courseSlug: string;
  lessonSlug: string;
  prompt: string;
  required: boolean;
  alreadySubmitted: boolean;
}) {
  const [answerState, answerAction, answering] = useActionState(submitLessonAnswer, initial);
  const [continueState, continueAction, continuing] = useActionState(continueLesson, initial);

  if (alreadySubmitted && required) {
    return (
      <div className="rounded-3xl border border-[#006B6B]/20 bg-white p-6 ring-1 ring-stone-200">
        <p className="text-sm font-semibold text-[#006B6B]">Response saved privately</p>
        <p className="mt-2 text-sm text-stone-600">
          Your answer is attached to your profile. It is not published on the website.
        </p>
      </div>
    );
  }

  if (!required) {
    return (
      <form action={continueAction} className="rounded-3xl bg-white p-6 shadow-lg ring-1 ring-stone-200">
        <input type="hidden" name="courseSlug" value={courseSlug} />
        <input type="hidden" name="lessonSlug" value={lessonSlug} />
        {continueState.message ? (
          <p className="mb-3 text-sm text-red-700" role="alert">
            {continueState.message}
          </p>
        ) : null}
        <button type="submit" disabled={continuing} className={`${WARM_BTN_PRIMARY} disabled:opacity-60`}>
          {continuing ? "Saving…" : "Mark complete and continue"}
        </button>
      </form>
    );
  }

  return (
    <form action={answerAction} className="space-y-4 rounded-3xl bg-white p-6 shadow-lg ring-1 ring-stone-200 sm:p-8">
      <input type="hidden" name="courseSlug" value={courseSlug} />
      <input type="hidden" name="lessonSlug" value={lessonSlug} />
      <div>
        <h2 className="text-lg font-semibold text-shark">Your answer</h2>
        <p className="mt-2 text-sm leading-relaxed text-stone-600">{prompt}</p>
      </div>
      <textarea
        name="answer"
        required
        minLength={8}
        rows={5}
        className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-base text-stone-900"
        placeholder="Write a short reflection. Only AS Brokers can see this."
      />
      {answerState.message && !answerState.ok ? (
        <p className="text-sm font-medium text-red-700" role="alert">
          {answerState.message}
        </p>
      ) : null}
      <button type="submit" disabled={answering} className={`${WARM_BTN_PRIMARY} disabled:opacity-60`}>
        {answering ? "Submitting…" : "Submit and continue"}
      </button>
    </form>
  );
}
