
import React from 'react';
import './Home.css';

import { useContext } from 'react';
import { LanguageContext } from '../components/LanguageContext';

const Home: React.FC = () => {
  const { language } = useContext(LanguageContext);
  return (
    <div className="home-page-bg">
      <main className="profile-container">
        <section className="profile-card minimal-card">
          <h1>Portfolio</h1>
          <p className="profile-desc">{language === 'fr' ? "Bienvenue sur mon site portfolio. Découvrez mes projets, compétences, expériences et plus encore." : "Welcome to my portfolio website. Explore my projects, skills, experience, and more."}</p>
        </section>
        {/* Dynamic content sections will be loaded here in the future */}
      </main>
    </div>
  );
};

export default Home;
