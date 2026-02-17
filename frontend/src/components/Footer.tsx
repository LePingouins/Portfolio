
import React, { useContext } from 'react';
import './Footer.css';
import { LanguageContext } from './LanguageContext';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  const { t } = useContext(LanguageContext);
  return (
    <footer className="footer minimal-footer">
      <div className="footer-content">&copy; {year} Olivier Goudreault. {t.footer.rights}</div>
    </footer>
  );
};

export default Footer;
