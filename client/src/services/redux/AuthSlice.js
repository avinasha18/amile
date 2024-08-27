// src/AuthSlice.js
import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: Cookies.get('token') || null,
    user: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      const { token, user } = action.payload;
      state.token = token;
      state.user = user;
      Cookies.set('token', token, { expires: action.payload.cookieExpires || 1}); 
      Cookies.set('user', JSON.stringify(user), { expires: action.payload.cookieExpires || 1 });
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      Cookies.remove('token');
      Cookies.remove('user')
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { loginSuccess, logout, setUser } = authSlice.actions;
export default authSlice.reducer;
