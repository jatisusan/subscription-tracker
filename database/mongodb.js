import mongoose from "mongoose";
import { MONGODB_URI, NODE_ENV } from "../config/env.js";

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI env variable inside .env<development/production>.local"
  );
}

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log(`Connected to databse in ${NODE_ENV} mode`);
  } catch (error) {
    console.error("Error connecting to database: ", error);
    process.exit(1);
  }
};

export default connectDB;
