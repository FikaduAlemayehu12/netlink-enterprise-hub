
import React, { useState } from 'react';
import { SERVICES } from '../constants';
import { ChevronRight, ArrowRight, Server, Shield, Smartphone, Globe, Cloud, Cpu, Layout, Layers, CheckCircle } from 'lucide-react';

const Services: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState(SERVICES[0].id);

  const activeService = SERVICES.find(s => s.id === activeCategory);

  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900">End-to-End <span className="text-gradient">Solutions</span></h1>
          <p className="text-xl text-slate-600">From Electrical Design to Enterprise Software—we deliver world-class finishing.</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-4 space-y-2">
            {SERVICES.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveCategory(s.id)}
                className={`w-full flex items-center gap-4 p-5 rounded-2xl transition-all border text-left ${
                  activeCategory === s.id 
                    ? 'bg-white border-blue-600 shadow-xl shadow-blue-50 text-blue-600 translate-x-2' 
                    : 'bg-slate-50 border-transparent text-slate-500 hover:bg-white hover:border-slate-200'
                }`}
              >
                <div className={`${activeCategory === s.id ? 'text-blue-600' : 'text-slate-400'}`}>
                  {s.icon}
                </div>
                <div>
                  <h3 className="font-bold text-sm leading-none">{s.title}</h3>
                </div>
                <ChevronRight className={`ml-auto w-5 h-5 transition-transform ${activeCategory === s.id ? 'rotate-90' : ''}`} />
              </button>
            ))}
          </div>

          {/* Detailed Content */}
          <div className="lg:col-span-8">
            {activeService && (
              <div className="bg-white rounded-[2rem] p-10 md:p-16 border border-slate-100 shadow-sm space-y-12 animate-in fade-in slide-in-from-right duration-500">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                   <div className="bg-blue-50 p-6 rounded-3xl text-blue-600">
                      {activeService.icon}
                   </div>
                   <div className="space-y-4">
                      <h2 className="text-4xl font-extrabold text-slate-900">{activeService.title}</h2>
                      <p className="text-lg text-slate-600 leading-relaxed">{activeService.description}</p>
                   </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      <div className="w-1.5 h-6 bg-blue-600 rounded-full" /> Key Capabilities
                    </h3>
                    <div className="grid gap-3">
                      {activeService.features.map(f => (
                        <div key={f} className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl hover:bg-blue-50 transition-colors group cursor-default">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <span className="font-semibold text-slate-700 group-hover:text-blue-700">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="relative group overflow-hidden rounded-[2rem]">
                    <img src={`https://picsum.photos/600/800?random=${activeCategory + 'site'}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent" />
                  </div>
                </div>

                {activeCategory === 'networking' && (
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 italic text-slate-500 text-sm">
                    * NetLink is an authorized partner for Hikvision and other premier surveillance brands, ensuring genuine parts and expert configuration.
                  </div>
                )}

                <div className="bg-slate-900 rounded-3xl p-10 text-white flex flex-col md:flex-row items-center gap-8 justify-between">
                  <div className="space-y-2 text-center md:text-left">
                    <h4 className="text-2xl font-bold">Ready to implement this solution?</h4>
                    <p className="text-slate-400">Speak with our certified engineers for a tailored architectural plan.</p>
                  </div>
                  <button className="bg-[#22c55e] hover:bg-green-600 text-white px-10 py-5 rounded-2xl font-bold transition-all shrink-0 whitespace-nowrap">
                    Consult an Expert
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
