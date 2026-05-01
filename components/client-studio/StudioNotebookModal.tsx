"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState, useTransition } from "react";

import {
  deleteStudioNotebookNote,
  listStudioNotebookNotes,
  saveStudioNotebookNote,
} from "@/app/studio/blog/notebook-actions";
import type { SerializableNotebookNote } from "@/lib/client-studio/notebook-types";

function formatWhen(iso: string) {
  return new Date(iso).toLocaleString("en-ZA", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function preview(body: string) {
  const t = body.trim().replace(/\s+/g, " ");
  return t.length > 72 ? `${t.slice(0, 72)}…` : t || "—";
}

type Props = {
  open: boolean;
  onClose: () => void;
  initialNotes: SerializableNotebookNote[];
  databaseConfigured: boolean;
};

export function StudioNotebookModal({ open, onClose, initialNotes, databaseConfigured }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [notes, setNotes] = useState<SerializableNotebookNote[]>(initialNotes);
  const [mode, setMode] = useState<"list" | "edit" | "new">("list");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [banner, setBanner] = useState<string | null>(null);

  useEffect(() => {
    setNotes(initialNotes);
  }, [initialNotes]);

  useEffect(() => {
    if (!open) return;
    setBanner(null);
  }, [open]);

  const reloadNotes = useCallback(async () => {
    const res = await listStudioNotebookNotes();
    if (res.ok) setNotes(res.notes);
  }, []);

  useEffect(() => {
    if (!open || !databaseConfigured) return;
    void reloadNotes();
  }, [open, databaseConfigured, reloadNotes]);

  const loadNote = useCallback((n: SerializableNotebookNote) => {
    setMode("edit");
    setActiveId(n.id);
    setTitle(n.title);
    setBody(n.body);
    setBanner(null);
  }, []);

  const startNew = useCallback(() => {
    setMode("new");
    setActiveId(null);
    setTitle("");
    setBody("");
    setBanner(null);
  }, []);

  function runSave() {
    if (!databaseConfigured) {
      setBanner("Database not connected yet — notebook cannot save.");
      return;
    }
    setBanner(null);
    startTransition(async () => {
      const savingId = mode === "new" ? null : activeId;
      const res = await saveStudioNotebookNote(savingId, { title, body });
      if (!res.ok) {
        setBanner(res.error);
        return;
      }
      const listRes = await listStudioNotebookNotes();
      if (listRes.ok) {
        setNotes(listRes.notes);
        const found = listRes.notes.find((x) => x.id === res.id);
        if (found) {
          setMode("edit");
          setActiveId(res.id);
          setTitle(found.title);
          setBody(found.body);
        }
      }
      setBanner("Saved.");
      router.refresh();
    });
  }

  function runDelete() {
    if (!activeId || mode !== "edit") return;
    if (!window.confirm("Delete this note permanently?")) return;
    setBanner(null);
    startTransition(async () => {
      const res = await deleteStudioNotebookNote(activeId);
      if (!res.ok) {
        setBanner(res.error);
        return;
      }
      const listRes = await listStudioNotebookNotes();
      if (listRes.ok) setNotes(listRes.notes);
      setMode("list");
      setActiveId(null);
      setTitle("");
      setBody("");
      setBanner("Note deleted.");
      router.refresh();
    });
  }

  const selectedMeta = activeId ? notes.find((x) => x.id === activeId) : undefined;

  if (!open) return null;

  const showEditor = mode === "edit" || mode === "new";
  const emptyLibrary = notes.length === 0;

  return (
    <div
      className="fixed inset-0 z-[60] overflow-y-auto overflow-x-hidden bg-black/75 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="notebook-dialog-title"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="flex min-h-full items-start justify-center p-4 py-8 sm:items-center sm:py-10">
        <div
          className="my-auto flex w-full max-w-5xl min-w-0 max-h-[min(90dvh,880px)] min-h-0 flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#121214] shadow-2xl"
          onMouseDown={(e) => e.stopPropagation()}
        >
          <div className="flex shrink-0 flex-wrap items-center justify-between gap-2 border-b border-white/10 px-4 py-3">
            <h2 id="notebook-dialog-title" className="min-w-0 truncate text-sm font-semibold text-white">
              Notebook
            </h2>
            <p className="hidden text-xs text-zinc-500 md:block">
              Personal notes only — visitors never see this
            </p>
            <button
              type="button"
              onClick={onClose}
              className="shrink-0 rounded-lg px-2 py-1 text-lg leading-none text-zinc-400 hover:bg-white/10 hover:text-white"
              aria-label="Close"
            >
              ×
            </button>
          </div>

          {!databaseConfigured && (
            <div className="shrink-0 border-b border-amber-500/30 bg-amber-950/40 px-4 py-2 text-sm text-amber-100">
              Database is not connected. Notes cannot be saved until the server database is configured.
            </div>
          )}

          {banner && (
            <div className="shrink-0 border-b border-white/10 bg-zinc-900/90 px-4 py-2 text-sm text-zinc-200">{banner}</div>
          )}

          <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
            <aside className="flex max-h-[min(42vh,360px)] min-h-0 w-full shrink-0 flex-col border-b border-white/10 lg:h-auto lg:max-h-none lg:w-72 lg:border-b-0 lg:border-r lg:border-white/10">
              <div className="shrink-0 border-b border-white/5 p-3">
                <button
                  type="button"
                  onClick={startNew}
                  className="w-full rounded-xl bg-teal-600 py-2.5 text-sm font-semibold text-white hover:bg-teal-500 disabled:opacity-40"
                  disabled={!databaseConfigured || isPending}
                >
                  + New note
                </button>
              </div>
              <ul className="min-h-0 flex-1 list-none space-y-1 overflow-y-auto p-2">
                {!emptyLibrary ? null : (
                  <li className="rounded-lg px-3 py-4 text-center text-xs leading-relaxed text-zinc-500">
                    No notes yet. Tap New note above — or Write your first note on the right.
                  </li>
                )}
                {notes.map((n) => (
                  <li key={n.id}>
                    <button
                      type="button"
                      onClick={() => loadNote(n)}
                      className={`w-full rounded-xl px-3 py-2.5 text-left transition-colors ${
                        mode === "edit" && activeId === n.id
                          ? "bg-white/15 text-white"
                          : "text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
                      }`}
                    >
                      <span className="block truncate text-sm font-medium">{n.title.trim() || "Untitled note"}</span>
                      <span className="mt-1 block truncate text-[11px] text-zinc-500">{preview(n.body)}</span>
                      <span className="mt-1 block text-[10px] text-zinc-600">{formatWhen(n.updatedAt)}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </aside>

            <main className="flex min-h-[min(52dvh,480px)] min-w-0 flex-1 flex-col p-4">
              {!showEditor && !emptyLibrary && (
                <p className="mb-4 shrink-0 text-sm text-zinc-500">
                  Choose a note on the left, or tap New note to write something down.
                </p>
              )}

              {!showEditor && emptyLibrary && databaseConfigured && (
                <div className="flex flex-1 flex-col items-center justify-center gap-4 py-6 text-center">
                  <p className="max-w-md text-sm text-zinc-400">
                    Anything you jot here stays private — phone numbers to call back, wording ideas for an article,
                    reminders. Nothing appears on your public website.
                  </p>
                  <button
                    type="button"
                    onClick={startNew}
                    className="rounded-full bg-teal-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-teal-500"
                  >
                    Write your first note
                  </button>
                </div>
              )}

              {showEditor && (
                <>
                  <label className="mb-3 block shrink-0 text-xs text-zinc-500">
                    <span className="mb-1 block font-medium text-zinc-300">Title</span>
                    <input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Reminder — follow up Mrs du Preez"
                      className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-zinc-600"
                    />
                  </label>
                  <label className="mb-3 flex min-h-0 flex-1 flex-col text-xs text-zinc-500">
                    <span className="mb-1 shrink-0 font-medium text-zinc-300">Your note</span>
                    <textarea
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                      placeholder="Type anything — links, ideas, drafts to paste elsewhere later…"
                      spellCheck
                      className="min-h-[220px] w-full flex-1 resize-y rounded-xl border border-white/10 bg-black/60 px-3 py-2.5 text-sm leading-relaxed text-zinc-100 placeholder:text-zinc-600 lg:min-h-[260px]"
                    />
                  </label>
                  {mode === "edit" && selectedMeta ? (
                    <p className="mb-3 shrink-0 text-[11px] text-zinc-500">
                      <span className="text-zinc-600">Created</span> {formatWhen(selectedMeta.createdAt)}{" "}
                      <span className="mx-2 text-zinc-700">·</span>
                      <span className="text-zinc-600">Last edited</span> {formatWhen(selectedMeta.updatedAt)}
                    </p>
                  ) : (
                    mode === "new" && (
                      <p className="mb-3 shrink-0 text-[11px] text-zinc-500">
                        Dates are added automatically when you save.
                      </p>
                    )
                  )}
                  <div className="mt-auto flex shrink-0 flex-wrap gap-2 pt-2">
                    <button
                      type="button"
                      disabled={isPending || !databaseConfigured}
                      onClick={() => runSave()}
                      className="rounded-full bg-teal-600 px-5 py-2 text-sm font-semibold text-white hover:bg-teal-500 disabled:opacity-40"
                    >
                      {isPending ? "Saving…" : "Save note"}
                    </button>
                    {mode === "edit" && activeId ? (
                      <button
                        type="button"
                        disabled={isPending}
                        onClick={() => runDelete()}
                        className="rounded-full border border-red-500/40 px-5 py-2 text-sm text-red-300 hover:bg-red-950/35 disabled:opacity-40"
                      >
                        Delete note
                      </button>
                    ) : null}
                  </div>
                </>
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
