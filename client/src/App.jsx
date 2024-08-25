import React from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import JobsPage from './components/Jobs';
import './App.css'
import { Route,Routes,useLocation } from 'react-router-dom';
import JobDetailPage from './components/JobDetailPage';
import ProfilePage from './components/Profile';
import Messages from './components/Messages';
import InterviewApp from './components/Mock-Interview/InterviewApp';
import Feedback from './components/Mock-Interview/Feedback';
function App() {
  const location = useLocation();
  
  // Determine if the sidebar should be hidden
  const hideSidebar = location.pathname === '/interview' ||'/feedback';

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-gray-100">
      <Navbar />
      {/* {
        localStorage.getItem('user') ? (
          <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 p-4">
              <Routes>
                <Route path="/" element={<JobsPage />} />
                <Route path="/job/:id" element={<JobDetailPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/interview" element={<InterviewApp />} />
                <Route path="/feedback" element={<Feedback />} />
              </Routes>
            </div>
            </div>
            ) : (
              <div className="flex h-screen justify-center items-center">
                <h1 className="text-3xl">Please login to access the dashboard</h1>
                </div>
                )
      } */}
      <div className="h-screen flex flex-1 overflow-hidden no-scrollbar">
        {!hideSidebar && <Sidebar />}
          <Routes>
            <Route exact path="/" element={<JobsPage />} />
            <Route exact path="/messages" element={<Messages />} />
            <Route exact path='/jobdetail' element={<JobDetailPage/>}/>
            <Route exact path='/profile' element={<ProfilePage/>}/>
          </Routes>
      </div>
      <Routes>
        <Route exact path="/interview" element={<InterviewApp />} />
        <Route exact path="/feedback" element={<Feedback />} />
      </Routes>
    </div>
  );
}

export default App;
