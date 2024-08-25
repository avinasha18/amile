import express from 'express';
import { registerStudent, loginUser, VerifyUserAccountwithToken} from '../controllers/userController.js';
import { connectPlugin, disconnectPlugin } from '../controllers/pluginController.js';

const router = express.Router();

router.post('/register/student', registerStudent);
router.post('/verifyaccount', VerifyUserAccountwithToken);
router.post('/login', loginUser);
router.post('/connectplugin', connectPlugin);
router.post('/disconnectplugin', disconnectPlugin);




export default router;
