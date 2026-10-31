import { RETIREMENT_CONSTANTS } from '../data/retirementConstants';

export type PresetKey = 'single' | 'couple400k' | 'latesaver';
export type QuickScenarioKey = 'avgSenior' | 'bucket400k' | 'saversMatch2027';
export type SaversFilingStatus = 'single' | 'married' | 'hoh';

export interface RetirementInputs {
  // Tab 1: Two-Envelope COLA & 3-Bucket Nest Egg
  ssYourCheck: number;
  ssSpouseCheck: number;
  colaPct: number;
  partBIncrease: number;
  partBBasePremium?: number;
  bucketPresetMode?: 'standard' | 'fixed40_160_200';
  nestEgg: number;
  withdrawalRate: number;
  expHousing: number;
  expGroceries: number;
  expHealthcare: number;
  expCarFun: number;

  // Tab 2: Claiming Age, Side-Gig & Mortgage
  fraBenefit: number;
  lifeExpAge: number;
  sideGigIncome: number;
  sideGigHourly: number;
  mortBalance: number;
  mortRate: number;
  hysaRate: number;

  // Tab 3: 1984 Ghost Tax, Roth Sweet Spot, SECURE 2.0, IRMAA & ACA
  taxFilingStatus: 'married' | 'single';
  filersAge65Plus?: 0 | 1 | 2;
  taxPreTaxDraw: number;
  taxRothDraw: number;
  taxInterest: number;
  workerAgeGroup: '55' | '61' | '65';
  irmaa2025Income: number;
  irmaaRetiredEvent: 'yes' | 'no';
  acaCurrentAge: number;
  acaMagi: number;

  // 2027 IRS Federal Saver's Match (SECURE 2.0 / IRC § 6433)
  saversContribution: number;
  saversFilingStatus: SaversFilingStatus;
  saversAgi: number;
  saversContributingSpouses?: 1 | 2;
}

export const DEFAULT_INPUTS: RetirementInputs = {
  ssYourCheck: 1940,
  ssSpouseCheck: 1160,
  colaPct: RETIREMENT_CONSTANTS.COLA_2027_PCT,
  partBIncrease: RETIREMENT_CONSTANTS.MEDICARE_PART_B.defaultIncrease2027,
  partBBasePremium: RETIREMENT_CONSTANTS.MEDICARE_PART_B.base2026,
  bucketPresetMode: 'standard',
  nestEgg: 400000,
  withdrawalRate: 4.5,
  expHousing: 1350,
  expGroceries: 750,
  expHealthcare: 650,
  expCarFun: 550,

  fraBenefit: 2200,
  lifeExpAge: 82,
  sideGigIncome: 30000,
  sideGigHourly: 25,
  mortBalance: 75000,
  mortRate: 3.5,
  hysaRate: 4.6,

  taxFilingStatus: 'married',
  filersAge65Plus: 0,
  taxPreTaxDraw: 24000,
  taxRothDraw: 4000,
  taxInterest: 3500,
  workerAgeGroup: '61',
  irmaa2025Income: 230000,
  irmaaRetiredEvent: 'yes',
  acaCurrentAge: 62,
  acaMagi: 52000,

  saversContribution: 2000,
  saversFilingStatus: 'married',
  saversAgi: 38000,
  saversContributingSpouses: 1,
};

export const QUICK_SCENARIO_PRESETS: Record<
  QuickScenarioKey,
  {
    label: string;
    shortDesc: string;
    toast: string;
    values: Partial<RetirementInputs>;
  }
> = {
  avgSenior: {
    label: `👤 Average Senior ($2,000/mo SS Benefit, $${RETIREMENT_CONSTANTS.MEDICARE_PART_B.base2026.toFixed(2)} Part B)`,
    shortDesc: `1-Person $2,000/mo Social Security check with $${RETIREMENT_CONSTANTS.MEDICARE_PART_B.base2026.toFixed(2)} standard Medicare Part B and ${RETIREMENT_CONSTANTS.COLA_2027_PCT}% official 2027 COLA`,
    toast: `Loaded Average Senior Scenario: $2,000/mo Social Security & $${RETIREMENT_CONSTANTS.MEDICARE_PART_B.base2026.toFixed(2)} Medicare Part B (+$${RETIREMENT_CONSTANTS.MEDICARE_PART_B.defaultIncrease2027.toFixed(2)} projected 2027 hike).`,
    values: {
      ssYourCheck: 2000,
      ssSpouseCheck: 0,
      colaPct: RETIREMENT_CONSTANTS.COLA_2027_PCT,
      partBBasePremium: RETIREMENT_CONSTANTS.MEDICARE_PART_B.base2026,
      partBIncrease: RETIREMENT_CONSTANTS.MEDICARE_PART_B.defaultIncrease2027,
      bucketPresetMode: 'standard',
      taxFilingStatus: 'single',
    },
  },
  bucket400k: {
    label: '💼 3-Bucket Plan ($400,000 Nest Egg: $40K Cash, $160K Income, $200K Growth)',
    shortDesc: '$400,000 total savings split into $40,000 Cash (10%), $160,000 Income/Bonds (40%), and $200,000 Growth (50%)',
    toast: 'Loaded $400,000 3-Bucket Plan: $40K Cash, $160K Income, $200K Growth.',
    values: {
      nestEgg: 400000,
      withdrawalRate: 4.5,
      bucketPresetMode: 'fixed40_160_200',
    },
  },
  saversMatch2027: {
    label: "🎁 2027 Saver's Match ($2,000 Saved = $1,000 Free Federal Match)",
    shortDesc: 'SECURE 2.0 50% Federal Matching Contribution (IRC § 6433) deposited directly into your IRA or 401(k)',
    toast: "Loaded 2027 IRS Saver's Match: $2,000 contribution = +$1,000 free federal match deposit ($3,000 total)!",
    values: {
      saversContribution: 2000,
      saversFilingStatus: 'married',
      saversAgi: 38000,
      saversContributingSpouses: 1,
    },
  },
};

export const PRESET_PROFILES: Record<
  PresetKey,
  {
    label: string;
    toast: string;
    values: Partial<RetirementInputs>;
  }
> = {
  single: {
    label: 'Single (Age 66, $380K)',
    toast: 'Loaded Single Retiree (Age 66, $380K Nest Egg) profile.',
    values: {
      ssYourCheck: 2150,
      ssSpouseCheck: 0,
      colaPct: RETIREMENT_CONSTANTS.COLA_2027_PCT,
      partBIncrease: RETIREMENT_CONSTANTS.MEDICARE_PART_B.defaultIncrease2027,
      partBBasePremium: RETIREMENT_CONSTANTS.MEDICARE_PART_B.base2026,
      bucketPresetMode: 'standard',
      nestEgg: 380000,
      withdrawalRate: 4.4,
      expHousing: 1150,
      expGroceries: 520,
      expHealthcare: 430,
      expCarFun: 450,
      fraBenefit: 2150,
      lifeExpAge: 84,
      sideGigIncome: 22000,
      sideGigHourly: 25,
      mortBalance: 45000,
      mortRate: 3.2,
      hysaRate: 4.6,
      taxFilingStatus: 'single',
      filersAge65Plus: 1,
      taxPreTaxDraw: 16000,
      taxRothDraw: 4000,
      taxInterest: 2400,
      workerAgeGroup: '65',
      irmaa2025Income: 125000,
      irmaaRetiredEvent: 'yes',
      acaCurrentAge: 64,
      acaMagi: 38000,
    },
  },
  couple400k: {
    label: 'Couple (Age 62, $400K)',
    toast: 'Loaded Married Couple (Age 62, $400K Nest Egg) profile.',
    values: {
      ssYourCheck: 1940,
      ssSpouseCheck: 1160,
      colaPct: RETIREMENT_CONSTANTS.COLA_2027_PCT,
      partBIncrease: RETIREMENT_CONSTANTS.MEDICARE_PART_B.defaultIncrease2027,
      partBBasePremium: RETIREMENT_CONSTANTS.MEDICARE_PART_B.base2026,
      bucketPresetMode: 'standard',
      nestEgg: 400000,
      withdrawalRate: 4.5,
      expHousing: 1350,
      expGroceries: 750,
      expHealthcare: 650,
      expCarFun: 550,
      fraBenefit: 2200,
      lifeExpAge: 82,
      sideGigIncome: 30000,
      sideGigHourly: 25,
      mortBalance: 75000,
      mortRate: 3.5,
      hysaRate: 4.6,
      taxFilingStatus: 'married',
      filersAge65Plus: 0,
      taxPreTaxDraw: 24000,
      taxRothDraw: 4000,
      taxInterest: 3500,
      workerAgeGroup: '61',
      irmaa2025Income: 230000,
      irmaaRetiredEvent: 'yes',
      acaCurrentAge: 62,
      acaMagi: 52000,
    },
  },
  latesaver: {
    label: 'Late Saver (Age 59, $120K)',
    toast: 'Loaded Late Saver Catch-Up (Age 59, $120K Nest Egg) profile.',
    values: {
      ssYourCheck: 1850,
      ssSpouseCheck: 950,
      colaPct: RETIREMENT_CONSTANTS.COLA_2027_PCT,
      partBIncrease: RETIREMENT_CONSTANTS.MEDICARE_PART_B.defaultIncrease2027,
      partBBasePremium: RETIREMENT_CONSTANTS.MEDICARE_PART_B.base2026,
      bucketPresetMode: 'standard',
      nestEgg: 120000,
      withdrawalRate: 4.5,
      expHousing: 1100,
      expGroceries: 620,
      expHealthcare: 520,
      expCarFun: 400,
      fraBenefit: 1950,
      lifeExpAge: 83,
      sideGigIncome: 26500,
      sideGigHourly: 22,
      mortBalance: 62000,
      mortRate: 5.8,
      hysaRate: 4.5,
      taxFilingStatus: 'married',
      filersAge65Plus: 0,
      taxPreTaxDraw: 8000,
      taxRothDraw: 3000,
      taxInterest: 1200,
      workerAgeGroup: '61',
      irmaa2025Income: 95000,
      irmaaRetiredEvent: 'no',
      acaCurrentAge: 60,
      acaMagi: 44000,
    },
  },
};

export interface RetirementMetrics {
  // Tab 1
  numPeople: number;
  currentGrossSS: number;
  grossColaRaise: number;
  newGrossSS: number;
  partBBasePerPerson: number;
  baseMedicareCurrent: number;
  rawMedicareHike: number;
  totalMedicareHike: number;
  holdHarmlessProtected: boolean;
  newTotalMedicare: number;
  newNetSS: number;
  netRaise: number;
  bitePct: number;
  buyingPowerLoss: number;
  nestEgg: number;
  drawRate: number;
  annualPortDraw: number;
  monthlyPortDraw: number;
  monthlyExpenses: number;
  totalMonthlyPaycheck: number;
  monthlySurplus: number;
  annualTotalRetire: number;
  equivWorkingSalary: number;
  bucket1: number;
  bucket2: number;
  bucket3: number;
  yearsProtected: number;
  gogoSpend: number;
  slowgoSpend: number;
  nogoSpend: number;

  // Tab 2
  fra: number;
  targetAge: number;
  mo62: number;
  mo67: number;
  mo70: number;
  total62AtTarget: number;
  total67AtTarget: number;
  total70AtTarget: number;
  breakevenSeries: Array<{
    age: number;
    claim62: number;
    claim67: number;
    claim70: number;
  }>;
  sideGigLimit: number;
  sideGigFraYearLimit: number;
  sideGigExcess: number;
  sideGigPenalty: number;
  sideGigBuffer: number;
  safeHoursPerMonth: number;
  mortBal: number;
  mortRate: number;
  hysaRate: number;
  mortAnnualDiff: number;
  keepCashAdvantage: boolean;

  // Tab 3
  isMarried: boolean;
  filersAge65Plus: 0 | 1 | 2;
  preTaxDraw: number;
  rothDraw: number;
  interestInc: number;
  annualGrossSS: number;
  halfSS: number;
  combinedIncome: number;
  line50: number;
  line85: number;
  meterPct: number;
  taxZone: '0% Zone' | '50% Zone' | '85% Zone';
  taxableSS: number;
  shiftToRothNeeded: number;
  baseStandardDed: number;
  extraAge65Ded: number;
  obbbaSeniorDed: number;
  standardDed: number;
  bracket12Top: number;
  taxMagi: number;
  currentTaxable: number;
  rothSweetSpotRoom: number;
  base401kLimit: number;
  catchupLimit: number;
  total401kLimit: number;
  irmaaIncome: number;
  irmaa2026Limit: number;
  irmaaLimit: number;
  irmaaOverLimit: boolean;
  irmaaCanAppealWithSSA44: boolean;
  irmaaBuffer: number;
  acaAge: number;
  acaMagi: number;
  acaHouseholdSize: 1 | 2;
  acaFpl: number;
  acaCliff: number;
  acaFplRatioPct: number;
  acaOverCliff: boolean;
  acaDollarsOverCliff: number;
  acaApplicablePct: number;
  acaYearsToMedicare: number;
  acaEstimatedMonthlyPremium: number;

  // 2027 IRS Federal Saver's Match (SECURE 2.0 / IRC § 6433)
  saversContribution: number;
  saversContributingSpouses: 1 | 2;
  saversMaxEligibleContribution: number;
  saversMaxMatch: number;
  saversEligibleContribution: number;
  saversFilingStatus: SaversFilingStatus;
  saversAgi: number;
  saversMatchRatePct: number;
  saversMatchTierLabel: string;
  saversMatchDeposit: number;
  saversTotalAdded: number;
  saversThresholds: {
    start: number;
    end: number;
    fullMatchMaxAgi: number;
    phaseoutMaxAgi: number;
  };
}

export function formatUSD(n: number): string {
  const val = Number.isFinite(n) ? n : 0;
  return '$' + Math.round(val).toLocaleString('en-US');
}

export function calculateRetirementMetrics(inputs: RetirementInputs): RetirementMetrics {
  const ssYour = Math.max(0, Number(inputs.ssYourCheck) || 0);
  const ssSpouse = Math.max(0, Number(inputs.ssSpouseCheck) || 0);
  const colaPct = Math.max(0, Number(inputs.colaPct) || 0);
  const partBHikePerPerson = Math.max(0, Number(inputs.partBIncrease) || 0);
  const partBBasePerPerson =
    inputs.partBBasePremium !== undefined && inputs.partBBasePremium > 0
      ? Number(inputs.partBBasePremium)
      : RETIREMENT_CONSTANTS.MEDICARE_PART_B.base2026;
  const nestEgg = Math.max(0, Number(inputs.nestEgg) || 0);
  const drawRate = Math.max(0, Number(inputs.withdrawalRate) || 0);

  const expH = Math.max(0, Number(inputs.expHousing) || 0);
  const expG = Math.max(0, Number(inputs.expGroceries) || 0);
  const expM = Math.max(0, Number(inputs.expHealthcare) || 0);
  const expC = Math.max(0, Number(inputs.expCarFun) || 0);

  const numPeople = ssSpouse > 0 ? 2 : 1;
  const currentGrossSS = ssYour + ssSpouse;
  const grossColaRaise = currentGrossSS * (colaPct / 100);
  const newGrossSS = currentGrossSS + grossColaRaise;

  const baseMedicareCurrent = partBBasePerPerson * numPeople;
  const rawMedicareHike = partBHikePerPerson * numPeople;
  // Federal Hold Harmless rule (Social Security Act §1839(f)):
  // Medicare Part B dollar increase cannot exceed the dollar amount of the COLA raise
  const holdHarmlessProtected = currentGrossSS > 0 && rawMedicareHike > grossColaRaise;
  const totalMedicareHike =
    currentGrossSS > 0 ? Math.min(rawMedicareHike, grossColaRaise) : rawMedicareHike;
  const newTotalMedicare = baseMedicareCurrent + totalMedicareHike;
  const newNetSS = Math.max(0, newGrossSS - newTotalMedicare);
  const netRaise = Math.max(0, grossColaRaise - totalMedicareHike);
  const bitePct =
    grossColaRaise > 0
      ? Math.min(100, Math.round((totalMedicareHike / grossColaRaise) * 100))
      : 0;
  const buyingPowerLoss = Math.round(currentGrossSS * 0.14);

  const annualPortDraw = nestEgg * (drawRate / 100);
  const monthlyPortDraw = annualPortDraw / 12;
  const monthlyExpenses = expH + expG + expM + expC;
  const totalMonthlyPaycheck = newNetSS + monthlyPortDraw;
  const monthlySurplus = totalMonthlyPaycheck - monthlyExpenses;

  const annualTotalRetire = totalMonthlyPaycheck * 12;
  const equivWorkingSalary = Math.round(annualTotalRetire / 0.72);

  let bucket1 = Math.min(nestEgg, Math.round(annualPortDraw * 2));
  let remAfterB1 = Math.max(0, nestEgg - bucket1);
  let bucket2 = Math.min(remAfterB1, Math.round(annualPortDraw * 6));
  let bucket3 = Math.max(0, nestEgg - bucket1 - bucket2);

  if (inputs.bucketPresetMode === 'fixed40_160_200' && nestEgg === 400000) {
    bucket1 = 40000;
    bucket2 = 160000;
    bucket3 = 200000;
  }

  const yearsProtected =
    annualPortDraw > 0 ? Math.min(30, Math.round((bucket1 + bucket2) / annualPortDraw)) : 0;

  const gogoSpend = Math.round(monthlyExpenses);
  const slowgoSpend = Math.round(monthlyExpenses * 0.85);
  const nogoSpend = Math.round(monthlyExpenses * 0.95);

  // Tab 2: Claiming Age & Working Rules
  const fra = Math.max(0, Number(inputs.fraBenefit) || 0);
  const targetAge = Math.max(68, Math.min(95, Math.round(Number(inputs.lifeExpAge) || 82)));
  const mo62 = Math.round(fra * 0.7);
  const mo67 = Math.round(fra * 1.0);
  const mo70 = Math.round(fra * 1.24);

  const totalByAge = (claimAge: number, moAmt: number, age: number) =>
    age > claimAge ? (age - claimAge) * 12 * moAmt : 0;

  const total62AtTarget = totalByAge(62, mo62, targetAge);
  const total67AtTarget = totalByAge(67, mo67, targetAge);
  const total70AtTarget = totalByAge(70, mo70, targetAge);

  const ages = [62, 66, 70, 74, 78, 80, 82, 86, 90, 94];
  const breakevenSeries = ages.map((a) => ({
    age: a,
    claim62: totalByAge(62, mo62, a),
    claim67: totalByAge(67, mo67, a),
    claim70: totalByAge(70, mo70, a),
  }));

  // Official 2027 Social Security Retirement Earnings Test Limits
  const sideGigLimit = RETIREMENT_CONSTANTS.SSA_EARNINGS_TEST_2027.underFraAnnualLimit;
  const sideGigFraYearLimit = RETIREMENT_CONSTANTS.SSA_EARNINGS_TEST_2027.yearOfFraAnnualLimit;
  const sideGigPay = Math.max(0, Number(inputs.sideGigIncome) || 0);
  const sideGigHourly = Math.max(1, Number(inputs.sideGigHourly) || 25);
  const sideGigExcess = Math.max(0, sideGigPay - sideGigLimit);
  const sideGigPenalty = Math.round(sideGigExcess / 2);
  const sideGigBuffer = Math.max(0, sideGigLimit - sideGigPay);
  const safeHoursPerMonth = Math.floor(sideGigLimit / 12 / sideGigHourly);

  // Mortgage vs Cash
  const mortBal = Math.max(0, Number(inputs.mortBalance) || 0);
  const mortRate = Math.max(0, Number(inputs.mortRate) || 0);
  const hysaRate = Math.max(0, Number(inputs.hysaRate) || 0);
  const mortAnnualDiff = Math.round(mortBal * (Math.abs(hysaRate - mortRate) / 100));
  const keepCashAdvantage = hysaRate >= mortRate;

  // Tab 3: 1984 Ghost Tax, 2026 Tax Year Roth Sweet Spot, IRMAA & ACA Bridge
  const isMarried = inputs.taxFilingStatus === 'married';
  const rawFilers65 = Number(inputs.filersAge65Plus ?? 0);
  const filersAge65Plus = (
    isMarried
      ? Math.max(0, Math.min(2, Math.round(rawFilers65)))
      : Math.max(0, Math.min(1, Math.round(rawFilers65)))
  ) as 0 | 1 | 2;

  const preTaxDraw = Math.max(0, Number(inputs.taxPreTaxDraw) || 0);
  const rothDraw = Math.max(0, Number(inputs.taxRothDraw) || 0);
  const interestInc = Math.max(0, Number(inputs.taxInterest) || 0);

  const annualGrossSS = newGrossSS * 12;
  const halfSS = annualGrossSS * 0.5;
  const combinedIncome = halfSS + preTaxDraw + interestInc;

  const line50 = isMarried
    ? RETIREMENT_CONSTANTS.TAX_2026.ghostTax1984.married.line50
    : RETIREMENT_CONSTANTS.TAX_2026.ghostTax1984.single.line50;
  const line85 = isMarried
    ? RETIREMENT_CONSTANTS.TAX_2026.ghostTax1984.married.line85
    : RETIREMENT_CONSTANTS.TAX_2026.ghostTax1984.single.line85;
  const meterPct = Math.min(100, Math.max(6, Math.round((combinedIncome / (line85 * 1.35)) * 100)));

  let taxZone: '0% Zone' | '50% Zone' | '85% Zone' = '0% Zone';
  let taxableSS = 0;
  let shiftToRothNeeded = 0;

  if (combinedIncome <= line50) {
    taxZone = '0% Zone';
    taxableSS = 0;
    shiftToRothNeeded = 0;
  } else if (combinedIncome <= line85) {
    taxZone = '50% Zone';
    taxableSS = Math.min(0.5 * annualGrossSS, 0.5 * (combinedIncome - line50));
    shiftToRothNeeded = Math.round(combinedIncome - line50);
  } else {
    taxZone = '85% Zone';
    const tier1Max = 0.5 * (line85 - line50);
    taxableSS = Math.min(
      0.85 * annualGrossSS,
      tier1Max + 0.85 * (combinedIncome - line85)
    );
    shiftToRothNeeded = Math.round(combinedIncome - line85);
  }

  // FIX 5 — 2026 Tax Year Consistency (IRS Rev. Proc. 2025-32 + OBBBA senior deduction)
  const baseStandardDed = isMarried
    ? RETIREMENT_CONSTANTS.TAX_2026.standardDeduction.married
    : RETIREMENT_CONSTANTS.TAX_2026.standardDeduction.single;
  const extraAge65Ded = isMarried
    ? filersAge65Plus * RETIREMENT_CONSTANTS.TAX_2026.extraAge65Deduction.marriedPerSpouse
    : filersAge65Plus * RETIREMENT_CONSTANTS.TAX_2026.extraAge65Deduction.single;

  const taxMagi = preTaxDraw + interestInc + taxableSS;
  const obbbaPhaseoutStart = isMarried
    ? RETIREMENT_CONSTANTS.TAX_2026.obbbaSeniorDeduction.phaseoutStart.married
    : RETIREMENT_CONSTANTS.TAX_2026.obbbaSeniorDeduction.phaseoutStart.single;
  const tentativeObbbaSeniorDed =
    filersAge65Plus * RETIREMENT_CONSTANTS.TAX_2026.obbbaSeniorDeduction.perPerson;
  const obbbaPhaseoutReduction =
    RETIREMENT_CONSTANTS.TAX_2026.obbbaSeniorDeduction.phaseoutRate *
    Math.max(0, taxMagi - obbbaPhaseoutStart);
  const obbbaSeniorDed = Math.round(
    Math.max(0, tentativeObbbaSeniorDed - obbbaPhaseoutReduction)
  );

  const standardDed = baseStandardDed + extraAge65Ded + obbbaSeniorDed;
  const bracket12Top = isMarried
    ? RETIREMENT_CONSTANTS.TAX_2026.bracket12Top.married
    : RETIREMENT_CONSTANTS.TAX_2026.bracket12Top.single;
  const currentTaxable = Math.max(0, taxMagi - standardDed);
  const rothSweetSpotRoom = Math.max(0, Math.round(bracket12Top - currentTaxable));

  // Enacted 2026 IRS 401(k)/403(b) & SECURE 2.0 Super Catch-Up Limits
  const base401kLimit = RETIREMENT_CONSTANTS.SECURE_2_0_CATCHUP_2026.base401kLimit;
  const catchupLimit =
    inputs.workerAgeGroup === '61'
      ? RETIREMENT_CONSTANTS.SECURE_2_0_CATCHUP_2026.superCatchup60To63
      : RETIREMENT_CONSTANTS.SECURE_2_0_CATCHUP_2026.standardCatchup50Plus;
  const total401kLimit = base401kLimit + catchupLimit;

  // FIX 3 — IRMAA Thresholds (2026 official vs 2027 projected from 2025 MAGI)
  const irmaaIncome = Math.max(0, Number(inputs.irmaa2025Income) || 0);
  const irmaa2026Limit = isMarried
    ? RETIREMENT_CONSTANTS.IRMAA.year2026From2024Magi.married
    : RETIREMENT_CONSTANTS.IRMAA.year2026From2024Magi.single;
  const irmaaLimit = isMarried
    ? RETIREMENT_CONSTANTS.IRMAA.year2027ProjectedFrom2025Magi.married
    : RETIREMENT_CONSTANTS.IRMAA.year2027ProjectedFrom2025Magi.single;
  const irmaaOverLimit = irmaaIncome > irmaaLimit;
  const irmaaCanAppealWithSSA44 = irmaaOverLimit && inputs.irmaaRetiredEvent === 'yes';
  const irmaaBuffer = Math.max(0, irmaaLimit - irmaaIncome);

  // FIX 2 — Pre-Medicare ACA Bridge (2026 coverage year: 400% FPL cliff + IRS Rev. Proc. 2025-25 linear bands)
  const acaAge = Math.min(64, Math.max(55, Math.round(Number(inputs.acaCurrentAge) || 62)));
  const acaMagi = Math.max(0, Number(inputs.acaMagi) || 0);
  const acaHouseholdSize: 1 | 2 = isMarried ? 2 : 1;
  const acaFpl = isMarried
    ? RETIREMENT_CONSTANTS.ACA_2026.fpl2Person
    : RETIREMENT_CONSTANTS.ACA_2026.fpl1Person;
  const acaCliff = isMarried
    ? RETIREMENT_CONSTANTS.ACA_2026.cliff2Person
    : RETIREMENT_CONSTANTS.ACA_2026.cliff1Person;
  const acaFplRatioPct = acaFpl > 0 ? (acaMagi / acaFpl) * 100 : 0;
  const acaOverCliff = acaMagi > acaCliff;
  const acaDollarsOverCliff = acaOverCliff ? Math.round(acaMagi - acaCliff) : 0;

  let acaApplicablePct = 0;
  if (!acaOverCliff) {
    const bands = RETIREMENT_CONSTANTS.ACA_2026.revProc2025_25Bands;
    if (acaFplRatioPct <= 133) {
      acaApplicablePct = bands[0].startPct;
    } else if (acaFplRatioPct >= 300) {
      acaApplicablePct = bands[5].endPct;
    } else {
      for (const band of bands) {
        if (acaFplRatioPct >= band.minFplPct && acaFplRatioPct <= band.maxFplPct) {
          const span = band.maxFplPct - band.minFplPct;
          const t = span > 0 ? (acaFplRatioPct - band.minFplPct) / span : 0;
          acaApplicablePct = band.startPct + t * (band.endPct - band.startPct);
          break;
        }
      }
    }
    acaApplicablePct = Math.round(acaApplicablePct * 100) / 100;
  }

  const acaYearsToMedicare = Math.max(1, 65 - acaAge);
  const acaEstimatedMonthlyPremium = acaOverCliff
    ? 0
    : Math.round((acaMagi * (acaApplicablePct / 100)) / 12);

  // FIX 1 — 2027 IRS Federal Saver's Match (SECURE 2.0 Act § 103 / IRC § 6433) — Linear Phase-Out
  const saversContribution = Math.max(0, Number(inputs.saversContribution) || 0);
  const saversFilingStatus: SaversFilingStatus =
    inputs.saversFilingStatus === 'single' || inputs.saversFilingStatus === 'hoh'
      ? inputs.saversFilingStatus
      : 'married';
  const saversAgi = Math.max(0, Number(inputs.saversAgi) || 0);

  const saversContributingSpouses: 1 | 2 =
    saversFilingStatus === 'married' && inputs.saversContributingSpouses === 2 ? 2 : 1;
  const saversMaxEligibleContribution =
    RETIREMENT_CONSTANTS.SAVERS_MATCH_2027.maxContributionPerPerson * saversContributingSpouses;
  const saversMaxMatch =
    RETIREMENT_CONSTANTS.SAVERS_MATCH_2027.maxMatchPerPerson * saversContributingSpouses;
  const saversEligibleContribution = Math.min(saversContribution, saversMaxEligibleContribution);

  const phaseoutCfg = RETIREMENT_CONSTANTS.SAVERS_MATCH_2027.phaseout[saversFilingStatus];
  const saversThresholds = {
    start: phaseoutCfg.start,
    end: phaseoutCfg.end,
    fullMatchMaxAgi: phaseoutCfg.start,
    phaseoutMaxAgi: phaseoutCfg.end,
  };

  const rawSaversRatePct =
    saversAgi <= saversThresholds.start
      ? RETIREMENT_CONSTANTS.SAVERS_MATCH_2027.maxRatePct
      : saversAgi >= saversThresholds.end
      ? 0
      : RETIREMENT_CONSTANTS.SAVERS_MATCH_2027.maxRatePct *
        ((saversThresholds.end - saversAgi) / (saversThresholds.end - saversThresholds.start));

  const clampedSaversRatePct = Math.max(
    0,
    Math.min(RETIREMENT_CONSTANTS.SAVERS_MATCH_2027.maxRatePct, rawSaversRatePct)
  );
  const saversMatchRatePct = Math.round(clampedSaversRatePct * 100) / 100;

  let saversMatchTierLabel = '50% Full Federal Match';
  if (saversMatchRatePct >= 50) {
    saversMatchTierLabel = '50% Full Federal Match';
  } else if (saversMatchRatePct > 0) {
    const formattedRate = Number.isInteger(saversMatchRatePct)
      ? saversMatchRatePct.toFixed(0)
      : saversMatchRatePct.toFixed(1);
    saversMatchTierLabel = `${formattedRate}% Linear Phase-Out Match`;
  } else {
    saversMatchTierLabel = '0% Match (Above AGI Phase-Out Limit)';
  }

  const saversMatchDeposit = Math.round(saversEligibleContribution * (clampedSaversRatePct / 100));
  const saversTotalAdded = Math.round(saversContribution + saversMatchDeposit);

  return {
    numPeople,
    currentGrossSS,
    grossColaRaise,
    newGrossSS,
    partBBasePerPerson,
    baseMedicareCurrent,
    rawMedicareHike,
    totalMedicareHike,
    holdHarmlessProtected,
    newTotalMedicare,
    newNetSS,
    netRaise,
    bitePct,
    buyingPowerLoss,
    nestEgg,
    drawRate,
    annualPortDraw,
    monthlyPortDraw,
    monthlyExpenses,
    totalMonthlyPaycheck,
    monthlySurplus,
    annualTotalRetire,
    equivWorkingSalary,
    bucket1,
    bucket2,
    bucket3,
    yearsProtected,
    gogoSpend,
    slowgoSpend,
    nogoSpend,

    fra,
    targetAge,
    mo62,
    mo67,
    mo70,
    total62AtTarget,
    total67AtTarget,
    total70AtTarget,
    breakevenSeries,
    sideGigLimit,
    sideGigFraYearLimit,
    sideGigExcess,
    sideGigPenalty,
    sideGigBuffer,
    safeHoursPerMonth,
    mortBal,
    mortRate,
    hysaRate,
    mortAnnualDiff,
    keepCashAdvantage,

    isMarried,
    filersAge65Plus,
    preTaxDraw,
    rothDraw,
    interestInc,
    annualGrossSS,
    halfSS,
    combinedIncome,
    line50,
    line85,
    meterPct,
    taxZone,
    taxableSS,
    shiftToRothNeeded,
    baseStandardDed,
    extraAge65Ded,
    obbbaSeniorDed,
    standardDed,
    bracket12Top,
    taxMagi,
    currentTaxable,
    rothSweetSpotRoom,
    base401kLimit,
    catchupLimit,
    total401kLimit,
    irmaaIncome,
    irmaa2026Limit,
    irmaaLimit,
    irmaaOverLimit,
    irmaaCanAppealWithSSA44,
    irmaaBuffer,
    acaAge,
    acaMagi,
    acaHouseholdSize,
    acaFpl,
    acaCliff,
    acaFplRatioPct,
    acaOverCliff,
    acaDollarsOverCliff,
    acaApplicablePct,
    acaYearsToMedicare,
    acaEstimatedMonthlyPremium,

    saversContribution,
    saversContributingSpouses,
    saversMaxEligibleContribution,
    saversMaxMatch,
    saversEligibleContribution,
    saversFilingStatus,
    saversAgi,
    saversMatchRatePct,
    saversMatchTierLabel,
    saversMatchDeposit,
    saversTotalAdded,
    saversThresholds,
  };
}
