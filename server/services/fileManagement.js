import { GridFsStorage } from "multer-gridfs-storage";
import crypto from "crypto";
import path from "path";
import { bucket, url } from "../db.js";
import mongoose from "mongoose";

export const configureGridFsStorage = (url, bucketName = 'uploads', cryptoLength = 16) => {
  try{
  return new GridFsStorage({
      url: url,
      options: { useNewUrlParser: true, useUnifiedTopology: true },
      file: async (req,file) => {
          try {
              const filename = await new Promise((resolve, reject) => {
                  crypto.randomBytes(cryptoLength, (err, buf) => {
                      if (err) {
                          return reject(new Error('Error generating filename'));
                      }
                      resolve(buf.toString('hex') + path.extname(file.originalname));
                  });
              });
              return {
                  req,
                  filename: filename,
                  bucketName: bucketName
              };
          } catch (error) {
              console.error('Error in file processing:', error);
          }
      }
  });
}catch (error) {
console.log(error)
}
};



export const deleteFileById = async (fileId) => {
  try {
    await bucket.delete(fileId);

    console.log(`File with ID ${fileId} deleted successfully`);
  } catch (err) {
    console.error(`Failed to delete file with ID ${fileId}`, err);
    throw err;
  }
};

export const getFileStreamById = async (fileId) => {
  try {
    const stream = bucket.openDownloadStreamByName(fileId);

    return stream;
  } catch (err) {
    console.error(`Failed to get file stream for ID ${fileId}`, err);
    throw err;
  }
};
export const getFileInfoById = async (fileId) => {
  try {
    const db = mongoose.connection.db;
    const fileInfo = await db
      .collection("uploads.files")
      .findOne({ filename: fileId });
 
    return fileInfo;
  } catch (err) {
    console.error(`Failed to get file stream for ID ${fileId}`, err);
  }
};
