import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { loginSuccess } from '../services/redux/AuthSlice';
import { setAuthToken } from './golbalAuth';

export const useAuth = () => {
  const dispatch = useDispatch();
  const [isInitialized, setIsInitialized] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const initializeAuth = () => {
      try {
        // Check if we have auth data in cookies
        const tokenFromCookie = Cookies.get('token');
        const userFromCookie = Cookies.get('user');
        const userDataFromCookie = Cookies.get('userData');
        const userIdFromCookie = Cookies.get('userId');

        // Debug: Log all cookies
        console.log('All cookies:', document.cookie);
        console.log('Individual cookies:', {
          token: tokenFromCookie,
          user: userFromCookie,
          userData: userDataFromCookie,
          userId: userIdFromCookie
        });

        if (tokenFromCookie && userFromCookie && userDataFromCookie) {
          // Parse user data from cookie
          const userData = JSON.parse(userDataFromCookie);
          
          console.log('Found auth data in cookies:', {
            hasToken: !!tokenFromCookie,
            hasUser: !!userData,
            hasUserId: !!userIdFromCookie
          });
          
          // If we have user data but no token, we need to re-authenticate
          if (!tokenFromCookie && userDataFromCookie) {
            console.log('User data found but no token - clearing invalid cookies');
            // Clear invalid cookies
            Cookies.remove('token');
            Cookies.remove('user');
            Cookies.remove('userData');
            Cookies.remove('userId');
          } else if (tokenFromCookie && userDataFromCookie) {
            // Dispatch login success to restore auth state
            dispatch(loginSuccess({
              token: tokenFromCookie,
              user: userData,
              userId: userIdFromCookie,
              cookieExpires: 1 // This won't affect existing cookies
            }));

            // Set axios auth header
            setAuthToken(tokenFromCookie);
            
            console.log('Auth restored from cookies successfully');
          } else {
            console.log('No valid auth data found in cookies:', {
              hasToken: !!tokenFromCookie,
              hasUser: !!userFromCookie,
              hasUserData: !!userDataFromCookie
            });
          }
        }
      } catch (error) {
        console.error('Error initializing auth from cookies:', error);
        // Clear invalid cookies
        Cookies.remove('token');
        Cookies.remove('user');
        Cookies.remove('userData');
        Cookies.remove('userId');
      } finally {
        setIsInitialized(true);
      }
    };

    initializeAuth();
  }, [dispatch]);

  // Update axios header when token changes
  useEffect(() => {
    setAuthToken(token);
  }, [token]);

  return {
    isAuthenticated: !!token,
    user,
    token,
    isInitialized
  };
};
