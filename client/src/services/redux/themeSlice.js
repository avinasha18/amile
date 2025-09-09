import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie'; 

const getInitialTheme = () => {
  try {
    const theme = Cookies.get('theme');
    return theme === 'true';
  } catch (error) {
    console.error('Error reading theme from cookies:', error);
    return false;
  }
};

const initialState = {
  isDarkMode: getInitialTheme(), 
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme(state) {
      state.isDarkMode = !state.isDarkMode;
      try {
        Cookies.set('theme', state.isDarkMode, { expires: 7 }); 
      } catch (error) {
        console.error('Error setting theme cookie:', error);
      }
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
