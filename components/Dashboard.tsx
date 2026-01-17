
import React, { useState, useEffect, useRef } from 'react';
import { Settings, Users, FileText, Award, Save, Plus, Trash2, TrendingUp, DollarSign, Camera, Briefcase, ShieldCheck, X, Image as ImageIcon, Briefcase as RoleIcon, Upload, Check, UserCircle, Lock, Zap, Target, History, Trophy, Star, Crown } from 'lucide-react';
import { 
  getOwnerData, saveOwnerData, 
  getEmployees, saveEmployees, 
  getNews, saveNews,
  getAppreciation, saveAppreciation,
  fileToBase64,
  Employee, NewsItem, Department, Seniority 
} from '../services/mockDataService';

interface DashboardProps {
  role: 'admin' | 'officer' | 'employee';
  userId?: string | null;
  onLogout: () => void;
}

const PREDEFINED_ROLES = [
  'Network Engineer',
  'Software Developer',
  'Sales Executive',
  'Lead Software Engineer',
  'CTO',
  'Facility Engineer',
  'System Integrator',
  'Project Manager',
  'HR Manager',
  'Communication Officer',
  'Security Specialist'
];

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
      <path
        d={`M 0,${height} ${points.split(' ').map((p, i) => (i === 0 ? `L ${p}` : `L ${p}`)).join(' ')} L ${width},${height} Z`}
        fill="url(#sparkGradient)"
      />
      <polyline
        fill="none"
        stroke="#3b82f6"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
      <circle
        cx={points.split(' ').pop()?.split(',')[0]}
        cy={points.split(' ').pop()?.split(',')[1]}
        r="3"
        fill="#3b82f6"
      />
    </svg>
  );
};

const Dashboard: React.FC<DashboardProps> = ({ role, userId, onLogout }) => {
  const isAdmin = role === 'admin';
  const isOfficer = role === 'officer';
  const isHR = isAdmin || isOfficer;
  
  const initialTab = isAdmin ? 'settings' : (isHR ? 'employees' : 'profile');
  const [activeTab, setActiveTab] = useState<'settings' | 'employees' | 'content' | 'profile' | 'awards'>(initialTab as any);
  
  const [owner, setOwner] = useState(getOwnerData());
  const [employees, setEmployees] = useState<Employee[]>(getEmployees());
  const [news, setNews] = useState<NewsItem[]>(getNews());
  const [appreciation, setAppreciation] = useState(getAppreciation());
  
  const [saveIndicator, setSaveIndicator] = useState<string | null>(null);
  const [showTaskReview, setShowTaskReview] = useState<string | null>(null); 
  const [reviewScore, setReviewScore] = useState(80);
  
  // Award State
  const [awardData, setAwardData] = useState(appreciation);

  const ownerFileRef = useRef<HTMLInputElement>(null);
  const empFileRefs = useRef<{ [key: string]: HTMLInputElement }>({});

  const currentEmployee = employees.find(e => e.id === userId);

  const triggerSaveIndicator = (msg: string) => {
    setSaveIndicator(msg);
    setTimeout(() => setSaveIndicator(null), 3000);
  };

  const handleUpdateEmployee = (id: string, field: keyof Employee, value: any) => {
    if (role === 'employee') {
      if (id !== userId) return;
      if (field !== 'name' && field !== 'photo') return;
    }
    
    if (isOfficer && field === 'id' && value === 'delete') return;

    const updated = employees.map(e => e.id === id ? { ...e, [field]: value } : e);
    setEmployees(updated);
    saveEmployees(updated);
  };

  const submitPerformanceReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!showTaskReview) return;
    
    const updated = employees.map(emp => {
      if (emp.id === showTaskReview) {
        const history = [...emp.performanceHistory, reviewScore].slice(-10);
        return { ...emp, performanceScore: reviewScore, performanceHistory: history };
      }
      return emp;
    });
    
    setEmployees(updated);
    saveEmployees(updated);
    setShowTaskReview(null);
    triggerSaveIndicator("Performance Review Synced!");
  };

  const handleSaveAward = () => {
    saveAppreciation(awardData);
    setAppreciation(awardData);
    triggerSaveIndicator("Quarterly Award Published!");
  };

  const handleEmployeePhotoUpload = async (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const base64 = await fileToBase64(e.target.files[0]);
      handleUpdateEmployee(id, 'photo', base64);
      triggerSaveIndicator("Profile photo updated!");
    }
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

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans selection:bg-blue-100">
      {/* Toast Notification */}
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
              <UserCircle size={20} /> My Profile
            </button>
          )}

          {isAdmin && (
            <button 
              onClick={() => setActiveTab('settings')}
              className={`flex items-center gap-4 p-4 rounded-2xl transition-all font-bold text-sm ${activeTab === 'settings' ? 'bg-blue-600 shadow-xl' : 'hover:bg-white/5 text-slate-400'}`}
            >
              <Settings size={20} /> CEO Profile
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
              <Trophy size={20} /> Recognition
            </button>
          )}

          {isHR && (
            <button 
              onClick={() => setActiveTab('content')}
              className={`flex items-center gap-4 p-4 rounded-2xl transition-all font-bold text-sm ${activeTab === 'content' ? 'bg-blue-600 shadow-xl' : 'hover:bg-white/5 text-slate-400'}`}
            >
              <FileText size={20} /> News & Events
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
                  {role === 'employee' ? currentEmployee?.name.split(' ')[0] : role}
                </p>
                <p className="text-[9px] text-slate-500 font-bold uppercase">Online Now</p>
             </div>
          </div>
          <button onClick={onLogout} className="w-full py-3 rounded-xl bg-red-600/10 text-red-500 hover:bg-red-600 hover:text-white transition-all font-black text-[10px] uppercase tracking-widest">Logout</button>
        </div>
      </div>

      {/* Performance Review Modal */}
      {showTaskReview && isHR && (
        <div className="fixed inset-0 z-[400] bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-lg rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100 animate-in zoom-in duration-300">
              <div className="bg-slate-950 p-8 text-white flex justify-between items-center">
                 <div className="flex items-center gap-4">
                    <Zap className="text-yellow-400" />
                    <div>
                      <h3 className="text-xl font-black uppercase tracking-tighter">Performance Update</h3>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Task-Based Evaluation</p>
                    </div>
                 </div>
                 <button onClick={() => setShowTaskReview(null)}><X size={24} /></button>
              </div>
              <form onSubmit={submitPerformanceReview} className="p-10 space-y-8">
                 <div className="space-y-4">
                    <div className="flex justify-between text-sm font-black text-slate-900 uppercase tracking-widest">
                       <label>New KPI Score</label>
                       <span className="text-blue-600">{reviewScore}%</span>
                    </div>
                    <input 
                       type="range" min="0" max="100" value={reviewScore} 
                       onChange={(e) => setReviewScore(parseInt(e.target.value))}
                       className="w-full h-3 bg-slate-100 rounded-full appearance-none cursor-pointer accent-blue-600 border"
                    />
                 </div>
                 
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Reviewer Notes (Optional)</label>
                    <textarea 
                      placeholder="e.g. Excellent delivery on the Ministry of Revenue integration project..."
                      className="w-full p-5 bg-slate-50 border-none rounded-2xl outline-none font-medium text-sm min-h-[100px]"
                    />
                 </div>

                 <button type="submit" className="w-full bg-[#414bb2] text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 shadow-xl hover:bg-blue-800 transition-all">
                    Commit Score Update <Check />
                 </button>
              </form>
           </div>
        </div>
      )}

      {/* Main Area */}
      <div className="flex-grow p-12 overflow-y-auto max-h-screen scroll-smooth">
        
        {/* TAB: Profile (Self Service for Employees) */}
        {activeTab === 'profile' && currentEmployee && (
          <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom duration-500">
             <header className="space-y-2">
                <h2 className="text-5xl font-black text-slate-900 leading-none tracking-tighter uppercase">My <span className="text-blue-600">Workspace</span></h2>
                <p className="text-slate-500 text-lg font-medium italic">Your personalized professional dashboard at NetLink.</p>
             </header>

             <div className="bg-white p-12 rounded-[4rem] shadow-sm border space-y-12">
                <div className="flex flex-col md:flex-row gap-12 items-center">
                   <div className="relative group w-48 h-48 shrink-0">
                      <img src={currentEmployee.photo} className="w-full h-full rounded-[3rem] object-cover shadow-2xl border-4 border-slate-50" />
                      <button 
                        onClick={() => empFileRefs.current[currentEmployee.id]?.click()}
                        className="absolute inset-0 bg-blue-600/60 rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white"
                      >
                        <Upload size={32} className="mb-2" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Update Photo</span>
                      </button>
                      <input type="file" hidden ref={el => { if (el) empFileRefs.current[currentEmployee.id] = el; }} accept="image/*" onChange={(e) => handleEmployeePhotoUpload(currentEmployee.id, e)} />
                   </div>
                   
                   <div className="space-y-6 flex-grow">
                      <div>
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-1">Your Name</label>
                        <input 
                          className="text-3xl font-black text-slate-900 bg-transparent border-none outline-none focus:text-blue-600 w-full" 
                          value={currentEmployee.name} 
                          onChange={(e) => handleUpdateEmployee(currentEmployee.id, 'name', e.target.value)} 
                        />
                      </div>
                      <div className="flex flex-wrap gap-4">
                         <div className="bg-blue-50 px-6 py-2 rounded-full border border-blue-100 flex items-center gap-2">
                            <span className="text-[10px] font-black uppercase text-blue-600 tracking-widest">{currentEmployee.seniority}</span>
                            <Lock size={10} className="text-blue-300" />
                         </div>
                         <div className="bg-slate-50 px-6 py-2 rounded-full border border-slate-200">
                            <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">{currentEmployee.department}</span>
                         </div>
                      </div>
                   </div>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                   <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block flex items-center gap-2">Designated Role <Lock size={10}/></label>
                      <div className="w-full p-4 bg-slate-50 rounded-2xl border text-slate-400 font-bold flex justify-between items-center italic">
                        {currentEmployee.role}
                        <span className="text-[8px] uppercase tracking-widest font-black opacity-30">Admin Restricted</span>
                      </div>
                   </div>
                   <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block">Active Development Plan</label>
                      <input className="w-full p-4 bg-slate-50 rounded-2xl border outline-none font-bold text-blue-600 italic" value={currentEmployee.plan} readOnly />
                   </div>
                </div>

                <div className="pt-12 border-t flex flex-col md:flex-row justify-between items-center gap-12 bg-slate-50 -mx-12 -mb-12 p-12 rounded-b-[4rem]">
                   <div className="flex items-center gap-8 w-full md:w-auto">
                      <div className="bg-white p-6 rounded-[2rem] border shadow-inner">
                        <p className="text-[8px] font-black uppercase text-slate-400 tracking-widest mb-2">KPI Trend</p>
                        <PerformanceSparkline data={currentEmployee.performanceHistory} />
                      </div>
                      <div>
                        <p className="text-4xl font-black text-blue-600 leading-none">{currentEmployee.performanceScore}%</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Live Performance Index</p>
                      </div>
                   </div>
                   <div className="text-right">
                      <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Total Compensation</p>
                      <p className="text-3xl font-black text-slate-900 leading-none">{currentEmployee.baseSalary.toLocaleString()} <span className="text-xs font-bold text-blue-500">ETB</span></p>
                   </div>
                </div>
             </div>
          </div>
        )}

        {/* TAB: Quarterly Awards Management */}
        {activeTab === 'awards' && isHR && (
          <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom duration-500">
             <header className="space-y-2 text-center md:text-left">
                <h2 className="text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">Hall of <span className="text-yellow-600">Excellence</span></h2>
                <p className="text-slate-500 text-lg font-medium italic">Select the quarterly high-performer for the homepage spotlight.</p>
             </header>

             <div className="grid lg:grid-cols-2 gap-12">
                {/* Form */}
                <div className="bg-white p-12 rounded-[4rem] shadow-sm border space-y-10">
                   <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block">Select Employee of the Quarter</label>
                      <div className="relative">
                        <Users className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <select 
                          className="w-full pl-14 pr-6 py-5 bg-slate-50 border-none rounded-3xl outline-none font-black text-slate-800 appearance-none focus:ring-2 focus:ring-yellow-500"
                          value={employees.find(e => e.name === awardData.name)?.id || ""}
                          onChange={(e) => {
                            const emp = employees.find(emp => emp.id === e.target.value);
                            if (emp) {
                              setAwardData({ ...awardData, name: emp.name, photo: emp.photo });
                            }
                          }}
                        >
                          <option value="">Choose Staff Member...</option>
                          {employees.map(e => (
                            <option key={e.id} value={e.id}>{e.name} ({e.role})</option>
                          ))}
                        </select>
                      </div>
                   </div>

                   <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block">Achievement Title</label>
                      <input 
                        className="w-full px-8 py-5 bg-slate-50 rounded-3xl border-none outline-none font-bold text-slate-900 focus:ring-2 focus:ring-yellow-500"
                        placeholder="e.g. Excellence in Software Architecture"
                        value={awardData.achievement}
                        onChange={(e) => setAwardData({ ...awardData, achievement: e.target.value })}
                      />
                   </div>

                   <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block">Evaluation Period</label>
                      <input 
                        className="w-full px-8 py-5 bg-slate-50 rounded-3xl border-none outline-none font-bold text-slate-900 focus:ring-2 focus:ring-yellow-500"
                        placeholder="e.g. Q3 2024"
                        value={awardData.period}
                        onChange={(e) => setAwardData({ ...awardData, period: e.target.value })}
                      />
                   </div>

                   <button 
                     onClick={handleSaveAward}
                     className="w-full bg-yellow-500 text-white py-6 rounded-[2rem] font-black text-xl flex items-center justify-center gap-4 hover:bg-yellow-600 transition-all shadow-xl shadow-yellow-100 uppercase"
                   >
                     <Trophy size={28} /> Publish Award
                   </button>
                </div>

                {/* Enhanced Champion's Frame Live Preview */}
                <div className="bg-slate-900 rounded-[4rem] p-12 text-white relative overflow-hidden flex flex-col items-center justify-center text-center space-y-8 border-4 border-yellow-500/20">
                   {/* Decorative background elements */}
                   <div className="absolute top-0 right-0 p-8 opacity-10">
                      <Star size={120} className="animate-spin-slow" />
                   </div>
                   <div className="absolute bottom-0 left-0 p-8 opacity-10">
                      <Crown size={80} className="rotate-12" />
                   </div>
                   
                   {/* The Champion's Frame */}
                   <div className="relative group/frame">
                      {/* Outer Glowing Rings */}
                      <div className="absolute -inset-8 bg-yellow-500/20 rounded-full blur-3xl animate-pulse" />
                      <div className="absolute -inset-4 border-2 border-yellow-500/30 rounded-full animate-spin-slow" />
                      <div className="absolute -inset-2 border-4 border-yellow-500/50 rounded-full" />
                      
                      {/* Main Frame Container */}
                      <div className="relative z-10 p-2 bg-gradient-to-tr from-yellow-600 via-yellow-400 to-yellow-600 rounded-full shadow-[0_0_50px_rgba(234,179,8,0.4)]">
                        <div className="bg-slate-900 p-1 rounded-full">
                           <img src={awardData.photo} className="w-48 h-48 rounded-full object-cover grayscale-[0.2] group-hover/frame:grayscale-0 transition-all duration-700" />
                        </div>
                      </div>

                      {/* Badge / Sash overlay */}
                      <div className="absolute -bottom-4 -right-4 z-20 bg-yellow-500 text-slate-900 p-3 rounded-2xl shadow-xl transform rotate-12 group-hover/frame:scale-110 transition-transform">
                         <Trophy size={32} />
                      </div>
                      <div className="absolute -top-4 -left-4 z-20 bg-blue-600 text-white p-2 px-4 rounded-full shadow-xl font-black text-[10px] uppercase tracking-widest border-2 border-white transform -rotate-12">
                         CHAMPION
                      </div>
                   </div>

                   <div className="space-y-4 relative z-10">
                      <div className="text-yellow-400 font-black text-xs uppercase tracking-[0.4em] flex items-center justify-center gap-2">
                        <Star size={14} fill="currentColor" /> Hall of Fame <Star size={14} fill="currentColor" />
                      </div>
                      <h3 className="text-4xl font-black tracking-tight">{awardData.name}</h3>
                      <p className="text-blue-300 font-bold text-lg leading-snug">{awardData.achievement}</p>
                      <div className="pt-6 border-t border-white/10 mt-6 inline-block">
                        <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Certified Excellence • {awardData.period}</span>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        )}

        {/* TAB: Staff Directory (Admin & Officer View) */}
        {activeTab === 'employees' && isHR && (
          <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom duration-500">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="space-y-2">
                <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">Team <span className="text-blue-600">Analytics</span></h2>
                <p className="text-slate-500 font-medium italic">Global oversight for all {employees.length} professional profiles.</p>
              </div>
              {isAdmin && (
                <button 
                  onClick={() => {
                    const newEmp: Employee = {
                      id: Date.now().toString(),
                      name: 'New Talent',
                      role: 'Software Developer',
                      department: 'Software Engineering',
                      seniority: 'Junior',
                      photo: 'https://i.pravatar.cc/150',
                      baseSalary: 20000,
                      performanceScore: 50,
                      performanceHistory: [50],
                      plan: 'Probation',
                      evaluationFrequency: 'Monthly'
                    };
                    const updated = [...employees, newEmp];
                    setEmployees(updated);
                    saveEmployees(updated);
                    triggerSaveIndicator("Staff record initialized!");
                  }} 
                  className="bg-[#22c55e] text-white px-8 py-5 rounded-[2rem] font-black text-lg flex items-center gap-3 hover:bg-green-700 transition-all shadow-xl shadow-green-100"
                >
                  <Plus size={24} /> Register Staff
                </button>
              )}
            </header>

            <div className="grid gap-10">
              {employees.map(emp => {
                const bonus = (emp.performanceScore / 100) * (emp.baseSalary * 0.25);
                const total = emp.baseSalary + bonus;
                const isSelf = emp.id === userId;

                return (
                  <div key={emp.id} className={`bg-white p-10 rounded-[4rem] shadow-sm border space-y-8 group transition-all duration-300 relative ${isSelf ? 'ring-4 ring-blue-500/20' : ''}`}>
                    <div className="grid lg:grid-cols-12 gap-10 items-start">
                      
                      <div className="lg:col-span-3 text-center space-y-4">
                         <div className="relative group mx-auto w-32 h-32">
                            <img src={emp.photo} className="w-full h-full rounded-[2rem] object-cover shadow-2xl border-4 border-slate-50" />
                            <button 
                              onClick={() => empFileRefs.current[emp.id]?.click()}
                              className="absolute inset-0 bg-blue-600/50 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
                            >
                              <Upload size={24} />
                            </button>
                            <input type="file" hidden ref={el => { if (el) empFileRefs.current[emp.id] = el; }} accept="image/*" onChange={(e) => handleEmployeePhotoUpload(emp.id, e)} />
                         </div>
                         <div className="inline-block px-4 py-1 rounded-full bg-slate-100 text-[10px] font-black uppercase text-slate-400">ID: {emp.id}</div>
                      </div>

                      <div className="lg:col-span-5 space-y-6">
                        <div className="space-y-1">
                          <label className="text-[10px] font-black uppercase text-slate-400 flex items-center gap-2 tracking-widest">Employee Name</label>
                          <input className="text-3xl font-black text-slate-900 bg-transparent border-none outline-none focus:text-blue-600 w-full" value={emp.name} onChange={(e) => handleUpdateEmployee(emp.id, 'name', e.target.value)} />
                        </div>
                        
                        <div className="space-y-4">
                           <div className="space-y-1">
                              <label className="text-[10px] font-black uppercase text-slate-400 flex items-center gap-1 tracking-widest"><RoleIcon size={12} className="text-blue-600"/> Corporate Designation</label>
                              <select 
                                className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-blue-600 outline-none font-bold text-slate-800 shadow-inner appearance-none"
                                value={emp.role}
                                onChange={(e) => handleUpdateEmployee(emp.id, 'role', e.target.value)}
                              >
                                {PREDEFINED_ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                              </select>
                           </div>

                           <div className="grid grid-cols-2 gap-4">
                              <select className="p-3 bg-slate-50 rounded-xl border-none font-bold text-xs" value={emp.seniority} onChange={(e) => handleUpdateEmployee(emp.id, 'seniority', e.target.value as Seniority)}>
                                 <option>Junior</option><option>Regular</option><option>Senior</option><option>Lead</option><option>Executive</option>
                              </select>
                              <select className="p-3 bg-slate-50 rounded-xl border-none font-bold text-xs" value={emp.department} onChange={(e) => handleUpdateEmployee(emp.id, 'department', e.target.value as Department)}>
                                 <option>Software Engineering</option><option>IT & Network</option><option>Data Center & Facility</option><option>Business Development</option><option>Management</option>
                              </select>
                           </div>
                        </div>
                      </div>

                      <div className="lg:col-span-4 space-y-6 bg-slate-50 p-8 rounded-[3rem] border border-slate-100 shadow-inner relative overflow-hidden group/chart">
                         <div className="space-y-4 relative z-10">
                            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                               <span className="text-slate-400">KPI Performance</span>
                               <span className="text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">{emp.performanceScore}%</span>
                            </div>
                            
                            <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm">
                               <PerformanceSparkline data={emp.performanceHistory} />
                               <button 
                                 onClick={() => {setReviewScore(emp.performanceScore); setShowTaskReview(emp.id)}}
                                 className="ml-auto p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
                                 title="Update Performance"
                               >
                                 <Zap size={16} />
                               </button>
                            </div>
                         </div>

                         <div className="pt-6 border-t border-slate-200 relative z-10">
                            <div className="flex justify-between items-end">
                               <div className="space-y-1">
                                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Base Salary</label>
                                  <input 
                                    type="number" 
                                    className="bg-transparent border-b-2 border-slate-200 font-black text-slate-900 w-24 outline-none focus:border-green-500" 
                                    value={emp.baseSalary} 
                                    disabled={!isAdmin} // Only Admins change payroll
                                    onChange={(e) => handleUpdateEmployee(emp.id, 'baseSalary', parseInt(e.target.value))} 
                                  />
                               </div>
                               <div className="text-right">
                                  <div className="text-[9px] uppercase font-bold text-slate-400 mb-1">Estimated Payout</div>
                                  <div className="font-black text-2xl text-green-600 leading-none">{total.toLocaleString()} <span className="text-xs">ETB</span></div>
                               </div>
                            </div>
                         </div>
                         
                         <div className="absolute top-0 right-0 p-4 opacity-5 scale-150 rotate-12 -z-0">
                            <TrendingUp size={120} />
                         </div>
                      </div>
                    </div>

                    <div className="pt-6 border-t flex justify-between items-center text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">
                       <div className="flex gap-8">
                          <span className="flex items-center gap-2"><Target size={12} className="text-green-500"/> Verified Corporate Asset</span>
                          <span className="flex items-center gap-2"><History size={12} className="text-blue-500"/> History Tracked</span>
                       </div>
                       {isAdmin && !isSelf && (
                         <button onClick={() => deleteEmployee(emp.id)} className="text-slate-200 hover:text-red-500 transition-all flex items-center gap-2 group/del">
                           <span className="opacity-0 group-hover/del:opacity-100 transition-opacity text-[8px]">Purge Records</span>
                           <Trash2 size={24}/>
                         </button>
                       )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* CEO Settings (Admin Only) */}
        {activeTab === 'settings' && isAdmin && (
          <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom duration-500">
            <header className="space-y-2">
              <h2 className="text-5xl font-black text-slate-900 tracking-tighter uppercase">Brand <span className="text-blue-600">Identity</span></h2>
              <p className="text-slate-500 text-lg font-medium italic">High-level narrative and profile synchronization.</p>
            </header>

            <div className="bg-white p-12 rounded-[4rem] shadow-sm border space-y-12">
               <div className="flex flex-col lg:flex-row gap-12 items-center bg-slate-50 p-10 rounded-[3.5rem] border border-slate-100">
                  <div className="relative group w-56 h-56 shrink-0 shadow-2xl rounded-full border-8 border-white">
                     <img src={owner.image} className="w-full h-full rounded-full object-cover" />
                     <button 
                       onClick={() => ownerFileRef.current?.click()}
                       className="absolute inset-0 bg-black/70 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white"
                     >
                        <Upload size={32} className="mb-2" />
                        <span className="text-xs font-black uppercase tracking-widest">Update Photo</span>
                     </button>
                     <input type="file" hidden ref={ownerFileRef} accept="image/*" onChange={async (e) => {
                        if (e.target.files && e.target.files[0]) {
                           const base64 = await fileToBase64(e.target.files[0]);
                           setOwner({...owner, image: base64});
                        }
                     }} />
                  </div>
                  <div className="space-y-6 w-full">
                     <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-1">
                          <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Global Owner Name</label>
                          <input className="w-full p-5 bg-white rounded-3xl border focus:border-blue-600 outline-none font-black text-xl" value={owner.name} onChange={(e) => setOwner({...owner, name: e.target.value})} />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Company Title</label>
                          <input className="w-full p-5 bg-white rounded-3xl border focus:border-blue-600 outline-none font-black text-xl text-blue-600" value={owner.role} onChange={(e) => setOwner({...owner, role: e.target.value})} />
                        </div>
                     </div>
                  </div>
               </div>

               <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block">Executive Vision & Bio</label>
                  <textarea rows={8} className="w-full p-8 bg-slate-50 rounded-[3rem] border-none focus:ring-2 focus:ring-blue-500 outline-none font-medium leading-relaxed text-lg italic shadow-inner" value={owner.bio} onChange={(e) => setOwner({...owner, bio: e.target.value})} />
               </div>

               <button onClick={() => { saveOwnerData(owner); triggerSaveIndicator("Global profile updated!"); }} className="bg-[#414bb2] text-white px-16 py-6 rounded-[2rem] font-black text-xl flex items-center gap-4 hover:bg-blue-800 transition-all shadow-2xl shadow-blue-200">
                  <Save size={28} /> Publish Global Changes
               </button>
            </div>
          </div>
        )}

        {/* Content Feed (HR Only) */}
        {activeTab === 'content' && isHR && (
           <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom duration-500">
              <header className="flex justify-between items-center">
                <h2 className="text-5xl font-black text-slate-900 tracking-tighter uppercase">Broadcast <span className="text-blue-600">Feed</span></h2>
                <button 
                  onClick={() => {
                    const newItem: NewsItem = { id: Date.now().toString(), title: 'Draft Publication', content: 'Details...', date: new Date().toISOString().split('T')[0], type: 'News', author: role.toUpperCase() };
                    const updated = [newItem, ...news];
                    setNews(updated);
                    saveNews(updated);
                    triggerSaveIndicator("Broadcast draft created!");
                  }}
                  className="bg-blue-600 text-white px-10 py-5 rounded-[2rem] font-black text-lg shadow-xl"
                >
                  <Plus size={24} /> New Publication
                </button>
              </header>

              <div className="grid gap-10">
                 {news.map(item => (
                   <div key={item.id} className="bg-white p-12 rounded-[4rem] border space-y-8 shadow-sm group">
                      <div className="flex justify-between items-center">
                        <select 
                          className={`px-6 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest outline-none shadow-sm ${item.type === 'News' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}
                          value={item.type}
                          onChange={(e) => {
                            const updated = news.map(n => n.id === item.id ? {...n, type: e.target.value as any} : n);
                            setNews(updated);
                            saveNews(updated);
                          }}
                        >
                          <option>News</option>
                          <option>Event</option>
                        </select>
                        <button onClick={() => {const updated = news.filter(n => n.id !== item.id); setNews(updated); saveNews(updated); triggerSaveIndicator("Post removed.");}} className="text-slate-200 hover:text-red-500 transition-colors"><Trash2 size={28}/></button>
                      </div>
                      <input 
                        className="text-4xl font-black text-slate-900 bg-transparent border-none outline-none w-full border-b-2 border-transparent focus:border-blue-500 pb-2"
                        value={item.title}
                        onChange={(e) => {
                          const updated = news.map(n => n.id === item.id ? {...n, title: e.target.value} : n);
                          setNews(updated);
                          saveNews(updated);
                        }}
                      />
                      <textarea 
                        rows={6}
                        className="text-xl text-slate-600 bg-slate-50 p-10 rounded-[3rem] outline-none font-medium leading-relaxed w-full"
                        value={item.content}
                        onChange={(e) => {
                          const updated = news.map(n => n.id === item.id ? {...n, content: e.target.value} : n);
                          setNews(updated);
                          saveNews(updated);
                        }}
                      />
                      <div className="flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
                         <span className="flex items-center gap-2"><Check size={12} className="text-blue-500"/> Public Visibility Active</span>
                         <span>Published: {item.date} by {item.author}</span>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
