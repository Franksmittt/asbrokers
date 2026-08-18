import { newId, nowIso } from "./ids";
import type { BlockType, CourseLesson, LessonBlock } from "./types";

export const BLOCK_LABELS: Record<BlockType, string> = {
  heading: "Heading",
  text: "Text",
  video: "Video",
  calculator: "Calculator",
  image: "Image",
  callout: "Callout",
  cta: "Button / CTA",
};

export function createBlock(type: BlockType, sortOrder: number): LessonBlock {
  const id = newId("blk");
  switch (type) {
    case "heading":
      return { id, type, sortOrder, level: 2, text: "" };
    case "text":
      return { id, type, sortOrder, body: "" };
    case "video":
      return { id, type, sortOrder, url: "", caption: "", posterUrl: "" };
    case "calculator":
      return { id, type, sortOrder, calculatorId: "asset-017-personal-goal" };
    case "image":
      return { id, type, sortOrder, url: "", alt: "", caption: "" };
    case "callout":
      return { id, type, sortOrder, variant: "key", title: "Important point", body: "" };
    case "cta":
      return {
        id,
        type,
        sortOrder,
        heading: "",
        body: "",
        buttonText: "Continue",
        buttonUrl: "/contact",
        openInNewTab: false,
      };
  }
}

export function emptyLesson(courseId: string, title: string, slug: string, sortOrder: number): CourseLesson {
  const stamp = nowIso();
  return {
    id: newId("lsn"),
    courseId,
    title,
    slug,
    sortOrder,
    status: "draft",
    isFinal: false,
    responseRequired: true,
    responsePrompt: "In your own words, what is the most important takeaway from this lesson?",
    offer: null,
    blocks: [
      createBlock("heading", 0),
      createBlock("text", 1),
    ],
    createdAt: stamp,
    updatedAt: stamp,
  };
}

export function sortBlocks(blocks: LessonBlock[]): LessonBlock[] {
  return [...blocks]
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((block, index) => ({ ...block, sortOrder: index }));
}
