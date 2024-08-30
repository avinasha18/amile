import React from 'react';
import MentorHome from '../Home';
import MentorCourses from '../Courses';
import MentorCourseDetails from '../Courses/CourseDetails';
import { Route, Routes } from 'react-router-dom';
import MentorNavbar from '../Navbar/Navbar'; // If this navbar is not needed, remove this import
import MentorSidebar from '../Sidebar/Sidebar';
import MentorProfile from '../Profile/Profile';

const MentorRouteManagement = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-900 text-gray-100">
    <MentorNavbar  />
    <div className={`h-screen flex flex-1 overflow-hidden no-scrollbar`}>
      <MentorSidebar  />
      <div className="flex-1 overflow-y-auto">
        <Routes>
          <Route path="/" element={<MentorHome />} />
          <Route path="/profile" element={<MentorProfile />} />
          <Route path="/courses" element={<MentorCourses />} />
          <Route path="/courses/:id" element={<MentorCourseDetails />} />
        </Routes>
      </div>
    </div>
    </div>
  );
};

export default MentorRouteManagement;
