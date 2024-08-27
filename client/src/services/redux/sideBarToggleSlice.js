import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie'; 

const initialState = {
  isSidebar: Cookies.get('sidebar') === 'true' ? true : false, 
};

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.isSidebar = !state.isSidebar;
      Cookies.set('sidebar', state.isSidebar, { expires: 7 }); 
    },
  },
});

export const { toggleSidebar } = sidebarSlice.actions;

export default sidebarSlice.reducer;
