import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createUser, findUserByUsername,Student,Mentor,Company } from '../models/auth.model.js';

const JWT_SECRET = 'amile';

export const registerStudent = async (req, res) => {
    const { username, password, ...otherDetails } = req.body;
    try {
        const existingUser = await findUserByUsername(username, Student);
        if (existingUser) {
            return res.status(400).send('User already exists');
        }

        await createUser({ username, password, ...otherDetails });
        res.status(200).send('Student registered successfully');
    } catch (e) {
        res.status(500).send('Server error');
    }
};

export const loginUser = async (req, res) => {
    const { username, password, userType } = req.body;
    try {
        const collection = userType === 'student' ? Student : userType === 'mentor' ? Mentor : Company;

        const user = await findUserByUsername(username, collection);
        if (!user) return res.status(400).send('Invalid username');

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (isPasswordMatch) {
            const token = jwt.sign({ username, userType }, JWT_SECRET, { expiresIn: '1h' });
            res.status(200).send({ token });
        } else {
            res.status(400).send('Invalid password');
        }
    } catch (e) {
        console.log(e.message)
        res.status(500).send('Server error');
    }
};
