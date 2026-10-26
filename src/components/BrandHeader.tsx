import React from 'react';
import { BRAND_LOGO_BASE64 } from '../data/logoData';
import { PresetKey } from '../utils/retirementMath';
import { YouTubeButton } from './YouTubeButton';

interface BrandHeaderProps {
  fontSizeScale: 'normal' | 'large' | 'xlarge';
  onSetFontSize: (scale: 'normal' | 'large' | 'xlarge') => void;
  onToggleGuide: () => void;
  onOpenGlossary: () => void;
  onOpenPrivacy: () => void;
  onWatchLatestVideo: () => void;
  onReadAloud: () => void;
  isReadingAloud: boolean;
  activePreset: PresetKey;
  onSelectPreset: (preset: PresetKey) => void;
}

export const BrandHeader: React.FC<BrandHeaderProps> = ({
  fontSizeScale,
  onSetFontSize,
  onToggleGuide,
  onOpenGlossary,
  onOpenPrivacy,
  onWatchLatestVideo,
  onReadAloud,
  isReadingAloud,
  activePreset,
  onSelectPreset,
}) => {
  return (
    <>
      {/* Top Privacy & Senior Accessibility Bar */}
      <div className="bg-[#0f291e] text-amber-100 border-b border-[#b07d4b]/60 px-4 py-2.5 text-sm no-print">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-emerald-100">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-600 text-white shrink-0">
              <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
              </svg>
            </span>
            <span>
              <strong className="text-white">100% Private Senior Tool:</strong> Runs in your browser. Zero bank logins, zero passwords, zero sales pitches.
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center bg-[#183b2b] p-0.5 rounded-lg border border-amber-400/30">
              <span className="text-[11px] uppercase tracking-wider text-amber-200/90 font-semibold px-2 hidden sm:inline">
                Text Size
              </span>
              <button
                id="fontNormalBtn"
                type="button"
                onClick={() => onSetFontSize('normal')}
                className={`px-2.5 py-1 rounded-md text-xs font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  fontSizeScale === 'normal'
                    ? 'bg-amber-400 text-slate-950 shadow-xs'
                    : 'text-amber-100 hover:bg-emerald-800/70'
                }`}
              >
                A (Normal)
              </button>
              <button
                id="fontLargeBtn"
                type="button"
                onClick={() => onSetFontSize('large')}
                className={`px-2.5 py-1 rounded-md text-xs font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  fontSizeScale === 'large'
                    ? 'bg-amber-400 text-slate-950 shadow-xs'
                    : 'text-amber-200 hover:bg-emerald-800/70'
                }`}
              >
                A+ (Large)
              </button>
              <button
                id="fontXLargeBtn"
                type="button"
                onClick={() => onSetFontSize('xlarge')}
                className={`px-2.5 py-1 rounded-md text-xs font-extrabold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  fontSizeScale === 'xlarge'
                    ? 'bg-amber-400 text-slate-950 shadow-xs'
                    : 'text-amber-300 hover:bg-emerald-800/70'
                }`}
              >
                A++ (Senior XL)
              </button>
            </div>

            <button
              id="toggleGuideTopBtn"
              type="button"
              onClick={onToggleGuide}
              className="px-3 py-1.5 rounded-lg bg-amber-300 hover:bg-amber-200 text-slate-950 font-bold text-xs transition-colors shadow-xs whitespace-nowrap shrink-0 cursor-pointer"
            >
              How to Use (3-Min Guide)
            </button>
            <button
              id="openGlossaryBtn"
              type="button"
              onClick={onOpenGlossary}
              className="px-3 py-1.5 rounded-lg bg-[#1c4432] hover:bg-[#255740] text-amber-200 font-bold text-xs border border-amber-400/30 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              No-Suit Glossary
            </button>
            <button
              id="openPrivacyBtn"
              type="button"
              onClick={onOpenPrivacy}
              className="px-3 py-1.5 rounded-lg bg-[#1c4432] hover:bg-[#255740] text-emerald-100 font-bold text-xs border border-emerald-400/25 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Privacy &amp; Policy
            </button>
            <button
              id="readAloudBtn"
              type="button"
              onClick={onReadAloud}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors shadow-xs whitespace-nowrap shrink-0 cursor-pointer"
            >
              <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M10 3.75a.75.75 0 00-1.264-.546L4.703 7H3.167a.75.75 0 00-.7.48A6.985 6.985 0 002 10c0 .887.165 1.737.468 2.52.111.29.39.48.7.48h1.535l4.033 3.796A.75.75 0 0010 16.25V3.75zM15.95 5.05a.75.75 0 00-1.06 1.061 5.5 5.5 0 010 7.778.75.75 0 001.06 1.06 7 7 0 000-9.899z" />
              </svg>
              <span id="readAloudLabel">
                {isReadingAloud ? 'Stop Reading' : 'Listen to My Summary'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Chalkboard Brand Header with Permanently Locked Official Logo */}
      <header className="max-w-7xl w-full mx-auto px-4 pt-4 pb-2 no-print">
        <div className="chalkboard-bg rounded-2xl p-5 md:p-6 text-white flex flex-col xl:flex-row items-center justify-between gap-5">
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            {/* Permanently Locked Official Logo Container — UNCHANGED */}
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-[#fbf6ea] border-2 border-amber-400 flex items-center justify-center shadow-xl flex-shrink-0 overflow-hidden p-0.5 select-none pointer-events-none">
              <img
                id="brandLogoImg"
                src={BRAND_LOGO_BASE64}
                alt="No-Suit Retirement Official Logo"
                className="w-full h-full max-w-full h-auto object-contain rounded-xl"
              />
              <svg id="brandLogoSvg" viewBox="0 0 200 200" className="w-full h-full hidden" role="img" aria-label="No-Suit Retirement Official Logo">
                <defs>
                  <pattern id="sunburstStripes" width="12" height="12" patternTransform="rotate(-45 0 0)" patternUnits="userSpaceOnUse">
                    <rect width="6" height="12" fill="#e6b36a" />
                    <rect x="6" width="6" height="12" fill="#d99f52" />
                  </pattern>
                </defs>
                <rect width="200" height="200" rx="22" fill="#faf3e3" />
                <circle cx="100" cy="96" r="78" fill="#1d4d35" stroke="#d4a359" strokeWidth="5" />
                <circle cx="100" cy="96" r="66" fill="none" stroke="#d4a359" strokeWidth="2.5" />
                <circle cx="100" cy="96" r="61" fill="url(#sunburstStripes)" stroke="#1c2826" strokeWidth="2.5" />
                <circle cx="52" cy="46" r="3" fill="#d4a359" />
                <circle cx="148" cy="46" r="3" fill="#d4a359" />
                <polygon points="171,91 173,95 177,95 174,98 175,102 171,99 167,102 168,98 165,95 169,95" fill="#d4a359" />
                <circle cx="29" cy="96" r="8.5" fill="#faf3e3" stroke="#c83e37" strokeWidth="2.5" />
                <polygon points="29,90 31,96 29,102 27,96" fill="#1c2826" />
                <line x1="23" y1="90" x2="35" y2="102" stroke="#c83e37" strokeWidth="2.5" />
                <line x1="35" y1="90" x2="23" y2="102" stroke="#c83e37" strokeWidth="2.5" />
                <path d="M38 152 C42 114, 158 114, 162 152 Z" fill="#dfd7c6" stroke="#1c2826" strokeWidth="3" />
                <path d="M48 152 C52 115, 148 115, 152 152 Z" fill="#2c4263" stroke="#1c2826" strokeWidth="3" />
                <polygon points="78,108 100,134 122,108" fill="#e5dec9" stroke="#1c2826" strokeWidth="2.5" />
                <rect x="86" y="92" width="28" height="22" rx="8" fill="#f0b88d" stroke="#1c2826" strokeWidth="2.5" />
                <path d="M68 64 C68 38, 132 38, 132 64 C132 94, 118 106, 100 106 C82 106, 68 94, 68 64 Z" fill="#f4c299" stroke="#1c2826" strokeWidth="3" />
                <path d="M66 64 C63 36, 82 24, 104 26 C126 26, 137 38, 134 64 C130 46, 118 40, 100 41 C82 41, 70 48, 66 64 Z" fill="#d6d9dc" stroke="#1c2826" strokeWidth="3" />
                <rect x="74" y="61" width="21" height="13" rx="3" fill="none" stroke="#1c2826" strokeWidth="3" />
                <rect x="105" y="61" width="21" height="13" rx="3" fill="none" stroke="#1c2826" strokeWidth="3" />
                <line x1="95" y1="66" x2="105" y2="66" stroke="#1c2826" strokeWidth="3" />
                <circle cx="84.5" cy="67.5" r="3" fill="#1c2826" />
                <circle cx="115.5" cy="67.5" r="3" fill="#1c2826" />
                <path d="M87 86 Q100 94 113 86 Z" fill="#ffffff" stroke="#1c2826" strokeWidth="2.5" />
                <rect x="91" y="130" width="24" height="24" rx="3" fill="#e6d6b8" stroke="#1c2826" strokeWidth="2.5" />
                <ellipse cx="103" cy="131" rx="10" ry="2.5" fill="#4a2c18" />
                <path d="M101 125 Q97 118 103 112" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
                <polygon points="18,148 42,148 36,174 18,170 25,159" fill="#163b28" stroke="#1c2826" strokeWidth="2.5" />
                <polygon points="182,148 158,148 164,174 182,170 175,159" fill="#163b28" stroke="#1c2826" strokeWidth="2.5" />
                <path d="M32 142 Q100 156 168 142 L168 174 Q100 188 32 174 Z" fill="#1d4d35" stroke="#1c2826" strokeWidth="3" />
                <path d="M35 146 Q100 160 165 146" fill="none" stroke="#d4a359" strokeWidth="2" />
                <path d="M35 170 Q100 184 165 170" fill="none" stroke="#d4a359" strokeWidth="2" />
                <text x="100" y="169" textAnchor="middle" fill="#faf3e3" fontFamily="Inter, sans-serif" fontWeight="900" fontSize="22" letterSpacing="1.5">NO-SUIT</text>
              </svg>
            </div>

            <div className="space-y-1">
              <div className="text-xs font-bold tracking-wider uppercase text-amber-300/95">
                No Wall Street Suits · Complete 8-Tool Senior Edition
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-amber-300" style={{ textWrap: 'balance' }}>
                NO-SUIT <span className="text-white">RETIREMENT COMPANION</span>
              </h1>
              <p className="text-emerald-100/95 text-sm md:text-base max-w-xl leading-relaxed">
                Plain-English chalkboard math for 2027 Social Security COLA, Medicare Part B traps, $300K–$500K 3-Bucket plans, Roth Sweet Spots, and Scam Protection.
              </p>
            </div>
          </div>

          {/* Right Column: Prominent YouTube Channel CTA + Hero Watch Latest Video + Sample Household Presets */}
          <div className="w-full xl:w-auto flex flex-col sm:flex-row xl:flex-col items-stretch sm:items-center xl:items-end justify-between gap-2.5 shrink-0">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
              <YouTubeButton variant="hero" className="w-full sm:w-auto" />
              <button
                id="heroWatchLatestVideoBtn"
                type="button"
                onClick={onWatchLatestVideo}
                data-ga-event="youtube_video_play"
                data-video-id="XHIm3Q1OvK8"
                data-video-url="https://youtu.be/XHIm3Q1OvK8"
                data-video-title="Why Your 2027 Social Security Raise Is Already Gone (Real Medicare Math)"
                className="inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 active:scale-[0.99] text-slate-950 font-extrabold text-xs sm:text-sm border border-amber-500 shadow-md transition-all cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>▶️ Watch Latest Video</span>
              </button>
            </div>

            {/* Working Preset Buttons */}
            <div className="bg-[#0f291e]/90 border border-amber-400/35 rounded-xl p-2.5 w-full sm:w-auto flex flex-col gap-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300/90 text-center xl:text-left">
                Load Sample Household Profile:
              </span>
              <div className="flex flex-wrap sm:flex-nowrap justify-center xl:justify-start gap-1.5">
                <button
                  type="button"
                  data-preset="single"
                  onClick={() => onSelectPreset('single')}
                  className={`preset-btn px-2.5 py-1.5 rounded-lg text-xs transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    activePreset === 'single'
                      ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                      : 'bg-emerald-900/80 text-amber-100 font-semibold hover:bg-emerald-800 border border-amber-400/30'
                  }`}
                >
                  Single (Age 66, $380K)
                </button>
                <button
                  type="button"
                  data-preset="couple400k"
                  onClick={() => onSelectPreset('couple400k')}
                  className={`preset-btn px-2.5 py-1.5 rounded-lg text-xs transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    activePreset === 'couple400k'
                      ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                      : 'bg-emerald-900/80 text-amber-100 font-semibold hover:bg-emerald-800 border border-amber-400/30'
                  }`}
                >
                  Couple (Age 62, $400K)
                </button>
                <button
                  type="button"
                  data-preset="latesaver"
                  onClick={() => onSelectPreset('latesaver')}
                  className={`preset-btn px-2.5 py-1.5 rounded-lg text-xs transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    activePreset === 'latesaver'
                      ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                      : 'bg-emerald-900/80 text-amber-100 font-semibold hover:bg-emerald-800 border border-amber-400/30'
                  }`}
                >
                  Late Saver (Age 59, $120K)
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
