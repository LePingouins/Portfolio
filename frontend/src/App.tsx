// ...existing code...

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';

import FeedbackPage from './pages/FeedbackPage';
import Dashboard from './pages/Dashboard';

import Blog from './pages/Blog';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import { ThemeProvider } from './components/ThemeContext';
import { LanguageProvider } from './components/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/feedback" element={<FeedbackPage />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin-login" element={<AdminLogin />} />
          </Routes>
          <Footer />
        </Router>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
