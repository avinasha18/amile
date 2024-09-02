import { Course } from "../models/courses.model.js";

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