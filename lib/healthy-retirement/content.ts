import type { HealthScoreBand } from "@/lib/healthy-retirement/scoring";

export const RETIREE_HEALTH_RISKS = [
  {
    title: "Inactivity",
    body: "Many retirees reduce movement after leaving work. Prolonged inactivity weakens muscles, balance, and cardiovascular fitness — increasing fall risk and loss of independence.",
  },
  {
    title: "Obesity",
    body: "Weight gain in later years places extra strain on joints, blood pressure, and metabolism. It is one of the most preventable drivers of chronic illness in retirement.",
  },
  {
    title: "Diabetes",
    body: "Type 2 diabetes is prevalent among South African adults over 50. Poor diet, inactivity, and undiagnosed pre-diabetes can quietly erode quality of life in retirement.",
  },
  {
    title: "Heart Disease",
    body: "Cardiovascular disease remains a leading cause of serious illness. Blood pressure, cholesterol, smoking, and stress all contribute — and all can be monitored.",
  },
  {
    title: "Loss of Mobility",
    body: "The ability to walk, climb stairs, and carry groceries is the foundation of an active retirement. Mobility lost slowly is often noticed too late.",
  },
] as const;

export const HEALTHY_RETIREMENT_FRAMEWORK = [
  {
    title: "Move More",
    body: "Aim for regular movement most days of the week. Walking, swimming, and light strength work protect your heart, joints, and independence.",
  },
  {
    title: "Sleep Better",
    body: "Consistent sleep supports recovery, mood, and metabolic health. Most adults benefit from 7–8 hours of quality rest.",
  },
  {
    title: "Maintain Strength",
    body: "Muscle mass naturally declines with age. Resistance training — even bodyweight exercises — preserves strength for daily living.",
  },
  {
    title: "Manage Stress",
    body: "Retirement brings change. Chronic stress affects blood pressure, sleep, and decision-making. Build routines that support calm and connection.",
  },
  {
    title: "Monitor Your Health",
    body: "Know your numbers: blood pressure, cholesterol, blood sugar, and weight. Annual check-ups catch problems early when they are easiest to address.",
  },
] as const;

export function getNextSteps(band: HealthScoreBand): string[] {
  switch (band) {
    case "excellent":
      return [
        "Book your annual wellness check-up and record your baseline numbers for the year ahead.",
        "Add one new challenge this quarter — a longer walk, a strength class, or a new active hobby.",
        "Share your Healthy Retirement Blueprint with your spouse or accountability partner.",
      ];
    case "good":
      return [
        "Schedule a medical check-up within the next 30 days if you have not had one in the past year.",
        "Increase structured movement to at least 4 days per week for the next 90 days.",
        "Track your sleep for two weeks and aim for a consistent 7–8 hour window.",
      ];
    case "moderate-risk":
      return [
        "Book a full health screening with your GP within 14 days — include blood pressure and cholesterol.",
        "Start a daily 20-minute walk and build toward 30 minutes without stopping within 60 days.",
        "Reduce one health risk this quarter: improve sleep, stop smoking, or add two strength sessions per week.",
      ];
    case "high-risk":
      return [
        "See your doctor within 7 days for a comprehensive check-up — do not delay.",
        "Begin gentle daily movement (even 10 minutes) and increase gradually with medical guidance.",
        "Identify your top two health gaps from this report and address one habit per week for 90 days.",
      ];
    case "action-required":
      return [
        "Contact your GP this week for an urgent health review — your score suggests significant gaps.",
        "If you smoke, speak to your doctor about a cessation plan starting immediately.",
        "Ask AS Brokers about wellness support and consider joining the 104 Week Watch Challenge for structured accountability.",
      ];
  }
}

export const GAP_EXPLANATION =
  "The larger your Health Gap, the greater the difference between your current health habits and the lifestyle required to enjoy a long, active retirement.";

export const VO2_MAX_SECTION = {
  title: "VO₂ Max and Longevity",
  paragraphs: [
    "VO₂ max measures how efficiently your body uses oxygen during exercise. In simple terms, it reflects your cardiovascular fitness — how well your heart, lungs, and muscles work together.",
    "Research consistently links higher fitness levels with longer, healthier lives. You do not need to be an athlete. Steady improvements in walking, cycling, or swimming can raise your fitness over time.",
    "Think of VO₂ max as a longevity indicator, not a gym test. The goal is not perfection — it is progress. Even modest gains in daily movement can meaningfully improve your retirement outlook.",
  ],
};

export const WEEK_WATCH_SECTION = {
  title: "The 104 Week Watch Challenge",
  paragraphs: [
    "The 104 Week Watch Challenge is a community for South Africans who refuse to let health become an afterthought in retirement.",
    "Over two years, members build sustainable habits around movement, sleep, strength, and health monitoring — with accountability, education, and shared progress.",
    "Your Retirement Health Gap™ is your starting point. The Challenge is your path to closing it — one week at a time.",
  ],
};
