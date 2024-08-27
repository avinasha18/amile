import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie'; 

const initialState = {
  isDarkMode: Cookies.get('theme') === 'true' ? true : false, 
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme(state) {
      state.isDarkMode = !state.isDarkMode;
      Cookies.set('theme', state.isDarkMode, { expires: 7 }); 
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
