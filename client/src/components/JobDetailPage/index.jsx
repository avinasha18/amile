import React from 'react';
import { FaArrowLeft, FaBuilding, FaMapMarkerAlt, FaMoneyBillWave, FaCalendarAlt, FaClock, FaUsers, FaGraduationCap } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
// Sample job data
const sampleJob = {
  title: "Senior Frontend Developer",
  company: "TechNova Solutions",
  logo: "/assets/google_logo.png",
  location: "San Francisco, CA (Remote)",
  type: "Full-time",
  salary: "$120,000 - $160,000 per year",
  startDate: "Immediate",
  duration: "Permanent",
  openings: 2,
  experience: "3-5 years",
  description: "TechNova Solutions is seeking a talented Senior Frontend Developer to join our innovative team. In this role, you'll be responsible for developing and maintaining cutting-edge web applications, collaborating with cross-functional teams, and mentoring junior developers.",
  requirements: [
    "3+ years of experience with React.js and its ecosystem",
    "Strong proficiency in JavaScript, HTML5, and CSS3",
    "Experience with state management libraries (e.g., Redux, MobX)",
    "Familiarity with modern frontend build pipelines and tools",
    "Understanding of cross-browser compatibility issues and ways to work around them",
    "Excellent problem-solving skills and attention to detail"
  ],
  responsibilities: [
    "Develop new user-facing features using React.js",
    "Build reusable components and front-end libraries for future use",
    "Translate designs and wireframes into high-quality code"
  ],
  companyDescription: "TechNova Solutions is a leading software development company specializing in creating innovative web and mobile applications. With a team of passionate technologists, we strive to deliver cutting-edge solutions that transform businesses and enhance user experiences. Our collaborative work environment fosters creativity and continuous learning."
};

const JobDetailPage = () => {
  // In a real application, you'd fetch the job data based on an ID
  // and handle loading/error states
  const job = sampleJob;
  const navigate = useNavigate()

  return (
    <div className="bg-black min-h-screen overflow-y-auto text-gray-300">
      <div className="container mx-auto px-4 py-8">
        {/* Back button */}
        <button 
          onClick={() => navigate('/') }
          className="flex items-center text-blue-400 hover:text-blue-300 transition-colors mb-6"
        >
          <FaArrowLeft className="mr-2" />
          Back to Jobs
        </button>

        {/* Job header */}
        <div className="bg-[#0c0b0b] rounded-lg p-6 mb-8 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img src={job.logo} alt={`${job.company} logo`} className="w-16 h-16 rounded-full mr-4" />
              <div>
                <h1 className="text-2xl font-bold text-white">{job.title}</h1>
                <p className="text-xl text-blue-400">{job.company}</p>
              </div>
            </div>
            <span className={`px-4 py-2 rounded-full text-sm ${job.type === 'Full-time' ? 'bg-green-900 text-green-300' : 'bg-blue-900 text-blue-300'}`}>
              {job.type}
            </span>
          </div>
        </div>

        {/* Job details and application */}
        <div className="flex flex-col lg:flex-row gap-8 h-auto">
          {/* Left column - Job details */}
          <div className="lg:w-2/3">
            <section className="bg-[#0c0b0b] rounded-lg p-6 mb-8 shadow-lg">
              <h2 className="text-xl font-semibold mb-4 text-white">Job Description</h2>
              <p className="mb-4">{job.description}</p>
              
              <h3 className="text-lg font-semibold mb-2 text-white">Requirements:</h3>
              <ul className="list-disc list-inside mb-4">
                {job.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>

              <h3 className="text-lg font-semibold mb-2 text-white">Responsibilities:</h3>
              <ul className="list-disc list-inside">
                {job.responsibilities.map((resp, index) => (
                  <li key={index}>{resp}</li>
                ))}
              </ul>
            </section>

            <section className="bg-[#0c0b0b] rounded-lg p-6 mb-8 shadow-lg">
              <h2 className="text-xl font-semibold mb-4 text-white">About {job.company}</h2>
              <p>{job.companyDescription}</p>
            </section>
          </div>

          {/* Right column - Application and quick info */}
          <div className="lg:w-1/3">
            <div className="bg-[#0c0b0b] rounded-lg p-6 mb-8 shadow-lg sticky top-8">
              <h2 className="text-xl font-semibold mb-4 text-white">Quick Info</h2>
              <div className="space-y-3">
                <InfoItem icon={<FaMapMarkerAlt />} text={job.location} />
                <InfoItem icon={<FaMoneyBillWave />} text={job.salary} />
                <InfoItem icon={<FaCalendarAlt />} text={`Start Date: ${job.startDate}`} />
                <InfoItem icon={<FaClock />} text={`Duration: ${job.duration}`} />
                <InfoItem icon={<FaUsers />} text={`${job.openings} openings`} />
                <InfoItem icon={<FaGraduationCap />} text={`Experience: ${job.experience}`} />
              </div>
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium mt-6 hover:bg-blue-700 transition-colors">
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ icon, text }) => (
  <div className="flex items-center">
    <span className="text-blue-400 mr-2">{icon}</span>
    <span>{text}</span>
  </div>
);

export default JobDetailPage;