import {
  createEdition,
  getEditionByDate,
  publishEdition,
  updateEdition,
} from "./store";

function mondayOffset(weeksAgo: number): string {
  const today = new Date();
  const monday = new Date(today);
  const day = today.getDay();
  const toMonday = day === 0 ? -6 : 1 - day;
  monday.setDate(today.getDate() + toMonday - weeksAgo * 7);
  return monday.toISOString().slice(0, 10);
}

const MOCKS: Array<{
  weeksAgo: number;
  publish: boolean;
  subjectLine: string;
  previewText: string;
  article: {
    title: string;
    intro: string;
    whyItMatters: string;
    articleHref: string;
    calculator?: { label: string; href: string };
    course?: { label: string; href: string };
  };
}> = [
  {
    weeksAgo: 0,
    publish: true,
    subjectLine: "Understanding Your Retirement Gap | AS Brokers",
    previewText: "Measure the gap between what you have and what you may need.",
    article: {
      title: "Understanding Your Retirement Gap",
      intro:
        "Many South Africans approach retirement with a dangerous gap between what they have saved and what they will actually need. This edition walks through how to measure that gap with clear assumptions.",
      whyItMatters:
        "If you do not measure your retirement gap early, options shrink. Awareness creates choices while you still have time.",
      articleHref: "/insights/retirement-gap-method",
      calculator: {
        label: "Retirement Reality Check",
        href: "/calculators/asset-002-retirement-reality-check",
      },
      course: {
        label: "Retirement vs Financial Freedom",
        href: "/learn/retirement-vs-financial-freedom",
      },
    },
  },
  {
    weeksAgo: 1,
    publish: true,
    subjectLine: "Business insurance: what owners overlook | AS Brokers",
    previewText: "A practical checklist before renewal season.",
    article: {
      title: "Business Insurance: What Owners Overlook",
      intro:
        "Most business owners renew short-term cover on autopilot. This week we highlight the gaps that usually only show up at claim time.",
      whyItMatters:
        "Underinsurance and outdated sums insured can quietly erode protection while premiums feel 'fine'.",
      articleHref: "/insights/business-insurance",
      calculator: {
        label: "Average Clause Calculator",
        href: "/calculators/underinsurance-calculator",
      },
    },
  },
  {
    weeksAgo: 2,
    publish: false,
    subjectLine: "Medical aid vs gap cover — draft",
    previewText: "Draft edition for Studio testing (not public).",
    article: {
      title: "Medical Aid vs Gap Cover: Knowing the Difference",
      intro:
        "Medical aid and gap cover solve different problems. This draft edition is for Studio testing — live preview, pickers, and email send.",
      whyItMatters:
        "Choosing cover without understanding the split often leaves families surprised by hospital shortfalls.",
      articleHref: "/insights/medical-aid",
      calculator: {
        label: "Income Tax Calculator",
        href: "/calculators/asset-006-income-tax",
      },
      course: {
        label: "Retirement vs Financial Freedom",
        href: "/learn/retirement-vs-financial-freedom",
      },
    },
  },
];

export async function seedMockEditions(): Promise<string[]> {
  const created: string[] = [];

  for (const mock of MOCKS) {
    const date = mondayOffset(mock.weeksAgo);
    let edition = await getEditionByDate(date);
    if (!edition) {
      edition = await createEdition(date);
    }

    await updateEdition(edition.id, {
      subjectLine: mock.subjectLine,
      previewText: mock.previewText,
      articleOfTheWeek: {
        title: mock.article.title,
        intro: mock.article.intro,
        whyItMatters: mock.article.whyItMatters,
        articleHref: mock.article.articleHref,
        relatedCalculator: mock.article.calculator,
        relatedCourse: mock.article.course,
      },
      watchChallenge: {
        challengeHref: "/financial-freedom-community",
        vitalityHref: "/contact?topic=vitality",
        latestUpdateHref: mock.article.articleHref,
      },
      sectionContent: [
        {
          sectionId: "retirement-planning",
          content: [
            {
              type: "calculator",
              label: mock.article.calculator?.label || "Retirement Reality Check",
              href:
                mock.article.calculator?.href ||
                "/calculators/asset-002-retirement-reality-check",
            },
          ],
        },
        {
          sectionId: "medical-aid",
          content: [
            {
              type: "article",
              label: "Medical aid overview",
              href: "/insights/medical-aid",
            },
          ],
        },
      ],
    });

    if (mock.publish) {
      await publishEdition(edition.id);
    }

    created.push(date);
  }

  return created;
}
