"use client";

import { useRouter } from "next/navigation";
import { LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { useCallback, useMemo, useRef, useState } from "react";
import { Bell, MessageCircle } from "@/components/icons";
import { KanbanAiToolbar } from "@/components/crm/KanbanAiToolbar";
import { ComplianceFlagBadge } from "@/components/crm/ComplianceFlagBadge";
import { useCrm } from "@/components/crm/CrmContext";
import {
  KANBAN_COLUMNS,
  SERVICE_LABELS,
  type CrmLead,
  type LeadStatus,
} from "@/lib/crm/types";
import {
  formatPipelineCurrency,
  resolveKanbanStatusAtPoint,
  sanitizeLeadPhoneForWhatsApp,
  sumColumnCapital,
} from "@/lib/crm/utils";
import { cn } from "@/lib/utils";

const DRAG_SPRING = { type: "spring" as const, stiffness: 500, damping: 32 };
const DRAG_THRESHOLD_PX = 8;

function formatCapitalDisplay(lead: CrmLead): string {
  if (lead.capitalHint) return lead.capitalHint;
  return formatPipelineCurrency(lead.estimatedCapital);
}

function LeadCard({
  lead,
  onDrop,
  onQuickReminder,
  isDropTarget,
}: {
  lead: CrmLead;
  onDrop: (leadId: string, point: { x: number; y: number }) => void;
  onQuickReminder: (lead: CrmLead) => void;
  isDropTarget: boolean;
}) {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const draggedRef = useRef(false);
  const suppressTapUntilRef = useRef(0);
  const whatsappHref = `https://wa.me/${sanitizeLeadPhoneForWhatsApp(lead.phone)}`;

  const handleDragStart = useCallback(() => {
    draggedRef.current = false;
  }, []);

  const handleDrag = useCallback(
    (_event: MouseEvent | TouchEvent | PointerEvent, info: { offset: { x: number; y: number } }) => {
      if (Math.hypot(info.offset.x, info.offset.y) > DRAG_THRESHOLD_PX) {
        draggedRef.current = true;
      }
    },
    []
  );

  const handleDragEnd = useCallback(
    (
      event: MouseEvent | TouchEvent | PointerEvent,
      info: { point: { x: number; y: number } }
    ) => {
      if (draggedRef.current) {
        event.preventDefault();
        event.stopPropagation();
        suppressTapUntilRef.current = Date.now() + 500;
        onDrop(lead.id, info.point);
      }
      window.setTimeout(() => {
        draggedRef.current = false;
      }, 520);
    },
    [lead.id, onDrop]
  );

  const handleTap = useCallback(() => {
    if (draggedRef.current || Date.now() < suppressTapUntilRef.current) return;
    router.push(`/crm/leads/${lead.id}`);
  }, [lead.id, router]);

  const stopCardNav = useCallback((event: React.MouseEvent | React.PointerEvent) => {
    event.preventDefault();
    event.stopPropagation();
    suppressTapUntilRef.current = Date.now() + 400;
  }, []);

  return (
    <motion.div
      layout
      layoutId={`kanban-lead-${lead.id}`}
      drag={!reduceMotion}
      dragElastic={0.05}
      dragMomentum={false}
      dragSnapToOrigin
      whileDrag={{ scale: 1.02, zIndex: 50, boxShadow: "0 12px 40px rgba(0,0,0,0.45)" }}
      transition={DRAG_SPRING}
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      onTap={handleTap}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleTap();
        }
      }}
      data-kanban-card
      role="button"
      tabIndex={0}
      className={cn(
        "group relative cursor-grab rounded-lg border border-[#2a2a2a] bg-[#0a0a0a] p-4 pt-8 text-left",
        "active:cursor-grabbing focus-visible:outline focus-visible:outline-2",
        "focus-visible:outline-offset-2 focus-visible:outline-[#3ecf8e]/60",
        isDropTarget && "ring-1 ring-[#3ecf8e]/30"
      )}
    >
      <div
        className="absolute right-3 top-3 flex gap-1 opacity-0 transition-opacity duration-200 ease-apple group-hover:opacity-100 group-focus-within:opacity-100"
        onPointerDown={stopCardNav}
      >
        <button
          type="button"
          aria-label={`Add reminder for ${lead.name}`}
          onClick={(e) => {
            stopCardNav(e);
            onQuickReminder(lead);
          }}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-black/80 text-zinc-300 ring-1 ring-[#2a2a2a] transition-colors hover:bg-[#141414] hover:text-white"
        >
          <Bell className="h-3.5 w-3.5" />
        </button>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`WhatsApp ${lead.name}`}
          onClick={stopCardNav}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-black/80 text-whatsapp ring-1 ring-[#2a2a2a] transition-colors hover:bg-whatsapp/20"
        >
          <MessageCircle className="h-3.5 w-3.5" />
        </a>
      </div>

      <p className="pr-16 text-sm font-semibold tracking-tight text-white">{lead.name}</p>
      {lead.company ? (
        <p className="mt-1 text-[10px] uppercase tracking-wider text-zinc-500">{lead.company}</p>
      ) : null}

      <div className="mt-4 rounded-md bg-[#3ecf8e]/10 px-3 py-2 ring-1 ring-[#3ecf8e]/20">
        <p className="text-[10px] font-medium uppercase tracking-wider text-[#3ecf8e]">
          Est. capital
        </p>
        <p className="mt-1 text-lg font-bold tabular-nums tracking-tight text-[#3ecf8e]">
          {formatCapitalDisplay(lead)}
        </p>
      </div>

      <p className="mt-4 line-clamp-2 text-xs leading-relaxed text-zinc-300">{lead.intent}</p>

      <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-[#2a2a2a] pt-4">
        <span className="text-[10px] font-medium text-zinc-400">
          {SERVICE_LABELS[lead.service_category]}
        </span>
        {lead.recommendedAdvisorName ? (
          <span className="text-[10px] text-zinc-500">→ {lead.recommendedAdvisorName}</span>
        ) : null}
        {lead.aiPriorityLabel ? (
          <span className="rounded-full bg-[#3ecf8e]/10 px-2 py-0.5 text-[9px] font-medium text-[#3ecf8e]">
            ✦ {lead.aiPriorityLabel}
          </span>
        ) : null}
        <ComplianceFlagBadge lead={lead} compact />
        <span className="ml-auto rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] font-bold tabular-nums text-amber-400">
          {lead.aiPriorityScore ?? lead.lead_score}
        </span>
      </div>
    </motion.div>
  );
}

export function LeadsKanban() {
  const { visibleLeads, updateLeadStatus, addReminder, canUseAi } = useCrm();
  const [hoverColumn, setHoverColumn] = useState<LeadStatus | null>(null);
  const [aiSortEnabled, setAiSortEnabled] = useState(true);
  const draggingRef = useRef(false);

  const sortLeads = useCallback(
    (items: CrmLead[]) => {
      if (!aiSortEnabled) return items;
      return [...items].sort((a, b) => {
        const aScore = a.aiPriorityScore ?? a.lead_score;
        const bScore = b.aiPriorityScore ?? b.lead_score;
        return bScore - aScore;
      });
    },
    [aiSortEnabled]
  );

  const handleDrop = useCallback(
    (leadId: string, point: { x: number; y: number }) => {
      const nextStatus = resolveKanbanStatusAtPoint(point);
      if (!nextStatus) return;

      const lead = visibleLeads.find((item) => item.id === leadId);
      if (!lead || lead.status === nextStatus) return;

      updateLeadStatus(leadId, nextStatus);
    },
    [updateLeadStatus, visibleLeads]
  );

  const handleQuickReminder = useCallback(
    (lead: CrmLead) => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(10, 0, 0, 0);
      const isoLocal = tomorrow.toISOString().slice(0, 16);
      addReminder(lead.id, `Follow up, ${lead.name}`, isoLocal);
    },
    [addReminder]
  );

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!draggingRef.current) return;
      const status = resolveKanbanStatusAtPoint({ x: event.clientX, y: event.clientY });
      setHoverColumn(status ?? null);
    },
    []
  );

  const handlePointerUp = useCallback(() => {
    draggingRef.current = false;
    setHoverColumn(null);
  }, []);

  const columns = useMemo(
    () =>
      KANBAN_COLUMNS.map((col) => {
        const items = sortLeads(visibleLeads.filter((l) => l.status === col.status));
        return {
          ...col,
          items,
          totalCapital: sumColumnCapital(items),
        };
      }),
    [visibleLeads, sortLeads]
  );

  return (
    <LayoutGroup>
      {canUseAi ? (
        <KanbanAiToolbar
          aiSortEnabled={aiSortEnabled}
          onToggleAiSort={() => setAiSortEnabled((v) => !v)}
        />
      ) : null}
      <div
        className="mt-4 flex gap-6 overflow-x-auto pb-8"
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onPointerDownCapture={(event) => {
          const target = event.target;
          if (target instanceof Element && target.closest("[data-kanban-card]")) {
            draggingRef.current = true;
          }
        }}
      >
        {columns.map((col) => {
          const isHovered = hoverColumn === col.status;

          return (
            <div
              key={col.status}
              data-kanban-column
              data-status={col.status}
              className="flex w-72 shrink-0 flex-col"
            >
              <header className="mb-3 border-b border-[#2a2a2a] pb-3">
                <h2 className="text-sm font-semibold tracking-[-0.03em] text-white">
                  {col.label}
                  <span className="ml-2 font-normal text-zinc-600">·</span>
                  <span className="ml-2 font-bold tabular-nums text-zinc-400">
                    {formatPipelineCurrency(col.totalCapital)}
                  </span>
                </h2>
                <p className="mt-1 text-[10px] tabular-nums text-zinc-600">
                  {col.items.length} {col.items.length === 1 ? "dossier" : "dossiers"}
                </p>
              </header>

              <div
                data-kanban-drop
                className={cn(
                  "flex min-h-[16rem] flex-col gap-3 rounded-lg border border-dashed p-2 transition-colors",
                  isHovered
                    ? "border-[#3ecf8e]/50 bg-[#3ecf8e]/5"
                    : "border-transparent bg-transparent"
                )}
              >
                {col.items.map((lead) => (
                  <LeadCard
                    key={lead.id}
                    lead={lead}
                    onDrop={handleDrop}
                    onQuickReminder={handleQuickReminder}
                    isDropTarget={isHovered}
                  />
                ))}
                {col.items.length === 0 ? (
                  <p className="py-12 text-center text-xs text-zinc-600">Drop leads here</p>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </LayoutGroup>
  );
}
