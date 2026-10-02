import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import {
  grantEnrollmentAccessAction,
  replyToLessonResponseAction,
} from "@/app/studio/courses/actions";
import {
  getCourseById,
  getStudentById,
  listEnrollmentsForStudent,
  listEventsForStudent,
  listResponsesForStudent,
} from "@/lib/courses/store";
import { COURSE_STUDENT_AUTH_ENABLED } from "@/lib/courses/flags";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ studentId: string }> };

const field =
  "mt-2 w-full rounded-md border border-[#E5E5E5] bg-[#F7F6F3] px-3 py-2 text-sm text-[#1D1D1F] placeholder:text-[#A1A1AA]";

export default async function StudentDetailPage({ params }: Props) {
  if (!COURSE_STUDENT_AUTH_ENABLED) {
    redirect("/studio/courses");
  }
  const { studentId } = await params;
  const student = await getStudentById(studentId);
  if (!student) notFound();

  const enrollments = await listEnrollmentsForStudent(student.id);
  const events = await listEventsForStudent(student.id);
  const responses = await listResponsesForStudent(student.id);

  return (
    <div className="mx-auto w-full max-w-4xl space-y-8">
      <div>
        <Link href="/studio/courses/students" className="text-xs text-[#52525b] hover:text-[#1D1D1F]">
          ← Students
        </Link>
        <h1 className="mt-2 text-2xl font-semibold text-[#1D1D1F]">
          {student.firstName} {student.surname}
        </h1>
        <p className="mt-1 text-sm text-[#52525b]">{student.email}</p>
        <p className="mt-1 text-xs text-[#52525b]">Registered {student.createdAt.slice(0, 10)}</p>
      </div>

      {await Promise.all(
        enrollments.map(async (enrollment) => {
          const course = await getCourseById(enrollment.courseId);
          return (
            <section key={enrollment.id} className="rounded-xl border border-[#E5E5E5] bg-white p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-medium text-[#1D1D1F]">{course?.title ?? enrollment.courseId}</h2>
                  <p className="mt-2 text-xs text-[#52525b]">
                    Started {enrollment.startedAt.slice(0, 10)}
                    {enrollment.completedAt
                      ? ` · Completed ${enrollment.completedAt.slice(0, 10)}`
                      : " · In progress"}
                    {enrollment.offerClickedAt ? " · Offer clicked" : ""}
                    {enrollment.paymentStatus === "pending"
                      ? " · Awaiting paid access"
                      : enrollment.paymentStatus === "granted"
                        ? " · Access granted"
                        : ""}
                  </p>
                </div>
                {enrollment.paymentStatus === "pending" ? (
                  <form action={grantEnrollmentAccessAction}>
                    <input type="hidden" name="enrollmentId" value={enrollment.id} />
                    <button
                      type="submit"
                      className="rounded-md bg-[#006B6B] px-3 py-1.5 text-xs font-medium text-white"
                    >
                      Grant access
                    </button>
                  </form>
                ) : null}
              </div>
            </section>
          );
        })
      )}

      <section>
        <h2 className="text-lg font-semibold text-[#1D1D1F]">Classroom answers</h2>
        <p className="mt-1 text-sm text-[#52525b]">
          Reply personally. Your reply is visible to this student and to everyone else who has submitted in that lesson.
        </p>
        <ul className="mt-4 space-y-3">
          {responses.length === 0 ? (
            <li className="text-sm text-[#52525b]">No answers submitted yet.</li>
          ) : (
            await Promise.all(
              responses.map(async (response) => {
                const lessonTitle =
                  (
                    await Promise.all(enrollments.map((enrollment) => getCourseById(enrollment.courseId)))
                  )
                    .flatMap((course) => course?.lessons ?? [])
                    .find((lesson) => lesson.id === response.lessonId)?.title ?? response.lessonId;
                return (
                  <li key={response.id} className="rounded-xl border border-[#E5E5E5] bg-white p-4">
                    <p className="text-xs text-[#52525b]">
                      {lessonTitle} · {response.submittedAt.slice(0, 16).replace("T", " ")}
                    </p>
                    <p className="mt-2 whitespace-pre-wrap text-sm text-[#1D1D1F]">{response.answer}</p>
                    {response.instructorReply ? (
                      <div className="mt-3 rounded-lg border border-[#A7F3D0] bg-[#F7F6F3] p-3">
                        <p className="text-[11px] uppercase tracking-wide text-[#006B6B]">Your reply</p>
                        <p className="mt-1 whitespace-pre-wrap text-sm text-[#1D1D1F]">{response.instructorReply}</p>
                      </div>
                    ) : null}
                    <form action={replyToLessonResponseAction} className="mt-3 space-y-2">
                      <input type="hidden" name="responseId" value={response.id} />
                      <input type="hidden" name="studentId" value={student.id} />
                      <textarea
                        name="reply"
                        rows={3}
                        required
                        defaultValue={response.instructorReply ?? ""}
                        placeholder="Write a personal reply. The classroom can read this."
                        className={field}
                      />
                      <button type="submit" className="rounded-md bg-[#006B6B] px-3 py-1.5 text-xs font-medium text-white">
                        {response.instructorReply ? "Update reply" : "Send reply"}
                      </button>
                    </form>
                  </li>
                );
              })
            )
          )}
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-[#1D1D1F]">Activity</h2>
        <ol className="mt-4 space-y-2 text-sm text-[#52525b]">
          {events.map((event) => (
            <li key={event.id}>
              <span className="text-[#1D1D1F]">{event.type.replaceAll("_", " ")}</span>
              <span className="text-[#71717a]"> · {event.createdAt.slice(0, 16).replace("T", " ")}</span>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
