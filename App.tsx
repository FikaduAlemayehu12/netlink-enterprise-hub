
import React, { useState } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Dashboard from './components/Dashboard';
import Chatbot from './components/Chatbot';
import { Employee } from './types';

const App: React.FC = () => {
  const [activePath, setActivePath] = useState('/');
  const [user, setUser] = useState<Employee | null>(null);

  const handleLoginSuccess = (authenticatedUser: Employee) => {
    setUser(authenticatedUser);
    setActivePath('/dashboard');
    window.scrollTo(0, 0);
  };

  const handleLogout = () => {
    setUser(null);
    setActivePath('/');
    window.scrollTo(0, 0);
  };

  if (activePath === '/login' && !user) {
    return <Login onLoginSuccess={handleLoginSuccess} onNavigateHome={() => setActivePath('/')} />;
  }

  const renderContent = () => {
    if (activePath === '/dashboard' && user) {
      return (
        <Dashboard 
          role={user.role === 'CEO' ? 'admin' : user.role === 'HR' ? 'officer' : 'employee'} 
          userId={user.id} 
          onLogout={handleLogout} 
        />
      );
    }

    switch (activePath) {
      case '/': return <Home onNavigate={setActivePath} />;
      case '/about': return <About />;
      case '/services': return <Services />;
      case '/contact': return <Contact />;
      case '/careers': return <Contact initialSubject="Career Application" />;
      case '/solutions': return <Services />;
      default: return <Home onNavigate={setActivePath} />;
    }
  };

  const isDashboard = activePath === '/dashboard' && user;

  return (
    <div className="flex flex-col min-h-screen">
      <Layout 
        activePath={activePath} 
        onNavigate={(path) => { setActivePath(path); window.scrollTo(0, 0); }} 
        isDashboard={!!isDashboard}
        onLoginClick={() => setActivePath('/login')}
      >
        <main className={`flex-grow ${!isDashboard ? 'pt-0' : ''}`}>
          {renderContent()}
        </main>
      </Layout>
      {!isDashboard && <Chatbot />}
    </div>
  );
};

export default App;
