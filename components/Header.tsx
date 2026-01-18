
import React, { useState, useEffect } from 'react';
import { Menu, X, LogIn } from 'lucide-react';
import Logo from './Logo';
import { NAV_ITEMS } from '../constants';

interface HeaderProps {
  onNavigate: (path: string) => void;
  onLoginClick: () => void;
  activePath: string;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, onLoginClick, activePath }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'glass py-2 shadow-sm' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="cursor-pointer" onClick={() => onNavigate('/')}>
          <Logo className="h-10 md:h-12" />
        </div>
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.path}
              onClick={() => onNavigate(item.path)}
              className={`text-sm font-bold transition-all hover:text-[#22c55e] relative py-1 ${activePath === item.path ? 'text-[#22c55e]' : 'text-slate-700'}`}
            >
              {item.label}
              {activePath === item.path && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#22c55e] rounded-full" />
              )}
            </button>
          ))}
          <button 
            onClick={onLoginClick}
            className="bg-slate-900 text-white p-2.5 rounded-full hover:bg-slate-700 transition-all shadow-lg"
          >
            <LogIn size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
