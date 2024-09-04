import express from "express"
import { getCourse, enrollCourse, checkEnrollment, fetchEnrolled } from '../controllers/courseController.js'
import { trackProgress, getProgress, getAvgProgress } from "../controllers/progressController.js";

const router = express.Router();

router.get("/courses", getCourse)
router.post("/enrollcourse", enrollCourse)
router.post('/checkenrollment', checkEnrollment)
router.get("/enrolledcourses", fetchEnrolled)
router.put("/trackprogress", trackProgress);
router.get("/getprogress", getProgress);
router.get("/mentor/getavgprogress", getAvgProgress)


export default router