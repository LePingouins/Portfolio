import React, { useEffect, useState } from 'react';
import './About.css';
import { fetchSkills, fetchAboutMe, type AboutMe } from '../services/api';
import ResumeDownload from '../components/ResumeDownload';
import { useContext } from 'react';
import { LanguageContext } from '../components/LanguageContext';

const About: React.FC = () => {
  type Skill = { name: string; category: string; proficiency: number; description?: string };
  const [skills, setSkills] = useState<Skill[]>([]);
  const [aboutMeData, setAboutMeData] = useState<AboutMe | null>(null);
  const { language, t } = useContext(LanguageContext);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetchSkills().then((data) => {
      // Use backend-provided category and proficiency
      setSkills(Array.isArray(data) ? data : []);
    });

    fetchAboutMe(language).then(setAboutMeData).catch(console.error);

    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, [language]);

  const isFr = language === 'fr';

  const getSkillIconUrl = (skillName: string) => {
    const name = skillName.toLowerCase().replace(/ /g, '');
    const iconMap: Record<string, string> = {
      'java': 'java/java-original.svg',
      'react': 'react/react-original.svg',
      'php': 'php/php-original.svg',
      'c#': 'csharp/csharp-original.svg',
      'csharp': 'csharp/csharp-original.svg',
      'python': 'python/python-original.svg',
      'sql': 'mysql/mysql-original.svg',
      'mongodb': 'mongodb/mongodb-original.svg',
      'github': 'github/github-original.svg',
      'linux': 'linux/linux-original.svg',
      'intellij': 'intellij/intellij-original.svg',
      'azure': 'azure/azure-original.svg',
      'visualstudiocode': 'vscode/vscode-original.svg',
      'ios': 'apple/apple-original.svg',
      'android': 'android/android-original.svg',
      'springboot': 'spring/spring-original.svg',
      'javascript': 'javascript/javascript-original.svg',
      'typescript': 'typescript/typescript-original.svg',
      'postgresql': 'postgresql/postgresql-original.svg',
    };
    const path = iconMap[name] || 'devicon/devicon-original.svg';
    return `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${path}`;
  };

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
                        <img src={getSkillIconUrl(skill.name)} alt={skill.name} className="skill-icon" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
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
