import { TeacherOsClient } from "@/components/crm/TeacherOsClient";
import { requireCrmAccess } from "@/lib/crm/staff-access";
import { isAdminRole } from "@/lib/crm/session";
import { listPublishedCourses } from "@/lib/courses/store";
import {
  COURSE_CHAMPIONS,
  getChampionByCrmUserId,
} from "@/lib/growth/champions";
import { championShareKit } from "@/lib/growth/links";
import {
  getFirmInfluenceSummary,
  getTeacherPipeline,
  listInfluenceForChampion,
  listTouchesForStudent,
  seedGrowthDemoData,
  sumInfluencePoints,
  listAllJourneys,
} from "@/lib/growth/store";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Teacher OS | Team office",
  description: "Champion links, education pipeline, and Influence wallet.",
  robots: { index: false, follow: false },
};

export default async function TeacherOsPage({
  searchParams,
}: {
  searchParams: Promise<{ seed?: string; as?: string }>;
}) {
  const access = await requireCrmAccess();
  const params = await searchParams;

  if (params.seed === "1" && isAdminRole(access.role)) {
    await seedGrowthDemoData();
  }

  const champion =
    (params.as ? COURSE_CHAMPIONS[params.as as keyof typeof COURSE_CHAMPIONS] : null) ||
    getChampionByCrmUserId(access.user.id) ||
    COURSE_CHAMPIONS.albert;

  const isOwnerView = isAdminRole(access.role);

  const [points, pipeline, influence, courses, firm, journeys] = await Promise.all([
    sumInfluencePoints(champion.key),
    getTeacherPipeline(champion.key),
    listInfluenceForChampion(champion.key),
    listPublishedCourses(),
    isOwnerView ? getFirmInfluenceSummary() : Promise.resolve([]),
    listAllJourneys(),
  ]);

  const shareCourses = courses.slice(0, 8).map((course) => {
    const kit = championShareKit({
      champion,
      courseSlug: course.slug,
      courseTitle: course.title,
    });
    return {
      slug: course.slug,
      title: course.title,
      url: kit.url,
      whatsappHref: kit.whatsappHref,
      whatsappText: kit.whatsappText,
    };
  });

  // Timeline: pick the busiest student journey for demo narrative
  const sampleStudentId =
    journeys.find((j) => j.sourcedBy === champion.key)?.studentId ||
    journeys[0]?.studentId;
  const timelineSample = sampleStudentId
    ? await listTouchesForStudent(sampleStudentId)
    : [];

  return (
    <div>
      {isOwnerView ? (
        <div className="border-b border-[#E5E5E5] bg-white px-4 py-2 text-center text-xs text-[#52525b] sm:px-6">
          Owner tools:{" "}
          <a href="/crm/teacher?seed=1" className="text-[#006B6B] hover:underline">
            Seed demo learners
          </a>
          {" · "}
          <a href="/crm/teacher?as=monique" className="text-[#3F3F46] hover:underline">
            View as Monique
          </a>
          {" · "}
          <a href="/crm/teacher?as=johnny" className="text-[#3F3F46] hover:underline">
            View as Johnny
          </a>
          {" · "}
          <a href="/crm/teacher" className="text-[#3F3F46] hover:underline">
            My desk
          </a>
        </div>
      ) : null}
      <TeacherOsClient
        champion={champion}
        isOwnerView={isOwnerView}
        points={points}
        pipeline={pipeline}
        influence={influence}
        shareCourses={shareCourses}
        firmSummary={firm.map((row) => ({
          key: row.champion.key,
          name: row.champion.name,
          points: row.points,
          journeys: row.journeys,
          pending: row.pending,
        }))}
        timelineSample={timelineSample}
      />
    </div>
  );
}
