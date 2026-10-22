import test from 'node:test';
import assert from 'node:assert/strict';
import {
  DEFAULT_INPUTS,
  PRESET_PROFILES,
  calculateRetirementMetrics,
  formatUSD,
} from './retirementMath.ts';
import {
  DEFAULT_AD_CONFIG,
  DEFAULT_CHANNEL_CONFIG,
  DEFAULT_GA_MEASUREMENT_ID,
  buildAtOptionsSrcDoc,
  extractGaMeasurementId,
  mergeWithDefaultAdConfig,
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

test('1984 Ghost Tax speedometer accurately identifies 85% and 0% zones', () => {
  const resDefault = calculateRetirementMetrics(DEFAULT_INPUTS);
  assert.equal(resDefault.taxZone, '85% Zone');
  assert.equal(formatUSD(resDefault.combinedIncome), '$46,770');

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

test('claiming age break-even and IRMAA SSA-44 appeal logic', () => {
  const res = calculateRetirementMetrics(DEFAULT_INPUTS);
  assert.equal(res.mo62, 1540);
  assert.equal(res.mo67, 2200);
  assert.equal(res.mo70, 2728);
  assert.equal(res.irmaaCanAppealWithSSA44, true);
});

test('all 4 Adsterra ad slots (#1, #2, #3, #4) and GA4 Measurement ID G-66NLH28JBQ are hardcoded by default', () => {
  assert.equal(DEFAULT_AD_CONFIG.gaMeasurementId, 'G-66NLH28JBQ');
  assert.equal(DEFAULT_AD_CONFIG.gaMeasurementId, DEFAULT_GA_MEASUREMENT_ID);
  assert.equal(extractGaMeasurementId(''), 'G-66NLH28JBQ');
  assert.equal(extractGaMeasurementId('G-XXXXXXXXXX'), 'G-66NLH28JBQ');
  assert.equal(extractGaMeasurementId('  g-66nlh28jbq '), 'G-66NLH28JBQ');
  assert.equal(
    extractGaMeasurementId('<script async src="https://www.googletagmanager.com/gtag/js?id=G-9988776655"></script>'),
    'G-9988776655'
  );

  assert.equal(DEFAULT_AD_CONFIG.topLeaderboardEnabled, true);
  assert.equal(DEFAULT_AD_CONFIG.sidebarRectEnabled, true);
  assert.equal(DEFAULT_AD_CONFIG.sidebarSkyscraperEnabled, true);
  assert.equal(DEFAULT_AD_CONFIG.inContentBannerEnabled, true);

  assert.ok(DEFAULT_AD_CONFIG.topLeaderboardCode.includes('689ae6c1012387fe1c48d819d275f89a'));
  assert.ok(DEFAULT_AD_CONFIG.sidebarRectCode.includes('a90397b0636ccb40a94c951a9b410e8f'));
  assert.ok(DEFAULT_AD_CONFIG.sidebarSkyscraperCode.includes('4caea752f3b7fb129968dc3c9995eb52'));
  assert.ok(DEFAULT_AD_CONFIG.inContentBannerCode.includes('0870404dd626af0ee07a6ff29938d63e'));
  assert.ok(DEFAULT_AD_CONFIG.inContentBannerCode.includes('https://bauval.org/22/0870404dd626af0ee07a6ff29938d63e'));

  assert.deepEqual(DEFAULT_CHANNEL_CONFIG, DEFAULT_AD_CONFIG);

  // Empty strings or placeholder G-XXXXXXXXXX in localStorage must fall back to hardcoded defaults
  const merged = mergeWithDefaultAdConfig({
    topLeaderboardCode: '   ',
    sidebarRectCode: '',
    sidebarSkyscraperCode: '',
    inContentBannerCode: '   ',
    gaMeasurementId: 'G-XXXXXXXXXX',
  });
  assert.equal(merged.inContentBannerEnabled, true);
  assert.equal(merged.gaMeasurementId, 'G-66NLH28JBQ');
  assert.ok(merged.topLeaderboardCode.includes('689ae6c1012387fe1c48d819d275f89a'));
  assert.ok(merged.sidebarRectCode.includes('a90397b0636ccb40a94c951a9b410e8f'));
  assert.ok(merged.sidebarSkyscraperCode.includes('4caea752f3b7fb129968dc3c9995eb52'));
  assert.ok(merged.inContentBannerCode.includes('0870404dd626af0ee07a6ff29938d63e'));

  const srcDoc = buildAtOptionsSrcDoc(DEFAULT_AD_CONFIG.sidebarRectCode);
  assert.ok(
    srcDoc.startsWith(
      '<!DOCTYPE html><html><body style="margin:0;padding:0;display:flex;justify-content:center;align-items:center;background:transparent;">'
    )
  );
  assert.ok(srcDoc.includes('a90397b0636ccb40a94c951a9b410e8f'));
});

test('Cookie Consent, Spouse Share Bar, Mobile Bottom Nav Bar, and G-66NLH28JBQ are properly built in standalone HTML without demo placeholders', () => {
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

  const html = buildFullStandaloneHtml(DEFAULT_AD_CONFIG);
  assert.ok(html.includes('https://www.googletagmanager.com/gtag/js?id=G-66NLH28JBQ'));
  assert.ok(html.includes("gtag('config', 'G-66NLH28JBQ');"));
  assert.ok(html.includes('id="container-689ae6c1012387fe1c48d819d275f89a"'));
  assert.equal(html.includes('Advertisement · Sponsored'), false);
  assert.ok(html.includes('id="cookieConsentBanner"'));
  assert.ok(html.includes('id="acceptCookiesBtn"'));
  assert.ok(html.includes('id="cookiePrivacyPolicyBtn"'));
  assert.ok(html.includes('nosuit_cookie_consent_v1'));

  assert.ok(html.includes('id="spouseShareBar"'));
  assert.ok(html.includes('id="shareFacebookBtn"'));
  assert.ok(html.includes('id="shareEmailSpouseBtn"'));
  assert.ok(html.includes('id="copyWebsiteLinkBtn"'));

  assert.ok(html.includes('id="mobileBottomNavBar"'));
  assert.ok(html.includes('id="mobileNavCalculatorBtn"'));
  assert.ok(html.includes('id="mobileNavVideosBtn"'));
  assert.ok(html.includes('id="mobileNavBinderBtn"'));
  assert.equal(html.includes('Get the $5 Printable Kitchen-Table Workbook (Gumroad)'), false);
  assert.equal(html.includes('id="gumroadCtaBtn"'), false);
  assert.ok(html.includes('WATCH RETIREMENT MATH IN PLAIN ENGLISH'));
});



