import mongoose from "mongoose";

const connectToMongoDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://vignaramtejtelagarapu:vzNsqoKpAzHRdN9B@amile.auexv.mongodb.net/?retryWrites=true&w=majority&appName=Amile', {
        });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
    }
};

export { connectToMongoDB };
