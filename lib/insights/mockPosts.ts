import type { InsightCategoryValue } from "@/lib/insights/insightCategories";

export type MockInsightPost = {
  id: string;
  title: string;
  slug: string;
  locale: string;
  publishedAt: string;
  excerpt: string;
  author: string;
  thumbnailUrl: string;
  galleryImages: Array<{ src: string; alt: string }>;
  categories: InsightCategoryValue[];
  metaTitle: string;
  metaDescription: string;
  bodyHtml: string;
};

export const MOCK_INSIGHT_POSTS: MockInsightPost[] = [
  {
    id: "mock-business-insurance-risk-review",
    title: "Business Insurance Risk Review: Five Questions Every Owner Should Ask",
    slug: "business-insurance-risk-review",
    locale: "en",
    publishedAt: "2026-06-04T08:00:00.000Z",
    excerpt:
      "A practical mockup article showing how AS Brokers can turn short-term business insurance into a boardroom-ready risk review with checklists, examples, and clear next steps.",
    author: "AS Brokers",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1400&q=80",
    galleryImages: [
      {
        src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80",
        alt: "Business owner reviewing insurance documents in a boardroom",
      },
      {
        src: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=80",
        alt: "Business team discussing risk management",
      },
      {
        src: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=900&q=80",
        alt: "Insurance paperwork and financial notes",
      },
      {
        src: "https://images.unsplash.com/photo-1560264280-88b68371db39?auto=format&fit=crop&w=900&q=80",
        alt: "Commercial vehicle and logistics planning",
      },
      {
        src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80",
        alt: "Operations team reviewing business continuity",
      },
      {
        src: "https://images.unsplash.com/photo-1556155092-490a1ba16284?auto=format&fit=crop&w=900&q=80",
        alt: "Business analytics dashboard for risk review",
      },
    ],
    categories: ["short_term_business", "life_insurance_business"],
    metaTitle: "Business Insurance Risk Review | AS Brokers Mockup Insight",
    metaDescription:
      "A mockup AS Brokers blog post for business owners reviewing commercial insurance, interruption cover, liability, fleet, cyber, and key-person risk.",
    bodyHtml: `
<p class="lead">Business insurance is often treated as a grudge purchase until a claim turns it into one of the most important decisions a company has ever made. This mockup article shows how AS Brokers could educate owners, finance teams, and operations managers with clear guidance that feels practical rather than generic.</p>

<h2>1. Has your insured value kept pace with the business?</h2>
<p>Stock levels, machinery, laptops, solar installations, specialist tools, office improvements, and imported equipment can all change faster than the policy schedule. A business may start with sensible sums insured and become underinsured after one busy year of growth. When values are too low, average can apply at claim stage, which means the insurer may settle only a portion of the loss.</p>
<p>A useful annual review starts with a current asset list, replacement values rather than book values, and any changes to premises or security. For multi-site businesses, the review should also check whether stock is stored temporarily at third-party locations, in vehicles, or at client sites.</p>

<h2>2. Would business interruption cover protect cash flow?</h2>
<p>Fire, flood, theft, supplier failure, and extended power disruption can stop trading even when the physical asset claim is handled well. Business interruption cover is designed to help with lost gross profit and ongoing expenses while the company recovers. The challenge is that the indemnity period and declared figures must match the reality of the business.</p>
<p>A restaurant, manufacturer, workshop, or professional practice may need very different recovery windows. Replacement equipment lead times, municipal approvals, lease negotiations, and staff retention all influence how long the business could realistically need support.</p>

<div class="not-prose my-8 grid gap-4 md:grid-cols-3">
  <div class="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
    <p class="text-xs font-bold uppercase tracking-[0.18em] text-teal-300">Check</p>
    <p class="mt-2 text-sm text-zinc-300">Is the indemnity period long enough for imported equipment or specialist fit-outs?</p>
  </div>
  <div class="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
    <p class="text-xs font-bold uppercase tracking-[0.18em] text-teal-300">Check</p>
    <p class="mt-2 text-sm text-zinc-300">Are gross profit, wages, rent, and utilities declared using fresh figures?</p>
  </div>
  <div class="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
    <p class="text-xs font-bold uppercase tracking-[0.18em] text-teal-300">Check</p>
    <p class="mt-2 text-sm text-zinc-300">Does the policy respond when access to the premises is restricted?</p>
  </div>
</div>

<h2>3. Are liability exposures still realistic?</h2>
<p>Public liability, products liability, employers liability, professional indemnity, and directors and officers cover are not interchangeable. A company that sells physical goods has a different exposure from a consultant, an installer, a logistics operator, or a medical supplier. Contracts may also require specific limits before work can begin.</p>
<p>Owners should review new customers, new territories, subcontractor use, warranties, and tender requirements. A small change in operations can create a large shift in liability risk.</p>

<h2>4. Are vehicles, drivers, and route risks properly declared?</h2>
<p>Fleet schedules are easy to let drift. Vehicles are sold, replaced, used by different drivers, or moved between branches. If the company now delivers after hours, transports higher-value goods, or regularly crosses provincial borders, the risk profile can change.</p>
<p>A good broker review should include driver licensing, tracking, overnight parking, use of employee-owned vehicles, excess structures, and whether goods in transit cover is aligned to the highest load value.</p>

<h2>5. What happens if a key person cannot work?</h2>
<p>Short-term insurance protects assets and operations, but many businesses also rely on one or two people whose absence would affect revenue, bank covenants, supplier confidence, or succession plans. Key-person and buy-and-sell planning can sit alongside commercial insurance to protect continuity.</p>
<p>This is where a connected advice process matters. A business risk review should not stop at the asset schedule. It should ask how the company survives if the owner, sales lead, technical founder, or guarantor is disabled or passes away.</p>

<h2>What a review with AS Brokers could include</h2>
<ul>
  <li>A line-by-line policy schedule review against current assets and operations.</li>
  <li>A plain-English gap summary for underinsurance, exclusions, and outdated values.</li>
  <li>Business interruption assumptions and indemnity period review.</li>
  <li>Liability and contract requirement checks.</li>
  <li>Fleet, cyber, goods in transit, and key-person risk prompts.</li>
</ul>

<div class="not-prose my-10 rounded-[2rem] bg-gradient-to-br from-teal-400/15 via-white/5 to-blue-500/10 p-6 ring-1 ring-white/10 md:p-8">
  <p class="text-xs font-bold uppercase tracking-[0.2em] text-teal-200">Mockup call to action</p>
  <h3 class="mt-3 text-2xl font-bold text-white">Turn your policy schedule into a decision-ready risk map.</h3>
  <p class="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-300">This is an example of how a blog can educate the client, qualify the service need, and invite a business owner to request a structured review.</p>
  <a href="/contact" class="mt-5 inline-flex rounded-full bg-white px-5 py-3 text-sm font-bold text-black no-underline">Request a business risk review</a>
</div>

<h2>FAQ</h2>
<h3>How often should a business review insurance?</h3>
<p>At least annually, and whenever the company changes premises, expands stock, buys major equipment, adds delivery routes, hires key staff, or signs a contract with new insurance requirements.</p>
<h3>Can a cheaper premium create problems?</h3>
<p>Sometimes. Premium is only useful when the cover, limits, excesses, and exclusions still match the risk. The aim is not simply to pay less, but to pay for cover that works when the business needs it.</p>
`,
  },
  {
    id: "mock-medical-aid-gap-cover-guide",
    title: "Medical Aid and Gap Cover: How Families Can Avoid Surprise Shortfalls",
    slug: "medical-aid-gap-cover-family-guide",
    locale: "en",
    publishedAt: "2026-06-03T08:00:00.000Z",
    excerpt:
      "A client-friendly mockup guide explaining medical aid plan reviews, gap cover, day-to-day benefits, and the questions families should ask before renewal season.",
    author: "AS Brokers",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1400&q=80",
    galleryImages: [
      {
        src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80",
        alt: "Family healthcare planning with a medical professional",
      },
      {
        src: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=900&q=80",
        alt: "Doctor checking a child's health",
      },
      {
        src: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=900&q=80",
        alt: "Healthcare provider discussing treatment options",
      },
      {
        src: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=900&q=80",
        alt: "Medical aid forms and healthcare notes",
      },
      {
        src: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=900&q=80",
        alt: "Healthcare specialist preparing for a consultation",
      },
      {
        src: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=900&q=80",
        alt: "Hospital corridor representing medical care access",
      },
    ],
    categories: ["medical_aid", "health_wellness"],
    metaTitle: "Medical Aid and Gap Cover Family Guide | AS Brokers Mockup Insight",
    metaDescription:
      "A mockup AS Brokers article showing how families can understand medical aid benefits, gap cover, network rules, and annual plan reviews.",
    bodyHtml: `
<p class="lead">Medical aid decisions are emotional because they sit between the household budget and the family&apos;s health. This mockup post shows how AS Brokers can use blog content to simplify renewal decisions and make clients feel guided before they need to claim.</p>

<h2>Start with how your family actually uses healthcare</h2>
<p>A plan that worked three years ago may no longer fit. Children grow, chronic medication changes, elective procedures become more likely, and day-to-day usage can increase. Before comparing premiums, families should list their actual healthcare pattern: GP visits, specialists, chronic medication, dentistry, optometry, mental health support, scans, hospital events, and preferred providers.</p>
<p>This turns the conversation from &quot;Which plan is cheapest?&quot; into &quot;Which structure best supports the way our family receives care?&quot;</p>

<h2>Understand the difference between hospital cover and day-to-day benefits</h2>
<p>Many households assume a higher premium always means richer day-to-day cover. In practice, plans can differ widely. Some offer medical savings accounts, some use above-threshold benefits, some focus on network providers, and others are built mainly around hospital events.</p>
<p>The right choice depends on the balance between predictable everyday expenses and the need for protection against large hospital or specialist bills.</p>

<div class="not-prose my-8 overflow-hidden rounded-[2rem] ring-1 ring-white/10">
  <div class="grid bg-white/5 text-sm md:grid-cols-4">
    <div class="border-b border-white/10 p-4 font-bold text-white md:border-b-0 md:border-r">Decision area</div>
    <div class="border-b border-white/10 p-4 font-bold text-white md:border-b-0 md:border-r">What to ask</div>
    <div class="border-b border-white/10 p-4 font-bold text-white md:border-b-0 md:border-r">Why it matters</div>
    <div class="p-4 font-bold text-white">Broker prompt</div>
  </div>
  <div class="grid text-sm text-zinc-300 md:grid-cols-4">
    <div class="border-t border-white/10 p-4 font-semibold text-white md:border-r">Networks</div>
    <div class="border-t border-white/10 p-4 md:border-r">Must we use specific hospitals, GPs, pharmacies, or specialists?</div>
    <div class="border-t border-white/10 p-4 md:border-r">Out-of-network care can create avoidable co-payments.</div>
    <div class="border-t border-white/10 p-4">Check preferred providers against the family&apos;s real locations.</div>
  </div>
  <div class="grid bg-white/[0.03] text-sm text-zinc-300 md:grid-cols-4">
    <div class="border-t border-white/10 p-4 font-semibold text-white md:border-r">Chronic care</div>
    <div class="border-t border-white/10 p-4 md:border-r">Are current medicines covered on formulary?</div>
    <div class="border-t border-white/10 p-4 md:border-r">Medication changes can alter annual affordability.</div>
    <div class="border-t border-white/10 p-4">Review chronic registrations before plan changes.</div>
  </div>
  <div class="grid text-sm text-zinc-300 md:grid-cols-4">
    <div class="border-t border-white/10 p-4 font-semibold text-white md:border-r">Specialists</div>
    <div class="border-t border-white/10 p-4 md:border-r">How are in-hospital specialist rates reimbursed?</div>
    <div class="border-t border-white/10 p-4 md:border-r">This is where many shortfalls arise.</div>
    <div class="border-t border-white/10 p-4">Compare the plan rate with gap cover options.</div>
  </div>
</div>

<h2>Where gap cover can help</h2>
<p>Gap cover is designed to help with certain shortfalls when medical specialists charge more than the medical aid tariff for covered in-hospital procedures. It may also include benefits for co-payments, scans, oncology shortfalls, casualty events, or sub-limits, depending on the product.</p>
<p>It is not a replacement for medical aid, and it has its own rules, waiting periods, exclusions, limits, and claim requirements. The value is in matching the gap cover to the medical aid plan and the family&apos;s risk profile.</p>

<h2>Renewal season should not be rushed</h2>
<p>Plan changes are often announced with limited decision windows. A good review compares the current plan, expected premium increases, benefits used during the year, upcoming family needs, and alternative options. It also checks whether changing plans could create waiting periods or restrictions.</p>
<p>Families should keep invoices, hospital authorisation records, specialist estimates, and gap cover claim outcomes. This history helps make the next review factual rather than guesswork.</p>

<h2>Documents to bring to a review</h2>
<ul>
  <li>Current medical aid plan and contribution schedule.</li>
  <li>Gap cover policy schedule, if already in place.</li>
  <li>Recent specialist quotes, hospital accounts, and co-payment notices.</li>
  <li>Chronic medication list and preferred pharmacies.</li>
  <li>Known upcoming procedures, orthodontics, maternity, or specialist care needs.</li>
</ul>

<div class="not-prose my-10 rounded-[2rem] bg-white/5 p-6 ring-1 ring-white/10 md:p-8">
  <p class="text-xs font-bold uppercase tracking-[0.2em] text-teal-300">Mockup service journey</p>
  <h3 class="mt-3 text-2xl font-bold text-white">From blog reader to guided review</h3>
  <p class="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-300">A post like this can guide families into a medical aid review, capture renewal questions, and help the adviser prepare before the first consultation.</p>
  <a href="/solutions/medical-aid" class="mt-5 inline-flex rounded-full bg-white px-5 py-3 text-sm font-bold text-black no-underline">Explore medical aid guidance</a>
</div>
`,
  },
  {
    id: "mock-everest-income-walkthrough",
    title: "Everest Wealth 12.8% Income: A Plain-English Walkthrough",
    slug: "everest-wealth-128-income-walkthrough",
    locale: "en",
    publishedAt: "2026-06-02T08:00:00.000Z",
    excerpt:
      "A mockup product explainer for clients who want to understand the Everest 12.8% targeted-income profile, minimum investment, notice period, and liquidity trade-offs.",
    author: "AS Brokers",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1400&q=80",
    galleryImages: [
      {
        src: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=900&q=80",
        alt: "Client and adviser reviewing investment income options",
      },
      {
        src: "https://images.unsplash.com/photo-1559526324-593bc073d938?auto=format&fit=crop&w=900&q=80",
        alt: "Investment planning dashboard with charts",
      },
      {
        src: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=900&q=80",
        alt: "Financial documents and calculator for income planning",
      },
      {
        src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80",
        alt: "Portfolio performance chart on a laptop",
      },
      {
        src: "https://images.unsplash.com/photo-1554224155-1696413565d3?auto=format&fit=crop&w=900&q=80",
        alt: "Advisor writing notes during an investment consultation",
      },
      {
        src: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?auto=format&fit=crop&w=900&q=80",
        alt: "Client signing investment planning documents",
      },
    ],
    categories: ["investments", "financial_freedom"],
    metaTitle: "Everest Wealth 12.8% Income Walkthrough | AS Brokers Mockup Insight",
    metaDescription:
      "A mockup AS Brokers product explainer for Everest Wealth 12.8% targeted income, including R100k minimum and liquidity considerations.",
    bodyHtml: `
<p class="lead">Some clients want growth. Others want a clearer income profile. This mockup article demonstrates how AS Brokers can explain a voluntary investment product in a way that is transparent, compliant, and easy for a client to discuss with an adviser.</p>

<div class="not-prose my-8 rounded-[2rem] border border-amber-300/30 bg-amber-300/10 p-5 text-sm leading-relaxed text-amber-100">
  <strong>Important mockup disclosure:</strong> Everest Wealth products are voluntary investments with a R100k minimum. Targeted returns are not guarantees. Liquidity may be limited, notice periods and penalties can apply, and clients should review suitability, risk, tax, and cash-flow needs with an adviser before investing.
</div>

<h2>What does a targeted 12.8% income profile mean?</h2>
<p>The 12.8% profile is communicated as a targeted annual income yield, not as a guaranteed bank deposit return. The practical question for a client is whether the product&apos;s structure, term, liquidity, risk profile, and income objective fit their wider plan.</p>
<p>That is why an adviser-led conversation matters. The product should be assessed alongside emergency cash, retirement income, tax position, dependants, debt, estate planning, and other investments.</p>

<h2>Who might consider this type of solution?</h2>
<p>A targeted-income product may appeal to clients who have discretionary capital, understand that higher targeted returns come with trade-offs, and want a planned income stream or portfolio diversifier. It may be unsuitable for clients who need immediate access to funds, cannot tolerate capital risk, or have not first built an emergency reserve.</p>

<div class="not-prose my-8 grid gap-4 md:grid-cols-2">
  <div class="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
    <h3 class="text-lg font-bold text-white">Potential fit</h3>
    <ul class="mt-3 space-y-2 text-sm text-zinc-300">
      <li>Discretionary capital above the R100k minimum.</li>
      <li>Client can plan around notice periods.</li>
      <li>Income objective is clear and documented.</li>
      <li>Product forms part of a diversified portfolio.</li>
    </ul>
  </div>
  <div class="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
    <h3 class="text-lg font-bold text-white">Needs caution</h3>
    <ul class="mt-3 space-y-2 text-sm text-zinc-300">
      <li>Client may need quick access to the money.</li>
      <li>Emergency savings are insufficient.</li>
      <li>Income is required to meet essential monthly expenses.</li>
      <li>Risk, fees, and product terms are not understood.</li>
    </ul>
  </div>
</div>

<h2>Liquidity: the point clients must not miss</h2>
<p>Liquidity is the ability to access money when needed. Voluntary products with notice periods can be useful when they match a plan, but they can create stress when capital is needed unexpectedly. Clients should ask what notice period applies, whether early withdrawals are possible, what penalties or costs may apply, and whether partial withdrawals are permitted.</p>
<p>A sensible structure may keep short-term reserves in accessible cash while using longer-term capital for products with less liquidity. The right balance depends on the household, business, and retirement context.</p>

<h2>Questions to ask before investing</h2>
<ol>
  <li>What role will this product play in my overall plan?</li>
  <li>Can I meet the R100k minimum without weakening emergency reserves?</li>
  <li>What notice period, exit penalty, or liquidity restriction applies?</li>
  <li>What are the main risks and what could affect the target return?</li>
  <li>How will income be taxed and documented?</li>
  <li>How does this compare with my existing retirement, investment, and estate planning strategy?</li>
</ol>

<h2>How a blog can support the advice process</h2>
<p>An article like this does not replace advice. It prepares the client for a better advice meeting. The client arrives with sharper questions, a clearer idea of the product purpose, and a better understanding of why suitability matters.</p>

<div class="not-prose my-10 rounded-[2rem] bg-gradient-to-br from-blue-500/15 via-white/5 to-teal-400/10 p-6 ring-1 ring-white/10 md:p-8">
  <p class="text-xs font-bold uppercase tracking-[0.2em] text-teal-200">Mockup call to action</p>
  <h3 class="mt-3 text-2xl font-bold text-white">Want to test whether a targeted-income product fits your plan?</h3>
  <p class="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-300">AS Brokers can help compare income goals, liquidity needs, retirement planning, and product suitability before any decision is made.</p>
  <a href="/everest-128-product" class="mt-5 inline-flex rounded-full bg-white px-5 py-3 text-sm font-bold text-black no-underline">View the Everest 12.8% product</a>
</div>
`,
  },
];

export function getMockInsightPostBySlug(slug: string, locale = "en"): MockInsightPost | null {
  return MOCK_INSIGHT_POSTS.find((post) => post.slug === slug && post.locale === locale) ?? null;
}
