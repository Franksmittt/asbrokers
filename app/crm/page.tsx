import Link from "next/link";
import { LayoutDashboard, Lock, Presentation, FileText, Scroll } from "@/components/icons";

export const metadata = {
  title: "Office",
  description: "AS Brokers team office: presentation and content.",
};

const cards = [
  {
    href: "/crm/presentation",
    title: "Wealth Presentation",
    desc: "Screen-share timeline and talking points for client meetings.",
    icon: Presentation,
  },
  {
    href: "/studio/blog",
    title: "Blog & content (Insights Studio)",
    desc: "Create and publish insights articles in the new HTML studio.",
    icon: FileText,
  },
  {
    href: "/studio/blog",
    title: "Insights studio (HTML)",
    desc: "Client HTML workspace: paste AI-generated article HTML, preview, publish to Insights.",
    icon: Lock,
  },
  {
    href: "/insights",
    title: "Public insights",
    desc: "Preview how articles appear to visitors.",
    icon: Scroll,
  },
];

export default function OfficeHomePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div>
        <p className="trust-hallmark text-[10px] font-semibold uppercase tracking-wider text-zinc-500 tabular-nums mb-2">
          FSP 17273
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1 flex items-center gap-2">
          <LayoutDashboard className="w-8 h-8 text-cinematic-teal" />
          Team office
        </h1>
        <p className="text-zinc-400 text-sm">
          Wealth Presentation for live sessions. Use Sanity Studio for structured articles, or the Insights studio for
          HTML-only posts. No lead pipeline here.
        </p>
        <div className="mt-4">
          <Link
            href="/studio/blog"
            prefetch={false}
            className="inline-flex items-center rounded-full bg-teal-600/90 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-500"
          >
            Open Insights Studio
          </Link>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
        {cards.map(({ href, title, desc, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            prefetch={false}
            className="group rounded-[2rem] rim-light border border-white/10 p-6 hover:border-cinematic-teal/30 transition-colors"
          >
            <Icon className="w-8 h-8 text-cinematic-teal mb-4" />
            <h2 className="text-lg font-semibold text-white group-hover:text-cinematic-teal transition-colors">{title}</h2>
            <p className="text-sm text-zinc-400 mt-2 leading-relaxed">{desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
