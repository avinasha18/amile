import bcrypt from 'bcrypt';

export const createUser = async (db, userData) => {
    const {
        username, password, name, education, workExperience, projects,
        skills, achievements, certifications, github, linkedin, portfolio
    } = userData;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
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
    };

    await db.collection('students').insertOne(newUser);
};


export const createMentor = async (db, mentorData) => {
    const {
        username, password, name, qualifications, certifications,
        workExperience, github, linkedin, portfolio
    } = mentorData;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newMentor = {
        username,
        name,
        password: hashedPassword,
        qualifications,
        certifications,
        workExperience,
        github,
        linkedin,
        portfolio,
    };

    await db.collection('mentors').insertOne(newMentor);
};


export const createCompany = async (db, companyData) => {
    const {
        username, password, companyName, crn, linkedin, website,
        address, contactNumber
    } = companyData;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newCompany = {
        username,
        companyName,
        password: hashedPassword,
        crn,
        linkedin,
        website,
        address,
        contactNumber,
    };

    await db.collection('companies').insertOne(newCompany);
};


export const findUserByUsername = async (db, username, collection) => {
    return await db.collection(collection).findOne({ username });
};
