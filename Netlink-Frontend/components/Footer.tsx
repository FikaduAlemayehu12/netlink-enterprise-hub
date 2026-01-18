
import React from 'react';
import Logo from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 pt-24 pb-12 border-t border-slate-900">
      <div className="container mx-auto px-6 text-center space-y-8">
        <div className="bg-white inline-block p-4 rounded-3xl">
          <Logo className="h-8" />
        </div>
        <p className="text-sm max-w-md mx-auto">
          NetLink General Solutions PLC. The premier provider of enterprise IT infrastructure in Ethiopia.
        </p>
        <div className="pt-8 border-t border-slate-900 text-[10px] font-black uppercase tracking-widest">
          © 2024 NetLink. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
