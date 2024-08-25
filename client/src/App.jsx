


import { useSelector } from "react-redux";
import Login from "./components/Login";
import { RouteManagement } from "./components/RouteManagement";
import { Navigate, Route, Routes } from "react-router-dom";
import UserRegisterFlow from "./components/Register";
import { VerifyAccount } from "./components/verifyAccount";

function App() {
  const islogin = useSelector((state)=>state.auth.token)

  return (
    <Routes>
      <Route path="/verifyaccount" element={<VerifyAccount/>} />
      <Route path="/signup" element={!islogin?<UserRegisterFlow />:<Navigate to={"/"} replace/>} />
      <Route path="/login" element={!islogin?<Login />:<Navigate to={"/"} replace/>} />
      <Route path="/*"  element={<RouteManagement  islogin={islogin}/>} />
    </Routes>
  );
}

export default App;
