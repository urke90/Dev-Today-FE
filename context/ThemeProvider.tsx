'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';

// ----------------------------------------------------------------

interface IThemeProvider {
  children: React.ReactNode;
}

const ThemeProvider: React.FC<IThemeProvider> = ({ children }) => {
  return (
    <NextThemesProvider attribute="class" defaultTheme="dark">
      {children}
    </NextThemesProvider>
  );
};

export default ThemeProvider;
