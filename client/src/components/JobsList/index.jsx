import React from 'react';
import JobCard from '../JobCard';

const JobList = () => {
  // This is a mock list of jobs. In a real application, you'd fetch this data from an API.
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
        id: 1,
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
        id: 1,
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
      }
    // Add more job objects here...
  ];

  return (
    <div className="space-y-6 overflow-hidden  no-scrollbar">
       
      {jobs.map(job => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
};

export default JobList;