export type RiskCoverItem = {
  id: string;
  label: string;
  description: string;
};

export type RiskCoverSection = {
  id: string;
  title: string;
  items: RiskCoverItem[];
};

export const BUSINESS_RISK_SECTIONS: RiskCoverSection[] = [
  {
    id: "fire-property",
    title: "Fire & Property",
    items: [
      { id: "buildings", label: "Buildings", description: "Covers physical structures against insured perils such as fire, storm, or impact damage." },
      { id: "office-contents", label: "Office Contents", description: "Protects furniture, equipment, and stock inside your premises." },
      { id: "business-interruption", label: "Business Interruption", description: "Protects lost gross profit and continuing expenses when a business cannot trade after an insured event such as a fire." },
      { id: "accounts-receivable", label: "Accounts Receivable", description: "Covers uncollectable debtor balances after insured record loss or damage." },
      { id: "theft", label: "Theft", description: "Covers theft of insured property following forcible entry or hold-up, subject to policy terms." },
      { id: "money", label: "Money", description: "Covers cash, cheques, and negotiable instruments in transit, on premises, or with authorised persons." },
      { id: "glass", label: "Glass", description: "Covers accidental breakage of fixed glass, signage, and related fittings." },
      { id: "portable-possessions", label: "Portable Possessions", description: "Covers specified portable items used for business away from your premises." },
      { id: "electronic-equipment", label: "Electronic Equipment", description: "Covers computers, servers, and electronic systems against insured damage." },
      { id: "goods-in-transit", label: "Goods In Transit", description: "Covers goods while being transported by road, rail, or air within stated limits." },
      { id: "marine-insurance", label: "Marine Insurance", description: "Covers cargo and marine exposures for import, export, or coastal movements." },
    ],
  },
  {
    id: "vehicles",
    title: "Vehicles",
    items: [
      { id: "motor-vehicles", label: "Motor Vehicles", description: "Covers company-owned vehicles for accidental loss, theft, and third-party liability." },
      { id: "commercial-vehicles", label: "Commercial Vehicles", description: "Covers trucks, delivery fleets, and specialist commercial vehicle risks." },
      { id: "passenger-liability", label: "Passenger Liability", description: "Covers liability for injury to passengers carried in the course of business." },
      { id: "motor-traders", label: "Motor Traders", description: "Covers dealerships and repairers for stock, customer vehicles, and road risks." },
      { id: "motor-contingent-liability", label: "Motor Contingent Liability", description: "Covers liability when employees use private vehicles for business and gaps arise." },
    ],
  },
  {
    id: "liability",
    title: "Liability",
    items: [
      { id: "public-liability", label: "Public Liability", description: "Covers legal liability for bodily injury or property damage to third parties." },
      { id: "products-liability", label: "Products Liability", description: "Covers liability arising from products sold, supplied, or manufactured." },
      { id: "employers-liability", label: "Employers Liability", description: "Covers occupational injury claims not fully covered by COIDA." },
      { id: "defective-workmanship", label: "Defective Workmanship", description: "Covers liability for faulty work performed by the business." },
      { id: "professional-indemnity", label: "Professional Indemnity", description: "Covers financial loss caused by professional negligence or errors." },
      { id: "environmental-liability", label: "Environmental Liability", description: "Covers pollution and environmental damage liabilities." },
      { id: "libel-slander", label: "Libel and Slander", description: "Covers defamation claims arising from business communications." },
    ],
  },
  {
    id: "crime-fraud",
    title: "Crime & Fraud",
    items: [
      { id: "fidelity-guarantee", label: "Fidelity Guarantee", description: "Covers loss from employee dishonesty or fraud." },
      { id: "commercial-crime", label: "Commercial Crime", description: "Broader crime cover including theft by employees and third parties." },
      { id: "cyber-insurance", label: "Cyber Insurance", description: "Covers data breaches, ransomware, business interruption, and cyber liability." },
      { id: "financial-guarantees", label: "Financial Guarantees", description: "Covers performance or financial guarantee obligations where insurable." },
    ],
  },
  {
    id: "directors-management",
    title: "Directors & Management",
    items: [
      { id: "d-o-liability", label: "Directors & Officers Liability", description: "Covers directors and officers for management liability claims." },
      { id: "employment-practices", label: "Employment Practices Liability", description: "Covers wrongful dismissal, discrimination, and workplace-related claims." },
    ],
  },
  {
    id: "engineering",
    title: "Engineering",
    items: [
      { id: "machinery-breakdown", label: "Machinery Breakdown", description: "Covers sudden and unforeseen damage to machinery and plant." },
      { id: "machinery-breakdown-lop", label: "Machinery Breakdown Loss of Profits", description: "Covers lost income after insured machinery breakdown." },
      { id: "contractors-plant", label: "Contractors Plant", description: "Covers plant, tools, and equipment used on construction sites." },
      { id: "accidental-damage", label: "Accidental Damage", description: "Covers sudden accidental physical damage to insured property." },
    ],
  },
  {
    id: "specialist",
    title: "Specialist",
    items: [
      { id: "transport", label: "Transport", description: "Specialist cover for hauliers, logistics operators, and fleet risks." },
      { id: "restaurant", label: "Restaurant", description: "Tailored cover for food service, stock spoilage, and public liability." },
      { id: "medical", label: "Medical", description: "Practice-specific cover for healthcare and medical businesses." },
      { id: "legal-practice", label: "Legal Practice", description: "Cover aligned to law firm property, liability, and professional risks." },
      { id: "accounting-practice", label: "Accounting Practice", description: "Cover for accounting firms including PI and office risks." },
      { id: "agriculture", label: "Agriculture", description: "Farm and agri-business property, liability, and asset cover." },
      { id: "crop-insurance", label: "Crop Insurance", description: "Covers crop yield or revenue losses from insured perils." },
      { id: "aviation", label: "Aviation", description: "Aircraft hull, liability, and hangarkeepers risks." },
      { id: "fuel-retailers", label: "Fuel Retailers", description: "Petrol station property, pollution, and liability exposures." },
      { id: "body-corporate", label: "Body Corporate", description: "Sectional title common property, trustees liability, and fidelity." },
    ],
  },
  {
    id: "business-assurance",
    title: "Business Assurance",
    items: [
      { id: "key-person", label: "Key Person Insurance", description: "Provides funds if a key employee or owner dies or becomes disabled." },
      { id: "buy-sell", label: "Buy and Sell Insurance", description: "Funds a share purchase agreement between business owners." },
      { id: "contingent-liability-assurance", label: "Contingent Liability", description: "Protects personal guarantees and business debt obligations." },
      { id: "business-overheads", label: "Business Overheads Insurance", description: "Pays fixed business expenses if an owner becomes disabled." },
      { id: "loan-account-protection", label: "Loan Account Protection", description: "Provides liquidity when loan accounts become payable at death." },
    ],
  },
];

export const ALL_RISK_COVER_ITEMS: RiskCoverItem[] = BUSINESS_RISK_SECTIONS.flatMap((s) => s.items);

export const TOTAL_RISK_COVER_COUNT = ALL_RISK_COVER_ITEMS.length;

export function getRiskCoverById(id: string): RiskCoverItem | undefined {
  return ALL_RISK_COVER_ITEMS.find((item) => item.id === id);
}

export const INDUSTRY_OPTIONS = [
  "Retail & Wholesale",
  "Manufacturing",
  "Construction",
  "Professional Services",
  "Hospitality & Restaurant",
  "Transport & Logistics",
  "Agriculture",
  "Medical & Healthcare",
  "Technology",
  "Property & Body Corporate",
  "Fuel & Automotive",
  "Other",
] as const;
