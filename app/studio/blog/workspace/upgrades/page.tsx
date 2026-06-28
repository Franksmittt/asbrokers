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
    <div className="mx-auto w-full max-w-5xl">
      <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-600">Changelog</p>
      <h1 className="mt-1 text-2xl font-semibold text-white">Studio upgrades</h1>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-zinc-500">
        Production improvements for reliable, owner-friendly publishing.
      </p>

      <div className="mt-6 space-y-3">
        {upgrades.map((item) => (
          <section key={item.title} className="rounded-lg border border-[#2a2a2a] bg-[#0a0a0a] p-5">
            <h2 className="text-sm font-medium text-white">{item.title}</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-400">
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
          className="rounded-md border border-[#2a2a2a] bg-[#0a0a0a] px-4 py-2 text-xs font-medium text-zinc-300 transition-colors hover:text-white"
        >
          Open tutorial
        </Link>
        <Link
          href="/studio/blog/workspace"
          className="rounded-md bg-[#3ecf8e] px-4 py-2 text-xs font-medium text-black transition-opacity hover:opacity-90"
        >
          Back to workspace
        </Link>
      </div>
    </div>
  );
}
