"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, LogOut, PanelLeftClose, PanelLeftOpen, Scroll } from "@/components/icons";
import { studioLogout } from "@/app/studio/blog/actions";
import { StudioClearCacheButton } from "@/components/client-studio/StudioClearCacheButton";
import { useStaffSidebar } from "@/components/staff/StaffSidebarContext";
import { COURSE_STUDENT_AUTH_ENABLED } from "@/lib/courses/flags";
import { cn } from "@/lib/utils";

function HomeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" {...props}>
      <path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9.5z" strokeLinejoin="round" />
    </svg>
  );
}

function PenIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" {...props}>
      <path d="M12 20h9" strokeLinecap="round" />
      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" strokeLinejoin="round" />
    </svg>
  );
}

function DraftsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" {...props}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeLinejoin="round" />
      <path d="M14 2v6h6" strokeLinejoin="round" />
      <path d="M8 13h8M8 17h5" strokeLinecap="round" />
    </svg>
  );
}

function CoursesIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" {...props}>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" strokeLinecap="round" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" strokeLinejoin="round" />
      <path d="M8 7h8M8 11h5" strokeLinecap="round" />
    </svg>
  );
}

function PeopleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" {...props}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" strokeLinecap="round" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" strokeLinecap="round" />
    </svg>
  );
}

function NewsletterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" {...props}>
      <path d="M4 4h16v16H4z" strokeLinejoin="round" />
      <path d="m4 8 8 5 8-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type NavItemDef = {
  href: string;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  exact?: boolean;
};

const STUDIO_SWITCH: NavItemDef[] = [
  { href: "/studio/blog/workspace", label: "Insights", icon: PenIcon, exact: false },
  { href: "/studio/courses", label: "Courses", icon: CoursesIcon, exact: false },
  { href: "/studio/newsletter", label: "Newsletter", icon: NewsletterIcon, exact: false },
];

const BLOG_TOOLS: NavItemDef[] = [
  { href: "/studio/blog/workspace", label: "Articles", icon: PenIcon, exact: true },
  { href: "/studio/blog/workspace#drafts", label: "Drafts", icon: DraftsIcon },
  { href: "/studio/blog/workspace/tutorial", label: "Tutorial", icon: Scroll },
  { href: "/studio/blog/workspace#copy-me", label: "Brand guide", icon: FileText },
];

const COURSE_TOOLS: NavItemDef[] = [
  { href: "/studio/courses", label: "All courses", icon: CoursesIcon, exact: true },
  ...(COURSE_STUDENT_AUTH_ENABLED
    ? [
        { href: "/studio/courses/learners", label: "Learners", icon: PeopleIcon, exact: false },
        { href: "/studio/courses/analytics", label: "Progress", icon: PeopleIcon, exact: false },
        { href: "/studio/courses/students", label: "Students", icon: PeopleIcon, exact: false },
        { href: "/studio/courses/portal", label: "Student banner", icon: NewsletterIcon, exact: true },
      ]
    : []),
];

const NEWSLETTER_TOOLS: NavItemDef[] = [
  { href: "/studio/newsletter", label: "Editions", icon: NewsletterIcon, exact: true },
  { href: "/studio/newsletter/subscribers", label: "Subscribers", icon: PeopleIcon, exact: true },
];

function NavItem({
  href,
  label,
  icon: Icon,
  active,
  collapsed,
}: {
  href: string;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  active: boolean;
  collapsed: boolean;
}) {
  return (
    <Link
      href={href}
      prefetch={false}
      title={label}
      className={cn(
        "flex h-10 items-center rounded-xl text-[13px] font-medium transition-colors",
        collapsed ? "justify-center px-0" : "px-3",
        active
          ? "bg-[#E8F3F3] text-[#006B6B]"
          : "text-[#52525b] hover:bg-[#F0F0EE] hover:text-[#1D1D1F]"
      )}
    >
      <Icon className="h-[18px] w-[18px] shrink-0" aria-hidden />
      {!collapsed ? <span className="ml-3 truncate">{label}</span> : null}
    </Link>
  );
}

function navItemActive(pathname: string, href: string, exact?: boolean) {
  const pathOnly = href.split("#")[0] ?? href;
  if (href.includes("#")) return false;
  if (exact) return pathname === pathOnly;
  return pathname === pathOnly || pathname.startsWith(`${pathOnly}/`);
}

function studioSwitchActive(pathname: string, href: string) {
  if (href.startsWith("/studio/blog")) return pathname.startsWith("/studio/blog");
  if (href.startsWith("/studio/courses")) return pathname.startsWith("/studio/courses");
  if (href.startsWith("/studio/newsletter")) return pathname.startsWith("/studio/newsletter");
  return false;
}

export function StudioSidebar() {
  const pathname = usePathname() ?? "";
  const { collapsed, toggle } = useStaffSidebar();
  const inBlog = pathname.startsWith("/studio/blog");
  const inCourses = pathname.startsWith("/studio/courses");
  const inNewsletter = pathname.startsWith("/studio/newsletter");
  const tools = inBlog ? BLOG_TOOLS : inCourses ? COURSE_TOOLS : inNewsletter ? NEWSLETTER_TOOLS : [];

  return (
    <>
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 hidden h-screen flex-col border-r border-[#E5E5E5] bg-white transition-[width] duration-200 ease-out md:flex",
          collapsed ? "w-14" : "w-56"
        )}
      >
        <div
          className={cn(
            "flex h-14 shrink-0 items-center border-b border-[#E5E5E5]",
            collapsed ? "justify-center px-2" : "px-3"
          )}
        >
          <Link href="/crm" className="flex min-w-0 items-center gap-2.5 overflow-hidden">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#E8F3F3] text-[#006B6B]">
              <HomeIcon className="h-4 w-4" />
            </span>
            {!collapsed ? (
              <span className="truncate text-sm font-semibold tracking-tight text-[#1D1D1F]">
                AS Brokers
              </span>
            ) : null}
          </Link>
        </div>

        <nav className="flex-1 space-y-0.5 overflow-y-auto overflow-x-hidden p-2" aria-label="Studio">
          {!collapsed ? (
            <p className="mb-1 px-3 pt-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#71717a]">
              Create
            </p>
          ) : null}
          {STUDIO_SWITCH.map((item) => (
            <NavItem
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon}
              active={studioSwitchActive(pathname, item.href)}
              collapsed={collapsed}
            />
          ))}

          {tools.length > 0 ? (
            <div className={cn("my-2 border-t border-[#E5E5E5]", collapsed ? "pt-2" : "pt-3")}>
              {!collapsed ? (
                <p className="mb-1 px-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#71717a]">
                  In this studio
                </p>
              ) : null}
              {tools.map((item) => (
                <NavItem
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  icon={item.icon}
                  active={navItemActive(pathname, item.href, item.exact)}
                  collapsed={collapsed}
                />
              ))}
            </div>
          ) : null}
        </nav>

        <div className="space-y-1 border-t border-[#E5E5E5] p-2">
          <NavItem
            href="/crm"
            label="Home"
            icon={HomeIcon}
            active={pathname === "/crm"}
            collapsed={collapsed}
          />
          <NavItem
            href="/crm/leads"
            label="Leads"
            icon={PeopleIcon}
            active={pathname.startsWith("/crm/leads")}
            collapsed={collapsed}
          />
          <StudioClearCacheButton variant="sidebar" />
          <form action={studioLogout}>
            <button
              type="submit"
              title="Sign out"
              className={cn(
                "flex h-10 w-full items-center rounded-xl text-[13px] text-[#52525b] transition-colors hover:bg-[#F0F0EE] hover:text-[#1D1D1F]",
                collapsed ? "justify-center" : "px-3"
              )}
            >
              <LogOut className="h-[18px] w-[18px] shrink-0" aria-hidden />
              {!collapsed ? <span className="ml-3 truncate">Sign out</span> : null}
            </button>
          </form>
          <button
            type="button"
            onClick={toggle}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className={cn(
              "flex h-10 w-full items-center rounded-xl text-[13px] text-[#71717a] transition-colors hover:bg-[#F0F0EE] hover:text-[#1D1D1F]",
              collapsed ? "justify-center" : "px-3"
            )}
          >
            {collapsed ? (
              <PanelLeftOpen className="h-[18px] w-[18px]" aria-hidden />
            ) : (
              <>
                <PanelLeftClose className="h-[18px] w-[18px] shrink-0" aria-hidden />
                <span className="ml-3 truncate">Collapse</span>
              </>
            )}
          </button>
        </div>
      </aside>

      <div className="fixed left-0 right-0 top-0 z-50 flex h-12 items-center justify-between gap-2 border-b border-[#E5E5E5] bg-white px-3 md:hidden">
        <Link href="/crm" className="shrink-0 text-sm font-semibold text-[#1D1D1F]">
          AS Brokers
        </Link>
        <div className="flex min-w-0 items-center gap-1 overflow-x-auto">
          {STUDIO_SWITCH.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "shrink-0 rounded-lg px-2 py-1 text-[11px] font-medium",
                studioSwitchActive(pathname, href)
                  ? "bg-[#E8F3F3] text-[#006B6B]"
                  : "text-[#52525b] hover:bg-[#F0F0EE]"
              )}
            >
              {label}
            </Link>
          ))}
          <StudioClearCacheButton variant="header" className="shrink-0" />
        </div>
      </div>
    </>
  );
}
