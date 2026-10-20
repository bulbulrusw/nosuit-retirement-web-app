import React from 'react';

interface GlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlossaryModal: React.FC<GlossaryModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      id="glossaryModal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="glossaryModalTitle"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 no-print"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-2xl w-full p-6 border-2 border-[#1b4332] shadow-2xl space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <h2 id="glossaryModalTitle" className="text-xl font-extrabold text-[#1b4332]">
            The No-Suit Plain-English Glossary
          </h2>
          <button
            id="closeGlossaryBtn"
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm transition-colors cursor-pointer"
          >
            ✕ Close
          </button>
        </div>
        <div className="space-y-3 text-sm text-slate-800">
          <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200">
            <strong className="text-emerald-950">COLA (Cost-of-Living Adjustment):</strong> Your annual Social Security inflation raise announced every October and paid starting in January.
          </div>
          <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200">
            <strong className="text-amber-950">CPI-W vs. Senior Inflation:</strong> The index based on young urban wage earners that undercounts senior medical and housing costs.
          </div>
          <div className="p-3.5 rounded-xl bg-red-50/80 border border-red-200">
            <strong className="text-red-950">1984 Ghost Tax (Provisional Income):</strong> Half of your Social Security plus pre-tax 401(k)/IRA draws. Above $25K (single) or $32K (married), up to 50%–85% of your Social Security becomes taxable.
          </div>
          <div className="p-3.5 rounded-xl bg-sky-50/80 border border-sky-200">
            <strong className="text-sky-950">IRMAA &amp; Form SSA-44:</strong> Extra Medicare surcharge based on your tax return from 2 years ago. File Form SSA-44 after retiring to remove it.
          </div>
          <div className="p-3.5 rounded-xl bg-purple-50/80 border border-purple-200">
            <strong className="text-purple-950">SECURE 2.0 Super Catch-Up (Ages 60–63):</strong> Workers aged 60, 61, 62, or 63 can contribute an extra $11,250 catch-up (total $35,750) into their 401(k).
          </div>
        </div>
      </div>
    </div>
  );
};

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      id="privacyModal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacyModalTitle"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 no-print"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 border-2 border-[#1b4332] shadow-2xl space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-200 pb-3 sticky top-0 bg-white">
          <h2 id="privacyModalTitle" className="text-xl font-extrabold text-[#1b4332]">
            Privacy Policy, Data Safety &amp; Disclaimers
          </h2>
          <button
            id="closePrivacyBtn"
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm transition-colors cursor-pointer"
          >
            ✕ Close
          </button>
        </div>
        <div className="space-y-3 text-xs md:text-sm text-slate-800 leading-relaxed">
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300">
            <div className="font-extrabold text-emerald-950">1. 100% Local Processing — Zero Data Collection</div>
            <p className="mt-1">
              <strong>No-Suit Retirement Companion</strong> runs 100% locally on your device. We do <strong>not</strong> collect, store, transmit, sell, or share any personal information, financial numbers, Social Security estimates, tax inputs, or family binder notes. No user accounts, bank logins, cookies, analytics trackers, or advertising SDKs are used.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300">
            <div className="font-extrabold text-amber-950">2. Zero Sensitive Device Permissions</div>
            <p className="mt-1">
              This application requests <strong>zero</strong> access to your camera, microphone, contacts, precise location, phone state, photos, or Advertising ID. All calculations happen transiently in device memory and are cleared when you close or reset the app.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-sky-50 border border-sky-300">
            <div className="font-extrabold text-sky-950">3. Official Government Non-Affiliation Notice</div>
            <p className="mt-1">
              This app is an <strong>independent educational tool</strong> and is <strong>NOT affiliated with, endorsed by, or connected to the U.S. Government</strong>, the Social Security Administration (SSA), the Centers for Medicare &amp; Medicaid Services (CMS), or the Internal Revenue Service (IRS). Official public rules and forms referenced in this app can be verified directly at official government websites:
            </p>
            <ul className="list-disc list-inside mt-1.5 font-semibold text-sky-950 space-y-0.5">
              <li>
                Social Security Administration &amp; Form SSA-44:{' '}
                <a href="https://www.ssa.gov" target="_blank" rel="noopener noreferrer" className="underline">
                  https://www.ssa.gov
                </a>
              </li>
              <li>
                Official Medicare Enrollment &amp; Part B/D Info:{' '}
                <a href="https://www.medicare.gov" target="_blank" rel="noopener noreferrer" className="underline">
                  https://www.medicare.gov
                </a>
              </li>
              <li>
                Internal Revenue Service (IRS) Senior Tax Rules:{' '}
                <a href="https://www.irs.gov" target="_blank" rel="noopener noreferrer" className="underline">
                  https://www.irs.gov
                </a>
              </li>
              <li>
                SSA Office of the Inspector General (Scam Reporting):{' '}
                <a href="https://oig.ssa.gov" target="_blank" rel="noopener noreferrer" className="underline">
                  https://oig.ssa.gov
                </a>
              </li>
            </ul>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-100 border border-slate-300">
            <div className="font-extrabold text-slate-900">4. Educational Financial &amp; Tax Disclaimer</div>
            <p className="mt-1">
              All projections, 3-Bucket allocations, COLA estimates, Roth conversion figures, and Medicare IRMAA/ACA calculations are hypothetical illustrations for educational purposes only. They do not constitute personalized investment, financial, legal, tax, or medical advice. Always consult a qualified CPA, fiduciary financial advisor, or official government representative before making retirement decisions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
