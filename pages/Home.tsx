
import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronRight, Zap, ShieldCheck, Calendar, Monitor, Radio, Activity, Sun, Moon, TreePine, PlayCircle } from 'lucide-react';
import { SOCIAL_LINKS } from '../constants';
import { getOwnerData, getNews } from '../services/mockDataService';

const SNAPSHOTS = [
  { url: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&q=80&w=1600", label: "Nature Beauty", category: "WILDLIFE" },
  { url: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&q=80&w=1600", label: "Savannah Zoo", category: "ZOO" },
  { url: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&q=80&w=1600", label: "Supernatural Sunset", category: "SUNSET" },
  { url: "https://images.unsplash.com/photo-1522030239044-12f91ef1135b?auto=format&fit=crop&q=80&w=1600", label: "Lunar Fidelity", category: "MOON" },
  { url: "https://images.unsplash.com/photo-1550751827-44bd374c3f58?auto=format&fit=crop&q=80&w=1600", label: "Tech Core Hub", category: "INFRASTRUCTURE" },
];

const Home: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const [owner, setOwner] = useState(getOwnerData());
  const [news, setNews] = useState(getNews());
  const [snapshotIndex, setSnapshotIndex] = useState(0);

  useEffect(() => {
    const newsInterval = setInterval(() => {
      setOwner(getOwnerData());
      setNews(getNews());
    }, 5000);

    const snapshotInterval = setInterval(() => {
      setSnapshotIndex(prev => (prev + 1) % SNAPSHOTS.length);
    }, 5000);

    return () => {
      clearInterval(newsInterval);
      clearInterval(snapshotInterval);
    };
  }, []);

  const posters = news.filter(n => n.type === 'Poster' || n.type === 'Ad');

  const nextSnapshot = () => setSnapshotIndex(prev => (prev + 1) % SNAPSHOTS.length);

  return (
    <div className="relative">
      {/* MINIMALIST HERO SECTION */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-white pt-20">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50 skew-x-[-15deg] translate-x-32 z-0 hidden lg:block" />
        
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center relative z-10">
          <div className="space-y-12 animate-in slide-in-from-left duration-1000">
            <div className="inline-flex items-center gap-3 bg-blue-50 border border-blue-100 px-6 py-2.5 rounded-full shadow-sm">
              <Zap className="w-4 h-4 text-blue-600 animate-pulse" />
              <span className="text-blue-900 text-[10px] font-black uppercase tracking-[0.25em]">Precision Technology</span>
            </div>
            
            <h1 className="text-7xl md:text-[8.5rem] font-black text-slate-900 leading-[0.82] tracking-tighter uppercase">
              Vision <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-emerald-500 to-blue-700">Excellence.</span>
            </h1>
            
            <p className="text-2xl text-slate-600 leading-relaxed max-w-xl font-medium">
              NetLink General Solutions: Engineering Ethiopia's digital future with world-class infrastructure and high-fidelity visual technology.
            </p>

            <div className="flex flex-wrap gap-6 pt-4">
              <button onClick={() => onNavigate('/contact')} className="bg-slate-900 text-white px-12 py-6 rounded-3xl font-black text-xl shadow-[0_30px_60px_-15px_rgba(15,23,42,0.4)] hover:scale-105 transition-all flex items-center gap-4 group">
                Connect <ArrowRight className="w-7 h-7 group-hover:translate-x-2 transition-transform" />
              </button>
              <button onClick={() => onNavigate('/services')} className="px-12 py-6 rounded-3xl font-black text-xl text-slate-800 hover:bg-slate-100 transition-all border-2 border-slate-100">
                Services
              </button>
            </div>
          </div>

          <div className="relative group">
             {/* DYNAMIC 4K STREAM HUB - CLICKS TO CHANGE */}
             <div 
                onClick={nextSnapshot}
                className="rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] border-[15px] border-white relative z-10 aspect-square lg:scale-110 cursor-pointer active:scale-95 transition-transform duration-300"
             >
                <img 
                  key={SNAPSHOTS[snapshotIndex].url}
                  src={SNAPSHOTS[snapshotIndex].url} 
                  alt={SNAPSHOTS[snapshotIndex].label} 
                  className="w-full h-full object-cover animate-in fade-in duration-1000" 
                />
                
                {/* DYNAMIC MOTION OVERLAYS */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/30" />
                
                {/* Observation Scan Line */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
                   <div className="w-full h-1 bg-blue-500 blur-sm shadow-[0_0_15px_#3b82f6] animate-scan" />
                </div>

                {/* Status UI Labels */}
                <div className="absolute top-12 left-12 flex flex-col gap-4">
                   <div className="bg-white text-slate-900 px-6 py-2.5 rounded-2xl flex items-center gap-3 shadow-2xl">
                      <PlayCircle size={16} className="text-blue-600 animate-spin-slow" />
                      <span className="text-[11px] font-black uppercase tracking-[0.2em]">LIVE: {SNAPSHOTS[snapshotIndex].category}</span>
                   </div>
                   <div className="bg-white/10 backdrop-blur-xl border border-white/20 text-white px-5 py-2.5 rounded-2xl flex items-center gap-3">
                      <Sun size={14} className="text-yellow-400" />
                      <span className="text-[10px] font-black tracking-widest uppercase">Fidelity: Peak</span>
                   </div>
                </div>

                <div className="absolute bottom-12 right-12 text-right">
                   <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl inline-block border border-white/10 mb-2">
                      <span className="text-white text-[10px] font-black uppercase">{SNAPSHOTS[snapshotIndex].label}</span>
                   </div>
                   <p className="text-white text-[9px] font-black uppercase tracking-[0.4em]">Supernatural Force</p>
                   <p className="text-5xl font-black text-white leading-none mt-1">4K HDR</p>
                </div>
             </div>
             
             {/* FLOATING STATUS */}
             <div className="absolute -top-12 -right-12 bg-white p-12 rounded-[4rem] shadow-2xl z-30 border-8 border-slate-50 flex flex-col items-center animate-bounce-slow">
                <Moon className="w-14 h-14 text-blue-900 mb-2" />
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global</p>
                <p className="text-xl font-black text-slate-900">FIDELITY</p>
             </div>
          </div>
        </div>
      </section>

      {/* CORE CAPABILITIES */}
      <section className="py-44 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-3 gap-20">
             <div className="space-y-8 group">
                <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-500/30 group-hover:scale-110 transition-transform">
                   <Monitor className="w-10 h-10" />
                </div>
                <h3 className="text-4xl font-black uppercase tracking-tight leading-none">Ultra-HD <br /><span className="text-blue-500">Visuals.</span></h3>
                <p className="text-slate-400 font-medium text-lg leading-relaxed">Capturing snapshots—from wildlife sanctuaries to high-tech server rooms in pure 4K.</p>
             </div>

             <div className="space-y-8 group">
                <div className="w-20 h-20 bg-emerald-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-emerald-500/30 group-hover:scale-110 transition-transform">
                   <TreePine className="w-10 h-10" />
                </div>
                <h3 className="text-4xl font-black uppercase tracking-tight leading-none">Nature <br /><span className="text-emerald-500">Observation.</span></h3>
                <p className="text-slate-400 font-medium text-lg leading-relaxed">Integrated streaming for national parks and zoos, delivering nature's beauty to any device globally.</p>
             </div>

             <div className="space-y-8 group">
                <div className="w-20 h-20 bg-slate-800 rounded-3xl flex items-center justify-center shadow-2xl border border-white/10 group-hover:scale-110 transition-transform">
                   <Activity className="w-10 h-10 text-blue-400" />
                </div>
                <h3 className="text-4xl font-black uppercase tracking-tight leading-none">Tech <br /><span className="text-slate-400">Hub Core.</span></h3>
                <p className="text-slate-400 font-medium text-lg leading-relaxed">Deep-learning telemetry for habitat monitoring and environmental tracking with enterprise-grade precision.</p>
             </div>
          </div>
        </div>
      </section>

      {/* ADS & POSTERS */}
      <section className="py-40 bg-white">
        <div className="container mx-auto px-6">
           <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
             <div className="space-y-4">
               <h2 className="text-6xl font-black text-slate-900 uppercase tracking-tighter">Corporate <br /> <span className="text-blue-600">Marketing Hub.</span></h2>
               <p className="text-xl text-slate-500 font-medium max-w-lg">Official posters and tech bulletins from our innovation command center.</p>
             </div>
             <button onClick={() => onNavigate('/services')} className="flex items-center gap-4 text-xl font-black text-slate-900 uppercase tracking-widest hover:text-blue-600 transition-all group">
               View All <ChevronRight className="group-hover:translate-x-3 transition-transform" />
             </button>
           </div>
           
           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-14">
              {posters.map((post) => (
                <div key={post.id} className="bg-slate-50 rounded-[4rem] p-12 border-2 border-transparent hover:border-blue-100 hover:bg-white hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] transition-all duration-500 group">
                   <div className="aspect-[4/3] bg-white rounded-[2.5rem] mb-12 flex items-center justify-center text-slate-200 overflow-hidden relative shadow-inner">
                      {post.image ? (
                        <img src={post.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={post.title} />
                      ) : (
                        <Monitor size={80} className="text-slate-100" />
                      )}
                      <div className="absolute top-8 left-8">
                        <span className="px-6 py-2.5 bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full shadow-lg">
                          {post.type}
                        </span>
                      </div>
                   </div>
                   <h3 className="text-3xl font-black mb-6 group-hover:text-blue-600 transition-colors tracking-tight">{post.title}</h3>
                   <p className="text-slate-500 font-medium mb-12 text-lg leading-relaxed line-clamp-3">{post.content}</p>
                   <div className="pt-10 border-t border-slate-200 flex justify-between items-center">
                      <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{post.date}</span>
                      <div className="flex gap-6">
                         <a href={SOCIAL_LINKS.telegram} target="_blank" className="text-slate-300 hover:text-blue-500 transition-all hover:scale-125"><Radio size={24} /></a>
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* CEO SECTION WITH OFFICIAL PORTRAIT */}
      <section className="py-44 bg-[#0f172a] text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/10 blur-[150px] rounded-full" />
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-32 items-center">
           <div className="space-y-12 relative z-10">
              <span className="text-emerald-400 text-xs font-black uppercase tracking-[0.6em] flex items-center gap-4">
                <div className="w-12 h-0.5 bg-emerald-400/30" /> Leadership Philosophy
              </span>
              <h2 className="text-6xl md:text-9xl font-black leading-[0.85] tracking-tighter uppercase">Founders <br /> <span className="text-slate-600">Identity.</span></h2>
              <p className="text-3xl text-slate-300 font-medium italic leading-relaxed tracking-tight border-l-4 border-blue-600 pl-12">
                "{owner.bio}"
              </p>
              <div className="pt-12 flex items-center gap-10">
                 <div className="w-24 h-0.5 bg-slate-800" />
                 <div>
                    <p className="text-4xl font-black tracking-tight">{owner.name}</p>
                    <p className="text-emerald-400 font-black text-xs uppercase tracking-[0.4em] mt-1">{owner.role}</p>
                 </div>
              </div>
           </div>
           <div className="relative group perspective-1000">
             <div className="absolute -inset-10 bg-blue-600/20 rounded-[7rem] blur-[120px] group-hover:bg-blue-600/40 transition-all duration-700" />
             <img 
               src={owner.image} 
               className="relative z-10 w-full aspect-square object-cover rounded-[5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.6)] grayscale hover:grayscale-0 transition-all duration-1000 transform hover:scale-[1.03]" 
               alt={owner.name}
             />
             <div className="absolute -bottom-12 -left-12 bg-white text-slate-900 p-10 rounded-[3.5rem] z-20 shadow-2xl border-4 border-blue-50">
               <p className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-600 mb-2">Since</p>
               <p className="text-4xl font-black">2024</p>
             </div>
           </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
