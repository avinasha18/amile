import { useSelector } from "react-redux";
import Login from "./components/Login";
import { RouteManagement } from "./components/RouteManagement";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import UserRegisterFlow from "./components/Register";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import JobsPage from './components/Jobs';
import { VerifyAccount } from './components/verifyAccount';
import JobDetailPage from './components/JobDetailPage';
import ProfilePage from './components/Profile';
import Messages from './components/Messages';
import InterviewApp from "./components/Mock-Interview/InterviewApp";
import Feedback from "./components/Mock-Interview/Feedback";
import AppliedInternships from "./components/Applied";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GovernmentJobsPage from "./components/Government";
import GovernmentDetailedPage from "./components/GovernmentDetailed";
import Dashboard from "./components/Dashboard";

function App() {
  const islogin = useSelector((state) => state.auth.token);
  const location = useLocation();
  const isNavHide = location.pathname === "/aimock" || location.pathname === "/login" || location.pathname === "/signup"; // Corrected condition

  return (
    <ThemeProvider>
      <div className="flex flex-col h-screen">
        {!isNavHide && <Navbar isLogin={islogin} />}
        <div className="flex flex-1 overflow-hidden">
          {!isNavHide && <Sidebar isLogin={islogin} />}
          <div className="flex-1 overflow-y-auto">
            <Routes>
              <Route exact path="/" element={<JobsPage />} />
              <Route exact path='/dashboard' element={<Dashboard/>}/>
              <Route exact path="/messages" element={<Messages />} />
              <Route exact path="/applied" element={<AppliedInternships />} />
              <Route exact path="/jobdetail" element={<JobDetailPage />} />
              <Route exact path="/profile" element={<ProfilePage />} />
              <Route path="/verifyaccount" element={<VerifyAccount />} />
              <Route path="/signup" element={!islogin ? <UserRegisterFlow /> : <Navigate to="/" replace />} />
              <Route path="/login" element={!islogin ? <Login /> : <Navigate to="/" replace />} />
              <Route path="/*" element={<RouteManagement islogin={islogin} />} />
              <Route path="/aimock" element={<InterviewApp />} />
              <Route path="/feedback" element={<Feedback/>}/>
              <Route path='/government' element={<GovernmentJobsPage/>}/>
              <Route path='/governmentDetailed/:id' element={<GovernmentDetailedPage/>}/>

            </Routes>
          </div>
        </div>
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
      </div>
    </ThemeProvider>
  );
}

export default App;
