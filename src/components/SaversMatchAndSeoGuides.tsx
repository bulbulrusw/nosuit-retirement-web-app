import React from 'react';
import {
  QUICK_SCENARIO_PRESETS,
  QuickScenarioKey,
  SaversFilingStatus,
  formatUSD,
} from '../utils/retirementMath';

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
      className="surface-card rounded-2xl p-4 border-2 border-[#b07d4b] shadow-xs space-y-2.5 no-print"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="text-xs font-extrabold uppercase tracking-wider text-[#1b4332]">
          ⚡ 1-Touch Scenario Presets (Click Any Scenario to Auto-Populate Math Instantly):
        </div>
        <span className="text-[11px] font-semibold text-slate-600">
          100% Private In-Browser Calculation
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2.5">
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
              className={`text-left px-3.5 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer border-2 flex items-center justify-between gap-2 ${
                isActive
                  ? 'bg-[#1b4332] text-amber-300 border-amber-400 shadow-md'
                  : 'bg-[#faf8f2] hover:bg-amber-50/90 text-slate-900 border-[#c5b9a5] hover:border-[#1b4332]'
              }`}
            >
              <span className="leading-snug">{item.label}</span>
              <span
                className={`text-[11px] font-extrabold px-2 py-0.5 rounded-md shrink-0 ${
                  isActive ? 'bg-amber-400 text-slate-950' : 'bg-emerald-900 text-amber-200'
                }`}
              >
                Load →
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};

interface SaversMatchCalculatorSectionProps {
  saversContribution: number;
  saversFilingStatus: SaversFilingStatus;
  saversAgi: number;
  saversMatchRatePct: 50 | 20 | 10 | 0;
  saversMatchTierLabel: string;
  saversMatchDeposit: number;
  saversTotalAdded: number;
  saversThresholds: { tier50: number; tier20: number; tier10: number };
  onChangeContribution: (val: number) => void;
  onChangeFilingStatus: (val: SaversFilingStatus) => void;
  onChangeAgi: (val: number) => void;
}

export const SaversMatchCalculatorSection: React.FC<SaversMatchCalculatorSectionProps> = ({
  saversContribution,
  saversFilingStatus,
  saversAgi,
  saversMatchRatePct,
  saversMatchTierLabel,
  saversMatchDeposit,
  saversTotalAdded,
  saversThresholds,
  onChangeContribution,
  onChangeFilingStatus,
  onChangeAgi,
}) => {
  return (
    <section
      id="saversMatchSection"
      aria-labelledby="saversMatchHeading"
      className="surface-card rounded-2xl p-5 md:p-6 border-2 border-[#b07d4b] shadow-sm space-y-5"
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-emerald-900 bg-emerald-100/90 px-2.5 py-0.5 rounded-md border border-emerald-300">
            <span>🎁 SECURE 2.0 Act · IRC § 6433 · Effective Tax Year 2027</span>
          </div>
          <h2 id="saversMatchHeading" className="text-lg md:text-xl font-extrabold text-slate-900">
            2027 Federal Saver&apos;s Match Calculator (Up to $1,000 Free Government Match)
          </h2>
          <p className="text-xs md:text-sm text-slate-700 leading-relaxed max-w-3xl">
            Under SECURE 2.0, the old non-refundable Saver&apos;s Credit is replaced by a direct 50% federal matching deposit (up to $1,000 on $2,000 of contributions) paid directly into your IRA or 401(k).
          </p>
        </div>

        <a
          id="irsSaversMatchAuthorityLink"
          href="https://www.irs.gov/credits-deductions/savers-match"
          target="_blank"
          rel="noopener noreferrer"
          data-ga-event="affiliate_click"
          data-affiliate="Official IRS Saver's Match Authority"
          className="affiliate-link inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#1b4332] hover:bg-emerald-900 text-amber-300 font-extrabold text-xs border border-amber-400/50 shadow-xs transition-colors shrink-0 whitespace-nowrap"
        >
          <span>🏛️ Official IRS Saver&apos;s Match Rule (IRS.gov) →</span>
        </a>
      </div>

      {/* Interactive Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            onChange={(e) => onChangeContribution(Math.max(0, parseFloat(e.target.value) || 0))}
            className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50/50 focus:bg-white focus:border-[#1b4332] focus:outline-none px-3.5 py-2 font-bold font-num text-slate-900 text-sm"
          />
          <span className="block text-[11px] text-slate-500 mt-1">
            First $2,000/yr of IRA or 401(k) contributions qualifies for the 50% federal match.
          </span>
        </div>

        <div>
          <label htmlFor="saversFilingStatus" className="block text-xs font-bold text-slate-800">
            Filing Status
          </label>
          <select
            id="saversFilingStatus"
            value={saversFilingStatus}
            onChange={(e) => onChangeFilingStatus(e.target.value as SaversFilingStatus)}
            className="mt-1.5 w-full rounded-xl border border-slate-300 px-3 py-2 font-bold bg-white text-slate-900 text-sm"
          >
            <option value="single">Single</option>
            <option value="married">Married Filing Jointly</option>
            <option value="hoh">Head of Household</option>
          </select>
          <span className="block text-[11px] text-slate-500 mt-1">
            50% match up to {formatUSD(saversThresholds.tier50)} AGI (phaseout cap {formatUSD(saversThresholds.tier10)}).
          </span>
        </div>

        <div>
          <label htmlFor="saversAgiInput" className="block text-xs font-bold text-slate-800">
            Estimated Adjusted Gross Income (AGI) ($)
          </label>
          <input
            id="saversAgiInput"
            type="number"
            min="0"
            step="1000"
            value={saversAgi}
            onChange={(e) => onChangeAgi(Math.max(0, parseFloat(e.target.value) || 0))}
            className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50/50 focus:bg-white focus:border-[#1b4332] focus:outline-none px-3.5 py-2 font-bold font-num text-slate-900 text-sm"
          />
          <span className="block text-[11px] text-slate-500 mt-1">
             Match tiers: 50% (≤{formatUSD(saversThresholds.tier50)}), 20% (≤{formatUSD(saversThresholds.tier20)}), 10% (≤{formatUSD(saversThresholds.tier10)}), 0% (&gt;{formatUSD(saversThresholds.tier10)}).
          </span>
        </div>
      </div>

      {/* Results Display */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-emerald-50/90 rounded-2xl p-4 border-2 border-emerald-400">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-950">
            Federal Match Rate
          </div>
          <div
            id="saversMatchRateResult"
            className="text-2xl font-extrabold text-emerald-900 mt-1 font-num"
          >
            {saversMatchRatePct}%
          </div>
          <p id="saversMatchTierNote" className="text-xs font-semibold text-slate-700 mt-1">
            {saversMatchTierLabel}
          </p>
        </div>

        <div className="bg-[#1b4332] text-white rounded-2xl p-4 border-2 border-amber-400 shadow-sm">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-300">
            Estimated Government Match Deposit ($)
          </div>
          <div
            id="saversMatchDepositResult"
            className="text-2xl font-extrabold text-white mt-1 font-num"
          >
            +{formatUSD(saversMatchDeposit)}
          </div>
          <p className="text-xs text-emerald-200 mt-1">
            Deposited directly into your Traditional IRA or 401(k)
          </p>
        </div>

        <div className="bg-amber-50/95 rounded-2xl p-4 border-2 border-amber-400">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-950">
            Total Added to Your Retirement ($)
          </div>
          <div
            id="saversTotalAddedResult"
            className="text-2xl font-extrabold text-slate-900 mt-1 font-num"
          >
            {formatUSD(saversTotalAdded)}
          </div>
          <p className="text-xs font-semibold text-slate-700 mt-1">
            Your {formatUSD(saversContribution)} contribution + {formatUSD(saversMatchDeposit)} federal match
          </p>
        </div>
      </div>

      <div className="bg-[#f8f5ec] rounded-xl p-3.5 border border-[#d5cbb8] flex flex-wrap items-center justify-between gap-2 text-xs text-slate-700">
        <span>
          <strong>Official Authority Citation:</strong> SECURE 2.0 Act Section 103 (Internal Revenue Code § 6433) — Federal Saver&apos;s Match replaces the old Saver&apos;s Credit beginning in 2027.
        </span>
        <a
          href="https://www.irs.gov/credits-deductions/savers-match"
          target="_blank"
          rel="noopener noreferrer"
          className="font-extrabold text-[#1b4332] underline hover:text-emerald-800"
        >
          https://www.irs.gov/credits-deductions/savers-match
        </a>
      </div>
    </section>
  );
};

export const HighIntentSeoGuidesSection: React.FC = () => {
  const ssa44Events = [
    {
      num: 1,
      title: 'Marriage',
      desc: 'You entered into a legal marriage that changed your joint household filing status and reduced per-person MAGI.',
    },
    {
      num: 2,
      title: 'Divorce / Annulment',
      desc: 'Your marriage ended by final decree of divorce or annulment, removing a former spouse’s higher income from your return.',
    },
    {
      num: 3,
      title: 'Death of Your Spouse',
      desc: 'Your spouse passed away, resulting in a reduction of household Modified Adjusted Gross Income.',
    },
    {
      num: 4,
      title: 'Work Stoppage (Full Retirement)',
      desc: 'You or your spouse permanently retired or stopped working—the #1 most common reason seniors win an IRMAA appeal.',
    },
    {
      num: 5,
      title: 'Work Reduction (Part-Time Transition)',
      desc: 'You or your spouse shifted from full-time to part-time hours or semi-retirement with lower earned wages.',
    },
    {
      num: 6,
      title: 'Loss of Income-Producing Property',
      desc: 'Involuntary loss of rental property, farmland, or business property due to disaster, arson, or condemnation (not a voluntary sale).',
    },
    {
      num: 7,
      title: 'Loss of Pension Income',
      desc: 'Termination or reduction of a defined-benefit employer pension plan due to plan insolvency or scheduled cessation.',
    },
    {
      num: 8,
      title: 'Employer Settlement Payment',
      desc: 'Receipt of a one-time settlement payment from an employer or former employer due to company closure or reorganization.',
    },
  ];

  return (
    <section
      id="seoRetirementGuidesSection"
      aria-label="Official U.S. Retirement & Medicare Step-by-Step Guides"
      className="space-y-6"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Guide Card 1: 2027 Social Security 3.6% COLA & Medicare Part B Hold Harmless Guide */}
        <article
          id="guideColaHoldHarmlessCard"
          className="surface-card rounded-2xl p-6 border-2 border-[#b07d4b] shadow-sm flex flex-col justify-between space-y-4"
        >
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-emerald-900 bg-emerald-100/90 px-2.5 py-0.5 rounded-md border border-emerald-300">
              <span>📘 Official SSA Fact Sheet · Announced Oct 14, 2026</span>
            </div>
            <h2 className="text-lg md:text-xl font-extrabold text-slate-900">
              2027 Social Security 3.6% COLA &amp; Medicare Part B Hold Harmless Guide
            </h2>
            <p className="text-xs md:text-sm text-slate-700 leading-relaxed">
              On <strong>October 14, 2026</strong>, the Social Security Administration announced the official <strong>3.6% Cost-of-Living Adjustment (COLA)</strong> for 2027, based on third-quarter CPI-W inflation data. For an average retiree receiving $2,000/month, a 3.6% COLA adds <strong>+$72/month</strong> to the gross benefit before Medicare deductions.
            </p>

            <div className="bg-[#f8f5ec] rounded-xl p-4 border border-[#d5cbb8] space-y-2 text-xs md:text-sm text-slate-800">
              <h3 className="font-extrabold text-[#1b4332]">
                How the Federal &ldquo;Hold Harmless&rdquo; Provision Protects Your Net Check
              </h3>
              <p className="leading-relaxed">
                Under <strong>Social Security Act § 1839(f)</strong>, if your Medicare Part B premium is deducted directly from your monthly Social Security check and your MAGI is below the IRMAA surcharge threshold ($106,000 Single / $212,000 Married), your <strong>net Social Security check cannot decrease</strong> from one year to the next due to a Medicare Part B premium hike.
              </p>
              <ul className="list-disc list-inside space-y-1 text-xs text-slate-700 font-medium">
                <li>
                  <strong>If Part B rises less than your COLA:</strong> You pay the standard Part B increase and keep the remaining net COLA raise.
                </li>
                <li>
                  <strong>If Part B rises more than your COLA:</strong> The Hold Harmless rule caps your Part B deduction at the exact dollar amount of your COLA raise, locking in a <strong>$0 minimum net change</strong> so your bank deposit never drops.
                </li>
                <li>
                  <strong>Who is excluded from Hold Harmless:</strong> New Medicare enrollees, higher-income beneficiaries subject to IRMAA, and enrollees whose Part B premiums are paid by a state Medicaid agency.
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="font-semibold text-slate-600">
              Official Source: Social Security Administration
            </span>
            <a
              id="ssaCola2027FactSheetLink"
              href="https://www.ssa.gov/news/en/cola/factsheets/2027.html"
              target="_blank"
              rel="noopener noreferrer"
              data-ga-event="affiliate_click"
              data-affiliate="SSA Official 2027 COLA Fact Sheet"
              className="affiliate-link inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#1b4332] hover:bg-emerald-900 text-amber-300 font-extrabold transition-colors"
            >
              <span>📄 Official 2027 SSA COLA Fact Sheet (SSA.gov) →</span>
            </a>
          </div>
        </article>

        {/* Guide Card 2: Form SSA-44 IRMAA Appeal: 8 Life-Changing Events Retirement Checklist */}
        <article
          id="guideSsa44IrmaaCard"
          className="surface-card rounded-2xl p-6 border-2 border-[#b07d4b] shadow-sm flex flex-col justify-between space-y-4"
        >
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-amber-950 bg-amber-100 px-2.5 py-0.5 rounded-md border border-amber-300">
              <span>📋 Official Medicare IRMAA Relief · Form SSA-44</span>
            </div>
            <h2 className="text-lg md:text-xl font-extrabold text-slate-900">
              Form SSA-44 IRMAA Appeal: 8 Life-Changing Events Retirement Checklist
            </h2>
            <p className="text-xs md:text-sm text-slate-700 leading-relaxed">
              Medicare uses a 2-year tax lookback (your 2025 IRS return sets your 2027 Part B &amp; Part D premiums). If you retired and your income dropped, you do <strong>not</strong> have to wait two years—file <strong>Form SSA-44</strong> if you experienced any of these <strong>8 Official Life-Changing Events</strong>:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {ssa44Events.map((ev) => (
                <div
                  key={ev.num}
                  className="p-2.5 rounded-xl bg-[#faf8f2] border border-[#d5cbb8] leading-snug"
                >
                  <div className="font-extrabold text-[#1b4332]">
                    {ev.num}. {ev.title}
                  </div>
                  <p className="text-[11px] text-slate-600 mt-0.5">{ev.desc}</p>
                </div>
              ))}
            </div>

            <div className="bg-emerald-50/90 rounded-xl p-3.5 border border-emerald-300 text-xs text-slate-800 space-y-1">
              <div className="font-extrabold text-emerald-950">
                Step-by-Step Instructions for Submitting Form SSA-44:
              </div>
              <ol className="list-decimal list-inside space-y-0.5 text-slate-700">
                <li>
                  <strong>Step 1:</strong> Check one of the 8 qualifying Life-Changing Events (e.g., <em>Work Stoppage</em>) and enter the exact date in Step 1 of Form SSA-44.
                </li>
                <li>
                  <strong>Step 2:</strong> Enter your lower estimated Adjusted Gross Income (AGI) and tax-exempt interest for the year of the change (Step 2) and the following year (Step 3).
                </li>
                <li>
                  <strong>Step 3:</strong> Attach proof of retirement (signed employer retirement letter, final pay stub, or federal tax return) and fax, mail, or hand-deliver to your local Social Security office.
                </li>
              </ol>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="font-semibold text-slate-600">
              Official Form: SSA-44 (PDF)
            </span>
            <a
              id="ssa44ChecklistPdfLink"
              href="https://www.ssa.gov/forms/ssa-44.pdf"
              target="_blank"
              rel="noopener noreferrer"
              data-ga-event="affiliate_click"
              data-affiliate="Form SSA-44 IRMAA Appeal PDF"
              className="affiliate-link inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold border border-amber-500 transition-colors"
            >
              <span>📥 Download Official Form SSA-44 (PDF) →</span>
            </a>
          </div>
        </article>
      </div>
    </section>
  );
};
