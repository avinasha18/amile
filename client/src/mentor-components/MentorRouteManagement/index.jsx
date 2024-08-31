import React from 'react';
import MentorHome from '../Home';
import MentorCourses from '../Courses';
import MentorCourseDetails from '../Courses/CourseDetails';
import InterviewApp from '../../components/Mock-Interview/InterviewApp';
import { Route, Routes } from 'react-router-dom';
import MentorNavbar from '../Navbar/Navbar'; // If this navbar is not needed, remove this import
import MentorSidebar from '../Sidebar';
import MentorProfile from '../Profile/Profile';
import Dashboard from '../Dashboard';

const MentorRouteManagement = () => {
  return (
    <div className="flex flex-row h-screen overflow-hidden bg-gray-900 text-gray-100">
      <MentorSidebar />
      <div className={`h-screen flex flex-1 overflow-auto no-scrollbar`}>
        <div className="w-full">
          <MentorNavbar />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<MentorHome />} />
              <Route path="/profile" element={<MentorProfile />} />
              <Route path="/courses" element={<MentorCourses />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/aimock" element={<InterviewApp />} />
              <Route path="/courses/:id" element={<MentorCourseDetails />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorRouteManagement;
