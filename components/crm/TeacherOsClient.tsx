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
        <p className="text-[10px] font-medium uppercase tracking-wider text-[#52525b]">
          Teacher OS · Education growth
        </p>
        <h1 className="text-2xl font-semibold text-[#1D1D1F]">
          {champion.firstName}&apos;s teaching desk
          {isOwnerView ? (
            <span className="ml-2 text-sm font-normal text-[#52525b]">· owner view</span>
          ) : null}
        </h1>
        <p className="max-w-2xl text-sm text-[#52525b]">
          Share your champion links, see who is learning, and track{" "}
          <strong className="font-medium text-[#1D1D1F]">Influence points</strong> — an internal
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

      <section className="rounded-xl border border-[#E5E5E5] bg-white p-5">
        <h2 className="text-lg font-semibold text-[#1D1D1F]">My champion links</h2>
        <p className="mt-1 text-xs text-[#52525b]">
          One-tap WhatsApp share. Links include <code className="text-[#52525b]">?ref={champion.ref}</code>{" "}
          so enrollments credit you as Sourced.
        </p>
        <ul className="mt-4 space-y-3">
          {shareCourses.map((course) => (
            <li
              key={course.slug}
              className="flex flex-col gap-2 rounded-lg border border-[#E5E5E5] bg-[#FAFAF8] px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0">
                <p className="font-medium text-[#1D1D1F]">{course.title}</p>
                <p className="truncate text-[11px] text-[#52525b]">{course.url}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  disabled={pending}
                  onClick={() => copyText(course.slug, course.url)}
                  className="rounded-md border border-[#E5E5E5] px-3 py-1.5 text-xs text-[#3F3F46] hover:text-[#1D1D1F]"
                >
                  {copied === course.slug ? "Copied" : "Copy link"}
                </button>
                <a
                  href={course.whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-md bg-[#006B6B] px-3 py-1.5 text-xs font-medium text-white"
                >
                  Share on WhatsApp
                </a>
              </div>
            </li>
          ))}
          {shareCourses.length === 0 ? (
            <li className="text-sm text-[#52525b]">No published courses yet.</li>
          ) : null}
        </ul>
      </section>

      <section className="rounded-xl border border-[#E5E5E5] bg-white p-5">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-[#1D1D1F]">My pipeline</h2>
            <p className="mt-1 text-xs text-[#52525b]">
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
                  filter === key ? "bg-[#F0F0EE] text-[#1D1D1F]" : "text-[#52525b] hover:text-[#3F3F46]"
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
              className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-[#E5E5E5] bg-[#FAFAF8] px-3 py-3"
            >
              <div>
                <p className="text-sm font-medium text-[#1D1D1F]">{journey.studentName}</p>
                <p className="text-[11px] text-[#52525b]">
                  {journey.courseTitle} · {journey.progressPercent}% · {journey.studentEmail}
                </p>
              </div>
              <span
                className={`rounded border px-2 py-0.5 text-[10px] uppercase tracking-wide ${
                  stage === "hand_raiser"
                    ? "border-[#006B6B]/35 text-[#006B6B]"
                    : stage === "stuck"
                      ? "border-amber-500/40 text-amber-900"
                      : "border-[#E5E5E5] text-[#52525b]"
                }`}
              >
                {STAGE_LABEL[stage]}
              </span>
            </li>
          ))}
          {filtered.length === 0 ? (
            <li className="py-6 text-center text-sm text-[#52525b]">
              No learners in this stage yet. Share a champion link to start.
            </li>
          ) : null}
        </ul>
      </section>

      <section className="rounded-xl border border-[#E5E5E5] bg-white p-5">
        <h2 className="text-lg font-semibold text-[#1D1D1F]">Influence wallet</h2>
        <p className="mt-1 text-xs text-[#52525b]">
          Points: enroll {INFLUENCE_POINTS.sourced_enrollment} · engage 25%{" "}
          {INFLUENCE_POINTS.engaged_25} · complete {INFLUENCE_POINTS.course_completed} · offer{" "}
          {INFLUENCE_POINTS.offer_clicked}. Not a product-commission split.
        </p>
        <ul className="mt-4 space-y-2">
          {influence.slice(0, 20).map((row) => (
            <li
              key={row.id}
              className="flex items-center justify-between gap-2 rounded-md border border-[#E5E5E5] px-3 py-2 text-sm"
            >
              <div>
                <p className="text-[#1D1D1F]">
                  +{row.points} · {row.reason.replace(/_/g, " ")}
                </p>
                <p className="text-[11px] text-[#52525b]">
                  {row.note || row.studentEmail} · {row.status}
                </p>
              </div>
              <span className="text-[11px] text-[#71717a]">
                {new Date(row.createdAt).toLocaleDateString("en-ZA")}
              </span>
            </li>
          ))}
          {influence.length === 0 ? (
            <li className="text-sm text-[#52525b]">No influence events yet.</li>
          ) : null}
        </ul>
      </section>

      {isOwnerView ? (
        <section className="rounded-xl border border-[#E5E5E5] bg-white p-5">
          <h2 className="text-lg font-semibold text-[#1D1D1F]">Firm scoreboard</h2>
          <p className="mt-1 text-xs text-[#52525b]">
            Owner view — who is sourcing education-led pipeline across the team.
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[480px] text-left text-sm">
              <thead className="text-[11px] uppercase tracking-wide text-[#52525b]">
                <tr>
                  <th className="pb-2 font-medium">Champion</th>
                  <th className="pb-2 font-medium">Points</th>
                  <th className="pb-2 font-medium">Learners</th>
                  <th className="pb-2 font-medium">Pending</th>
                </tr>
              </thead>
              <tbody>
                {firmSummary.map((row) => (
                  <tr key={row.key} className="border-t border-[#E5E5E5]">
                    <td className="py-2 text-[#1D1D1F]">{row.name}</td>
                    <td className="py-2 text-[#006B6B]">{row.points}</td>
                    <td className="py-2 text-[#3F3F46]">{row.journeys}</td>
                    <td className="py-2 text-[#52525b]">{row.pending}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}

      <section className="rounded-xl border border-[#E5E5E5] bg-white p-5">
        <h2 className="text-lg font-semibold text-[#1D1D1F]">Attribution timeline (sample)</h2>
        <p className="mt-1 text-xs text-[#52525b]">
          Multi-touch story: ads, champion links, enrollments, engagement, offer clicks.
        </p>
        <ol className="mt-4 space-y-3 border-l border-[#E5E5E5] pl-4">
          {timelineSample.map((touch) => (
            <li key={touch.id} className="relative">
              <span className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full bg-[#006B6B]" />
              <p className="text-sm text-[#1D1D1F]">{touch.label}</p>
              <p className="text-[11px] text-[#52525b]">
                {touch.eventType} · {touch.channel || "—"} ·{" "}
                {new Date(touch.createdAt).toLocaleString("en-ZA")}
                {touch.promoterRef ? ` · ref=${touch.promoterRef}` : ""}
              </p>
            </li>
          ))}
          {timelineSample.length === 0 ? (
            <li className="text-sm text-[#52525b]">No touches recorded yet.</li>
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
    <div className="rounded-xl border border-[#E5E5E5] bg-white p-4">
      <p className="text-[11px] uppercase tracking-wide text-[#52525b]">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-[#1D1D1F]">{value}</p>
      <p className="mt-1 text-[11px] text-[#71717a]">{hint}</p>
    </div>
  );
}
