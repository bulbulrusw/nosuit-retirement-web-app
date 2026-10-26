import React, { useState, useEffect, useMemo } from 'react';
import {
  DEFAULT_INPUTS,
  PRESET_PROFILES,
  PresetKey,
  RetirementInputs,
  calculateRetirementMetrics,
  formatUSD,
} from './utils/retirementMath';
import { BrandHeader } from './components/BrandHeader';
import { UserGuideSection, TabId } from './components/UserGuideSection';
import { PaycheckCashFlowChart, BreakevenLineChart } from './components/Charts';
import { GlossaryModal, PrivacyModal } from './components/Modals';
import { YouTubeButton, YOUTUBE_CHANNEL_URL } from './components/YouTubeButton';
import {
  DEFAULT_CHANNEL_CONFIG,
  FEATURED_YOUTUBE_VIDEOS,
  FeaturedVideoEpisode,
  purgeLegacyConfigStorage,
  syncGa4HeadScript,
  trackGa4Event,
} from './components/AdSlots';
import {
  COOKIE_CONSENT_STORAGE_KEY,
  CookieConsentBanner,
  MobileBottomNavBar,
  SpouseShareBar,
} from './components/ConversionAndComplianceBars';

const SCAM_ITEMS = [
  {
    id: 'scam-1',
    title: '"Social Security / Medicare Suspension" Threat:',
    desc: 'Caller claims your SSN or Medicare benefits will be frozen unless you confirm personal numbers immediately.',
  },
  {
    id: 'scam-2',
    title: 'Viral "2026 Senior Property Tax Rebate" Link:',
    desc: 'A text message or video claims your county owes seniors a secret property tax refund if you click a link and enter bank details.',
  },
  {
    id: 'scam-3',
    title: 'Fee to File Form SSA-44 or Activate Your COLA:',
    desc: 'Someone asks for a fee, gift card, wire transfer, or bank login to activate your 2027 COLA raise or file Form SSA-44.',
  },
  {
    id: 'scam-4',
    title: '"New Plastic/Chip Medicare Card" Call:',
    desc: 'An unsolicited caller asks for your Medicare number to send you an updated chip card or free brace.',
  },
];

const AUDIT_ITEMS = [
  {
    id: 'audit-1',
    title: '1. Check Your "Annual Notice of Change" (ANOC) Letter:',
    desc: 'Verify if your Part D prescription plan moved any of your regular medications into a higher tier for 2027.',
  },
  {
    id: 'audit-2',
    title: '2. Compare "Part B Giveback" Plans Carefully (Before Dec 7):',
    desc: 'Confirm your doctors are in-network before switching to any Medicare Advantage giveback plan.',
  },
  {
    id: 'audit-3',
    title: '3. Download SSA Form 44 (If You Retired in 2025 or 2026):',
    desc: 'Erase 2027 IRMAA surcharges based on old working income.',
  },
  {
    id: 'audit-4',
    title: "4. Check Your County's Official Senior Property Tax Freeze:",
    desc: 'Contact your county tax assessor directly about 62+/65+ homestead exemptions.',
  },
  {
    id: 'audit-5',
    title: '5. Use the "Roth Valve" for Holiday Travel & Gifts:',
    desc: 'Pull extra November/December cash from Roth or savings if another 401(k) draw triggers the 85% tax zone.',
  },
];

export default function App() {
  const [inputs, setInputs] = useState<RetirementInputs>(DEFAULT_INPUTS);
  const [activePreset, setActivePreset] = useState<PresetKey>('couple400k');
  const [activeTab, setActiveTab] = useState<TabId>('tab-paycheck');
  const [fontSizeScale, setFontSizeScale] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);
  const [isGlossaryOpen, setIsGlossaryOpen] = useState<boolean>(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState<boolean>(false);
  const [activeVideoModal, setActiveVideoModal] = useState<FeaturedVideoEpisode | null>(null);
  const [isReadingAloud, setIsReadingAloud] = useState<boolean>(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [isCookieAccepted, setIsCookieAccepted] = useState<boolean>(() => {
    try {
      return localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY) === 'accepted';
    } catch {
      return false;
    }
  });

  // Scam & Audit checklists
  const [checkedScams, setCheckedScams] = useState<Record<string, boolean>>({});
  const [checkedAudits, setCheckedAudits] = useState<Record<string, boolean>>({});

  // Family Emergency Binder physical locations
  const [locWill, setLocWill] = useState('Fireproof safe in master closet, top shelf (Blue binder)');
  const [loc401k, setLoc401k] = useState('Fidelity (401k & Roth IRA), Local Credit Union (Bucket 1 Cash)');
  const [locInsurance, setLocInsurance] = useState('Filing cabinet drawer #2 in home study (Green folder)');
  const [locContacts, setLocContacts] = useState('Local CPA Office & SSA Office (1-800-772-1213)');

  const metrics = useMemo(() => calculateRetirementMetrics(inputs), [inputs]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
  };

  useEffect(() => {
    if (!toastMsg) return;
    const timer = setTimeout(() => setToastMsg(null), 3500);
    return () => clearTimeout(timer);
  }, [toastMsg]);

  useEffect(() => {
    purgeLegacyConfigStorage();
    syncGa4HeadScript(DEFAULT_CHANNEL_CONFIG);
  }, []);

  // Automatic GA4 Custom Event Tracking for YouTube videos and Official/Partner resource links
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const affiliateEl = target.closest(
        '[data-ga-event="affiliate_click"], [data-affiliate], .affiliate-link'
      ) as HTMLElement | null;
      if (affiliateEl) {
        trackGa4Event('affiliate_click', {
          event_category: 'affiliate_monetization',
          partner_name:
            affiliateEl.getAttribute('data-affiliate') ||
            affiliateEl.textContent?.trim() ||
            'Senior Resource Partner',
          link_url: (affiliateEl as HTMLAnchorElement).href || '',
        });
        return;
      }

      const youtubeEl = target.closest(
        '[data-ga-event="youtube_video_play"], #youtubeVideoSection a, a[href*="youtube.com"], a[href*="youtu.be"]'
      ) as HTMLElement | null;
      if (youtubeEl) {
        trackGa4Event('youtube_video_play', {
          event_category: 'video_engagement',
          video_title:
            youtubeEl.getAttribute('data-video-title') ||
            youtubeEl.textContent?.trim() ||
            'NoSuitRetirement YouTube Video',
          link_url: (youtubeEl as HTMLAnchorElement).href || YOUTUBE_CHANNEL_URL,
        });
      }
    };

    document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  }, []);

  const handleAcceptCookies = () => {
    setIsCookieAccepted(true);
    try {
      localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, 'accepted');
    } catch {
      // ignore storage errors
    }
    trackGa4Event('cookie_consent_accepted', {
      event_category: 'compliance',
      consent_status: 'accepted',
    });
    showToast('Cookie & privacy preferences saved.');
  };

  const handleWatchLatestVideo = () => {
    const latestVideo = FEATURED_YOUTUBE_VIDEOS[0];
    setActiveVideoModal(latestVideo);
    trackGa4Event('youtube_video_play', {
      event_category: 'hero_watch_latest_video',
      video_id: latestVideo.videoId,
      video_title: latestVideo.title,
      link_url: latestVideo.videoUrl,
    });
  };

  const handleVideoCalculatorAction = (video: FeaturedVideoEpisode) => {
    if (video.calculatorPreset) {
      const profile = PRESET_PROFILES[video.calculatorPreset];
      setActivePreset(video.calculatorPreset);
      setInputs((prev) => ({
        ...prev,
        ...profile.values,
      }));
    }
    if (video.workerAgeGroup) {
      setInputs((prev) => ({
        ...prev,
        workerAgeGroup: video.workerAgeGroup!,
      }));
    }
    setActiveTab(video.calculatorTab);
    setActiveVideoModal(null);
    trackGa4Event('calculator_tab_switch', {
      event_category: 'video_card_calculator_action',
      tab_id: video.calculatorTab,
      video_title: video.title,
    });
    showToast(
      video.calculatorTab === 'tab-paycheck'
        ? 'Loaded $400K Couple (Age 62) preset in Tab 1: Net Check & $400K.'
        : 'Opened Tab 3: Age 60–63 $11,250 Super Catch-Up ($35,750 total 401k limit).'
    );
    window.setTimeout(() => {
      document.getElementById('calculatorSectionAnchor')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 60);
  };

  const handleMobileGoCalculator = () => {
    document.getElementById('calculatorSectionAnchor')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    trackGa4Event('calculator_tab_switch', {
      event_category: 'mobile_bottom_nav',
      tab_id: activeTab,
      source: 'mobile_bottom_nav_calculator',
    });
  };

  const handleMobileGoVideos = () => {
    document.getElementById('youtubeChannelHub')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    trackGa4Event('youtube_video_play', {
      event_category: 'mobile_bottom_nav',
      video_title: 'Mobile Bottom Nav - 3 Videos',
      link_url: YOUTUBE_CHANNEL_URL,
    });
  };

  const handleMobileGoBinder = () => {
    setActiveTab('tab-binder');
    trackGa4Event('calculator_tab_switch', {
      event_category: 'mobile_bottom_nav',
      tab_id: 'tab-binder',
      source: 'mobile_bottom_nav_binder',
    });
    window.setTimeout(() => {
      document.getElementById('tab-binder')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 60);
  };

  const handleSetFontSize = (scale: 'normal' | 'large' | 'xlarge') => {
    setFontSizeScale(scale);
    const px = scale === 'normal' ? '16px' : scale === 'large' ? '18.5px' : '21px';
    document.documentElement.style.setProperty('--base-font', px);
    showToast(`Text size: ${scale === 'normal' ? 'Normal' : scale === 'large' ? 'Large' : 'Senior XL'}`);
  };

  const handleSelectPreset = (preset: PresetKey) => {
    setActivePreset(preset);
    const profile = PRESET_PROFILES[preset];
    setInputs((prev) => ({
      ...prev,
      ...profile.values,
    }));
    showToast(profile.toast);
  };

  const updateInput = <K extends keyof RetirementInputs>(key: K, value: RetirementInputs[K]) => {
    setInputs((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleReadAloud = () => {
    if (!('speechSynthesis' in window)) {
      showToast('Speech not supported in this browser.');
      return;
    }
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setIsReadingAloud(false);
      return;
    }
    const u = new SpeechSynthesisUtterance(
      `Welcome to No-Suit Retirement. Based on your numbers, your true net Social Security check after Medicare Part B is ${formatUSD(
        metrics.newNetSS
      )} per month. Combined with your safe portfolio draw, your total monthly retirement paycheck is ${formatUSD(
        metrics.totalMonthlyPaycheck
      )} per month. Your 3-Bucket shield holds ${formatUSD(metrics.bucket1)} in safe cash.`
    );
    u.lang = 'en-US';
    u.rate = 0.95;
    u.onend = () => setIsReadingAloud(false);
    u.onerror = () => setIsReadingAloud(false);
    setIsReadingAloud(true);
    window.speechSynthesis.speak(u);
  };

  const handleCopySummary = async () => {
    const text = [
      'NO-SUIT RETIREMENT — MY PERSONALIZED PLAN',
      `• 2027 Net Social Security: ${formatUSD(metrics.newNetSS)}/mo`,
      `• Safe Portfolio Draw: ${formatUSD(metrics.monthlyPortDraw)}/mo (${metrics.drawRate.toFixed(1)}%)`,
      `• Total Monthly Paycheck: ${formatUSD(metrics.totalMonthlyPaycheck)}/mo`,
      `• 3-Bucket Allocation: Cash: ${formatUSD(metrics.bucket1)} • Bonds: ${formatUSD(metrics.bucket2)} • Growth: ${formatUSD(metrics.bucket3)}`,
      `• 1984 IRS Tax Status: Combined: ${formatUSD(metrics.combinedIncome)} (${metrics.taxZone})`,
      `• Will & POA Location: ${locWill}`,
      `• 401(k)/IRA Institutions: ${loc401k}`,
    ].join('\n');

    try {
      await navigator.clipboard.writeText(text);
      showToast('Plan summary copied to clipboard!');
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      showToast('Plan summary copied to clipboard!');
    }
  };

  const scamCount = Object.values(checkedScams).filter(Boolean).length;
  const auditCount = Object.values(checkedAudits).filter(Boolean).length;

  const tabs: Array<{ id: TabId; label: string }> = [
    { id: 'tab-paycheck', label: '1. Net Check & $400K' },
    { id: 'tab-claiming', label: '2. Age 62 vs 67 & Work' },
    { id: 'tab-taxshield', label: '3. 1984 Tax & IRMAA' },
    { id: 'tab-safety', label: '4. Scam & Dec 7 Audit' },
    { id: 'tab-binder', label: '5. Print Plan & Binder' },
  ];

  return (
    <div className="min-h-screen flex flex-col pb-20 md:pb-0">
      <BrandHeader
        fontSizeScale={fontSizeScale}
        onSetFontSize={handleSetFontSize}
        onToggleGuide={() => setIsGuideOpen((v) => !v)}
        onOpenGlossary={() => setIsGlossaryOpen(true)}
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
        onWatchLatestVideo={handleWatchLatestVideo}
        onReadAloud={handleReadAloud}
        isReadingAloud={isReadingAloud}
        activePreset={activePreset}
        onSelectPreset={handleSelectPreset}
      />

      <UserGuideSection
        isOpen={isGuideOpen}
        onToggle={() => setIsGuideOpen((v) => !v)}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          trackGa4Event('calculator_tab_switch', {
            event_category: 'calculator_navigation',
            tab_id: tab,
            source: 'user_guide',
          });
        }}
      />

      {/* Toast Notification */}
      {toastMsg && (
        <div
          id="appToast"
          role="status"
          aria-live="polite"
          className="fixed bottom-20 md:bottom-5 right-5 z-50 bg-[#1b4332] text-amber-200 border-2 border-amber-400 px-4 py-3 rounded-xl shadow-2xl font-bold text-sm max-w-sm"
        >
          {toastMsg}
        </div>
      )}

      {/* Main 12-Column Full-Width Desktop Grid for the 5-Tab Interactive Calculator */}
      <main className="max-w-7xl w-full mx-auto px-4 py-5 flex-1 space-y-8">
        <div id="calculatorSectionAnchor" className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* FULL 12 COLUMNS: 5-Tab Interactive Calculator */}
          <div
            id="calculatorMainColumn"
            className="lg:col-span-12 space-y-6"
          >
            {/* 5 Navigation Tabs */}
            <nav className="no-print" aria-label="Main Modules">
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-2 bg-[#ebe4d4] p-2 rounded-2xl border border-[#c5b9a5] shadow-xs">
                {tabs.map((tab, idx) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      data-tab={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id);
                        trackGa4Event('calculator_tab_switch', {
                          event_category: 'calculator_navigation',
                          tab_id: tab.id,
                          tab_name: tab.label,
                        });
                      }}
                      className={`nav-tab-btn py-2.5 px-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer whitespace-nowrap truncate ${
                        idx === 4 ? 'col-span-2 sm:col-span-1' : ''
                      } ${
                        isActive
                          ? 'bg-[#1b4332] text-amber-300 shadow-md border border-amber-400/40'
                          : 'bg-white text-slate-800 hover:bg-amber-50/80 border border-transparent'
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </nav>

            {/* TAB 1: TWO-ENVELOPE NET CHECK & 3-BUCKET PLANNER */}
            <section
              id="tab-paycheck"
              className={`tab-panel space-y-6 ${activeTab === 'tab-paycheck' ? '' : 'hidden'}`}
            >
              {/* 4 KPI Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5">
                <div className="surface-card rounded-2xl p-4">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Green Envelope (2027 COLA)
                  </div>
                  <div id="kpiGrossCola" className="text-2xl font-extrabold text-emerald-700 mt-1 font-num">
                    +{formatUSD(metrics.grossColaRaise)}/mo
                  </div>
                  <p id="kpiGrossCheckSub" className="text-xs text-slate-600 mt-1">
                    Gross SS climbs to <span className="font-num font-semibold">{formatUSD(metrics.newGrossSS)}/mo</span>
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-4 border border-red-300 shadow-xs">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-red-700">
                    Red Envelope (Part B/D Bite)
                  </div>
                  <div id="kpiMedicareBite" className="text-2xl font-extrabold text-red-600 mt-1 font-num">
                    -{formatUSD(metrics.totalMedicareHike)}/mo
                  </div>
                  <p id="kpiMedicareSub" className="text-xs text-slate-600 mt-1">
                    Takes <span className="font-num font-semibold">{metrics.bitePct}%</span> of your COLA raise
                  </p>
                </div>

                <div className="bg-[#1b4332] text-white rounded-2xl p-4 border border-amber-400/70 shadow-md">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
                    True Net Social Security
                  </div>
                  <div id="kpiNetSS" className="text-2xl font-extrabold text-white mt-1 font-num">
                    {formatUSD(metrics.newNetSS)}/mo
                  </div>
                  <p id="kpiNetRaiseSub" className="text-xs text-emerald-200 mt-1">
                    Real net raise:{' '}
                    <span className="font-num font-semibold">
                      {metrics.netRaise >= 0 ? '+' : ''}
                      {formatUSD(metrics.netRaise)}/mo
                    </span>
                  </p>
                </div>

                <div className="bg-amber-50/90 rounded-2xl p-4 border border-amber-400 shadow-xs">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-amber-900">
                    Total Monthly Paycheck
                  </div>
                  <div id="kpiTotalPaycheck" className="text-2xl font-extrabold text-slate-900 mt-1 font-num">
                    {formatUSD(metrics.totalMonthlyPaycheck)}/mo
                  </div>
                  <p
                    id="kpiBudgetSurplus"
                    className={`text-xs font-bold mt-1 font-num ${
                      metrics.monthlySurplus >= 0 ? 'text-emerald-800' : 'text-red-700'
                    }`}
                  >
                    {metrics.monthlySurplus >= 0 ? '+' : ''}
                    {formatUSD(metrics.monthlySurplus)}/mo{' '}
                    {metrics.monthlySurplus >= 0 ? 'breathing room' : 'shortfall'}
                  </p>
                </div>
              </div>

              {/* Tool 1A & Tool 1B */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Tool 1A */}
                <div className="surface-card rounded-2xl p-5 space-y-4">
                  <div className="border-b border-slate-200 pb-3">
                    <div className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                      Tool 1A · The Two-Envelope Test
                    </div>
                    <h2 className="text-base font-extrabold text-slate-900 mt-0.5">
                      2027 Social Security COLA vs. Medicare Part B
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label htmlFor="ssYourCheck" className="block text-xs font-bold text-slate-800">
                        Your Current Gross SS ($/mo)
                      </label>
                      <input
                        id="ssYourCheck"
                        type="number"
                        value={inputs.ssYourCheck}
                        onChange={(e) => updateInput('ssYourCheck', parseFloat(e.target.value) || 0)}
                        className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50/50 focus:bg-white focus:border-[#1b4332] focus:outline-none px-3 py-2 font-bold font-num text-slate-900 text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="ssSpouseCheck" className="block text-xs font-bold text-slate-800">
                        Spouse Gross SS ($/mo, 0 if single)
                      </label>
                      <input
                        id="ssSpouseCheck"
                        type="number"
                        value={inputs.ssSpouseCheck}
                        onChange={(e) => updateInput('ssSpouseCheck', parseFloat(e.target.value) || 0)}
                        className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50/50 focus:bg-white focus:border-[#1b4332] focus:outline-none px-3 py-2 font-bold font-num text-slate-900 text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="colaPctInput" className="block text-xs font-bold text-slate-800">
                        Projected 2027 COLA % (
                        <span id="colaPctVal" className="font-num text-emerald-800">
                          {inputs.colaPct.toFixed(1)}
                        </span>
                        %)
                      </label>
                      <input
                        id="colaPctInput"
                        type="range"
                        min="1.5"
                        max="6.0"
                        step="0.1"
                        value={inputs.colaPct}
                        onChange={(e) => updateInput('colaPct', parseFloat(e.target.value) || 3.6)}
                        className="mt-2.5 w-full"
                      />
                    </div>
                    <div>
                      <label htmlFor="partBIncreaseInput" className="block text-xs font-bold text-slate-800">
                        Part B/D Hike ($/mo/person)
                      </label>
                      <input
                        id="partBIncreaseInput"
                        type="number"
                        value={inputs.partBIncrease}
                        onChange={(e) => updateInput('partBIncrease', parseFloat(e.target.value) || 0)}
                        className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50/50 focus:bg-white focus:border-[#1b4332] focus:outline-none px-3 py-2 font-bold font-num text-slate-900 text-sm"
                      />
                    </div>
                  </div>

                  <div className="bg-amber-50/90 border border-amber-300 p-3.5 rounded-xl text-xs">
                    <div className="font-bold text-amber-950 flex flex-wrap items-center justify-between gap-1">
                      <span>The &ldquo;86-Cent Dollar&rdquo; Buying Power Check:</span>
                      <span id="buyingPowerLossBadge" className="font-extrabold text-amber-950 font-num">
                        -{formatUSD(metrics.buyingPowerLoss)}/mo vs 2016
                      </span>
                    </div>
                    <p className="text-slate-700 mt-1 leading-relaxed">
                      Because Washington uses the <strong>CPI-W</strong> instead of senior medical inflation, every $1.00 of Social Security buys <strong>86 cents</strong> of senior essentials vs. 10 years ago.
                    </p>
                  </div>
                </div>

                {/* Tool 1B */}
                <div className="surface-card rounded-2xl p-5 space-y-4">
                  <div className="border-b border-slate-200 pb-3">
                    <div className="text-xs font-bold uppercase tracking-wider text-amber-800">
                      Tool 1B · Moderate Nest Egg Math
                    </div>
                    <h2 className="text-base font-extrabold text-slate-900 mt-0.5">
                      401(k)/IRA Nest Egg &amp; Monthly Living Budget
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label htmlFor="nestEggInput" className="block text-xs font-bold text-slate-800">
                        Total Retirement Savings ($)
                      </label>
                      <input
                        id="nestEggInput"
                        type="number"
                        step="10000"
                        value={inputs.nestEgg}
                        onChange={(e) => updateInput('nestEgg', parseFloat(e.target.value) || 0)}
                        className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50/50 focus:bg-white focus:border-[#1b4332] focus:outline-none px-3 py-2 font-bold font-num text-slate-900 text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="withdrawalRateInput" className="block text-xs font-bold text-slate-800">
                        Safe Guardrail Draw Rate (
                        <span id="withdrawalRateVal" className="font-num text-emerald-800">
                          {inputs.withdrawalRate.toFixed(1)}
                        </span>
                        %)
                      </label>
                      <input
                        id="withdrawalRateInput"
                        type="range"
                        min="3.0"
                        max="6.5"
                        step="0.1"
                        value={inputs.withdrawalRate}
                        onChange={(e) => updateInput('withdrawalRate', parseFloat(e.target.value) || 4.5)}
                        className="mt-2.5 w-full"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                    <div>
                      <label htmlFor="expHousing" className="block text-[11px] font-bold text-slate-700">
                        Housing ($/mo)
                      </label>
                      <input
                        id="expHousing"
                        type="number"
                        value={inputs.expHousing}
                        onChange={(e) => updateInput('expHousing', parseFloat(e.target.value) || 0)}
                        className="mt-1 w-full rounded-lg border border-slate-300 px-2 py-1.5 font-semibold font-num text-xs"
                      />
                    </div>
                    <div>
                      <label htmlFor="expGroceries" className="block text-[11px] font-bold text-slate-700">
                        Groceries ($/mo)
                      </label>
                      <input
                        id="expGroceries"
                        type="number"
                        value={inputs.expGroceries}
                        onChange={(e) => updateInput('expGroceries', parseFloat(e.target.value) || 0)}
                        className="mt-1 w-full rounded-lg border border-slate-300 px-2 py-1.5 font-semibold font-num text-xs"
                      />
                    </div>
                    <div>
                      <label htmlFor="expHealthcare" className="block text-[11px] font-bold text-slate-700">
                        Medical ($/mo)
                      </label>
                      <input
                        id="expHealthcare"
                        type="number"
                        value={inputs.expHealthcare}
                        onChange={(e) => updateInput('expHealthcare', parseFloat(e.target.value) || 0)}
                        className="mt-1 w-full rounded-lg border border-slate-300 px-2 py-1.5 font-semibold font-num text-xs"
                      />
                    </div>
                    <div>
                      <label htmlFor="expCarFun" className="block text-[11px] font-bold text-slate-700">
                        Car/Fun ($/mo)
                      </label>
                      <input
                        id="expCarFun"
                        type="number"
                        value={inputs.expCarFun}
                        onChange={(e) => updateInput('expCarFun', parseFloat(e.target.value) || 0)}
                        className="mt-1 w-full rounded-lg border border-slate-300 px-2 py-1.5 font-semibold font-num text-xs"
                      />
                    </div>
                  </div>

                  <div className="bg-emerald-50/90 border border-emerald-300 rounded-xl p-3.5 text-xs">
                    <div className="font-bold text-emerald-950">
                      Why{' '}
                      <span id="equivRetireAnnual" className="font-num">
                        {formatUSD(metrics.annualTotalRetire)}/yr
                      </span>{' '}
                      in Retirement Feels Like{' '}
                      <span id="equivWorkingSalary" className="underline font-extrabold font-num">
                        {formatUSD(metrics.equivWorkingSalary)}/yr
                      </span>{' '}
                      Working:
                    </div>
                    <p className="text-slate-700 mt-1 leading-relaxed">
                      Once retired, you stop paying <strong>7.65% FICA payroll tax</strong>, stop putting <strong>10–15% into a 401(k)</strong>, and drop commuting costs.
                    </p>
                  </div>
                </div>
              </div>

              {/* 3-Bucket Nest Egg Shield */}
              <div className="chalkboard-bg rounded-2xl p-5 text-white space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-400/30 pb-3">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-amber-300">
                      Crash Protection System
                    </div>
                    <h2 className="text-lg font-extrabold text-white mt-0.5">
                      Your &ldquo;3-Bucket&rdquo; Nest Egg Shield
                    </h2>
                  </div>
                  <span
                    id="monthlyPortfolioDrawBadge"
                    className="px-3 py-1 rounded-lg bg-amber-400 text-slate-950 font-extrabold text-sm font-num"
                  >
                    {formatUSD(metrics.monthlyPortDraw)}/mo Draw
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  <div className="chalk-card rounded-xl p-4">
                    <div className="text-xs font-bold text-emerald-300 uppercase">Bucket 1 · Years 1–2</div>
                    <div className="text-sm font-bold text-white mt-0.5">Cash &amp; High-Yield Savings</div>
                    <div id="bucket1Amt" className="text-xl font-extrabold text-amber-300 mt-2 font-num">
                      {formatUSD(metrics.bucket1)}
                    </div>
                    <p className="text-xs text-emerald-100 mt-1 leading-relaxed">
                      24 months of draws locked in safe 4.5% HYSA.
                    </p>
                  </div>
                  <div className="chalk-card rounded-xl p-4">
                    <div className="text-xs font-bold text-amber-300 uppercase">Bucket 2 · Years 3–8</div>
                    <div className="text-sm font-bold text-white mt-0.5">T-Bills, CDs &amp; Bonds</div>
                    <div id="bucket2Amt" className="text-xl font-extrabold text-amber-300 mt-2 font-num">
                      {formatUSD(metrics.bucket2)}
                    </div>
                    <p className="text-xs text-emerald-100 mt-1 leading-relaxed">
                      6 years of steady income so you never sell stocks low.
                    </p>
                  </div>
                  <div className="chalk-card rounded-xl p-4">
                    <div className="text-xs font-bold text-sky-300 uppercase">Bucket 3 · Year 9+</div>
                    <div className="text-sm font-bold text-white mt-0.5">Index &amp; Dividend Funds</div>
                    <div id="bucket3Amt" className="text-xl font-extrabold text-amber-300 mt-2 font-num">
                      {formatUSD(metrics.bucket3)}
                    </div>
                    <p className="text-xs text-emerald-100 mt-1 leading-relaxed">
                      Long-term inflation growth untouched for 8 years.
                    </p>
                  </div>
                </div>

                <div className="bg-[#0f291e] rounded-xl p-3.5 text-xs text-amber-100 border border-amber-400/25 leading-relaxed">
                  <strong>Chalkboard Rule:</strong> With Buckets 1 &amp; 2 holding{' '}
                  <strong>
                    <span id="yearsProtectedText">{metrics.yearsProtected} full years</span>
                  </strong>{' '}
                  of portfolio withdrawals in safe cash and bonds, a stock market crash cannot touch your monthly grocery money.
                </div>
              </div>

              {/* Go-Go, Slow-Go, No-Go Chart */}
              <div className="surface-card rounded-2xl p-5 space-y-4">
                <h3 className="text-base font-extrabold text-slate-900">
                  &ldquo;Go-Go (60s), Slow-Go (70s), No-Go (80s)&rdquo; Cash Flow
                </h3>
                <PaycheckCashFlowChart
                  totalPaycheck={metrics.totalMonthlyPaycheck}
                  gogoSpend={metrics.gogoSpend}
                  slowgoSpend={metrics.slowgoSpend}
                  nogoSpend={metrics.nogoSpend}
                />
                <div className="grid grid-cols-3 gap-2.5 text-center text-xs pt-1">
                  <div className="bg-emerald-50/90 p-2.5 rounded-xl border border-emerald-200">
                    <div className="font-bold text-emerald-900">Go-Go (Age 62–70)</div>
                    <div id="gogoSpendText" className="font-extrabold text-slate-900 mt-0.5 font-num">
                      {formatUSD(metrics.gogoSpend)}/mo
                    </div>
                  </div>
                  <div className="bg-amber-50/90 p-2.5 rounded-xl border border-amber-200">
                    <div className="font-bold text-amber-900">Slow-Go (Age 71–80)</div>
                    <div id="slowgoSpendText" className="font-extrabold text-slate-900 mt-0.5 font-num">
                      {formatUSD(metrics.slowgoSpend)}/mo
                    </div>
                  </div>
                  <div className="bg-sky-50/90 p-2.5 rounded-xl border border-sky-200">
                    <div className="font-bold text-sky-900">No-Go (Age 81+)</div>
                    <div id="nogoSpendText" className="font-extrabold text-slate-900 mt-0.5 font-num">
                      {formatUSD(metrics.nogoSpend)}/mo
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* TAB 2: CLAIMING AGE & WORKING RULES */}
            <section
              id="tab-claiming"
              className={`tab-panel space-y-6 ${activeTab === 'tab-claiming' ? '' : 'hidden'}`}
            >
              <div className="surface-card rounded-2xl p-5 space-y-4">
                <h2 className="text-lg font-extrabold text-slate-900 border-b border-slate-200 pb-3">
                  Social Security Claiming Age: 62 vs. 67 (FRA) vs. 70 Break-Even
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="fraBenefitInput" className="block text-sm font-bold text-slate-800">
                      Your Full Retirement Age (67) Benefit ($/mo)
                    </label>
                    <input
                      id="fraBenefitInput"
                      type="number"
                      step="50"
                      value={inputs.fraBenefit}
                      onChange={(e) => updateInput('fraBenefit', parseFloat(e.target.value) || 0)}
                      className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50/50 focus:bg-white focus:border-[#1b4332] focus:outline-none px-3.5 py-2 font-bold font-num"
                    />
                  </div>
                  <div>
                    <label htmlFor="lifeExpInput" className="block text-sm font-bold text-slate-800">
                      Compare Total Lifetime Payout at Age:{' '}
                      <span id="lifeExpVal" className="text-emerald-800 font-extrabold font-num">
                        {metrics.targetAge}
                      </span>
                    </label>
                    <input
                      id="lifeExpInput"
                      type="range"
                      min="68"
                      max="95"
                      step="1"
                      value={inputs.lifeExpAge}
                      onChange={(e) => updateInput('lifeExpAge', parseInt(e.target.value, 10) || 82)}
                      className="mt-2.5 w-full"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-3.5 rounded-xl bg-amber-50/90 border border-amber-300">
                    <div className="text-xs font-bold uppercase text-amber-900">Claim Early at 62 (70%)</div>
                    <div id="claim62Mo" className="text-xl font-extrabold text-slate-900 mt-1 font-num">
                      {formatUSD(metrics.mo62)}/mo
                    </div>
                    <div id="claim62Total" className="text-xs font-semibold text-slate-700 mt-1 font-num">
                      Total by {metrics.targetAge}: {formatUSD(metrics.total62AtTarget)}
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-emerald-50/90 border-2 border-emerald-500">
                    <div className="text-xs font-bold uppercase text-emerald-900">Claim Full at 67 (100% FRA)</div>
                    <div id="claim67Mo" className="text-xl font-extrabold text-emerald-900 mt-1 font-num">
                      {formatUSD(metrics.mo67)}/mo
                    </div>
                    <div id="claim67Total" className="text-xs font-semibold text-slate-700 mt-1 font-num">
                      Total by {metrics.targetAge}: {formatUSD(metrics.total67AtTarget)}
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-sky-50/90 border border-sky-300">
                    <div className="text-xs font-bold uppercase text-sky-900">Claim Max at 70 (124%)</div>
                    <div id="claim70Mo" className="text-xl font-extrabold text-sky-900 mt-1 font-num">
                      {formatUSD(metrics.mo70)}/mo
                    </div>
                    <div id="claim70Total" className="text-xs font-semibold text-slate-700 mt-1 font-num">
                      Total by {metrics.targetAge}: {formatUSD(metrics.total70AtTarget)}
                    </div>
                  </div>
                </div>

                <BreakevenLineChart series={metrics.breakevenSeries} targetAge={metrics.targetAge} />

                <div className="bg-[#1b4332] text-amber-100 p-4 rounded-xl text-xs md:text-sm leading-relaxed">
                  <strong>Chalkboard Verdict:</strong> Claiming at 67 beats claiming at 62 once you live past <strong>Age 78 and 8 months</strong>. Claiming at 70 beats age 67 after <strong>Age 82 and 6 months</strong>.
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Side-Gig Penalty Checker */}
                <div className="surface-card rounded-2xl p-5 space-y-4">
                  <h2 className="text-base font-extrabold text-slate-900 border-b border-slate-200 pb-2.5">
                    Part-Time / Side-Gig Penalty Checker ($24,480 Limit)
                  </h2>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    If you claim Social Security before age 67 and work part-time, SSA withholds $1 for every $2 earned above <strong>$24,480/yr</strong> in 2026.
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="sideGigIncome" className="block text-xs font-bold text-slate-800">
                        Annual Part-Time ($)
                      </label>
                      <input
                        id="sideGigIncome"
                        type="number"
                        step="1000"
                        value={inputs.sideGigIncome}
                        onChange={(e) => updateInput('sideGigIncome', parseFloat(e.target.value) || 0)}
                        className="mt-1.5 w-full rounded-xl border border-slate-300 px-3 py-2 font-bold font-num text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="sideGigHourly" className="block text-xs font-bold text-slate-800">
                        Hourly Rate ($/hr)
                      </label>
                      <input
                        id="sideGigHourly"
                        type="number"
                        value={inputs.sideGigHourly}
                        onChange={(e) => updateInput('sideGigHourly', parseFloat(e.target.value) || 25)}
                        className="mt-1.5 w-full rounded-xl border border-slate-300 px-3 py-2 font-bold font-num text-sm"
                      />
                    </div>
                  </div>

                  {metrics.sideGigExcess > 0 ? (
                    <div
                      id="sideGigResultBox"
                      className="p-3.5 rounded-xl bg-red-50 border border-red-300 text-xs space-y-1"
                    >
                      <div id="sideGigPenaltyTitle" className="font-extrabold text-red-900 text-sm">
                        ⚠️ Penalty Alert: {formatUSD(metrics.sideGigPenalty)}/yr Withheld!
                      </div>
                      <p id="sideGigPenaltyDesc" className="text-slate-700 leading-relaxed">
                        You are <span className="font-num font-bold">{formatUSD(metrics.sideGigExcess)}</span> above $24,480. Cap work at{' '}
                        <strong className="font-num">{metrics.safeHoursPerMonth} hrs/mo</strong> ($2,040/mo) to avoid early Social Security clawbacks.
                      </p>
                    </div>
                  ) : (
                    <div
                      id="sideGigResultBox"
                      className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-xs space-y-1"
                    >
                      <div id="sideGigPenaltyTitle" className="font-extrabold text-emerald-950 text-sm">
                        ✅ $0 Penalty (You Keep 100% of Your Check!)
                      </div>
                      <p id="sideGigPenaltyDesc" className="text-slate-700 leading-relaxed">
                        You are <span className="font-num font-bold">{formatUSD(metrics.sideGigBuffer)}</span> below the limit. You can work up to{' '}
                        <strong className="font-num">{metrics.safeHoursPerMonth} hrs/mo</strong> penalty-free.
                      </p>
                    </div>
                  )}
                </div>

                {/* Mortgage vs Safe Cash */}
                <div className="surface-card rounded-2xl p-5 space-y-4">
                  <h2 className="text-base font-extrabold text-slate-900 border-b border-slate-200 pb-2.5">
                    Pay Off Mortgage at 62 or Keep Cash in Bucket 1–2?
                  </h2>
                  <div className="grid grid-cols-3 gap-2.5">
                    <div>
                      <label htmlFor="mortBalance" className="block text-xs font-bold text-slate-700">
                        Balance ($)
                      </label>
                      <input
                        id="mortBalance"
                        type="number"
                        step="5000"
                        value={inputs.mortBalance}
                        onChange={(e) => updateInput('mortBalance', parseFloat(e.target.value) || 0)}
                        className="mt-1 w-full rounded-lg border border-slate-300 px-2.5 py-1.5 font-bold font-num text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="mortRate" className="block text-xs font-bold text-slate-700">
                        Mortgage (%)
                      </label>
                      <input
                        id="mortRate"
                        type="number"
                        step="0.1"
                        value={inputs.mortRate}
                        onChange={(e) => updateInput('mortRate', parseFloat(e.target.value) || 0)}
                        className="mt-1 w-full rounded-lg border border-slate-300 px-2.5 py-1.5 font-bold font-num text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="hysaRate" className="block text-xs font-bold text-slate-700">
                        Safe CD (%)
                      </label>
                      <input
                        id="hysaRate"
                        type="number"
                        step="0.1"
                        value={inputs.hysaRate}
                        onChange={(e) => updateInput('hysaRate', parseFloat(e.target.value) || 0)}
                        className="mt-1 w-full rounded-lg border border-slate-300 px-2.5 py-1.5 font-bold font-num text-sm"
                      />
                    </div>
                  </div>

                  <div
                    id="mortVerdictBox"
                    className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-xs text-slate-800 leading-relaxed"
                  >
                    {metrics.keepCashAdvantage ? (
                      <>
                        <strong>Keep Cash in Bucket 1–2:</strong> Safe CDs/T-Bills earn{' '}
                        <strong className="font-num">{metrics.hysaRate}%</strong> vs your{' '}
                        <strong className="font-num">{metrics.mortRate}%</strong> mortgage (+
                        <span className="font-num font-bold">{formatUSD(metrics.mortAnnualDiff)}/yr</span> net gain).
                      </>
                    ) : (
                      <>
                        <strong>Pay Off Gradually:</strong> Your mortgage (
                        <span className="font-num">{metrics.mortRate}%</span>) costs more than safe cash yields (
                        <span className="font-num">{metrics.hysaRate}%</span>), costing{' '}
                        <span className="font-num font-bold">{formatUSD(metrics.mortAnnualDiff)}/yr</span>.
                      </>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* TAB 3: 1984 GHOST TAX, ROTH SWEET SPOT, IRMAA & ACA BRIDGE */}
            <section
              id="tab-taxshield"
              className={`tab-panel space-y-6 ${activeTab === 'tab-taxshield' ? '' : 'hidden'}`}
            >
              <div className="surface-card rounded-2xl p-5 space-y-4">
                <h2 className="text-lg font-extrabold text-slate-900 border-b border-slate-200 pb-2.5">
                  1984 IRS &ldquo;Ghost Tax&rdquo; Speedometer &amp; Roth Conversion Sweet Spot
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="taxFilingStatus" className="block text-sm font-bold text-slate-800">
                      Tax Filing Status
                    </label>
                    <select
                      id="taxFilingStatus"
                      value={inputs.taxFilingStatus}
                      onChange={(e) => updateInput('taxFilingStatus', e.target.value as 'married' | 'single')}
                      className="mt-1.5 w-full rounded-xl border border-slate-300 px-3 py-2 font-bold bg-white"
                    >
                      <option value="married">Married Filing Jointly ($32K / $44K)</option>
                      <option value="single">Single Individual ($25K / $34K)</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="taxPreTaxDraw" className="block text-sm font-bold text-slate-800">
                      Annual Pre-Tax 401(k)/IRA Draw ($/yr)
                    </label>
                    <input
                      id="taxPreTaxDraw"
                      type="number"
                      step="1000"
                      value={inputs.taxPreTaxDraw}
                      onChange={(e) => updateInput('taxPreTaxDraw', parseFloat(e.target.value) || 0)}
                      className="mt-1.5 w-full rounded-xl border border-slate-300 px-3.5 py-2 font-bold font-num"
                    />
                  </div>
                  <div>
                    <label htmlFor="taxRothDraw" className="block text-sm font-bold text-slate-800">
                      Annual Tax-Free Roth Draw ($/yr)
                    </label>
                    <input
                      id="taxRothDraw"
                      type="number"
                      step="1000"
                      value={inputs.taxRothDraw}
                      onChange={(e) => updateInput('taxRothDraw', parseFloat(e.target.value) || 0)}
                      className="mt-1.5 w-full rounded-xl border border-slate-300 px-3.5 py-2 font-bold font-num text-emerald-800"
                    />
                  </div>
                  <div>
                    <label htmlFor="taxInterest" className="block text-sm font-bold text-slate-800">
                      Annual CD / Bond Interest ($/yr)
                    </label>
                    <input
                      id="taxInterest"
                      type="number"
                      step="500"
                      value={inputs.taxInterest}
                      onChange={(e) => updateInput('taxInterest', parseFloat(e.target.value) || 0)}
                      className="mt-1.5 w-full rounded-xl border border-slate-300 px-3.5 py-2 font-bold font-num"
                    />
                  </div>
                </div>

                <div className="chalkboard-bg rounded-xl p-4 text-white space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold uppercase text-amber-300">
                      Your IRS Combined (Provisional) Income:
                    </span>
                    <span id="combinedIncomeValue" className="text-2xl font-extrabold text-white font-num">
                      {formatUSD(metrics.combinedIncome)} / yr
                    </span>
                  </div>

                  <div className="w-full h-5 bg-slate-800 rounded-full overflow-hidden flex border border-amber-400/50 p-0.5">
                    <div
                      id="taxMeterBar"
                      className={`h-full rounded-full transition-all duration-300 ${
                        metrics.taxZone === '0% Zone'
                          ? 'bg-emerald-400'
                          : metrics.taxZone === '50% Zone'
                          ? 'bg-amber-400'
                          : 'bg-red-500'
                      }`}
                      style={{ width: `${metrics.meterPct}%` }}
                    />
                  </div>

                  <div className="flex justify-between text-xs text-emerald-200 font-semibold font-num">
                    <span>0% Tax Zone</span>
                    <span id="taxLine50Label">50% Line ({formatUSD(metrics.line50)})</span>
                    <span id="taxLine85Label">85% Line ({formatUSD(metrics.line85)})</span>
                  </div>

                  <div
                    id="ghostTaxStatusText"
                    className="bg-[#0f291e] p-3.5 rounded-lg text-xs md:text-sm text-amber-100 border border-amber-400/30 leading-relaxed"
                  >
                    {metrics.taxZone === '0% Zone' && (
                      <>
                        ✅ <strong>0% Tax-Free Social Security Zone!</strong> Your combined income sits below{' '}
                        <span className="font-num">{formatUSD(metrics.line50)}</span> (plus your{' '}
                        <span className="font-num">{formatUSD(metrics.rothDraw)}/yr</span> Roth draw is 100% tax-free).
                      </>
                    )}
                    {metrics.taxZone === '50% Zone' && (
                      <>
                        ⚡ <strong>50% Tax Zone:</strong> Shift{' '}
                        <strong className="font-num">{formatUSD(metrics.shiftToRothNeeded)}/yr</strong> from Pre-Tax 401(k) to your{' '}
                        <strong>Roth bucket</strong> to make Social Security 0% tax-free!
                      </>
                    )}
                    {metrics.taxZone === '85% Zone' && (
                      <>
                        ⚠️ <strong>85% Tax Zone:</strong> Shift{' '}
                        <strong className="font-num">
                          {formatUSD(metrics.shiftToRothNeeded)}/yr ({formatUSD(metrics.shiftToRothNeeded / 12)}/mo)
                        </strong>{' '}
                        from Traditional 401(k) to your <strong>Roth valve</strong> to drop out of the 85% tax zone!
                      </>
                    )}
                  </div>
                </div>

                <div
                  id="rothSweetSpotBox"
                  className="p-4 rounded-xl bg-emerald-50 border border-emerald-400 text-xs md:text-sm text-slate-800 space-y-1 leading-relaxed"
                >
                  <div className="font-extrabold text-emerald-950">
                    🎯 Your Annual Roth Conversion &ldquo;Sweet Spot&rdquo; (Before Age 73 RMDs):{' '}
                    <span className="font-num">{formatUSD(metrics.rothSweetSpotRoom)}/yr</span>
                  </div>
                  <p className="text-xs text-slate-700">
                    You can convert up to <strong className="font-num">{formatUSD(metrics.rothSweetSpotRoom)}</strong> this year from your Traditional 401(k)/IRA into a tax-free Roth IRA while staying inside the low 12% federal bracket!
                  </p>
                </div>

                <div className="bg-amber-50/90 rounded-xl p-4 border border-amber-400 space-y-2">
                  <div className="text-xs font-bold uppercase text-amber-900">
                    2026 SECURE 2.0 Super Catch-Up (Ages 60–63)
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                    <select
                      id="workerAgeSelect"
                      aria-label="Worker Age Catch-Up Group"
                      value={inputs.workerAgeGroup}
                      onChange={(e) => updateInput('workerAgeGroup', e.target.value as '55' | '61' | '65')}
                      className="rounded-lg border border-slate-300 px-2.5 py-2 font-bold text-sm bg-white"
                    >
                      <option value="55">Age 50–59 ($8,000 Catch-Up)</option>
                      <option value="61">Age 60–63 ($11,250 Super Catch-Up)</option>
                      <option value="65">Age 64+ ($8,000 Catch-Up)</option>
                    </select>
                    <div id="superCatchupOutput" className="text-xs text-slate-800 font-semibold leading-relaxed">
                      {inputs.workerAgeGroup === '61' ? (
                        <>
                          🎉 <strong>Age 60–63 Super Catch-Up:</strong> Up to <strong className="font-num">$35,750</strong> total 401(k) limit ($11,250 catch-up)!
                        </>
                      ) : (
                        <>
                          📌 <strong>Age 50+ Standard Catch-Up:</strong> Up to <strong className="font-num">$32,500</strong> total 401(k) limit.
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* IRMAA Appeal Checker */}
                <div className="surface-card rounded-2xl p-5 space-y-4">
                  <h2 className="text-base font-extrabold text-slate-900 border-b border-slate-200 pb-2.5">
                    Medicare IRMAA Cliff &amp; &ldquo;Form SSA-44&rdquo; Appeal
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="irmaa2025Income" className="block text-xs font-bold text-slate-800">
                        2025 Tax Return MAGI ($)
                      </label>
                      <input
                        id="irmaa2025Income"
                        type="number"
                        step="5000"
                        value={inputs.irmaa2025Income}
                        onChange={(e) => updateInput('irmaa2025Income', parseFloat(e.target.value) || 0)}
                        className="mt-1.5 w-full rounded-xl border border-slate-300 px-3 py-2 font-bold font-num text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="irmaaRetiredEvent" className="block text-xs font-bold text-slate-800">
                        Retired Since 2025?
                      </label>
                      <select
                        id="irmaaRetiredEvent"
                        value={inputs.irmaaRetiredEvent}
                        onChange={(e) => updateInput('irmaaRetiredEvent', e.target.value as 'yes' | 'no')}
                        className="mt-1.5 w-full rounded-xl border border-slate-300 px-2.5 py-2 font-bold bg-white text-xs"
                      >
                        <option value="yes">Yes — Retired / Cut Hours</option>
                        <option value="no">No — Income Unchanged</option>
                      </select>
                    </div>
                  </div>

                  <div
                    id="irmaaVerdictBox"
                    className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-400 text-xs space-y-1 leading-relaxed"
                  >
                    {metrics.irmaaCanAppealWithSSA44 ? (
                      <>
                        <div className="font-extrabold text-emerald-950 text-sm">
                          ✅ File Form SSA-44 Immediately (Save ~$1,800+/yr)!
                        </div>
                        <p className="text-slate-800">
                          Your 2025 working income (<span className="font-num font-bold">{formatUSD(metrics.irmaaIncome)}</span>) exceeds{' '}
                          <span className="font-num font-bold">{formatUSD(metrics.irmaaLimit)}</span>. File{' '}
                          <strong>Form SSA-44 (Work Stoppage)</strong> so Medicare drops your 2027 IRMAA surcharge!
                        </p>
                      </>
                    ) : metrics.irmaaOverLimit ? (
                      <>
                        <div className="font-extrabold text-amber-950 text-sm">⚠️ 2027 IRMAA Surcharge Applies</div>
                        <p className="text-slate-800">
                          Your 2025 MAGI (<span className="font-num font-bold">{formatUSD(metrics.irmaaIncome)}</span>) exceeds{' '}
                          <span className="font-num font-bold">{formatUSD(metrics.irmaaLimit)}</span>.
                        </p>
                      </>
                    ) : (
                      <div className="font-extrabold text-emerald-950 text-sm">
                        🎉 $0 IRMAA Surcharge (<span className="font-num">{formatUSD(metrics.irmaaBuffer)}</span> safety buffer)!
                      </div>
                    )}
                  </div>
                </div>

                {/* ACA Bridge */}
                <div className="surface-card rounded-2xl p-5 space-y-4">
                  <h2 className="text-base font-extrabold text-slate-900 border-b border-slate-200 pb-2.5">
                    Age 60–65 Pre-Medicare ACA Healthcare Bridge
                  </h2>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="acaCurrentAge" className="block text-xs font-bold text-slate-800">
                        Current Age (Under 65):
                      </label>
                      <input
                        id="acaCurrentAge"
                        type="number"
                        min="55"
                        max="64"
                        value={inputs.acaCurrentAge}
                        onChange={(e) => updateInput('acaCurrentAge', parseInt(e.target.value, 10) || 62)}
                        className="mt-1.5 w-full rounded-xl border border-slate-300 px-3 py-2 font-bold font-num text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="acaMagiInput" className="block text-xs font-bold text-slate-800">
                        Planned Taxable MAGI ($):
                      </label>
                      <input
                        id="acaMagiInput"
                        type="number"
                        step="2000"
                        value={inputs.acaMagi}
                        onChange={(e) => updateInput('acaMagi', parseFloat(e.target.value) || 0)}
                        className="mt-1.5 w-full rounded-xl border border-slate-300 px-3 py-2 font-bold font-num text-sm"
                      />
                    </div>
                  </div>
                  <div
                    id="acaBridgeResult"
                    className="p-3.5 rounded-xl bg-sky-50 border border-sky-300 text-xs text-slate-800 leading-relaxed"
                  >
                    <strong>🏥 {metrics.acaYearsToMedicare}-Year Bridge to Medicare:</strong> Estimated ACA benchmark Silver plan near{' '}
                    <strong className="font-num">~{formatUSD(metrics.acaEstimatedMonthlyPremium)}/mo</strong>. Use Roth/Cash for extra expenses to protect your subsidy!
                  </div>
                </div>
              </div>
            </section>

            {/* TAB 4: SENIOR SCAM RADAR & DEC 7 MEDICARE AUDIT */}
            <section
              id="tab-safety"
              className={`tab-panel space-y-6 ${activeTab === 'tab-safety' ? '' : 'hidden'}`}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="surface-card rounded-2xl p-5 space-y-4">
                  <h2 className="text-base font-extrabold text-slate-900 border-b border-slate-200 pb-2.5">
                    &ldquo;Is This Call, Text, or Letter a Scam?&rdquo; 5-Second Detector
                  </h2>
                  <div className="space-y-2.5 text-sm">
                    {SCAM_ITEMS.map((item) => (
                      <label
                        key={item.id}
                        className={`flex items-start gap-3 p-3 rounded-xl border transition-colors cursor-pointer text-xs sm:text-sm ${
                          checkedScams[item.id]
                            ? 'bg-red-50/90 border-red-400'
                            : 'border-slate-200 hover:bg-red-50/40'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={!!checkedScams[item.id]}
                          onChange={(e) =>
                            setCheckedScams((prev) => ({
                              ...prev,
                              [item.id]: e.target.checked,
                            }))
                          }
                          className="scam-check mt-1 w-5 h-5 accent-red-600 shrink-0"
                        />
                        <span className="leading-relaxed">
                          <strong>{item.title}</strong> {item.desc}
                        </span>
                      </label>
                    ))}
                  </div>

                  {scamCount === 0 ? (
                    <div
                      id="scamAlertBanner"
                      className="p-4 rounded-xl bg-emerald-50 border border-emerald-400 text-sm"
                    >
                      <div className="font-extrabold text-emerald-950">🛡️ No Red Flags Checked Yet</div>
                      <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                        Social Security, the IRS, and Medicare will NEVER call, text, or email you to demand fees or bank passwords.
                      </p>
                    </div>
                  ) : (
                    <div
                      id="scamAlertBanner"
                      className="p-4 rounded-xl bg-red-100 border-2 border-red-600 text-sm"
                    >
                      <div className="font-extrabold text-red-950">
                        🚨 100% SCAM DETECTED ({scamCount} Red Flag{scamCount > 1 ? 's' : ''}) — HANG UP OR DELETE IMMEDIATELY!
                      </div>
                      <p className="text-xs text-red-900 mt-1 leading-relaxed">
                        Do NOT click any links or share your Medicare/SSN. Call Social Security directly at <strong>1-800-772-1213</strong> or report at <strong>OIG.SSA.GOV</strong>.
                      </p>
                    </div>
                  )}
                </div>

                <div className="surface-card rounded-2xl p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2.5 gap-2">
                    <h2 className="text-base font-extrabold text-slate-900">
                      Nov / Dec 7th &ldquo;Keep Your Raise&rdquo; Audit
                    </h2>
                    <span
                      id="checklistProgressBadge"
                      className="px-3 py-1 rounded-lg bg-emerald-800 text-amber-300 font-extrabold text-xs font-num shrink-0"
                    >
                      {auditCount} / 5 Done
                    </span>
                  </div>

                  <div className="space-y-2.5 text-xs sm:text-sm">
                    {AUDIT_ITEMS.map((item) => (
                      <label
                        key={item.id}
                        className={`flex items-start gap-3 p-3 rounded-xl border transition-colors cursor-pointer ${
                          checkedAudits[item.id]
                            ? 'bg-emerald-50/80 border-emerald-400'
                            : 'border-slate-200 hover:bg-emerald-50/30'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={!!checkedAudits[item.id]}
                          onChange={(e) => {
                            const next = {
                              ...checkedAudits,
                              [item.id]: e.target.checked,
                            };
                            setCheckedAudits(next);
                            if (Object.values(next).filter(Boolean).length === 5) {
                              showToast('🎉 All 5 November Protection Steps Completed!');
                            }
                          }}
                          className="audit-check mt-1 w-5 h-5 accent-emerald-700 shrink-0"
                        />
                        <span className="leading-relaxed">
                          <strong>{item.title}</strong> {item.desc}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* TAB 5: PRINTABLE PLAN & SPOUSE EMERGENCY BINDER */}
            <section
              id="tab-binder"
              className={`tab-panel space-y-6 ${activeTab === 'tab-binder' ? '' : 'hidden'}`}
            >
              <div className="surface-card rounded-2xl p-6 space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900">
                      1-Page Printable Retirement Plan &amp; Family Emergency Locator
                    </h2>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Never enter passwords or account numbers here—just record <em>where</em> physical folders are kept at home.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2.5 no-print">
                    <button
                      id="copySummaryBtn"
                      type="button"
                      onClick={handleCopySummary}
                      className="px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-amber-200 font-bold text-sm shadow-xs transition-colors cursor-pointer"
                    >
                      📋 Copy Plan Summary
                    </button>
                    <button
                      id="printPlanBtn"
                      type="button"
                      onClick={() => window.print()}
                      className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-sm shadow-xs transition-colors cursor-pointer"
                    >
                      🖨️ Print My 1-Page Plan
                    </button>
                  </div>
                </div>

                <div className="bg-[#f8f5ec] rounded-xl p-5 border-2 border-[#1b4332] space-y-3">
                  <h3 className="text-sm font-extrabold text-[#1b4332] uppercase tracking-wider border-b border-slate-300 pb-2">
                    Your Personalized No-Suit Retirement Snapshot
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5 text-sm">
                    <div className="bg-white p-3.5 rounded-xl border border-slate-300">
                      <div className="text-xs text-slate-500 font-bold">2027 Net Social Security</div>
                      <div id="printNetSS" className="text-lg font-extrabold text-emerald-800 mt-0.5 font-num">
                        {formatUSD(metrics.newNetSS)}/mo
                      </div>
                    </div>
                    <div className="bg-white p-3.5 rounded-xl border border-slate-300">
                      <div className="text-xs text-slate-500 font-bold">Portfolio Safe Monthly Draw</div>
                      <div id="printPortDraw" className="text-lg font-extrabold text-slate-900 mt-0.5 font-num">
                        {formatUSD(metrics.monthlyPortDraw)}/mo ({metrics.drawRate.toFixed(1)}%)
                      </div>
                    </div>
                    <div className="bg-white p-3.5 rounded-xl border border-slate-300">
                      <div className="text-xs text-slate-500 font-bold">3-Bucket Allocation</div>
                      <div id="printBuckets" className="text-xs font-bold text-slate-800 mt-1 font-num">
                        Cash: {formatUSD(metrics.bucket1)} · Bonds: {formatUSD(metrics.bucket2)} · Growth: {formatUSD(metrics.bucket3)}
                      </div>
                    </div>
                    <div className="bg-white p-3.5 rounded-xl border border-slate-300">
                      <div className="text-xs text-slate-500 font-bold">1984 IRS Tax Status</div>
                      <div id="printTaxStatus" className="text-xs font-bold text-red-700 mt-1 font-num">
                        Combined: {formatUSD(metrics.combinedIncome)} ({metrics.taxZone})
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="locWill" className="block text-xs font-bold text-slate-700">
                      Where Original Will, Trust &amp; Power of Attorney Are Kept:
                    </label>
                    <input
                      id="locWill"
                      type="text"
                      value={locWill}
                      onChange={(e) => setLocWill(e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm font-medium"
                    />
                  </div>
                  <div>
                    <label htmlFor="loc401k" className="block text-xs font-bold text-slate-700">
                      401(k) / IRA / Pension Institution Names (No Account #s):
                    </label>
                    <input
                      id="loc401k"
                      type="text"
                      value={loc401k}
                      onChange={(e) => setLoc401k(e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm font-medium"
                    />
                  </div>
                  <div>
                    <label htmlFor="locInsurance" className="block text-xs font-bold text-slate-700">
                      Medicare Supplement / Life Insurance &amp; Home Deed Location:
                    </label>
                    <input
                      id="locInsurance"
                      type="text"
                      value={locInsurance}
                      onChange={(e) => setLocInsurance(e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm font-medium"
                    />
                  </div>
                  <div>
                    <label htmlFor="locContacts" className="block text-xs font-bold text-slate-700">
                      Trusted CPA / Tax Preparer / Family Contact Name &amp; Phone:
                    </label>
                    <input
                      id="locContacts"
                      type="text"
                      value={locContacts}
                      onChange={(e) => setLocContacts(e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm font-medium"
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* SHARE WITH YOUR SPOUSE OR RETIREMENT FRIEND BAR (#spouseShareBar) right below the Calculator */}
        <SpouseShareBar
          snapshot={{
            netSS: formatUSD(metrics.newNetSS),
            portDraw: formatUSD(metrics.monthlyPortDraw),
            totalPaycheck: formatUSD(metrics.totalMonthlyPaycheck),
            bucket1: formatUSD(metrics.bucket1),
          }}
          onShowToast={showToast}
        />

        {/* YOUTUBE VIDEO SECTION (#youtubeChannelHub / #youtubeVideoSection) */}
        <div id="youtubeChannelHub" className="no-print">
          <section
            id="youtubeVideoSection"
            className="chalkboard-bg rounded-2xl p-6 md:p-8 text-white no-print space-y-6"
          >
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-amber-400/30 pb-4">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-amber-300">
                  Official YouTube Education Hub · @NoSuitRetirement
                </div>
                <h2 className="text-xl md:text-2xl font-extrabold text-white mt-1">
                  Watch Plain-English Chalkboard Retirement Breakdowns
                </h2>
                <p className="text-xs md:text-sm text-emerald-100 mt-1 max-w-2xl">
                  Step-by-step kitchen-table videos walking through real $300K–$500K retirement budgets, 2027 Social Security COLA math, Medicare Part B traps, and the Age 60–63 $11,250 Super Catch-Up.
                </p>
              </div>
              <YouTubeButton variant="hero" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {FEATURED_YOUTUBE_VIDEOS.map((video) => {
                if (video.isChannelLinkOnly) {
                  return (
                    <div
                      key={video.id}
                      id={`videoCard-${video.position}`}
                      onClick={() => {
                        window.open(video.videoUrl, '_blank', 'noopener,noreferrer');
                      }}
                      role="link"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          window.open(video.videoUrl, '_blank', 'noopener,noreferrer');
                        }
                      }}
                      className="chalk-card rounded-2xl p-4 hover:border-amber-400 transition-all group flex flex-col justify-between gap-4 cursor-pointer"
                    >
                      <div className="space-y-3">
                        <a
                          href={video.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          data-ga-event="youtube_video_play"
                          data-video-title={video.title}
                          className="block relative aspect-video w-full rounded-xl overflow-hidden bg-[#0f291e] border border-amber-400/40 flex flex-col items-center justify-center p-4 text-center group-hover:border-amber-300 transition-colors"
                        >
                          <div className="w-12 h-12 rounded-full bg-[#FF0000] text-white flex items-center justify-center shadow-lg mb-2 group-hover:scale-105 transition-transform">
                            <svg className="w-6 h-6 ml-0.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                          <div className="text-[11px] font-extrabold uppercase tracking-wider text-amber-300">
                            @NoSuitRetirement Channel Spotlight
                          </div>
                          <div className="text-xs font-bold text-emerald-100 mt-0.5">
                            Age 60–63 SECURE 2.0 $11,250 Super Catch-Up
                          </div>
                        </a>

                        <div className="space-y-1.5">
                          <div className="text-[11px] font-bold uppercase tracking-wider text-sky-300">
                            {video.badge}
                          </div>
                          <a
                            href={video.videoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            data-ga-event="youtube_video_play"
                            data-video-title={video.title}
                            className="block text-sm md:text-base font-extrabold text-white group-hover:text-amber-200 transition-colors leading-snug"
                          >
                            {video.title}
                          </a>
                          <p className="text-xs text-emerald-100/90 leading-relaxed">
                            {video.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 pt-2 border-t border-amber-400/20">
                        <a
                          id={`watchVideoBtn-${video.position}`}
                          href={video.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          data-ga-event="youtube_video_play"
                          data-video-title={video.title}
                          className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#FF0000] hover:bg-[#cc0000] text-white font-extrabold text-xs shadow-sm transition-colors"
                        >
                          <span>▶ Watch Video</span>
                        </a>
                        <button
                          id={`calcActionBtn-${video.position}`}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleVideoCalculatorAction(video);
                          }}
                          className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs border border-amber-500 transition-colors cursor-pointer"
                        >
                          <span>{video.calculatorActionLabel}</span>
                        </button>
                      </div>
                    </div>
                  );
                }

                return (
                  <div
                    key={video.id}
                    id={`videoCard-${video.position}`}
                    className="chalk-card rounded-2xl p-4 hover:border-amber-400 transition-all group flex flex-col justify-between gap-4"
                  >
                    <div className="space-y-3">
                      <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black border border-amber-400/40">
                        <iframe
                          src={video.embedUrl!}
                          title={video.title}
                          loading="lazy"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          className="w-full h-full border-0"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
                          {video.badge}
                        </div>
                        <a
                          href={video.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-ga-event="youtube_video_play"
                          data-video-title={video.title}
                          className="block text-sm md:text-base font-extrabold text-white hover:text-amber-200 transition-colors leading-snug"
                        >
                          {video.title}
                        </a>
                        <p className="text-xs text-emerald-100/90 leading-relaxed">
                          {video.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 pt-2 border-t border-amber-400/20">
                      <a
                        id={`watchVideoBtn-${video.position}`}
                        href={video.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-ga-event="youtube_video_play"
                        data-video-title={video.title}
                        className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#FF0000] hover:bg-[#cc0000] text-white font-extrabold text-xs shadow-sm transition-colors"
                      >
                        <span>▶ Watch Video</span>
                      </a>
                      <button
                        id={`calcActionBtn-${video.position}`}
                        type="button"
                        onClick={() => handleVideoCalculatorAction(video)}
                        className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs border border-amber-500 transition-colors cursor-pointer"
                      >
                        <span>{video.calculatorActionLabel}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Vet-Checked Senior Tools & Official Links (Tracked via GA4 Custom Events) */}
            <div className="pt-3 border-t border-amber-400/25 flex flex-col md:flex-row items-stretch md:items-center justify-end gap-3 text-xs">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-amber-200/90 font-semibold">Senior Tools &amp; Official Links:</span>
                <a
                  href="https://www.treasurydirect.gov/"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ga-event="affiliate_click"
                  data-affiliate="TreasuryDirect Bucket 2 T-Bills"
                  className="affiliate-link px-3 py-1.5 rounded-lg bg-[#0f291e] hover:bg-emerald-950 text-amber-200 border border-amber-400/30 font-bold"
                >
                  🏦 Bucket 2 T-Bill &amp; HYSA Rates →
                </a>
                <a
                  href="https://www.ssa.gov/forms/ssa-44.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ga-event="affiliate_click"
                  data-affiliate="Official IRS/SSA Form SSA-44 PDF"
                  className="affiliate-link px-3 py-1.5 rounded-lg bg-[#0f291e] hover:bg-emerald-950 text-amber-200 border border-amber-400/30 font-bold"
                >
                  📄 Official Form SSA-44 (PDF) →
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Featured Video Player Modal (Opened by Hero "▶️ Watch Latest Video" Button) */}
      {activeVideoModal && activeVideoModal.embedUrl && (
        <div
          id="featuredVideoModal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="featuredVideoModalTitle"
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 no-print"
          onClick={() => setActiveVideoModal(null)}
        >
          <div
            className="bg-[#143325] text-white rounded-2xl max-w-3xl w-full p-5 md:p-6 border-2 border-amber-400 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3 border-b border-amber-400/30 pb-3">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-amber-300">
                  {activeVideoModal.badge}
                </div>
                <h3 id="featuredVideoModalTitle" className="text-base md:text-lg font-extrabold text-white mt-0.5">
                  {activeVideoModal.title}
                </h3>
              </div>
              <button
                id="closeFeaturedVideoModalBtn"
                type="button"
                onClick={() => setActiveVideoModal(null)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-200 font-bold text-xs cursor-pointer shrink-0"
              >
                ✕ Close
              </button>
            </div>

            <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black border border-amber-400/40">
              <iframe
                src={activeVideoModal.embedUrl}
                title={activeVideoModal.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <a
                href={activeVideoModal.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-ga-event="youtube_video_play"
                data-video-title={activeVideoModal.title}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FF0000] hover:bg-[#cc0000] text-white font-extrabold text-xs shadow-sm"
              >
                <span>▶ Watch Directly on YouTube ({activeVideoModal.videoId}) →</span>
              </a>
              <button
                type="button"
                onClick={() => handleVideoCalculatorAction(activeVideoModal)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs border border-amber-500 cursor-pointer"
              >
                <span>{activeVideoModal.calculatorActionLabel}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <GlossaryModal isOpen={isGlossaryOpen} onClose={() => setIsGlossaryOpen(false)} />
      <PrivacyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />

      {/* Footer with YouTube Channel CTA & Official Disclaimers */}
      <footer className="bg-[#0f291e] text-emerald-100 border-t-2 border-[#b07d4b] py-6 px-4 mt-8 text-xs no-print">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-5">
          <div className="space-y-1.5 text-center lg:text-left max-w-3xl leading-relaxed">
            <div>
              <strong className="text-white">Educational &amp; Non-Affiliation Disclaimer:</strong> Independent educational calculator for illustrative purposes only; not personal financial, tax, legal, or Medicare advice. Not affiliated with or endorsed by the U.S. Government, SSA (
              <a
                href="https://www.ssa.gov"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-amber-300 hover:text-amber-200"
              >
                ssa.gov
              </a>
              ), Medicare (
              <a
                href="https://www.medicare.gov"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-amber-300 hover:text-amber-200"
              >
                medicare.gov
              </a>
              ), or the IRS (
              <a
                href="https://www.irs.gov"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-amber-300 hover:text-amber-200"
              >
                irs.gov
              </a>
              ).
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 shrink-0">
            <YouTubeButton variant="footer" />
            <button
              id="openPrivacyFooterBtn"
              type="button"
              onClick={() => setIsPrivacyOpen(true)}
              className="underline text-amber-300 hover:text-amber-200 font-bold cursor-pointer"
            >
              Privacy Policy &amp; Data Safety
            </button>
            <span
              title="No-Suit Retirement Edition"
              className="text-[11px] text-emerald-300/70 select-none"
            >
              v2027.5
            </span>
          </div>
        </div>
      </footer>

      {/* Cookie & Privacy Consent Bottom Banner (#cookieConsentBanner) */}
      <CookieConsentBanner
        isAccepted={isCookieAccepted}
        onAccept={handleAcceptCookies}
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
      />

      {/* Sticky Mobile Bottom Navigation Bar (#mobileBottomNavBar) */}
      <MobileBottomNavBar
        onGoCalculator={handleMobileGoCalculator}
        onGoVideos={handleMobileGoVideos}
        onGoBinder={handleMobileGoBinder}
      />
    </div>
  );
}
