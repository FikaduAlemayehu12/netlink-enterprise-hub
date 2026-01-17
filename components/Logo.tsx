
import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className = "h-12" }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg viewBox="0 0 200 120" className="h-full w-auto drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* The Interlocking N and Link concept from the image */}
        {/* Blue 'N' structure */}
        <path d="M40 90L75 30H95L60 90H40Z" fill="#414bb2" />
        <path d="M90 90L125 30H145L110 90H90Z" fill="#414bb2" />
        <path d="M110 90L75 30H95L130 90H110Z" fill="#414bb2" />
        
        {/* Green 'Link' structure (Oval overlapping) */}
        <path d="M45 45C45 39.4772 49.4772 35 55 35H135C140.523 35 145 39.4772 145 45V55C145 60.5228 140.523 65 135 65H55C49.4772 65 45 60.5228 45 55V45Z" stroke="#22c55e" strokeWidth="8" />
        <path d="M55 55C55 49.4772 59.4772 45 65 45H145C150.523 45 155 49.4772 155 55V65C155 70.5228 150.523 75 145 75H65C59.4772 75 55 70.5228 55 65V55Z" stroke="#22c55e" strokeWidth="8" />
      </svg>
      <div className="flex flex-col justify-center">
        <span className="text-2xl font-black tracking-tighter text-[#22c55e] leading-none uppercase">Net Link</span>
        <span className="text-[10px] font-bold text-[#414bb2] tracking-[0.2em] uppercase mt-1">General Solutions</span>
      </div>
    </div>
  );
};

export default Logo;
