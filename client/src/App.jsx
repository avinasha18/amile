import React, { useEffect, useMemo } from 'react';
import { Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ErrorBoundary from './components/ErrorBoundary';
import { useAuth } from './hooks/useAuth.jsx';

import Login from "./components/Login";
import { RouteManagement } from "./components/RouteManagement";
import UserRegisterFlow from "./components/Register";
import { ThemeProvider } from "./context/ThemeContext";
import { setAuthToken } from "./hooks/golbalAuth";
import PageNotFound from "./components/noinfopage";
import { ForgotPassword } from "./components/forgotPassword";
import { ResetPassword } from "./components/resetPassword";
import { ResendVerification } from "./components/resendVerification";
import { VerifyAccount } from "./components/verifyAccount";
import ReportIncident from "./components/reportIncident";
import MentorRouteManagement from "./mentor-components/MentorRouteManagement";
import { VerifyMentor } from './components/verifyAccount/verifyMentor';
import socket from './hooks/socket';
import LandingPage from './components/LandingPage';

function App() {
  const { isAuthenticated, user, isInitialized } = useAuth();
  const userId = user?._id;
  const memoizedUserId = useMemo(() => userId, [userId]);
  
  useEffect(() => {
    if (isAuthenticated && memoizedUserId) {
      socket.on('connect', () => {
        socket.emit('joinChat', { userId: memoizedUserId });
        console.log(`Emitted joinChat for User ID: ${memoizedUserId} on socket connect`);
      });
    }
  
    return () => {
      socket.off('connect');
    };
  }, [isAuthenticated, memoizedUserId]);

  // Show loading while auth is being initialized
  if (!isInitialized) {
    return (
      <ErrorBoundary>
        <ThemeProvider>
          <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading...</p>
            </div>
          </div>
        </ThemeProvider>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Routes>
          <Route path="/verifyaccount" element={<VerifyAccount />} />
          <Route path="/mentor/verifyaccount" element={<VerifyMentor />} />
          <Route  path='/land' element={< LandingPage/>} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/resendverify" element={<ResendVerification />} />
          <Route path="/report" element={<ReportIncident />} />

        <Route
          path="/signup"
          element={!isAuthenticated ? <UserRegisterFlow /> : <PageNotFound />}
        />
        <Route
          path="/login"
          element={!isAuthenticated ? <Login /> : <PageNotFound />}
        />
        <Route path="/*" element={<RouteManagement islogin={isAuthenticated} />} />
          <Route path="/mentor/*" element={<MentorRouteManagement />}/>
        </Routes>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;