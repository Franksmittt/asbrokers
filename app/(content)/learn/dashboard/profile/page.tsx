import Link from "next/link";
import { redirect } from "next/navigation";

import { WealthCanvas } from "@/components/courses/WealthCanvas";
import {
  saveWealthCanvasAction,
  setTopAchieversOptInAction,
} from "@/app/(content)/learn/dashboard/profile/actions";
import {
  buildStudentClarityView,
  buildStudentDashboard,
} from "@/lib/courses/analytics";
import { WEALTH_CANVAS_PROMPTS } from "@/lib/courses/clarity-track";
import { formatStudentDisplayName } from "@/lib/courses/display-name";
import { getCourseStudentId } from "@/lib/courses/student-session";
import { studentCoursesPath, studentLoginPath } from "@/lib/courses/paths";

export const dynamic = "force-dynamic";

export default async function StudentProfilePage() {
  const studentId = await getCourseStudentId();
  if (!studentId) redirect(studentLoginPath("/learn/dashboard/profile"));

  const { student, myCourses } = await buildStudentDashboard(studentId);
  const clarityView = await buildStudentClarityView(studentId);
  const completed = myCourses.filter((row) => row.enrollment?.completedAt).length;
  const name = formatStudentDisplayName(student);

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#006B6B]">
          Profile &amp; achievements
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-shark">{name}</h1>
        <p className="mt-2 text-sm text-stone-600">
          Your Clarity Track identity, badges, and Living Wealth Canvas.
        </p>
      </div>

      <WealthCanvas answers={clarityView.clarity.canvasAnswers} studentName={name} />

      <section className="grid gap-3 sm:grid-cols-4">
        {[
          ["Tier", clarityView.tier.label],
          ["Insight Points", String(clarityView.clarity.insightPoints)],
          ["Momentum", `${clarityView.clarity.momentumWeeks} wks`],
          ["Courses done", String(completed)],
        ].map(([label, value]) => (
          <div key={label} className="rounded-2xl bg-white p-4 ring-1 ring-stone-200">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-stone-500">
              {label}
            </p>
            <p className="mt-1 text-xl font-bold text-shark">{value}</p>
          </div>
        ))}
      </section>

      <section className="rounded-2xl bg-white p-6 ring-1 ring-stone-200">
        <h2 className="text-lg font-semibold text-shark">Badge cabinet</h2>
        <p className="mt-1 text-sm text-stone-600">
          Milestones earned through real learning — not empty clicks.
        </p>
        {clarityView.badges.length === 0 ? (
          <p className="mt-4 text-sm text-stone-500">
            Complete a lesson to earn your first badge.
          </p>
        ) : (
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {clarityView.badges.map((badge) => (
              <li key={badge.id} className="rounded-xl bg-[#F7F6F3] px-4 py-3 ring-1 ring-stone-200">
                <p className="font-semibold text-shark">{badge.label}</p>
                <p className="mt-1 text-sm text-stone-600">{badge.description}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="rounded-2xl bg-white p-6 ring-1 ring-stone-200">
        <h2 className="text-lg font-semibold text-shark">Shape your Wealth Canvas</h2>
        <p className="mt-1 text-sm text-stone-600">
          Private answers about goals and worries. When you book Albert, this becomes a thoughtful
          briefing — not a product pitch.
        </p>
        <form action={saveWealthCanvasAction} className="mt-5 space-y-4">
          {WEALTH_CANVAS_PROMPTS.map((prompt) => (
            <label key={prompt.id} className="block text-sm font-medium text-stone-700">
              {prompt.label}
              <textarea
                name={prompt.id}
                rows={2}
                defaultValue={clarityView.clarity.canvasAnswers[prompt.id] ?? ""}
                placeholder={prompt.placeholder}
                className="mt-1 w-full rounded-xl border border-stone-200 bg-[#F7F6F3] px-3 py-2.5 text-shark outline-none ring-[#0057B8]/30 focus:ring-2"
              />
            </label>
          ))}
          <button
            type="submit"
            className="rounded-full bg-[#0057B8] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#004a9e]"
          >
            Save canvas
          </button>
        </form>
      </section>

      <section className="rounded-2xl bg-white p-6 ring-1 ring-stone-200">
        <h2 className="text-lg font-semibold text-shark">Account</h2>
        <dl className="mt-4 grid gap-3 sm:grid-cols-2 text-sm">
          <div>
            <dt className="text-[11px] font-semibold uppercase tracking-wide text-stone-500">Email</dt>
            <dd className="mt-1 text-shark">{student.email}</dd>
          </div>
          <div>
            <dt className="text-[11px] font-semibold uppercase tracking-wide text-stone-500">
              Member since
            </dt>
            <dd className="mt-1 text-shark">{student.createdAt.slice(0, 10)}</dd>
          </div>
        </dl>
        <form action={setTopAchieversOptInAction} className="mt-5">
          <label className="flex items-start gap-3 text-sm text-stone-700">
            <input
              type="checkbox"
              name="showOnTopAchievers"
              defaultChecked={clarityView.clarity.showOnTopAchievers}
              className="mt-1"
            />
            <span>
              Show me on the opt-in Top Achievers board (first name + last initial only). Off by
              default for privacy.
            </span>
          </label>
          <button
            type="submit"
            className="mt-3 rounded-full border border-stone-300 px-4 py-2 text-sm font-semibold text-shark hover:bg-stone-50"
          >
            Save privacy choice
          </button>
        </form>
      </section>

      <Link
        href={studentCoursesPath()}
        className="inline-flex text-sm font-semibold text-[#0057B8] hover:underline"
      >
        ← My Journey
      </Link>
    </div>
  );
}
