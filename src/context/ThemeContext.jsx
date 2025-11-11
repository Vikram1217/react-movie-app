import React, {useState} from "react";
import { createContext, useContext } from "react";

// Create the context
const ThemeContext = createContext();

// Create a custom hook for other components to access the context easily
export const useTheme = () => {
  return useContext(ThemeContext);
}

// Create the Provider
export const ThemeProvider = ({children}) => {

  const [theme, setTheme] = useState('dark');

  const value = {
    theme,
    setTheme,
  };

  return (
  <ThemeContext.Provider value={value}>
    {children}
  </ThemeContext.Provider>
  )
};