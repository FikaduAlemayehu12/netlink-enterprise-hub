
import React, { useState, useEffect } from 'react';
import { 
  Globe, UserCircle, CheckSquare, Zap, Users, Megaphone, Store,
  Plus, Trash2, Edit3, Save, X, ChevronRight, CheckCircle2, 
  Clock, TrendingUp, ShieldCheck, Crown, LogOut, Video, Camera, Award,
  Link2, Calendar, FileText, AlertCircle, Package, UserPlus, PenLine,
  Layout, Briefcase, Share2, Search, Mail, User, Image as ImageIcon
} from 'lucide-react';
import { 
  getEmployees, saveEmployees, getTasks, saveTasks, 
  getProjects, saveProjects, getVendors, saveVendors, 
  getNews, saveNews, getAwards, saveAwards,
  generateEmployeeId, generateCorporateCredentials
} from '../services/mockDataService';
import { Employee, InternalTask, Project, Vendor, NewsItem, TaskStatus, PerformanceAward, Role } from '../types';

interface DashboardProps {
  role: 'admin' | 'officer' | 'employee';
  userId?: string | null;
  onLogout: () => void;
}

const SafeImage: React.FC<{ src: string; alt: string; className?: string }> = ({ src, alt, className }) => {
  const [error, setError] = useState(!src);
  return (
    <div className={`relative overflow-hidden bg-slate-100 flex items-center justify-center ${className}`}>
      {error ? (
        <User className="text-slate-300 w-1/2 h-1/2" />
      ) : (
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full object-cover" 
          onError={() => setError(true)} 
        />
      )}
    </div>
  );
};

const Dashboard: React.FC<DashboardProps> = ({ userId, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'profile' | 'tasks' | 'projects' | 'directory' | 'content' | 'vendors'>('overview');
  const [employees, setEmployees] = useState<Employee[]>(getEmployees());
  const [tasks, setTasks] = useState<InternalTask[]>(getTasks());
  const [projects, setProjects] = useState<Project[]>(getProjects());
  const [vendors, setVendors] = useState<Vendor[]>(getVendors());
  const [news, setNews] = useState<NewsItem[]>(getNews());
  const [saveIndicator, setSaveIndicator] = useState<string | null>(null);
  
  const currentUser = employees.find(e => e.id === userId) || employees[0];
  const isCEO = currentUser.role === 'CEO';
  const isHR = currentUser.role === 'HR';
  const hasManagementAccess = isCEO || isHR;

  const triggerSave = (msg: string) => {
    setSaveIndicator(msg);
    setTimeout(() => setSaveIndicator(null), 3000);
  };

  const updateStaff = (updated: Employee[]) => { setEmployees(updated); saveEmployees(updated); };
  const updateProjects = (updated: Project[]) => { setProjects(updated); saveProjects(updated); };
  const updateVendors = (updated: Vendor[]) => { setVendors(updated); saveVendors(updated); };
  const updateNews = (updated: NewsItem[]) => { setNews(updated); saveNews(updated); };

  const handleEditEmployee = (id: string, updates: Partial<Employee>) => {
    if (!hasManagementAccess && id !== currentUser.id) return;
    const list = employees.map(e => e.id === id ? { ...e, ...updates } : e);
    updateStaff(list);
    triggerSave("Profile Updated");
  };

  const handleEditPoster = (id: string, updates: Partial<NewsItem>) => {
    if (!hasManagementAccess) return;
    updateNews(news.map(n => n.id === id ? { ...n, ...updates } : n));
    triggerSave("Content Updated");
  };

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100">
      <aside className="w-72 bg-[#0f172a] text-white flex flex-col shadow-2xl shrink-0">
        <div className="p-8 border-b border-white/5">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-[#22c55e] rounded-xl shadow-lg"><Crown size={20} /></div>
            <h2 className="text-2xl font-black text-white tracking-tighter uppercase">NetLink</h2>
          </div>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em]">Lifecycle Terminal</p>
        </div>
        <nav className="flex-grow p-4 space-y-1.5 overflow-y-auto">
          <SidebarItem active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} icon={<Globe size={18} />} label="Overview" />
          <SidebarItem active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} icon={<UserCircle size={18} />} label="My Studio" />
          {hasManagementAccess && (
            <>
              <SidebarItem active={activeTab === 'directory'} onClick={() => setActiveTab('directory')} icon={<Users size={18} />} label="Staff Lifecycle" />
              <SidebarItem active={activeTab === 'content'} onClick={() => setActiveTab('content')} icon={<Megaphone size={18} />} label="Ads & Posters" />
            </>
          )}
        </nav>
        <div className="p-6 bg-slate-900/80 m-4 rounded-3xl flex items-center gap-4 border border-white/5">
           <SafeImage src={currentUser.photo} alt={currentUser.name} className="w-12 h-12 rounded-2xl border-2 border-blue-500 shadow-inner" />
           <div className="overflow-hidden">
             <p className="text-xs font-black truncate text-white">{currentUser.name}</p>
             <button onClick={onLogout} className="text-[9px] text-red-400 font-black uppercase flex items-center gap-1 mt-1 hover:text-red-300">
               <LogOut size={10} /> Logout
             </button>
           </div>
        </div>
      </aside>

      <main className="flex-grow overflow-y-auto p-12 relative">
        {saveIndicator && (
          <div className="fixed top-8 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-8 py-4 rounded-2xl shadow-2xl z-[100] animate-in slide-in-from-top-4 flex items-center gap-3 font-black">
            <CheckCircle2 size={20} /> {saveIndicator}
          </div>
        )}

        {/* CONTENT MANAGEMENT (ADS & POSTERS) */}
        {activeTab === 'content' && hasManagementAccess && (
          <div className="space-y-10 animate-in fade-in duration-500">
             <header className="flex justify-between items-center">
                <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">Public <span className="text-blue-600">Posters.</span></h2>
                <button onClick={() => {
                  const title = prompt("Poster Title:");
                  if(title) updateNews([...news, { id: Date.now().toString(), title, content: 'New corporate update.', date: new Date().toISOString().split('T')[0], type: 'Poster', platformLinks: {} }]);
                }} className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase flex items-center gap-2 hover:bg-blue-700 transition-all">
                   <Plus size={18} /> New Campaign
                </button>
             </header>

             <div className="grid lg:grid-cols-2 gap-10">
                {news.map(post => (
                  <div key={post.id} className="bg-white p-10 rounded-[4rem] border border-slate-100 flex flex-col gap-8 shadow-sm hover:shadow-xl transition-all">
                     <div className="flex gap-8 items-start">
                        <div className="relative group w-48 h-48 shrink-0">
                           <SafeImage src={post.image || ''} alt={post.title} className="w-full h-full rounded-[2.5rem] shadow-lg" />
                           <label className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity rounded-[2.5rem]">
                              <ImageIcon className="text-white" size={32} />
                              <input type="file" className="hidden" accept="image/*" onChange={(e) => {
                                 const f = e.target.files?.[0];
                                 if(f) {
                                    const reader = new FileReader();
                                    reader.onload = (re) => handleEditPoster(post.id, { image: re.target?.result as string });
                                    reader.readAsDataURL(f);
                                 }
                              }} />
                           </label>
                        </div>
                        <div className="flex-grow space-y-4">
                           <input className="text-2xl font-black text-slate-900 bg-slate-50 border-none outline-none focus:ring-2 focus:ring-blue-100 rounded-xl px-4 py-2 w-full" value={post.title} onChange={(e) => handleEditPoster(post.id, { title: e.target.value })} />
                           <textarea className="text-sm font-medium text-slate-500 bg-slate-50 border-none outline-none focus:ring-2 focus:ring-blue-100 rounded-xl px-4 py-2 w-full h-24 resize-none" value={post.content} onChange={(e) => handleEditPoster(post.id, { content: e.target.value })} />
                        </div>
                     </div>
                     <div className="flex justify-between items-center border-t pt-6 border-slate-100">
                        <select className="bg-slate-100 px-4 py-2 rounded-xl text-[10px] font-black uppercase" value={post.type} onChange={(e) => handleEditPoster(post.id, { type: e.target.value as any })}>
                           <option value="Poster">Poster</option>
                           <option value="Ad">Ad</option>
                           <option value="News">News</option>
                        </select>
                        <button onClick={() => updateNews(news.filter(n => n.id !== post.id))} className="text-red-400 hover:text-red-600 transition-colors"><Trash2 size={24} /></button>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        )}

        {/* STAFF DIRECTORY */}
        {activeTab === 'directory' && hasManagementAccess && (
          <div className="space-y-10 animate-in fade-in duration-500">
             <header className="flex justify-between items-center">
                <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">Staff <span className="text-blue-600">Identity.</span></h2>
                <button onClick={() => {
                   const name = prompt("Name:");
                   if(name) updateStaff([...employees, { id: generateEmployeeId(employees.length), name, email: name.toLowerCase() + '@netlink-gs.com', password: '123', role: 'Junior Staff', department: 'Software', seniority: 'Fresh', photo: '', bio: '', baseSalary: 30000, performanceScore: 80, status: 'Active', plans: { daily: '', weekly: '', monthly: '', quarterly: '' } }]);
                }} className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase flex items-center gap-2 hover:bg-blue-700 transition-all">
                   <UserPlus size={18} /> New Member
                </button>
             </header>
             <div className="grid gap-10">
                {employees.map(emp => (
                  <div key={emp.id} className="bg-white p-12 rounded-[4rem] border border-slate-100 flex flex-col xl:flex-row gap-12 hover:shadow-2xl transition-all">
                     <div className="relative shrink-0 flex flex-col items-center gap-4">
                        <SafeImage src={emp.photo} alt={emp.name} className="w-40 h-40 rounded-[3rem] border-4 border-slate-50 shadow-2xl" />
                        <label className="bg-blue-50 text-blue-600 px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase cursor-pointer hover:bg-blue-600 hover:text-white transition-all">
                           Change Photo
                           <input type="file" className="hidden" onChange={(e) => {
                              const f = e.target.files?.[0];
                              if(f) {
                                 const reader = new FileReader();
                                 reader.onload = (re) => handleEditEmployee(emp.id, { photo: re.target?.result as string });
                                 reader.readAsDataURL(f);
                              }
                           }} />
                        </label>
                     </div>
                     <div className="flex-grow space-y-8">
                        <input className="text-3xl font-black text-slate-900 bg-slate-50 border-none outline-none focus:ring-2 focus:ring-blue-100 rounded-2xl px-5 py-3 w-full" value={emp.name} onChange={(e) => handleEditEmployee(emp.id, { name: e.target.value })} />
                        <textarea className="w-full h-32 bg-slate-50 border-none outline-none focus:ring-2 focus:ring-blue-100 rounded-[2rem] p-6 text-sm font-medium" value={emp.bio} onChange={(e) => handleEditEmployee(emp.id, { bio: e.target.value })} />
                     </div>
                     <div className="flex flex-col justify-between items-end gap-6 border-l pl-12 border-slate-100">
                        <button onClick={() => updateStaff(employees.filter(e => e.id !== emp.id))} className="text-red-400 hover:text-red-600"><Trash2 size={24} /></button>
                        <div className="text-right">
                           <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Access Key</p>
                           <p className="text-xl font-black text-slate-900">{emp.password}</p>
                        </div>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        )}

        {/* OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-12 animate-in fade-in duration-700">
            <header>
              <h1 className="text-6xl font-black text-slate-900 tracking-tighter uppercase tracking-tight">Enterprise <span className="text-blue-600">Terminal.</span></h1>
              <p className="text-lg text-slate-500 font-medium">Welcome back, <span className="text-slate-900 font-black">{currentUser.name}</span></p>
            </header>
            <div className="grid md:grid-cols-3 gap-8">
              <StatCard label="KPI SCORE" value={`${currentUser.performanceScore}%`} icon={<TrendingUp size={18} />} />
              <StatCard label="CORE NODES" value={employees.length} icon={<Users size={18} />} />
              <StatCard label="CONTENT HUB" value={news.length} icon={<Megaphone size={18} />} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

const SidebarItem = ({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) => (
  <button onClick={onClick} className={`w-full flex items-center gap-3 p-5 rounded-3xl font-bold transition-all ${active ? 'bg-blue-600 shadow-2xl text-white' : 'hover:bg-white/5 text-slate-400'}`}>
    {icon} <span>{label}</span>
  </button>
);

const StatCard = ({ label, value, icon }: { label: string, value: string | number, icon: React.ReactNode }) => (
  <div className="bg-white p-12 rounded-[4rem] shadow-sm border border-slate-100 space-y-3 group hover:shadow-xl transition-all">
    <div className="flex justify-between items-center text-[9px] font-black text-slate-400 uppercase tracking-widest">
      {label} {icon}
    </div>
    <p className="text-5xl font-black text-slate-900 tracking-tighter">{value}</p>
  </div>
);

export default Dashboard;
