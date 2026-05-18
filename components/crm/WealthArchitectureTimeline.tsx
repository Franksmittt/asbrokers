"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  getNodeById,
  PHASES,
  type PhaseId,
  type TimelineNode,
  type TimelineNodeContent,
} from "@/lib/presentation-data";

const APPLE_EASE = [0.25, 0.1, 0.25, 1] as const;
const DURATION = 0.5;

const PHASE_NODE_STYLES: Record<
  PhaseId,
  { active: string; idle: string; dot: string; badge: string }
> = {
  create: {
    active: "bg-teal-500/20 text-teal-100 border-teal-400/50 shadow-[0_0_24px_rgba(45,212,191,0.25)]",
    idle: "bg-white/[0.04] text-zinc-200 border-white/15 hover:border-teal-500/30 hover:bg-teal-500/10",
    dot: "bg-teal-400",
    badge: "bg-teal-500/15 text-teal-200 border-teal-500/30",
  },
  protect: {
    active: "bg-amber-500/15 text-amber-100 border-amber-400/45 shadow-[0_0_24px_rgba(251,191,36,0.18)]",
    idle: "bg-white/[0.04] text-zinc-200 border-white/15 hover:border-amber-500/30 hover:bg-amber-500/10",
    dot: "bg-amber-400",
    badge: "bg-amber-500/15 text-amber-200 border-amber-500/30",
  },
  "pass-on": {
    active: "bg-violet-500/15 text-violet-100 border-violet-400/45 shadow-[0_0_24px_rgba(167,139,250,0.2)]",
    idle: "bg-white/[0.04] text-zinc-200 border-white/15 hover:border-violet-500/30 hover:bg-violet-500/10",
    dot: "bg-violet-400",
    badge: "bg-violet-500/15 text-violet-200 border-violet-500/30",
  },
};

function phaseLabel(phase: PhaseId): string {
  return PHASES.find((p) => p.id === phase)?.title.replace(/^Phase \d+: /, "") ?? phase;
}

function highlightBody(text: string, phrases: string[] = []): React.ReactNode {
  if (!text || phrases.length === 0) return text;
  const phrase = phrases.find((p) => text.toLowerCase().includes(p.toLowerCase()));
  if (!phrase) return text;
  const idx = text.toLowerCase().indexOf(phrase.toLowerCase());
  const before = text.slice(0, idx);
  const matched = text.slice(idx, idx + phrase.length);
  const after = text.slice(idx + phrase.length);
  const restPhrases = phrases.filter((p) => p !== phrase);
  return (
    <>
      {before}
      <span className="font-medium text-cinematic-teal">{matched}</span>
      {restPhrases.length > 0 ? highlightBody(after, restPhrases) : after}
    </>
  );
}

function ContentPanel({ node, onClose }: { node: TimelineNode; onClose: () => void }) {
  const { content, phase } = node;
  const hasChildren = node.children && node.children.length > 0;
  const [selectedChildId, setSelectedChildId] = useState<string | null>(null);
  const displayContent: TimelineNodeContent = selectedChildId
    ? (node.children!.find((c) => c.id === selectedChildId)?.content ?? content)
    : content;
  const styles = PHASE_NODE_STYLES[phase];

  return (
    <motion.div
      layout
      initial={{ x: "100%", opacity: 0.6 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ duration: DURATION, ease: APPLE_EASE }}
      className="absolute inset-y-0 right-0 z-20 flex w-full max-w-md flex-col overflow-hidden rounded-l-[2rem] border-l border-white/10 bg-zinc-950/95 shadow-[-12px_0_48px_rgba(0,0,0,0.55)] backdrop-blur-xl"
    >
      <div className="border-b border-white/10 bg-gradient-to-r from-white/[0.04] to-transparent px-6 py-5 md:px-8">
        <div className="mb-3 flex items-start justify-between gap-4">
          <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${styles.badge}`}>
            {phaseLabel(phase)}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-xl p-2 text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Close panel"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <h2 className="text-xl font-bold tracking-tight text-white md:text-2xl">{displayContent.headline}</h2>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-5 md:px-8">
        {hasChildren && (
          <div className="mb-5 flex flex-wrap gap-2">
            <TabChip active={!selectedChildId} onClick={() => setSelectedChildId(null)} label="Overview" />
            {node.children!.map((c) => (
              <TabChip
                key={c.id}
                active={selectedChildId === c.id}
                onClick={() => setSelectedChildId(c.id)}
                label={c.label}
              />
            ))}
          </div>
        )}
        <p className="mb-6 text-sm leading-relaxed text-zinc-300">
          {highlightBody(displayContent.body, displayContent.highlightPhrases)}
        </p>
        {displayContent.bullets && displayContent.bullets.length > 0 && (
          <ul className="space-y-3">
            {displayContent.bullets.map((b, i) => (
              <li
                key={i}
                className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.03] px-3 py-2.5 text-sm text-zinc-300"
              >
                <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${styles.dot}`} />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
}

function TabChip({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all ${
        active
          ? "border-cinematic-teal/40 bg-cinematic-teal/15 text-cinematic-teal"
          : "border-white/10 bg-white/5 text-zinc-400 hover:border-white/20 hover:text-zinc-200"
      }`}
    >
      {label}
    </button>
  );
}

function NodeButton({
  label,
  phase,
  isActive,
  onClick,
  reduceMotion,
}: {
  label: string;
  phase: PhaseId;
  isActive: boolean;
  onClick: () => void;
  reduceMotion: boolean | null;
}) {
  const styles = PHASE_NODE_STYLES[phase];
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={`whitespace-nowrap rounded-2xl border px-3.5 py-2 text-xs font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cinematic-teal/40 sm:text-sm ${
        isActive ? styles.active : styles.idle
      }`}
      whileHover={reduceMotion ? undefined : { scale: 1.03, y: -1 }}
      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.22, ease: APPLE_EASE }}
    >
      {label}
    </motion.button>
  );
}

function ColumnHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-3 text-center">
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">{title}</p>
      {subtitle && <p className="mt-0.5 text-[10px] text-zinc-600">{subtitle}</p>}
    </div>
  );
}

type Props = {
  presentation?: boolean;
};

export function WealthArchitectureTimeline({ presentation = false }: Props) {
  const reduceMotion = useReducedMotion();
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
  const activeNode = activeNodeId ? getNodeById(activeNodeId) : undefined;

  const toggleNode = (id: string) => setActiveNodeId((prev) => (prev === id ? null : id));

  return (
    <div
      className={`relative overflow-x-auto overflow-y-hidden rounded-[2rem] border border-white/10 bg-[#050506] shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_24px_80px_rgba(0,0,0,0.45)] ${
        presentation ? "min-h-[calc(100vh-5rem)]" : "min-h-[72vh]"
      }`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.07) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div
          className="absolute -left-[10%] top-[-20%] h-[55%] w-[45%] animate-pulse rounded-full bg-cinematic-teal/15 blur-[120px]"
          style={{ animationDuration: "7s" }}
        />
        <div
          className="absolute -bottom-[15%] right-[-10%] h-[50%] w-[40%] animate-pulse rounded-full bg-amber-500/10 blur-[100px]"
          style={{ animationDuration: "9s" }}
          aria-hidden
        />
      </div>

      <div className="relative min-w-[1320px] px-4 py-10 sm:px-8 sm:py-14">
        <div className="pointer-events-none absolute left-8 right-8 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-white/25 to-transparent" aria-hidden />

        <div className="relative flex items-stretch gap-0">
          <section className="flex w-40 shrink-0 flex-col items-center justify-center gap-4">
            <ColumnHeader title="Start" subtitle="Tools & models" />
            <div className="text-white/30" aria-hidden>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <NodeButton
              label="Calculations"
              phase="create"
              isActive={activeNodeId === "calculations"}
              onClick={() => toggleNode("calculations")}
              reduceMotion={reduceMotion}
            />
          </section>

          <div className="w-6 shrink-0 self-center border-t border-dashed border-white/15" />

          <section className="flex w-72 shrink-0 flex-col justify-between py-1">
            <ColumnHeader title="Foundation" subtitle="Estate & structure" />
            <div className="flex flex-wrap items-center justify-center gap-2">
              <NodeButton label="Vitality" phase="pass-on" isActive={activeNodeId === "vitality"} onClick={() => toggleNode("vitality")} reduceMotion={reduceMotion} />
              <NodeButton label="Last Will" phase="pass-on" isActive={activeNodeId === "will"} onClick={() => toggleNode("will")} reduceMotion={reduceMotion} />
            </div>
            <div className="my-2 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" aria-hidden />
            <div className="flex flex-wrap items-center justify-center gap-2">
              <NodeButton label="Everest Wealth" phase="create" isActive={activeNodeId === "everest-wealth"} onClick={() => toggleNode("everest-wealth")} reduceMotion={reduceMotion} />
              <NodeButton label="Trust structure" phase="pass-on" isActive={activeNodeId === "trust"} onClick={() => toggleNode("trust")} reduceMotion={reduceMotion} />
            </div>
          </section>

          <div className="w-5 shrink-0 self-center border-t border-dashed border-white/15" />

          <section className="relative flex w-[19rem] shrink-0 flex-col justify-between py-1">
            <ColumnHeader title="Life risk" subtitle="Protection layer" />
            <div className="relative mb-1 flex justify-center gap-1.5">
              <svg className="pointer-events-none absolute left-0 right-0 top-full h-10 w-full" aria-hidden>
                <line x1="18%" y1="0" x2="50%" y2="40" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                <line x1="50%" y1="0" x2="50%" y2="40" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                <line x1="82%" y1="0" x2="50%" y2="40" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
              </svg>
              <NodeButton label="Death" phase="protect" isActive={activeNodeId === "life-death"} onClick={() => toggleNode("life-death")} reduceMotion={reduceMotion} />
              <NodeButton label="Disability" phase="protect" isActive={activeNodeId === "life-permanent-disability"} onClick={() => toggleNode("life-permanent-disability")} reduceMotion={reduceMotion} />
              <NodeButton label="Temp. disability" phase="protect" isActive={activeNodeId === "life-temporary-disability"} onClick={() => toggleNode("life-temporary-disability")} reduceMotion={reduceMotion} />
            </div>
            <div className="relative z-[1] flex justify-center">
              <NodeButton label="Life assurance" phase="protect" isActive={activeNodeId === "life-assurance"} onClick={() => toggleNode("life-assurance")} reduceMotion={reduceMotion} />
            </div>
            <div className="mt-1 flex justify-center">
              <NodeButton label="Severe illness" phase="protect" isActive={activeNodeId === "life-illness"} onClick={() => toggleNode("life-illness")} reduceMotion={reduceMotion} />
            </div>
          </section>

          <div className="w-5 shrink-0 self-center border-t border-dashed border-white/15" />

          <section className="relative flex w-[19rem] shrink-0 flex-col justify-between py-1">
            <ColumnHeader title="Short-term & health" />
            <div className="relative mb-1 flex justify-center gap-2">
              <svg className="pointer-events-none absolute left-0 right-0 top-full h-10 w-full" aria-hidden>
                <line x1="32%" y1="0" x2="28%" y2="40" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                <line x1="68%" y1="0" x2="28%" y2="40" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
              </svg>
              <NodeButton label="Business" phase="protect" isActive={activeNodeId === "short-term-business"} onClick={() => toggleNode("short-term-business")} reduceMotion={reduceMotion} />
              <NodeButton label="Personal" phase="protect" isActive={activeNodeId === "short-term-personal"} onClick={() => toggleNode("short-term-personal")} reduceMotion={reduceMotion} />
            </div>
            <div className="relative z-[1] flex flex-wrap justify-center gap-2">
              <NodeButton label="Short term" phase="protect" isActive={activeNodeId === "short-term"} onClick={() => toggleNode("short-term")} reduceMotion={reduceMotion} />
              <NodeButton label="Medical aid" phase="protect" isActive={activeNodeId === "medical-aid"} onClick={() => toggleNode("medical-aid")} reduceMotion={reduceMotion} />
            </div>
            <div className="mt-1 flex justify-center">
              <NodeButton label="Gap cover" phase="protect" isActive={activeNodeId === "gap-cover"} onClick={() => toggleNode("gap-cover")} reduceMotion={reduceMotion} />
            </div>
          </section>

          <div className="w-5 shrink-0 self-center border-t border-dashed border-white/15" />

          <section className="relative flex w-80 shrink-0 flex-col justify-between py-1">
            <ColumnHeader title="Accumulation" subtitle="Retirement path" />
            <div className="flex justify-center">
              <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                Retirement planning
              </span>
            </div>
            <div className="relative z-[1] flex justify-center">
              <NodeButton label="Investments" phase="create" isActive={activeNodeId === "investments"} onClick={() => toggleNode("investments")} reduceMotion={reduceMotion} />
            </div>
            <p className="text-center text-[10px] leading-snug text-zinc-600">
              Before & after retirement
            </p>
            <div className="relative mt-2 flex flex-col items-center gap-3">
              <NodeButton label="Retirement" phase="create" isActive={activeNodeId === "retirement"} onClick={() => toggleNode("retirement")} reduceMotion={reduceMotion} />
              <NodeButton label="Financial freedom" phase="create" isActive={activeNodeId === "financial-freedom"} onClick={() => toggleNode("financial-freedom")} reduceMotion={reduceMotion} />
            </div>
          </section>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeNode && (
          <ContentPanel key={activeNode.id} node={activeNode} onClose={() => setActiveNodeId(null)} />
        )}
      </AnimatePresence>

      {!activeNodeId && (
        <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-black/50 px-4 py-1.5 text-[11px] text-zinc-500 backdrop-blur-sm">
          Tap any topic to open talking points
        </div>
      )}
    </div>
  );
}
