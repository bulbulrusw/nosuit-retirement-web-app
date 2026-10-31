/**
 * Centralized Tax, Medicare, Social Security, and ACA Constants
 * Used across both the React calculator (`src/utils/retirementMath.ts`)
 * and the standalone HTML export (`src/utils/fullStandaloneTemplate.ts`).
 */

export const RETIREMENT_CONSTANTS = {
  /** Google Analytics 4 Measurement ID */
  GA_MEASUREMENT_ID: 'G-66NLH28JBQ',

  /** Official 2027 Social Security Cost-of-Living Adjustment (announced Oct 14, 2026) */
  COLA_2027_PCT: 3.6,

  /**
   * Medicare Part B Standard Monthly Premiums
   * Source: 2026 Medicare Trustees Report projects 2027 standard Part B premium at $209.50
   * (up $6.60 from the official 2026 standard premium of $202.90).
   * Note: Final 2027 Part B premium is announced by CMS (usually November) — verify at cms.gov / medicare.gov.
   */
  MEDICARE_PART_B: {
    base2026: 202.90,
    projected2027: 209.50,
    defaultIncrease2027: 6.60,
  },

  /**
   * FIX 1 — Federal Saver's Match (IRC §6433 / SECURE 2.0 Act §103, effective tax year 2027)
   * Linear phase-out from 50% at `start` to 0% at `end`:
   * rate = 50% * (end - AGI) / (end - start), clamped to [0%, 50%].
   * Match = rate * min(contribution per person, $2,000).
   * Note: IRC §6433 statutory rounding rules may differ by ~1 percentage point (estimate).
   */
  SAVERS_MATCH_2027: {
    maxRatePct: 50,
    maxContributionPerPerson: 2000,
    maxMatchPerPerson: 1000,
    phaseout: {
      single: {
        start: 20500,
        end: 35500,
        label: 'Single / Married Filing Separately',
      },
      hoh: {
        start: 30750,
        end: 53250,
        label: 'Head of Household',
      },
      married: {
        start: 41000,
        end: 71000,
        label: 'Married Filing Jointly',
      },
    },
  },

  /**
   * FIX 2 — Pre-Medicare ACA Healthcare Bridge (2026 Coverage Year)
   * - Enhanced ARPA/IRA subsidies expired 12/31/2025; the original 400% FPL cliff applies for 2026.
   * - 2026 plan year uses prior-year (2025) HHS contiguous-states FPL guidelines:
   *   1 person = $15,650 (400% cliff = $62,600); 2 people = $21,150 (400% cliff = $84,600).
   * - Applicable percentage table for 2026 per IRS Rev. Proc. 2025-25 (IRC §36B(b)(3)(A)):
   *   <133% FPL: 2.10%
   *   133%–150% FPL: 3.14% -> 4.19%
   *   150%–200% FPL: 4.19% -> 6.60%
   *   200%–250% FPL: 6.60% -> 8.44%
   *   250%–300% FPL: 8.44% -> 9.96%
   *   300%–400% FPL: 9.96%
   *   >400% FPL: No premium tax credit (cliff).
   *   (Verify against IRS Rev. Proc. 2025-25 if IRS issues subsequent adjustments.)
   */
  ACA_2026: {
    fpl1Person: 15650,
    fpl2Person: 21150,
    cliffMultiplier: 4,
    cliff1Person: 62600,
    cliff2Person: 84600,
    revProc2025_25Bands: [
      { minFplPct: 0, maxFplPct: 133, startPct: 2.10, endPct: 2.10 },
      { minFplPct: 133, maxFplPct: 150, startPct: 3.14, endPct: 4.19 },
      { minFplPct: 150, maxFplPct: 200, startPct: 4.19, endPct: 6.60 },
      { minFplPct: 200, maxFplPct: 250, startPct: 6.60, endPct: 8.44 },
      { minFplPct: 250, maxFplPct: 300, startPct: 8.44, endPct: 9.96 },
      { minFplPct: 300, maxFplPct: 400, startPct: 9.96, endPct: 9.96 },
    ],
  },

  /**
   * FIX 3 — Medicare IRMAA Income-Related Monthly Adjustment Amount Thresholds (Tier 1)
   * - 2026 premiums (based on 2024 tax return MAGI): Official CMS figures = $109,000 single / $218,000 married.
   * - 2027 premiums (based on 2025 tax return MAGI): CMS has not published official 2027 figures yet
   *   (expected ~November 2026). Using projected $112,000 single / $224,000 married (2026 Medicare Trustees Report / Kiplinger projection; verify with CMS in Nov 2026).
   */
  IRMAA: {
    year2026From2024Magi: {
      single: 109000,
      married: 218000,
    },
    year2027ProjectedFrom2025Magi: {
      single: 112000,
      married: 224000,
      label: 'projected — CMS confirms in November 2026',
    },
  },

  /**
   * FIX 5 — Federal Income Tax & Senior Deductions (2026 Tax Year Consistency)
   * Source: IRS Rev. Proc. 2025-32 (2026 inflation adjustments) and OBBBA (One Big Beautiful Bill Act, P.L. 119-21, 2025–2028 senior deduction).
   * - Standard deduction (2026): $16,100 single / $32,200 married filing jointly.
   * - 12% federal bracket top (2026 taxable income): $50,400 single / $100,800 married filing jointly.
   * - Additional age-65+ standard deduction (2026): $2,050 single / $1,650 per qualifying spouse married.
   * - OBBBA senior deduction (2025–2028): $6,000 per qualifying age-65+ person, phased out by 6% of MAGI
   *   above $75,000 (single) / $150,000 (married filing jointly).
   * - 1984 IRS Social Security Provisional Income thresholds (IRC §86, unindexed since 1984/1993):
   *   Single: $25,000 (50% tier) / $34,000 (85% tier). Married: $32,000 (50% tier) / $44,000 (85% tier).
   */
  TAX_2026: {
    taxYearLabel: '2026 tax year',
    standardDeduction: {
      single: 16100,
      married: 32200,
    },
    bracket12Top: {
      single: 50400,
      married: 100800,
    },
    extraAge65Deduction: {
      single: 2050,
      marriedPerSpouse: 1650,
    },
    obbbaSeniorDeduction: {
      perPerson: 6000,
      phaseoutStart: {
        single: 75000,
        married: 150000,
      },
      phaseoutRate: 0.06,
    },
    ghostTax1984: {
      single: { line50: 25000, line85: 34000 },
      married: { line50: 32000, line85: 44000 },
    },
  },

  /** Official 2027 Social Security Retirement Earnings Test Limits */
  SSA_EARNINGS_TEST_2027: {
    underFraAnnualLimit: 25560,
    underFraMonthlyLimit: 2130,
    yearOfFraAnnualLimit: 67920,
    priorYear2026UnderFraLimit: 24480,
  },

  /** Enacted 2026 IRS 401(k)/403(b) & SECURE 2.0 Super Catch-Up Limits */
  SECURE_2_0_CATCHUP_2026: {
    base401kLimit: 24500,
    standardCatchup50Plus: 8000,
    superCatchup60To63: 11250,
    mandatoryRothPriorWageThreshold: 150000,
  },
} as const;
