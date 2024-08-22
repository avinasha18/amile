import express from 'express';
import { registerStudent, loginUser, connectPlugin, disconnectPlugin } from '../controllers/userController.js';

const router = express.Router();

router.post('/register/student', registerStudent);
router.post('/login', loginUser);
router.post('/connectplugin', connectPlugin);
router.post('/disconnectplugin', disconnectPlugin);




export default router;
