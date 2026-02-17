import React, { createContext, useContext, useEffect } from "react";

interface ThemeContextType {
  theme: "dark";
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Always force dark theme
  const theme = "dark";

  useEffect(() => {
    document.body.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  }, []);

  const toggleTheme = () => { /* No-op */ };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
};
