export type FilingStatus = 'married' | 'single';
export type SaversFilingStatus = 'single' | 'married' | 'hoh';
export type PresetKey = 'single' | 'couple400k' | 'latesaver';
export type QuickScenarioKey = 'avgSenior' | 'bucket400k' | 'saversMatch2027';

export interface RetirementInputs {
  // Tool 1A: Social Security & Medicare
  ssYourCheck: number;
  ssSpouseCheck: number;
  colaPct: number;
  partBIncrease: number;
  partBBasePremium?: number;

  // Tool 1B: Nest Egg & Monthly Living Budget
  nestEgg: number;
  withdrawalRate: number;
  bucketPresetMode?: 'standard' | 'preset3bucket400k';
  expHousing: number;
  expGroceries: number;
  expHealthcare: number;
  expCarFun: number;

  // Tool 2: Claiming Age, Side-Gig & Mortgage
  fraBenefit: number;
  lifeExpAge: number;
  sideGigIncome: number;
  sideGigHourly: number;
  mortBalance: number;
  mortRate: number;
  hysaRate: number;

  // Tool 3: 1984 Ghost Tax, Roth, Catch-up, IRMAA, ACA Bridge
  taxFilingStatus: FilingStatus;
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
}

export const DEFAULT_INPUTS: RetirementInputs = {
  ssYourCheck: 1940,
  ssSpouseCheck: 1160,
  colaPct: 3.6,
  partBIncrease: 18,
  partBBasePremium: 202.9,
  nestEgg: 400000,
  withdrawalRate: 4.5,
  bucketPresetMode: 'standard',
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
};

export const QUICK_SCENARIO_PRESETS: Record<
  QuickScenarioKey,
  {
    id: QuickScenarioKey;
    label: string;
    toast: string;
    targetSectionId: string;
    values: Partial<RetirementInputs>;
  }
> = {
  avgSenior: {
    id: 'avgSenior',
    label: '👤 Average Senior ($2,000/mo SS Benefit, $185 Part B)',
    toast: 'Loaded Average Senior Scenario ($2,000/mo SS Benefit, $185 Part B, 3.6% Official 2027 COLA)',
    targetSectionId: 'tab-paycheck',
    values: {
      ssYourCheck: 2000,
      ssSpouseCheck: 0,
      colaPct: 3.6,
      partBBasePremium: 185,
      partBIncrease: 18,
      bucketPresetMode: 'standard',
    },
  },
  bucket400k: {
    id: 'bucket400k',
    label: '💼 3-Bucket Plan ($400,000 Nest Egg: $40K Cash, $160K Income, $200K Growth)',
    toast: 'Loaded $400,000 3-Bucket Plan: $40K Cash, $160K Income, $200K Growth',
    targetSectionId: 'tab-paycheck',
    values: {
      nestEgg: 400000,
      withdrawalRate: 4.5,
      bucketPresetMode: 'preset3bucket400k',
    },
  },
  saversMatch2027: {
    id: 'saversMatch2027',
    label: "🎁 2027 Saver's Match ($2,000 Saved = $1,000 Free Federal Match)",
    toast: "Loaded 2027 Federal Saver's Match: $2,000 Saved + $1,000 Free Government Match ($3,000 Total)",
    targetSectionId: 'saversMatchSection',
    values: {
      saversContribution: 2000,
      saversFilingStatus: 'married',
      saversAgi: 38000,
    },
  },
};

export const PRESET_PROFILES: Record<PresetKey, { label: string; toast: string; values: Partial<RetirementInputs> }> = {
  single: {
    label: 'Single (Age 66, $380K)',
    toast: 'Loaded Single Retiree Profile (Age 66, $380K Nest Egg)',
    values: {
      ssYourCheck: 2050,
      ssSpouseCheck: 0,
      partBBasePremium: 202.9,
      nestEgg: 380000,
      withdrawalRate: 4.4,
      bucketPresetMode: 'standard',
      expHousing: 1150,
      expGroceries: 520,
      expHealthcare: 420,
      expCarFun: 450,
      taxFilingStatus: 'single',
      taxPreTaxDraw: 16000,
      irmaa2025Income: 118000,
    },
  },
  couple400k: {
    label: 'Couple (Age 62, $400K)',
    toast: 'Loaded Married Couple Profile (Age 62, $400K Nest Egg)',
    values: {
      ssYourCheck: 1940,
      ssSpouseCheck: 1160,
      partBBasePremium: 202.9,
      nestEgg: 400000,
      withdrawalRate: 4.5,
      bucketPresetMode: 'standard',
      expHousing: 1350,
      expGroceries: 750,
      expHealthcare: 650,
      expCarFun: 550,
      taxFilingStatus: 'married',
      taxPreTaxDraw: 24000,
      irmaa2025Income: 230000,
    },
  },
  latesaver: {
    label: 'Late Saver (Age 59, $120K)',
    toast: 'Loaded Late Saver Recovery Plan ($120K Nest Egg)',
    values: {
      ssYourCheck: 1780,
      ssSpouseCheck: 950,
      partBBasePremium: 202.9,
      nestEgg: 120000,
      withdrawalRate: 4.0,
      bucketPresetMode: 'standard',
      expHousing: 980,
      expGroceries: 600,
      expHealthcare: 480,
      expCarFun: 350,
      taxFilingStatus: 'married',
      taxPreTaxDraw: 6000,
      irmaa2025Income: 88000,
    },
  },
};

export function formatUSD(num: number): string {
  const safe = Number.isFinite(num) ? num : 0;
  return '$' + Math.round(safe).toLocaleString('en-US');
}

export function calculateRetirementMetrics(inputs: RetirementInputs) {
  const ssYou = Math.max(0, Number(inputs.ssYourCheck) || 0);
  const ssSpouse = Math.max(0, Number(inputs.ssSpouseCheck) || 0);
  const colaPct = Number(inputs.colaPct) || 0;
  const partBHike = Math.max(0, Number(inputs.partBIncrease) || 0);
  const partBBase = inputs.partBBasePremium !== undefined ? Math.max(0, Number(inputs.partBBasePremium)) : 202.9;

  const householdPeople = ssSpouse > 0 ? 2 : 1;
  const currentGrossSS = ssYou + ssSpouse;
  const grossColaRaise = currentGrossSS * (colaPct / 100);
  const newGrossSS = currentGrossSS + grossColaRaise;
  const rawMedicareHike = partBHike * householdPeople;
  const totalMedicareHike = currentGrossSS > 0 ? Math.min(rawMedicareHike, grossColaRaise) : rawMedicareHike;
  const netRaise = Math.max(0, grossColaRaise - totalMedicareHike);
  const standardPartBTotal = partBBase * householdPeople;
  const newNetSS = Math.max(0, newGrossSS - (standardPartBTotal + totalMedicareHike));
  const bitePct = grossColaRaise > 0 ? Math.min(100, Math.round((totalMedicareHike / grossColaRaise) * 100)) : 0;
  const buyingPowerLoss = currentGrossSS * 0.14;

  // Nest Egg & Buckets
  const nestEgg = Math.max(0, Number(inputs.nestEgg) || 0);
  const drawRate = Math.max(0, Number(inputs.withdrawalRate) || 0);
  const annualPortDraw = nestEgg * (drawRate / 100);
  const monthlyPortDraw = annualPortDraw / 12;

  const totalCoreExp =
    Math.max(0, Number(inputs.expHousing) || 0) +
    Math.max(0, Number(inputs.expGroceries) || 0) +
    Math.max(0, Number(inputs.expHealthcare) || 0) +
    Math.max(0, Number(inputs.expCarFun) || 0);

  const totalMonthlyPaycheck = newNetSS + monthlyPortDraw;
  const monthlySurplus = totalMonthlyPaycheck - totalCoreExp;
  const annualTotalRetire = totalMonthlyPaycheck * 12;
  const equivWorkingSalary = annualTotalRetire / 0.72;

  const isPreset3Bucket = inputs.bucketPresetMode === 'preset3bucket400k';
  const bucket1 = isPreset3Bucket ? Math.round(nestEgg * 0.1) : Math.min(nestEgg, annualPortDraw * 2);
  const bucket2 = isPreset3Bucket
    ? Math.round(nestEgg * 0.4)
    : Math.min(Math.max(0, nestEgg - bucket1), annualPortDraw * 6);
  const bucket3 = Math.max(0, nestEgg - bucket1 - bucket2);
  const yearsProtected = annualPortDraw > 0 ? Math.round((bucket1 + bucket2) / annualPortDraw) : 8;

  const gogoSpend = totalCoreExp;
  const slowgoSpend = Math.round(totalCoreExp * 0.85);
  const nogoSpend = Math.round(totalCoreExp * 0.95);

  // Claiming Age Break-Even
  const fraBenefit = Math.max(0, Number(inputs.fraBenefit) || 0);
  const targetAge = Math.min(95, Math.max(68, Math.round(Number(inputs.lifeExpAge) || 82)));
  const mo62 = fraBenefit * 0.7;
  const mo67 = fraBenefit;
  const mo70 = fraBenefit * 1.24;
  const total62AtTarget = Math.max(0, targetAge - 62) * 12 * mo62;
  const total67AtTarget = Math.max(0, targetAge - 67) * 12 * mo67;
  const total70AtTarget = Math.max(0, targetAge - 70) * 12 * mo70;

  const breakevenAges = [62, 65, 67, 70, 75, 79, 83, 87, 90];
  const breakevenSeries = breakevenAges.map((age) => ({
    age,
    claim62: Math.round(Math.max(0, age - 62) * 12 * mo62),
    claim67: Math.round(Math.max(0, age - 67) * 12 * mo67),
    claim70: Math.round(Math.max(0, age - 70) * 12 * mo70),
  }));

  // Official 2027 Side-Gig Earnings Test ($25,560/yr limit under FRA; $67,920/yr in year reaching FRA 67)
  const sideGigLimit = 25560;
  const sideGigFraYearLimit = 67920;
  const sideGigEarned = Math.max(0, Number(inputs.sideGigIncome) || 0);
  const hourlyWage = Math.max(1, Number(inputs.sideGigHourly) || 25);
  const safeHoursPerMonth = Math.floor(sideGigLimit / 12 / hourlyWage);
  const sideGigExcess = Math.max(0, sideGigEarned - sideGigLimit);
  const sideGigPenalty = sideGigExcess / 2;
  const sideGigBuffer = Math.max(0, sideGigLimit - sideGigEarned);

  // Mortgage vs Safe Cash Yield
  const mortBalance = Math.max(0, Number(inputs.mortBalance) || 0);
  const mortRate = Number(inputs.mortRate) || 0;
  const hysaRate = Number(inputs.hysaRate) || 0;
  const keepCashAdvantage = hysaRate >= mortRate;
  const mortAnnualDiff = Math.abs(mortBalance * ((hysaRate - mortRate) / 100));

  // 1984 Ghost Tax & Roth Sweet Spot (IRS Pub 915 Two-Tier 50% / 85% Formula)
  const preTaxDraw = Math.max(0, Number(inputs.taxPreTaxDraw) || 0);
  const rothDraw = Math.max(0, Number(inputs.taxRothDraw) || 0);
  const interestInc = Math.max(0, Number(inputs.taxInterest) || 0);
  const annualGrossSS = newGrossSS * 12;
  const combinedIncome = preTaxDraw + interestInc + 0.5 * annualGrossSS;

  const line50 = inputs.taxFilingStatus === 'married' ? 32000 : 25000;
  const line85 = inputs.taxFilingStatus === 'married' ? 44000 : 34000;
  const meterPct = Math.min(100, Math.max(8, Math.round((combinedIncome / (line85 * 1.25)) * 100)));

  let taxZone: '0% Zone' | '50% Zone' | '85% Zone' = '0% Zone';
  let shiftToRothNeeded = 0;
  if (combinedIncome <= line50) {
    taxZone = '0% Zone';
    shiftToRothNeeded = 0;
  } else if (combinedIncome <= line85) {
    taxZone = '50% Zone';
    shiftToRothNeeded = combinedIncome - line50;
  } else {
    taxZone = '85% Zone';
    shiftToRothNeeded = combinedIncome - line85;
  }

  const standardDed = inputs.taxFilingStatus === 'married' ? 33200 : 16600;
  const bracket12Top = inputs.taxFilingStatus === 'married' ? 96950 : 48475;
  let taxableSS = 0;
  if (combinedIncome > line85) {
    taxableSS = Math.min(
      0.85 * annualGrossSS,
      0.85 * (combinedIncome - line85) + Math.min(0.5 * annualGrossSS, 0.5 * (line85 - line50))
    );
  } else if (combinedIncome > line50) {
    taxableSS = Math.min(0.5 * annualGrossSS, 0.5 * (combinedIncome - line50));
  }
  const currentTaxable = Math.max(0, preTaxDraw + interestInc + taxableSS - standardDed);
  const rothSweetSpotRoom = Math.max(0, bracket12Top - currentTaxable);

  // SECURE 2.0 Catch-Up Limits (2026-2027)
  const base401kLimit = 24500;
  const catchupLimit = inputs.workerAgeGroup === '61' ? 11250 : 8000;
  const total401kLimit = base401kLimit + catchupLimit;

  // IRMAA Appeal Checker
  const irmaaIncome = Math.max(0, Number(inputs.irmaa2025Income) || 0);
  const irmaaLimit = inputs.taxFilingStatus === 'married' ? 212000 : 106000;
  const irmaaOverLimit = irmaaIncome > irmaaLimit;
  const irmaaCanAppealWithSSA44 = irmaaOverLimit && inputs.irmaaRetiredEvent === 'yes';
  const irmaaBuffer = Math.max(0, irmaaLimit - irmaaIncome);

  // ACA Healthcare Bridge
  const acaAge = Math.min(64, Math.max(55, Math.round(Number(inputs.acaCurrentAge) || 62)));
  const acaYearsToMedicare = Math.max(0, 65 - acaAge);
  const acaMagi = Math.max(0, Number(inputs.acaMagi) || 0);
  const acaEstimatedMonthlyPremium = (acaMagi * 0.068) / 12;

  // 2027 IRS Federal Saver's Match (SECURE 2.0 / IRC § 6433)
  const saversContribution = Math.max(0, Number(inputs.saversContribution) || 0);
  const saversEligibleContribution = Math.min(2000, saversContribution);
  const saversFilingStatus: SaversFilingStatus = inputs.saversFilingStatus || 'married';
  const saversAgi = Math.max(0, Number(inputs.saversAgi) || 0);

  const saversThresholds =
    saversFilingStatus === 'married'
      ? { tier50: 41000, tier20: 55000, tier10: 71000 }
      : saversFilingStatus === 'hoh'
      ? { tier50: 30750, tier20: 41250, tier10: 53250 }
      : { tier50: 20500, tier20: 27500, tier10: 35500 };

  let saversMatchRatePct: 50 | 20 | 10 | 0 = 50;
  let saversMatchTierLabel = '50% Full Federal Match';
  if (saversAgi <= saversThresholds.tier50) {
    saversMatchRatePct = 50;
    saversMatchTierLabel = '50% Full Federal Match';
  } else if (saversAgi <= saversThresholds.tier20) {
    saversMatchRatePct = 20;
    saversMatchTierLabel = '20% Phaseout Match Tier';
  } else if (saversAgi <= saversThresholds.tier10) {
    saversMatchRatePct = 10;
    saversMatchTierLabel = '10% Phaseout Match Tier';
  } else {
    saversMatchRatePct = 0;
    saversMatchTierLabel = '0% Phaseout (Above Income Limit)';
  }

  const saversMatchDeposit = Math.round(saversEligibleContribution * (saversMatchRatePct / 100));
  const saversTotalAdded = Math.round(saversContribution + saversMatchDeposit);

  return {
    householdPeople,
    partBBase,
    standardPartBTotal,
    baseMedicareCurrent: standardPartBTotal,
    currentGrossSS,
    grossColaRaise,
    newGrossSS,
    rawMedicareHike,
    totalMedicareHike,
    netRaise,
    newNetSS,
    bitePct,
    buyingPowerLoss,
    nestEgg,
    drawRate,
    annualPortDraw,
    monthlyPortDraw,
    totalCoreExp,
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
    fraBenefit,
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
    sideGigEarned,
    hourlyWage,
    safeHoursPerMonth,
    sideGigExcess,
    sideGigPenalty,
    sideGigBuffer,
    mortBalance,
    mortRate,
    hysaRate,
    keepCashAdvantage,
    mortAnnualDiff,
    preTaxDraw,
    rothDraw,
    interestInc,
    annualGrossSS,
    combinedIncome,
    line50,
    line85,
    meterPct,
    taxZone,
    shiftToRothNeeded,
    taxableSS,
    currentTaxable,
    rothSweetSpotRoom,
    base401kLimit,
    catchupLimit,
    total401kLimit,
    irmaaIncome,
    irmaaLimit,
    irmaaOverLimit,
    irmaaCanAppealWithSSA44,
    irmaaBuffer,
    acaAge,
    acaYearsToMedicare,
    acaMagi,
    acaEstimatedMonthlyPremium,
    saversContribution,
    saversEligibleContribution,
    saversFilingStatus,
    saversAgi,
    saversThresholds,
    saversMatchRatePct,
    saversMatchTierLabel,
    saversMatchDeposit,
    saversTotalAdded,
  };
}
