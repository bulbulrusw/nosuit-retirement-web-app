import { AdConfig, extractGscCode } from '../components/AdSlots';
import { BRAND_LOGO_BASE64 } from '../data/logoData';

export function buildFullStandaloneHtml(config: AdConfig): string {
  const cleanGsc = extractGscCode(config.gscVerificationCode);
  const bothSidebarOff = !config.sidebarRectEnabled && !config.sidebarSkyscraperEnabled;
  const serializedConfig = JSON.stringify(
    {
      gscVerificationCode: cleanGsc,
      topLeaderboardEnabled: Boolean(config.topLeaderboardEnabled),
      topLeaderboardCode: config.topLeaderboardCode || '',
      sidebarRectEnabled: Boolean(config.sidebarRectEnabled),
      sidebarRectCode: config.sidebarRectCode || '',
      sidebarSkyscraperEnabled: Boolean(config.sidebarSkyscraperEnabled),
      sidebarSkyscraperCode: config.sidebarSkyscraperCode || '',
      inContentBannerEnabled: Boolean(config.inContentBannerEnabled),
      inContentBannerCode: config.inContentBannerCode || '',
    },
    null,
    2
  ).replace(/<\/script>/gi, '<\\/script>');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>No-Suit Retirement — Complete 60–65+ Retirement Math &amp; Protection App</title>
  <meta name="description" content="Free 100% private 60–65+ retirement math calculator for 2027 Social Security COLA vs. Medicare Part B, $300K–$500K 3-Bucket plans, 1984 Ghost Tax, IRMAA SSA-44 appeals, and Senior Scam Protection." />
  <meta name="keywords" content="No-Suit Retirement, NoSuitRetirement, 2027 Social Security COLA calculator, Medicare Part B hike, $400K retirement budget, 3-Bucket retirement strategy, 1984 Social Security Ghost Tax, IRMAA Form SSA-44 appeal, Social Security age 62 vs 67 break-even" />
  <meta name="author" content="No-Suit Retirement (@NoSuitRetirement)" />
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
  <link rel="canonical" href="https://nosuitretirement.com/" />

  <!-- Google Search Console Verification Tag -->
  <meta id="gscVerificationMeta" name="google-site-verification" content="${cleanGsc}" />

  <!-- OpenGraph Social Cards -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://nosuitretirement.com/" />
  <meta property="og:site_name" content="No-Suit Retirement" />
  <meta property="og:title" content="No-Suit Retirement — Complete 60–65+ Retirement Math &amp; Protection App" />
  <meta property="og:description" content="Plain-English 60–65+ retirement math calculator for 2027 Social Security COLA, Medicare Part B traps, 3-Bucket nest egg plans, Roth Sweet Spots, and Scam Protection." />

  <!-- Twitter / X Cards -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="No-Suit Retirement — Complete 60–65+ Retirement Math &amp; Protection App" />
  <meta name="twitter:description" content="Plain-English 60–65+ retirement math calculator for 2027 Social Security COLA, Medicare Part B traps, 3-Bucket nest egg plans, Roth Sweet Spots, and Scam Protection." />

  <!-- Enhanced Schema.org JSON-LD Structured Data: WebApplication, Organization, FAQPage & VideoObject -->
  <script id="seoJsonLdSchema" type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": "https://nosuitretirement.com/#webapp",
        "name": "No-Suit Retirement — Complete 60–65+ Retirement Math & Protection App",
        "alternateName": "NoSuitRetirement Calculator",
        "url": "https://nosuitretirement.com/",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "All",
        "browserRequirements": "Requires JavaScript. Runs 100% privately in the browser with zero bank logins.",
        "description": "Plain-English 60–65+ retirement calculator covering the 2027 Social Security COLA vs. Medicare Part B Two-Envelope Test, $300K–$500K 3-Bucket Crash Shield, Age 62 vs. 67 Claiming Break-Even, 2026 $24,480 Work Penalty, 1984 IRS Ghost Tax, Medicare IRMAA Form SSA-44 Appeals, and Senior Scam Protection.",
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
            "name": "How much of my 2027 Social Security COLA raise will Medicare Part B take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Because Medicare Part B premiums are automatically deducted from Social Security checks before deposit, a monthly Part B hike can consume 25% to 40%+ of a modest COLA increase. The Two-Envelope Test subtracts your projected Part B and Part D increases from your gross COLA raise to show your true net monthly deposit."
            }
          },
          {
            "@type": "Question",
            "name": "How does the 3-Bucket Crash Shield protect a $350K to $450K retirement nest egg?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The 3-Bucket strategy divides your savings into Bucket 1 (24 months of safe cash/HYSA for immediate monthly draws), Bucket 2 (Years 3–8 in Treasury bills, CDs, and short-term bonds), and Bucket 3 (Years 9+ in low-cost stock index funds), giving you 8 full years of protected income runway so you never have to sell stocks during a bear market."
            }
          },
          {
            "@type": "Question",
            "name": "What is the 1984 IRS Social Security Ghost Tax and how do Roth withdrawals help?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The IRS taxes up to 50% or 85% of your Social Security benefits based on Provisional (Combined) Income thresholds ($25,000/$34,000 for Single filers and $32,000/$44,000 for Married Filing Jointly) that have never been indexed for inflation since 1984. Qualified Roth IRA withdrawals do not count toward Provisional Income."
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
            "name": "Why the 2027 Social Security COLA Raise Gets Eaten by Medicare Part B",
            "description": "Plain-English chalkboard breakdown of how the Two-Envelope test reveals your true net Social Security deposit after Medicare Part B and Part D deductions.",
            "thumbnailUrl": ["https://nosuitretirement.com/og-cola-medicare.jpg"],
            "uploadDate": "2026-10-01T08:00:00-05:00",
            "contentUrl": "https://www.youtube.com/@NoSuitRetirement",
            "embedUrl": "https://www.youtube.com/@NoSuitRetirement"
          },
          {
            "@type": "VideoObject",
            "position": 2,
            "name": "How to Retire Comfortably at 62 on $350K–$450K Without Selling Stocks in a Crash",
            "description": "Step-by-step kitchen-table guide to setting up a 3-Bucket Crash Shield with 8 full years of protected cash and T-Bill runway.",
            "thumbnailUrl": ["https://nosuitretirement.com/og-400k-buckets.jpg"],
            "uploadDate": "2026-10-08T08:00:00-05:00",
            "contentUrl": "https://www.youtube.com/@NoSuitRetirement",
            "embedUrl": "https://www.youtube.com/@NoSuitRetirement"
          },
          {
            "@type": "VideoObject",
            "position": 3,
            "name": "Beating the 1984 IRS Ghost Tax & Filing Form SSA-44 After Retirement",
            "description": "How to use tax-free Roth withdrawals to drop out of the 85% Social Security tax zone and file Form SSA-44 to remove Medicare IRMAA surcharges.",
            "thumbnailUrl": ["https://nosuitretirement.com/og-ghost-tax-irmaa.jpg"],
            "uploadDate": "2026-10-15T08:00:00-05:00",
            "contentUrl": "https://www.youtube.com/@NoSuitRetirement",
            "embedUrl": "https://www.youtube.com/@NoSuitRetirement"
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
    @media print {
      .no-print { display: none !important; }
      body { background: #ffffff !important; color: #000000 !important; }
      .tab-panel { display: block !important; }
    }
  </style>
</head>
<body class="min-h-screen flex flex-col">

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
        <button id="ownerTopBarBtn" type="button" class="hidden px-3 py-1 rounded bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs">🔒 Owner Ad Manager</button>
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

      <!-- Right Column: YouTube Channel CTA + Sample Household Presets -->
      <div class="w-full xl:w-auto flex flex-col sm:flex-row xl:flex-col items-stretch sm:items-center xl:items-end justify-between gap-3">
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
          <span>Subscribe on YouTube - NoSuitRetirement</span>
        </a>

        <div class="bg-[#143325]/90 border border-amber-400/40 rounded-xl p-2.5 w-full sm:w-auto flex flex-col gap-1.5">
          <span class="text-[11px] font-bold uppercase tracking-wider text-amber-300 text-center xl:text-left">Click to Load Sample Household:</span>
          <div class="flex flex-wrap justify-center xl:justify-start gap-1.5">
            <button type="button" data-preset="single" class="preset-btn px-2.5 py-1.5 rounded-lg bg-emerald-800 text-amber-100 font-semibold text-xs hover:bg-emerald-700 border border-amber-400/30">
              Single (Age 66, $380K)
            </button>
            <button type="button" data-preset="couple400k" class="preset-btn px-2.5 py-1.5 rounded-lg bg-amber-400 text-slate-950 font-bold text-xs hover:bg-amber-300 shadow-sm">
              Couple (Age 62, $400K)
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
              <p class="text-xs text-slate-700 mt-1">See your exact claiming break-even age and check the $24,480 early-retirement work limit.</p>
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

  <!-- AD SLOT #1 (#adSlotTopBanner): Top Leaderboard Banner (728x90) Above the Calculator -->
  <div class="max-w-7xl w-full mx-auto px-4 mt-4 no-print">
    <aside id="adSlotTopBanner" aria-label="Advertisement: Top Leaderboard Banner" class="no-print bg-[#faf8f2] rounded-2xl p-3 border border-[#d5cbb8] flex flex-col items-center justify-center w-full ${config.topLeaderboardEnabled ? '' : 'hidden'}">
      <div class="w-full flex items-center justify-between text-[11px] text-slate-500 font-semibold uppercase tracking-wider pb-2 mb-2 border-b border-slate-200/80">
        <span>Advertisement · Sponsored</span>
      </div>
      <div id="adSlotTopBannerBody" class="w-full min-h-[90px] flex items-center justify-center"></div>
    </aside>
  </div>

  <!-- Toast Notification -->
  <div id="appToast" class="hidden fixed bottom-5 right-5 z-50 bg-[#1b4332] text-amber-200 border-2 border-amber-400 px-4 py-3 rounded-xl shadow-2xl font-semibold text-sm max-w-sm"></div>

  <!-- MAIN 12-COLUMN DESKTOP GRID: 8-Col 5-Tab Calculator + 4-Col Sticky Right Sidebar -->
  <main class="max-w-7xl w-full mx-auto px-4 py-5 flex-1 space-y-8">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      <!-- LEFT 8 COLUMNS (Auto-expands to lg:col-span-12 when both Sidebar Ads #2 & #3 are OFF) -->
      <div id="calculatorMainColumn" class="${bothSidebarOff ? 'lg:col-span-12' : 'lg:col-span-8'} space-y-6">
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
              <div id="kpiMedicareBite" class="text-2xl font-extrabold text-red-600 mt-1">-$36/mo</div>
              <p id="kpiMedicareSub" class="text-xs text-slate-600 mt-1">Takes 32% of your COLA raise</p>
            </div>
            <div class="bg-[#1b4332] text-white rounded-xl p-4 border-2 border-amber-400 shadow-sm">
              <div class="text-xs font-bold uppercase text-amber-300">True Net Social Security</div>
              <div id="kpiNetSS" class="text-2xl font-extrabold text-white mt-1">$2,770/mo</div>
              <p id="kpiNetRaiseSub" class="text-xs text-emerald-200 mt-1">Real net raise: +$76/mo</p>
            </div>
            <div class="bg-amber-50 rounded-xl p-4 border-2 border-amber-500 shadow-sm">
              <div class="text-xs font-bold uppercase text-amber-900">Total Monthly Paycheck</div>
              <div id="kpiTotalPaycheck" class="text-2xl font-extrabold text-slate-900 mt-1">$4,270/mo</div>
              <p id="kpiBudgetSurplus" class="text-xs font-semibold text-emerald-800 mt-1">+$970/mo breathing room</p>
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
                  <label for="colaPctInput" class="block text-xs font-bold text-slate-800">Projected 2027 COLA % (<span id="colaPctVal">3.6</span>%)</label>
                  <input id="colaPctInput" type="range" min="1.5" max="6.0" step="0.1" value="3.6" class="mt-2 w-full" />
                </div>
                <div>
                  <label for="partBIncreaseInput" class="block text-xs font-bold text-slate-800">Part B/D Hike ($/mo/person)</label>
                  <input id="partBIncreaseInput" type="number" value="18" class="mt-1 w-full rounded-lg border-2 border-slate-300 px-3 py-2 font-bold text-sm" />
                </div>
              </div>
              <div class="bg-amber-50 border-l-4 border-amber-500 p-3 rounded-r-xl text-xs">
                <div class="font-bold text-amber-950 flex items-center justify-between">
                  <span>The "86-Cent Dollar" Buying Power Check:</span>
                  <span id="buyingPowerLossBadge" class="font-extrabold">-$434/mo vs 2016</span>
                </div>
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
            <h2 class="text-lg font-extrabold text-slate-900 border-b pb-3">Social Security Claiming Age: 62 vs. 67 (FRA) vs. 70 Break-Even</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label for="fraBenefitInput" class="block text-sm font-bold text-slate-800">Full Retirement Age (67) Benefit ($/mo)</label>
                <input id="fraBenefitInput" type="number" step="50" value="2200" class="mt-1 w-full rounded-lg border-2 border-slate-300 px-3 py-2 font-bold" />
              </div>
              <div>
                <label for="lifeExpInput" class="block text-sm font-bold text-slate-800">Compare Lifetime Payout at Age: <span id="lifeExpVal" class="text-emerald-800 font-extrabold">82</span></label>
                <input id="lifeExpInput" type="range" min="68" max="95" step="1" value="82" class="mt-2 w-full" />
              </div>
            </div>
            <div class="grid grid-cols-3 gap-3 text-center">
              <div class="p-3 rounded-xl bg-amber-50 border-2 border-amber-300">
                <div class="text-xs font-bold uppercase text-amber-900">Claim Early at 62</div>
                <div id="claim62Mo" class="text-xl font-extrabold text-slate-900 mt-1">$1,540/mo</div>
                <div id="claim62Total" class="text-xs font-semibold text-slate-700 mt-1">Total: $369,600</div>
              </div>
              <div class="p-3 rounded-xl bg-emerald-50 border-2 border-emerald-500">
                <div class="text-xs font-bold uppercase text-emerald-900">Claim Full at 67</div>
                <div id="claim67Mo" class="text-xl font-extrabold text-emerald-900 mt-1">$2,200/mo</div>
                <div id="claim67Total" class="text-xs font-semibold text-slate-700 mt-1">Total: $396,000</div>
              </div>
              <div class="p-3 rounded-xl bg-sky-50 border-2 border-sky-400">
                <div class="text-xs font-bold uppercase text-sky-900">Claim Max at 70</div>
                <div id="claim70Mo" class="text-xl font-extrabold text-sky-900 mt-1">$2,728/mo</div>
                <div id="claim70Total" class="text-xs font-semibold text-slate-700 mt-1">Total: $392,832</div>
              </div>
            </div>
            <div class="relative h-60 w-full"><canvas id="breakevenChart"></canvas></div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div class="bg-white rounded-2xl p-5 border-2 border-[#b07d4b] shadow-sm space-y-4">
              <h2 class="text-base font-extrabold text-slate-900 border-b pb-2">Part-Time / Side-Gig Penalty ($24,480 Limit)</h2>
              <div class="grid grid-cols-2 gap-3">
                <div>
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
            <h2 class="text-lg font-extrabold text-slate-900 border-b pb-2">1984 IRS "Ghost Tax" Speedometer &amp; Roth Conversion Sweet Spot</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label for="taxFilingStatus" class="block text-sm font-bold text-slate-800">Tax Filing Status</label>
                <select id="taxFilingStatus" class="mt-1 w-full rounded-lg border-2 border-slate-300 px-3 py-2 font-bold bg-white">
                  <option value="married" selected>Married Filing Jointly ($32K / $44K)</option>
                  <option value="single">Single Individual ($25K / $34K)</option>
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
                <span id="combinedIncomeValue" class="text-2xl font-extrabold text-white">$46,772 / yr</span>
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
              <div class="text-xs font-bold uppercase text-amber-900">2026 SECURE 2.0 Super Catch-Up (Ages 60–63)</div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                <select id="workerAgeSelect" class="rounded-lg border border-slate-300 px-2.5 py-1.5 font-bold text-sm bg-white">
                  <option value="55">Age 50–59 ($8,000 Catch-Up)</option>
                  <option value="61" selected>Age 60–63 ($11,250 Super Catch-Up)</option>
                  <option value="65">Age 64+ ($8,000 Catch-Up)</option>
                </select>
                <div id="superCatchupOutput" class="text-xs text-slate-800 font-semibold"></div>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div class="bg-white rounded-2xl p-5 border-2 border-[#b07d4b] shadow-sm space-y-4">
              <h2 class="text-base font-extrabold text-slate-900 border-b pb-2">Medicare IRMAA &amp; Form SSA-44 Appeal</h2>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label for="irmaa2025Income" class="block text-xs font-bold text-slate-800">2025 Tax Return MAGI ($)</label>
                  <input id="irmaa2025Income" type="number" step="5000" value="230000" class="mt-1 w-full rounded-lg border-2 border-slate-300 px-3 py-2 font-bold" />
                </div>
                <div>
                  <label for="irmaaRetiredEvent" class="block text-xs font-bold text-slate-800">Retired Since 2025?</label>
                  <select id="irmaaRetiredEvent" class="mt-1 w-full rounded-lg border-2 border-slate-300 px-3 py-2 font-bold bg-white">
                    <option value="yes" selected>Yes — Retired / Cut Hours</option>
                    <option value="no">No — Unchanged</option>
                  </select>
                </div>
              </div>
              <div id="irmaaVerdictBox" class="p-4 rounded-xl bg-emerald-50 border-2 border-emerald-500 text-sm space-y-1.5"></div>
            </div>

            <div class="bg-white rounded-2xl p-5 border-2 border-[#b07d4b] shadow-sm space-y-4">
              <h2 class="text-base font-extrabold text-slate-900 border-b pb-2">Age 60–65 Pre-Medicare ACA Bridge</h2>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label for="acaCurrentAge" class="block text-xs font-bold text-slate-800">Current Age (&lt;65):</label>
                  <input id="acaCurrentAge" type="number" min="55" max="64" value="62" class="mt-1 w-full rounded-lg border-2 border-slate-300 px-3 py-1.5 font-bold" />
                </div>
                <div>
                  <label for="acaMagiInput" class="block text-xs font-bold text-slate-800">Planned MAGI ($):</label>
                  <input id="acaMagiInput" type="number" step="2000" value="52000" class="mt-1 w-full rounded-lg border-2 border-slate-300 px-3 py-1.5 font-bold" />
                </div>
              </div>
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
                <input id="locWill" type="text" value="Fireproof safe in master closet, top shelf (Blue binder)" class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium" />
              </div>
              <div>
                <label for="loc401k" class="block text-xs font-bold text-slate-700">401(k) / IRA / Pension Institution Names:</label>
                <input id="loc401k" type="text" value="Fidelity (401k & Roth IRA), Local Credit Union (Bucket 1 Cash)" class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium" />
              </div>
              <div>
                <label for="locInsurance" class="block text-xs font-bold text-slate-700">Medicare Supplement / Life Insurance &amp; Deed Location:</label>
                <input id="locInsurance" type="text" value="Filing cabinet drawer #2 in home study (Green folder)" class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium" />
              </div>
              <div>
                <label for="locContacts" class="block text-xs font-bold text-slate-700">Trusted CPA / Family Contact Name &amp; Phone:</label>
                <input id="locContacts" type="text" value="Local CPA Office & SSA Office (1-800-772-1213)" class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium" />
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- RIGHT 4 COLUMNS: Sticky Right Sidebar for Ad Slots #2 & #3 -->
      <div id="rightAdSidebar" class="${bothSidebarOff ? 'hidden' : 'lg:col-span-4'} lg:sticky lg:top-4 space-y-6 no-print">
        <!-- AD SLOT #2 (#adSlotSidebarRect): Right Sidebar Sticky Slot #1 (300x250 Medium Rectangle) -->
        <aside id="adSlotSidebarRect" aria-label="Advertisement: Right Sidebar Sticky Slot #1" class="no-print bg-[#faf8f2] rounded-2xl p-3 border border-[#d5cbb8] flex flex-col items-center justify-center w-full ${config.sidebarRectEnabled ? '' : 'hidden'}">
          <div class="w-full flex items-center justify-between text-[11px] text-slate-500 font-semibold uppercase tracking-wider pb-2 mb-2 border-b border-slate-200/80">
            <span>Advertisement · Sponsored</span>
          </div>
          <div id="adSlotSidebarRectBody" class="w-full min-h-[250px] flex items-center justify-center"></div>
        </aside>

        <!-- AD SLOT #3 (#adSlotSidebarSky): Right Sidebar Sticky Slot #2 (300x600 Skyscraper / Adsterra Native Banner) -->
        <aside id="adSlotSidebarSky" aria-label="Advertisement: Right Sidebar Sticky Slot #2" class="no-print bg-[#faf8f2] rounded-2xl p-3 border border-[#d5cbb8] flex flex-col items-center justify-center w-full ${config.sidebarSkyscraperEnabled ? '' : 'hidden'}">
          <div class="w-full flex items-center justify-between text-[11px] text-slate-500 font-semibold uppercase tracking-wider pb-2 mb-2 border-b border-slate-200/80">
            <span>Advertisement · Sponsored</span>
          </div>
          <div id="adSlotSidebarSkyBody" class="w-full min-h-[420px] lg:min-h-[540px] flex items-center justify-center"></div>
        </aside>
      </div>
    </div>

    <!-- AD SLOT #4 (#adSlotInContent): In-Content Horizontal Banner between Calculator and YouTube Video Section -->
    <aside id="adSlotInContent" aria-label="Advertisement: In-Content Horizontal Banner" class="no-print bg-[#faf8f2] rounded-2xl p-3 border border-[#d5cbb8] flex flex-col items-center justify-center w-full ${config.inContentBannerEnabled ? '' : 'hidden'}">
      <div class="w-full flex items-center justify-between text-[11px] text-slate-500 font-semibold uppercase tracking-wider pb-2 mb-2 border-b border-slate-200/80">
        <span>Advertisement · Sponsored</span>
      </div>
      <div id="adSlotInContentBody" class="w-full min-h-[110px] flex items-center justify-center"></div>
    </aside>

    <!-- YOUTUBE VIDEO SECTION (#youtubeVideoSection) -->
    <section id="youtubeVideoSection" class="chalkboard-bg rounded-2xl p-6 md:p-8 text-white no-print space-y-5">
      <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-amber-400/30 pb-4">
        <div>
          <div class="text-xs font-bold uppercase tracking-wider text-amber-300">Official YouTube Education Hub · @NoSuitRetirement</div>
          <h2 class="text-xl md:text-2xl font-extrabold text-white mt-1">Watch Plain-English Chalkboard Retirement Breakdowns</h2>
        </div>
        <a
          href="https://www.youtube.com/@NoSuitRetirement"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#FF0000] hover:bg-[#cc0000] text-white font-extrabold text-sm shadow-lg"
        >
          <span>▶ Subscribe on YouTube - NoSuitRetirement</span>
        </a>
      </div>
    </section>
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
        <h2 class="text-xl font-extrabold text-[#1b4332]">🔒 Privacy Policy, Data Safety &amp; Disclaimers</h2>
        <button id="closePrivacyBtn" type="button" class="px-3 py-1 rounded-lg bg-slate-200 hover:bg-slate-300 font-bold text-sm">✕ Close</button>
      </div>
      <p class="text-xs text-slate-700 leading-relaxed">No-Suit Retirement Companion runs 100% locally in your browser. Zero personal data or financial inputs are ever transmitted or stored on external servers.</p>
    </div>
  </div>

  <!-- OWNER PIN LOCK MODAL (#ownerPinModal — Default PIN: 2027) -->
  <div id="ownerPinModal" class="hidden fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4 no-print">
    <div class="bg-white rounded-2xl max-w-sm w-full p-6 border-2 border-[#1b4332] shadow-2xl space-y-4">
      <div class="flex items-center justify-between border-b border-slate-200 pb-2.5">
        <div>
          <div class="text-[11px] font-bold uppercase tracking-wider text-emerald-800">Site Owner Security Lock</div>
          <h3 class="text-lg font-extrabold text-[#1b4332]">Unlock Owner Studio &amp; Ad Manager</h3>
        </div>
        <button id="closeOwnerPinBtn" type="button" class="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer">✕</button>
      </div>
      <form id="ownerPinForm" class="space-y-3 text-xs text-slate-700">
        <label for="ownerPinInput" class="block font-bold text-slate-800">Enter Owner PIN (Default: 2027)</label>
        <input id="ownerPinInput" type="password" placeholder="2027" class="w-full rounded-xl border border-slate-300 px-3 py-2 font-mono text-sm font-bold text-slate-900" />
        <div id="ownerPinError" class="hidden text-xs font-bold text-red-700 bg-red-50 border border-red-200 rounded-lg p-2">
          Incorrect PIN. Default owner PIN is 2027.
        </div>
        <div class="flex justify-end gap-2 pt-1">
          <button id="cancelOwnerPinBtn" type="button" class="px-3.5 py-2 rounded-xl bg-slate-200 text-slate-800 font-bold text-xs cursor-pointer">Cancel</button>
          <button type="submit" class="px-4 py-2 rounded-xl bg-[#1b4332] text-amber-300 font-extrabold text-xs cursor-pointer">Unlock Studio</button>
        </div>
      </form>
    </div>
  </div>

  <!-- OWNER 4-SLOT AD CODE MANAGER & SEO STUDIO MODAL (#channelStudioModal) -->
  <div id="channelStudioModal" class="hidden fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4 no-print">
    <div class="bg-white border-2 border-[#1b4332] rounded-2xl max-w-4xl w-full p-6 max-h-[90vh] overflow-y-auto space-y-5 shadow-2xl">
      <div class="flex justify-between items-center border-b border-slate-200 pb-3">
        <div>
          <div id="activeAdSlotsCountBadge" class="text-xs font-bold uppercase tracking-wider text-emerald-800">
            🔒 Owner-Only Studio · 4 of 4 Ad Slots Active · PIN: 2027
          </div>
          <h2 class="text-xl font-extrabold text-[#1b4332]">Owner 4-Slot Ad Code Manager &amp; Google SEO Studio</h2>
        </div>
        <button id="closeChannelStudioBtn" type="button" class="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-3.5 py-1.5 rounded-lg text-sm cursor-pointer">✕ Close</button>
      </div>

      <!-- 4 Separate Ad Slots with Individual Enable Ad #1–#4 Switches -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div class="p-4 rounded-xl border bg-[#faf8f2] border-[#c5b9a5] space-y-2">
          <div class="flex items-start justify-between gap-2">
            <div>
              <label for="adCodeTopLeaderboard" class="block font-extrabold text-slate-800 uppercase">Ad Slot #1: Top Leaderboard Banner (728×90)</label>
              <p class="text-[11px] text-slate-500">Appears above the calculator (#adSlotTopBanner).</p>
            </div>
            <label class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-extrabold cursor-pointer bg-emerald-700 text-white border-emerald-800">
              <input id="toggleTopLeaderboard" type="checkbox" checked class="w-3.5 h-3.5 accent-amber-400 cursor-pointer" />
              <span id="labelEnableAd1">Enable Ad #1 (ON)</span>
            </label>
          </div>
          <textarea id="adCodeTopLeaderboard" rows="3" placeholder="<!-- Paste Google AdSense 728x90 or Adsterra Leaderboard HTML/JS code here -->" class="w-full rounded-xl border border-slate-300 bg-white p-2.5 font-mono text-xs"></textarea>
        </div>

        <div class="p-4 rounded-xl border bg-[#faf8f2] border-[#c5b9a5] space-y-2">
          <div class="flex items-start justify-between gap-2">
            <div>
              <label for="adCodeSidebarRect" class="block font-extrabold text-slate-800 uppercase">Ad Slot #2: Right Sidebar Sticky Slot #1 (300×250)</label>
              <p class="text-[11px] text-slate-500">Beside calculator inputs (#adSlotSidebarRect).</p>
            </div>
            <label class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-extrabold cursor-pointer bg-emerald-700 text-white border-emerald-800">
              <input id="toggleSidebarRect" type="checkbox" checked class="w-3.5 h-3.5 accent-amber-400 cursor-pointer" />
              <span id="labelEnableAd2">Enable Ad #2 (ON)</span>
            </label>
          </div>
          <textarea id="adCodeSidebarRect" rows="3" placeholder="<!-- Paste AdSense 300x250 or Adsterra Medium Rectangle HTML/JS code here -->" class="w-full rounded-xl border border-slate-300 bg-white p-2.5 font-mono text-xs"></textarea>
        </div>

        <div class="p-4 rounded-xl border bg-[#faf8f2] border-[#c5b9a5] space-y-2">
          <div class="flex items-start justify-between gap-2">
            <div>
              <label for="adCodeSidebarSkyscraper" class="block font-extrabold text-slate-800 uppercase">Ad Slot #3: Right Sidebar Sticky Slot #2 (300×600)</label>
              <p class="text-[11px] text-slate-500">Beside calculator results (#adSlotSidebarSky).</p>
            </div>
            <label class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-extrabold cursor-pointer bg-emerald-700 text-white border-emerald-800">
              <input id="toggleSidebarSkyscraper" type="checkbox" checked class="w-3.5 h-3.5 accent-amber-400 cursor-pointer" />
              <span id="labelEnableAd3">Enable Ad #3 (ON)</span>
            </label>
          </div>
          <textarea id="adCodeSidebarSkyscraper" rows="3" placeholder="<!-- Paste 300x600 Half-Page Skyscraper or Adsterra Native Banner code here -->" class="w-full rounded-xl border border-slate-300 bg-white p-2.5 font-mono text-xs"></textarea>
        </div>

        <div class="p-4 rounded-xl border bg-[#faf8f2] border-[#c5b9a5] space-y-2">
          <div class="flex items-start justify-between gap-2">
            <div>
              <label for="adCodeInContent" class="block font-extrabold text-slate-800 uppercase">Ad Slot #4: In-Content Horizontal Banner</label>
              <p class="text-[11px] text-slate-500">Between Calculator &amp; YouTube (#adSlotInContent).</p>
            </div>
            <label class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-extrabold cursor-pointer bg-emerald-700 text-white border-emerald-800">
              <input id="toggleInContentBanner" type="checkbox" checked class="w-3.5 h-3.5 accent-amber-400 cursor-pointer" />
              <span id="labelEnableAd4">Enable Ad #4 (ON)</span>
            </label>
          </div>
          <textarea id="adCodeInContent" rows="3" placeholder="<!-- Paste In-Article AdSense or Adsterra Horizontal Banner code here -->" class="w-full rounded-xl border border-slate-300 bg-white p-2.5 font-mono text-xs"></textarea>
        </div>
      </div>

      <!-- Google Search Console Verification Input -->
      <div class="p-4 rounded-xl bg-emerald-50 border border-emerald-300 space-y-2 text-xs">
        <label for="gscVerificationInput" class="block font-extrabold text-emerald-950 uppercase">Google Search Console Verification Code (https://nosuitretirement.com/)</label>
        <input id="gscVerificationInput" type="text" value="${cleanGsc}" class="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 font-mono text-xs" />
      </div>

      <div class="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-200">
        <div class="flex flex-wrap items-center gap-2">
          <button id="downloadUpdatedHtmlBtn" type="button" class="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs border border-amber-500 shadow-xs cursor-pointer">
            ⬇ Download Updated Website (.html)
          </button>
          <button id="downloadSitemapBtn" type="button" class="px-3 py-2 rounded-xl bg-[#1b4332] text-amber-300 font-extrabold text-xs cursor-pointer">
            ⬇ Download sitemap.xml
          </button>
          <button id="downloadRobotsBtn" type="button" class="px-3 py-2 rounded-xl bg-slate-800 text-amber-200 font-extrabold text-xs cursor-pointer">
            ⬇ Download robots.txt
          </button>
        </div>
        <button id="saveAdConfigBtn" type="button" class="px-5 py-2 rounded-xl bg-[#1b4332] hover:bg-emerald-900 text-amber-300 font-extrabold text-xs cursor-pointer">
          Save &amp; Apply Ad Settings
        </button>
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
        <span id="footerVersionTapTarget" class="font-bold text-amber-300 select-none cursor-default" title="Tap 5 times for Owner Studio">No-Suit Retirement v2027.4</span>
      </div>
    </div>
  </footer>

  <!-- Baked Owner Ad & SEO Configuration -->
  <script id="bakedOwnerConfigScript">
    window.__BAKED_AD_CONFIG__ = ${serializedConfig};
  </script>

  <script>
    (function () {
      const STORAGE_KEY = 'nosuit_ad_config_v1';
      const OWNER_PIN = '2027';
      let isOwnerUnlocked = new URLSearchParams(window.location.search).get('admin') === 'nosuit';

      let adConfig = Object.assign({}, window.__BAKED_AD_CONFIG__);
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) adConfig = Object.assign({}, adConfig, JSON.parse(saved));
      } catch (e) {}

      const slots = [
        { num: 1, wrapId: 'adSlotTopBanner', bodyId: 'adSlotTopBannerBody', enabledKey: 'topLeaderboardEnabled', codeKey: 'topLeaderboardCode', toggleId: 'toggleTopLeaderboard', labelId: 'labelEnableAd1', inputId: 'adCodeTopLeaderboard', dims: '728 × 90 Leaderboard (Responsive)', title: 'Ad Slot #1: Top Leaderboard Banner' },
        { num: 2, wrapId: 'adSlotSidebarRect', bodyId: 'adSlotSidebarRectBody', enabledKey: 'sidebarRectEnabled', codeKey: 'sidebarRectCode', toggleId: 'toggleSidebarRect', labelId: 'labelEnableAd2', inputId: 'adCodeSidebarRect', dims: '300 × 250 Medium Rectangle', title: 'Ad Slot #2: Right Sidebar Sticky Slot #1' },
        { num: 3, wrapId: 'adSlotSidebarSky', bodyId: 'adSlotSidebarSkyBody', enabledKey: 'sidebarSkyscraperEnabled', codeKey: 'sidebarSkyscraperCode', toggleId: 'toggleSidebarSkyscraper', labelId: 'labelEnableAd3', inputId: 'adCodeSidebarSkyscraper', dims: '300 × 600 Skyscraper / Native Banner', title: 'Ad Slot #3: Right Sidebar Sticky Slot #2' },
        { num: 4, wrapId: 'adSlotInContent', bodyId: 'adSlotInContentBody', enabledKey: 'inContentBannerEnabled', codeKey: 'inContentBannerCode', toggleId: 'toggleInContentBanner', labelId: 'labelEnableAd4', inputId: 'adCodeInContent', dims: 'Responsive Horizontal Banner', title: 'Ad Slot #4: In-Content Horizontal Banner' }
      ];

      function injectHtmlAndScripts(container, rawHtml) {
        container.innerHTML = rawHtml;
        container.querySelectorAll('script').forEach((oldScript) => {
          const s = document.createElement('script');
          Array.from(oldScript.attributes).forEach((attr) => s.setAttribute(attr.name, attr.value));
          s.textContent = oldScript.textContent;
          oldScript.parentNode.replaceChild(s, oldScript);
        });
      }

      function applyAdLayout() {
        slots.forEach((slot) => {
          const wrap = document.getElementById(slot.wrapId);
          const body = document.getElementById(slot.bodyId);
          if (!wrap || !body) return;
          const enabled = Boolean(adConfig[slot.enabledKey]);
          const code = (adConfig[slot.codeKey] || '').trim();

          if (!enabled) {
            wrap.classList.add('hidden');
            body.innerHTML = '';
          } else {
            wrap.classList.remove('hidden');
            if (code) {
              injectHtmlAndScripts(body, code);
            } else {
              body.innerHTML = '<div class="w-full rounded-xl border-2 border-dashed border-[#c5b9a5] bg-[#f4efe2]/70 p-4 text-center"><div class="text-xs font-extrabold uppercase text-[#1b4332]">' + slot.dims + '</div><div class="text-sm font-bold text-slate-800 mt-0.5">' + slot.title + '</div></div>';
            }
          }
        });

        const hasSidebar = Boolean(adConfig.sidebarRectEnabled || adConfig.sidebarSkyscraperEnabled);
        const calcCol = document.getElementById('calculatorMainColumn');
        const rightSidebar = document.getElementById('rightAdSidebar');
        if (calcCol) {
          calcCol.classList.toggle('lg:col-span-8', hasSidebar);
          calcCol.classList.toggle('lg:col-span-12', !hasSidebar);
        }
        if (rightSidebar) {
          rightSidebar.classList.toggle('hidden', !hasSidebar);
        }
      }

      function openOwnerStudio() {
        document.getElementById('ownerTopBarBtn')?.classList.remove('hidden');
        slots.forEach((s) => {
          const toggle = document.getElementById(s.toggleId);
          const label = document.getElementById(s.labelId);
          const input = document.getElementById(s.inputId);
          const isOn = Boolean(adConfig[s.enabledKey]);
          if (toggle) toggle.checked = isOn;
          if (label) label.textContent = 'Enable Ad #' + s.num + ' (' + (isOn ? 'ON' : 'OFF') + ')';
          if (input) {
            input.value = adConfig[s.codeKey] || '';
            input.disabled = !isOn;
          }
        });
        document.getElementById('channelStudioModal')?.classList.remove('hidden');
      }

      if (isOwnerUnlocked) openOwnerStudio();

      window.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'e') {
          e.preventDefault();
          if (isOwnerUnlocked) openOwnerStudio();
          else document.getElementById('ownerPinModal')?.classList.remove('hidden');
        }
      });

      let tapCount = 0;
      let tapTimer = null;
      document.getElementById('footerVersionTapTarget')?.addEventListener('click', () => {
        tapCount++;
        clearTimeout(tapTimer);
        if (tapCount >= 5) {
          tapCount = 0;
          if (isOwnerUnlocked) openOwnerStudio();
          else document.getElementById('ownerPinModal')?.classList.remove('hidden');
          return;
        }
        tapTimer = setTimeout(() => { tapCount = 0; }, 2500);
      });

      document.getElementById('ownerTopBarBtn')?.addEventListener('click', openOwnerStudio);
      document.getElementById('closeChannelStudioBtn')?.addEventListener('click', () => document.getElementById('channelStudioModal')?.classList.add('hidden'));
      document.getElementById('closeOwnerPinBtn')?.addEventListener('click', () => document.getElementById('ownerPinModal')?.classList.add('hidden'));
      document.getElementById('cancelOwnerPinBtn')?.addEventListener('click', () => document.getElementById('ownerPinModal')?.classList.add('hidden'));

      document.getElementById('ownerPinForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const val = (document.getElementById('ownerPinInput')?.value || '').trim();
        if (val === OWNER_PIN) {
          isOwnerUnlocked = true;
          document.getElementById('ownerPinModal')?.classList.add('hidden');
          openOwnerStudio();
        } else {
          document.getElementById('ownerPinError')?.classList.remove('hidden');
        }
      });

      slots.forEach((s) => {
        document.getElementById(s.toggleId)?.addEventListener('change', (e) => {
          const isOn = e.target.checked;
          const label = document.getElementById(s.labelId);
          const input = document.getElementById(s.inputId);
          if (label) label.textContent = 'Enable Ad #' + s.num + ' (' + (isOn ? 'ON' : 'OFF') + ')';
          if (input) input.disabled = !isOn;
        });
      });

      function saveStudioValues() {
        slots.forEach((s) => {
          adConfig[s.enabledKey] = Boolean(document.getElementById(s.toggleId)?.checked);
          adConfig[s.codeKey] = document.getElementById(s.inputId)?.value || '';
        });
        const gscVal = (document.getElementById('gscVerificationInput')?.value || '').trim() || 'YOUR_GSC_CODE';
        adConfig.gscVerificationCode = gscVal;
        const meta = document.getElementById('gscVerificationMeta');
        if (meta) meta.setAttribute('content', gscVal);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(adConfig));
        applyAdLayout();
      }

      document.getElementById('saveAdConfigBtn')?.addEventListener('click', () => {
        saveStudioValues();
        document.getElementById('channelStudioModal')?.classList.add('hidden');
      });

      document.getElementById('downloadUpdatedHtmlBtn')?.addEventListener('click', () => {
        saveStudioValues();
        document.getElementById('channelStudioModal')?.classList.add('hidden');
        const cloneDoc = document.documentElement.cloneNode(true);
        const bakedScript = cloneDoc.querySelector('#bakedOwnerConfigScript');
        if (bakedScript) {
          bakedScript.textContent = '\\n    window.__BAKED_AD_CONFIG__ = ' + JSON.stringify(adConfig, null, 2) + ';\\n  ';
        }
        const blob = new Blob(['<!DOCTYPE html>\\n' + cloneDoc.outerHTML], { type: 'text/html;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'index.html';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      });

      document.getElementById('downloadSitemapBtn')?.addEventListener('click', () => {
        const today = new Date().toISOString().split('T')[0];
        const xml = '<?xml version="1.0" encoding="UTF-8"?>\\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\\n  <url>\\n    <loc>https://nosuitretirement.com/</loc>\\n    <lastmod>' + today + '</lastmod>\\n    <changefreq>weekly</changefreq>\\n    <priority>1.0</priority>\\n  </url>\\n</urlset>';
        const blob = new Blob([xml], { type: 'application/xml;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'sitemap.xml';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      });

      document.getElementById('downloadRobotsBtn')?.addEventListener('click', () => {
        const txt = 'User-agent: *\\nAllow: /\\n\\nSitemap: https://nosuitretirement.com/sitemap.xml\\n';
        const blob = new Blob([txt], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'robots.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      });

      // Calculator, Tabs, Presets, Checklists, and Modals
      const fmt = (n) => '$' + Math.round(n).toLocaleString('en-US');
      const fmtDec = (n) => '$' + Number(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      let colaChart = null;
      let bucketChart = null;

      function updateAllCalculations() {
        const grossSS = parseFloat(document.getElementById('grossSSInput')?.value) || 0;
        const colaPct = parseFloat(document.getElementById('colaSlider')?.value) || 0;
        const partB2026 = parseFloat(document.getElementById('partB2026Input')?.value) || 0;
        const partB2027 = parseFloat(document.getElementById('partB2027Input')?.value) || 0;
        const partD = parseFloat(document.getElementById('partDInput')?.value) || 0;

        const colaSliderLabel = document.getElementById('colaSliderVal');
        if (colaSliderLabel) colaSliderLabel.textContent = colaPct.toFixed(1) + '%';

        const grossRaise = grossSS * (colaPct / 100);
        const newGross2027 = grossSS + grossRaise;
        const partBHike = Math.max(0, partB2027 - partB2026);
        const totalDeduction = partBHike + partD;
        const netRaiseMonthly = grossRaise - totalDeduction;
        const netDeposit2026 = Math.max(0, grossSS - partB2026);
        const netDeposit2027 = Math.max(0, newGross2027 - partB2027 - partD);
        const medicareBitePct = grossRaise > 0 ? Math.min(100, Math.max(0, (totalDeduction / grossRaise) * 100)) : 100;

        const setEl = (id, text) => { const el = document.getElementById(id); if (el) el.textContent = text; };
        setEl('resGrossRaise', '+' + fmtDec(grossRaise) + '/mo');
        setEl('resNewGross', 'New Gross: ' + fmt(newGross2027) + '/mo');
        setEl('resPartBHike', '-' + fmtDec(totalDeduction) + '/mo');
        setEl('resPartBNote', 'Part B +' + fmtDec(partBHike) + ' • Extra ' + fmtDec(partD));
        setEl('resNetRaise', (netRaiseMonthly >= 0 ? '+' : '') + fmtDec(netRaiseMonthly) + '/mo');
        setEl('resAnnualReal', (netRaiseMonthly >= 0 ? '+' : '') + fmt(netRaiseMonthly * 12) + ' / year');
        setEl('medicareBitePctLabel', Math.round(medicareBitePct) + '% Eaten by Medicare');
        const biteBar = document.getElementById('medicareBiteBar');
        if (biteBar) biteBar.style.width = Math.min(100, medicareBitePct) + '%';
        setEl('summaryGrossDeposit', fmt(newGross2027));
        setEl('summaryNetDeposit', fmt(netDeposit2027));
        setEl('printNetSS', fmt(netDeposit2027) + '/mo');

        if (window.Chart) {
          const ctx1 = document.getElementById('colaChartCanvas');
          if (ctx1) {
            if (colaChart) colaChart.destroy();
            colaChart = new Chart(ctx1, {
              type: 'bar',
              data: {
                labels: ['2026 Net Check', '2027 Gross Check', '2027 True Net Check'],
                datasets: [{ data: [Math.round(netDeposit2026), Math.round(newGross2027), Math.round(netDeposit2027)], backgroundColor: ['#64748b', '#f59e0b', '#1b4332'], borderRadius: 8 }]
              },
              options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
            });
          }
        }

        // Tab 2: 3-Bucket Plan
        const savings = parseFloat(document.getElementById('totalSavingsInput')?.value) || 0;
        const expenses = parseFloat(document.getElementById('monthlyExpenseInput')?.value) || 0;
        const swr = parseFloat(document.getElementById('swrSlider')?.value) || 4.5;
        const cashYears = parseFloat(document.getElementById('bucket1YearsInput')?.value) || 2;
        setEl('swrSliderVal', swr.toFixed(1) + '%');

        const portDrawMo = (savings * (swr / 100)) / 12;
        const totalMoIncome = netDeposit2027 + portDrawMo;
        const gap = totalMoIncome - expenses;
        setEl('bResSS', fmt(netDeposit2027) + '/mo');
        setEl('bResPortDraw', fmt(portDrawMo) + '/mo');
        setEl('bResTotalIncome', fmt(totalMoIncome) + '/mo');
        setEl('bResGap', (gap >= 0 ? '+' : '-') + fmt(Math.abs(gap)) + '/mo');
        setEl('bResGapNote', gap >= 0 ? 'Monthly Surplus Cushion' : 'Monthly Budget Shortfall');

        const b1 = Math.min(savings, Math.round(portDrawMo * 12 * cashYears));
        const rem = Math.max(0, savings - b1);
        const b2 = Math.min(rem, Math.round(portDrawMo * 12 * 6));
        const b3 = Math.max(0, savings - b1 - b2);
        const pct = (v) => (savings > 0 ? Math.round((v / savings) * 100) + '% of total' : '0%');
        setEl('bucket1Amt', fmt(b1));
        setEl('bucket1Pct', pct(b1));
        setEl('bucket2Amt', fmt(b2));
        setEl('bucket2Pct', pct(b2));
        setEl('bucket3Amt', fmt(b3));
        setEl('bucket3Pct', pct(b3));
        setEl('printPortDraw', fmt(portDrawMo) + '/mo');
        setEl('printBuckets', 'Cash: ' + fmt(b1) + ' • Bonds: ' + fmt(b2) + ' • Growth: ' + fmt(b3));

        if (window.Chart) {
          const ctx2 = document.getElementById('bucketChartCanvas');
          if (ctx2) {
            if (bucketChart) bucketChart.destroy();
            bucketChart = new Chart(ctx2, {
              type: 'doughnut',
              data: {
                labels: ['Bucket 1: Cash', 'Bucket 2: Income/Bonds', 'Bucket 3: Growth'],
                datasets: [{ data: [b1, b2, b3], backgroundColor: ['#10b981', '#f59e0b', '#1b4332'] }]
              },
              options: { responsive: true, maintainAspectRatio: false, cutout: '62%' }
            });
          }
        }

        // Tab 3: 1984 Ghost Tax & IRMAA
        const status = document.getElementById('filingStatusInput')?.value || 'married';
        const annualSS = parseFloat(document.getElementById('taxAnnualSSInput')?.value) || 0;
        const preTax = parseFloat(document.getElementById('taxPreTaxInput')?.value) || 0;
        const roth = parseFloat(document.getElementById('taxRothInput')?.value) || 0;
        const magi2Yr = parseFloat(document.getElementById('irmaaMagiInput')?.value) || 0;
        const combined = annualSS * 0.5 + preTax;
        const t1 = status === 'married' ? 32000 : 25000;
        const t2 = status === 'married' ? 44000 : 34000;

        setEl('resProvisionalIncome', fmt(combined));
        let zone = '0% Tax-Free Zone';
        if (combined > t2) zone = 'Up to 85% Taxable Zone';
        else if (combined > t1) zone = 'Up to 50% Taxable Zone';
        setEl('resTaxZoneBadge', zone);
        setEl('resTaxZoneExplain', 'Thresholds (' + status + '): ' + fmt(t1) + ' (50% tier) / ' + fmt(t2) + ' (85% tier). Your ' + fmt(roth) + ' Roth withdrawal adds $0 to Provisional Income.');
        setEl('printTaxStatus', 'Combined: ' + fmt(combined) + ' (' + zone + ')');

        const irmaaLimit = status === 'married' ? 212000 : 106000;
        const irmaaBox = document.getElementById('irmaaResultBox');
        if (irmaaBox) {
          if (magi2Yr > irmaaLimit) {
            irmaaBox.innerHTML = '<div class="font-extrabold text-red-900">⚠️ IRMAA Surcharge Alert: 2-Year-Ago MAGI (' + fmt(magi2Yr) + ') Exceeds ' + fmt(irmaaLimit) + '</div><p class="mt-1 text-xs">File <strong>Social Security Form SSA-44</strong> (Work Stoppage / Retirement) to request removal of the Medicare IRMAA surcharge.</p>';
          } else {
            irmaaBox.innerHTML = '<div class="font-extrabold text-emerald-900">✅ Standard Medicare Tier: MAGI (' + fmt(magi2Yr) + ') Is Below ' + fmt(irmaaLimit) + '</div><p class="mt-1 text-xs">No IRMAA surcharge triggered at this income level.</p>';
          }
        }
      }

      const presets = {
        300: { grossSSInput: 2200, colaSlider: 2.8, partB2026Input: 202.9, partB2027Input: 220.0, partDInput: 25, totalSavingsInput: 300000, monthlyExpenseInput: 3100, swrSlider: 4.5, bucket1YearsInput: 2, filingStatusInput: 'single', taxAnnualSSInput: 26400, taxPreTaxInput: 13500, taxRothInput: 3500, irmaaMagiInput: 88000 },
        400: { grossSSInput: 2950, colaSlider: 2.8, partB2026Input: 202.9, partB2027Input: 220.0, partDInput: 42, totalSavingsInput: 400000, monthlyExpenseInput: 4200, swrSlider: 4.5, bucket1YearsInput: 2, filingStatusInput: 'married', taxAnnualSSInput: 37544, taxPreTaxInput: 28000, taxRothInput: 6000, irmaaMagiInput: 195000 },
        500: { grossSSInput: 3800, colaSlider: 2.8, partB2026Input: 202.9, partB2027Input: 220.0, partDInput: 55, totalSavingsInput: 500000, monthlyExpenseInput: 5400, swrSlider: 4.6, bucket1YearsInput: 3, filingStatusInput: 'married', taxAnnualSSInput: 45600, taxPreTaxInput: 34000, taxRothInput: 9000, irmaaMagiInput: 235000 }
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

      document.querySelectorAll('.tab-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          const target = btn.getAttribute('data-tab');
          document.querySelectorAll('.tab-btn').forEach((b) => b.classList.remove('active'));
          btn.classList.add('active');
          document.querySelectorAll('.tab-panel').forEach((panel) => {
            panel.classList.toggle('hidden', panel.id !== target);
          });
          updateAllCalculations();
        });
      });

      ['grossSSInput', 'colaSlider', 'partB2026Input', 'partB2027Input', 'partDInput', 'totalSavingsInput', 'monthlyExpenseInput', 'swrSlider', 'bucket1YearsInput', 'filingStatusInput', 'taxAnnualSSInput', 'taxPreTaxInput', 'taxRothInput', 'irmaaMagiInput'].forEach((id) => {
        document.getElementById(id)?.addEventListener('input', updateAllCalculations);
        document.getElementById(id)?.addEventListener('change', updateAllCalculations);
      });

      document.querySelectorAll('.scam-check').forEach((c) => {
        c.addEventListener('change', () => {
          const count = Array.from(document.querySelectorAll('.scam-check')).filter((x) => x.checked).length;
          const banner = document.getElementById('scamVerdictBanner');
          if (!banner) return;
          if (count > 0) {
            banner.className = 'p-4 rounded-xl bg-red-100 border-2 border-red-600 text-red-950 font-extrabold text-sm';
            banner.textContent = '🚨 HANG UP IMMEDIATELY (' + count + ' Red Flag' + (count > 1 ? 's' : '') + ' Detected): Social Security, Medicare, and the IRS NEVER operate this way.';
          } else {
            banner.className = 'p-4 rounded-xl bg-emerald-50 border-2 border-emerald-500 text-emerald-950 font-bold text-sm';
            banner.textContent = '✅ 0 Red Flags Checked: Check any warning box above if a caller, email, or text message exhibits these behaviors.';
          }
        });
      });

      document.querySelectorAll('.audit-check').forEach((c) => {
        c.addEventListener('change', () => {
          const count = Array.from(document.querySelectorAll('.audit-check')).filter((x) => x.checked).length;
          const badge = document.getElementById('auditProgressBadge');
          if (badge) badge.textContent = count + ' / 5 Completed';
        });
      });

      document.getElementById('largeTextBtn')?.addEventListener('click', () => {
        document.body.classList.toggle('senior-large-mode');
      });
      document.getElementById('openGlossaryBtn')?.addEventListener('click', () => document.getElementById('glossaryModal')?.classList.remove('hidden'));
      document.getElementById('closeGlossaryBtn')?.addEventListener('click', () => document.getElementById('glossaryModal')?.classList.add('hidden'));
      document.getElementById('openPrivacyFooterBtn')?.addEventListener('click', () => document.getElementById('privacyModal')?.classList.remove('hidden'));
      document.getElementById('closePrivacyBtn')?.addEventListener('click', () => document.getElementById('privacyModal')?.classList.add('hidden'));
      document.getElementById('printPlanBtn')?.addEventListener('click', () => window.print());
      document.getElementById('copySummaryBtn')?.addEventListener('click', () => {
        const netSS = document.getElementById('printNetSS')?.textContent || '';
        const draw = document.getElementById('printPortDraw')?.textContent || '';
        const buckets = document.getElementById('printBuckets')?.textContent || '';
        if (navigator.clipboard) {
          navigator.clipboard.writeText('No-Suit Retirement Summary — Net SS: ' + netSS + ' | Safe Draw: ' + draw + ' | ' + buckets).catch(() => {});
        }
      });

      applyAdLayout();
      updateAllCalculations();
    })();
  </script>
</body>
</html>`;
}

