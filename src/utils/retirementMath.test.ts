import test from 'node:test';
import assert from 'node:assert/strict';
import {
  DEFAULT_INPUTS,
  PRESET_PROFILES,
  QUICK_SCENARIO_PRESETS,
  calculateRetirementMetrics,
  formatUSD,
} from './retirementMath.ts';
import { RETIREMENT_CONSTANTS } from '../data/retirementConstants.ts';
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
import { buildFullStandaloneHtml } from './fullStandaloneTemplate';

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

  // Federal Hold Harmless rule caps totalMedicareHike at grossColaRaise so netRaise >= 0
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

  // $400,000 * 4.5% = $18,000/yr ($1,500/mo)
  assert.equal(res.monthlyPortDraw, 1500);
  assert.equal(res.bucket1, 36000);
  assert.equal(res.bucket2, 108000);
  assert.equal(res.bucket3, 256000);
  assert.equal(res.yearsProtected, 8);
});

test('Fix 5: 2026 Tax-Year Consistency in Ghost Tax / Roth Sweet Spot + Age 65+ Extra Deduction + OBBBA $6,000 Senior Deduction & Phaseout', () => {
  // Default couple400k has filersAge65Plus = 0 -> standardDed = $32,200, bracket12Top = $100,800
  const resDefault = calculateRetirementMetrics(DEFAULT_INPUTS);
  assert.equal(resDefault.baseStandardDed, 32200);
  assert.equal(resDefault.extraAge65Ded, 0);
  assert.equal(resDefault.obbbaSeniorDed, 0);
  assert.equal(resDefault.standardDed, 32200);
  assert.equal(resDefault.bracket12Top, 100800);
  assert.equal(resDefault.line50, 32000);
  assert.equal(resDefault.line85, 44000);
  assert.equal(resDefault.taxZone, '85% Zone');
  assert.equal(formatUSD(resDefault.combinedIncome), '$46,770');

  // Verify exact two-tier IRS Pub 915 formula when combinedIncome ($46,769.60) > line85 ($44,000)
  const expectedTaxableSS = 0.5 * (44000 - 32000) + 0.85 * (resDefault.combinedIncome - 44000);
  assert.ok(Math.abs(resDefault.taxableSS - expectedTaxableSS) < 0.01);
  assert.equal(
    Math.round(resDefault.currentTaxable),
    Math.round(resDefault.preTaxDraw + resDefault.interestInc + expectedTaxableSS - 32200)
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

  // Midpoint ($28,000 is halfway between $20,500 and $35,500): 25% rate -> $500 match
  const singleMid = calculateRetirementMetrics({
    ...DEFAULT_INPUTS,
    saversContribution: 2000,
    saversFilingStatus: 'single',
    saversAgi: 28000,
  });
  assert.equal(singleMid.saversMatchRatePct, 25);
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
    saversContribution: 4000,
    saversFilingStatus: 'married',
    saversContributingSpouses: 2,
    saversAgi: 41000,
  });
  assert.equal(married2Spouses.saversMaxEligibleContribution, 4000);
  assert.equal(married2Spouses.saversEligibleContribution, 4000);
  assert.equal(married2Spouses.saversMatchDeposit, 2000);
});

test('Fix 2 & Fix 3: ACA Bridge 2026 400% FPL Cliff (Rev. Proc. 2025-25) and IRMAA 2026/2027 Thresholds', () => {
  // Default: Married ($52,000 ACA MAGI, 2026 2-person FPL = $21,150, cliff = $84,600)
  // $52,000 / $21,150 = 245.86% FPL (in 200-250% band: 6.60% -> 8.44%)
  const resDefault = calculateRetirementMetrics(DEFAULT_INPUTS);
  assert.equal(resDefault.acaFpl, 21150);
  assert.equal(resDefault.acaCliff, 84600);
  assert.equal(resDefault.acaOverCliff, false);
  assert.equal(resDefault.acaDollarsOverCliff, 0);
  assert.ok(resDefault.acaApplicablePct > 8.2 && resDefault.acaApplicablePct < 8.3);
  assert.equal(resDefault.acaEstimatedMonthlyPremium, 359); // $52,000 * ~8.288% / 12 = $359/mo

  // Above 400% FPL cliff for Married ($90,000 vs $84,600 cliff -> $5,400 over cliff)
  const resOverCliffMarried = calculateRetirementMetrics({
    ...DEFAULT_INPUTS,
    acaMagi: 90000,
  });
  assert.equal(resOverCliffMarried.acaOverCliff, true);
  assert.equal(resOverCliffMarried.acaDollarsOverCliff, 5400);

  // Single household (1-person FPL = $15,650, cliff = $62,600)
  const resSingleAca = calculateRetirementMetrics({
    ...DEFAULT_INPUTS,
    taxFilingStatus: 'single',
    acaMagi: 70000,
  });
  assert.equal(resSingleAca.acaFpl, 15650);
  assert.equal(resSingleAca.acaCliff, 62600);
  assert.equal(resSingleAca.acaOverCliff, true);
  assert.equal(resSingleAca.acaDollarsOverCliff, 7400);

  // IRMAA thresholds: 2026 official ($218,000 married / $109,000 single) & 2027 projected ($224,000 married / $112,000 single)
  assert.equal(resDefault.irmaa2026Limit, 218000);
  assert.equal(resDefault.irmaaLimit, 224000);
  assert.equal(resSingleAca.irmaa2026Limit, 109000);
  assert.equal(resSingleAca.irmaaLimit, 112000);
});

test('Official 2027 side-gig $25,560/yr ($2,130/mo) earnings penalty, claiming ages, and SECURE 2.0 $11,250 Super Catch-Up', () => {
  const res = calculateRetirementMetrics(DEFAULT_INPUTS);
  assert.equal(res.sideGigLimit, 25560);
  assert.equal(res.sideGigFraYearLimit, 67920);
  assert.equal(res.sideGigExcess, 4440);
  assert.equal(res.sideGigPenalty, 2220);
  assert.equal(res.safeHoursPerMonth, 85);

  assert.equal(res.mo62, 1540);
  assert.equal(res.mo67, 2200);
  assert.equal(res.mo70, 2728);
  assert.equal(res.base401kLimit, 24500);
  assert.equal(res.catchupLimit, 11250);
  assert.equal(res.total401kLimit, 35750);
  assert.equal(res.irmaaCanAppealWithSSA44, true);
});

test('Fix 6 & Fix 7: Standalone HTML and AdSlots gate GA4 behind cookie consent, remove YOUR_GSC_CODE, and clear binder defaults', () => {
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

  const html = buildFullStandaloneHtml(DEFAULT_CHANNEL_CONFIG);
  assert.ok(html.includes("No-Suit Retirement — 2027 Social Security COLA, IRMAA &amp; Saver's Match Calculator"));
  // Verify YOUR_GSC_CODE placeholder is completely removed
  assert.equal(html.includes('YOUR_GSC_CODE'), false);
  // Verify Decline button and consent-gated GA4 loader are present in standalone HTML
  assert.ok(html.includes('id="declineCookiesBtn"'));
  assert.ok(html.includes("localStorage.getItem(COOKIE_CONSENT_KEY) === 'accepted'"));
  // Verify Part B input default is 6.60 (not 18) and 202.90
  assert.ok(html.includes('id="partBIncreaseInput" type="number" step="0.1" value="6.60"'));
  assert.equal(html.includes('id="partBIncreaseInput" type="number" step="0.1" value="18"'), false);
  // Verify neutral empty binder values with placeholders
  assert.ok(html.includes('id="locWill" type="text" value=""'));
  assert.ok(html.includes('id="loc401k" type="text" value=""'));
  assert.ok(html.includes('WATCH RETIREMENT MATH IN PLAIN ENGLISH'));
});
