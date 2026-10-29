export interface AnalyticsConfig {
  gscVerificationCode: string;
  gaMeasurementId: string;
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    channelConfig?: AnalyticsConfig;
    DEFAULT_CHANNEL_CONFIG?: AnalyticsConfig;
    __GA4_CONFIGURED_ID__?: string;
  }
}

export const DEFAULT_GA_MEASUREMENT_ID = 'G-66NLH28JBQ';

export const DEFAULT_CHANNEL_CONFIG: AnalyticsConfig = {
  gscVerificationCode: 'YOUR_GSC_CODE',
  gaMeasurementId: DEFAULT_GA_MEASUREMENT_ID,
};

export interface FeaturedVideoEpisode {
  id: 'video-1' | 'video-2' | 'video-3';
  position: 1 | 2 | 3;
  badge: string;
  title: string;
  description: string;
  videoUrl: string;
  embedUrl: string | null;
  videoId: string | null;
  thumbnailUrl: string;
  isChannelLinkOnly?: boolean;
  calculatorActionLabel: string;
  calculatorTab: 'tab-paycheck' | 'tab-taxshield';
  calculatorPreset?: 'couple400k';
  workerAgeGroup?: '61';
}

export const FEATURED_YOUTUBE_VIDEOS: FeaturedVideoEpisode[] = [
  {
    id: 'video-1',
    position: 1,
    badge: 'Episode #1 · 2027 COLA & Medicare Math',
    title: 'Why Your 2027 Social Security Raise Is Already Gone (Real Medicare Math)',
    description:
      'See how the Two-Envelope test reveals your true net Social Security check after Medicare Part B and Part D deductions—and how to protect your monthly buying power.',
    videoUrl: 'https://youtu.be/XHIm3Q1OvK8',
    embedUrl: 'https://www.youtube.com/embed/XHIm3Q1OvK8',
    videoId: 'XHIm3Q1OvK8',
    thumbnailUrl: 'https://i.ytimg.com/vi/XHIm3Q1OvK8/hqdefault.jpg',
    calculatorActionLabel: '📑 Load 2027 COLA Math (Tab 0)',
    calculatorTab: 'tab-paycheck',
  },
  {
    id: 'video-2',
    position: 2,
    badge: 'Episode #2 · Retire at 62 on $400K',
    title: 'How to Retire Comfortably at 62 With $400,000 and Social Security (Real Monthly Budget)',
    description:
      'Step-by-step kitchen-table budget showing how a couple at 62 combines Social Security with a $400,000 3-Bucket Crash Shield for 8 full years of protected runway.',
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
      'How workers aged 60–63 can use the SECURE 2.0 $11,250 Super Catch-Up window before December 31 ($35,750 total 401k limit) and cut their 1984 IRS Ghost Tax.',
    videoUrl: 'https://www.youtube.com/@NoSuitRetirement',
    embedUrl: null,
    videoId: null,
    thumbnailUrl: 'https://i.ytimg.com/vi/XHIm3Q1OvK8/hqdefault.jpg',
    isChannelLinkOnly: true,
    calculatorActionLabel: '🧮 Open $11,250 Super Catch-Up Tool (Tab 3)',
    calculatorTab: 'tab-taxshield',
    workerAgeGroup: '61',
  },
];

export function extractGaMeasurementId(rawInput?: string): string {
  const trimmed = (rawInput || '').trim();
  if (!trimmed) return DEFAULT_GA_MEASUREMENT_ID;
  const match = trimmed.match(/\b(G-[A-Z0-9]{4,})\b/i);
  const candidate = match && match[1] ? match[1].toUpperCase() : trimmed.toUpperCase();
  if (!candidate || candidate === 'G-XXXXXXXXXX' || /^G-X+$/i.test(candidate)) {
    return DEFAULT_GA_MEASUREMENT_ID;
  }
  return candidate;
}

/**
 * Purges any legacy localStorage keys from older versions so 100% of visitors
 * on all browsers see the clean, ad-free, updated site state immediately.
 */
export function purgeLegacyConfigStorage(): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem('nosuit_channel_config_v1');
    window.localStorage.removeItem('nosuit_ad_config_v1');
    window.localStorage.removeItem('nosuit_ad_config_v2');
    window.localStorage.removeItem('nosuit_ad_config_v3');
    window.localStorage.removeItem('nosuit_ad_config_v4');
    window.localStorage.removeItem('nosuit_ad_config_v5');
  } catch {
    // ignore storage errors
  }
}

/**
 * Synchronizes the Google Analytics 4 (gtag.js) loader in <head>
 * with Measurement ID G-66NLH28JBQ and ensures window.gtag is always available.
 */
export function syncGa4HeadScript(config: AnalyticsConfig = DEFAULT_CHANNEL_CONFIG): void {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  const cleanGaId = extractGaMeasurementId(config.gaMeasurementId);
  window.channelConfig = {
    ...DEFAULT_CHANNEL_CONFIG,
    ...config,
    gaMeasurementId: cleanGaId,
  };
  window.DEFAULT_CHANNEL_CONFIG = window.channelConfig;
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== 'function') {
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer!.push(args);
    };
  }

  let loaderScript = document.getElementById('ga4GtagScript') as HTMLScriptElement | null;
  const targetSrc = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(cleanGaId)}`;
  if (!loaderScript) {
    loaderScript = document.createElement('script');
    loaderScript.id = 'ga4GtagScript';
    loaderScript.async = true;
    loaderScript.setAttribute('data-ga-measurement-id', cleanGaId);
    loaderScript.src = targetSrc;
    document.head.appendChild(loaderScript);
  } else {
    loaderScript.setAttribute('data-ga-measurement-id', cleanGaId);
    if (loaderScript.src !== targetSrc) {
      loaderScript.src = targetSrc;
    }
  }

  if (window.__GA4_CONFIGURED_ID__ !== cleanGaId) {
    window.__GA4_CONFIGURED_ID__ = cleanGaId;
    window.gtag('js', new Date());
    window.gtag('config', cleanGaId, { send_page_view: true });
  }
}

/**
 * Fires a Google Analytics 4 custom event via window.gtag('event', eventName, params)
 */
export function trackGa4Event(eventName: string, params: Record<string, unknown> = {}): void {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== 'function') {
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer!.push(args);
    };
  }
  const gaId = extractGaMeasurementId(window.channelConfig?.gaMeasurementId);
  window.gtag('event', eventName, {
    send_to: gaId,
    ...params,
  });
}
