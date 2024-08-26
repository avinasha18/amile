// src/ThemeContext.js
import React, { createContext, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme as toggleThemeAction } from '../services/redux/themeSlice'; 

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const dispatch = useDispatch();

  const toggleTheme = () => {
    dispatch(toggleThemeAction()); 
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, currentUser }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
