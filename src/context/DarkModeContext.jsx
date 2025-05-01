/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkModeContext = createContext(null);

function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    window.matchMedia("(prefers-color-scheme: dark)").matches, // check if the OS is in dark mode!
    "isDarkMode"
  );
  const toggleDarkMode = () => {
    setIsDarkMode((darkMode) => !darkMode);
  };

  // add corresponding class to the HTML element based on state
  useEffect(() => {
    if (isDarkMode) document.documentElement.className = "dark-mode";
    else document.documentElement.className = "light-mode";
    return () => (document.documentElement.className = "");
  }, [isDarkMode]);

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (!context) throw new Error("DarkModeContext was used outside of the Provider component!");
  return context;
}

export { DarkModeProvider, useDarkMode };
