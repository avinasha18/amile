import { CourseProgress } from "../models/track.model.js";

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