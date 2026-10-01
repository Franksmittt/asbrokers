import "server-only";

import { insertCrmLead } from "@/lib/crm/insert-lead";
import { getLeadAttribution } from "@/lib/crm/lead-attribution";
import { notifyStaffLead } from "@/lib/email/notifications";
import { formatStudentDisplayName } from "@/lib/courses/display-name";
import { studioCoursePath, studioLessonPath } from "@/lib/courses/paths";
import { addCourseStaffAlert } from "@/lib/courses/store";
import type { CourseRecord, CourseStudent, LessonComment } from "@/lib/courses/types";
import { getChampion } from "@/lib/growth/champions";
import { resolveCourseServiceCategory } from "@/lib/growth/course-service";
import { recordCourseEnrollmentAttribution } from "@/lib/growth/store";

/**
 * Notify CRM + email when a student newly registers for a course.
 * Records growth attribution (champion / UTM) and routes by course service category.
 */
export async function notifyCourseRegistration(input: {
  student: CourseStudent;
  course: CourseRecord;
  isNewEnrollment: boolean;
}): Promise<void> {
  if (!input.isNewEnrollment) return;

  const name = `${input.student.firstName} ${input.student.surname}`.trim();
  const href = studioCoursePath(input.course.id);
  const attribution = await getLeadAttribution();
  const serviceCategory = resolveCourseServiceCategory(input.course);
  const champion = getChampion(attribution?.promoter_ref);

  try {
    await recordCourseEnrollmentAttribution({
      student: input.student,
      course: input.course,
      isNewEnrollment: true,
      promoterRef: attribution?.promoter_ref,
      attribution,
    });
  } catch (error) {
    console.error("[courses/crm-bridge] growth attribution failed:", error);
  }

  try {
    await insertCrmLead({
      sourceFunnel: "course_registration",
      serviceCategory,
      leadScore: champion ? 62 : 55,
      rawPayload: {
        name,
        email: input.student.email,
        phone: "",
        intent: `Course registration: ${input.course.title}`,
        courseId: input.course.id,
        courseSlug: input.course.slug,
        courseTitle: input.course.title,
        studentId: input.student.id,
        marketingConsent: input.student.marketingConsent,
        serviceCategory,
        sourcedBy: champion?.key,
        sourcedByName: champion?.name,
        attribution,
        funnelData: {
          assessment: "Course registration",
          score: input.course.title,
          keyRisk: champion
            ? `Champion: ${champion.firstName}`
            : "Learning interest",
          capital: ", ",
        },
      },
    });
  } catch (error) {
    console.error("[courses/crm-bridge] insertCrmLead failed:", error);
  }

  void notifyStaffLead("Course registration", {
    Name: name,
    Email: input.student.email,
    Course: input.course.title,
    Service: serviceCategory,
    Champion: champion?.name ?? "Organic / unpaid",
    "Studio link": href,
    Marketing: input.student.marketingConsent ? "Yes" : "No",
  }).catch((error) => {
    if (process.env.NODE_ENV === "development") {
      console.error("[courses/crm-bridge] Resend (registration) failed:", error);
    }
  });
}

/** Notify Albert in CRM + email when a student posts a lesson comment. */
export async function notifyCourseComment(input: {
  student: CourseStudent;
  course: CourseRecord;
  lessonId: string;
  lessonTitle: string;
  comment: LessonComment;
}): Promise<void> {
  const displayName = formatStudentDisplayName(input.student);
  const href = studioLessonPath(input.course.id, input.lessonId);
  const preview =
    input.comment.body.length > 140
      ? `${input.comment.body.slice(0, 137)}…`
      : input.comment.body;

  try {
    await addCourseStaffAlert({
      type: "comment",
      title: "New lesson comment",
      body: `${displayName} on ${input.course.title} · ${input.lessonTitle}: ${preview}`,
      href,
      relatedCommentId: input.comment.id,
      relatedStudentId: input.student.id,
      relatedCourseId: input.course.id,
      relatedLessonId: input.lessonId,
    });
  } catch (error) {
    console.error("[courses/crm-bridge] staff alert (comment) failed:", error);
  }

  void notifyStaffLead("Course lesson comment", {
    Name: `${input.student.firstName} ${input.student.surname}`.trim(),
    Email: input.student.email,
    Course: input.course.title,
    Lesson: input.lessonTitle,
    Comment: preview,
    "Studio link": href,
  }).catch((error) => {
    if (process.env.NODE_ENV === "development") {
      console.error("[courses/crm-bridge] Resend (comment) failed:", error);
    }
  });
}
