import express from "express"
import { getCourse } from "../controllers/courseController"

const router = express.Router();

router.get("/courses", fetchCourses)