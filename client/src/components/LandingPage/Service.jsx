import React from 'react';

// Reusable Card Component
const ServiceCard = ({ title, description }) => {
  return (
    <div className="bg-gradient-to-r from-teal-300 via-blue-400 to-purple-500 rounded-lg shadow-xl p-6 flex flex-col justify-between h-auto w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
      <div>
        <h2 className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-3 sm:mb-5">{title}</h2>
        <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl">{description}</p>
      </div>
    </div>
  );
};

const Service = () => {
  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center py-8 sm:py-12 md:py-16 lg:py-20">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="flex flex-wrap justify-center gap-8 sm:gap-10 md:gap-12 lg:gap-14">
          <div className="flex-shrink-0">
            <ServiceCard
              title="Verified Companies"
              description="Work with reputable and verified companies worldwide."
            />
          </div>
          <div className="flex-shrink-0">
            <ServiceCard
              title="Personalized Job Alerts"
              description="Get job recommendations based on your profile and preferences."
            />
          </div>
          <div className="flex-shrink-0">
            <ServiceCard
              title="Career Development"
              description="Access resources to improve your skills and advance your career."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;