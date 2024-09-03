import { Course } from "../models/courses.model.js";
import { Student } from "../models/auth.model.js"

export const getCourse = async (req, res) => {

    try {

        const course = await Course.find();

        if (!course) {
            return res.status(404).send('Course not found');
        }

        res.status(200).send({ success: true, course });
    } catch (e) {
        console.log(e);
        res.status(500).send('Server error');
    }
};

export const enrollCourse = async (req, res) => {
    try {
        const { studentId, courseId } = req.body;

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).send('Course not found');
        }

        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).send('Student not found');
        }

        if (student.enrolledCourses.includes(courseId)) {
            const isEnrolled = student.enrolledCourses.includes(courseId);
            return res.status(200).send({ isEnrolled });
        }
        student.enrolledCourses.push(courseId);
        await student.save();

        res.status(200).send({ success: true, message: 'Student enrolled successfully' });

    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
}

export const checkEnrollment = async (req, res) => {
    try {
        const { studentId, courseId } = req.body;
        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).send('Student not found');
        }

        const isEnrolled = student.enrolledCourses.includes(courseId);
        res.status(200).send({ isEnrolled });
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
};

// Fetch enrolled courses
export const fetchEnrolled = async (req, res) => {
    try {
        const { studentId } = req.query;  // Use req.query for GET requests
        console.log(studentId);
        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).send('Student not found');
        }
        const enrolledCourses = await Course.find({
            _id: {
                $in: student.enrolledCourses
            }
        });
        res.status(200).send({ enrolledCourses });
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
}


