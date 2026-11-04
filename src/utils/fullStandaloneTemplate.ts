import {
  AnalyticsConfig,
  DEFAULT_CHANNEL_CONFIG,
  extractGaMeasurementId,
} from '../components/AdSlots';
import { BRAND_LOGO_BASE64 } from '../data/logoData';
import { RETIREMENT_CONSTANTS } from '../data/retirementConstants';

export function buildFullStandaloneHtml(inputConfig: AnalyticsConfig = DEFAULT_CHANNEL_CONFIG): string {
  const cleanGaId = extractGaMeasurementId(inputConfig?.gaMeasurementId);
  const serializedConstants = JSON.stringify(RETIREMENT_CONSTANTS);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>No-Suit Retirement — 2027 Social Security COLA, IRMAA &amp; Saver's Match Calculator</title>
  <meta name="description" content="Free 100% private 60–65+ retirement math calculators for 2027 Social Security 3.6% COLA, Medicare Part B Hold Harmless, 2027 IRS Saver's Match, $400K 3-Bucket plans, and Form SSA-44 IRMAA appeals." />
  <meta name="keywords" content="No-Suit Retirement, NoSuitRetirement, 2027 Social Security 3.6% COLA calculator, Medicare Part B Hold Harmless, 2027 IRS Saver's Match calculator, $400K 3-Bucket retirement strategy, 1984 Social Security Ghost Tax, IRMAA Form SSA-44 appeal, Social Security age 62 vs 67 break-even" />
  <meta name="author" content="No-Suit Retirement (@NoSuitRetirement)" />
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
  <link rel="canonical" href="https://nosuitretirement.com/" />
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2310b981'><path d='M12 2L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-3z'/></svg>" />

  <!-- OpenGraph Social Cards -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://nosuitretirement.com/" />
  <meta property="og:site_name" content="No-Suit Retirement" />
  <meta property="og:title" content="No-Suit Retirement — 2027 Social Security COLA, IRMAA &amp; Saver's Match Calculator" />
  <meta property="og:description" content="Free 100% private 60–65+ retirement math calculators for 2027 Social Security 3.6% COLA, Medicare Part B Hold Harmless, 2027 IRS Saver's Match, $400K 3-Bucket plans, and Form SSA-44 IRMAA appeals." />
  <meta property="og:image" content="https://nosuitretirement.com/og-preview.jpg" />

  <!-- Twitter / X Cards -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="No-Suit Retirement — 2027 Social Security COLA, IRMAA &amp; Saver's Match Calculator" />
  <meta name="twitter:description" content="Free 100% private 60–65+ retirement math calculators for 2027 Social Security 3.6% COLA, Medicare Part B Hold Harmless, 2027 IRS Saver's Match, $400K 3-Bucket plans, and Form SSA-44 IRMAA appeals." />
  <meta name="twitter:image" content="https://nosuitretirement.com/og-preview.jpg" />

  <!-- Enhanced Schema.org JSON-LD Structured Data: WebApplication, Organization, FAQPage & VideoObject -->
  <script id="seoJsonLdSchema" type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": "https://nosuitretirement.com/#webapp",
        "name": "No-Suit Retirement — 2027 Social Security COLA, IRMAA & Saver's Match Calculator",
        "alternateName": "NoSuitRetirement Calculator",
        "url": "https://nosuitretirement.com/",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "All",
        "browserRequirements": "Requires JavaScript. Runs 100% privately in the browser with zero bank logins.",
        "description": "Free 100% private 60–65+ retirement math calculators for 2027 Social Security 3.6% COLA, Medicare Part B Hold Harmless, 2027 IRS Saver's Match, $400K 3-Bucket plans, and Form SSA-44 IRMAA appeals.",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "publisher": {
          "@id": "https://nosuitretirement.com/#organization"
        }
      },
      {
        "@type": "Organization",
        "@id": "https://nosuitretirement.com/#organization",
        "name": "No-Suit Retirement",
        "alternateName": "NoSuitRetirement",
        "url": "https://nosuitretirement.com/",
        "sameAs": [
          "https://www.youtube.com/@NoSuitRetirement"
        ],
        "description": "Plain-English kitchen-table retirement education for Americans aged 60–65+ with moderate $100K–$600K nest eggs."
      },
      {
        "@type": "FAQPage",
        "@id": "https://nosuitretirement.com/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is the official 2027 Social Security COLA and how does the Medicare Part B Hold Harmless rule work?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The official 2027 Social Security Cost-of-Living Adjustment (COLA) is 3.6%, announced by the Social Security Administration on October 14, 2026 and payable starting January 2027. For most beneficiaries the 3.6% COLA raise exceeds the $6.60 Part B increase, so the raise absorbs it. Under Social Security Act Section 1839(f), Hold Harmless only limits the increase for people whose COLA dollar raise is smaller than the increase (roughly benefits under ~$183/month), and does not apply to new enrollees, premiums not deducted from Social Security, or IRMAA payers."
            }
          },
          {
            "@type": "Question",
            "name": "How does the 2027 IRS Federal Saver's Match (SECURE 2.0) work?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Starting in 2027 under the SECURE 2.0 Act (IRC Section 6433), the non-refundable Saver's Credit is replaced by the Federal Saver's Match—a direct 50% federal matching deposit of up to $1,000 on up to $2,000 of eligible retirement contributions per person (up to $2,000 match on $4,000 for married couples with two contributing spouses, capped at $2,000 per spouse), deposited directly into your IRA or 401(k). The full 50% match applies to Married Filing Jointly filers with Modified AGI up to $41,000 (phasing out at $71,000), Single filers up to $20,500 (phasing out at $35,500), and Head of Household filers up to $30,750 (phasing out at $53,250)."
            }
          },
          {
            "@type": "Question",
            "name": "How do I file Form SSA-44 to appeal a Medicare IRMAA surcharge after retirement?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Medicare IRMAA surcharges are based on your tax return from 2 years ago (confirmed 2026 CMS thresholds from 2024 MAGI start above $109,000 single / $218,000 married filing jointly; 2027 CMS announcement expected mid-November). If your income dropped due to one of the 8 official SSA Life-Changing Events—such as Work Stoppage (Retirement), Work Reduction, Marriage, Divorce, Death of a Spouse, Loss of Income-Producing Property, Loss of Pension Income, or Employer Settlement Payment—you can submit Form SSA-44 (Medicare Income-Related Monthly Adjustment Amount Life-Changing Event) with proof of retirement to have the Social Security Administration recalculate your Part B and Part D premiums using your current lower retirement income."
            }
          },
          {
            "@type": "Question",
            "name": "How does the 3-Bucket Crash Shield protect a $400,000 retirement nest egg?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The 3-Bucket strategy divides a $400,000 retirement nest egg into Bucket 1 (safe cash/HYSA for immediate monthly draws), Bucket 2 (Treasury bills, CDs, and short-term bonds for intermediate years), and Bucket 3 (long-term stock index funds), giving you years of protected income runway so you never have to sell stocks during a bear market."
            }
          }
        ]
      },
      {
        "@type": "ItemList",
        "@id": "https://nosuitretirement.com/#videos",
        "name": "No-Suit Retirement Chalkboard Video Breakdowns (@NoSuitRetirement)",
        "itemListElement": [
          {
            "@type": "VideoObject",
            "position": 1,
            "name": "Why Your 2027 Social Security Raise Is Already Gone (Real Medicare Math)",
            "description": "Plain-English chalkboard breakdown of how the Two-Envelope test reveals your true net Social Security deposit after Medicare Part B and Part D deductions.",
            "thumbnailUrl": ["https://i.ytimg.com/vi/XHIm3Q1OvK8/hqdefault.jpg"],
            "uploadDate": "2026-10-01T08:00:00-05:00",
            "contentUrl": "https://youtu.be/XHIm3Q1OvK8",
            "embedUrl": "https://www.youtube.com/embed/XHIm3Q1OvK8"
          },
          {
            "@type": "VideoObject",
            "position": 2,
            "name": "How to Retire Comfortably at 62 With $400,000 and Social Security (Real Monthly Budget)",
            "description": "Step-by-step kitchen-table guide to retiring comfortably at age 62 with $400,000 and Social Security using a 3-Bucket Crash Shield with 8 full years of protected cash and T-Bill runway.",
            "thumbnailUrl": ["https://i.ytimg.com/vi/alUfXINV93Y/hqdefault.jpg"],
            "uploadDate": "2026-10-08T08:00:00-05:00",
            "contentUrl": "https://youtu.be/alUfXINV93Y",
            "embedUrl": "https://www.youtube.com/embed/alUfXINV93Y"
          },
          {
            "@type": "VideoObject",
            "position": 3,
            "name": "Turning 60 in 2026? The $11,250 \"Super Catch-Up\" Window Closing on Dec 31",
            "description": "How workers aged 60, 61, 62, or 63 can use the SECURE 2.0 $11,250 Super Catch-Up window before December 31 and shield their retirement savings from the 1984 IRS Ghost Tax.",
            "thumbnailUrl": ["https://i.ytimg.com/vi/2RCtkLFUmUc/hqdefault.jpg"],
            "uploadDate": "2026-10-15T08:00:00-05:00",
            "contentUrl": "https://youtu.be/2RCtkLFUmUc",
            "embedUrl": "https://www.youtube.com/embed/2RCtkLFUmUc"
          }
        ]
      }
    ]
  }
  </script>

  <script src="https://cdn.tailwindcss.com/3.4.17"></script>
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <style>
    :root { --base-font: 16px; }
    html { font-size: var(--base-font); font-family: 'Inter', system-ui, sans-serif; scroll-behavior: smooth; }
    body { background-color: #f7f4eb; color: #1c2826; }
    .chalkboard-bg {
      background: linear-gradient(135deg, #1b4332 0%, #143325 100%);
      border: 4px solid #b07d4b;
      box-shadow: 0 10px 25px -5px rgba(20, 51, 37, 0.25);
    }
    .chalk-card {
      background-color: #214e3a;
      border: 2px solid rgba(251, 191, 36, 0.35);
    }
    input[type="range"] { accent-color: #1b4332; height: 0.65rem; cursor: pointer; }
    @media (max-width: 767px) {
      button, [role="button"], .preset-btn, .quick-scenario-btn, .nav-tab-btn, .affiliate-link {
        min-height: 44px;
        min-width: 44px;
      }
    }
    @media print {
      .no-print, #saversMatchSection, #seoRetirementGuidesSection { display: none !important; }
      body { background: #ffffff !important; color: #000000 !important; }
      .tab-panel:not(#tab-binder) { display: none !important; }
      #tab-binder { display: block !important; }
    }
  </style>
</head>
<body class="min-h-screen flex flex-col pb-20 md:pb-0">

  <!-- Top Privacy & Senior Accessibility Bar (Public Studio Buttons Hidden From Regular Visitors) -->
  <div class="bg-[#143325] text-amber-100 border-b-2 border-[#b07d4b] px-4 py-2 text-sm no-print">
    <div class="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
      <div class="flex items-center gap-2 font-medium">
        <span class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-700 text-white text-xs font-bold">✓</span>
        <span><strong>100% Private Senior Tool:</strong> Runs in your browser. Zero bank logins, zero passwords, zero sales pitches.</span>
      </div>
      <div class="flex flex-wrap items-center gap-2">
        <span class="text-xs uppercase tracking-wider text-amber-200 font-semibold">Text Size:</span>
        <button id="fontNormalBtn" type="button" class="px-2.5 py-1 rounded bg-emerald-900 hover:bg-emerald-800 text-white font-semibold text-xs border border-amber-400/50">A (Normal)</button>
        <button id="fontLargeBtn" type="button" class="px-2.5 py-1 rounded bg-emerald-950 hover:bg-emerald-800 text-amber-200 font-bold text-sm border border-amber-400/30">A+ (Large)</button>
        <button id="fontXLargeBtn" type="button" class="px-2.5 py-1 rounded bg-emerald-950 hover:bg-emerald-800 text-amber-300 font-extrabold text-base border border-amber-400/30">A++ (Senior XL)</button>
        <button id="toggleGuideTopBtn" type="button" class="ml-1 px-3 py-1 rounded bg-amber-300 hover:bg-amber-200 text-slate-950 font-extrabold text-xs border border-amber-500 shadow-sm">📘 How to Use (3-Min Guide)</button>
        <button id="openGlossaryBtn" type="button" class="px-3 py-1 rounded bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-xs">📖 No-Suit Glossary</button>
        <button id="openPrivacyBtn" type="button" class="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-amber-200 font-bold text-xs border border-amber-400/40">🔒 Privacy &amp; Policy</button>
        <button id="readAloudBtn" type="button" class="px-3 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs">
          <span id="readAloudLabel">🔊 Listen to My Summary</span>
        </button>
      </div>
    </div>
  </div>

  <!-- Main Chalkboard Brand Header with Permanently Locked Official Logo & YouTube Subscribe Button -->
  <header class="max-w-7xl w-full mx-auto px-4 pt-4 pb-2 no-print">
    <div class="chalkboard-bg rounded-2xl p-4 md:p-6 text-white flex flex-col xl:flex-row items-center justify-between gap-4">
      <div class="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
        <!-- Permanently Locked Official Logo Container (UNCHANGED) -->
        <div class="w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-[#fbf6ea] border-2 border-amber-400 flex items-center justify-center shadow-xl flex-shrink-0 overflow-hidden p-0.5 select-none pointer-events-none">
          <img
            id="brandLogoImg"
            src="${BRAND_LOGO_BASE64}"
            alt="No-Suit Retirement Official Logo"
            class="w-full h-full max-w-full h-auto object-contain rounded-xl"
          />
          <svg id="brandLogoSvg" viewBox="0 0 200 200" class="w-full h-full hidden" role="img" aria-label="No-Suit Retirement Official Logo">
            <defs>
              <pattern id="sunburstStripes" width="12" height="12" patternTransform="rotate(-45 0 0)" patternUnits="userSpaceOnUse">
                <rect width="6" height="12" fill="#e6b36a"/>
                <rect x="6" width="6" height="12" fill="#d99f52"/>
              </pattern>
            </defs>
            <rect width="200" height="200" rx="22" fill="#faf3e3"/>
            <circle cx="100" cy="96" r="78" fill="#1d4d35" stroke="#d4a359" stroke-width="5"/>
            <circle cx="100" cy="96" r="66" fill="none" stroke="#d4a359" stroke-width="2.5"/>
            <circle cx="100" cy="96" r="61" fill="url(#sunburstStripes)" stroke="#1c2826" stroke-width="2.5"/>
            <circle cx="52" cy="46" r="3" fill="#d4a359"/>
            <circle cx="148" cy="46" r="3" fill="#d4a359"/>
            <polygon points="171,91 173,95 177,95 174,98 175,102 171,99 167,102 168,98 165,95 169,95" fill="#d4a359"/>
            <circle cx="29" cy="96" r="8.5" fill="#faf3e3" stroke="#c83e37" stroke-width="2.5"/>
            <polygon points="29,90 31,96 29,102 27,96" fill="#1c2826"/>
            <line x1="23" y1="90" x2="35" y2="102" stroke="#c83e37" stroke-width="2.5"/>
            <line x1="35" y1="90" x2="23" y2="102" stroke="#c83e37" stroke-width="2.5"/>
            <path d="M38 152 C42 114, 158 114, 162 152 Z" fill="#dfd7c6" stroke="#1c2826" stroke-width="3"/>
            <path d="M48 152 C52 115, 148 115, 152 152 Z" fill="#2c4263" stroke="#1c2826" stroke-width="3"/>
            <polygon points="78,108 100,134 122,108" fill="#e5dec9" stroke="#1c2826" stroke-width="2.5"/>
            <rect x="86" y="92" width="28" height="22" rx="8" fill="#f0b88d" stroke="#1c2826" stroke-width="2.5"/>
            <path d="M68 64 C68 38, 132 38, 132 64 C132 94, 118 106, 100 106 C82 106, 68 94, 68 64 Z" fill="#f4c299" stroke="#1c2826" stroke-width="3"/>
            <path d="M66 64 C63 36, 82 24, 104 26 C126 26, 137 38, 134 64 C130 46, 118 40, 100 41 C82 41, 70 48, 66 64 Z" fill="#d6d9dc" stroke="#1c2826" stroke-width="3"/>
            <rect x="74" y="61" width="21" height="13" rx="3" fill="none" stroke="#1c2826" stroke-width="3"/>
            <rect x="105" y="61" width="21" height="13" rx="3" fill="none" stroke="#1c2826" stroke-width="3"/>
            <line x1="95" y1="66" x2="105" y2="66" stroke="#1c2826" stroke-width="3"/>
            <circle cx="84.5" cy="67.5" r="3" fill="#1c2826"/>
            <circle cx="115.5" cy="67.5" r="3" fill="#1c2826"/>
            <path d="M87 86 Q100 94 113 86 Z" fill="#ffffff" stroke="#1c2826" stroke-width="2.5"/>
            <rect x="91" y="130" width="24" height="24" rx="3" fill="#e6d6b8" stroke="#1c2826" stroke-width="2.5"/>
            <ellipse cx="103" cy="131" rx="10" ry="2.5" fill="#4a2c18"/>
            <path d="M101 125 Q97 118 103 112" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round"/>
            <polygon points="18,148 42,148 36,174 18,170 25,159" fill="#163b28" stroke="#1c2826" stroke-width="2.5"/>
            <polygon points="182,148 158,148 164,174 182,170 175,159" fill="#163b28" stroke="#1c2826" stroke-width="2.5"/>
            <path d="M32 142 Q100 156 168 142 L168 174 Q100 188 32 174 Z" fill="#1d4d35" stroke="#1c2826" stroke-width="3"/>
            <path d="M35 146 Q100 160 165 146" fill="none" stroke="#d4a359" stroke-width="2"/>
            <path d="M35 170 Q100 184 165 170" fill="none" stroke="#d4a359" stroke-width="2"/>
            <text x="100" y="169" text-anchor="middle" fill="#faf3e3" font-family="Inter, sans-serif" font-weight="900" font-size="22" letter-spacing="1.5">NO-SUIT</text>
          </svg>
        </div>
        <div>
          <div class="text-xs font-bold uppercase tracking-wider text-amber-300 mb-1">
            No Wall Street Suits • Complete 8-Tool Senior Edition
          </div>
          <h1 class="text-2xl md:text-3xl font-extrabold tracking-tight text-amber-300">
            NO-SUIT <span class="text-white">RETIREMENT COMPANION</span>
          </h1>
          <p class="text-emerald-100 text-sm md:text-base mt-0.5 max-w-xl">
            Plain-English chalkboard math for 2027 Social Security COLA, Medicare Part B traps, $300K–$500K 3-Bucket plans, Roth Sweet Spots, and Scam Protection.
          </p>
        </div>
      </div>

      <!-- Right Column: YouTube Channel CTA + Hero Watch Latest Video + Sample Household Presets -->
      <div class="w-full xl:w-auto flex flex-col sm:flex-row xl:flex-col items-stretch sm:items-center xl:items-end justify-between gap-2.5">
        <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <a
            href="https://www.youtube.com/@NoSuitRetirement"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center gap-3 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#FF0000] to-[#cc0000] hover:from-[#e60000] hover:to-[#b30000] text-white font-extrabold text-sm shadow-lg border border-white/25 transition-all duration-200 hover:scale-[1.02]"
          >
            <span class="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-white text-[#FF0000] flex-shrink-0">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </span>
            <span class="flex flex-col text-left leading-tight">
              <span class="text-[10px] uppercase tracking-wider font-semibold text-red-100">WATCH RETIREMENT MATH IN PLAIN ENGLISH</span>
              <span class="text-xs sm:text-sm font-extrabold text-white">Subscribe on YouTube - NoSuitRetirement</span>
            </span>
          </a>
          <a
            id="heroWatchLatestVideoBtn"
            href="https://youtu.be/XHIm3Q1OvK8"
            target="_blank"
            rel="noopener noreferrer"
            data-ga-event="youtube_video_play"
            data-video-id="XHIm3Q1OvK8"
            data-video-title="Why Your 2027 Social Security Raise Is Already Gone (Real Medicare Math)"
            class="inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs sm:text-sm border border-amber-500 shadow-md"
          >
            <span>▶️ Watch Latest Video</span>
          </a>
        </div>

        <div class="bg-[#143325]/90 border border-amber-400/40 rounded-xl p-2.5 w-full sm:w-auto flex flex-col gap-1.5">
          <span class="text-[11px] font-bold uppercase tracking-wider text-amber-300 text-center xl:text-left">Click to Load Sample Household:</span>
          <div class="flex flex-wrap justify-center xl:justify-start gap-1.5">
            <button type="button" data-preset="single" class="preset-btn px-2.5 py-1.5 rounded-lg bg-emerald-800 text-amber-100 font-semibold text-xs hover:bg-emerald-700 border border-amber-400/30">
              Single (Age 66, $380K)
            </button>
            <button type="button" data-preset="couple400k" class="preset-btn px-2.5 py-1.5 rounded-lg bg-amber-400 text-slate-950 font-bold text-xs hover:bg-amber-300 shadow-sm">
              Couple (Age 66, $400K)
            </button>
            <button type="button" data-preset="latesaver" class="preset-btn px-2.5 py-1.5 rounded-lg bg-emerald-800 text-amber-100 font-semibold text-xs hover:bg-emerald-700 border border-amber-400/30">
              Late Saver (Age 59, $120K)
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>

  <!-- Collapsible 3-Minute Senior User Guide (Video Tutorials button removed) -->
  <section id="userGuideSection" class="max-w-7xl w-full mx-auto px-4 mt-2 no-print">
    <div class="bg-white rounded-2xl border-2 border-[#b07d4b] shadow-sm overflow-hidden">
      <div class="bg-[#1b4332] text-white px-4 py-3 md:px-6 flex flex-wrap items-center justify-between gap-3 border-b-2 border-[#b07d4b]">
        <div>
          <h2 class="text-base md:text-lg font-extrabold text-amber-300">How to Use the No-Suit Retirement Companion (In Under 3 Minutes)</h2>
          <p class="text-xs text-emerald-100">Welcome to your kitchen-table retirement worksheet! 100% private in your browser—no spreadsheets or passwords needed.</p>
        </div>
        <button id="collapseGuideBtn" type="button" class="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs shadow-sm">
          <span id="collapseGuideLabel">▼ Show 3-Min Guide</span>
        </button>
      </div>
      <div id="userGuideBody" class="hidden p-4 md:p-6 space-y-4 text-sm text-slate-800">
        <div class="grid grid-cols-1 lg:grid-cols-5 gap-3">
          <div class="p-3.5 rounded-xl bg-[#f7f4eb] border border-[#b07d4b]/50 flex flex-col justify-between gap-2">
            <div>
              <div class="text-xs font-extrabold uppercase text-emerald-900">Tab 1 • Net Check &amp; $400K</div>
              <p class="text-xs text-slate-700 mt-1">Compare your 2027 Social Security COLA against Medicare Part B hikes and build your 3-Bucket Crash Shield.</p>
            </div>
            <button type="button" data-goto-tab="tab-paycheck" class="guide-tab-link py-1.5 px-2.5 rounded-lg bg-[#1b4332] text-amber-300 font-bold text-xs">Open Tab 1 →</button>
          </div>
          <div class="p-3.5 rounded-xl bg-[#f7f4eb] border border-[#b07d4b]/50 flex flex-col justify-between gap-2">
            <div>
              <div class="text-xs font-extrabold uppercase text-amber-900">Tab 2 • Age 62 vs 67 &amp; Work</div>
              <p class="text-xs text-slate-700 mt-1">See your exact claiming break-even age and check the $25,560/yr ($2,130/mo) in 2027 (up from $24,480/yr in 2026) early-retirement work limit.</p>
            </div>
            <button type="button" data-goto-tab="tab-claiming" class="guide-tab-link py-1.5 px-2.5 rounded-lg bg-[#1b4332] text-amber-300 font-bold text-xs">Open Tab 2 →</button>
          </div>
          <div class="p-3.5 rounded-xl bg-[#f7f4eb] border border-[#b07d4b]/50 flex flex-col justify-between gap-2">
            <div>
              <div class="text-xs font-extrabold uppercase text-sky-900">Tab 3 • 1984 Tax &amp; IRMAA</div>
              <p class="text-xs text-slate-700 mt-1">Check the 1984 IRS Ghost Tax meter, Roth Conversion Sweet Spot, and Form SSA-44 IRMAA appeal.</p>
            </div>
            <button type="button" data-goto-tab="tab-taxshield" class="guide-tab-link py-1.5 px-2.5 rounded-lg bg-[#1b4332] text-amber-300 font-bold text-xs">Open Tab 3 →</button>
          </div>
          <div class="p-3.5 rounded-xl bg-[#f7f4eb] border border-[#b07d4b]/50 flex flex-col justify-between gap-2">
            <div>
              <div class="text-xs font-extrabold uppercase text-red-900">Tab 4 • Scam &amp; Dec 7 Audit</div>
              <p class="text-xs text-slate-700 mt-1">Run the 5-second Senior Scam Detector and the 5-step Medicare Open Enrollment checklist.</p>
            </div>
            <button type="button" data-goto-tab="tab-safety" class="guide-tab-link py-1.5 px-2.5 rounded-lg bg-[#1b4332] text-amber-300 font-bold text-xs">Open Tab 4 →</button>
          </div>
          <div class="p-3.5 rounded-xl bg-[#f7f4eb] border border-[#b07d4b]/50 flex flex-col justify-between gap-2">
            <div>
              <div class="text-xs font-extrabold uppercase text-purple-900">Tab 5 • Print Plan &amp; Binder</div>
              <p class="text-xs text-slate-700 mt-1">Print your 1-page retirement snapshot and record physical home locations of key family documents.</p>
            </div>
            <button type="button" data-goto-tab="tab-binder" class="guide-tab-link py-1.5 px-2.5 rounded-lg bg-[#1b4332] text-amber-300 font-bold text-xs">Open Tab 5 →</button>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Toast Notification -->
  <div id="appToast" class="hidden fixed bottom-20 md:bottom-5 right-5 z-50 bg-[#1b4332] text-amber-200 border-2 border-amber-400 px-4 py-3 rounded-xl shadow-2xl font-semibold text-sm max-w-sm"></div>

  <!-- MAIN 12-COLUMN FULL-WIDTH DESKTOP GRID -->
  <main class="max-w-7xl w-full mx-auto px-4 py-5 flex-1 space-y-8">
    <div id="calculatorSectionAnchor" class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      <!-- FULL 12 COLUMNS: 5-Tab Interactive Calculator -->
      <div id="calculatorMainColumn" class="lg:col-span-12 space-y-6">
        <!-- 1-Touch Scenario Presets Bar -->
        <section id="quickScenarioPresetsBar" aria-label="1-Touch Retirement Scenario Presets" class="no-print bg-white rounded-2xl p-4 md:p-5 border-2 border-[#b07d4b] shadow-sm space-y-3">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span class="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-emerald-950 bg-emerald-100 px-2.5 py-0.5 rounded-md border border-emerald-300">⚡ 1-Touch Quick-Start Scenarios</span>
              <h2 class="text-sm md:text-base font-extrabold text-slate-900 mt-1">Click Any Real U.S. Retirement Scenario Below to Auto-Populate the Math:</h2>
            </div>
            <span class="text-xs font-semibold text-slate-600">Instant 1-Click Calculation • 100% Private</span>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-2.5">
            <button id="presetAvgSeniorBtn" type="button" data-quick-scenario="avgSenior" class="quick-scenario-btn text-left p-3.5 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between gap-2 bg-[#f7f4eb] hover:bg-amber-50 text-slate-900 border-[#b07d4b]/60">
              <span class="text-xs sm:text-sm font-extrabold leading-snug">👤 Average Senior ($2,000/mo SS Benefit, $${RETIREMENT_CONSTANTS.MEDICARE_PART_B.base2026.toFixed(2)} Part B)</span>
              <span class="text-[11px] font-bold px-2 py-0.5 rounded shrink-0 bg-emerald-900 text-amber-200">Load →</span>
            </button>
            <button id="preset3BucketBtn" type="button" data-quick-scenario="bucket400k" class="quick-scenario-btn text-left p-3.5 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between gap-2 bg-[#f7f4eb] hover:bg-amber-50 text-slate-900 border-[#b07d4b]/60">
              <span class="text-xs sm:text-sm font-extrabold leading-snug">💼 3-Bucket Plan ($400,000 Nest Egg: $40K Cash, $160K Income, $200K Growth)</span>
              <span class="text-[11px] font-bold px-2 py-0.5 rounded shrink-0 bg-emerald-900 text-amber-200">Load →</span>
            </button>
            <button id="presetSaversMatchBtn" type="button" data-quick-scenario="saversMatch2027" class="quick-scenario-btn text-left p-3.5 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between gap-2 bg-[#f7f4eb] hover:bg-amber-50 text-slate-900 border-[#b07d4b]/60">
              <span class="text-xs sm:text-sm font-extrabold leading-snug">🎁 2027 Saver's Match ($2,000 Saved = $1,000 Free Federal Match)</span>
              <span class="text-[11px] font-bold px-2 py-0.5 rounded shrink-0 bg-emerald-900 text-amber-200">Load →</span>
            </button>
          </div>
        </section>

        <!-- 5 Navigation Tabs -->
        <nav class="no-print" aria-label="Main Modules">
          <div class="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-2 bg-[#e9e2d0] p-2 rounded-xl border-2 border-[#b07d4b]">
            <button type="button" data-tab="tab-paycheck" class="nav-tab-btn py-2.5 px-2.5 rounded-lg font-bold text-xs bg-[#1b4332] text-amber-300 shadow">
              1. Net Check &amp; $400K
            </button>
            <button type="button" data-tab="tab-claiming" class="nav-tab-btn py-2.5 px-2.5 rounded-lg font-bold text-xs bg-white text-slate-800 hover:bg-amber-50">
              2. Age 62 vs 67 &amp; Work
            </button>
            <button type="button" data-tab="tab-taxshield" class="nav-tab-btn py-2.5 px-2.5 rounded-lg font-bold text-xs bg-white text-slate-800 hover:bg-amber-50">
              3. 1984 Tax &amp; IRMAA
            </button>
            <button type="button" data-tab="tab-safety" class="nav-tab-btn py-2.5 px-2.5 rounded-lg font-bold text-xs bg-white text-slate-800 hover:bg-amber-50">
              4. Scam &amp; Dec 7 Audit
            </button>
            <button type="button" data-tab="tab-binder" class="nav-tab-btn col-span-2 sm:col-span-1 py-2.5 px-2.5 rounded-lg font-bold text-xs bg-white text-slate-800 hover:bg-amber-50">
              5. Print Plan &amp; Binder
            </button>
          </div>
        </nav>

        <!-- TAB 1: TWO-ENVELOPE NET CHECK & 3-BUCKET PLANNER -->
        <section id="tab-paycheck" class="tab-panel space-y-6">
          <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5">
            <div class="bg-white rounded-xl p-4 border-2 border-[#b07d4b] shadow-sm">
              <div class="text-xs font-bold uppercase text-slate-500">Green Envelope (2027 COLA)</div>
              <div id="kpiGrossCola" class="text-2xl font-extrabold text-emerald-700 mt-1">+$112/mo</div>
              <p id="kpiGrossCheckSub" class="text-xs text-slate-600 mt-1">Gross SS climbs to $3,212/mo</p>
            </div>
            <div class="bg-white rounded-xl p-4 border-2 border-red-300 shadow-sm">
              <div class="text-xs font-bold uppercase text-red-700">Red Envelope (Part B/D Bite)</div>
              <div id="kpiMedicareBite" class="text-2xl font-extrabold text-red-600 mt-1">-$13/mo</div>
              <p id="kpiMedicareSub" class="text-xs text-slate-600 mt-1">Takes 12% of your COLA raise</p>
            </div>
            <div class="bg-[#1b4332] text-white rounded-xl p-4 border-2 border-amber-400 shadow-sm">
              <div class="text-xs font-bold uppercase text-amber-300">True Net Social Security</div>
              <div id="kpiNetSS" class="text-2xl font-extrabold text-white mt-1">$2,793/mo</div>
              <p id="kpiNetRaiseSub" class="text-xs text-emerald-200 mt-1">Real net raise: +$98/mo</p>
            </div>
            <div class="bg-amber-50 rounded-xl p-4 border-2 border-amber-500 shadow-sm">
              <div class="text-xs font-bold uppercase text-amber-900">Total Monthly Paycheck</div>
              <div id="kpiTotalPaycheck" class="text-2xl font-extrabold text-slate-900 mt-1">$4,293/mo</div>
              <p id="kpiBudgetSurplus" class="text-xs font-semibold text-emerald-800 mt-1">+$993/mo breathing room</p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div class="bg-white rounded-2xl p-5 border-2 border-[#b07d4b] shadow-sm space-y-4">
              <div class="border-b pb-2.5">
                <span class="text-xs font-bold uppercase text-emerald-900">Tool 1A • The Two-Envelope Test</span>
                <h2 class="text-base font-extrabold text-slate-900 mt-0.5">2027 Social Security COLA vs. Medicare Part B</h2>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label for="ssYourCheck" class="block text-xs font-bold text-slate-800">Your Current Gross SS ($/mo)</label>
                  <input id="ssYourCheck" type="number" value="1940" class="mt-1 w-full rounded-lg border-2 border-slate-300 px-3 py-2 font-bold text-sm" />
                </div>
                <div>
                  <label for="ssSpouseCheck" class="block text-xs font-bold text-slate-800">Spouse Gross SS ($/mo, 0 if single)</label>
                  <input id="ssSpouseCheck" type="number" value="1160" class="mt-1 w-full rounded-lg border-2 border-slate-300 px-3 py-2 font-bold text-sm" />
                </div>
                <div>
                  <label for="colaPctInput" class="block text-xs font-bold text-slate-800">Official 2027 COLA % (<span id="colaPctVal">${RETIREMENT_CONSTANTS.COLA_2027_PCT.toFixed(1)}</span>% SSA Official)</label>
                  <input id="colaPctInput" type="range" min="1.5" max="6.0" step="0.1" value="${RETIREMENT_CONSTANTS.COLA_2027_PCT.toFixed(1)}" class="mt-2 w-full" />
                </div>
                <div>
                  <label for="partBIncreaseInput" class="block text-xs font-bold text-slate-800">Part B Hike ($/mo/person)</label>
                  <input id="partBIncreaseInput" type="number" step="0.1" value="${RETIREMENT_CONSTANTS.MEDICARE_PART_B.defaultIncrease2027.toFixed(2)}" class="mt-1 w-full rounded-lg border-2 border-slate-300 px-3 py-2 font-bold text-sm" />
                </div>
                <div class="sm:col-span-2">
                  <label for="partDMonthlyPremiumInput" class="block text-xs font-bold text-slate-800">Part D Plan Monthly Premium ($/mo/person)</label>
                  <input id="partDMonthlyPremiumInput" type="number" min="0" step="1" value="0" class="mt-1 w-full rounded-lg border-2 border-slate-300 px-3 py-2 font-bold text-sm" />
                </div>
              </div>
              <div class="text-xs text-slate-600 bg-slate-100 border border-slate-200 rounded-lg px-3 py-2 leading-relaxed space-y-1.5">
                <div class="flex flex-wrap items-center justify-between gap-2">
                  <strong class="text-slate-900">2027 Part B Premium: $209.50 (Medicare Trustees Projection — CMS official confirmation pending)</strong>
                  <span id="holdHarmlessStatusBadge" class="px-2.5 py-0.5 rounded-md font-extrabold text-xs bg-emerald-100 text-emerald-950 border border-emerald-400">COLA Absorbs Hike (§ 1839(f) Eligible)</span>
                </div>
                <p>For most beneficiaries the 3.6% COLA raise exceeds the $6.60 Part B increase, so the raise absorbs it. Section 1839(f) only limits the increase for people whose COLA dollar raise is smaller than the increase (roughly benefits under ~$183/month), and does not apply to new enrollees, premiums not deducted from Social Security, or IRMAA payers.</p>
              </div>
              <div class="bg-amber-50 border-l-4 border-amber-500 p-3 rounded-r-xl text-xs space-y-1">
                <div class="font-bold text-amber-950 flex items-center justify-between">
                  <span>The "86-Cent Dollar" Buying Power Check:</span>
                  <span id="buyingPowerLossBadge" class="font-extrabold">-$425/mo vs 2016</span>
                </div>
                <p class="text-[11px] text-slate-700 leading-relaxed">
                  Source: <a href="https://seniorsleague.org" target="_blank" rel="noopener noreferrer" class="underline font-semibold text-amber-950">The Senior Citizens League</a>, 2026 Loss of Buying Power study (13.7% loss 2016-2026, using TSCL's own 70-item price index; not an official government measure).
                </p>
              </div>
            </div>

            <div class="bg-white rounded-2xl p-5 border-2 border-[#b07d4b] shadow-sm space-y-4">
              <div class="border-b pb-2.5">
                <span class="text-xs font-bold uppercase text-amber-900">Tool 1B • Moderate Nest Egg Math</span>
                <h2 class="text-base font-extrabold text-slate-900 mt-0.5">401(k)/IRA Nest Egg &amp; Monthly Living Budget</h2>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label for="nestEggInput" class="block text-xs font-bold text-slate-800">Total Retirement Savings ($)</label>
                  <input id="nestEggInput" type="number" step="10000" value="400000" class="mt-1 w-full rounded-lg border-2 border-slate-300 px-3 py-2 font-bold text-sm" />
                </div>
                <div>
                  <label for="withdrawalRateInput" class="block text-xs font-bold text-slate-800">Safe Guardrail Draw Rate (<span id="withdrawalRateVal">4.5</span>%)</label>
                  <input id="withdrawalRateInput" type="range" min="3.0" max="6.5" step="0.1" value="4.5" class="mt-2 w-full" />
                </div>
              </div>
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div>
                  <label for="expHousing" class="block text-[11px] font-bold text-slate-700">Housing ($/mo)</label>
                  <input id="expHousing" type="number" value="1350" class="mt-1 w-full rounded-lg border border-slate-300 px-2 py-1.5 font-semibold text-xs" />
                </div>
                <div>
                  <label for="expGroceries" class="block text-[11px] font-bold text-slate-700">Groceries ($/mo)</label>
                  <input id="expGroceries" type="number" value="750" class="mt-1 w-full rounded-lg border border-slate-300 px-2 py-1.5 font-semibold text-xs" />
                </div>
                <div>
                  <label for="expHealthcare" class="block text-[11px] font-bold text-slate-700">Medical ($/mo)</label>
                  <input id="expHealthcare" type="number" value="650" class="mt-1 w-full rounded-lg border border-slate-300 px-2 py-1.5 font-semibold text-xs" />
                </div>
                <div>
                  <label for="expCarFun" class="block text-[11px] font-bold text-slate-700">Car/Fun ($/mo)</label>
                  <input id="expCarFun" type="number" value="550" class="mt-1 w-full rounded-lg border border-slate-300 px-2 py-1.5 font-semibold text-xs" />
                </div>
              </div>
              <div class="bg-emerald-50 border border-emerald-300 rounded-xl p-3 text-xs">
                <div class="font-bold text-emerald-950">
                  Why <span id="equivRetireAnnual">$51,240/yr</span> in Retirement Feels Like <span id="equivWorkingSalary" class="underline font-extrabold">$71,167/yr</span> Working
                </div>
              </div>
            </div>
          </div>

          <div class="chalkboard-bg rounded-2xl p-5 text-white space-y-4">
            <div class="flex items-center justify-between border-b border-amber-400/30 pb-3">
              <div>
                <span class="text-xs font-bold uppercase text-amber-300">Crash Protection System</span>
                <h2 class="text-lg font-extrabold text-white">Your "3-Bucket" Nest Egg Shield</h2>
              </div>
              <span id="monthlyPortfolioDrawBadge" class="px-3 py-1 rounded-lg bg-amber-400 text-slate-950 font-extrabold text-sm">$1,500/mo Draw</span>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div class="chalk-card rounded-xl p-3.5">
                <div class="text-xs font-bold text-emerald-300 uppercase">Bucket 1 • Years 1–2</div>
                <div id="bucket1Amt" class="text-xl font-extrabold text-amber-300 mt-1">$36,000</div>
                <p class="text-xs text-emerald-100 mt-1">24 months of draws in safe HYSA.</p>
              </div>
              <div class="chalk-card rounded-xl p-3.5">
                <div class="text-xs font-bold text-amber-300 uppercase">Bucket 2 • Years 3–8</div>
                <div id="bucket2Amt" class="text-xl font-extrabold text-amber-300 mt-1">$108,000</div>
                <p class="text-xs text-emerald-100 mt-1">6 years of T-Bills, CDs &amp; Bonds.</p>
              </div>
              <div class="chalk-card rounded-xl p-3.5">
                <div class="text-xs font-bold text-sky-300 uppercase">Bucket 3 • Year 9+</div>
                <div id="bucket3Amt" class="text-xl font-extrabold text-amber-300 mt-1">$256,000</div>
                <p class="text-xs text-emerald-100 mt-1">Long-term index growth untouched for <span id="yearsProtectedText">8 full years</span>.</p>
              </div>
            </div>
            <div class="bg-[#0f291e] rounded-xl p-3 text-xs text-emerald-200 border border-amber-400/25 leading-relaxed">
              ℹ️ Baseline Guardrail Model: Assumes a 4.5% safe portfolio draw and 8 full years in cash/T-Bills to protect against sequence-of-returns risk. Not an investment guarantee.
            </div>
          </div>

          <div class="bg-white rounded-2xl p-5 border-2 border-[#b07d4b] shadow-sm space-y-3">
            <h3 class="text-base font-extrabold text-slate-900">"Go-Go (60s), Slow-Go (70s), No-Go (80s)" Cash Flow</h3>
            <div class="relative h-56 w-full"><canvas id="paycheckChart"></canvas></div>
            <div class="grid grid-cols-3 gap-2 text-center text-xs">
              <div class="bg-emerald-50 p-2 rounded-lg border border-emerald-200">
                <div class="font-bold text-emerald-900">Go-Go (62–70)</div>
                <div id="gogoSpendText" class="font-extrabold text-slate-900">$3,300/mo</div>
              </div>
              <div class="bg-amber-50 p-2 rounded-lg border border-amber-200">
                <div class="font-bold text-amber-900">Slow-Go (71–80)</div>
                <div id="slowgoSpendText" class="font-extrabold text-slate-900">$2,805/mo</div>
              </div>
              <div class="bg-sky-50 p-2 rounded-lg border border-sky-200">
                <div class="font-bold text-sky-900">No-Go (81+)</div>
                <div id="nogoSpendText" class="font-extrabold text-slate-900">$3,135/mo</div>
              </div>
            </div>
          </div>
        </section>

        <!-- TAB 2: CLAIMING AGE & WORKING RULES -->
        <section id="tab-claiming" class="tab-panel hidden space-y-6">
          <div class="bg-white rounded-2xl p-5 border-2 border-[#b07d4b] shadow-sm space-y-4">
            <h2 class="text-lg font-extrabold text-slate-900 border-b pb-3">Social Security Claiming Age: 62 vs. FRA (<span id="fraTitleLabel">67</span>) vs. 70 Break-Even</h2>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label for="claimingBirthYearSelect" class="block text-sm font-bold text-slate-800">Your Birth Year (Sets Statutory FRA)</label>
                <select id="claimingBirthYearSelect" class="mt-1 w-full rounded-lg border-2 border-slate-300 px-3 py-2 font-bold bg-white text-sm">
                  <option value="1960+" selected>Born 1960 or Later (FRA 67)</option>
                  <option value="1959">Born 1959 (FRA 66 + 10 mos)</option>
                  <option value="1958">Born 1958 (FRA 66 + 8 mos)</option>
                  <option value="1957">Born 1957 (FRA 66 + 6 mos)</option>
                  <option value="1956">Born 1956 (FRA 66 + 4 mos)</option>
                  <option value="1955">Born 1955 (FRA 66 + 2 mos)</option>
                </select>
              </div>
              <div>
                <label for="fraBenefitInput" class="block text-sm font-bold text-slate-800">Full Retirement Age (<span id="fraInputLabel">67</span>) Benefit ($/mo)</label>
                <input id="fraBenefitInput" type="number" step="50" value="2200" class="mt-1 w-full rounded-lg border-2 border-slate-300 px-3 py-2 font-bold" />
              </div>
              <div>
                <label for="lifeExpInput" class="block text-sm font-bold text-slate-800">Compare Lifetime Payout at Age: <span id="lifeExpVal" class="text-emerald-800 font-extrabold">82</span></label>
                <input id="lifeExpInput" type="range" min="68" max="95" step="1" value="82" class="mt-2 w-full" />
              </div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
              <div class="p-3 rounded-xl bg-amber-50 border-2 border-amber-300">
                <div id="claim62CardTitle" class="text-xs font-bold uppercase text-amber-900">Claim Early at 62 (70%)</div>
                <div id="claim62Mo" class="text-xl font-extrabold text-slate-900 mt-1">$1,540/mo</div>
                <div id="claim62Total" class="text-xs font-semibold text-slate-700 mt-1">Total: $369,600</div>
              </div>
              <div class="p-3 rounded-xl bg-emerald-50 border-2 border-emerald-500">
                <div id="claimFraCardTitle" class="text-xs font-bold uppercase text-emerald-900">Claim Full at 67 (100% FRA)</div>
                <div id="claim67Mo" class="text-xl font-extrabold text-emerald-900 mt-1">$2,200/mo</div>
                <div id="claim67Total" class="text-xs font-semibold text-slate-700 mt-1">Total: $396,000</div>
              </div>
              <div class="p-3 rounded-xl bg-sky-50 border-2 border-sky-400">
                <div id="claim70CardTitle" class="text-xs font-bold uppercase text-sky-900">Claim Max at 70 (124%)</div>
                <div id="claim70Mo" class="text-xl font-extrabold text-sky-900 mt-1">$2,728/mo</div>
                <div id="claim70Total" class="text-xs font-semibold text-slate-700 mt-1">Total: $392,832</div>
              </div>
            </div>
            <div class="relative h-60 w-full"><canvas id="breakevenChart"></canvas></div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div class="bg-white rounded-2xl p-5 border-2 border-[#b07d4b] shadow-sm space-y-4">
              <h2 class="text-base font-extrabold text-slate-900 border-b pb-2">Part-Time / Side-Gig Penalty ($25,560/yr ($2,130/mo) in 2027 (up from $24,480/yr in 2026))</h2>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div class="sm:col-span-3">
                  <label for="reachingFraThisYearSelect" class="block text-xs font-bold text-slate-800">Reaching Full Retirement Age (67) in 2027?</label>
                  <select id="reachingFraThisYearSelect" class="mt-1 w-full rounded-lg border-2 border-slate-300 px-3 py-2 font-bold bg-white text-xs">
                    <option value="no" selected>No — Under FRA All Year ($25,560/yr limit · $1-for-$2 withholding)</option>
                    <option value="yes">Yes — Reaching FRA in 2027 ($67,920/yr limit · $1-for-$3 withholding)</option>
                  </select>
                </div>
                <div class="sm:col-span-2">
                  <label for="sideGigIncome" class="block text-xs font-bold text-slate-800">Annual Part-Time Pay ($)</label>
                  <input id="sideGigIncome" type="number" step="1000" value="30000" class="mt-1 w-full rounded-lg border-2 border-slate-300 px-3 py-2 font-bold" />
                </div>
                <div>
                  <label for="sideGigHourly" class="block text-xs font-bold text-slate-800">Hourly Rate ($/hr)</label>
                  <input id="sideGigHourly" type="number" value="25" class="mt-1 w-full rounded-lg border-2 border-slate-300 px-3 py-2 font-bold" />
                </div>
              </div>
              <div id="sideGigResultBox" class="p-3.5 rounded-xl bg-red-50 border border-red-300 text-sm space-y-1">
                <div class="font-extrabold text-red-900" id="sideGigPenaltyTitle"></div>
                <p class="text-xs text-slate-700" id="sideGigPenaltyDesc"></p>
              </div>
            </div>

            <div class="bg-white rounded-2xl p-5 border-2 border-[#b07d4b] shadow-sm space-y-4">
              <h2 class="text-base font-extrabold text-slate-900 border-b pb-2">Pay Off Mortgage or Keep Cash in Bucket 1–2?</h2>
              <div class="grid grid-cols-3 gap-2">
                <div>
                  <label for="mortBalance" class="block text-xs font-bold text-slate-700">Balance ($)</label>
                  <input id="mortBalance" type="number" step="5000" value="75000" class="mt-1 w-full rounded-lg border border-slate-300 px-2 py-1.5 font-bold text-sm" />
                </div>
                <div>
                  <label for="mortRate" class="block text-xs font-bold text-slate-700">Mortgage (%)</label>
                  <input id="mortRate" type="number" step="0.1" value="3.5" class="mt-1 w-full rounded-lg border border-slate-300 px-2 py-1.5 font-bold text-sm" />
                </div>
                <div>
                  <label for="hysaRate" class="block text-xs font-bold text-slate-700">Safe CD (%)</label>
                  <input id="hysaRate" type="number" step="0.1" value="4.6" class="mt-1 w-full rounded-lg border border-slate-300 px-2 py-1.5 font-bold text-sm" />
                </div>
              </div>
              <div id="mortVerdictBox" class="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-xs md:text-sm text-slate-800"></div>
            </div>
          </div>
        </section>

        <!-- TAB 3: 1984 GHOST TAX, ROTH SWEET SPOT, IRMAA & ACA BRIDGE -->
        <section id="tab-taxshield" class="tab-panel hidden space-y-6">
          <div class="bg-white rounded-2xl p-5 border-2 border-[#b07d4b] shadow-sm space-y-4">
            <h2 class="text-lg font-extrabold text-slate-900 border-b pb-2">1984 IRS "Ghost Tax" Speedometer &amp; Roth Conversion Sweet Spot (2026 Tax Year)</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <label for="taxFilingStatus" class="block text-sm font-bold text-slate-800">Tax Filing Status</label>
                <select id="taxFilingStatus" class="mt-1 w-full rounded-lg border-2 border-slate-300 px-3 py-2 font-bold bg-white">
                  <option value="married" selected>Married Filing Jointly ($32K / $44K)</option>
                  <option value="single">Single Individual ($25K / $34K)</option>
                </select>
              </div>
              <div>
                <label for="filersAge65Plus" class="block text-sm font-bold text-slate-800">How many filers are age 65+?</label>
                <select id="filersAge65Plus" class="mt-1 w-full rounded-lg border-2 border-slate-300 px-3 py-2 font-bold bg-white">
                  <option value="0">0 Filers Age 65+</option>
                  <option value="1">1 Filer Age 65+</option>
                  <option value="2" selected>2 Filers Age 65+</option>
                </select>
              </div>
              <div>
                <label for="taxPreTaxDraw" class="block text-sm font-bold text-slate-800">Annual Pre-Tax 401(k)/IRA Draw ($/yr)</label>
                <input id="taxPreTaxDraw" type="number" step="1000" value="24000" class="mt-1 w-full rounded-lg border-2 border-slate-300 px-3 py-2 font-bold" />
              </div>
              <div>
                <label for="taxRothDraw" class="block text-sm font-bold text-slate-800">Annual Tax-Free Roth Draw ($/yr)</label>
                <input id="taxRothDraw" type="number" step="1000" value="4000" class="mt-1 w-full rounded-lg border-2 border-slate-300 px-3 py-2 font-bold text-emerald-800" />
              </div>
              <div>
                <label for="taxInterest" class="block text-sm font-bold text-slate-800">Annual CD / Bond Interest ($/yr)</label>
                <input id="taxInterest" type="number" step="500" value="3500" class="mt-1 w-full rounded-lg border-2 border-slate-300 px-3 py-2 font-bold" />
              </div>
            </div>
            <div class="chalkboard-bg rounded-xl p-4 text-white space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold uppercase text-amber-300">Your IRS Combined (Provisional) Income:</span>
                <span id="combinedIncomeValue" class="text-2xl font-extrabold text-white">$46,100 / yr</span>
              </div>
              <div class="w-full h-5 bg-slate-800 rounded-full overflow-hidden flex border border-amber-400/50 p-0.5">
                <div id="taxMeterBar" class="h-full rounded-full transition-all duration-300 bg-red-500" style="width: 85%;"></div>
              </div>
              <div class="flex justify-between text-xs text-emerald-200 font-semibold">
                <span>0% Tax Zone</span>
                <span id="taxLine50Label">50% Line ($32K)</span>
                <span id="taxLine85Label">85% Line ($44K)</span>
              </div>
              <div id="ghostTaxStatusText" class="bg-[#143325] p-3 rounded-lg text-xs md:text-sm text-amber-100 border border-amber-400/30"></div>
            </div>
            <div id="rothSweetSpotBox" class="p-4 rounded-xl bg-emerald-50 border-2 border-emerald-400 text-xs md:text-sm text-slate-800 space-y-1"></div>
            <div class="bg-amber-50 rounded-xl p-4 border-2 border-amber-400 space-y-2">
              <div class="text-xs font-bold uppercase text-amber-900">Enacted 2026 IRS SECURE 2.0 Super Catch-Up (Ages 60–63 · 2027+ COLA Indexed)</div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                <select id="workerAgeSelect" class="rounded-lg border border-slate-300 px-2.5 py-1.5 font-bold text-sm bg-white">
                  <option value="55">Age 50–59 ($8,000 Catch-Up · $32,500 Total)</option>
                  <option value="61">Age 60–63 ($11,250 Super Catch-Up · $35,750 Total)</option>
                  <option value="65" selected>Age 64+ ($8,000 Catch-Up · $32,500 Total)</option>
                </select>
                <div id="superCatchupOutput" class="text-xs text-slate-800 font-semibold">🎉 Age 60–63 Super Catch-Up: $35,750 ($24,500 base + $11,250 catch-up) enacted 2026 IRS limit (indexed for inflation in 2027+). Mandatory Roth catch-up if prior-year FICA wages exceed $150,000.</div>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div class="bg-white rounded-2xl p-5 border-2 border-[#b07d4b] shadow-sm space-y-4">
              <h2 class="text-base font-extrabold text-slate-900 border-b pb-2">Medicare IRMAA &amp; Form SSA-44 Appeal</h2>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label for="irmaa2025Income" class="block text-xs font-bold text-slate-800">2-Year Lookback MAGI (2024 MAGI for 2026 CMS Rates) ($)</label>
                  <input id="irmaa2025Income" type="number" step="5000" value="230000" class="mt-1 w-full rounded-lg border-2 border-slate-300 px-3 py-2 font-bold" />
                </div>
                <div>
                  <label for="irmaaRetiredEvent" class="block text-xs font-bold text-slate-800">Retired Since Lookback Year?</label>
                  <select id="irmaaRetiredEvent" class="mt-1 w-full rounded-lg border-2 border-slate-300 px-3 py-2 font-bold bg-white">
                    <option value="yes" selected>Yes — Retired / Cut Hours</option>
                    <option value="no">No — Unchanged</option>
                  </select>
                </div>
              </div>
              <p class="text-[11px] text-slate-600 leading-relaxed">
                <strong>Note:</strong> IRMAA MAGI = AGI + tax-exempt interest; untaxed Social Security is not included. <strong>Confirmed 2026 CMS rates; 2027 CMS announcement expected mid-November.</strong> 2026 IRMAA threshold (from 2024 MAGI): $218,000 married / $109,000 single (Part B + Part D combined surcharge per person).
              </p>
              <div id="irmaaVerdictBox" class="p-4 rounded-xl bg-emerald-50 border-2 border-emerald-500 text-sm space-y-1.5"></div>
            </div>

            <div class="bg-white rounded-2xl p-5 border-2 border-[#b07d4b] shadow-sm space-y-4">
              <h2 class="text-base font-extrabold text-slate-900 border-b pb-2">Age 60–65 Pre-Medicare ACA Bridge (2027 ACA Coverage Year (IRS Rev. Proc. 2026-26))</h2>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label for="acaCurrentAge" class="block text-xs font-bold text-slate-800">Current Age (&lt;65):</label>
                  <input id="acaCurrentAge" type="number" min="55" max="64" value="64" class="mt-1 w-full rounded-lg border-2 border-slate-300 px-3 py-1.5 font-bold" />
                </div>
                <div>
                  <label for="acaMagiInput" class="block text-xs font-bold text-slate-800">Planned 2027 ACA MAGI ($):</label>
                  <input id="acaMagiInput" type="number" step="2000" value="52000" class="mt-1 w-full rounded-lg border-2 border-slate-300 px-3 py-1.5 font-bold" />
                </div>
                <div>
                  <label for="acaHouseholdSizeSelect" class="block text-xs font-bold text-slate-800">ACA Household Size:</label>
                  <select id="acaHouseholdSizeSelect" class="mt-1 w-full rounded-lg border-2 border-slate-300 bg-white px-2.5 py-1.5 font-bold text-xs">
                    <option value="1">1 Person ($15,960 FPL · $63,840 Cliff)</option>
                    <option value="2" selected>2 People ($21,640 FPL · $86,560 Cliff)</option>
                    <option value="3">3 People ($27,320 FPL · $109,280 Cliff)</option>
                    <option value="4">4 People ($33,000 FPL · $132,000 Cliff)</option>
                  </select>
                </div>
              </div>
              <p class="text-[11px] text-slate-600 leading-relaxed">
                <strong>Note:</strong> ACA MAGI includes <strong>100% of Social Security benefits</strong> (unlike IRMAA). <strong>2027 ACA Coverage Year (IRS Rev. Proc. 2026-26):</strong> uses 2026 HHS Federal Poverty Guidelines ($15,960 for 1 person, $21,640 for 2, $27,320 for 3, $33,000 for 4); 400% FPL cliff is $63,840 (1 person) / $86,560 (2 people) / $109,280 (3 people) / $132,000 (4 people) with a 2.15%–10.22% benchmark Silver cap.
              </p>
              <div id="acaBridgeResult" class="p-3.5 rounded-xl bg-sky-50 border border-sky-300 text-xs md:text-sm text-slate-800 space-y-1"></div>
            </div>
          </div>
        </section>

        <!-- TAB 4: SENIOR SCAM RADAR & DEC 7 MEDICARE AUDIT -->
        <section id="tab-safety" class="tab-panel hidden space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div class="bg-white rounded-2xl p-5 border-2 border-[#b07d4b] shadow-sm space-y-4">
              <h2 class="text-base font-extrabold text-slate-900 border-b pb-2">"Is This Call, Text, or Letter a Scam?" Detector</h2>
              <div class="space-y-2.5 text-xs">
                <label class="flex items-start gap-3 p-3 rounded-xl border border-slate-200 cursor-pointer">
                  <input type="checkbox" class="scam-check mt-1 w-4 h-4 accent-red-600" />
                  <span><strong>"Social Security / Medicare Suspension" Threat:</strong> Caller claims benefits will be frozen unless you confirm personal numbers.</span>
                </label>
                <label class="flex items-start gap-3 p-3 rounded-xl border border-slate-200 cursor-pointer">
                  <input type="checkbox" class="scam-check mt-1 w-4 h-4 accent-red-600" />
                  <span><strong>Viral "2026 Senior Property Tax Rebate" Link:</strong> Text or video claims a secret refund if you click a link and enter bank details.</span>
                </label>
                <label class="flex items-start gap-3 p-3 rounded-xl border border-slate-200 cursor-pointer">
                  <input type="checkbox" class="scam-check mt-1 w-4 h-4 accent-red-600" />
                  <span><strong>Fee to File Form SSA-44 or Activate COLA:</strong> Someone asks for a fee or gift card to activate your COLA raise.</span>
                </label>
                <label class="flex items-start gap-3 p-3 rounded-xl border border-slate-200 cursor-pointer">
                  <input type="checkbox" class="scam-check mt-1 w-4 h-4 accent-red-600" />
                  <span><strong>"New Plastic/Chip Medicare Card" Call:</strong> Unsolicited caller asks for your Medicare number.</span>
                </label>
              </div>
              <div id="scamAlertBanner" class="p-4 rounded-xl bg-emerald-50 border-2 border-emerald-400 text-xs">
                <div class="font-extrabold text-emerald-950">🛡️ No Red Flags Checked Yet</div>
              </div>
            </div>

            <div class="bg-white rounded-2xl p-5 border-2 border-[#b07d4b] shadow-sm space-y-4">
              <div class="flex items-center justify-between border-b pb-2">
                <h2 class="text-base font-extrabold text-slate-900">Nov / Dec 7th "Keep Your Raise" Audit</h2>
                <span id="checklistProgressBadge" class="px-3 py-1 rounded-lg bg-emerald-800 text-amber-300 font-extrabold text-xs">0 / 5 Done</span>
              </div>
              <div class="space-y-2.5 text-xs">
                <label class="flex items-start gap-3 p-3 rounded-xl border border-slate-200 cursor-pointer">
                  <input type="checkbox" class="audit-check mt-1 w-4 h-4 accent-emerald-700" />
                  <span><strong>1. Check Your "Annual Notice of Change" (ANOC) Letter.</strong></span>
                </label>
                <label class="flex items-start gap-3 p-3 rounded-xl border border-slate-200 cursor-pointer">
                  <input type="checkbox" class="audit-check mt-1 w-4 h-4 accent-emerald-700" />
                  <span><strong>2. Verify Preferred Pharmacy In-Network Status Before Dec 7.</strong></span>
                </label>
                <label class="flex items-start gap-3 p-3 rounded-xl border border-slate-200 cursor-pointer">
                  <input type="checkbox" class="audit-check mt-1 w-4 h-4 accent-emerald-700" />
                  <span><strong>3. Download SSA Form 44 (If You Retired in 2025 or 2026).</strong></span>
                </label>
                <label class="flex items-start gap-3 p-3 rounded-xl border border-slate-200 cursor-pointer">
                  <input type="checkbox" class="audit-check mt-1 w-4 h-4 accent-emerald-700" />
                  <span><strong>4. Check Your County's Official Senior Property Tax Freeze.</strong></span>
                </label>
                <label class="flex items-start gap-3 p-3 rounded-xl border border-slate-200 cursor-pointer">
                  <input type="checkbox" class="audit-check mt-1 w-4 h-4 accent-emerald-700" />
                  <span><strong>5. Use the "Roth Valve" for Holiday Travel &amp; Gifts.</strong></span>
                </label>
              </div>
            </div>
          </div>
        </section>

        <!-- TAB 5: PRINTABLE PLAN & SPOUSE EMERGENCY BINDER -->
        <section id="tab-binder" class="tab-panel hidden space-y-6">
          <div class="bg-white rounded-2xl p-6 border-2 border-[#b07d4b] shadow-sm space-y-6">
            <div class="flex flex-wrap items-center justify-between gap-4 border-b pb-4">
              <div>
                <h2 class="text-xl font-extrabold text-slate-900">1-Page Printable Retirement Plan &amp; Family Emergency Locator</h2>
                <p class="text-xs text-slate-600 mt-0.5">Never enter passwords or account numbers here—just record physical home folder locations.</p>
              </div>
              <div class="flex flex-wrap gap-2 no-print">
                <button id="copySummaryBtn" type="button" class="px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-amber-200 font-bold text-xs shadow">📋 Copy Plan Summary</button>
                <button id="printPlanBtn" type="button" class="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs shadow">🖨️ Print My 1-Page Plan</button>
              </div>
            </div>
            <div class="bg-[#f7f4eb] rounded-xl p-5 border-2 border-[#1b4332] space-y-3">
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                <div class="bg-white p-3 rounded-lg border border-slate-300">
                  <div class="text-xs text-slate-500 font-bold">2027 Net Social Security</div>
                  <div id="printNetSS" class="text-lg font-extrabold text-emerald-800">$2,770/mo</div>
                </div>
                <div class="bg-white p-3 rounded-lg border border-slate-300">
                  <div class="text-xs text-slate-500 font-bold">Portfolio Safe Monthly Draw</div>
                  <div id="printPortDraw" class="text-lg font-extrabold text-slate-900">$1,500/mo</div>
                </div>
                <div class="bg-white p-3 rounded-lg border border-slate-300">
                  <div class="text-xs text-slate-500 font-bold">3-Bucket Allocation</div>
                  <div id="printBuckets" class="text-xs font-bold text-slate-800 mt-1">Cash: $36K • Bonds: $108K • Growth: $256K</div>
                </div>
                <div class="bg-white p-3 rounded-lg border border-slate-300">
                  <div class="text-xs text-slate-500 font-bold">1984 IRS Tax Status</div>
                  <div id="printTaxStatus" class="text-xs font-bold text-red-700 mt-1">Combined: $46,772 (85% Zone)</div>
                </div>
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label for="locWill" class="block text-xs font-bold text-slate-700">Where Original Will, Trust &amp; POA Are Kept:</label>
                <input id="locWill" type="text" value="" placeholder="e.g., Home safe or filing cabinet folder" class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium" />
              </div>
              <div>
                <label for="loc401k" class="block text-xs font-bold text-slate-700">401(k) / IRA / Pension Institution Names:</label>
                <input id="loc401k" type="text" value="" placeholder="e.g., Institution names only (no account numbers)" class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium" />
              </div>
              <div>
                <label for="locInsurance" class="block text-xs font-bold text-slate-700">Medicare Supplement / Life Insurance &amp; Deed Location:</label>
                <input id="locInsurance" type="text" value="" placeholder="e.g., Desk drawer or family document binder" class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium" />
              </div>
              <div>
                <label for="locContacts" class="block text-xs font-bold text-slate-700">Trusted CPA / Family Contact Name &amp; Phone:</label>
                <input id="locContacts" type="text" value="" placeholder="e.g., Tax preparer name &amp; SSA (1-800-772-1213)" class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>

    <!-- 2027 IRS SAVER'S MATCH CALCULATOR SECTION (#saversMatchSection) -->
    <section id="saversMatchSection" aria-label="2027 Federal Saver's Match Calculator" class="no-print bg-white rounded-2xl p-5 md:p-6 border-2 border-[#b07d4b] shadow-sm space-y-5">
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b-2 border-[#b07d4b]/40 pb-4">
        <div class="space-y-1">
          <div class="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-emerald-950 bg-amber-200/80 px-3 py-1 rounded-lg border border-amber-400">
            <span>🎁 SECURE 2.0 Act (IRC § 6433) • Effective Tax Year 2027</span>
          </div>
          <h2 class="text-lg md:text-2xl font-extrabold text-slate-900">2027 Federal Saver's Match Calculator (Up to $1,000/Person or $2,000/Couple Match)</h2>
          <p class="text-xs md:text-sm text-slate-700 max-w-4xl leading-relaxed">
            Under SECURE 2.0 (IRC § 6433), the old non-refundable Saver's Credit is replaced by a direct up to 50% federal matching deposit (up to $1,000 per person on $2,000 of contributions; up to $2,000 for 2 contributing spouses on $4,000 total) deposited into a pre-tax IRA or 401(k).
          </p>
        </div>
        <a href="https://www.irs.gov/credits-deductions/savers-match" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1b4332] hover:bg-emerald-900 text-amber-300 font-extrabold text-xs border border-amber-400/50 shadow-sm shrink-0 self-start lg:self-center">
          <span>🏛️ Official IRS Saver's Match Guide (IRS.gov) →</span>
        </a>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        <div class="lg:col-span-6 bg-[#f7f4eb] rounded-xl p-4 md:p-5 border border-[#b07d4b]/60 space-y-4">
          <div class="text-xs font-extrabold uppercase tracking-wider text-emerald-950 border-b border-[#b07d4b]/30 pb-2">Step 1 • Enter Your 2027 Contribution &amp; Income</div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label for="saversContributionInput" class="block text-xs font-bold text-slate-800">Your Annual Contribution ($)</label>
              <input id="saversContributionInput" type="number" min="0" step="250" value="2000" class="mt-1 w-full rounded-lg border-2 border-slate-300 bg-white px-3 py-2 font-bold text-sm" />
              <span class="block text-xs text-slate-600 mt-1">Cap: $2,000/yr per person (each spouse capped individually at $2,000).</span>
            </div>
            <div>
              <label for="saversFilingStatus" class="block text-xs font-bold text-slate-800">Tax Filing Status</label>
              <select id="saversFilingStatus" class="mt-1 w-full rounded-lg border-2 border-slate-300 bg-white px-3 py-2 font-bold text-sm">
                <option value="single">Single / MFS ($20,500 → $35,500 AGI)</option>
                <option value="married" selected>Married Filing Jointly ($41,000 → $71,000 AGI)</option>
                <option value="hoh">Head of Household ($30,750 → $53,250 AGI)</option>
              </select>
            </div>
          </div>
          <div id="saversSpousesWrap" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label for="saversContributingSpouses" class="block text-xs font-bold text-slate-800">Contributing Spouses (Married Filing Jointly)</label>
              <select id="saversContributingSpouses" class="mt-1 w-full rounded-lg border-2 border-slate-300 bg-white px-3 py-2 font-bold text-sm">
                <option value="1" selected>1 Contributing Spouse ($2,000 cap · up to $1,000 match)</option>
                <option value="2">2 Contributing Spouses ($2,000 cap each · up to $2,000 match)</option>
              </select>
            </div>
            <div id="saversSpouseContributionWrap">
              <label for="saversSpouseContributionInput" class="block text-xs font-bold text-slate-800">Spouse 2 Annual Contribution ($)</label>
              <input id="saversSpouseContributionInput" type="number" min="0" step="250" value="0" class="mt-1 w-full rounded-lg border-2 border-slate-300 bg-white px-3 py-2 font-bold text-sm" />
              <span class="block text-xs text-slate-600 mt-1">Capped separately at $2,000 for Spouse 2.</span>
            </div>
          </div>
          <div>
            <label for="saversAgiInput" class="block text-xs font-bold text-slate-800">Estimated Adjusted Gross Income (AGI) ($/yr)</label>
            <input id="saversAgiInput" type="number" min="0" step="1000" value="38000" class="mt-1 w-full rounded-lg border-2 border-slate-300 bg-white px-3 py-2 font-bold text-sm" />
          </div>
        </div>
        <div class="lg:col-span-6 chalkboard-bg rounded-xl p-4 md:p-5 text-white flex flex-col justify-between space-y-4">
          <div>
            <div class="flex items-center justify-between gap-2 border-b border-amber-400/30 pb-2.5">
              <span class="text-xs font-bold uppercase tracking-wider text-amber-300">Step 2 • Your 2027 Federal Match Deposit (Estimate)</span>
              <span id="saversTierBadge" class="px-2.5 py-0.5 rounded-md bg-amber-400 text-slate-950 font-extrabold text-xs">50% Full Federal Match</span>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
              <div class="chalk-card rounded-xl p-3.5">
                <div class="text-xs font-bold uppercase text-amber-200">Federal Match Rate</div>
                <div id="saversMatchRateResult" class="text-2xl font-extrabold text-amber-300 mt-1">50%</div>
              </div>
              <div class="chalk-card rounded-xl p-3.5">
                <div class="text-xs font-bold uppercase text-emerald-200">Gov't Match Deposit</div>
                <div id="saversMatchDepositResult" class="text-2xl font-extrabold text-white mt-1">+$1,000</div>
              </div>
              <div class="chalk-card rounded-xl p-3.5">
                <div class="text-xs font-bold uppercase text-sky-200">Total Added to Retirement</div>
                <div id="saversTotalAddedResult" class="text-2xl font-extrabold text-amber-300 mt-1">$3,000</div>
              </div>
            </div>
          </div>
          <div class="bg-[#0f291e] rounded-xl p-3 border border-amber-400/30 text-xs text-emerald-100 space-y-1 leading-relaxed">
            <div><strong class="text-amber-300">Notes (IRC § 6433 &amp; IRS Notice 2026-48):</strong> Match is deposited into a pre-tax IRA/401(k) and taxed at withdrawal. You must be age 18+, not a full-time student, and not claimed as a dependent. Contributing to an IRA requires earned income, so many retirees cannot qualify. Under IRC § 6433(b)(2) &amp; IRS Notice 2026-48, statutory reduction points <code>floor(50 × (AGI − start) / (end − start))</code> are rounded DOWN to the next lowest whole percentage point. Illustrative educational estimate; consult your tax advisor.</div>
            <div class="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-amber-400/25 text-amber-200">
              <span>Statutory Reference: IRC § 6433 (SECURE 2.0 Act § 103)</span>
              <a href="https://www.irs.gov/credits-deductions/savers-match" target="_blank" rel="noopener noreferrer" class="underline font-extrabold text-amber-300 hover:text-white">Verify at IRS.gov/credits-deductions/savers-match →</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- HIGH-INTENT SEO GUIDES SECTION (#seoRetirementGuidesSection) -->
    <section id="seoRetirementGuidesSection" aria-label="No-Suit Plain-English Guides (Grounded in Official SSA & CMS Statutes)" class="no-print space-y-4">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        <article id="guideColaHoldHarmlessCard" class="bg-white rounded-2xl p-5 md:p-6 border-2 border-[#b07d4b] shadow-sm flex flex-col justify-between space-y-4">
          <div class="space-y-3">
            <span class="px-2.5 py-1 rounded-md bg-emerald-900 text-amber-300 font-extrabold text-xs uppercase tracking-wider">No-Suit Plain-English Guide (Grounded in Official SSA &amp; CMS Statutes)</span>
            <h3 class="text-lg md:text-xl font-extrabold text-slate-900">2027 Social Security 3.6% COLA &amp; Medicare Part B Hold Harmless Guide</h3>
            <p class="text-xs md:text-sm text-slate-700 leading-relaxed">The Social Security Administration announced the official <strong>3.6% Cost-of-Living Adjustment (COLA)</strong> on <strong>October 14, 2026</strong>, taking effect with January 2027 benefits. For most beneficiaries the 3.6% COLA raise exceeds the $6.60 Part B increase, so the raise absorbs it. Section 1839(f) only limits the increase for people whose COLA dollar raise is smaller than the increase (roughly benefits under ~$183/month), and does not apply to new enrollees, premiums not deducted from Social Security, or IRMAA payers.</p>
          </div>
          <div class="pt-3 border-t border-slate-200 flex items-center justify-between gap-2">
            <span class="text-xs font-semibold text-slate-500">No-Suit Plain-English Guide (Grounded in Official SSA &amp; CMS Statutes)</span>
            <a href="https://www.ssa.gov/news/en/cola/factsheets/2027.html" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#1b4332] hover:bg-emerald-900 text-amber-300 font-extrabold text-xs shadow-sm">
              <span>📄 Official 2027 SSA COLA Fact Sheet (SSA.gov) →</span>
            </a>
          </div>
        </article>
        <article id="guideSsa44IrmaaCard" class="bg-white rounded-2xl p-5 md:p-6 border-2 border-[#b07d4b] shadow-sm flex flex-col justify-between space-y-4">
          <div class="space-y-3">
            <span class="px-2.5 py-1 rounded-md bg-amber-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider">No-Suit Plain-English Guide (Grounded in Official SSA &amp; CMS Statutes)</span>
            <h3 class="text-lg md:text-xl font-extrabold text-slate-900">Form SSA-44 IRMAA Appeal: 8 Life-Changing Events Retirement Checklist</h3>
            <p class="text-xs md:text-sm text-slate-700 leading-relaxed">Medicare IRMAA surcharges use a 2-year tax lookback (Confirmed 2026 CMS rates from 2024 MAGI start above $109,000 single / $218,000 married; 2027 CMS announcement expected mid-November). If you experienced one of the 8 official Life-Changing Events—<strong>1. Marriage, 2. Divorce/Annulment, 3. Death of Your Spouse, 4. Work Stoppage (Retirement), 5. Work Reduction, 6. Loss of Income-Producing Property, 7. Loss of Pension Income, or 8. Employer Settlement Payment</strong>—file Form SSA-44 to remove the surcharge.</p>
          </div>
          <div class="pt-3 border-t border-slate-200 flex items-center justify-between gap-2">
            <span class="text-xs font-semibold text-slate-500">No-Suit Plain-English Guide (Grounded in Official SSA &amp; CMS Statutes)</span>
            <a href="https://www.ssa.gov/forms/ssa-44.pdf" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs border border-amber-500 shadow-sm">
              <span>📥 Download Official Form SSA-44 (SSA.gov PDF) →</span>
            </a>
          </div>
        </article>
      </div>
    </section>

    <!-- SHARE WITH YOUR SPOUSE OR RETIREMENT FRIEND BAR (#spouseShareBar) right below the Calculator -->
    <section id="spouseShareBar" aria-label="Share With Your Spouse or Retirement Friend" class="no-print bg-white rounded-2xl p-4 md:p-5 border-2 border-[#b07d4b] shadow-sm flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
      <div class="space-y-1">
        <div class="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-emerald-900 bg-emerald-100/80 px-2.5 py-0.5 rounded-md border border-emerald-300">
          <span>🤝 Kitchen-Table Family Planning</span>
        </div>
        <h2 class="text-base md:text-lg font-extrabold text-slate-900">Share With Your Spouse or Retirement Friend</h2>
        <p class="text-xs text-slate-600 max-w-2xl leading-relaxed">Send your personalized 2027 Social Security &amp; 3-Bucket snapshot to your spouse by email, or share this free private calculator with a friend retiring soon.</p>
      </div>
      <div class="w-full lg:w-auto flex flex-wrap items-center gap-2.5 shrink-0">
        <a id="shareFacebookBtn" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fnosuitretirement.com%2F" target="_blank" rel="noopener noreferrer" class="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#1877F2] hover:bg-[#166fe5] text-white font-extrabold text-xs shadow-sm transition-colors whitespace-nowrap">
          <span>📘 Facebook Share</span>
        </a>
        <a id="shareEmailSpouseBtn" href="mailto:?subject=Our%202027%20No-Suit%20Retirement%20Numbers%20%26%203-Bucket%20Plan&amp;body=Hi%20%E2%80%94%20I%20ran%20our%20retirement%20numbers%20on%20the%20No-Suit%20Retirement%20Calculator%3A%20https%3A%2F%2Fnosuitretirement.com%2F" class="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#1b4332] hover:bg-emerald-900 text-amber-300 font-extrabold text-xs border border-amber-400/50 shadow-sm transition-colors whitespace-nowrap">
          <span>✉️ Email to Spouse</span>
        </a>
        <button id="copyWebsiteLinkBtn" type="button" class="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs border border-amber-500 shadow-sm transition-colors cursor-pointer whitespace-nowrap">
          <span id="copyWebsiteLinkLabel">🔗 Copy Website Link</span>
        </button>
      </div>
    </section>

    <!-- YOUTUBE VIDEO SECTION (#youtubeChannelHub / #youtubeVideoSection) -->
    <div id="youtubeChannelHub" class="no-print">
      <section id="youtubeVideoSection" class="chalkboard-bg rounded-2xl p-6 md:p-8 text-white no-print space-y-5">
        <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-amber-400/30 pb-4">
          <div>
            <div class="text-xs font-bold uppercase tracking-wider text-amber-300">Official YouTube Education Hub · @NoSuitRetirement</div>
            <h2 class="text-xl md:text-2xl font-extrabold text-white mt-1">Watch Plain-English Chalkboard Retirement Breakdowns</h2>
            <p class="text-xs md:text-sm text-emerald-100 mt-1 max-w-2xl">Step-by-step kitchen-table videos walking through real $300K–$500K retirement budgets, 2027 Social Security COLA math, Medicare Part B traps, and the Age 60–63 $11,250 Super Catch-Up.</p>
          </div>
          <a
            href="https://www.youtube.com/@NoSuitRetirement"
            target="_blank"
            rel="noopener noreferrer"
            data-ga-event="youtube_video_play"
            data-video-title="Subscribe on YouTube - NoSuitRetirement"
            class="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#FF0000] hover:bg-[#cc0000] text-white font-extrabold text-sm shadow-lg"
          >
            <span>▶ Subscribe on YouTube - NoSuitRetirement</span>
          </a>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="chalk-card rounded-xl p-4 hover:border-amber-400 transition-all flex flex-col justify-between gap-3">
            <div class="space-y-2">
              <div class="relative aspect-video w-full rounded-lg overflow-hidden bg-black border border-amber-400/40">
                <img src="https://i.ytimg.com/vi/XHIm3Q1OvK8/hqdefault.jpg" alt="Why Your 2027 Social Security Raise Is Already Gone (Real Medicare Math)" width="480" height="270" loading="lazy" decoding="async" class="w-full h-full object-cover" />
              </div>
              <div class="text-[11px] font-bold uppercase tracking-wider text-amber-300">Episode #1 · 2027 COLA &amp; Medicare Math</div>
              <a href="https://youtu.be/XHIm3Q1OvK8" target="_blank" rel="noopener noreferrer" data-ga-event="youtube_video_play" data-video-title="Why Your 2027 Social Security Raise Is Already Gone (Real Medicare Math)" class="block text-sm font-extrabold text-white">Why Your 2027 Social Security Raise Is Already Gone (Real Medicare Math)</a>
            </div>
            <div class="flex flex-col gap-1.5">
              <a href="https://youtu.be/XHIm3Q1OvK8" target="_blank" rel="noopener noreferrer" class="text-xs font-bold text-amber-300">▶ Watch Video →</a>
              <button type="button" data-goto-tab="tab-paycheck" class="guide-tab-link px-3 py-1.5 rounded-lg bg-amber-400 text-slate-950 font-extrabold text-xs">📑 Load 2027 COLA Math (Tab 0)</button>
            </div>
          </div>

          <div class="chalk-card rounded-xl p-4 hover:border-amber-400 transition-all flex flex-col justify-between gap-3">
            <div class="space-y-2">
              <div class="relative aspect-video w-full rounded-lg overflow-hidden bg-black border border-amber-400/40">
                <img src="https://i.ytimg.com/vi/alUfXINV93Y/hqdefault.jpg" alt="How to Retire Comfortably at 62 With $400,000 and Social Security (Real Monthly Budget)" width="480" height="270" loading="lazy" decoding="async" class="w-full h-full object-cover" />
              </div>
              <div class="text-[11px] font-bold uppercase tracking-wider text-emerald-300">Episode #2 · Retire at 62 on $400K</div>
              <a href="https://youtu.be/alUfXINV93Y" target="_blank" rel="noopener noreferrer" data-ga-event="youtube_video_play" data-video-title="How to Retire Comfortably at 62 With $400,000 and Social Security (Real Monthly Budget)" class="block text-sm font-extrabold text-white">How to Retire Comfortably at 62 With $400,000 and Social Security (Real Monthly Budget)</a>
            </div>
            <div class="flex flex-col gap-1.5">
              <a href="https://youtu.be/alUfXINV93Y" target="_blank" rel="noopener noreferrer" class="text-xs font-bold text-amber-300">▶ Watch Video →</a>
              <button type="button" data-preset="couple400k" data-goto-tab="tab-paycheck" class="preset-btn guide-tab-link px-3 py-1.5 rounded-lg bg-amber-400 text-slate-950 font-extrabold text-xs">🧮 Load $400K Couple Math in Tab 1</button>
            </div>
          </div>

          <div class="chalk-card rounded-xl p-4 hover:border-amber-400 transition-all flex flex-col justify-between gap-3">
            <div class="space-y-2">
              <a href="https://youtu.be/2RCtkLFUmUc" target="_blank" rel="noopener noreferrer" class="block relative aspect-video w-full rounded-lg overflow-hidden bg-[#143325] border border-amber-400/40">
                <img src="https://i.ytimg.com/vi/2RCtkLFUmUc/hqdefault.jpg" alt="Turning 60 in 2026? The $11,250 Super Catch-Up Window Closing on Dec 31" width="480" height="270" loading="lazy" decoding="async" class="w-full h-full object-cover opacity-85" />
              </a>
              <div class="text-[11px] font-bold uppercase tracking-wider text-sky-300">Episode #3 · Age 60–63 Super Catch-Up</div>
              <a href="https://youtu.be/2RCtkLFUmUc" target="_blank" rel="noopener noreferrer" data-ga-event="youtube_video_play" data-video-title="Turning 60 in 2026? The $11,250 &quot;Super Catch-Up&quot; Window Closing on Dec 31" class="block text-sm font-extrabold text-white">Turning 60 in 2026? The $11,250 "Super Catch-Up" Window Closing on Dec 31</a>
              <p class="text-xs text-emerald-100/90 leading-relaxed">How workers aged 60–63 can use the SECURE 2.0 $11,250 Super Catch-Up window before December 31 ($35,750 total 401k limit).</p>
            </div>
            <div class="flex flex-col gap-1.5">
              <a href="https://youtu.be/2RCtkLFUmUc" target="_blank" rel="noopener noreferrer" class="text-xs font-bold text-amber-300">▶ Watch Video →</a>
              <button type="button" data-goto-tab="tab-taxshield" class="guide-tab-link px-3 py-1.5 rounded-lg bg-amber-400 text-slate-950 font-extrabold text-xs">🧮 Open $11,250 Super Catch-Up Tool (Tab 3)</button>
            </div>
          </div>
        </div>
        <div class="pt-3 border-t border-amber-400/25 flex flex-col md:flex-row items-stretch md:items-center justify-end gap-3 text-xs">
          <div class="flex flex-wrap items-center gap-2">
            <span class="text-amber-200/90 font-semibold">Senior Tools &amp; Official Links:</span>
            <a
              href="https://www.treasurydirect.gov/"
              target="_blank"
              rel="noopener noreferrer"
              data-ga-event="affiliate_click"
              data-affiliate="TreasuryDirect Bucket 2 T-Bills"
              class="affiliate-link px-3 py-1.5 rounded-lg bg-[#0f291e] hover:bg-emerald-950 text-amber-200 border border-amber-400/30 font-bold"
            >
              🏦 Bucket 2 T-Bill &amp; HYSA Rates →
            </a>
            <a
              href="https://www.ssa.gov/forms/ssa-44.pdf"
              target="_blank"
              rel="noopener noreferrer"
              data-ga-event="affiliate_click"
              data-affiliate="Official IRS/SSA Form SSA-44 PDF"
              class="affiliate-link px-3 py-1.5 rounded-lg bg-[#0f291e] hover:bg-emerald-950 text-amber-200 border border-amber-400/30 font-bold"
            >
              📄 Official Form SSA-44 (PDF) →
            </a>
          </div>
        </div>
      </section>
    </div>
  </main>

  <!-- Plain-English Glossary Modal -->
  <div id="glossaryModal" class="hidden fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 no-print">
    <div class="bg-white rounded-2xl max-w-2xl w-full p-6 border-4 border-[#1b4332] shadow-2xl space-y-4">
      <div class="flex items-center justify-between border-b pb-3">
        <h2 class="text-xl font-extrabold text-[#1b4332]">📖 The No-Suit Plain-English Glossary</h2>
        <button id="closeGlossaryBtn" type="button" class="px-3 py-1 rounded-lg bg-slate-200 hover:bg-slate-300 font-bold text-sm">✕ Close</button>
      </div>
      <div class="space-y-3 text-sm text-slate-800">
        <div class="p-3 rounded-lg bg-emerald-50 border border-emerald-200"><strong>COLA:</strong> Your annual Social Security inflation raise announced every October and paid starting in January.</div>
        <div class="p-3 rounded-lg bg-amber-50 border border-amber-200"><strong>1984 Ghost Tax (Provisional Income):</strong> Half of your Social Security plus pre-tax 401(k)/IRA draws. Above $25K (single) or $32K (married), up to 50%–85% of your Social Security becomes taxable.</div>
        <div class="p-3 rounded-lg bg-sky-50 border border-sky-200"><strong>IRMAA &amp; Form SSA-44:</strong> Extra Medicare surcharge based on your tax return from 2 years ago. File Form SSA-44 after retiring to remove it.</div>
      </div>
    </div>
  </div>

  <!-- Privacy Policy Modal -->
  <div id="privacyModal" class="hidden fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 no-print">
    <div class="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 border-4 border-[#1b4332] shadow-2xl space-y-4">
      <div class="flex items-center justify-between border-b pb-3">
        <h2 class="text-xl font-extrabold text-[#1b4332]">🔒 Privacy Policy, Cookie Consent &amp; Data Safety</h2>
        <button id="closePrivacyBtn" type="button" class="px-3 py-1 rounded-lg bg-slate-200 hover:bg-slate-300 font-bold text-sm">✕ Close</button>
      </div>
      <div class="space-y-3 text-xs md:text-sm text-slate-800 leading-relaxed">
        <div class="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300">
          <div class="font-extrabold text-emerald-950">1. 100% Local Retirement Math — Zero Financial Data Collection</div>
          <p class="mt-1">No-Suit Retirement Companion runs all retirement calculations 100% locally in your browser. Zero personal financial numbers, Social Security estimates, tax inputs, or family binder notes are ever transmitted or stored on external servers.</p>
        </div>
        <div class="p-3.5 rounded-xl bg-amber-50 border border-amber-300">
          <div class="font-extrabold text-amber-950">2. Cookie Consent &amp; Anonymous Google Analytics 4 Disclosure</div>
          <p class="mt-1">To keep this senior retirement calculator 100% free, this website uses anonymous Google Analytics 4 traffic measurement (<code>G-66NLH28JBQ</code>) and standard browser cookies. Your cookie consent choice is stored locally in your browser's <code>localStorage</code>.</p>
        </div>
      </div>
    </div>
  </div>

  <footer class="bg-[#143325] text-emerald-100 border-t-4 border-[#b07d4b] py-5 px-4 mt-8 text-xs no-print">
    <div class="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-3">
      <div class="space-y-1 text-center lg:text-left">
        <div><strong>Educational &amp; Non-Affiliation Disclaimer:</strong> Independent educational calculator for illustrative purposes only; not personal financial, tax, legal, or Medicare advice. Not affiliated with or endorsed by the U.S. Government, SSA (<a href="https://www.ssa.gov" target="_blank" rel="noopener noreferrer" class="underline text-amber-300">ssa.gov</a>), Medicare (<a href="https://www.medicare.gov" target="_blank" rel="noopener noreferrer" class="underline text-amber-300">medicare.gov</a>), or the IRS (<a href="https://www.irs.gov" target="_blank" rel="noopener noreferrer" class="underline text-amber-300">irs.gov</a>).</div>
      </div>
      <div class="flex flex-wrap items-center gap-3 flex-shrink-0">
        <a href="https://www.youtube.com/@NoSuitRetirement" target="_blank" rel="noopener noreferrer" class="px-3 py-1 rounded-lg bg-[#FF0000] text-white font-bold text-xs">▶ NoSuitRetirement</a>
        <button id="openPrivacyFooterBtn" type="button" class="underline text-amber-300 hover:text-amber-200 font-bold">🔒 Privacy Policy &amp; Data Safety</button>
        <span class="text-emerald-400">•</span>
        <span class="font-bold text-amber-300 select-none">No-Suit Retirement v2027.5</span>
      </div>
    </div>
  </footer>

  <!-- Cookie & Privacy Consent Bottom Banner (#cookieConsentBanner) -->
  <aside id="cookieConsentBanner" role="region" aria-label="Cookie and Privacy Consent" class="no-print fixed bottom-14 md:bottom-0 inset-x-0 z-50 bg-[#143325] text-amber-100 border-t-2 border-amber-400 shadow-2xl px-4 py-3.5">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
      <div class="text-xs leading-relaxed max-w-4xl">
        <strong class="text-amber-300 font-extrabold uppercase tracking-wide">🍪 Cookie &amp; Privacy Notice:</strong> With your permission, we use cookies and anonymous Google Analytics 4 traffic measurement to improve our senior retirement tools. <strong class="text-white">100% of your retirement calculator math runs privately in your browser—zero personal or financial numbers ever leave your device.</strong>
      </div>
      <div class="flex flex-wrap items-center gap-2.5 shrink-0 w-full md:w-auto justify-end">
        <button id="cookiePrivacyPolicyBtn" type="button" class="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-200 font-bold text-xs border border-amber-400/40 transition-colors cursor-pointer whitespace-nowrap">Privacy Policy</button>
        <button id="declineCookiesBtn" type="button" class="px-3.5 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs border border-slate-500 transition-colors cursor-pointer whitespace-nowrap">Decline</button>
        <button id="acceptCookiesBtn" type="button" class="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs border border-amber-500 shadow-md transition-colors cursor-pointer whitespace-nowrap">Accept Cookies</button>
      </div>
    </div>
  </aside>

  <!-- Sticky Mobile Bottom Navigation Bar (#mobileBottomNavBar) -->
  <nav id="mobileBottomNavBar" aria-label="Mobile Quick Navigation" class="no-print md:hidden fixed bottom-0 inset-x-0 z-40 h-14 bg-[#143325] border-t-2 border-amber-400 shadow-2xl px-2 flex items-center">
    <div class="grid grid-cols-3 gap-1.5 max-w-md w-full mx-auto">
      <button id="mobileNavCalculatorBtn" type="button" class="flex flex-col items-center justify-center py-2 px-2 rounded-xl bg-[#1b4332] hover:bg-emerald-800 text-amber-200 font-extrabold text-xs border border-amber-400/30 cursor-pointer">
        <span>🧮 Calculator</span>
      </button>
      <button id="mobileNavVideosBtn" type="button" class="flex flex-col items-center justify-center py-2 px-2 rounded-xl bg-[#1b4332] hover:bg-emerald-800 text-white font-extrabold text-xs border border-amber-400/30 cursor-pointer">
        <span>▶️ 3 Videos</span>
      </button>
      <button id="mobileNavBinderBtn" type="button" class="flex flex-col items-center justify-center py-2 px-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs border border-amber-500 shadow-sm cursor-pointer">
        <span>🖨️ Print Binder</span>
      </button>
    </div>
  </nav>

  <script>
    (function () {
      const CONSTANTS = ${serializedConstants};
      const COOKIE_CONSENT_KEY = 'nosuit_cookie_consent_v1';

      try {
        localStorage.removeItem('nosuit_channel_config_v1');
        localStorage.removeItem('nosuit_ad_config_v1');
        localStorage.removeItem('nosuit_ad_config_v5');
      } catch (e) {}

      function isConsentAccepted() {
        try {
          return localStorage.getItem(COOKIE_CONSENT_KEY) === 'accepted';
        } catch (e) {
          return false;
        }
      }

      function loadGa4ScriptIfAccepted() {
        if (!isConsentAccepted()) return;
        const gaId = '${cleanGaId}' || CONSTANTS.GA_MEASUREMENT_ID;
        window.dataLayer = window.dataLayer || [];
        if (typeof window.gtag !== 'function') {
          window.gtag = function () { window.dataLayer.push(arguments); };
        }
        if (!document.getElementById('ga4GtagScript')) {
          const s = document.createElement('script');
          s.id = 'ga4GtagScript';
          s.async = true;
          s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(gaId);
          s.setAttribute('data-ga-measurement-id', gaId);
          document.head.appendChild(s);
        }
        if (window.__GA4_CONFIGURED_ID__ !== gaId) {
          window.gtag('js', new Date());
          window.gtag('config', gaId);
          window.__GA4_CONFIGURED_ID__ = gaId;
        }
      }

      // Consent-gated GA4 Custom Event Tracking helper (no-op unless consent === 'accepted')
      function trackGa4Event(eventName, params) {
        if (!isConsentAccepted() || typeof window.gtag !== 'function') return;
        window.gtag('event', eventName, Object.assign({ send_to: '${cleanGaId}' }, params || {}));
      }

      document.addEventListener('click', (e) => {
        const target = e.target;
        if (!target || typeof target.closest !== 'function') return;

        const tabBtn = target.closest('[data-tab], [data-goto-tab]');
        if (tabBtn) {
          const tabId = tabBtn.getAttribute('data-tab') || tabBtn.getAttribute('data-goto-tab') || '';
          trackGa4Event('calculator_tab_switch', {
            event_category: 'calculator_navigation',
            tab_id: tabId,
            tab_name: (tabBtn.textContent || '').trim()
          });
          return;
        }

        const affiliateEl = target.closest('[data-ga-event="affiliate_click"], [data-affiliate], .affiliate-link');
        if (affiliateEl) {
          trackGa4Event('affiliate_click', {
            event_category: 'affiliate_monetization',
            partner_name: affiliateEl.getAttribute('data-affiliate') || (affiliateEl.textContent || '').trim(),
            link_url: affiliateEl.href || ''
          });
          return;
        }

        const ytEl = target.closest('[data-ga-event="youtube_video_play"], #youtubeVideoSection a, a[href*="youtube.com"], a[href*="youtu.be"]');
        if (ytEl) {
          trackGa4Event('youtube_video_play', {
            event_category: 'video_engagement',
            video_title: ytEl.getAttribute('data-video-title') || (ytEl.textContent || '').trim(),
            link_url: ytEl.href || 'https://www.youtube.com/@NoSuitRetirement'
          });
        }
      });

      const fmt = (n) => '$' + Math.round(n).toLocaleString('en-US');
      const setEl = (id, text) => { const el = document.getElementById(id); if (el) el.textContent = text; };

      function updateAllCalculations() {
        // Tab 1: COLA & Medicare Part B Hold Harmless + Part D + 3-Bucket
        const ssYour = parseFloat(document.getElementById('ssYourCheck')?.value) || 0;
        const ssSpouse = parseFloat(document.getElementById('ssSpouseCheck')?.value) || 0;
        const colaPct = parseFloat(document.getElementById('colaPctInput')?.value) || CONSTANTS.COLA_2027_PCT;
        const partBHikePerPerson = parseFloat(document.getElementById('partBIncreaseInput')?.value) || 0;
        const partDMonthlyPremium = Math.max(0, parseFloat(document.getElementById('partDMonthlyPremiumInput')?.value) || 0);
        const partBBase = CONSTANTS.MEDICARE_PART_B.base2026;
        setEl('colaPctVal', colaPct.toFixed(1));

        const activeMedicareEnrollees = (ssYour > 0 ? 1 : 0) + (ssSpouse > 0 ? 1 : 0);
        const currentGrossSS = ssYour + ssSpouse;
        const primaryColaRaise = ssYour * (colaPct / 100);
        const spouseColaRaise = ssSpouse * (colaPct / 100);
        const grossColaRaise = primaryColaRaise + spouseColaRaise;
        const newGrossSS = currentGrossSS + grossColaRaise;
        const baseMedicareCurrent = partBBase * activeMedicareEnrollees;
        const primaryMedicareHike = ssYour > 0 ? Math.min(partBHikePerPerson, primaryColaRaise) : 0;
        const spouseMedicareHike = ssSpouse > 0 ? Math.min(partBHikePerPerson, spouseColaRaise) : 0;
        const totalMedicareHike = primaryMedicareHike + spouseMedicareHike;
        const newTotalMedicare = baseMedicareCurrent + totalMedicareHike;
        const primaryNetSS = ssYour > 0 ? Math.max(0, ssYour + primaryColaRaise - (partBBase + primaryMedicareHike)) : 0;
        const spouseNetSS = ssSpouse > 0 ? Math.max(0, ssSpouse + spouseColaRaise - (partBBase + spouseMedicareHike)) : 0;
        const newNetSS = Math.max(0, primaryNetSS - partDMonthlyPremium * (ssYour > 0 ? 1 : 0) + spouseNetSS - partDMonthlyPremium * (ssSpouse > 0 ? 1 : 0));
        const netRaise = Math.max(0, grossColaRaise - totalMedicareHike);
        const bitePct = grossColaRaise > 0 ? Math.min(100, Math.round((totalMedicareHike / grossColaRaise) * 100)) : 0;
        const primaryHoldHarmlessProtected = ssYour > 0 && partBHikePerPerson > primaryColaRaise;
        const spouseHoldHarmlessProtected = ssSpouse > 0 && partBHikePerPerson > spouseColaRaise;
        const holdHarmlessProtected = primaryHoldHarmlessProtected || spouseHoldHarmlessProtected;

        setEl('kpiGrossCola', '+' + fmt(grossColaRaise) + '/mo');
        setEl('kpiGrossCheckSub', 'Gross SS climbs to ' + fmt(newGrossSS) + '/mo');
        setEl('kpiMedicareBite', '-' + fmt(totalMedicareHike) + '/mo');
        setEl('kpiMedicareSub', 'Takes ' + bitePct + '% of your COLA raise');
        setEl('kpiNetSS', fmt(newNetSS) + '/mo');
        setEl('kpiNetRaiseSub', 'Real net raise: +' + fmt(netRaise) + '/mo');
        setEl('buyingPowerLossBadge', '-' + fmt(currentGrossSS * CONSTANTS.BUYING_POWER_LOSS_PCT_2016_2026) + '/mo vs 2016');

        const nestEgg = parseFloat(document.getElementById('nestEggInput')?.value) || 0;
        const drawRate = parseFloat(document.getElementById('withdrawalRateInput')?.value) || 4.5;
        setEl('withdrawalRateVal', drawRate.toFixed(1));
        const annualPortDraw = nestEgg * (drawRate / 100);
        const monthlyPortDraw = annualPortDraw / 12;
        const expH = parseFloat(document.getElementById('expHousing')?.value) || 0;
        const expG = parseFloat(document.getElementById('expGroceries')?.value) || 0;
        const expM = parseFloat(document.getElementById('expHealthcare')?.value) || 0;
        const expC = parseFloat(document.getElementById('expCarFun')?.value) || 0;
        const monthlyExpenses = expH + expG + expM + expC;
        const totalMonthlyPaycheck = newNetSS + monthlyPortDraw;
        const monthlySurplus = totalMonthlyPaycheck - monthlyExpenses;

        setEl('kpiTotalPaycheck', fmt(totalMonthlyPaycheck) + '/mo');
        setEl('kpiBudgetSurplus', (monthlySurplus >= 0 ? '+' : '') + fmt(monthlySurplus) + '/mo ' + (monthlySurplus >= 0 ? 'breathing room' : 'shortfall'));

        const b1 = Math.min(nestEgg, Math.round(annualPortDraw * 2));
        const b2 = Math.min(Math.max(0, nestEgg - b1), Math.round(annualPortDraw * 6));
        const b3 = Math.max(0, nestEgg - b1 - b2);
        setEl('bucket1Amt', fmt(b1));
        setEl('bucket2Amt', fmt(b2));
        setEl('bucket3Amt', fmt(b3));
        setEl('printNetSS', fmt(newNetSS) + '/mo');
        setEl('printPortDraw', fmt(monthlyPortDraw) + '/mo');
        setEl('printBuckets', 'Cash: ' + fmt(b1) + ' • Bonds: ' + fmt(b2) + ' • Growth: ' + fmt(b3));

        // Tab 2: Claiming Age (Dynamic FRA by Birth Year) & Earnings Test (Full Year vs Year Reaching FRA)
        const birthYearKey = document.getElementById('claimingBirthYearSelect')?.value || '1960+';
        const fraCohort = CONSTANTS.FRA_BY_BIRTH_YEAR[birthYearKey] || CONSTANTS.FRA_BY_BIRTH_YEAR['1960+'];
        const fraBenefitVal = parseFloat(document.getElementById('fraBenefitInput')?.value) || 2200;
        const targetAgeVal = parseInt(document.getElementById('lifeExpInput')?.value || '82', 10) || 82;
        setEl('lifeExpVal', String(targetAgeVal));
        setEl('fraTitleLabel', fraCohort.fraShortLabel);
        setEl('fraInputLabel', fraCohort.fraShortLabel);
        setEl('claim62CardTitle', 'Claim Early at 62 (' + fraCohort.claim62PctLabel + ')');
        setEl('claimFraCardTitle', 'Claim Full at ' + fraCohort.fraShortLabel + ' (100% FRA)');
        setEl('claim70CardTitle', 'Claim Max at 70 (' + fraCohort.claim70PctLabel + ')');
        const mo62Val = Math.round(fraBenefitVal * fraCohort.claim62Factor);
        const moFraVal = Math.round(fraBenefitVal);
        const mo70Val = Math.round(fraBenefitVal * fraCohort.claim70Factor);
        setEl('claim62Mo', fmt(mo62Val) + '/mo');
        setEl('claim67Mo', fmt(moFraVal) + '/mo');
        setEl('claim70Mo', fmt(mo70Val) + '/mo');
        setEl('claim62Total', 'Total by ' + targetAgeVal + ': ' + fmt(Math.round((targetAgeVal - 62) * 12 * mo62Val)));
        setEl('claim67Total', 'Total by ' + targetAgeVal + ': ' + fmt(Math.round((targetAgeVal - fraCohort.fraDecimalAge) * 12 * moFraVal)));
        setEl('claim70Total', 'Total by ' + targetAgeVal + ': ' + fmt(Math.round((targetAgeVal - 70) * 12 * mo70Val)));

        const reachingFra = (document.getElementById('reachingFraThisYearSelect')?.value || 'no') === 'yes';
        const sideGigLimit = reachingFra ? CONSTANTS.SSA_EARNINGS_TEST_2027.yearOfFraAnnualLimit : CONSTANTS.SSA_EARNINGS_TEST_2027.underFraAnnualLimit;
        const sideGigMonthlyLimit = reachingFra ? CONSTANTS.SSA_EARNINGS_TEST_2027.yearOfFraMonthlyLimit : CONSTANTS.SSA_EARNINGS_TEST_2027.underFraMonthlyLimit;
        const sideGigDivisor = reachingFra ? CONSTANTS.SSA_EARNINGS_TEST_2027.yearOfFraWithholdingDivisor : CONSTANTS.SSA_EARNINGS_TEST_2027.underFraWithholdingDivisor;
        const sideGigPay = Math.max(0, parseFloat(document.getElementById('sideGigIncome')?.value) || 0);
        const sideGigHourly = Math.max(1, parseFloat(document.getElementById('sideGigHourly')?.value) || 25);
        const sideGigExcess = Math.max(0, sideGigPay - sideGigLimit);
        const sideGigPenalty = Math.round(sideGigExcess / sideGigDivisor);
        const sideGigBuffer = Math.max(0, sideGigLimit - sideGigPay);
        const safeHoursPerMonth = Math.floor(sideGigLimit / 12 / sideGigHourly);
        const sideGigBox = document.getElementById('sideGigResultBox');
        if (sideGigBox) {
          if (sideGigExcess > 0) {
            sideGigBox.className = 'p-3.5 rounded-xl bg-red-50 border border-red-300 text-sm space-y-1';
            setEl('sideGigPenaltyTitle', '⚠️ Penalty Alert: ' + fmt(sideGigPenalty) + '/yr Withheld ($1-for-$' + sideGigDivisor + ')!');
            setEl('sideGigPenaltyDesc', 'You are ' + fmt(sideGigExcess) + ' above the ' + fmt(sideGigLimit) + '/yr (' + fmt(sideGigMonthlyLimit) + '/mo) 2027 limit. Cap work at ' + safeHoursPerMonth + ' hrs/mo to avoid early Social Security clawbacks.');
          } else {
            sideGigBox.className = 'p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-sm space-y-1';
            setEl('sideGigPenaltyTitle', '✅ $0 Penalty (You Keep 100% of Your Check!)');
            setEl('sideGigPenaltyDesc', 'You are ' + fmt(sideGigBuffer) + ' below the ' + fmt(sideGigLimit) + '/yr (' + fmt(sideGigMonthlyLimit) + '/mo) 2027 limit. You can work up to ' + safeHoursPerMonth + ' hrs/mo penalty-free.');
          }
        }

        // Tab 3: 1984 Ghost Tax, 2026 Tax Year Roth Sweet Spot (baseline 2026 currentGrossSS), IRMAA & ACA Bridge
        const isMarried = (document.getElementById('taxFilingStatus')?.value || 'married') === 'married';
        const rawFilers65 = parseInt(document.getElementById('filersAge65Plus')?.value || '0', 10) || 0;
        const filersAge65 = isMarried ? Math.min(2, Math.max(0, rawFilers65)) : Math.min(1, Math.max(0, rawFilers65));
        const preTaxDraw = parseFloat(document.getElementById('taxPreTaxDraw')?.value) || 0;
        const rothDraw = parseFloat(document.getElementById('taxRothDraw')?.value) || 0;
        const interestInc = parseFloat(document.getElementById('taxInterest')?.value) || 0;
        const annualGrossSS = currentGrossSS * 12;
        const halfSS = annualGrossSS * 0.5;
        const combinedIncome = halfSS + preTaxDraw + interestInc;
        const line50 = isMarried ? CONSTANTS.TAX_2026.ghostTax1984.married.line50 : CONSTANTS.TAX_2026.ghostTax1984.single.line50;
        const line85 = isMarried ? CONSTANTS.TAX_2026.ghostTax1984.married.line85 : CONSTANTS.TAX_2026.ghostTax1984.single.line85;

        let taxZone = '0% Zone';
        let taxableSS = 0;
        if (combinedIncome > line85) {
          taxZone = '85% Zone';
          const tier1Max = Math.min(0.5 * annualGrossSS, 0.5 * (line85 - line50));
          taxableSS = Math.min(0.85 * annualGrossSS, tier1Max + 0.85 * Math.max(0, combinedIncome - line85));
        } else if (combinedIncome > line50) {
          taxZone = '50% Zone';
          taxableSS = Math.min(0.5 * annualGrossSS, 0.5 * (combinedIncome - line50));
        }
        setEl('combinedIncomeValue', fmt(combinedIncome) + ' / yr');
        setEl('printTaxStatus', 'Combined: ' + fmt(combinedIncome) + ' (' + taxZone + ')');

        const baseStdDed = isMarried ? CONSTANTS.TAX_2026.standardDeduction.married : CONSTANTS.TAX_2026.standardDeduction.single;
        const extra65Ded = isMarried ? filersAge65 * CONSTANTS.TAX_2026.extraAge65Deduction.marriedPerSpouse : filersAge65 * CONSTANTS.TAX_2026.extraAge65Deduction.single;
        const taxMagi = preTaxDraw + interestInc + taxableSS;
        const obbbaStart = isMarried ? CONSTANTS.TAX_2026.obbbaSeniorDeduction.phaseoutStart.married : CONSTANTS.TAX_2026.obbbaSeniorDeduction.phaseoutStart.single;
        const tentativeObbbaSeniorDed = filersAge65 * CONSTANTS.TAX_2026.obbbaSeniorDeduction.perPerson;
        const obbbaPhaseoutReduction = CONSTANTS.TAX_2026.obbbaSeniorDeduction.phaseoutRate * Math.max(0, taxMagi - obbbaStart);
        const obbbaDed = Math.round(Math.max(0, tentativeObbbaSeniorDed - obbbaPhaseoutReduction));
        const totalStdDed = baseStdDed + extra65Ded + obbbaDed;
        const bracket12Top = isMarried ? CONSTANTS.TAX_2026.bracket12Top.married : CONSTANTS.TAX_2026.bracket12Top.single;
        const currentTaxable = Math.max(0, taxMagi - totalStdDed);

        function computeTaxableAtConversion(conversionAmount) {
          const convPreTax = preTaxDraw + conversionAmount;
          const convCombined = halfSS + convPreTax + interestInc;
          let convTaxableSS = 0;
          if (convCombined > line85) {
            const tier1Max = Math.min(0.5 * annualGrossSS, 0.5 * (line85 - line50));
            convTaxableSS = Math.min(0.85 * annualGrossSS, tier1Max + 0.85 * Math.max(0, convCombined - line85));
          } else if (convCombined > line50) {
            convTaxableSS = Math.min(0.5 * annualGrossSS, 0.5 * (convCombined - line50));
          }
          const convTaxMagi = convPreTax + interestInc + convTaxableSS;
          const convObbbaReduction = CONSTANTS.TAX_2026.obbbaSeniorDeduction.phaseoutRate * Math.max(0, convTaxMagi - obbbaStart);
          const convObbbaDed = Math.round(Math.max(0, tentativeObbbaSeniorDed - convObbbaReduction));
          const convStdDed = baseStdDed + extra65Ded + convObbbaDed;
          return Math.max(0, convTaxMagi - convStdDed);
        }

        let rothSweetSpotRoom = 0;
        if (computeTaxableAtConversion(0) <= bracket12Top) {
          let low = 0;
          let high = Math.max(0, Math.ceil(bracket12Top + totalStdDed + annualGrossSS));
          while (low < high) {
            const mid = Math.floor((low + high + 1) / 2);
            if (computeTaxableAtConversion(mid) <= bracket12Top) {
              low = mid;
            } else {
              high = mid - 1;
            }
          }
          rothSweetSpotRoom = low;
        }
        const rothBox = document.getElementById('rothSweetSpotBox');
        if (rothBox) {
          rothBox.innerHTML = '<div class="font-extrabold text-emerald-950">🎯 Your Annual Roth Conversion "Sweet Spot" (2026 Tax Year · Before Age 73 RMDs): ' + fmt(rothSweetSpotRoom) + '/yr</div><p class="text-xs text-slate-700">2026 tax year (IRS Rev. Proc. 2025-32): Base deduction ' + fmt(baseStdDed) + ', Age 65+ extra ' + fmt(extra65Ded) + ', OBBBA senior deduction ' + fmt(obbbaDed) + '; 12% bracket top ' + fmt(bracket12Top) + '. (' + fmt(rothDraw) + ' Roth draw is tax-free.)</p><p class="text-xs text-emerald-900 font-semibold border-t border-emerald-300/70 pt-1">ℹ️ Sweet Spot Bracket Analysis: Estimates remaining room in the 12% federal bracket (IRS Rev. Proc. 2025-32) before jumping to 22%. Illustrative kitchen-table estimate; consult your CPA for full Form 1040 itemized deductions.</p>';
        }

        const irmaaIncome = parseFloat(document.getElementById('irmaa2025Income')?.value) || 0;
        const irmaaRetired = (document.getElementById('irmaaRetiredEvent')?.value || 'yes') === 'yes';
        const irmaaLimit = isMarried ? CONSTANTS.IRMAA.year2026From2024Magi.married : CONSTANTS.IRMAA.year2026From2024Magi.single;
        let irmaaTier = 1;
        let irmaaPerPerson = 0;
        const tiers = CONSTANTS.IRMAA.tiers2026 || [];
        for (let i = 0; i < tiers.length; i++) {
          const tMax = isMarried ? tiers[i].marriedMax : tiers[i].singleMax;
          const matchesTier = tiers[i].exclusiveMax ? irmaaIncome < tMax : irmaaIncome <= tMax;
          if (matchesTier) {
            irmaaTier = tiers[i].tier;
            irmaaPerPerson = tiers[i].annualPerPerson;
            break;
          }
        }
        const irmaaAnnualSurcharge = Number((irmaaPerPerson * (isMarried ? 2 : 1)).toFixed(2));
        const irmaaOverLimit = irmaaIncome > irmaaLimit;
        const hhBadge = document.getElementById('holdHarmlessStatusBadge');
        if (hhBadge) {
          let hhStatusText = '§ 1839(f) Not Applicable';
          if (currentGrossSS > 0 && !irmaaOverLimit) {
            hhStatusText = holdHarmlessProtected ? '§ 1839(f) Cap Active' : 'COLA Absorbs Hike (§ 1839(f) Eligible)';
          }
          hhBadge.textContent = hhStatusText;
          hhBadge.className = hhStatusText === '§ 1839(f) Not Applicable'
            ? 'px-2.5 py-0.5 rounded-md font-extrabold text-xs bg-amber-100 text-amber-950 border border-amber-400'
            : 'px-2.5 py-0.5 rounded-md font-extrabold text-xs bg-emerald-100 text-emerald-950 border border-emerald-400';
        }
        const irmaaBox = document.getElementById('irmaaVerdictBox');
        if (irmaaBox) {
          if (irmaaOverLimit && irmaaRetired) {
            irmaaBox.innerHTML = '<div class="font-extrabold text-emerald-950">✅ File Form SSA-44 Immediately: Erases your Tier ' + irmaaTier + ' surcharge to save ' + fmt(irmaaAnnualSurcharge) + '/yr!</div><p class="text-xs text-slate-800">Your lookback MAGI (' + fmt(irmaaIncome) + ') places you in IRMAA Tier ' + irmaaTier + ' ($' + irmaaPerPerson.toFixed(2) + '/yr per person) above the confirmed 2026 CMS threshold of ' + fmt(irmaaLimit) + ' (Confirmed 2026 CMS rates; 2027 CMS announcement expected mid-November).</p>';
          } else if (irmaaOverLimit) {
            irmaaBox.innerHTML = '<div class="font-extrabold text-amber-950">⚠️ 2026 IRMAA Tier ' + irmaaTier + ' Surcharge Applies (' + fmt(irmaaAnnualSurcharge) + '/yr)</div><p class="text-xs text-slate-800">Lookback MAGI (' + fmt(irmaaIncome) + ') exceeds the confirmed 2026 CMS threshold of ' + fmt(irmaaLimit) + ' (Confirmed 2026 CMS rates; 2027 CMS announcement expected mid-November).</p>';
          } else {
            irmaaBox.innerHTML = '<div class="font-extrabold text-emerald-950">🎉 $0 IRMAA Surcharge (Tier 1 · ' + fmt(irmaaLimit - irmaaIncome) + ' below confirmed ' + fmt(irmaaLimit) + ' 2026 CMS threshold — 2027 CMS announcement expected mid-November)!</div>';
          }
        }

        // ACA Bridge (2027 ACA Coverage Year per IRS Rev. Proc. 2026-26 & 2026 FPL)
        const acaAge = Math.min(64, Math.max(55, parseInt(document.getElementById('acaCurrentAge')?.value || '64', 10) || 64));
        const acaMagi = parseFloat(document.getElementById('acaMagiInput')?.value) || 0;
        const rawHh = parseInt(document.getElementById('acaHouseholdSizeSelect')?.value || (isMarried ? '2' : '1'), 10);
        const acaHhSize = (rawHh >= 1 && rawHh <= 4) ? rawHh : (isMarried ? 2 : 1);
        const acaFpl = CONSTANTS.ACA_2027.fplByHouseholdSize[acaHhSize] || (isMarried ? CONSTANTS.ACA_2027.fpl2Person : CONSTANTS.ACA_2027.fpl1Person);
        const acaCliff = CONSTANTS.ACA_2027.cliffByHouseholdSize[acaHhSize] || (isMarried ? CONSTANTS.ACA_2027.cliff2Person : CONSTANTS.ACA_2027.cliff1Person);
        const acaFplPct = acaFpl > 0 ? (acaMagi / acaFpl) * 100 : 0;
        const acaYears = Math.max(1, 65 - acaAge);
        const acaBox = document.getElementById('acaBridgeResult');
        if (acaBox) {
          if (acaMagi > acaCliff) {
            acaBox.innerHTML = '<strong>⚠️ ' + acaYears + '-Year Bridge Warning (' + Math.round(acaFplPct) + '% of FPL):</strong> <strong>No premium tax credit — you pay the full premium.</strong> Cut <strong>' + fmt(acaMagi - acaCliff) + '</strong> of MAGI to get back under the ' + fmt(acaCliff) + ' (400% FPL) cliff!';
          } else {
            let appPct = 10.22;
            const bands = CONSTANTS.ACA_2027.revProc2026_26Bands;
            if (acaFplPct < 133) appPct = bands[0].startPct;
            else if (acaFplPct >= 300) appPct = bands[5].endPct;
            else {
              for (let i = 0; i < bands.length; i++) {
                const b = bands[i];
                if (acaFplPct >= b.minFplPct && acaFplPct <= b.maxFplPct) {
                  const span = b.maxFplPct - b.minFplPct;
                  appPct = b.startPct + (span > 0 ? ((acaFplPct - b.minFplPct) / span) * (b.endPct - b.startPct) : 0);
                  break;
                }
              }
            }
            const moShare = Math.round((acaMagi * (appPct / 100)) / 12);
            acaBox.innerHTML = '<strong>🏥 ' + acaYears + '-Year Bridge to Medicare (' + Math.round(acaFplPct) + '% of FPL · ' + appPct.toFixed(2) + '% cap):</strong> Estimated YOUR share toward the benchmark Silver plan: <strong>' + fmt(moShare) + '/month</strong>.';
          }
        }

        // Saver's Match (IRC §6433 & IRS Notice 2026-48 statutory rounding + per-spouse $2,000 cap)
        const saversContrib1 = Math.max(0, parseFloat(document.getElementById('saversContributionInput')?.value) || 0);
        const saversContrib2 = Math.max(0, parseFloat(document.getElementById('saversSpouseContributionInput')?.value) || 0);
        const saversStatus = document.getElementById('saversFilingStatus')?.value || 'married';
        const saversSpouses = saversStatus === 'married' && document.getElementById('saversContributingSpouses')?.value === '2' ? 2 : 1;
        const spouse2Wrap = document.getElementById('saversSpouseContributionWrap');
        if (spouse2Wrap) {
          spouse2Wrap.classList.toggle('hidden', saversSpouses !== 2);
        }
        const saversAgi = parseFloat(document.getElementById('saversAgiInput')?.value) || 0;
        const phaseCfg = CONSTANTS.SAVERS_MATCH_2027.phaseout[saversStatus] || CONSTANTS.SAVERS_MATCH_2027.phaseout.married;
        let saversRatePct = 0;
        if (saversAgi <= phaseCfg.start) {
          saversRatePct = 50;
        } else if (saversAgi >= phaseCfg.end) {
          saversRatePct = 0;
        } else {
          const reductionPoints = Math.floor((50 * (saversAgi - phaseCfg.start)) / (phaseCfg.end - phaseCfg.start));
          saversRatePct = Math.max(0, 50 - reductionPoints);
        }
        const maxPerPerson = CONSTANTS.SAVERS_MATCH_2027.maxContributionPerPerson;
        const eligibleContrib = Math.min(saversContrib1, maxPerPerson) + (saversSpouses === 2 ? Math.min(saversContrib2, maxPerPerson) : 0);
        const totalHouseholdContrib = saversContrib1 + (saversSpouses === 2 ? saversContrib2 : 0);
        const matchDep = Math.round(eligibleContrib * (saversRatePct / 100));
        setEl('saversMatchRateResult', saversRatePct + '%');
        setEl('saversTierBadge', saversRatePct >= 50 ? '50% Full Federal Match' : saversRatePct > 0 ? (saversRatePct + '% Federal Match') : '0% Match (Above AGI Phase-Out Limit)');
        setEl('saversMatchDepositResult', '+' + fmt(matchDep));
        setEl('saversTotalAddedResult', fmt(totalHouseholdContrib + matchDep));
      }

      const presets = {
        single: { ssYourCheck: 2150, ssSpouseCheck: 0, colaPctInput: CONSTANTS.COLA_2027_PCT, partBIncreaseInput: CONSTANTS.MEDICARE_PART_B.defaultIncrease2027, partDMonthlyPremiumInput: 0, nestEggInput: 380000, withdrawalRateInput: 4.4, taxFilingStatus: 'single', filersAge65Plus: 1, workerAgeSelect: '65', taxPreTaxDraw: 16000, taxRothDraw: 4000, taxInterest: 2400, irmaa2025Income: 125000, acaCurrentAge: 64, acaMagiInput: 38000, acaHouseholdSizeSelect: 1 },
        couple400k: { ssYourCheck: 1940, ssSpouseCheck: 1160, colaPctInput: CONSTANTS.COLA_2027_PCT, partBIncreaseInput: CONSTANTS.MEDICARE_PART_B.defaultIncrease2027, partDMonthlyPremiumInput: 0, nestEggInput: 400000, withdrawalRateInput: 4.5, taxFilingStatus: 'married', filersAge65Plus: 2, workerAgeSelect: '65', taxPreTaxDraw: 24000, taxRothDraw: 4000, taxInterest: 3500, irmaa2025Income: 230000, acaCurrentAge: 64, acaMagiInput: 52000, acaHouseholdSizeSelect: 2 },
        latesaver: { ssYourCheck: 0, ssSpouseCheck: 0, colaPctInput: CONSTANTS.COLA_2027_PCT, partBIncreaseInput: 0, partDMonthlyPremiumInput: 0, nestEggInput: 120000, withdrawalRateInput: 4.5, taxFilingStatus: 'married', filersAge65Plus: 0, workerAgeSelect: '55', taxPreTaxDraw: 8000, taxRothDraw: 3000, taxInterest: 1200, irmaa2025Income: 95000, acaCurrentAge: 59, acaMagiInput: 44000, acaHouseholdSizeSelect: 2 }
      };

      document.querySelectorAll('.preset-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          const p = presets[btn.getAttribute('data-preset')];
          if (!p) return;
          Object.keys(p).forEach((id) => {
            const el = document.getElementById(id);
            if (el) el.value = p[id];
          });
          updateAllCalculations();
        });
      });

      ['ssYourCheck', 'ssSpouseCheck', 'colaPctInput', 'partBIncreaseInput', 'partDMonthlyPremiumInput', 'nestEggInput', 'withdrawalRateInput', 'expHousing', 'expGroceries', 'expHealthcare', 'expCarFun', 'claimingBirthYearSelect', 'fraBenefitInput', 'lifeExpInput', 'reachingFraThisYearSelect', 'sideGigIncome', 'sideGigHourly', 'taxFilingStatus', 'filersAge65Plus', 'workerAgeSelect', 'taxPreTaxDraw', 'taxRothDraw', 'taxInterest', 'irmaa2025Income', 'irmaaRetiredEvent', 'acaCurrentAge', 'acaMagiInput', 'acaHouseholdSizeSelect', 'saversContributionInput', 'saversSpouseContributionInput', 'saversFilingStatus', 'saversContributingSpouses', 'saversAgiInput'].forEach((id) => {
        document.getElementById(id)?.addEventListener('input', updateAllCalculations);
        document.getElementById(id)?.addEventListener('change', updateAllCalculations);
      });

      document.querySelectorAll('.scam-check').forEach((c) => {
        c.addEventListener('change', () => {
          const count = Array.from(document.querySelectorAll('.scam-check')).filter((x) => x.checked).length;
          const banner = document.getElementById('scamAlertBanner');
          if (!banner) return;
          if (count > 0) {
            banner.className = 'p-4 rounded-xl bg-red-100 border-2 border-red-600 text-red-950 font-extrabold text-xs';
            banner.textContent = '🚨 HANG UP IMMEDIATELY (' + count + ' Red Flag' + (count > 1 ? 's' : '') + ' Detected): Social Security, Medicare, and the IRS NEVER operate this way.';
          } else {
            banner.className = 'p-4 rounded-xl bg-emerald-50 border-2 border-emerald-400 text-emerald-950 font-extrabold text-xs';
            banner.textContent = '🛡️ No Red Flags Checked Yet';
          }
        });
      });

      document.querySelectorAll('.audit-check').forEach((c) => {
        c.addEventListener('change', () => {
          const count = Array.from(document.querySelectorAll('.audit-check')).filter((x) => x.checked).length;
          const badge = document.getElementById('checklistProgressBadge');
          if (badge) badge.textContent = count + ' / 5 Done';
        });
      });

      document.getElementById('openGlossaryBtn')?.addEventListener('click', () => document.getElementById('glossaryModal')?.classList.remove('hidden'));
      document.getElementById('closeGlossaryBtn')?.addEventListener('click', () => document.getElementById('glossaryModal')?.classList.add('hidden'));
      document.getElementById('openPrivacyBtn')?.addEventListener('click', () => document.getElementById('privacyModal')?.classList.remove('hidden'));
      document.getElementById('openPrivacyFooterBtn')?.addEventListener('click', () => document.getElementById('privacyModal')?.classList.remove('hidden'));
      document.getElementById('cookiePrivacyPolicyBtn')?.addEventListener('click', () => document.getElementById('privacyModal')?.classList.remove('hidden'));
      document.getElementById('closePrivacyBtn')?.addEventListener('click', () => document.getElementById('privacyModal')?.classList.add('hidden'));
      document.getElementById('printPlanBtn')?.addEventListener('click', () => window.print());

      function showToast(msg) {
        const t = document.getElementById('appToast');
        if (!t) return;
        t.textContent = msg;
        t.classList.remove('hidden');
        clearTimeout(window.__toastTimer);
        window.__toastTimer = setTimeout(() => t.classList.add('hidden'), 3500);
      }

      // 1. Cookie & Privacy Consent Banner (localStorage 'nosuit_cookie_consent_v1')
      const cookieBanner = document.getElementById('cookieConsentBanner');
      try {
        const savedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
        if ((savedConsent === 'accepted' || savedConsent === 'declined') && cookieBanner) {
          cookieBanner.classList.add('hidden');
        }
        if (savedConsent === 'accepted') {
          loadGa4ScriptIfAccepted();
        }
      } catch (e) {}

      document.getElementById('acceptCookiesBtn')?.addEventListener('click', () => {
        try {
          localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
        } catch (e) {}
        cookieBanner?.classList.add('hidden');
        loadGa4ScriptIfAccepted();
        trackGa4Event('cookie_consent_accepted', { event_category: 'compliance', consent_status: 'accepted' });
        showToast('Cookie & privacy preferences saved.');
      });

      document.getElementById('declineCookiesBtn')?.addEventListener('click', () => {
        try {
          localStorage.setItem(COOKIE_CONSENT_KEY, 'declined');
        } catch (e) {}
        cookieBanner?.classList.add('hidden');
        showToast('Analytics cookies declined. Calculator remains 100% private.');
      });

      // 2. Share With Your Spouse or Retirement Friend Bar (#spouseShareBar)
      function updateSpouseShareLinks() {
        const netSS = document.getElementById('kpiNetSS')?.textContent || '$2,770/mo';
        const totalCheck = document.getElementById('kpiTotalPaycheck')?.textContent || '$4,270/mo';
        const b1 = document.getElementById('bucket1Amt')?.textContent || '$36,000';
        const subject = encodeURIComponent('Our 2027 No-Suit Retirement Numbers & 3-Bucket Plan');
        const body = encodeURIComponent(
          'Hi — I ran our retirement numbers on the No-Suit Retirement Calculator (100% private in-browser tool):\\n\\n' +
          '• 2027 True Net Social Security: ' + netSS + '\\n' +
          '• Total Monthly Retirement Paycheck: ' + totalCheck + '\\n' +
          '• Bucket 1 Safe Cash Shield (24 Months): ' + b1 + '\\n\\n' +
          'Try the calculator here: https://nosuitretirement.com/'
        );
        const emailBtn = document.getElementById('shareEmailSpouseBtn');
        if (emailBtn) emailBtn.setAttribute('href', 'mailto:?subject=' + subject + '&body=' + body);
      }

      document.getElementById('copyWebsiteLinkBtn')?.addEventListener('click', () => {
        const siteUrl = 'https://nosuitretirement.com/';
        const label = document.getElementById('copyWebsiteLinkLabel');
        if (navigator.clipboard) {
          navigator.clipboard.writeText(siteUrl).catch(() => {});
        }
        if (label) {
          label.textContent = '✓ Link Copied!';
          setTimeout(() => { label.textContent = '🔗 Copy Website Link'; }, 3000);
        }
        trackGa4Event('share_action', { event_category: 'viral_share', method: 'copy_website_link', link_url: siteUrl });
        showToast('Website link (https://nosuitretirement.com/) copied to clipboard!');
      });

      document.getElementById('shareFacebookBtn')?.addEventListener('click', () => {
        trackGa4Event('share_action', { event_category: 'viral_share', method: 'facebook_share', link_url: 'https://nosuitretirement.com/' });
      });

      document.getElementById('shareEmailSpouseBtn')?.addEventListener('click', () => {
        updateSpouseShareLinks();
        trackGa4Event('share_action', { event_category: 'viral_share', method: 'email_to_spouse', link_url: 'https://nosuitretirement.com/' });
      });

      // 3. Sticky Mobile Bottom Navigation Bar (#mobileBottomNavBar)
      function switchCalculatorTab(tabId) {
        document.querySelectorAll('.nav-tab-btn').forEach((btn) => {
          const isMatch = btn.getAttribute('data-tab') === tabId;
          btn.className = isMatch
            ? 'nav-tab-btn py-2.5 px-2.5 rounded-lg font-bold text-xs bg-[#1b4332] text-amber-300 shadow'
            : 'nav-tab-btn py-2.5 px-2.5 rounded-lg font-bold text-xs bg-white text-slate-800 hover:bg-amber-50';
        });
        document.querySelectorAll('.tab-panel').forEach((panel) => {
          panel.classList.toggle('hidden', panel.id !== tabId);
        });
      }

      document.querySelectorAll('.nav-tab-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          const target = btn.getAttribute('data-tab');
          if (target) switchCalculatorTab(target);
        });
      });

      document.querySelectorAll('.guide-tab-link').forEach((btn) => {
        btn.addEventListener('click', () => {
          const target = btn.getAttribute('data-goto-tab');
          if (target) {
            switchCalculatorTab(target);
            document.getElementById('calculatorSectionAnchor')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        });
      });

      document.getElementById('mobileNavCalculatorBtn')?.addEventListener('click', () => {
        document.getElementById('calculatorSectionAnchor')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        trackGa4Event('calculator_tab_switch', { event_category: 'mobile_bottom_nav', source: 'mobile_bottom_nav_calculator' });
      });

      document.getElementById('mobileNavVideosBtn')?.addEventListener('click', () => {
        document.getElementById('youtubeChannelHub')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        trackGa4Event('youtube_video_play', { event_category: 'mobile_bottom_nav', video_title: 'Mobile Bottom Nav - 3 Videos' });
      });

      document.getElementById('mobileNavBinderBtn')?.addEventListener('click', () => {
        switchCalculatorTab('tab-binder');
        trackGa4Event('calculator_tab_switch', { event_category: 'mobile_bottom_nav', tab_id: 'tab-binder', source: 'mobile_bottom_nav_binder' });
        setTimeout(() => {
          document.getElementById('tab-binder')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 60);
      });

      document.getElementById('copySummaryBtn')?.addEventListener('click', () => {
        const netSS = document.getElementById('printNetSS')?.textContent || '';
        const draw = document.getElementById('printPortDraw')?.textContent || '';
        const buckets = document.getElementById('printBuckets')?.textContent || '';
        if (navigator.clipboard) {
          navigator.clipboard.writeText('No-Suit Retirement Summary — Net SS: ' + netSS + ' | Safe Draw: ' + draw + ' | ' + buckets).catch(() => {});
        }
        showToast('Plan summary copied to clipboard!');
      });

      updateAllCalculations();
      updateSpouseShareLinks();
    })();
  </script>
</body>
</html>`;
}

