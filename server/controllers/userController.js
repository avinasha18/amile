import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  createUser,
  findUserByUsername,
  Student,
  Mentor,
  Company,
  updateUser,
  addUserVerificationToken,
  findByToken,
  updateAccountStatus,
  removeUserVerificationToken,
} from "../models/auth.model.js";
import { handleReferral } from "./referalController.js";
import { generateUniqueToken } from "../services/uniqueTokenGeneration.js";
import { HtmlTemplates } from "../services/htmlTemplates.js";
import { sendEmail } from "../services/mailServices.js";
const JWT_SECRET = "amile";

export const registerStudent = async (req, res) => {
    const { username, password, email, ...otherDetails } = req.body;
    const { refrelid } = req.query;
  
    try {
      const existingUser = await findUserByUsername(username, Student);
      if (existingUser) {
        return res.json({ success:false, message: 'User already exists' });
      }
  
      await createUser({ username, password, email, ...otherDetails });
  
      const verificationResult = await AccountVerification(username, email);
      if (verificationResult.status === 'error') {
        return res.json({ success:false, message: 'Verification email failed to send' });
      }
  
      const referralResult = await handleReferral(refrelid, username);
      if (referralResult.status === 'error') {
        return res.json({ success:false, message: referralResult.message });
      }
  
      res.json({ success:true, message: 'Student registered successfully' });
    } catch (error) {
      console.log(error);
      res.json({ success:false, message: 'Server error' });
    }
  };

  export const AccountVerification = async (username, email) => {
    try {
      const token = generateUniqueToken();
  
      await addUserVerificationToken(username, token);
  
      const html = HtmlTemplates.AccountVerification(token);
      const subject = 'AMILE ACCOUNT VERIFICATION';
      const emailResult = await sendEmail(email, subject, html);
  
      if (emailResult === 'Error sending email') {
        return { status: 'error', message: 'Failed to send verification email' };
      }
  
      return { status: 'success', message: 'Verification email sent' };
    } catch (error) {
      console.log(error);
      return { status: 'error', message: error.message };
    }
  };

  export const VerifyUserAccountwithToken = async (req, res) => {
    const { token } = req.query;
  
    try {
      // Find the user associated with the provided token
      const user = await findByToken(token);
  
      if (user) {
        const updateResult = await updateAccountStatus(user.username);
  
        if (updateResult.success) {
          await removeUserVerificationToken(user.username);
  
          return res.json({ success: true, message: "Account verified successfully" });
        } else {
          return res.json({ success: false, message: updateResult.message });
        }
      } else {
        return res.json({ success: false, message: "Invalid or expired token" });
      }
    } catch (error) {
      console.error("Error during account verification:", error);
      return res.json({ success: false, message: "An error occurred during account verification" });
    }
  }
  
export const loginUser = async (req, res) => {
    const { username, password, userType } = req.body;
    try {
      const collection =
        userType === "student"
          ? Student
          : userType === "mentor"
          ? Mentor
          : Company;
  
      const user = await findUserByUsername(username, collection);
      if (!user) return res.json({ success: false, message: "Invalid username" });
  
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (isPasswordMatch) {

          if(user?.status !== "active"){
            return res.json({ success: false, message: "verify your account" });
          }


        const token = jwt.sign({ username, userType }, JWT_SECRET, {
          expiresIn: "1d",
        });
        res.json({ success: true, token, user: user.username });
      } else {
        return res.json({ success: false, message: "Invalid password" });
      }
    } catch (e) {
      res.status(500).send("Server error", e);
    }
  };
  

export const updateStudent = async (req, res) => {
  const { username, ...otherDetails } = req.body;
  try {
    const existingUser = await findUserByUsername(username, Student);
    if (!existingUser) {
      return res.status(400).send("User not found");
    }

    await updateUser({ username, ...otherDetails });

    res.status(200).send("Student registered successfully");
  } catch (e) {
    res.status(500).send("Server error");
  }
};

