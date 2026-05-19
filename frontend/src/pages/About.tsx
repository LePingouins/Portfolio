import React, { useEffect, useState } from 'react';
import './About.css';
import { fetchSkills, fetchAboutMe, fetchEducation, fetchHobbies, type AboutMe, type Education, type Hobby } from '../services/api';
import ResumeDownload from '../components/ResumeDownload';
import { useContext } from 'react';
import { LanguageContext } from '../components/LanguageContext';

const About: React.FC = () => {
  type Skill = { name: string; category: string; proficiency: number; description?: string };
  const [skills, setSkills] = useState<Skill[]>([]);
  const [aboutMeData, setAboutMeData] = useState<AboutMe | null>(null);
  const [education, setEducation] = useState<Education[]>([]);
  const [hobbies, setHobbies] = useState<Hobby[]>([]);
  const { language, t } = useContext(LanguageContext);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetchSkills().then((data) => {
      setSkills(Array.isArray(data) ? data : []);
    });

    fetchAboutMe(language).then(setAboutMeData).catch(console.error);
    fetchEducation().then(setEducation).catch(() => setEducation([]));
    fetchHobbies().then(setHobbies).catch(() => setHobbies([]));

    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, [language]);

  const isFr = language === 'fr';

  // ...existing code...

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
              {aboutMeData?.text || t.about.bio}
            </p>
            
            <div className="stats-grid">
               <div className="stat-card delay-100 reveal">
                 <span className="stat-icon">💻</span>
                 <span className="stat-value">{t.about.stats.stack}</span>
                 <span className="stat-label">{aboutMeData?.stack?.join(', ') || t.about.stats.stackValue}</span>
               </div>
               <div className="stat-card delay-200 reveal">
                 <span className="stat-icon">🎮</span>
                 <span className="stat-value">{aboutMeData?.hobbies?.length && aboutMeData.hobbies.length > 1 ? "Hobbies" : t.about.stats.hobby}</span>
                 <span className="stat-label">
                   {aboutMeData?.hobbies?.join(', ') || t.about.stats.hobbyValue}
                 </span>
               </div>
               <div className="stat-card delay-300 reveal">
                 <span className="stat-icon">🚀</span>
                 <span className="stat-value">{t.about.stats.goal}</span>
                 <span className="stat-label">{aboutMeData?.goals?.join(', ') || t.about.stats.goalValue}</span>
               </div>
            </div>
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section className={`skills-section reveal delay-200`}>
          <h2 className="section-title">{t.about.skillsTitle}</h2>
          {skills.length === 0 ? (
            <p style={{ opacity: 0.7 }}>{t.about.loadingSkills}</p>
          ) : (
            <>
              {['Languages', 'Frameworks', 'Tools'].map((cat) => (
                <div key={cat} className="skills-category">
                  <h3 className="skills-category-title">{cat}</h3>
                  <div className="skills-grid">
                    {skills.filter(s => s.category === cat).map((skill, idx) => (
                      <div key={skill.name} className="skill-card" style={{ animationDelay: `${idx * 0.05}s` }} title={skill.description}>
                        
                        <span className="skill-name">{skill.name}</span>
                        <div className="skill-bar-wrapper">
                          <div className="skill-bar-bg">
                            <div className="skill-bar-fill" style={{ width: `${skill.proficiency}%` }}></div>
                          </div>
                          <span className="skill-bar-label">{skill.proficiency}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </>
          )}
        </section>

        {/* EDUCATION SECTION */}
        {education.length > 0 && (
          <section className={`skills-section reveal delay-250`}>
            <h2 className="section-title">{isFr ? 'Formation' : 'Education'}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {education.map((edu) => (
                <div key={edu.id} style={{ background: 'var(--color-card, #1e1e2e)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '10px', padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--color-text, #fff)' }}>{edu.school}</div>
                    <div style={{ color: '#ef4444', fontSize: '0.9rem', marginTop: '0.25rem' }}>{edu.degree}{edu.field ? ` — ${edu.field}` : ''}</div>
                  </div>
                  {(edu.startDate || edu.endDate) && (
                    <div style={{ color: 'var(--color-muted, #888)', fontSize: '0.85rem', flexShrink: 0, textAlign: 'right' }}>
                      {edu.startDate ?? '?'} – {edu.endDate ?? (isFr ? 'Présent' : 'Present')}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* HOBBIES SECTION */}
        {hobbies.length > 0 && (
          <section className={`skills-section reveal delay-275`}>
            <h2 className="section-title">{isFr ? 'Hobbies & Intérêts' : 'Hobbies & Interests'}</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              {hobbies.map((hobby) => (
                <div key={hobby.id} title={hobby.description ?? ''} style={{ background: 'var(--color-card, #1e1e2e)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: '20px', padding: '0.45rem 1.1rem', fontSize: '0.9rem', color: 'var(--color-text, #fff)', cursor: hobby.description ? 'help' : 'default' }}>
                  {hobby.name}
                </div>
              ))}
            </div>
          </section>
        )}

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
