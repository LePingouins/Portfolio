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
            // current section will be handled by AdminDashboard, so just pass empty string or undefined
            current={''}
            onNavigate={handleNavigate}
            visible={subNavVisible}
          />
        )}
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
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
      </Routes>
      <Footer />
    </>
  );
}


function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <Router>
          <AppRouter />
        </Router>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
