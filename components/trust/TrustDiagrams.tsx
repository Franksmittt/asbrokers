/**
 * Faceless trust diagrams — Ability/Integrity cues without staff photography.
 * Warm canvas editorial style: hairlines, teal accents, serif-adjacent labels.
 */

const TEAL = "#00A3A3";
const INK = "#1D1D1F";
const MUTED = "#78716c";
const LINE = "#d6d3d1";
const FILL = "#F7F6F3";
const WARN = "#b45309";

export function EstateLiquidityWaterfall({ className = "" }: { className?: string }) {
  return (
    <div
      className={`overflow-hidden border bg-white p-4 sm:p-6 ${className}`}
      style={{ borderColor: LINE }}
      role="img"
      aria-label="Estate liquidity waterfall: abatement, duty and fees, cash gap, forced-sale risk"
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-500">
        Liquidity waterfall · educational
      </p>
      <svg viewBox="0 0 400 220" className="mt-4 h-auto w-full" fill="none" aria-hidden>
        <rect x="16" y="20" width="88" height="44" fill={FILL} stroke={LINE} />
        <text x="60" y="40" textAnchor="middle" fill={INK} fontSize="11" fontFamily="system-ui,sans-serif" fontWeight="600">
          Gross estate
        </text>
        <text x="60" y="54" textAnchor="middle" fill={MUTED} fontSize="9" fontFamily="system-ui,sans-serif">
          Assets at death
        </text>

        <path d="M104 42 H132" stroke={LINE} strokeWidth="1.5" markerEnd="url(#ew-arrow)" />

        <rect x="132" y="20" width="88" height="44" fill={FILL} stroke={LINE} />
        <text x="176" y="40" textAnchor="middle" fill={INK} fontSize="11" fontFamily="system-ui,sans-serif" fontWeight="600">
          R3.5m shield
        </text>
        <text x="176" y="54" textAnchor="middle" fill={MUTED} fontSize="9" fontFamily="system-ui,sans-serif">
          Abatement*
        </text>

        <path d="M220 42 H248" stroke={LINE} strokeWidth="1.5" />

        <rect x="248" y="12" width="136" height="60" fill={FILL} stroke={TEAL} strokeWidth="1.5" />
        <text x="316" y="36" textAnchor="middle" fill={INK} fontSize="11" fontFamily="system-ui,sans-serif" fontWeight="600">
          Duty + executor
        </text>
        <text x="316" y="52" textAnchor="middle" fill={MUTED} fontSize="9" fontFamily="system-ui,sans-serif">
          Cash must exist
        </text>

        <path d="M316 72 V98" stroke={LINE} strokeWidth="1.5" />

        <rect x="200" y="98" width="184" height="48" fill="#fff7ed" stroke={WARN} strokeWidth="1.5" />
        <text x="292" y="120" textAnchor="middle" fill={WARN} fontSize="11" fontFamily="system-ui,sans-serif" fontWeight="600">
          Liquidity gap
        </text>
        <text x="292" y="136" textAnchor="middle" fill={MUTED} fontSize="9" fontFamily="system-ui,sans-serif">
          If no liquid cover → forced sale risk
        </text>

        <path d="M292 146 V168" stroke={LINE} strokeWidth="1.5" />

        <rect x="168" y="168" width="248" height="36" fill={FILL} stroke={LINE} />
        <text x="292" y="190" textAnchor="middle" fill={TEAL} fontSize="11" fontFamily="system-ui,sans-serif" fontWeight="600">
          Engineer cash · attorneys draft instruments
        </text>

        <text x="16" y="214" fill={MUTED} fontSize="8" fontFamily="system-ui,sans-serif">
          *Illustrative SARS framing — verify current law. Not legal advice.
        </text>
      </svg>
    </div>
  );
}

export function MedicalDemarcationDiagram({ className = "" }: { className?: string }) {
  return (
    <div
      className={`overflow-hidden border bg-white p-4 sm:p-6 ${className}`}
      style={{ borderColor: LINE }}
      role="img"
      aria-label="Medical scheme versus gap cover demarcation"
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-500">
        Demarcation map · educational
      </p>
      <svg viewBox="0 0 400 200" className="mt-4 h-auto w-full" fill="none" aria-hidden>
        <rect x="12" y="16" width="176" height="140" fill={FILL} stroke={TEAL} strokeWidth="1.5" />
        <text x="100" y="40" textAnchor="middle" fill={INK} fontSize="12" fontFamily="system-ui,sans-serif" fontWeight="600">
          Medical scheme
        </text>
        <text x="100" y="58" textAnchor="middle" fill={MUTED} fontSize="9" fontFamily="system-ui,sans-serif">
          Medical Schemes Act
        </text>
        <text x="24" y="84" fill={INK} fontSize="10" fontFamily="system-ui,sans-serif">
          • Primary health funding
        </text>
        <text x="24" y="102" fill={INK} fontSize="10" fontFamily="system-ui,sans-serif">
          • PMBs required
        </text>
        <text x="24" y="120" fill={INK} fontSize="10" fontFamily="system-ui,sans-serif">
          • Day-to-day / hospital options
        </text>
        <text x="24" y="138" fill={MUTED} fontSize="9" fontFamily="system-ui,sans-serif">
          Not optional if you need cover
        </text>

        <rect x="212" y="16" width="176" height="140" fill={FILL} stroke={LINE} strokeWidth="1.5" />
        <text x="300" y="40" textAnchor="middle" fill={INK} fontSize="12" fontFamily="system-ui,sans-serif" fontWeight="600">
          Gap cover
        </text>
        <text x="300" y="58" textAnchor="middle" fill={MUTED} fontSize="9" fontFamily="system-ui,sans-serif">
          Demarcation / short-term
        </text>
        <text x="224" y="84" fill={INK} fontSize="10" fontFamily="system-ui,sans-serif">
          • In-hospital shortfalls
        </text>
        <text x="224" y="102" fill={INK} fontSize="10" fontFamily="system-ui,sans-serif">
          • Needs a scheme underneath
        </text>
        <text x="224" y="120" fill={INK} fontSize="10" fontFamily="system-ui,sans-serif">
          • Annual benefit caps apply
        </text>
        <text x="224" y="138" fill={MUTED} fontSize="9" fontFamily="system-ui,sans-serif">
          Not a medical-aid substitute
        </text>

        <path d="M188 86 H212" stroke={TEAL} strokeWidth="1.5" strokeDasharray="4 3" />
        <text x="200" y="178" textAnchor="middle" fill={MUTED} fontSize="9" fontFamily="system-ui,sans-serif">
          Structure both — then advocate at claim time
        </text>
      </svg>
    </div>
  );
}

export function EverestRolesTriangle({ className = "" }: { className?: string }) {
  return (
    <div
      className={`overflow-hidden border bg-white p-4 sm:p-6 ${className}`}
      style={{ borderColor: LINE }}
      role="img"
      aria-label="Everest roles: FSP 795 product, FSP 17273 advice, HoldCo preference shares"
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-500">
        Who does what · regulation before yield
      </p>
      <svg viewBox="0 0 400 210" className="mt-4 h-auto w-full" fill="none" aria-hidden>
        <rect x="110" y="12" width="180" height="52" fill={FILL} stroke={TEAL} strokeWidth="1.5" />
        <text x="200" y="34" textAnchor="middle" fill={INK} fontSize="11" fontFamily="system-ui,sans-serif" fontWeight="600">
          Everest Wealth · FSP 795
        </text>
        <text x="200" y="50" textAnchor="middle" fill={MUTED} fontSize="9" fontFamily="system-ui,sans-serif">
          Product provider / structurer
        </text>

        <path d="M160 64 L100 100" stroke={LINE} strokeWidth="1.5" />
        <path d="M240 64 L300 100" stroke={LINE} strokeWidth="1.5" />

        <rect x="12" y="100" width="176" height="64" fill={FILL} stroke={LINE} />
        <text x="100" y="124" textAnchor="middle" fill={INK} fontSize="11" fontFamily="system-ui,sans-serif" fontWeight="600">
          AS Brokers · FSP 17273
        </text>
        <text x="100" y="140" textAnchor="middle" fill={MUTED} fontSize="9" fontFamily="system-ui,sans-serif">
          Independent advice · Cat 1.8
        </text>
        <text x="100" y="154" textAnchor="middle" fill={MUTED} fontSize="9" fontFamily="system-ui,sans-serif">
          Not a tied agent
        </text>

        <rect x="212" y="100" width="176" height="64" fill={FILL} stroke={LINE} />
        <text x="300" y="124" textAnchor="middle" fill={INK} fontSize="11" fontFamily="system-ui,sans-serif" fontWeight="600">
          HoldCo · Companies Act
        </text>
        <text x="300" y="140" textAnchor="middle" fill={MUTED} fontSize="9" fontFamily="system-ui,sans-serif">
          Preference-share issuer
        </text>
        <text x="300" y="154" textAnchor="middle" fill={MUTED} fontSize="9" fontFamily="system-ui,sans-serif">
          Real-economy deployment
        </text>

        <text x="200" y="196" textAnchor="middle" fill={MUTED} fontSize="9" fontFamily="system-ui,sans-serif">
          Three roles · three regulators of focus · one client outcome
        </text>
      </svg>
    </div>
  );
}

export function CapitalTrajectoryViz({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative flex aspect-[4/3] w-full flex-col overflow-hidden border bg-white px-5 pb-6 pt-5 ${className}`}
      style={{ borderColor: LINE }}
      role="img"
      aria-label="Capital trajectory: target path versus current path with drawdown risk zone"
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-500">
        Longevity diagnostic
      </p>
      <svg viewBox="0 0 320 200" className="mt-2 h-full w-full max-h-[260px]" fill="none" aria-hidden>
        <rect x="24" y="100" width="272" height="76" fill="#fff7ed" opacity="0.55" />
        <text x="32" y="118" fill={WARN} fontSize="9" fontFamily="system-ui,sans-serif">
          Sequence / drawdown risk zone
        </text>
        <line x1="24" y1="176" x2="296" y2="176" stroke={LINE} strokeWidth="1" />
        <line x1="24" y1="28" x2="24" y2="176" stroke={LINE} strokeWidth="1" />
        <path
          d="M24 150 C 80 142, 110 130, 150 108 C 200 78, 240 70, 296 42"
          stroke={TEAL}
          strokeWidth="2.25"
          strokeLinecap="round"
        />
        <path
          d="M24 158 C 90 152, 140 148, 190 140 C 240 132, 270 128, 296 122"
          stroke="#a8a29e"
          strokeWidth="1.75"
          strokeDasharray="5 4"
          strokeLinecap="round"
        />
        <circle cx="296" cy="42" r="4.5" fill={TEAL} />
        <text x="188" y="36" fill={TEAL} fontSize="10" fontFamily="system-ui,sans-serif" fontWeight="600">
          Target path
        </text>
        <text x="188" y="116" fill="#a8a29e" fontSize="10" fontFamily="system-ui,sans-serif">
          Current path
        </text>
        <text x="28" y="192" fill={MUTED} fontSize="8" fontFamily="system-ui,sans-serif">
          Illustrative only · not advice
        </text>
      </svg>
    </div>
  );
}

export function WealthContinuumViz({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative flex aspect-[4/3] w-full flex-col overflow-hidden border bg-white px-5 pb-6 pt-5 ${className}`}
      style={{ borderColor: LINE }}
      role="img"
      aria-label="Wealth continuum from accumulation to income distribution with tax-drag note"
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-500">
        Accumulation → distribution
      </p>
      <svg viewBox="0 0 320 200" className="mt-2 h-full w-full max-h-[260px]" fill="none" aria-hidden>
        <line x1="24" y1="176" x2="296" y2="176" stroke={LINE} strokeWidth="1" />
        <line x1="24" y1="28" x2="24" y2="176" stroke={LINE} strokeWidth="1" />
        <path
          d="M24 148 C 70 140, 100 118, 140 96 C 180 74, 210 58, 248 48"
          stroke={TEAL}
          strokeWidth="2.25"
          strokeLinecap="round"
        />
        <path
          d="M248 48 C 268 44, 282 52, 296 72"
          stroke={TEAL}
          strokeWidth="2.25"
          strokeLinecap="round"
          strokeDasharray="5 4"
        />
        <circle cx="248" cy="48" r="4.5" fill={TEAL} />
        <text x="100" y="86" fill={TEAL} fontSize="10" fontFamily="system-ui,sans-serif" fontWeight="600">
          Accumulation
        </text>
        <text x="228" y="92" fill={MUTED} fontSize="10" fontFamily="system-ui,sans-serif">
          Income phase
        </text>
        <rect x="40" y="152" width="200" height="28" fill={FILL} stroke={LINE} />
        <text x="140" y="170" textAnchor="middle" fill={MUTED} fontSize="9" fontFamily="system-ui,sans-serif">
          Tax drag: interest (marginal) vs DWT (~20%)
        </text>
        <text x="28" y="196" fill={MUTED} fontSize="8" fontFamily="system-ui,sans-serif">
          Illustrative only · not advice
        </text>
      </svg>
    </div>
  );
}
