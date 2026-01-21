
import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className = "h-12" }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg viewBox="0 0 100 100" className="h-full w-auto drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="25" width="20" height="50" rx="4" fill="#1b2a4e" />
        <rect x="70" y="25" width="20" height="50" rx="4" fill="#1b2a4e" />
        <path d="M30 35L70 65" stroke="#22c55e" strokeWidth="12" strokeLinecap="round" />
        <path d="M30 65L70 35" stroke="#22c55e" strokeWidth="12" strokeLinecap="round" opacity="0.8" />
      </svg>
      <div className="flex flex-col justify-center leading-tight">
        <span className="text-xl md:text-2xl font-black tracking-tighter text-slate-900 uppercase">
          Net<span className="text-[#22c55e]">Link</span>
        </span>
        <span className="text-[9px] md:text-[10px] font-extrabold text-[#1b2a4e] tracking-[0.25em] uppercase">
          General Solutions
        </span>
      </div>
    </div>
  );
};

export default Logo;
