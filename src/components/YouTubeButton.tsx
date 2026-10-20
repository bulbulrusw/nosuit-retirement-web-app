import React from 'react';

interface YouTubeButtonProps {
  variant?: 'hero' | 'topbar' | 'footer';
  className?: string;
}

export const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@NoSuitRetirement';

export const YouTubeButton: React.FC<YouTubeButtonProps> = ({ variant = 'hero', className = '' }) => {
  if (variant === 'topbar') {
    return (
      <a
        href={YOUTUBE_CHANNEL_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Subscribe on YouTube - NoSuitRetirement"
        className={`group inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#FF0000] hover:bg-[#e60000] text-white font-bold text-xs tracking-tight shadow-sm hover:shadow-[0_0_16px_rgba(255,0,0,0.5)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300 ${className}`}
      >
        <svg
          className="w-4 h-4 shrink-0 fill-current transition-transform duration-200 group-hover:scale-110"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
        <span>NoSuitRetirement</span>
      </a>
    );
  }

  if (variant === 'footer') {
    return (
      <a
        href={YOUTUBE_CHANNEL_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Subscribe on YouTube - NoSuitRetirement"
        className={`group inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-[#FF0000] hover:bg-[#e60000] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-[0_0_20px_rgba(255,0,0,0.45)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300 ${className}`}
      >
        <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-white/15 group-hover:bg-white/25 transition-colors">
          <svg
            className="w-4 h-4 shrink-0 fill-current"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
        </span>
        <span>Subscribe on YouTube - NoSuitRetirement</span>
      </a>
    );
  }

  return (
    <a
      href={YOUTUBE_CHANNEL_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Subscribe on YouTube - NoSuitRetirement"
      className={`group relative inline-flex items-center justify-center gap-3 px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl bg-gradient-to-r from-[#FF0000] via-[#e60000] to-[#cc0000] text-white font-extrabold text-xs sm:text-sm tracking-tight border border-white/25 shadow-[0_6px_20px_-3px_rgba(255,0,0,0.45)] hover:shadow-[0_8px_28px_rgba(255,0,0,0.65)] hover:scale-[1.03] active:scale-[0.99] transition-all duration-200 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300 ${className}`}
    >
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-white text-[#FF0000] shadow-xs transition-transform duration-200 group-hover:scale-110 shrink-0">
        <svg
          className="w-4 h-4 fill-current"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      </span>
      <span className="flex flex-col text-left leading-tight">
        <span className="text-[10px] uppercase tracking-wider font-semibold text-red-100">
          Watch Plain-English Videos
        </span>
        <span className="text-xs sm:text-sm font-extrabold text-white">
          Subscribe on YouTube - NoSuitRetirement
        </span>
      </span>
      <svg
        className="w-4 h-4 text-white/80 group-hover:text-white group-hover:translate-x-0.5 transition-all duration-200 shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.5}
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
      </svg>
    </a>
  );
};
