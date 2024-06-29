'use client';
import { createContext, useContext, useEffect, useState } from 'react';

// ----------------------------------------------------------------

interface IThemeContextType {
  theme: string;
  mode: string;
  setMode: React.Dispatch<React.SetStateAction<string>>;
}

interface IThemeProvider {
  theme: string;
  children: React.ReactNode;
}

const ThemeContext = createContext<IThemeContextType>({
  theme: 'dark',
  mode: 'dark',
  setMode: () => {},
});

export const ThemeProvider: React.FC<IThemeProvider> = ({
  children,
  theme,
}) => {
  const [mode, setMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('themeMode');
      return savedMode ? savedMode : 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (mode === 'light') {
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
      } else {
        document.documentElement.classList.remove('light');
        document.documentElement.classList.add('dark');
      }
      localStorage.setItem('themeMode', mode);
    }
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, setMode, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
