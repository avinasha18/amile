
import React from 'react';
import JobCard from '../JobCard';
import { useTheme } from '../../context/ThemeContext';

const JobList = () => {
  const { isDarkMode } = useTheme();

  const jobs = [
    {
      id: 1,
      title: "Frontend Developer Intern",
      company: "Tech Innovators",
      location: "Remote",
      logo: "/assets/google_logo.png",
      type: "Part-time",
      tags: ["React", "JavaScript", "CSS"],
      salary: "$1000-$1500/month",
      startDate: "Immediate",
      openings: "3 openings",
      experience: "0-1 years",
      remote: true,
    },
    {
        id: 2,
        title: "Frontend Developer Intern",
        company: "Tech Innovators",
        location: "Remote",
        logo: "/assets/facebook.png",
        type: "Part-time",
        tags: ["React", "JavaScript", "CSS"],
        salary: "$1000-$1500/month",
        startDate: "Immediate",
        openings: "3 openings",
        experience: "0-1 years",
        remote: true,
      },
      {
        id: 3,
        title: "Frontend Developer Intern",
        company: "Tech Innovators",
        location: "Remote",
        logo: "/assets/google_logo.png",
        type: "Part-time",
        tags: ["React", "JavaScript", "CSS"],
        salary: "$1000-$1500/month",
        startDate: "Immediate",
        openings: "3 openings",
        experience: "0-1 years",
        remote: true,
      },
      {
        id: 4,
        title: "Frontend Developer Intern",
        company: "Tech Innovators",
        location: "Remote",
        logo: "https://example.com/logo1.png",
        type: "Part-time",
        tags: ["React", "JavaScript", "CSS"],
        salary: "$1000-$1500/month",
        startDate: "Immediate",
        openings: "3 openings",
        experience: "0-1 years",
        remote: true,
      },
      {
        id: 5,
        title: "Frontend Developer Intern",
        company: "Tech Innovators",
        location: "Remote",
        logo: "/assets/google_logo.png",
        type: "Part-time",
        tags: ["React", "JavaScript", "CSS"],
        salary: "$1000-$1500/month",
        startDate: "Immediate",
        openings: "3 openings",
        experience: "0-1 years",
        remote: true,
      }
  ];

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 ${isDarkMode ? 'bg-black' : 'bg-gray-100'}`}>
      {jobs.map(job => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
};

export default JobList;