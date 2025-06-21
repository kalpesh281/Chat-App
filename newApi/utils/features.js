import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Database connected`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const emitEvent = (req, event, data, users) => {
  console.log(`Emitting event: ${event} with data:`, data);
};

const deleteFilesFromCloudinary = async (files) => {};

export { connectDB, emitEvent, deleteFilesFromCloudinary };
