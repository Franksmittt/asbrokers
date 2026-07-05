export type BlueprintOption = {
  id: string;
  title: string;
  description: string;
  relevant: boolean;
};

export function getBlueprintOptions(freedomRatePercent: number, gap: number): BlueprintOption[] {
  const highGap = gap > 0;
  const ambitiousRate = freedomRatePercent > 15;
  const moderateRate = freedomRatePercent > 8 && freedomRatePercent <= 15;

  return [
    {
      id: "retire-later",
      title: "Retire later",
      description: "More years to save and compound can reduce the progress rate required.",
      relevant: ambitiousRate || highGap,
    },
    {
      id: "save-more",
      title: "Save more each month",
      description: "Increasing monthly contributions is often the most direct way to close the gap.",
      relevant: highGap,
    },
    {
      id: "reduce-lifestyle",
      title: "Adjust lifestyle expectations",
      description: "A lower target monthly income reduces the capital required at financial freedom.",
      relevant: ambitiousRate,
    },
    {
      id: "growth-strategy",
      title: "Review investment growth strategy",
      description: "Structure and risk profile affect long-term progress. This is a planning conversation, not a product promise.",
      relevant: moderateRate || ambitiousRate,
    },
    {
      id: "second-income",
      title: "Create a second income stream",
      description: "Additional income can accelerate savings without relying only on investment returns.",
      relevant: highGap,
    },
    {
      id: "business",
      title: "Start or grow a business",
      description: "An owned asset or venture can change both income today and capital tomorrow.",
      relevant: highGap,
    },
    {
      id: "online-income",
      title: "Build an online income channel",
      description: "Digital products, services, or content can supplement employment income over time.",
      relevant: highGap,
    },
    {
      id: "affiliate",
      title: "Explore affiliate or partnership income",
      description: "Aligned referrals can create incremental cash flow when done compliantly.",
      relevant: highGap,
    },
    {
      id: "learn",
      title: "Learn from experts",
      description: "Structured guidance can help you prioritise which levers matter most for your situation.",
      relevant: true,
    },
    {
      id: "combine",
      title: "Combine multiple strategies",
      description: "Most people close a meaningful gap through several changes, not one silver bullet.",
      relevant: true,
    },
  ];
}
