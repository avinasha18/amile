import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  AccountVerification,
  VerifyUserAccountwithToken,
} from "./userController.js";
import {
  findUserByUsername,
  Mentor,
  addUserVerificationToken,
  findTokenByUsername,
  removeUserVerificationToken,
    Student,
} from "../models/auth.model.js";
import {
  findByToken,
  updateAccountStatus,
  removeUserVerificationTokenbyToken,
} from "../models/auth.model.js";
import { generateUniqueToken } from "../services/uniqueTokenGeneration.js";
import Company from "../models/company.model.js";
import { HtmlTemplates } from "../services/htmlTemplates.js";
import { sendEmail } from "../services/mailServices.js";
const JWT_SECRET = process.env.JWT_SECRET;

export const updateUserMentor = async (userData) => {
  const {
    username,
    name,
    qualifications,
    workExperience,
    certifications,
    skills,
    title,
  } = userData;

  const updateData = {};

  if (name) updateData.name = name;
  if (workExperience) updateData.workExperience = workExperience;
  if (qualifications) updateData.qualifications = qualifications;
  if (skills) updateData.skills = skills;
  if (title) updateData.title = title;
  if (certifications) updateData.certifications = certifications;

  const updatedUser = await Mentor.findOneAndUpdate(
    { username },
    { $set: updateData },
    { new: true, runValidators: true }
  );

  return updatedUser;
};
export const createMentor = async (mentorData) => {
  const {
    email,
    username,
    password,
    name,
    qualifications,
    certifications,
    workExperience,
    github,
    linkedin,
    portfolio,
  } = mentorData;

  const hashedPassword = await bcrypt.hash(password, 10);
  const newMentor = new Mentor({
    email,
    username,
    name,
    password: hashedPassword,
    qualifications,
    certifications,
    workExperience,
    github,
    linkedin,
    portfolio,
  });

  await newMentor.save();
};

export const VerifyMentorAccountwithToken = async (req, res) => {
  const { token } = req.query;
  console.log("in mentor verificaion");
  console.log(token);

  try {
    const user = await findByToken(token);

    if (user) {
      const updateResult = await updateAccountStatus(user.username, "mentor");

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

export const registerMentor = async (req, res) => {
  const { email, username, ...otherDetails } = req.body;

  try {
    if (!email) {
      return res.status(400).send("Email is required");
    }

    const existingMentor = await Mentor.findOne({ username });
    if (existingMentor) {
      return res.status(400).send("Mentor already exists");
    }

    // Create a token and send verification email for the mentor
    const verificationResult = await AccountVerificationMentor(username, email);
    if (verificationResult.status === "error") {
      return res.json({
        success: false,
        message: "Verification email failed to send",
      });
    }

    await createMentor({ email, username, ...otherDetails });
    res
      .status(200)
      .send({ success: true, message: "Mentor registered successfully" });
  } catch (e) {
    console.log(e);
    res.status(500).send("Server error");
  }
};

// Account verification same for both Student and Mentor
export const AccountVerificationMentor = async (username, email) => {
  try {
    const token = generateUniqueToken();

    await addUserVerificationToken(username, token);

    const html = HtmlTemplates.AccountVerificationMentor(token);
    const subject = "AMILE ACCOUNT VERIFICATION - Mentor";
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
    const user = await findUserByUsername(username, Mentor);

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

// Verify user account token is also same

export const forgotPassword = async (req, res) => {
  const { username } = req.body;

    try {
        const user = await findUserByUsername(username, Mentor);
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
    return res
      .status(500)
      .json({
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

    const status = await Mentor.findOneAndUpdate(
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
    return res
      .status(500)
      .json({
        success: false,
        message: "An error occurred during the password reset process",
      });
  }
};

export const loginUser = async (req, res) => {
  const { username, password, userType } = req.body;
  try {
    const collection =
      userType === "student"
        ? Mentor
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
      // res.json({ success: true, token, user: user.username });
      res.json({ success: true, token, user: user, userId: user._id });
    } else {
      return res.json({ success: false, message: "Invalid password" });
    }
  } catch (e) {
    res.status(500).send("Server error");
  }
};

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
    return res
      .status(500)
      .json({
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

    const userdata = await findUserByUsername(username, Mentor);
    if (!userdata) {
      return res.json({ success: false, message: "User not found" });
    }

    return res.json({ success: true, data: userdata });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ success: false, message: e.message });
  }
};

export const updateMentor = async (req, res) => {
  const { username, ...otherDetails } = req.body;
  // console.log({ ...otherDetails });
  try {
    const existingUser = await findUserByUsername(username, Mentor);
    if (!existingUser) {
      return res.send({ success: false, message: "User not found" });
    }

    const updatedUser = await updateUserMentor({ username, ...otherDetails });

    res.json({
      success: true,
      message: "Mentor updated successfully",
      updatedUser,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send("Server error");
  }
};

export const assignStudents = async (req, res) => {
    const { mentorUsername, studentUsernames } = req.body;
    console.log(req.body)

    try {
        // Find the mentor by username
        const mentor = await Mentor.findOne({ username: mentorUsername });

        if (!mentor) {
            return res.status(404).json({ success: false, message: "Mentor not found" });
        }

        // Find all students by their usernames
        const students = await Student.find({ username: { $in: studentUsernames } });

        if (students.length !== studentUsernames.length) {
            return res.status(404).json({ success: false, message: "One or more students not found" });
        }

        // Filter out students already assigned to this mentor
        const newStudents = students.filter(student => !mentor.students.includes(student._id));

        if (newStudents.length === 0) {
            return res.status(200).json({ success: false, message: "All students are already assigned to this mentor" });
        }

        // Assign mentor to each new student and update the mentor's students array
        await Promise.all(newStudents.map(async (student) => {
            student.mentor = mentor._id;
            await student.save();
        }));

        mentor.students = [...mentor.students, ...newStudents.map(student => student._id)];
        await mentor.save();

        return res.status(200).json({ success: true, message: "Students successfully assigned to mentor" });
    } catch(err) {
        console.log(err);
        return res.status(500).send("Server error");
    }
}

export const getStudents = async (req, res) => {
    
    try {
        const { username } = req.body;
   

        const mentor = await Mentor.findOne({ username: username });
        if (!mentor) {
            return res.status(404).json({ success: false, message: "Mentor not found" });
        }


        if (mentor.students && mentor.students.length > 0) {
            const students = await Student.find({ _id: { $in: mentor.students } }, 'username');

            return res.status(200).json({ success: true, studentUsernames:students });
        } else {
            return res.status(200).json({ success: false, message: "No students assigned to this mentor" });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send("Server error");
    }
}


export const getMentorData = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.params)
    const mentor = await findUserByUsername(id, Mentor);
    if (!mentor) {
      return res.json({ success: false, message: "User not found" });
    }
    return res.json({ success: true, data: mentor });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ success: false, message: e.message });
  }
};
