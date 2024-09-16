import express from "express";
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
  uploadStudentProfile,
  getProfile,
  getInterests,
  getStudentProgress
} from "../controllers/userController.js";
import {
  connectPlugin,
  disconnectPlugin,
} from "../controllers/pluginController.js";
import { CheckAuthorization } from "../middleware/authMiddleware.js";
import { configureGridFsStorage } from "../services/fileManagement.js";
import multer from "multer";
import { url } from "../db.js";

const router = express.Router();
const storage = configureGridFsStorage(url);
const upload = multer({ storage });

router.post("/register/student", registerStudent);
router.post("/verifyaccount", VerifyUserAccountwithToken);
router.post("/login", loginUser);
router.post("/resendverification", resendVerification);
router.get("/student-mentor/:id", checkStudentMentorStatus);
router.post("/resetpassword", resetPassword);
router.post("/reportincident", reportIncident);
router.post("/assign-mentor", AssignMentor);
router.post("/forgotpassword", forgotPassword);
router.post("/upload-profile",CheckAuthorization, upload.single("photo"), uploadStudentProfile);
router.get("/userdata", CheckAuthorization, getUser);
router.get("/profile/:filename", getProfile);
router.get('/interests', getInterests);
router.post("/connectplugin", CheckAuthorization, connectPlugin);
router.post("/updateuser", CheckAuthorization, updateStudent);
router.post("/disconnectplugin", disconnectPlugin);
router.get('/student/progress/:studentId', getStudentProgress);

export default router;
