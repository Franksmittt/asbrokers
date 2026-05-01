"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  getNodeById,
  type TimelineNode,
  type TimelineNodeContent,
} from "@/lib/presentation-data";

const APPLE_EASE = [0.25, 0.1, 0.25, 1] as const;
const DURATION = 0.55;

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
      <span className="text-cinematic-teal font-medium">{matched}</span>
      {restPhrases.length > 0 ? highlightBody(after, restPhrases) : after}
    </>
  );
}

function ContentPanel({
  node,
  onClose,
}: {
  node: TimelineNode;
  onClose: () => void;
}) {
  const { content } = node;
  const hasChildren = node.children && node.children.length > 0;
  const [selectedChildId, setSelectedChildId] = useState<string | null>(null);
  const displayContent: TimelineNodeContent = selectedChildId
    ? (node.children!.find((c) => c.id === selectedChildId)?.content ?? content)
    : content;

  return (
    <motion.div
      layout
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: DURATION, ease: APPLE_EASE }}
      className="absolute inset-y-0 right-0 w-full max-w-lg bg-vault-card border-l border-white/10 shadow-[-8px_0_40px_rgba(0,0,0,0.4)] rounded-l-[2rem] overflow-hidden flex flex-col z-10"
    >
      <div className="p-6 md:p-8 flex-1 overflow-y-auto">
        <div className="flex items-start justify-between gap-4 mb-6">
          <h2 className="text-xl font-bold text-white tracking-tight">
            {displayContent.headline}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close panel"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {hasChildren && (
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              type="button"
              onClick={() => setSelectedChildId(null)}
              className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-all ${
                !selectedChildId
                  ? "bg-cinematic-teal/20 text-cinematic-teal border border-cinematic-teal/40"
                  : "bg-white/5 text-zinc-400 border border-white/10 hover:border-white/20"
              }`}
            >
              Overview
            </button>
            {node.children!.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelectedChildId(c.id)}
                className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-all ${
                  selectedChildId === c.id
                    ? "bg-cinematic-teal/20 text-cinematic-teal border border-cinematic-teal/40"
                    : "bg-white/5 text-zinc-400 border border-white/10 hover:border-white/20"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        )}
        <p className="text-gray-400 text-sm leading-relaxed mb-6">
          {highlightBody(displayContent.body, displayContent.highlightPhrases)}
        </p>
        {displayContent.bullets && displayContent.bullets.length > 0 && (
          <ul className="space-y-2">
            {displayContent.bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                <span className="text-cinematic-teal mt-0.5 shrink-0">•</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
}

function NodeButton({
  nodeId,
  label,
  isActive,
  onClick,
}: {
  nodeId: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={`rounded-[2rem] px-3 py-2 text-xs sm:text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cinematic-teal/50 whitespace-nowrap rim-light border ${
        isActive
          ? "bg-cinematic-teal/20 text-cinematic-teal border-cinematic-teal/50 shadow-cta-glow-blue"
          : "bg-white/5 text-zinc-300 border-white/20 hover:bg-white/10 hover:border-white/30 hover:text-white"
      }`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.25, ease: APPLE_EASE }}
    >
      {label}
    </motion.button>
  );
}

export function WealthArchitectureTimeline() {
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
  const activeNode = activeNodeId ? getNodeById(activeNodeId) : undefined;

  const toggleNode = (id: string) => setActiveNodeId((prev) => (prev === id ? null : id));

  return (
    <div className="relative min-h-[70vh] rounded-[2rem] bg-void overflow-x-auto overflow-y-hidden border border-white/10 shadow-rim-glow">
      {/* Ambient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-15%] left-[-10%] w-[50%] h-[50%] bg-[#008080]/20 blur-[140px] rounded-full animate-pulse" style={{ animationDuration: "6s" }} />
        <div className="absolute bottom-[-10%] right-[-15%] w-[45%] h-[45%] bg-[#FF7F50]/15 blur-[120px] rounded-full animate-pulse" style={{ animationDuration: "8s" }} />
      </div>

      {/* Timeline content: strict left-to-right layout */}
      <div className="relative flex items-stretch min-w-[1280px] py-16 px-6 gap-0">
        {/* Single continuous horizontal line (runs through center, full width of content) */}
        <div
          className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-white/20 pointer-events-none"
          aria-hidden
        />
        {/* ----- START: Arrow + Calculations ----- */}
        <section className="flex-shrink-0 w-36 flex flex-col items-center justify-center gap-3">
          <div className="text-white/40" aria-hidden>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </div>
          <NodeButton nodeId="calculations" label="Calculations" isActive={activeNodeId === "calculations"} onClick={() => toggleNode("calculations")} />
        </section>

        {/* Line segment */}
        <div className="flex-shrink-0 w-8 self-center h-px bg-white/20" />

        {/* ----- SECTION 1: Estate & Wealth Foundation ----- */}
        <section className="flex-shrink-0 w-72 flex flex-col justify-between py-2">
          <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
            <NodeButton nodeId="vitality" label="Vitality" isActive={activeNodeId === "vitality"} onClick={() => toggleNode("vitality")} />
            <NodeButton nodeId="will" label="Last Will Testament" isActive={activeNodeId === "will"} onClick={() => toggleNode("will")} />
          </div>
          <div className="flex-shrink-0 h-px w-full bg-white/20 my-1" />
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
            <NodeButton nodeId="everest-wealth" label="Everest Wealth" isActive={activeNodeId === "everest-wealth"} onClick={() => toggleNode("everest-wealth")} />
            <NodeButton nodeId="trust" label="Trust Business Structure" isActive={activeNodeId === "trust"} onClick={() => toggleNode("trust")} />
          </div>
        </section>

        <div className="flex-shrink-0 w-6 self-center h-px bg-white/20" />

        {/* ----- SECTION 2: Life Risk (branches down into Life Assurance) ----- */}
        <section className="flex-shrink-0 w-80 relative flex flex-col justify-between py-2">
          {/* Top: Death, Permanent Disability, Temporary Disability + branches */}
          <div className="relative flex justify-center gap-2 mb-2">
            <svg className="absolute left-0 right-0 top-full w-full h-12 pointer-events-none" style={{ filter: "drop-shadow(0 0 1px rgba(255,255,255,0.3))" }}>
              <line x1="20%" y1="0" x2="50%" y2="48" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
              <line x1="50%" y1="0" x2="50%" y2="48" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
              <line x1="80%" y1="0" x2="50%" y2="48" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
            </svg>
            <NodeButton nodeId="life-death" label="Death" isActive={activeNodeId === "life-death"} onClick={() => toggleNode("life-death")} />
            <NodeButton nodeId="life-permanent-disability" label="Permanent Disability" isActive={activeNodeId === "life-permanent-disability"} onClick={() => toggleNode("life-permanent-disability")} />
            <NodeButton nodeId="life-temporary-disability" label="Temporary Disability" isActive={activeNodeId === "life-temporary-disability"} onClick={() => toggleNode("life-temporary-disability")} />
          </div>
          {/* On line: Life Assurance */}
          <div className="flex justify-center -my-1 relative z-[1]">
            <NodeButton nodeId="life-assurance" label="Life Assurance" isActive={activeNodeId === "life-assurance"} onClick={() => toggleNode("life-assurance")} />
          </div>
          {/* Bottom: Severe Illness */}
          <div className="flex justify-center mt-2">
            <NodeButton nodeId="life-illness" label="Severe Illness" isActive={activeNodeId === "life-illness"} onClick={() => toggleNode("life-illness")} />
          </div>
        </section>

        <div className="flex-shrink-0 w-6 self-center h-px bg-white/20" />

        {/* ----- SECTION 3: Short Term Risk & Health ----- */}
        <section className="flex-shrink-0 w-80 relative flex flex-col justify-between py-2">
          {/* Top: Business, Personal + branches down into Short term */}
          <div className="relative flex justify-center gap-2 mb-2">
            <svg className="absolute left-0 right-0 top-full w-full h-12 pointer-events-none" style={{ filter: "drop-shadow(0 0 1px rgba(255,255,255,0.3))" }}>
              <line x1="35%" y1="0" x2="25%" y2="48" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
              <line x1="65%" y1="0" x2="25%" y2="48" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
            </svg>
            <NodeButton nodeId="short-term-business" label="Business" isActive={activeNodeId === "short-term-business"} onClick={() => toggleNode("short-term-business")} />
            <NodeButton nodeId="short-term-personal" label="Personal" isActive={activeNodeId === "short-term-personal"} onClick={() => toggleNode("short-term-personal")} />
          </div>
          {/* On line: Short term, Medical aid */}
          <div className="flex justify-center gap-2 -my-1 relative z-[1]">
            <NodeButton nodeId="short-term" label="Short term" isActive={activeNodeId === "short-term"} onClick={() => toggleNode("short-term")} />
            <NodeButton nodeId="medical-aid" label="Medical aid" isActive={activeNodeId === "medical-aid"} onClick={() => toggleNode("medical-aid")} />
          </div>
          {/* Bottom: Gap Cover (under Medical Aid) */}
          <div className="flex justify-center mt-2">
            <NodeButton nodeId="gap-cover" label="Gap Cover" isActive={activeNodeId === "gap-cover"} onClick={() => toggleNode("gap-cover")} />
          </div>
        </section>

        <div className="flex-shrink-0 w-6 self-center h-px bg-white/20" />

        {/* ----- SECTION 4: Accumulation & Endpoints ----- */}
        <section className="flex-shrink-0 w-80 relative flex flex-col justify-between py-2">
          {/* Top: Aesthetic text only */}
          <div className="flex justify-center mb-2">
            <span className="text-xs sm:text-sm font-medium text-zinc-500 uppercase tracking-wider">Retirement Planning</span>
          </div>
          {/* On line: Investments */}
          <div className="flex justify-center -my-1 relative z-[1]">
            <NodeButton nodeId="investments" label="Investments" isActive={activeNodeId === "investments"} onClick={() => toggleNode("investments")} />
          </div>
          {/* Bottom: Aesthetic text block */}
          <div className="flex justify-center mt-2 px-2">
            <span className="text-[10px] sm:text-xs text-zinc-500 text-center leading-tight">Investments Before &amp; after Retirement.</span>
          </div>
          {/* Fork: line splits into Retirement (top) and Financial Freedom (bottom) */}
          <div className="flex-shrink-0 w-4 self-center" />
          <div className="relative flex flex-col items-center gap-4 mt-4">
            <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-16 pointer-events-none" style={{ filter: "drop-shadow(0 0 1px rgba(255,255,255,0.3))" }}>
              <path d="M 0 8 L 40 8 L 48 0 M 40 8 L 48 16" stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="none" />
            </svg>
            <NodeButton nodeId="retirement" label="Retirement" isActive={activeNodeId === "retirement"} onClick={() => toggleNode("retirement")} />
            <NodeButton nodeId="financial-freedom" label="Financial Freedom" isActive={activeNodeId === "financial-freedom"} onClick={() => toggleNode("financial-freedom")} />
          </div>
        </section>
      </div>

      {/* Content panel (slide-in from right); panel overlays timeline */}
      <AnimatePresence mode="wait">
        {activeNode && (
          <ContentPanel
            key={activeNode.id}
            node={activeNode}
            onClose={() => setActiveNodeId(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
