import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

// Komponente
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { Background } from './components/Background';

// Stranice
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';
import { Tools } from './pages/Tools';
import { CustomStrings } from './pages/CustomStrings';
import { SavedScans } from './pages/SavedScans';
import { Affiliate } from './pages/Affiliate';
import { Changelogs } from './pages/Changelogs';
import { Profile } from './pages/Profile';
import { Settings } from './pages/Settings';

const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

const AppContent = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <div className="flex min-h-screen bg-black text-[#e8e6e3] font-sans selection:bg-[#39de7f]/30">
      <Background />
      {!isLoginPage && <Sidebar />}
      
      <main className={`flex-1 relative z-10 ${!isLoginPage ? 'ml-72' : ''}`}>
        {!isLoginPage && <Navbar />}
        <div className={!isLoginPage ? 'p-10' : ''}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<PageWrapper><Dashboard /></PageWrapper>} />
              <Route path="/tools" element={<PageWrapper><Tools /></PageWrapper>} />
              <Route path="/custom-strings" element={<PageWrapper><CustomStrings /></PageWrapper>} />
              <Route path="/saved-scans" element={<PageWrapper><SavedScans /></PageWrapper>} />
              <Route path="/affiliate" element={<PageWrapper><Affiliate /></PageWrapper>} />
              <Route path="/changelogs" element={<PageWrapper><Changelogs /></PageWrapper>} />
              <Route path="/profile" element={<PageWrapper><Profile /></PageWrapper>} />
              <Route path="/settings" element={<PageWrapper><Settings /></PageWrapper>} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}