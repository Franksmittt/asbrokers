import type {
  CourseEnrollment,
  CourseEvent,
  CourseLesson,
  CourseRecord,
  CourseStudent,
  LessonBlock,
  LessonProgress,
  LessonResponse,
} from "./types";

const STAMP = "2026-08-18T12:00:00.000Z";
const COURSE_ID = "crs_retirement_vs_freedom";
const DRAFT_ID = "crs_living_annuity_draft";

const DISCLAIMER =
  "This lesson is educational only. It is not personal financial advice and does not recommend a product. Your own numbers, tax, fees and product rules must be confirmed with a licensed adviser.";

function heading(id: string, order: number, text: string, level: 2 | 3 = 2): LessonBlock {
  return { id, type: "heading", sortOrder: order, level, text };
}

function text(id: string, order: number, body: string): LessonBlock {
  return { id, type: "text", sortOrder: order, body };
}

function video(id: string, order: number, caption: string, posterUrl: string): LessonBlock {
  return { id, type: "video", sortOrder: order, url: "", caption, posterUrl };
}

function calculator(id: string, order: number, calculatorId: string): LessonBlock {
  return { id, type: "calculator", sortOrder: order, calculatorId };
}

function callout(
  id: string,
  order: number,
  title: string,
  body: string,
  variant: "info" | "key" | "warning" | "example" = "key"
): LessonBlock {
  return { id, type: "callout", sortOrder: order, variant, title, body };
}

function image(id: string, order: number, url: string, alt: string, caption?: string): LessonBlock {
  return { id, type: "image", sortOrder: order, url, alt, caption };
}

function cta(
  id: string,
  order: number,
  headingText: string,
  body: string,
  buttonText: string,
  buttonUrl: string
): LessonBlock {
  return {
    id,
    type: "cta",
    sortOrder: order,
    heading: headingText,
    body,
    buttonText,
    buttonUrl,
    openInNewTab: false,
  };
}

function lesson(
  partial: Omit<CourseLesson, "courseId" | "createdAt" | "updatedAt" | "offer"> & {
    courseId?: string;
    offer?: CourseLesson["offer"];
  }
): CourseLesson {
  return {
    courseId: COURSE_ID,
    createdAt: STAMP,
    updatedAt: STAMP,
    ...partial,
    offer: partial.offer ?? null,
  };
}

export function createPublishedDemoCourse(): CourseRecord {
  return {
    id: COURSE_ID,
    title: "The Difference Between Retirement and Financial Freedom",
    slug: "retirement-vs-financial-freedom",
    introduction:
      "Most people plan to **stop working**. Far fewer plan to be **free**.\n\n" +
      "This free course is for people who want to understand, in numbers, the difference between a retirement date and a life where income can cover expenses without depending on a salary.\n\n" +
      "You will work through five short lessons. Each one has teaching, a calculator from the AS Brokers toolkit, and a private question so you can capture what the numbers showed you.\n\n" +
      "Who it is for:\n\n" +
      "- Business owners and professionals approaching retirement\n" +
      "- Anyone who has a lump sum, pension or living annuity and is not sure it is enough\n" +
      "- People who want education before a product conversation\n\n" +
      "What you will do:\n\n" +
      "1. Separate retirement from financial freedom\n" +
      "2. Estimate how much you may need to invest\n" +
      "3. See how long capital may last\n" +
      "4. Understand the growth rate your plan is asking for\n" +
      "5. Decide what to do if the numbers do not work\n\n" +
      DISCLAIMER,
    featuredImageUrl: "/images/retirement-planning-hero-16x9.webp",
    status: "published",
    sortOrder: 0,
    registrationRequired: true,
    sequentialLocking: true,
    createdAt: STAMP,
    updatedAt: STAMP,
    lessons: [
      lesson({
        id: "lsn_01_retirement_vs_freedom",
        title: "Retirement versus financial freedom",
        slug: "retirement-versus-financial-freedom",
        sortOrder: 0,
        status: "published",
        isFinal: false,
        responseRequired: true,
        responsePrompt:
          "In your own words, what is the difference between retirement and financial freedom — and which one are you actually planning for?",
        blocks: [
          heading("blk_1a", 0, "Lesson 1 — Retirement versus financial freedom"),
          text(
            "blk_1b",
            1,
            "Retirement is a date. It is the day you leave a job, sell a business, or stop drawing a salary.\n\n" +
              "Financial freedom is a **condition**. It is the point where your capital can reasonably produce the income your life needs, so you are not dependent on that salary.\n\n" +
              "Those two things are often treated as the same. They are not.\n\n" +
              "A person can retire and still be financially trapped: the income is too small, the capital is shrinking, or every year depends on hoping markets and inflation behave. Another person can still be working and already be free, because the capital plan works without the next paycheck.\n\n" +
              "This course starts there on purpose. If you skip this distinction, the calculators in the next lessons become a hunt for a product instead of a way to read your own numbers."
          ),
          video(
            "blk_1c",
            2,
            "Lesson 1 video — Retirement is a date. Freedom is a condition.",
            "/images/home-card-retirement.webp"
          ),
          heading("blk_1d", 3, "Set the target before you choose a product", 3),
          text(
            "blk_1e",
            4,
            "Use the Goal Engineering Planner below as a thinking tool, not a quote.\n\n" +
              "- What income would make the year work?\n" +
              "- What would that life actually cost in today's rands?\n" +
              "- How many years do you want that income to last?\n\n" +
              "Write the picture down. The later lessons test whether the capital you have, or can still add, can support that picture."
          ),
          calculator("blk_1f", 5, "asset-017-personal-goal"),
          callout(
            "blk_1g",
            6,
            "Key lesson",
            "If you cannot describe the life you want in income terms, you cannot tell whether a retirement date is freedom or just unemployment with savings."
          ),
          cta(
            "blk_1h",
            7,
            "Want the wider retirement picture?",
            "The public retirement planning page sits alongside this course if you want the broader AS Brokers view before you continue.",
            "Read retirement planning",
            "/retirement-planning"
          ),
        ],
      }),
      lesson({
        id: "lsn_02_amount_to_invest",
        title: "Understanding the amount you need to invest",
        slug: "amount-you-need-to-invest",
        sortOrder: 1,
        status: "published",
        isFinal: false,
        responseRequired: true,
        responsePrompt:
          "What monthly or lump-sum amount did the premium calculator suggest, and did that number feel possible in your current life?",
        blocks: [
          heading("blk_2a", 0, "Lesson 2 — Understanding the amount you need to invest"),
          video(
            "blk_2b",
            1,
            "Lesson 2 video — How much might you need to put away?",
            "/images/calculators-hub-16x9.webp"
          ),
          text(
            "blk_2c",
            2,
            "Once you have a target income in mind, the next question is not “which product?”. It is **how much capital, or how much contribution, that income implies**.\n\n" +
              "Most people start with what they can spare this month. That is understandable. It is also why so many plans only look affordable until inflation, tax and longevity are put on the page.\n\n" +
              "Work the other way for a moment:\n\n" +
              "1. Start with the income you sketched in Lesson 1\n" +
              "2. Ask what capital that income would require\n" +
              "3. Then ask what you would need to invest, from today, to have a chance of getting there"
          ),
          image(
            "blk_2d",
            3,
            "/images/home-card-investments.webp",
            "Planning the amount to invest toward a retirement income target",
            "The contribution is a means. The income target is the point."
          ),
          text(
            "blk_2e",
            4,
            "The Retirement Premium Calculator below is an illustration. Change the inputs. Watch how sensitive the required amount is to time, return assumptions and the income you want.\n\n" +
              "If the contribution looks impossible, that is useful information. It is not a reason to close the page. It is the reason Lesson 5 exists."
          ),
          calculator("blk_2f", 5, "asset-003-retirement-premium"),
          callout(
            "blk_2g",
            6,
            "Example",
            "Two people with the same salary can need very different contributions. The one who wants R80,000 a month at 75, with a longer horizon and a partner, is not solving the same problem as the one who wants a modest top-up to a pension.",
            "example"
          ),
        ],
      }),
      lesson({
        id: "lsn_03_capital_duration",
        title: "Understanding how long retirement capital may last",
        slug: "how-long-capital-may-last",
        sortOrder: 2,
        status: "published",
        isFinal: false,
        responseRequired: true,
        responsePrompt:
          "At the withdrawal rate you tried, roughly how long did the Life of Capital calculator say the money may last — and how did that sit with you?",
        blocks: [
          heading("blk_3a", 0, "Lesson 3 — How long retirement capital may last"),
          text(
            "blk_3b",
            1,
            "A lump sum on a statement can look large. The question is how long it remains large once you start living on it.\n\n" +
              "Every year, three things usually happen at the same time:\n\n" +
              "- The capital may earn a return\n" +
              "- You withdraw an income\n" +
              "- Inflation lifts next year’s cost of the same life\n\n" +
              "If withdrawals plus inflation outrun the return, the capital shrinks. If they do not, it may hold or grow. Neither outcome is guaranteed. The calculator lets you **see the shape** of that story under the assumptions you type in."
          ),
          callout(
            "blk_3c",
            2,
            "Warning",
            "A withdrawal rate that feels comfortable in year one can still exhaust capital later. Living-annuity drawdown in South Africa is also bounded by product rules (commonly illustrated between 2.5% and 17.5%). High drawdowns need extra care.",
            "warning"
          ),
          calculator("blk_3d", 3, "asset-004-life-of-capital"),
          video(
            "blk_3e",
            4,
            "Lesson 3 video — Capital that looks enough can still run out.",
            "/images/retirement-planning-hero-16x9.webp"
          ),
          text(
            "blk_3f",
            5,
            "When you try the calculator, change one thing at a time: the starting capital, the annual withdrawal, the assumed return, and inflation. Notice which lever moves the run-out year the most.\n\n" +
              DISCLAIMER
          ),
        ],
      }),
      lesson({
        id: "lsn_04_growth_and_return",
        title: "Understanding investment growth and required return",
        slug: "investment-growth-and-required-return",
        sortOrder: 3,
        status: "published",
        isFinal: false,
        responseRequired: true,
        responsePrompt:
          "What growth rate would your plan need in this illustration, and does that rate feel conservative, ambitious, or unrealistic to you?",
        blocks: [
          heading("blk_4a", 0, "Lesson 4 — Investment growth and required return"),
          text(
            "blk_4b",
            1,
            "If the contribution in Lesson 2 looked high, or the capital in Lesson 3 ran out too soon, people often reach for a higher return as the solution.\n\n" +
              "Sometimes growth is part of the answer. Sometimes the required return is a warning: the plan only “works” if markets do something they may not do, after fees, tax and behaviour.\n\n" +
              "This lesson asks a blunt question: **what rate of growth is your plan depending on?**"
          ),
          calculator("blk_4c", 2, "asset-016-growth-comparison"),
          callout(
            "blk_4d",
            3,
            "Important point",
            "A required return is not a promise. If the illustration only closes the gap at a very high rate, the honest next step is to change the goal, the timeline, the contribution — or get help structuring the plan. It is not to assume the high rate will arrive."
          ),
          video(
            "blk_4e",
            4,
            "Lesson 4 video — The return your plan is asking for.",
            "/images/investments-hero-16x9.webp"
          ),
          cta(
            "blk_4f",
            5,
            "Compare more of the toolkit",
            "The public calculator hub has the full AS Brokers set if you want to test a different question before the final lesson.",
            "Open the calculator hub",
            "/calculators"
          ),
        ],
      }),
      lesson({
        id: "lsn_05_if_numbers_do_not_work",
        title: "What can you do if your numbers do not work?",
        slug: "if-your-numbers-do-not-work",
        sortOrder: 4,
        status: "published",
        isFinal: true,
        responseRequired: true,
        responsePrompt:
          "If your numbers do not work yet, what would you want help with first: the income target, the contribution, the drawdown, or a full financial-freedom plan?",
        offer: {
          heading: "Ready to take the next step?",
          body: "If your numbers do not work and you would like help building a financial-freedom plan, you can continue to the Financial Freedom Community™. That programme is separate from this free course. Completing the course does not require you to click the button.",
          buttonText: "View the Financial Freedom Solution",
          buttonUrl: "/financial-freedom-community",
          openInNewTab: false,
        },
        blocks: [
          heading("blk_5a", 0, "Lesson 5 — What can you do if your numbers do not work?"),
          text(
            "blk_5b",
            1,
            "If the first four lessons produced an uncomfortable picture, that is not failure. That is the point of education before advice.\n\n" +
              "When the illustration does not close, people usually have a short list of honest levers:\n\n" +
              "- Work longer, or phase retirement instead of stopping on a date\n" +
              "- Save more, or redirect surplus income while you still have it\n" +
              "- Spend less in retirement than the first draft of the dream\n" +
              "- Review drawdown so capital is not asked to do the impossible\n" +
              "- Restructure — tax, estate, business sale, or the vehicle that holds the capital\n\n" +
              "None of those is a product pitch. They are planning choices. Some you can test yourself. Some need a licensed conversation, because the tax, product rules and family situation are not generic."
          ),
          video(
            "blk_5c",
            2,
            "Lesson 5 video — If the numbers do not work, change the plan, not the arithmetic.",
            "/images/estate-planning-hero-16x9.webp"
          ),
          callout(
            "blk_5d",
            3,
            "Key lesson",
            "Financial freedom is not a brochure. If the calculator says the current path does not fund the life you described, the work is to change the path — not to hunt for a higher promised rate."
          ),
          text(
            "blk_5e",
            4,
            "This is the final lesson of the free course. After you submit your reflection, the course is marked complete whether or not you follow the next-step button.\n\n" +
              "You can return to any lesson later. Your answers stay private against your profile.\n\n" +
              DISCLAIMER
          ),
          cta(
            "blk_5f",
            5,
            "Prefer a conversation first?",
            "If you would rather talk than click through to a programme page, you can reach AS Brokers CC directly.",
            "Contact AS Brokers",
            "/contact?source=course_final"
          ),
        ],
      }),
    ],
  };
}

/** Unpublished second course, so Course Studio shows that the CMS is not limited to one programme. */
export function createDraftDemoCourse(): CourseRecord {
  return {
    id: DRAFT_ID,
    title: "How to Read a Living Annuity Drawdown",
    slug: "living-annuity-drawdown",
    introduction:
      "A short follow-on course Albert can publish later. It is in Draft so it does not appear on /learn yet.\n\n" +
      "Use Course Studio to rename it, add lessons, or delete it. This exists only to show that you are not locked to five lessons or one course.",
    featuredImageUrl: "/images/investments-hero-16x9.webp",
    status: "draft",
    sortOrder: 1,
    registrationRequired: true,
    sequentialLocking: false,
    createdAt: STAMP,
    updatedAt: STAMP,
    lessons: [
      lesson({
        courseId: DRAFT_ID,
        id: "lsn_draft_01",
        title: "What a drawdown percentage actually means",
        slug: "what-drawdown-means",
        sortOrder: 0,
        status: "draft",
        isFinal: false,
        responseRequired: false,
        responsePrompt: "",
        blocks: [
          heading("blk_d1", 0, "What a drawdown percentage actually means"),
          text(
            "blk_d2",
            1,
            "Draft lesson. Add teaching here, then publish the course when you are ready."
          ),
        ],
      }),
      lesson({
        courseId: DRAFT_ID,
        id: "lsn_draft_02",
        title: "Income versus capital preservation",
        slug: "income-versus-capital",
        sortOrder: 1,
        status: "draft",
        isFinal: false,
        responseRequired: true,
        responsePrompt: "What trade-off matters more to you right now: income this year, or capital later?",
        blocks: [
          heading("blk_d3", 0, "Income versus capital preservation"),
          calculator("blk_d4", 1, "asset-014-living-annuity"),
        ],
      }),
      lesson({
        courseId: DRAFT_ID,
        id: "lsn_draft_03",
        title: "When to review the rate",
        slug: "when-to-review",
        sortOrder: 2,
        status: "draft",
        isFinal: true,
        responseRequired: false,
        responsePrompt: "",
        offer: {
          heading: "Book a review",
          body: "A living-annuity review is a conversation, not a page of marketing.",
          buttonText: "Contact the office",
          buttonUrl: "/contact?source=annuity_course",
          openInNewTab: false,
        },
        blocks: [
          heading("blk_d5", 0, "When to review the rate"),
          text("blk_d6", 1, "Final lesson placeholder. Publish when the teaching is ready."),
        ],
      }),
    ],
  };
}

export function createSeedCourses(): CourseRecord[] {
  return [createPublishedDemoCourse(), createDraftDemoCourse()];
}

export function createSeedStudent(): CourseStudent {
  return {
    id: "stu_thabo_mokoena",
    firstName: "Thabo",
    surname: "Mokoena",
    email: "thabo.mokoena@example.com",
    phone: null,
    marketingConsent: true,
    privacyConsent: true,
    createdAt: "2026-08-12T09:14:00.000Z",
  };
}

export function createSecondDemoStudent(): CourseStudent {
  return {
    id: "stu_lerato_naidoo",
    firstName: "Lerato",
    surname: "Naidoo",
    email: "lerato.naidoo@example.com",
    phone: null,
    marketingConsent: false,
    privacyConsent: true,
    createdAt: "2026-08-04T16:40:00.000Z",
  };
}

export function createDemoClassroom(): {
  students: CourseStudent[];
  enrollments: CourseEnrollment[];
  progress: LessonProgress[];
  responses: LessonResponse[];
  events: CourseEvent[];
} {
  const thabo = createSeedStudent();
  const lerato = createSecondDemoStudent();
  const l1 = "lsn_01_retirement_vs_freedom";
  const l2 = "lsn_02_amount_to_invest";
  const l3 = "lsn_03_capital_duration";
  const l4 = "lsn_04_growth_and_return";
  const l5 = "lsn_05_if_numbers_do_not_work";

  const thaboEnroll: CourseEnrollment = {
    id: "enr_thabo",
    studentId: thabo.id,
    courseId: COURSE_ID,
    startedAt: "2026-08-12T09:16:00.000Z",
    completedAt: null,
    currentLessonId: l2,
    offerClickedAt: null,
  };
  const leratoEnroll: CourseEnrollment = {
    id: "enr_lerato",
    studentId: lerato.id,
    courseId: COURSE_ID,
    startedAt: "2026-08-04T16:42:00.000Z",
    completedAt: "2026-08-10T11:05:00.000Z",
    currentLessonId: l5,
    offerClickedAt: "2026-08-10T11:07:00.000Z",
  };

  return {
    students: [thabo, lerato],
    enrollments: [thaboEnroll, leratoEnroll],
    progress: [
      { id: "prg_t1", enrollmentId: thaboEnroll.id, lessonId: l1, openedAt: "2026-08-12T09:16:00.000Z", completedAt: "2026-08-12T09:41:00.000Z" },
      { id: "prg_t2", enrollmentId: thaboEnroll.id, lessonId: l2, openedAt: "2026-08-14T18:02:00.000Z", completedAt: null },
      { id: "prg_l1", enrollmentId: leratoEnroll.id, lessonId: l1, openedAt: "2026-08-04T16:42:00.000Z", completedAt: "2026-08-05T07:10:00.000Z" },
      { id: "prg_l2", enrollmentId: leratoEnroll.id, lessonId: l2, openedAt: "2026-08-06T07:00:00.000Z", completedAt: "2026-08-06T07:28:00.000Z" },
      { id: "prg_l3", enrollmentId: leratoEnroll.id, lessonId: l3, openedAt: "2026-08-07T19:12:00.000Z", completedAt: "2026-08-07T19:40:00.000Z" },
      { id: "prg_l4", enrollmentId: leratoEnroll.id, lessonId: l4, openedAt: "2026-08-09T08:15:00.000Z", completedAt: "2026-08-09T08:44:00.000Z" },
      { id: "prg_l5", enrollmentId: leratoEnroll.id, lessonId: l5, openedAt: "2026-08-10T10:40:00.000Z", completedAt: "2026-08-10T11:05:00.000Z" },
    ],
    responses: [
      {
        id: "rsp_t1",
        enrollmentId: thaboEnroll.id,
        lessonId: l1,
        answer:
          "Retirement is when I stop the business. Financial freedom is when the capital can pay for our life without that business. I think I have been planning the date, not the condition.",
        submittedAt: "2026-08-12T09:41:00.000Z",
      },
      {
        id: "rsp_l1",
        enrollmentId: leratoEnroll.id,
        lessonId: l1,
        answer: "I wanted a retirement date at 63. After this lesson I can see that date is meaningless if the income does not cover the household.",
        submittedAt: "2026-08-05T07:10:00.000Z",
      },
      {
        id: "rsp_l2",
        enrollmentId: leratoEnroll.id,
        lessonId: l2,
        answer: "The premium needed is higher than we are saving. Possible if we redirect the bonus, not from the monthly salary alone.",
        submittedAt: "2026-08-06T07:28:00.000Z",
      },
      {
        id: "rsp_l3",
        enrollmentId: leratoEnroll.id,
        lessonId: l3,
        answer: "At 6% drawdown the capital faded in the illustration much sooner than I expected. I need to look at a lower starting income.",
        submittedAt: "2026-08-07T19:40:00.000Z",
      },
      {
        id: "rsp_l4",
        enrollmentId: leratoEnroll.id,
        lessonId: l4,
        answer: "The growth rate the plan wanted looked ambitious after fees. I would rather change the contribution than assume that return.",
        submittedAt: "2026-08-09T08:44:00.000Z",
      },
      {
        id: "rsp_l5",
        enrollmentId: leratoEnroll.id,
        lessonId: l5,
        answer: "I want help building a financial-freedom plan — especially drawdown and whether we should phase work rather than stop.",
        submittedAt: "2026-08-10T11:05:00.000Z",
      },
    ],
    events: [
      { id: "evt_t_start", studentId: thabo.id, courseId: COURSE_ID, lessonId: l1, enrollmentId: thaboEnroll.id, type: "course_started", createdAt: "2026-08-12T09:16:00.000Z" },
      { id: "evt_t_l1o", studentId: thabo.id, courseId: COURSE_ID, lessonId: l1, enrollmentId: thaboEnroll.id, type: "lesson_opened", createdAt: "2026-08-12T09:16:00.000Z" },
      { id: "evt_t_l1c", studentId: thabo.id, courseId: COURSE_ID, lessonId: l1, enrollmentId: thaboEnroll.id, type: "lesson_completed", createdAt: "2026-08-12T09:41:00.000Z" },
      { id: "evt_l_start", studentId: lerato.id, courseId: COURSE_ID, lessonId: l1, enrollmentId: leratoEnroll.id, type: "course_started", createdAt: "2026-08-04T16:42:00.000Z" },
      { id: "evt_l_c1", studentId: lerato.id, courseId: COURSE_ID, lessonId: l1, enrollmentId: leratoEnroll.id, type: "lesson_completed", createdAt: "2026-08-05T07:10:00.000Z" },
      { id: "evt_l_c2", studentId: lerato.id, courseId: COURSE_ID, lessonId: l2, enrollmentId: leratoEnroll.id, type: "lesson_completed", createdAt: "2026-08-06T07:28:00.000Z" },
      { id: "evt_l_c3", studentId: lerato.id, courseId: COURSE_ID, lessonId: l3, enrollmentId: leratoEnroll.id, type: "lesson_completed", createdAt: "2026-08-07T19:40:00.000Z" },
      { id: "evt_l_c4", studentId: lerato.id, courseId: COURSE_ID, lessonId: l4, enrollmentId: leratoEnroll.id, type: "lesson_completed", createdAt: "2026-08-09T08:44:00.000Z" },
      { id: "evt_l_c5", studentId: lerato.id, courseId: COURSE_ID, lessonId: l5, enrollmentId: leratoEnroll.id, type: "lesson_completed", createdAt: "2026-08-10T11:05:00.000Z" },
      { id: "evt_l_done", studentId: lerato.id, courseId: COURSE_ID, lessonId: l5, enrollmentId: leratoEnroll.id, type: "course_completed", createdAt: "2026-08-10T11:05:00.000Z" },
      { id: "evt_l_offer", studentId: lerato.id, courseId: COURSE_ID, lessonId: l5, enrollmentId: leratoEnroll.id, type: "offer_clicked", createdAt: "2026-08-10T11:07:00.000Z" },
    ],
  };
}
