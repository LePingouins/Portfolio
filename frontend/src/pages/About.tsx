
import React, { useEffect, useState, useRef } from 'react';
import './About.css';

import { fetchSkills } from '../services/api';
import ResumeDownload from '../components/ResumeDownload';

import { useContext } from 'react';
import { LanguageContext } from '../components/LanguageContext';

const About: React.FC = () => {
  const [skills, setSkills] = useState<string[]>([]);
  const { language } = useContext(LanguageContext);
  useEffect(() => {
    fetchSkills().then((data) => {
      // If data is array of objects, map to names; else, use as is
      if (Array.isArray(data) && data.length > 0 && typeof data[0] === 'object' && data[0] !== null && 'name' in data[0]) {
        setSkills(data.map((s: { name: string }) => s.name));
      } else {
        setSkills(data);
      }
    });
  }, []);
  // Animated section reveal
  const [showSections, setShowSections] = useState({ bio: false, skills: false, resume: false, fun: false });
  const aboutRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    Promise.resolve().then(() => setShowSections({ bio: false, skills: false, resume: false, fun: false }));
  }, [language]);

  useEffect(() => {
    const timer1 = setTimeout(() => setShowSections(s => ({ ...s, bio: true })), 200);
    const timer2 = setTimeout(() => setShowSections(s => ({ ...s, skills: true })), 700);
    const timer3 = setTimeout(() => setShowSections(s => ({ ...s, resume: true })), 1200);
    const timer4 = setTimeout(() => setShowSections(s => ({ ...s, fun: true })), 1700);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [language]);

  return (
    <div className="about-page-bg">
      <div className="bg-anim-circle bg-anim-circle1" />
      <div className="bg-anim-circle bg-anim-circle2" />
      <div className="bg-anim-circle bg-anim-circle3" />
      <div className="about-container" ref={aboutRef}>
        <h1>{language === 'fr' ? 'À propos de moi' : 'About Me'}</h1>
        <div className="about-content">
          <img src="/PromPhoto.jpg" alt="Olivier Prom" className="about-avatar" style={{ opacity: showSections.bio ? 1 : 0, transform: showSections.bio ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.7s cubic-bezier(.4,2,.6,1)' }} />
          <div style={{ width: '100%' }}>
            <p style={{ opacity: showSections.bio ? 1 : 0, transform: showSections.bio ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.7s cubic-bezier(.4,2,.6,1)' }}>
              {language === 'fr'
                ? "Salut ! Je suis Olivier, un développeur passionné spécialisé dans les technologies web modernes. J'adore créer des expériences numériques propres, efficaces et belles. Mon portfolio présente une gamme de projets, des applications web full-stack aux designs frontend créatifs."
                : "Hi! I'm Olivier, a passionate software developer specializing in modern web technologies. I love building clean, efficient, and beautiful digital experiences. My portfolio showcases a range of projects, from full-stack web apps to creative frontend designs."}
            </p>
            <h2 style={{ opacity: showSections.skills ? 1 : 0, transition: 'opacity 0.7s 0.2s' }}>{language === 'fr' ? 'Compétences' : 'Skills'}</h2>
            <ul className="skills-list" style={{ opacity: showSections.skills ? 1 : 0, transition: 'opacity 0.7s 0.2s' }}>
              {skills.length === 0 ? <li>{language === 'fr' ? 'Chargement...' : 'Loading...'}</li> : skills.map((skill, idx) => <li key={idx}>{skill}</li>)}
            </ul>
            <div style={{ opacity: showSections.resume ? 1 : 0, transition: 'opacity 0.7s 0.2s' }}>
              <ResumeDownload />
            </div>
            {/* Fun facts/timeline section */}
            {showSections.fun && (
              <div style={{ marginTop: 32, opacity: showSections.fun ? 1 : 0, transition: 'opacity 0.7s 0.2s' }}>
                <h2 style={{ color: '#ef4444', marginBottom: 12 }}>{language === 'fr' ? 'Fun Facts' : 'Fun Facts'}</h2>
                <ul style={{ color: '#fff', fontSize: '1.05em', lineHeight: 1.7, paddingLeft: 18 }}>
                  <li>{language === 'fr' ? "J'ai commencé à coder à 16 ans." : "Started coding at age 16."}</li>
                  <li>{language === 'fr' ? "Je joue de la guitare et j'aime faire mes propres projets et jouer a des jeux en ligne." : "I play guitar and I love to do my own side projects and play video games."}</li>
                  <li>{language === 'fr' ? "J'adore les challenges de coding." : "Love coding challenges."}</li>
                  <li>{language === 'fr' ? "Toujours prêt à apprendre de nouvelles technologies !" : "Always eager to learn new tech!"}</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
