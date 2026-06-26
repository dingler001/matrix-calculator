import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("matrixmaster-theme");
    if (saved === "light" || saved === "dark") return saved;
    return "dark";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("matrixmaster-theme", theme);
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      darkMode: theme === "dark",
      lightMode: theme === "light",
      setTheme,
      toggleTheme: () =>
        setTheme((current) => (current === "dark" ? "light" : "dark")),
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }
  return context;
}