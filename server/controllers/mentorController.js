import { createMentor, findUserByUsername } from '../models/auth.model.js';

export const registerMentor = async (req, res) => {
    const { username, ...otherDetails } = req.body;
    try {
        const existingMentor = await findUserByUsername(username, 'mentors');
        if (existingMentor) {
            return res.status(400).send('Mentor already exists');
        }

        await createMentor({ username, ...otherDetails });
        res.status(200).send('Mentor registered successfully');
    } catch (e) {
        res.status(500).send('Server error');
    }
};

