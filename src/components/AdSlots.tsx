import { TabId } from './UserGuideSection';
import { RETIREMENT_CONSTANTS } from '../data/retirementConstants';
import { COOKIE_CONSENT_STORAGE_KEY } from './ConversionAndComplianceBars';

export interface AnalyticsConfig {
  gaMeasurementId: string;
}

export const DEFAULT_GA_MEASUREMENT_ID = RETIREMENT_CONSTANTS.GA_MEASUREMENT_ID;

export const DEFAULT_CHANNEL_CONFIG: AnalyticsConfig = {
  gaMeasurementId: DEFAULT_GA_MEASUREMENT_ID,
};

export interface FeaturedVideoEpisode {
  id: 'video-1' | 'video-2' | 'video-3';
  position: 1 | 2 | 3;
  badge: string;
  title: string;
  description: string;
  videoUrl: string;
  embedUrl?: string;
  videoId?: string;
  thumbnailUrl: string;
  calculatorActionLabel: string;
  calculatorTab: TabId;
  calculatorPreset?: 'couple400k' | 'single' | 'latesaver';
  workerAgeGroup?: '55' | '61' | '65';
  isChannelLinkOnly?: boolean;
}

export const FEATURED_YOUTUBE_VIDEOS: FeaturedVideoEpisode[] = [
  {
    id: 'video-1',
    position: 1,
    badge: 'Episode #1 · 2027 COLA & Medicare Math',
    title: 'Why Your 2027 Social Security Raise Is Already Gone (Real Medicare Math)',
    description:
      'Plain-English chalkboard breakdown of how the Two-Envelope test reveals your true net Social Security deposit after Medicare Part B and Part D deductions.',
    videoUrl: 'https://youtu.be/XHIm3Q1OvK8',
    embedUrl: 'https://www.youtube.com/embed/XHIm3Q1OvK8',
    videoId: 'XHIm3Q1OvK8',
    thumbnailUrl: 'https://i.ytimg.com/vi/XHIm3Q1OvK8/hqdefault.jpg',
    calculatorActionLabel: '📑 Load 2027 COLA Math (Tab 0)',
    calculatorTab: 'tab-paycheck',
    calculatorPreset: 'couple400k',
  },
  {
    id: 'video-2',
    position: 2,
    badge: 'Episode #2 · Retire at 62 on $400K',
    title: 'How to Retire Comfortably at 62 With $400,000 and Social Security (Real Monthly Budget)',
    description:
      'Step-by-step kitchen-table guide to retiring comfortably at age 62 with $400,000 and Social Security using a 3-Bucket Crash Shield with 8 full years of protected cash and T-Bill runway.',
    videoUrl: 'https://youtu.be/alUfXINV93Y',
    embedUrl: 'https://www.youtube.com/embed/alUfXINV93Y',
    videoId: 'alUfXINV93Y',
    thumbnailUrl: 'https://i.ytimg.com/vi/alUfXINV93Y/hqdefault.jpg',
    calculatorActionLabel: '🧮 Load $400K Couple Math in Tab 1',
    calculatorTab: 'tab-paycheck',
    calculatorPreset: 'couple400k',
  },
  {
    id: 'video-3',
    position: 3,
    badge: 'Episode #3 · Age 60–63 Super Catch-Up',
    title: 'Turning 60 in 2026? The $11,250 "Super Catch-Up" Window Closing on Dec 31',
    description:
      'How workers aged 60, 61, 62, or 63 can use the SECURE 2.0 $11,250 Super Catch-Up window before December 31 ($35,750 total 401k limit) and shield their retirement savings.',
    videoUrl: 'https://www.youtube.com/@NoSuitRetirement',
    thumbnailUrl: 'https://i.ytimg.com/vi/XHIm3Q1OvK8/hqdefault.jpg',
    calculatorActionLabel: '🧮 Open $11,250 Super Catch-Up Tool (Tab 3)',
    calculatorTab: 'tab-taxshield',
    workerAgeGroup: '61',
    isChannelLinkOnly: true,
  },
];

export function extractGaMeasurementId(rawInput?: string): string {
  const raw = (rawInput || '').trim();
  if (!raw || raw.toUpperCase() === 'G-XXXXXXXXXX') {
    return DEFAULT_GA_MEASUREMENT_ID;
  }
  const match = raw.match(/G-[A-Z0-9]{6,15}/i);
  if (match) {
    const candidate = match[0].toUpperCase();
    return candidate === 'G-XXXXXXXXXX' ? DEFAULT_GA_MEASUREMENT_ID : candidate;
  }
  return DEFAULT_GA_MEASUREMENT_ID;
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __GA4_CONFIGURED_ID__?: string;
  }
}

export function isAnalyticsConsentAccepted(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY) === 'accepted';
  } catch {
    return false;
  }
}

/**
 * Loads Google Analytics 4 (gtag.js) ONLY after user consent is accepted.
 */
export function syncGa4HeadScript(config: AnalyticsConfig = DEFAULT_CHANNEL_CONFIG): void {
  if (typeof document === 'undefined' || typeof window === 'undefined') return;
  if (!isAnalyticsConsentAccepted()) return;

  const cleanGaId = extractGaMeasurementId(config.gaMeasurementId);

  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== 'function') {
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
  }

  let scriptEl = document.getElementById('ga4GtagScript') as HTMLScriptElement | null;
  const expectedSrc = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(cleanGaId)}`;

  if (!scriptEl) {
    scriptEl = document.createElement('script');
    scriptEl.id = 'ga4GtagScript';
    scriptEl.async = true;
    scriptEl.src = expectedSrc;
    scriptEl.setAttribute('data-ga-measurement-id', cleanGaId);
    document.head.appendChild(scriptEl);
  } else if (scriptEl.getAttribute('data-ga-measurement-id') !== cleanGaId) {
    scriptEl.src = expectedSrc;
    scriptEl.setAttribute('data-ga-measurement-id', cleanGaId);
  }

  if (window.__GA4_CONFIGURED_ID__ !== cleanGaId) {
    window.gtag('js', new Date());
    window.gtag('config', cleanGaId);
    window.__GA4_CONFIGURED_ID__ = cleanGaId;
  }
}

/**
 * Sends a GA4 event ONLY if cookie consent is 'accepted'. No-op otherwise.
 */
export function trackGa4Event(
  eventName: string,
  eventParams: Record<string, string | number | boolean> = {},
  gaMeasurementId?: string
): void {
  if (typeof window === 'undefined') return;
  if (!isAnalyticsConsentAccepted()) return;

  const cleanGaId = extractGaMeasurementId(gaMeasurementId || window.__GA4_CONFIGURED_ID__);
  if (typeof window.gtag !== 'function') {
    return;
  }

  try {
    window.gtag('event', eventName, {
      send_to: cleanGaId,
      ...eventParams,
    });
  } catch {
    // Never allow analytics errors to interrupt UI interaction
  }
}

export function purgeLegacyConfigStorage(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem('nosuit_channel_config_v1');
    localStorage.removeItem('nosuit_ad_config_v1');
    localStorage.removeItem('nosuit_ad_config_v5');
  } catch {
    // ignore storage errors
  }
}
