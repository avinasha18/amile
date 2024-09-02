import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    courseName: {
        type: String,
        required: true
    },
    teacher: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    participants: {
        type: Number,
        required: true
    },
    bestseller: {
        type: Boolean,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    relatedTopics: {
        type: [String],
        required: true
    },
    durationHours: {
        type: Number,
        required: true
    },
    sections: {
        type: Number,
        required: true
    },
    lectures: {
        type: Number,
        required: true
    }
});

export const Course = mongoose.model('Course', courseSchema);

