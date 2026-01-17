
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Chatbot from './components/Chatbot';
import Dashboard from './components/Dashboard';
import { getEmployees } from './services/mockDataService';
import { LogIn, Shield, User, Lock, ArrowRight, HelpCircle } from 'lucide-react';

type Role = 'admin' | 'officer' | 'employee' | null;

const App: React.FC = () => {
  const [activePath, setActivePath] = useState('/');
  const [currentUser, setCurrentUser] = useState<Role>(null);
  const [loggedInUserId, setLoggedInUserId] = useState<string | null>(null);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [showLogin, setShowLogin] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Scroll to top on navigation
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activePath]);

  // Helper to generate email format: firstname@netlink-gs.com
  const generateEmail = (name: string) => {
    const cleanName = name.replace(/^(Mr\.|Ms\.|Mrs\.|Dr\.|Eng\.)\s+/i, '');
    const firstName = cleanName.split(' ')[0].toLowerCase();
    return `${firstName}@netlink-gs.com`;
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const staff = getEmployees();
    
    // Check for system roles
    if (loginForm.email === 'admin@netlink-gs.com' && loginForm.password === 'admin123') {
      setCurrentUser('admin');
      setShowLogin(false);
      setActivePath('/dashboard');
      return;
    } 
    
    if (loginForm.email === 'officer@netlink-gs.com' && loginForm.password === 'officer123') {
      setCurrentUser('officer');
      setShowLogin(false);
      setActivePath('/dashboard');
      return;
    }

    // Check dynamic employees
    const matchedEmployee = staff.find(emp => {
      const email = generateEmail(emp.name);
      return loginForm.email === email && loginForm.password === 'password123';
    });

    if (matchedEmployee) {
      setCurrentUser('employee');
      setLoggedInUserId(matchedEmployee.id);
      setShowLogin(false);
      setActivePath('/dashboard');
    } else {
      alert("Invalid credentials. Please check the email format or password.");
    }
  };

  const renderContent = () => {
    if (activePath === '/dashboard' && currentUser) {
      return (
        <Dashboard 
          role={currentUser} 
          userId={loggedInUserId}
          onLogout={() => {
            setCurrentUser(null);
            setLoggedInUserId(null);
            setActivePath('/');
          }} 
        />
      );
    }

    if (showLogin) {
      const staff = getEmployees();
      return (
        <div className="pt-32 pb-24 min-h-screen bg-slate-900 flex items-center justify-center p-6">
          <div className="bg-white p-10 md:p-16 rounded-[3rem] shadow-2xl w-full max-w-lg space-y-10 animate-in zoom-in duration-500 relative">
            <div className="text-center space-y-2">
              <h2 className="text-4xl font-black text-slate-900 leading-tight tracking-tighter uppercase">NetLink Portal</h2>
              <p className="text-slate-500 font-medium italic">Secure Enterprise Access</p>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-2">Email Address</label>
                <div className="relative">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input 
                    type="text" 
                    className="w-full pl-14 pr-6 py-4 bg-slate-50 border-2 border-transparent focus:border-blue-600 outline-none rounded-2xl transition-all font-bold"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                    placeholder="firstname@netlink-gs.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input 
                    type="password" 
                    className="w-full pl-14 pr-6 py-4 bg-slate-50 border-2 border-transparent focus:border-blue-600 outline-none rounded-2xl transition-all font-bold"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button className="w-full bg-[#414bb2] text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-blue-800 transition-all group shadow-xl shadow-blue-900/20">
                Sign In <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </button>

              <div className="flex flex-col items-center gap-4">
                <button 
                  type="button" 
                  onClick={() => setShowHint(!showHint)}
                  className="text-xs font-black text-slate-400 hover:text-blue-600 flex items-center gap-2 transition-colors uppercase tracking-widest"
                >
                  <HelpCircle size={16} /> {showHint ? 'Hide Login Hint' : 'Forgot Login Format?'}
                </button>
                <button type="button" onClick={() => setShowLogin(false)} className="text-sm font-bold text-slate-400 hover:text-slate-900 transition-colors">Return to Homepage</button>
              </div>

              {showHint && (
                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 text-[10px] space-y-3 animate-in fade-in slide-in-from-bottom duration-300">
                   <p className="font-black text-slate-400 uppercase tracking-widest border-b pb-2">Active Staff Directory</p>
                   <div className="grid grid-cols-2 gap-2">
                      <div className="font-bold text-blue-600">admin@netlink-gs.com</div>
                      <div className="text-slate-400 italic">Pass: admin123</div>
                      {staff.map(s => (
                        <React.Fragment key={s.id}>
                          <div className="font-bold text-slate-700">{generateEmail(s.name)}</div>
                          <div className="text-slate-400">Pass: password123</div>
                        </React.Fragment>
                      ))}
                   </div>
                </div>
              )}
            </form>
          </div>
        </div>
      );
    }

    switch (activePath) {
      case '/':
        return <Home onNavigate={setActivePath} />;
      case '/about':
        return <About />;
      case '/services':
      case '/solutions':
        return <Services />;
      case '/contact':
        return <Contact />;
      case '/careers':
        return (
          <div className="pt-24 min-h-screen bg-slate-50">
            <div className="container mx-auto px-6 pt-16 pb-12 text-center space-y-8">
              <h1 className="text-5xl md:text-7xl font-black text-slate-900">Grow With <span className="text-gradient">NetLink</span></h1>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Join our team of 20+ experts. We are always looking for the brightest minds in 
                software engineering, infrastructure, and business development.
              </p>
            </div>
            <Contact initialSubject="Career Application" />
          </div>
        );
      default:
        return <Home onNavigate={setActivePath} />;
    }
  };

  return (
    <Layout 
      activePath={activePath} 
      onNavigate={setActivePath}
      isDashboard={activePath === '/dashboard'}
      onLoginClick={() => setShowLogin(true)}
    >
      {renderContent()}
      {!showLogin && activePath !== '/dashboard' && <Chatbot />}
    </Layout>
  );
};

export default App;
