
import React from 'react';

const PerformanceChart: React.FC<{ data: number[] }> = ({ data }) => {
  if (!data || data.length < 2) return <div className="text-[10px] text-slate-400">N/A</div>;
  const width = 120;
  const height = 40;
  const max = 100;
  const min = 0;
  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((val - min) / (max - min)) * height;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width={width} height={height} className="overflow-visible">
      <defs>
        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline 
        fill="none" 
        stroke="#3b82f6" 
        strokeWidth="3" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        points={points} 
      />
      <circle cx={points.split(' ').pop()?.split(',')[0]} cy={points.split(' ').pop()?.split(',')[1]} r="4" fill="#3b82f6" />
    </svg>
  );
};

export default PerformanceChart;
