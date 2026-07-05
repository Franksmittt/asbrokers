"use client";

import { useState, useTransition } from "react";

import { fetchPreMeetingBrief } from "@/app/actions/crm-ai";
import type { PreMeetingBrief } from "@/lib/crm/ai/schemas";

export function LeadPreMeetingBrief({ leadId }: { leadId: string }) {
  const [brief, setBrief] = useState<PreMeetingBrief | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const generate = () => {
    startTransition(async () => {
      const result = await fetchPreMeetingBrief(leadId);
      if (result.ok) {
        setBrief(result.data);
        setError(null);
      } else {
        setError(result.error);
      }
    });
  };

  const printBrief = () => {
    if (!brief) return;
    const html = `
      <!DOCTYPE html><html><head><title>${brief.meetingTitle}</title>
      <style>
        body { font-family: Georgia, serif; max-width: 720px; margin: 2rem auto; color: #111; line-height: 1.5; }
        h1 { font-size: 1.4rem; margin-bottom: 0.25rem; }
        h2 { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.08em; color: #666; margin-top: 1.5rem; }
        ul { padding-left: 1.2rem; }
        footer { margin-top: 2rem; font-size: 0.75rem; color: #888; border-top: 1px solid #ddd; padding-top: 1rem; }
      </style></head><body>
      <h1>${brief.meetingTitle}</h1>
      <p>${brief.clientSnapshot}</p>
      <h2>Objectives</h2><ul>${brief.objectives.map((o) => `<li>${o}</li>`).join("")}</ul>
      <h2>Agenda</h2><ul>${brief.suggestedAgenda.map((a) => `<li>${a}</li>`).join("")}</ul>
      <h2>Talking points</h2><ul>${brief.talkingPoints.map((t) => `<li>${t}</li>`).join("")}</ul>
      <h2>Compliance checklist</h2><ul>${brief.complianceChecklist.map((c) => `<li>${c}</li>`).join("")}</ul>
      <footer>${brief.printFooter} · AS Brokers CC FSP 17273</footer>
      </body></html>`;
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(html);
    win.document.close();
    win.focus();
    win.print();
  };

  return (
    <section className="rounded-[2rem] border border-white/10 bg-shark p-5 ring-1 ring-white/5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-400">
            Pre-meeting brief
          </p>
          <p className="mt-1 text-xs text-gray-500">Gemini · FAIS-ready agenda for client meetings</p>
        </div>
        <div className="flex gap-2">
          {brief ? (
            <button
              type="button"
              onClick={printBrief}
              className="rounded-lg border border-white/10 px-3 py-1.5 text-[11px] text-gray-300 hover:text-white"
            >
              Print / PDF
            </button>
          ) : null}
          <button
            type="button"
            onClick={generate}
            disabled={isPending}
            className="rounded-lg bg-white/10 px-3 py-1.5 text-[11px] font-medium text-white hover:bg-white/15 disabled:opacity-50"
          >
            {isPending ? "Generating…" : brief ? "Refresh" : "Generate brief"}
          </button>
        </div>
      </div>

      {error ? <p className="mb-3 text-xs text-amber-300">{error}</p> : null}

      {brief ? (
        <div className="space-y-4 text-sm">
          <div>
            <p className="font-semibold text-white">{brief.meetingTitle}</p>
            <p className="mt-2 text-gray-300">{brief.clientSnapshot}</p>
          </div>
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-wider text-gray-500">Agenda</p>
            <ol className="mt-2 list-decimal space-y-1 pl-4 text-gray-300">
              {brief.suggestedAgenda.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </div>
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-wider text-gray-500">
              Compliance checklist
            </p>
            <ul className="mt-2 space-y-1">
              {brief.complianceChecklist.map((item) => (
                <li key={item} className="text-xs text-amber-200/90 before:mr-2 before:content-['✓']">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : isPending ? (
        <p className="text-sm text-gray-400">Building meeting brief…</p>
      ) : (
        <p className="text-xs text-gray-500">
          Generate a structured brief before your consultation — includes talking points and FAIS checks.
        </p>
      )}
    </section>
  );
}
