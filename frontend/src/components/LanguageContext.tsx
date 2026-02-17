import { useState, type ReactNode } from 'react';
import { LanguageContext } from './LanguageContextValue';
import en from '../locales/en';
import fr from '../locales/fr';

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<'en' | 'fr'>(() => {
    // Check localStorage, default to 'en'
    const stored = localStorage.getItem('lang');
    return stored === 'fr' ? 'fr' : 'en';
  });

  const toggleLanguage = () => {
    setLanguage(prev => {
      const next = prev === 'en' ? 'fr' : 'en';
      localStorage.setItem('lang', next);
      return next;
    });
  };

  const t = language === 'fr' ? fr : en;

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export { LanguageContext };
