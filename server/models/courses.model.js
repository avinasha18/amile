import mongoose from "mongoose";
import { stringify } from "uuid";

const moduleSchema = new mongoose.Schema({
    step: { type: String, required: true },
    title: { type: String, required: true },
    topics: [{ type: String, required: true }]
});

const courseSchema = new mongoose.Schema({
    courseName: { type: String, required: true },
    modules: [moduleSchema],
    teacher: { type: String, required: true },
    rating: { type: Number, required: true, min: 0, max: 5 },
    participants: { type: Number, required: true },
    bestseller: { type: Boolean, default: false },
    description: { type: String, required: true },
    relatedTopics: [{ type: String }],
    durationHours: { type: Number, required: true },
    sections: { type: Number, required: true },
    lectures: { type: Number, required: true },
    courseThumbnail: { type: String, required: true },
    category: { type: String, required: true }
});

export const Course = mongoose.model('Course', courseSchema);