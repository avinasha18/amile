import mongoose from "mongoose";
import { GridFSBucket } from "mongodb";

let bucket;
const url = "mongodb+srv://vignaramtejtelagarapu:vzNsqoKpAzHRdN9B@amile.auexv.mongodb.net/?retryWrites=true&w=majority&appName=Amile";
const connectToMongoDB = async () => {
    try {
        const conn = await mongoose.connect(url, {
        });

        console.log('Connected to MongoDB');

        const db = mongoose.connection.db;
         bucket = new GridFSBucket(db, {
            bucketName: 'uploads' 
        });

        console.log('GridFS bucket initialized');
        
        return { conn, bucket };
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
    }
};

export { connectToMongoDB , bucket, url};
