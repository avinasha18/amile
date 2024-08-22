import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
// Define the schema for a student
const studentSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    email : { type: String, required: true, unique: true },
    education: String,
    workExperience: String,
    projects: [String],
    skills: [String],
    achievements: String,
    certifications: [String],
    github: String,
    linkedin: String,
    portfolio: String,
    myPortfolioPlugin: {type: String}
});

// Define the schema for a mentor
const mentorSchema = new mongoose.Schema({
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

// Define the schema for a company
const companySchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    companyName: { type: String, required: true },
    crn: { type: String, required: true },
    linkedin: String,
    website: String,
    address: String,
    contactNumber: String,
});

// Create models for each schema
export const Student = mongoose.model('Student', studentSchema);
export const Mentor = mongoose.model('Mentor', mentorSchema);
export const Company = mongoose.model('Company', companySchema);
// Function to create a new student

export const createUser = async (userData) => {
    const {
        username, password, name, education, workExperience, projects,
        skills, achievements, certifications, github, linkedin, portfolio
    } = userData;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Student({
        username,
        name,
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



export const createMentor = async (mentorData) => {
    const {
        username, password, name, qualifications, certifications,
        workExperience, github, linkedin, portfolio
    } = mentorData;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newMentor = new Mentor({
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

// Function to create a new company
export const createCompany = async (companyData) => {
    const {
        username, password, companyName, crn, linkedin, website,
        address, contactNumber
    } = companyData;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newCompany = new Company({
        username,
        companyName,
        password: hashedPassword,
        crn,
        linkedin,
        website,
        address,
        contactNumber,
    });

    await newCompany.save();
};

// Function to find a user by username in a specific collection
export const findUserByUsername = async (username, model) => {
    return await model.findOne({ username });
};
