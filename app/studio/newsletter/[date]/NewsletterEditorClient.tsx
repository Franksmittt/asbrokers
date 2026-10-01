"use client";

import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import type { ContentPickItem } from "@/lib/newsletter/content-types";
import type {
  ContentType,
  EvergreenSection,
  NewsletterEdition,
  ResolvedNewsletterEdition,
  SectionDynamicContent,
} from "@/lib/newsletter/types";
import { ContentPicker } from "@/components/newsletter/ContentPicker";
import { NewsletterLivePreview } from "@/components/newsletter/NewsletterLivePreview";
import {
  cancelScheduleAction,
  deleteEditionAction,
  publishEditionAction,
  saveEditionDraftAction,
  scheduleEditionAction,
  sendNewsletterTestAction,
  sendNewsletterNowAction,
  unpublishEditionAction,
} from "../actions";

type Catalog = {
  articles: ContentPickItem[];
  calculators: ContentPickItem[];
  courses: ContentPickItem[];
  pages: ContentPickItem[];
};

interface NewsletterEditorClientProps {
  edition: ResolvedNewsletterEdition;
  evergreenSections: EvergreenSection[];
  catalog: Catalog;
  baseUrl: string;
  resendConfigured: boolean;
}

const CONTENT_TYPES: { value: ContentType; label: string }[] = [
  { value: "article", label: "Article" },
  { value: "video", label: "Video" },
  { value: "course", label: "Course" },
  { value: "calculator", label: "Calculator" },
  { value: "webinar", label: "Webinar" },
  { value: "checklist", label: "Checklist" },
];

type EditorPanel = "content" | "sections" | "schedule";

function toDatetimeLocalValue(iso?: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  // Display in local browser time; label reminds staff of SAST intent
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function defaultScheduleLocal(): string {
  const d = new Date();
  // Next Monday 07:00 local
  const day = d.getDay();
  const add = day === 1 ? 7 : (8 - day) % 7 || 7;
  d.setDate(d.getDate() + add);
  d.setHours(7, 0, 0, 0);
  return toDatetimeLocalValue(d.toISOString());
}

export function NewsletterEditorClient({
  edition: initial,
  evergreenSections,
  catalog,
  baseUrl,
  resendConfigured,
}: NewsletterEditorClientProps) {
  const router = useRouter();
  const [panel, setPanel] = useState<EditorPanel>("content");
  const [previewMode, setPreviewMode] = useState<"web" | "email">("web");
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [testEmail, setTestEmail] = useState("solo9t9@gmail.com");
  const [scheduleLocal, setScheduleLocal] = useState(
    toDatetimeLocalValue(initial.scheduledAt) || defaultScheduleLocal()
  );
  const [message, setMessage] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const [draft, setDraft] = useState<NewsletterEdition>(initial);
  const draftRef = useRef(draft);
  draftRef.current = draft;

  const resolvedPreview: ResolvedNewsletterEdition = useMemo(
    () => ({ ...draft, evergreenSections }),
    [draft, evergreenSections]
  );

  // Debounced autosave
  useEffect(() => {
    setSaveState("saving");
    const timer = setTimeout(() => {
      startTransition(async () => {
        const result = await saveEditionDraftAction(draftRef.current);
        if (result.ok) {
          setSaveState("saved");
          router.refresh();
        } else {
          setSaveState("error");
          setMessage(result.error);
        }
      });
    }, 750);
    return () => clearTimeout(timer);
  }, [draft, router]);

  const inputClass =
    "w-full rounded-md border border-[#2a2a2a] bg-black px-3 py-2 text-sm text-white placeholder:text-zinc-600";
  const labelClass = "block text-xs font-medium text-zinc-400 mb-1";

  function patchDraft(patch: Partial<NewsletterEdition>) {
    setDraft((prev) => ({ ...prev, ...patch }));
  }

  function patchArticle(patch: Partial<NewsletterEdition["articleOfTheWeek"]>) {
    setDraft((prev) => ({
      ...prev,
      articleOfTheWeek: { ...prev.articleOfTheWeek, ...patch },
    }));
  }

  function setSectionContent(next: SectionDynamicContent[]) {
    patchDraft({ sectionContent: next });
  }

  function addSectionItem(sectionId: EvergreenSection["id"], item: {
    type: ContentType;
    label: string;
    href: string;
  }) {
    const existing = [...draft.sectionContent];
    const idx = existing.findIndex((s) => s.sectionId === sectionId);
    if (idx >= 0) {
      existing[idx] = {
        ...existing[idx]!,
        content: [...existing[idx]!.content, item],
      };
    } else {
      existing.push({ sectionId, content: [item] });
    }
    setSectionContent(existing);
  }

  function removeSectionItem(sectionId: EvergreenSection["id"], contentIndex: number) {
    const existing = draft.sectionContent
      .map((block) => {
        if (block.sectionId !== sectionId) return block;
        return {
          ...block,
          content: block.content.filter((_, i) => i !== contentIndex),
        };
      })
      .filter((block) => block.content.length > 0);
    setSectionContent(existing);
  }

  const statusBadge =
    draft.status === "published" || draft.status === "sent"
      ? "border-green-500/30 text-green-400"
      : draft.status === "scheduled"
        ? "border-sky-500/30 text-sky-300"
        : "border-[#2a2a2a] text-zinc-400";

  return (
    <div className="space-y-4">
      {/* Top bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#2a2a2a] bg-[#0a0a0a] px-4 py-3">
        <div className="flex flex-wrap items-center gap-3">
          <span className={`rounded border px-2 py-0.5 text-[10px] uppercase tracking-wide ${statusBadge}`}>
            {draft.status}
          </span>
          <span className="text-xs text-zinc-500">
            {saveState === "saving" || pending
              ? "Saving…"
              : saveState === "saved"
                ? "Saved just now"
                : saveState === "error"
                  ? "Save failed"
                  : "Ready"}
          </span>
          {message ? <span className="text-xs text-amber-300">{message}</span> : null}
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            { id: "content" as const, label: "Build" },
            { id: "sections" as const, label: "Sections" },
            { id: "schedule" as const, label: "Review & Send" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setPanel(tab.id)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium ${
                panel === tab.id
                  ? "bg-[#3ecf8e]/20 text-[#3ecf8e]"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        {/* Editor pane */}
        <div className="space-y-4 rounded-xl border border-[#2a2a2a] bg-[#0a0a0a] p-4">
          {panel === "content" ? (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-white">Campaign settings</h2>
                <p className="mt-1 text-xs text-zinc-500">
                  Edition date is the Monday label in the archive. Send time is separate (SAST).
                </p>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className={labelClass}>Edition date</label>
                    <input
                      type="date"
                      value={draft.date}
                      disabled
                      className={`${inputClass} opacity-70`}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Email subject</label>
                    <input
                      className={inputClass}
                      value={draft.subjectLine ?? ""}
                      placeholder="Auto: article title | AS Brokers"
                      onChange={(e) => patchDraft({ subjectLine: e.target.value })}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelClass}>Inbox preview text</label>
                    <input
                      className={inputClass}
                      value={draft.previewText ?? ""}
                      placeholder="Short line shown under the subject in inboxes"
                      onChange={(e) => patchDraft({ previewText: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-[#2a2a2a] pt-5">
                <h2 className="text-lg font-semibold text-white">Article of the Week</h2>
                <div className="mt-4 space-y-4">
                  <ContentPicker
                    label="Select insight / article"
                    hint="Choosing an article fills title and link. You can still edit the intro."
                    items={catalog.articles}
                    valueHref={draft.articleOfTheWeek.articleHref}
                    valueLabel={draft.articleOfTheWeek.title}
                    onSelect={(item) => {
                      if (!item) {
                        patchArticle({ title: "", articleHref: "" });
                        return;
                      }
                      patchArticle({
                        title: item.label,
                        articleHref: item.href,
                        intro: draft.articleOfTheWeek.intro || item.description || "",
                      });
                    }}
                  />
                  <div>
                    <label className={labelClass}>Title</label>
                    <input
                      className={inputClass}
                      value={draft.articleOfTheWeek.title}
                      onChange={(e) => patchArticle({ title: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Introduction</label>
                    <textarea
                      rows={3}
                      className={inputClass}
                      value={draft.articleOfTheWeek.intro}
                      onChange={(e) => patchArticle({ intro: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Why it matters</label>
                    <textarea
                      rows={2}
                      className={inputClass}
                      value={draft.articleOfTheWeek.whyItMatters}
                      onChange={(e) => patchArticle({ whyItMatters: e.target.value })}
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <ContentPicker
                      label="Related calculator"
                      items={catalog.calculators}
                      valueHref={draft.articleOfTheWeek.relatedCalculator?.href ?? ""}
                      valueLabel={draft.articleOfTheWeek.relatedCalculator?.label}
                      onSelect={(item) =>
                        patchArticle({
                          relatedCalculator: item
                            ? { label: item.label, href: item.href }
                            : undefined,
                        })
                      }
                    />
                    <ContentPicker
                      label="Related course"
                      items={catalog.courses}
                      valueHref={draft.articleOfTheWeek.relatedCourse?.href ?? ""}
                      valueLabel={draft.articleOfTheWeek.relatedCourse?.label}
                      onSelect={(item) =>
                        patchArticle({
                          relatedCourse: item
                            ? { label: item.label, href: item.href }
                            : undefined,
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-[#2a2a2a] pt-5">
                <h2 className="text-lg font-semibold text-white">104-Week Challenge</h2>
                <div className="mt-4 space-y-4">
                  <ContentPicker
                    label="Challenge page"
                    items={[...catalog.pages, ...catalog.articles]}
                    valueHref={draft.watchChallenge.challengeHref}
                    onSelect={(item) =>
                      patchDraft({
                        watchChallenge: {
                          ...draft.watchChallenge,
                          challengeHref: item?.href || "/financial-freedom-community",
                        },
                      })
                    }
                  />
                  <ContentPicker
                    label="Latest update (optional)"
                    items={catalog.articles}
                    valueHref={draft.watchChallenge.latestUpdateHref ?? ""}
                    onSelect={(item) =>
                      patchDraft({
                        watchChallenge: {
                          ...draft.watchChallenge,
                          latestUpdateHref: item?.href,
                        },
                      })
                    }
                  />
                  <ContentPicker
                    label="Vitality information"
                    items={catalog.pages}
                    valueHref={draft.watchChallenge.vitalityHref}
                    onSelect={(item) =>
                      patchDraft({
                        watchChallenge: {
                          ...draft.watchChallenge,
                          vitalityHref: item?.href || "/contact?topic=vitality",
                        },
                      })
                    }
                  />
                </div>
              </div>

              <div className="border-t border-[#2a2a2a] pt-5">
                <h2 className="text-lg font-semibold text-white">Courses in this edition</h2>
                <p className="mt-1 text-xs text-zinc-500">
                  Select published Clarity Track courses to feature.
                </p>
                <div className="mt-3 space-y-2">
                  {draft.courses.availableCourses.map((course, idx) => (
                    <div
                      key={`${course.href}-${idx}`}
                      className="flex items-center justify-between rounded-md border border-[#2a2a2a] bg-black/40 px-3 py-2"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm text-white">{course.title}</p>
                        <p className="truncate text-[11px] text-zinc-500">{course.href}</p>
                      </div>
                      <button
                        type="button"
                        className="text-xs text-red-400"
                        onClick={() =>
                          patchDraft({
                            courses: {
                              availableCourses: draft.courses.availableCourses.filter(
                                (_, i) => i !== idx
                              ),
                            },
                          })
                        }
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
                <div className="mt-3">
                  <ContentPicker
                    label="Add course"
                    items={catalog.courses}
                    valueHref=""
                    allowClear={false}
                    emptyLabel="Pick a course to add…"
                    onSelect={(item) => {
                      if (!item) return;
                      if (draft.courses.availableCourses.some((c) => c.href === item.href)) return;
                      patchDraft({
                        courses: {
                          availableCourses: [
                            ...draft.courses.availableCourses,
                            {
                              title: item.label,
                              description: item.description || "",
                              href: item.href,
                            },
                          ],
                        },
                      });
                    }}
                  />
                </div>
              </div>
            </div>
          ) : null}

          {panel === "sections" ? (
            <div className="space-y-5">
              <div>
                <h2 className="text-lg font-semibold text-white">Evergreen section links</h2>
                <p className="mt-1 text-xs text-zinc-500">
                  Only update sections that need a fresh link this week. Structure carries over from last edition.
                </p>
              </div>
              {evergreenSections.map((section) => {
                const block = draft.sectionContent.find((s) => s.sectionId === section.id);
                return (
                  <div key={section.id} className="border-t border-[#2a2a2a] pt-4">
                    <h3 className="font-medium text-white">{section.title}</h3>
                    {block?.content?.length ? (
                      <ul className="mt-2 space-y-2">
                        {block.content.map((item, idx) => (
                          <li
                            key={`${item.href}-${idx}`}
                            className="flex items-center justify-between rounded-md border border-[#2a2a2a] bg-black/40 px-3 py-2 text-sm"
                          >
                            <span className="text-zinc-300">
                              {item.label}{" "}
                              <span className="text-zinc-600">({item.type})</span>
                            </span>
                            <button
                              type="button"
                              className="text-xs text-red-400"
                              onClick={() => removeSectionItem(section.id, idx)}
                            >
                              Remove
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    <SectionAddRow
                      catalog={catalog}
                      onAdd={(item) => addSectionItem(section.id, item)}
                    />
                  </div>
                );
              })}
            </div>
          ) : null}

          {panel === "schedule" ? (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-white">Review &amp; send</h2>
                <p className="mt-1 text-xs text-zinc-500">
                  <strong className="text-zinc-300">Publish</strong> only updates the website archive.
                  <strong className="text-zinc-300"> Send</strong> emails subscribers via Resend.
                </p>
              </div>

              <div className="rounded-lg border border-[#2a2a2a] bg-black/40 p-4 space-y-3">
                <h3 className="text-sm font-medium text-white">Pre-flight checklist</h3>
                <ul className="space-y-1 text-xs text-zinc-400">
                  <li>✓ Article title: {draft.articleOfTheWeek.title ? "set" : "missing"}</li>
                  <li>✓ Article link: {draft.articleOfTheWeek.articleHref ? "set" : "missing"}</li>
                  <li>✓ FAIS footer included in email template (FSP 17273)</li>
                  <li>✓ Educational framing — no guaranteed returns</li>
                </ul>
              </div>

              <div className="rounded-lg border border-[#2a2a2a] bg-black/40 p-4 space-y-3">
                <h3 className="text-sm font-medium text-white">Website publish</h3>
                <p className="text-xs text-zinc-500">
                  Makes `/newsletter/{draft.date}` public. Does not email anyone.
                </p>
                {draft.status === "published" || draft.status === "sent" ? (
                  <form action={unpublishEditionAction}>
                    <input type="hidden" name="editionId" value={draft.id} />
                    <button
                      type="submit"
                      className="rounded-md border border-amber-500/30 bg-amber-950/40 px-4 py-2 text-sm text-amber-200"
                    >
                      Unpublish from website
                    </button>
                  </form>
                ) : (
                  <form action={publishEditionAction}>
                    <input type="hidden" name="editionId" value={draft.id} />
                    <button
                      type="submit"
                      className="rounded-md bg-[#3ecf8e] px-4 py-2 text-sm font-medium text-black"
                    >
                      Publish to website
                    </button>
                  </form>
                )}
              </div>

              <div className="rounded-lg border border-[#2a2a2a] bg-black/40 p-4 space-y-3">
                <h3 className="text-sm font-medium text-white">Schedule (SAST)</h3>
                <p className="text-xs text-zinc-500">
                  Defaults to next Monday 07:00. Scheduling stores the send time; a worker can pick it up, or send now below.
                </p>
                <input
                  type="datetime-local"
                  className={inputClass}
                  value={scheduleLocal}
                  onChange={(e) => setScheduleLocal(e.target.value)}
                />
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    className="rounded-md bg-sky-500/20 px-4 py-2 text-sm text-sky-200"
                    onClick={() => {
                      startTransition(async () => {
                        const iso = new Date(scheduleLocal).toISOString();
                        const result = await scheduleEditionAction(draft.id, iso);
                        setMessage(result.ok ? "Scheduled." : result.error);
                        if (result.ok) {
                          setDraft((prev) => ({
                            ...prev,
                            status: "scheduled",
                            scheduledAt: iso,
                          }));
                          router.refresh();
                        }
                      });
                    }}
                  >
                    Schedule send
                  </button>
                  {draft.status === "scheduled" ? (
                    <button
                      type="button"
                      className="rounded-md border border-[#2a2a2a] px-4 py-2 text-sm text-zinc-300"
                      onClick={() => {
                        startTransition(async () => {
                          const result = await cancelScheduleAction(draft.id);
                          setMessage(result.ok ? "Schedule cancelled." : result.error);
                          if (result.ok) {
                            setDraft((prev) => ({
                              ...prev,
                              status: "draft",
                              scheduledAt: undefined,
                            }));
                            router.refresh();
                          }
                        });
                      }}
                    >
                      Cancel schedule
                    </button>
                  ) : null}
                </div>
              </div>

              <div className="rounded-lg border border-[#2a2a2a] bg-black/40 p-4 space-y-3">
                <h3 className="text-sm font-medium text-white">Test send</h3>
                {!resendConfigured ? (
                  <p className="text-xs text-amber-300">
                    RESEND_API_KEY is not configured in this environment — test send will fail until it is set.
                  </p>
                ) : null}
                <input
                  type="email"
                  className={inputClass}
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                  placeholder="you@example.com"
                />
                <button
                  type="button"
                  className="rounded-md bg-[#3ecf8e] px-4 py-2 text-sm font-medium text-black"
                  onClick={() => {
                    startTransition(async () => {
                      const result = await sendNewsletterTestAction(draft.id, testEmail);
                      setMessage(
                        result.ok
                          ? `Test email sent to ${testEmail}${result.id ? ` (${result.id})` : ""}`
                          : result.error
                      );
                      router.refresh();
                    });
                  }}
                >
                  Send test email
                </button>
                {draft.lastTestSentAt ? (
                  <p className="text-[11px] text-zinc-500">
                    Last test: {draft.lastTestSentTo} ·{" "}
                    {new Date(draft.lastTestSentAt).toLocaleString("en-ZA")}
                  </p>
                ) : null}
              </div>

              <div className="rounded-lg border border-red-500/20 bg-red-950/20 p-4 space-y-3">
                <h3 className="text-sm font-medium text-red-300">Send to subscribers now</h3>
                <p className="text-xs text-zinc-400">
                  Emails CRM newsletter subscribers via Resend and publishes the web edition.
                  Confirm carefully — this is not a draft preview.
                </p>
                <button
                  type="button"
                  className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white"
                  onClick={() => {
                    if (
                      !confirm(
                        "Send this newsletter to all newsletter subscribers now? This also publishes the web edition."
                      )
                    ) {
                      return;
                    }
                    startTransition(async () => {
                      const result = await sendNewsletterNowAction(draft.id);
                      setMessage(
                        result.ok
                          ? `Sent to ${result.sent} subscriber(s)${result.failed ? `, ${result.failed} failed` : ""}`
                          : result.error
                      );
                      if (result.ok) {
                        setDraft((prev) => ({ ...prev, status: "sent" }));
                        router.refresh();
                      }
                    });
                  }}
                >
                  Confirm send to subscribers
                </button>
              </div>

              <div className="border-t border-[#2a2a2a] pt-4">
                <form action={deleteEditionAction}>
                  <input type="hidden" name="editionId" value={draft.id} />
                  <button
                    type="submit"
                    className="rounded-md border border-red-500/30 bg-red-950/40 px-4 py-2 text-sm text-red-300"
                    onClick={(e) => {
                      if (!confirm("Delete this edition permanently?")) e.preventDefault();
                    }}
                  >
                    Delete edition
                  </button>
                </form>
              </div>
            </div>
          ) : null}
        </div>

        {/* Live preview pane */}
        <div className="xl:sticky xl:top-4 xl:h-[calc(100vh-6rem)]">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
              Live preview
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setPreviewMode("web")}
                className={`rounded px-2 py-1 text-xs ${
                  previewMode === "web" ? "bg-white/10 text-white" : "text-zinc-500"
                }`}
              >
                Web
              </button>
              <button
                type="button"
                onClick={() => setPreviewMode("email")}
                className={`rounded px-2 py-1 text-xs ${
                  previewMode === "email" ? "bg-white/10 text-white" : "text-zinc-500"
                }`}
              >
                Email
              </button>
              <button
                type="button"
                onClick={() => setDevice("desktop")}
                className={`rounded px-2 py-1 text-xs ${
                  device === "desktop" ? "bg-white/10 text-white" : "text-zinc-500"
                }`}
              >
                Desktop
              </button>
              <button
                type="button"
                onClick={() => setDevice("mobile")}
                className={`rounded px-2 py-1 text-xs ${
                  device === "mobile" ? "bg-white/10 text-white" : "text-zinc-500"
                }`}
              >
                Mobile
              </button>
            </div>
          </div>
          <div className="h-[70vh] xl:h-[calc(100%-2rem)]">
            <NewsletterLivePreview
              edition={resolvedPreview}
              mode={previewMode}
              device={device}
              baseUrl={baseUrl}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionAddRow({
  catalog,
  onAdd,
}: {
  catalog: Catalog;
  onAdd: (item: { type: ContentType; label: string; href: string }) => void;
}) {
  const [type, setType] = useState<ContentType>("article");
  const items =
    type === "calculator"
      ? catalog.calculators
      : type === "course"
        ? catalog.courses
        : type === "article"
          ? catalog.articles
          : [...catalog.articles, ...catalog.pages];

  return (
    <div className="mt-3 grid gap-2 sm:grid-cols-[140px_1fr]">
      <select
        value={type}
        onChange={(e) => setType(e.target.value as ContentType)}
        className="rounded-md border border-[#2a2a2a] bg-black px-2 py-2 text-xs text-white"
      >
        {CONTENT_TYPES.map((ct) => (
          <option key={ct.value} value={ct.value}>
            {ct.label}
          </option>
        ))}
      </select>
      <ContentPicker
        label=""
        items={items}
        valueHref=""
        allowClear={false}
        emptyLabel={`Select ${type}…`}
        onSelect={(item) => {
          if (!item) return;
          onAdd({ type, label: item.label, href: item.href });
        }}
      />
    </div>
  );
}
