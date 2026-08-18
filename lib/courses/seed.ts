import { nowIso } from "./ids";
import type { CourseRecord, CourseStudent, LessonBlock } from "./types";

const SAMPLE_NOTE =
  "Sample layout only. Replace this copy, video and question in Course Studio. The platform does not lock you into this course or this lesson count.";

function heading(id: string, order: number, text: string, level: 2 | 3 = 2): LessonBlock {
  return { id, type: "heading", sortOrder: order, level, text };
}

function text(id: string, order: number, body: string): LessonBlock {
  return { id, type: "text", sortOrder: order, body };
}

function video(id: string, order: number): LessonBlock {
  return {
    id,
    type: "video",
    sortOrder: order,
    url: "",
    caption: "Paste a YouTube or Vimeo URL in Course Studio.",
  };
}

function calculator(id: string, order: number, calculatorId: string): LessonBlock {
  return { id, type: "calculator", sortOrder: order, calculatorId };
}

function callout(id: string, order: number, title: string, body: string): LessonBlock {
  return { id, type: "callout", sortOrder: order, variant: "key", title, body };
}

const STAMP = "2026-08-18T12:00:00.000Z";

/**
 * First-course *structure* only. Titles follow Albert's example so the
 * player can be demonstrated. Educational copy is placeholder, not the real course.
 */
export function createSeedCourse(): CourseRecord {
  const courseId = "crs_retirement_vs_freedom";

  return {
    id: courseId,
    title: "The Difference Between Retirement and Financial Freedom",
    slug: "retirement-vs-financial-freedom",
    introduction:
      "A free educational course about the difference between stopping work and being financially free.\n\n" +
      "This introduction is a placeholder. In Course Studio you can explain who the course is for, the problem it addresses, and what the student will learn.\n\n" +
      SAMPLE_NOTE,
    featuredImageUrl: "/images/retirement-planning-hero-16x9.webp",
    status: "published",
    sortOrder: 0,
    registrationRequired: true,
    sequentialLocking: true,
    createdAt: STAMP,
    updatedAt: STAMP,
    lessons: [
      {
        id: "lsn_01_retirement_vs_freedom",
        courseId,
        title: "Retirement versus financial freedom",
        slug: "retirement-versus-financial-freedom",
        sortOrder: 0,
        status: "published",
        isFinal: false,
        responseRequired: true,
        responsePrompt:
          "In your own words, what is the difference between retirement and financial freedom?",
        offer: null,
        createdAt: STAMP,
        updatedAt: STAMP,
        blocks: [
          heading("blk_1a", 0, "Lesson 1 — Retirement versus financial freedom"),
          text(
            "blk_1b",
            1,
            "Use this text block for the lesson teaching.\n\nYou can write headings, paragraphs, **bold text**, bullet points, numbered lists, and [links](/retirement-planning).\n\n" +
              SAMPLE_NOTE
          ),
          video("blk_1c", 2),
          calculator("blk_1d", 3, "asset-017-personal-goal"),
          callout(
            "blk_1e",
            4,
            "Important point",
            "Callouts are for warnings, key lessons, examples, or explanations you want to stand out."
          ),
        ],
      },
      {
        id: "lsn_02_amount_to_invest",
        courseId,
        title: "Understanding the amount you need to invest",
        slug: "amount-you-need-to-invest",
        sortOrder: 1,
        status: "published",
        isFinal: false,
        responseRequired: true,
        responsePrompt: "What did the premium calculator show you about the amount you may need to invest?",
        offer: null,
        createdAt: STAMP,
        updatedAt: STAMP,
        blocks: [
          heading("blk_2a", 0, "Lesson 2 — Understanding the amount you need to invest"),
          text("blk_2b", 1, "Write the teaching for this lesson here.\n\n" + SAMPLE_NOTE),
          video("blk_2c", 2),
          calculator("blk_2d", 3, "asset-003-retirement-premium"),
        ],
      },
      {
        id: "lsn_03_capital_duration",
        courseId,
        title: "Understanding how long retirement capital may last",
        slug: "how-long-capital-may-last",
        sortOrder: 2,
        status: "published",
        isFinal: false,
        responseRequired: true,
        responsePrompt: "What did you notice about how long capital may last at your chosen withdrawal rate?",
        offer: null,
        createdAt: STAMP,
        updatedAt: STAMP,
        blocks: [
          heading("blk_3a", 0, "Lesson 3 — How long retirement capital may last"),
          text("blk_3b", 1, "Write the teaching for this lesson here.\n\n" + SAMPLE_NOTE),
          video("blk_3c", 2),
          calculator("blk_3d", 3, "asset-004-life-of-capital"),
        ],
      },
      {
        id: "lsn_04_growth_and_return",
        courseId,
        title: "Understanding investment growth and required return",
        slug: "investment-growth-and-required-return",
        sortOrder: 3,
        status: "published",
        isFinal: false,
        responseRequired: true,
        responsePrompt: "What growth rate would you need, and what does that tell you?",
        offer: null,
        createdAt: STAMP,
        updatedAt: STAMP,
        blocks: [
          heading("blk_4a", 0, "Lesson 4 — Investment growth and required return"),
          text("blk_4b", 1, "Write the teaching for this lesson here.\n\n" + SAMPLE_NOTE),
          video("blk_4c", 2),
          calculator("blk_4d", 3, "asset-016-growth-comparison"),
        ],
      },
      {
        id: "lsn_05_if_numbers_do_not_work",
        courseId,
        title: "What can you do if your numbers do not work?",
        slug: "if-your-numbers-do-not-work",
        sortOrder: 4,
        status: "published",
        isFinal: true,
        responseRequired: true,
        responsePrompt: "If your numbers do not work, what would you want help with next?",
        offer: {
          heading: "Ready to take the next step?",
          body: "If your numbers do not work and you would like help building a financial-freedom plan, you can continue here. Change this offer in Course Studio — it is not hard-coded.",
          buttonText: "View the Financial Freedom Solution",
          buttonUrl: "/financial-freedom-community",
          openInNewTab: false,
        },
        createdAt: STAMP,
        updatedAt: STAMP,
        blocks: [
          heading("blk_5a", 0, "Lesson 5 — What can you do if your numbers do not work?"),
          text(
            "blk_5b",
            1,
            "The final lesson can include teaching, a video, a calculator, links, and then the required response.\n\nAfter the student submits (if required), the course is marked complete and the offer section appears.\n\n" +
              SAMPLE_NOTE
          ),
          video("blk_5c", 2),
          callout(
            "blk_5d",
            3,
            "Final lesson",
            "Mark exactly one lesson as the final lesson. The offer heading, text, button and destination are all editable per course."
          ),
        ],
      },
    ],
  };
}

export function createSeedStudent(): CourseStudent {
  return {
    id: "stu_sample_preview",
    firstName: "Sample",
    surname: "Student",
    email: "sample.student@example.com",
    phone: null,
    marketingConsent: false,
    privacyConsent: true,
    createdAt: nowIso(),
  };
}
