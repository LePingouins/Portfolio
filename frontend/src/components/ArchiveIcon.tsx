import React from 'react';

const ArchiveIcon: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <svg
    style={style}
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="22"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <rect x="3" y="7" width="18" height="13" rx="2" fill="#fbbf24" stroke="#b45309" strokeWidth="1.5"/>
    <rect x="1" y="3" width="22" height="4" rx="1.5" fill="#fbbf24" stroke="#b45309" strokeWidth="1.5"/>
    <path d="M9 13h6" stroke="#b45309" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export default ArchiveIcon;
