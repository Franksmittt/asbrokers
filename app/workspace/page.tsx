import Link from "next/link";
import { redirect } from "next/navigation";

import { canAccessStaffStudio, hasCrmStudioBridge } from "@/lib/client-studio/staff-access";
import { getClientStudioSession, isClientStudioConfigured } from "@/lib/client-studio/session";
import { privateRouteMetadata } from "@/lib/seo-metadata";

export const metadata = privateRouteMetadata(
  "Command Workspace",
  "Today, Serve, Teach, Publish, and Grow — one staff home for AS Brokers."
);

export const dynamic = "force-dynamic";

const MODULES = [
  {
    verb: "Today",
    href: "/workspace",
    title: "Morning launchpad",
    description: "Your single entry point into CRM, Teacher OS, and publishing.",
    links: [
      { href: "/crm", label: "CRM dashboard" },
      { href: "/crm/tasks", label: "Tasks" },
      { href: "/studio", label: "Studio chooser" },
    ],
  },
  {
    verb: "Serve",
    href: "/crm",
    title: "Client operations",
    description: "Pipelines, WhatsApp, notes, and compliance-facing client work.",
    links: [
      { href: "/crm/leads", label: "Leads" },
      { href: "/crm/clients", label: "Clients" },
      { href: "/crm/kanban", label: "Kanban" },
      { href: "/crm/whatsapp", label: "WhatsApp" },
    ],
  },
  {
    verb: "Teach",
    href: "/crm/teacher",
    title: "Teacher OS & courses",
    description: "Champion links, learner pipeline, and course building.",
    links: [
      { href: "/crm/teacher", label: "Teacher OS" },
      { href: "/studio/courses", label: "Course Studio" },
      { href: "/crm/course-registrations", label: "Course signups" },
    ],
  },
  {
    verb: "Publish",
    href: "/studio/blog/workspace",
    title: "Insights & newsletter",
    description: "Warm Paper & Ink Insights, newsletter editions, and FAIS-safe copy.",
    links: [
      { href: "/studio/blog/workspace", label: "Insights Studio" },
      { href: "/studio/newsletter", label: "Newsletter Studio" },
      { href: "/insights", label: "Live Insights" },
    ],
  },
  {
    verb: "Grow",
    href: "/crm/teacher",
    title: "Attribution & funnels",
    description: "Champion influence, newsletter subscribers, and growth surfaces.",
    links: [
      { href: "/crm/newsletter-subscribers", label: "Newsletter list" },
      { href: "/crm/teacher", label: "Champion desk" },
      { href: "/crm/goals", label: "Goals" },
    ],
  },
  {
    verb: "System",
    href: "/crm/settings",
    title: "Settings & access",
    description: "Permissions, executive views, and firm configuration.",
    links: [
      { href: "/crm/settings", label: "CRM settings" },
      { href: "/crm/executive", label: "Executive" },
      { href: "/login", label: "Staff login" },
    ],
  },
] as const;

export default async function CommandWorkspacePage() {
  const studioCookie = await getClientStudioSession();
  const crmBridge = await hasCrmStudioBridge();
  const allowed = await canAccessStaffStudio();

  if (!allowed && isClientStudioConfigured()) {
    redirect("/login?next=/workspace");
  }

  return (
    <div className="min-h-screen bg-[#F7F6F3] text-[#1D1D1F]">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
        <header className="mb-10 border-b border-[#E5E5E5] pb-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#006B6B]">
            AS Brokers · FSP 17273
          </p>
          <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
            Command Workspace
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#52525b]">
            One staff home: Serve clients, Teach with Clarity Track, Publish warm Insights, and Grow
            attribution — without juggling separate logins.
          </p>
          <p className="mt-4 text-xs text-[#71717a]">
            Access via{" "}
            {crmBridge ? "CRM session" : studioCookie ? "Studio password" : "open demo mode"}
            . Full Paper &amp; Ink CRM shell follows in a later phase.
          </p>
        </header>

        <ul className="grid gap-5 sm:grid-cols-2">
          {MODULES.map((mod) => (
            <li
              key={mod.verb}
              className="rounded-3xl border border-[#E5E5E5] bg-white/80 p-6 shadow-sm"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#006B6B]">
                {mod.verb}
              </p>
              <h2 className="mt-2 text-xl font-semibold tracking-tight">
                <Link href={mod.href} className="hover:text-[#0057B8]">
                  {mod.title}
                </Link>
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#52525b]">{mod.description}</p>
              <ul className="mt-4 space-y-1.5">
                {mod.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm font-medium text-[#0057B8] hover:underline"
                    >
                      {link.label} →
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
