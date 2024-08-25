// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import JobsPage from './components/Jobs';
import JobDetailPage from './components/JobDetailPage';
import ProfilePage from './components/Profile';
import Messages from './components/Messages';
import Applied from './components/Applied';
import { ThemeProvider } from './context/ThemeContext';
import './App.css';

function App() {
  return (
    <ThemeProvider>
        <div className="flex flex-col h-screen">
          <Navbar />
          <div className="flex flex-1 overflow-hidden">
            <Sidebar />
            <div className="flex-1 overflow-y-auto">
              <Routes>
                <Route exact path="/" element={<JobsPage />} />
                <Route exact path="/messages" element={<Messages />} />
                <Route exact path='/applied' element={<Applied />}/>
                <Route exact path='/jobdetail' element={<JobDetailPage/>}/>
                <Route exact path='/profile' element={<ProfilePage/>}/>
              </Routes>
            </div>
          </div>
        </div>
    </ThemeProvider>
  );
}

export default App;