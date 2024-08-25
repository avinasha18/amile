import mongoose from "mongoose";

const connectToMongoDB = async (cb) => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/amile', {
        });
        console.log('Connected to MongoDB');
        cb()

    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
        process.exit(1);
    }
};

export {connectToMongoDB}