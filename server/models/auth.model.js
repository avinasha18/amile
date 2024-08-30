import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { stringify } from "uuid";
// Define the schema for a student
const studentSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  status: { type: String, required: true, default: "inactive" },
  education: [{ degree:{type:String},school:{type:String},year:{type:String}}],
  workExperience: [{position:{type:String},company:{type:String},duration:{type:String}}],
  projects: [{ title:{type:String},description:{type:String},link:{type:String}}],
  skills: [String],
  achievements: [String],
  certifications:  [{ title:{type:String},description:{type:String},link:{type:String}}],
  github: String,
  linkedin: String,
  portfolio: String,
  myPortfolioPlugin: { type: String },
});

// Define the schema for a mentor
const mentorSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  qualifications: String,
  certifications: String,
  workExperience: String,
  github: String,
  linkedin: String,
  portfolio: String,
});



// Define the schema for a Account Verifying

const accountSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  token: { type: String, required: true },
  timeStamp: { type: Date, required: true, default: Date.now },
});


// Create models for each schema
export const Student = mongoose.model("Student", studentSchema);
export const Mentor = mongoose.model("Mentor", mentorSchema);

export const AccountVerification = mongoose.model(
  "AccountVerification",
  accountSchema
);

// Function to create a new student

export const createUser = async (userData) => {
  const {
    username,
    password,
    email,
    name,
    education,
    workExperience,
    projects,
    skills,
    achievements,
    certifications,
    github,
    linkedin,
    portfolio,
  } = userData;

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new Student({
    username,
    name,
    email,
    password: hashedPassword,
    education,
    workExperience,
    projects,
    skills,
    achievements,
    certifications,
    github,
    linkedin,
    portfolio,
  });

  await newUser.save();

};

//Function to update new student

export const updateUser = async (userData) => {
  const {
    username,
    name,
    education,
    workExperience,
    projects,
    skills,
    achievements,
    certifications,
    github,
    linkedin,
    portfolio,
  } = userData;

  const updateData = {};

  if (name) updateData.name = name;
  if (education) updateData.education = education;
  if (workExperience) updateData.workExperience = workExperience;
  if (projects) updateData.projects = projects;
  if (skills) updateData.skills = skills;
  if (achievements) updateData.achievements = achievements;
  if (certifications) updateData.certifications = certifications;
  if (github) updateData.github = github;
  if (linkedin) updateData.linkedin = linkedin;
  if (portfolio) updateData.portfolio = portfolio;

  const updatedUser = await Student.findOneAndUpdate(
    { username },
    { $set: updateData },
    { new: true, runValidators: true }
  );

  return updatedUser;
};



// Function to find a user by username in a specific collection
export const findUserByUsername = async (username, model) => {
  return await model.findOne({ username });
};


export const addUserVerificationToken = async (username, token) => {
    try {
        const accountVerify = new AccountVerification({
            username,
            token
        });
        await accountVerify.save(); 
        return { success: true }; 
    } catch (error) {
        console.error('Error adding verification token:', error);
        return { success: false, error: 'Failed to add verification token.' };
    }
};

// Function to find a user by token
export const findByToken = async (token) => {
    try {
        const result = await AccountVerification.findOne({ token }).exec(); 
        return result;
    } catch (error) {
        console.error('Error finding by token:', error);
        return null;
    }
};

// 
export const findTokenByUsername = async (username) => {
  try {
      const result = await AccountVerification.findOne({ username}).exec(); 
      return result;
  } catch (error) {
      console.error('Error finding by token:', error);
      return null;
  }
};

export const updateAccountStatus = async (username) => {
  try {
    const result = await Student.findOneAndUpdate(
      { username }, 
      { $set: { status: 'active' } },
      { new: true } 
    );

    if (!result) {
      return { success: false, message: "User not found" };
    }

    return { success: true, message: "Account status updated to active", user: result };

  } catch (error) {
    console.error("Error updating account status:", error);
    return { success: false, message: "An error occurred while updating account status" };
  }
};

// Function to remove a user verification token
export const removeUserVerificationToken = async (username) => {
    try {
        const result = await AccountVerification.deleteOne({ username }).exec(); 
        return result;
    } catch (error) {
        console.error('Error removing verification token:', error);
        return null;
    }
};
export const removeUserVerificationTokenbyToken = async (token) => {
  try {
      const result = await AccountVerification.deleteOne({ token }).exec(); 
      return result;
  } catch (error) {
      console.error('Error removing verification token:', error);
      return null;
  }
};