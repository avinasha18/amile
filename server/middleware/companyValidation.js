import { validateRegistrationData } from '../utils/validation.js';

export const validateCompanyRegistration = (req, res, next) => {
  try {
    const { companyName, email, password, crnNumber, address, termsAccepted } = req.body;

    // Basic validation
    if (!companyName || !email || !password || !crnNumber || !address || !termsAccepted) {
      return res.status(400).json({
        success: false,
        message: 'All required fields must be provided'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    // Password validation
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long'
      });
    }

    // Address validation
    if (!address.street || !address.city || !address.state || !address.zip || !address.country) {
      return res.status(400).json({
        success: false,
        message: 'Complete address information is required'
      });
    }

    // Terms acceptance
    if (!termsAccepted) {
      return res.status(400).json({
        success: false,
        message: 'You must accept the terms and conditions'
      });
    }

    next();
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Invalid request data'
    });
  }
};
