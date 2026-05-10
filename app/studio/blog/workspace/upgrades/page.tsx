import Link from "next/link";

export const dynamic = "force-dynamic";

const upgrades = [
  {
    title: "Guided publishing workflow",
    points: [
      "Studio now follows a 4-step path: Content -> Images -> Review -> Publish.",
      "Readiness checks block publish until required items are fixed.",
      "The flow is optimized for one owner user and plain-language prompts.",
    ],
  },
  {
    title: "Hero image and thumbnail reliability",
    points: [
      "Hero image is now required before publish to guarantee insights thumbnails.",
      "Hero URL auto-fills from uploaded images and can auto-detect first valid <img> in pasted HTML.",
      "Thumbnail extraction now decodes HTML-encoded URLs (e.g. &amp;).",
    ],
  },
  {
    title: "Safety and recovery controls",
    points: [
      "Publish preflight runs checks and can auto-revert to draft if validation fails.",
      "Recovery mode can quickly move a live article back to draft.",
      "Delete actions require stronger confirmation; bulk delete is env-gated.",
    ],
  },
  {
    title: "Senior-friendly UX simplification",
    points: [
      "Header controls were decluttered into a single Studio menu.",
      "Advanced controls are hidden by default and can be toggled on only when needed.",
      "Workflow details are collapsible to keep daily use focused and clean.",
    ],
  },
  {
    title: "Image and content quality checks",
    points: [
      "Upload checks reject low-resolution images before they cause bad live output.",
      "Unresolved image placeholders and broken content signals are surfaced before publish.",
      "Publish report displays route and image check results after successful publish.",
    ],
  },
];

export default function StudioUpgradesPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6">
      <p className="text-[11px] uppercase tracking-[0.18em] text-teal-400">Studio updates</p>
      <h1 className="mt-2 text-3xl font-semibold text-white">What has been upgraded</h1>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-400">
        This page summarizes the production improvements made to keep blog publishing reliable and easy for a
        single owner workflow.
      </p>

      <div className="mt-6 space-y-4">
        {upgrades.map((item) => (
          <section key={item.title} className="rounded-2xl border border-white/10 bg-zinc-950/40 p-4 sm:p-5">
            <h2 className="text-base font-semibold text-white">{item.title}</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-300">
              {item.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        <Link
          href="/studio/blog/workspace/tutorial"
          className="rounded-full border border-teal-500/40 bg-teal-950/30 px-4 py-2 text-sm text-teal-200 hover:bg-teal-900/35"
        >
          Open Tutorial
        </Link>
        <Link
          href="/studio/blog/workspace"
          className="rounded-full border border-white/15 px-4 py-2 text-sm text-zinc-200 hover:bg-white/5"
        >
          Back to Workspace
        </Link>
      </div>
    </main>
  );
}
