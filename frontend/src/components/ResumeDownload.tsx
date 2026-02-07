import React from "react";

import { useContext } from 'react';
import { LanguageContext } from './LanguageContext';

const ResumeDownload: React.FC = () => {
  const { language } = useContext(LanguageContext);
  return (
    <div style={{ textAlign: 'center', margin: '2em 0' }}>
      <a
        href="/resume.pdf"
        download
        style={{
          display: 'inline-block',
          background: '#ef4444',
          color: '#fff',
          padding: '0.7em 2em',
          borderRadius: '8px',
          fontWeight: 600,
          fontSize: '1.1em',
          textDecoration: 'none',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          border: 'none',
          cursor: 'pointer',
          transition: 'background 0.2s',
        }}
        aria-label={language === 'fr' ? 'Télécharger le CV en PDF' : 'Download resume as PDF'}
        tabIndex={0}
        onMouseOver={e => (e.currentTarget.style.background = '#b91c1c')}
        onMouseOut={e => (e.currentTarget.style.background = '#ef4444')}
      >
        {language === 'fr' ? 'Télécharger le CV (PDF)' : 'Download Resume (PDF)'}
      </a>
    </div>
  );
};

export default ResumeDownload;
