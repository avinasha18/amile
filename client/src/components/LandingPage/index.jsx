import React from "react";
import CardLayout from './CardLayout'; 
import FeaturedJobsCarousel from './FeaturedJobsCarousel';
import Footer from './Footer'; 
import ProfileCards from './ProfileCards';
import Service from './Service';
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="bg-gray-900 text-gray-100">
      {/* Header Section */}
      <header className="bg-gray-800">
        {/* Navbar */}
        <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center navbar">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 drop-shadow-lg">
            Amile
          </h1>
          
          <div className="buttons flex space-x-5">
            <ul className="nav-items flex space-x-6">
              <li><a href="#courses" className="hover:text-blue-400 text-white text-lg font-semibold hover:underline">Courses</a></li>
              <li><a href="#mentorship" className="hover:text-blue-400 text-white text-lg font-semibold hover:underline">Mentorship</a></li>
              <li><a href="#internship" className="hover:text-blue-400 text-white text-lg font-semibold hover:underline">Internship</a></li>
              <li><a href="#jobs" className="hover:text-blue-400 text-white text-lg font-semibold hover:underline">Jobs</a></li>
              <li><a href="#practice" className="hover:text-blue-400 text-white text-lg font-semibold hover:underline">Practice</a></li>
            </ul>
            <Link to='/login'>
            <button className="bg-blue-500 px-4 py-2 rounded-lg shadow-lg transform hover:scale-105 transition-transform hover:bg-blue-600 focus:bg-transparent focus:border-blue-500 focus:text-blue-500 active:bg-transparent active:border-blue-500 active:text-blue-500 text-white">
              Sign in
            </button>
            </Link>
            <Link to='/signup'>
            <button className="bg-blue-500 px-4 py-2 rounded-lg shadow-lg transform hover:scale-105 transition-transform hover:bg-blue-600 focus:bg-transparent focus:border-blue-500 focus:text-blue-500 active:bg-transparent active:border-blue-500 active:text-blue-500 text-white">
              Register
            </button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="courses" className="h-screen flex items-center justify-between px-8 max-w-7xl mx-auto bg-gray-900 mb-8">
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-5xl font-bold leading-tight drop-shadow-lg">Find Your Dream Job</h2>
          <p className="mt-4 text-lg text-gray-300">Connect with top companies and start your career today.</p>
          <button className="mt-8 bg-blue-500 px-8 py-4 rounded-full shadow-lg transform hover:scale-105 transition-transform hover:bg-blue-600 focus:bg-transparent focus:border-blue-500 focus:text-blue-500 active:bg-transparent active:border-blue-500 active:text-blue-500 text-white">
            Browse Jobs
          </button>
        </div>
        <div className="flex-1">
          <img
            src="https://static.vecteezy.com/system/resources/previews/000/518/208/original/man-working-with-computer-bright-colorful-vector-illustration.jpg"
            alt="Isometric Job Search Illustration"
            className="w-full h-auto rounded-lg"
          />
        </div>
      </section>

      {/* Features Section */}
      <section id="internship" className="bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-row-3 gap-8 text-center">
          <Service />
        </div>
      </section>

      {/* Card Layout Section */}
      <section id="practice" className="bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 text-gray-100">Our Services</h2>
          <CardLayout />
        </div>
      </section>

      {/* One-to-One Mentorship Section */}
      <section id="mentorship" className="bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 text-gray-100">One-to-One Mentorship</h2>
          <p className="text-lg text-gray-300 mb-4 mx-auto max-w-3xl">
            Our one-to-one mentorship program connects you with experienced mentors who provide personalized guidance and support tailored to your career goals.
          </p>

          <div className="flex overflow-x-auto space-x-4 py-4">
            <ProfileCards/>
          </div>
          <button className="bg-blue-500 px-8 py-4 rounded-full shadow-lg transform hover:scale-105 transition-transform hover:bg-blue-600 focus:bg-transparent focus:border-blue-500 focus:text-blue-500 active:bg-transparent active:border-blue-500 active:text-blue-500 text-white mt-8">
            Learn More
          </button>
        </div>
      </section>

      {/* AI-Driven Mock Interviews Section */}
      <section className="bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 text-gray-100">AI-Driven Mock Interviews</h2>
          <p className="text-lg text-gray-300 mb-4">Prepare for real interviews with our AI-driven mock interview platform that simulates real-world scenarios and provides feedback to improve your performance.</p>
          <button className="bg-blue-500 px-8 py-4 rounded-full shadow-lg transform hover:scale-105 transition-transform hover:bg-blue-600 focus:bg-transparent focus:border-blue-500 focus:text-blue-500 active:bg-transparent active:border-blue-500 active:text-blue-500 text-white mt-8">
            Try Now
          </button>
        </div>
      </section>

      {/* Job Listings Section */}
      <section id="jobs" className="bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto text-center">
          <FeaturedJobsCarousel />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 py-16 text-center">
        <h2 className="text-4xl font-bold text-gray-100">Ready to Take the Next Step?</h2>
        <p className="mt-4 text-gray-300">Join now and start applying to top companies today.</p>
        <button className="mt-8 bg-blue-500 px-8 py-4 rounded-full shadow-lg transform hover:scale-105 transition-transform hover:bg-blue-600 focus:bg-transparent focus:border-blue-500 focus:text-blue-500 active:bg-transparent active:border-blue-500 active:text-blue-500 text-white">
          Get Started
        </button>
      </section>

      {/* Footer */}
      <Footer /> 
    </div>
  );
};

export default LandingPage;
