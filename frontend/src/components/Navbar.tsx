

import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { useTheme } from './ThemeContext';
import { useContext } from 'react';
import { LanguageContext } from './LanguageContext';




const Navbar: React.FC = () => {
  const { language, toggleLanguage } = useContext(LanguageContext);
  return (
    <nav className="navbar minimal-navbar" aria-label="Main navigation">
      <div className="navbar-brand">Portfolio</div>
      <ul className="navbar-links minimal-links" role="menubar">
        <li role="none"><Link to="/" role="menuitem">{language === 'fr' ? 'Accueil' : 'Home'}</Link></li>
        <li role="none"><Link to="/about" role="menuitem">{language === 'fr' ? 'À propos' : 'About'}</Link></li>
        <li role="none"><Link to="/projects" role="menuitem">{language === 'fr' ? 'Projets' : 'Projects'}</Link></li>
        <li role="none"><Link to="/contact" role="menuitem">{language === 'fr' ? 'Contact' : 'Contact'}</Link></li>
      </ul>
      <button onClick={toggleLanguage} style={{ marginLeft: 16, background: '#232323', color: '#fff', border: '1px solid #444', borderRadius: 6, padding: '4px 10px', cursor: 'pointer' }}>{language === 'fr' ? 'EN' : 'FR'}</button>
    </nav>
  );
};

export default Navbar;
