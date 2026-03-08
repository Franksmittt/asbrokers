/**
 * Mock Client Portal data. Replace with Supabase when backend is ready.
 */

export interface MockHolding {
  id: string;
  name: string;
  type: "everest_income" | "everest_growth" | "amethyst" | "short_term" | "life";
  valueZar: number;
  monthlyIncomeZar?: number;
  maturityDate?: string;
  growthRate?: number;
}

export interface MockDocument {
  id: string;
  name: string;
  type: string;
  uploadedAt: string;
  size?: string;
}

export interface MockMessage {
  id: string;
  from: "client" | "advisor";
  fromName: string;
  body: string;
  at: string;
  channel: "portal" | "email" | "whatsapp";
}

export const MOCK_HOLDINGS: MockHolding[] = [
  {
    id: "h1",
    name: "12.8% Strategic Income",
    type: "everest_income",
    valueZar: 1_200_000,
    monthlyIncomeZar: 12_800,
    maturityDate: "2030-06-15",
  },
  {
    id: "h2",
    name: "Domestic Short-Term (House & Car)",
    type: "short_term",
    valueZar: 0,
  },
  {
    id: "h3",
    name: "Life Cover (Key Person)",
    type: "life",
    valueZar: 0,
  },
];

export const MOCK_DOCUMENTS: MockDocument[] = [
  { id: "d1", name: "ID_Document.pdf", type: "FICA - ID", uploadedAt: "2025-11-12", size: "2.1 MB" },
  { id: "d2", name: "Proof_of_Address.pdf", type: "FICA - Address", uploadedAt: "2025-11-12", size: "890 KB" },
  { id: "d3", name: "Everest_Quote_128_Jan2026.pdf", type: "Quote", uploadedAt: "2026-01-20", size: "1.4 MB" },
];

export const MOCK_MESSAGES: MockMessage[] = [
  {
    id: "m1",
    from: "advisor",
    fromName: "Johnny Farinha",
    body: "Your 12.8% Strategic Income schedule is ready. I've attached the quote; please review and let me know if you'd like to schedule a call to discuss.",
    at: "2026-03-01T10:30:00",
    channel: "email",
  },
  {
    id: "m2",
    from: "client",
    fromName: "You",
    body: "Thanks Johnny. Can we do Thursday 2pm?",
    at: "2026-03-01T14:15:00",
    channel: "portal",
  },
  {
    id: "m3",
    from: "advisor",
    fromName: "Johnny Farinha",
    body: "Thursday 2pm works. I'll send a calendar invite. Any questions on the 120-day notice or loyalty bonus before we meet?",
    at: "2026-03-02T09:00:00",
    channel: "whatsapp",
  },
];

/** Mock: advisor for the logged-in portal client (e.g. Jan van der Berg). Backend will use client_id from auth. */
export function getPortalAdvisor() {
  return {
    name: "Albert Schuurman",
    role: "Manager & Key Individual",
    phone: "067 242 9946",
    whatsApp: "0672429946",
  };
}

export function getPortfolioSummary() {
  const totalValue = MOCK_HOLDINGS.filter((h) => h.valueZar > 0).reduce((s, h) => s + h.valueZar, 0);
  const monthlyIncome = MOCK_HOLDINGS.reduce((s, h) => s + (h.monthlyIncomeZar ?? 0), 0);
  return {
    totalValueZar: totalValue,
    monthlyIncomeZar: monthlyIncome,
    holdingCount: MOCK_HOLDINGS.length,
  };
}

/** Data for Recharts: projected growth over next 60 months (e.g. Strategic Income). */
export function getProjectedIncomeChartData() {
  const baseMonthly = 12_800;
  const months: { month: number; label: string; cumulative: number }[] = [];
  let cumulative = 0;
  for (let i = 0; i <= 60; i += 6) {
    cumulative += baseMonthly * 6;
    months.push({
      month: i,
      label: i === 0 ? "Now" : `+${i}m`,
      cumulative,
    });
  }
  return months;
}

/** Annuity drawdown / capital depletion over time (simplified mock). */
export function getAnnuityDrawdownChartData() {
  const capital = 2_000_000;
  const drawdownRate = 0.05;
  const annualDraw = capital * drawdownRate;
  const years = 25;
  const data: { year: number; capital: number; drawn: number }[] = [];
  let cap = capital;
  let drawn = 0;
  for (let y = 0; y <= years; y += 5) {
    data.push({ year: y, capital: Math.round(cap), drawn: Math.round(drawn) });
    for (let i = 0; i < 5 && y + i < years; i++) {
      cap -= annualDraw;
      drawn += annualDraw;
    }
  }
  return data;
}
