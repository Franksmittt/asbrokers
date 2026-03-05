import Link from "next/link";
import { Footer } from "@/components/Footer";

const categories = [
  {
    id: "retirement",
    title: "Retirement & Investment Planning",
    items: [
      { name: "Retirement Income Planning", desc: "Fixed-income solutions for retirees who want certainty.", href: "/everest-wealth" },
      { name: "Retirement Reality Calculator", desc: "How much capital you really need for retirement.", href: "/retirement" },
      { name: "Income in Retirement (Life of Capital)", desc: "How long your savings will last with withdrawals and inflation.", href: "/income-in-retirement" },
      { name: "Everest Wealth Products", desc: "Fixed-return investments: 12.8%, 14.2%, 14.5%, Amethyst living annuity.", href: "/everest-wealth" },
      { name: "Financial Education & Calculators", desc: "Tools and structure, not just product sales.", href: "/calculators" },
    ],
  },
  {
    id: "insurance",
    title: "Insurance & Risk Planning",
    items: [
      { name: "Short-Term Personal", desc: "Home, car, valuables and personal asset protection.", href: "/solutions/personal-insurance" },
      { name: "Short-Term Business", desc: "Commercial property, liability, business interruption and fleet.", href: "/solutions/business-insurance" },
      { name: "Life Insurance (Personal)", desc: "Death cover, disability, income protection and severe illness.", href: "/solutions/life-insurance" },
      { name: "Life Insurance (Business)", desc: "Buy-and-sell, key person, loan account and employee benefits.", href: "/solutions/business-life" },
      { name: "Premium Increase Calculator", desc: "Compare long-term cost of escalating life premiums.", href: "/premium-increase-calculator" },
    ],
  },
  {
    id: "medical",
    title: "Medical & Wellness",
    items: [
      { name: "Medical Aid & Gap Cover", desc: "Health insurance and gap cover structuring.", href: "/contact" },
      { name: "Wellness & Integration", desc: "Holistic health and wellness planning for high-income earners.", href: "/contact" },
    ],
  },
  {
    id: "estate",
    title: "Estate & Business Structuring",
    items: [
      { name: "Estate Planning & Wills", desc: "Wills, testaments and estate structuring.", href: "/contact" },
      { name: "Trust & Business Structure", desc: "Asset protection and tax-efficient structuring.", href: "/contact" },
      { name: "Estate Duty Calculator", desc: "Estimate estate duty and executor fees at death.", href: "/estate-duty-calculator" },
      { name: "Annual Estate Reduction Strategy", desc: "Use annual donations to reduce estate duty over time.", href: "/annual-estate-reduction-strategy" },
    ],
  },
];

export default function SolutionsPage() {
  return (
    <div className="bg-[#0a0a0c] min-h-screen">
      <section className="pt-28 pb-20 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">Solutions</h1>
          <p className="text-zinc-400 text-sm leading-relaxed">
            For individuals and business owners. Independent advice, built around you. Retirement, insurance, medical, estate and business structuring.
          </p>
        </div>
      </section>
      <section className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 pb-32">
        <div className="space-y-px">
          {categories.map((cat) => (
            <div key={cat.id} id={cat.id} className="bg-[#151518] border border-white/5 py-10 px-6 sm:px-8 scroll-mt-28">
              <h2 className="text-2xl font-bold text-white mb-8">{cat.title}</h2>
              <ul className="space-y-6">
                {cat.items.map((item) => (
                  <li key={item.name} className="border-b border-white/[0.04] pb-6 last:border-0 last:pb-0">
                    <Link href={item.href} className="group block">
                      <h3 className="font-medium text-white text-sm group-hover:text-blue-400 transition-colors">{item.name}</h3>
                      <p className="text-zinc-500 text-sm mt-1">{item.desc}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/calculators"
            className="inline-block bg-white/5 hover:bg-white/10 border border-white/10 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-colors"
          >
            All calculators
          </Link>
          <Link
            href="/contact"
            className="inline-block bg-white text-black hover:bg-zinc-200 px-5 py-2.5 rounded-full text-sm font-semibold transition-colors"
          >
            Book a consultation
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}
