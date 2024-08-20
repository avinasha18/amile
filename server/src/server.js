import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import { connectToMongoDB } from './db.js';
import { createUser, createMentor, createCompany, findUserByUsername } from '../models/auth.model.js';

const app = express();
app.use(express.json());

const JWT_SECRET = 'amile'; 

let db;

(async () => {
    db = await connectToMongoDB();
})();

app.post('/register/student', async (req, res) => {
    const { username, password, name, education, workExperience, projects, skills, achievements, certifications, github, linkedin, portfolio } = req.body;

    try {
        const existingUser = await findUserByUsername(db, username, 'students');
        if (existingUser) {
            return res.status(400).send('User already exists');
        }

        await createUser(db, req.body);
        res.status(200).send('Student registered successfully');
    } catch (e) {
        console.error('Error:', e.message);
        res.status(500).send('Server error');
    }
});

app.post('/register/mentor', async (req, res) => {
    const { username, password, name, qualifications, certifications, workExperience, github, linkedin, portfolio } = req.body;

    try {
        const existingMentor = await findUserByUsername(db, username, 'mentors');
        if (existingMentor) {
            return res.status(400).send('Mentor already exists');
        }

        await createMentor(db, req.body);
        res.status(200).send('Mentor registered successfully');
    } catch (e) {
        console.error('Error:', e.message);
        res.status(500).send('Server error');
    }
});

app.post('/register/company', async (req, res) => {
    const { username, password, companyName, crn, linkedin, website, address, contactNumber } = req.body;

    try {
        const existingCompany = await findUserByUsername(db, username, 'companies');
        if (existingCompany) {
            return res.status(400).send('Company already exists');
        }

        await createCompany(db, req.body);
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

        const user = await findUserByUsername(db, username, collection);
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

//  protected route
// app.get('/protected', authenticateToken, (req, res) => {
//     res.send('This is a protected route');
// });

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
