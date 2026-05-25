import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { waitForBackend } from './services/api';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Feedback from './pages/Feedback';
import Dashboard from './pages/Dashboard';
import Blog from './pages/Blog';
import AdminDashboard from './pages/AdminDashboard';
import AdminContact from './pages/AdminContact';
import AdminLogin from './pages/AdminLogin';
import Navbar from './components/Navbar';
import AdminSubNav from './components/AdminSubNav';
import Footer from './components/Footer';
import { ThemeProvider } from './components/ThemeContext';
import { LanguageProvider } from './components/LanguageContext';
import { AuthProvider } from './components/AuthContext';
import { useAuth } from './components/useAuth';
import Work from './pages/Work';
import Archive from './pages/Archive';


function AppRouter() {
  const location = useLocation();
  const [subNavVisible, setSubNavVisible] = React.useState(false);
  const { isAuthenticated } = useAuth();
  
  // Match /admin or /admin/section
  const adminMatch = location.pathname.startsWith('/admin');
  const navigate = useNavigate();
  const handleNavigate = (section: string) => {
    navigate(`/admin/${section}`);
  };

  // Determine current admin section from the path - or default if just viewing user page
  let currentSection = '';
  if (adminMatch) {
    const match = location.pathname.match(/^\/admin\/?([^/]*)/);
    
    if (match && match[1]) {
      currentSection = match[1];
    } else {
      currentSection = 'feedbacks';
    }
  }

  // Force show subnav if admin on admin routes OR if user is authenticated (admin) on any route
  const showSubNav = isAuthenticated || adminMatch;
  
  return (
    <>
      <div
        onMouseEnter={() => setSubNavVisible(true)}
        onMouseLeave={() => setSubNavVisible(false)}
        style={{ position: 'relative', zIndex: 2000 }}
      >
        <Navbar />
        {showSubNav && (
          <AdminSubNav
            current={currentSection}
            onNavigate={handleNavigate}
            visible={subNavVisible || isAuthenticated} 
          />
        )}
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/work" element={<Work />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/feedback" element={<AdminDashboard />} />
        <Route path="/admin/:section" element={<AdminDashboard />} />
        <Route path="/admin/archive" element={<Archive />} />
        <Route path="/admin/contacts" element={<AdminContact />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin/projects" element={<AdminDashboard />} />
      </Routes>
      <Footer />
    </>
  );
}


function WakingUpScreen({ attempt }: { attempt: number }) {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#111',
      color: '#eee',
      fontFamily: 'sans-serif',
      gap: '16px',
    }}>
      <style>{`@keyframes _spin { to { transform: rotate(360deg); } }`}</style>
      <div style={{
        width: 48, height: 48,
        border: '4px solid #333',
        borderTop: '4px solid #aaa',
        borderRadius: '50%',
        animation: '_spin 1s linear infinite',
      }} />
      <p style={{ margin: 0, fontSize: '1.1rem' }}>Waking up the server…</p>
      <p style={{ margin: 0, fontSize: '0.85rem', color: '#666' }}>
        {attempt > 1
          ? `Attempt ${attempt} — free hosting takes ~20–30 s to wake up`
          : 'This may take a moment on first visit'}
      </p>
    </div>
  );
}

function App() {
  // In development the backend is assumed to be running; skip the warm-up gate.
  const [backendReady, setBackendReady] = React.useState(!import.meta.env.PROD);
  const [attempt, setAttempt] = React.useState(0);

  React.useEffect(() => {
    if (!import.meta.env.PROD) return;
    let cancelled = false;
    waitForBackend((n) => { if (!cancelled) setAttempt(n); })
      .then(() => { if (!cancelled) setBackendReady(true); });
    return () => { cancelled = true; };
  }, []);

  if (!backendReady) {
    return <WakingUpScreen attempt={attempt} />;
  }

  return (
    <AuthProvider>
      <LanguageProvider>
        <ThemeProvider>
          <Router>
            <AppRouter />
          </Router>
        </ThemeProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;
