import React, { useEffect, useState } from "react";

import { useContext } from 'react';
import { LanguageContext } from './LanguageContext';
import { fetchResumes } from '../services/api';

const ResumeDownload: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);

  useEffect(() => {
    fetchResumes()
      .then(data => { if (data.length > 0) setResumeUrl(data[0].url); })
      .catch(() => setResumeUrl(null));
  }, []);

  const href = resumeUrl ?? '/resume.pdf';
  const isExternal = !!resumeUrl;

  return (
    <div style={{ textAlign: 'center', margin: '2em 0' }}>
      <a
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        download={!isExternal ? true : undefined}
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
        aria-label={t.about.resumeBtn}
        tabIndex={0}
        onMouseOver={e => (e.currentTarget.style.background = '#b91c1c')}
        onMouseOut={e => (e.currentTarget.style.background = '#ef4444')}
      >
        {t.about.resumeBtn}
      </a>
    </div>
  );
};

export default ResumeDownload;
