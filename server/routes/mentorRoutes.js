import express from 'express';
import { registerMentor, loginUser, resetPassword, forgotPassword, getUser, updateMentor } from '../controllers/mentorController.js';
import { VerifyUserAccountwithToken, resendVerification } from '../controllers/userController.js';
import {CheckAuthorization} from "../middleware/authMiddleware.js"
import { connectPlugin, disconnectPlugin } from '../controllers/pluginController.js';

const router = express.Router();

router.post('/register/mentor', registerMentor);
router.post('/verifyaccount', VerifyUserAccountwithToken);
router.post('/login', loginUser);
router.post('/resendverification', resendVerification)

router.post('/resetpassword', resetPassword);


router.post('/forgotpassword', forgotPassword);
router.get('/mentordata', CheckAuthorization,getUser);
router.post('/connectplugin',CheckAuthorization,connectPlugin);
router.post('/updatementor',CheckAuthorization,updateMentor);
router.post('/disconnectplugin', disconnectPlugin);


export default router;
