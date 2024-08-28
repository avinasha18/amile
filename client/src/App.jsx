import { useSelector } from "react-redux";
import Login from "./components/Login";
import { RouteManagement } from "./components/RouteManagement";
import { Route, Routes } from "react-router-dom";
import UserRegisterFlow from "./components/Register";
import { ThemeProvider } from "./context/ThemeContext";
import { setAuthToken } from "./hooks/golbalAuth";
import PageNotFound from "./components/noinfopage";
import { ForgotPassword } from "./components/forgotPassword";
import { ResetPassword } from "./components/resetPassword";
import { ResendVerification } from "./components/resendVerification";
import { VerifyAccount } from "./components/verifyAccount";
import ReportIncident from "./components/reportIncident";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MentorRouteManagement from "./mentor-components/MentorRouteManagement";
function App() {
  const islogin = useSelector((state) => state.auth.token);
  setAuthToken(islogin);
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/verifyaccount" element={<VerifyAccount />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/resendverify" element={<ResendVerification />} />
        <Route path="/report" element={<ReportIncident />} />
        <Route
          path="/signup"
          element={!islogin ? <UserRegisterFlow /> : <PageNotFound />}
        />
        <Route
          path="/login"
          element={!islogin ? <Login /> : <PageNotFound />}
        />
        <Route path="/*" element={<RouteManagement islogin={islogin} />} />

        <Route path="/mentor/*" element={<MentorRouteManagement />}/>
      </Routes>
      <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
    </ThemeProvider>
  );
}

export default App;
