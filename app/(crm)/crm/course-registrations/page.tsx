import { FunnelLeadsTable } from "@/components/crm/FunnelLeadsTable";
import { listLeadsBySourceFunnel } from "@/lib/crm/list-leads-by-funnel";

export const metadata = {
  title: "Course registrations | Team office",
  description: "Students who registered for a /learn course.",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function CourseRegistrationsCrmPage() {
  const rows = await listLeadsBySourceFunnel("course_registration");
  return (
    <FunnelLeadsTable
      eyebrow="CRM · Courses"
      title="Course registrations"
      description="New /learn course signups land here as CRM leads. Full progress and classroom answers live in Course Studio → Students."
      emptyMessage="No course registrations yet. When a student registers on /learn, they show up here and in Studio → Students."
      rows={rows}
      studioHref={{ href: "/studio/courses/students", label: "Open student database →" }}
    />
  );
}
