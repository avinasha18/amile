// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./AuthSlice"; // Import the auth reducer

const store = configureStore({
  reducer: {
    auth: authReducer, 
  },
});

export default store;
