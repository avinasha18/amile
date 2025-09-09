import { CourseProgress } from "../models/track.model.js";
import { Student } from "../models/auth.model.js";

export const trackProgress = async (req, res) => {
    const { studentId, courseId, totalProgress, completionStatus } = req.body;

    try {
        let progress = await CourseProgress.findOne({ studentId });

        if (progress) {
            const courseIndex = progress.courses.findIndex(c => c.courseId.toString() === courseId);
            if (courseIndex !== -1) {
                progress.courses[courseIndex].totalProgress = totalProgress;
                progress.courses[courseIndex].completionStatus = completionStatus;
            } else {
                progress.courses.push({ courseId, totalProgress, completionStatus });
            }
        } else {
            progress = new CourseProgress({
                studentId,
                courses: [{ courseId, totalProgress, completionStatus }]
            });
        }

        await progress.save();
        res.json({ success: true, message: 'Progress updated successfully' });
    } catch (error) {
        console.error('Error updating course progress:', error);
        res.status(500).send('Server error');
    }
}

export const getProgress = async (req, res) => {
    const { studentId, courseId } = req.query;  // Use req.query for GET request

    try {
        const progress = await CourseProgress.findOne({ studentId, 'courses.courseId': courseId });
        if (progress) {
            const courseProgress = progress.courses.find(c => c.courseId.toString() === courseId);
            if (courseProgress) {
                res.json(courseProgress);
            } else {
                res.status(404).json({ message: 'Course progress not found' });
            }
        } else {
            res.status(404).json({ message: 'Student progress not found' });
        }
    } catch (error) {
        console.error('Error fetching course progress:', error);
        res.status(500).send('Server error');
    }
};

const calculateAverageProgress = (courses) => {
    if (!courses || courses.length === 0) return 0;
    const totalProgress = courses.reduce((acc, course) => acc + course.totalProgress, 0);
    return totalProgress / courses.length;
};

export const getAvgProgress = async (req,res) => {
    try {
        const students = await Student.find();
        const courseProgresses = await CourseProgress.find();

        const studentData = students.map((student) => {
            const progressData = courseProgresses.find(
                (progress) => progress.studentId.toString() === student._id.toString()
            );
            const avgProgress = progressData ? calculateAverageProgress(progressData.courses) : 0;
            return {
                username: student.username,
                avgProgress,
            };
        });

        res.json({ success: true, studentData });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}