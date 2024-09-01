// src/AuthSlice.js
import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: Cookies.get('token') || null,
    user:Cookies.get('user') || null,
    userData: JSON.parse(Cookies.get('userData') || null) || {}
  },
  reducers: {
    loginSuccess: (state, action) => {
      const { token ,user,userId} = action.payload;
      state.token = token;
      state.user = user.username;
      console.log(action.payload.userId,"user id")
      Cookies.set('token', token, { expires: action.payload.cookieExpires || 1});
      Cookies.set('user', user.username, { expires: action.payload.cookieExpires || 1}); 
      Cookies.set('userId', user._id, { expires: action.payload.cookieExpires || 1}); 

    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      Cookies.remove('token');
      Cookies.remove('user');
      Cookies.remove('userData');
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
      Cookies.set('userData',JSON.stringify(action.payload), { expires: action.payload?.cookieExpires || 7}); 

    },
  },
});

export const { loginSuccess, logout, setUserData } = authSlice.actions;
export default authSlice.reducer;