import React from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import JobsPage from './components/Jobs';
import './App.css'
import { Route,Routes,Router } from 'react-router-dom';
import JobDetailPage from './components/JobDetailPage';
import ProfilePage from './components/Profile';
import Messages from './components/Messages';
function App() {
  return (
    <div className="flex flex-col h-screen bg-gray-900 text-gray-100">
      <Navbar />
      <div className="h-screen flex flex-1 overflow-hidden  no-scrollbar">
        <Sidebar />
          <Routes>
            <Route exact path="/" element={<JobsPage />} />
            <Route exact path="/messages" element={<Messages />} />

            <Route exact path='/jobdetail' element={<JobDetailPage/>}/>
            <Route exact path='/profile' element={<ProfilePage/>}/>
          </Routes>
      </div>
    </div>
  );
}

export default App;
