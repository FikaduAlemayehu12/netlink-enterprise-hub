
import React, { useState, useEffect } from 'react';
import { ChevronRight, ArrowRight, Shield, Zap, Globe, PlayCircle, Star, Send, ClipboardList, Camera, Award, Calendar, Trophy, Crown } from 'lucide-react';
import { SERVICES, STATS, SOCIAL_LINKS } from '../constants';
import { getOwnerData, getAppreciation, getNews } from '../services/mockDataService';

const Home: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const [owner, setOwner] = useState(getOwnerData());
  const [appreciation, setAppreciation] = useState(getAppreciation());
  const [news, setNews] = useState(getNews());

  useEffect(() => {
    const interval = setInterval(() => {
      setOwner(getOwnerData());
      setAppreciation(getAppreciation());
      setNews(getNews());
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-[100vh] flex items-center overflow-hidden pt-20">
        <div className="absolute top-0 left-0 w-full h-full -z-10 bg-slate-50">
          <div className="absolute -top-1/4 -right-1/4 w-[60%] h-full bg-green-50/60 rounded-full blur-[160px] animate-pulse" />
          <div className="absolute -bottom-1/4 -left-1/4 w-[60%] h-full bg-blue-50/60 rounded-full blur-[160px] animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10 animate-in slide-in-from-left duration-1000">
            <div className="inline-flex items-center gap-3 bg-white border border-slate-200 px-5 py-2 rounded-full shadow-sm">
              <span className="text-slate-800 text-[10px] font-black uppercase tracking-[0.2em]">Addis Ababa's IT Hub</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black text-slate-900 leading-[0.95] tracking-tight">
              Design. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22c55e] to-[#414bb2]">Build.</span> <br />
              Connect.
            </h1>
            
            <p className="text-xl text-slate-600 leading-relaxed max-w-xl font-medium">
              NetLink General Solutions: Your partner for <strong>CCTV (Hikvision)</strong>, <strong>Full Electricity Finishing</strong>, and <strong>Any Software Project</strong>.
            </p>

            <div className="flex flex-wrap gap-5">
              <button onClick={() => onNavigate('/contact')} className="group relative bg-[#414bb2] text-white px-10 py-5 rounded-2xl font-black text-lg shadow-2xl shadow-blue-200">
                <span className="relative z-10 flex items-center gap-3">Start Your Project <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" /></span>
              </button>
            </div>
          </div>

          <div className="relative animate-in zoom-in duration-1000 delay-200">
             <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
                <img src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=1200" alt="Worksite" className="w-full aspect-video object-cover" />
             </div>
             <div className="absolute -top-12 -left-12 glass p-6 rounded-[2rem] shadow-2xl">
                <Camera className="w-10 h-10 text-green-500 mb-2" />
                <h4 className="font-black text-xs uppercase tracking-widest text-slate-800">Hikvision Partner</h4>
             </div>
          </div>
        </div>
      </section>

      {/* Dynamic News Feed */}
      <section className="py-24 bg-white border-y">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center mb-12">
             <h2 className="text-3xl font-black text-slate-900">Latest Updates & Events</h2>
             <div className="h-0.5 flex-grow mx-8 bg-slate-100 rounded-full" />
             <div className="flex items-center gap-3 text-xs font-black uppercase text-[#22c55e] tracking-widest">
                <Calendar size={18} /> Daily Feed
             </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {news.slice(0, 3).map(item => (
              <div key={item.id} className="p-8 bg-slate-50 rounded-[2.5rem] hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-slate-100 group">
                <span className="text-[10px] font-black uppercase text-blue-600 tracking-widest">{item.type}</span>
                <h3 className="text-xl font-black mt-2 mb-4 group-hover:text-blue-600 transition-colors">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.content}</p>
                <div className="mt-6 pt-6 border-t border-slate-200 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  {item.date} • POSTED BY {item.author}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Champion's Hall of Fame Appreciation Section */}
      <section className="py-32 bg-slate-950 text-white overflow-hidden relative border-y-8 border-yellow-500/10">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        
        {/* Floating background icons */}
        <div className="absolute top-20 left-20 opacity-5 animate-pulse">
           <Trophy size={200} />
        </div>
        <div className="absolute bottom-20 right-20 opacity-5 animate-pulse" style={{ animationDelay: '1s' }}>
           <Award size={180} />
        </div>

        <div className="container mx-auto px-6 relative z-10">
           <div className="text-center mb-20 space-y-4">
              <Award className="w-16 h-16 text-yellow-500 mx-auto mb-6 animate-bounce" />
              <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-none">Hall of <span className="text-yellow-500">Excellence</span></h2>
              <p className="text-blue-200 text-xl font-medium">NetLink Quarterly Appreciation Spotlight</p>
           </div>
           
           <div className="max-w-6xl mx-auto bg-white/5 backdrop-blur-3xl rounded-[5rem] p-12 md:p-20 border border-white/10 shadow-[0_0_100px_rgba(234,179,8,0.1)] relative overflow-hidden group">
              <div className="grid lg:grid-cols-12 gap-16 items-center">
                
                {/* The Champion's Frame Styling */}
                <div className="lg:col-span-5 relative">
                  <div className="absolute -inset-10 bg-yellow-500/20 rounded-full blur-[100px] animate-pulse" />
                  <div className="relative z-10 p-3 bg-gradient-to-tr from-yellow-700 via-yellow-400 to-yellow-700 rounded-full shadow-[0_0_80px_rgba(234,179,8,0.3)] transform transition-transform duration-700 group-hover:scale-105">
                     <div className="bg-slate-900 p-2 rounded-full overflow-hidden">
                        <img src={appreciation.photo} className="w-full aspect-square rounded-full object-cover filter brightness-110" />
                     </div>
                     {/* Overlay Badge */}
                     <div className="absolute -bottom-6 -right-6 bg-yellow-500 text-slate-950 p-5 rounded-[2rem] shadow-2xl border-4 border-slate-950 flex items-center justify-center transform group-hover:rotate-12 transition-all">
                        <Trophy size={40} strokeWidth={2.5} />
                     </div>
                     {/* Header Crown */}
                     <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-yellow-500 text-slate-950 p-2 px-6 rounded-full font-black text-xs uppercase tracking-[0.3em] border-4 border-slate-950 shadow-xl">
                        CHAMPION
                     </div>
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
                  <div className="space-y-4">
                    <div className="flex items-center justify-center lg:justify-start gap-4">
                       <span className="w-12 h-[1px] bg-yellow-500/50" />
                       <span className="text-yellow-400 font-black text-sm uppercase tracking-[0.5em]">Employee of the Quarter</span>
                       <span className="w-12 h-[1px] bg-yellow-500/50" />
                    </div>
                    <h3 className="text-5xl md:text-8xl font-black tracking-tighter text-white leading-none">
                       {appreciation.name}
                    </h3>
                    <p className="text-blue-300 font-black text-2xl uppercase tracking-tight italic">
                       {appreciation.achievement}
                    </p>
                  </div>

                  <div className="bg-white/5 p-8 rounded-[3rem] border border-white/10 space-y-6 relative">
                     <div className="absolute top-0 right-0 p-6 text-white/10"><Crown size={40} /></div>
                     <p className="text-slate-300 text-xl font-medium leading-relaxed italic">
                        "Recognizing consistent professionalism and technical superiority. At NetLink, excellence isn't just a goal—it's our baseline. Thank you for setting the standard."
                     </p>
                     <div className="flex flex-wrap gap-4 items-center justify-center lg:justify-start">
                        <div className="bg-yellow-500 text-slate-950 px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest">
                           {appreciation.period}
                        </div>
                        <div className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-widest">
                           <Shield size={16} className="text-blue-500" /> Professional Verified
                        </div>
                     </div>
                  </div>
                </div>
              </div>
           </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-40 bg-slate-50">
        <div className="container mx-auto px-6">
           <div className="grid lg:grid-cols-2 gap-24 items-center">
              <div className="relative">
                 <img src={owner.image} alt="Founder" className="relative z-10 rounded-[4rem] shadow-2xl h-[600px] w-full object-cover" />
                 <div className="absolute -bottom-10 -left-10 z-20 glass p-8 rounded-[3rem] shadow-2xl max-w-sm border border-white">
                    <p className="text-slate-800 font-bold text-lg italic mb-4 leading-snug">"{owner.bio.split('.')[0]}."</p>
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white font-black">NL</div>
                       <div>
                          <p className="text-slate-900 font-black text-xs uppercase">{owner.name}</p>
                          <p className="text-[#22c55e] font-black text-[10px] uppercase">{owner.role}</p>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="space-y-12">
                <div className="space-y-6">
                  <h4 className="text-blue-600 font-black uppercase tracking-[0.2em] text-xs">Our Purpose</h4>
                  <h2 className="text-5xl md:text-7xl font-black text-slate-900 leading-none tracking-tighter">Leading Through Innovation.</h2>
                  <p className="text-lg text-slate-600 leading-relaxed font-medium">{owner.bio}</p>
                </div>
                <button onClick={() => onNavigate('/about')} className="inline-flex items-center gap-4 text-slate-900 font-black text-lg group">
                  <span className="border-b-4 border-green-500 pb-1 group-hover:border-blue-600 transition-colors">Learn More About Us</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-3 transition-transform text-green-500" />
                </button>
              </div>
           </div>
        </div>
      </section>

      {/* Customer Subscription Portal */}
      <section className="py-32">
        <div className="container mx-auto px-6">
           <div className="bg-[#0a0f1d] rounded-[4rem] p-16 md:p-32 text-center text-white relative overflow-hidden">
             <div className="relative z-10 space-y-12">
                <h2 className="text-5xl md:text-8xl font-black max-w-5xl mx-auto leading-none tracking-tighter">
                  Subscribe to <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">NetLink Updates.</span>
                </h2>
                <div className="max-w-xl mx-auto flex flex-col sm:flex-row gap-4">
                  <input 
                    placeholder="Enter your corporate email" 
                    className="flex-grow px-8 py-6 rounded-3xl bg-white/10 border border-white/20 text-white outline-none focus:ring-2 focus:ring-green-500 transition-all font-bold"
                  />
                  <button className="bg-white text-slate-950 px-10 py-6 rounded-3xl font-black text-xl hover:bg-green-500 hover:text-white transition-all shadow-2xl">
                    Join Portal
                  </button>
                </div>
                <p className="text-slate-400 font-medium">Join 500+ professionals receiving daily IT insights in Ethiopia.</p>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
