import React, { useEffect, useRef } from 'react';

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

export const DEFAULT_AD_CONFIG: AdConfig = {
  gscVerificationCode: 'YOUR_GSC_CODE',
  topLeaderboardEnabled: true,
  topLeaderboardCode: '',
  sidebarRectEnabled: true,
  sidebarRectCode: '',
  sidebarSkyscraperEnabled: true,
  sidebarSkyscraperCode: '',
  inContentBannerEnabled: true,
  inContentBannerCode: '',
};

export function extractGscCode(rawInput: string): string {
  const trimmed = (rawInput || '').trim();
  if (!trimmed) return 'YOUR_GSC_CODE';
  const match = trimmed.match(/content=["']([^"']+)["']/i);
  return match && match[1] ? match[1].trim() : trimmed;
}

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
  const containerRef = useRef<HTMLDivElement>(null);
  const isSlotEnabled = Boolean(adConfig[enabledKey]);
  const rawCode = adConfig[slotKey]?.trim() || '';

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.innerHTML = '';
    if (!isSlotEnabled || !rawCode) return;

    // Parse and inject HTML + executable script tags for AdSense / Adsterra snippets
    const range = document.createRange();
    range.selectNode(el);
    const fragment = range.createContextualFragment(rawCode);
    el.appendChild(fragment);
  }, [isSlotEnabled, rawCode]);

  if (!isSlotEnabled) {
    return <aside id={id} aria-hidden="true" className="hidden no-print" />;
  }

  return (
    <aside
      id={id}
      aria-label={`Advertisement: ${title}`}
      className={`no-print surface-card rounded-2xl p-3 bg-[#faf8f2] border border-[#d5cbb8] flex flex-col items-center justify-center ${maxWidthClass}`}
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
        <div
          ref={containerRef}
          className={`w-full flex items-center justify-center overflow-hidden rounded-xl bg-white ${minHeightClass}`}
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
