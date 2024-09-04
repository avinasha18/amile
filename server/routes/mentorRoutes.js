import express from 'express';
import { registerMentor, loginUser,getMentorData, resetPassword, forgotPassword, getUser, updateMentor, VerifyMentorAccountwithToken } from '../controllers/mentorController.js';
import { VerifyUserAccountwithToken, resendVerification } from '../controllers/userController.js';
import {CheckAuthorization} from "../middleware/authMiddleware.js"

const router = express.Router();

router.post('/register', registerMentor);
router.post('/verifyaccount', VerifyUserAccountwithToken);
router.post('/login', loginUser);
router.post("/assign", assignStudents);
router.post('/resendverification', resendVerification)
router.post('/resetpassword', resetPassword);
router.post('/forgotpassword', forgotPassword);
router.get('/mentordata', CheckAuthorization,getUser);
router.post('/mentordata',getUser)
router.get('/mentordata/:id',getMentorData)
router.post('/connectplugin',CheckAuthorization,connectPlugin);
router.post('/updatementor',CheckAuthorization,updateMentor);
router.get("/getStudents", CheckAuthorization,getStudents);



export default router;
