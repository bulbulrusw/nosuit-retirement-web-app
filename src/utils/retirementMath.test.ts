import test from 'node:test';
import assert from 'node:assert/strict';
import {
  DEFAULT_INPUTS,
  PRESET_PROFILES,
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

test('default couple400k profile computes accurate Net SS, 3-Bucket allocations, and paycheck', () => {
  const res = calculateRetirementMetrics(DEFAULT_INPUTS);

  // $1,940 + $1,160 = $3,100 gross SS
  assert.equal(res.currentGrossSS, 3100);
  // 3.6% COLA on $3,100 = $111.60 -> formatted +$112/mo
  assert.equal(formatUSD(res.grossColaRaise), '$112');
  // 2 people * $18 hike = $36/mo Medicare bite
  assert.equal(res.totalMedicareHike, 36);
  // Net SS = ($3,100 + $111.60) - ($405.80 + $36) = $2,769.80 -> $2,770/mo
  assert.equal(formatUSD(res.newNetSS), '$2,770');

  // $400,000 * 4.5% = $18,000/yr ($1,500/mo)
  assert.equal(res.monthlyPortDraw, 1500);
  // Bucket 1 (2 yrs) = $36,000, Bucket 2 (6 yrs) = $108,000, Bucket 3 = $256,000
  assert.equal(res.bucket1, 36000);
  assert.equal(res.bucket2, 108000);
  assert.equal(res.bucket3, 256000);
  assert.equal(res.yearsProtected, 8);
});

test('1984 Ghost Tax speedometer accurately identifies 85% and 0% zones ($25K/$34K Single, $32K/$44K Married)', () => {
  const resDefault = calculateRetirementMetrics(DEFAULT_INPUTS);
  assert.equal(resDefault.line50, 32000);
  assert.equal(resDefault.line85, 44000);
  assert.equal(resDefault.taxZone, '85% Zone');
  assert.equal(formatUSD(resDefault.combinedIncome), '$46,770');

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
  assert.equal(resLowTax.shiftToRothNeeded, 0);
});

test('side-gig $24,480 earnings penalty and safe hours calculation', () => {
  const resOver = calculateRetirementMetrics(DEFAULT_INPUTS);
  // $30,000 - $24,480 = $5,520 excess -> $2,760 penalty
  assert.equal(resOver.sideGigExcess, 5520);
  assert.equal(resOver.sideGigPenalty, 2760);
  assert.equal(resOver.safeHoursPerMonth, 81);

  const resUnder = calculateRetirementMetrics({
    ...DEFAULT_INPUTS,
    sideGigIncome: 20000,
  });
  assert.equal(resUnder.sideGigPenalty, 0);
  assert.equal(resUnder.sideGigBuffer, 4480);
});

test('claiming age break-even (70% at 62, 100% FRA at 67, 124% at 70), SECURE 2.0 $11,250 Super Catch-Up, and IRMAA SSA-44 appeal logic', () => {
  const res = calculateRetirementMetrics(DEFAULT_INPUTS);
  assert.equal(res.mo62, 1540); // 70% of $2,200
  assert.equal(res.mo67, 2200); // 100% FRA (67)
  assert.equal(res.mo70, 2728); // 124% of $2,200
  assert.equal(res.catchupLimit, 11250);
  assert.equal(res.total401kLimit, 35750);
  assert.equal(res.irmaaCanAppealWithSSA44, true);
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
  assert.equal(FEATURED_YOUTUBE_VIDEOS[0].calculatorPreset, 'couple400k');
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

test('Standalone HTML contains 3 featured videos, G-66NLH28JBQ, full 12-col calculator, and zero Adsterra or Owner Studio elements', () => {
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
  assert.ok(html.includes('https://www.googletagmanager.com/gtag/js?id=G-66NLH28JBQ'));
  assert.ok(html.includes("gtag('config', 'G-66NLH28JBQ');"));
  assert.ok(html.includes('https://youtu.be/XHIm3Q1OvK8'));
  assert.ok(html.includes('https://www.youtube.com/embed/XHIm3Q1OvK8'));
  assert.ok(html.includes('https://youtu.be/alUfXINV93Y'));
  assert.ok(html.includes('https://www.youtube.com/embed/alUfXINV93Y'));
  assert.ok(html.includes('Turning 60 in 2026? The $11,250'));

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
