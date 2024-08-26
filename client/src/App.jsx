import { useSelector } from "react-redux";
import Login from "./components/Login";
import { RouteManagement } from "./components/RouteManagement";
import {  Route, Routes } from "react-router-dom";
import UserRegisterFlow from "./components/Register";
import { ThemeProvider } from "./context/ThemeContext";
import { setAuthToken } from "./hooks/golbalAuth";
import PageNotFound from "./components/noinfopage"
import { ForgotPassword } from "./components/forgotPassword";
import { ResetPassword } from "./components/resetPassword";
import { ResendVerification } from "./components/resendVerification";
import ReportIncident from "./components/reportIncident";

function App() {
  const islogin = useSelector((state) => state.auth.token);
  setAuthToken(islogin)
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
          element={!islogin ? <UserRegisterFlow />: <PageNotFound/> }
        />
        <Route
          path="/login"
          element={!islogin ?<Login />:<PageNotFound/> }
        />
        <Route path="/*" element={<RouteManagement islogin={islogin} />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
