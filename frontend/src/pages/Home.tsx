import React, { useEffect, useState, useContext } from 'react';
import { LanguageContext } from '../components/LanguageContext';
import { useTheme } from '../components/ThemeContext';
import Timeline from '../components/TimelineSection';

import './Home.css';

const Home: React.FC = () => {
  const { language, t } = useContext(LanguageContext);
  const { theme, toggleTheme } = useTheme();

  // Content configuration
  const titleText = t.home.title;
  const descText = t.home.description;

  const timelineItems = [
    { title: t.home.timeline.college.title, date: '2023', description: t.home.timeline.college.desc },
    { title: t.home.timeline.internship.title, date: '2026', description: t.home.timeline.internship.desc },
    { title: t.home.timeline.graduate.title, date: '2026', description: t.home.timeline.graduate.desc },
    { title: t.home.timeline.university.title, date: '2026', description: t.home.timeline.university.desc }
  ];

  /* Typing Animation Logic */
  const [displayedTitle, setDisplayedTitle] = useState('');
  const [displayedDesc, setDisplayedDesc] = useState('');
  
  useEffect(() => {
    setDisplayedTitle('');
    setDisplayedDesc('');
    let titleIdx = 0;
    let descIdx = 0;
    let titleInterval: number | null = null;
    let descInterval: number | null = null;

    // Start title animation
    titleInterval = setInterval(() => {
      titleIdx++;
      setDisplayedTitle(titleText.slice(0, titleIdx));
      if (titleIdx >= titleText.length) {
        if (titleInterval) clearInterval(titleInterval);
        // Start desc animation after title finishes
        descInterval = setInterval(() => {
          descIdx++;
          setDisplayedDesc(descText.slice(0, descIdx));
          if (descIdx >= descText.length) {
             if (descInterval) clearInterval(descInterval);
          }
        }, 18);
      }
    }, 90);

    return () => {
      if (titleInterval) clearInterval(titleInterval);
      if (descInterval) clearInterval(descInterval);
    };
  }, [language, titleText, descText]);


  return (
    <div className="home-page-container">
      {/* Dynamic Background */}
      <div className="home-bg-layer" />
      <div className="bg-gradient-orb orb-1" />
      <div className="bg-gradient-orb orb-2" />
      <div className="bg-gradient-orb orb-3" />

      <header className="home-header">
         <button
            className="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? '🌙' : '☀️'}
          </button>
      </header>
      
      <main className="home-content-wrapper">
        
        {/* HERO SECTION */}
        <section className="hero-section glass-panel">
          <div className="hero-content">
            <h1 className="hero-title">
              {displayedTitle}<span className="cursor-blink">|</span>
            </h1>
            <p className="hero-desc">{displayedDesc}</p>
            
            <div className="hero-social-links">
               <a href="https://github.com/LePingouins" target="_blank" rel="noopener noreferrer" className="social-icon github" title="GitHub">
                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
               </a>
               <a href="https://www.linkedin.com/in/olivier-goudreault-09120a386/" target="_blank" rel="noopener noreferrer" className="social-icon linkedin" title="LinkedIn">
                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
               </a>
               <a href="mailto:oligoudreault@gmail.com" className="social-icon email" title="Email">
                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
               </a>
            </div>
          </div>
        </section>

        {/* TIMELINE SECTION */}
        <section className="timeline-wrapper fade-in-up">
           <Timeline items={timelineItems} />
        </section>



      </main>
    </div>
  );
};

export default Home;
