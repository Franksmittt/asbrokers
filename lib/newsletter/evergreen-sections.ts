/**
 * Evergreen newsletter sections - permanent content that remains consistent each week.
 * Based on Albert's "AS Brokers Weekly Financial Freedom Newsletter" specification.
 */

import type { EvergreenSection } from "./types";

export const EVERGREEN_SECTIONS: EvergreenSection[] = [
  {
    id: "financial-freedom",
    title: "Financial Freedom",
    shortTitle: "Financial Freedom",
    evergreenText:
      "Financial freedom should be the objective of your financial plan. Retirement and financial freedom are not necessarily the same thing. Retirement normally describes a stage of life when you stop working. Financial freedom means reaching the point where your assets, investments, business interests and other income sources can support the life you want without your continued labour being financially compulsory.",
    contactCtaLabel: "Start Your Financial Freedom Journey",
    contactCtaHref: "/contact?topic=financial-freedom",
  },
  {
    id: "retirement-planning",
    title: "Retirement Planning",
    shortTitle: "Retirement Planning",
    evergreenText:
      "Approaching retirement, planning ahead or already retired? Retirement planning does not stop on the day you retire. Your retirement income, investment strategy, withdrawal rate, tax position and estate plan should continue to be reviewed throughout retirement.",
    bulletPoints: [
      "Living annuities",
      "Retirement annuities",
      "Voluntary investments",
      "Retirement income",
      "Withdrawal strategies",
      "Tax considerations",
      "Estate-planning implications",
    ],
    contactCtaLabel: "Request a Retirement Review",
    contactCtaHref: "/contact?topic=retirement",
  },
  {
    id: "investments",
    title: "Investments",
    shortTitle: "Investments",
    evergreenText:
      "Creating wealth is difficult. Keeping it can be even harder. Successful investing requires two disciplines. First, you need to create and accumulate capital. Then you need to protect and grow that capital over many years without allowing poor decisions, unnecessary tax, excessive withdrawals or emotional reactions to destroy what you have built.",
    contactCtaLabel: "Discuss Your Investment Strategy",
    contactCtaHref: "/contact?topic=investments",
  },
  {
    id: "medical-aid",
    title: "Medical Aid",
    shortTitle: "Medical Aid",
    evergreenText:
      "Medical aid protects more than your health. It helps pay for medical treatment when you become sick or injured. But financially, it performs another extremely important function. It helps protect the assets and investments that you have spent years building. A major medical event should not be allowed to destroy your financial plan or your progress towards financial freedom.",
    contactCtaLabel: "Review Your Medical Aid",
    contactCtaHref: "/contact?topic=medical-aid",
  },
  {
    id: "gap-cover",
    title: "Gap Cover",
    shortTitle: "Gap Cover",
    evergreenText:
      "Medical aid does not always pay the entire bill. Doctors and specialists can charge more than the amount your medical scheme pays. Gap cover is designed to help protect members against certain qualifying shortfalls between medical-scheme benefits and actual medical costs, subject to the policy terms and limits.",
    contactCtaLabel: "Learn More About Gap Cover",
    contactCtaHref: "/contact?topic=gap-cover",
  },
  {
    id: "personal-insurance",
    title: "Personal Short-Term Insurance",
    shortTitle: "Personal Insurance",
    evergreenText: "Protect the assets you use every day.",
    bulletPoints: [
      "Your home",
      "Household contents",
      "Motor vehicles",
      "Personal belongings",
      "Specified valuable items",
    ],
    contactCtaLabel: "Request an Insurance Review",
    contactCtaHref: "/contact?topic=personal-insurance",
  },
  {
    id: "business-insurance",
    title: "Business Insurance",
    shortTitle: "Business Insurance",
    evergreenText:
      "A business can survive an insured loss only if the insurance was structured correctly before the loss occurred. For many businesses, the most serious risk is not simply losing an asset. The real risk is whether the business can continue operating after a major loss.",
    bulletPoints: [
      "Fire and property damage",
      "Business interruption",
      "Stock and theft",
      "Vehicles and goods in transit",
      "Public liability",
      "Electronic equipment",
      "Fidelity risks",
      "SASRIA",
    ],
    contactCtaLabel: "Request a Business Insurance Review",
    contactCtaHref: "/solutions/business-insurance",
  },
  {
    id: "life-disability",
    title: "Personal Life & Disability Cover",
    shortTitle: "Life & Disability",
    evergreenText:
      "Protect the income and people behind your financial plan. Your ability to earn an income is often one of your largest financial assets. The purpose of insurance is not simply to own a policy. The purpose is to ensure that your financial plan can continue when something serious happens.",
    bulletPoints: [
      "Death cover",
      "Permanent disability",
      "Temporary disability",
      "Severe illness",
      "Loss of income",
    ],
    contactCtaLabel: "Review Your Personal Risk Cover",
    contactCtaHref: "/contact?topic=life-insurance",
  },
  {
    id: "business-life-insurance",
    title: "Business Life Insurance",
    shortTitle: "Business Life Insurance",
    evergreenText:
      "What happens to the business when an owner, shareholder or key person dies or becomes disabled? For many business owners, the business represents a substantial part of their wealth and retirement plan. The objective is to protect both the business and the families behind the business.",
    bulletPoints: [
      "Buy-and-sell agreements",
      "Key-person insurance",
      "Contingent-liability insurance",
      "Loan protection",
      "Shareholder protection",
      "Estate liquidity",
      "Business succession planning",
    ],
    contactCtaLabel: "Request a Business-Risk Review",
    contactCtaHref: "/contact?topic=business-life",
  },
  {
    id: "estate-planning",
    title: "Estate Planning",
    shortTitle: "Estate Planning",
    evergreenText:
      "Creating wealth is only part of the job. The next challenge is transferring it correctly. Estate planning helps determine what happens to your assets, business interests and financial affairs when you die. The objective is to preserve what you have created and transfer it efficiently to the next generation.",
    bulletPoints: [
      "Last Will and Testament",
      "Beneficiary nominations",
      "Estate liquidity",
      "Life insurance",
      "Executor planning",
      "Tax considerations",
      "Business interests",
      "Trusts",
      "Succession planning",
    ],
    contactCtaLabel: "Review Your Estate Plan",
    contactCtaHref: "/estate-planning",
  },
  {
    id: "trusts-structuring",
    title: "Trust & Business Structuring",
    shortTitle: "Trusts & Structuring",
    evergreenText:
      "How you own assets can be as important as which assets you own. There is no universal structure that is correct for everyone. The correct structure depends on the individual, the business, the family and the long-term objective.",
    bulletPoints: [
      "Income tax implications",
      "Capital gains tax",
      "Estate duty",
      "Creditor exposure",
      "Business succession",
      "Family wealth",
      "Intergenerational planning",
    ],
    contactCtaLabel: "Request a Planning Discussion",
    contactCtaHref: "/contact?topic=trusts",
  },
  {
    id: "discovery-bank",
    title: "Discovery Bank",
    shortTitle: "Discovery Bank",
    evergreenText:
      "AS Brokers is accredited to assist clients with Discovery Bank products. Banking can form part of your broader financial system. If you are considering joining Discovery Bank, comparing with your current bank, or need assistance with a Discovery Bank-related question, AS Brokers can assist.",
    contactCtaLabel: "Contact AS Brokers",
    contactCtaHref: "/contact?topic=discovery-bank",
  },
  {
    id: "vitality-wellness",
    title: "Vitality & Wellness",
    shortTitle: "Vitality & Wellness",
    evergreenText:
      "Financial freedom is of limited value if you do not have the health to enjoy it. Health is therefore part of the AS Brokers financial-freedom philosophy. The longer you live, the longer your retirement capital may need to provide an income. The healthier you remain, the better your chances of enjoying the financial freedom you worked to create.",
    contactCtaLabel: "Vitality Information",
    contactCtaHref: "/contact?topic=vitality",
  },
];

export function getEvergreenSection(id: string): EvergreenSection | undefined {
  return EVERGREEN_SECTIONS.find((s) => s.id === id);
}
