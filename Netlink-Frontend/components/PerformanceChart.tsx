
import React from 'react';

const PerformanceChart: React.FC<{ data: number[] }> = ({ data }) => {
  if (!data || data.length < 2) return <div className="text-[10px] text-slate-400">N/A</div>;
  const width = 120;
  const height = 40;
  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - (val / 100) * height;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width={width} height={height} className="overflow-visible">
      <polyline fill="none" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" points={points} />
    </svg>
  );
};

export default PerformanceChart;
