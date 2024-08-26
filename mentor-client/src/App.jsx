import './App.css'
import Navbar from './components/Navbar/Navbar'
import { Routes, Route, useLocation } from 'react-router-dom'
import Sidebar from './components/Sidebar/Sidebar'
import Home from './components/Home'
import CourseDetails from './components/Courses/CourseDetails'
import Courses from './components/Courses'
import Profile from './components/Profile/Profile'

function App() {

  return (
    <div className='flex flex-col h-screen bg-gray-900 text-gray-100'>
      <Navbar />
      <div className='h-screen flex flex-1 overflow-hidden no-scrollbar'>
        <Sidebar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
          <Route exact path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
