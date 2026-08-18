"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, LogOut, Scroll } from "@/components/icons";
import { studioLogout } from "@/app/studio/blog/actions";
import { StudioClearCacheButton } from "@/components/client-studio/StudioClearCacheButton";
import { cn } from "@/lib/utils";

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

function ExternalLinkIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" {...props}>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" strokeLinecap="round" />
      <path d="M15 3h6v6M10 14 21 3" strokeLinecap="round" strokeLinejoin="round" />
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

const STUDIO_NAV = [
  { href: "/studio/blog/workspace", label: "Articles", icon: PenIcon, exact: true },
  { href: "/studio/blog/workspace#drafts", label: "Drafts", icon: DraftsIcon, exact: false },
  { href: "/studio/courses", label: "Courses", icon: CoursesIcon, exact: false },
  { href: "/studio/courses/students", label: "Students", icon: PeopleIcon, exact: false },
  { href: "/studio/blog/workspace/tutorial", label: "Tutorial", icon: Scroll, exact: false },
  { href: "/studio/blog/workspace#copy-me", label: "Brand guide", icon: FileText, exact: false },
] as const;

function NavItem({
  href,
  label,
  icon: Icon,
  active,
  external,
}: {
  href: string;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  active: boolean;
  external?: boolean;
}) {
  const className = cn(
    "group/item relative flex h-9 items-center rounded-md px-2 text-[13px] font-medium transition-colors",
    active ? "bg-[#1f1f1f] text-white" : "text-zinc-400 hover:bg-[#161616] hover:text-zinc-200"
  );
  const content = (
    <>
      <Icon className="h-[18px] w-[18px] shrink-0" aria-hidden />
      <span className="ml-3 truncate opacity-0 transition-opacity duration-150 group-hover/sidebar:opacity-100">
        {label}
      </span>
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" title={label} className={className}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} prefetch={false} title={label} className={className}>
      {content}
    </Link>
  );
}

function navItemActive(pathname: string, href: string, exact: boolean) {
  const pathOnly = href.split("#")[0] ?? href;
  if (href.includes("#")) {
    return false;
  }
  if (exact) {
    return pathname === pathOnly;
  }
  return pathname === pathOnly || pathname.startsWith(`${pathOnly}/`);
}

export function StudioSidebar() {
  const pathname = usePathname() ?? "";

  return (
    <>
      <aside
        className={cn(
          "group/sidebar fixed left-0 top-0 z-50 hidden h-screen w-[52px] flex-col",
          "border-r border-[#2a2a2a] bg-[#0a0a0a]",
          "transition-[width] duration-200 ease-out hover:w-56",
          "md:flex"
        )}
      >
        <div className="flex h-12 shrink-0 items-center border-b border-[#2a2a2a] px-2.5">
          <Link href="/studio/blog/workspace" className="flex min-w-0 items-center gap-2.5 overflow-hidden">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#3ecf8e]/15 text-[#3ecf8e]">
              <PenIcon className="h-4 w-4" />
            </span>
            <span className="truncate text-sm font-semibold text-white opacity-0 transition-opacity duration-150 group-hover/sidebar:opacity-100">
              ASB Studio
            </span>
          </Link>
        </div>

        <nav className="flex-1 space-y-0.5 overflow-y-auto overflow-x-hidden p-2" aria-label="Studio">
          {STUDIO_NAV.map(({ href, label, icon, exact }) => (
            <NavItem
              key={href}
              href={href}
              label={label}
              icon={icon}
              active={navItemActive(pathname, href, exact)}
            />
          ))}
          <div className="my-2 border-t border-[#2a2a2a] pt-2">
            <NavItem
              href="/insights"
              label="View insights"
              icon={ExternalLinkIcon}
              active={false}
              external
            />
            <NavItem href="/learn" label="View courses" icon={ExternalLinkIcon} active={false} external />
          </div>
        </nav>

        <div className="space-y-1 border-t border-[#2a2a2a] p-2">
          <p className="truncate px-2 py-1 text-[11px] text-zinc-500 opacity-0 transition-opacity duration-150 group-hover/sidebar:opacity-100">
            Studio
          </p>
          <StudioClearCacheButton variant="sidebar" />
          <form action={studioLogout}>
            <button
              type="submit"
              className="flex h-9 w-full items-center rounded-md px-2 text-[13px] text-zinc-400 transition-colors hover:bg-[#161616] hover:text-zinc-200"
            >
              <LogOut className="h-[18px] w-[18px] shrink-0" aria-hidden />
              <span className="ml-3 truncate opacity-0 transition-opacity duration-150 group-hover/sidebar:opacity-100">
                Sign out
              </span>
            </button>
          </form>
          <Link
            href="/"
            prefetch={false}
            className="flex h-8 items-center rounded-md px-2 text-[11px] text-zinc-600 transition-colors hover:text-zinc-400"
          >
            <span className="ml-7 truncate opacity-0 transition-opacity duration-150 group-hover/sidebar:opacity-100">
              Back to site
            </span>
          </Link>
        </div>
      </aside>

      <div className="fixed left-0 right-0 top-0 z-50 flex h-12 items-center justify-between gap-2 border-b border-[#2a2a2a] bg-[#0a0a0a] px-3 md:hidden">
        <Link href="/studio/blog/workspace" className="shrink-0 text-sm font-semibold text-white">
          Studio
        </Link>
        <div className="flex min-w-0 items-center gap-1 overflow-x-auto">
          {STUDIO_NAV.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="shrink-0 rounded-md px-2 py-1 text-[11px] text-zinc-400 hover:text-white"
            >
              {label.split(" ")[0]}
            </Link>
          ))}
          <StudioClearCacheButton variant="header" className="shrink-0" />
        </div>
      </div>
    </>
  );
}
