
import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Dashboard from './components/Dashboard';
import Chatbot from './components/Chatbot';

const App: React.FC = () => {
  const [activePath, setActivePath] = useState('/');
  const [user, setUser] = useState<{ role: 'admin' | 'officer' | 'employee', id: string } | null>(null);

  const renderContent = () => {
    if (activePath === '/dashboard' && user) {
      return (
        <Dashboard 
          role={user.role} 
          userId={user.id} 
          onLogout={() => { 
            setUser(null); 
            setActivePath('/'); 
          }} 
        />
      );
    }

    switch (activePath) {
      case '/': return <Home onNavigate={setActivePath} />;
      case '/about': return <About />;
      case '/services': return <Services />;
      case '/contact': return <Contact />;
      default: return <Home onNavigate={setActivePath} />;
    }
  };

  const isDashboard = activePath === '/dashboard' && user;

  return (
    <div className="flex flex-col min-h-screen">
      {!isDashboard && (
        <Header 
          activePath={activePath} 
          onNavigate={setActivePath} 
          onLoginClick={() => {
            // Mock Login: Points to /api/users in production
            setUser({ role: 'admin', id: '1' });
            setActivePath('/dashboard');
          }} 
        />
      )}
      <main className={`flex-grow ${!isDashboard ? 'pt-16' : ''}`}>
        {renderContent()}
      </main>
      {!isDashboard && <Footer />}
      {!isDashboard && <Chatbot />}
    </div>
  );
};

export default App;
