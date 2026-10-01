"use client";

import { useMemo, useState, useTransition } from "react";

import type { CourseChampion } from "@/lib/growth/champions";
import type {
  AttributionTouch,
  InfluenceLedgerEntry,
  LearningJourney,
} from "@/lib/growth/types";
import { INFLUENCE_POINTS } from "@/lib/growth/types";

export type TeacherShareCourse = {
  slug: string;
  title: string;
  url: string;
  whatsappHref: string;
  whatsappText: string;
};

export type TeacherPipelineCard = {
  journey: LearningJourney;
  stage: "learning" | "stuck" | "hand_raiser" | "engaged";
};

export type FirmRow = {
  key: string;
  name: string;
  points: number;
  journeys: number;
  pending: number;
};

type TeacherOsClientProps = {
  champion: CourseChampion;
  isOwnerView: boolean;
  points: number;
  pipeline: TeacherPipelineCard[];
  influence: InfluenceLedgerEntry[];
  shareCourses: TeacherShareCourse[];
  firmSummary: FirmRow[];
  timelineSample: AttributionTouch[];
};

const STAGE_LABEL: Record<TeacherPipelineCard["stage"], string> = {
  learning: "Learning",
  stuck: "Stuck",
  hand_raiser: "Hand-raiser",
  engaged: "Engaged",
};

export function TeacherOsClient({
  champion,
  isOwnerView,
  points,
  pipeline,
  influence,
  shareCourses,
  firmSummary,
  timelineSample,
}: TeacherOsClientProps) {
  const [copied, setCopied] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | TeacherPipelineCard["stage"]>("all");
  const [pending, startTransition] = useTransition();

  const filtered = useMemo(
    () => (filter === "all" ? pipeline : pipeline.filter((p) => p.stage === filter)),
    [filter, pipeline]
  );

  function copyText(key: string, text: string) {
    startTransition(async () => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(key);
        setTimeout(() => setCopied(null), 2000);
      } catch {
        setCopied("failed");
      }
    });
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-8 sm:px-6">
      <header className="space-y-2">
        <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
          Teacher OS · Education growth
        </p>
        <h1 className="text-2xl font-semibold text-white">
          {champion.firstName}&apos;s teaching desk
          {isOwnerView ? (
            <span className="ml-2 text-sm font-normal text-zinc-500">· owner view</span>
          ) : null}
        </h1>
        <p className="max-w-2xl text-sm text-zinc-400">
          Share your champion links, see who is learning, and track{" "}
          <strong className="font-medium text-zinc-200">Influence points</strong> — an internal
          bonus score for introducing and educating clients. Product commission still goes to the
          closing advisor (FAIS).
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Influence points" value={String(points)} hint="Pending + approved + paid" />
        <StatCard
          label="Learners sourced"
          value={String(pipeline.length)}
          hint="People who entered via your link"
        />
        <StatCard
          label="Hand-raisers"
          value={String(pipeline.filter((p) => p.stage === "hand_raiser").length)}
          hint="Clicked a course offer CTA"
        />
      </section>

      <section className="rounded-xl border border-[#2a2a2a] bg-[#0a0a0a] p-5">
        <h2 className="text-lg font-semibold text-white">My champion links</h2>
        <p className="mt-1 text-xs text-zinc-500">
          One-tap WhatsApp share. Links include <code className="text-zinc-400">?ref={champion.ref}</code>{" "}
          so enrollments credit you as Sourced.
        </p>
        <ul className="mt-4 space-y-3">
          {shareCourses.map((course) => (
            <li
              key={course.slug}
              className="flex flex-col gap-2 rounded-lg border border-[#2a2a2a] bg-black/40 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0">
                <p className="font-medium text-white">{course.title}</p>
                <p className="truncate text-[11px] text-zinc-500">{course.url}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  disabled={pending}
                  onClick={() => copyText(course.slug, course.url)}
                  className="rounded-md border border-[#2a2a2a] px-3 py-1.5 text-xs text-zinc-300 hover:text-white"
                >
                  {copied === course.slug ? "Copied" : "Copy link"}
                </button>
                <a
                  href={course.whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-md bg-[#3ecf8e] px-3 py-1.5 text-xs font-medium text-black"
                >
                  Share on WhatsApp
                </a>
              </div>
            </li>
          ))}
          {shareCourses.length === 0 ? (
            <li className="text-sm text-zinc-500">No published courses yet.</li>
          ) : null}
        </ul>
      </section>

      <section className="rounded-xl border border-[#2a2a2a] bg-[#0a0a0a] p-5">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-white">My pipeline</h2>
            <p className="mt-1 text-xs text-zinc-500">
              Learning → Engaged → Hand-raiser. Stuck = quiet for 3+ days mid-course.
            </p>
          </div>
          <div className="flex flex-wrap gap-1">
            {(["all", "learning", "engaged", "stuck", "hand_raiser"] as const).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setFilter(key)}
                className={`rounded px-2 py-1 text-[11px] ${
                  filter === key ? "bg-white/10 text-white" : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {key === "all" ? "All" : STAGE_LABEL[key]}
              </button>
            ))}
          </div>
        </div>
        <ul className="mt-4 space-y-2">
          {filtered.map(({ journey, stage }) => (
            <li
              key={journey.id}
              className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-[#2a2a2a] bg-black/40 px-3 py-3"
            >
              <div>
                <p className="text-sm font-medium text-white">{journey.studentName}</p>
                <p className="text-[11px] text-zinc-500">
                  {journey.courseTitle} · {journey.progressPercent}% · {journey.studentEmail}
                </p>
              </div>
              <span
                className={`rounded border px-2 py-0.5 text-[10px] uppercase tracking-wide ${
                  stage === "hand_raiser"
                    ? "border-[#3ecf8e]/40 text-[#3ecf8e]"
                    : stage === "stuck"
                      ? "border-amber-500/40 text-amber-300"
                      : "border-[#2a2a2a] text-zinc-400"
                }`}
              >
                {STAGE_LABEL[stage]}
              </span>
            </li>
          ))}
          {filtered.length === 0 ? (
            <li className="py-6 text-center text-sm text-zinc-500">
              No learners in this stage yet. Share a champion link to start.
            </li>
          ) : null}
        </ul>
      </section>

      <section className="rounded-xl border border-[#2a2a2a] bg-[#0a0a0a] p-5">
        <h2 className="text-lg font-semibold text-white">Influence wallet</h2>
        <p className="mt-1 text-xs text-zinc-500">
          Points: enroll {INFLUENCE_POINTS.sourced_enrollment} · engage 25%{" "}
          {INFLUENCE_POINTS.engaged_25} · complete {INFLUENCE_POINTS.course_completed} · offer{" "}
          {INFLUENCE_POINTS.offer_clicked}. Not a product-commission split.
        </p>
        <ul className="mt-4 space-y-2">
          {influence.slice(0, 20).map((row) => (
            <li
              key={row.id}
              className="flex items-center justify-between gap-2 rounded-md border border-[#2a2a2a] px-3 py-2 text-sm"
            >
              <div>
                <p className="text-zinc-200">
                  +{row.points} · {row.reason.replace(/_/g, " ")}
                </p>
                <p className="text-[11px] text-zinc-500">
                  {row.note || row.studentEmail} · {row.status}
                </p>
              </div>
              <span className="text-[11px] text-zinc-600">
                {new Date(row.createdAt).toLocaleDateString("en-ZA")}
              </span>
            </li>
          ))}
          {influence.length === 0 ? (
            <li className="text-sm text-zinc-500">No influence events yet.</li>
          ) : null}
        </ul>
      </section>

      {isOwnerView ? (
        <section className="rounded-xl border border-[#2a2a2a] bg-[#0a0a0a] p-5">
          <h2 className="text-lg font-semibold text-white">Firm scoreboard</h2>
          <p className="mt-1 text-xs text-zinc-500">
            Owner view — who is sourcing education-led pipeline across the team.
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[480px] text-left text-sm">
              <thead className="text-[11px] uppercase tracking-wide text-zinc-500">
                <tr>
                  <th className="pb-2 font-medium">Champion</th>
                  <th className="pb-2 font-medium">Points</th>
                  <th className="pb-2 font-medium">Learners</th>
                  <th className="pb-2 font-medium">Pending</th>
                </tr>
              </thead>
              <tbody>
                {firmSummary.map((row) => (
                  <tr key={row.key} className="border-t border-[#2a2a2a]">
                    <td className="py-2 text-white">{row.name}</td>
                    <td className="py-2 text-[#3ecf8e]">{row.points}</td>
                    <td className="py-2 text-zinc-300">{row.journeys}</td>
                    <td className="py-2 text-zinc-400">{row.pending}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}

      <section className="rounded-xl border border-[#2a2a2a] bg-[#0a0a0a] p-5">
        <h2 className="text-lg font-semibold text-white">Attribution timeline (sample)</h2>
        <p className="mt-1 text-xs text-zinc-500">
          Multi-touch story: ads, champion links, enrollments, engagement, offer clicks.
        </p>
        <ol className="mt-4 space-y-3 border-l border-[#2a2a2a] pl-4">
          {timelineSample.map((touch) => (
            <li key={touch.id} className="relative">
              <span className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full bg-[#3ecf8e]" />
              <p className="text-sm text-white">{touch.label}</p>
              <p className="text-[11px] text-zinc-500">
                {touch.eventType} · {touch.channel || "—"} ·{" "}
                {new Date(touch.createdAt).toLocaleString("en-ZA")}
                {touch.promoterRef ? ` · ref=${touch.promoterRef}` : ""}
              </p>
            </li>
          ))}
          {timelineSample.length === 0 ? (
            <li className="text-sm text-zinc-500">No touches recorded yet.</li>
          ) : null}
        </ol>
      </section>
    </div>
  );
}

function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="rounded-xl border border-[#2a2a2a] bg-[#0a0a0a] p-4">
      <p className="text-[11px] uppercase tracking-wide text-zinc-500">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-white">{value}</p>
      <p className="mt-1 text-[11px] text-zinc-600">{hint}</p>
    </div>
  );
}
