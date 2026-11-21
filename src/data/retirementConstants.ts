/**
 * Centralized Tax, Medicare, Social Security, and ACA Constants
 * Used across the React calculator (`src/utils/retirementMath.ts`).
 */

export const DATA_LAST_VERIFIED = '2026-11-21' as const;

export const RETIREMENT_CONSTANTS = {
  /** Date all statutory figures were last verified */
  DATA_LAST_VERIFIED,

  /** Google Analytics 4 Measurement ID */
  GA_MEASUREMENT_ID: 'G-66NLH28JBQ',

  /** Official 2027 Social Security Cost-of-Living Adjustment (announced Oct 14, 2026) */
  COLA_2027_PCT: 3.6,

  /**
   * Source: The Senior Citizens League, 2026 Loss of Buying Power study
   * (13.7% loss 2016-2026, using TSCL's own 70-item price index; not an official government measure).
   */
  BUYING_POWER_LOSS_PCT_2016_2026: 0.137,

  /**
   * Medicare Part B Standard Monthly Premiums
   * Source: Official 2027 CMS announcement (Nov 17, 2026; Federal Register Nov 19, 2026):
   * 2027 standard Part B premium is $209.40 (up $6.50 from the official 2026 standard premium of $202.90);
   * 2027 Part B annual deductible is $292.
   */
  MEDICARE_PART_B: {
    base2026: 202.90,
    official2027: 209.40,
    defaultIncrease2027: 6.50,
    deductible2027: 292,
  },

  /**
   * FIX 1 — Federal Saver's Match (IRC §6433 / SECURE 2.0 Act §103, effective tax year 2027)
   * Linear phase-out from 50% at `start` to 0% at `end`:
   * rate = 50% * (end - AGI) / (end - start), clamped to [0%, 50%].
   * Match = rate * min(contribution per person, $2,000).
   * Note: IRC §6433 statutory rounding rules round reduction points down to the next lowest whole percentage point.
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
   * FIX 4 — Pre-Medicare ACA Healthcare Bridge (2027 ACA Coverage Year, IRS Rev. Proc. 2026-26, 2026 FPL)
   * - Enhanced ARPA/IRA subsidies expired 12/31/2025; the 400% FPL cliff applies.
   * - 2027 plan year uses prior-year (2026) HHS contiguous-states FPL guidelines:
   *   1 = $15,960 (400% cliff = $63,840); 2 = $21,640 (400% cliff = $86,560);
   *   3 = $27,320 (400% cliff = $109,280); 4 = $33,000 (400% cliff = $132,000).
   * - Applicable percentage table for 2027 per IRS Rev. Proc. 2026-26 (IRC §36B(b)(3)(A)):
   *   <133% FPL: 2.15%
   *   133%–150% FPL: 3.23% -> 4.30%
   *   150%–200% FPL: 4.30% -> 6.78%
   *   200%–250% FPL: 6.78% -> 8.66%
   *   250%–300% FPL: 8.66% -> 10.22%
   *   300%–400% FPL: 10.22%
   *   >400% FPL: No premium tax credit (cliff).
   */
  ACA_2027: {
    label: '2027 ACA Coverage Year (IRS Rev. Proc. 2026-26)',
    fpl1Person: 15960,
    fpl2Person: 21640,
    fpl3Person: 27320,
    fpl4Person: 33000,
    cliffMultiplier: 4,
    cliff1Person: 63840,
    cliff2Person: 86560,
    cliff3Person: 109280,
    cliff4Person: 132000,
    fplByHouseholdSize: {
      1: 15960,
      2: 21640,
      3: 27320,
      4: 33000,
    },
    cliffByHouseholdSize: {
      1: 63840,
      2: 86560,
      3: 109280,
      4: 132000,
    },
    revProc2026_26Bands: [
      { minFplPct: 0, maxFplPct: 133, startPct: 2.15, endPct: 2.15 },
      { minFplPct: 133, maxFplPct: 150, startPct: 3.23, endPct: 4.30 },
      { minFplPct: 150, maxFplPct: 200, startPct: 4.30, endPct: 6.78 },
      { minFplPct: 200, maxFplPct: 250, startPct: 6.78, endPct: 8.66 },
      { minFplPct: 250, maxFplPct: 300, startPct: 8.66, endPct: 10.22 },
      { minFplPct: 300, maxFplPct: 400, startPct: 10.22, endPct: 10.22 },
    ],
  },

  /**
   * FIX 2 — Medicare IRMAA (Official 2027 CMS rates from 2025 MAGI, announced Nov 17, 2026; Part B + Part D per person)
   * Note: Official 2027 CMS rates (announced Nov 17, 2026).
   * Thresholds from 2025 MAGI (Single / Married):
   *   T1 <=112,000 / <=224,000: $0
   *   T2 112,001-141,000 / 224,001-282,000: $99.10/mo = $1,189.20/yr (couple $2,378.40)
   *   T3 141,001-177,000 / 282,001-354,000: $249.10/mo = $2,989.20/yr (couple $5,978.40)
   *   T4 177,001-212,000 / 354,001-424,000: $399.00/mo = $4,788.00/yr (couple $9,576.00)
   *   T5 212,001-<500,000 / 424,001-<750,000: $548.90/mo = $6,586.80/yr (couple $13,173.60)
   *   T6 >=500,000 / >=750,000 (use >= for 500,000/750,000 per CMS): $598.80/mo = $7,185.60/yr (couple $14,371.20)
   */
  IRMAA: {
    note: 'Official 2027 CMS rates (announced Nov 17, 2026)',
    year2027From2025Magi: {
      single: 112000,
      married: 224000,
    },
    tiers2027: [
      { tier: 1, singleMax: 112000, marriedMax: 224000, monthlyPerPerson: 0, annualPerPerson: 0 },
      { tier: 2, singleMax: 141000, marriedMax: 282000, monthlyPerPerson: 99.10, annualPerPerson: 1189.20 },
      { tier: 3, singleMax: 177000, marriedMax: 354000, monthlyPerPerson: 249.10, annualPerPerson: 2989.20 },
      { tier: 4, singleMax: 212000, marriedMax: 424000, monthlyPerPerson: 399.00, annualPerPerson: 4788.00 },
      { tier: 5, singleMax: 500000, marriedMax: 750000, monthlyPerPerson: 548.90, annualPerPerson: 6586.80, exclusiveMax: true },
      { tier: 6, singleMax: 999999999, marriedMax: 999999999, monthlyPerPerson: 598.80, annualPerPerson: 7185.60 },
    ],
  },

  /**
   * FIX 5 — Federal Income Tax & Senior Deductions (2026 Tax Year Consistency)
   * Source: IRS Rev. Proc. 2025-32 (2026 inflation adjustments) and OBBBA (One Big Beautiful Bill Act, P.L. 119-21, 2025–2028 senior deduction).
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

  /**
   * Federal Income Tax & Senior Deductions (2027 Tax Year)
   * Source: IRS Rev. Proc. 2026-35 (2027 inflation adjustments) and OBBBA (P.L. 119-21, 2025–2028 senior deduction).
   */
  TAX_2027: {
    taxYearLabel: '2027 tax year',
    standardDeduction: {
      single: 16600,
      married: 33200,
    },
    bracket12Top: {
      single: 52025,
      married: 104050,
    },
    extraAge65Deduction: {
      single: 2100,
      marriedPerSpouse: 1700,
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
    underFraWithholdingDivisor: 2,
    yearOfFraAnnualLimit: 67920,
    yearOfFraMonthlyLimit: 5660,
    yearOfFraWithholdingDivisor: 3,
    priorYear2026UnderFraLimit: 24480,
  },

  /** Enacted 2026 IRS 401(k)/403(b) & SECURE 2.0 Super Catch-Up Limits */
  SECURE_2_0_CATCHUP_2026: {
    base401kLimit: 24500,
    standardCatchup50Plus: 8000,
    superCatchup60To63: 11250,
    mandatoryRothPriorWageThreshold: 150000,
  },

  /** Official 2027 IRS 401(k)/403(b) & SECURE 2.0 Super Catch-Up Limits (IRS Notice 2026-66) */
  SECURE_2_0_CATCHUP_2027: {
    base401kLimit: 25500,
    standardCatchup50Plus: 8500,
    superCatchup60To63: 11750,
    mandatoryRothPriorWageThreshold: 155000,
  },

  /**
   * Social Security Full Retirement Age (FRA) Schedule by Birth Year (Social Security Act § 216(l))
   * - Age 62 reduction: 5/9 of 1% per month for the first 36 months + 5/12 of 1% for each additional month beyond 36.
   * - Age 70 delayed retirement credits: 8% per year (2/3 of 1% per month) from FRA to age 70.
   */
  FRA_BY_BIRTH_YEAR: {
    '1955': {
      birthYearLabel: 'Born 1955 (FRA 66 + 2 mos)',
      fraYears: 66,
      fraMonths: 2,
      fraDecimalAge: 66 + 2 / 12,
      fraShortLabel: '66 + 2 mos',
      claim62Factor: 0.741667,
      claim62PctLabel: '74.2%',
      claim70Factor: 1.306667,
      claim70PctLabel: '130.7%',
      breakevenFraVs62Label: 'Age 78 and 2 months',
      breakeven70VsFraLabel: 'Age 82 and 6 months',
    },
    '1956': {
      birthYearLabel: 'Born 1956 (FRA 66 + 4 mos)',
      fraYears: 66,
      fraMonths: 4,
      fraDecimalAge: 66 + 4 / 12,
      fraShortLabel: '66 + 4 mos',
      claim62Factor: 0.733333,
      claim62PctLabel: '73.3%',
      claim70Factor: 1.293333,
      claim70PctLabel: '129.3%',
      breakevenFraVs62Label: 'Age 78 and 4 months',
      breakeven70VsFraLabel: 'Age 82 and 6 months',
    },
    '1957': {
      birthYearLabel: 'Born 1957 (FRA 66 + 6 mos)',
      fraYears: 66,
      fraMonths: 6,
      fraDecimalAge: 66.5,
      fraShortLabel: '66 + 6 mos',
      claim62Factor: 0.725,
      claim62PctLabel: '72.5%',
      claim70Factor: 1.28,
      claim70PctLabel: '128%',
      breakevenFraVs62Label: 'Age 78 and 5 months',
      breakeven70VsFraLabel: 'Age 82 and 6 months',
    },
    '1958': {
      birthYearLabel: 'Born 1958 (FRA 66 + 8 mos)',
      fraYears: 66,
      fraMonths: 8,
      fraDecimalAge: 66 + 8 / 12,
      fraShortLabel: '66 + 8 mos',
      claim62Factor: 0.716667,
      claim62PctLabel: '71.7%',
      claim70Factor: 1.266667,
      claim70PctLabel: '126.7%',
      breakevenFraVs62Label: 'Age 78 and 6 months',
      breakeven70VsFraLabel: 'Age 82 and 6 months',
    },
    '1959': {
      birthYearLabel: 'Born 1959 (FRA 66 + 10 mos)',
      fraYears: 66,
      fraMonths: 10,
      fraDecimalAge: 66 + 10 / 12,
      fraShortLabel: '66 + 10 mos',
      claim62Factor: 0.708333,
      claim62PctLabel: '70.8%',
      claim70Factor: 1.253333,
      claim70PctLabel: '125.3%',
      breakevenFraVs62Label: 'Age 78 and 7 months',
      breakeven70VsFraLabel: 'Age 82 and 6 months',
    },
    '1960+': {
      birthYearLabel: 'Born 1960 or Later (FRA 67)',
      fraYears: 67,
      fraMonths: 0,
      fraDecimalAge: 67,
      fraShortLabel: '67',
      claim62Factor: 0.7,
      claim62PctLabel: '70%',
      claim70Factor: 1.24,
      claim70PctLabel: '124%',
      breakevenFraVs62Label: 'Age 78 and 8 months',
      breakeven70VsFraLabel: 'Age 82 and 6 months',
    },
  },
} as const;

