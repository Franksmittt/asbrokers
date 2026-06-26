"use client";

import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useMemo, useRef } from "react";
import { Bell, MessageCircle } from "@/components/icons";
import { useCrm } from "@/components/crm/CrmContext";
import {
  KANBAN_COLUMNS,
  SERVICE_LABELS,
  type CrmLead,
  type LeadStatus,
} from "@/lib/crm/types";
import {
  formatPipelineCurrency,
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
  onStatusChange,
  onQuickReminder,
}: {
  lead: CrmLead;
  onStatusChange: (leadId: string, point: { x: number; y: number }) => void;
  onQuickReminder: (lead: CrmLead) => void;
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
      }
      onStatusChange(lead.id, info.point);
      window.setTimeout(() => {
        draggedRef.current = false;
      }, 520);
    },
    [lead.id, onStatusChange]
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
      drag={!reduceMotion}
      dragElastic={0.08}
      dragSnapToOrigin
      whileDrag={{ scale: 0.97, zIndex: 50 }}
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
      role="button"
      tabIndex={0}
      className={cn(
        "group relative cursor-grab rounded-[2rem] rim-light p-4 pt-8 text-left",
        "active:cursor-grabbing focus-visible:outline focus-visible:outline-2",
        "focus-visible:outline-offset-2 focus-visible:outline-samsung-blue/60"
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
          className="flex h-8 w-8 items-center justify-center rounded-full bg-void/80 text-gray-100 ring-1 ring-white/10 transition-colors hover:bg-shark hover:text-white"
        >
          <Bell className="h-3.5 w-3.5" />
        </button>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`WhatsApp ${lead.name}`}
          onClick={stopCardNav}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-void/80 text-whatsapp ring-1 ring-white/10 transition-colors hover:bg-whatsapp/20"
        >
          <MessageCircle className="h-3.5 w-3.5" />
        </a>
      </div>

      <p className="pr-16 text-sm font-semibold tracking-tight text-white">{lead.name}</p>
      {lead.company ? (
        <p className="mt-1 text-[10px] uppercase tracking-wider text-gray-400">{lead.company}</p>
      ) : null}

      <div className="mt-4 rounded-xl bg-[#008080]/10 px-3 py-2 ring-1 ring-[#008080]/20">
        <p className="text-[10px] font-medium uppercase tracking-wider text-[#008080]">
          Est. capital
        </p>
        <p className="mt-1 text-lg font-bold tabular-nums tracking-tight text-[#008080]">
          {formatCapitalDisplay(lead)}
        </p>
      </div>

      <p className="mt-4 line-clamp-2 text-xs leading-relaxed text-gray-100">{lead.intent}</p>

      <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-white/5 pt-4">
        <span className="text-[10px] font-medium text-gray-100">
          {SERVICE_LABELS[lead.service_category]}
        </span>
        <span className="ml-auto rounded-full bg-supernova-gold/15 px-2 py-0.5 text-[10px] font-bold tabular-nums text-supernova-gold">
          {lead.lead_score}
        </span>
      </div>
    </motion.div>
  );
}

export function LeadsKanban() {
  const { visibleLeads, updateLeadStatus, addReminder } = useCrm();

  const handleStatusChange = useCallback(
    (leadId: string, point: { x: number; y: number }) => {
      const el = document.elementFromPoint(point.x, point.y);
      const column = el?.closest("[data-kanban-column]") as HTMLElement | null;
      const nextStatus = column?.dataset.status as LeadStatus | undefined;
      if (!nextStatus) return;
      updateLeadStatus(leadId, nextStatus);
    },
    [updateLeadStatus]
  );

  const handleQuickReminder = useCallback(
    (lead: CrmLead) => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(10, 0, 0, 0);
      const isoLocal = tomorrow.toISOString().slice(0, 16);
      addReminder(lead.id, `Follow up — ${lead.name}`, isoLocal);
    },
    [addReminder]
  );

  const columns = useMemo(
    () =>
      KANBAN_COLUMNS.map((col) => {
        const items = visibleLeads.filter((l) => l.status === col.status);
        return {
          ...col,
          items,
          totalCapital: sumColumnCapital(items),
        };
      }),
    [visibleLeads]
  );

  return (
    <div className="flex gap-8 overflow-x-auto pb-8">
      {columns.map((col) => (
        <div
          key={col.status}
          data-kanban-column
          data-status={col.status}
          className="flex w-80 shrink-0 flex-col"
        >
          <header className="mb-4 border-b border-white/10 pb-4">
            <h2 className="text-sm font-semibold tracking-[-0.03em] text-white">
              {col.label}
              <span className="ml-2 font-normal text-gray-400">·</span>
              <span className="ml-2 font-bold tabular-nums text-gray-100">
                {formatPipelineCurrency(col.totalCapital)}
              </span>
            </h2>
            <p className="mt-1 text-[10px] tabular-nums text-gray-400">
              {col.items.length} {col.items.length === 1 ? "dossier" : "dossiers"}
            </p>
          </header>

          <div className="flex min-h-[16rem] flex-col gap-4">
            {col.items.map((lead) => (
              <LeadCard
                key={lead.id}
                lead={lead}
                onStatusChange={handleStatusChange}
                onQuickReminder={handleQuickReminder}
              />
            ))}
            {col.items.length === 0 ? (
              <p className="py-12 text-center text-xs text-gray-400">No opportunities</p>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}
