"use client";

import { useActionState } from "react";
import Link from "next/link";

import { postLessonComment, type LearnActionState } from "@/app/(content)/learn/actions";
import type { LessonCommentView } from "@/lib/courses/types";
import { WARM_BTN_PRIMARY } from "@/lib/warm-theme";

const initial: LearnActionState = { ok: true };

function formatStamp(value: string): string {
  return value.slice(0, 16).replace("T", " ");
}

export function LessonDiscussion({
  courseSlug,
  lessonSlug,
  comments,
  canComment,
  registerHref,
  viewerLabel,
}: {
  courseSlug: string;
  lessonSlug: string;
  comments: LessonCommentView[];
  canComment: boolean;
  registerHref?: string | null;
  viewerLabel?: string | null;
}) {
  const [state, formAction, pending] = useActionState(postLessonComment, initial);

  return (
    <section id="discussion" className="space-y-4 rounded-3xl border border-[#006B6B]/20 bg-white p-6 ring-1 ring-stone-200 sm:p-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#006B6B]">Discussion</p>
        <h2 className="mt-2 text-lg font-semibold text-shark">Comments on this lesson</h2>
        <p className="mt-2 text-sm leading-relaxed text-stone-600">
          Share a thought with the group. Names show as first name and surname initial (for example{" "}
          <span className="font-medium text-stone-800">Frank S.</span>). Albert can reply, and those replies stay
          visible here.
        </p>
        {viewerLabel ? (
          <p className="mt-2 text-xs font-medium text-stone-500">Signed in as {viewerLabel}</p>
        ) : null}
      </div>

      {comments.length === 0 ? (
        <p className="text-sm text-stone-500">No comments yet. Be the first to start the conversation.</p>
      ) : (
        <ul className="space-y-4">
          {comments.map((row) => (
            <li key={row.id} className="rounded-2xl bg-stone-50 p-4 ring-1 ring-stone-200">
              <p className="text-xs font-semibold text-stone-500">
                {row.displayName}
                {row.isMine ? " · You" : ""}
                {" · "}
                {formatStamp(row.createdAt)}
              </p>
              <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-stone-800">{row.body}</p>
              {row.instructorReply ? (
                <div className="mt-3 rounded-xl border border-[#006B6B]/20 bg-white p-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#006B6B]">
                    Reply from Albert
                    {row.instructorRepliedAt ? ` · ${formatStamp(row.instructorRepliedAt)}` : ""}
                  </p>
                  <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-stone-700">
                    {row.instructorReply}
                  </p>
                </div>
              ) : null}
            </li>
          ))}
        </ul>
      )}

      {canComment ? (
        <form action={formAction} className="space-y-3 border-t border-stone-200 pt-4">
          <input type="hidden" name="courseSlug" value={courseSlug} />
          <input type="hidden" name="lessonSlug" value={lessonSlug} />
          <label className="block text-sm font-semibold text-stone-800">
            Add a comment
            <textarea
              name="body"
              required
              minLength={3}
              rows={3}
              className="mt-2 w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-base text-stone-900"
              placeholder="What stood out for you in this lesson?"
            />
          </label>
          {state.message && !state.ok ? (
            <p className="text-sm font-medium text-red-700" role="alert">
              {state.message}
            </p>
          ) : null}
          <button type="submit" disabled={pending} className={`${WARM_BTN_PRIMARY} disabled:opacity-60`}>
            {pending ? "Posting…" : "Post comment"}
          </button>
        </form>
      ) : registerHref ? (
        <p className="border-t border-stone-200 pt-4 text-sm text-stone-600">
          <Link href={registerHref} prefetch={false} className="font-semibold text-[#006B6B] hover:underline">
            Register with your name
          </Link>{" "}
          to join the discussion.
        </p>
      ) : null}
    </section>
  );
}
