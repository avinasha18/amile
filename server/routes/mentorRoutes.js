import express from "express";
import {
    registerMentor,
    loginUser,
    resetPassword,
    forgotPassword,
    getUser,
    updateMentor,
    VerifyMentorAccountwithToken,
    getStudentData,
    assignStudents,
    getStudents,
} from "../controllers/mentorController.js";
import {
    VerifyUserAccountwithToken,
    resendVerification,
} from "../controllers/userController.js";
import { CheckAuthorization } from "../middleware/authMiddleware.js";
import {
    connectPlugin,
    disconnectPlugin,
} from "../controllers/pluginController.js";

const router = express.Router();

// Mentor registration and verification routes
router.post("/register/mentor", registerMentor);
router.post("/mentor/verifyaccount", VerifyMentorAccountwithToken);

// User verification and login routes
router.post("/verifyaccount", VerifyUserAccountwithToken);
router.post("/login", loginUser);
router.post("/resendverification", resendVerification);

// Password management routes
router.post("/resetpassword", resetPassword);
router.post("/forgotpassword", forgotPassword);

// Mentor and student data routes
router.get("/mentordata", CheckAuthorization, getUser);
router.post("/mentordata", getUser);
router.post("/studentdata", getStudentData);

// Mentor assignment and update routes
router.post("/assign", assignStudents);
router.post("/updatementor", CheckAuthorization, updateMentor);

// Plugin management routes
router.post("/connectplugin", CheckAuthorization, connectPlugin);
router.post("/disconnectplugin", disconnectPlugin);

// Fetch students route
router.get("/getStudents", getStudents);

export default router;
