
import React, { useState, useEffect } from 'react';
import { TEAM, STATS } from '../constants';
import { Target, Eye, Award, CheckCircle2, ChevronRight } from 'lucide-react';
import { getOwnerData, getEmployees } from '../services/mockDataService';

const About: React.FC = () => {
  const [owner, setOwner] = useState(getOwnerData());
  const [employees, setEmployees] = useState(getEmployees());

  useEffect(() => {
    const interval = setInterval(() => {
      setOwner(getOwnerData());
      setEmployees(getEmployees());
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Filter executive/lead level employees for the "Team" display
  const keyTeam = employees.filter(e => e.seniority === 'Executive' || e.seniority === 'Lead' || e.role.includes('Head'));

  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="max-w-4xl mb-24 space-y-8">
          <h4 className="text-blue-600 font-black uppercase tracking-[0.2em] text-xs">Our Legacy</h4>
          <h1 className="text-5xl md:text-8xl font-black text-slate-900 leading-[0.9] tracking-tighter">
            The Digital Backbone of <span className="text-gradient">Ethiopia.</span>
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed max-w-2xl font-medium">
            Founded in 2024 by <strong>{owner.name}</strong>, NetLink General Solutions was established with a singular vision: to revolutionize the nation’s IT sector through world-class engineering.
          </p>
        </div>

        {/* CEO Spotlight */}
        <div className="grid lg:grid-cols-2 gap-24 items-center mb-32 bg-slate-50 p-12 md:p-24 rounded-[4rem]">
           <div className="relative">
              <div className="absolute -inset-10 bg-blue-600/10 rounded-[4rem] blur-[80px]" />
              <img src={owner.image} className="relative z-10 w-full rounded-[4rem] shadow-2xl h-[500px] object-cover" />
           </div>
           <div className="space-y-8">
              <h2 className="text-4xl font-black text-slate-900 tracking-tight">Message from the Founder</h2>
              <p className="text-lg text-slate-600 leading-relaxed font-medium italic">"{owner.bio}"</p>
              <div className="pt-8 border-t border-slate-200">
                 <p className="font-black text-xl text-slate-900">{owner.name}</p>
                 <p className="text-[#22c55e] font-black text-xs uppercase tracking-widest">{owner.role}</p>
              </div>
           </div>
        </div>

        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-12 mb-32">
          <div className="bg-[#414bb2] rounded-[3rem] p-16 text-white space-y-8 relative overflow-hidden group">
            <h2 className="text-4xl font-black flex items-center gap-4">
              <Eye className="w-10 h-10 text-blue-300" /> Our Vision
            </h2>
            <p className="text-blue-100 leading-relaxed text-lg font-medium">
              To transform Ethiopia into a technologically advanced nation through cutting-edge IT solutions. We aspire to be recognized as Africa’s premier IT solutions provider.
            </p>
          </div>
          <div className="bg-[#22c55e] rounded-[3rem] p-16 text-white space-y-8 relative overflow-hidden group">
            <h2 className="text-4xl font-black flex items-center gap-4">
              <Target className="w-10 h-10 text-green-200" /> Our Mission
            </h2>
            <p className="text-green-100 leading-relaxed text-lg font-medium">
              To become the leading provider of innovative IT solutions in Ethiopia by driving technological advancement and economic growth through world-class services.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <section className="mb-32">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter">Experts in Innovation</h2>
            <p className="text-xl text-slate-500 font-medium">Our leadership team brings decades of global IT expertise to Addis Ababa.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {keyTeam.map((member, i) => (
              <div key={i} className="group text-center space-y-6">
                <div className="relative overflow-hidden rounded-[3rem] aspect-square">
                  <img src={member.photo} alt={member.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 to-transparent opacity-0 group-hover:opacity-100 transition-all flex items-end justify-center p-8">
                    <p className="text-white text-xs font-bold leading-relaxed">{member.plan}</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900 leading-tight">{member.name}</h3>
                  <p className="text-[#22c55e] font-black text-xs uppercase tracking-widest mt-1">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Partners - Enhanced Visibility */}
        <section className="bg-slate-950 -mx-6 px-12 py-32 rounded-[5rem] text-center border-t border-white/5">
             <h2 className="text-4xl font-black text-white mb-20 tracking-tight">Authorized Global Partners</h2>
             <div className="flex flex-wrap justify-center gap-10 md:gap-20">
                {['HIKVISION', 'CISCO', 'DELL', 'HUAWEI', 'SOPHOS', 'ORACLE'].map(p => (
                  <div key={p} className="flex items-center gap-3 group">
                    <Award className="w-10 h-10 text-green-400 opacity-60 group-hover:opacity-100 transition-opacity" />
                    <span className="font-black text-white text-xl tracking-tighter opacity-60 group-hover:opacity-100 group-hover:text-green-400 transition-all cursor-default">
                      {p}
                    </span>
                  </div>
                ))}
             </div>
        </section>
      </div>
    </div>
  );
};

export default About;
