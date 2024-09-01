import express from 'express';
import {
  signupCompany,
  loginCompany,
  findCompaniesByName,
  updateCompanyDetails,
  getCompanyDetails,
  verifyEmail,
  forgotPassword,
  resetPassword,
  resendVerification,
} from '../controllers/companyController.js';
import { authenticateToken } from '../middleware/companyAuthMiddleware.js';
import { createInternshipController, getAllInternshipsByCompany } from '../controllers/internshipController.js';
import { getCompanyApplicantsController, updateApplicationStatusController } from '../controllers/applicationController.js';

const router = express.Router();

// Signup route
router.post('/register', signupCompany);

router.post('/verifyaccount', verifyEmail);
router.post('/resendverification', resendVerification);


// Login route
router.post('/login', loginCompany);

// Forgot Password route
router.post('/forgotpassword', forgotPassword);

// Reset Password route
router.post('/resetpassword', resetPassword);

router.post('/internships',authenticateToken, createInternshipController);
router.get('/internships',authenticateToken, getAllInternshipsByCompany);
router.get('/applications',authenticateToken, getCompanyApplicantsController);
router.post('/applications/:applicationId',authenticateToken, updateApplicationStatusController);





// Protected routes
router.get('/search', authenticateToken, findCompaniesByName);
router.put('/update', authenticateToken, updateCompanyDetails);
router.get('/me', authenticateToken, getCompanyDetails);

export default router;
