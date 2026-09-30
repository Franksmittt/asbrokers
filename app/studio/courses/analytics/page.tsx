import Link from "next/link";

import { grantEnrollmentAccessAction } from "@/app/studio/courses/actions";
import { buildCourseAnalytics } from "@/lib/courses/analytics";

export const dynamic = "force-dynamic";

const STATUS_LABEL: Record<string, string> = {
  active: "Active",
  completed: "Completed",
  stalled: "Started · not finished",
  pending_payment: "Awaiting payment",
};

export default async function CourseAnalyticsPage() {
  const rows = await buildCourseAnalytics();

  return (
    <div className="mx-auto w-full max-w-6xl space-y-8">
      <div>
        <Link href="/studio/courses" className="text-xs text-zinc-500 hover:text-white">
          ← Courses
        </Link>
        <h1 className="mt-2 text-2xl font-semibold text-white">Course progress overview</h1>
        <p className="mt-2 max-w-3xl text-sm text-zinc-400">
          See how many people started each course, who is still active, who stalled, and where they
          are in the lessons. Grant access for paid courses here.
        </p>
      </div>

      {rows.length === 0 ? (
        <p className="rounded-xl border border-[#2a2a2a] bg-[#0a0a0a] px-5 py-8 text-center text-sm text-zinc-500">
          No courses yet.
        </p>
      ) : (
        rows.map((row) => (
          <section
            key={row.course.id}
            className="space-y-4 rounded-xl border border-[#2a2a2a] bg-[#0a0a0a] p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wide text-zinc-500">
                  {row.course.access === "paid"
                    ? row.course.priceZar
                      ? `Paid · R${row.course.priceZar}`
                      : "Paid"
                    : "Free"}{" "}
                  · {row.course.status}
                </p>
                <h2 className="mt-1 text-lg font-semibold text-white">{row.course.title}</h2>
              </div>
              <Link
                href={`/studio/courses/${row.course.id}`}
                className="text-xs text-[#3ecf8e] hover:underline"
              >
                Edit course
              </Link>
            </div>

            <div className="grid gap-2 sm:grid-cols-5">
              {[
                ["Started", row.started],
                ["Active", row.active],
                ["Completed", row.completed],
                ["Not finished", row.incomplete],
                ["Stalled", row.stalled],
              ].map(([label, value]) => (
                <div key={label as string} className="rounded-lg border border-[#2a2a2a] bg-black px-3 py-2">
                  <p className="text-[10px] uppercase tracking-wide text-zinc-500">{label}</p>
                  <p className="text-xl font-semibold text-white">{value}</p>
                </div>
              ))}
            </div>

            {row.pendingPayment > 0 ? (
              <p className="text-xs text-amber-300">
                {row.pendingPayment} learner{row.pendingPayment === 1 ? "" : "s"} waiting for paid access.
              </p>
            ) : null}

            {row.learners.length === 0 ? (
              <p className="text-sm text-zinc-500">Nobody has started this course yet.</p>
            ) : (
              <div className="overflow-x-auto rounded-lg border border-[#2a2a2a]">
                <table className="min-w-full text-left text-sm">
                  <thead className="bg-[#111] text-[11px] uppercase tracking-wide text-zinc-500">
                    <tr>
                      <th className="px-3 py-2">Student</th>
                      <th className="px-3 py-2">Status</th>
                      <th className="px-3 py-2">Where they are</th>
                      <th className="px-3 py-2">Progress</th>
                      <th className="px-3 py-2">Last activity</th>
                      <th className="px-3 py-2">Access</th>
                    </tr>
                  </thead>
                  <tbody>
                    {row.learners.map((learner) => (
                      <tr key={learner.enrollment.id} className="border-t border-[#2a2a2a] text-zinc-300">
                        <td className="px-3 py-2">
                          <Link
                            href={`/studio/courses/students/${learner.student.id}`}
                            className="text-white hover:underline"
                          >
                            {learner.student.firstName} {learner.student.surname}
                          </Link>
                          <p className="text-[11px] text-zinc-500">{learner.student.email}</p>
                        </td>
                        <td className="px-3 py-2">{STATUS_LABEL[learner.status] ?? learner.status}</td>
                        <td className="px-3 py-2">{learner.currentLessonTitle}</td>
                        <td className="px-3 py-2">{learner.progressLabel}</td>
                        <td className="px-3 py-2 text-zinc-500">
                          {learner.lastActivityAt.slice(0, 16).replace("T", " ")}
                        </td>
                        <td className="px-3 py-2">
                          {learner.enrollment.paymentStatus === "pending" ? (
                            <form action={grantEnrollmentAccessAction}>
                              <input type="hidden" name="enrollmentId" value={learner.enrollment.id} />
                              <button
                                type="submit"
                                className="rounded-md bg-[#3ecf8e] px-2.5 py-1 text-xs font-medium text-black"
                              >
                                Grant access
                              </button>
                            </form>
                          ) : (
                            <span className="text-xs text-zinc-500">
                              {learner.enrollment.paymentStatus === "granted" ? "Granted" : "Open"}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        ))
      )}
    </div>
  );
}
