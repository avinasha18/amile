// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./AuthSlice"; // Import the auth reducer
import themeSlice from './themeSlice';
import sideBarToggleSlice from './sideBarToggleSlice';
import compilerSlice from '../redux/compilerSlice'

const store = configureStore({
  reducer: {
    auth: authReducer, 
    theme: themeSlice,
    sidebar:sideBarToggleSlice,
    compilerSlice,

  },
});

export default store;
