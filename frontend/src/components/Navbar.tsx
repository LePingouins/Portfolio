import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { LanguageContext } from './LanguageContext';




const Navbar: React.FC = () => {
  const { toggleLanguage, t } = useContext(LanguageContext);
  return (
    <nav className="navbar minimal-navbar" aria-label="Main navigation" style={{ position: 'relative', height: '64px' }}>
      <div style={{ position: 'absolute', left: '2vw', top: '50%', transform: 'translateY(-50%)' }}>
        <div className="navbar-brand">{t.navbar.brand}</div>
      </div>
      <div style={{ position: 'absolute', right: '24px', top: '50%', transform: 'translateY(-50%)', display: 'flex', gap: 4, zIndex: 1000 }}>
        <button onClick={toggleLanguage} style={{ background: '#232323', color: '#fff', border: '1px solid #444', borderRadius: 6, padding: '4px 10px', cursor: 'pointer', fontWeight: 600, fontSize: 15 }}>
          {t.navbar.language}
        </button>
        <Link to="/admin-login">
          <button
            style={{
              padding: '8px 16px',
              borderRadius: 8,
              background: '#ef4444',
              color: '#fff',
              fontWeight: 700,
              border: 'none',
              fontSize: 15,
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.12)'
            }}
          >{t.navbar.login}</button>
        </Link>
      </div>
      <div style={{ position: 'absolute', left: 0, right: 0, top: '50%', transform: 'translateY(-50%)', display: 'flex', justifyContent: 'center', alignItems: 'center', pointerEvents: 'none' }}>
        <ul className="navbar-links minimal-links" role="menubar" style={{ margin: 0, pointerEvents: 'auto' }}>
          <li role="none"><Link to="/" role="menuitem">{t.navbar.home}</Link></li>
          <li role="none"><Link to="/about" role="menuitem">{t.navbar.about}</Link></li>
          <li role="none"><Link to="/projects" role="menuitem">{t.navbar.projects}</Link></li>
          <li role="none"><Link to="/work" role="menuitem">{t.navbar.work}</Link></li>
          <li role="none"><Link to="/contact" role="menuitem">{t.navbar.contact}</Link></li>
          <li role="none"><Link to="/feedback" role="menuitem">{t.navbar.feedback}</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
