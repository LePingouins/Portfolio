import { createContext, useState, ReactNode } from 'react';

export const LanguageContext = createContext({
  language: 'en',
  toggleLanguage: () => {},
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<'en' | 'fr'>(localStorage.getItem('lang') === 'fr' ? 'fr' : 'en');
  const toggleLanguage = () => {
    setLanguage(l => {
      const next = l === 'en' ? 'fr' : 'en';
      localStorage.setItem('lang', next);
      return next;
    });
  };
  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
