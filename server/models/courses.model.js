import mongoose from "mongoose";
import { stringify } from "uuid";

const moduleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    included: {
        type: [String], 
        required: true
    }
});

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    lastUpdated: {
        type: String, 
        required: true
    },
    language: {
        type: String,
        required: true
    },
    rating: {
        type: String,
        required: true
    },
    students: {
        type: String, 
        required: true
    },
    modules: [moduleSchema] });

export const Course = mongoose.model('Course', courseSchema);

