
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
    
    // Simulating the "hidden" notification to support@netlink-gs@gmail.com.
    // In a production environment with a backend, this data would be dispatched here.
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const generateTelegramLink = () => {
    const text = `New Website Inquiry:%0A-----------------------%0A👤 Name: ${encodeURIComponent(formData.name)}%0A📧 Email: ${encodeURIComponent(formData.email)}%0A📌 Subject: ${encodeURIComponent(formData.subject)}%0A💬 Message: ${encodeURIComponent(formData.message)}`;
    return `${SOCIAL_LINKS.telegram}?text=${text}`;
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Information Column */}
          <div className="space-y-10">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                Direct Communication
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight">
                Connect with our <span className="text-gradient">Experts</span>
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed max-w-lg">
                Your inquiry will be logged and sent to <strong>{SOCIAL_LINKS.email}</strong>. 
                For instant attention, you can finalize your request via Telegram or LinkedIn after filling out the form.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm group hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform">
                  <Phone className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-900">Call Us</h4>
                <div className="text-slate-500 text-sm mt-1">
                  <p>{SOCIAL_LINKS.phone1}</p>
                  <p>{SOCIAL_LINKS.phone2}</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm group hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 mb-4 group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-900">Email</h4>
                <p className="text-slate-500 text-sm mt-1 break-all">{SOCIAL_LINKS.email}</p>
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-slate-900 font-bold text-xl">Official Social Channels</h4>
              <div className="flex gap-4">
                <a href={SOCIAL_LINKS.telegram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
                  <Send className="w-5 h-5" /> Telegram
                </a>
                <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-6 py-3 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
                  <Linkedin className="w-5 h-5" /> LinkedIn
                </a>
              </div>
            </div>

            <div className="p-8 bg-blue-900 rounded-[2.5rem] text-white relative overflow-hidden">
               <div className="relative z-10 space-y-4">
                  <div className="flex items-center gap-3">
                    <Clock className="w-6 h-6 text-blue-400" />
                    <span className="font-bold">Operating Hours</span>
                  </div>
                  <p className="text-blue-100 text-sm leading-relaxed">
                    Our team of 20+ experts is available Monday to Friday, 8:30 AM to 5:30 PM (EAT). 
                    Response time for Telegram inquiries is typically under 1 hour.
                  </p>
               </div>
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            </div>
          </div>

          {/* Form Column */}
          <div className="relative">
             <div className="absolute inset-0 bg-blue-600 rounded-[3.5rem] rotate-2 -z-10 opacity-5" />
             <div className="bg-white p-10 md:p-14 rounded-[3.5rem] shadow-2xl border border-slate-100 relative min-h-[600px] flex flex-col justify-center">
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in duration-500">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
                      <input 
                        required
                        type="text" 
                        placeholder="e.g. Fikadu Alemayehu" 
                        className="w-full px-6 py-4 bg-slate-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all border border-slate-100"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                      <input 
                        required
                        type="email" 
                        placeholder="your@email.com" 
                        className="w-full px-6 py-4 bg-slate-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all border border-slate-100"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 ml-1">Subject / Interest</label>
                      <select 
                        required
                        className="w-full px-6 py-4 bg-slate-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all border border-slate-100 appearance-none"
                        value={formData.subject}
                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      >
                        <option value="">Select a Category</option>
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Request for Proposal (RFQ)">Request for Proposal (RFQ)</option>
                        <option value="Career Application">Career Application / Internship</option>
                        <option value="Enterprise Solution">Enterprise Solution Consultation</option>
                        <option value="Partnership">Partnership Opportunity</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 ml-1">Details & Message</label>
                      <textarea 
                        required
                        rows={4} 
                        placeholder="How can NetLink help you achieve your goals?" 
                        className="w-full px-6 py-4 bg-slate-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none border border-slate-100"
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                      />
                    </div>

                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-blue-600 text-white py-5 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 flex items-center justify-center gap-2 disabled:opacity-70 group"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          Send My Inquiry <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </>
                      )}
                    </button>
                    
                    <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">
                      <div className="h-[1px] w-8 bg-slate-200" />
                      Encrypted Submission
                      <div className="h-[1px] w-8 bg-slate-200" />
                    </div>
                  </form>
                ) : (
                  <div className="text-center space-y-8 animate-in zoom-in duration-500">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600 shadow-inner">
                      <CheckCircle2 className="w-12 h-12" />
                    </div>
                    <div className="space-y-4">
                      <h2 className="text-3xl font-bold text-slate-900">Inquiry Logged!</h2>
                      <p className="text-slate-600 leading-relaxed">
                        Excellent, <strong>{formData.name}</strong>. Your inquiry has been notified to <strong>{SOCIAL_LINKS.email}</strong>. 
                        To expedite your <strong>{formData.subject}</strong>, please use the direct social links below:
                      </p>
                    </div>

                    <div className="grid gap-4">
                      <a 
                        href={generateTelegramLink()} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-6 bg-blue-600 text-white rounded-[2rem] shadow-xl shadow-blue-200 hover:scale-[1.02] transition-all group"
                      >
                        <div className="flex items-center gap-4 font-bold text-left">
                          <div className="bg-white/20 p-2 rounded-xl">
                            <Send className="w-6 h-6" />
                          </div>
                          <div>
                            <span className="block text-sm opacity-80">Fastest Response</span>
                            <span className="text-lg">Open Telegram Chat</span>
                          </div>
                        </div>
                        <ExternalLink className="w-6 h-6 opacity-40 group-hover:opacity-100 transition-opacity" />
                      </a>

                      <a 
                        href={SOCIAL_LINKS.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-6 bg-slate-900 text-white rounded-[2rem] shadow-xl shadow-slate-200 hover:scale-[1.02] transition-all group"
                      >
                        <div className="flex items-center gap-4 font-bold text-left">
                          <div className="bg-white/10 p-2 rounded-xl">
                            <Linkedin className="w-6 h-6 text-blue-400" />
                          </div>
                          <div>
                            <span className="block text-sm opacity-80">Professional Verification</span>
                            <span className="text-lg">Visit CEO LinkedIn</span>
                          </div>
                        </div>
                        <ExternalLink className="w-6 h-6 opacity-40 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </div>

                    <div className="pt-4">
                      <button 
                        onClick={() => {
                          setIsSubmitted(false);
                          setFormData({ name: '', email: '', subject: '', message: '' });
                        }}
                        className="text-slate-400 text-sm hover:text-blue-600 underline font-medium transition-colors"
                      >
                        Submit another request
                      </button>
                    </div>
                  </div>
                )}
             </div>
          </div>
        </div>

        {/* Dynamic CTA Sections */}
        <div className="mt-32 grid md:grid-cols-3 gap-8">
           <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col gap-4">
              <ClipboardList className="w-10 h-10 text-blue-600" />
              <h3 className="text-xl font-bold text-slate-900">Request for Quote</h3>
              <p className="text-slate-500 text-sm">Need a detailed technical proposal? Select "Request for Proposal" in our form for high-priority routing.</p>
           </div>
           <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col gap-4">
              <Briefcase className="w-10 h-10 text-green-600" />
              <h3 className="text-xl font-bold text-slate-900">Careers & Interns</h3>
              <p className="text-slate-500 text-sm">Passionate about IT? Select "Career Application" to join our team of 20+ certified professionals.</p>
           </div>
           <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col gap-4">
              <MessageCircle className="w-10 h-10 text-indigo-600" />
              <h3 className="text-xl font-bold text-slate-900">Partnership</h3>
              <p className="text-slate-500 text-sm">Looking to collaborate on government or enterprise projects? Select "Partnership Opportunity".</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
