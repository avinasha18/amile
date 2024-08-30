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
} from '../controllers/companyController.js';
import { authenticateToken } from '../middleware/companyAuthMiddleware.js';

const router = express.Router();

// Signup route
router.post('/signup', signupCompany);

router.get('/verify-email', verifyEmail);

// Login route
router.post('/login', loginCompany);

// Forgot Password route
router.post('/forgot-password', forgotPassword);

// Reset Password route
router.post('/reset-password', resetPassword);

// Protected routes
router.get('/search', authenticateToken, findCompaniesByName);
router.put('/update', authenticateToken, updateCompanyDetails);
router.get('/me', authenticateToken, getCompanyDetails);

export default router;
