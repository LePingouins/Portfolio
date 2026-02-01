
import React, { useEffect, useState } from 'react';
import './About.css';

import { fetchSkills } from '../services/api';
import ResumeDownload from '../components/ResumeDownload';

import { useContext } from 'react';
import { LanguageContext } from '../components/LanguageContext';

const About: React.FC = () => {
  const [skills, setSkills] = useState<string[]>([]);
  const { language } = useContext(LanguageContext);
  useEffect(() => {
    fetchSkills().then(setSkills);
  }, []);
  return (
    <div className="about-page-bg">
      <div className="about-container">
        <h1>{language === 'fr' ? 'À propos de moi' : 'About Me'}</h1>
        <div className="about-content">
          <img src="/PromPhoto.jpg" alt="Olivier Prom" className="about-avatar" />
          <div>
            <p>
              {language === 'fr'
                ? "Salut ! Je suis Olivier, un développeur passionné spécialisé dans les technologies web modernes. J'adore créer des expériences numériques propres, efficaces et belles. Mon portfolio présente une gamme de projets, des applications web full-stack aux designs frontend créatifs."
                : "Hi! I'm Olivier, a passionate software developer specializing in modern web technologies. I love building clean, efficient, and beautiful digital experiences. My portfolio showcases a range of projects, from full-stack web apps to creative frontend designs."}
            </p>
            <h2>{language === 'fr' ? 'Compétences' : 'Skills'}</h2>
            <ul className="skills-list">
              {skills.length === 0 ? <li>{language === 'fr' ? 'Chargement...' : 'Loading...'}</li> : skills.map((skill, idx) => <li key={idx}>{skill}</li>)}
            </ul>
            <ResumeDownload />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
