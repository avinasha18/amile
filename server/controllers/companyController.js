import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { generateUniqueToken } from '../services/uniqueTokenGeneration.js';
import { sendEmail } from '../services/mailServices.js';
import { HtmlTemplates } from '../services/htmlTemplates.js';
import Company from '../models/company.model.js';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Create JWT token
const createToken = (company) => {
  return jwt.sign({ id: company._id }, JWT_SECRET, { expiresIn: '7d' });
};

// Sign up a new company
export const signupCompany = async (req, res) => {
  try {
    console.log('Company registration request:', req.body);
    
    // Check if company already exists
    const existingCompany = await Company.findOne({ 
      $or: [
        { email: req.body.email },
        { crnNumber: req.body.crnNumber }
      ]
    });
    
    if (existingCompany) {
      if (existingCompany.email === req.body.email) {
        return res.status(400).json({ 
          success: false, 
          message: 'Company with this email already exists' 
        });
      }
      if (existingCompany.crnNumber === req.body.crnNumber) {
        return res.status(400).json({ 
          success: false, 
          message: 'Company with this CRN number already exists' 
        });
      }
    }

    // Generate verification token
    const verificationToken = generateUniqueToken();
    
    const companyData = {
      ...req.body,
      // Ensure that nested objects are correctly assigned
      address: {
        street: req.body.address.street,
        city: req.body.address.city,
        state: req.body.address.state,
        zip: req.body.address.zip,
        country: req.body.address.country
      },
      contactPerson: req.body.contactPerson,
      branches: req.body.branches || [],
      verificationToken: verificationToken,
      status: 'pending'
    };

    // Create and save company
    const company = new Company(companyData);
    await company.save();
    
    console.log('Company saved successfully:', company._id);

    // Send verification email
    try {
      const subject = "Verify Your Company Account - AMILE";
      const emailSent = await sendEmail(
        company.email, 
        subject, 
        HtmlTemplates.CompanyAccountVerification(verificationToken)
      );
      
      console.log('Verification email sent:', emailSent);
      
      res.status(201).json({ 
        success: true, 
        message: 'Company registered successfully. Please check your email to verify your account.',
        companyId: company._id
      });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Still return success but mention email issue
      res.status(201).json({ 
        success: true, 
        message: 'Company registered successfully, but verification email could not be sent. Please contact support.',
        companyId: company._id
      });
    }
  } catch (error) {
    console.error('Company registration error:', error);
    
    // Handle specific MongoDB errors
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({ 
        success: false, 
        message: `Company with this ${field} already exists` 
      });
    }
    
    res.status(400).json({ 
      success: false, 
      message: error.message || 'Failed to register company' 
    });
  }
};

// Verify email
export const verifyEmail = async (req, res) => {
  const { token } = req.query;
  try {
    console.log('Email verification request for token:', token);
    
    if (!token) {
      return res.status(400).json({ 
        success: false, 
        message: 'Verification token is required' 
      });
    }

    const company = await Company.findOne({ verificationToken: token });
    if (!company) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid or expired verification token' 
      });
    }

    if (company.status === 'active') {
      return res.status(200).json({ 
        success: true, 
        message: 'Email already verified' 
      });
    }

    company.status = 'active';
    company.verificationToken = undefined;
    await company.save();
    
    console.log('Company email verified successfully:', company._id);
    
    res.status(200).json({ 
      success: true, 
      message: 'Email verified successfully. You can now login to your account.',
      companyId: company._id
    });
  } catch (error) {
    console.error('Email verification error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error during verification' 
    });
  }
};

// Login an existing company
export const loginCompany = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log('Company login attempt for email:', email);
    
    const company = await Company.findOne({ email });
    if (!company) {
      return res.status(401).json({ 
        success: false, 
        message: 'Company not found with this email' 
      });
    }

    const isPasswordValid = await company.isPasswordValid(password);
    if (!isPasswordValid) {
      return res.status(401).json({ 
        success: false, 
        message: 'Incorrect password' 
      });
    }

    if (company.status !== 'active') {
      return res.status(403).json({ 
        success: false, 
        message: 'Account is not verified. Please check your email and verify your account.',
        needsVerification: true
      });
    }

    const token = createToken(company);
    
    // Remove sensitive data from response
    const companyResponse = {
      _id: company._id,
      companyName: company.companyName,
      email: company.email,
      status: company.status,
      dateOfRegistration: company.dateOfRegistration
    };
    
    console.log('Company login successful:', company._id);
    
    res.status(200).json({ 
      success: true, 
      message: 'Login successful',
      token, 
      company: companyResponse 
    });
  } catch (error) {
    console.error('Company login error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error during login' 
    });
  }
};

// Resend verification email
export const resendVerification = async (req, res) => {
  const { email } = req.body;
  try {
    const verificationToken = generateUniqueToken();
    const company = await Company.findOne({ email });
    if (!company) {
      return res.json({ success: false, message: 'Company not found' });
    }
    if (company.status === 'active') {
      return res.json({ success: false, message: 'Company Account is already Active' });
    }

    company.verificationToken = verificationToken;
    await company.save();

    const subject = "Verify Your Company Account";

    await sendEmail(company.email, subject, HtmlTemplates.CompanyAccountVerification(verificationToken));
    res.status(201).json({ success: true, message: 'Verification email sent. Please check your email.' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Forgot password
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const company = await Company.findOne({ email });
    if (!company) {
      return res.json({ success: false, message: 'Company not found' });
    }

    const resetToken = generateUniqueToken();
    company.resetPasswordToken = resetToken;
    company.resetPasswordExpires = Date.now() + 900000; // 15 minutes

    await company.save();

    const subject = "AMILE Account Password Reset";
    await sendEmail(company.email, subject, HtmlTemplates.CompanyResetPasswordLink(resetToken));

    res.status(200).json({ success: true, message: 'Password reset link has been sent to your email.' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Reset password
export const resetPassword = async (req, res) => {
  const { token } = req.query;
  const { password: newPassword, email } = req.body;
  try {
    const company = await Company.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
      email
    });

    if (!company) {
      return res.json({ success: false, message: 'Invalid or expired token' });
    }

    company.password = newPassword;
    company.resetPasswordToken = undefined;
    company.resetPasswordExpires = undefined;

    await company.save();
    res.status(200).json({ success: true, message: 'Password has been reset successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Find companies by name
export const findCompaniesByName = async (req, res) => {
  const { name } = req.query;
  try {
    const companies = await Company.find({ companyName: new RegExp(name, 'i') });
    res.status(200).json({ success: true, data: companies });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Update company details
export const updateCompanyDetails = async (req, res) => {
  const { companyId } = req.body; // Ensure `companyId` is sent in the request body

  try {
    const updatedCompany = await Company.findByIdAndUpdate(companyId, req.body, { new: true });
    if (!updatedCompany) {
      return res.status(404).json({ success: false, message: 'Company not found' });
    }
    res.status(200).json({ success: true, data: updatedCompany });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get the authenticated company details
export const getCompanyDetails = async (req, res) => {
  const { companyId } = req.params; 
  // Ensure `companyId` is sent in the request body
  console.log(companyId)
  try {
    const company = await Company.findById(companyId);
    console.log(company)
    if (!company) {
      return res.status(404).json({ success: false, message: 'Company not found' });
    }
    res.status(200).json({ success: true, data: company });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Add a new branch
export const addBranch = async (req, res) => {
  const { companyId, branch } = req.body; // Ensure `companyId` and `branch` are sent in the request body

  try {
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({ success: false, message: 'Company not found' });
    }

    company.branches.push(branch);
    await company.save();

    res.status(200).json({ success: true, data: company });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
