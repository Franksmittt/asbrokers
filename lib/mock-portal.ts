export type MessageChannel = "email" | "portal" | "whatsapp";

export type ClientProfile = {
  name: string;
  totalPortfolioValue: number;
  monthlyIncome: number;
};

export type PortalAdvisor = {
  name: string;
  role: string;
  phone: string;
};

export type PortalHolding = {
  id: string;
  name: string;
  value: number;
  allocationPct: number;
  productCode?: string;
};

export type PortalChartPoint = {
  month: string;
  income: number | null;
  drawdown: number;
};

export type PortalDocument = {
  id: string;
  title: string;
  category: string;
  uploadedAt: string;
  sizeKb: number;
};

export type PortalMessage = {
  id: string;
  channel: MessageChannel;
  from: string;
  body: string;
  sentAt: string;
  isClient: boolean;
};

export const clientProfile: ClientProfile = {
  name: "Margaret van der Berg",
  totalPortfolioValue: 18_450_000,
  monthlyIncome: 192_500,
};

export const advisor: PortalAdvisor = {
  name: "Albert Schuurman",
  role: "Principal Advisor · Category 1.8",
  phone: "082 123 4567",
};

export const holdings: PortalHolding[] = [
  {
    id: "h1",
    name: "Everest Strategic Growth 14.5%",
    value: 9_200_000,
    allocationPct: 49.9,
    productCode: "EW-145",
  },
  {
    id: "h2",
    name: "Everest Strategic Income 12.8%",
    value: 4_850_000,
    allocationPct: 26.3,
    productCode: "EW-128",
  },
  {
    id: "h3",
    name: "Amethyst Living Annuity",
    value: 3_100_000,
    allocationPct: 16.8,
    productCode: "AMY-LA",
  },
  {
    id: "h4",
    name: "Cash & Liquidity Reserve",
    value: 1_300_000,
    allocationPct: 7.0,
  },
];

export const chartData: PortalChartPoint[] = [
  { month: "Jul", income: 188_000, drawdown: 42_000 },
  { month: "Aug", income: 190_500, drawdown: 43_500 },
  { month: "Sep", income: 191_200, drawdown: 44_000 },
  { month: "Oct", income: 192_000, drawdown: 45_200 },
  { month: "Nov", income: 193_400, drawdown: 46_800 },
  { month: "Dec", income: 195_100, drawdown: 48_500 },
  { month: "Jan", income: null, drawdown: 47_900 },
  { month: "Feb", income: 194_800, drawdown: 46_200 },
  { month: "Mar", income: 193_600, drawdown: 45_800 },
  { month: "Apr", income: 192_900, drawdown: 44_600 },
  { month: "May", income: 192_200, drawdown: 43_900 },
  { month: "Jun", income: 192_500, drawdown: 43_200 },
];

export const documents: PortalDocument[] = [
  {
    id: "d1",
    title: "Everest Strategic Growth, Statement Q2 2026",
    category: "Investment",
    uploadedAt: "2026-06-12T09:15:00Z",
    sizeKb: 842,
  },
  {
    id: "d2",
    title: "Amethyst Living Annuity, Income Schedule",
    category: "Retirement",
    uploadedAt: "2026-05-28T14:30:00Z",
    sizeKb: 512,
  },
  {
    id: "d3",
    title: "Annual Financial Review 2025",
    category: "Advice",
    uploadedAt: "2026-02-18T11:00:00Z",
    sizeKb: 1_240,
  },
  {
    id: "d4",
    title: "Short-term Insurance Schedule, Santam",
    category: "Insurance",
    uploadedAt: "2026-01-09T08:45:00Z",
    sizeKb: 368,
  },
];

export const messages: PortalMessage[] = [
  {
    id: "m1",
    channel: "email",
    from: "Albert Schuurman",
    body: "Good morning Margaret, your Q2 Everest statements are now available in the portal. Let me know if you'd like to review drawdown levels at our next check-in.",
    sentAt: "2026-06-12T08:02:00Z",
    isClient: false,
  },
  {
    id: "m2",
    channel: "portal",
    from: "Margaret van der Berg",
    body: "Thank you Albert. Please confirm my Amethyst drawdown is still within the 12% band we discussed.",
    sentAt: "2026-06-12T09:18:00Z",
    isClient: true,
  },
  {
    id: "m3",
    channel: "whatsapp",
    from: "Albert Schuurman",
    body: "Confirmed, you're at 11.2% on Amethyst. All within plan. I'll send a summary note to the portal shortly.",
    sentAt: "2026-06-12T09:24:00Z",
    isClient: false,
  },
  {
    id: "m4",
    channel: "email",
    from: "AS Brokers Compliance",
    body: "Your annual FAIS disclosure pack for 2025/26 has been uploaded to Documents for your records.",
    sentAt: "2026-06-10T16:45:00Z",
    isClient: false,
  },
  {
    id: "m5",
    channel: "portal",
    from: "Margaret van der Berg",
    body: "Received, thank you. Could we schedule a review in July after my UK trip?",
    sentAt: "2026-06-11T07:30:00Z",
    isClient: true,
  },
];

/** Convert local SA display number to wa.me digits (082 123 4567 → 27821234567). */
export function sanitizePhoneForWhatsApp(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("0")) return `27${digits.slice(1)}`;
  if (digits.startsWith("27")) return digits;
  return digits;
}

export function getPortalAdvisor(): PortalAdvisor {
  return advisor;
}

export function getPortfolioSummary(): ClientProfile {
  return clientProfile;
}

export function getChartData(): PortalChartPoint[] {
  return chartData;
}

export function getHoldings(): PortalHolding[] {
  return holdings;
}

export function getDocuments(): PortalDocument[] {
  return documents;
}

export function getMessages(): PortalMessage[] {
  return [...messages].sort(
    (a, b) => new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime()
  );
}

export function formatPortalCurrency(value: number): string {
  const grouped = Math.round(Math.abs(value))
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `R ${grouped}`;
}
