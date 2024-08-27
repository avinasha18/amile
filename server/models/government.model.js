import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  jobId: {
    type: String,
    required: true,
    unique: true
  },
  companyName: {
    type: String,
    required: true
  },
  jobTitle: {
    type: String,
    required: true
  },
  jobDescription: {
    type: String,
    required: true
  },
  salary: {
    type: String,
    required: true
  },
  numberOfOpenings: {
    type: Number,
    required: true
  },
  location: {
    type: [String], // Array to handle multiple locations
    required: true
  },
  skillsRequired: {
    type: [String], // Array to handle multiple skills
    required: true
  },
  qualifications: {
    type: String,
    required: true
  },
  jobType: {
    type: String, // Full-time, Part-time, Internship, etc.
    default: 'Full Time'
  },
  agePreferences: {
    min: Number,
    max: Number
  },
  applicationDeadline: {
    type: Date,
    required: true
  },
  contactDetails: {
    personName: String,
    mobileNumber: String,
    email: String
  },
  benefits: {
    type: String,
    default: ''
  },
  postedAt: {
    type: Date,
    default: Date.now
  }
});

const govtApplicationSchema = new mongoose.Schema({
  internshipId: { type: mongoose.Schema.Types.ObjectId, ref: 'Government', required: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  status: { type: String, default: 'pending', enum: ['pending', 'selected', 'rejected', 'next round'] },
  appliedAt: { type: Date, default: Date.now },
});

export const GovernmentApplication = mongoose.model('GovernmentApplication', govtApplicationSchema);
export const Government = mongoose.model('Government', jobSchema);
