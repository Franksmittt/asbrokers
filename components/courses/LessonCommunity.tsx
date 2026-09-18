import type { CommunityAnswer } from "@/lib/courses/types";
import { WARM_BTN_SECONDARY } from "@/lib/warm-theme";
import Link from "next/link";

function formatStamp(value: string): string {
  return value.slice(0, 16).replace("T", " ");
}

export function LessonCommunity({
  answers,
  nextHref,
  nextLabel,
}: {
  answers: CommunityAnswer[];
  nextHref?: string | null;
  nextLabel?: string;
}) {
  return (
    <section className="space-y-4 rounded-3xl border border-[#006B6B]/20 bg-white p-6 ring-1 ring-stone-200 sm:p-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#006B6B]">Classroom</p>
        <h2 className="mt-2 text-lg font-semibold text-shark">Answers from this lesson</h2>
        <p className="mt-2 text-sm leading-relaxed text-stone-600">
          Once you submit, you can read how other students answered. Albert can reply to anyone personally,
          and those replies stay visible to the group.
        </p>
      </div>
      {answers.length === 0 ? (
        <p className="text-sm text-stone-500">No answers in this lesson yet.</p>
      ) : (
        <ul className="space-y-4">
          {answers.map((row) => (
            <li key={row.id} className="rounded-2xl bg-stone-50 p-4 ring-1 ring-stone-200">
              <p className="text-xs font-semibold text-stone-500">
                {row.displayName}
                {row.isMine ? " · You" : ""}
                {" · "}
                {formatStamp(row.submittedAt)}
              </p>
              <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-stone-800">{row.answer}</p>
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
              ) : (
                <p className="mt-3 text-xs text-stone-500">Albert has not replied to this answer yet.</p>
              )}
            </li>
          ))}
        </ul>
      )}
      {nextHref ? (
        <Link href={nextHref} prefetch={false} className={WARM_BTN_SECONDARY}>
          {nextLabel ?? "Continue to the next lesson"}
        </Link>
      ) : null}
    </section>
  );
}
