import React from 'react';

export type TabId = 'tab-paycheck' | 'tab-claiming' | 'tab-taxshield' | 'tab-safety' | 'tab-binder';

interface UserGuideSectionProps {
  isOpen: boolean;
  onToggle: () => void;
  onSelectTab: (tab: TabId) => void;
}

export const UserGuideSection: React.FC<UserGuideSectionProps> = ({
  isOpen,
  onToggle,
  onSelectTab,
}) => {
  const steps: Array<{
    tab: TabId;
    kicker: string;
    title: string;
    desc: string;
    btnLabel: string;
  }> = [
    {
      tab: 'tab-paycheck',
      kicker: 'Tab 1 · Net Check & $400K Math',
      title: 'Step 1: Find Your True Monthly Paycheck',
      desc: 'Enter your current monthly Social Security benefit and spouse benefit (0 if single). Adjust the 2027 COLA % slider and your Total Retirement Savings plus four basic monthly bills. The chalkboard divides your savings into a 3-Bucket Crash Shield (2 yrs cash, 6 yrs bonds/CDs, and long-term growth).',
      btnLabel: 'Open Tab 1 →',
    },
    {
      tab: 'tab-claiming',
      kicker: 'Tab 2 · Age 62 vs 67 & Side-Gig',
      title: 'Step 2: Check Claiming Age & Work Rules',
      desc: 'Enter your Full Retirement Age (67) benefit and slide the age bar to see where waiting until 67 or 70 beats claiming early at 62. Check how many part-time hours you can work without triggering the $25,560/yr ($2,130/mo) in 2027 (up from $24,480/yr in 2026) early-retirement earnings limit, and compare paying off your mortgage vs keeping safe CDs.',
      btnLabel: 'Open Tab 2 →',
    },
    {
      tab: 'tab-taxshield',
      kicker: 'Tab 3 · 1984 Tax, Roth & IRMAA',
      title: 'Step 3: Protect Check From Hidden Taxes',
      desc: 'Select your filing status and enter annual pre-tax 401(k)/IRA draws vs tax-free Roth draws. Watch the 1984 IRS Ghost Tax Speedometer to see how much to shift to your Roth bucket, and check if filing Form SSA-44 erases a 2027 Medicare IRMAA surcharge.',
      btnLabel: 'Open Tab 3 →',
    },
    {
      tab: 'tab-safety',
      kicker: 'Tab 4 · Scam Radar & Dec 7 Audit',
      title: 'Step 4: Run 5-Second Scam Check & Audit',
      desc: 'Received a suspicious phone call, text link, or letter about Social Security, Medicare, or a "Senior Property Tax Rebate"? Check any matching box for an instant Scam Alert Verdict, and complete the 5 Medicare Open Enrollment steps.',
      btnLabel: 'Open Tab 4 →',
    },
    {
      tab: 'tab-binder',
      kicker: 'Tab 5 · Print Plan & Family Binder',
      title: 'Step 5: Print 1-Page Plan & Binder',
      desc: 'Review your complete personalized retirement snapshot on one clean page. Record the physical home locations of your important folders (never type account numbers or passwords) and print a clean copy for your kitchen drawer or spouse’s family binder.',
      btnLabel: 'Open Tab 5 →',
    },
  ];

  return (
    <section id="userGuideSection" className="max-w-7xl w-full mx-auto px-4 mt-3 no-print">
      <div className="surface-card rounded-2xl overflow-hidden">
        <div className="bg-[#1b4332] text-white px-4 py-3.5 md:px-6 flex flex-wrap items-center justify-between gap-3 border-b border-[#b07d4b]/60">
          <div>
            <h2 className="text-base md:text-lg font-extrabold text-amber-300">
              How to Use the No-Suit Retirement Companion (In Under 3 Minutes)
            </h2>
            <p className="text-xs text-emerald-100 mt-0.5">
              Welcome to your kitchen-table retirement worksheet — 100% private in your browser, no spreadsheets or passwords needed.
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              id="collapseGuideBtn"
              type="button"
              onClick={onToggle}
              aria-expanded={isOpen}
              className="px-3.5 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs shadow-xs transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <span id="collapseGuideLabel">
                {isOpen ? '▲ Hide Guide' : '▼ Show 3-Min Guide'}
              </span>
            </button>
          </div>
        </div>

        {isOpen && (
          <div id="userGuideBody" className="p-5 md:p-6 space-y-6 text-sm text-slate-800">
            <div className="bg-[#f8f5ec] p-4 rounded-xl border border-[#d5cbb8] flex flex-col md:flex-row md:items-center justify-between gap-4">
              <p className="text-slate-700 leading-relaxed">
                <strong className="text-slate-900">Welcome to your kitchen-table retirement worksheet!</strong> You don’t need a financial degree, a spreadsheet, or any bank passwords to use this tool. Everything runs <strong>100% privately inside your web browser</strong>—none of your numbers are ever saved, tracked, or shared.
              </p>
            </div>

            {/* Before You Start */}
            <div className="space-y-3">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-[#1b4332] border-b border-slate-200 pb-2">
                Before You Start: Make the Screen Comfortable for You
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
                <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200/80">
                  <div className="font-bold text-emerald-950 text-sm">1. Make the Text Bigger (A / A+ / A++)</div>
                  <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                    Click <strong>A+ (Large)</strong> or <strong>A++ (Senior XL)</strong> in the top bar to enlarge all numbers and words.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200/80">
                  <div className="font-bold text-emerald-950 text-sm">2. Listen to Your Summary Aloud</div>
                  <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                    Click <strong>Listen to My Summary</strong> at the top anytime to have your personalized numbers read out loud.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80">
                  <div className="font-bold text-amber-950 text-sm">3. Look Up Confusing Terms</div>
                  <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                    Not sure what <em>IRMAA</em>, <em>Provisional Income</em>, or <em>CPI-W</em> means? Click <strong>No-Suit Glossary</strong> at the top.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80">
                  <div className="font-bold text-amber-950 text-sm">4. Test With a Sample Household</div>
                  <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                    Click <strong>Single</strong>, <strong>Couple</strong>, or <strong>Late Saver</strong> in the header banner to preview a complete plan.
                  </p>
                </div>
              </div>
            </div>

            {/* Step-by-Step Guide to the 5 Calculator Tabs */}
            <div className="space-y-3">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-[#1b4332] border-b border-slate-200 pb-2">
                Step-by-Step Guide to the 5 Calculator Modules
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-3.5">
                {steps.map((s) => (
                  <div
                    key={s.tab}
                    className="p-4 rounded-xl bg-[#faf8f2] border border-[#d5cbb8] flex flex-col justify-between gap-3"
                  >
                    <div className="space-y-1.5">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-900">
                        {s.kicker}
                      </div>
                      <div className="font-extrabold text-slate-900 text-sm">
                        {s.title}
                      </div>
                      <p className="text-xs text-slate-700 leading-relaxed">
                        {s.desc}
                      </p>
                    </div>
                    <button
                      type="button"
                      data-goto-tab={s.tab}
                      onClick={() => onSelectTab(s.tab)}
                      className="guide-tab-link w-full py-2 px-3 rounded-lg bg-[#1b4332] hover:bg-emerald-800 text-amber-300 font-bold text-xs text-center transition-colors cursor-pointer whitespace-nowrap"
                    >
                      {s.btnLabel}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
