// src/ThemeContext.js
import React, { createContext, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme as toggleThemeAction } from '../services/redux/themeSlice'; 

const ThemeContext = createContext({
  isDarkMode: false,
  toggleTheme: () => {}
});

export const ThemeProvider = ({ children }) => {
  const isDarkMode = useSelector((state) => state.theme?.isDarkMode || false);
  const dispatch = useDispatch();

  const toggleTheme = () => {
    try {
      dispatch(toggleThemeAction()); 
    } catch (error) {
      console.error('Error toggling theme:', error);
    }
  };

  const contextValue = {
    isDarkMode,
    toggleTheme
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    console.warn('useTheme must be used within a ThemeProvider');
    return { isDarkMode: false, toggleTheme: () => {} };
  }
  return context;
};
