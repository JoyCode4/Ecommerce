import mongoose from 'mongoose';

const MONGODB_URI = process.env.NEXT_PUBLIC_MONGODBURL;

const dbConnect = async () => {
  if (mongoose.connection.readyState >= 1) {
    console.log('✅ Already connected to MongoDB');
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    // throw new Error('Failed to connect to MongoDB');
  }
};

export default dbConnect;