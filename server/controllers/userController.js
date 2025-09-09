import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  createUser,
  findUserByUsername,
  Student,
  Mentor,
  updateUser,
  addUserVerificationToken,
  findByToken,
  updateAccountStatus,
  removeUserVerificationToken,
  findTokenByUsername,
  removeUserVerificationTokenbyToken,
} from "../models/auth.model.js";
import {CourseProgress} from '../models/track.model.js'
import { handleReferral } from "./referalController.js";
import { generateUniqueToken } from "../services/uniqueTokenGeneration.js";
import { HtmlTemplates } from "../services/htmlTemplates.js";
import { sendEmail } from "../services/mailServices.js";
import {
  deleteFileById,
  getFileInfoById,
  getFileStreamById,
} from "../services/fileManagement.js";
import { 
  handleMongoError, 
  createErrorResponse, 
  createSuccessResponse,
  handleAsyncError 
} from "../utils/errorHandler.js";
import { 
  validateRegistrationData, 
  validateLoginData, 
  sanitizeInput 
} from "../utils/validation.js";
const JWT_SECRET = process.env.JWT_SECRET;

export const registerStudent = handleAsyncError(async (req, res) => {
  const { username, password, email, ...otherDetails } = req.body;
  const { refrelid } = req.query;

  // Validate input data
  const validation = validateRegistrationData({ username, password, email, ...otherDetails });
  if (!validation.isValid) {
    return res.status(400).json(createErrorResponse(validation.errors.join(', ')));
  }

  // Sanitize inputs
  const sanitizedData = {
    username: sanitizeInput(username),
    email: sanitizeInput(email),
    name: sanitizeInput(otherDetails.name),
    ...otherDetails
  };

  try {
    // Check for existing username
    const existingUserByUsername = await findUserByUsername(sanitizedData.username, Student);
    if (existingUserByUsername) {
      return res.status(409).json(createErrorResponse(
        `Username '${sanitizedData.username}' is already taken. Please choose a different username.`
      ));
    }

    // Check for existing email
    const existingUserByEmail = await Student.findOne({ email: sanitizedData.email });
    if (existingUserByEmail) {
      return res.status(409).json(createErrorResponse(
        `Email '${sanitizedData.email}' is already registered. Please use a different email or try logging in.`
      ));
    }

    // Create user
    await createUser({ 
      username: sanitizedData.username, 
      password, 
      email: sanitizedData.email, 
      ...sanitizedData 
    });

    // Send verification email
    const verificationResult = await AccountVerification(sanitizedData.username, sanitizedData.email);
    if (verificationResult.status === "error") {
      return res.status(500).json(createErrorResponse(
        "Account created but verification email failed to send. Please try resending verification."
      ));
    }

    // Handle referral
    const referralResult = await handleReferral(refrelid, sanitizedData.username);
    if (referralResult.status === "error") {
      console.warn('Referral handling failed:', referralResult.message);
      // Don't fail registration for referral issues
    }

    res.status(201).json(createSuccessResponse(
      "Student registered successfully! Please check your email to verify your account.",
      { email: sanitizedData.email }
    ));
  } catch (error) {
    console.error('Registration error:', error);
    
    if (error.code === 11000) {
      const handled = handleMongoError(error);
      return res.status(handled.statusCode).json(createErrorResponse(handled.message));
    }
    
    res.status(500).json(createErrorResponse(
      "Registration failed due to a server error. Please try again later."
    ));
  }
});

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

export const getUserSkills = async (req, res) => {
  console.log("in get skills");
  const { id } = req.params;
  console.log(req.params, "params");
  try {
    const data = await Student.findOne({ _id: id });
    console.log(data);
    res.status(200).json({ skills: data.skills });
  } catch (e) {
    console.log(e.message);
    res.status(200).json({ message: "server error" });
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
  const { token, ismentor } = req.query;

  try {
    const user = await findByToken(token);

    if (user) {
      var updateResult;
      if (ismentor) {
        updateResult = await updateAccountStatus(user.username, "mentor");
      } else {
        updateResult = await updateAccountStatus(user.username);
      }

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
      return res.json({
        success: false,
        message: "Failed to send password reset email",
      });
    }

    return res.json({ success: true, message: "Password reset email sent" });
  } catch (error) {
    console.error("Error in forgotPassword:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred during the password reset process",
    });
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
    return res.status(500).json({
      success: false,
      message: "An error occurred during the password reset process",
    });
  }
};

export const loginUser = handleAsyncError(async (req, res) => {
  const { username, password, userType } = req.body;

  // Validate input data
  const validation = validateLoginData({ username, password, userType });
  if (!validation.isValid) {
    return res.status(400).json(createErrorResponse(validation.errors.join(', ')));
  }

  // Sanitize inputs
  const sanitizedUsername = sanitizeInput(username);

  try {
    const collection =
      userType === "student"
        ? Student
        : userType === "mentor"
        ? Mentor
        : Company;

    const user = await findUserByUsername(sanitizedUsername, collection);
    if (!user) {
      return res.status(401).json(createErrorResponse(
        "Invalid username or password. Please check your credentials and try again."
      ));
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json(createErrorResponse(
        "Invalid username or password. Please check your credentials and try again."
      ));
    }

    if (user?.status !== "active") {
      return res.status(403).json(createErrorResponse(
        "Your account is not verified. Please check your email and click the verification link to activate your account."
      ));
    }

    const token = jwt.sign({ username: sanitizedUsername, userType }, JWT_SECRET, {
      expiresIn: "7d",
    });

    // Remove sensitive data from response
    const userResponse = {
      _id: user._id,
      username: user.username,
      name: user.name,
      email: user.email,
      status: user.status,
      profilePictureUrl: user.profilePictureUrl,
      skills: user.skills || [],
      education: user.education || [],
      workExperience: user.workExperience || [],
      projects: user.projects || [],
      achievements: user.achievements || [],
      certifications: user.certifications || [],
      github: user.github,
      linkedin: user.linkedin,
      portfolio: user.portfolio
    };

    res.json(createSuccessResponse("Login successful", {
      token,
      user: userResponse,
      userId: user._id
    }));

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json(createErrorResponse(
      "Login failed due to a server error. Please try again later."
    ));
  }
});

export const reportIncident = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.json({ success: false, message: "Token is required" });
  }

  try {
    const result = await removeUserVerificationTokenbyToken(token);
    if (result.deletedCount) {
      return res.json({
        success: true,
        message: "Incident reported successfully",
      });
    } else {
      return res.json({ success: false, message: "Incident Already Reported" });
    }
  } catch (error) {
    console.error("Error reporting incident:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while reporting the incident",
    });
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
export const getProfile = async (req, res) => {
  try {
    const { filename } = req.params;
    // Fetch file information
    const fileInfo = await getFileInfoById(filename);

    if (!fileInfo) {
      return res
        .status(404)
        .json({ success: false, message: "File not found" });
    }

    // Get file stream
    const stream = await getFileStreamById(filename);

    if (!stream) {
      return res
        .status(404)
        .json({ success: false, message: "File stream not found" });
    }

    // Set the appropriate headers based on file information
    res.setHeader("Content-Type", fileInfo.contentType); // Set the correct MIME type for the file
    res.setHeader(
      "Content-Disposition",
      `inline; filename="${fileInfo.filename}"`
    ); // Inline display or attachment

    // Pipe the file stream to the response
    stream.pipe(res);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ success: false, message: e.message });
  }
};

export const updateStudent = async (req, res) => {
  const { username, ...otherDetails } = req.body;
  console.log("in upate user");
  console.log(username, otherDetails);
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
    console.log(e.message);
    res.status(500).send("Server error");
  }
};

export const AssignMentor = async (req, res) => {
  const { studentId, mentorId } = req.body;

  try {
    // Update the student with the assigned mentor
    const student = await Student.findByIdAndUpdate(
      studentId,
      {
        mentor: mentorId,
        neededMentor: false,
      },
      { new: true }
    );

    if (!student) {
      return res.status(404).send("Student not found");
    }

    const mentor = await Mentor.findByIdAndUpdate(
      mentorId,
      {
        $addToSet: { students: studentId }, // Use $addToSet to avoid duplicate student IDs
      },
      { new: true }
    );

    if (!mentor) {
      return res.status(404).send("Mentor not found");
    }

    res
      .status(200)
      .json({ message: "Mentor assigned successfully", student, mentor });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
};

// Fetch student by ID
export const checkStudentMentorStatus = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate("mentor");
    if (!student) {
      return res.status(404).send("Student not found");
    }

    res.status(200).json(student);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
};

export const uploadStudentProfile = async (req, res) => {
  try {
    const { username } = req.body;
    if (!req.file) {
      return res.json({ message: "No file uploaded" });
    }

    const student = await Student.findOne({ username });

    if (!student) {
      return res.json({ message: "Student not found" });
    }

    if (student.profilePictureUrl) {
      try {
        const file = await getFileInfoById(student.profilePictureUrl);
        await deleteFileById(file?._id);
      } catch (err) {
        console.error("Error removing existing profile picture:", err);
      }
    }

    try {
      const updatedStudent = await Student.findOneAndUpdate(
        { username },
        { $set: { profilePictureUrl: req.file.filename } },
        { new: true }
      );

      return res.json({
        success: true,
        message: "Profile updated successfully",
        student: updatedStudent,
      });
    } catch (updateErr) {
      return res.json({
        message: "Failed to update profile",
        error: updateErr.message,
      });
    }
  } catch (setupErr) {
    console.log(setupErr);
    return res.json({
      message: "Error setting up file upload",
      error: setupErr.message,
    });
  }
};

export const getInterests = async (req, res) => {
  try {
    const { studentId } = req.query;
    // Check if studentId is present before using it
    if (!studentId) {
      return res.status(400).json({ message: 'studentId is required' });
    }

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).send('Student not found');
    }
    res.status(200).json(student.selectedInterests);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
}

export const getStudentProgress = async (req, res) => {
  const { studentId } = req.params;
console.log('in ps ')
  try {

    // Correctly populating the `courseId` within the courses array
    const studentProgress = await CourseProgress.findOne({ studentId }).populate('courses.courseId');
    
    if (!studentProgress) {
      return res.json({ message: 'Student progress not found' });
    }

    // Mapping the courses to extract the course name and total progress
    const progressData = studentProgress.courses.map(course => ({
      courseName: course.courseId.courseName, // Assuming courseId is populated correctly with the course schema
      totalProgress: course.totalProgress,
    }));

    res.json(progressData);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Server error', error });
  }
};
