/** Everest voluntary + Amethyst product comparison, semantic table for AEO/RAG (Phase 3.3). */
export function EverestProductComparisonTable({ variant = "dark" }: { variant?: "dark" | "warm" }) {
  const warm = variant === "warm";

  const rows = [
    {
      product: "12.8% Strategic Income",
      moneyType: "Voluntary capital",
      targetedReturn: "12.8% p.a.",
      income: "Monthly dividends",
      bonus: "10% on capital at year 5",
      minimum: "R100,000",
      tax: "20% DWT on dividends",
      term: "5 years",
    },
    {
      product: "14.2% Onyx Income+",
      moneyType: "Voluntary capital",
      targetedReturn: "14.2% p.a.",
      income: "Monthly dividends (max day-one yield)",
      bonus: "None",
      minimum: "R100,000",
      tax: "20% DWT on dividends",
      term: "5 years",
    },
    {
      product: "14.5% Strategic Growth",
      moneyType: "Voluntary capital",
      targetedReturn: "14.5% p.a. compound",
      income: "None during term",
      bonus: "None",
      minimum: "R100,000",
      tax: "20% DWT at maturity",
      term: "5 years",
    },
    {
      product: "Amethyst Living Annuity",
      moneyType: "Pension / preservation / RA",
      targetedReturn: "10.2% p.a. structured net profile",
      income: "Flexible drawdown 2.5%–17.5%",
      bonus: "9% capital bonus at year 5",
      minimum: "Regulation 28 rules apply",
      tax: "Growth tax-free; income taxed at marginal rate",
      term: "Living annuity",
    },
  ];

  return (
    <div
      className="mt-8 overflow-x-auto"
      tabIndex={0}
      role="region"
      aria-label="Everest product comparison table"
    >
      <table className="w-full min-w-[720px] border-collapse text-left text-sm">
        <caption className={`mb-3 text-left text-xs ${warm ? "text-stone-500" : "text-zinc-500"}`}>
          Everest Wealth product comparison, targeted terms, not guaranteed returns
        </caption>
        <thead>
          <tr className={`border-b ${warm ? "border-stone-200 text-stone-600" : "border-white/10 text-zinc-400"}`}>
            <th scope="col" className="py-3 pr-4 font-semibold">
              Product
            </th>
            <th scope="col" className="py-3 px-3 font-semibold">
              Money type
            </th>
            <th scope="col" className="py-3 px-3 font-semibold">
              Targeted return
            </th>
            <th scope="col" className="py-3 px-3 font-semibold">
              Income
            </th>
            <th scope="col" className="py-3 px-3 font-semibold">
              Bonus
            </th>
            <th scope="col" className="py-3 px-3 font-semibold">
              Minimum
            </th>
            <th scope="col" className="py-3 px-3 font-semibold">
              Tax routing
            </th>
            <th scope="col" className="py-3 pl-3 font-semibold">
              Term
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.product}
              className={`border-b align-top ${warm ? "border-stone-100" : "border-white/5"}`}
            >
              <td data-label="Product" className={`py-3 pr-4 font-medium ${warm ? "text-shark" : "text-white"}`}>
                {row.product}
              </td>
              <td data-label="Money type" className={`py-3 px-3 ${warm ? "text-stone-600" : "text-zinc-400"}`}>
                {row.moneyType}
              </td>
              <td data-label="Targeted return" className={`py-3 px-3 ${warm ? "text-stone-700" : "text-zinc-300"}`}>
                {row.targetedReturn}
              </td>
              <td data-label="Income" className={`py-3 px-3 ${warm ? "text-stone-600" : "text-zinc-400"}`}>
                {row.income}
              </td>
              <td data-label="Bonus" className={`py-3 px-3 ${warm ? "text-stone-600" : "text-zinc-400"}`}>
                {row.bonus}
              </td>
              <td data-label="Minimum" className={`py-3 px-3 ${warm ? "text-stone-600" : "text-zinc-400"}`}>
                {row.minimum}
              </td>
              <td data-label="Tax routing" className={`py-3 px-3 ${warm ? "text-stone-600" : "text-zinc-400"}`}>
                {row.tax}
              </td>
              <td data-label="Term" className={`py-3 pl-3 ${warm ? "text-stone-600" : "text-zinc-400"}`}>
                {row.term}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
