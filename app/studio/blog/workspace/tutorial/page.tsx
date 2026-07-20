import Link from "next/link";

export const dynamic = "force-dynamic";

const steps = [
  {
    title: "Step 1: Start or open a post",
    actions: [
      "Open Workspace from the sidebar.",
      "Click Start new draft, or open an existing post from Blog library / Drafts / Recent posts.",
      "Enter Title and URL slug (lowercase words with hyphens).",
      "Click Save draft so the post is stored safely.",
    ],
  },
  {
    title: "Step 2: Copy the brand guide into AI",
    actions: [
      "In Workspace, scroll to Copy the brand guide and blog rules (or use Brand guide in the sidebar).",
      "Choose a preset that matches what you need (images, calculator, video).",
      "Click Copy prompt, paste it into ChatGPT / Claude / Gemini first, then add your topic.",
      "Copy the HTML the AI returns (no markdown fences).",
    ],
  },
  {
    title: "Step 3: Paste content and fill slots",
    actions: [
      "Paste the HTML into Step 1: Paste AI Blog Code.",
      "In Step 2, upload images in order (first image becomes the cover thumbnail).",
      "Assign any calculator or video slots the HTML requested.",
      "Click Save draft again after uploads.",
    ],
  },
  {
    title: "Step 4: Details and categories",
    actions: [
      "Complete title, slug, and short excerpt.",
      "Tick one or more categories so clients can filter on Insights.",
      "Optional: fill meta title and meta description for SEO.",
      "Check the Live Reading Preview on the right, it should look like the warm public Insights pages.",
    ],
  },
  {
    title: "Step 5: Publish",
    actions: [
      "Confirm the readiness checks are all PASS / READY.",
      "Click Publish in the top bar.",
      "Open View live insights (or the post link) to verify on the website.",
      "To hide a live post later, turn the switch off in Recent posts / Drafts, or edit and Unpublish if shown.",
    ],
  },
];

const troubleshooting = [
  {
    issue: "Publish stays NOT READY",
    fix: "Finish missing image uploads, calculator/video assignments, title/slug/excerpt, and at least one category.",
  },
  {
    issue: "Insights thumbnail is missing",
    fix: "Upload Image Slot #1 (cover thumbnail), save, then publish again.",
  },
  {
    issue: "Need to hide a post quickly",
    fix: "In Recent posts or Drafts, flip the On Insights switch to Hidden.",
  },
  {
    issue: "Where are unfinished articles?",
    fix: "Use Drafts in the sidebar, it jumps to every saved draft that is not live yet.",
  },
  {
    issue: "AI output looks wrong on the live site",
    fix: "Use Brand guide again. Articles publish on the warm canvas Insights layout (shark headings, stone body text), not a full dark page.",
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
          href="/studio/blog/workspace#drafts"
          className="rounded-md border border-[#2a2a2a] bg-[#0a0a0a] px-4 py-2 text-xs font-medium text-zinc-300 transition-colors hover:text-white"
        >
          Open drafts
        </Link>
      </div>
    </div>
  );
}
