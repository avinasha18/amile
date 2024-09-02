import express from "express"
import { getCourse, enrollCourse, checkEnrollment } from '../controllers/courseController.js'

const router = express.Router();

router.get("/courses", getCourse)
router.post("/enrollcourse", enrollCourse)
router.post('/checkenrollment', checkEnrollment)
export default router