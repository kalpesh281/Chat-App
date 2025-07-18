import mongoose from "mongoose";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import { v4 as uuid } from "uuid";

import { getSockets } from "../lib/helper.js"; // Adjust the import path as necessary

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Database connected`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Change parameter order to: (req, event, users, data)
const emitEvent = (req, event, users, data) => {
  const io = req.app.get("io");
  const userSocket = getSockets(users);
  io.to(userSocket).emit(event, data);
};

const deleteFilesFromCloudinary = async (files) => {
  try {
    const promises = files.map((file) => {
      return new Promise((resolve, reject) => {
        cloudinary.uploader.destroy(file.public_id, (error, result) => {
          if (error) return reject(error);
          resolve(result);
        });
      });
    });

    await Promise.all(promises);
    console.log("Files deleted from Cloudinary successfully");
  } catch (error) {
    console.error("Error deleting files from Cloudinary:", error);
    throw error;
  }
};

const uploadFilesToCloudinary = async (files = []) => {
  try {
    const uploadPromises = files.map((file) => {
      return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
          file.path,
          {
            resource_type: "auto", // Automatically detect file type
            folder: "chat-app", // Optional: organize files in folders
          },
          (error, result) => {
            if (error) return reject(error);
            resolve({
              public_id: result.public_id,
              // public_id: uuid(),
              url: result.secure_url,
            });
          }
        );
      });
    });

    const uploadResults = await Promise.all(uploadPromises);
    console.log("Files uploaded to Cloudinary successfully");
    return uploadResults;
  } catch (error) {
    console.error("Error uploading files to Cloudinary:", error);
    throw error;
  }
};

export {
  connectDB,
  emitEvent,
  deleteFilesFromCloudinary,
  uploadFilesToCloudinary,
  cloudinary,
};
