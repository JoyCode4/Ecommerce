import mongoose from 'mongoose';

// const MONGODB_URI = process.env.MONGODB_URI as string;
// const MONGODB_URI = "mongodb+srv://joy:joy00004@cluster0.4tswcny.mongodb.net/ECommerce?retryWrites=true&w=majority&appName=Cluster0";
const MONGODB_URI = "mongodb://localhost:27017/ecommerce";

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
    throw new Error('Failed to connect to MongoDB');
  }
};

export default dbConnect;