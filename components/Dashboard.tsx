
import React, { useState, useEffect, useRef } from 'react';
import { 
  Settings, Users, FileText, Award, Save, Plus, Trash2, TrendingUp, 
  DollarSign, Camera, Briefcase, ShieldCheck, X, Image as ImageIcon, 
  Upload, Check, UserCircle, Zap, History, Trophy, Search, Mail, ExternalLink, AtSign, Send, Download, ClipboardList,
  ThumbsUp, MessageSquare, Heart, Smile, MoreHorizontal, Globe, LifeBuoy, BookOpen, Calendar, CreditCard
} from 'lucide-react';
import { 
  getOwnerData, saveOwnerData, 
  getEmployees, saveEmployees, 
  getNews, saveNews,
  getAppreciation, saveAppreciation,
  fileToBase64,
  Employee, NewsItem, Department, Seniority, ReportRecord, TaskPost, Comment, Reaction
} from '../services/mockDataService';

interface DashboardProps {
  role: 'admin' | 'officer' | 'employee';
  userId?: string | null;
  onLogout: () => void;
}

const PerformanceSparkline: React.FC<{ data: number[] }> = ({ data }) => {
  if (!data || data.length < 2) return <div className="text-[10px] text-slate-400">No History</div>;
  const width = 100;
  const height = 30;
  const max = 100;
  const min = 0;
  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((val - min) / (max - min)) * height;
    return `${x},${y}`;
  }).join(' ');
  return (
    <svg width={width} height={height} className="overflow-visible">
      <defs>
        <linearGradient id="sparkGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`M 0,${height} ${points.split(' ').map((p, i) => (i === 0 ? `L ${p}` : `L ${p}`)).join(' ')} L ${width},${height} Z`} fill="url(#sparkGradient)" />
      <polyline fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" points={points} />
      <circle cx={points.split(' ').pop()?.split(',')[0]} cy={points.split(' ').pop()?.split(',')[1]} r="3" fill="#3b82f6" />
    </svg>
  );
};

const Dashboard: React.FC<DashboardProps> = ({ role, userId, onLogout }) => {
  const isAdmin = role === 'admin';
  const isOfficer = role === 'officer';
  const isHR = isAdmin || isOfficer;
  
  const initialTab = isAdmin ? 'settings' : (isHR ? 'employees' : 'profile');
  const [activeTab, setActiveTab] = useState<'settings' | 'employees' | 'content' | 'profile' | 'awards' | 'tasks'>(initialTab as any);
  
  const [owner, setOwner] = useState(getOwnerData());
  const [employees, setEmployees] = useState<Employee[]>(getEmployees());
  const [news, setNews] = useState<NewsItem[]>(getNews());
  const [appreciation, setAppreciation] = useState(getAppreciation());
  const [searchTerm, setSearchTerm] = useState('');
  
  const [saveIndicator, setSaveIndicator] = useState<string | null>(null);
  const [showTaskReview, setShowTaskReview] = useState<string | null>(null); 
  const [reviewScore, setReviewScore] = useState(80);
  
  // Award State
  const [awardData, setAwardData] = useState(appreciation);

  const ownerFileRef = useRef<HTMLInputElement>(null);
  const empFileRefs = useRef<Record<string, HTMLInputElement>>({});
  const reportFileRef = useRef<HTMLInputElement>(null);

  const currentEmployee = employees.find(e => e.id === userId) || (isAdmin ? { 
    name: 'Administrator', 
    id: 'admin', 
    photo: 'https://i.pravatar.cc/150?u=admin',
    role: 'System Administrator',
    seniority: 'Executive' as Seniority,
    department: 'Management' as Department,
    baseSalary: 0,
    performanceScore: 100,
    performanceHistory: [100],
    plan: 'System Oversight',
    evaluationFrequency: 'Monthly' as const,
    reportsCount: 0,
    reports: [],
    taskFeed: []
  } as Employee : null);

  const triggerSaveIndicator = (msg: string) => {
    setSaveIndicator(msg);
    setTimeout(() => setSaveIndicator(null), 3000);
  };

  const handleUpdateEmployee = (id: string, field: keyof Employee, value: any) => {
    const updated = employees.map(e => e.id === id ? { ...e, [field]: value } : e);
    setEmployees(updated);
    saveEmployees(updated);
  };

  const handleSaveAward = () => {
    const dataWithTime = { ...awardData, timestamp: Date.now() };
    saveAppreciation(dataWithTime);
    setAppreciation(dataWithTime);
    triggerSaveIndicator("Winner of the Quarter Published!");
  };

  const handleEmployeePhotoUpload = async (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const base64 = await fileToBase64(e.target.files[0]);
      handleUpdateEmployee(id, 'photo', base64);
      triggerSaveIndicator("Profile photo updated!");
    }
  };

  const handleReportUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && currentEmployee) {
      const file = e.target.files[0];
      const newReport: ReportRecord = {
        id: Date.now().toString(),
        name: file.name,
        timestamp: Date.now()
      };
      const emp = employees.find(em => em.id === userId);
      if (!emp) return;
      const currentReports = emp.reports || [];
      const updatedReports = [newReport, ...currentReports];
      const updatedEmployees = employees.map(item => 
        item.id === userId ? { ...item, reports: updatedReports, reportsCount: updatedReports.length } : item
      );
      setEmployees(updatedEmployees);
      saveEmployees(updatedEmployees);
      triggerSaveIndicator("Daily Report Uploaded!");
      if (reportFileRef.current) reportFileRef.current.value = '';
    }
  };

  // --- Task Feed Logic ---
  const handlePostTask = (content: string) => {
    if (!content.trim() || !currentEmployee) return;
    const emp = employees.find(e => e.id === userId);
    if (!emp) return;

    const newPost: TaskPost = {
      id: Date.now().toString(),
      authorId: emp.id,
      authorName: emp.name,
      authorPhoto: emp.photo,
      content: content,
      timestamp: Date.now(),
      likes: [],
      reactions: [],
      comments: []
    };

    const updatedFeed = [newPost, ...(emp.taskFeed || [])];
    handleUpdateEmployee(emp.id, 'taskFeed', updatedFeed);
    triggerSaveIndicator("Task Plan Attached!");
  };

  const handleInteract = (postId: string, authorId: string, action: 'like' | 'comment' | 'react', payload?: any) => {
    const updated = employees.map(emp => {
      if (emp.id === authorId) {
        const newFeed = (emp.taskFeed || []).map(post => {
          if (post.id === postId) {
            if (action === 'like') {
              const currentId = userId || 'sys';
              const likes = post.likes.includes(currentId) 
                ? post.likes.filter(id => id !== currentId) 
                : [...post.likes, currentId];
              return { ...post, likes };
            }
            if (action === 'comment') {
              const newComment: Comment = {
                id: Date.now().toString(),
                authorId: userId || 'sys',
                authorName: currentEmployee?.name || 'User',
                text: payload,
                timestamp: Date.now()
              };
              return { ...post, comments: [...post.comments, newComment] };
            }
          }
          return post;
        });
        return { ...emp, taskFeed: newFeed };
      }
      return emp;
    });
    setEmployees(updated);
    saveEmployees(updated);
  };

  const renderContentWithMentions = (text: string) => {
    const parts = text.split(/(@[a-zA-Z0-9]+@netlink-gs\.com)/g);
    return parts.map((part, i) => {
      if (part.match(/@[a-zA-Z0-9]+@netlink-gs\.com/)) {
        return (
          <span key={i} className="text-blue-600 font-black bg-blue-50 px-2 py-0.5 rounded-lg border border-blue-100 cursor-pointer hover:bg-blue-600 hover:text-white transition-all">
            {part}
          </span>
        );
      }
      return part;
    });
  };

  const getGlobalFeed = (): TaskPost[] => {
    let all: TaskPost[] = [];
    employees.forEach(e => {
      if (e.taskFeed) all = [...all, ...e.taskFeed];
    });
    return all.sort((a, b) => b.timestamp - a.timestamp);
  };

  const deleteEmployee = (id: string) => {
    if (!isAdmin) {
      alert("Permission Denied: Only Admins can purge corporate records.");
      return;
    }
    if (window.confirm("Are you sure you want to remove this staff record?")) {
      const updated = employees.filter(e => e.id !== id);
      setEmployees(updated);
      saveEmployees(updated);
      triggerSaveIndicator("Staff record removed.");
    }
  };

  const filteredEmployees = employees.filter(e => 
    e.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    e.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCompanyEmail = (name: string) => {
    const cleanName = name.replace(/^(Mr\.|Ms\.|Mrs\.|Dr\.|Eng\.)\s+/i, '');
    const user = cleanName.split(' ')[0].toLowerCase();
    return `${user}@netlink-gs.com`;
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans selection:bg-blue-100">
      {saveIndicator && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[300] bg-green-600 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 font-black animate-in fade-in slide-in-from-top duration-300">
           <Check className="w-6 h-6" /> {saveIndicator}
        </div>
      )}

      {/* Sidebar */}
      <div className="w-72 bg-slate-950 text-white p-8 flex flex-col gap-10 shrink-0 shadow-2xl z-50">
        <div className="flex flex-col">
          <div className="font-black text-2xl text-[#22c55e] tracking-tighter uppercase leading-none">NetLink</div>
          <div className="font-bold text-[10px] text-blue-500 uppercase tracking-[0.3em] mt-1">General Solutions</div>
        </div>
        
        <nav className="flex flex-col gap-2">
          {role === 'employee' && (
            <button 
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-4 p-4 rounded-2xl transition-all font-bold text-sm ${activeTab === 'profile' ? 'bg-blue-600 shadow-xl' : 'hover:bg-white/5 text-slate-400'}`}
            >
              <UserCircle size={20} /> My Workspace
            </button>
          )}

          <button 
            onClick={() => setActiveTab('tasks')}
            className={`flex items-center gap-4 p-4 rounded-2xl transition-all font-bold text-sm ${activeTab === 'tasks' ? 'bg-blue-600 shadow-xl' : 'hover:bg-white/5 text-slate-400'}`}
          >
            <Zap size={20} /> Control Room Feed
          </button>

          {isAdmin && (
            <button 
              onClick={() => setActiveTab('settings')}
              className={`flex items-center gap-4 p-4 rounded-2xl transition-all font-bold text-sm ${activeTab === 'settings' ? 'bg-blue-600 shadow-xl' : 'hover:bg-white/5 text-slate-400'}`}
            >
              <Settings size={20} /> CEO Controls
            </button>
          )}
          
          {isHR && (
            <button 
              onClick={() => setActiveTab('employees')}
              className={`flex items-center gap-4 p-4 rounded-2xl transition-all font-bold text-sm ${activeTab === 'employees' ? 'bg-blue-600 shadow-xl' : 'hover:bg-white/5 text-slate-400'}`}
            >
              <Users size={20} /> Staff Directory
            </button>
          )}

          {isHR && (
            <button 
              onClick={() => setActiveTab('awards')}
              className={`flex items-center gap-4 p-4 rounded-2xl transition-all font-bold text-sm ${activeTab === 'awards' ? 'bg-yellow-600 shadow-xl' : 'hover:bg-white/5 text-slate-400'}`}
            >
              <Trophy size={20} /> Awards Center
            </button>
          )}

          {isHR && (
            <button 
              onClick={() => setActiveTab('content')}
              className={`flex items-center gap-4 p-4 rounded-2xl transition-all font-bold text-sm ${activeTab === 'content' ? 'bg-blue-600 shadow-xl' : 'hover:bg-white/5 text-slate-400'}`}
            >
              <FileText size={20} /> Corporate Feed
            </button>
          )}
        </nav>

        <div className="mt-auto p-6 bg-white/5 rounded-[2rem] border border-white/10 space-y-4">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center font-black border border-white/20 text-blue-400 uppercase">
               {role.substring(0, 2)}
             </div>
             <div className="overflow-hidden">
                <p className="text-xs font-black uppercase tracking-widest text-white truncate">
                  {currentEmployee?.name.split(' ')[0]}
                </p>
                <p className="text-[9px] text-slate-500 font-bold uppercase">Corporate SSO</p>
             </div>
          </div>
          <button onClick={onLogout} className="w-full py-3 rounded-xl bg-red-600/10 text-red-500 hover:bg-red-600 hover:text-white transition-all font-black text-[10px] uppercase tracking-widest">Logout</button>
        </div>
      </div>

      {/* Main Area */}
      <div className="flex-grow p-12 overflow-y-auto max-h-screen scroll-smooth custom-scrollbar">
        {activeTab === 'profile' && currentEmployee && (
          <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom duration-500">
             <header className="flex justify-between items-end">
                <div className="space-y-2">
                  <h2 className="text-5xl font-black text-slate-900 leading-none tracking-tighter uppercase">Professional <span className="text-blue-600">Hub</span></h2>
                  <p className="text-slate-500 text-lg font-medium italic">Authenticated as {getCompanyEmail(currentEmployee.name)}</p>
                </div>
             </header>

             <div className="grid lg:grid-cols-12 gap-12">
                <div className="lg:col-span-8 space-y-12">
                   <div className="bg-white p-10 rounded-[3.5rem] shadow-sm border space-y-10">
                      <div className="flex gap-10 items-center">
                         <div className="relative group w-32 h-32 shrink-0">
                            <img src={currentEmployee.photo} className="w-full h-full rounded-[2.5rem] object-cover shadow-xl" />
                         </div>
                         <div className="space-y-2">
                            <h3 className="text-3xl font-black text-slate-900">{currentEmployee.name}</h3>
                            <div className="flex gap-3">
                               <span className="bg-blue-50 text-blue-600 text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-widest border border-blue-100">{currentEmployee.role}</span>
                               <span className="bg-slate-50 text-slate-500 text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-widest border border-slate-200">{currentEmployee.seniority}</span>
                            </div>
                         </div>
                      </div>

                      <div className="space-y-4">
                         <div className="flex justify-between items-center">
                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                              <AtSign size={14} className="text-blue-500" /> New Task Plan / Post
                            </label>
                            <span className="text-[10px] text-slate-300 italic">Mention: @name@netlink-gs.com</span>
                         </div>
                         <div className="relative">
                            <textarea 
                               id="task-input"
                               rows={4}
                               placeholder="What is your plan for today? @Hana@netlink-gs.com check the API..."
                               className="w-full p-6 bg-slate-50 rounded-[2.5rem] border-none outline-none font-medium text-slate-800 focus:ring-2 focus:ring-blue-500 shadow-inner"
                            />
                            <div className="absolute bottom-6 right-6 flex gap-2">
                               <button 
                                 onClick={() => {
                                   const val = (document.getElementById('task-input') as HTMLTextAreaElement).value;
                                   handlePostTask(val);
                                   (document.getElementById('task-input') as HTMLTextAreaElement).value = '';
                                 }}
                                 className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all shadow-lg flex items-center gap-2 px-6"
                               >
                                  <Send size={16} /> <span className="text-xs font-black uppercase">Post Plan</span>
                               </button>
                            </div>
                         </div>
                      </div>
                   </div>

                   <div className="bg-[#1e293b] p-10 rounded-[3.5rem] text-white space-y-8 relative overflow-hidden">
                      <div className="relative z-10">
                        <div className="flex justify-between items-center mb-6">
                           <h3 className="text-2xl font-black flex items-center gap-3"><FileText className="text-blue-400" /> My Personal Logs</h3>
                           <button onClick={() => reportFileRef.current?.click()} className="bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all shadow-lg">
                              <Plus size={14} /> Upload Report
                           </button>
                           <input type="file" ref={reportFileRef} className="hidden" onChange={handleReportUpload} />
                        </div>
                        <div className="grid gap-4 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                           {(employees.find(e => e.id === userId)?.reports || []).map((report) => (
                             <div key={report.id} className="bg-white/5 p-5 rounded-2xl border border-white/10 flex justify-between items-center group hover:bg-white/10 transition-all">
                                <div className="flex items-center gap-4">
                                   <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-400">
                                      <FileText size={20} />
                                   </div>
                                   <div>
                                      <p className="text-sm font-bold truncate max-w-[200px]">{report.name}</p>
                                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{formatDate(report.timestamp)}</p>
                                   </div>
                                </div>
                                <button className="p-2 text-white/40 hover:text-white"><Download size={16} /></button>
                             </div>
                           ))}
                        </div>
                      </div>
                   </div>
                </div>

                <div className="lg:col-span-4 space-y-8">
                   <div className="bg-white p-8 rounded-[3rem] shadow-sm border space-y-6">
                      <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] border-b pb-4">Internal Stats</h4>
                      <div className="space-y-6">
                         <div className="flex justify-between items-center">
                            <div>
                               <p className="text-[10px] font-black text-slate-400 uppercase">Performance</p>
                               <p className="text-2xl font-black text-slate-900">{employees.find(e => e.id === userId)?.performanceScore || 0}%</p>
                            </div>
                            <PerformanceSparkline data={employees.find(e => e.id === userId)?.performanceHistory || []} />
                         </div>
                         <div className="p-4 bg-slate-50 rounded-2xl flex items-center gap-4">
                            <Zap className="text-yellow-500" />
                            <div>
                               <p className="text-[10px] font-black text-slate-400 uppercase leading-tight">Focus</p>
                               <p className="text-xs font-bold text-slate-700">{employees.find(e => e.id === userId)?.plan}</p>
                            </div>
                         </div>
                      </div>
                   </div>

                   {/* Quick Links / Shortcuts Widget */}
                   <div className="bg-white p-8 rounded-[3rem] shadow-sm border space-y-6">
                      <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] border-b pb-4 flex items-center justify-between">
                        Global Shortcuts
                        <ExternalLink size={12} className="text-blue-500" />
                      </h4>
                      <div className="grid gap-3">
                         <a href="#" className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl hover:bg-blue-600 hover:text-white transition-all group shadow-sm">
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-600 group-hover:bg-white/20 group-hover:text-white transition-colors">
                               <Calendar size={18} />
                            </div>
                            <div className="flex-grow">
                               <p className="text-xs font-black uppercase leading-none">Request Leave</p>
                               <p className="text-[9px] font-bold opacity-60">HR Self-Service</p>
                            </div>
                         </a>
                         <a href="#" className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl hover:bg-blue-600 hover:text-white transition-all group shadow-sm">
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-green-600 group-hover:bg-white/20 group-hover:text-white transition-colors">
                               <CreditCard size={18} />
                            </div>
                            <div className="flex-grow">
                               <p className="text-xs font-black uppercase leading-none">Payroll Portal</p>
                               <p className="text-[9px] font-bold opacity-60">View Payslips</p>
                            </div>
                         </a>
                         <a href="#" className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl hover:bg-blue-600 hover:text-white transition-all group shadow-sm">
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-purple-600 group-hover:bg-white/20 group-hover:text-white transition-colors">
                               <LifeBuoy size={18} />
                            </div>
                            <div className="flex-grow">
                               <p className="text-xs font-black uppercase leading-none">IT Support</p>
                               <p className="text-[9px] font-bold opacity-60">Internal Helpdesk</p>
                            </div>
                         </a>
                         <a href="#" className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl hover:bg-blue-600 hover:text-white transition-all group shadow-sm">
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-amber-600 group-hover:bg-white/20 group-hover:text-white transition-colors">
                               <BookOpen size={18} />
                            </div>
                            <div className="flex-grow">
                               <p className="text-xs font-black uppercase leading-none">Knowledge Wiki</p>
                               <p className="text-[9px] font-bold opacity-60">NetLink Docs</p>
                            </div>
                         </a>
                      </div>
                      <div className="pt-2 text-center">
                         <button className="text-[10px] font-black uppercase text-slate-400 hover:text-blue-600 transition-colors tracking-widest">
                            Manage Workspace Widgets
                         </button>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        )}

        {activeTab === 'tasks' && (
          <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in duration-500">
             <header className="space-y-4">
                <div className="flex justify-between items-center">
                   <h2 className="text-5xl font-black text-slate-900 uppercase tracking-tighter">Control Room <span className="text-blue-600">Feed</span></h2>
                   <div className="bg-green-50 text-green-600 px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-widest animate-pulse">Live Syncing</div>
                </div>
                <p className="text-slate-500 text-lg font-medium italic">Monitoring all staff daily plans, attachments and interactions.</p>
             </header>

             <div className="space-y-8">
                {getGlobalFeed().map(post => (
                  <div key={post.id} className="bg-white rounded-[3.5rem] p-10 shadow-sm border border-slate-100 space-y-6 group hover:shadow-xl transition-all">
                     <div className="flex justify-between items-start">
                        <div className="flex gap-4 items-center">
                           <img src={post.authorPhoto} className="w-14 h-14 rounded-2xl object-cover" />
                           <div>
                              <h4 className="text-lg font-black text-slate-900 leading-none">{post.authorName}</h4>
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{formatDate(post.timestamp)}</p>
                           </div>
                        </div>
                        <div className="flex items-center gap-4">
                           <span className="text-[10px] font-black uppercase text-blue-600 tracking-widest bg-blue-50 px-4 py-1 rounded-full border border-blue-100">
                             {employees.find(e => e.id === post.authorId)?.role || 'Staff'}
                           </span>
                        </div>
                     </div>

                     <div className="text-xl font-medium text-slate-700 leading-relaxed px-2">
                        {renderContentWithMentions(post.content)}
                     </div>

                     <div className="pt-6 border-t border-slate-50 flex items-center gap-6">
                        <button 
                          onClick={() => handleInteract(post.id, post.authorId, 'like')}
                          className={`flex items-center gap-2 px-6 py-2 rounded-full transition-all font-black text-xs uppercase tracking-widest ${post.likes.includes(userId || 'sys') ? 'bg-blue-600 text-white' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
                        >
                           <ThumbsUp size={16} /> {post.likes.length}
                        </button>
                        
                        <div className="flex items-center gap-2">
                           <button className="p-3 bg-slate-50 text-slate-400 rounded-full hover:bg-slate-100 transition-all"><Heart size={16} /></button>
                           <button className="p-3 bg-slate-50 text-slate-400 rounded-full hover:bg-slate-100 transition-all"><Smile size={16} /></button>
                        </div>

                        <div className="ml-auto text-slate-300 font-black text-[10px] uppercase flex items-center gap-2">
                           <MessageSquare size={14} /> {post.comments.length} Discussion Nodes
                        </div>
                     </div>

                     {/* Comment Section (Jira-style) */}
                     <div className="bg-slate-50 rounded-[2.5rem] p-8 space-y-6">
                        {post.comments.map(comment => (
                          <div key={comment.id} className="flex gap-4">
                             <div className="w-8 h-8 rounded-full bg-slate-200 shrink-0 overflow-hidden">
                                <img src={`https://i.pravatar.cc/150?u=${comment.authorId}`} className="w-full h-full object-cover" />
                             </div>
                             <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-200 shadow-sm flex-grow">
                                <div className="flex justify-between items-center mb-1">
                                   <p className="text-xs font-black text-slate-900">{comment.authorName}</p>
                                   <p className="text-[9px] font-bold text-slate-400">{formatDate(comment.timestamp)}</p>
                                </div>
                                <p className="text-sm text-slate-600">{renderContentWithMentions(comment.text)}</p>
                             </div>
                          </div>
                        ))}
                        
                        <div className="relative">
                           <input 
                             placeholder="Reply or mention @officer@netlink-gs.com..."
                             className="w-full p-4 pl-6 pr-14 bg-white rounded-2xl border-none outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-600 shadow-sm text-sm"
                             onKeyDown={(e) => {
                               if (e.key === 'Enter') {
                                 handleInteract(post.id, post.authorId, 'comment', (e.target as HTMLInputElement).value);
                                 (e.target as HTMLInputElement).value = '';
                               }
                             }}
                           />
                           <button className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-600">
                              <Send size={18} />
                           </button>
                        </div>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        )}

        {activeTab === 'employees' && isHR && (
          <div className="space-y-10 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="space-y-1">
                <h2 className="text-4xl font-black text-slate-900 leading-tight uppercase">Corporate <span className="text-blue-600">Staff</span></h2>
                <p className="text-slate-500 font-medium">Manage corporate access and performance tiers.</p>
              </div>
              <div className="relative w-full md:w-96">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                 <input 
                   type="text"
                   placeholder="Search by name, role or department..."
                   className="w-full pl-12 pr-4 py-3 bg-white rounded-2xl border-none outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-500 shadow-sm font-medium"
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                 />
              </div>
            </div>

            <div className="grid gap-6">
              {filteredEmployees.map(emp => (
                <div key={emp.id} className="bg-white p-6 rounded-[2.5rem] shadow-sm border flex flex-col md:flex-row items-center gap-8 group hover:shadow-xl hover:border-blue-100 transition-all">
                   <div className="relative w-24 h-24 shrink-0">
                      <img src={emp.photo} className="w-full h-full rounded-[2rem] object-cover" />
                      <button onClick={() => empFileRefs.current[emp.id]?.click()} className="absolute -bottom-1 -right-1 bg-white p-2 rounded-full shadow-lg text-slate-400 hover:text-blue-600">
                         <Camera size={14} />
                      </button>
                      <input type="file" ref={(el) => { if (el) empFileRefs.current[emp.id] = el; }} className="hidden" onChange={(e) => handleEmployeePhotoUpload(emp.id, e)} />
                   </div>
                   <div className="flex-grow space-y-3 text-center md:text-left">
                      <div>
                        <h4 className="text-xl font-black text-slate-900 leading-none">{emp.name}</h4>
                        <p className="text-[#22c55e] font-black text-[10px] uppercase tracking-widest mt-1">{emp.role}</p>
                      </div>
                      <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                         <span className="px-3 py-1 bg-slate-100 rounded-full text-[9px] font-black uppercase text-slate-500">{emp.department}</span>
                         <span className="px-3 py-1 bg-blue-50 rounded-full text-[9px] font-black uppercase text-blue-600">{emp.seniority}</span>
                      </div>
                   </div>
                   <div className="flex items-center gap-8 px-8 border-x border-slate-100">
                      <div className="text-center">
                         <p className="text-[10px] font-black text-slate-400 uppercase">Performance</p>
                         <div className="flex items-center gap-2">
                           <span className="text-lg font-black">{emp.performanceScore}%</span>
                           <PerformanceSparkline data={emp.performanceHistory} />
                         </div>
                      </div>
                      <div className="text-center">
                         <p className="text-[10px] font-black text-slate-400 uppercase">Reports</p>
                         <p className="text-lg font-black text-slate-900">{emp.reportsCount || 0}</p>
                      </div>
                      {isAdmin && (
                        <div className="text-center">
                           <p className="text-[10px] font-black text-slate-400 uppercase">Salary (ETB)</p>
                           <p className="text-lg font-black text-slate-900">{emp.baseSalary.toLocaleString()}</p>
                        </div>
                      )}
                   </div>
                   <div className="flex gap-2">
                      <button onClick={() => setShowTaskReview(emp.id)} className="p-4 bg-blue-50 text-blue-600 rounded-2xl hover:bg-blue-600 hover:text-white transition-all"><History size={18} /></button>
                      <button onClick={() => deleteEmployee(emp.id)} className="p-4 bg-red-50 text-red-500 rounded-2xl hover:bg-red-600 hover:text-white transition-all"><Trash2 size={18} /></button>
                   </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'awards' && isHR && (
           <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in duration-500">
              <header className="space-y-2">
                 <h2 className="text-5xl font-black text-slate-900 leading-none tracking-tighter uppercase">Hall of <span className="text-yellow-600">Excellence</span></h2>
                 <p className="text-slate-500 font-medium italic">Publish the "Winner of the Quarter" to the main homepage.</p>
              </header>
              <div className="grid md:grid-cols-2 gap-12">
                 <div className="bg-white p-10 rounded-[3.5rem] shadow-sm border space-y-8">
                    <h3 className="text-xl font-black flex items-center gap-3"><Settings className="text-yellow-500" /> Award Config</h3>
                    <div className="space-y-6">
                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-2">Champion</label>
                          <select className="w-full p-4 bg-slate-50 rounded-2xl border-none outline-none font-bold" value={awardData.name} onChange={(e) => {
                             const selected = employees.find(emp => emp.name === e.target.value);
                             if (selected) setAwardData({ ...awardData, name: selected.name, photo: selected.photo });
                          }}>
                             {employees.map(e => <option key={e.id} value={e.name}>{e.name}</option>)}
                          </select>
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-2">Achievement</label>
                          <input type="text" className="w-full p-4 bg-slate-50 rounded-2xl border-none outline-none font-bold" value={awardData.achievement} onChange={(e) => setAwardData({ ...awardData, achievement: e.target.value })} />
                       </div>
                       <button onClick={handleSaveAward} className="w-full bg-yellow-600 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-yellow-700 transition-all shadow-xl">Publish to Home</button>
                    </div>
                 </div>
                 <div className="bg-slate-900 rounded-[3.5rem] p-8 text-white text-center space-y-6">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-yellow-500">Live Preview</h4>
                    <img src={awardData.photo} className="w-48 h-48 mx-auto rounded-full object-cover border-4 border-yellow-500" />
                    <p className="text-3xl font-black">{awardData.name}</p>
                 </div>
              </div>
           </div>
        )}

        {activeTab === 'settings' && isAdmin && (
          <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in duration-500">
            <header className="space-y-2">
              <h2 className="text-5xl font-black text-slate-900 leading-none tracking-tighter uppercase">Corporate <span className="text-blue-600">Identity</span></h2>
            </header>
            <div className="bg-white p-12 rounded-[4rem] shadow-sm border grid lg:grid-cols-2 gap-16">
              <div className="space-y-8">
                <input className="w-full p-4 bg-slate-50 rounded-2xl border-none outline-none font-bold" value={owner.name} onChange={(e) => setOwner({...owner, name: e.target.value})} />
                <textarea rows={6} className="w-full p-4 bg-slate-50 rounded-2xl border-none outline-none font-medium" value={owner.bio} onChange={(e) => setOwner({...owner, bio: e.target.value})} />
                <button onClick={() => { saveOwnerData(owner); triggerSaveIndicator("Corporate Identity Updated!"); }} className="w-full bg-blue-600 text-white py-5 rounded-[2rem] font-black text-lg shadow-xl">Deploy Sync</button>
              </div>
              <div className="relative group cursor-pointer" onClick={() => ownerFileRef.current?.click()}>
                 <img src={owner.image} className="w-full h-[400px] rounded-[3rem] object-cover shadow-2xl" />
                 <input type="file" ref={ownerFileRef} className="hidden" onChange={async (e) => { if (e.target.files?.[0]) { const b = await fileToBase64(e.target.files[0]); setOwner({...owner, image: b}); } }} />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'content' && isHR && (
          <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
               <h2 className="text-5xl font-black text-slate-900 uppercase">Corporate <span className="text-blue-600">Feed</span></h2>
               <button onClick={() => { const i: NewsItem = { id: Date.now().toString(), title: 'New Update', content: '...', date: new Date().toISOString().split('T')[0], type: 'News', author: role.toUpperCase() }; const u = [i, ...news]; setNews(u); saveNews(u); }} className="bg-slate-900 text-white p-4 rounded-2xl"><Plus size={24} /></button>
            </div>
            <div className="space-y-6">
               {news.map(item => (
                 <div key={item.id} className="bg-white p-8 rounded-[3rem] shadow-sm border space-y-4">
                    <input className="w-full text-2xl font-black text-slate-900 bg-transparent" value={item.title} onChange={(e) => { const u = news.map(n => n.id === item.id ? { ...n, title: e.target.value } : n); setNews(u); saveNews(u); }} />
                    <textarea rows={3} className="w-full text-slate-600 font-medium bg-transparent" value={item.content} onChange={(e) => { const u = news.map(n => n.id === item.id ? { ...n, content: e.target.value } : n); setNews(u); saveNews(u); }} />
                 </div>
               ))}
            </div>
          </div>
        )}
      </div>

      {/* Performance Review Modal */}
      {showTaskReview && (
         <div className="fixed inset-0 z-[400] bg-slate-950/60 backdrop-blur-md flex items-center justify-center p-6">
            <div className="bg-white rounded-[4rem] p-12 max-w-xl w-full space-y-8 shadow-2xl animate-in zoom-in duration-300">
               <div className="flex justify-between items-start">
                  <h3 className="text-3xl font-black text-slate-900 uppercase">Performance <span className="text-blue-600">Audit</span></h3>
                  <button onClick={() => setShowTaskReview(null)} className="p-4 bg-slate-100 rounded-2xl"><X size={20} /></button>
               </div>
               <form onSubmit={(e) => { e.preventDefault(); const emp = employees.find(e => e.id === showTaskReview); if (emp) { const h = [...emp.performanceHistory, reviewScore].slice(-10); handleUpdateEmployee(emp.id, 'performanceScore', reviewScore); handleUpdateEmployee(emp.id, 'performanceHistory', h); setShowTaskReview(null); triggerSaveIndicator("Audit Committed!"); } }} className="space-y-10">
                  <div className="flex justify-between items-end">
                     <label className="text-sm font-black text-slate-400 uppercase">KPI Score</label>
                     <span className="text-5xl font-black text-blue-600">{reviewScore}%</span>
                  </div>
                  <input type="range" min="0" max="100" className="w-full h-3 bg-slate-100 rounded-full appearance-none cursor-pointer accent-blue-600" value={reviewScore} onChange={(e) => setReviewScore(parseInt(e.target.value))} />
                  <button type="submit" className="w-full bg-slate-900 text-white py-6 rounded-[2rem] font-black text-lg hover:bg-blue-600 transition-all shadow-xl">Commit Review</button>
               </form>
            </div>
         </div>
      )}
    </div>
  );
};

export default Dashboard;
