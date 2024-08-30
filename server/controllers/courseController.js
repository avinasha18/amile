import { Course } from "../models/courses.model";

export const getCourse = async (req, res) => {
    const { courseid } = req.query;

    try {
        if (!courseid) {
            return res.status(400).send('Course ID is required');
        }

        const course = await Course.findOne({ courseid });

        if (!course) {
            return res.status(404).send('Course not found');
        }

        res.status(200).send({ success: true, course });
    } catch (e) {
        console.log(e);
        res.status(500).send('Server error');
    }
};