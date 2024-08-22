import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createUser, findUserByUsername,Student,Mentor,Company, updateUser } from '../models/auth.model.js';
import { handleReferral } from './referalController.js';
const JWT_SECRET = 'amile';

export const registerStudent = async (req, res) => {
    const { username, password, ...otherDetails } = req.body;
    const { refrelid } = req.query;
    try {
        const existingUser = await findUserByUsername(username, Student);
        if (existingUser) {
            return res.status(400).send('User already exists');
        }

        await createUser({ username, password, ...otherDetails });

        await handleReferral(refrelid,username)
        res.status(200).send('Student registered successfully');
    } catch (e) {
        res.status(500).send('Server error');
    }
};



export const updateStudent = async (req, res) => {
    const { username,...otherDetails } = req.body;
    try {
        const existingUser = await findUserByUsername(username, Student);
        if (!existingUser) {
            return res.status(400).send('User not found');
        }

        await updateUser({ username, ...otherDetails });

        res.status(200).send('Student registered successfully');
    } catch (e) {
        res.status(500).send('Server error');
    }
};


export const connectPlugin = async (req, res) => {
    try {
        const { pluginName, username, pluginData } = req.body;

        if (!pluginName || !username || !pluginData) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }

        const updatedStudent = await Student.findOneAndUpdate(
            { username },
            { $set: { [pluginName]: pluginData } },
            { new: true , projection: "-password"}
        );

        if (!updatedStudent) {
            return res.status(404).json({ success: false, message: 'Student not found' });
        }

        return res.status(200).json({
            success: true,
            message: `${pluginName} data updated successfully`,
            data: updatedStudent
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};


export const disconnectPlugin = async (req, res) => {
    try {
        const { pluginName, username } = req.body;

        if (!pluginName || !username) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }

        const updatedStudent = await Student.findOneAndUpdate(
            { username },
            { $unset: { [pluginName]: "" } }, 
            { new: true , projection: "-password"}
        );

        if (!updatedStudent) {
            return res.status(404).json({ success: false, message: 'Student not found' });
        }

        return res.status(200).json({
            success: true,
            message: `${pluginName} data disconnected successfully`,
            data: updatedStudent
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
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
        res.status(500).send('Server error');
    }
};
