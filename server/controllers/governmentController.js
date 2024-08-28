import {Government} from '../models/government.model.js'
// Controller to create a job posting
import { ObjectId } from 'mongodb';
import {GovernmentApplication} from '../models/government.model.js'
export const createJobPosting = async (req, res) => {
  try {
    const {
      jobId,
      companyName,
      jobTitle,
      jobDescription,
      salary,
      numberOfOpenings,
      location,
      skillsRequired,
      qualifications,
      jobType,
      agePreferences,
      applicationDeadline,
      contactDetails,
      benefits
    } = req.body;

    // Create a new job instance
    const newJob = new Government({
      jobId,
      companyName,
      jobTitle,
      jobDescription,
      salary,
      numberOfOpenings,
      location,
      skillsRequired,
      qualifications,
      jobType,
      agePreferences,
      applicationDeadline,
      contactDetails,
      benefits
    });

    // Save the job posting to the database
    const savedJob = await newJob.save();

    res.status(201).json({
      message: 'Job posting created successfully!',
      job: savedJob
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to create job posting.',
      error: error.message
    });
  }
};


export const getAllJobPostings = async (req, res) => {
  const userId = req.query.userId;

  try {
    // Find all jobs the current user has applied for
    const appliedJobIds = await GovernmentApplication.find({ studentId: userId }).distinct('internshipId');

    // Fetch jobs that are not applied by the current user
    const jobs = await Government.find({ _id: { $nin: appliedJobIds } });

    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch job postings.',
      error: error.message
    });
  }
};

  

export const getJobPostingById = async (req, res) => {
    try {
      const jobId = req.params.id;
      console.log(req.params)

      // Find the job posting by jobId
      const job = await Government.findOne({ _id : jobId });
  
      if (!job) {
        return res.status(404).json({
          message: 'Job posting not found.'
        });
      }
  
      res.status(200).json(job);
    } catch (error) {
      res.status(500).json({
        message: 'Failed to fetch job posting.',
        error: error.message
      });
    }
  };
  
  export const createGovtApplicationController = async (req, res) => {
    const { internshipId, studentId, companyId } = req.body;
  
    try {
      // Check if an application already exists
      const existingApplication = await GovernmentApplication.findOne({
        internshipId: new ObjectId(internshipId),
        studentId: new ObjectId(studentId)
      });
  
      if (existingApplication) {
        return res.status(400).json({ message: "You have already applied for this internship" });
      }
  
      const newApplication = new GovernmentApplication({
        internshipId: new ObjectId(internshipId),
        studentId: new ObjectId(studentId),
        companyId: new ObjectId(companyId),
      });
  
      await newApplication.save();
      res.status(201).json({ message: "Application submitted successfully" });
    } catch (error) {
      res.status(500).json({ message: `Error: ${error.message}` });
    }
  };
  
  export const getGovtStudentApplicationsController = async (req, res) => {
    const { studentId } = req.params;
    // console.log(studentId);
    try {
      const applications = await GovernmentApplication.find({
        $or: [
          { studentId: studentId },
          { studentId: new ObjectId(studentId) }
        ]
      }).lean(); // Using lean() for better performance
  
      // Fetch internship details for each application
      const appliedInternshipsWithDetails = await Promise.all(applications.map(async (application) => {
        const internship = await Government.findById(application.internshipId).lean();
        return {
          ...internship,
          applicationStatus: application.status,
          appliedAt: application.appliedAt
        };
      }));
  
    //   console.log(appliedInternshipsWithDetails);
      res.status(200).json(appliedInternshipsWithDetails);
    } catch (error) {
      console.log(error.message);
      res.status(500).send(`Error: ${error.message}`);
    }
  };