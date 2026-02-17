import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
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
import Work from './pages/Work';
import Archive from './pages/Archive';


function AppRouter() {
  const location = useLocation();
  const [subNavVisible, setSubNavVisible] = React.useState(false);
  // Match /admin or /admin/section
  const adminMatch = location.pathname.startsWith('/admin');
  const navigate = useNavigate();
  const handleNavigate = (section: string) => {
    navigate(`/admin/${section}`);
  };
  // Determine current admin section from the path
  let currentSection = '';
  if (adminMatch) {
    const match = location.pathname.match(/^\/admin\/?([^/]*)/);
    if (match && match[1]) {
      currentSection = match[1];
    } else {
      currentSection = 'feedbacks';
    }
  }
  return (
    <>
      <div
        onMouseEnter={() => setSubNavVisible(true)}
        onMouseLeave={() => setSubNavVisible(false)}
        style={{ position: 'relative', zIndex: 2000 }}
      >
        <Navbar />
        {adminMatch && (
          <AdminSubNav
            current={currentSection}
            onNavigate={handleNavigate}
            visible={subNavVisible}
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


function App() {
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
