"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState, useTransition } from "react";

import { CorrespondenceSentimentBar } from "@/components/crm/CorrespondenceSentimentBar";
import { ComplianceFlagBadge } from "@/components/crm/ComplianceFlagBadge";
import { LeadPreMeetingBrief } from "@/components/crm/LeadPreMeetingBrief";
import { sendWhatsAppMessage } from "@/app/actions/whatsapp";
import { tagLeadArea } from "@/app/actions/crm-goals";
import { LeadAiPanel } from "@/components/crm/LeadAiPanel";
import { useCrm } from "@/components/crm/CrmContext";
import { KRUGERSDORP_AREA_OPTIONS } from "@/lib/crm/area";
import type { CrmCorrespondence, CrmLead, CrmReminder, CrmTask } from "@/lib/crm/types";
import { SERVICE_LABELS } from "@/lib/crm/types";
import { formatAdvisorLabel, formatLeadStatus } from "@/lib/crm/utils";
import { cn } from "@/lib/utils";

const CHANNEL_META: Record<
  CrmCorrespondence["channel"],
  { label: string; icon: string; text: string; bg: string }
> = {
  email: {
    label: "Email",
    icon: "✉",
    text: "text-gray-100",
    bg: "bg-zinc-500/10",
  },
  whatsapp: {
    label: "WhatsApp",
    icon: "◉",
    text: "text-samsung-blue",
    bg: "bg-samsung-blue/10",
  },
  portal: {
    label: "Portal",
    icon: "◇",
    text: "text-cinematic-teal",
    bg: "bg-cinematic-teal/10",
  },
};

function formatSentAt(iso: string) {
  return new Intl.DateTimeFormat("en-ZA", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

function formatReminderDue(iso: string) {
  return new Intl.DateTimeFormat("en-ZA", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

function leadFirstName(fullName: string) {
  return fullName.split(" ")[0] ?? fullName;
}

const QUICK_REPLY_TEMPLATES = [
  {
    label: "Send investment education pack",
    build: (name: string) =>
      `Hi ${name}, thank you for your enquiry. I can share educational product documentation for discussion during advice. Personal recommendations require a Financial Needs Analysis. Let me know if you'd like to book a consultation.`,
  },
  {
    label: "Request FICA Documents",
    build: (name: string) =>
      `Hi ${name}, to proceed with your application we require certified FICA documentation (ID, proof of residence, and proof of bank account). You may upload these securely via the client portal or reply to this message with scanned copies.`,
  },
  {
    label: "Schedule needs analysis",
    build: (name: string) =>
      `Hi ${name}, I'd like to schedule a needs analysis to review your retirement, estate, and investment questions. Please share two suitable times this week for a 45-minute consultation at our Krugersdorp office or via video.`,
  },
] as const;

function FunnelIntelligenceCard({ lead }: { lead: CrmLead }) {
  const { funnelData } = lead;
  return (
    <section className="rounded-[2rem] bg-shark p-5 ring-1 ring-white/5">
      <div className="mb-4 flex items-center justify-between gap-4 border-b border-white/10 pb-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-400">
          Funnel intelligence
        </p>
        <span className="rounded-full bg-cinematic-teal/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-cinematic-teal">
          Actuarial readout
        </span>
      </div>

      <p className="text-xs font-medium text-gray-100">{funnelData.assessment}</p>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="rounded-xl bg-void/60 px-3 py-3 ring-1 ring-white/5">
          <p className="text-[9px] font-semibold uppercase tracking-wider text-gray-400">Score</p>
          <p className="mt-1 text-2xl font-bold tabular-nums tracking-[-0.03em] text-supernova-gold">
            {funnelData.score}
          </p>
        </div>
        <div className="rounded-xl bg-void/60 px-3 py-3 ring-1 ring-white/5">
          <p className="text-[9px] font-semibold uppercase tracking-wider text-gray-400">Capital</p>
          <p className="mt-1 text-lg font-bold tabular-nums tracking-tight text-cinematic-teal">
            {funnelData.capital}
          </p>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-dashed border-white/10 bg-void/40 px-3 py-3">
        <p className="text-[9px] font-semibold uppercase tracking-wider text-gray-400">Key risk flag</p>
        <p className="mt-1 text-sm font-medium text-gray-100">{funnelData.keyRisk}</p>
      </div>
    </section>
  );
}

export type LeadDetailViewProps = {
  lead: CrmLead;
  correspondence: CrmCorrespondence[];
  reminders: CrmReminder[];
  tasks: CrmTask[];
  staffName: string;
};

export function LeadDetailView({
  lead,
  correspondence,
  reminders,
  tasks,
  staffName,
}: LeadDetailViewProps) {
  const router = useRouter();
  const { addReminder, canUseAi } = useCrm();
  const [thread, setThread] = useState<CrmCorrespondence[]>(() => correspondence);
  const [reminderTitle, setReminderTitle] = useState("");
  const [reminderDue, setReminderDue] = useState("");
  const [draft, setDraft] = useState("");
  const [sendError, setSendError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const firstName = leadFirstName(lead.name);

  useEffect(() => {
    setThread(correspondence);
  }, [correspondence]);

  const sortedThread = useMemo(
    () => [...thread].sort((a, b) => new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime()),
    [thread]
  );

  const applyTemplate = (build: (name: string) => string) => {
    setDraft(build(firstName));
  };

  const scheduleReminder = async () => {
    if (!reminderTitle.trim() || !reminderDue) return;
    await addReminder(lead.id, reminderTitle.trim(), reminderDue);
    setReminderTitle("");
    setReminderDue("");
  };

  const saveArea = (formData: FormData) => {
    startTransition(() => {
      void tagLeadArea(formData).then(() => router.refresh());
    });
  };

  const sendReply = useCallback(() => {
    const text = draft.trim();
    if (!text) return;

    const optimisticId = `optimistic-${Date.now()}`;
    const optimistic: CrmCorrespondence = {
      id: optimisticId,
      leadId: lead.id,
      channel: "whatsapp",
      senderType: "staff",
      from: staffName,
      body: text,
      sentAt: new Date().toISOString(),
    };

    setSendError(null);
    setThread((prev) => [...prev, optimistic]);
    setDraft("");

    startTransition(() => {
      void sendWhatsAppMessage(lead.id, text).then((result) => {
        if (!result.ok) {
          setThread((prev) => prev.filter((msg) => msg.id !== optimisticId));
          setSendError(result.error);
          setDraft(text);
          return;
        }
        router.refresh();
      });
    });
  }, [draft, lead.id, router, staffName]);

  return (
    <div className="grid min-h-[calc(100vh-8rem)] grid-cols-1 gap-6 lg:grid-cols-5 lg:gap-8">
      <div className="space-y-4 lg:col-span-2">
        <section className="rounded-[2rem] bg-shark p-6">
          <p className="text-xs font-medium uppercase tracking-wider text-gray-400">Lead</p>
          <h1 className="mt-1 text-2xl font-bold text-white">{lead.name}</h1>
          <p className="mt-2 text-sm text-cinematic-teal">{formatLeadStatus(lead.status)}</p>
        </section>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          {canUseAi ? <LeadAiPanel leadId={lead.id} onApplyDraft={setDraft} /> : null}

          <ComplianceFlagBadge lead={lead} />

          {canUseAi ? <LeadPreMeetingBrief leadId={lead.id} /> : null}

          <FunnelIntelligenceCard lead={lead} />

          <section className="rim-light rounded-[2rem] p-5">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
              Contact
            </p>
            <p className="mt-2 text-sm text-gray-100">{lead.email}</p>
            <p className="text-sm text-gray-100">{lead.phone}</p>
            {lead.company ? (
              <p className="mt-2 text-xs text-gray-400">{lead.company}</p>
            ) : null}
            <Link
              href={`/crm/calculator-session?leadId=${lead.id}`}
              className="mt-4 inline-flex text-xs font-medium text-cinematic-teal hover:text-white"
            >
              Open calculator session →
            </Link>
          </section>

          <section className="rim-light rounded-[2rem] p-5">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
              Intent
            </p>
            <p className="mt-2 text-sm leading-relaxed text-gray-100">{lead.intent}</p>
            {lead.capitalHint ? (
              <p className="mt-3 text-xs font-medium text-supernova-gold">{lead.capitalHint}</p>
            ) : null}
          </section>

          <section className="rim-light rounded-[2rem] p-5 sm:col-span-2 lg:col-span-1">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
              Service & assignment
            </p>
            <p className="mt-2 text-sm text-gray-100">{SERVICE_LABELS[lead.service_category]}</p>
            <p className="mt-3 text-xs text-gray-400">
              Assigned advisor ·{" "}
              <span className="text-gray-100">
                {formatAdvisorLabel(lead.assignedAdvisorId, lead.recommendedAdvisorName)}
              </span>
            </p>
            {lead.area ? (
              <p className="mt-2 text-xs text-gray-400">
                Area · <span className="text-gray-100">{lead.area}</span>
              </p>
            ) : null}
            {lead.campaignId ? (
              <Link
                href="/crm/goals"
                className="mt-3 inline-flex text-xs font-medium text-cinematic-teal hover:text-white"
              >
                Counts toward Krugersdorp campaign →
              </Link>
            ) : null}
            <form action={saveArea} className="mt-4 space-y-2">
              <input type="hidden" name="leadId" value={lead.id} />
              <label className="block">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                  Tag area
                </span>
                <select
                  name="area"
                  defaultValue={lead.area ?? "Krugersdorp"}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-void px-3 py-2 text-sm text-gray-100 focus:border-cinematic-teal/40 focus:outline-none"
                >
                  {KRUGERSDORP_AREA_OPTIONS.map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
              </label>
              <button
                type="submit"
                className="w-full rounded-xl bg-shark px-3 py-2 text-xs font-semibold text-white hover:bg-cinematic-teal/20"
              >
                Save area
              </button>
            </form>
            <span className="mt-4 inline-flex rounded-full bg-supernova-gold/20 px-3 py-1 text-xs font-bold tabular-nums text-supernova-gold">
              Lead score {lead.lead_score}
            </span>
          </section>

          <section className="rim-light rounded-[2rem] p-5">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
              Next actions / reminders
            </p>
            <ul className="mt-4 space-y-3">
              {reminders.length === 0 ? (
                <li className="text-xs text-gray-400">No scheduled actions.</li>
              ) : (
                reminders.map((reminder) => (
                  <li
                    key={reminder.id}
                    className="rounded-xl bg-shark px-3 py-3 text-sm text-gray-100"
                  >
                    <p className="font-medium text-white">{reminder.title}</p>
                    <p className="mt-1 text-[10px] tabular-nums text-gray-400">
                      {formatReminderDue(reminder.dueDate)}
                    </p>
                  </li>
                ))
              )}
            </ul>
            {tasks.length > 0 ? (
              <ul className="mt-4 space-y-2 border-t border-white/10 pt-4">
                {tasks.map((task) => (
                  <li key={task.id} className="text-xs text-gray-300">
                    <span className="font-medium text-white">{task.title}</span>
                    <span className="text-gray-500"> · due {task.dueDate}</span>
                  </li>
                ))}
              </ul>
            ) : null}
            <div className="mt-4 space-y-3 border-t border-white/10 pt-4">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                Schedule call
              </p>
              <input
                type="text"
                value={reminderTitle}
                onChange={(e) => setReminderTitle(e.target.value)}
                placeholder="Reminder title…"
                className="w-full rounded-xl border border-white/10 bg-void px-4 py-3 text-sm text-gray-100 placeholder:text-gray-400 focus:border-supernova-gold/40 focus:outline-none"
              />
              <input
                type="datetime-local"
                value={reminderDue}
                onChange={(e) => setReminderDue(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-void px-4 py-3 text-sm text-gray-100 focus:border-supernova-gold/40 focus:outline-none"
              />
              <button
                type="button"
                disabled={!reminderTitle.trim() || !reminderDue}
                onClick={() => void scheduleReminder()}
                className={cn(
                  "w-full rounded-xl bg-shark px-4 py-3 text-sm font-semibold text-white transition-all duration-300 ease-apple",
                  "hover:bg-supernova-gold/20 hover:shadow-[0_0_32px_rgba(255,127,80,0.4)]",
                  "disabled:cursor-not-allowed disabled:opacity-40"
                )}
              >
                Add reminder
              </button>
            </div>
          </section>
        </div>
      </div>

      <section className="flex flex-col rounded-[2rem] bg-shark/60 ring-1 ring-white/5 lg:col-span-3">
        <header className="border-b border-white/10 px-5 py-4">
          <h2 className="text-lg font-bold tracking-[-0.03em] text-white">Unified thread</h2>
          <p className="text-xs text-gray-400">Email · WhatsApp · portal</p>
          {canUseAi ? (
            <div className="mt-2">
              <CorrespondenceSentimentBar leadId={lead.id} />
            </div>
          ) : null}
        </header>

        <ul className="flex-1 space-y-3 overflow-y-auto px-4 py-4 sm:px-5">
          {sortedThread.map((msg) => {
            const meta = CHANNEL_META[msg.channel];
            return (
              <li key={msg.id} className={cn("rounded-2xl p-4", meta.bg)}>
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span
                    className={cn(
                      "flex h-7 w-7 items-center justify-center rounded-full text-xs",
                      meta.bg,
                      meta.text
                    )}
                    aria-hidden
                  >
                    {meta.icon}
                  </span>
                  <span className={cn("text-sm font-semibold", meta.text)}>{msg.from}</span>
                  <span className="rounded-full bg-void/40 px-2 py-0.5 text-[10px] uppercase tracking-wider text-white/50">
                    {meta.label}
                  </span>
                  <time className="ml-auto text-[11px] text-gray-400" dateTime={msg.sentAt}>
                    {formatSentAt(msg.sentAt)}
                  </time>
                </div>
                <p className={cn("text-sm leading-relaxed", meta.text)}>{msg.body}</p>
              </li>
            );
          })}
        </ul>

        <div className="sticky bottom-0 border-t border-white/10 bg-void/90 px-4 py-4 backdrop-blur-xl sm:px-5">
          <div className="mb-3 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {QUICK_REPLY_TEMPLATES.map((template) => (
              <button
                key={template.label}
                type="button"
                onClick={() => applyTemplate(template.build)}
                className="shrink-0 rounded-full border border-white/15 bg-shark/80 px-3 py-1.5 text-[11px] font-medium text-gray-100 transition-colors hover:border-cinematic-teal/40 hover:text-white"
              >
                {template.label}
              </button>
            ))}
          </div>
          {sendError ? (
            <p className="mb-3 text-xs text-amber-300" role="alert">
              {sendError}
            </p>
          ) : null}
          <div className="flex gap-3">
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              rows={2}
              placeholder="Reply via WhatsApp…"
              className="min-h-[3rem] flex-1 resize-none rounded-2xl border border-white/10 bg-shark px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-cinematic-teal/50 focus:outline-none focus:ring-1 focus:ring-cinematic-teal/30"
            />
            <button
              type="button"
              disabled={!draft.trim() || isPending}
              onClick={sendReply}
              className={cn(
                "self-end rounded-2xl bg-cinematic-teal px-5 py-3 text-sm font-semibold text-white transition-all duration-300 ease-apple",
                "hover:shadow-[0_0_40px_rgba(0,128,128,0.45)] disabled:cursor-not-allowed disabled:opacity-40"
              )}
            >
              {isPending ? "Sending…" : "Send"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
