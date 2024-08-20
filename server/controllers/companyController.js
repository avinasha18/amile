import { createCompany, findUserByUsername } from '../models/auth.model.js';

export const registerCompany = async (req, res) => {
    const { username, ...otherDetails } = req.body;
    try {
        const existingCompany = await findUserByUsername(username, 'companies');
        if (existingCompany) {
            return res.status(400).send('Company already exists');
        }

        await createCompany({ username, ...otherDetails });
        res.status(200).send('Company registered successfully');
    } catch (e) {
        res.status(500).send('Server error');
    }
};

