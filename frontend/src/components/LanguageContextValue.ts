import { createContext } from 'react';
import en from '../locales/en';

export type Translations = typeof en;

export type LanguageContextType = {
  language: 'en' | 'fr';
  toggleLanguage: () => void;
  t: Translations;
};

// Default context with English placeholders to avoid null checks everywhere
export const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  toggleLanguage: () => {},
  t: en,
});
