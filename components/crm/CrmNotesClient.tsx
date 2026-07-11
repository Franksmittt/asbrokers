"use client";

import { useMemo, useState } from "react";

import { useCrm } from "@/components/crm/CrmContext";
import type { CrmGlobalNote } from "@/lib/crm/types";
import { formatAdvisorLabel } from "@/lib/crm/utils";
import { cn } from "@/lib/utils";

function formatNoteTime(iso: string) {
  return new Intl.DateTimeFormat("en-ZA", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

function notePreview(content: string) {
  const line = content.split("\n")[0] ?? "";
  return line.length > 72 ? `${line.slice(0, 72)}…` : line;
}

export function CrmNotesClient({ initialNotes }: { initialNotes: CrmGlobalNote[] }) {
  const { addGlobalNote } = useCrm();
  const [draft, setDraft] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const sortedNotes = useMemo(
    () =>
      [...initialNotes].sort(
        (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      ),
    [initialNotes]
  );

  const selectedNote = sortedNotes.find((n) => n.id === selectedId) ?? sortedNotes[0];

  const handleSave = async () => {
    await addGlobalNote(draft);
    setDraft("");
  };

  return (
    <div className="flex min-h-[calc(100vh-10rem)] flex-col">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-[-0.03em] text-white">Notes</h1>
        <p className="mt-2 text-sm text-gray-100">Team thoughts, Apple Notes inspired workspace</p>
      </header>

      <div className="flex min-h-0 flex-1 flex-col gap-8 lg:flex-row">
        <aside className="flex w-full flex-col lg:w-1/3">
          <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
            All notes
          </p>
          <ul className="max-h-[40vh] flex-1 space-y-2 overflow-y-auto lg:max-h-none">
            {sortedNotes.length === 0 ? (
              <li className="text-sm text-gray-400">No notes yet.</li>
            ) : (
              sortedNotes.map((note) => (
                <li key={note.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedId(note.id)}
                    className={cn(
                      "w-full rounded-2xl px-4 py-4 text-left transition-colors",
                      selectedNote?.id === note.id
                        ? "bg-shark ring-1 ring-white/10"
                        : "hover:bg-shark/60"
                    )}
                  >
                    <p className="line-clamp-2 text-sm font-medium text-white">
                      {notePreview(note.content)}
                    </p>
                    <p className="mt-2 text-[10px] text-gray-400">
                      {formatAdvisorLabel(note.authorId)} · {formatNoteTime(note.timestamp)}
                    </p>
                  </button>
                </li>
              ))
            )}
          </ul>
        </aside>

        <div className="relative flex min-h-[24rem] flex-1 flex-col lg:w-2/3">
          {selectedNote ? (
            <div className="mb-8 rounded-[2rem] rim-light p-6">
              <p className="text-[10px] text-gray-400">
                {formatAdvisorLabel(selectedNote.authorId)} ·{" "}
                {formatNoteTime(selectedNote.timestamp)}
              </p>
              <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-gray-100">
                {selectedNote.content}
              </p>
            </div>
          ) : null}

          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Capture a thought for the team…"
            className="min-h-[20rem] flex-1 resize-none bg-void px-2 py-4 text-base leading-relaxed text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-0"
          />

          <button
            type="button"
            disabled={!draft.trim()}
            onClick={() => void handleSave()}
            className={cn(
              "absolute bottom-4 right-4 rounded-2xl rim-light px-6 py-3 text-sm font-semibold text-white",
              "transition-all duration-300 ease-apple hover:shadow-cta-glow-blue",
              "disabled:cursor-not-allowed disabled:opacity-40"
            )}
          >
            Save Note
          </button>
        </div>
      </div>
    </div>
  );
}
