
import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight, Phone, Mail, MapPin, Linkedin, Send, Facebook, Instagram, LogIn, LayoutDashboard } from 'lucide-react';
import { NAV_ITEMS, SOCIAL_LINKS } from '../constants';
import Logo from './Logo';

interface LayoutProps {
  children: React.ReactNode;
  activePath: string;
  onNavigate: (path: string) => void;
  isDashboard?: boolean;
  onLoginClick: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activePath, onNavigate, isDashboard, onLoginClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isDashboard) return <>{children}</>;

  return (
    <div className="min-h-screen flex flex-col selection:bg-green-100 selection:text-green-900">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'glass py-2 shadow-sm' : 'bg-transparent py-4'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div 
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={() => onNavigate('/')}
          >
            <Logo className="h-10 md:h-12" />
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.path}
                onClick={() => onNavigate(item.path)}
                className={`text-sm font-bold transition-all hover:text-[#22c55e] relative py-1 ${activePath === item.path ? 'text-[#22c55e]' : 'text-slate-700'}`}
              >
                {item.label}
                {activePath === item.path && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#22c55e] rounded-full animate-in fade-in zoom-in duration-300" />
                )}
              </button>
            ))}
            <div className="flex gap-3">
              <button 
                onClick={onLoginClick}
                className="bg-slate-900 text-white p-2.5 rounded-full hover:bg-slate-700 transition-all"
                title="Staff Login"
              >
                <LogIn size={20} />
              </button>
              <button 
                onClick={() => onNavigate('/contact')}
                className="bg-[#414bb2] text-white px-7 py-2.5 rounded-full text-sm font-black hover:bg-blue-800 transition-all shadow-lg shadow-blue-200/50 hover:-translate-y-0.5"
              >
                Get a Quote
              </button>
            </div>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-slate-800 p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 z-40 bg-white p-8 animate-in slide-in-from-right duration-300">
            <div className="flex justify-between items-center mb-12">
              <Logo className="h-10" />
              <button onClick={() => setIsMenuOpen(false)} className="p-2"><X size={32} /></button>
            </div>
            <div className="flex flex-col gap-6">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.path}
                  onClick={() => {
                    onNavigate(item.path);
                    setIsMenuOpen(false);
                  }}
                  className={`text-3xl font-black text-left ${activePath === item.path ? 'text-[#22c55e]' : 'text-slate-800'}`}
                >
                  {item.label}
                </button>
              ))}
              <div className="grid gap-4 mt-8">
                <button 
                  onClick={() => {onLoginClick(); setIsMenuOpen(false)}}
                  className="bg-slate-100 text-slate-900 py-5 rounded-2xl text-xl font-bold flex items-center justify-center gap-3"
                >
                  <LogIn size={24} /> Staff Portal
                </button>
                <button 
                  onClick={() => {
                    onNavigate('/contact');
                    setIsMenuOpen(false);
                  }}
                  className="bg-[#414bb2] text-white py-5 rounded-2xl text-xl font-bold shadow-xl"
                >
                  Request Quote
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 pt-24 pb-12 border-t border-slate-900">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          <div className="space-y-8">
            <div className="bg-white inline-block p-4 rounded-3xl">
              <Logo className="h-10" />
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              Established in 2024, NetLink is revolutionizing Ethiopia's IT sector with world-class infrastructure and innovative software solutions.
            </p>
          </div>

          <div className="space-y-8">
            <h4 className="text-white font-black uppercase tracking-widest text-xs">Platform</h4>
            <ul className="space-y-4 text-sm font-medium">
              {NAV_ITEMS.map((item) => (
                <li key={item.path}>
                  <button onClick={() => onNavigate(item.path)} className="hover:text-[#22c55e] flex items-center gap-2 transition-all hover:translate-x-1">
                    <ChevronRight className="w-4 h-4 text-[#22c55e]" /> {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-8">
            <h4 className="text-white font-black uppercase tracking-widest text-xs">Core Services</h4>
            <ul className="space-y-4 text-sm font-medium">
              {['Networking', 'Software', 'CCTV', 'Electrical', 'Smart IoT'].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-800" /> {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-8">
            <h4 className="text-white font-black uppercase tracking-widest text-xs">Headquarters</h4>
            <ul className="space-y-5 text-sm">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center border border-slate-800 shrink-0">
                  <MapPin className="w-5 h-5 text-[#22c55e]" />
                </div>
                <span className="pt-2">Bole, Addis Ababa,<br />Ethiopia</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center border border-slate-800 shrink-0">
                  <Phone className="w-5 h-5 text-blue-500" />
                </div>
                <span>{SOCIAL_LINKS.phone1}</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-6 mt-24 pt-10 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-[0.2em]">
          <p>© 2024 NetLink General Solutions PLC. World-Class IT Systems.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
