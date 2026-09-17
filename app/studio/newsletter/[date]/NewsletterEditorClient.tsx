"use client";

import { useState } from "react";

import type { ResolvedNewsletterEdition, EvergreenSection, ContentType, NewsletterSection } from "@/lib/newsletter/types";
import {
  updateArticleOfTheWeekAction,
  updateWatchChallengeAction,
  publishEditionAction,
  unpublishEditionAction,
  deleteEditionAction,
  addSectionContentAction,
  removeSectionContentAction,
} from "../actions";

interface NewsletterEditorClientProps {
  edition: ResolvedNewsletterEdition;
  evergreenSections: EvergreenSection[];
}

const CONTENT_TYPES: { value: ContentType; label: string }[] = [
  { value: "article", label: "Article" },
  { value: "video", label: "Video" },
  { value: "course", label: "Course" },
  { value: "calculator", label: "Calculator" },
  { value: "webinar", label: "Webinar" },
  { value: "checklist", label: "Checklist" },
];

export function NewsletterEditorClient({
  edition,
  evergreenSections,
}: NewsletterEditorClientProps) {
  const [activeTab, setActiveTab] = useState<"article" | "challenge" | "sections" | "publish">(
    "article"
  );

  const inputClass =
    "w-full rounded-md border border-[#2a2a2a] bg-black px-3 py-2 text-sm text-white placeholder:text-zinc-600";
  const labelClass = "block text-xs font-medium text-zinc-400 mb-1";

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex gap-2 border-b border-[#2a2a2a] pb-2">
        {[
          { id: "article", label: "Article of the Week" },
          { id: "challenge", label: "104-Week Challenge" },
          { id: "sections", label: "Section Content" },
          { id: "publish", label: "Publish" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-[#3ecf8e]/20 text-[#3ecf8e]"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Article of the Week Tab */}
      {activeTab === "article" && (
        <form action={updateArticleOfTheWeekAction} className="space-y-6">
          <input type="hidden" name="editionId" value={edition.id} />

          <div className="rounded-xl border border-[#2a2a2a] bg-[#0a0a0a] p-5">
            <h2 className="mb-4 text-lg font-semibold text-white">Article of the Week</h2>
            <p className="mb-4 text-xs text-zinc-500">
              This is the main weekly content. One substantial article each week.
            </p>

            <div className="space-y-4">
              <div>
                <label className={labelClass}>Article Title</label>
                <input
                  name="title"
                  defaultValue={edition.articleOfTheWeek.title}
                  placeholder="Understanding Your Retirement Gap"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Introduction (2-4 sentences)</label>
                <textarea
                  name="intro"
                  defaultValue={edition.articleOfTheWeek.intro}
                  rows={3}
                  placeholder="A short introduction explaining the subject..."
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Why It Matters</label>
                <textarea
                  name="whyItMatters"
                  defaultValue={edition.articleOfTheWeek.whyItMatters}
                  rows={2}
                  placeholder="One short practical explanation..."
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Article Link</label>
                <input
                  name="articleHref"
                  defaultValue={edition.articleOfTheWeek.articleHref}
                  placeholder="/insights/retirement-gap-method"
                  className={inputClass}
                />
              </div>

              <div className="border-t border-[#2a2a2a] pt-4">
                <p className="mb-3 text-xs font-medium text-zinc-400">
                  Related Content (optional)
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className={labelClass}>Calculator Label</label>
                    <input
                      name="relatedCalculatorLabel"
                      defaultValue={edition.articleOfTheWeek.relatedCalculator?.label}
                      placeholder="Retirement Gap Calculator"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Calculator Link</label>
                    <input
                      name="relatedCalculatorHref"
                      defaultValue={edition.articleOfTheWeek.relatedCalculator?.href}
                      placeholder="/retirement-gap-method"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Video Label</label>
                    <input
                      name="relatedVideoLabel"
                      defaultValue={edition.articleOfTheWeek.relatedVideo?.label}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Video Link</label>
                    <input
                      name="relatedVideoHref"
                      defaultValue={edition.articleOfTheWeek.relatedVideo?.href}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Course Label</label>
                    <input
                      name="relatedCourseLabel"
                      defaultValue={edition.articleOfTheWeek.relatedCourse?.label}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Course Link</label>
                    <input
                      name="relatedCourseHref"
                      defaultValue={edition.articleOfTheWeek.relatedCourse?.href}
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="mt-6 rounded-md bg-[#3ecf8e] px-4 py-2 text-sm font-medium text-black"
            >
              Save Article of the Week
            </button>
          </div>
        </form>
      )}

      {/* 104-Week Challenge Tab */}
      {activeTab === "challenge" && (
        <form action={updateWatchChallengeAction} className="space-y-6">
          <input type="hidden" name="editionId" value={edition.id} />

          <div className="rounded-xl border border-[#2a2a2a] bg-[#0a0a0a] p-5">
            <h2 className="mb-4 text-lg font-semibold text-white">104-Week Watch Challenge</h2>
            <p className="mb-4 text-xs text-zinc-500">
              The wellness/community initiative that appears prominently in every newsletter.
            </p>

            <div className="space-y-4">
              <div>
                <label className={labelClass}>Challenge Page Link</label>
                <input
                  name="challengeHref"
                  defaultValue={edition.watchChallenge.challengeHref}
                  placeholder="/financial-freedom-community"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Latest Update Link (optional)</label>
                <input
                  name="latestUpdateHref"
                  defaultValue={edition.watchChallenge.latestUpdateHref}
                  placeholder="/insights/104-week-update"
                  className={inputClass}
                />
                <p className="mt-1 text-xs text-zinc-600">
                  Link to this week&apos;s challenge update article (if any)
                </p>
              </div>

              <div>
                <label className={labelClass}>Vitality Information Link</label>
                <input
                  name="vitalityHref"
                  defaultValue={edition.watchChallenge.vitalityHref}
                  placeholder="/contact?topic=vitality"
                  className={inputClass}
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-6 rounded-md bg-[#3ecf8e] px-4 py-2 text-sm font-medium text-black"
            >
              Save Challenge Settings
            </button>
          </div>
        </form>
      )}

      {/* Section Content Tab */}
      {activeTab === "sections" && (
        <div className="space-y-6">
          <div className="rounded-xl border border-[#2a2a2a] bg-[#0a0a0a] p-5">
            <h2 className="mb-4 text-lg font-semibold text-white">Section Content</h2>
            <p className="mb-4 text-xs text-zinc-500">
              Add optional content links to individual sections. If no content is added, only the
              evergreen text and CTA will appear.
            </p>

            <div className="space-y-6">
              {evergreenSections.map((section) => {
                const sectionContent = edition.sectionContent.find(
                  (s) => s.sectionId === section.id
                );

                return (
                  <div key={section.id} className="border-t border-[#2a2a2a] pt-4 first:border-0 first:pt-0">
                    <h3 className="font-medium text-white">{section.title}</h3>

                    {/* Existing content */}
                    {sectionContent && sectionContent.content.length > 0 && (
                      <ul className="mt-2 space-y-2">
                        {sectionContent.content.map((item, idx) => (
                          <li
                            key={idx}
                            className="flex items-center justify-between rounded-md border border-[#2a2a2a] bg-black/50 px-3 py-2 text-sm"
                          >
                            <span className="text-zinc-300">
                              {item.label}{" "}
                              <span className="text-zinc-600">({item.type})</span>
                            </span>
                            <form action={removeSectionContentAction}>
                              <input type="hidden" name="editionId" value={edition.id} />
                              <input type="hidden" name="sectionId" value={section.id} />
                              <input type="hidden" name="contentIndex" value={idx} />
                              <input
                                type="hidden"
                                name="existingContent"
                                value={JSON.stringify(edition.sectionContent)}
                              />
                              <button
                                type="submit"
                                className="text-xs text-red-400 hover:text-red-300"
                              >
                                Remove
                              </button>
                            </form>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Add content form */}
                    <form action={addSectionContentAction} className="mt-3">
                      <input type="hidden" name="editionId" value={edition.id} />
                      <input type="hidden" name="sectionId" value={section.id} />
                      <input
                        type="hidden"
                        name="existingContent"
                        value={JSON.stringify(edition.sectionContent)}
                      />
                      <div className="flex flex-wrap gap-2">
                        <select
                          name="type"
                          className="rounded-md border border-[#2a2a2a] bg-black px-2 py-1 text-xs text-white"
                        >
                          {CONTENT_TYPES.map((ct) => (
                            <option key={ct.value} value={ct.value}>
                              {ct.label}
                            </option>
                          ))}
                        </select>
                        <input
                          name="label"
                          placeholder="Label"
                          className="flex-1 rounded-md border border-[#2a2a2a] bg-black px-2 py-1 text-xs text-white placeholder:text-zinc-600"
                        />
                        <input
                          name="href"
                          placeholder="/link"
                          className="w-32 rounded-md border border-[#2a2a2a] bg-black px-2 py-1 text-xs text-white placeholder:text-zinc-600"
                        />
                        <button
                          type="submit"
                          className="rounded-md bg-zinc-700 px-3 py-1 text-xs font-medium text-white hover:bg-zinc-600"
                        >
                          Add
                        </button>
                      </div>
                    </form>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Publish Tab */}
      {activeTab === "publish" && (
        <div className="space-y-6">
          <div className="rounded-xl border border-[#2a2a2a] bg-[#0a0a0a] p-5">
            <h2 className="mb-4 text-lg font-semibold text-white">Publish Settings</h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border border-[#2a2a2a] bg-black/50 p-4">
                <div>
                  <p className="font-medium text-white">Status</p>
                  <p className="text-sm text-zinc-500">
                    {edition.status === "published"
                      ? `Published on ${new Date(edition.publishedAt!).toLocaleDateString()}`
                      : "Not yet published"}
                  </p>
                </div>
                {edition.status === "draft" ? (
                  <form action={publishEditionAction}>
                    <input type="hidden" name="editionId" value={edition.id} />
                    <button
                      type="submit"
                      className="rounded-md bg-[#3ecf8e] px-4 py-2 text-sm font-medium text-black"
                    >
                      Publish Newsletter
                    </button>
                  </form>
                ) : (
                  <form action={unpublishEditionAction}>
                    <input type="hidden" name="editionId" value={edition.id} />
                    <button
                      type="submit"
                      className="rounded-md border border-amber-500/30 bg-amber-950/40 px-4 py-2 text-sm font-medium text-amber-200"
                    >
                      Unpublish
                    </button>
                  </form>
                )}
              </div>

              <div className="border-t border-[#2a2a2a] pt-4">
                <h3 className="mb-2 text-sm font-medium text-red-400">Danger Zone</h3>
                <form action={deleteEditionAction}>
                  <input type="hidden" name="editionId" value={edition.id} />
                  <button
                    type="submit"
                    className="rounded-md border border-red-500/30 bg-red-950/40 px-4 py-2 text-sm font-medium text-red-300 hover:bg-red-950/60"
                    onClick={(e) => {
                      if (!confirm("Are you sure you want to delete this edition?")) {
                        e.preventDefault();
                      }
                    }}
                  >
                    Delete Edition
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
