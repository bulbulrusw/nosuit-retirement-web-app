import React, { useEffect, useMemo, useRef } from 'react';

export interface AdConfig {
  gscVerificationCode: string;
  topLeaderboardEnabled: boolean;
  topLeaderboardCode: string;
  sidebarRectEnabled: boolean;
  sidebarRectCode: string;
  sidebarSkyscraperEnabled: boolean;
  sidebarSkyscraperCode: string;
  inContentBannerEnabled: boolean;
  inContentBannerCode: string;
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

export function mergeWithDefaultAdConfig(partial?: Partial<AdConfig> | null): AdConfig {
  if (!partial || typeof partial !== 'object') {
    return { ...DEFAULT_AD_CONFIG };
  }
  return {
    gscVerificationCode:
      partial.gscVerificationCode && partial.gscVerificationCode.trim()
        ? partial.gscVerificationCode
        : DEFAULT_AD_CONFIG.gscVerificationCode,
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

// Sequential execution queue so multiple Adsterra atOptions scripts never clobber window.atOptions
let adScriptQueue: Promise<void> = Promise.resolve();

/**
 * Dynamically parses raw ad HTML and appends real DOM <script> elements
 * using document.createElement('script') so browser script engines execute them.
 */
export function executeAdScriptsInContainer(container: HTMLElement, rawHtml: string): void {
  container.innerHTML = '';
  const trimmed = (rawHtml || '').trim();
  if (!trimmed) return;

  const temp = document.createElement('div');
  temp.innerHTML = trimmed;

  const scriptDescriptorList: Array<{
    attrs: Array<{ name: string; value: string }>;
    text: string;
    hasSrc: boolean;
  }> = [];

  // First append all non-script elements (e.g., <div id="container-..."></div>)
  Array.from(temp.childNodes).forEach((node) => {
    if (node.nodeName.toLowerCase() === 'script') {
      const el = node as HTMLScriptElement;
      const attrs = Array.from(el.attributes).map((a) => ({ name: a.name, value: a.value }));
      scriptDescriptorList.push({
        attrs,
        text: el.textContent || '',
        hasSrc: el.hasAttribute('src'),
      });
    } else {
      container.appendChild(node.cloneNode(true));
    }
  });

  // Also check nested script tags if any were inside wrapper divs
  const nestedScripts = Array.from(container.querySelectorAll('script'));
  nestedScripts.forEach((oldScript) => {
    const newScript = document.createElement('script');
    newScript.type = oldScript.type || 'text/javascript';
    Array.from(oldScript.attributes).forEach((attr) => {
      newScript.setAttribute(attr.name, attr.value);
    });
    if (oldScript.textContent) {
      newScript.textContent = oldScript.textContent;
    }
    oldScript.parentNode?.replaceChild(newScript, oldScript);
  });

  // Queue top-level scripts sequentially so global atOptions definitions pair with their external script
  adScriptQueue = adScriptQueue
    .then(async () => {
      for (const desc of scriptDescriptorList) {
        if (!container.isConnected) break;
        await new Promise<void>((resolve) => {
          const scriptEl = document.createElement('script');
          scriptEl.type = 'text/javascript';
          desc.attrs.forEach((attr) => {
            scriptEl.setAttribute(attr.name, attr.value);
          });

          if (desc.hasSrc) {
            let settled = false;
            const finish = () => {
              if (!settled) {
                settled = true;
                resolve();
              }
            };
            scriptEl.onload = finish;
            scriptEl.onerror = finish;
            window.setTimeout(finish, 1200);
            container.appendChild(scriptEl);
          } else {
            scriptEl.textContent = desc.text;
            container.appendChild(scriptEl);
            resolve();
          }
        });
      }
    })
    .catch(() => {
      // Ignore ad network load errors so calculator remains unaffected
    });
}

function parseAtOptionsDimensions(rawHtml: string): { isAtOptions: boolean; width: number; height: number } {
  const isAtOptions = /atOptions\s*=/.test(rawHtml);
  const widthMatch = rawHtml.match(/['"]?width['"]?\s*:\s*(\d+)/i);
  const heightMatch = rawHtml.match(/['"]?height['"]?\s*:\s*(\d+)/i);
  return {
    isAtOptions,
    width: widthMatch ? parseInt(widthMatch[1], 10) : 728,
    height: heightMatch ? parseInt(heightMatch[1], 10) : 90,
  };
}

export interface AdSlotRendererProps {
  slotId: string;
  slotNumber: 1 | 2 | 3 | 4;
  rawCode: string;
  minHeightClass: string;
}

/**
 * Dedicated AdSlotRenderer component that:
 * 1. Dynamically creates and appends real DOM <script> elements via document.createElement('script')
 *    inside the ad container so container-based scripts (like Ad Slot #1) execute natively.
 * 2. Renders an isolated sandboxed srcdoc <iframe> for atOptions banner scripts (like Ad Slots #2 & #4)
 *    so document.write and window.atOptions execute without colliding across multiple slots.
 */
export const AdSlotRenderer: React.FC<AdSlotRendererProps> = ({
  slotId,
  slotNumber,
  rawCode,
  minHeightClass,
}) => {
  const hostRef = useRef<HTMLDivElement>(null);
  const { isAtOptions, width, height } = useMemo(() => parseAtOptionsDimensions(rawCode), [rawCode]);

  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    // For atOptions scripts (Slots #2, #3, #4), execution happens inside the isolated srcdoc iframe
    // so document.write and window.atOptions never collide across slots on the parent window.
    if (isAtOptions) {
      el.innerHTML = '';
      return;
    }
    executeAdScriptsInContainer(el, rawCode);
  }, [rawCode, isAtOptions]);

  const iframeSrcDoc = useMemo(() => {
    if (!isAtOptions) return '';
    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <style>
    html, body {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: transparent;
      overflow: hidden;
    }
  </style>
</head>
<body>
  ${rawCode}
</body>
</html>`;
  }, [isAtOptions, rawCode]);

  return (
    <div
      id={`${slotId}Renderer`}
      data-ad-slot-renderer={slotNumber}
      className={`w-full flex justify-center items-center overflow-x-auto rounded-xl bg-white ${minHeightClass}`}
    >
      {/* Real DOM script execution host via document.createElement('script') for container-based scripts (Slot #1) */}
      {!isAtOptions && (
        <div
          ref={hostRef}
          data-ad-script-host={slotNumber}
          className="w-full flex items-center justify-center"
        />
      )}

      {/* Clean, borderless isolated srcdoc iframe for atOptions / document.write banner units (Slots #2, #3, #4) */}
      {isAtOptions && (
        <iframe
          title={`Sponsored Advertisement Slot #${slotNumber}`}
          srcDoc={iframeSrcDoc}
          width={width}
          height={height}
          scrolling="no"
          frameBorder={0}
          sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-forms allow-top-navigation-by-user-activation"
          className="border-0 overflow-hidden shrink-0"
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
  dimensionsLabel,
  networkHint,
  minHeightClass,
  maxWidthClass = 'w-full',
  adConfig,
  isOwnerUnlocked = false,
  onOpenStudio,
}) => {
  const isSlotEnabled = Boolean(adConfig[enabledKey]);
  const rawCode = adConfig[slotKey]?.trim() || '';

  if (!isSlotEnabled) {
    return <aside id={id} aria-hidden="true" className="hidden no-print" />;
  }

  return (
    <aside
      id={id}
      aria-label={`Advertisement: ${title}`}
      className={`no-print surface-card rounded-2xl p-3 bg-[#faf8f2] border border-[#d5cbb8] min-h-[90px] flex flex-col justify-center items-center overflow-x-auto ${maxWidthClass}`}
    >
      <div className="w-full flex items-center justify-between text-[11px] text-slate-500 font-semibold uppercase tracking-wider pb-2 mb-2 border-b border-slate-200/80">
        <span>Advertisement · Sponsored</span>
        {isOwnerUnlocked && (
          <button
            type="button"
            onClick={onOpenStudio}
            className="text-emerald-800 hover:text-emerald-950 underline font-bold cursor-pointer"
          >
            ⚙️ Edit Ad #{slotNumber}
          </button>
        )}
      </div>

      {rawCode ? (
        <AdSlotRenderer
          slotId={id}
          slotNumber={slotNumber}
          rawCode={rawCode}
          minHeightClass={minHeightClass}
        />
      ) : (
        <div
          className={`w-full rounded-xl border-2 border-dashed border-[#c5b9a5] bg-[#f4efe2]/70 px-4 py-4 flex flex-col items-center justify-center text-center gap-1.5 ${minHeightClass}`}
        >
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#1b4332] font-num">
            {dimensionsLabel}
          </span>
          <div className="text-sm font-bold text-slate-800">
            Ad Slot #{slotNumber}: {title}
          </div>
          <p className="text-xs text-slate-600 max-w-md">{networkHint}</p>
          {isOwnerUnlocked && (
            <button
              type="button"
              onClick={onOpenStudio}
              className="mt-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-amber-50 text-[#1b4332] border border-[#b07d4b]/50 font-bold text-xs shadow-2xs transition-colors cursor-pointer"
            >
              + Paste AdSense / Adsterra Code
            </button>
          )}
        </div>
      )}
    </aside>
  );
};
