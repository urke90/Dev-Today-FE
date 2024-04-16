"use client";
import { createContext, useContext, useEffect, useState } from "react";

interface ThemeContextType {
  children?: React.ReactNode;
  theme?: string;
  mode?: string;
  setMode?: (mode: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children, theme }: ThemeContextType) => {
  const [mode, setMode] = useState("dark");

  useEffect(() => {
    if (mode === "light") {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, setMode, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
