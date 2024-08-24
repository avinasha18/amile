import { createMentor, findUserByUsername, Mentor } from '../models/auth.model.js';

export const registerMentor = async (req, res) => {
    const { username, ...otherDetails } = req.body;
    try {
        const existingMentor = await findUserByUsername(username, Mentor);
        if (existingMentor) {
            return res.status(400).send('Mentor already exists');
        }

        await createMentor({ username, ...otherDetails });
        res.status(200).send('Mentor registered successfully');
    } catch (e) {
        console.log(e)
        res.status(500).send('Server error');
    }
};

