import mongoose from 'mongoose';
require("dotenv").config()

const connectDB = async (): Promise<void> => {
  try {
    console.log(process.env.MONGODB_URI)
    const dbURI = process.env.MONGODB_URI ||'mongodb://localhost:27017/'; 
   
    await mongoose.connect(dbURI);
    
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

export default connectDB;
