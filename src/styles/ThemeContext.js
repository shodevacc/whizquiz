import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import Theme from './Theme'
const ThemeContext = React.createContext();


export default ThemeContext;

const ThemeContextProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    setIsDark((prevState) => !prevState);
  };
  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <ThemeProvider theme={Theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeContextProvider };
