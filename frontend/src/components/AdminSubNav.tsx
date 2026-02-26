import React, { useContext } from 'react';
import './AdminSubNav.css';
import { LanguageContext } from './LanguageContext';

interface AdminSubNavProps {
  current: string;
  onNavigate: (section: string) => void;
  visible?: boolean;
}

const sectionsKeys = ['feedbacks','archive','contacts','projects','skills','work','aboutme','journey'] as const;
type SectionKey = typeof sectionsKeys[number];

const AdminSubNav: React.FC<AdminSubNavProps> = ({ current, onNavigate, visible }) => {
  // Removed hovered state, no longer needed.
  const feedbackBtnRef = React.useRef<HTMLButtonElement>(null);
  // Removed submenuPos and showSubmenu, no longer needed.

  const { t } = useContext(LanguageContext);

  return (
    <>
      <nav className={"admin-subnav" + (visible ? " visible" : "") }>
        {sectionsKeys.map((k: SectionKey) => ({ key: k, label: t?.adminPages?.subnav?.[k] ?? k })).map(section => (
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
