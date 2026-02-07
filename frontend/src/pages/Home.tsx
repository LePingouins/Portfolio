
import React, { useEffect, useState } from 'react';
import './Home.css';

import { useContext } from 'react';
import { LanguageContext } from '../components/LanguageContext';

const Home: React.FC = () => {
  const { language } = useContext(LanguageContext);
  // Animated text effect for title and description
  const titleText = 'Portfolio';
  const descText = language === 'fr'
    ? "Bienvenue sur mon site portfolio. Découvrez mes projets, compétences, expériences et plus encore."
    : "Welcome to my portfolio website. Explore my projects, skills, experience, and more.";

  const [displayedTitle, setDisplayedTitle] = useState('');
  const [displayedDesc, setDisplayedDesc] = useState('');

  useEffect(() => {
    setDisplayedTitle('');
    setDisplayedDesc('');
    let titleIdx = 0;
    let descIdx = 0;
    let titleInterval: number | null = null;
    let descInterval: number | null = null;

    function animateTitle() {
      titleInterval = setInterval(() => {
        titleIdx++;
        setDisplayedTitle(titleText.slice(0, titleIdx));
        if (titleIdx >= titleText.length) {
          clearInterval(titleInterval!);
          animateDesc();
        }
      }, 90);
    }

    function animateDesc() {
      descInterval = setInterval(() => {
        descIdx++;
        setDisplayedDesc(descText.slice(0, descIdx));
        if (descIdx >= descText.length) {
          clearInterval(descInterval!);
        }
      }, 18);
    }

    animateTitle();

    return () => {
      if (titleInterval) clearInterval(titleInterval);
      if (descInterval) clearInterval(descInterval);
    };
  }, [language, titleText, descText]);

  return (
    <div className="home-page-bg">
      {/* Animated background circles */}
      <div className="bg-anim-circle bg-anim-circle1" />
      <div className="bg-anim-circle bg-anim-circle2" />
      <div className="bg-anim-circle bg-anim-circle3" />
      <main className="profile-container">
        <section className="profile-card minimal-card">
          <h1 style={{ minHeight: 48, letterSpacing: 1 }}>{displayedTitle}</h1>
          <p className="profile-desc" style={{ minHeight: 48 }}>{displayedDesc}</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 32 }}>
            {/* Phone */}
            <a href="tel:5143481921" title="Call" style={{ color: '#ef4444', textDecoration: 'none' }} target="_blank" rel="noopener noreferrer">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92V19a2 2 0 0 1-2.18 2A19.86 19.86 0 0 1 3 5.18 2 2 0 0 1 5 3h2.09a2 2 0 0 1 2 1.72c.13.81.36 1.6.68 2.34a2 2 0 0 1-.45 2.11l-.27.27a16 16 0 0 0 6.29 6.29l.27-.27a2 2 0 0 1 2.11-.45c.74.32 1.53.55 2.34.68A2 2 0 0 1 22 16.92z"></path></svg>
            </a>
            {/* Email */}
            <a href="mailto:oligoudreault@gmail.com" title="Email" style={{ color: '#ef4444', textDecoration: 'none' }} target="_blank" rel="noopener noreferrer">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><polyline points="3 7 12 13 21 7" /></svg>
            </a>
            {/* LinkedIn */}
            <a href="https://www.linkedin.com/in/olivier-goudreault-09120a386/" title="LinkedIn" style={{ color: '#0077ff', textDecoration: 'none' }} target="_blank" rel="noopener noreferrer">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0077ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" /><line x1="8" y1="11" x2="8" y2="16" /><line x1="8" y1="8" x2="8" y2="8" /><line x1="12" y1="16" x2="12" y2="11" /><path d="M16 16v-3a2 2 0 0 0-4 0" /></svg>
            </a>
            {/* GitHub */}
            <a href="https://github.com/LePingouins" title="GitHub" style={{ color: '#fff', textDecoration: 'none' }} target="_blank" rel="noopener noreferrer">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.36 6.84 9.71.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.1-1.5-1.1-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05a9.38 9.38 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.07.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .26.18.57.69.48A10.01 10.01 0 0 0 22 12.26C22 6.58 17.52 2 12 2z" /></svg>
            </a>
            {/* Twitter */}
            <a href="https://x.com/OliGoudreault" title="Twitter/X" style={{ color: '#1da1f2', textDecoration: 'none' }} target="_blank" rel="noopener noreferrer">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1da1f2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.53 7.16L7.47 17.22" /><path d="M7.47 7.16l10.06 10.06" /></svg>
            </a>
          </div>
        </section>
        {/* Dynamic content sections will be loaded here in the future */}
      </main>
    </div>
  );
};

export default Home;
