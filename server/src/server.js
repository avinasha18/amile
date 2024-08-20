import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import { createUser, createMentor, createCompany, findUserByUsername } from '../models/auth.model.js';
import { createInternship, findInternshipById, getAllInternships, updateInternship, deleteInternship } from '../models/intern.model.js'; // Adjusted import path

const app = express();
app.use(express.json());
app.use(bodyParser.json());

const JWT_SECRET = 'amile'; 

const connectToMongoDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/amile', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
        process.exit(1);
    }
};

connectToMongoDB();

app.post('/register/student', async (req, res) => {
    const { username, password, name, education, workExperience, projects, skills, achievements, certifications, github, linkedin, portfolio } = req.body;

    try {
        const existingUser = await findUserByUsername(username, 'students');
        if (existingUser) {
            return res.status(400).send('User already exists');
        }

        await createUser(req.body);
        res.status(200).send('Student registered successfully');
    } catch (e) {
        console.error('Error:', e.message);
        res.status(500).send('Server error');
    }
});

app.post('/register/mentor', async (req, res) => {
    const { username, password, name, qualifications, certifications, workExperience, github, linkedin, portfolio } = req.body;

    try {
        const existingMentor = await findUserByUsername(username, 'mentors');
        if (existingMentor) {
            return res.status(400).send('Mentor already exists');
        }

        await createMentor(req.body);
        res.status(200).send('Mentor registered successfully');
    } catch (e) {
        console.error('Error:', e.message);
        res.status(500).send('Server error');
    }
});

app.post('/register/company', async (req, res) => {
    const { username, password, companyName, crn, linkedin, website, address, contactNumber } = req.body;

    try {
        const existingCompany = await findUserByUsername(username, 'companies');
        if (existingCompany) {
            return res.status(400).send('Company already exists');
        }

        await createCompany(req.body);
        res.status(200).send('Company registered successfully');
    } catch (e) {
        console.error('Error:', e.message);
        res.status(500).send('Server error');
    }
});

app.post('/login', async (req, res) => {
    const { username, password, userType } = req.body;

    try {
        let collection;
        if (userType === 'student') {
            collection = 'students';
        } else if (userType === 'mentor') {
            collection = 'mentors';
        } else if (userType === 'company') {
            collection = 'companies';
        } else {
            return res.status(400).send('Invalid user type');
        }

        const user = await findUserByUsername(username, collection);
        if (!user) {
            return res.status(400).send('Invalid username');
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (isPasswordMatch) {
            const payload = { username, userType };
            const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
            res.status(200).send({ token });
        } else {
            res.status(400).send('Invalid password');
        }
    } catch (e) {
        console.error('Error:', e.message);
        res.status(500).send('Server error');
    }
});

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).send('Access denied');
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).send('Invalid token');
        }
        req.user = user;
        next();
    });
};

// Get all internships with pagination and search
app.get('/internships', async (req, res) => {
    try {
        const { page = 1, limit = 10, role, skills, company, stipendMin, stipendMax, hoursMax, type, mode, location } = req.query;
        const query = {};
        if (role) query.role = new RegExp(role, 'i');
        if (skills) query.skills = { $in: skills.split(',') };
        if (company) query.companyName = new RegExp(company, 'i');
        if (stipendMin || stipendMax) query.stipend = {};
        if (stipendMin) query.stipend.$gte = stipendMin;
        if (stipendMax) query.stipend.$lte = stipendMax;
        if (hoursMax) query.hours = { $lte: hoursMax };
        if (type) query.type = type;
        if (mode) query.modeOfWork = mode;
        if (location) query.location = new RegExp(location, 'i');

        const internships = await getAllInternships(query, parseInt(page), parseInt(limit));
        res.status(200).json(internships);
    } catch (error) {
        res.status(500).send(`Error: ${error.message}`);
    }
});

// Get detailed info of one internship
app.get('/internships/:id', async (req, res) => {
    try {
        const internship = await findInternshipById(req.params.id);
        if (!internship) return res.status(404).send('Internship not found');
        res.status(200).json(internship);
    } catch (error) {
        res.status(500).send(`Error: ${error.message}`);
    }
});

// Post a new internship
app.post('/internships', async (req, res) => {
    try {
        const internshipData = req.body;
        await createInternship(internshipData);
        res.status(201).send('Internship created successfully');
    } catch (error) {
        res.status(500).send(`Error: ${error.message}`);
    }
});

// Update internship details
app.put('/internships/:id', authenticateToken, async (req, res) => {
    try {
        const updatedInternship = await updateInternship(req.params.id, req.body);
        if (!updatedInternship) return res.status(404).send('Internship not found');
        res.status(200).send('Internship updated successfully');
    } catch (error) {
        res.status(500).send(`Error: ${error.message}`);
    }
});

// Delete an internship
app.delete('/internships/:id', authenticateToken, async (req, res) => {
    try {
        const result = await deleteInternship(req.params.id);
        if (!result) return res.status(404).send('Internship not found');
        res.status(200).send('Internship deleted successfully');
    } catch (error) {
        res.status(500).send(`Error: ${error.message}`);
    }
});

// Apply to an internship
app.post('/apply/:internshipId', authenticateToken, async (req, res) => {
    try {
        const { status = 'pending' } = req.body;
        const userId = req.user.username; 
        const internshipId = req.params.internshipId;

        const result = await mongoose.connection.collection('applications').updateOne(
            { userId, internshipId },
            { $set: { status }, $setOnInsert: { createdAt: new Date() } },
            { upsert: true }
        );

        if (result.upsertedCount > 0) {
            res.status(201).send('Application submitted successfully');
        } else {
            res.status(200).send('Application updated successfully');
        }
    } catch (error) {
        res.status(500).send(`Error: ${error.message}`);
    }
});

// Get all applied internships for current user
app.get('/applications', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.username;
        const applications = await mongoose.connection.collection('applications').find({ userId }).toArray();
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).send(`Error: ${error.message}`);
    }
});

// Get notifications for current user
app.get('/notifications', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.username;
        const notifications = await mongoose.connection.collection('notifications').find({ userId }).toArray();
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).send(`Error: ${error.message}`);
    }
});

// Follow a company
app.post('/follow/company/:companyId', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.username;
        const companyId = req.params.companyId;

        const result = await mongoose.connection.collection('follows').updateOne(
            { userId, companyId },
            { $set: { type: 'company', followedAt: new Date() } },
            { upsert: true }
        );

        if (result.upsertedCount > 0) {
            res.status(201).send('Followed company successfully');
        } else {
            res.status(200).send('Unfollowed company successfully');
        }
    } catch (error) {
        res.status(500).send(`Error: ${error.message}`);
    }
});

// Follow a mentor
app.post('/follow/mentor/:mentorId', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.username;
        const mentorId = req.params.mentorId;

        const result = await mongoose.connection.collection('follows').updateOne(
            { userId, mentorId },
            { $set: { type: 'mentor', followedAt: new Date() } },
            { upsert: true }
        );

        if (result.upsertedCount > 0) {
            res.status(201).send('Followed mentor successfully');
        } else {
            res.status(200).send('Unfollowed mentor successfully');
        }
    } catch (error) {
        res.status(500).send(`Error: ${error.message}`);
    }
});

// Get followed companies
app.get('/follows/companies', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.username;
        const followedCompanies = await mongoose.connection.collection('follows').find({ userId, type: 'company' }).toArray();
        res.status(200).json(followedCompanies);
    } catch (error) {
        res.status(500).send(`Error: ${error.message}`);
    }
});

// Get followed mentors
app.get('/follows/mentors', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.username;
        const followedMentors = await mongoose.connection.collection('follows').find({ userId, type: 'mentor' }).toArray();
        res.status(200).json(followedMentors);
    } catch (error) {
        res.status(500).send(`Error: ${error.message}`);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
