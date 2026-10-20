import test from 'node:test';
import assert from 'node:assert/strict';
import {
  DEFAULT_INPUTS,
  PRESET_PROFILES,
  calculateRetirementMetrics,
  formatUSD,
} from './retirementMath.ts';

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
