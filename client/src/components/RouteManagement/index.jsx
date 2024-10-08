import { Route, Routes, Navigate, useLocation } from "react-router-dom";

import MyCourses from "../Courses/MyCourses";
import EnrolledCourses from "../Courses/EnrolledCourses";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import JobsPage from "../Jobs";
import JobDetailPage from "../JobDetailPage";
import ProfilePage from "../Profile";
import Messages from "../Messages";
import AppliedInternships from "../Applied";
import GovernmentJobsPage from "../Government"
import GovernmentDetailedPage from "../GovernmentDetailed"
import MyReferals from "../MyReferals";
import InterviewApp from "../Mock-Interview/InterviewApp";
import Feedback from "../Mock-Interview/Feedback"
import PageNotFound from "../noinfopage";
import Dashboard from "../Dashboard";
import CompanyChatStart from "../CompanyStartChart";
import Compiler from "../Compiler/components/Compiler";
import AIRecommendations from "../AI_Recommendations";
import Courses from "../Courses";
import Course from "../Courses/Course";
import Chatbot from "../Chatbot";
import ResumeBuilder from "../ResumeBuilder";
import MentorMatching from "../MentorMatching";
import ScrappedJobs  from "../OtherJobs/ScrappedJobs";
import ScrappedDetailedPage from "../OtherJobs/DetailedCard";
import GovtScrappedJobs from "../GovtScrapped";
import SkillAssessment from "../Feedback";
import AiBot from "../AIBot";
import Roadmap from "../Roadmap";
import RoadmapPage from "../Roadmap/RoadmapPage";
export const RouteManagement = ({ islogin }) => {
  const location = useLocation(window.location);

  const ProtectedRoute = ({ isLogin, children, nextPath }) => {
    if (!isLogin) {
      return <Navigate to={`/login?nextpath=${nextPath}`} replace />;
    }

    return children;
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-gray-100 w-full">
      <Navbar isLogin={islogin} />
      <div className={`h-screen flex flex-1 overflow-hidden no-scrollbar`}>
        <Sidebar isLogin={islogin} />
        <Routes>
          {/* <Route path="/" element={<JobsPage />} />
          <Route path="/dashboard" element={<Dashboard />} /> */}
          <Route
            path="/messages"
            element={
              <ProtectedRoute isLogin={islogin} nextPath={location.pathname}>
                <Messages />
              </ProtectedRoute>
            }
          />
           <Route
            path="/others"
            element={
              <ProtectedRoute isLogin={islogin} nextPath={location.pathname}>
                <ScrappedJobs />
              </ProtectedRoute>
            }
          />

          <Route
          path="/scrappedDetailed/:id"
          element={
              <ProtectedRoute isLogin={islogin} nextPath={location.pathname}>
                <ScrappedDetailedPage />
              </ProtectedRoute>
            }
          />
          <Route
          path="/govt"
          element={
              <ProtectedRoute isLogin={islogin} nextPath={location.pathname}>
                <GovtScrappedJobs />
              </ProtectedRoute>
            }
          />
  
            <Route
            path="/"
            element={
              <ProtectedRoute isLogin={islogin} nextPath={location.pathname}>
                <JobsPage  />
              </ProtectedRoute>
            }
          />
          <Route
            path="/yourai"
            element={
              <ProtectedRoute isLogin={islogin} nextPath={location.pathname}>
                <SkillAssessment  />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute isLogin={islogin} nextPath={location.pathname}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/jobdetail"
            element={
              <ProtectedRoute isLogin={islogin} nextPath={location.pathname}>
                <JobDetailPage />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/profile"
            element={
              <ProtectedRoute isLogin={islogin} nextPath={location.pathname}>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
            <Route
            path="/mentormatching"
            element={
              <ProtectedRoute isLogin={islogin} nextPath={location.pathname}>
                <MentorMatching />
              </ProtectedRoute>
            }
          />
          <Route
            path="/myreferals"
            element={
              <ProtectedRoute isLogin={islogin} nextPath={location.pathname}>
                <MyReferals />
              </ProtectedRoute>
            }
          />

          <Route
            path="/applied"
            element={
              <ProtectedRoute isLogin={islogin} nextPath={location.pathname}>
                <AppliedInternships />
              </ProtectedRoute>
            }
          />
          <Route
            path="/government"
            element={
              <ProtectedRoute isLogin={islogin} nextPath={location.pathname}>
                <GovernmentJobsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/governmentDetailed/:id"
            element={
              <ProtectedRoute isLogin={islogin} nextPath={location.pathname}>
                <GovernmentDetailedPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/aimock"
            element={
              <ProtectedRoute isLogin={islogin} nextPath={location.pathname}>
                <InterviewApp />
              </ProtectedRoute>
            }
          />
          <Route
            path="/airecommendations"
            element={
              <ProtectedRoute isLogin={islogin} nextPath={location.pathname}>
                <AIRecommendations />
              </ProtectedRoute>
            }
          />
          <Route
            path="/feedback"
            element={
              <ProtectedRoute isLogin={islogin} nextPath={location.pathname}>
                <Feedback />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chatbot"
            element={
              <ProtectedRoute isLogin={islogin} nextPath={location.pathname}>
                <Chatbot />
              </ProtectedRoute>
            }
          />
          <Route
            path="/*"
            element={
              <PageNotFound />
            }
          />
          <Route path="/companyChat" element={< CompanyChatStart />} />
          <Route path="/resumebuilder" element={<ResumeBuilder />} />
          <Route path="/compiler" element={< Compiler />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/course/:id" element={<Course />} />
          <Route path="/my-courses" element={<MyCourses />} />
          <Route
            path="/course/:id/learn"
            element={
              <ProtectedRoute isLogin={islogin} nextPath={location.pathname}>
                <EnrolledCourses /> {/* or the component you want to render for this route */}
              </ProtectedRoute>
            }
          />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/roadmap/:id" element={<RoadmapPage />} />
        </Routes>
      </div>
      <AiBot/>
    </div>
  );
};
