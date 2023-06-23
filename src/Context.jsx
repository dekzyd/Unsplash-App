import { createContext, useContext, useState, useEffect } from "react";

const GlobalContext = createContext();

// custom hook
export const useGlobalContext = () => useContext(GlobalContext);

const getInitialDarkMode = () => {
  const prefersDarkMode = window.matchMedia(
    "(prefers-color-scheme:dark)"
  ).matches;
  console.log(prefersDarkMode);
  return prefersDarkMode;
};

const AppContext = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(getInitialDarkMode());
  const [searchTerm, setSearchTerm] = useState("dog");

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);

    // ******avoiding code repetition*****
    // const body = document.querySelector("body");
    // body.classList.toggle("dark-theme", newDarkTheme);
  };

  useEffect(() => {
    document.body.classList.toggle("dark-theme", isDarkTheme);
  }, [isDarkTheme]);

  return (
    <GlobalContext.Provider
      value={{ searchTerm, setSearchTerm, isDarkTheme, toggleDarkTheme }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default AppContext;
