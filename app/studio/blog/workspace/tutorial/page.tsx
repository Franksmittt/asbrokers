import Link from "next/link";

export const dynamic = "force-dynamic";

const steps = [
  {
    title: "Step 1: Start a post",
    actions: [
      "Open Workspace.",
      "Click Start new guided post.",
      "Enter Title and URL slug (lowercase words with hyphens).",
      "Click Save draft.",
    ],
  },
  {
    title: "Step 2: Add article content",
    actions: [
      "Open current step in Content.",
      "Paste AI-generated HTML in the editor.",
      "Use Auto-fix content when offered.",
      "Click Save draft again.",
    ],
  },
  {
    title: "Step 3: Add images",
    actions: [
      "Open Images step.",
      "Upload image files in visual order.",
      "Confirm placeholders are replaced.",
      "Confirm Hero image URL is set (auto or manual).",
    ],
  },
  {
    title: "Step 4: Review checks",
    actions: [
      "Look at Publish readiness percentage.",
      "Read Next fix and resolve it.",
      "Continue until readiness reaches 100%.",
      "Open workflow details only if needed.",
    ],
  },
  {
    title: "Step 5: Publish",
    actions: [
      "Click Publish now.",
      "Confirm in Final publish confirmation.",
      "Review the Publish report (route and image checks).",
      "Open This post live to verify the result.",
    ],
  },
];

const troubleshooting = [
  {
    issue: "Readiness is below 100%",
    fix: "Follow Next fix. Most common causes are missing hero image or unresolved image placeholders.",
  },
  {
    issue: "Insights thumbnail is missing",
    fix: "Ensure Hero image URL is populated and post is republished.",
  },
  {
    issue: "Need to hide post quickly",
    fix: "Use Unpublish, or Recovery mode in the Publish panel.",
  },
  {
    issue: "Need guides/tools",
    fix: "Use Studio menu for Brand guide, My steps, and Calculator code library.",
  },
];

export default function StudioTutorialPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6">
      <p className="text-[11px] uppercase tracking-[0.18em] text-teal-400">Client tutorial</p>
      <h1 className="mt-2 text-3xl font-semibold text-white">How to use the blog studio</h1>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-400">
        Follow these steps in order for reliable publishing every time. This tutorial is written for daily use by
        one owner user.
      </p>

      <div className="mt-6 space-y-4">
        {steps.map((step) => (
          <section key={step.title} className="rounded-2xl border border-white/10 bg-zinc-950/40 p-4 sm:p-5">
            <h2 className="text-base font-semibold text-white">{step.title}</h2>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-zinc-300">
              {step.actions.map((action) => (
                <li key={action}>{action}</li>
              ))}
            </ol>
          </section>
        ))}
      </div>

      <section className="mt-6 rounded-2xl border border-amber-500/30 bg-amber-950/15 p-4 sm:p-5">
        <h2 className="text-base font-semibold text-amber-200">Quick troubleshooting</h2>
        <div className="mt-3 space-y-3 text-sm text-amber-100/90">
          {troubleshooting.map((item) => (
            <p key={item.issue}>
              <span className="font-semibold">{item.issue}:</span> {item.fix}
            </p>
          ))}
        </div>
      </section>

      <div className="mt-8 flex flex-wrap gap-2">
        <Link
          href="/studio/blog/workspace"
          className="rounded-full border border-teal-500/40 bg-teal-950/30 px-4 py-2 text-sm text-teal-200 hover:bg-teal-900/35"
        >
          Back to Workspace
        </Link>
        <Link
          href="/studio/blog/workspace/upgrades"
          className="rounded-full border border-white/15 px-4 py-2 text-sm text-zinc-200 hover:bg-white/5"
        >
          View Upgrades
        </Link>
      </div>
    </main>
  );
}
