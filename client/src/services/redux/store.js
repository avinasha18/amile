// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./AuthSlice"; // Import the auth reducer
import themeSlice from './themeSlice';

const store = configureStore({
  reducer: {
    auth: authReducer, 
    theme: themeSlice,
  },
});

export default store;
