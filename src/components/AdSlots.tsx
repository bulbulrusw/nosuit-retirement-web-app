import React, { useEffect, useMemo, useRef } from 'react';

export interface AdConfig {
  gscVerificationCode: string;
  gaMeasurementId: string;
  topLeaderboardEnabled: boolean;
  topLeaderboardCode: string;
  sidebarRectEnabled: boolean;
  sidebarRectCode: string;
  sidebarSkyscraperEnabled: boolean;
  sidebarSkyscraperCode: string;
  inContentBannerEnabled: boolean;
  inContentBannerCode: string;
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    channelConfig?: AdConfig;
    DEFAULT_AD_CONFIG?: AdConfig;
    DEFAULT_CHANNEL_CONFIG?: AdConfig;
    __GA4_CONFIGURED_ID__?: string;
  }
}

export type AdSlotCodeKey =
  | 'topLeaderboardCode'
  | 'sidebarRectCode'
  | 'sidebarSkyscraperCode'
  | 'inContentBannerCode';

export type AdSlotEnabledKey =
  | 'topLeaderboardEnabled'
  | 'sidebarRectEnabled'
  | 'sidebarSkyscraperEnabled'
  | 'inContentBannerEnabled';

export const DEFAULT_GA_MEASUREMENT_ID = 'G-66NLH28JBQ';

export const DEFAULT_ADSTERRA_SLOT_1_CODE = `<script async="async" data-cfasync="false" src="https://bauval.org/21/689ae6c1012387fe1c48d819d275f89a"></script>
<div id="container-689ae6c1012387fe1c48d819d275f89a"></div>`;

export const DEFAULT_ADSTERRA_SLOT_2_CODE = `<script>
  atOptions = {
    'key' : 'a90397b0636ccb40a94c951a9b410e8f',
    'format' : 'iframe',
    'height' : 250,
    'width' : 300,
    'params' : {}
  };
</script>
<script src="https://bauval.org/22/a90397b0636ccb40a94c951a9b410e8f"></script>`;

export const DEFAULT_ADSTERRA_SLOT_3_CODE = `<script>
  atOptions = {
    'key' : '4caea752f3b7fb129968dc3c9995eb52',
    'format' : 'iframe',
    'height' : 600,
    'width' : 160,
    'params' : {}
  };
</script>
<script src="https://bauval.org/22/4caea752f3b7fb129968dc3c9995eb52"></script>`;

export const DEFAULT_ADSTERRA_SLOT_4_CODE = `<script>
  atOptions = {
    'key' : '0870404dd626af0ee07a6ff29938d63e',
    'format' : 'iframe',
    'height' : 90,
    'width' : 728,
    'params' : {}
  };
</script>
<script src="https://bauval.org/22/0870404dd626af0ee07a6ff29938d63e"></script>`;

export const DEFAULT_AD_CONFIG: AdConfig = {
  gscVerificationCode: 'YOUR_GSC_CODE',
  gaMeasurementId: DEFAULT_GA_MEASUREMENT_ID,
  topLeaderboardEnabled: true,
  topLeaderboardCode: DEFAULT_ADSTERRA_SLOT_1_CODE,
  sidebarRectEnabled: true,
  sidebarRectCode: DEFAULT_ADSTERRA_SLOT_2_CODE,
  sidebarSkyscraperEnabled: true,
  sidebarSkyscraperCode: DEFAULT_ADSTERRA_SLOT_3_CODE,
  inContentBannerEnabled: true,
  inContentBannerCode: DEFAULT_ADSTERRA_SLOT_4_CODE,
};

// Alias for compatibility with DEFAULT_CHANNEL_CONFIG references
export const DEFAULT_CHANNEL_CONFIG: AdConfig = DEFAULT_AD_CONFIG;

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

export function mergeWithDefaultAdConfig(partial?: Partial<AdConfig> | null): AdConfig {
  if (!partial || typeof partial !== 'object') {
    return { ...DEFAULT_AD_CONFIG };
  }
  return {
    gscVerificationCode:
      partial.gscVerificationCode && partial.gscVerificationCode.trim()
        ? partial.gscVerificationCode
        : DEFAULT_AD_CONFIG.gscVerificationCode,
    gaMeasurementId: extractGaMeasurementId(partial.gaMeasurementId),
    topLeaderboardEnabled:
      typeof partial.topLeaderboardEnabled === 'boolean'
        ? partial.topLeaderboardEnabled
        : DEFAULT_AD_CONFIG.topLeaderboardEnabled,
    topLeaderboardCode:
      partial.topLeaderboardCode && partial.topLeaderboardCode.trim()
        ? partial.topLeaderboardCode
        : DEFAULT_AD_CONFIG.topLeaderboardCode,
    sidebarRectEnabled:
      typeof partial.sidebarRectEnabled === 'boolean'
        ? partial.sidebarRectEnabled
        : DEFAULT_AD_CONFIG.sidebarRectEnabled,
    sidebarRectCode:
      partial.sidebarRectCode && partial.sidebarRectCode.trim()
        ? partial.sidebarRectCode
        : DEFAULT_AD_CONFIG.sidebarRectCode,
    sidebarSkyscraperEnabled:
      typeof partial.sidebarSkyscraperEnabled === 'boolean'
        ? partial.sidebarSkyscraperEnabled
        : DEFAULT_AD_CONFIG.sidebarSkyscraperEnabled,
    sidebarSkyscraperCode:
      partial.sidebarSkyscraperCode && partial.sidebarSkyscraperCode.trim()
        ? partial.sidebarSkyscraperCode
        : DEFAULT_AD_CONFIG.sidebarSkyscraperCode,
    inContentBannerEnabled:
      typeof partial.inContentBannerEnabled === 'boolean'
        ? partial.inContentBannerEnabled
        : DEFAULT_AD_CONFIG.inContentBannerEnabled,
    inContentBannerCode:
      partial.inContentBannerCode && partial.inContentBannerCode.trim()
        ? partial.inContentBannerCode
        : DEFAULT_AD_CONFIG.inContentBannerCode,
  };
}

export function extractGscCode(rawInput: string): string {
  const trimmed = (rawInput || '').trim();
  if (!trimmed) return 'YOUR_GSC_CODE';
  const match = trimmed.match(/content=["']([^"']+)["']/i);
  return match && match[1] ? match[1].trim() : trimmed;
}

/**
 * Synchronizes the Google Analytics 4 (gtag.js) loader in <head>
 * with channelConfig.gaMeasurementId (defaulting to G-66NLH28JBQ) and ensures window.gtag is always available.
 */
export function syncGa4HeadScript(config: AdConfig): void {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  const cleanGaId = extractGaMeasurementId(config.gaMeasurementId);
  window.channelConfig = {
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

function parseAtOptionsDimensions(
  rawHtml: string,
  slotNumber: 1 | 2 | 3 | 4
): { isAtOptions: boolean; width: number; height: number } {
  const isAtOptions = /atOptions\s*=/.test(rawHtml);
  const widthMatch = rawHtml.match(/['"]?width['"]?\s*:\s*(\d+)/i);
  const heightMatch = rawHtml.match(/['"]?height['"]?\s*:\s*(\d+)/i);
  const defaultDims: Record<1 | 2 | 3 | 4, { width: number; height: number }> = {
    1: { width: 728, height: 90 },
    2: { width: 300, height: 250 },
    3: { width: 160, height: 600 },
    4: { width: 728, height: 90 },
  };
  return {
    isAtOptions,
    width: widthMatch ? parseInt(widthMatch[1], 10) : defaultDims[slotNumber].width,
    height: heightMatch ? parseInt(heightMatch[1], 10) : defaultDims[slotNumber].height,
  };
}

export function buildAtOptionsSrcDoc(rawCode: string): string {
  return `<!DOCTYPE html><html><body style="margin:0;padding:0;display:flex;justify-content:center;align-items:center;background:transparent;">${rawCode}</body></html>`;
}

export interface AdSlotRendererProps {
  slotId: string;
  slotNumber: 1 | 2 | 3 | 4;
  rawCode: string;
  minHeightClass: string;
}

/**
 * Dedicated AdSlotRenderer component:
 * - For Ad Slot #1 (Native Banner `container-689ae6c1012387fe1c48d819d275f89a`), mounts the
 *   `<div id="container-689ae6c1012387fe1c48d819d275f89a"></div>` in the DOM and uses a `useEffect`
 *   hook with `document.createElement('script')` (`script.async = true; script.dataset.cfasync = "false";`)
 *   appended directly to the container so the native ad loads cleanly.
 * - For Ad Slots #2 (300x250), #3 (160x600), and #4 (728x90) (and any custom `atOptions` code),
 *   renders each slot inside its own isolated borderless `<iframe scrolling="no" frameborder="0" srcdoc="...">`
 *   sized to match the banner so `window.atOptions` never collides across slots.
 */
export const AdSlotRenderer: React.FC<AdSlotRendererProps> = ({
  slotId,
  slotNumber,
  rawCode,
  minHeightClass,
}) => {
  const nativeContainerRef = useRef<HTMLDivElement>(null);
  const { isAtOptions, width, height } = useMemo(
    () => parseAtOptionsDimensions(rawCode, slotNumber),
    [rawCode, slotNumber]
  );

  const isDefaultNativeSlot1 = useMemo(
    () =>
      !isAtOptions &&
      (slotNumber === 1 || rawCode.includes('container-689ae6c1012387fe1c48d819d275f89a')),
    [isAtOptions, slotNumber, rawCode]
  );

  useEffect(() => {
    if (isAtOptions) return;
    const hostEl = nativeContainerRef.current;
    if (!hostEl) return;

    // Remove any previously injected scripts on re-render while keeping the target container div
    Array.from(hostEl.querySelectorAll('script')).forEach((s) => s.remove());

    if (rawCode.includes('689ae6c1012387fe1c48d819d275f89a')) {
      const script = document.createElement('script');
      script.async = true;
      script.dataset.cfasync = 'false';
      script.src = 'https://bauval.org/21/689ae6c1012387fe1c48d819d275f89a';
      hostEl.appendChild(script);
      return;
    }

    // Fallback for any custom non-atOptions script pasted by the owner in Studio
    const temp = document.createElement('div');
    temp.innerHTML = rawCode.trim();
    Array.from(temp.childNodes).forEach((node) => {
      if (node.nodeName.toLowerCase() === 'script') {
        const oldScript = node as HTMLScriptElement;
        const script = document.createElement('script');
        script.async = true;
        Array.from(oldScript.attributes).forEach((attr) => {
          script.setAttribute(attr.name, attr.value);
        });
        if (oldScript.textContent) {
          script.textContent = oldScript.textContent;
        }
        hostEl.appendChild(script);
      } else {
        hostEl.appendChild(node.cloneNode(true));
      }
    });
  }, [rawCode, isAtOptions]);

  const iframeSrcDoc = useMemo(() => {
    if (!isAtOptions) return '';
    return buildAtOptionsSrcDoc(rawCode);
  }, [isAtOptions, rawCode]);

  return (
    <div
      id={`${slotId}Renderer`}
      data-ad-slot-renderer={slotNumber}
      className={`w-full flex justify-center items-center overflow-x-auto ${minHeightClass}`}
    >
      {/* Ad Slot #1 Native Banner: mounts #container-689ae6c1012387fe1c48d819d275f89a and appends real <script> via useEffect */}
      {!isAtOptions && (
        <div
          ref={nativeContainerRef}
          data-ad-script-host={slotNumber}
          className="w-full flex flex-col items-center justify-center"
        >
          {isDefaultNativeSlot1 && (
            <div id="container-689ae6c1012387fe1c48d819d275f89a" className="w-full" />
          )}
        </div>
      )}

      {/* Isolated borderless srcdoc iframe for Ad Slots #2 (300x250), #3 (160x600), and #4 (728x90) */}
      {isAtOptions && (
        <iframe
          title={`Ad Slot #${slotNumber}`}
          srcDoc={iframeSrcDoc}
          width={width}
          height={height}
          scrolling="no"
          frameBorder={0}
          className="border-0 overflow-hidden shrink-0 mx-auto"
        />
      )}
    </div>
  );
};

interface AdSlotProps {
  id: string;
  slotNumber: 1 | 2 | 3 | 4;
  slotKey: AdSlotCodeKey;
  enabledKey: AdSlotEnabledKey;
  title: string;
  dimensionsLabel: string;
  networkHint: string;
  minHeightClass: string;
  maxWidthClass?: string;
  adConfig: AdConfig;
  isOwnerUnlocked?: boolean;
  onOpenStudio: () => void;
}

export const AdSlot: React.FC<AdSlotProps> = ({
  id,
  slotNumber,
  slotKey,
  enabledKey,
  title,
  minHeightClass,
  maxWidthClass = 'w-full',
  adConfig,
  isOwnerUnlocked = false,
  onOpenStudio,
}) => {
  const isSlotEnabled = Boolean(adConfig[enabledKey]);
  const rawCode = adConfig[slotKey]?.trim() || DEFAULT_AD_CONFIG[slotKey];

  if (!isSlotEnabled) {
    return <aside id={id} aria-hidden="true" className="hidden no-print" />;
  }

  return (
    <aside
      id={id}
      aria-label={title}
      className={`no-print relative flex flex-col justify-center items-center overflow-x-auto ${minHeightClass} ${maxWidthClass}`}
    >
      {isOwnerUnlocked && (
        <div className="w-full flex justify-end mb-1">
          <button
            type="button"
            onClick={onOpenStudio}
            className="px-2 py-0.5 rounded bg-slate-800/90 hover:bg-slate-900 text-amber-300 text-[11px] font-bold cursor-pointer"
          >
            ⚙️ Edit Ad #{slotNumber}
          </button>
        </div>
      )}

      <AdSlotRenderer
        slotId={id}
        slotNumber={slotNumber}
        rawCode={rawCode}
        minHeightClass={minHeightClass}
      />
    </aside>
  );
};
