import express from 'express';
import { registerStudent, loginUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/register/student', registerStudent);
router.post('/login', loginUser);


export default router;
