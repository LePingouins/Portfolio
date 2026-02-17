import React, { useEffect, useState } from 'react';
import './About.css';
import { fetchSkills } from '../services/api';
import ResumeDownload from '../components/ResumeDownload';
import { useContext } from 'react';
import { LanguageContext } from '../components/LanguageContext';

const About: React.FC = () => {
  const [skills, setSkills] = useState<string[]>([]);
  const { language, t } = useContext(LanguageContext);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetchSkills().then((data) => {
      // If data is array of objects, map to names; else, use as is
      if (Array.isArray(data) && data.length > 0 && typeof data[0] === 'object' && data[0] !== null && 'name' in data[0]) {
        setSkills(data.map((s: { name: string }) => s.name));
      } else {
        setSkills(data);
      }
    });

    // Trigger animations
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const isFr = language === 'fr';

  return (
    <div className="about-page-wrapper">
      {/* Background Gradients */}
      <div className="about-bg-highlight highlight-1" />
      <div className="about-bg-highlight highlight-2" />

      <div className="about-container">
        
        {/* HERO SECTION */}
        <section className={`about-hero reveal ${loaded ? '' : 'loading'}`}>
          <div className="profile-img-container">
            <div className="profile-img-backdrop"></div>
            <img src="/PromPhoto.jpg" alt="Olivier Prom" className="profile-img" />
          </div>

          <div className="about-text">
            <h1 className="about-title">
              {t.about.title} {isFr ? "" : " "}
              <span>{t.about.me}</span>
            </h1>
            <p className="about-bio">
              {t.about.bio}
            </p>
            
            <div className="stats-grid">
               <div className="stat-card delay-100 reveal">
                 <span className="stat-icon">💻</span>
                 <span className="stat-value">{t.about.stats.stack}</span>
                 <span className="stat-label">{t.about.stats.stackValue}</span>
               </div>
               <div className="stat-card delay-200 reveal">
                 <span className="stat-icon">🎮</span>
                 <span className="stat-value">{t.about.stats.hobby}</span>
                 <span className="stat-label">{t.about.stats.hobbyValue}</span>
               </div>
               <div className="stat-card delay-300 reveal">
                 <span className="stat-icon">🚀</span>
                 <span className="stat-value">{t.about.stats.goal}</span>
                 <span className="stat-label">{t.about.stats.goalValue}</span>
               </div>
            </div>
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section className={`skills-section reveal delay-200`}>
          <h2 className="section-title">{t.about.skillsTitle}</h2>
          <div className="skills-container">
            {skills.length === 0 ? (
               <p style={{ opacity: 0.7 }}>{t.about.loadingSkills}</p>
            ) : (
                skills.map((skill, idx) => (
                  <div key={idx} className="skill-pill" style={{ animationDelay: `${idx * 0.05}s` }}>
                    <div className="skill-dot" />
                    {skill}
                  </div>
                ))
            )}
          </div>
        </section>

        {/* RESUME SECTION */}
        <section className={`resume-section reveal delay-300`}>
           <div className="resume-wrapper">
             <ResumeDownload />
           </div>
        </section>

      </div>
    </div>
  );
};

export default About;
