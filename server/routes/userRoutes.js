import express from 'express';
import {
    registerStudent,
    AssignMentor,
    checkStudentMentorStatus,
    loginUser,
    VerifyUserAccountwithToken,
    getUser,
    updateStudent,
    resetPassword,
    forgotPassword,
    resendVerification,
    reportIncident,
    getInterests
} from '../controllers/userController.js';
import { connectPlugin, disconnectPlugin } from '../controllers/pluginController.js';
import { CheckAuthorization } from "../middleware/authMiddleware.js"

const router = express.Router();

router.post('/register/student', registerStudent);
router.post('/verifyaccount', VerifyUserAccountwithToken);
router.post('/login', loginUser);
router.post('/resendverification', resendVerification)
router.get('/student-mentor/:id', checkStudentMentorStatus)
router.post('/resetpassword', resetPassword);
router.post('/reportincident', reportIncident);
router.post('/assign-mentor', AssignMentor)
router.post('/forgotpassword', forgotPassword);
router.get('/userdata', CheckAuthorization, getUser);
router.post('/connectplugin', CheckAuthorization, connectPlugin);
router.post('/updateuser', CheckAuthorization, updateStudent);
router.post('/disconnectplugin', disconnectPlugin);
router.get('/interests', getInterests);

export default router;
