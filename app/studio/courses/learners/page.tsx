import Link from "next/link";

import { grantEnrollmentAccessAction } from "@/app/studio/courses/actions";
import { buildCoachStudioView } from "@/lib/courses/analytics";

export const dynamic = "force-dynamic";

const KIND_LABEL = {
  stalled: "Stalled",
  pending_payment: "Awaiting payment",
  high_intent: "High intent",
} as const;

export default async function StudioLearnersPage() {
  const view = await buildCoachStudioView();

  return (
    <div className="mx-auto w-full max-w-6xl space-y-8">
      <div>
        <Link href="/studio/courses" className="text-xs text-zinc-500 hover:text-white">
          ← Courses
        </Link>
        <h1 className="mt-2 text-2xl font-semibold text-white">Learners · Coach view</h1>
        <p className="mt-2 max-w-3xl text-sm text-zinc-400">
          Who is winning, who is stuck, and who is ready for a conversation. Built for Monday-morning
          clarity — not vanity metrics.
        </p>
      </div>

      <div className="grid gap-2 sm:grid-cols-5">
        {(
          [
            ["Learners", view.totals.learners],
            ["Active", view.totals.active],
            ["Stalled", view.totals.stalled],
            ["Awaiting pay", view.totals.pendingPayment],
            ["High intent", view.totals.highIntent],
          ] as const
        ).map(([label, value]) => (
          <div key={label} className="rounded-xl border border-[#2a2a2a] bg-[#0a0a0a] px-3 py-3">
            <p className="text-[10px] uppercase tracking-wide text-zinc-500">{label}</p>
            <p className="text-2xl font-semibold text-white">{value}</p>
          </div>
        ))}
      </div>

      <section className="space-y-3 rounded-xl border border-[#2a2a2a] bg-[#0a0a0a] p-5">
        <div className="flex items-end justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-white">Needs attention</h2>
            <p className="mt-1 text-xs text-zinc-500">
              Stalled 21+ days, or waiting for you to grant paid access.
            </p>
          </div>
        </div>
        {view.needsAttention.length === 0 ? (
          <p className="text-sm text-zinc-500">Nobody needs a nudge right now. Nice.</p>
        ) : (
          <ul className="space-y-2">
            {view.needsAttention.map((item) => (
              <li
                key={`${item.kind}-${item.enrollment.id}`}
                className="flex flex-col gap-3 rounded-lg border border-[#2a2a2a] bg-black px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-amber-300/90">
                    {KIND_LABEL[item.kind]}
                  </p>
                  <Link href={item.href} className="mt-1 block font-medium text-white hover:underline">
                    {item.student.firstName} {item.student.surname}
                  </Link>
                  <p className="text-xs text-zinc-500">
                    {item.courseTitle} · {item.detail}
                  </p>
                </div>
                {item.kind === "pending_payment" ? (
                  <form action={grantEnrollmentAccessAction}>
                    <input type="hidden" name="enrollmentId" value={item.enrollment.id} />
                    <button
                      type="submit"
                      className="rounded-md bg-[#3ecf8e] px-3 py-1.5 text-xs font-medium text-black"
                    >
                      Grant access
                    </button>
                  </form>
                ) : (
                  <Link
                    href={item.href}
                    className="text-xs font-medium text-[#3ecf8e] hover:underline"
                  >
                    Open student
                  </Link>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="space-y-3 rounded-xl border border-[#2a2a2a] bg-[#0a0a0a] p-5">
        <h2 className="text-lg font-semibold text-white">Top performers</h2>
        <p className="text-xs text-zinc-500">
          Score = Insight Points × 0.6 + Momentum weeks × 16. These are motivated, disciplined
          learners — often your best advisory conversations.
        </p>
        {view.topPerformers.length === 0 ? (
          <p className="text-sm text-zinc-500">No Clarity Track activity yet.</p>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-[#2a2a2a]">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-[#111] text-[11px] uppercase tracking-wide text-zinc-500">
                <tr>
                  <th className="px-3 py-2">#</th>
                  <th className="px-3 py-2">Student</th>
                  <th className="px-3 py-2">Tier</th>
                  <th className="px-3 py-2">Insight</th>
                  <th className="px-3 py-2">Momentum</th>
                  <th className="px-3 py-2">Done</th>
                  <th className="px-3 py-2">Score</th>
                </tr>
              </thead>
              <tbody>
                {view.topPerformers.map((row, index) => (
                  <tr key={row.student.id} className="border-t border-[#2a2a2a] text-zinc-300">
                    <td className="px-3 py-2 text-zinc-500">{index + 1}</td>
                    <td className="px-3 py-2">
                      <Link
                        href={`/studio/courses/students/${row.student.id}`}
                        className="text-white hover:underline"
                      >
                        {row.displayName}
                      </Link>
                      <p className="text-[11px] text-zinc-500">{row.student.email}</p>
                    </td>
                    <td className="px-3 py-2">{row.tierLabel}</td>
                    <td className="px-3 py-2">{row.clarity.insightPoints}</td>
                    <td className="px-3 py-2">{row.clarity.momentumWeeks} w</td>
                    <td className="px-3 py-2">{row.coursesCompleted}</td>
                    <td className="px-3 py-2 font-semibold text-[#3ecf8e]">{row.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="space-y-3 rounded-xl border border-[#2a2a2a] bg-[#0a0a0a] p-5">
        <h2 className="text-lg font-semibold text-white">High-intent prospects</h2>
        <p className="text-xs text-zinc-500">
          Finished a course and clicked a next-step offer — warm, contextual conversations.
        </p>
        {view.highIntent.length === 0 ? (
          <p className="text-sm text-zinc-500">No high-intent signals yet.</p>
        ) : (
          <ul className="space-y-2">
            {view.highIntent.map((item) => (
              <li
                key={item.enrollment.id}
                className="flex items-center justify-between gap-3 rounded-lg border border-[#2a2a2a] bg-black px-4 py-3"
              >
                <div>
                  <Link href={item.href} className="font-medium text-white hover:underline">
                    {item.student.firstName} {item.student.surname}
                  </Link>
                  <p className="text-xs text-zinc-500">{item.courseTitle}</p>
                </div>
                <Link
                  href="/contact"
                  className="text-xs font-medium text-[#3ecf8e] hover:underline"
                >
                  Invite to consult
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
