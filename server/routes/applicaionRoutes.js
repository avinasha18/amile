import express from 'express';
import {
  createApplicationController,
  getStudentApplicationsController,
  getCompanyApplicantsController,
  updateApplicationStatusController,
  
} from '../controllers/applicationController.js';
import {getUserSkills} from '../controllers/userController.js'
import { createJobPosting, getAllJobPostings, getJobPostingById, createGovtApplicationController, getGovtStudentApplicationsController } from '../controllers/governmentController.js';
const router = express.Router();

// Route to apply for an internship
router.post('/applications', createApplicationController);
router.get('/government/:id', getJobPostingById);
router.post('/government', createJobPosting);
router.get('/government', getAllJobPostings);
router.post('/government/apply', createGovtApplicationController);
router.get('/government/applications/:id', getGovtStudentApplicationsController);
router.get('/getSkills/:id',getUserSkills)
// Route to get applications for a student
router.get('/applications/student/:studentId', getStudentApplicationsController);

// Route to get applicants for a company
router.get('/applications/company/:companyId', getCompanyApplicantsController);

// Route to update application status
router.put('/applications/:applicationId/status', updateApplicationStatusController);

export default router;
