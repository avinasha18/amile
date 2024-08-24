import React from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import JobsPage from './components/Jobs';
import './App.css'
function App() {
  return (
    <div className="flex flex-col h-screen bg-gray-900 text-gray-100">
      <Navbar />
      <div className="h-screen flex flex-1 overflow-hidden  no-scrollbar">
        <Sidebar />
        <JobsPage />
      </div>
    </div>
  );
}

export default App;
