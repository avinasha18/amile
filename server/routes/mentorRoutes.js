import express from 'express';
import { registerMentor } from '../controllers/mentorController.js';

const router = express.Router();

router.post('/register/mentor', registerMentor);


export default router;
