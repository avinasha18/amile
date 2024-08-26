import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import JobsPage from "../Jobs";

import JobDetailPage from "../JobDetailPage";
import ProfilePage from "../Profile";
import Messages from "../Messages";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import MyReferals from "../MyReferals";

export const RouteManagement = ({ islogin }) => {
  const location = useLocation(window.location);

  const ProtectedRoute = ({ isLogin, children, nextPath }) => {
    if (!isLogin) {
      return <Navigate to={`/login?nextpath=${nextPath}`} replace />;
    }

    return children;
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-gray-100">
      <Navbar isLogin={islogin} />
      <div className={`h-screen flex flex-1 overflow-hidden no-scrollbar`}>
        <Sidebar isLogin={islogin} />
        <Routes>
          <Route path="/" element={<JobsPage />} />
          <Route
            path="messages"
            element={
              <ProtectedRoute isLogin={islogin} nextPath={location.pathname}>
                <Messages />
              </ProtectedRoute>
            }
          />
          <Route
            path="/jobdetail"
            element={
              <ProtectedRoute isLogin={islogin} nextPath={location.pathname}>
                <JobDetailPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute isLogin={islogin} nextPath={location.pathname}>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
              <Route
            path="/myreferals"
            element={
              <ProtectedRoute isLogin={islogin} nextPath={location.pathname}>
                <MyReferals />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
};
