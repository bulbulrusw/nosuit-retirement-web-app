import test from 'node:test';
import assert from 'node:assert/strict';
import {
  DEFAULT_INPUTS,
  PRESET_PROFILES,
  QUICK_SCENARIO_PRESETS,
  calculateRetirementMetrics,
  formatUSD,
} from './retirementMath.ts';
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

test('default couple400k profile computes accurate Net SS, Hold Harmless protection, 3-Bucket allocations, and paycheck', () => {
  const res = calculateRetirementMetrics(DEFAULT_INPUTS);

  // $1,940 + $1,160 = $3,100 gross SS
  assert.equal(res.currentGrossSS, 3100);
  // 3.6% COLA on $3,100 = $111.60 -> formatted +$112/mo
  assert.equal(formatUSD(res.grossColaRaise), '$112');
  // 2 people * $18 hike = $36/mo Medicare bite
  assert.equal(res.totalMedicareHike, 36);
  // Net SS = ($3,100 + $111.60) - ($405.80 + $36) = $2,769.80 -> $2,770/mo
  assert.equal(formatUSD(res.newNetSS), '$2,770');

  // Check 1: Federal Hold Harmless rule caps totalMedicareHike at grossColaRaise so netRaise >= 0
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
  // Bucket 1 (2 yrs) = $36,000, Bucket 2 (6 yrs) = $108,000, Bucket 3 = $256,000
  assert.equal(res.bucket1, 36000);
  assert.equal(res.bucket2, 108000);
  assert.equal(res.bucket3, 256000);
  assert.equal(res.yearsProtected, 8);
});

test('1984 Ghost Tax speedometer & IRS Pub 915 two-tier (50% / 85%) taxable SS formula', () => {
  const resDefault = calculateRetirementMetrics(DEFAULT_INPUTS);
  assert.equal(resDefault.line50, 32000);
  assert.equal(resDefault.line85, 44000);
  assert.equal(resDefault.taxZone, '85% Zone');
  assert.equal(formatUSD(resDefault.combinedIncome), '$46,770');

  // Check 4: Verify exact two-tier IRS Pub 915 formula when combinedIncome ($46,769.60) > line85 ($44,000)
  // 0.5 * ($44,000 - $32,000) = $6,000 + 0.85 * ($46,769.60 - $44,000) = $6,000 + $2,354.16 = $8,354.16
  const expectedTaxableSS = 0.5 * (44000 - 32000) + 0.85 * (resDefault.combinedIncome - 44000);
  assert.ok(Math.abs(resDefault.taxableSS - expectedTaxableSS) < 0.01);
  assert.equal(
    Math.round(resDefault.currentTaxable),
    Math.round(resDefault.preTaxDraw + resDefault.interestInc + expectedTaxableSS - 33200)
  );

  // Also verify 50% tier (between $32,000 and $44,000 Married)
  const resTier50 = calculateRetirementMetrics({
    ...DEFAULT_INPUTS,
    taxPreTaxDraw: 15000,
    taxInterest: 1000,
  });
  assert.equal(resTier50.taxZone, '50% Zone');
  const expectedTier50SS = Math.min(0.5 * resTier50.annualGrossSS, 0.5 * (resTier50.combinedIncome - 32000));
  assert.ok(Math.abs(resTier50.taxableSS - expectedTier50SS) < 0.01);

  const resSingle = calculateRetirementMetrics({
    ...DEFAULT_INPUTS,
    ...PRESET_PROFILES.single.values,
  });
  assert.equal(resSingle.line50, 25000);
  assert.equal(resSingle.line85, 34000);

  const resLowTax = calculateRetirementMetrics({
    ...DEFAULT_INPUTS,
    ...PRESET_PROFILES.latesaver.values,
  });
  assert.equal(resLowTax.taxZone, '0% Zone');
  assert.equal(resLowTax.taxableSS, 0);
  assert.equal(resLowTax.shiftToRothNeeded, 0);
});

test('Official 2027 side-gig $25,560/yr ($2,130/mo) earnings penalty and safe hours calculation', () => {
  const resOver = calculateRetirementMetrics(DEFAULT_INPUTS);
  assert.equal(resOver.sideGigLimit, 25560);
  assert.equal(resOver.sideGigFraYearLimit, 67920);
  // $30,000 - $25,560 = $4,440 excess -> $2,220 penalty
  assert.equal(resOver.sideGigExcess, 4440);
  assert.equal(resOver.sideGigPenalty, 2220);
  // $25,560 / 12 = $2,130/mo; $2,130 / $25/hr = 85.2 -> 85 safe hours/mo
  assert.equal(resOver.safeHoursPerMonth, 85);

  const resUnder = calculateRetirementMetrics({
    ...DEFAULT_INPUTS,
    sideGigIncome: 20000,
  });
  assert.equal(resUnder.sideGigPenalty, 0);
  assert.equal(resUnder.sideGigBuffer, 5560);
});

test('claiming age break-even (70% at 62, 100% FRA at 67, 124% at 70), SECURE 2.0 $11,250 Super Catch-Up, and IRMAA SSA-44 appeal logic', () => {
  const res = calculateRetirementMetrics(DEFAULT_INPUTS);
  assert.equal(res.mo62, 1540); // 70% of $2,200
  assert.equal(res.mo67, 2200); // 100% FRA (67)
  assert.equal(res.mo70, 2728); // 124% of $2,200
  assert.equal(res.base401kLimit, 24500);
  assert.equal(res.catchupLimit, 11250);
  assert.equal(res.total401kLimit, 35750);
  assert.equal(res.irmaaCanAppealWithSSA44, true);

  const resAge55 = calculateRetirementMetrics({
    ...DEFAULT_INPUTS,
    workerAgeGroup: '55',
  });
  assert.equal(resAge55.catchupLimit, 8000);
  assert.equal(resAge55.total401kLimit, 32500);
});

test('1-Touch Scenario Presets and 2027 IRS Saver\'s Match (50%, 20%, 10%, 0% phaseout tiers)', () => {
  // Preset 1: Average Senior ($2,000/mo SS Benefit, $185 Part B)
  const avgSeniorRes = calculateRetirementMetrics({
    ...DEFAULT_INPUTS,
    ...QUICK_SCENARIO_PRESETS.avgSenior.values,
  });
  assert.equal(avgSeniorRes.currentGrossSS, 2000);
  assert.equal(avgSeniorRes.baseMedicareCurrent, 185);
  assert.equal(Math.round(avgSeniorRes.grossColaRaise), 72); // 3.6% of $2,000 = $72

  // Preset 2: 3-Bucket Plan ($400,000 Nest Egg: $40K Cash, $160K Income, $200K Growth)
  const bucket400kRes = calculateRetirementMetrics({
    ...DEFAULT_INPUTS,
    ...QUICK_SCENARIO_PRESETS.bucket400k.values,
  });
  assert.equal(bucket400kRes.bucket1, 40000);
  assert.equal(bucket400kRes.bucket2, 160000);
  assert.equal(bucket400kRes.bucket3, 200000);

  // Preset 3: 2027 Saver's Match ($2,000 Saved = $1,000 Free Federal Match)
  const saversRes = calculateRetirementMetrics({
    ...DEFAULT_INPUTS,
    ...QUICK_SCENARIO_PRESETS.saversMatch2027.values,
  });
  assert.equal(saversRes.saversMatchRatePct, 50);
  assert.equal(saversRes.saversMatchDeposit, 1000);
  assert.equal(saversRes.saversTotalAdded, 3000);

  // Verify 20%, 10%, and 0% phaseout tiers for Single filer ($20,500 full / $35,500 phaseout)
  const single20 = calculateRetirementMetrics({
    ...DEFAULT_INPUTS,
    saversContribution: 2000,
    saversFilingStatus: 'single',
    saversAgi: 25000,
  });
  assert.equal(single20.saversMatchRatePct, 20);
  assert.equal(single20.saversMatchDeposit, 400);
  assert.equal(single20.saversTotalAdded, 2400);

  const single10 = calculateRetirementMetrics({
    ...DEFAULT_INPUTS,
    saversContribution: 2000,
    saversFilingStatus: 'single',
    saversAgi: 32000,
  });
  assert.equal(single10.saversMatchRatePct, 10);
  assert.equal(single10.saversMatchDeposit, 200);
  assert.equal(single10.saversTotalAdded, 2200);

  const single0 = calculateRetirementMetrics({
    ...DEFAULT_INPUTS,
    saversContribution: 2000,
    saversFilingStatus: 'single',
    saversAgi: 45000,
  });
  assert.equal(single0.saversMatchRatePct, 0);
  assert.equal(single0.saversMatchDeposit, 0);
  assert.equal(single0.saversTotalAdded, 2000);
});

test('3 Featured YouTube Videos and GA4 Measurement ID G-66NLH28JBQ are hardcoded with zero Adsterra ads or admin studio', () => {
  assert.equal(DEFAULT_CHANNEL_CONFIG.gaMeasurementId, 'G-66NLH28JBQ');
  assert.equal(DEFAULT_CHANNEL_CONFIG.gaMeasurementId, DEFAULT_GA_MEASUREMENT_ID);
  assert.equal(extractGaMeasurementId(''), 'G-66NLH28JBQ');
  assert.equal(extractGaMeasurementId('G-XXXXXXXXXX'), 'G-66NLH28JBQ');

  assert.equal(FEATURED_YOUTUBE_VIDEOS.length, 3);
  assert.equal(
    FEATURED_YOUTUBE_VIDEOS[0].title,
    'Why Your 2027 Social Security Raise Is Already Gone (Real Medicare Math)'
  );
  assert.equal(FEATURED_YOUTUBE_VIDEOS[0].videoUrl, 'https://youtu.be/XHIm3Q1OvK8');
  assert.equal(FEATURED_YOUTUBE_VIDEOS[0].embedUrl, 'https://www.youtube.com/embed/XHIm3Q1OvK8');
  assert.equal(FEATURED_YOUTUBE_VIDEOS[0].calculatorActionLabel, '📑 Load 2027 COLA Math (Tab 0)');
  assert.equal(FEATURED_YOUTUBE_VIDEOS[0].calculatorTab, 'tab-paycheck');

  assert.equal(
    FEATURED_YOUTUBE_VIDEOS[1].title,
    'How to Retire Comfortably at 62 With $400,000 and Social Security (Real Monthly Budget)'
  );
  assert.equal(FEATURED_YOUTUBE_VIDEOS[1].videoUrl, 'https://youtu.be/alUfXINV93Y');
  assert.equal(FEATURED_YOUTUBE_VIDEOS[1].embedUrl, 'https://www.youtube.com/embed/alUfXINV93Y');
  assert.equal(FEATURED_YOUTUBE_VIDEOS[1].calculatorPreset, 'couple400k');
  assert.equal(FEATURED_YOUTUBE_VIDEOS[1].calculatorTab, 'tab-paycheck');

  assert.equal(
    FEATURED_YOUTUBE_VIDEOS[2].title,
    'Turning 60 in 2026? The $11,250 "Super Catch-Up" Window Closing on Dec 31'
  );
  assert.equal(FEATURED_YOUTUBE_VIDEOS[2].videoUrl, 'https://www.youtube.com/@NoSuitRetirement');
  assert.equal(FEATURED_YOUTUBE_VIDEOS[2].isChannelLinkOnly, true);
  assert.equal(FEATURED_YOUTUBE_VIDEOS[2].calculatorTab, 'tab-taxshield');
  assert.equal(FEATURED_YOUTUBE_VIDEOS[2].workerAgeGroup, '61');
});

test('Standalone HTML contains 3 featured videos, G-66NLH28JBQ, Saver\'s Match, SEO guides, and zero Adsterra or Owner Studio elements', () => {
  assert.equal(COOKIE_CONSENT_STORAGE_KEY, 'nosuit_cookie_consent_v1');
  assert.equal(SITE_CANONICAL_URL, 'https://nosuitretirement.com/');

  const links = buildSpouseShareLinks({
    netSS: '$2,770',
    portDraw: '$1,500',
    totalPaycheck: '$4,270',
    bucket1: '$36,000',
  });

  assert.ok(links.facebookShareUrl.includes('facebook.com/sharer/sharer.php'));
  assert.ok(links.emailShareUrl.startsWith('mailto:?subject='));
  assert.ok(decodeURIComponent(links.emailShareUrl).includes('$2,770/mo'));
  assert.equal(links.copyUrl, 'https://nosuitretirement.com/');

  const html = buildFullStandaloneHtml(DEFAULT_CHANNEL_CONFIG);
  assert.ok(html.includes("No-Suit Retirement — 2027 Social Security COLA, IRMAA &amp; Saver's Match Calculator"));
  assert.ok(html.includes('https://www.googletagmanager.com/gtag/js?id=G-66NLH28JBQ'));
  assert.ok(html.includes("gtag('config', 'G-66NLH28JBQ');"));
  assert.ok(html.includes('https://youtu.be/XHIm3Q1OvK8'));
  assert.ok(html.includes('https://youtu.be/alUfXINV93Y'));
  assert.ok(html.includes('Turning 60 in 2026? The $11,250'));
  assert.ok(html.includes('https://www.irs.gov/credits-deductions/savers-match'));
  assert.ok(html.includes('https://www.ssa.gov/news/en/cola/factsheets/2027.html'));
  assert.ok(html.includes('https://www.ssa.gov/forms/ssa-44.pdf'));
  assert.ok(html.includes('loading="lazy" decoding="async"'));

  // Verify zero Adsterra scripts, ad containers, or Owner Studio elements
  assert.equal(html.includes('bauval.org'), false);
  assert.equal(html.includes('atOptions'), false);
  assert.equal(html.includes('adSlotTopBanner'), false);
  assert.equal(html.includes('adSlotSidebarRect'), false);
  assert.equal(html.includes('adSlotSidebarSky'), false);
  assert.equal(html.includes('adSlotInContent'), false);
  assert.equal(html.includes('rightAdSidebar'), false);
  assert.equal(html.includes('channelStudioModal'), false);
  assert.equal(html.includes('ownerPinModal'), false);
  assert.equal(html.includes('admin=nosuit'), false);
  assert.ok(html.includes('id="calculatorMainColumn" class="lg:col-span-12 space-y-6"'));
  assert.ok(html.includes('WATCH RETIREMENT MATH IN PLAIN ENGLISH'));
});

