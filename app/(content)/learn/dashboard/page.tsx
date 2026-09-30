import Link from "next/link";
import { redirect } from "next/navigation";

import { MomentumRing } from "@/components/courses/MomentumRing";
import {
  buildStudentClarityView,
  buildStudentDashboard,
} from "@/lib/courses/analytics";
import { getCourseStudentId } from "@/lib/courses/student-session";
import { studentCoursesPath, studentLoginPath, studentProfilePath } from "@/lib/courses/paths";

export const dynamic = "force-dynamic";

export default async function StudentDashboardPage() {
  const studentId = await getCourseStudentId();
  if (!studentId) redirect(studentLoginPath("/learn/dashboard"));

  const { student, myCourses, availableCourses } = await buildStudentDashboard(studentId);
  const clarityView = await buildStudentClarityView(studentId);
  const continueCourse =
    myCourses.find((row) => row.enrollment && !row.enrollment.completedAt && row.canAccessLessons) ??
    myCourses.find((row) => row.canAccessLessons) ??
    null;
  const pending = myCourses.filter((row) => row.enrollment?.paymentStatus === "pending");

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#006B6B]">
            Clarity Track
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-shark sm:text-4xl">
            Welcome back, {student.firstName}
          </h1>
          <p className="mt-2 max-w-xl text-sm text-stone-600">
            One clear next step. Keep your Momentum, earn Insight Points, and build a sharper picture
            of your money life.
          </p>
        </div>
        <div className="rounded-2xl bg-white px-4 py-3 ring-1 ring-stone-200">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-stone-500">
            Your tier
          </p>
          <p className="text-lg font-semibold text-shark">{clarityView.tier.label}</p>
          <p className="text-xs text-stone-500">
            {clarityView.clarity.insightPoints} Insight Points
            {clarityView.upcoming
              ? ` · ${clarityView.upcoming.minPoints - clarityView.clarity.insightPoints} to ${clarityView.upcoming.label}`
              : " · Freedom unlocked"}
          </p>
        </div>
      </div>

      {/* Continue Learning hero — the only primary job on this screen */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0B3B6E] to-[#0057B8] p-6 text-white shadow-md sm:p-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/70">
          Continue learning
        </p>
        {continueCourse ? (
          <>
            <h2 className="mt-2 max-w-2xl font-serif text-2xl font-semibold tracking-tight sm:text-3xl">
              {continueCourse.course.title}
            </h2>
            <p className="mt-2 text-sm text-white/85">
              {continueCourse.progressLabel}
              {continueCourse.enrollment?.paymentStatus === "pending"
                ? " · Waiting for Albert to confirm paid access"
                : ""}
            </p>
            {continueCourse.continueHref ? (
              <Link
                href={continueCourse.continueHref}
                className="mt-6 inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#0057B8] transition hover:bg-white/90"
              >
                {continueCourse.canAccessLessons
                  ? continueCourse.enrollment?.completedAt
                    ? "Review course"
                    : "Resume learning"
                  : "View status"}
              </Link>
            ) : null}
          </>
        ) : (
          <>
            <h2 className="mt-2 font-serif text-2xl font-semibold tracking-tight sm:text-3xl">
              Start your Clarity Track
            </h2>
            <p className="mt-2 max-w-xl text-sm text-white/85">
              Pick a free course below. One lesson at a time — no rush, no shame, just clearer
              decisions.
            </p>
            <Link
              href="/learn"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#0057B8] transition hover:bg-white/90"
            >
              Browse courses
            </Link>
          </>
        )}
      </section>

      {/* Momentum + Insight Points */}
      <section className="grid gap-4 md:grid-cols-[1.1fr_1fr]">
        <div className="rounded-3xl bg-white p-5 ring-1 ring-stone-200 sm:p-6">
          <MomentumRing weeks={clarityView.clarity.momentumWeeks} />
          <p className="mt-4 text-sm text-stone-600">
            Stay active once a week to keep Momentum. You get one Momentum Save each month if life
            gets busy — no punishing resets.
          </p>
          <p className="mt-2 text-xs text-stone-500">
            Saves left this month: {clarityView.clarity.momentumSavesRemaining}
          </p>
        </div>
        <div className="rounded-3xl bg-white p-5 ring-1 ring-stone-200 sm:p-6">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-stone-500">
            Insight Points
          </p>
          <p className="mt-1 text-3xl font-bold text-shark">{clarityView.clarity.insightPoints}</p>
          <p className="mt-2 text-sm text-stone-600">{clarityView.tier.blurb}</p>
          <Link
            href={studentProfilePath()}
            className="mt-4 inline-flex text-sm font-semibold text-[#0057B8] hover:underline"
          >
            View badges &amp; Wealth Canvas →
          </Link>
        </div>
      </section>

      {pending.length > 0 ? (
        <section className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          {pending.length} paid course{pending.length === 1 ? "" : "s"} waiting for Albert to grant
          access after payment.
        </section>
      ) : null}

      {availableCourses.length > 0 && myCourses.length === 0 ? (
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-shark">Suggested first course</h2>
          <ul className="grid gap-3 md:grid-cols-2">
            {availableCourses.slice(0, 2).map((row) => (
              <li key={row.course.id} className="rounded-2xl bg-white p-5 ring-1 ring-stone-200">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#006B6B]">
                  {row.statusLabel}
                </p>
                <p className="mt-1 text-lg font-semibold text-shark">{row.course.title}</p>
                <Link
                  href={row.continueHref ?? "/learn"}
                  className="mt-4 inline-flex text-sm font-semibold text-[#0057B8] hover:underline"
                >
                  Start course →
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <div className="flex flex-wrap gap-3 text-sm">
        <Link href={studentCoursesPath()} className="font-medium text-[#0057B8] hover:underline">
          My Journey
        </Link>
        <span className="text-stone-300">·</span>
        <Link href="/learn" className="font-medium text-[#0057B8] hover:underline">
          Catalogue
        </Link>
      </div>
    </div>
  );
}
