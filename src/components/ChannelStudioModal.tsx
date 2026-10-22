import React, { useState, useEffect } from 'react';
import {
  AdConfig,
  AdSlotCodeKey,
  AdSlotEnabledKey,
  DEFAULT_AD_CONFIG,
  extractGaMeasurementId,
  extractGscCode,
} from './AdSlots';
import { YOUTUBE_CHANNEL_URL } from './YouTubeButton';
import { buildFullStandaloneHtml } from '../utils/fullStandaloneTemplate';

export const DEFAULT_OWNER_PIN = '2027';


interface ChannelStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  adConfig: AdConfig;
  onSaveAdConfig: (next: AdConfig) => void;
  onShowToast?: (msg: string) => void;
}

interface OwnerPinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUnlockSuccess: () => void;
}

export const OwnerPinModal: React.FC<OwnerPinModalProps> = ({
  isOpen,
  onClose,
  onUnlockSuccess,
}) => {
  const [pinInput, setPinInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (isOpen) {
      setPinInput('');
      setErrorMsg('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === DEFAULT_OWNER_PIN) {
      setErrorMsg('');
      onUnlockSuccess();
    } else {
      setErrorMsg('Incorrect Owner PIN. Default owner PIN is 2027.');
    }
  };

  return (
    <div
      id="ownerPinModal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ownerPinModalTitle"
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 no-print"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-sm w-full p-6 border-2 border-[#1b4332] shadow-2xl space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
              Site Owner Security Lock
            </div>
            <h3 id="ownerPinModalTitle" className="text-lg font-extrabold text-[#1b4332]">
              Unlock Owner Studio &amp; Ad Manager
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs text-slate-700">
          <p>
            Enter your Owner PIN to open <code>#channelStudioModal</code> (or visit with{' '}
            <code>?admin=nosuit</code>).
          </p>
          <div>
            <label htmlFor="ownerPinInput" className="block font-bold text-slate-800">
              Owner PIN
            </label>
            <input
              id="ownerPinInput"
              type="password"
              autoFocus
              placeholder="Enter PIN (2027)"
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 font-num text-sm font-bold text-slate-900 focus:border-[#1b4332] focus:outline-none"
            />
          </div>
          {errorMsg && (
            <div id="ownerPinError" className="text-xs font-bold text-red-700 bg-red-50 border border-red-200 rounded-lg p-2">
              {errorMsg}
            </div>
          )}
          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs cursor-pointer"
            >
              Cancel
            </button>
            <button
              id="submitOwnerPinBtn"
              type="submit"
              className="px-4 py-2 rounded-xl bg-[#1b4332] hover:bg-emerald-900 text-amber-300 font-extrabold text-xs cursor-pointer"
            >
              Unlock Studio
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const SLOT_DEFINITIONS: Array<{
  num: 1 | 2 | 3 | 4;
  slotDomId: string;
  enableLabel: string;
  title: string;
  subtitle: string;
  enabledKey: AdSlotEnabledKey;
  codeKey: AdSlotCodeKey;
  toggleId: string;
  textareaId: string;
  placeholder: string;
}> = [
  {
    num: 1,
    slotDomId: '#adSlotTopBanner',
    enableLabel: 'Enable Ad #1',
    title: 'Top Leaderboard Banner (728×90)',
    subtitle: 'Appears above the 12-column calculator workspace (#adSlotTopBanner).',
    enabledKey: 'topLeaderboardEnabled',
    codeKey: 'topLeaderboardCode',
    toggleId: 'toggleTopLeaderboard',
    textareaId: 'adCodeTopLeaderboard',
    placeholder: '<!-- Paste Google AdSense 728x90 or Adsterra Leaderboard HTML/JS code here -->',
  },
  {
    num: 2,
    slotDomId: '#adSlotSidebarRect',
    enableLabel: 'Enable Ad #2',
    title: 'Right Sidebar Sticky Slot #1 (300×250 Medium Rectangle)',
    subtitle: 'Sticky right column beside calculator inputs (#adSlotSidebarRect).',
    enabledKey: 'sidebarRectEnabled',
    codeKey: 'sidebarRectCode',
    toggleId: 'toggleSidebarRect',
    textareaId: 'adCodeSidebarRect',
    placeholder: '<!-- Paste AdSense 300x250 or Adsterra Medium Rectangle HTML/JS code here -->',
  },
  {
    num: 3,
    slotDomId: '#adSlotSidebarSky',
    enableLabel: 'Enable Ad #3',
    title: 'Right Sidebar Sticky Slot #2 (300×600 Skyscraper / Native)',
    subtitle: 'Sticky right column beside calculator results (#adSlotSidebarSky).',
    enabledKey: 'sidebarSkyscraperEnabled',
    codeKey: 'sidebarSkyscraperCode',
    toggleId: 'toggleSidebarSkyscraper',
    textareaId: 'adCodeSidebarSkyscraper',
    placeholder: '<!-- Paste 160x600 / 300x600 Skyscraper or Adsterra Native Banner code here -->',
  },
  {
    num: 4,
    slotDomId: '#adSlotInContent',
    enableLabel: 'Enable Ad #4',
    title: 'In-Content Horizontal Banner (728×90)',
    subtitle: 'Between Calculator Section and YouTube Video Showcase (#adSlotInContent).',
    enabledKey: 'inContentBannerEnabled',
    codeKey: 'inContentBannerCode',
    toggleId: 'toggleInContentBanner',
    textareaId: 'adCodeInContentBanner',
    placeholder: '<!-- Paste 728x90 In-Content Adsterra or AdSense Banner HTML/JS code here -->',
  },
];

export function generateSitemapXml(): string {
  const today = new Date().toISOString().split('T')[0];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  <url>
    <loc>https://nosuitretirement.com/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <video:video>
      <video:thumbnail_loc>https://nosuitretirement.com/og-cola-medicare.jpg</video:thumbnail_loc>
      <video:title>Why the 2027 Social Security COLA Raise Gets Eaten by Medicare Part B</video:title>
      <video:description>Plain-English chalkboard breakdown of how the Two-Envelope test reveals your true net Social Security deposit after Medicare Part B and Part D deductions.</video:description>
      <video:player_loc>https://www.youtube.com/@NoSuitRetirement</video:player_loc>
    </video:video>
  </url>
</urlset>
`;
}

export function generateRobotsTxt(): string {
  return `User-agent: *
Allow: /

Sitemap: https://nosuitretirement.com/sitemap.xml
`;
}

export function generateBakedStandaloneHtml(config: AdConfig): string {
  return buildFullStandaloneHtml(config);
}


function triggerFileDownload(filename: string, content: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export const ChannelStudioModal: React.FC<ChannelStudioModalProps> = ({
  isOpen,
  onClose,
  adConfig,
  onSaveAdConfig,
  onShowToast,
}) => {
  const [draft, setDraft] = useState<AdConfig>(adConfig);

  useEffect(() => {
    setDraft(adConfig);
  }, [adConfig, isOpen]);

  if (!isOpen) return null;

  const cleanGscCode = extractGscCode(draft.gscVerificationCode);
  const cleanGaId = extractGaMeasurementId(draft.gaMeasurementId);
  const fullGscMetaTag = `<meta name="google-site-verification" content="${cleanGscCode}" />`;
  const fullGaLoaderTag = `<script async src="https://www.googletagmanager.com/gtag/js?id=${cleanGaId}"></script>`;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveAdConfig({
      ...draft,
      gscVerificationCode: cleanGscCode,
      gaMeasurementId: cleanGaId,
    });
    onClose();
  };

  const handleReset = () => {
    setDraft(DEFAULT_AD_CONFIG);
    onSaveAdConfig(DEFAULT_AD_CONFIG);
  };

  const handleDownloadSitemap = () => {
    triggerFileDownload('sitemap.xml', generateSitemapXml(), 'application/xml;charset=utf-8');
    onShowToast?.('Downloaded sitemap.xml for https://nosuitretirement.com/');
  };

  const handleDownloadRobots = () => {
    triggerFileDownload('robots.txt', generateRobotsTxt(), 'text/plain;charset=utf-8');
    onShowToast?.('Downloaded robots.txt for https://nosuitretirement.com/');
  };

  const handleDownloadUpdatedHtml = () => {
    const nextConfig: AdConfig = {
      ...draft,
      gscVerificationCode: cleanGscCode,
      gaMeasurementId: cleanGaId,
    };
    onSaveAdConfig(nextConfig);
    triggerFileDownload(
      'index.html',
      generateBakedStandaloneHtml(nextConfig),
      'text/html;charset=utf-8'
    );
    onShowToast?.(
      'Downloaded index.html with all 4 Ad ON/OFF states, Ad codes, GSC & GA4 Measurement ID baked in!'
    );
  };

  const handleCopyGscTag = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(fullGscMetaTag).catch(() => {});
    }
    onShowToast?.('Copied Google Search Console <meta> tag to clipboard.');
  };

  const activeCount = [
    draft.topLeaderboardEnabled,
    draft.sidebarRectEnabled,
    draft.sidebarSkyscraperEnabled,
    draft.inContentBannerEnabled,
  ].filter(Boolean).length;

  const bothSidebarOff = !draft.sidebarRectEnabled && !draft.sidebarSkyscraperEnabled;

  return (
    <div
      id="channelStudioModal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="channelStudioModalTitle"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 no-print"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 border-2 border-[#1b4332] shadow-2xl space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-200 pb-3 sticky top-0 bg-white z-10">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              🔒 Owner-Only Studio · {activeCount} of 4 Ad Slots Active · PIN: 2027
            </div>
            <h2 id="channelStudioModalTitle" className="text-xl font-extrabold text-[#1b4332]">
              Owner 4-Slot Ad Code Manager &amp; Google SEO Studio
            </h2>
          </div>
          <button
            id="closeChannelStudioBtn"
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
            <span>Close</span>
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-5 text-sm text-slate-800">
          {/* SECTION 1: Owner 4-Slot Ad Code Manager */}
          <div className="space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="text-xs font-extrabold uppercase tracking-wider text-[#1b4332]">
                💰 Owner 4-Slot Ad Code Manager (Individual ON/OFF Switches)
              </div>
              <span className="text-xs font-semibold text-slate-600">
                {bothSidebarOff
                  ? '⚡ Sidebar Ads #2 & #3 OFF → Calculator expands to full 12 columns (lg:col-span-12)'
                  : '📐 Sidebar Active → Calculator 8 cols (lg:col-span-8) + Sticky Sidebar 4 cols (lg:col-span-4)'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SLOT_DEFINITIONS.map((slot) => {
                const isEnabled = Boolean(draft[slot.enabledKey]);
                return (
                  <div
                    key={slot.num}
                    className={`p-4 rounded-xl border transition-colors space-y-2.5 ${
                      isEnabled
                        ? 'bg-[#faf8f2] border-[#c5b9a5]'
                        : 'bg-slate-50 border-slate-200 opacity-80'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <label
                          htmlFor={slot.textareaId}
                          className="block text-xs font-extrabold uppercase text-slate-800"
                        >
                          Ad Slot #{slot.num}: {slot.title}
                        </label>
                        <p className="text-[11px] text-slate-500 mt-0.5">{slot.subtitle}</p>
                      </div>

                      {/* Separate Individual ON/OFF Toggle for this Ad Slot */}
                      <label
                        htmlFor={slot.toggleId}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-extrabold cursor-pointer select-none shrink-0 transition-colors ${
                          isEnabled
                            ? 'bg-emerald-700 text-white border-emerald-800'
                            : 'bg-slate-200 text-slate-700 border-slate-300'
                        }`}
                      >
                        <input
                          id={slot.toggleId}
                          type="checkbox"
                          checked={isEnabled}
                          onChange={(e) =>
                            setDraft((prev) => ({
                              ...prev,
                              [slot.enabledKey]: e.target.checked,
                            }))
                          }
                          className="w-3.5 h-3.5 accent-amber-400 cursor-pointer"
                        />
                        <span>
                          {slot.enableLabel} ({isEnabled ? 'ON' : 'OFF'})
                        </span>
                      </label>
                    </div>

                    <textarea
                      id={slot.textareaId}
                      rows={3}
                      disabled={!isEnabled}
                      placeholder={slot.placeholder}
                      value={draft[slot.codeKey]}
                      onChange={(e) =>
                        setDraft((prev) => ({
                          ...prev,
                          [slot.codeKey]: e.target.value,
                        }))
                      }
                      className={`w-full rounded-xl border p-2.5 font-num text-xs focus:outline-none ${
                        isEnabled
                          ? 'border-slate-300 bg-white focus:border-[#1b4332] text-slate-900'
                          : 'border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed'
                      }`}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* SECTION 2: Google Search Console Verification & 1-Click SEO File Downloads */}
          <div className="p-4 rounded-2xl bg-emerald-50/80 border-2 border-emerald-700/30 space-y-3.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <div className="text-xs font-extrabold uppercase tracking-wider text-emerald-950">
                  🔍 Google Search Console &amp; Rich Schema SEO (https://nosuitretirement.com/)
                </div>
                <p className="text-xs text-slate-600 mt-0.5">
                  Hidden Owner Triggers: <code>?admin=nosuit</code>, <code>Ctrl+Shift+E</code>, or 5-tap footer version text (PIN <code>2027</code>).
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  id="downloadSitemapBtn"
                  type="button"
                  onClick={handleDownloadSitemap}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1b4332] hover:bg-emerald-900 text-amber-300 font-extrabold text-xs shadow-xs transition-colors cursor-pointer"
                >
                  <span>⬇ Download sitemap.xml</span>
                </button>
                <button
                  id="downloadRobotsBtn"
                  type="button"
                  onClick={handleDownloadRobots}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-200 font-extrabold text-xs shadow-xs transition-colors cursor-pointer"
                >
                  <span>⬇ Download robots.txt</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
              <div className="md:col-span-6">
                <label
                  htmlFor="gscVerificationInput"
                  className="block text-xs font-bold text-slate-800"
                >
                  Google Search Console Verification Code (or full <code>&lt;meta&gt;</code> tag)
                </label>
                <input
                  id="gscVerificationInput"
                  type="text"
                  placeholder="YOUR_GSC_CODE"
                  value={draft.gscVerificationCode}
                  onChange={(e) =>
                    setDraft((prev) => ({
                      ...prev,
                      gscVerificationCode: e.target.value,
                    }))
                  }
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 font-num text-xs text-slate-900 focus:border-[#1b4332] focus:outline-none"
                />
              </div>
              <div className="md:col-span-6">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-600">
                    Live <code>&lt;head&gt;</code> Meta Tag Preview:
                  </span>
                  <button
                    id="copyGscMetaBtn"
                    type="button"
                    onClick={handleCopyGscTag}
                    className="text-[11px] font-extrabold text-emerald-800 hover:text-emerald-950 underline cursor-pointer"
                  >
                    Copy &lt;meta&gt; Tag
                  </button>
                </div>
                <div
                  id="gscMetaPreview"
                  className="mt-1 w-full rounded-xl border border-emerald-300 bg-white px-3 py-2 font-num text-[11px] text-emerald-950 truncate"
                >
                  {fullGscMetaTag}
                </div>
              </div>
            </div>

            {/* Google Analytics 4 (GA4) Measurement ID Input Field */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end pt-2 border-t border-emerald-700/20">
              <div className="md:col-span-6">
                <label
                  htmlFor="gaMeasurementIdInput"
                  className="block text-xs font-bold text-slate-800"
                >
                  Google Analytics 4 Measurement ID (G-XXXXXXXXXX)
                </label>
                <input
                  id="gaMeasurementIdInput"
                  type="text"
                  placeholder="G-XXXXXXXXXX"
                  value={draft.gaMeasurementId}
                  onChange={(e) =>
                    setDraft((prev) => ({
                      ...prev,
                      gaMeasurementId: e.target.value,
                    }))
                  }
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 font-num text-xs text-slate-900 focus:border-[#1b4332] focus:outline-none"
                />
              </div>
              <div className="md:col-span-6">
                <span className="block text-[11px] font-bold text-slate-600">
                  Live <code>&lt;head&gt;</code> Dynamic <code>gtag.js</code> Loader Preview:
                </span>
                <div
                  id="gaLoaderPreview"
                  className="mt-1 w-full rounded-xl border border-emerald-300 bg-white px-3 py-2 font-num text-[11px] text-emerald-950 truncate"
                >
                  {fullGaLoaderTag}
                </div>
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-xs text-slate-800 flex flex-wrap items-center justify-between gap-2">
            <span>
              <strong>Bake Into GitHub Export:</strong> Click <strong>Download Updated Website (.html)</strong> below to permanently bake all 4 ON/OFF states and ad codes into a ready-to-upload <code>index.html</code>.
            </span>
            <a
              href={YOUTUBE_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-[#FF0000] underline whitespace-nowrap"
            >
              @NoSuitRetirement Channel →
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-200">
            <div className="flex flex-wrap items-center gap-2">
              <button
                id="downloadUpdatedHtmlBtn"
                type="button"
                onClick={handleDownloadUpdatedHtml}
                className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs border border-amber-500 shadow-xs transition-colors cursor-pointer"
              >
                ⬇ Download Updated Website (.html)
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
              >
                Reset Defaults
              </button>
            </div>
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                id="saveAdConfigBtn"
                type="submit"
                className="px-5 py-2 rounded-xl bg-[#1b4332] hover:bg-emerald-900 text-amber-300 font-extrabold text-xs shadow-sm transition-colors cursor-pointer"
              >
                Save &amp; Apply Ad Settings
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

