// App.js
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import JobsPage from "./components/Jobs";
import JobDetailPage from "./components/JobDetailPage";
import ProfilePage from "./components/Profile";
import Messages from "./components/Messages";
import Applied from "./components/Applied";
import InterviewApp from "./components/Mock-Interview/InterviewApp";
import { ThemeProvider } from "./context/ThemeContext";
import "./App.css";

function App() {
  const location = useLocation();

  // Determine if we are on the InterviewApp route
  const isInterviewAppRoute = location.pathname === "/aimock";

  return (
    <ThemeProvider>
      <div className="flex flex-col h-screen">
        {!isInterviewAppRoute && <Navbar />}
        <div className="flex flex-1 overflow-hidden">
          {!isInterviewAppRoute && <Sidebar />}
          <div className="flex-1 overflow-y-auto">
            <Routes>
              <Route exact path="/" element={<JobsPage />} />
              <Route exact path="/messages" element={<Messages />} />
              <Route exact path="/applied" element={<Applied />} />
              <Route exact path="/jobdetail" element={<JobDetailPage />} />
              <Route exact path="/profile" element={<ProfilePage />} />
              <Route exact path="/aimock" element={<InterviewApp />} />
            </Routes>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
