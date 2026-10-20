import React from 'react';
import { formatUSD } from '../utils/retirementMath';

interface PaycheckChartProps {
  totalPaycheck: number;
  gogoSpend: number;
  slowgoSpend: number;
  nogoSpend: number;
}

export const PaycheckCashFlowChart: React.FC<PaycheckChartProps> = ({
  totalPaycheck,
  gogoSpend,
  slowgoSpend,
  nogoSpend,
}) => {
  const bars = [
    { label: 'Monthly Paycheck', value: Math.round(totalPaycheck), color: '#1b4332', sub: 'Net SS + Draw' },
    { label: 'Go-Go (60s)', value: Math.round(gogoSpend), color: '#059669', sub: 'Age 62–70' },
    { label: 'Slow-Go (70s)', value: Math.round(slowgoSpend), color: '#d97706', sub: 'Age 71–80' },
    { label: 'No-Go (80s)', value: Math.round(nogoSpend), color: '#0284c7', sub: 'Age 81+' },
  ];

  const maxVal = Math.max(...bars.map((b) => b.value), 1000) * 1.18;

  return (
    <div className="w-full h-64 flex flex-col justify-between pt-2 pb-1 px-2 select-none" data-testid="paycheck-chart">
      <svg viewBox="0 0 560 220" className="w-full h-full overflow-visible" role="img" aria-label="Go-Go, Slow-Go, No-Go Monthly Cash Flow Bar Chart">
        {/* Horizontal grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((t, idx) => {
          const y = 175 - t * 145;
          const val = Math.round(maxVal * t);
          return (
            <g key={idx}>
              <line
                x1={56}
                y1={y}
                x2={540}
                y2={y}
                stroke={t === 0 ? '#94a3b8' : '#e2e8f0'}
                strokeDasharray={t === 0 ? undefined : '4 4'}
                strokeWidth={1}
              />
              <text
                x={48}
                y={y + 4}
                textAnchor="end"
                fill="#64748b"
                fontSize="11"
                fontFamily="JetBrains Mono, monospace"
              >
                ${(val / 1000).toFixed(1)}k
              </text>
            </g>
          );
        })}

        {/* Bars */}
        {bars.map((bar, i) => {
          const barWidth = 76;
          const gap = (484 - bars.length * barWidth) / (bars.length + 1);
          const x = 56 + gap + i * (barWidth + gap);
          const barHeight = Math.max(6, (bar.value / maxVal) * 145);
          const y = 175 - barHeight;

          return (
            <g key={bar.label}>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                rx={8}
                fill={bar.color}
              />
              <text
                x={x + barWidth / 2}
                y={y - 8}
                textAnchor="middle"
                fill="#0f172a"
                fontSize="12"
                fontWeight="700"
                fontFamily="JetBrains Mono, monospace"
              >
                {formatUSD(bar.value)}
              </text>
              <text
                x={x + barWidth / 2}
                y={194}
                textAnchor="middle"
                fill="#1e293b"
                fontSize="11.5"
                fontWeight="700"
              >
                {bar.label}
              </text>
              <text
                x={x + barWidth / 2}
                y={210}
                textAnchor="middle"
                fill="#64748b"
                fontSize="10"
              >
                {bar.sub}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

interface BreakevenChartProps {
  series: Array<{
    age: number;
    claim62: number;
    claim67: number;
    claim70: number;
  }>;
  targetAge: number;
}

export const BreakevenLineChart: React.FC<BreakevenChartProps> = ({ series, targetAge }) => {
  const maxVal = Math.max(
    ...series.flatMap((d) => [d.claim62, d.claim67, d.claim70]),
    100000
  ) * 1.1;

  const plotLeft = 64;
  const plotRight = 540;
  const plotTop = 20;
  const plotBottom = 175;
  const plotWidth = plotRight - plotLeft;
  const plotHeight = plotBottom - plotTop;

  const getX = (index: number) =>
    plotLeft + (index / Math.max(1, series.length - 1)) * plotWidth;
  const getY = (val: number) =>
    plotBottom - (Math.max(0, val) / maxVal) * plotHeight;

  const makePath = (key: 'claim62' | 'claim67' | 'claim70') =>
    series
      .map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i).toFixed(1)} ${getY(d[key]).toFixed(1)}`)
      .join(' ');

  return (
    <div className="w-full h-64 flex flex-col justify-between pt-2 pb-1 px-2 select-none" data-testid="breakeven-chart">
      <div className="flex flex-wrap items-center justify-end gap-4 text-xs px-2 pb-1">
        <span className="inline-flex items-center gap-1.5 font-bold text-amber-800">
          <span className="w-3 h-1 rounded bg-[#d97706] inline-block" /> Claim at 62
        </span>
        <span className="inline-flex items-center gap-1.5 font-bold text-emerald-900">
          <span className="w-3 h-1 rounded bg-[#1b4332] inline-block" /> Claim at 67 (FRA)
        </span>
        <span className="inline-flex items-center gap-1.5 font-bold text-sky-800">
          <span className="w-3 h-1 rounded bg-[#0284c7] inline-block" /> Claim at 70
        </span>
      </div>
      <svg viewBox="0 0 560 205" className="w-full h-full overflow-visible" role="img" aria-label="Social Security Claiming Age Cumulative Payout Chart">
        {[0, 0.25, 0.5, 0.75, 1].map((t, idx) => {
          const y = plotBottom - t * plotHeight;
          const val = Math.round((maxVal * t) / 1000);
          return (
            <g key={idx}>
              <line
                x1={plotLeft}
                y1={y}
                x2={plotRight}
                y2={y}
                stroke={t === 0 ? '#94a3b8' : '#e2e8f0'}
                strokeDasharray={t === 0 ? undefined : '4 4'}
                strokeWidth={1}
              />
              <text
                x={plotLeft - 8}
                y={y + 4}
                textAnchor="end"
                fill="#64748b"
                fontSize="11"
                fontFamily="JetBrains Mono, monospace"
              >
                ${val}k
              </text>
            </g>
          );
        })}

        {/* Lines */}
        <path d={makePath('claim62')} fill="none" stroke="#d97706" strokeWidth={3} strokeLinecap="round" />
        <path d={makePath('claim67')} fill="none" stroke="#1b4332" strokeWidth={3} strokeLinecap="round" />
        <path d={makePath('claim70')} fill="none" stroke="#0284c7" strokeWidth={3} strokeLinecap="round" />

        {/* Data points & X-axis labels */}
        {series.map((d, i) => {
          const x = getX(i);
          const isCloseToTarget = Math.abs(d.age - targetAge) <= 2;
          return (
            <g key={d.age}>
              <circle cx={x} cy={getY(d.claim62)} r={isCloseToTarget ? 5 : 3.5} fill="#d97706" stroke="#fff" strokeWidth={1.5} />
              <circle cx={x} cy={getY(d.claim67)} r={isCloseToTarget ? 5 : 3.5} fill="#1b4332" stroke="#fff" strokeWidth={1.5} />
              <circle cx={x} cy={getY(d.claim70)} r={isCloseToTarget ? 5 : 3.5} fill="#0284c7" stroke="#fff" strokeWidth={1.5} />
              <text
                x={x}
                y={195}
                textAnchor="middle"
                fill="#334155"
                fontSize="11"
                fontWeight="600"
              >
                Age {d.age}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};
