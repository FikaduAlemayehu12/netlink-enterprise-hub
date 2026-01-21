
import React, { useState } from 'react';
import { Mail, Lock, LogIn, ArrowRight, ShieldCheck, Loader2, AlertCircle, Key } from 'lucide-react';
import Logo from '../components/Logo';
import { getEmployees } from '../services/mockDataService';
import { Employee } from '../types';

interface LoginProps {
  onLoginSuccess: (user: Employee) => void;
  onNavigateHome: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess, onNavigateHome }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Simulate Network Latency
    await new Promise(resolve => setTimeout(resolve, 1000));

    const employees = getEmployees();
    const foundUser = employees.find(emp => 
      emp.email.toLowerCase() === email.toLowerCase() && 
      emp.password === password &&
      emp.status === 'Active'
    );

    if (foundUser) {
      onLoginSuccess(foundUser);
    } else {
      setError("Invalid corporate credentials or inactive account.");
      setLoading(false);
    }
  };

  const handleQuickAccess = () => {
    setEmail('fikadualemayehu@netlink-gs.com');
    setPassword('fikadu123');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-md relative z-10 animate-in fade-in zoom-in duration-500">
        <div className="mb-12 text-center cursor-pointer" onClick={onNavigateHome}>
          <div className="bg-white inline-block p-4 rounded-[2rem] mb-4 shadow-2xl transition-transform hover:scale-110">
            <Logo className="h-10" />
          </div>
          <h2 className="text-white font-black text-2xl tracking-tighter uppercase">Enterprise Hub</h2>
          <p className="text-slate-500 font-bold text-xs tracking-widest uppercase">Secure Terminal Access</p>
        </div>

        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-10 md:p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden">
          {/* Quick Access Floating Label */}
          <button 
            type="button"
            onClick={handleQuickAccess}
            className="absolute top-6 right-6 text-[9px] font-black text-emerald-400 uppercase tracking-widest bg-emerald-400/10 border border-emerald-400/20 px-3 py-1 rounded-full hover:bg-emerald-400 hover:text-white transition-all flex items-center gap-2"
          >
            <Key size={10} /> Quick Demo
          </button>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl flex items-center gap-3 text-red-400 text-sm font-bold animate-pulse">
                <AlertCircle size={18} /> {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Corporate Email</label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input 
                  required
                  type="email"
                  className="w-full bg-white/10 border border-white/5 rounded-2xl py-4 pl-14 pr-6 text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium placeholder:text-slate-600"
                  placeholder="name@netlink-gs.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Access Key</label>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input 
                  required
                  type="password"
                  className="w-full bg-white/10 border border-white/5 rounded-2xl py-4 pl-14 pr-6 text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium placeholder:text-slate-600"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button 
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-xl shadow-blue-900/40 disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" /> : <>Authenticate <ArrowRight size={18} /></>}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-white/5 text-center">
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-4">Secured by NetLink Shield</p>
            <div className="flex justify-center gap-4 grayscale opacity-40">
               <ShieldCheck size={24} className="text-white" />
            </div>
          </div>
        </div>
        
        <p className="text-center mt-8 text-slate-600 text-[10px] font-black uppercase tracking-widest">
          © 2025 NetLink General Solutions PLC
        </p>
      </div>
    </div>
  );
};

export default Login;
