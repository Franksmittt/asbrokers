import Link from "next/link";
import { notFound } from "next/navigation";

import {
  getCourseById,
  getStudentById,
  listEnrollmentsForStudent,
  listEventsForStudent,
  listResponsesForStudent,
} from "@/lib/courses/store";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ studentId: string }> };

export default async function StudentDetailPage({ params }: Props) {
  const { studentId } = await params;
  const student = getStudentById(studentId);
  if (!student) notFound();

  const enrollments = listEnrollmentsForStudent(student.id);
  const events = listEventsForStudent(student.id);
  const responses = listResponsesForStudent(student.id);

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

      {enrollments.map((enrollment) => {
        const course = getCourseById(enrollment.courseId);
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
      })}

      <section>
        <h2 className="text-lg font-semibold text-white">Private lesson answers</h2>
        <ul className="mt-4 space-y-3">
          {responses.length === 0 ? (
            <li className="text-sm text-zinc-500">No answers submitted yet.</li>
          ) : (
            responses.map((response) => {
              const lessonTitle =
                enrollments
                  .map((enrollment) => getCourseById(enrollment.courseId))
                  .flatMap((course) => course?.lessons ?? [])
                  .find((lesson) => lesson.id === response.lessonId)?.title ?? response.lessonId;
              return (
                <li key={response.id} className="rounded-xl border border-[#2a2a2a] bg-[#0a0a0a] p-4">
                  <p className="text-xs text-zinc-500">
                    {lessonTitle} · {response.submittedAt.slice(0, 16).replace("T", " ")}
                  </p>
                  <p className="mt-2 whitespace-pre-wrap text-sm text-zinc-200">{response.answer}</p>
                </li>
              );
            })
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
