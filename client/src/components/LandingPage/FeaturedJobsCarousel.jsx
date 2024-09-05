// FeaturedJobsCarousel.js
import React from "react";
 // Make sure to import your CSS file or define the styles globally

const FeaturedJobsCarousel = () => {
  const jobs = [
    { title: "Software Engineer", company: "Google", location: "Mountain View, CA" },
    { title: "UI/UX Designer", company: "Apple", location: "Cupertino, CA" },
    { title: "Data Analyst", company: "Amazon", location: "Seattle, WA" },
    { title: "Product Manager", company: "Microsoft", location: "Redmond, WA" },
    { title: "Backend Developer", company: "Facebook", location: "Menlo Park, CA" },
    { title: "Full Stack Developer", company: "Twitter", location: "San Francisco, CA" },
    { title: "DevOps Engineer", company: "Netflix", location: "Los Gatos, CA" },
    { title: "Data Scientist", company: "Tesla", location: "Palo Alto, CA" },
  ];

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-4xl font-bold mb-8 text-gray-100">Job Listings</h2>
      <div className="relative group">
        <div className="flex overflow-x-auto overflow-y-hidden space-x-6 scrollbar-hidden snap-x snap-mandatory">
          {jobs.map((job, index) => (
            <div
              key={index}
              className="snap-center min-w-[400px] sm:min-w-[300px] lg:min-w-[350px] bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 text-white p-6 rounded-xl shadow-lg flex-shrink-0 transform transition hover:scale-105"
            >
              <h3 className="text-xl font-bold">{job.title}</h3>
              <p className="text-sm mt-1">{`${job.company} | ${job.location}`}</p>
              <button className="mt-4 px-5 py-2.5 bg-white text-indigo-700 rounded-full shadow-md hover:shadow-lg hover:bg-gray-100 transition-transform duration-200 ease-in-out">
                Apply Now
              </button>
            </div>
          ))}
        </div>

        {/* Carousel navigation controls */}
        <button
          className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white text-indigo-700 p-2 rounded-full shadow-lg hover:scale-110 transition hidden group-hover:block"
          onClick={() => scroll(-300)}
        >
          ◀
        </button>
        <button
          className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white text-indigo-700 p-2 rounded-full shadow-lg hover:scale-110 transition hidden group-hover:block"
          onClick={() => scroll(300)}
        >
          ▶
        </button>
      </div>
    </div>
  );
};

// Function to handle scrolling within the carousel
const scroll = (offset) => {
  document.querySelector(".overflow-x-auto").scrollBy({
    top: 0,
    left: offset,
    behavior: "smooth",
  });
};

export default FeaturedJobsCarousel;