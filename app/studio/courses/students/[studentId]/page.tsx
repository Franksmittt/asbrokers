import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { replyToLessonResponseAction } from "@/app/studio/courses/actions";
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
  "mt-2 w-full rounded-md border border-[#2a2a2a] bg-black px-3 py-2 text-sm text-white placeholder:text-zinc-600";

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
        <Link href="/studio/courses/students" className="text-xs text-zinc-500 hover:text-white">
          ← Students
        </Link>
        <h1 className="mt-2 text-2xl font-semibold text-white">
          {student.firstName} {student.surname}
        </h1>
        <p className="mt-1 text-sm text-zinc-400">{student.email}</p>
        <p className="mt-1 text-xs text-zinc-500">Registered {student.createdAt.slice(0, 10)}</p>
      </div>

      {await Promise.all(
        enrollments.map(async (enrollment) => {
          const course = await getCourseById(enrollment.courseId);
          return (
            <section key={enrollment.id} className="rounded-xl border border-[#2a2a2a] bg-[#0a0a0a] p-5">
              <h2 className="font-medium text-white">{course?.title ?? enrollment.courseId}</h2>
              <p className="mt-2 text-xs text-zinc-500">
                Started {enrollment.startedAt.slice(0, 10)}
                {enrollment.completedAt ? ` · Completed ${enrollment.completedAt.slice(0, 10)}` : " · In progress"}
                {enrollment.offerClickedAt ? " · Offer clicked" : ""}
              </p>
            </section>
          );
        })
      )}

      <section>
        <h2 className="text-lg font-semibold text-white">Classroom answers</h2>
        <p className="mt-1 text-sm text-zinc-500">
          Reply personally. Your reply is visible to this student and to everyone else who has submitted in that lesson.
        </p>
        <ul className="mt-4 space-y-3">
          {responses.length === 0 ? (
            <li className="text-sm text-zinc-500">No answers submitted yet.</li>
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
                  <li key={response.id} className="rounded-xl border border-[#2a2a2a] bg-[#0a0a0a] p-4">
                    <p className="text-xs text-zinc-500">
                      {lessonTitle} · {response.submittedAt.slice(0, 16).replace("T", " ")}
                    </p>
                    <p className="mt-2 whitespace-pre-wrap text-sm text-zinc-200">{response.answer}</p>
                    {response.instructorReply ? (
                      <div className="mt-3 rounded-lg border border-[#3ecf8e]/20 bg-black p-3">
                        <p className="text-[11px] uppercase tracking-wide text-[#3ecf8e]">Your reply</p>
                        <p className="mt-1 whitespace-pre-wrap text-sm text-zinc-200">{response.instructorReply}</p>
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
                      <button type="submit" className="rounded-md bg-[#3ecf8e] px-3 py-1.5 text-xs font-medium text-black">
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
        <h2 className="text-lg font-semibold text-white">Activity</h2>
        <ol className="mt-4 space-y-2 text-sm text-zinc-400">
          {events.map((event) => (
            <li key={event.id}>
              <span className="text-zinc-200">{event.type.replaceAll("_", " ")}</span>
              <span className="text-zinc-600"> · {event.createdAt.slice(0, 16).replace("T", " ")}</span>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
