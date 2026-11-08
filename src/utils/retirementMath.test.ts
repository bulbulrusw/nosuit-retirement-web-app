import test from 'node:test';
import assert from 'node:assert/strict';
import {
  DEFAULT_INPUTS,
  PRESET_PROFILES,
  QUICK_SCENARIO_PRESETS,
  calculateRetirementMetrics,
  formatUSD,
} from './retirementMath.ts';
import { DATA_LAST_VERIFIED, RETIREMENT_CONSTANTS } from '../data/retirementConstants.ts';
import {
  DEFAULT_CHANNEL_CONFIG,
  DEFAULT_GA_MEASUREMENT_ID,
  FEATURED_YOUTUBE_VIDEOS,
  extractGaMeasurementId,
} from '../components/AdSlots';
import {
  COOKIE_CONSENT_STORAGE_KEY,
  SITE_CANONICAL_URL,
  buildSpouseShareLinks,
} from '../components/ConversionAndComplianceBars';

test('default couple400k profile computes accurate Net SS, Medicare Part B $202.90/$6.60 defaults, Hold Harmless protection, and 3-Bucket allocations', () => {
  const res = calculateRetirementMetrics(DEFAULT_INPUTS);

  // Verify shared constants for Medicare Part B
  assert.equal(RETIREMENT_CONSTANTS.MEDICARE_PART_B.base2026, 202.9);
  assert.equal(RETIREMENT_CONSTANTS.MEDICARE_PART_B.defaultIncrease2027, 6.6);
  assert.equal(DEFAULT_INPUTS.partBBasePremium, 202.9);
  assert.equal(DEFAULT_INPUTS.partBIncrease, 6.6);

  // $1,940 + $1,160 = $3,100 gross SS
  assert.equal(res.currentGrossSS, 3100);
  // 3.6% COLA on $3,100 = $111.60 -> formatted +$112/mo
  assert.equal(formatUSD(res.grossColaRaise), '$112');
  // 2 people * $6.60 hike = $13.20/mo Medicare bite
  assert.ok(Math.abs(res.totalMedicareHike - 13.2) < 0.001);
  // Net SS = ($3,100 + $111.60) - ($405.80 + $13.20) = $2,792.60 -> $2,793/mo
  assert.equal(formatUSD(res.newNetSS), '$2,793');
  // Net Raise = $111.60 - $13.20 = $98.40 -> $98/mo
  assert.equal(formatUSD(res.netRaise), '$98');

  // Federal Hold Harmless rule (Social Security Act § 1839(f)) caps Part B hike individually per beneficiary
  const resHoldHarmless = calculateRetirementMetrics({
    ...DEFAULT_INPUTS,
    ssYourCheck: 900,
    ssSpouseCheck: 0,
    colaPct: 2.0, // $18.00 gross COLA raise
    partBIncrease: 45, // $45.00 raw Part B hike exceeds $18.00 gross COLA raise
  });
  assert.equal(resHoldHarmless.grossColaRaise, 18);
  assert.equal(resHoldHarmless.rawMedicareHike, 45);
  assert.equal(resHoldHarmless.totalMedicareHike, 18);
  assert.equal(resHoldHarmless.netRaise, 0);

  // Individual-level Hold Harmless test for married couple with asymmetric benefits:
  // Primary: $2,500 * 3.6% = $90.00 COLA -> $6.60 Part B hike (not capped)
  // Spouse: $150 * 3.6% = $5.40 COLA -> $6.60 Part B hike capped individually at $5.40!
  // Total household Medicare hike = $6.60 + $5.40 = $12.00 (would have been $13.20 under aggregate pooling)
  const resIndividualHoldHarmless = calculateRetirementMetrics({
    ...DEFAULT_INPUTS,
    ssYourCheck: 2500,
    ssSpouseCheck: 150,
    colaPct: 3.6,
    partBIncrease: 6.6,
  });
  assert.ok(Math.abs(resIndividualHoldHarmless.primaryColaRaise - 90) < 0.001);
  assert.ok(Math.abs(resIndividualHoldHarmless.spouseColaRaise - 5.4) < 0.001);
  assert.ok(Math.abs(resIndividualHoldHarmless.primaryMedicareHike - 6.6) < 0.001);
  assert.ok(Math.abs(resIndividualHoldHarmless.spouseMedicareHike - 5.4) < 0.001);
  assert.ok(Math.abs(resIndividualHoldHarmless.totalMedicareHike - 12.0) < 0.001);
  assert.equal(resIndividualHoldHarmless.holdHarmlessProtected, true);

  // $400,000 * 4.5% = $18,000/yr ($1,500/mo)
  assert.equal(res.monthlyPortDraw, 1500);
  assert.equal(res.bucket1, 36000);
  assert.equal(res.bucket2, 108000);
  assert.equal(res.bucket3, 256000);
  assert.equal(res.yearsProtected, 8);
});

test('Fix 5 & Audit Item 3: 2026 Tax-Year Separation from 2027 COLA in Ghost Tax / Roth Sweet Spot + Age 65+ Extra Deduction + OBBBA $6,000 Senior Deduction & Phaseout', () => {
  // Default couple400k has filersAge65Plus = 2 (Age 66 couple per Fix 3) ->
  // baseStandardDed = $32,200, extraAge65Ded = $3,300, obbbaSeniorDed = $12,000, standardDed = $47,500, bracket12Top = $100,800
  // 2026 baseline SS = $3,100 * 12 = $37,200/yr (halfSS = $18,600)
  // combinedIncome = $18,600 + $24,000 + $3,500 = $46,100
  const resDefault = calculateRetirementMetrics(DEFAULT_INPUTS);
  assert.equal(resDefault.baseStandardDed, 32200);
  assert.equal(resDefault.extraAge65Ded, 3300);
  assert.equal(resDefault.obbbaSeniorDed, 12000);
  assert.equal(resDefault.standardDed, 47500);
  assert.equal(resDefault.bracket12Top, 100800);
  assert.equal(resDefault.line50, 32000);
  assert.equal(resDefault.line85, 44000);
  assert.equal(resDefault.taxZone, '85% Zone');
  assert.equal(resDefault.annualGrossSS, 37200);
  assert.equal(formatUSD(resDefault.combinedIncome), '$46,100');

  // Verify exact two-tier IRS Pub 915 formula when combinedIncome ($46,100) > line85 ($44,000)
  const expectedTaxableSS = 0.5 * (44000 - 32000) + 0.85 * (resDefault.combinedIncome - 44000);
  assert.ok(Math.abs(resDefault.taxableSS - expectedTaxableSS) < 0.01);
  assert.equal(
    Math.round(resDefault.currentTaxable),
    Math.max(0, Math.round(resDefault.preTaxDraw + resDefault.interestInc + expectedTaxableSS - 47500))
  );

  // Married couple with 2 filers age 65+ below $150,000 MAGI:
  // Base $32,200 + Extra 65+ (2 * $1,650 = $3,300) + OBBBA (2 * $6,000 = $12,000) = $47,500
  const resMarried2Seniors = calculateRetirementMetrics({
    ...DEFAULT_INPUTS,
    filersAge65Plus: 2,
  });
  assert.equal(resMarried2Seniors.baseStandardDed, 32200);
  assert.equal(resMarried2Seniors.extraAge65Ded, 3300);
  assert.equal(resMarried2Seniors.obbbaSeniorDed, 12000);
  assert.equal(resMarried2Seniors.standardDed, 47500);

  // Single filer age 65+ (1 filer) below $75,000 MAGI:
  // Base $16,100 + Extra 65+ ($2,050) + OBBBA ($6,000) = $24,150; 12% bracket top = $50,400
  const resSingleSenior = calculateRetirementMetrics({
    ...DEFAULT_INPUTS,
    ...PRESET_PROFILES.single.values,
    filersAge65Plus: 1,
  });
  assert.equal(resSingleSenior.baseStandardDed, 16100);
  assert.equal(resSingleSenior.extraAge65Ded, 2050);
  assert.equal(resSingleSenior.obbbaSeniorDed, 6000);
  assert.equal(resSingleSenior.standardDed, 24150);
  assert.equal(resSingleSenior.bracket12Top, 50400);

  // OBBBA 6% phase-out above $75,000 Single:
  // At $125,000 MAGI ($50,000 over $75,000), reduction = 6% * $50,000 = $3,000 -> OBBBA = $3,000
  const resSinglePhaseout = calculateRetirementMetrics({
    ...DEFAULT_INPUTS,
    taxFilingStatus: 'single',
    ssYourCheck: 0,
    ssSpouseCheck: 0,
    taxPreTaxDraw: 125000,
    taxInterest: 0,
    filersAge65Plus: 1,
  });
  assert.equal(resSinglePhaseout.obbbaSeniorDed, 3000);
  assert.equal(resSinglePhaseout.standardDed, 16100 + 2050 + 3000);

  // OBBBA 6% phase-out above $150,000 Married Filing Jointly (2 filers age 65+):
  // Tentative = 2 * $6,000 = $12,000. At $200,000 MAGI ($50,000 over $150,000),
  // reduction = 6% * $50,000 = $3,000 applied once -> OBBBA = $9,000 (not $6,000).
  const resMarriedPhaseout = calculateRetirementMetrics({
    ...DEFAULT_INPUTS,
    taxFilingStatus: 'married',
    ssYourCheck: 0,
    ssSpouseCheck: 0,
    taxPreTaxDraw: 200000,
    taxInterest: 0,
    filersAge65Plus: 2,
  });
  assert.equal(resMarriedPhaseout.obbbaSeniorDed, 9000);
  assert.equal(resMarriedPhaseout.standardDed, 32200 + 3300 + 9000);
});

test('Fix 1: 2027 IRS Saver\'s Match (IRC §6433) linear phase-out and 1 vs 2 contributing spouses', () => {
  // Preset 1: Average Senior ($2,000/mo SS Benefit, $202.90 Part B, $6.60 hike)
  const avgSeniorRes = calculateRetirementMetrics({
    ...DEFAULT_INPUTS,
    ...QUICK_SCENARIO_PRESETS.avgSenior.values,
  });
  assert.equal(avgSeniorRes.currentGrossSS, 2000);
  assert.equal(avgSeniorRes.baseMedicareCurrent, 202.9);
  assert.equal(avgSeniorRes.totalMedicareHike, 6.6);
  assert.equal(Math.round(avgSeniorRes.grossColaRaise), 72);

  // Single filer: $20,500 -> $35,500 linear phase-out
  // At or below $20,500: 50% rate -> $1,000 match on $2,000 contribution
  const singleFull = calculateRetirementMetrics({
    ...DEFAULT_INPUTS,
    saversContribution: 2000,
    saversFilingStatus: 'single',
    saversAgi: 20500,
  });
  assert.equal(singleFull.saversMatchRatePct, 50);
  assert.equal(singleFull.saversMatchDeposit, 1000);
  assert.equal(singleFull.saversTotalAdded, 3000);

  // UPGRADE 1: Statutory whole-percentage rounding per IRC § 6433(b)(2) & IRS Notice 2026-48:
  // Single filer with $21,000 MAGI -> reduction is floor(50 * 500 / 15000) = floor(1.6667) = 1%
  // -> Match rate is 49% ("49% Federal Match"), and $2,000 contribution yields $980 match deposit.
  const singleNotice2026_48 = calculateRetirementMetrics({
    ...DEFAULT_INPUTS,
    saversContribution: 2000,
    saversFilingStatus: 'single',
    saversAgi: 21000,
  });
  assert.equal(singleNotice2026_48.saversMatchRatePct, 49);
  assert.equal(singleNotice2026_48.saversMatchTierLabel, '49% Federal Match');
  assert.equal(singleNotice2026_48.saversMatchDeposit, 980);
  assert.equal(singleNotice2026_48.saversTotalAdded, 2980);

  // Midpoint ($28,000 is halfway between $20,500 and $35,500): 25% rate -> $500 match
  const singleMid = calculateRetirementMetrics({
    ...DEFAULT_INPUTS,
    saversContribution: 2000,
    saversFilingStatus: 'single',
    saversAgi: 28000,
  });
  assert.equal(singleMid.saversMatchRatePct, 25);
  assert.equal(singleMid.saversMatchTierLabel, '25% Federal Match');
  assert.equal(singleMid.saversMatchDeposit, 500);
  assert.equal(singleMid.saversTotalAdded, 2500);

  // At $25,000 for Single: 50% * (35,500 - 25,000) / 15,000 = 35% rate -> $700 match
  const single35 = calculateRetirementMetrics({
    ...DEFAULT_INPUTS,
    saversContribution: 2000,
    saversFilingStatus: 'single',
    saversAgi: 25000,
  });
  assert.equal(single35.saversMatchRatePct, 35);
  assert.equal(single35.saversMatchDeposit, 700);

  // At or above $35,500: 0% rate -> $0 match
  const singleEnd = calculateRetirementMetrics({
    ...DEFAULT_INPUTS,
    saversContribution: 2000,
    saversFilingStatus: 'single',
    saversAgi: 35500,
  });
  assert.equal(singleEnd.saversMatchRatePct, 0);
  assert.equal(singleEnd.saversMatchDeposit, 0);

  // Head of Household: $30,750 -> $53,250 linear phase-out (midpoint $42,000 -> 25%)
  const hohMid = calculateRetirementMetrics({
    ...DEFAULT_INPUTS,
    saversContribution: 2000,
    saversFilingStatus: 'hoh',
    saversAgi: 42000,
  });
  assert.equal(hohMid.saversThresholds.start, 30750);
  assert.equal(hohMid.saversThresholds.end, 53250);
  assert.equal(hohMid.saversMatchRatePct, 25);
  assert.equal(hohMid.saversMatchDeposit, 500);

  // Married Filing Jointly ($41,000 -> $71,000): 1 vs 2 contributing spouses
  const married1Spouse = calculateRetirementMetrics({
    ...DEFAULT_INPUTS,
    saversContribution: 4000,
    saversFilingStatus: 'married',
    saversContributingSpouses: 1,
    saversAgi: 41000,
  });
  assert.equal(married1Spouse.saversMaxEligibleContribution, 2000);
  assert.equal(married1Spouse.saversEligibleContribution, 2000);
  assert.equal(married1Spouse.saversMatchDeposit, 1000);

  const married2Spouses = calculateRetirementMetrics({
    ...DEFAULT_INPUTS,
    saversContribution: 2000,
    saversSpouseContribution: 2000,
    saversFilingStatus: 'married',
    saversContributingSpouses: 2,
    saversAgi: 41000,
  });
  assert.equal(married2Spouses.saversMaxEligibleContribution, 4000);
  assert.equal(married2Spouses.saversEligibleContribution, 4000);
  assert.equal(married2Spouses.saversMatchDeposit, 2000);
});

test('Upgrade 3, Upgrade 4 & Upgrade 5: Multi-Tier IRMAA (Tiers 1–6), Medicare Part D & Hold Harmless Status, and ACA 1–4 Person Household Sizes', () => {
  // Default: Married ($52,000 ACA MAGI, 2027 plan year / 2026 2-person FPL = $21,640, cliff = $86,560)
  const resDefault = calculateRetirementMetrics(DEFAULT_INPUTS);
  assert.equal(resDefault.acaHouseholdSize, 2);
  assert.equal(resDefault.acaFpl, 21640);
  assert.equal(resDefault.acaCliff, 86560);
  assert.equal(resDefault.acaOverCliff, false);
  assert.equal(resDefault.acaDollarsOverCliff, 0);
  assert.ok(resDefault.acaApplicablePct > 8.2 && resDefault.acaApplicablePct < 8.4);
  assert.equal(resDefault.acaEstimatedMonthlyPremium, 360);

  // Upgrade 5 & Fix 4: ACA 3-person and 4-person household sizes (2026 FPL: 3 = $27,320 / $109,280 cliff; 4 = $33,000 / $132,000 cliff)
  const resAca3 = calculateRetirementMetrics({
    ...DEFAULT_INPUTS,
    acaHouseholdSize: 3,
    acaMagi: 110000,
  });
  assert.equal(resAca3.acaHouseholdSize, 3);
  assert.equal(resAca3.acaFpl, 27320);
  assert.equal(resAca3.acaCliff, 109280);
  assert.equal(resAca3.acaOverCliff, true);
  assert.equal(resAca3.acaDollarsOverCliff, 720);

  const resAca4 = calculateRetirementMetrics({
    ...DEFAULT_INPUTS,
    acaHouseholdSize: 4,
    acaMagi: 120000,
  });
  assert.equal(resAca4.acaHouseholdSize, 4);
  assert.equal(resAca4.acaFpl, 33000);
  assert.equal(resAca4.acaCliff, 132000);
  assert.equal(resAca4.acaOverCliff, false);

  // Single household (1-person FPL = $15,960, cliff = $63,840)
  const resSingleAca = calculateRetirementMetrics({
    ...DEFAULT_INPUTS,
    taxFilingStatus: 'single',
    acaHouseholdSize: 1,
    acaMagi: 70000,
  });
  assert.equal(resSingleAca.acaFpl, 15960);
  assert.equal(resSingleAca.acaCliff, 63840);
  assert.equal(resSingleAca.acaOverCliff, true);
  assert.equal(resSingleAca.acaDollarsOverCliff, 6160);

  // Upgrade 3 & Fix 2: Confirmed 2026 CMS Multi-Tier IRMAA surcharges (Tiers 1–6, Part B + Part D per person)
  // Default couple400k has $230,000 MAGI (Married Tier 2: $218,001–$274,000 -> $1,148.40/person -> $2,296.80/yr couple)
  assert.equal(resDefault.irmaaTier, 2);
  assert.equal(resDefault.irmaaSurchargePerPerson, 1148.4);
  assert.equal(resDefault.irmaaAnnualSurcharge, 2296.8);
  assert.equal(resDefault.holdHarmlessProtectedStatus, '§ 1839(f) Not Applicable');

  // Tier 1 Married (<= $218,000): $0 surcharge & COLA Absorbs Hike (§ 1839(f) Eligible)
  const resTier1 = calculateRetirementMetrics({
    ...DEFAULT_INPUTS,
    irmaa2025Income: 180000,
  });
  assert.equal(resTier1.irmaaTier, 1);
  assert.equal(resTier1.irmaaAnnualSurcharge, 0);
  assert.equal(resTier1.holdHarmlessProtectedStatus, 'COLA Absorbs Hike (§ 1839(f) Eligible)');

  // Tier 3 Single ($137,001–$171,000): $2,884.80/yr ($240.40/mo)
  const resTier3Single = calculateRetirementMetrics({
    ...DEFAULT_INPUTS,
    taxFilingStatus: 'single',
    spouseOnMedicare: false,
    irmaa2025Income: 150000,
  });
  assert.equal(resTier3Single.irmaaTier, 3);
  assert.equal(resTier3Single.irmaaAnnualSurcharge, 2884.8);

  // Tier 4 Married ($342,001–$410,000): $4,620.00 * 2 = $9,240.00/yr ($385.00/mo/person)
  const resTier4Married = calculateRetirementMetrics({
    ...DEFAULT_INPUTS,
    taxFilingStatus: 'married',
    irmaa2025Income: 380000,
  });
  assert.equal(resTier4Married.irmaaTier, 4);
  assert.equal(resTier4Married.irmaaAnnualSurcharge, 9240);

  // Tier 5 Single ($205,001–<$500,000): $6,355.20/yr ($529.60/mo)
  const resTier5Single = calculateRetirementMetrics({
    ...DEFAULT_INPUTS,
    taxFilingStatus: 'single',
    spouseOnMedicare: false,
    irmaa2025Income: 300000,
  });
  assert.equal(resTier5Single.irmaaTier, 5);
  assert.equal(resTier5Single.irmaaAnnualSurcharge, 6355.2);

  // Tier 6 Married (>=$750,000): $6,936.00 * 2 = $13,872.00/yr ($578.00/mo/person)
  const resTier6Married = calculateRetirementMetrics({
    ...DEFAULT_INPUTS,
    taxFilingStatus: 'married',
    irmaa2025Income: 800000,
  });
  assert.equal(resTier6Married.irmaaTier, 6);
  assert.equal(resTier6Married.irmaaAnnualSurcharge, 13872);

  // Upgrade 4: Medicare Part D monthly premium deduction ($35/mo/person * 2 spouses = $70/mo deducted from Net SS)
  const resWithPartD = calculateRetirementMetrics({
    ...DEFAULT_INPUTS,
    partDMonthlyPremium: 35,
  });
  assert.equal(resWithPartD.totalPartDPremium, 70);
  assert.ok(Math.abs(resDefault.newNetSS - resWithPartD.newNetSS - 70) < 0.001);
});

test('Upgrade 2: Official 2027 side-gig $25,560/yr (1-for-2) vs FRA-year $67,920/yr (1-for-3) earnings test, dynamic FRA claiming ages, and SECURE 2.0 $11,250 Super Catch-Up', () => {
  // Default reachingFraThisYear = 'no' -> $25,560/yr limit, $1-for-$2 withholding
  const res = calculateRetirementMetrics(DEFAULT_INPUTS);
  assert.equal(res.reachingFraThisYear, 'no');
  assert.equal(res.sideGigLimit, 25560);
  assert.equal(res.sideGigMonthlyLimit, 2130);
  assert.equal(res.sideGigWithholdingDivisor, 2);
  assert.equal(res.sideGigFraYearLimit, 67920);
  assert.equal(res.sideGigExcess, 4440);
  assert.equal(res.sideGigPenalty, 2220);
  assert.equal(res.safeHoursPerMonth, 85);

  // Reaching FRA in 2027 ('yes'): $67,920/yr ($5,660/mo) limit, $1-for-$3 withholding
  // At $30,000 side-gig pay: $0 penalty and $37,920 buffer
  const resFraYearSafe = calculateRetirementMetrics({
    ...DEFAULT_INPUTS,
    reachingFraThisYear: 'yes',
    sideGigIncome: 30000,
    sideGigHourly: 25,
  });
  assert.equal(resFraYearSafe.reachingFraThisYear, 'yes');
  assert.equal(resFraYearSafe.sideGigLimit, 67920);
  assert.equal(resFraYearSafe.sideGigMonthlyLimit, 5660);
  assert.equal(resFraYearSafe.sideGigWithholdingDivisor, 3);
  assert.equal(resFraYearSafe.sideGigExcess, 0);
  assert.equal(resFraYearSafe.sideGigPenalty, 0);
  assert.equal(resFraYearSafe.sideGigBuffer, 37920);
  assert.equal(resFraYearSafe.safeHoursPerMonth, 226);

  // At $73,920 side-gig pay in FRA year: $6,000 over $67,920 -> $2,000 penalty ($1-for-$3)
  const resFraYearPenalty = calculateRetirementMetrics({
    ...DEFAULT_INPUTS,
    reachingFraThisYear: 'yes',
    sideGigIncome: 73920,
  });
  assert.equal(resFraYearPenalty.sideGigExcess, 6000);
  assert.equal(resFraYearPenalty.sideGigPenalty, 2000);

  // Default 1960+ cohort: FRA 67, 70% at 62, 124% at 70
  assert.equal(res.claimingBirthYear, '1960+');
  assert.equal(res.fraShortLabel, '67');
  assert.equal(res.mo62, 1540);
  assert.equal(res.mo67, 2200);
  assert.equal(res.mo70, 2728);

  // Born 1959 cohort: FRA 66 + 10 mos, 70.83% at 62 ($1,558), 125.33% at 70 ($2,757)
  const res1959 = calculateRetirementMetrics({
    ...DEFAULT_INPUTS,
    claimingBirthYear: '1959',
  });
  assert.equal(res1959.fraShortLabel, '66 + 10 mos');
  assert.equal(res1959.mo62, 1558);
  assert.equal(res1959.mo67, 2200);
  assert.equal(res1959.mo70, 2757);

  // Born 1957 cohort: FRA 66 + 6 mos, 72.5% at 62 ($1,595), 128% at 70 ($2,816)
  const res1957 = calculateRetirementMetrics({
    ...DEFAULT_INPUTS,
    claimingBirthYear: '1957',
  });
  assert.equal(res1957.fraShortLabel, '66 + 6 mos');
  assert.equal(res1957.mo62, 1595);
  assert.equal(res1957.mo70, 2816);

  // Default couple400k is Age 66 ('65' age 64+ group: $8,000 catch-up, $32,500 total)
  assert.equal(res.base401kLimit, 24500);
  assert.equal(res.catchupLimit, 8000);
  assert.equal(res.total401kLimit, 32500);
  assert.equal(res.irmaaCanAppealWithSSA44, true);

  // Age 60-63 ('61') SECURE 2.0 Super Catch-Up ($11,250 catch-up, $35,750 total)
  const resSuperCatchup = calculateRetirementMetrics({
    ...DEFAULT_INPUTS,
    workerAgeGroup: '61',
  });
  assert.equal(resSuperCatchup.catchupLimit, 11250);
  assert.equal(resSuperCatchup.total401kLimit, 35750);
});

test('Audit Fixes 1–7: Ghost Tax Tier-1 Cap, Confirmed 2026 IRMAA Boundaries, Medicare Realism, ACA 2027 Cliff, Roth Sweet Spot Torpedo Binary Search, Saver\'s Match Per-Spouse Cap, and TSCL 13.7% Buying Power & Hold Harmless Scope', () => {
  // FIX 1: Ghost tax tier-1 cap (single, SS $500/mo, pre-tax draw $32,000, interest $0 => taxableSS = 3850)
  // annualGrossSS = $6,000, halfSS = $3,000, combinedIncome = $35,000 (> $34,000 line85)
  // tier1Max = min(0.5 * 6000, 0.5 * (34000 - 25000)) = min(3000, 4500) = 3000
  // taxableSS = min(0.85 * 6000, 3000 + 0.85 * (35000 - 34000)) = min(5100, 3850) = 3850
  const fix1Res = calculateRetirementMetrics({
    ...DEFAULT_INPUTS,
    taxFilingStatus: 'single',
    ssYourCheck: 500,
    ssSpouseCheck: 0,
    taxPreTaxDraw: 32000,
    taxInterest: 0,
  });
  assert.equal(fix1Res.annualGrossSS, 6000);
  assert.equal(fix1Res.combinedIncome, 35000);
  assert.equal(fix1Res.taxableSS, 3850);

  // FIX 2: Confirmed 2026 CMS IRMAA boundaries (>= 500,000 single and >= 750,000 married in Tier 6)
  const fix2Single500k = calculateRetirementMetrics({
    ...DEFAULT_INPUTS,
    taxFilingStatus: 'single',
    spouseOnMedicare: false,
    irmaa2025Income: 500000,
  });
  assert.equal(fix2Single500k.irmaaTier, 6);
  assert.equal(fix2Single500k.irmaaSurchargePerPerson, 6936);
  assert.equal(fix2Single500k.irmaaAnnualSurcharge, 6936);

  const fix2Married750k = calculateRetirementMetrics({
    ...DEFAULT_INPUTS,
    taxFilingStatus: 'married',
    irmaa2025Income: 750000,
  });
  assert.equal(fix2Married750k.irmaaTier, 6);
  assert.equal(fix2Married750k.irmaaSurchargePerPerson, 6936);
  assert.equal(fix2Married750k.irmaaAnnualSurcharge, 13872);

  // FIX 3: Medicare realism on presets couple400k (Age 66) and latesaver (Age 59)
  assert.equal(PRESET_PROFILES.couple400k.label, 'Couple (Age 66, $400K)');
  assert.equal(PRESET_PROFILES.couple400k.values.filersAge65Plus, 2);
  assert.equal(PRESET_PROFILES.couple400k.values.workerAgeGroup, '65');
  assert.equal(PRESET_PROFILES.couple400k.values.acaCurrentAge, 64);

  const lateSaverRes = calculateRetirementMetrics({
    ...DEFAULT_INPUTS,
    ...PRESET_PROFILES.latesaver.values,
  });
  assert.equal(lateSaverRes.currentGrossSS, 0);
  assert.equal(lateSaverRes.baseMedicareCurrent, 0);
  assert.equal(lateSaverRes.totalMedicareHike, 0);
  assert.equal(lateSaverRes.holdHarmlessProtectedStatus, '§ 1839(f) Not Applicable');

  // FIX 4: ACA 2027 plan year (IRS Rev. Proc. 2026-26, 2026 FPL)
  // Single MAGI 63,840 => 10.22%, not over cliff; 63,841 => over cliff
  const fix4AtCliff = calculateRetirementMetrics({
    ...DEFAULT_INPUTS,
    taxFilingStatus: 'single',
    acaHouseholdSize: 1,
    acaMagi: 63840,
  });
  assert.equal(fix4AtCliff.acaOverCliff, false);
  assert.equal(fix4AtCliff.acaApplicablePct, 10.22);

  const fix4OverCliff = calculateRetirementMetrics({
    ...DEFAULT_INPUTS,
    taxFilingStatus: 'single',
    acaHouseholdSize: 1,
    acaMagi: 63841,
  });
  assert.equal(fix4OverCliff.acaOverCliff, true);
  assert.equal(fix4OverCliff.acaDollarsOverCliff, 1);

  // FIX 5: Roth sweet spot with tax torpedo binary search
  // Married, SS $2,000 + $1,500/mo ($42,000/yr), pre-tax draw $20,000, interest $2,000, both 65+:
  // Taxable income after converting rothSweetSpotRoom must be <= 100,800 (and +1 exceeds 100,800)
  const fix5Base = calculateRetirementMetrics({
    ...DEFAULT_INPUTS,
    taxFilingStatus: 'married',
    ssYourCheck: 2000,
    ssSpouseCheck: 1500,
    taxPreTaxDraw: 20000,
    taxInterest: 2000,
    filersAge65Plus: 2,
  });
  assert.ok(fix5Base.rothSweetSpotRoom > 0);
  const fix5AfterConversion = calculateRetirementMetrics({
    ...DEFAULT_INPUTS,
    taxFilingStatus: 'married',
    ssYourCheck: 2000,
    ssSpouseCheck: 1500,
    taxPreTaxDraw: 20000 + fix5Base.rothSweetSpotRoom,
    taxInterest: 2000,
    filersAge65Plus: 2,
  });
  assert.ok(
    fix5AfterConversion.currentTaxable <= 100800,
    `Expected taxable after converting ${fix5Base.rothSweetSpotRoom} to be <= 100800, got ${fix5AfterConversion.currentTaxable}`
  );
  const fix5AfterPlusOne = calculateRetirementMetrics({
    ...DEFAULT_INPUTS,
    taxFilingStatus: 'married',
    ssYourCheck: 2000,
    ssSpouseCheck: 1500,
    taxPreTaxDraw: 20000 + fix5Base.rothSweetSpotRoom + 1,
    taxInterest: 2000,
    filersAge65Plus: 2,
  });
  assert.ok(fix5AfterPlusOne.currentTaxable > 100800);

  // FIX 6: Saver's Match per-spouse cap (3,000 + 500 at full 50% rate => eligible 2,500, match 1,250)
  const fix6Res = calculateRetirementMetrics({
    ...DEFAULT_INPUTS,
    saversFilingStatus: 'married',
    saversContributingSpouses: 2,
    saversContribution: 3000,
    saversSpouseContribution: 500,
    saversAgi: 41000,
  });
  assert.equal(fix6Res.saversMatchRatePct, 50);
  assert.equal(fix6Res.saversEligibleContribution, 2500);
  assert.equal(fix6Res.saversMatchDeposit, 1250);
  assert.equal(fix6Res.saversTotalAdded, 4750);

  // FIX 7: Buying power citation (13.7% = 0.137) & Hold Harmless scope badge
  assert.equal(RETIREMENT_CONSTANTS.BUYING_POWER_LOSS_PCT_2016_2026, 0.137);
  assert.equal(fix5Base.buyingPowerLoss, Math.round(3500 * 0.137));

  const hhCapActive = calculateRetirementMetrics({
    ...DEFAULT_INPUTS,
    ssYourCheck: 150,
    ssSpouseCheck: 0,
    colaPct: 3.6, // $5.40 raise < $6.60 Part B hike
    partBIncrease: 6.6,
    irmaa2025Income: 80000,
  });
  assert.equal(hhCapActive.holdHarmlessProtected, true);
  assert.equal(hhCapActive.holdHarmlessProtectedStatus, '§ 1839(f) Cap Active');
});

test('Fix 6, Fix 7 & Upgrades 1–6: Standalone HTML and AdSlots synchronize all statutory formulas, inputs, disclaimers, and print/consent rules', () => {
  assert.equal(DEFAULT_CHANNEL_CONFIG.gaMeasurementId, 'G-66NLH28JBQ');
  assert.equal(DEFAULT_CHANNEL_CONFIG.gaMeasurementId, DEFAULT_GA_MEASUREMENT_ID);
  assert.equal(extractGaMeasurementId(''), 'G-66NLH28JBQ');
  assert.equal(extractGaMeasurementId('G-XXXXXXXXXX'), 'G-66NLH28JBQ');
  assert.equal('gscVerificationCode' in DEFAULT_CHANNEL_CONFIG, false);

  assert.equal(FEATURED_YOUTUBE_VIDEOS.length, 3);
  assert.equal(FEATURED_YOUTUBE_VIDEOS[0].calculatorActionLabel, '📑 Load 2027 COLA Math (Tab 0)');

  assert.equal(COOKIE_CONSENT_STORAGE_KEY, 'nosuit_cookie_consent_v1');
  assert.equal(SITE_CANONICAL_URL, 'https://nosuitretirement.com/');

  const links = buildSpouseShareLinks({
    netSS: '$2,793',
    portDraw: '$1,500',
    totalPaycheck: '$4,293',
    bucket1: '$36,000',
  });
  assert.ok(links.facebookShareUrl.includes('facebook.com/sharer/sharer.php'));
  assert.ok(decodeURIComponent(links.emailShareUrl).includes('$2,793/mo'));
});

test('Task 1 & Task 2: Medicare enrollment by toggle, IRMAA enrollee count multiplier, and DATA_LAST_VERIFIED freshness note', () => {
  // 1. Married, SS $1,900 + $1,500, both toggles false, Part D premium 0:
  //    baseMedicareCurrent = 0 and primaryNetSS + spouseNetSS = 3,400 x 1.036 = 3,522.40
  const resBothOff = calculateRetirementMetrics({
    ...DEFAULT_INPUTS,
    taxFilingStatus: 'married',
    ssYourCheck: 1900,
    ssSpouseCheck: 1500,
    primaryOnMedicare: false,
    spouseOnMedicare: false,
    partDMonthlyPremium: 0,
  });
  assert.equal(resBothOff.activeMedicareEnrollees, 0);
  assert.equal(resBothOff.baseMedicareCurrent, 0);
  assert.equal(resBothOff.totalMedicareHike, 0);
  assert.equal(resBothOff.totalPartDPremium, 0);
  assert.ok(Math.abs(resBothOff.primaryNetSS + resBothOff.spouseNetSS - 3522.4) < 0.001);
  assert.ok(Math.abs(resBothOff.newNetSS - 3522.4) < 0.001);
  assert.equal(resBothOff.irmaaAnnualSurcharge, 0);
  assert.equal(resBothOff.holdHarmlessProtectedStatus, '§ 1839(f) Not Applicable');

  // 2. Married, one enrollee: irmaaAnnualSurcharge equals 1 x the per-person amount
  const resOneEnrollee = calculateRetirementMetrics({
    ...DEFAULT_INPUTS,
    taxFilingStatus: 'married',
    primaryOnMedicare: true,
    spouseOnMedicare: false,
    irmaa2025Income: 230000, // Tier 2 married: $1,148.40 per person
  });
  assert.equal(resOneEnrollee.activeMedicareEnrollees, 1);
  assert.equal(resOneEnrollee.irmaaSurchargePerPerson, 1148.4);
  assert.equal(resOneEnrollee.irmaaAnnualSurcharge, 1148.4);
  assert.equal(resOneEnrollee.baseMedicareCurrent, 202.9);

  // 3. Both enrollees on: results unchanged from the current default results
  const resBothOn = calculateRetirementMetrics({
    ...DEFAULT_INPUTS,
    primaryOnMedicare: true,
    spouseOnMedicare: true,
  });
  assert.equal(resBothOn.activeMedicareEnrollees, 2);
  assert.equal(resBothOn.baseMedicareCurrent, 405.8);
  assert.equal(resBothOn.totalMedicareHike, 13.2);
  assert.equal(formatUSD(resBothOn.newNetSS), '$2,793');
  assert.equal(resBothOn.irmaaSurchargePerPerson, 1148.4);
  assert.equal(resBothOn.irmaaAnnualSurcharge, 2296.8);

  // 4. Presets and DATA_LAST_VERIFIED
  assert.equal(DEFAULT_INPUTS.primaryOnMedicare, true);
  assert.equal(DEFAULT_INPUTS.spouseOnMedicare, true);
  assert.equal(PRESET_PROFILES.couple400k.values.primaryOnMedicare, true);
  assert.equal(PRESET_PROFILES.couple400k.values.spouseOnMedicare, true);
  assert.equal(PRESET_PROFILES.single.values.primaryOnMedicare, true);
  assert.equal(PRESET_PROFILES.single.values.spouseOnMedicare, false);
  assert.equal(PRESET_PROFILES.latesaver.values.primaryOnMedicare, false);
  assert.equal(PRESET_PROFILES.latesaver.values.spouseOnMedicare, false);
  assert.ok(
    PRESET_PROFILES.latesaver.toast.includes(
      'Tab 1 shows $0 Social Security because benefits have not started yet at age 59.'
    )
  );
  assert.equal(DATA_LAST_VERIFIED, '2026-11-07');
  assert.equal(RETIREMENT_CONSTANTS.DATA_LAST_VERIFIED, '2026-11-07');
});
