
import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, Linkedin, Clock, ExternalLink, CheckCircle2, Loader2, MessageCircle, ClipboardList, Briefcase } from 'lucide-react';
import { SOCIAL_LINKS } from '../constants';

const Contact: React.FC<{ initialSubject?: string }> = ({ initialSubject = "" }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: initialSubject || '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // API Placeholder: Simulated dispatch to enterprise support engine
    console.log("Dispatching lead to NetLink API...", formData);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const generateTelegramLink = () => {
    const text = `NetLink Website Inquiry:%0A-----------------------%0A👤 Name: ${encodeURIComponent(formData.name)}%0A📧 Email: ${encodeURIComponent(formData.email)}%0A📌 Subject: ${encodeURIComponent(formData.subject)}%0A💬 Message: ${encodeURIComponent(formData.message)}`;
    return `https://t.me/NetLink_General_Solutions?text=${text}`;
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Information Column */}
          <div className="space-y-10">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                Enterprise Communications
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-slate-900 leading-[0.9] tracking-tighter">
                Accelerate your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500">Architecture.</span>
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed max-w-lg font-medium">
                Connect with our certified engineers. Your request will be routed to the appropriate department within 60 minutes.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-white p-8 rounded-[2.5rem] border shadow-sm group hover:shadow-xl transition-all">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-4">
                  <Phone size={28} />
                </div>
                <h4 className="font-black text-slate-900">Direct Line</h4>
                <p className="text-slate-500 text-sm mt-1">{SOCIAL_LINKS.phone1}</p>
              </div>

              <div className="bg-white p-8 rounded-[2.5rem] border shadow-sm group hover:shadow-xl transition-all">
                <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 mb-4">
                  <Mail size={28} />
                </div>
                <h4 className="font-black text-slate-900">Corporate Email</h4>
                <p className="text-slate-500 text-sm mt-1 break-all">support@netlink-gs.com</p>
              </div>
            </div>

            <div className="p-8 bg-[#1b2a4e] rounded-[3rem] text-white space-y-4 relative overflow-hidden shadow-2xl">
               <div className="relative z-10">
                  <h4 className="font-black text-xl flex items-center gap-3">
                    <Clock size={20} className="text-blue-400" /> Operational SLA
                  </h4>
                  <p className="text-blue-100/70 text-sm font-medium leading-relaxed">
                    NetLink operates 24/7 for critical infrastructure clients. General sales inquiries are processed 8:30 AM - 5:30 PM (EAT).
                  </p>
               </div>
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            </div>
          </div>

          {/* Form Column */}
          <div className="bg-white p-10 md:p-14 rounded-[4rem] shadow-2xl border relative">
             {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-2">Full Name</label>
                  <input required className="w-full px-6 py-4 bg-slate-50 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none border transition-all font-bold" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-2">Work Email</label>
                  <input required type="email" className="w-full px-6 py-4 bg-slate-50 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none border transition-all font-bold" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-2">Service Department</label>
                  <select required className="w-full px-6 py-4 bg-slate-50 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none border transition-all font-bold appearance-none" value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})}>
                    <option value="">Select Service</option>
                    <option value="Networking">Enterprise Networking</option>
                    <option value="Security">Hikvision Surveillance</option>
                    <option value="Software">Software Engineering</option>
                    <option value="Careers">Career Application</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-2">Project Brief</label>
                  <textarea required rows={4} className="w-full px-6 py-4 bg-slate-50 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none border transition-all font-medium resize-none" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} />
                </div>
                <button disabled={isSubmitting} className="w-full bg-blue-600 text-white py-5 rounded-[2rem] font-black text-lg shadow-xl hover:bg-blue-700 transition-all disabled:opacity-50 flex items-center justify-center gap-3">
                  {isSubmitting ? <Loader2 className="animate-spin" /> : <>Request Technical RFQ <Send size={18} /></>}
                </button>
              </form>
             ) : (
              <div className="text-center py-20 space-y-8 animate-in zoom-in duration-500">
                <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 size={48} />
                </div>
                <div className="space-y-4">
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">Lead Dispatched</h2>
                  <p className="text-slate-500 font-medium">Thank you {formData.name}. Our systems have logged your request. For high-priority intervention, contact our Telegram channel.</p>
                </div>
                <a href={generateTelegramLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-full font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-xl">
                  Message via Telegram <Send size={18} />
                </a>
              </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
