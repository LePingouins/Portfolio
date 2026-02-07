import { createContext } from 'react';

export type LanguageContextType = {
  language: 'en' | 'fr';
  toggleLanguage: () => void;
};

export const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  toggleLanguage: () => {},
});