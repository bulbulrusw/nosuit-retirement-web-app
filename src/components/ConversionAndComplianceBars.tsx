import React, { useState } from 'react';
import { trackGa4Event } from './AdSlots';

export const COOKIE_CONSENT_STORAGE_KEY = 'nosuit_cookie_consent_v1';
export const SITE_CANONICAL_URL = 'https://nosuitretirement.com/';

export type CookieConsentStatus = 'accepted' | 'declined' | null;

export interface ShareSnapshotData {
  netSS: string;
  portDraw: string;
  totalPaycheck: string;
  bucket1: string;
}

export function buildSpouseShareLinks(snapshot: ShareSnapshotData) {
  const shareUrl = SITE_CANONICAL_URL;
  const encodedUrl = encodeURIComponent(shareUrl);
  const shareQuote = encodeURIComponent(
    `We just ran our 2027 Social Security COLA & $400K 3-Bucket retirement numbers on No-Suit Retirement (${snapshot.totalPaycheck}/mo total paycheck). 100% private senior calculator:`
  );

  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${shareQuote}`;

  const emailSubject = encodeURIComponent(
    'Our 2027 No-Suit Retirement Numbers & 3-Bucket Plan'
  );
  const emailBody = encodeURIComponent(
    [
      'Hi — I ran our retirement numbers on the No-Suit Retirement Calculator (100% private in-browser tool):',
      '',
      `• 2027 True Net Social Security: ${snapshot.netSS}/mo`,
      `• Safe Portfolio Monthly Draw: ${snapshot.portDraw}/mo`,
      `• Total Monthly Retirement Paycheck: ${snapshot.totalPaycheck}/mo`,
      `• Bucket 1 Safe Cash Shield (24 Months): ${snapshot.bucket1}`,
      '',
      `Try the calculator here: ${shareUrl}`,
    ].join('\n')
  );

  const emailShareUrl = `mailto:?subject=${emailSubject}&body=${emailBody}`;

  return {
    facebookShareUrl,
    emailShareUrl,
    copyUrl: shareUrl,
  };
}

interface SpouseShareBarProps {
  snapshot: ShareSnapshotData;
  onShowToast: (msg: string) => void;
}

export const SpouseShareBar: React.FC<SpouseShareBarProps> = ({
  snapshot,
  onShowToast,
}) => {
  const [copied, setCopied] = useState(false);
  const { facebookShareUrl, emailShareUrl, copyUrl } = buildSpouseShareLinks(snapshot);

  const handleCopyWebsiteLink = async () => {
    try {
      await navigator.clipboard.writeText(copyUrl);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = copyUrl;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 3000);
    trackGa4Event('share_action', {
      event_category: 'viral_share',
      method: 'copy_website_link',
      link_url: copyUrl,
    });
    onShowToast('Website link (https://nosuitretirement.com/) copied to clipboard!');
  };

  return (
    <section
      id="spouseShareBar"
      aria-label="Share With Your Spouse or Retirement Friend"
      className="no-print surface-card rounded-2xl p-4 md:p-5 border-2 border-[#b07d4b] shadow-sm flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4"
    >
      <div className="space-y-1">
        <div className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-emerald-900 bg-emerald-100/80 px-2.5 py-0.5 rounded-md border border-emerald-300">
          <span>🤝 Kitchen-Table Family Planning</span>
        </div>
        <h2 className="text-base md:text-lg font-extrabold text-slate-900">
          Share With Your Spouse or Retirement Friend
        </h2>
        <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
          Send your personalized 2027 Social Security &amp; 3-Bucket snapshot to your spouse by email, or share this free private calculator with a friend retiring soon.
        </p>
      </div>

      <div className="w-full lg:w-auto flex flex-wrap items-center gap-2.5 shrink-0">
        <a
          id="shareFacebookBtn"
          href={facebookShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            trackGa4Event('share_action', {
              event_category: 'viral_share',
              method: 'facebook_share',
              link_url: copyUrl,
            })
          }
          className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#1877F2] hover:bg-[#166fe5] text-white font-extrabold text-xs shadow-xs transition-colors whitespace-nowrap"
        >
          <span>📘 Facebook Share</span>
        </a>

        <a
          id="shareEmailSpouseBtn"
          href={emailShareUrl}
          onClick={() =>
            trackGa4Event('share_action', {
              event_category: 'viral_share',
              method: 'email_to_spouse',
              link_url: copyUrl,
            })
          }
          className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#1b4332] hover:bg-emerald-900 text-amber-300 font-extrabold text-xs border border-amber-400/50 shadow-xs transition-colors whitespace-nowrap"
        >
          <span>✉️ Email to Spouse</span>
        </a>

        <button
          id="copyWebsiteLinkBtn"
          type="button"
          onClick={handleCopyWebsiteLink}
          className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs border border-amber-500 shadow-xs transition-colors cursor-pointer whitespace-nowrap"
        >
          <span id="copyWebsiteLinkLabel">
            {copied ? '✓ Link Copied!' : '🔗 Copy Website Link'}
          </span>
        </button>
      </div>
    </section>
  );
};

interface CookieConsentBannerProps {
  consentStatus: CookieConsentStatus;
  onAccept: () => void;
  onDecline: () => void;
  onOpenPrivacy: () => void;
}

export const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({
  consentStatus,
  onAccept,
  onDecline,
  onOpenPrivacy,
}) => {
  if (consentStatus === 'accepted' || consentStatus === 'declined') return null;

  return (
    <aside
      id="cookieConsentBanner"
      role="region"
      aria-label="Cookie and Privacy Consent"
      className="no-print fixed bottom-14 md:bottom-0 inset-x-0 z-50 bg-[#0f291e] text-amber-100 border-t-2 border-amber-400 shadow-2xl px-4 py-3.5"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div className="text-xs leading-relaxed max-w-4xl">
          <strong className="text-amber-300 font-extrabold uppercase tracking-wide">
            🍪 Cookie &amp; Privacy Notice:
          </strong>{' '}
          With your permission, we use cookies and anonymous Google Analytics 4 traffic measurement to improve our senior retirement tools.{' '}
          <strong className="text-white">
            100% of your retirement calculator math runs privately in your browser—zero personal or financial numbers ever leave your device.
          </strong>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0 w-full md:w-auto justify-end">
          <button
            id="cookiePrivacyPolicyBtn"
            type="button"
            onClick={onOpenPrivacy}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-200 font-bold text-xs border border-amber-400/40 transition-colors cursor-pointer whitespace-nowrap"
          >
            Privacy Policy
          </button>
          <button
            id="declineCookiesBtn"
            type="button"
            onClick={onDecline}
            className="px-3.5 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs border border-slate-500 transition-colors cursor-pointer whitespace-nowrap"
          >
            Decline
          </button>
          <button
            id="acceptCookiesBtn"
            type="button"
            onClick={onAccept}
            className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs border border-amber-500 shadow-md transition-colors cursor-pointer whitespace-nowrap"
          >
            Accept Cookies
          </button>
        </div>
      </div>
    </aside>
  );
};

interface MobileBottomNavBarProps {
  onGoCalculator: () => void;
  onGoVideos: () => void;
  onGoBinder: () => void;
}

export const MobileBottomNavBar: React.FC<MobileBottomNavBarProps> = ({
  onGoCalculator,
  onGoVideos,
  onGoBinder,
}) => {
  return (
    <nav
      id="mobileBottomNavBar"
      aria-label="Mobile Quick Navigation"
      className="no-print md:hidden fixed bottom-0 inset-x-0 z-40 h-14 bg-[#143325] border-t-2 border-amber-400 shadow-2xl px-2 flex items-center"
    >
      <div className="grid grid-cols-3 gap-1.5 max-w-md w-full mx-auto">
        <button
          id="mobileNavCalculatorBtn"
          type="button"
          onClick={onGoCalculator}
          className="flex flex-col items-center justify-center py-2 px-2 rounded-xl bg-[#1b4332] hover:bg-emerald-800 text-amber-200 font-extrabold text-xs border border-amber-400/30 transition-colors cursor-pointer whitespace-nowrap"
        >
          <span>🧮 Calculator</span>
        </button>

        <button
          id="mobileNavVideosBtn"
          type="button"
          onClick={onGoVideos}
          className="flex flex-col items-center justify-center py-2 px-2 rounded-xl bg-[#1b4332] hover:bg-emerald-800 text-white font-extrabold text-xs border border-amber-400/30 transition-colors cursor-pointer whitespace-nowrap"
        >
          <span>▶️ 3 Videos</span>
        </button>

        <button
          id="mobileNavBinderBtn"
          type="button"
          onClick={onGoBinder}
          className="flex flex-col items-center justify-center py-2 px-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs border border-amber-500 shadow-sm transition-colors cursor-pointer whitespace-nowrap"
        >
          <span>🖨️ Print Binder</span>
        </button>
      </div>
    </nav>
  );
};
