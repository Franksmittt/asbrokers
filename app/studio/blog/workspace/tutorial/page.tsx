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
    <div className="mx-auto w-full max-w-5xl">
      <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-600">Tutorial</p>
      <h1 className="mt-1 text-2xl font-semibold text-white">How to use Blog Studio</h1>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-zinc-500">
        Follow these steps in order for reliable publishing every time.
      </p>

      <div className="mt-6 space-y-3">
        {steps.map((step) => (
          <section key={step.title} className="rounded-lg border border-[#2a2a2a] bg-[#0a0a0a] p-5">
            <h2 className="text-sm font-medium text-white">{step.title}</h2>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-zinc-400">
              {step.actions.map((action) => (
                <li key={action}>{action}</li>
              ))}
            </ol>
          </section>
        ))}
      </div>

      <section className="mt-6 rounded-lg border border-amber-500/30 bg-amber-950/20 p-5">
        <h2 className="text-sm font-medium text-amber-200">Quick troubleshooting</h2>
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
          className="rounded-md bg-[#3ecf8e] px-4 py-2 text-xs font-medium text-black transition-opacity hover:opacity-90"
        >
          Back to workspace
        </Link>
        <Link
          href="/studio/blog/workspace/upgrades"
          className="rounded-md border border-[#2a2a2a] bg-[#0a0a0a] px-4 py-2 text-xs font-medium text-zinc-300 transition-colors hover:text-white"
        >
          View upgrades
        </Link>
      </div>
    </div>
  );
}
