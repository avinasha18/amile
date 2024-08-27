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
  findTokenByUsername,
  removeUserVerificationTokenbyToken,
} from "../models/auth.model.js";
import { handleReferral } from "./referalController.js";
import { generateUniqueToken } from "../services/uniqueTokenGeneration.js";
import { HtmlTemplates } from "../services/htmlTemplates.js";
import { sendEmail } from "../services/mailServices.js";
const JWT_SECRET = process.env.JWT_SECRET;

export const registerStudent = async (req, res) => {
  const { username, password, email, ...otherDetails } = req.body;
  const { refrelid } = req.query;

  try {
    const existingUser = await findUserByUsername(username, Student);
    if (existingUser) {
      return res.json({ success: false, message: "User already exists" });
    }

    await createUser({ username, password, email, ...otherDetails });

    const verificationResult = await AccountVerification(username, email);
    if (verificationResult.status === "error") {
      return res.json({
        success: false,
        message: "Verification email failed to send",
      });
    }

    const referralResult = await handleReferral(refrelid, username);
    if (referralResult.status === "error") {
      return res.json({ success: false, message: referralResult.message });
    }

    res.json({ success: true, message: "Student registered successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Server error" });
  }
};

export const AccountVerification = async (username, email) => {
  try {
    const token = generateUniqueToken();

    await addUserVerificationToken(username, token);

    const html = HtmlTemplates.AccountVerification(token);
    const subject = "AMILE ACCOUNT VERIFICATION";
    const emailResult = await sendEmail(email, subject, html);

    if (emailResult === "Error sending email") {
      return { status: "error", message: "Failed to send verification email" };
    }

    return { status: "success", message: "Verification email sent" };
  } catch (error) {
    console.log(error);
    return { status: "error", message: error.message };
  }
};

export const resendVerification = async (req, res) => {
  const { username } = req.body;

  try {
    const user = await findUserByUsername(username, Student);

    if (user && user?.status !== "active") {
      const existingToken = await findTokenByUsername(username);

      let token;
      if (existingToken) {
        token = existingToken;
      } else {
        token = generateUniqueToken();
        await addUserVerificationToken(username, token);
      }

      const html = HtmlTemplates.AccountVerification(token);
      const subject = "AMILE ACCOUNT VERIFICATION";
      const emailResult = await sendEmail(user.email, subject, html);

      if (emailResult === "Error sending email") {
        return res.json({
          success: false,
          message: "Failed to send verification email",
        });
      }

      return res.json({ success: true, message: "Verification email sent" });
    } else {
      return res.json({
        success: false,
        message: "User not found or account is already active",
      });
    }
  } catch (error) {
    console.error("Error resending verification email:", error);
    return res.json({
      success: false,
      message: "An error occurred while resending the verification email",
    });
  }
};

export const VerifyUserAccountwithToken = async (req, res) => {
  const { token } = req.query;

  try {
    const user = await findByToken(token);

    if (user) {
      const updateResult = await updateAccountStatus(user.username);

      if (updateResult.success) {
        await removeUserVerificationToken(user.username);

        return res.json({
          success: true,
          message: "Account verified successfully",
        });
      } else {
        return res.json({ success: false, message: updateResult.message });
      }
    } else {
      return res.json({ success: false, message: "Invalid or expired token" });
    }
  } catch (error) {
    console.error("Error during account verification:", error);
    return res.json({
      success: false,
      message: "An error occurred during account verification",
    });
  }
};



export const forgotPassword = async (req, res) => {
  const { username, accountType } = req.body;

  try {
    const Schema = accountType === "student" ? Student : Mentor;
    const user = await findUserByUsername(username, Schema);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    let token = await findTokenByUsername(username);
    if (!token) {
      token = generateUniqueToken();
      await addUserVerificationToken(username, token);
    }

    const userEmail = user.email;
    const subject = "AMILE Account Password Reset";
    const htmlContent = HtmlTemplates.ResetPasswordLink(token);

    const emailResponse = await sendEmail(userEmail, subject, htmlContent);

    if (emailResponse === "Error sending email") {
      return res.json({ success: false, message: "Failed to send password reset email" });
    }

    return res.json({ success: true, message: "Password reset email sent" });

  } catch (error) {
    console.error("Error in forgotPassword:", error);
    return res.status(500).json({ success: false, message: "An error occurred during the password reset process" });
  }
};


export const resetPassword = async (req, res) => {
  const { email, password, token } = req.body;

  try {
    const tokenData = await findByToken(token);

    if (!tokenData) {
      return res.json({ success: false, message: "Invalid token or email" });
    }

    const tokenCreationTime = new Date(tokenData.timeStamp);
    const currentTime = new Date();
    const timeDifference = (currentTime - tokenCreationTime) / (1000 * 60);

    if (timeDifference > 15) {
      await removeUserVerificationToken(tokenData.username); 
      return res.json({ success: false, message: "Token has expired" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const status = await Student.findOneAndUpdate(
      { username: tokenData.username, email: email },
      { $set: { password: hashedPassword } },
      { new: true } 
    );

    if (!status) {
      return res.json({ success: false, message: "Failed to update password" });
    }

    await removeUserVerificationToken(tokenData.username);

    return res.json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    console.error("Error during password reset:", error);
    return res.status(500).json({ success: false, message: "An error occurred during the password reset process" });
  }
};


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
      if (user?.status !== "active") {
        return res.json({ success: false, message: "verify your account" });
      }

      const token = jwt.sign({ username, userType }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.json({ success: true, token, user: user.username });
    } else {
      return res.json({ success: false, message: "Invalid password" });
    }
  } catch (e) {
    res.status(500).send("Server error", e);
  }
};
export const reportIncident = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.json({ success: false, message: 'Token is required' });
  }

  try {
    const result = await removeUserVerificationTokenbyToken(token);
    if (result.deletedCount) {
      return res.json({ success: true, message: 'Incident reported successfully' });
    } else {
      return res.json({ success: false, message: 'Incident Already Reported' });
    }
  } catch (error) {
    console.error('Error reporting incident:', error);
    return res.status(500).json({ success: false, message: 'An error occurred while reporting the incident' });
  }
};



export const getUser = async (req, res) => {
  try {
    const { username } = req.body;

    if (!username) {
      return res.json({ success: false, message: "Username is required" });
    }

    const userdata = await findUserByUsername(username, Student);

    if (!userdata) {
      return res.json({ success: false, message: "User not found" });
    }

    return res.json({ success: true, data: userdata });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ success: false, message: e.message });
  }
};

export const updateStudent = async (req, res) => {
  const { username, ...otherDetails } = req.body;
  console.log(req.body);
  try {
    const existingUser = await findUserByUsername(username, Student);
    if (!existingUser) {
      return res.send({ success: false, message: "User not found" });
    }

    const updatedUser = await updateUser({ username, ...otherDetails });

    res.json({
      success: true,
      message: "Student updated successfully",
      updatedUser,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send("Server error");
  }
};
