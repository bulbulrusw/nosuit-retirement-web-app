import React from 'react';
import {
  QUICK_SCENARIO_PRESETS,
  QuickScenarioKey,
  SaversFilingStatus,
  formatUSD,
} from '../utils/retirementMath';
import { trackGa4Event } from './AdSlots';

interface QuickScenarioBarProps {
  activeQuickScenario: QuickScenarioKey | null;
  onSelectQuickScenario: (key: QuickScenarioKey) => void;
}

export const QuickScenarioBar: React.FC<QuickScenarioBarProps> = ({
  activeQuickScenario,
  onSelectQuickScenario,
}) => {
  const keys: QuickScenarioKey[] = ['avgSenior', 'bucket400k', 'saversMatch2027'];

  return (
    <section
      id="quickScenarioPresetsBar"
      aria-label="1-Touch Retirement Scenario Presets"
      className="no-print bg-white rounded-2xl p-4 md:p-5 border-2 border-[#b07d4b] shadow-sm space-y-3"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-emerald-950 bg-emerald-100 px-2.5 py-0.5 rounded-md border border-emerald-300">
            ⚡ 1-Touch Quick-Start Scenarios
          </span>
          <h2 className="text-sm md:text-base font-extrabold text-slate-900 mt-1">
            Click Any Real U.S. Retirement Scenario Below to Auto-Populate the Math:
          </h2>
        </div>
        <span className="text-xs font-semibold text-slate-600">
          Instant 1-Click Calculation · 100% Private
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
        {keys.map((key) => {
          const item = QUICK_SCENARIO_PRESETS[key];
          const isActive = activeQuickScenario === key;
          const btnId =
            key === 'avgSenior'
              ? 'presetAvgSeniorBtn'
              : key === 'bucket400k'
              ? 'preset3BucketBtn'
              : 'presetSaversMatchBtn';

          return (
            <button
              key={key}
              id={btnId}
              type="button"
              data-quick-scenario={key}
              onClick={() => onSelectQuickScenario(key)}
              className={`quick-scenario-btn text-left p-3.5 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                isActive
                  ? 'bg-[#1b4332] text-white border-amber-400 shadow-md'
                  : 'bg-[#f8f5ec] hover:bg-amber-50/90 text-slate-900 border-[#c5b9a5] hover:border-[#b07d4b]'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <span
                  className={`text-xs sm:text-sm font-extrabold leading-snug ${
                    isActive ? 'text-amber-300' : 'text-slate-900'
                  }`}
                >
                  {item.label}
                </span>
                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded shrink-0 ${
                    isActive
                      ? 'bg-amber-400 text-slate-950'
                      : 'bg-emerald-900 text-amber-200'
                  }`}
                >
                  {isActive ? 'Active' : 'Load →'}
                </span>
              </div>
              <p
                className={`text-[11px] leading-relaxed ${
                  isActive ? 'text-emerald-100' : 'text-slate-600'
                }`}
              >
                {item.shortDesc}
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
};

interface SaversMatchSectionProps {
  saversContribution: number;
  saversFilingStatus: SaversFilingStatus;
  saversAgi: number;
  saversContributingSpouses: 1 | 2;
  saversMaxEligibleContribution: number;
  saversMaxMatch: number;
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
  onChangeContribution: (val: number) => void;
  onChangeFilingStatus: (status: SaversFilingStatus) => void;
  onChangeAgi: (val: number) => void;
  onChangeContributingSpouses: (spouses: 1 | 2) => void;
}

export const SaversMatchCalculatorSection: React.FC<SaversMatchSectionProps> = ({
  saversContribution,
  saversFilingStatus,
  saversAgi,
  saversContributingSpouses,
  saversMaxEligibleContribution,
  saversMaxMatch,
  saversMatchRatePct,
  saversMatchTierLabel,
  saversMatchDeposit,
  saversTotalAdded,
  saversThresholds,
  onChangeContribution,
  onChangeFilingStatus,
  onChangeAgi,
  onChangeContributingSpouses,
}) => {
  const formattedRatePct = Number.isInteger(saversMatchRatePct)
    ? saversMatchRatePct.toFixed(0)
    : saversMatchRatePct.toFixed(1);

  return (
    <section
      id="saversMatchSection"
      aria-label="2027 Federal Saver's Match Calculator"
      className="surface-card rounded-2xl p-5 md:p-6 border-2 border-[#b07d4b] shadow-sm space-y-5"
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b-2 border-[#b07d4b]/40 pb-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-emerald-950 bg-amber-200/80 px-3 py-1 rounded-lg border border-amber-400">
            <span>🎁 SECURE 2.0 Act (IRC § 6433) · Effective Tax Year 2027</span>
          </div>
          <h2 className="text-lg md:text-2xl font-extrabold text-slate-900">
            2027 Federal Saver&apos;s Match Calculator (Up to $1,000/Person or $2,000/Couple Match)
          </h2>
          <p className="text-xs md:text-sm text-slate-700 max-w-4xl leading-relaxed">
            Starting in 2027 under the <strong>SECURE 2.0 Act (IRC § 6433)</strong>, the old non-refundable Saver&apos;s Credit is replaced by the <strong>Federal Saver&apos;s Match</strong>—a direct <strong>up to 50% federal matching contribution</strong> on up to <strong>$2,000 saved per person</strong> ($1,000 max match per person; $4,000 cap / $2,000 max match for 2 contributing spouses) deposited into a pre-tax Traditional IRA or 401(k).
          </p>
        </div>

        <a
          href="https://www.irs.gov/credits-deductions/savers-match"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            trackGa4Event('outbound_authority_click', {
              event_category: 'seo_authority_link',
              authority_name: 'IRS Official Savers Match Guide',
              link_url: 'https://www.irs.gov/credits-deductions/savers-match',
            })
          }
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1b4332] hover:bg-emerald-900 text-amber-300 font-extrabold text-xs border border-amber-400/50 shadow-xs transition-colors shrink-0 self-start lg:self-center"
        >
          <span>🏛️ Official IRS Saver&apos;s Match Guide (IRS.gov) →</span>
        </a>
      </div>

      {/* Interactive Inputs & Live Result Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Left 6 cols: Inputs */}
        <div className="lg:col-span-6 bg-[#f8f5ec] rounded-xl p-4 md:p-5 border border-[#c5b9a5] space-y-4">
          <div className="text-xs font-extrabold uppercase tracking-wider text-emerald-950 border-b border-[#d5cbb8] pb-2">
            Step 1 · Enter Your 2027 Contribution &amp; Income
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="saversContributionInput" className="block text-xs font-bold text-slate-800">
                Annual Retirement Contribution ($)
              </label>
              <input
                id="saversContributionInput"
                type="number"
                min="0"
                step="250"
                value={saversContribution}
                onChange={(e) => onChangeContribution(parseFloat(e.target.value) || 0)}
                className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white focus:border-[#1b4332] focus:outline-none px-3.5 py-2 font-bold font-num text-sm text-slate-900"
              />
              <span className="block text-[11px] text-slate-600 mt-1">
                Eligible cap: <strong className="font-num">{formatUSD(saversMaxEligibleContribution)}/yr</strong> ($2,000 per contributing person).
              </span>
            </div>

            <div>
              <label htmlFor="saversFilingStatus" className="block text-xs font-bold text-slate-800">
                Tax Filing Status
              </label>
              <select
                id="saversFilingStatus"
                value={saversFilingStatus}
                onChange={(e) => onChangeFilingStatus(e.target.value as SaversFilingStatus)}
                className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white focus:border-[#1b4332] focus:outline-none px-3 py-2 font-bold text-sm text-slate-900"
              >
                <option value="single">Single / MFS ($20,500 → $35,500 AGI)</option>
                <option value="married">Married Filing Jointly ($41,000 → $71,000 AGI)</option>
                <option value="hoh">Head of Household ($30,750 → $53,250 AGI)</option>
              </select>
            </div>
          </div>

          {saversFilingStatus === 'married' && (
            <div>
              <label htmlFor="saversContributingSpouses" className="block text-xs font-bold text-slate-800">
                Contributing Spouses (Married Filing Jointly)
              </label>
              <select
                id="saversContributingSpouses"
                value={saversContributingSpouses}
                onChange={(e) =>
                  onChangeContributingSpouses(Number(e.target.value) === 2 ? 2 : 1)
                }
                className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white focus:border-[#1b4332] focus:outline-none px-3 py-2 font-bold text-sm text-slate-900"
              >
                <option value={1}>1 Contributing Spouse ($2,000 cap · up to $1,000 match)</option>
                <option value={2}>2 Contributing Spouses ($4,000 total cap · up to $2,000 match)</option>
              </select>
            </div>
          )}

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="saversAgiInput" className="block text-xs font-bold text-slate-800">
                Estimated Modified Adjusted Gross Income (AGI) ($/yr)
              </label>
              <span className="text-xs font-extrabold text-emerald-900 font-num">
                {formatUSD(saversAgi)}/yr
              </span>
            </div>
            <input
              id="saversAgiInput"
              type="number"
              min="0"
              step="1000"
              value={saversAgi}
              onChange={(e) => onChangeAgi(parseFloat(e.target.value) || 0)}
              className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white focus:border-[#1b4332] focus:outline-none px-3.5 py-2 font-bold font-num text-sm text-slate-900"
            />
          </div>

          {/* IRC §6433 Linear Phase-Out Reference Box */}
          <div className="bg-white rounded-xl p-3.5 border border-slate-200 text-xs space-y-1.5">
            <div className="font-extrabold text-slate-900">
              2027 IRS Linear Phase-Out Thresholds ({saversFilingStatus === 'married' ? 'Married Filing Jointly' : saversFilingStatus === 'hoh' ? 'Head of Household' : 'Single / MFS'}):
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-num">
              <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-200">
                <span className="block text-[10px] font-bold uppercase text-emerald-900">Full 50% Match</span>
                <span className="font-extrabold text-slate-900">Up to {formatUSD(saversThresholds.start)}</span>
              </div>
              <div className="p-2 rounded-lg bg-amber-50 border border-amber-200">
                <span className="block text-[10px] font-bold uppercase text-amber-900">Linear Phase-Out (50% → 0%)</span>
                <span className="font-extrabold text-slate-900">
                  {formatUSD(saversThresholds.start)} – {formatUSD(saversThresholds.end)}
                </span>
              </div>
              <div className="p-2 rounded-lg bg-slate-100 border border-slate-300">
                <span className="block text-[10px] font-bold uppercase text-slate-700">0% Phased Out</span>
                <span className="font-extrabold text-slate-900">At or Above {formatUSD(saversThresholds.end)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right 6 cols: Chalkboard Output */}
        <div className="lg:col-span-6 chalkboard-bg rounded-xl p-4 md:p-5 text-white flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-400/30 pb-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                Step 2 · Your 2027 Federal Match Deposit (Estimate)
              </span>
              <span
                id="saversTierBadge"
                className="px-2.5 py-0.5 rounded-md bg-amber-400 text-slate-950 font-extrabold text-xs font-num"
              >
                {saversMatchTierLabel}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="chalk-card rounded-xl p-3.5">
                <div className="text-[11px] font-bold uppercase text-amber-200">
                  Federal Match Rate
                </div>
                <div
                  id="saversMatchRateResult"
                  className="text-2xl font-extrabold text-amber-300 mt-1 font-num"
                >
                  {formattedRatePct}%
                </div>
                <p className="text-[11px] text-emerald-100 mt-1">
                  Linear phase-out (max 50%)
                </p>
              </div>

              <div className="chalk-card rounded-xl p-3.5">
                <div className="text-[11px] font-bold uppercase text-emerald-200">
                  Gov&apos;t Match Deposit
                </div>
                <div
                  id="saversMatchDepositResult"
                  className="text-2xl font-extrabold text-white mt-1 font-num"
                >
                  +{formatUSD(saversMatchDeposit)}
                </div>
                <p className="text-[11px] text-emerald-100 mt-1">
                  Max {formatUSD(saversMaxMatch)} ({saversContributingSpouses === 2 ? '2 spouses' : '1 person'})
                </p>
              </div>

              <div className="chalk-card rounded-xl p-3.5">
                <div className="text-[11px] font-bold uppercase text-sky-200">
                  Total Added to Retirement
                </div>
                <div
                  id="saversTotalAddedResult"
                  className="text-2xl font-extrabold text-amber-300 mt-1 font-num"
                >
                  {formatUSD(saversTotalAdded)}
                </div>
                <p className="text-[11px] text-emerald-100 mt-1">
                  Your {formatUSD(saversContribution)} + {formatUSD(saversMatchDeposit)} Match
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#0f291e] rounded-xl p-3.5 border border-amber-400/30 text-xs text-emerald-100 leading-relaxed space-y-1.5">
            <div>
              <strong className="text-amber-300">Important IRC § 6433 Eligibility &amp; Tax Rules:</strong>
            </div>
            <ul className="list-disc list-inside space-y-1 text-[11px] text-emerald-100">
              <li>
                <strong>Pre-Tax Account Deposit:</strong> The federal match is deposited directly into a <strong>pre-tax Traditional IRA or 401(k)</strong> and is <strong>taxed at withdrawal</strong> (it cannot be deposited into a Roth account).
              </li>
              <li>
                <strong>Earned Income Required:</strong> Contributing to an IRA or 401(k) requires taxable <strong>earned income</strong> (wages or net self-employment), so many fully retired seniors who only collect Social Security, pensions, or investment income cannot qualify unless they or a spouse work part-time.
              </li>
              <li>
                <strong>Age &amp; Student Rules:</strong> You must be <strong>age 18+</strong>, <strong>not a full-time student</strong>, and <strong>not claimed as a dependent</strong> on another taxpayer&apos;s return.
              </li>
              <li>
                <strong>Rounding Note (Estimate):</strong> Linear formula: <code className="font-mono text-amber-200">rate = 50% × (end − AGI) / (end − start)</code>. Results are estimates; IRS statutory rounding may differ by about 1 percentage point.
              </li>
            </ul>
            <div className="pt-1 flex flex-wrap items-center justify-between gap-2 text-[11px] text-amber-200 border-t border-amber-400/20">
              <span>Statutory Reference: IRC § 6433 (SECURE 2.0 Act § 103)</span>
              <a
                href="https://www.irs.gov/credits-deductions/savers-match"
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-bold text-amber-300 hover:text-white"
              >
                Verify at IRS.gov/credits-deductions/savers-match →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const HighIntentSeoGuidesSection: React.FC = () => {
  return (
    <section
      id="seoRetirementGuidesSection"
      aria-label="2027 Official Retirement Step-by-Step Guides"
      className="space-y-4"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        {/* Guide 1: 2027 Social Security COLA & Medicare Part B Hold Harmless Guide */}
        <article
          id="guideColaHoldHarmlessCard"
          className="surface-card rounded-2xl p-5 md:p-6 border-2 border-[#b07d4b] shadow-sm flex flex-col justify-between space-y-4"
        >
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
              <span className="px-2.5 py-1 rounded-md bg-emerald-900 text-amber-300 font-extrabold text-xs uppercase tracking-wider">
                Official SSA Guide #1 · 2027 COLA &amp; Medicare Part B
              </span>
              <span className="text-xs font-bold text-emerald-800">
                Social Security Act § 1839(f)
              </span>
            </div>

            <h2 className="text-lg md:text-xl font-extrabold text-slate-900 leading-snug">
              2027 Social Security 3.6% COLA &amp; Medicare Part B &ldquo;Hold Harmless&rdquo; Guide
            </h2>

            <p className="text-xs md:text-sm text-slate-700 leading-relaxed">
              The Social Security Administration announced the official <strong>3.6% Cost-of-Living Adjustment (COLA)</strong> on <strong>October 14, 2026</strong>, taking effect with January 2027 Social Security payments. However, because Medicare Part B premiums are automatically deducted from Social Security checks before they reach your bank account, your real deposit depends on the <strong>Two-Envelope Net Check Formula</strong>.
            </p>

            <div className="bg-[#f8f5ec] rounded-xl p-4 border border-[#d5cbb8] space-y-2 text-xs text-slate-800">
              <div className="font-extrabold text-[#1b4332] uppercase tracking-wider">
                How the Federal &ldquo;Hold Harmless&rdquo; Rule Protects Seniors:
              </div>
              <ul className="list-disc list-inside space-y-1.5 leading-relaxed">
                <li>
                  <strong>Automatic Net Check Protection:</strong> Under federal law (<em>Social Security Act § 1839(f)</em>), if your Medicare Part B premium is deducted directly from your Social Security benefit and your income is below the IRMAA surcharge threshold, your Part B dollar increase is <strong>legally capped at your gross COLA dollar raise</strong>.
                </li>
                <li>
                  <strong>Your Net Check Cannot Drop:</strong> Even if Medicare Part B rises faster than a modest Social Security benefit&apos;s 3.6% COLA, Hold Harmless guarantees your net monthly Social Security deposit will never decrease from one year to the next due to a standard Part B hike.
                </li>
                <li>
                  <strong>Who Is Excluded From Hold Harmless:</strong> New Medicare enrollees in 2027, higher-income beneficiaries paying <strong>IRMAA surcharges</strong>, and enrollees whose premiums are billed directly rather than deducted from Social Security checks pay the full standard Part B rate.
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2">
            <span className="text-[11px] font-semibold text-slate-500">
              Authority Source: Social Security Administration
            </span>
            <a
              href="https://www.ssa.gov/news/en/cola/factsheets/2027.html"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackGa4Event('outbound_authority_click', {
                  event_category: 'seo_authority_link',
                  authority_name: 'SSA 2027 COLA Fact Sheet',
                  link_url: 'https://www.ssa.gov/news/en/cola/factsheets/2027.html',
                })
              }
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#1b4332] hover:bg-emerald-900 text-amber-300 font-extrabold text-xs shadow-xs transition-colors"
            >
              <span>📄 Official 2027 SSA COLA Fact Sheet (SSA.gov) →</span>
            </a>
          </div>
        </article>

        {/* Guide 2: Form SSA-44 IRMAA Appeal Step-by-Step Retirement Checklist */}
        <article
          id="guideSsa44IrmaaCard"
          className="surface-card rounded-2xl p-5 md:p-6 border-2 border-[#b07d4b] shadow-sm flex flex-col justify-between space-y-4"
        >
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
              <span className="px-2.5 py-1 rounded-md bg-amber-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider">
                Official Medicare Appeal Guide #2 · Form SSA-44
              </span>
              <span className="text-xs font-bold text-amber-900">
                8 Official Life-Changing Events
              </span>
            </div>

            <h2 className="text-lg md:text-xl font-extrabold text-slate-900 leading-snug">
              Form SSA-44 IRMAA Appeal: Step-by-Step Retirement Checklist
            </h2>

            <p className="text-xs md:text-sm text-slate-700 leading-relaxed">
              Medicare&apos;s <strong>IRMAA (Income-Related Monthly Adjustment Amount)</strong> uses a 2-year tax lookback (your <strong>2025 tax return MAGI</strong> sets your <strong>2027 Medicare Part B &amp; Part D premiums</strong>; projected 2027 threshold is <strong>$112,000 Single / $224,000 Married</strong> — CMS confirms in November 2026; 2026 official threshold from 2024 MAGI is <strong>$109,000 Single / $218,000 Married</strong>). If your income dropped because you retired, you can file <strong>Form SSA-44</strong> to erase the surcharge.
            </p>

            <div className="bg-[#f8f5ec] rounded-xl p-4 border border-[#d5cbb8] space-y-2 text-xs text-slate-800">
              <div className="font-extrabold text-[#1b4332] uppercase tracking-wider">
                The 8 Official SSA Life-Changing Events (Step 1 of Form SSA-44):
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 font-semibold text-slate-800">
                <div>1. Marriage</div>
                <div>5. Work Reduction (Cut Hours)</div>
                <div>2. Divorce / Annulment</div>
                <div>6. Loss of Income-Producing Property</div>
                <div>3. Death of Your Spouse</div>
                <div>7. Loss of Pension Income</div>
                <div className="text-emerald-900 font-extrabold">4. Work Stoppage (Retirement) ★</div>
                <div>8. Employer Settlement Payment</div>
              </div>
              <p className="text-[11px] text-slate-600 pt-1 border-t border-slate-200 leading-relaxed">
                <strong>How to File in 3 Steps:</strong> (1) Check <em>&ldquo;Work Stoppage&rdquo;</em> or <em>&ldquo;Work Reduction&rdquo;</em> in Step 1 of Form SSA-44; (2) Enter your lower 2026/2027 estimated retirement AGI + tax-exempt interest in Step 2–3; (3) Attach a copy of your retirement letter or final pay stub and mail or fax it to your local Social Security office.
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2">
            <span className="text-[11px] font-semibold text-slate-500">
              Authority Source: Official SSA Form SSA-44 PDF
            </span>
            <a
              href="https://www.ssa.gov/forms/ssa-44.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackGa4Event('outbound_authority_click', {
                  event_category: 'seo_authority_link',
                  authority_name: 'Official Form SSA-44 PDF Download',
                  link_url: 'https://www.ssa.gov/forms/ssa-44.pdf',
                })
              }
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs border border-amber-500 shadow-xs transition-colors"
            >
              <span>📥 Download Official Form SSA-44 (SSA.gov PDF) →</span>
            </a>
          </div>
        </article>
      </div>
    </section>
  );
};
