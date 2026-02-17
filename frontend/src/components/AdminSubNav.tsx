import React from 'react';
import './AdminSubNav.css';

interface AdminSubNavProps {
  current: string;
  onNavigate: (section: string) => void;
  visible?: boolean;
}

const sections = [
  { key: 'feedbacks', label: 'Feedbacks' },
  { key: 'archive', label: 'Archive' },
  { key: 'contacts', label: 'Contacts' },
  { key: 'projects', label: 'Projects' },
  { key: 'skills', label: 'Skills' },
  { key: 'work', label: 'Work' },
  { key: 'testimonials', label: 'Testimonials' },
  { key: 'messages', label: 'Messages' },
];

const AdminSubNav: React.FC<AdminSubNavProps> = ({ current, onNavigate, visible }) => {
  // Removed hovered state, no longer needed.
  const feedbackBtnRef = React.useRef<HTMLButtonElement>(null);
  // Removed submenuPos and showSubmenu, no longer needed.

  return (
    <>
      <nav className={"admin-subnav" + (visible ? " visible" : "") }>
        {sections.map(section => (
          <div
            key={section.key}
            style={{ position: 'relative', display: 'inline-block' }}
          >
            <button
              ref={section.key === 'feedbacks' ? feedbackBtnRef : undefined}
              className={
                'admin-subnav-btn' + (current === section.key ? ' active' : '')
              }
              onClick={() => {
                if (current !== section.key) onNavigate(section.key);
              }}
              aria-current={current === section.key ? 'page' : undefined}
            >
              {section.label}
            </button>
          </div>
        ))}
      </nav>
      {/* Removed Archive submenu. Archive is now a main section. */}
    </>
  );
};

export default AdminSubNav;
