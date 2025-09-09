// src/AuthSlice.js
import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: Cookies.get('token') || null,
    user: Cookies.get('user') || null,
    userData: (() => {
      try {
        const userData = Cookies.get('userData');
        return userData ? JSON.parse(userData) : {};
      } catch (error) {
        console.error('Error parsing userData from cookies:', error);
        return {};
      }
    })()
  },
  reducers: {
    loginSuccess: (state, action) => {
      const { token, user, userId } = action.payload;
      
      // Validate required data
      if (!token) {
        console.error('Login failed: No token provided', action.payload);
        return;
      }
      
      if (!user) {
        console.error('Login failed: No user data provided', action.payload);
        return;
      }
      
      state.token = token;
      state.user = user.username || user.name || 'Unknown User';
      state.userData = user;
      
      // Set cookies with proper error handling
      try {
        const cookieExpires = action.payload?.cookieExpires || 1;
        const cookieOptions = { 
          expires: cookieExpires,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          path: '/'
        };
        
        console.log('Setting cookies with:', {
          token: token ? 'present' : 'missing',
          user: user.username || user.name || 'Unknown User',
          userId: userId || user._id || '',
          cookieExpires,
          cookieOptions
        });

        Cookies.set('token', token, cookieOptions);
        Cookies.set('user', user.username || user.name || 'Unknown User', cookieOptions);
        Cookies.set('userId', userId || user._id || '', cookieOptions);
        Cookies.set('userData', JSON.stringify(user), cookieOptions);
        
        // Verify cookies were set
        console.log('Verifying cookies after setting:', {
          token: Cookies.get('token') ? 'set' : 'not set',
          user: Cookies.get('user') ? 'set' : 'not set',
          userData: Cookies.get('userData') ? 'set' : 'not set',
          userId: Cookies.get('userId') ? 'set' : 'not set'
        });
        
        console.log('Auth cookies set successfully');
      } catch (error) {
        console.error('Error setting cookies:', error);
      }
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.userData = {};
      
      // Remove all auth-related cookies
      try {
        Cookies.remove('token');
        Cookies.remove('user');
        Cookies.remove('userData');
        Cookies.remove('userId');
      } catch (error) {
        console.error('Error removing cookies during logout:', error);
      }
    },
    setUserData: (state, action) => {
      if (!action.payload) {
        console.error('setUserData: No payload provided');
        return;
      }
      
      state.userData = action.payload;
      
      try {
        const cookieExpires = action.payload?.cookieExpires || 7;
        Cookies.set('userData', JSON.stringify(action.payload), { expires: cookieExpires });
      } catch (error) {
        console.error('Error setting userData cookie:', error);
      }
    },
  },
});

export const { loginSuccess, logout, setUserData } = authSlice.actions;
export default authSlice.reducer;