import mongoose from "mongoose";

const courseProgressSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    courses: [{
        courseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course',
            required: true
        },
        totalProgress: {
            type: Number,
            required: true,
            default: 0,
            min: 0,
            max: 100
        },
        completionStatus: {
            type: [[Boolean]], // 2D array to track completion of topics
            required: true
        }
    }]
});


export const CourseProgress = mongoose.model('CourseProgress', courseProgressSchema);
